// @name volume-sets
// A-025: the weekly set band also works through the sets of single exercises (emphasis block, fixed set counts), so the
// hinge surplus of the glute and lower-body profiles goes away; at level 0 the band only lowers rounds, never raises them.
// 12-week simulations of 4 profiles: hinge per 7 days well below the old 29–63 (rolling ≤ 26, average of the training
// weeks ≤ 20, every training week ≥ 12 for a hinge emphasis), legs + hinge ≥ 10, legs ≥ 2 sessions, strength sessions
// 60–90 min, the anchor in every emphasis block. Units: cut order and floors (2 sets/rounds, anchor last, emphasis
// exercise swapped for one with room), goal anchor, additions, warm-up and skill blocks never cut, a logged session does
// not shrink afterwards, Limited time, Level 0 vs Level 1 in rounds(), the cut sets reach the target text and l.vs.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const TD='2026-11-16',START='2026-09-21';
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||TD);return D;}
const V=['pull','push','legs','hinge','core'];
const vlog=(d,id,vs)=>({d,id,t:id,rpe:6,vs:Object.assign({pull:0,push:0,legs:0,hinge:0,core:0},vs)});
const lowb=s=>s.blocks.find(b=>b.lowb);

// 1 twelve-week simulations: hinge per 7 days, legs, duration, anchor
PROF.forEach(p=>{const {k,errs}=boot(),D=setup(k,p,START);const hot=p.emph==='glutes'||p.emph==='lower';
  sim(k,84,START,(r,s)=>{if(!r.s)return;if(['KA','KB','KC','CH','HO'].includes(r.id)&&!D.short&&(r.min<60||r.min>90))issue(p.n+' '+s+' '+r.id+': '+r.min+' min');
    const lb=lowb(r.s);if(hot&&['KA','KB','KC','CH'].includes(r.id)&&(!lb||!lb.items.some(it=>it.anc)))issue(p.n+' '+s+' '+r.id+': emphasis block without its anchor');});
  const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5);
  let roll=0;for(let i=6;i<84;i++){let h=0;D.logs.forEach(l=>{const x=day(l.d);if(x>i-7&&x<=i&&l.vs&&!l.bl)h+=l.vs.hinge;});roll=Math.max(roll,h);}
  const wk={};D.logs.forEach(l=>{const w=Math.floor(day(l.d)/7),x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false,lg:0});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs)V.forEach(q=>x[q]+=l.vs[q]);if(l.lg)x.lg++;});
  const tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<11),avg=tw.reduce((a,w)=>a+wk[w].hinge,0)/(tw.length||1);
  rep.push(p.n+' (rolling hinge max '+roll+', training-week average '+avg.toFixed(1)+'): '+Object.keys(wk).map(w=>{const x=wk[w];return 'W'+(+w+1)+' H'+x.hinge+'/L'+x.legs+'/P'+x.pull+'/D'+x.push+(x.dl?'(deload)':'');}).join(' '));
  if(roll>26)issue(p.n+': hinge '+roll+' sets in 7 days (> 26)');
  if(avg>20)issue(p.n+': hinge average '+avg.toFixed(1)+' per training week (> 20)');
  tw.forEach(w=>{const x=wk[w];if(x.legs+x.hinge<10)issue(p.n+' week '+(+w+1)+': legs + hinge '+(x.legs+x.hinge)+' (< 10)');
    if(hot&&x.hinge<12)issue(p.n+' week '+(+w+1)+': hinge '+x.hinge+' under the emphasis band (12)');
    if(p.focus!=='run'&&x.lg<2)issue(p.n+' week '+(+w+1)+': only '+x.lg+' leg session(s)');});
  if(errs.length)issue(p.n+' JS errors '+errs.join('; '));});

// 2 the old surplus case: 18 hinge sets in the last 6 days → today's session adds little, floors and anchor stay
{const {k,errs}=boot(),D=setup(k,prof('Partner glutes'));D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-6),'KC',{legs:9,hinge:6,pull:3,push:3}),vlog(addD(TD,-4),'KA',{pull:9,push:5,hinge:6}),vlog(addD(TD,-2),'KB',{pull:6,push:6,hinge:6})];
 const cap=k.bandCaps();if(cap.hinge>2)issue('hinge cap '+cap.hinge+' with 18 of 20 sets used');
 ['KA','KB','KC'].forEach(id=>{const c=k.ctx(TD),s=k.S(id,c),v=k.volSets(s,c,id),lb=lowb(s);
   if(v.hinge>8)issue(id+' with a full hinge band: '+v.hinge+' hinge sets');
   if(!lb||!lb.items.some(it=>it.anc))issue(id+': anchor gone');
   s.blocks.forEach(b=>b.items.forEach(it=>{if(!k.itPat(it)||k.curVar(it,k.LOC())<0||it.f||it.iso||it.test)return;const n=k.setsOf(it,b,c,id);if(n<2)issue(id+' '+it.k+': '+n+' set(s), floor is 2');}));
   if(id==='KC'&&k.legSets(s,c,id)<6)issue('KC no longer a leg session: '+k.legSets(s,c,id)+' leg sets');
   if(s.min<60||s.min>90)issue(id+' '+s.min+' min with a full band');
   rep.push('Full hinge band, '+id+': hinge '+v.hinge+', '+s.min+' min, emphasis '+lb.items.map(it=>it.k+'×'+k.setsOf(it,lb,c,id)).join(' '));});
 // the same session with an empty band keeps more hinge
 {const z=boot(),k2=z.k,E=setup(k2,prof('Partner glutes'));E.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-6),'KA',{pull:6,push:6,hinge:2})];const c=k2.ctx(TD),s=k2.S('KC',c),v=k2.volSets(s,c,'KC');
  const s1=k.S('KC',k.ctx(TD)),v1=k.volSets(s1,k.ctx(TD),'KC');if(v.hinge<=v1.hinge)issue('empty band KC hinge '+v.hinge+' not above full band '+v1.hinge);}
 if(errs.length)issue('JS errors '+errs.join('; '));}

