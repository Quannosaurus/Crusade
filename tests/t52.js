// @name ladder
// A-039: step ladder (L2). After the variations ("Next variation", also by the difficulty order ORD where the option list
// mixes equipment) every bodyweight progression has fixed rungs (D.ex[key].lad 1–5): slow lowering 3 s, 5 s, 2 s pause,
// 15 s less rest, then a load with a weight field and normal weight steps; holds in seconds skip the tempo rungs. A rung
// is offered only after the top of the range twice in a row, one tap takes it and the range starts at the bottom; the
// rung's cue shows on the item. Holds: at 3 × 20 s the harder form, not more seconds (Tuck L-sit → L-sit in one tap).
// Glute anchor "45° back extension, glute-biased" has a weight field. cleanImport keeps lad 1–5 only; old data loads.
// 26-week long runs (t49 model, progress): rungs are taken, no bodyweight exercise > 12 weeks at the top without an offer.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const T0='2026-11-16';
function setup(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'',kickDays:[],logs:[],start:'2026-09-01',short:false});k.today(T0);return D;}
function items(k){const out=[];['KA','KB','KC','CH'].forEach(id=>{const S=k.S(id,k.ctx(k.today()));S.blocks.forEach((b,bi0)=>{const bi=b.bi!=null?b.bi:bi0;b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(v<0||it.f||it.iso||it.test||!it.k||it.gone)return;out.push({id,it,v,key:id+'-'+bi+'-'+ii});});});});return out;}
function topHist(k,it,v,n,days){const D=k.D(),K=it.k+'#'+v;for(let i=n;i>=1;i--){const d=new Date(Date.parse(T0)-i*(days||4)*864e5).toISOString().slice(0,10);D.logs.push({d,id:'KA',t:'A',rpe:6,ex:{[K]:[it.hi,0]},exs:{[K]:[it.hi,it.hi,it.hi]}});}
  D.ex[K]={r:it.hi,w:0,d:D.logs[D.logs.length-1].d,hold:false,n:it.opts[v].n,stall:0};}
// 1 the rungs of a bodyweight progression without a harder variation (reps)
{const {k,d}=boot();const D=setup(k);const L=items(k);
  const c=L.find(x=>!x.it.opts[x.v].w&&x.it.unit.indexOf('s')!==0&&k.nextVar(x.it,x.v,'g')<0&&x.it.hi>x.it.lo);
  if(!c)issue('no bodyweight reps item without a harder variation found');else{const {it,v}=c,K=it.k+'#'+v;rep.push('reps item: '+it.opts[v].n+' '+it.lo+'–'+it.hi);
    topHist(k,it,v,1);let g=k.target(it,v);if(g.lad)issue('rung offered after the top only once');if(!g.top)issue('top not recognised');
    D.logs=[];topHist(k,it,v,2);g=k.target(it,v);if(g.lad!==1)issue('no rung 1 after the top twice: '+JSON.stringify(g));
    if(!/twice/.test(g.note||''))issue('note does not explain the rung: '+g.note);
    const seq=[];for(let r=1;r<=6;r++){D.logs=[];topHist(k,it,v,2);D.ex[K].lad=r-1||undefined;if(r===1)delete D.ex[K].lad;
      const gg=k.target(it,v);if(!gg.lad){seq.push('-');continue;}seq.push(gg.lad);const ok=k.ladTake(it,v);if(!ok)issue('ladTake refused rung '+gg.lad);
      if(D.ex[K].lad!==gg.lad||D.ex[K].r!==it.lo)issue('ladTake state: '+JSON.stringify(D.ex[K]));
      const g2=k.target(it,v);if(g2.r!==it.lo||!/New step/.test(g2.note))issue('after the rung the range does not start at the bottom: '+JSON.stringify(g2));
      if(!g2.ladC)issue('no cue for rung '+gg.lad);}
    if(seq.join(',')!=='1,2,3,4,5,-')issue('rung order: '+seq.join(','));
    // load rung: weight field, weight steps at the top
    D.logs=[];topHist(k,it,v,2);D.ex[K].lad=5;D.ex[K].w=5;if(!k.wOn(it,v))issue('load rung gives no weight field');
    const gw=k.target(it,v);if(!gw.wl||!(gw.w>5)||gw.r!==it.lo)issue('load rung at the top does not step the weight: '+JSON.stringify(gw));
    // UI: kg input, cue and button through a tap
    D.ex[K].w=0;D.ex[K].lad=2;D.logs=[];topHist(k,it,v,2);D.ex[K].lad=2;D.tab='train';k.day().pick=c.id;k.render();
    const bt=d.querySelector('[data-a=lad][data-id="'+c.key+'"]');if(!bt)issue('no "Next step" button in the session');else{
      if(!/Next step: 2 s pause/.test(bt.textContent))issue('button text: '+bt.textContent);bt.click();if(k.D().ex[K].lad!==3)issue('tap did not take the rung: '+JSON.stringify(k.D().ex[K]));}
    k.render();const cue=[...d.querySelectorAll('.ladc')].map(x=>x.textContent);if(!cue.some(t=>/2 s at the hardest point/.test(t)))issue('rung cue missing: '+cue.join(' | '));
    D.ex[K].lad=5;k.render();if(!d.querySelector('input[data-inp=w][data-id="'+c.key+'"]'))issue('no kg field on the load rung');
    // saveTrain keeps lad and logs the weight
    const dy=k.day();dy.fin={rpe:6};dy.inp[c.key]={s:[String(it.lo),String(it.lo)],w:'5'};dy.done[c.key]=true;k.saveTrain();
    if(k.D().ex[K].lad!==5||k.D().ex[K].w!==5)issue('saveTrain lost lad or weight: '+JSON.stringify(k.D().ex[K]));}}
