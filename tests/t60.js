// @name set-log
// I-43: every set goes into the log. saveTrain stores the reps (or seconds) per set additively (l.exs[key] = [6,6,5],
// D.ex[key].s, holds as l.exs["iso:<key>"]), weight as before; the set fields show "last: 6 · 6 · 5 reps × 20 kg",
// old entries without per-set values keep "last: 6 reps × 20 kg"; progression and stall still work on the weakest set;
// backup round trip keeps the sets, junk and prototype keys are refused, old backups load unchanged.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};
  if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const T0='2026-11-16';
function setup(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',focus:'bal',emph:'',kickDays:[],logs:[],start:'2026-10-01',short:false});k.today(T0);return D;}
// items of Strength A: one weighted progression item and one bodyweight progression item, plus a hold if present
function pick(k,id){const c=k.ctx(k.today()),s=k.S(id,c);let wi=null,bw=null,iso=null;
  s.blocks.forEach((b,bi0)=>{const bi=b.bi!=null?b.bi:bi0;b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(v<0)return;const key=id+'-'+bi+'-'+ii;
    if(it.f||it.test)return;if(it.iso){if(!iso)iso={it,v,key};return;}
    if(it.opts[v].w&&!wi)wi={it,v,key};else if(!it.opts[v].w&&!bw&&it.hi)bw={it,v,key};});});return {s,wi,bw,iso};}
// 1 logging stores every set, weakest set drives the target
{const {k,d}=boot();const D=setup(k);const {wi,bw}=pick(k,'KA');
  if(!wi||!bw)issue('Strength A has no weighted and bodyweight progression item');else{
  const dy=k.day();dy.pick='KA';dy.fin={rpe:7};
  dy.inp[wi.key]={s:['6','6','5'],w:'20'};dy.inp[bw.key]={s:['8','7','7']};dy.done[wi.key]=dy.done[bw.key]=true;
  k.saveTrain();const l=D.logs[D.logs.length-1];const kw=wi.it.k+'#'+wi.v,kb=bw.it.k+'#'+bw.v;
  if(!l.exs||JSON.stringify(l.exs[kw])!=='[6,6,5]')issue('log exs for weighted item: '+JSON.stringify(l.exs&&l.exs[kw]));
  if(!l.exs||JSON.stringify(l.exs[kb])!=='[8,7,7]')issue('log exs for bodyweight item: '+JSON.stringify(l.exs&&l.exs[kb]));
  if(JSON.stringify(l.ex[kw])!=='[6,20]')issue('l.ex (best set, kg) changed: '+JSON.stringify(l.ex[kw]));
  const e=D.ex[kw];if(!e||e.r!==5||e.w!==20||JSON.stringify(e.s)!=='[6,6,5]')issue('D.ex weighted: '+JSON.stringify(e));
  const eb=D.ex[kb];if(!eb||eb.r!==7||JSON.stringify(eb.s)!=='[8,7,7]')issue('D.ex bodyweight: '+JSON.stringify(eb));
  // display on the next day
  k.today('2026-11-18');D.tab='train';const dy2=k.day();dy2.pick='KA';k.render();
  const lv=[...d.querySelectorAll('.lastv')].map(x=>x.textContent);
  if(!lv.some(t=>t==='last: 6 · 6 · 5 '+wi.it.unit+' × 20 kg'))issue('no "last: 6 · 6 · 5 … × 20 kg" line: '+lv.join(' | '));
  if(!lv.some(t=>t==='last: 8 · 7 · 7 '+bw.it.unit))issue('no "last: 8 · 7 · 7" line: '+lv.join(' | '));
  // progression from the weakest set: target equals what the old rule gives for r = 5 at 20 kg
  const g=k.target(wi.it,wi.v);const D2=JSON.parse(JSON.stringify(D.ex[kw]));delete D2.s;const save=D.ex[kw];D.ex[kw]=D2;const g0=k.target(wi.it,wi.v);D.ex[kw]=save;
  if(g.r!==g0.r||g.w!==g0.w)issue('target differs with per-set values: '+JSON.stringify([g.r,g.w])+' vs '+JSON.stringify([g0.r,g0.w]));
  // stall: a session with the same weakest set (other sets higher) counts as stall like before (best set would not)
  for(let i=0;i<1;i++){k.today('2026-11-'+(20+i*2));const y=k.day();y.fin={rpe:7};let q=null;['KA','KB','KC'].some(id=>{const c=k.ctx(k.today()),S=k.S(id,c);S.blocks.forEach((bb,bi0)=>{const bi=bb.bi!=null?bb.bi:bi0;bb.items.forEach((it,ii)=>{if(!q&&it.k===wi.it.k&&k.curVar(it,'g')===wi.v)q={key:id+'-'+bi+'-'+ii,id};});});return !!q;});if(!q){issue('item gone on day '+i);break;}y.pick=q.id;y.inp[q.key]={s:['9','8','5'],w:'20'};y.done[q.key]=true;k.saveTrain();}
  if((D.ex[kw].stall||0)!==1||D.ex[kw].r!==5)issue('stall not counted on the weakest set: '+JSON.stringify(D.ex[kw]));}}
