// @name session-design
// A-013: sessions are designed for 60–90 min instead of being trimmed afterwards.
// Simulates 6 weeks for the three audit profiles plus the captain with 6 favourites (real recommender + saveTrain) and
// checks that every strength session (Limited time, deload, test and recovery excepted) is estimated at 60–90 min with
// warm-up, cool-down and anchor in place, Shoulder stability at least in its compact form on Strength A, at least two
// favourites on Strength C while pure accessory work is present, no trim list anywhere, the duration still in the header,
// the leg block surviving Limited time when the week needs it (and allowed to go when it does not), and old backups.
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const START='2026-09-21';// a Monday
const CAP={pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8};
const PROF=[
 {n:'Captain',prof:CAP,focus:'bal',emph:'bal',skills:{hs:1,mu:1},kick:[2,5]},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',emph:'lower',skills:{},kick:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},focus:'str',emph:'glutes',skills:{},kick:[]},
 {n:'Captain, 6 favourites',prof:CAP,focus:'bal',emph:'core',skills:{hs:1,mu:1},kick:[2,5],fav:['Cable kickbacks','Ab wheel rollouts','Dumbbell curls','Frog pumps','Side plank','Banded hip abduction']}
];
const BAND=['KA','KB','KC','CH','HO'];
function setup(k,p){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  D.kickDays=p.kick;D.loc='g';D.onb=true;D.seenFocus=true;D.seenFav=true;D.logs=[];D.start=START;D.short=false;D.fav=p.fav||[];return D;}
function doTrain(k,id){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(k.today()),s=k.S(id,c);
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,D.loc);if(v<0)return;const key=id+'-'+bi+'-'+ii;dy.done[key]=true;
    if(it.f||it.test||it.iso)return;const g=k.target(it,v),n=b.rounds?k.rounds(b,c,id):(parseInt(it.sets,10)||1);
    dy.inp[key]={s:Array(n).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};});});
  k.saveTrain();}
const report=[];let checked=0;
PROF.forEach(p=>{const {w,k,errs}=boot();const D=setup(k,p);const line=[];
  for(let i=0;i<42;i++){const s=addD(START,i);k.today(s);const r=k.recAll(s,false);
    if(r.btn==='kick'){D.logs.push({d:s,id:'KI',t:'KI',rpe:6});continue;}
    if(r.btn==='run'){D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:32});continue;}
    const c=k.ctx(s),S=k.S(r.id,c),tag=p.n+' '+s+' '+r.id;line.push(r.id+' '+S.min);
    if('cut' in S)issue(tag+': trim list present');
    if(BAND.includes(r.id)&&c.cyc!==6){checked++;
      if(S.min<60||S.min>90)issue(tag+': estimated '+S.min+' min, outside 60–90');
      if(!S.blocks[0].warm)issue(tag+': warm-up not first');if(!S.blocks[S.blocks.length-1].cool)issue(tag+': cool-down not last');
      if((p.emph==='lower'||p.emph==='glutes')&&['KA','KB','KC'].includes(r.id)&&!S.blocks.some(b=>b.lowb&&b.items.some(it=>it.anc)))issue(tag+': anchor missing');
      if(r.id==='KA'&&!S.blocks.some(b=>b.sh&&b.items.length>=2))issue(tag+': no Shoulder stability');
      if(r.id==='KC'&&D.fav.length>=2){const fb=S.blocks.find(b=>b.fav),acc=S.blocks.some(b=>b.acc);if(acc&&(!fb||fb.items.length<2))issue(tag+': fewer than 2 favourites while accessory work stays');
        if(!fb||fb.items.length<2)issue(tag+': fewer than 2 favourites on Strength C');}
      if(c.legB&&['KA','KB','CH'].includes(r.id)&&!S.blocks.some(b=>b.legs))issue(tag+': needed leg block missing');}
    doTrain(k,r.id);}
  if(errs.length)issue(p.n+': JS errors '+errs.join('; '));
  report.push(p.n+': '+line.join(' · '));});
