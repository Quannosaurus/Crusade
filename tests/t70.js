// @name rest-points
// A-061: the four rest points of A-059/A-060.
// a) I-50 lower-body trial series: a trial merged into a slot with another weight store (goal anchor gl_ht, Strength C
//    anchor g_ht) is its own measurement – series lbx (tv.lbx, record and progress test:lbx); the lb series, its record
//    and its last-trial line stay like with like. Set 1 is the test; progression, best set, record and goal check of the
//    anchor use the working sets (the set log keeps every set). An old backup with the old lb series loads and gives the
//    same level values as the build before A-061.
// Each point has one mutation that must turn its check red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];const START='2026-09-21';
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {k:w.__kz,w,errs};}
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,gk,o){o=o||{};const D=k.D();if(p.startP)D.startP=p.startP;
  Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph=p.emph;
  D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick||[],loc:o.loc||p.loc||'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(START);if(gk){k.setGoal(gk);D.goal.v=999;}return D;}
const items=s=>{const a=[];s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>a.push({it,b,key:(b.bi!=null?b.bi:bi)+'-'+ii})));return a;};

// ---------- a) I-50 ----------
/* the old backup: 60 weeks Partner glutes with the lb series at the Strength C anchor weight (as written before A-060);
   level values of the build before A-061 (17b635e): upper 0, lower 2; last trial 15 */
const OLDLV={up:0,lo:2,last:15};
function oldBk(k){const D=k.D();D.focus='bal';D.emph='glutes';D.onb=true;D.start='2025-01-06';D.loc='g';Object.assign(D.profile,{pull:3,dips:5,push:12,hang:30});
  const L=[];for(let wk=0;wk<60;wk++){const d=addD('2025-01-06',wk*7);
    L.push({d:addD(d,2),id:'KC',t:'Strength C',rpe:6,min:70,ex:{'g_ht#0':[10,40+wk*1.5],'c_sq#0':[8,30+wk]},vs:{pull:0,push:0,legs:6,hinge:8,core:3}});
    if(wk%2===0)L.push({d:addD(d,4),id:'CH',t:'Skill Trial',rpe:7,min:65,tv:{pull:3+Math.floor(wk/8),lb:12+(wk%5)},ex:{'test:lb':[12+(wk%5),40+wk*1.5],'test:pull':[3+Math.floor(wk/8),0]}});}
  D.logs=L;D.ex={'g_ht#0':{r:10,w:128.5,d:L[L.length-2].d,hold:false,n:'Barbell hip thrust',stall:0}};D.pr={'test:lb':{sc:128516,r:16,w:128.5,d:'2026-02-20',n:'Barbell hip thrust'}};
  return k.bkJSON();}
