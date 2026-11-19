// @name own-workout
// A-066 "+ Log own workout": a session put together freely from catalogue exercises with its sets, for today or a past
// day; log id "OW", counts fully for progression, records and the plan ahead.
// a) capture through the UI (Chronicle button → picker → sets → save): 3 exercises, one leg exercise with ≥ 6 sets →
//    entry id OW with the date, exs per exercise and lg 1; a future date is refused (no entry); adding the same exercise
//    again makes no second row (it jumps to the row); no save without a set.
// b) progression: an OW with clean sets above the target raises that exercise's target in the next planned session;
//    a weak OW lowers nothing (target and stored value unchanged).
// c) plan: an OW leg day today → tomorrow Today suggests no strength (no leg session), the week preview shows the OW day
//    as a leg session, the training week counts it (hist legW) and the 7-day set band of its patterns holds the OW sets.
// d) past entry: an OW 5 days ago with lower values than yesterday's entry leaves the current target unchanged; an OW
//    5 days ago with better values does not overwrite yesterday's newer value either ("last" = newest by date).
// e) data: backup round trip keeps the OW entries (ex, exs, vs, lg, name); an old backup without OW gives the same level,
//    records and XP; unknown catalogue keys in an OW entry import without a crash and every tab renders.
// Mutations: OW sets not into the progression → (b) red; lg not set → (c) red; "last" by time of entry instead of date →
// (d) red; OW dropped on import → (e) red; future date allowed → (a) red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const START='2026-09-21',DAYS=56;
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document,errs};}
function prof(html,n,seed,days){const z=boot(html),k=z.k,D=k.D(),p=PROF.find(x=>x.n===n);
  Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:[],loc:'g',onb:true,seenFocus:true,seenFav:true,favP:true,logs:[],ex:{},start:START,short:false,fav:[],never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);
  longSim(k,days||DAYS,START,'prog',seed,null);const td=addD(START,days||DAYS);k.today(td);D.tab='start';z.td=td;return z;}
const nPR=pr=>JSON.stringify(Object.keys(pr||{}).sort().map(q=>[q,pr[q].r||0,pr[q].w||0,pr[q].km||0,pr[q].min||0,pr[q].d||'']));
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
// drives the form like a user: rows = [[name,[sets],kg]]
function ui(z,o){const k=z.k,d=z.d,D=k.D();D.tab='verlauf';k.render();const ob=btn(d,'owopen');if(!ob)return 'no "+ Log own workout" button in the Chronicle';ob.click();
  if(D.tab!=='own'||!d.getElementById('owf'))return 'form did not open';
  for(const [n,sets,kg] of o.rows){btn(d,'owpick').click();const r=btn(d,'owx',b=>b.dataset.n===n);if(!r)return 'picker has no row '+n;r.click();
    const i=D._ow.ex.findIndex(x=>x.n===n);if(i<0)return 'row not added: '+n;
    while(D._ow.ex[i].s.length<sets.length)btn(d,'owset',b=>+b.dataset.i===i).click();
    while(D._ow.ex[i].s.length>sets.length)btn(d,'owsetrm',b=>+b.dataset.i===i).click();
    d.querySelectorAll('[data-owi="'+i+'"][data-ows]').forEach((e,j)=>{e.value=String(sets[j]);});
    const w=d.querySelector('[data-owi="'+i+'"][data-oww]');if(w)w.value=kg!=null?String(kg):'';}
  d.getElementById('ow_d').value=o.d;if(o.nm!=null)d.getElementById('ow_nm').value=o.nm;if(o.min!=null)d.getElementById('ow_min').value=String(o.min);
  if(o.rpe)btn(d,'owrpe',b=>+b.dataset.v===o.rpe).click();btn(d,'owsave').click();return '';}
// a catalogue exercise of the next planned session with the same store (key) and the shown variant
function planned(k,id,td,wt){const loc=k.LOC(),cat=k.favCatalog(),s=k.S(id,k.ctx(td));let f=null;
  s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(f||it.gone||it.f||it.iso||it.test)return;const v=k.curVar(it,loc);if(v<0)return;const n=it.opts[v].n,c=cat[n];
    if(c&&c.it.k===it.k&&c.v===v&&it.unit==='reps'&&(!wt||k.wOn(it,v)))f={it,v,n};});});return f;}
const canon=v=>Array.isArray(v)?'['+v.map(canon).join(',')+']':(v&&typeof v==='object'?'{'+Object.keys(v).sort().map(q=>JSON.stringify(q)+':'+canon(v[q])).join(',')+'}':JSON.stringify(v));
const sc=g=>(g.w||0)*1000+g.r;
const legEx=k=>{const cat=k.favCatalog();return Object.keys(cat).find(n=>{const c=cat[n];return k.itPat(c.it,c.v)==='legs'&&k.wOn(c.it,c.v);});};

