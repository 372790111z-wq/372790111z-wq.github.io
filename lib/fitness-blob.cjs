'use strict';
const {createHmac,createCipheriv,createDecipheriv,randomBytes}=require('node:crypto');
const {empty}=require('./fitness-state.cjs');
const FILE='fitness/state-v1.enc.json';
function cryptKey(config){return createHmac('sha256',Buffer.from(config.contentKey,'base64')).update('fitness-record-sync-v1').digest();}
function seal(state,config){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',cryptKey(config),iv),data=Buffer.concat([cipher.update(JSON.stringify(state)),cipher.final()]);return JSON.stringify({iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:data.toString('base64')});}
function unseal(text,config){const b=JSON.parse(text),d=createDecipheriv('aes-256-gcm',cryptKey(config),Buffer.from(b.iv,'base64'));d.setAuthTag(Buffer.from(b.tag,'base64'));const s=JSON.parse(Buffer.concat([d.update(Buffer.from(b.data,'base64')),d.final()]).toString());if(s.schema!==1||!s.records||!s.meals||!s.receipts)throw Error('invalid_cloud_state');return s;}
function store(config){return {
 async read(){const {get}=await import('@vercel/blob');const b=await get(FILE,{access:'private',useCache:false});if(!b)return {state:empty(),etag:null};return {state:unseal(await new Response(b.stream).text(),config),etag:b.blob.etag};},
 async write(state,etag){const {put,BlobPreconditionFailedError}=await import('@vercel/blob');try{await put(FILE,seal(state,config),{access:'private',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),contentType:'application/json'});return true;}catch(e){if(e instanceof BlobPreconditionFailedError||!etag)return false;throw e;}}
};}
module.exports={store,seal,unseal};