function unitA(html,log){const bad=[];
  /* 1 Skill Trial with the Hip thrust goal: the trial merges into the goal anchor (gl_ht) – another store than the
       Strength C anchor (g_ht) the lb series is measured on */
  {const {k,errs}=boot(html),D=setup(k,prof('Partner glutes'),'ht');
   D.logs.push({d:addD(START,-3),id:'CH',t:'Skill Trial',rpe:7,min:60,tv:{lb:14},ex:{'test:lb':[14,60]}});D.pr['test:lb']={sc:60014,r:14,w:60,d:addD(START,-3),n:'Barbell hip thrust'};
   const dy=k.day();dy.pick='CH';dy.fin={rpe:6};const c=k.ctx(START),s=k.S('CH',c),anc=items(s).find(x=>x.it.gx&&!x.it.gone);
   if(!anc||!anc.it.tsv)bad.push('a: goal anchor without merged trial');
   else{if(anc.it.tsv.t!=='lbx')bad.push('a: trial on the goal anchor writes the series '+anc.it.tsv.t+' (expected lbx)');
     const n=k.setsOf(anc.it,anc.b,c,'CH');dy.inp['CH-'+anc.key]={s:[15].concat(Array(n-1).fill(8)).map(String),w:'40'};dy.done['CH-'+anc.key]=true;k.saveTrain();
     const l=D.logs[D.logs.length-1],v=k.curVar(anc.it,'g'),ek=anc.it.k+'#'+v;
     if(!l.tv||l.tv.lbx!==15||l.tv.lb!=null)bad.push('a: log tv '+JSON.stringify(l.tv)+' (expected lbx 15, no lb)');
     if(k.lastTv('lb')!==14)bad.push('a: last lb trial changed to '+k.lastTv('lb'));
     if(D.pr['test:lb'].r!==14||D.pr['test:lb'].w!==60)bad.push('a: lb record changed '+JSON.stringify(D.pr['test:lb']));
     if(!D.pr['test:lbx']||D.pr['test:lbx'].r!==15||D.pr['test:lbx'].w!==40)bad.push('a: no own lbx record '+JSON.stringify(D.pr['test:lbx']));
     if(!l.ex[ek]||l.ex[ek][0]!==8)bad.push('a: best set of the anchor counts the trial set ('+JSON.stringify(l.ex[ek])+')');
     if(D.pr[ek]&&D.pr[ek].r!==8)bad.push('a: anchor record from the trial set ('+D.pr[ek].r+')');
     if(!D.ex[ek]||D.ex[ek].r!==8||String(D.ex[ek].s)!==String(Array(n-1).fill(8)))bad.push('a: anchor progression '+JSON.stringify(D.ex[ek]));
     if(!l.exs||String(l.exs[ek])!==String([15].concat(Array(n-1).fill(8))))bad.push('a: set log lost the trial set ('+JSON.stringify(l.exs&&l.exs[ek])+')');
     if(k.goalIsCheck(D.goal,l))bad.push('a: the trial set (15 ≥ top 10) made a goal check out of working sets of 8');
     if(l.vs.hinge<n)bad.push('a: the trial set does not count as a hinge set ('+l.vs.hinge+')');
     if(log)log.push('a: goal anchor trial → tv.lbx '+l.tv.lbx+' (record '+D.pr['test:lbx'].r+' × '+D.pr['test:lbx'].w+' kg), lb stays '+k.lastTv('lb')+' × 60 kg, anchor '+D.ex[ek].r+' × '+D.ex[ek].w+' kg, goal check '+k.goalIsCheck(D.goal,l));}
   if(errs.length)bad.push('a: JS '+errs.join('; '));}
  /* 2 the same store stays lb (a trial merged into the anchor it is measured on) */
  {const {k}=boot(html);setup(k,prof('Partner glutes'));const it={k:'g_ht',opts:[{n:'Barbell hip thrust',req:'g',w:true}]};
   if(k.lbKey({test:'lb',lk:'g_ht#0'},it,'g')!=='lb')bad.push('a: trial on its own store leaves the lb series');
   if(k.lbKey({test:'pull'},it,'g')!=='pull')bad.push('a: other tests change their key');}
  /* 3 old backup: loads without error, same level values, the lb series reads as before */
  {const a=boot(html);a.k.today('2026-03-10');const txt=oldBk(a.k);const b=boot(html);b.k.today('2026-03-10');const ok=b.k.restore(txt,'mehr');
   const lv={up:b.k.lvUp(),lo:b.k.lvLo(),last:b.k.lastTv('lb')};
   if(!ok||JSON.stringify(lv)!==JSON.stringify(OLDLV))bad.push('a: old backup '+(ok?'':'refused ')+JSON.stringify(lv)+' (before '+JSON.stringify(OLDLV)+')');
   try{b.k.render();}catch(e){bad.push('a: old backup does not render '+e.message);}
   if(a.errs.length||b.errs.length)bad.push('a: JS '+a.errs.concat(b.errs).join('; '));
   if(log)log.push('a: old backup level upper '+lv.up+' lower '+lv.lo+', last lb '+lv.last+' (as before)');}
  return bad;}

unitA(HTML,rep).forEach(issue);

// ---------- mutations ----------
const MUT=[['a','return t.test==="lb"&&t.lk!==','return 0&&t.test==="lb"&&t.lk!==',unitA]];
MUT.forEach(([tag,a,b,fn])=>{if(!HTML.includes(a)){issue('mutation '+tag+': code "'+a+'" not found');return;}const u=fn(HTML.replace(a,b),null);
  rep.push('mutation '+tag+': '+(u.length?'red ('+u[0]+')':'green'));if(!u.length)issue('mutation '+tag+' stays green');});

rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
