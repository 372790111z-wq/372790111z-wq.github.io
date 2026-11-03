(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FitnessSync=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const copy=x=>JSON.parse(JSON.stringify(x));
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const blank=()=>({schema:1,version:0,records:{},meals:{}});
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
class Client{
 constructor({storage,fetch,crypto,prefix='zhangCoach.sync.v1',url='/private/sync',onChange=()=>{},onStatus=()=>{}}){Object.assign(this,{storage,fetch,crypto,prefix,url,onChange,onStatus});this.ready=false;this.running=null;this.conflict=null;this.blocked=false;this.status='loading';}
 key(k){return this.prefix+'.'+k;}
 statusTo(status){let pending=0;try{pending=this.pending().length;}catch{status='storage-error';this.blocked=true;}this.status=status;this.onStatus({status,pending,conflict:this.conflict});}
 snapshot(){const s=JSON.parse(this.storage.getItem(this.key('cache'))||'null')||blank();if(s.schema!==1||!s.records||!s.meals||!Number.isInteger(s.version))throw Error('cache_invalid');return s;}
 pending(){const ops=[];for(let i=0;i<this.storage.length;i++){const k=this.storage.key(i);if(k?.startsWith(this.key('op.'))){const op=JSON.parse(this.storage.getItem(k));if(!op?.opId||!op.kind||!op.id)throw Error('queue_invalid');ops.push(op);}}return ops.sort((a,b)=>a.seq-b.seq||a.opId.localeCompare(b.opId));}
 view(){const s=copy(this.snapshot());for(const op of this.pending()){s[op.kind][op.id]={rev:op.opId,deleted:op.type==='delete',...(op.type==='delete'?{}:{value:op.value})};}return {records:Object.values(s.records).filter(e=>!e.deleted).map(e=>e.value),meals:Object.fromEntries(Object.entries(s.meals).filter(([,e])=>!e.deleted).map(([k,e])=>[k,e.value])),state:s};}
 revision(kind,id){return this.view().state[kind][id]?.rev??null;}
 emit(){const v=this.view();this.onChange(v);}
 cache(s){const old=this.snapshot();if(s.version>=old.version&&!equal(old,s))this.storage.setItem(this.key('cache'),JSON.stringify(s));}
 writeOps(ops){const written=[];try{for(const op of ops){const key=this.key('op.'+op.opId);this.storage.setItem(key,JSON.stringify(op));written.push(key);}return true;}catch{for(const k of written)this.storage.removeItem(k);return false;}}
 nextSeq(){return Math.max(Date.now(),...this.pending().map(o=>o.seq))+1;}
 async initialize(records,meals){
  try{
   this.snapshot();this.pending();
   if(!this.storage.getItem(this.key('seeded'))){
    if(!this.storage.getItem(this.key('legacy-backup')))this.storage.setItem(this.key('legacy-backup'),JSON.stringify({records,meals}));
    let seq=this.nextSeq();const seeds=[];
    for(const [kind,id,value] of [...records.map(r=>['records',r.id,r]),...Object.entries(meals).map(([id,v])=>['meals',id,v])]){
     const digest=await this.crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([kind,id,value])));
     const opId='seed-'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
     if(!this.storage.getItem(this.key('op.'+opId)))seeds.push({opId,kind,id,value,type:'seed',baseRev:null,seq:seq++});
    }
    if(!this.writeOps(seeds))throw Error('storage_failed');this.storage.setItem(this.key('seeded'),'1');
   }
   this.ready=true;this.emit();this.statusTo(this.pending().length?'pending':'loading');return true;
  }catch{this.blocked=true;this.status='storage-error';this.onStatus({status:'storage-error',pending:0});return false;}
 }
 commit(kind,changes,expected={}){
  if(!this.ready||this.blocked)return false;
  try{const view=this.view().state;let seq=this.nextSeq();const ops=changes.map(({id,value,deleted})=>({opId:this.crypto.randomUUID(),kind,id,type:deleted?'delete':'put',baseRev:own(expected,id)?expected[id]:view[kind][id]?.rev??null,...(deleted?{}:{value}),seq:seq++}));
   if(!this.writeOps(ops)){this.statusTo('storage-error');return false;}this.statusTo(this.conflict?'conflict':'pending');return true;
  }catch{this.blocked=true;this.status='storage-error';this.onStatus({status:'storage-error',pending:0});return false;}
 }
 replaceRecords(next,expected={}){const cur=this.view().records,byId=new Map(cur.map(r=>[r.id,r])),nextIDs=new Set(next.map(r=>r.id));const changes=next.filter(r=>!equal(r,byId.get(r.id))).map(value=>({id:value.id,value}));for(const r of cur)if(!nextIDs.has(r.id))changes.push({id:r.id,deleted:true});return this.commit('records',changes,expected);}
 replaceMeals(next){const cur=this.view().meals,changes=[];for(const [id,value] of Object.entries(next))if(cur[id]!==value)changes.push({id,value});return this.commit('meals',changes);}
 async request(body){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const r=await this.fetch(this.url,{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:JSON.stringify(body)}:{}),signal:controller.signal});if(![200,409].includes(r.status)){const e=Error('http');e.status=r.status;throw e;}const data=await r.json();if(!data.state||data.state.schema!==1||!Number.isInteger(data.state.version)||!data.state.records||!data.state.meals)throw Error('invalid_response');return data;}finally{clearTimeout(timer);}}
 async sync(){if(!this.ready||this.blocked)return;if(this.running)return this.running;this.running=this.run();try{return await this.running;}finally{this.running=null;}}
 async run(){try{
  this.statusTo('syncing');const first=await this.request();this.cache(first.state);this.emit();
  if(this.conflict){this.conflict.current=first.state[this.conflict.kind][this.conflict.id]||null;this.statusTo('conflict');return;}
  for(let round=0;round<100;round++){
   const ops=this.pending().slice(0,100);if(!ops.length){this.statusTo('synced');return;}
   const data=await this.request({operations:ops});this.cache(data.state);
   for(const id of data.accepted||[])this.storage.removeItem(this.key('op.'+id));
   if(data.conflict)this.conflict=data.conflict;this.emit();
   if(this.conflict){this.statusTo('conflict');return;}
  }
  this.statusTo('pending');
 }catch(e){this.statusTo(['QuotaExceededError','SecurityError'].includes(e.name)?'storage-error':e.status===401?'login':e.status===400||e.status===415?'invalid':e.status===507?'limit':e.status===503?'unavailable':'offline');}}
 conflictDetails(){if(!this.conflict)return null;const c=this.conflict;return {...c,local:this.view().state[c.kind][c.id]||null};}
 async resolve(choice){
  if(this.running)await this.running;
  if(!this.conflict)return false;
  try{
   const fresh=await this.request();this.cache(fresh.state);const c=this.conflict,ops=this.pending().filter(o=>o.kind===c.kind&&o.id===c.id),last=ops[ops.length-1];if(!last)return false;
   // Persist the choice before dropping pending work. A cloud choice is itself a conditional operation.
   let value,type,id=c.id,baseRev=fresh.state[c.kind][id]?.rev??null;
   if(choice==='cloud'){const current=fresh.state[c.kind][id];type=!current||current.deleted?'delete':'put';value=current?.value;}
   else if(choice==='local'){type=last.type==='delete'?'delete':'put';value=last.value;}
   else if(choice==='copy'&&c.kind==='records'&&last.type!=='delete'){id=this.crypto.randomUUID();type='put';baseRev=null;value={...last.value,id,note:[last.value.note,'多端冲突时另存的版本'].filter(Boolean).join('；')};}
   else return false;
   const replacement={opId:this.crypto.randomUUID(),kind:c.kind,id,type,baseRev,...(type==='delete'?{}:{value}),seq:this.nextSeq()};
   if(!this.writeOps([replacement]))return false;
   for(const op of ops)this.storage.removeItem(this.key('op.'+op.opId));this.conflict=null;this.emit();await this.sync();return true;
  }catch{return false;}
 }
}
return {Client};
});
