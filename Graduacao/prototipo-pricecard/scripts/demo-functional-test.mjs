import { spawn } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const host = '127.0.0.1';
let port = 4173;
const chromePort = 9333;
const screenshotPath = path.join(projectRoot, 'screenshots', 'functional-popup.png');
const logPath = path.join(projectRoot, 'screenshots', 'functional-log.txt');

function getDemoUrl() {
  return `http://${host}:${port}/index.html`;
}

function log(message) {
  appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
  console.log(message);
}

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
    default:
      return 'text/plain; charset=utf-8';
  }
}

function startStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', `http://${host}:${port}`);
      let filePath = path.join(projectRoot, url.pathname === '/' ? 'index.html' : url.pathname);

      if (!filePath.startsWith(projectRoot)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
    } catch (error) {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, host, () => {
      port = server.address().port;
      log(`Static server running at http://${host}:${port}`);
      resolve(server);
    });
  });
}

function findChromePath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  return candidates.find((candidate) => {
    try {
      return Boolean(process.getBuiltinModule('fs').existsSync(candidate));
    } catch {
      return false;
    }
  });
}

function launchChrome(chromePath) {
  const userDataDir = path.join(projectRoot, '.tmp-chrome-profile');
  log(`Launching browser: ${chromePath}`);
  const child = spawn(
    chromePath,
    [
      `--remote-debugging-port=${chromePort}`,
      `--remote-debugging-address=${host}`,
      '--remote-allow-origins=*',
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${userDataDir}`,
      getDemoUrl(),
    ],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  child.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  child.on('exit', (code, signal) => {
    log(`Browser exited with code=${code} signal=${signal ?? 'none'}`);
  });

  return child;
}

async function waitForJson(url, attempts = 100) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timeout while waiting for ${url}`);
}

async function connectToPage() {
  log('Waiting for Chrome DevTools endpoint...');
  let pageTarget = null;

  for (let index = 0; index < 60; index += 1) {
    const targets = await waitForJson(`http://${host}:${chromePort}/json/list`);
    pageTarget =
      targets.find((target) => target.type === 'page' && target.url.startsWith(getDemoUrl())) ??
      targets.find((target) => target.type === 'page' && target.url.startsWith(`http://${host}:${port}/`));

    if (pageTarget?.webSocketDebuggerUrl) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error('No debuggable page target found.');
  }

  const socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
  const pending = new Map();
  let counter = 0;

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result);
      }
    }
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  const call = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++counter;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await call('Page.enable');
  await call('Runtime.enable');
  log('Connected to browser page target.');

  return {
    socket,
    call,
  };
}

