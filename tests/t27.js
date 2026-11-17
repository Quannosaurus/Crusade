// @name week-preview
// A-015: the week preview on the Today page. Simulates 6 weeks for the three audit profiles with the real recommender:
// the preview for today equals today's recommendation, kickboxing days and the day-before rule hold, legs ≥ 2 per week
// are visible, the forecast for tomorrow comes true when the plan is followed, and building the preview changes no state.
// Then Playwright (390×844): strip with 7 days, tap shows the detail, kz_app_v3 identical before/after, render time,
// EMOM/AMRAP explanations, favourites unchanged, screenshots.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const START='2026-09-21';
const PROF=[
 {n:'Captain',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8},focus:'bal',emph:'bal',skills:{hs:1,mu:1},kick:[2,5]},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',emph:'lower',skills:{},kick:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},focus:'str',emph:'glutes',skills:{},kick:[3]}
];
function doTrain(k,id){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(k.today()),s=k.S(id,c);
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,D.loc);if(v<0)return;const key=id+'-'+bi+'-'+ii;dy.done[key]=true;
    if(it.f||it.test||it.iso)return;const g=k.target(it,v),n=b.rounds?k.rounds(b,c,id):(parseInt(it.sets,10)||1);
    dy.inp[key]={s:Array(n).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};});});
  k.saveTrain();}
let hits=0,tot=0;const mism=[];
PROF.forEach(p=>{const {w,k,errs}=boot();const D=k.D();
  Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  D.kickDays=p.kick;D.loc='g';D.onb=true;D.seenFocus=true;D.seenFav=true;D.logs=[];D.start=START;D.short=false;
  let fore=null;
  for(let i=0;i<42;i++){const s=addD(START,i);k.today(s);
    k.render();w.localStorage.setItem('kz_app_v3',JSON.stringify(k.D()));
    const ls0=w.localStorage.getItem('kz_app_v3'),st0=JSON.stringify(k.D()),nm0=JSON.stringify(k.NAMES);
    k.WK.plan=null;const t0=Date.now(),plan=k.weekPlan(),ms=Date.now()-t0;
    if(ms>250)issue(p.n+' '+s+': preview took '+ms+' ms');
    const html2=k.weekHTML();
    if(w.localStorage.getItem('kz_app_v3')!==ls0)issue(p.n+' '+s+': kz_app_v3 changed by the preview');
    if(JSON.stringify(k.D())!==st0)issue(p.n+' '+s+': in-memory state changed by the preview');
    if(JSON.stringify(k.NAMES)!==nm0)issue(p.n+' '+s+': session names changed by the preview');
    if(k.today()!==s)issue(p.n+' '+s+': TODAY not restored');
    if(plan.length!==7||plan[0].d!==s||plan[6].d!==addD(s,6))issue(p.n+' '+s+': preview does not cover the next 7 days');
    const r=k.recAll(s,false),exp=r.btn==='train'?k.recTrain(s,'g',false).id:r.id;
    if(plan[0].id!==exp)issue(p.n+' '+s+': preview today '+plan[0].id+' ≠ recommendation '+exp);
    if(fore){tot++;if(fore===exp)hits++;else mism.push(p.n+' '+s+': forecast '+fore+', actual '+exp);}
    fore=plan[1].id;
    plan.forEach((e,j)=>{if(e.kick&&e.id!=='KI')issue(p.n+' '+e.d+': kickboxing day shows '+e.id);
      if(j<6&&plan[j+1].kick&&['KC','RH','RI'].indexOf(e.id)>=0)issue(p.n+' '+e.d+': '+e.id+' the day before kickboxing');});
    const legs=plan.filter(e=>e.leg).length;
    if(!plan.some(e=>e.dl)&&legs<2)issue(p.n+' '+s+': only '+legs+' leg session(s) in the preview: '+plan.map(e=>e.id+(e.leg?'*':'')).join(' '));
    if(html2.indexOf('Legs '+legs+'×')<0)issue(p.n+' '+s+': leg count not shown');
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});
    else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:D.runKm,min:Math.round(D.runKm*6.5)});
    else doTrain(k,r.id);
    // after logging, today's cell shows the logged session as done
    k.WK.plan=null;const pl2=k.weekPlan();if(!pl2[0].done)issue(p.n+' '+s+': logged session not marked done in the preview');}
  if(errs.length)issue(p.n+': errors '+errs.join('; '));});
if(tot&&hits<tot)mism.forEach(issue);
console.log('forecast for tomorrow came true: '+hits+'/'+tot);

