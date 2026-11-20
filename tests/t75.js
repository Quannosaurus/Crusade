// @name trial-variant-series
// I-53: the lower-body trial (Skill Trial with lower/glute emphasis) is one series per variant of its exercise.
// a) Gym, standard form (variant 0): the trial writes the series "lb" as before.
// b) Gym with another form picked (Hip thrust machine, variant 1): the trial is its own series "lbb" – log tv, record
//    test:lbb and the last-trial line; the lb series, its record and its last value stay untouched.
// c) Home (no barbell): the trial runs on a home form and never writes "lb".
// d) Backup round trip keeps tv.lbb and the record test:lbb (letters only, cleanImport).
// Mutation: every variant back into "lb" turns (b) red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];const START='2026-09-21';
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {k:w.__kz,w};}
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,loc){const D=k.D();if(p.startP)D.startP=p.startP;
  Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph='glutes';
  D.skills={hs:false,mu:false,ls:false,fl:false,pl:false};
  Object.assign(D,{kickDays:[],loc:loc,onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:START,short:false,fav:[],never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(START);return D;}
const items=s=>{const a=[];s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>a.push({it,b,key:(b.bi!=null?b.bi:bi)+'-'+ii})));return a;};
const isLbS=t=>t==='lb'||/^lb[a-j]$/.test(t);
function trial(k,D){const dy=k.day();dy.pick='CH';const c=k.ctx(START),s=k.S('CH',c);
  const x=items(s).find(y=>y.it.test&&isLbS(y.it.test)&&!y.it.gone);return {dy,s,x};}
function logTrial(k,D,x,dy,val){dy.inp['CH-'+x.key]={s:[String(val)]};dy.done['CH-'+x.key]=true;dy.fin={rpe:6};k.saveTrain();return D.logs[D.logs.length-1];}

function run(html){const bad=[];
  // a) gym, standard form
  {const {k}=boot(html),D=setup(k,prof('Partner glutes'),'g');const {x}=trial(k,D);
   if(!x)bad.push('a: no lower-body trial in the Skill Trial');else if(x.it.test!=='lb')bad.push('a: standard form writes '+x.it.test+' (expected lb)');}
  // b) gym, machine picked
  {const {k}=boot(html),D=setup(k,prof('Partner glutes'),'g');
   D.logs.push({d:addD(START,-14),id:'CH',t:'Skill Trial',rpe:7,min:60,tv:{lb:14},ex:{'test:lb':[14,60]}});
   D.pr['test:lb']={sc:60014,r:14,w:60,d:addD(START,-14),n:'Barbell hip thrust'};
   D.vr['g|g_ht']=1;D.ex['g_ht#1']={r:10,w:50,d:addD(START,-5),hold:false,n:'Hip thrust machine',stall:0};
   const {x,dy}=trial(k,D);
   if(!x)bad.push('b: no lower-body trial');
   else{if(x.it.test!=='lbb')bad.push('b: machine trial writes '+x.it.test+' (expected lbb)');
     if(x.it.lk!=='g_ht#1')bad.push('b: trial store '+x.it.lk);
     const l=logTrial(k,D,x,dy,18);
     if(!l.tv||l.tv.lbb!==18||l.tv.lb!=null)bad.push('b: log tv '+JSON.stringify(l.tv)+' (expected lbb 18, no lb)');
     if(k.lastTv('lb')!==14)bad.push('b: last lb trial changed to '+k.lastTv('lb'));
     if(k.lastTv('lbb')!==18)bad.push('b: last lbb trial '+k.lastTv('lbb'));
     if(D.pr['test:lb'].r!==14||D.pr['test:lb'].w!==60)bad.push('b: lb record changed '+JSON.stringify(D.pr['test:lb']));
     if(!D.pr['test:lbb']||D.pr['test:lbb'].r!==18||D.pr['test:lbb'].w!==50)bad.push('b: no own lbb record '+JSON.stringify(D.pr['test:lbb']));
     // d) backup round trip
     const bk=k.bkJSON();const {k:k2}=boot(html);const r=k2.parseBk(bk);
     const st=r&&(r.state||r.s||r);const L2=st&&st.logs,pr2=st&&st.pr;
     const l2=L2&&L2[L2.length-1];
     if(!l2||!l2.tv||l2.tv.lbb!==18)bad.push('d: backup lost tv.lbb ('+JSON.stringify(l2&&l2.tv)+')');
     if(!pr2||!pr2['test:lbb']||pr2['test:lbb'].r!==18)bad.push('d: backup lost record test:lbb');
     rep.push('b: machine trial → lbb 18, lb stays 14 × 60 kg');}}
  // c) home
  {const {k}=boot(html),D=setup(k,prof('Partner glutes'),'h');const {x}=trial(k,D);
   if(!x)rep.push('c: no lower-body trial at home (no form available)');
   else{if(x.it.test==='lb')bad.push('c: home trial ('+x.it.opts[0].n+') writes lb');else rep.push('c: home trial '+x.it.opts[0].n+' → '+x.it.test);}}
  return bad;}

run(HTML0).forEach(issue);
// mutation: every variant back into lb
{const m=HTML0.replace('function lbSer(v){return v>0&&v<LBV.length?"lb"+LBV[v]:"lb";}','function lbSer(v){return "lb";}');
 if(m===HTML0)issue('mutation: lbSer not found');else{const b=run(m);if(!b.some(x=>x.startsWith('b:')))issue('mutation (all variants lb) stays green');else rep.push('mutation all variants → lb: red ('+b.length+')');}}
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