function unitA(html){const bad=[];const z=prof(html,'Captain',3),k=z.k,D=k.D(),td=z.td,cat=k.favCatalog();
  const L=legEx(k),U=Object.keys(cat).find(n=>k.itPat(cat[n].it,cat[n].v)==='pull'),C=Object.keys(cat).find(n=>k.itPat(cat[n].it,cat[n].v)==='core');
  if(!L||!U||!C)return ['a: catalogue samples missing'];
  const n0=D.logs.length;
  /* future date refused */
  let e=ui(z,{d:addD(td,1),rows:[[U,[8,8,8],20]],rpe:6});if(e)return ['a: '+e];
  if(D.logs.length!==n0||D.logs.some(l=>l.id==='OW'))return ['a: a future date was logged'];
  if(!D._ow||!/future/.test(D._ow.err||''))bad.push('a: no message for a future date');
  /* no save without a set */
  D._ow.d=td;D._ow.ex.forEach(x=>x.s=x.s.map(()=>''));k.render();btn(z.d,'owsave').click();if(D.logs.length!==n0||!/at least one set/.test((D._ow||{}).err||''))bad.push('a: saved without a set');
  btn(z.d,'owcancel').click();
  /* the same exercise twice → one row */
  btn(z.d,'owopen').click();btn(z.d,'owpick').click();btn(z.d,'owx',b=>b.dataset.n===U).click();btn(z.d,'owpick').click();btn(z.d,'owx',b=>b.dataset.n===U).click();
  if(D._ow.ex.length!==1)bad.push('a: second add of the same exercise made '+D._ow.ex.length+' rows');
  if(D._ow.at!==0||!z.d.querySelector('#owr-0.on'))bad.push('a: second add did not jump to the row');
  btn(z.d,'owcancel').click();
  /* 3 exercises, one leg exercise with 6 sets */
  e=ui(z,{d:td,nm:'Garage session',rows:[[L,[8,8,8,8,8,8],40],[U,[8,8,8],20],[C,[10,10],0]],rpe:8,min:55});if(e)return ['a: '+e];
  const l=D.logs.find(x=>x.id==='OW');
  if(!l)bad.push('a: no OW entry');else{
    if(l.d!==td)bad.push('a: date '+l.d);if(l.t!=='Garage session')bad.push('a: name '+l.t);if(l.lg!==1)bad.push('a: lg '+l.lg);if(l.min!==55||l.rpe!==8)bad.push('a: min/rpe '+l.min+'/'+l.rpe);
    const ks=Object.keys(l.exs||{});if(ks.length!==3)bad.push('a: exs keys '+ks.length);
    const kl=cat[L].it.k+'#'+cat[L].v;if(!l.exs||!l.exs[kl]||l.exs[kl].length!==6)bad.push('a: leg sets not stored per set');
    if(!l.vs||l.vs.legs<6)bad.push('a: vs.legs '+(l.vs&&l.vs.legs));if(k.NAMES.OW!=='Own workout')bad.push('a: NAMES.OW');}
  if(D.tab!=='verlauf'||!/Garage session/.test(z.d.body.textContent))bad.push('a: Chronicle does not show the entry');
  /* default name */
  e=ui(z,{d:addD(td,-1),rows:[[U,[5],20]],rpe:6});const l2=D.logs.find(x=>x.id==='OW'&&x.d===addD(td,-1));if(!l2||l2.t!=='Own workout')bad.push('a: default name '+(l2&&l2.t));
  /* every theme shows the button */
  Object.keys(k.THEMES).forEach(th=>{D.theme=th;D.tab='verlauf';k.render();if(!btn(z.d,'owopen'))bad.push('a: no button in theme '+th);});D.theme='templar';
  D.tab='own';D._ow=null;k.render();
  if(z.errs.length)bad.push('a: JS errors '+z.errs.slice(0,2).join('; '));return bad;}

function unitB(html){const bad=[];const z=prof(html,'Captain',5),k=z.k,td=z.td,nx=addD(td,1);
  const f=planned(k,'KA',td,true)||planned(k,'KB',td,true);if(!f)return ['b: no weighted catalogue exercise in the plan'];
  const snap=JSON.stringify(k.D());const tgt=()=>{k.today(nx);const g=k.target(f.it,f.v);k.today(td);return g;};
  const g0=tgt(),K=f.it.k+'#'+f.v,st0=JSON.stringify(k.D().ex[K]||null);
  /* clean sets above the target */
  let e=ui(z,{d:td,rows:[[f.n,[g0.r+2,g0.r+2,g0.r+2],g0.w||20]],rpe:6});if(e)return ['b: '+e];
  const g1=tgt();if(!(sc(g1)>sc(g0)))bad.push('b: target did not rise after a clean OW ('+f.n+': '+JSON.stringify(g0)+' → '+JSON.stringify(g1)+')');
  const pr=k.D().pr[K];if(!pr||pr.d!==td)bad.push('b: record not taken from the OW');
  /* weak OW lowers nothing */
  k.setD(JSON.parse(snap));k.today(td);e=ui(z,{d:td,rows:[[f.n,[Math.max(1,g0.r-3),Math.max(1,g0.r-4)],g0.w||0]],rpe:8});if(e)return ['b: '+e];
  const g2=tgt();if(sc(g2)<sc(g0))bad.push('b: a weak OW lowered the target '+JSON.stringify(g0)+' → '+JSON.stringify(g2));
  if(JSON.stringify(k.D().ex[K]||null)!==st0)bad.push('b: a weak OW changed the stored value');
  if(z.errs.length)bad.push('b: JS errors '+z.errs.slice(0,2).join('; '));return bad;}

