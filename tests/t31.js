// @name goals-plan
// P-2 goals II: the goal steers selection, content and the date. Regression: without a goal the 6-week simulation of 4
// profiles (3 audit profiles + runner) gives exactly the recommendations and sessions recorded before P-2
// (fixtures/t31-nogoal.json; re-recorded with P-5: the set band raises a round in some sessions, same exercises; re-recorded with A-025: the set band
// cuts single sets and level 0 is no longer raised, same exercises, only the estimates move; re-recorded with A-026: abduction
// counts for no pattern and a full pattern outside the emphasis block swaps for a pattern-free exercise, first change Partner glutes day 3: step-ups → abductor machine in the glute block; re-recorded with A-027: pattern table – calf raises and abduction pattern-free, knee flexion legs, u_tri push, Core Blitz and loaded fixed items count – and the emphasis block's second exercise by band room; 28 of 168 days changed, all in exercises only, no session type: Captain 2, Partner lower 9, Partner glutes 14, Runner 3). 6-week simulations per goal type: skill goal first and in its long form (shortened only after favourites
// are down to 2, D1), 5 skill contacts as the weekly target (≥ 2 per training week reached); strength goals (pull-ups, squat kg, hip thrust kg) get a goal anchor right after the warm-up at least
// twice per training week that is never trimmed, every session ≤ 90 min; run goal (10 km with the strength focus) keeps
// ≥ 2 runs and 1 long run per week, time goal adds fast runs. Date: taper only in the 7 days before it (about half the
// working sets, same exercises), test on the date, deload week replaced, ended after the date; trend label; one-time focus
// hint; never list vs goal exercise; Field kit bodyweight goal anchor; additions stay outside the precedence.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json'),FX=require('./fixtures/t31-nogoal.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  return {w,k:w.__kz,errs,$,click:s=>{const e=$(s);if(!e){issue('missing '+s);return;}e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));}};}
const START='2026-09-21';
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:start||START,short:false,fav:(p.fav||[]).slice()});k.today(start||START);return D;}
const prof=n=>PROF.find(p=>p.n===n);
const vol=(k,s,c,id)=>{let n=0;s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(k.curVar(it,k.LOC())<0||!it.k||it.f||it.iso||it.test)return;n+=k.setsOf(it,b,c,id);});});return n;};
// 1 regression without a goal
PROF.forEach(p=>{const {k,errs}=boot();setup(k,p);const got=sim(k,42,START).map(r=>r.id+(r.sig?' '+r.sig:''));let d=0;
  got.forEach((x,i)=>{if(x!==FX[p.n][i]){d++;if(d<=2)issue('no goal, '+p.n+' day '+(i+1)+' differs: '+x.slice(0,90)+' ≠ '+FX[p.n][i].slice(0,90));}});
  if(d>2)issue('no goal, '+p.n+': '+d+' days differ');if(errs.length)issue('regression JS errors: '+errs.join('; '));});
// 2 six-week simulations per goal type (open goal: target out of reach, no date)
function goalSim(pn,gk,check){const {k,errs}=boot(),D=setup(k,prof(pn));k.setGoal(gk);D.goal.v=gk[0]==='t'?1:999;const wk=[];
  sim(k,42,START,(r,s)=>{const w=Math.floor(k.D().logs.length?(Date.parse(s)-Date.parse(START))/864e5/7:0);const x=wk[w]||(wk[w]={runs:0,rh:0,ri:0,ga:0,str:0,dl:false,sk:0,ids:[]});
    if(k.ctx(s).cyc===6)x.dl=true;x.ids.push(r.id);if(r.btn==='run'){x.runs++;if(r.id==='RH')x.rh++;if(r.id==='RI')x.ri++;}
    if(r.s){if(r.min>90)issue(pn+' '+gk+': '+s+' '+r.id+' estimated '+r.min+' min');const gb=r.s.blocks.findIndex(b=>b.gx&&b.items.some(it=>it.gx));
      if(gb>=0){x.ga++;if(gb!==1||!r.s.blocks[0].warm)issue(pn+' '+gk+': goal anchor not right after the warm-up on '+s+' '+r.id);}
      if(check)check(k,r,s,x);}
    const l=k.D().logs[k.D().logs.length-1];if(l&&l.d===s&&l.sk&&l.sk.indexOf(gk)>=0)x.sk++;});
  if(errs.length)issue(pn+' '+gk+' JS errors: '+errs.join('; '));rep.push(pn+' · '+gk+': '+wk.map((x,i)=>'W'+(i+1)+(x.dl?'(DL)':'')+' ['+x.ids.join(' ')+'] runs '+x.runs+' long '+x.rh+' goal anchor '+x.ga).join('\n    '));return {k,wk};}
