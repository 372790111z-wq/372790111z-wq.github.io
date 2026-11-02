'use strict';
const { createHmac, timingSafeEqual, pbkdf2, createDecipheriv, randomBytes } = require('node:crypto');
const { promisify } = require('node:util');
const content = require('../private/fitness.enc.json');
const derive = promisify(pbkdf2);
const PATH = '/private/training';
const SESSION_SECONDS = 12 * 60 * 60;
const attempts = new Map();
function equal(a, b) { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
function sign(value, secret) { return createHmac('sha256', secret).update(value).digest('base64url'); }
function validSession(cookie, config) {
  if (typeof cookie !== 'string' || cookie.length > 512) return false;
  const [value, signature, extra] = cookie.split('.');
  if (!value || !signature || extra || !equal(signature, sign(value, config.sessionSecret))) return false;
  try { const data = JSON.parse(Buffer.from(value, 'base64url')); return Number.isInteger(data.exp) && data.exp > Date.now() / 1000 && data.exp <= Date.now() / 1000 + SESSION_SECONDS + 60; } catch { return false; }
}
function session(config) {
  const value = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS, nonce: randomBytes(16).toString('base64url') })).toString('base64url');
  return `${value}.${sign(value, config.sessionSecret)}`;
}
function login(error = '') {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>私人空间</title><link rel="icon" type="image/svg+xml" sizes="any" href="/assets/training-icon-v1.svg"><style>*{box-sizing:border-box}body{margin:0;background:#f7f8f2;color:#213a2c;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;min-height:100dvh;display:grid;place-items:center;padding:24px}main{width:min(380px,100%)}.mark{font-size:12px;letter-spacing:3px;color:#6d7e6a}h1{font-size:34px;font-weight:600;margin:22px 0 12px}p{font-size:14px;line-height:1.9;color:#6b7869}form{margin-top:30px}label{display:block;font-size:12px;margin-bottom:10px}input{width:100%;background:white;border:1px solid #c9d3c4;border-radius:5px;padding:14px;font:inherit;min-height:48px}button{width:100%;border:0;border-radius:5px;background:#294e37;color:white;padding:14px;margin-top:15px;font:inherit;cursor:pointer}a{display:inline-block;margin-top:30px;font-size:12px;color:#657563;text-underline-offset:5px}:focus-visible{outline:3px solid #98b18b;outline-offset:3px}.error{color:#9b4936;min-height:25px}</style></head><body><main><span class="mark">ZZQ / PRIVATE</span><h1>私人空间。</h1><p>输入访问密码，继续。</p><form action="${PATH}" method="post"><label for="password">访问密码</label><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="128" autofocus ${error?'aria-invalid="true" aria-describedby="error"':''}><p class="error" id="error" role="alert">${error}</p><button type="submit">进入 →</button></form><a href="/">← 返回个人网站</a></main></body></html>`;
}
function decrypt(config) {
  const cipher = createDecipheriv('aes-256-gcm', Buffer.from(config.contentKey, 'base64'), Buffer.from(content.iv, 'base64'));
  cipher.setAuthTag(Buffer.from(content.tag, 'base64'));
  return Buffer.concat([cipher.update(Buffer.from(content.data, 'base64')), cipher.final()]).toString('utf8');
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('Vary', 'Cookie');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; connect-src 'self'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'");
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const send = (status, body) => { res.statusCode = status; res.end(req.method === 'HEAD' ? '' : body); };
  let config;
  try { config = JSON.parse(process.env.FITNESS_PRIVATE_CONFIG || ''); if (!config.passwordHash || !config.passwordSalt || !config.sessionSecret || !config.contentKey) throw Error(); }
  catch { return send(503, '<!doctype html><meta name="robots" content="noindex"><p>私人空间暂时不可用，请稍后再试。</p>'); }
  const secure = req.headers['x-forwarded-proto'] !== 'http' && !String(req.headers.host || '').startsWith('127.0.0.1:');
  const cookieName = secure ? '__Secure-fitness_session' : 'fitness_session';
  const cookieOptions = `Path=/private; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`;
  const cookies = Object.fromEntries(String(req.headers.cookie || '').split(';').map(v => v.trim().split('=')));
  if (req.method === 'POST') {
    const host = String(req.headers.host || '');
    const origin = req.headers.origin;
    if (!origin || origin !== `${secure ? 'https' : 'http'}://${host}` || req.headers['sec-fetch-site'] === 'cross-site') return send(403, login('请求未通过校验，请从本站重新进入。'));
    if (Number(req.headers['content-length'] || 0) > 4096) return send(413, login('输入过长，请重新输入。'));
    let body = req.body;
    if (body === undefined) { let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 4096) return send(413, login('输入过长，请重新输入。')); } body = raw; }
    if (typeof body === 'string' || Buffer.isBuffer(body)) body = Object.fromEntries(new URLSearchParams(String(body)));
    if (!body || typeof body !== 'object') return send(400, login('请输入访问密码。'));
    if (body.action === 'logout') { res.setHeader('Set-Cookie', `${cookieName}=; Max-Age=0; ${cookieOptions}`); res.statusCode = 303; res.setHeader('Location', PATH); return res.end(); }
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
    const previous = attempts.get(ip);
    if (previous && previous.count >= 8) { res.setHeader('Retry-After', '900'); return send(429, login('尝试次数较多，请15分钟后再试。')); }
    const password = typeof body.password === 'string' ? body.password : '';
    if (!password || password.length > 128) return send(400, login('请输入访问密码。'));
    const hash = (await derive(password, config.passwordSalt, 310000, 32, 'sha256')).toString('base64');
    if (!equal(hash, config.passwordHash)) { attempts.set(ip, { count: (previous?.count || 0) + 1, until: previous?.until || now + 900000 }); return send(401, login('密码不正确，请重新输入。')); }
    attempts.delete(ip);
    res.setHeader('Set-Cookie', `${cookieName}=${session(config)}; Max-Age=${SESSION_SECONDS}; ${cookieOptions}`);
    res.statusCode = 303; res.setHeader('Location', `${PATH}#today`); return res.end();
  }
  if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD, POST'); return send(405, 'Method not allowed'); }
  if (!validSession(cookies[cookieName], config)) return send(200, login());
  try { return send(200, decrypt(config)); } catch { return send(503, '<!doctype html><meta name="robots" content="noindex"><p>私人空间暂时不可用，请稍后再试。</p>'); }
};
