// @name volume-sets
// A-025: the weekly set band also works through the sets of single exercises (emphasis block, fixed set counts), so the
// hinge surplus of the glute and lower-body profiles goes away; at level 0 the band only lowers rounds, never raises them.
// A-026: 12-week simulations of 4 profiles check the tolerance rule for every pattern: the floors (60 min, 2 working sets,
// legs + hinge ≥ 10) first, the training-week average inside the band, a 7-day peak up to the upper limit + 2 for an
// emphasis/goal pattern and + 4 for the others; legs ≥ 2 sessions, the anchor in every emphasis block. Abduction counts
// for no pattern (old logs are read by the new mapping), a full pattern outside the emphasis block swaps for a pattern-free
// exercise. Units: cut order and floors (2 sets/rounds, anchor last, emphasis
// exercise swapped for one with room), goal anchor, additions, warm-up and skill blocks never cut, a logged session does
// not shrink afterwards, Limited time, Level 0 vs Level 1 in rounds(), the cut sets reach the target text and l.vs.
// A-057 c: the band is measured per accent block over 48 weeks (≤ upper limit; ≥ lower limit, or ⅔ of it for a pattern
// outside emphasis and goal in the strength and skill blocks, A-056 c / N-6) instead of the 12-week average.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
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

// 1 twelve-week simulations: the tolerance rule of the control station (A-026). The floors (60 min, 2 working sets,
// legs + hinge ≥ 10) rank above the band upper limit; the training-week average of every pattern lies in its band
// (core: the Core Blitz counts for no pattern, so only its upper limit is checked); a 7-day peak may reach the upper
// limit + 2 for an emphasis/goal pattern and + 4 for the others.
const BAND={hot:[12,20],cold:[8,14]};
// A-032: plus 2 goal profiles (Partner glutes + Hip thrust goal, Partner lower + Back squat goal); at most 1 band swap per
// session, never a basic exercise of a stage or the first exercise of a main block, no function twice; the leg day (Strength C)
// carries at least the legs + hinge sets of every other unit of its training week (the bigger Strength C of a week with two;
// the band tolerance ranks first: a Strength C held down by it, with legs or hinge of its 7 days at the tolerance limit, is noted).
const BASE=/^(fav_|mx_)?(mu_neg|a_expu|a2_wpu|b2_sw|c_pu|c_dip)$/;
const FUN=[/abduct|band walks?|fire hydrants?|side-lying leg raises|clamshells?/i,/adduct|copenhagen/i,/lateral raises?/i,/tibialis/i];
const GP={ht:'hinge',sq:'legs'};
PROF.map(p=>[p,null]).concat([[prof('Partner glutes'),'ht'],[prof('Partner lower'),'sq']]).forEach(([p,gk])=>{const {k,errs}=boot(),D=setup(k,p,START),pn=p.n+(gk?' + goal '+gk:'');if(gk){k.setGoal(gk);D.goal.v=999;}
  const hotP=(({lower:['legs','hinge'],glutes:['hinge'],upper:['pull','push'],core:['core']})[p.emph]||[]).concat(gk&&!((({lower:['legs','hinge'],glutes:['hinge']})[p.emph]||[]).includes(GP[gk]))?[GP[gk]]:[]);
  const lhs={};let nsw=0,maxsw=0;p={...p,n:pn};
  /* A-057 c: 48 weeks, so every accent block (base, strength, volume, skill) is measured twice and a single light week (two
     strength sessions) does not decide a block; the session and peak checks keep their 12-week window */
  sim(k,336,START,(r,s)=>{if(!r.s||Date.parse(s)-Date.parse(START)>=84*864e5)return;if(['KA','KB','KC','CH','HO'].includes(r.id)&&!D.short&&(r.min<60||r.min>90))issue(p.n+' '+s+' '+r.id+': '+r.min+' min');
    const lb=lowb(r.s),gxp=r.s.blocks.some(b=>b.gx&&b.items.some(it=>it.gx&&k.curVar(it,k.LOC())>=0&&hotP.includes(k.itPat(it))));
    if(hotP.length&&['lower','glutes'].includes(p.emph)&&['KA','KB','KC','CH'].includes(r.id)&&(!lb||!lb.items.some(it=>it.anc))&&!gxp)issue(p.n+' '+s+' '+r.id+': emphasis block without its anchor (and no goal anchor of its pattern)');
    let sw=0;const fun={};r.s.blocks.forEach((b,bi)=>{if(b.warm||b.cool)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,k.LOC());if(v<0)return;const n=it.opts[v].n;
      FUN.forEach((f,fi)=>{if(f.test(n)){if(fun[fi]&&(it.bx||fun[fi].bx))issue(p.n+' '+s+' '+r.id+': band swap brings a function twice ('+fun[fi].n+' / '+n+')');fun[fi]={n,bx:it.bx};}});
      if(!it.bx)return;sw++;if(BASE.test(it.bxk||''))issue(p.n+' '+s+' '+r.id+': basic exercise swapped ('+it.bx+')');if(it.bxf&&!b.acc&&!b.sh&&!b.fav)issue(p.n+' '+s+' '+r.id+': first exercise of '+b.name+' swapped');});});
    nsw+=sw;maxsw=Math.max(maxsw,sw);if(sw>1)issue(p.n+' '+s+' '+r.id+': '+sw+' band swaps (max 1)');
    const w=Math.floor((Date.parse(s)-Date.parse(START))/864e5/7),cx=k.ctx(s);(lhs[w]=lhs[w]||[]).push({d:s,id:r.id,n:k.legSets(r.s,cx,r.id),m:r.s.min});
    const c=k.ctx(s);r.s.blocks.forEach(b=>{if(D.short&&b.p>1)return;b.items.forEach(it=>{if(!k.itPat(it)||k.curVar(it,k.LOC())<0)return;const n=k.setsOf(it,b,c,r.id);if(n<2)issue(p.n+' '+s+' '+r.id+' '+it.k+': '+n+' working set(s), floor is 2');});});});
  const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5);
  const wk={};D.logs.forEach(l=>{const w=Math.floor(day(l.d)/7),x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false,lg:0});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs)V.forEach(q=>x[q]+=l.vs[q]);if(l.lg)x.lg++;});
  const tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<11),tw24=Object.keys(wk).filter(w=>!wk[w].dl&&+w<47),sum=[],blk={};
  /* A-057 c: the training weeks per accent block (accOf of the week's middle) */
  tw24.forEach(w=>{const a=k.accOf(addD(START,+w*7+3));(blk[a]=blk[a]||[]).push(w);});
  /* A-035/A-032: the band of the other patterns follows the strength sessions per week of the focus (+2 per session over 3). */
  V.forEach(q=>{const hot=hotP.includes(q),[lo,hi]=hot?BAND.hot:[BAND.cold[0],BAND.cold[1]+(p.focus==='str'?2:0)],tol=hot?2:4;let peak=0;
    /* A-053: a peak over the tolerance by 1 set whose newest leg session sits at the floor (legs + hinge 10, tolerance rule:
       the floors rank above the upper limit) is noted, not failed */
    let flo=0;for(let i=6;i<84;i++){let h=0,last=null;D.logs.forEach(l=>{const x=day(l.d);if(x>i-7&&x<=i&&l.vs&&!l.bl){h+=l.vs[q];if(l.vs[q])last=l;}});
      if(h===hi+tol+1&&(q==='legs'||q==='hinge')&&last&&last.vs.legs+last.vs.hinge<=10){flo=Math.max(flo,h);continue;}peak=Math.max(peak,h);}
    if(flo)rep.push('  note: '+p.n+' '+q+' '+flo+' sets in 7 days, the newest leg session at the floor legs + hinge 10');
    const avg=tw.reduce((a,w)=>a+wk[w][q],0)/(tw.length||1);sum.push(q+' peak '+peak+' avg '+avg.toFixed(1)+' ('+lo+'–'+hi+(hot?', emphasis':'')+')');
    if(peak>hi+tol)issue(p.n+': '+q+' '+peak+' sets in 7 days (> '+hi+' + '+tol+')');
    /* A-057 c (replaces the 12-week average): the band per accent block – average per training week ≤ the upper limit and
       ≥ the floor of the block: the lower limit, or ⅔ of it for a pattern outside emphasis and goal in the strength and skill
       blocks (A-056 c, N-6 doctrine, bandLo) */
    const bt=[];Object.keys(blk).forEach(a=>{const ws=blk[a];if(ws.length<3)return;const ba=ws.reduce((x,w)=>x+wk[w][q],0)/ws.length,fl=!hot&&(a==='str'||a==='skill')?Math.ceil(lo*2/3):lo;bt.push(a+' '+ba.toFixed(1));
      if(ba>hi)issue(p.n+': '+q+' average '+ba.toFixed(1)+' per training week in the '+a+' block over the band ('+hi+')');
      if(ba<fl&&q!=='core')issue(p.n+': '+q+' average '+ba.toFixed(1)+' per training week in the '+a+' block under its floor ('+fl+(fl<lo?', ⅔ of '+lo:'')+')');});
    sum.push('  blocks '+bt.join('/'));});
  rep.push(p.n+': '+sum.join(' | '));
  rep.push('  '+Object.keys(wk).map(w=>{const x=wk[w];return 'W'+(+w+1)+' H'+x.hinge+'/L'+x.legs+'/P'+x.pull+'/D'+x.push+'/C'+x.core+(x.dl?'(deload)':'');}).join(' '));
  /* the leg day is not the thinnest leg dose of its week */
  const tolOf=q=>(hotP.includes(q)?BAND.hot[1]+2:BAND.cold[1]+(p.focus==='str'?2:0)+4);let held=0;
  Object.keys(lhs).forEach(w=>{const a=lhs[w],kc=a.filter(x=>x.id==='KC');if(!kc.length||wk[w]&&wk[w].dl)return;const top=kc.reduce((m,x)=>x.n>m.n?x:m,kc[0]);
    a.filter(x=>x.id!=='KC').forEach(x=>{if(x.n<=top.n)return;const i=day(top.d);const at=['legs','hinge'].some(q=>{let h=0;D.logs.forEach(l=>{const y=day(l.d);if(y>i-7&&y<=i&&l.vs&&!l.bl)h+=l.vs[q];});return h>=tolOf(q)-1;});
      /* A-053: the 90 min ceiling ranks above the leg-day floor (D1): a Strength C at 90 min that cannot take more is noted */
      if(at||top.m>=90){held++;rep.push('  note: week '+(+w+1)+' Strength C '+top.n+' < '+x.id+' '+x.n+' leg sets, held by '+(at?'the band tolerance':'the 90 min ceiling'));}else issue(p.n+' week '+(+w+1)+': Strength C '+top.n+' leg sets < '+x.id+' '+x.n);});});
  rep.push('  band swaps '+nsw+' (max '+maxsw+' per session)'+(held?' · Strength C held by the tolerance in '+held+' week(s)':''));
  tw.forEach(w=>{const x=wk[w];if(x.legs+x.hinge<10)issue(p.n+' week '+(+w+1)+': legs + hinge '+(x.legs+x.hinge)+' (< 10)');
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

// 7 A-026 mapping: abduction counts for no pattern, old logs are read by the new mapping without being changed, new logs
// carry vm; a full pull pattern in a circuit swaps for a pattern-free exercise with the same sets and a hint
{const {k,w,errs}=boot(),D=setup(k,prof('Partner glutes'));
 if(k.itPat({k:'g_ab',opts:[{n:'Abductor machine'}]})!==''||k.itPat({k:'mx_g_ab'})!==''||k.itPat({k:'fav_g_ab'})!=='')issue('abduction still counts for a pattern');
 if(k.itPat({k:'g_ht'})!=='hinge'||k.itPat({k:'g_kb'})!=='hinge'||k.itPat({k:'c_sq'})!=='legs')issue('other leg mappings changed');
 const old={d:addD(TD,-1),id:'KB',t:'KB',rpe:6,vs:{pull:4,push:4,legs:4,hinge:10,core:0},ex:{'g_ab#0':[15,30],'g_45#0':[12,0]}};
 const neu={d:addD(TD,-2),id:'KA',t:'KA',rpe:6,vs:{pull:4,push:4,legs:0,hinge:6,core:0},vm:1,ex:{'g_ab#0':[15,30]}};
 D.logs=[vlog('2026-10-20','KA',{}),neu,old];const snap=JSON.stringify(D.logs);
 const t=k.vs7(TD);if(t.hinge!==13)issue('old log not read by the new mapping: hinge '+t.hinge+' (expected 7 + 6)');
 if(JSON.stringify(D.logs)!==snap)issue('reading the stats changed the logs');
 const ci=k.cleanImport({v:3,logs:[neu,old]});if(!ci||ci.logs[0].vm!==1||ci.logs[1].vm!=null)issue('cleanImport: vm not kept/added as sent');
 const ci2=k.cleanImport({v:3,logs:[Object.assign({},neu,{vm:'<b>'}),Object.assign({},neu,{vm:99})]});if(!ci2||ci2.logs.some(l=>l.vm!=null&&!(l.vm>=0&&l.vm<=3)))issue('cleanImport: junk vm accepted');
 // a logged session today carries vm
 D.logs=[vlog('2026-10-20','KA',{})];const dy=k.day();dy.pick='KA';dy.fin={rpe:6};const c=k.ctx(TD),s=k.S('KA',c);s.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(k.curVar(it,k.LOC())>=0)dy.done['KA-'+bix+'-'+ii]=true;});});
 k.saveTrain();const l=D.logs[D.logs.length-1];if(l.vm!==3)issue('new log without vm (A-035: VMAP 3)');
 // pull far over the band: the circuit keeps its rounds, a pull item swaps for a pattern-free one
 const z=boot(),k2=z.k,E=setup(k2,prof('Partner glutes'));E.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-5),'KB',{pull:6,push:4,hinge:4}),vlog(addD(TD,-3),'KC',{pull:3,push:3,legs:6,hinge:4}),vlog(addD(TD,-1),'KB',{pull:6,push:4,hinge:4})];
 const c2=k2.ctx(TD),s2=k2.S('KA',c2),v2=k2.volSets(s2,c2,'KA'),sw=[];s2.blocks.forEach(b=>b.items.forEach(it=>{if(it.bx)sw.push([b,it]);}));
 if(!sw.length)issue('pull over the band: nothing swapped');
 sw.forEach(([b,it])=>{if(k2.itPat(it))issue('swapped-in exercise '+it.k+' counts for a pattern');if(b.lowb||b.warm||b.cool||b.gx||b.add)issue('swap in a protected block '+b.name);});
 if(!sw.some(([b,it])=>/row|pulldown|pull-up/i.test(it.bx)))issue('no pull exercise swapped');if(sw.length>1)issue('pull over the band: '+sw.length+' swaps (A-032: max 1)');if(v2.pull>6)issue('KA still '+v2.pull+' pull sets with 15 in the last 6 days');
 E.tab='train';k2.day().pick='KA';k2.render();const tx=z.w.document.getElementById('app').textContent;if(sw.length&&tx.indexOf('Instead of '+sw[0][1].bx)<0)issue('swap hint not shown');
 if(s2.min<60||s2.min>90)issue('swapped KA '+s2.min+' min');
 rep.push('Pull over the band, KA: pull '+v2.pull+', swaps '+sw.map(([b,it])=>it.bx+' → '+it.opts[it.fx].n).join(', '));
 if(errs.length||z.errs.length)issue('JS errors '+errs.concat(z.errs).join('; '));}

console.log('--- 12 weeks per profile (peak = most sets in 7 days, avg = per training week; H hinge / L legs / P pull / D push / C core) ---');rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
