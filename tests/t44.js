// @name pain-matrix
// A-027: the pain filter works everywhere and before the design. Every region (wrist, shoulder, elbow, knee, lower back,
// ankle, hip) × every unit (gym/home) and every list: training items and warm-up show only pain-free exercises (the
// pain-free variant is chosen even against a stored choice, Swap keeps only pain-free ones, an item without one is
// replaced within its muscle group with a hint, else it goes), Core Blitz, morning routine, cool-downs (also after a run),
// "Next variation", Field kit and Never replacements, band swap; the duration is estimated after the filter and the 60 min
// floor holds; unit table: knee/ankle/hip → no Strength C, no leg block on upper-body days, no run goal day; shoulder/
// elbow/wrist → no Skill Trial or test (postponed, also the goal date); knee/ankle → kickboxing with a hint and a
// one-tap skip; comeback lock also on the goal day; word boundaries without the known false hits.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');const TBL=require('./fixtures/pattern-table.js');
const P=[];const issue=m=>P.push(m);
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};}
const TD='2026-11-16',START='2026-09-21';const R=['w','s','e','k','b','a','h'];
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||TD);return D;}
const pain=(D,r)=>{D.pain={w:false,s:false,e:false,k:false,b:false,a:false,h:false};if(r)D.pain[r]=true;};
const rep={};
// 0 word boundaries: the known false hits are gone, the real hits stay
{const {k}=boot();const D=k.D();const hit=(r,n)=>{pain(D,r);return k.painHit(n);};
 [['a','Cable Woodchopper'],['a','Band Woodchopper'],['b','Band external rotation'],['b','Side-lying external rotation, no weight'],['b','March in place with arm swings'],['h','Frogstand'],['h','Crow'],
  ['w','Side plank dips, switch sides each round'],['s','Side plank dips, switch sides each round'],['e','Side plank dips, switch sides each round'],['e','Nordic Curls'],['b','Side-lying leg raises'],['b','Leg swings, front to back and sideways'],['w','Wrist and ankle circles']]
  .forEach(([r,n])=>{if(hit(r,n))issue('false hit '+r+': '+n);});
 [['a','Box Jumps'],['a','Standing calf raises'],['b','Cable Woodchopper'],['b','Landmine rotation'],['b','Kettlebell Swings'],['b','Lying leg raises'],['h','Frog pumps'],['h','Barbell hip thrust'],['w','Frogstand'],['w','Crow'],['w','Parallel bar dips'],['s','Dips'],
  ['e','Dumbbell curls'],['k','Nordic Curls'],['k','Leg curl machine'],['k','Barbell back squat'],['w','Wrist prep'],['s','Overhead dumbbell extension'],['e','Clean pull-ups']].forEach(([r,n])=>{if(!hit(r,n))issue('real hit lost '+r+': '+n);});}