function unitC(html){const bad=[];let z=prof(html,'Partner lower',9,57),k=z.k,D=k.D();
  /* a day that is not the last of its training week, so tomorrow is in the same week */
  let td=z.td;while(Math.floor((Date.parse(td)-Date.parse(D.start))/864e5)%7===6||D.logs.some(l=>l.d===td)){td=addD(td,1);}k.today(td);
  const nx=addD(td,1),L=legEx(k),cat=k.favCatalog(),H=Object.keys(cat).find(n=>k.itPat(cat[n].it,cat[n].v)==='hinge');
  const legW0=k.hist(nx).legW,vs0=k.vs7(nx);
  const e=ui(z,{d:td,rows:[[L,[8,8,8,8],40],[H,[10,10,10],30]],rpe:8,min:60});if(e)return ['c: '+e];
  const l=D.logs.find(x=>x.id==='OW');if(!l)return ['c: no entry'];
  const r=k.recAll(nx,false)||{};k.today(nx);const r2=k.recAll(nx,false)||{};k.today(td);
  if(r2.btn==='train'&&{KA:1,KB:1,KC:1,CH:1,HO:1}[r2.id])bad.push('c: tomorrow Today suggests '+r2.id+' after an OW leg day');
  const legW1=k.hist(nx).legW;if(legW1!==legW0+1)bad.push('c: the training week counts '+legW1+' leg sessions (before '+legW0+')');
  k.WK.key='';const wp=k.weekPlan();if(!wp[0]||wp[0].id!=='OW'||!wp[0].leg)bad.push('c: week preview day 0 '+JSON.stringify(wp[0]&&{id:wp[0].id,leg:wp[0].leg}));
  const vs1=k.vs7(nx);if(vs1.legs-vs0.legs!==4||vs1.hinge-vs0.hinge!==3)bad.push('c: set band counts legs +'+(vs1.legs-vs0.legs)+', hinge +'+(vs1.hinge-vs0.hinge)+' (want +4, +3)');
  D.tab='start';k.render();if(!/Own/.test(z.d.querySelector('.wk')?z.d.querySelector('.wk').textContent:z.d.body.textContent))bad.push('c: week strip does not name the OW day');
  if(z.errs.length)bad.push('c: JS errors '+z.errs.slice(0,2).join('; '));return bad;}

function unitD(html){const bad=[];const z=prof(html,'Captain',7),k=z.k,td=z.td,D=k.D(),nx=addD(td,1);
  const f=planned(k,'KB',td,true)||planned(k,'KA',td,true);if(!f)return ['d: no weighted catalogue exercise in the plan'];const K=f.it.k+'#'+f.v;
  /* yesterday: a newer value */
  D.ex[K]={r:10,w:40,d:addD(td,-1),hold:false,n:f.n,stall:0,s:[10,10,10]};const tgt=()=>{k.today(nx);const g=k.target(f.it,f.v);k.today(td);return g;};const g0=tgt(),st0=JSON.stringify(D.ex[K]);
  /* 5 days ago, lower */
  let e=ui(z,{d:addD(td,-5),rows:[[f.n,[8,8,7],35]],rpe:6});if(e)return ['d: '+e];
  if(JSON.stringify(D.ex[K])!==st0||sc(tgt())!==sc(g0))bad.push('d: an older, lower OW changed the current value/target');
  /* 5 days ago, better: still no overwrite of the newer value */
  e=ui(z,{d:addD(td,-5),rows:[[f.n,[12,12,12],45]],rpe:6});if(e)return ['d: '+e];
  if(JSON.stringify(D.ex[K])!==st0)bad.push('d: an older OW overwrote yesterday\'s value: '+JSON.stringify(D.ex[K]));
  if(sc(tgt())!==sc(g0))bad.push('d: an older OW changed the current target');
  const ow=D.logs.filter(l=>l.id==='OW');if(ow.length!==2||ow.some(l=>l.d!==addD(td,-5)))bad.push('d: past entries not stored at their date');
  for(let i=1;i<D.logs.length;i++)if(D.logs[i].d<D.logs[i-1].d){bad.push('d: entries not sorted by date');break;}
  /* the prefill takes the newest value by date */
  const row=k.owRow(f.n,k.favCatalog());if(row.w!=='40'||row.s.join(',')!=='10,10,10')bad.push('d: prefill is not the newest value: '+JSON.stringify(row));
  if(z.errs.length)bad.push('d: JS errors '+z.errs.slice(0,2).join('; '));return bad;}