// EMOM / AMRAP explanations (JSDOM)
{const {w,k}=boot();const D=k.D();const T=k.today();
  Object.assign(D.profile,PROF[0].prof);D.onb=true;D.seenFocus=true;D.seenFav=true;D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};D.loc='g';
  D.start=addD(T,-56);D.logs=[];for(let i=8;i>=1;i--)D.logs.push({d:addD(T,-7*i+1),id:'RS',t:'RS',rpe:4});
  D.fav=['Push-Ups AMRAP 10 min'];const fav0=JSON.stringify(D.fav);
  if(k.ctx(T).phase!==2)issue('setup: phase 2 expected for the AMRAP check');
  const dy=k.day();dy.pick='KB';D.tab='train';k.render();let a=w.document.getElementById('app').innerHTML;
  if(a.indexOf('Push-Ups AMRAP 10 min')<0)issue('AMRAP exercise missing in Strength B phase 2');
  else{if(a.indexOf('as many reps as possible in the time')<0)issue('AMRAP explanation missing');
    if(!/fvs[^>]*>★ <\/span>Push-Ups AMRAP 10 min/.test(a))issue('AMRAP favourite no longer recognised');}
  dy.pick='CH';k.render();a=w.document.getElementById('app').innerHTML;
  if(a.indexOf('Muscle-Up EMOM')<0)issue('EMOM block missing in the skill trial');
  else if(a.indexOf('every minute on the minute: one set at the start of each minute, rest for the remainder')<0)issue('EMOM explanation missing');
  if(JSON.stringify(D.fav)!==fav0)issue('favourites changed');
  if(k.termNote('Push-ups 3 × 10')!=='')issue('explanation on an item without EMOM/AMRAP');}

// Playwright: real phone viewport
(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
  const guard=require('./netguard');const b=await chromium.launch();const errs=[];
  const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
  await p.goto('file://'+R+'/.build/index.html');
  await p.evaluate(({prof})=>{const k=window.__kz,D=k.D(),T=k.today(),a=(s,n)=>{const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
    Object.assign(D.profile,prof);D.onb=true;D.seenFocus=true;D.seenFav=true;D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};D.kickDays=[2,5];D.loc='g';D.tab='start';
    D.start=a(T,-20);D.logs=[{d:a(T,-6),id:'KA',t:'KA',rpe:6,lg:1},{d:a(T,-4),id:'KB',t:'KB',rpe:6,lg:0},{d:a(T,-2),id:'RE',t:'RE',rpe:6,km:6,min:38}];
    D.bkTs=Date.now();D.bkAt=D.logs.length;localStorage.setItem('kz_app_v3',JSON.stringify(D));},{prof:PROF[0].prof});
  await p.reload();await p.waitForTimeout(150);
  const t=await p.evaluate(()=>{const k=window.__kz;k.WK.plan=null;const t0=performance.now();k.render();const t1=performance.now();k.render();return [t1-t0,performance.now()-t1];});
  console.log('Today page render: '+t[0].toFixed(1)+' ms (preview computed), '+t[1].toFixed(1)+' ms (cached)');
  if(t[0]>150)issue('Today page render with preview took '+t[0].toFixed(0)+' ms');
  const ls0=await p.evaluate(()=>localStorage.getItem('kz_app_v3'));
  const n=await p.locator('.wkd').count();if(n!==7)issue('preview strip shows '+n+' days');
  const today=await p.evaluate(()=>{const k=window.__kz,r=k.recAll(k.today(),false);return k.NAMES[r.btn==='train'?k.recTrain(k.today(),'g',false).id:r.id];});
  const lab0=await p.locator('.wkd').first().getAttribute('aria-label');if(lab0.indexOf(today)<0)issue('today cell "'+lab0+'" ≠ recommendation '+today);
  const rn=await p.locator('.big.rec .rn').first().textContent().catch(()=>'');if(rn&&today.split(':')[0]!==rn)issue('recommended card '+rn+' ≠ '+today);/* A-029 U2: the card names the session short (before the colon) plus its length */
  if(!(await p.locator('.wkf').textContent()).includes('Adapts to what you actually train'))issue('adapt hint missing');
  await p.locator('.wkd').nth(1).click();await p.waitForTimeout(80);
  const x=await p.locator('.wkx').textContent().catch(()=>'');if(!x)issue('tap on a day shows no detail');
  await p.locator('.wk').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t27-week.png'});
  const kc=await p.evaluate(()=>{const P=window.__kz.weekPlan();const i=P.findIndex(e=>/^(KA|KB|KC|CH)$/.test(e.id));return i;});
  if(kc>=0){if(kc!==1)await p.locator('.wkd').nth(kc).click();await p.waitForTimeout(60);const x2=await p.locator('.wkx').textContent();if(!/≈ \d+ min/.test(x2))issue('strength day detail without duration: '+x2);}
  await p.locator('.wkd').nth(kc>=0?kc:1).click();await p.waitForTimeout(60);
  if(await p.locator('.wkx').count())issue('second tap does not close the detail');
  const ls1=await p.evaluate(()=>localStorage.getItem('kz_app_v3'));if(ls1!==ls0)issue('kz_app_v3 changed by opening/tapping the preview');
  if(errs.length)issue('page errors: '+errs.join('; '));
  await b.close();done();})();
function done(){console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.slice(0,30).forEach(m=>console.log(' - '+m));}
