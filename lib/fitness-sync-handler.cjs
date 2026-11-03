'use strict';
const auth=require('./fitness-auth.cjs'),model=require('./fitness-state.cjs');
function createHandler({loadConfig=auth.config,createStore=require('./fitness-blob.cjs').store}={}){return async(req,res)=>{
 for(const [k,v] of Object.entries({'Content-Type':'application/json; charset=utf-8','Cache-Control':'private, no-store, max-age=0','CDN-Cache-Control':'no-store','Vercel-CDN-Cache-Control':'no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'}))res.setHeader(k,v);
 const send=(status,data)=>{res.statusCode=status;res.end(JSON.stringify(data));};
 let config;try{config=loadConfig();}catch{return send(503,{error:'unavailable'});}
 if(!auth.sessionOK(req,config))return send(401,{error:'login_required'});
 if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return send(405,{error:'method_not_allowed'});}
 if(req.method==='POST'&&!auth.originOK(req))return send(403,{error:'origin_rejected'});
 let ops;
 if(req.method==='POST'){
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(415,{error:'json_required'});
  try{let body=req.body;if(body===undefined){let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>524288)throw Error();}body=raw;}if(typeof body==='string'||Buffer.isBuffer(body)){if(Buffer.byteLength(body)>524288)throw Error();body=JSON.parse(String(body));}if(Buffer.byteLength(JSON.stringify(body))>524288)throw Error();if(!body||!Array.isArray(body.operations)||!body.operations.length||body.operations.length>100)throw Error();ops=body.operations.map(model.operation);}catch{return send(400,{error:'invalid_operation'});}
 }
 try{
  const store=createStore(config);
  for(let attempt=0;attempt<5;attempt++){
   const {state,etag}=await store.read();
   if(req.method==='GET')return send(200,{state:model.publicState(state)});
   let next=state,changed=false,conflict=null;const accepted=[];
   for(const op of ops){const result=model.apply(next,op);if(!result.accepted){conflict=result.conflict;break;}next=result.state;changed=changed||result.changed;accepted.push(op.opId);}
   if(!changed||await store.write(next,etag))return send(conflict?409:200,{state:model.publicState(next),accepted,...(conflict?{conflict}:{})});
  }
  return send(503,{error:'retry_later'});
 }catch(e){return send(e.message==='storage_limit'?507:503,{error:e.message==='storage_limit'?'storage_limit':'sync_unavailable'});}
};}
module.exports={createHandler};