// 3 never cut: goal anchor, additions, warm-up/cool-down, skill blocks; a logged session does not shrink afterwards
{const {k,errs}=boot(),D=setup(k,prof('Partner glutes'));D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-4),'KA',{pull:9,push:5,hinge:9}),vlog(addD(TD,-2),'KB',{pull:6,push:6,hinge:9})];
 k.setGoal('ht');D.goal.v=999;k.day().add=['Cable kickbacks'];
 const c=k.ctx(TD),s=k.S('KC',c);const gx=s.blocks.find(b=>b.gx);
 if(!gx)issue('goal anchor block missing');else gx.items.forEach(it=>{const n=k.setsOf(it,gx,c,'KC');if(n!==4)issue('goal anchor cut to '+n+' sets');});
 const ad=s.blocks.find(b=>b.add);if(!ad||!ad.items.length)issue('addition lost');else ad.items.forEach(it=>{if(it.ts!=null)issue('addition cut');});
 s.blocks.filter(b=>b.warm||b.cool||b.skill||b.mu||b.hsb).forEach(b=>{if(b.tr!=null||b.items.some(it=>it.ts!=null))issue('protected block '+b.name+' cut');});
 // log the session, then the plan of today stays the same
 const before=JSON.stringify(k.bandCaps());
 const dy=k.day();dy.pick='KC';dy.fin={rpe:6};s.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{const v=k.curVar(it,k.LOC());if(v<0)return;const key='KC-'+bix+'-'+ii;dy.done[key]=true;if(it.f||it.iso||it.test)return;const g=k.target(it,v);dy.inp[key]={s:Array(k.setsOf(it,b,c,'KC')).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};});});
 k.saveTrain();const l=D.logs[D.logs.length-1],exp=k.volSets(s,c,'KC');
 if(!l.vs||l.vs.hinge!==exp.hinge)issue('l.vs hinge '+(l.vs&&l.vs.hinge)+' ≠ planned '+exp.hinge);
 if(JSON.stringify(k.bandCaps())!==before)issue('logging today changed today\'s band caps (the session would shrink afterwards)');
 if(errs.length)issue('JS errors '+errs.join('; '));}

// 4 cut sets show up in the target text (training view)
{const {k,w,errs}=boot(),D=setup(k,prof('Partner glutes'));D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-4),'KA',{pull:9,push:5,hinge:9}),vlog(addD(TD,-2),'KB',{pull:6,push:6,hinge:9})];
 k.day().pick='KC';D.tab='train';k.render();const c=k.ctx(TD),s=k.S('KC',c),lb=lowb(s);
 const t=w.document.getElementById('app').textContent;lb.items.forEach(it=>{const n=k.setsOf(it,lb,c,'KC'),v=k.curVar(it,'g');if(t.indexOf(it.opts[v].n)<0)issue('emphasis exercise '+it.opts[v].n+' not shown');});
 if(!/2 × /.test(t))issue('no "2 × " target in the training view after the cut');
 if(errs.length)issue('JS errors '+errs.join('; '));}

// 5 Level 0 only lowers: under the band level 0 keeps the low count, level 1 takes the high one; over the band both low
{const {k,errs}=boot(),D=setup(k,prof('Partner lower'));const c=k.ctx(TD);
 const under=()=>{D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-3),'KA',{pull:2,push:2,legs:2,hinge:2})];D.ex={};};
 const over=()=>{D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-3),'KA',{pull:30,push:30,legs:30,hinge:30,core:30})];};
 // rounds() alone, without the cuts bandFit or the trims may have stamped on the block (tr, vb0)
 const rb=()=>{const b=k.S('KC',c).blocks.find(b=>b.rounds&&b.rounds[0]<b.rounds[1]&&!b.lowb&&!b.acc);if(!b)return null;const x=Object.assign({},b);delete x.tr;delete x.vb0;return x;};
 under();if(k.lvl()!==0)issue('Partner lower not level 0');let b=rb();
 if(!b)issue('no Strength C block with a round range');else{
  if(k.volBias(b)!==1)issue('test setup: block not under the band');
  if(k.rounds(b,c,'KC')!==b.rounds[0])issue('level 0 under the band: '+k.rounds(b,c,'KC')+' rounds (band raised it)');
  over();b=rb();if(k.rounds(b,c,'KC')!==b.rounds[0])issue('level 0 over the band not low');
  Object.assign(D.profile,{pull:8,dips:12});under();b=rb();if(k.lvl()<1)issue('setup: not level 1');
  else if(k.rounds(b,c,'KC')!==b.rounds[1]&&c.cyc>2)issue('level 1 under the band: '+k.rounds(b,c,'KC')+' rounds, expected the high count');}
 if(errs.length)issue('JS errors '+errs.join('; '));}

// 6 Limited time stays possible below 60 min, nothing breaks; Captain and Runner keep their upper body near the old values
{const {k,errs}=boot(),D=setup(k,prof('Partner glutes'));D.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-2),'KB',{pull:6,push:6,hinge:16})];D.short=true;
 const s=k.S('KA',k.ctx(TD));if(!s.blocks.length||s.min>90)issue('Limited time session broken: '+s.min+' min');D.short=false;
 if(errs.length)issue('JS errors '+errs.join('; '));}

console.log('--- weeks (H hinge / L legs / P pull / D push) ---');rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
