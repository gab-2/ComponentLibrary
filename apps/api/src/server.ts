import { createServer } from 'node:http';
import { meRoute } from './routes/me';

const server = createServer((_req, res) => {
  const payload = meRoute();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(payload));
});

server.listen(3001);
