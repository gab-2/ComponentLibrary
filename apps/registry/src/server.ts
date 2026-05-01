import { createServer } from 'node:http';
import { authorizeInstall } from './authorize';
createServer((req,res)=>{ if(req.url==='/health'){res.end('ok');return;} const auth=authorizeInstall({token:'dev',packageName:'@sua-marca-pro/react',action:'install'});res.setHeader('content-type','application/json');res.end(JSON.stringify(auth));}).listen(4873);
