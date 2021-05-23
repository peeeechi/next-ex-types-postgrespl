# Next.js + Express + TypeScript + PostgreSQL の WEBアプリをさくっと立ち上げてプロトタイプ開発をしよう

[引用先](https://www.forcia.com/blog/001559.html)

## 構成

- Next.js + Expressのカスタムサーバの構成
- TypeScriptで開発
- Backends For Frontends（BFF）構成っぽくする
- DB参照も有り（フォルシアではPostgreSQLを利用することが多いため pg-promise を利用）

上記構成をDockerを併用しながら構築していく

## Next.js(app側)の環境構築

### `dockerFile-app` と `docker-compose.yaml` の作成

- dockerFile-app

```docker
FROM node:14.16.0-alpine
WORKDIR /usr/app/src

RUN npm i create-next-app
RUN npm i -G yarn
```

- docker-compose.yaml

```yaml
version: '3'
services:
  app:
    build:
      context: .
      dockerfile: dockerfile-app
    volumes:
      - "./:/usr/app/src"
    ports:
      - "3000:3000"
    command: sh -c "cd next_prototype && yarn dev"
```

### Next.js の土台作成

Shell でコンテナへログイン

```shell
docker-compose run --rm app /bin/sh
```

以降、コンテナ内での処理

```shell
npx create-next-app next_prototype
```

アプリができたら一旦 `exit` コンテナを抜ける

以下のコマンドでアプリを起動させ、動作を確認する

```shell
docker-compose run --rm  -p 3000:3000 app
```

ここで、 `-p 3000:3000` はホスト:コンテナ のポートフォワーディングを設定している
(docker-compose.yaml のポートフォワーディングの設定は `docker-compose up` 時には有効になるが、 `docker-compose run` 時は有効にならなかった)


確認したら一旦Ctrl+c で終了させる。

### TypeScriptで開発するための設定
再度、

```shell
docker-compose run --rm app /bin/sh
```

でコンテナへログインする。

```shell
# TypeScriptと型定義ファイルのインストール
# npm install -D typescript @types/react @types/react-dom @types/node
npm install -D typescript @types/react @types/node

# TypeScriptへファイル拡張子を変更
mv pages/index.js pages/index.tsx
mv pages/_app.js pages/_app.tsx
mv pages/api/hello.js pages/api/hello.ts
```

#### _app.tsx の編集
以下のように編集

```tsx
import '../styles/globals.css';
import {AppProps} from 'next/app'; // ←追加

function MyApp({ Component, pageProps }: AppProps /* ←追加*/) {
  return <Component {...pageProps} />
}

export default MyApp;


```

#### dev server 起動

```shell
npm run dev
# or
yarn dev
```

開発サーバーが起動するとともに、
`next-env.d.ts` 、`tsconfig.json` が生成される


## Expressのカスタムサーバを導入
Next.jsはデフォルトではパスと一致するpagesディレクトリ配下の各ファイルにルーティングされます。 このルーティングに独自実装を組み込みたい場合にカスタムサーバを利用します。 例えば、特定のパスの場合のCookie操作やリダイレクト処理の実装などが挙げられます

```shell
npm install express
npm install -D @types/express

mkdir server
touch server/index.ts
touch tsconfig.server.json
```


```json
 "scripts": {
    // "dev": "next dev",
    "dev": "tsc -p tsconfig.server.json && node ./dist/index.js",

    // "build": "next build",
    "build:next": "next build",
    "build:server": "tsc -p tsconfig.server.json",
    // "start": "next start"
    "start": "NODE_ENV=production node dist/index.js"
  },
```

## database(PostgreSQL)のセットアップ

`dockerfile-postgres` を追加する。
- dockerfile-postgres

```docker
FROM postgres:11-alpine
ENV LANG ja_JP.utf8
```

`docker-compose.yaml` を修正する
- docker-compose.yaml

```yaml
version: '3'
services:
  app:
    build:
      context: .
      dockerfile: dockerfile-app
    volumes:
      - "./:/usr/app/src"
    ports:
      - "3000:3000"
    command: sh -c "cd next_prototype && yarn dev"
  # 以下追加
  pg-data:
    build:
      context: .
      dockerfile: dockerfile-postgres
    # ログイン情報を環境変数に登録しておくと楽(ただし実際の運用では使用しないこと)
    environment:
      POSTGRES_USER: admin
      POSTGRES_DB: test
      POSTGRES_PASSWORD: admin
    volumes:
      # postgres の docker image は、docker-entrypoint-initdb.d 内に.sh ファイルを置いておくと起動時にその内容を実行してくれます。
      - "./docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d" 
      - "./pg-data:/var/lib/postgresql/data" # database のデータ永続化
    ports:
      - "5500:5432"

```