// @name skill-trial
// P-3 Skill Trial: back for the lower/glute emphasis every 14 ± 2 days in a Strength A/B slot (never Strength C, KC every
// training week, ≥ 2 leg sessions per week), for the captain it keeps its Strength C slot (≥ 2 in 8 weeks); the week preview shows it on the day it
// comes. Content: test items for the goal and the active skills (pull-ups always), a lower-body test (anchor reps at the
// working weight, tv.lb) for lower/glutes, goal anchor for kg goals. Values go into the log's tv and the profile; clean
// sets in training raise the profile but never lower it, level-up toast; old CH logs stay valid; doctrine text 14 days;
// Playwright 390×844 screenshots of the Skill Trial.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD,doTrain}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s)};}
const START='2026-09-21';const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:start||START,short:false,fav:(p.fav||[]).slice()});k.today(start||START);return D;}
const names=(k,s,b)=>b.items.map(it=>it.opts[Math.max(0,k.curVar(it,k.LOC()))].n);
// 1 eight-week simulations: rhythm, KC weekly, legs, week preview
['Partner lower','Partner glutes','Captain'].forEach(pn=>{const {k,errs}=boot(),D=setup(k,prof(pn));const chD=[],wk=[],planned={};
  sim(k,56,START,(r,s)=>{const i=Math.round((Date.parse(s)-Date.parse(START))/864e5),w=Math.floor(i/7),x=wk[w]||(wk[w]={kc:0,legs:0,dl:false,ids:[]});
    if(k.ctx(s).cyc===6)x.dl=true;x.ids.push(r.id);if(r.id==='KC')x.kc++;if(r.id==='CH'){chD.push(s);
      if(r.s&&!r.s.blocks.some(b=>b.trial&&b.items.length))issue(pn+': Skill Trial on '+s+' without test items');
      if(planned[s]!==undefined&&planned[s]!=='CH')issue(pn+': week preview of the day before showed '+planned[s]+' for the Skill Trial on '+s);}
    const l=k.D().logs[k.D().logs.length-1];if(l&&l.d===s&&k.legLog(l))x.legs++;
    k.today(addD(s,1));k.WK.key='';const pl=k.weekPlan();planned[addD(s,1)]=pl[0].id;k.today(s);});
  if(chD.length<(pn==='Captain'?2:3))issue(pn+': Skill Trial only '+chD.length+'× in 8 weeks ('+chD.join(',')+')');
  for(let j=1;j<chD.length;j++){const g0=Math.round((Date.parse(chD[j])-Date.parse(chD[j-1]))/864e5);let g=g0;for(let q=1;q<g;q++)if(k.ctx(addD(chD[j-1],q)).cyc===6)g--;/* deload days do not count */if(pn!=='Captain'&&(g<12||g>16)&&(g0<12||g0>16))issue(pn+': Skill Trial gap '+g+' days ('+chD[j-1]+' → '+chD[j]+')');}
  wk.forEach((x,i)=>{if(!x.dl&&!x.kc&&pn!=='Captain')issue(pn+': week '+(i+1)+' without Strength C');if(!x.dl&&x.legs<2)issue(pn+': week '+(i+1)+' only '+x.legs+' leg sessions');});
  if(errs.length)issue(pn+' JS errors: '+errs.join('; '));
  rep.push(pn+': Skill Trial '+chD.join(', ')+'\n    '+wk.map((x,i)=>'W'+(i+1)+(x.dl?'(DL)':'')+' ['+x.ids.join(' ')+']').join('\n    '));});
// 2 content: goal and skills, lower-body test, kg goal anchor
{const {k}=boot(),D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');const c=k.ctx('2026-11-16');
 const tr=()=>k.S('CH',c).blocks.find(b=>b.trial),tk=()=>(tr()?tr().items:[]).map(it=>it.test);
 ['pull','expl','mu','hsw','hsf'].forEach(t=>{if(!tk().includes(t))issue('captain trial misses test '+t+': '+tk());});
 k.setGoal('dips');if(!tk().includes('dips'))issue('goal dips: no dips test');k.setGoal('ls');if(!tk().some(t=>t==='tuck'||t==='lsit'))issue('goal L-sit: no L-sit test');
 k.setGoal('sq');if(!k.S('CH',c).blocks.some(b=>b.gx))issue('kg goal: no goal anchor in the Skill Trial');k.setGoal('none');
 D.skills={hs:false,mu:false,ls:false,fl:true,pl:false};if(!k.S('CH',c).blocks.some(b=>b.skill==='fl'||/Front lever/i.test(b.name)))issue('front lever skill: no stage work in the Skill Trial');}
['Partner lower','Partner glutes'].forEach(pn=>{const {k}=boot(),D=setup(k,prof(pn),'2026-10-05');k.today('2026-11-16');const c=k.ctx('2026-11-16');
 D.ex['g_ht#0']={r:10,w:40,d:'2026-11-12',n:'Barbell hip thrust'};const s=k.S('CH',c),tb=s.blocks.find(b=>b.trial),lb=tb&&tb.items.find(it=>it.test==='lb');
 if(!lb||lb.opts[0].n!=='Barbell hip thrust'||lb.lw!==40)issue(pn+': lower-body test '+JSON.stringify(lb&&{n:lb.opts[0].n,w:lb.lw}));
 if(!s.blocks.some(b=>b.lowb))issue(pn+': no emphasis block in the Skill Trial');if(s.min>90||s.min<60)issue(pn+': Skill Trial '+s.min+' min');
 const all=[];s.blocks.forEach(b=>{if(!b.warm&&!b.cool)names(k,s,b).forEach(n=>all.push(n));});if(all.filter(n=>n==='Barbell hip thrust').length>1)issue(pn+': hip thrust twice');});