// 2 old entries without per-set values keep the old line; a single set shows the old form
{const {k,d}=boot();const D=setup(k);const {wi}=pick(k,'KA');
  if(wi){const kw=wi.it.k+'#'+wi.v;D.ex[kw]={r:6,w:20,d:'2026-11-10',hold:false,n:wi.it.opts[wi.v].n,stall:0};D.tab='train';k.day().pick='KA';k.render();
    const lv=[...d.querySelectorAll('.lastv')].map(x=>x.textContent);if(!lv.includes('last: 6 '+wi.it.unit+' × 20 kg'))issue('old entry line missing: '+lv.join(' | '));
    D.ex[kw].s=[6];k.render();const lv2=[...d.querySelectorAll('.lastv')].map(x=>x.textContent);if(!lv2.includes('last: 6 '+wi.it.unit+' × 20 kg'))issue('single set line: '+lv2.join(' | '));}}
// 3 holds store seconds per set and show them; done without inputs stores nothing per set
{const {k,d}=boot();const D=setup(k);D.skills={hs:true,mu:false,ls:true,fl:true,pl:false};let found=null;
  ['SK','KA','KB','KC','HO','HK','CH'].some(id=>{const p=pick(k,id);if(p.iso){found=Object.assign({id},p.iso);return true;}return false;});
  if(!found)issue('no hold item found in any session');else{const dy=k.day();dy.pick=found.id;dy.fin={rpe:6};dy.inp[found.key]={s:['20','18','15']};dy.done[found.key]=true;
    const {bw}=pick(k,found.id);if(bw)dy.done[bw.key]=true;
    k.saveTrain();const l=D.logs[D.logs.length-1];const ik='iso:'+found.it.iso;
    if(!l.exs||JSON.stringify(l.exs[ik])!=='[20,18,15]')issue('hold seconds not in log: '+JSON.stringify(l.exs));
    if(bw&&l.exs&&l.exs[bw.it.k+'#'+bw.v])issue('done without inputs stored per-set values');
    k.today('2026-11-19');D.tab='train';k.day().pick=found.id;k.render();const lv=[...d.querySelectorAll('.lastv')].map(x=>x.textContent);
    if(!lv.includes('last: 20 · 18 · 15 s'))issue('hold last line missing: '+lv.join(' | '));}}
// 4 backup round trip, junk and prototype keys refused, old backup unchanged
{const {k}=boot();const D=setup(k);
  const st=JSON.parse(JSON.stringify(D));st.logs=[{d:'2026-11-10',id:'KA',t:'Strength A',rpe:6,ex:{'p_pull#0':[8,0]},exs:{'p_pull#0':[8,8,7],'iso:lsit':[12,10],'__proto__':[1],'constructor':[2],'bad key':[3],'x#1':'1,2','y#1':['a',-1,1e9,null]}}];
  st.ex={'p_pull#0':{r:7,w:0,d:'2026-11-10',hold:false,n:'Pull-ups',stall:0,s:[8,8,7]},'p_dip#0':{r:8,w:0,d:'2026-11-10',n:'Dips',s:'8,8'},'p_row#0':{r:8,w:0,d:'2026-11-10',n:'Row',s:[1,2,3,4,5,6,7,8,9,10,11,12,13,14]}};
  const c=k.cleanImport(st);const l=c.logs[0];
  if(!l.exs||JSON.stringify(l.exs['p_pull#0'])!=='[8,8,7]'||JSON.stringify(l.exs['iso:lsit'])!=='[12,10]')issue('valid exs lost: '+JSON.stringify(l.exs));
  if(l.exs&&(Object.prototype.hasOwnProperty.call(l.exs,'__proto__')||Object.prototype.hasOwnProperty.call(l.exs,'constructor')||l.exs['bad key']||l.exs['x#1']||l.exs['y#1']))issue('junk exs kept: '+JSON.stringify(l.exs));
  if(({}).polluted||Object.prototype[1])issue('prototype polluted');
  if(JSON.stringify(c.ex['p_pull#0'].s)!=='[8,8,7]')issue('D.ex s lost');if(c.ex['p_dip#0'].s)issue('string s kept');if(c.ex['p_row#0'].s.length!==12)issue('s not capped at 12: '+c.ex['p_row#0'].s.length);
  const old={v:3,start:'2026-01-01',onb:true,profile:{pull:8},logs:[{d:'2026-11-10',id:'KA',t:'Strength A',rpe:6,ex:{'p_pull#0':[8,0]}}],days:{},ex:{'p_pull#0':{r:8,w:0,d:'2026-11-10',n:'Pull-ups'}},vr:{}};
  const o=k.cleanImport(old);if(o.logs[0].exs||o.ex['p_pull#0'].s||o.logs.length!==1)issue('old backup changed: '+JSON.stringify(o.logs[0]));}
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