// skill goals
{const {k,wk}=goalSim('Captain','hs',(k,r,s)=>{if(['KA','KB'].includes(r.id)){const sb=r.s.blocks.filter(b=>b.skill);const fb=r.s.blocks.find(b=>b.fav);if(sb.length&&(sb[0].skill!=='hs'||!sb[0].gx||(!sb[0].lng&&fb&&fb.items.length>2)))issue('hs goal: '+r.id+' on '+s+' skill block '+sb.map(b=>b.skill+(b.lng?'+long':'')).join(','));}});
 if(k.hist(k.today()).skT!==5)issue('hs goal: weekly skill target '+k.hist(k.today()).skT);
 wk.forEach((x,i)=>{if(!x.dl&&x.sk<2)issue('hs goal: week '+(i+1)+' only '+x.sk+' handstand contacts');});}
{const {k}=goalSim('Captain','mu',(k,r,s)=>{if(r.id==='KA'){const i=r.s.blocks.findIndex(b=>/Muscle-Up/i.test(b.name)||b.mu);if(i<0||i>3)issue('mu goal: muscle-up work not early in Strength A on '+s+' (block '+i+')');}});
 if(!k.D().skills.mu)issue('mu goal: skill not on');if(k.hist(k.today()).skT!==5)issue('mu goal: weekly skill target');}
// strength goals
[['Partner glutes','pull'],['Partner lower','sq'],['Captain','ht'],['Captain','pull']].forEach(([pn,gk])=>{const {wk}=goalSim(pn,gk,(k,r,s)=>{
    const gb=r.s.blocks.find(b=>b.gx);const elig=['pull','dips','push'].includes(gk)?['KA','KB','HO'].includes(r.id):(r.id==='KC'||r.s.blocks.some(b=>b.legs||b.lowb));
    if(elig&&!gb)issue(pn+' '+gk+': goal anchor missing in '+r.id+' on '+s);
    if(gb){const v=k.curVar(gb.items[0],'g');if(v<0||!k.target(gb.items[0],v))issue(pn+' '+gk+': goal anchor without target');
      const nm=gb.items[0].opts[v].n;r.s.blocks.forEach(b=>{if(b!==gb&&!b.warm&&!b.cool)b.items.forEach(it=>{const w=k.curVar(it,'g');if(w>=0&&it.opts[w].n===nm&&it.k)issue(pn+' '+gk+': '+nm+' twice on '+s);});});}});
  wk.forEach((x,i)=>{if(!x.dl&&x.ga<2)issue(pn+' '+gk+': week '+(i+1)+' goal anchor only '+x.ga+'×');});});
// run goals
{const {wk}=goalSim('Partner glutes','d10');wk.forEach((x,i)=>{if(x.runs<2)issue('d10 with strength focus: week '+(i+1)+' only '+x.runs+' runs');if(!x.dl&&x.rh<1)issue('d10: week '+(i+1)+' no long run');});}
{const {wk}=goalSim('Runner','t5');const ri=wk.reduce((a,x)=>a+x.ri,0);if(ri<3)issue('t5: only '+ri+' interval runs in 6 weeks');wk.forEach((x,i)=>{if(!x.dl&&x.rh<1)issue('t5: week '+(i+1)+' no long run');});}
// 3 date: taper, test day, deload replaced, ended afterwards
{const {k,errs}=boot(),D=setup(k,prof('Partner glutes'));k.setGoal('d10');D.goal.v=999;const DT=addD(START,40);D.goal.d=DT;const tp=[];
 sim(k,41,START,(r,s)=>{if(k.gTaper(s))tp.push(s);const x=Math.round((Date.parse(DT)-Date.parse(s))/864e5);
   if(x>=0&&x<=10&&(r.id==='DL'||r.id==='TE'))issue('date: deload/test inside the last 10 days on '+s);
   if(s===DT&&(r.id!=='RH'||!/Goal day/.test(r.why||'')))issue('date: no run test on the date, got '+r.id);
   if(r.s&&k.gTaper(s)&&!r.s.taper)issue('date: taper session not marked on '+s);});
 if(tp.length!==7||tp[0]!==addD(DT,-7)||tp[6]!==addD(DT,-1))issue('date: taper days '+tp.join(','));
 k.today(DT);D.goal&&(k.D().tab='run');const ri=k.D().goal?null:1;if(ri)issue('date: goal gone too early');
 k.today(addD(DT,1));k.D().tab='start';k.render();if(k.D().goal)issue('date: goal not ended after the date');
 if(!(k.D().goalsDone||[]).some(x=>x.k==='d10'&&x.r==='e'))issue('date: no "ended" archive entry');
 if(errs.length)issue('date JS errors: '+errs.join('; '));}
{const {k}=boot(),D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');k.setGoal('pull');const c=k.ctx('2026-11-16');
 ['KA','KB','KC'].forEach(id=>{delete D.goal.d;const a=k.S(id,c),va=vol(k,a,c,id);D.goal.d='2026-11-20';const t=k.S(id,c),vt=vol(k,t,c,id),cut=1-vt/va;
   if(cut<0.4||cut>0.6)issue('taper '+id+': working sets '+va+' → '+vt+' ('+Math.round(cut*100)+' %)');
   const na=JSON.stringify(a.blocks.map(b=>b.items.map(it=>it.opts[Math.max(0,k.curVar(it,'g'))].n))),nt=JSON.stringify(t.blocks.map(b=>b.items.map(it=>it.opts[Math.max(0,k.curVar(it,'g'))].n)));
   if(na!==nt)issue('taper '+id+': exercises changed (only sets should go)');if(!t.blocks.some(b=>b.gx)&&id!=='KC')issue('taper '+id+': goal anchor gone');});
 D.goal.d='2026-12-24';if(k.gTaper('2026-11-16'))issue('taper three weeks before the date');delete D.goal.d;if(k.gTaper('2026-11-16'))issue('taper without a date');
 D.goal.d='2026-11-16';D.logs=[];if(k.recAll('2026-11-16',false).id!=='CH')issue('date: strength goal test day is not the Skill Trial');}
