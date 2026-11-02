// Usage: node scripts/pack-fitness.cjs /absolute/private/source /absolute/private/config.json
// Only encrypted output belongs in this repository. Never pass a password on the command line.
const fs = require('node:fs');
const path = require('node:path');
const { createCipheriv, randomBytes } = require('node:crypto');
const [source, configFile] = process.argv.slice(2);
if (!source || !configFile || !path.isAbsolute(source) || !path.isAbsolute(configFile)) throw Error('Two absolute local paths are required');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
html = html.replace('<link rel="stylesheet" href="./style.css">', () => `<style>${fs.readFileSync(path.join(source, 'style.css'), 'utf8')}</style>`);
for (const file of ['exercise-library.js', 'app.js']) html = html.replace(`<script src="./${file}"></script>`, () => `<script>${fs.readFileSync(path.join(source, file), 'utf8').replace(/<\/script/gi, '<\\/script')}</script>`);
const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', Buffer.from(config.contentKey, 'base64'), iv);
const data = Buffer.concat([cipher.update(html, 'utf8'), cipher.final()]);
fs.mkdirSync(path.join(__dirname, '../private'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../private/fitness.enc.json'), JSON.stringify({ version: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: data.toString('base64') }) + '\n');
console.log('Encrypted content updated:', data.length, 'bytes');
