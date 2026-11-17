// @name rhythm-gap
// A-037: pause rule by rhythm (L1) and "Next variation" at the highest stage. The gap of an exercise is measured
// against the usual rhythm of its movement pattern (median of the last 4 gaps): run focus and Strength C / Skill Trial
// in a 14–18 day rhythm keep their targets (16-week simulations of Runner and Captain without a step back and without
// a falling target); a real break (≥ 14 days and ≥ 1.5 × rhythm) steps back once, > 28 days and ≥ 2 × rhythm twice;
// never twice in a row without reaching the target in between (reached: allowed again); never under the lower end of
// the range; fewer than 2 known gaps keep the old rule (14 / 28 days); paused days count for no gap; "Next variation"
// ends at "Full front lever" / "Full planche"; the "How it works" text describes the new rule and the plateau rule;
// a 26-week Runner run of the t49 model (progress and standstill) gives no target under the range.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const {longSim}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,$:s=>w.document.querySelector(s)};}
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start,short:false,fav:(p.fav||[]).slice()});k.today(start);return D;}
const START='2026-09-21';
// 1 16-week simulations: rhythm of 14–18 days keeps the targets once the rhythm is known (≥ 2 gaps; before that the old
// 14-day rule holds by the order)
['Runner','Captain'].forEach(pn=>{const {k}=boot();const D=setup(k,prof(pn),START);const gaps=[];let drops=0;
  sim(k,112,START);
  // replay: walk the logs per exercise variant and compare consecutive logged values (the simulation logs every target)
  const by={};D.logs.forEach(l=>{if(!l.ex)return;Object.keys(l.ex).forEach(q=>{(by[q]=by[q]||[]).push([l.d,l.ex[q]]);});});
  const gp=(h,i)=>(Date.parse(h[i][0])-Date.parse(h[i-1][0]))/864e5,reg=g=>g>=13&&g<=19;let regN=0;
  Object.keys(by).forEach(q=>{const h=by[q];for(let i=1;i<h.length;i++){const g=gp(h,i);gaps.push(g);
    const a=h[i-1][1],b=h[i][1];if(i>=3&&reg(g)&&reg(gp(h,i-1))&&reg(gp(h,i-2)))regN++;else continue;if((b[1]<a[1]-1e-9||(b[1]===a[1]&&b[0]<a[0]-2)))drops++;}});
  rep.push(pn+': '+Object.keys(by).length+' exercise variants, median gap '+gaps.sort((a,b)=>a-b)[Math.floor(gaps.length/2)]+' days, '+gaps.filter(g=>g>=14).length+' gaps ≥ 14 days, '+regN+' sessions in a regular 13–19 day rhythm, falling values there '+drops);
  if(drops)issue(pn+': '+drops+' logged values fell between sessions in a regular 13–19 day rhythm');});
// step-back notes over the same kind of run, read directly from target()
['Runner','Captain'].forEach(pn=>{const {k}=boot();const D=setup(k,prof(pn),START);let backs=0,bad=0,ex='',reg14=0;
  for(let i=0;i<112;i++){const s=addD(START,i);k.today(s);const r=k.recAll(s,false);
    if(['KA','KB','KC','CH'].includes(r.id)){const S=k.S(r.id,k.ctx(s));S.blocks.forEach(b=>b.items.forEach(it=>{if(!it.k||it.f||it.iso||it.test)return;const v=k.curVar(it,'g');if(v<0)return;const st=D.ex[it.k+'#'+v];if(st){const p0=k.patLast(it.k,st.d),rh=k.rhythm(k.patKey(it.k),p0),gp=k.gapDays(p0,s);if(rh!=null&&rh>=13&&rh<=19&&gp>=13&&gp<=19)reg14++;}
      const g=k.target(it,v),m=(g.note||'').match(/Last entry (\d+) days \(usual rhythm about (\d+) days\)/);if(m){const gp=+m[1],rh=+m[2];backs++;
      if(gp<14||gp<1.5*rh-0.5){bad++;if(!ex)ex=s+' '+r.id+' '+it.opts[v].n+': '+g.note;}if(rh>=13&&rh<=19&&gp<=19){bad++;if(!ex)ex=s+' '+r.id+' '+it.opts[v].n+' (14–18 day rhythm): '+g.note;}}}));}
    sim(k,1,s);}
  rep.push(pn+': step backs with a known rhythm (≥ 2 gaps) in 16 weeks '+backs+' (all at ≥ 14 days and ≥ 1.5 × rhythm), wrong '+bad+'; targets in a 13–19 day rhythm after 13–19 days '+reg14+', none stepped back');if(pn==='Runner'&&reg14<10)issue('Runner: only '+reg14+' targets in a 13–19 day rhythm, check too thin');if(bad)issue(pn+': '+bad+' step backs against the rhythm rule, e.g. '+ex);});
