// @name duration-warmup
// A-010: estimated duration with a 90-min cap (V3), leg warm-up and warm-up sets (V4).
// Simulates 6 weeks for the three audit profiles with the real recommender and saveTrain(), then checks that no
// session is estimated over 90 min, warm-up comes first and cool-down last, leg days warm up the legs, heavy lifts
// show warm-up sets that never reach volume, records or XP, and old backups still load.
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const START='2026-09-21';// a Monday
const PROF=[
 {n:'Captain',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8},focus:'bal',emph:'bal',skills:{hs:1,mu:1},kick:[2,5]},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',emph:'lower',skills:{},kick:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},focus:'str',emph:'glutes',skills:{},kick:[]}
];
// Log a training session the way a user does it: every exercise done, target reps entered, weight 20 kg on first sight.
function doTrain(w,k,id){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const s=k.S(id,k.ctx(k.today()));const anc=[];
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,D.loc);if(v<0)return;const key=id+'-'+bi+'-'+ii;dy.done[key]=true;
    if(it.f||it.test)return;if(it.iso){return;}
    const g=k.target(it,v),n=b.rounds?k.rounds(b,k.ctx(k.today()),id):(parseInt(it.sets,10)||1);
    dy.inp[key]={s:Array(n).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};
    if(it.anc)anc.push({k:it.k,v,n:it.opts[v].n});});});
  k.saveTrain();return anc;}

