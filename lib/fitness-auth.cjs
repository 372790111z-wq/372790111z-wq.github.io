'use strict';
const {createHmac,timingSafeEqual}=require('node:crypto');
function config(){const c=JSON.parse(process.env.FITNESS_PRIVATE_CONFIG||'');if(!c.sessionSecret||!c.contentKey)throw Error('unconfigured');return c;}
function sessionOK(req,c){
 const raw=String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('__Secure-fitness_session='));
 if(!raw||raw.length>550)return false;const parts=raw.slice(raw.indexOf('=')+1).split('.');if(parts.length!==2)return false;
 const [v,s]=parts,expected=createHmac('sha256',c.sessionSecret).update(v).digest('base64url');
 if(s.length!==expected.length||!timingSafeEqual(Buffer.from(s),Buffer.from(expected)))return false;
 try{const d=JSON.parse(Buffer.from(v,'base64url'));return Number.isInteger(d.exp)&&d.exp>Date.now()/1000&&d.exp<=Date.now()/1000+43260;}catch{return false;}
}
function originOK(req){return req.headers.origin===`https://${req.headers.host}`&&req.headers['sec-fetch-site']!=='cross-site';}
module.exports={config,sessionOK,originOK};