// 2 synthetic histories of one exercise
function hist(k,key,v,dates,val,w){const D=k.D();D.logs=dates.map(d=>({d,id:'KA',t:'A',rpe:6,ex:{[key+'#'+v]:[val,w||0]}}));D.ex={};D.ex[key+'#'+v]={r:val,w:w||0,d:dates[dates.length-1],hold:false,n:'x',stall:0};D.kitD={};D.pause=null;D.pauseH=[];}
function item(k,key){const S=k.S('KA',k.ctx(k.today()));let f=null;S.blocks.forEach(b=>b.items.forEach(it=>{if(it.k===key)f=it;}));return f;}
{const {k}=boot();Object.assign(k.D(),{onb:true,start:'2026-06-01',logs:[]});k.today('2026-11-16');const it=item(k,'a_row');if(!it){issue('a_row not found');}else{const v=0,TD='2026-11-16';
  const every=(n,g,end)=>{const a=[];let d=end;for(let i=0;i<n;i++){a.unshift(d);d=addD(d,-g);}return a;};
  const at=(gap,rhythmGap,val,n)=>{const end=addD(TD,-gap);hist(k,'a_row',v,every(n||5,rhythmGap,end),val);return k.target(it,v);};
  let g=at(20,16,10);if(g.r!==11)issue('rhythm 16, gap 20: expected the normal step up to 11, got '+g.r+' ('+g.note+')');
  g=at(17,16,10);if(/(one step|two steps) back/.test(g.note))issue('rhythm 16, gap 17: step back');
  g=at(24,16,10);if(g.r!==9||!/one step/.test(g.note))issue('rhythm 16, gap 24 (1.5 ×): expected one step back to 9, got '+g.r+' ('+g.note+')');
  g=at(30,16,10);if(g.r!==9)issue('rhythm 16, gap 30 (> 28, < 2 ×): expected one step back to 9, got '+g.r+' ('+g.note+')');
  g=at(33,16,10);if(g.r!==8||!/two steps/.test(g.note))issue('rhythm 16, gap 33 (> 28, ≥ 2 ×): expected two steps back to 8, got '+g.r+' ('+g.note+')');
  g=at(14,7,10);if(g.r!==9)issue('rhythm 7, gap 14: expected one step back, got '+g.r+' ('+g.note+')');
  g=at(13,7,10);if(/(one step|two steps) back/.test(g.note))issue('gap 13: step back');
  // lower end of the range (6–12): never under 6
  g=at(40,7,6);if(g.r!==6)issue('at the lower end, gap 40: target '+g.r+' under the range 6');
  g=at(40,7,7);if(g.r!==6)issue('one over the lower end, two steps: target '+g.r+' (floor 6)');
  // fewer than 2 known gaps: old rule
  g=at(14,16,10,2);if(g.r!==9)issue('1 known gap, 14 days: old rule one step back, got '+g.r);
  g=at(29,16,10,2);if(g.r!==8)issue('1 known gap, 29 days: old rule two steps back, got '+g.r);
  g=at(20,16,10,1);if(g.r!==9)issue('no known gap, 20 days: old rule one step back, got '+g.r);
  // paused days count for no gap: 30 days with 20 paused → 10
  {const end=addD(TD,-30);hist(k,'a_row',v,every(5,7,end),10);k.D().pauseH=[{f:addD(TD,-25),t:addD(TD,-6)}];g=k.target(it,v);if(/(one step|two steps) back/.test(g.note))issue('30 days with 20 paused: step back ('+g.note+')');}
  // never twice in a row: session after a step back that missed its target
  {const D=k.D();const ds=every(5,7,addD(TD,-60));ds.push(addD(TD,-30));D.logs=ds.map((d,i)=>({d,id:'KA',t:'A',rpe:6,ex:{'a_row#0':[i<5?10:7,0]}}));
   D.ex={'a_row#0':{r:7,w:0,d:addD(TD,-30),hold:false,n:'x',stall:0}};D.kitD={};D.pauseH=[];g=k.target(it,v);
   if(/(one step|two steps) back/.test(g.note))issue('second step back in a row after a missed target ('+g.note+')');
   D.logs[5].ex['a_row#0']=[9,0];D.ex['a_row#0'].r=9;g=k.target(it,v);
   if(!/(one step|two steps) back/.test(g.note))issue('step back after the stepped-back target was reached: none ('+g.note+')');}
  // weighted exercise: weight steps back, reps stay in the range
  {const iw=item(k,'c_rdl');if(iw){const end=addD(TD,-35);hist(k,'c_rdl',0,every(5,7,end),10,40);const gw=k.target(iw,0);if(!(gw.w<40)||gw.r<iw.lo)issue('weighted, gap 35: '+JSON.stringify(gw));}}}}
