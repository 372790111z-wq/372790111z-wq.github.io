'use strict';
const {createHash}=require('node:crypto');
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const keyOK=k=>typeof k==='string'&&/^[a-zA-Z0-9_.:-]{1,180}$/.test(k)&&!['__proto__','constructor','prototype'].includes(k);
const dateOK=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
const empty=()=>({schema:1,version:0,records:{},meals:{},receipts:{}});
function record(value,id){
 if(!value||typeof value!=='object'||value.id!==id||!dateOK(value.date)||typeof value.movement!=='string'||!value.movement.trim()||value.movement.length>100)throw Error('invalid_record');
 const r={id,date:value.date,movement:value.movement};
 for(const k of ['weight','sets','reps'])if(!Number.isFinite(value[k])||value[k]<0)throw Error('invalid_record');
 if(value.weight>500||!Number.isInteger(value.sets)||value.sets>30||!Number.isInteger(value.reps)||value.reps>600)throw Error('invalid_record');
 Object.assign(r,{weight:value.weight,sets:value.sets,reps:value.reps});
 if(value.setDetails!==undefined){if(!Array.isArray(value.setDetails)||value.setDetails.length!==r.sets||!r.sets||value.setDetails.some(s=>!s||!Number.isFinite(s.weight)||s.weight<0||s.weight>500||!Number.isInteger(s.reps)||s.reps<1||s.reps>600))throw Error('invalid_record');r.setDetails=value.setDetails.map(s=>({weight:s.weight,reps:s.reps}));}
 for(const k of ['reserve','unit','note','mode','createdAt','legacyDate','sessionId'])if(value[k]!==undefined){if(typeof value[k]!=='string'||value[k].length>(k==='note'?1000:180))throw Error('invalid_record');r[k]=value[k];}
 if(r.unit&&!['次','秒','分钟'].includes(r.unit))throw Error('invalid_record');
 return r;
}
function operation(op){
 if(!op||!keyOK(op.opId)||!keyOK(op.id)||!['records','meals'].includes(op.kind)||!['put','delete','seed'].includes(op.type)||!(op.baseRev===null||keyOK(op.baseRev)))throw Error('invalid_operation');
 const n={opId:op.opId,id:op.id,kind:op.kind,type:op.type,baseRev:op.baseRev};
 if(op.kind==='meals'&&(!/^\d{4}-\d{2}-\d{2}:[0-3]$/.test(op.id)||!dateOK(op.id.slice(0,10))))throw Error('invalid_meal');
 if(op.type!=='delete')n.value=op.kind==='records'?record(op.value,op.id):typeof op.value==='boolean'?op.value:(()=>{throw Error('invalid_meal')})();
 return n;
}
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function apply(state,raw){
 const op=operation(raw),s=structuredClone(state),map=s[op.kind],cur=own(map,op.id)?map[op.id]:null;
 if(own(s.receipts,op.opId))return {state:s,changed:false,accepted:true};
 let id=op.id;
 if(op.type==='seed'&&cur){
  // A tombstone always wins over a legacy import; never resurrect deleted data.
  if(op.kind==='records'&&!cur.deleted&&!same(cur.value,op.value)){
   const hash=createHash('sha256').update(JSON.stringify(op.value)).digest('hex').slice(0,24);
   id='import-'+hash;
   if(!own(map,id))map[id]={rev:op.opId,deleted:false,value:{...op.value,id,note:[op.value.note,'旧设备合并时保留的不同版本'].filter(Boolean).join('；')}};
  }
 }else{
  if(op.type!=='seed'&&(cur?.rev??null)!==op.baseRev)return {state:s,changed:false,accepted:false,conflict:{opId:op.opId,kind:op.kind,id:op.id,current:cur}};
  map[id]={rev:op.opId,deleted:op.type==='delete',...(op.type==='delete'?{}:{value:op.value})};
 }
 s.receipts[op.opId]=true;s.version++;
 if(Object.keys(s.receipts).length>60000||Object.keys(s.records).length>12000||Object.keys(s.meals).length>20000)throw Error('storage_limit');
 return {state:s,changed:true,accepted:true};
}
function publicState(s){return {schema:s.schema,version:s.version,records:s.records,meals:s.meals};}
module.exports={empty,record,operation,apply,publicState,keyOK};
