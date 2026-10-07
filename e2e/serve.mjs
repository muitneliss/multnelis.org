// Serves dist/ the way GitHub Pages does, for the end-to-end suite: a
// directory without its trailing slash redirects to it, a directory serves its
// index.html, and anything missing gets 404.html with a 404 status.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '..', 'dist');
const port = Number(process.env.PORT ?? 4322);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

const send = async (res, status, file) => {
  res.writeHead(status, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
};

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const file = join(root, normalize(decodeURIComponent(pathname)));
  try {
    const info = await stat(file);
    if (!info.isDirectory()) return await send(res, 200, file);
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { location: `${pathname}/` });
      return res.end();
    }
    return await send(res, 200, join(file, 'index.html'));
  } catch {
    return send(res, 404, join(root, '404.html'));
  }
}).listen(port, '127.0.0.1');