// 1 matrix: region × unit (gym and home) × lists
const UNITS=[['KA','g'],['KB','g'],['KC','g'],['CH','g'],['SK','g'],['DL','g'],['TE','g'],['HO','h'],['HK','h']];
const BLOCK={k:['KC'],a:['KC'],h:['KC'],s:['CH','TE'],e:['CH','TE'],w:['CH','TE']};
['Captain','Partner lower','Partner glutes'].forEach(pn=>{R.forEach(r=>{const {k,errs}=boot(),D=setup(k,prof(pn),TD);
  // a short history so the band and rounds work as usual
  D.logs=[{d:addD(TD,-9),id:'KA',t:'KA',rpe:6},{d:addD(TD,-8),id:'KC',t:'KC',rpe:6,lg:1}];pain(D,r);
  UNITS.forEach(([id,loc])=>{D.loc=loc;const c=k.ctx(TD),s=k.S(id,c),tag=pn+' '+r+' '+id+loc;let nRep=0;
    s.blocks.forEach(b=>{if(b.rehab||b.add)return;b.items.forEach(it=>{const v=k.curVar(it,k.LOC());if(v<0)return;const n=it.opts[v].n;
      if(k.painHit(n))issue(tag+': '+(b.warm?'warm-up':(b.cool?'cool-down':b.name))+' shows '+n);
      const a=k.avail(it,k.LOC());if(a.some(i=>k.painHit(it.opts[i].n)))issue(tag+': Swap offers a pain variant of '+n);
      const nx=k.nextVar(it,v,k.LOC());if(nx>=0&&k.painHit(it.opts[nx].n))issue(tag+': Next variation leads to '+it.opts[nx].n);
      if(it.px){nRep++;if(!it.pxk||!it.k)return;const g0=TBL.group(it.pxk,''),g1=it.kx||TBL.group(it.k,'');if(g0!==undefined&&g1!==g0)issue(tag+': '+it.px+' replaced across groups ('+g0+' → '+g1+')');}});
      (b.more||[]).forEach(m=>{const v=k.curVar(m,k.LOC());if(v>=0&&k.painHit(m.opts[v].n))issue(tag+': emphasis extra '+m.opts[v].n);});});
    if(s.ab){k.ABS[s.ab.i].items.forEach(it=>{const v=k.curVar(it,k.LOC());if(k.painHit(it.opts[v].n))issue(tag+': Core Blitz '+it.opts[v].n);});}
    // duration after the filter; 60 min floor for strength units the plan can pick
    if(!s.addMin&&s.min!==k.estMin(s,c,id))issue(tag+': duration not estimated after the filter ('+s.min+' vs '+k.estMin(s,c,id)+')');
    if(loc==='g'&&['KA','KB','KC','CH'].includes(id)&&!(BLOCK[r]||[]).includes(id)&&(s.min<60||s.min>90))issue(tag+': '+s.min+' min outside 60–90');
    rep[r]=(rep[r]||0)+nRep;});
  // morning routine (normal and short), cool-downs incl. after a run
  D.loc='g';const m=k.morning(TD);[false,true].forEach(sh=>k.mSections(m,sh).forEach(sec=>sec.items.forEach(x=>{if(k.painHit(x[0]))issue(pn+' '+r+': morning routine shows '+x[0]);})));
  ['up','legs','run','kick'].forEach(kind=>['g','h'].forEach(l=>k.coolItems(kind,l,TD).forEach(x=>{if(k.painHit(x[0]))issue(pn+' '+r+': cool-down '+kind+' shows '+x[0]);})));
  // the stored variant choice of a pain variant gives way to a pain-free one
  {const s=k.S('KA',k.ctx(TD));s.blocks.forEach(b=>{if(b.rehab||b.warm||b.cool)return;b.items.forEach(it=>{if(it.f||it.fx!=null)return;const bad=it.opts.findIndex(o=>k.painHit(o.n));const ok=it.opts.findIndex(o=>!k.painHit(o.n));if(bad<0||ok<0)return;
    D.vr['g|'+(it.k||it.iso||it.test||'f:'+it.opts[0].n)]=bad;const v=k.curVar(it,'g');if(v>=0&&k.painHit(it.opts[v].n))issue(pn+' '+r+': stored pain variant still shown for '+it.opts[v].n);});});D.vr={};}
  // Field kit and Never replacements stay pain-free
  {D.kit=[];k.day().kit=true;['KA','KB','KC'].forEach(id=>{const s=k.S(id,k.ctx(TD));s.blocks.forEach(b=>{if(b.rehab)return;b.items.forEach(it=>{const v=k.curVar(it,'m');if(v>=0&&k.painHit(it.opts[v].n))issue(pn+' '+r+' '+id+' Field kit: '+it.opts[v].n);});});});k.day().kit=false;
   const s0=k.S('KA',k.ctx(TD));const first=s0.blocks.filter(b=>!b.warm&&!b.cool&&!b.rehab).flatMap(b=>b.items).filter(it=>it.k&&!it.f&&k.curVar(it,'g')>=0).slice(0,2);
   D.never=first.flatMap(it=>it.opts.map(o=>o.n));const s1=k.S('KA',k.ctx(TD));s1.blocks.forEach(b=>{if(b.rehab)return;b.items.forEach(it=>{const v=k.curVar(it,'g');if(v>=0&&k.painHit(it.opts[v].n))issue(pn+' '+r+' Never replacement: '+it.opts[v].n);});});D.never=[];}
  if(errs.length)issue(pn+' '+r+': JS errors '+errs.join('; '));});});
// 2 a replacement keeps its muscle group and shows its hint; with nothing pain-free the item goes
{const {k,$,$$}=boot(),D=setup(k,prof('Captain'),TD);pain(D,'w');D.loc='g';const c=k.ctx(TD),s=k.S('KA',c);const px=s.blocks.flatMap(b=>b.items).filter(it=>it.px);
 if(!px.length)issue('wrist: no replacement in Strength A');D.tab='train';k.day().pick='KA';k.render();if(px.length&&!$$('.nxn').some(e=>/pain-free choice/.test(e.textContent)))issue('replacement hint missing');
 pain(D,'k');const kc=k.S('KC',k.ctx(TD));if(kc.blocks.some(b=>!b.rehab&&b.items.some(it=>{const v=k.curVar(it,'g');return v>=0&&/squat|lunge/i.test(it.opts[v].n);})))issue('knee: squat/lunge left in Strength C');}