if(checked<40)issue('only '+checked+' strength sessions checked');
// Header: duration shown, no trim wording
{const {w,k,errs}=boot();const D=setup(k,PROF[3]);k.today('2026-09-21');D.tab='train';k.day().pick='KA';k.render();
 const dur=w.document.querySelector('.dur'),txt=w.document.getElementById('app').textContent;
 if(!dur||!/≈ \d+ min/.test(dur.textContent))issue('header: no duration');if(/trimmed|to stay within/i.test(txt))issue('header: trim wording still shown');
 if(errs.length)issue('header: JS errors '+errs.join('; '));}
// Limited time: a week with only one leg session keeps the leg block; with two it may go
function shortCase(logs,today){const {w,k,errs}=boot();const D=setup(k,PROF[0]);D.start='2026-11-09';D.logs=logs;D.short=true;k.today(today);
  const c=k.ctx(today),S=k.S('KA',c);D.tab='train';k.day().pick='KA';k.render();const txt=w.document.getElementById('app').textContent;
  return {w,k,D,c,S,txt,errs};}
{const L1=[{d:'2026-11-10',id:'KC',t:'x',rpe:6,lg:1}];const r=shortCase(L1,'2026-11-12');const lb=r.S.blocks.find(b=>b.legs);
 if(!r.c.legB)issue('limited time 1 leg session: leg block not needed?');
 if(!lb||lb.p!==1)issue('limited time 1 leg session: leg block dropped');
 if(!/Compact legs/.test(r.txt))issue('limited time 1 leg session: leg block not rendered');
 const ls=r.k.legSets(r.S,r.c,'KA');if(ls<6)issue('limited time: legSets '+ls);
 // the upper-body round goes instead: compare with the same day without the leg block
 const full=shortCase([{d:'2026-11-10',id:'KC',t:'x',rpe:6,lg:1},{d:'2026-11-11',id:'KB',t:'x',rpe:6,lg:1}],'2026-11-12');
 const rd=s=>s.blocks.filter(b=>b.p===1&&b.rounds&&!b.legs&&!b.lowb).map(b=>b.rounds[0]).reduce((a,b)=>a+b,0);
 if(!(rd(r.S)<rd(full.S)))issue('limited time: no upper-body round traded for the leg block ('+rd(r.S)+' vs '+rd(full.S)+')');
 if(r.S.min!==r.k.estMin(r.S,r.c,'KA'))issue('limited time: estimate inconsistent');
 // log carries the leg flag
 const dy=r.k.day();dy.fin={rpe:6};r.S.blocks.forEach((b,bi)=>{if(r.D.short&&b.p>1)return;b.items.forEach((it,ii)=>{dy.done['KA-'+bi+'-'+ii]=true;});});r.k.saveTrain();
 const lg=r.D.logs[r.D.logs.length-1];if(lg.id!=='KA'||lg.lg!==1)issue('limited time: log without leg flag '+JSON.stringify({id:lg.id,lg:lg.lg}));
 if(full.c.legB)issue('limited time 2 leg sessions: leg block still marked as needed');
 if(full.S.blocks.some(b=>b.legs&&b.p===1))issue('limited time 2 leg sessions: leg block forced');
 [r,full].forEach(x=>{if(x.errs.length)issue('limited time: JS errors '+x.errs.join('; '));});}
// Old backups load and design fine
{const old={v:3,start:'2026-09-07',onb:true,emph:'glutes',fav:['Hip thrust machine','Cable kickbacks'],profile:{pull:4,dips:6,push:15},logs:[{d:'2026-11-09',id:'KC',t:'x',rpe:6},{d:'2026-11-11',id:'KA',t:'x',rpe:6,lg:1}],days:{},ex:{},vr:{},pain:{},home:{}};
 const {w,k,errs}=boot();k.today('2026-11-16');k.restore(JSON.stringify(old));const D=k.D();D.loc='g';
 ['KA','KB','KC'].forEach(id=>{const S=k.S(id,k.ctx(k.today()));if(!(S.min>0&&S.min<=90))issue('old backup '+id+' min '+S.min);});
 D.tab='train';k.day().pick='KC';k.render();if(!w.document.querySelector('.dur'))issue('old backup: no duration');
 if(errs.length)issue('old backup: JS errors '+errs.join('; '));}
console.log(report.join('\n'));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