async function evaluate(call, expression) {
  const result = await call('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  return result.result.value;
}

async function waitFor(call, predicate, label) {
  for (let index = 0; index < 40; index += 1) {
    const value = await evaluate(call, predicate);
    if (value) {
      return value;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Timeout while waiting for ${label}`);
}

async function runFlow(call) {
  log('Waiting for course selector...');
  await waitFor(
    call,
    "document.querySelector('#demo-course-select')?.options.length > 1",
    'course selector',
  );

  await evaluate(
    call,
    `(() => {
      const select = document.querySelector('#demo-course-select');
      select.value = 'traducao-interpretacao-ingles-portugues';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`,
  );

  const switchedCourse = await waitFor(
    call,
    `(() => {
      const title = document.querySelector('[data-phorte-course-title]')?.textContent.trim();
      if (title !== 'Tradução e Interpretação Inglês / Português') return null;

      return {
        title,
        mecBadge: document.querySelector('[data-phorte-badge-mec]')?.textContent.trim() ?? '',
        turmaBadge: document.querySelector('[data-phorte-badge-turma]')?.textContent.trim() ?? '',
        price: document.querySelector('[data-phorte-preco-valor]')?.textContent.trim(),
        modalidades: [...document.querySelectorAll('[data-phorte-modalidades] .phorte-card__chip')]
          .map((node) => node.textContent.trim())
      };
    })()`,
    'course switch to traducao',
  );

  if (switchedCourse.title !== 'Tradução e Interpretação Inglês / Português') {
    throw new Error('Course selector did not update the card title.');
  }

  if (switchedCourse.mecBadge !== 'Nota 5 ★ no Mec') {
    throw new Error('Course selector did not update the MEC badge.');
  }

  if (switchedCourse.price !== 'R$ 529,00') {
    throw new Error('Course selector did not update the base price.');
  }

  if (switchedCourse.modalidades.length !== 1 || switchedCourse.modalidades[0] !== 'EAD Ao Vivo') {
    throw new Error('Course selector did not refresh the card modalidades.');
  }

  await evaluate(
    call,
    `(() => {
      const select = document.querySelector('#demo-course-select');
      select.value = 'administracao';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`,
  );

  log('Waiting for card chips to render...');
  await waitFor(
    call,
    `(() => {
      const title = document.querySelector('[data-phorte-course-title]')?.textContent.trim();
      return title === 'Administração' &&
        document.querySelectorAll('[data-phorte-modalidades] .phorte-card__chip').length > 0;
    })()`,
    'chips render',
  );

  await evaluate(
    call,
    `(() => {
      const clickByText = (selector, text) => {
        const node = [...document.querySelectorAll(selector)]
          .find((item) => item.textContent.trim() === text);
        if (!node) throw new Error('Node not found: ' + text);
        node.click();
      };

      clickByText('[data-phorte-modalidades] .phorte-card__chip', 'Presencial');
      clickByText('[data-phorte-polos] .phorte-card__chip', 'Polo Lapa');
      document.querySelector('[data-phorte-cta]').click();
      return true;
    })()`,
  );
  log('Selection applied, waiting for popup...');

  const popupState = await waitFor(
    call,
    `(() => {
      const popup = document.querySelector('#phorte-demo-popup');
      if (!popup?.classList.contains('is-open')) return null;
      const poloField = document.querySelector('#rd-polo')?.closest('.phorte-form__field');
      const interestField = document.querySelector('#rd-interest')?.closest('.phorte-form__field');
      return {
        popupOpen: true,
        summary: document.querySelector('[data-phorte-popup-summary]').textContent.trim(),
        course: document.querySelector('#rd-course').value,
        modality: document.querySelector('#rd-modality').value,
        polo: document.querySelector('#rd-polo').value,
        poloOptions: [...document.querySelector('#rd-polo').options].map((option) => option.value).filter(Boolean),
        interestValue: document.querySelector('#rd-interest')?.value ?? '',
        hasPriceField: Boolean(document.querySelector('#rd-price')),
        poloIsFullWidth: poloField?.classList.contains('is-full') ?? false,
        interestIsFullWidth: interestField?.classList.contains('is-full') ?? false
      };
    })()`,
    'popup open',
  );

  if (popupState.hasPriceField) {
    throw new Error('Popup still renders the price field.');
  }

  if (popupState.poloIsFullWidth || popupState.interestIsFullWidth) {
    throw new Error('Polo and interest dropdown should share the same row.');
  }

  if (popupState.poloOptions.includes('Polo Martiniano')) {
    throw new Error('Popup still includes legacy hardcoded polo options.');
  }
  log('Popup opened, submitting form...');

  const submissionState = await evaluate(
    call,
    `(() => {
      const setValue = (selector, value) => {
        const field = document.querySelector(selector);
        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      };

      setValue('#rd-name', 'Marcelo Teste');
      setValue('#rd-email', 'marcelo@example.com');
      setValue('#rd-phone', '11999999999');
      setValue('#rd-interest', 'processos-gerenciais::presencial');
      setValue('#rd-essay', 'Quero cursar a graduacao para ampliar minha carreira.');
      document.querySelector('#phorte-demo-form').dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      return {
        feedback: document.querySelector('[data-phorte-demo-feedback]').textContent.trim(),
        currentPolo: document.querySelector('#rd-polo').value,
        poloOptions: [...document.querySelector('#rd-polo').options].map((option) => option.value).filter(Boolean)
      };
    })()`,
  );

  if (submissionState.feedback.includes('"preco"')) {
    throw new Error('Demo payload should not include preco after removing the field.');
  }

  if (submissionState.currentPolo !== 'Polo Bela Vista') {
    throw new Error('Polo select did not refresh from spreadsheet data after changing the course.');
  }

  if (submissionState.poloOptions.length !== 1 || submissionState.poloOptions[0] !== 'Polo Bela Vista') {
    throw new Error('Polo options should be rebuilt from spreadsheet data for the selected course.');
  }

  const screenshot = await call('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
  });

  await mkdir(path.dirname(screenshotPath), { recursive: true });
  await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));
  log(`Screenshot written to ${screenshotPath}`);

  return {
    popupState,
    submissionState: submissionState.feedback,
    screenshotPath,
  };
}

async function main() {
  const chromePath = findChromePath();

  if (!chromePath) {
    throw new Error('Chrome or Edge not found.');
  }

  await mkdir(path.dirname(logPath), { recursive: true });
  appendFileSync(logPath, '');
  const server = await startStaticServer();
  const chrome = launchChrome(chromePath);
  let exitCode = 0;

  try {
    const { socket, call } = await connectToPage();
    const result = await runFlow(call);
    socket.close();

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    exitCode = 1;
    throw error;
  } finally {
    log('Shutting down browser and static server...');
    chrome.kill('SIGKILL');
    await new Promise((resolve) => server.close(resolve));
    process.exit(exitCode);
  }
}

main().catch((error) => {
  log(`ERROR ${error.stack ?? error.message}`);
  console.error(error);
  process.exitCode = 1;
});
