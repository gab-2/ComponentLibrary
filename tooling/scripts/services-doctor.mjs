import { execSync } from 'node:child_process';
import net from 'node:net';

function hasDocker() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    execSync('docker compose version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1200);

    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => resolve(false));

    socket.connect(port, host);
  });
}

const dockerOk = hasDocker();
const postgresOk = await checkPort('localhost', 5432);
const registryOk = await checkPort('localhost', 4873);

console.log(`docker_cli: ${dockerOk ? 'ok' : 'missing'}`);
console.log(`postgres_localhost_5432: ${postgresOk ? 'reachable' : 'unreachable'}`);
console.log(`registry_localhost_4873: ${registryOk ? 'reachable' : 'unreachable'}`);

if (!dockerOk) {
  console.log('hint: install Docker or run PostgreSQL/Verdaccio manually.');
}
if (!postgresOk) {
  console.log('hint: start PostgreSQL and ensure DATABASE_URL points to the running instance.');
}
if (!registryOk) {
  console.log('hint: start registry service (docker compose or verdaccio).');
}