function unitE(html){const bad=[];const z=prof(html,'Captain',3),k=z.k,D=k.D(),td=z.td;
  const lv=(kk,E)=>[kk.xpTotal(),kk.lvUp(),kk.lvLo(),nPR(E.pr)].join('|');
  const old=JSON.parse(JSON.stringify(D)),st0=lv(k,D);
  /* old backup without OW: same level, records, XP */
  const y=boot(html);y.k.today(td);y.k.restore(JSON.stringify(old),'start');if(lv(y.k,y.k.D())!==st0)bad.push('e: old backup without OW: level/records/XP differ');
  const L=legEx(k);let e=ui(z,{d:td,nm:'Own legs',rows:[[L,[6,6,6,6,6,6],50]],rpe:8,min:50});if(e)return ['e: '+e];
  e=ui(z,{d:addD(td,-3),rows:[[L,[5,5],45]],rpe:6});const st1=lv(k,D),n=D.logs.length,ow=canon(D.logs.filter(l=>l.id==='OW'));
  const r=boot(html);r.k.today(td);r.k.restore(JSON.stringify(D),'start');const E=r.k.D();
  if(E.logs.length!==n)bad.push('e: entries '+E.logs.length+' of '+n);
  if(canon(E.logs.filter(l=>l.id==='OW'))!==ow)bad.push('e: OW entries changed in the round trip');
  if(lv(r.k,E)!==st1)bad.push('e: level/records/XP differ after the round trip');
  /* unknown catalogue keys */
  const bk=JSON.parse(JSON.stringify(D));bk.logs.push({d:td,id:'OW',t:'Old kit',rpe:6,min:40,vs:{pull:3,push:0,legs:0,hinge:0,core:0},vm:4,lg:0,ex:{'zz_gone#0':[8,20],'qq_old#3':[5,0]},exs:{'zz_gone#0':[8,8,8]}});bk.ex['zz_gone#0']={r:8,w:20,d:td,hold:false,n:'Gone exercise',stall:0};
  const u=boot(html);u.k.today(td);u.k.restore(JSON.stringify(bk),'start');const F=u.k.D();
  if(!F.logs.some(l=>l.t==='Old kit'))bad.push('e: entry with unknown keys dropped');
  ['start','train','run','kick','morgen','stand','verlauf','mehr','favs','other','own'].forEach(t=>{F.tab=t;try{u.k.render();}catch(x){bad.push('e: unknown keys, tab '+t+': '+x.message);}});
  try{u.k.WK.key='';u.k.weekPlan();u.k.vs7(td);u.k.patDates('@pull');}catch(x){bad.push('e: unknown keys break the plan: '+x.message);}
  [z,y,r,u].forEach(q=>{if(q.errs.length)bad.push('e: JS errors '+q.errs.slice(0,2).join('; '));});return bad;}

const U={a:unitA,b:unitB,c:unitC,d:unitD,e:unitE};
const MUT=[
  ['b OW sets not into the progression',h=>h.replace('if(pv&&pv.lad)e.lad=pv.lad;D.ex[K]=e;}','}'),unitB],
  ['c lg not set',h=>h.replace('lg:lgN>=6?1:0,rpe:o.rpe','lg:0,rpe:o.rpe'),unitC],
  ['d last stand by time of entry',h=>h.replace('if(!(pv&&pv.d&&pv.d>d)&&(','if(('),unitD],
  ['e OW dropped on import',h=>h.replace('/^[A-Z]{2}$/.test(l.id);});','/^[A-Z]{2}$/.test(l.id)&&l.id!=="OW";});'),unitE],
  ['a future date allowed',h=>h.replace('if(d>TODAY){o.err=','if(false){o.err='),unitA]];
const rep=[];
Object.keys(U).forEach(q=>{let r;try{r=U[q](HTML);}catch(e){r=[q+': exception '+e.message];}r.forEach(issue);rep.push('('+q+') '+(r.length?'red':'green'));});
MUT.forEach(([n,f,u])=>{const h=f(HTML);if(h===HTML){issue('mutation '+n+': pattern not found');return;}let r;try{r=u(h);}catch(e){r=['exception'];}if(!r.length)issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red ('+r[0]+')');});
console.log('--- t74 own-workout ---');rep.forEach(x=>console.log(x));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
