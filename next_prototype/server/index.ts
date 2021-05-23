import express, {Request,Response} from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import { UrlWithParsedQuery } from 'url';

const isDev: boolean    = process.env.NODE_ENV !== "production";
const app: NextServer   = next({
    dev: isDev
});
const handle: ((req: IncomingMessage, res: ServerResponse, parceUrl?: UrlWithParsedQuery) => Promise<any>) = app.getRequestHandler();
const port: string|number = process.env.PORT || 3000;

app.prepare().then(() => {
    
    const server = express();
    server.all("*", (req, res) => { 
        return handle(req, res);
    });

    server.listen(port, (err?: any) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });

});