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

// 1 twelve-week simulations: the tolerance rule of the control station (A-026). The floors (60 min, 2 working sets,
// legs + hinge ≥ 10) rank above the band upper limit; the training-week average of every pattern lies in its band
// (core: the Core Blitz counts for no pattern, so only its upper limit is checked); a 7-day peak may reach the upper
// limit + 2 for an emphasis/goal pattern and + 4 for the others.
const BAND={hot:[12,20],cold:[8,14]};
PROF.forEach(p=>{const {k,errs}=boot(),D=setup(k,p,START);const hotP=({lower:['legs','hinge'],glutes:['hinge'],upper:['pull','push'],core:['core']})[p.emph]||[];
  sim(k,84,START,(r,s)=>{if(!r.s)return;if(['KA','KB','KC','CH','HO'].includes(r.id)&&!D.short&&(r.min<60||r.min>90))issue(p.n+' '+s+' '+r.id+': '+r.min+' min');
    const lb=lowb(r.s);if(hotP.length&&['lower','glutes'].includes(p.emph)&&['KA','KB','KC','CH'].includes(r.id)&&(!lb||!lb.items.some(it=>it.anc)))issue(p.n+' '+s+' '+r.id+': emphasis block without its anchor');
    const c=k.ctx(s);r.s.blocks.forEach(b=>{if(D.short&&b.p>1)return;b.items.forEach(it=>{if(!k.itPat(it)||k.curVar(it,k.LOC())<0)return;const n=k.setsOf(it,b,c,r.id);if(n<2)issue(p.n+' '+s+' '+r.id+' '+it.k+': '+n+' working set(s), floor is 2');});});});
  const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5);
  const wk={};D.logs.forEach(l=>{const w=Math.floor(day(l.d)/7),x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false,lg:0});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs)V.forEach(q=>x[q]+=l.vs[q]);if(l.lg)x.lg++;});
  const tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<11),sum=[];
  V.forEach(q=>{const hot=hotP.includes(q),[lo,hi]=hot?BAND.hot:BAND.cold,tol=hot?2:4;let peak=0;
    for(let i=6;i<84;i++){let h=0;D.logs.forEach(l=>{const x=day(l.d);if(x>i-7&&x<=i&&l.vs&&!l.bl)h+=l.vs[q];});peak=Math.max(peak,h);}
    const avg=tw.reduce((a,w)=>a+wk[w][q],0)/(tw.length||1);sum.push(q+' peak '+peak+' avg '+avg.toFixed(1)+' ('+lo+'–'+hi+(hot?', emphasis':'')+')');
    if(peak>hi+tol)issue(p.n+': '+q+' '+peak+' sets in 7 days (> '+hi+' + '+tol+')');
    if(avg>hi)issue(p.n+': '+q+' average '+avg.toFixed(1)+' per training week over the band ('+hi+')');
    if(avg<lo&&q!=='core')issue(p.n+': '+q+' average '+avg.toFixed(1)+' per training week under the band ('+lo+')');});
  rep.push(p.n+': '+sum.join(' | '));
  rep.push('  '+Object.keys(wk).map(w=>{const x=wk[w];return 'W'+(+w+1)+' H'+x.hinge+'/L'+x.legs+'/P'+x.pull+'/D'+x.push+'/C'+x.core+(x.dl?'(deload)':'');}).join(' '));
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
 const ci2=k.cleanImport({v:3,logs:[Object.assign({},neu,{vm:'<b>'}),Object.assign({},neu,{vm:99})]});if(!ci2||ci2.logs.some(l=>l.vm!=null&&!(l.vm>=0&&l.vm<=1)))issue('cleanImport: junk vm accepted');
 // a logged session today carries vm
 D.logs=[vlog('2026-10-20','KA',{})];const dy=k.day();dy.pick='KA';dy.fin={rpe:6};const c=k.ctx(TD),s=k.S('KA',c);s.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(k.curVar(it,k.LOC())>=0)dy.done['KA-'+bix+'-'+ii]=true;});});
 k.saveTrain();const l=D.logs[D.logs.length-1];if(l.vm!==1)issue('new log without vm');
 // pull far over the band: the circuit keeps its rounds, a pull item swaps for a pattern-free one
 const z=boot(),k2=z.k,E=setup(k2,prof('Partner glutes'));E.logs=[vlog('2026-10-20','KA',{}),vlog(addD(TD,-5),'KB',{pull:6,push:4,hinge:4}),vlog(addD(TD,-3),'KC',{pull:3,push:3,legs:6,hinge:4}),vlog(addD(TD,-1),'KB',{pull:6,push:4,hinge:4})];
 const c2=k2.ctx(TD),s2=k2.S('KA',c2),v2=k2.volSets(s2,c2,'KA'),sw=[];s2.blocks.forEach(b=>b.items.forEach(it=>{if(it.bx)sw.push([b,it]);}));
 if(!sw.length)issue('pull over the band: nothing swapped');
 sw.forEach(([b,it])=>{if(k2.itPat(it))issue('swapped-in exercise '+it.k+' counts for a pattern');if(b.lowb||b.warm||b.cool||b.gx||b.add)issue('swap in a protected block '+b.name);});
 if(!sw.some(([b,it])=>/row|pulldown|pull-up/i.test(it.bx)))issue('no pull exercise swapped');if(v2.pull>4)issue('KA still '+v2.pull+' pull sets with 15 in the last 6 days');
 E.tab='train';k2.day().pick='KA';k2.render();const tx=z.w.document.getElementById('app').textContent;if(sw.length&&tx.indexOf('Instead of '+sw[0][1].bx)<0)issue('swap hint not shown');
 if(s2.min<60||s2.min>90)issue('swapped KA '+s2.min+' min');
 rep.push('Pull over the band, KA: pull '+v2.pull+', swaps '+sw.map(([b,it])=>it.bx+' → '+it.opts[it.fx].n).join(', '));
 if(errs.length||z.errs.length)issue('JS errors '+errs.concat(z.errs).join('; '));}

console.log('--- 12 weeks per profile (peak = most sets in 7 days, avg = per training week; H hinge / L legs / P pull / D push / C core) ---');rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