// 3 unit table over 4-week simulations
R.forEach(r=>{['Partner lower','Captain'].forEach(pn=>{const {k,errs}=boot(),D=setup(k,prof(pn),START);pain(D,r);const rows=sim(k,28,START);
  const ids=rows.map(x=>x.id);(BLOCK[r]||[]).forEach(b=>{if(ids.includes(b))issue(pn+' '+r+': '+b+' recommended despite the pain region');});
  if(['k','a','h'].includes(r))rows.forEach(x=>{if(x.s&&['KA','KB','CH','HO'].includes(x.id)&&x.s.blocks.some(b=>b.legs))issue(pn+' '+r+' '+x.d+' '+x.id+': leg block on an upper-body day');});
  if(['k','a'].includes(r)&&ids.some(i=>['RE','RH','RI'].includes(i)))issue(pn+' '+r+': run recommended with knee/ankle');
  rows.forEach(x=>{if(!x.s)return;x.s.blocks.forEach(b=>{if(b.rehab||b.add)return;b.items.forEach(it=>{const v=k.curVar(it,'g');if(v>=0&&k.painHit(it.opts[v].n))issue(pn+' '+r+' '+x.d+' '+x.id+': '+it.opts[v].n);});});
    if(['KA','KB','KC','CH'].includes(x.id)&&(x.min<60||x.min>90))issue(pn+' '+r+' '+x.d+' '+x.id+': '+x.min+' min');});
  if(errs.length)issue(pn+' '+r+' sim: JS errors '+errs.join('; '));});});
// 4 kickboxing with knee/ankle: hint and a one-tap skip; other regions unchanged
R.forEach(r=>{const {k,$}=boot(),D=setup(k,prof('Captain'),TD);D.kickDays=[new Date(TD+'T12:00:00').getDay()];pain(D,r);D.tab='start';k.render();const rr=k.recAll(TD,false);
  if(['k','a'].includes(r)){if(rr.id!=='KI'||!rr.pain)issue(r+': kickboxing day without the pain hint');const b=$('[data-a=nokick]');if(!b||!/Skip kickboxing today/.test(b.textContent))issue(r+': no one-tap skip');else{b.click();if(k.recAll(TD,k.day().noKick).id==='KI')issue(r+': skip did not work');}}
  else if(rr.pain)issue(r+': kickboxing pain hint without knee/ankle');});
// 5 goal day: postponed when blocked (pain table, comeback), held otherwise
{const tests=[['pull','s',false],['pull','e',false],['pull','w',false],['pull','k',true],['d10','h',false],['d10','k',false],['d10','s',true],['pull','',true]];
 tests.forEach(([g,r,held])=>{const {k}=boot(),D=setup(k,prof('Captain'),TD);D.logs=[{d:addD(TD,-3),id:'KA',t:'KA',rpe:6},{d:addD(TD,-20),id:'KA',t:'KA',rpe:6}];k.setGoal(g);D.goal.d=TD;pain(D,r);
   const gd=k.goalDay(TD,[]);if(held&&!gd)issue('goal '+g+' with '+(r||'no pain')+': test not on the date');if(!held&&gd)issue('goal '+g+' with '+r+': test not postponed');
   if(!held){D.tab='start';k.render();if(D.goal&&D.goal.d!==addD(TD,1))issue('goal '+g+' with '+r+': date not moved to tomorrow ('+(D.goal&&D.goal.d)+')');if(!D.goal)issue('goal '+g+' with '+r+': ended instead of postponed');}});
 const {k}=boot(),D=setup(k,prof('Captain'),TD);D.logs=[{d:addD(TD,-14),id:'KA',t:'KA',rpe:6},{d:addD(TD,-16),id:'KB',t:'KB',rpe:6},{d:addD(TD,-18),id:'KC',t:'KC',rpe:6},{d:addD(TD,-20),id:'KA',t:'KA',rpe:6}];k.setGoal('pull');D.goal.d=TD;pain(D,'');
 if(!k.cbInfo(TD).noTest)issue('comeback case not set up');else if(k.goalDay(TD,[]))issue('comeback week: goal test not postponed');}
console.log('replacements per region: '+R.map(r=>r+' '+(rep[r]||0)).join(', '));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
