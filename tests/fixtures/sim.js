// Shared 6-week simulation for the goal tests (t31): follows recAll every day, logs strength sessions through saveTrain
// (every exercise done at its target, 20 kg on first sight) and runs/kickboxing as plain log entries.
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
function doTrain(k,id){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(k.today()),s=k.S(id,c);
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{const v=k.curVar(it,k.LOC());if(v<0)return;const key=id+'-'+bix+'-'+ii;dy.done[key]=true;
    if(it.f||it.iso)return;const n=b.rounds?k.rounds(b,c,id):(parseInt(it.sets,10)||1);
    if(it.test){const t=it.test,cur=D.profile[t]||0;dy.inp[key]={s:[String(cur+1)]};return;}
    const g=k.target(it,v);dy.inp[key]={s:Array(n).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};});});
  k.saveTrain();return s;}
function sig(k,s){return s.blocks.map(b=>b.name+':'+b.items.map(it=>{const v=k.curVar(it,k.LOC());return v<0?'-':it.opts[v].n;}).join(',')).join('|')+' ~'+s.min;}
function sim(k,days,start,cb){const D=k.D(),out=[];
  for(let i=0;i<days;i++){const s=addD(start,i);k.today(s);const r=k.recAll(s,false);let row={d:s,id:r.id,btn:r.btn,why:r.why};
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});
    else if(r.btn==='run'){const km=r.id==='RE'?5:(r.id==='RH'?Math.max(6,D.runKm):6);D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km,min:km*6});row.km=km;}
    else if(r.id==='RS'){D.logs.push({d:s,id:'RS',t:'RS',rpe:4});}
    else{const ss=doTrain(k,r.id);row.sig=sig(k,ss);row.min=ss.min;row.s=ss;}
    if(cb)cb(row,s);out.push(row);}
  return out;}
module.exports={addD,doTrain,sig,sim};
