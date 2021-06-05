# Docker help
使い方：

```shell
docker [OPTIONS] COMMAND
```

## オプション

|command|about|
|:-|:-|
|`--config string`|クライアントの設定ファイルの場所（デフォルトは`C:³³.docker³`)|
|`-c`, `--context string`|デーモンへの接続に使用するコンテキストの名前（DOCKERを上書きします。デーモンへの接続に使用するコンテキスト名です（DOCKER_HOST 環境変数や `docker context use` で設定されたデフォルトのコンテキストを上書きします)|
|`-D`, `--debug`|デバッグモードを有効にする|
|`-H`, `--host list`|デーモンに接続するソケットのリスト|
|`-l`, `--log-level string`| ロギングレベルを設定します。("debug"|"info"|"warn"|"error"|"fatal")(デフォルトは "info")|
|`--tls`|TLS を使用します。これは --tlsverify によって暗示されます。|
|`--tlscacert string`|この CA によってのみ署名された証明書を信頼する (デフォルトは`C:Users\\nachi\.docker\ca.pem`)|
|`--tlscert string`|TLS 証明書ファイルへのパス（デフォルトは`C:Users\\\\.docker\\.pem`)|
|`--tlskey string`|TLS キーファイルへのパス（デフォルトは`C:Users\\nachi\\.docker\\.pem`)|
|`--tlsverify`|TLS を使用してリモート認証を行います。|
|`-v`, `--version`|バージョン情報を表示して終了します。|

### 管理用のコマンド

|command|about|
|:-|:-|
|app*|Docker App (Docker Inc., v0.9.1-beta3)|
|builder|ビルドの管理|
|buildx*|BuildKitでのビルド (Docker Inc., v0.5.1-docker)|
|compose*|Docker Compose (Docker Inc., 2.0.0-beta.1)|
|config|Dockerのコンフィグを管理|
|container|コンテナを管理する|
|context|コンテキストを管理|
|image|イメージを管理する|
|manifest|Dockerイメージのマニフェストとマニフェストリストの管理|
|network|ネットワークを管理する|
|node|Swarmのノードを管理する|
|plugin|プラグインの管理|
|scan*|Docker Scan (Docker Inc., v0.8.0)|
|secret|Dockerのシークレットを管理する|
|service|サービスを管理する|
|stack|Docker スタックを管理する|
|swarm|Swarmを管理する|
|system|Dockerを管理する|
|trust|Dockerイメージの信頼性を管理|
|volume|ボリュームの管理|

### コマンドの紹介

|command|about|
|:-|:-|
|attach|実行中のコンテナにローカルの標準入力、出力、エラーストリームを付ける|
|build|Dockerfileからイメージを構築する|
|commit|コンテナの変更から新しいイメージを作成する|
|cp|コンテナとローカルファイルシステムの間でファイル/フォルダをコピーする|
|create|新しいコンテナを作成する|
|diff|コンテナのファイルシステム上のファイルやディレクトリの変更を検査する|
|events|サーバーからリアルタイムのイベントを取得|
|exec|実行中のコンテナでコマンドを実行する|
|export|コンテナのファイルシステムを tar アーカイブとしてエクスポートする|
|history|イメージの履歴を表示|
|images|イメージを一覧表示する|
|import|tarball からコンテンツをインポートしてファイルシステムイメージを作成する|
|info|システム全体の情報を表示する|
|inspect|Dockerオブジェクトの低レベルの情報を返す|
|kill|実行中の1つまたは複数のコンテナをキル|
|load|tar アーカイブまたは STDIN からイメージを読み込む|
|login|Docker レジストリにログインする|
|logout|Docker レジストリからログアウトする|
|logs|コンテナのログを取得する|
|pause|1つまたは複数のコンテナ内のすべてのプロセスを一時停止する|
|port|コンテナのポートマッピングまたは特定のマッピングを一覧表示する|
|ps|コンテナを一覧表示する|
|pull|レジストリからイメージやリポジトリを引き出す|
|push|イメージまたはリポジトリをレジストリにプッシュする|
|rename|コンテナの名前を変更|
|restart|1つまたは複数のコンテナを再起動する|
|rm|1つまたは複数のコンテナを削除|
|rmi|1つまたは複数のイメージを削除する|
|run|コマンドを新しいコンテナで実行|
|save|1つまたは複数のイメージをtarアーカイブに保存（デフォルトではSTDOUTにストリームされる|
|search|Docker Hubでイメージを検索|
|start|停止している1つまたは複数のコンテナを起動|
|stats|コンテナのリソース使用統計のライブストリームを表示|
|stop|1つまたは複数の稼働中のコンテナを停止|
|tag|SOURCE_IMAGEを参照するタグTARGET_IMAGEの作成|
|top|コンテナの実行中のプロセスを表示|
|unpause|1つまたは複数のコンテナ内のすべてのプロセスを一時停止する|
|update|1つまたは複数のコンテナの構成を更新|
|version|Dockerのバージョン情報を表示|
|wait|1つまたは複数のコンテナが停止するまでブロックし、その終了コードを表示する|