const report=[];const GYMS=['KA','KB','KC','CH','SK','DL','TE'];
// Add a favourites-heavy variant of the captain so the cap really has to trim.
PROF.push({n:'Captain, 6 favourites',prof:PROF[0].prof,focus:'bal',emph:'core',skills:{hs:1,mu:1},kick:[2,5],fav:['Cable kickbacks','Ab wheel rollouts','Dumbbell curls','Frog pumps','Side plank','Banded hip abduction']});
PROF.forEach(p=>{const {w,k,errs}=boot();const D=k.D();
  Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  D.kickDays=p.kick;D.loc='g';D.onb=true;D.seenFocus=true;D.seenFav=true;D.logs=[];D.start=START;D.short=false;D.fav=p.fav||[];
  const line=[];
  for(let i=0;i<42;i++){const s=addD(START,i);k.today(s);const r=k.recAll(s,false);
    if(r.btn==='kick'){D.logs.push({d:s,id:'KI',t:'KI',rpe:6});continue;}
    if(r.btn==='run'){D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:32});continue;}
    const c=k.ctx(s),S=k.S(r.id,c);line.push(r.id+' '+S.min+(S.cut.length?'('+S.cut.join('/')+')':''));
    if(S.min>k.DURMAX)issue(p.n+' '+s+' '+r.id+' estimated '+S.min+' min');
    if(GYMS.includes(r.id)){if(!S.blocks[0].warm)issue(p.n+' '+s+' '+r.id+': warm-up not first');if(!S.blocks[S.blocks.length-1].cool)issue(p.n+' '+s+' '+r.id+': cool-down not last');}
    if(k.legDay(r.id)){const wu=S.blocks[0].items.map(it=>it.opts[0].n).join();if(!/Ankle rocks/.test(wu)||!/Leg swings/.test(wu))issue(p.n+' '+r.id+': no leg warm-up');}
    else if(S.blocks[0].warm&&/Ankle rocks/.test(S.blocks[0].items.map(it=>it.opts[0].n).join()))issue(p.n+' '+r.id+': leg warm-up on a non-leg day');
    if(S.blocks.some(b=>b.items.some(it=>it.anc))&&!S.blocks.some(b=>b.lowb&&b.items.some(it=>it.anc)))issue(p.n+' '+r.id+': anchor lost');
    doTrain(w,k,r.id);}
  if(errs.length)issue(p.n+': JS errors '+errs.join('; '));
  report.push(p.n+': '+line.join(' · '));
});
// Warm-up sets: derived loads, display only (no inputs), statistics unchanged
{const {w,k,errs}=boot();const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',emph:'bal',focus:'bal',start:'2026-11-02',logs:[]});k.today('2026-11-16');
 D.ex['c_sq#0']={r:8,w:60,d:'2026-11-10',n:'Barbell back squat'};
 const S=k.S('KC',k.ctx(k.today())),it=S.blocks.flatMap(b=>b.items).find(x=>x.k==='c_sq');const g=k.target(it,0),wu=k.wuSets(it,0);
 if(!(g.w===60&&g.r===9))issue('squat target '+JSON.stringify(g));
 if(JSON.stringify(wu)!==JSON.stringify([[30,8],[42.5,5],[50,2]]))issue('warm-up sets 60 kg: '+JSON.stringify(wu));
 if(JSON.stringify(k.wuSets(it,3))!=='[["",5]]')issue('bodyweight variant warm-up '+JSON.stringify(k.wuSets(it,3)));
 const calf=S.blocks.flatMap(b=>b.items).find(x=>x.k==='c_calf');if(k.wuSets(calf,0))issue('calf raises got warm-up sets');
 D.tab='train';k.day().pick='KC';k.render();const doc=w.document,wus=[...doc.querySelectorAll('.wus')];
 if(!wus.length)issue('no warm-up set line rendered');if(wus.some(x=>x.querySelector('input')))issue('warm-up sets have inputs');
 if(!/30 kg × 8 · 42\.5 kg × 5 · 50 kg × 2/.test(doc.getElementById('app').textContent))issue('warm-up set text missing');
 if(!doc.querySelector('.dur')||!/≈ \d+ min/.test(doc.querySelector('.dur').textContent))issue('no duration in the header');
 // log the session: working sets only reach D.ex, D.pr and the log
 const xp0=k.D().logs.length;doTrain(w,k,'KC');const L=D.logs[D.logs.length-1];
 if(D.ex['c_sq#0'].r!==9||D.ex['c_sq#0'].w!==60)issue('squat logged '+JSON.stringify(D.ex['c_sq#0']));
 if(D.pr['c_sq#0'].r!==9)issue('record from warm-up reps '+JSON.stringify(D.pr['c_sq#0']));
 if(L.ex['c_sq#0'][0]!==9)issue('log volume '+JSON.stringify(L.ex['c_sq#0']));
 if(Object.keys(L).some(x=>/wu|warm/i.test(x)))issue('warm-up data in the log');
 if(D.logs.length!==xp0+1)issue('log count');
 // plain theme wording
 D.theme='plain';D.tab='train';D.days={};k.day().pick='KC';k.render();const lb=doc.querySelector('.wub');if(!lb||lb.textContent!=='Warm-up sets')issue('plain warm-up label '+(lb&&lb.textContent));
 // under 45 min: hint, no padding
 D.short=true;D.tab='train';D.days={};k.day().pick='KB';k.render();const S2=k.S('KB',k.ctx(k.today()));
 if(S2.min<45&&!/Nothing gets padded/.test(doc.getElementById('app').textContent))issue('no short-session hint at '+S2.min+' min');
 if(errs.length)issue('warm-up sets: JS errors '+errs.join('; '));
}
// Old backup without duration data loads and renders
{const old={v:3,start:'2026-09-07',onb:true,emph:'lower',fav:['Hip thrust machine'],profile:{pull:4,dips:6,push:15},logs:[{d:'2026-11-09',id:'KC',t:'x',rpe:6},{d:'2026-11-11',id:'KA',t:'x',rpe:6}],days:{},ex:{'g_ht#1':{r:10,w:30,d:'2026-11-09',n:'Hip thrust machine'}},vr:{},pain:{},home:{}};
 const {w,k,errs}=boot();k.today('2026-11-16');k.restore(JSON.stringify(old));const D=k.D();D.loc='g';
 ['KA','KB','KC'].forEach(id=>{const S=k.S(id,k.ctx(k.today()));if(!(S.min>0&&S.min<=90))issue('old backup '+id+' min '+S.min);});
 D.tab='train';k.day().pick='KA';k.render();if(!w.document.querySelector('.dur'))issue('old backup: no duration');
 if(errs.length)issue('old backup: JS errors '+errs.join('; '));}
console.log(report.join('\n'));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