// 2 holds in seconds skip the tempo rungs
{const {k}=boot();const D=setup(k);const L=items(k);const c=L.find(x=>!x.it.opts[x.v].w&&x.it.unit.indexOf('s')===0&&k.nextVar(x.it,x.v,'g')<0);
  if(!c)rep.push('no hold progression without a harder form in these sessions (skipped)');else{topHist(k,c.it,c.v,2);const g=k.target(c.it,c.v);if(g.lad!==4)issue('hold first rung should be 4 (rest): '+g.lad+' '+c.it.opts[c.v].n);rep.push('hold item: '+c.it.opts[c.v].n);}}
// 3 difficulty order: Next variation by ORD, gym-free forms, ends at the hardest
{const {k}=boot();setup(k);const it={k:'x_sp',unit:'s each side',lo:20,hi:40,opts:[{n:'Side plank, top leg raised',req:'',w:false},{n:'Side plank',req:'',w:false},{n:'Side plank on knees',req:'',w:false}],up:'',lv:null};
  const a=[2,1,0].map(v=>k.nextVar(it,v,'h'));if(a.join()!=='1,0,-1')issue('ORD next variation x_sp: '+a.join());
  if(!k.ORD.g_45||k.ORD.g_45.join()!=='2,1,0')issue('ORD g_45 missing');}
// 4 glute anchor weight field, old entries load
{const {k,d}=boot();const D=setup(k);D.emph='glutes';let gi=null;['KB','KC','KA'].some(id=>{const S=k.S(id,k.ctx(T0));S.blocks.forEach((b,bi0)=>{const bi=b.bi!=null?b.bi:bi0;b.items.forEach((it,ii)=>{if(it.k==='g_45'&&!gi)gi={id,it,key:id+'-'+bi+'-'+ii};});});return !!gi;});
  if(!gi)issue('glute anchor g_45 not in a glute session');else{const o=gi.it.opts[0];if(!o.w||o.n!=='45° back extension, glute-biased')issue('glute anchor has no weight field: '+JSON.stringify(o));
    D.ex['g_45#0']={r:15,w:0,d:'2026-11-12',hold:false,n:o.n,stall:0};const g=k.target(gi.it,0);if(g.w)issue('old entry without weight got one: '+g.w);
    D.tab='train';k.day().pick=gi.id;k.render();if(k.curVar(gi.it,'g')===0&&!d.querySelector('input[data-inp=w][data-id="'+gi.key+'"]'))issue('no kg field on the glute anchor');}}
// 5 holds at 3 × 20 s: harder form, not more seconds
{const {k,d}=boot();const D=setup(k);D.skills={hs:false,mu:false,ls:true,fl:false,pl:false};D.profile.tuck=36;D.profile.lsit=0;D.tab='train';
  let found=null;['SK','HO','KA','KB','CH'].some(id=>{k.day().pick=id;k.render();found=d.querySelector('[data-a=isoup]');return !!found;});
  if(!found)issue('no "Harder form" button for the tuck L-sit at 3 × 20 s');else{if(/goes up automatically/.test(found.closest('.ex').textContent))issue('still promises more seconds at the top');found.click();if(k.D().profile.lsit!==11)issue('Harder form did not switch to the L-sit: '+k.D().profile.lsit);}}
// 6 import: lad 1–5 only
{const {k}=boot();const c=k.cleanImport({v:3,ex:{'a#0':{r:5,w:0,d:'2026-11-10',n:'A',lad:3},'b#0':{r:5,n:'B',lad:6},'c#0':{r:5,n:'C',lad:-1},'e#0':{r:5,n:'E',lad:'x'},'f#0':{r:5,n:'F'}}});
  if(c.ex['a#0'].lad!==3)issue('valid lad lost');['b#0','c#0','e#0','f#0'].forEach(q=>{if(c.ex[q].lad!=null)issue('junk lad kept on '+q+': '+c.ex[q].lad);});}
// 7 26-week long runs: rungs taken, nobody stuck at the top
['Captain','Partner glutes','Runner'].forEach(pn=>{const {k}=boot();const p=PROF.find(x=>x.n===pn);const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:T0,short:false,fav:(p.fav||[]).slice()});k.today(T0);
  const top={};let mx=0,mxN='';longSim(k,182,T0,'prog',11,ev=>{if(ev.type!=='target')return;const {it,v,g}=ev,kk=it.k+'#'+v;
    if(!it.opts[v].w&&!g.wl&&g.top&&ev.nv<0&&!g.lad){const t=top[kk]||(top[kk]={from:ev.d});const w=(Date.parse(ev.d)-Date.parse(t.from))/6048e5;if(w>mx){mx=w;mxN=ev.name;}}else delete top[kk];});
  const lads=Object.keys(D.ex).filter(q=>D.ex[q].lad).map(q=>D.ex[q].n+' '+D.ex[q].lad);
  rep.push(pn+': '+lads.length+' exercises on a rung ('+lads.slice(0,4).join(', ')+'), longest at the top without an offer '+mx.toFixed(1)+' weeks'+(mxN?' ('+mxN+')':''));
  if(mx>12)issue(pn+': '+mxN+' '+mx.toFixed(1)+' weeks at the top without an offer');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