// 3 values: tv and profile from the Skill Trial, re-rating from logs only upward, level toast, old CH logs
{const z=boot(),k=z.k,D=setup(k,prof('Partner lower'),'2026-10-05');k.today('2026-11-16');D.ex['g_ht#0']={r:10,w:40,d:'2026-11-12',n:'Barbell hip thrust'};
 const dy=k.day();dy.pick='CH';dy.fin={rpe:6};const s=k.S('CH',k.ctx(k.today()));
 s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(!it.test)return;dy.inp['CH-'+bi+'-'+ii]={s:[it.test==='lb'?'14':'3']};}));const pr0=D.profile.pull;
 k.saveTrain();const l=D.logs[D.logs.length-1];if(!l||l.id!=='CH'||!l.tv||l.tv.pull!==3||l.tv.lb!==14)issue('trial values not in tv '+JSON.stringify(l&&l.tv));
 if(D.profile.pull!==3)issue('trial pull not in profile ('+pr0+' → '+D.profile.pull+')');if(D.profile.lb!=null)issue('lower-body test leaked into the profile');
 D.tab='verlauf';k.render();if(z.errs.length)issue('trial JS errors '+z.errs.join('; '));}
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');Object.assign(D.profile,{pull:4,dips:10,mu:0});k.setGoal('pull');D.goal.v=30;D.vr['g|gl_pull']=0;
 const logKA=reps=>{const dy=k.day();dy.pick='KA';dy.fin={rpe:6};const s=k.S('KA',k.ctx(k.today()));s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(it.gx)dy.inp['KA-'+bi+'-'+ii]={s:[String(reps),String(reps)]};}));k.saveTrain();};
 if(k.lvl()!==0)issue('setup level');logKA(3);if(D.profile.pull!==4)issue('log lowered the profile: '+D.profile.pull);
 k.today('2026-11-18');logKA(6);if(D.profile.pull!==6)issue('log did not raise the profile: '+D.profile.pull);
 const t=(z.$('.toast')||{}).textContent||'';if(!/Level up: Intermediate/.test(t))issue('no level-up toast: '+t);
 const old=JSON.parse(k.bkJSON());old.logs.push({d:'2026-10-01',id:'CH',t:'Skill Trial',rpe:8});old.logs.sort((a,b)=>a.d<b.d?-1:1);
 const y=boot();y.k.today('2026-11-18');if(!y.k.restore(JSON.stringify(old)))issue('backup with an old CH log rejected');else{const E=y.k.D();if(!E.logs.some(l=>l.id==='CH'&&l.d==='2026-10-01'))issue('old CH log lost');
   ['verlauf','stand','start'].forEach(t=>{E.tab=t;y.k.render();});if(y.errs.length)issue('old CH log JS errors '+y.errs.join('; '));if(!(y.k.hist('2026-11-18').CH>40))issue('old CH log not counted');}}
// 4 doctrine text
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));D.tab='mehr';k.render();const t=z.w.document.body.textContent;if(/more than 10 days off/.test(t)||!/14 days off/.test(t))issue('doctrine text not aligned to 14 days');}
// 5 Playwright 390×844
(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
 const guard=require('./netguard');const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
 for(const [pn,f] of [['Partner lower','lower'],['Captain','captain']]){await p.goto('file://'+R+'/.build/index.html');
   await p.evaluate(([pr,pn])=>{const k=window.__kz,D=k.D();const x=pr;Object.assign(D.profile,x.prof);D.focus=x.focus;D.emph=x.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},x.skills);
     Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-10-05',kickDays:[],tab:'train',bkTs:Date.now()});D.ex['g_ht#0']={r:10,w:40,d:k.today(),n:'Barbell hip thrust'};
     D.days={};D.days[k.today()]={done:{},inp:{},skip:{},pick:'CH',run:null,fin:{},noKick:false,open:{}};localStorage.setItem('kz_app_v3',JSON.stringify(D));},[prof(pn),pn]);
   await p.reload();await p.waitForTimeout(150);const blk=await p.$('details[data-blk="CH-1"]');if(!blk){issue('playwright '+f+': Trial block missing');continue;}
   await p.evaluate(()=>{const d=document.querySelector('details[data-blk="CH-1"]');d.open=true;d.scrollIntoView();});await p.waitForTimeout(80);
   const txt=await blk.textContent();if(!/Clean pull-ups/.test(txt))issue('playwright '+f+': no pull-up test');if(f==='lower'&&!/40 kg/.test(txt))issue('playwright: lower-body test without working weight');
   await p.screenshot({path:R+'/.build/t32-trial-'+f+'.png'});const ow=await p.evaluate(()=>document.documentElement.scrollWidth);if(ow>390)issue('playwright '+f+': overflow '+ow);}
 if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);}