// 4 trend label
{const {k}=boot(),D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');k.setGoal('pull');D.goal.v=20;D.goal.d='2027-01-15';
 D.goal.h=[['2026-10-20',8],['2026-11-01',10],['2026-11-14',13]];if(k.gTrend()!=='on course')issue('trend on course: '+k.gTrend());
 D.goal.h=[['2026-10-20',8],['2026-11-01',8],['2026-11-14',9]];if(k.gTrend()!=='tight')issue('trend tight: '+k.gTrend());if(!/tight/.test(k.goalLine()))issue('trend not in the start line');
 delete D.goal.d;if(k.gTrend())issue('trend without a date');}
// 5 one-time focus hint
{const z=boot(),k=z.k,D=setup(k,prof('Partner glutes'),'2026-10-05');k.today('2026-11-16');k.setGoal('d5');D.tab='start';k.render();
 if(!z.$('[data-a=goalfoc]'))issue('focus hint missing (run goal, strength focus)');else{z.click('[data-a=goalfoc]');if(D.focus!=='run'||!D.goal.fh)issue('focus switch');if(z.$('[data-a=goalfoc]'))issue('focus hint shown again');}
 D.focus='run';k.setGoal('hs');k.render();if(!z.$('[data-a=goalfh]'))issue('skill goal with runner focus: no note');else{z.click('[data-a=goalfh]');if(z.$('[data-a=goalfh]'))issue('note shown again');}
 D.focus='bal';k.setGoal('pull');k.render();if(z.$('[data-a=goalfh]'))issue('focus hint without a conflict');}
// 6 never list vs goal exercise; Field kit; additions
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');Object.keys(D.home).forEach(q=>D.home[q]=true);k.setGoal('pull');const c=k.ctx('2026-11-16');
 const gi=s=>{const b=s.blocks.find(b=>b.gx);return b&&b.items[0];};
 D.never=['Clean pull-ups'];let it=gi(k.S('KA',c));if(!it||it.opts[k.curVar(it,'g')].n==='Clean pull-ups'||it.nh)issue('never: alternative variant not used');
 D.never=['Clean pull-ups','Band-assisted pull-ups','Negative pull-ups, 5 s down'];it=gi(k.S('KA',c));if(!it||!it.nh)issue('never: goal exercise without alternative not kept with hint');
 D.tab='train';k.day().pick='KA';k.render();if(!/your goal exercise/.test(z.w.document.body.textContent))issue('never: hint not shown');D.never=[];
 k.setGoal('sq');k.day().kit=true;D.kit=[];let s=k.S('KC',c),g=s.blocks.find(b=>b.gx);if(!g)issue('kit: goal block gone');else{const v=k.curVar(g.items[0],'m');if(v<0||/barbell|goblet/i.test(g.items[0].opts[v].n))issue('kit: goal anchor not bodyweight '+(v>=0&&g.items[0].opts[v].n));}
 k.day().kit=false;k.day().add=['Cable kickbacks'];s=k.S('KC',c);if(!s.blocks.some(b=>b.add)||!s.blocks.some(b=>b.gx))issue('additions with a goal: '+s.blocks.map(b=>b.name).join(','));
 if(z.errs.length)issue('never/kit JS errors: '+z.errs.join('; '));}
// 7 backup keeps the focus-hint flag
{const {k}=boot(),D=setup(k,prof('Captain'));k.setGoal('d5');D.goal.fh=1;D.goal.d='2027-04-01';const y=boot();y.k.today(START);if(!y.k.restore(k.bkJSON()))issue('backup rejected');else{const g=y.k.D().goal;if(!g||!g.fh||g.d!=='2027-04-01')issue('backup goal '+JSON.stringify(g));}}
console.log(rep.join('\n'));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