// 3 next variation ends at the highest stage
{const {k}=boot();const D=setup(k,prof('Captain'),'2026-06-01');D.skills.fl=true;D.skills.pl=true;D.profile.flSt=4;D.profile.plSt=4;k.today('2026-11-16');
 const find=(key)=>{let f=null;['SK','KA','KB','CH'].forEach(id=>{const S=k.S(id,k.ctx('2026-11-16'));S.blocks.forEach(b=>b.items.forEach(it=>{if(it.k===key&&!f)f=it;}));});return f;};
 [['fl_h','Full front lever'],['pl_h','Full planche']].forEach(([key,full])=>{const it=find(key);if(!it){issue(key+' not in any session with the skill');return;}
   const fi=it.opts.findIndex(o=>o.n.toLowerCase()===full.toLowerCase());if(fi<0){issue(key+': no '+full);return;}
   const nv=k.nextVar(it,fi,'g');if(nv>=0)issue(full+': next variation offers '+it.opts[nv].n);
   const nb=k.nextVar(it,fi-1,'g');if(nb!==fi)issue(it.opts[fi-1].n+': next variation '+(nb>=0?it.opts[nb].n:'none')+' instead of '+full);
   D.ex[key+'#'+fi]={r:it.hi,w:0,d:'2026-11-14',hold:false,n:full,stall:0};const g=k.target(it,fi);if(/take the next variation/.test(g.note))issue(full+': note offers a next variation');});}
// 4 "How it works" text
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),START);D.tab='mehr';k.render();const t=z.w.document.body.textContent;
 if(/after 4 weeks twice/.test(t))issue('old pause text still shown');if(!/usual rhythm/.test(t)||!/1\.5 × its usual gap/.test(t)||!/never below the range/i.test(t))issue('new pause rule not described');
 if(!/3 checks over 3 weeks/.test(t))issue('plateau rule not described');if(!/14 days off/.test(t))issue('14 days missing');}
// 5 Runner: 26 weeks of the t49 model, no target under the range
['prog','still'].forEach(course=>{const {k}=boot();setup(k,prof('Runner'),'2026-11-16');let under=0,ex='';
  longSim(k,182,'2026-11-16',course,13,ev=>{if(ev.type!=='target')return;const {it,g,st}=ev;if(st&&st.r>=it.lo&&g.r<it.lo){under++;if(!ex)ex=ev.d+' '+ev.name+' '+g.r+' < '+it.lo;}});
  rep.push('Runner 26 weeks '+course+': targets under the range '+under);if(under)issue('Runner '+course+': '+under+' targets under the range, e.g. '+ex);});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
