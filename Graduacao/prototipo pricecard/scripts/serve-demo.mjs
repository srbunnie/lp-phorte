import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const host = '127.0.0.1';
const port = 4173;

function getContentType(filePath) {
  const ext = path.extname(filePath);

  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    default:
      return 'text/plain; charset=utf-8';
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${host}:${port}`);
    const filePath = path.join(projectRoot, url.pathname === '/' ? 'index.html' : url.pathname);

    if (!filePath.startsWith(projectRoot)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`Demo running at ${url}`);
  console.log('Press Ctrl+C to stop.');

  // Auto-open browser
  import('node:child_process').then(({ exec }) => {
    if (process.platform === 'win32') exec(`start ${url}`);
    else if (process.platform === 'darwin') exec(`open ${url}`);
    else exec(`xdg-open ${url}`);
  });
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
