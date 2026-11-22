// @name pace-reference
// A-075: the pace guide's 5 km reference comes only from real efforts.
// a) a fast run rated Easy/Fine (rpe < 8) is no reference, also not as a record; a run rated Hard (rpe ≥ 8, ≥ 5 km) is.
// b) a 10 km effort counts as its pace − 9 s/km; efforts older than 365 days do not count.
// c) without an effort the easy guide follows the median of the last easy runs (≥ 2), intervals show no pace; no runs → no guide.
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();Object.assign(D,{onb:true,logs:[],start:'2026-01-05',focus:'run'});k.today(TD);return {k,D};}
const run=(d,id,km,min,rpe)=>({d,id,t:id,km,min,rpe});
function check(html){const bad=[];
  {const {k,D}=boot(html);D.logs=[run('2026-11-10','RE',5,26,4)];D.pr['run:t5']={min:26,d:'2026-11-10'};
   if(k.effPace())bad.push('a: an easy run became the reference ('+k.effPace()+')');
   D.logs.push(run('2026-11-15','RI',6,33,8));const p=k.effPace();if(Math.abs(p-5.5)>0.01)bad.push('a: hard 6 km in 33 min gives '+p+' (expected 5.5)');}
  {const {k,D}=boot(html);D.logs=[run('2026-11-01','RH',10,60,9)];const p=k.effPace();if(Math.abs(p-5.85)>0.01)bad.push('b: 10 km effort in 60 min gives '+p+' (expected 5.85)');
   D.logs=[run('2025-10-01','RH',5,25,9)];if(k.effPace())bad.push('b: an effort older than 365 days counts');}
  {const {k,D}=boot(html);if(/Pace guide/.test(k.paceHint('easy')))bad.push('c: guide without any run');
   D.logs=[run('2026-11-01','RE',5,35,4),run('2026-11-05','RE',6,40.8,4),run('2026-11-09','RE',5,36,4)];const h=k.paceHint('easy');
   if(!/easy like your recent easy runs, about 7:00\/km/.test(h))bad.push('c: easy guide '+h);if(k.paceHint('i3'))bad.push('c: interval pace without an effort');}
  return bad;}
check(HTML0).forEach(issue);
const MUT=[['a','||!(l.rpe>=8)||','||','a'],['b','||l.d<lim)return;',')return;','b'],
  ['c','var ep=kind==="easy"?easyPace():0;','var ep=0;','c']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=check(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
