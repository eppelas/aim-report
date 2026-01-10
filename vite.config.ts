import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

export default defineConfig({
  // Build as a standalone folder that can be opened via `file://` (relative asset paths)
  base: './',
  plugins: [
    react(),
    {
      name: 'aim-lead-capture-dev',
      configureServer(server) {
        server.middlewares.use('/api/leads', (req, res, next) => {
          if (req.method !== 'POST') return next();

          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}') as Record<string, unknown>;
              const email = typeof parsed.email === 'string' ? parsed.email.trim() : '';
              const telegram = typeof parsed.telegram === 'string' ? parsed.telegram.trim() : '';

              if (!email && !telegram) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: 'email_or_telegram_required' }));
                return;
              }

              const now = new Date().toISOString();
              const payload = {
                ...parsed,
                email: email || undefined,
                telegram: telegram || undefined,
                receivedAt: now,
                userAgent: req.headers['user-agent'] || undefined,
              };

              const dir = path.resolve(__dirname, 'data');
              const file = path.join(dir, 'leads.ndjson');
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              await fsp.appendFile(file, `${JSON.stringify(payload)}\n`, 'utf-8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'server_error' }));
            }
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
