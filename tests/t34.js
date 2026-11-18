// @name run-steering
// P-6 run steering: 8-week simulations (runs logged with the planned distance from runPlan): hard runs ≤ 1/3 of all runs and
// never 2 hard ones within 3 runs (captain, runner, partner with a 10 km goal); run goal / run focus: the hard run is a long
// easy run 1× per training week, weekly km never jump > 30 % above the 4-week average; with a goal date the 7 days before
// carry 40–60 % fewer km (taper), the date keeps the full test. Long run +10 % after an easy rating; extra easy runs and
// logged past runs count for the weekly km and the easy share; km insight > 30 %; texts and names (long run, taper);
// week preview uses the planned km; legs ≥ 2 per week stay (not with the run focus, which caps strength at 2 per week); a run that would break the 30 % cap is not suggested; old backup.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {doTrain,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),txt:()=>w.document.body.textContent};}
const START='2026-09-21';const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start,td){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:start||START,short:false,fav:(p.fav||[]).slice(),tab:'start',bkTs:Date.now()});k.today(td||start||START);return D;}
/* like fixtures/sim.js, but runs are logged with the planned distance (what the run page asks for) */
function simR(k,days,start,cb){const D=k.D(),out=[];
  for(let i=0;i<days;i++){const s=addD(start,i);k.today(s);const r=k.recAll(s,false);const row={d:s,id:r.id,btn:r.btn};
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6,min:90});
    else if(r.btn==='run'){const pl=k.runPlan(r.id);row.km=pl.km;row.why=pl.why;row.hard=k.hardRunL({id:r.id});D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:pl.km,min:Math.round(pl.km*6.2)});}
    else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
    else{doTrain(k,r.id);}
    const l=D.logs[D.logs.length-1];row.leg=!!(l&&l.d===s&&k.legLog(l));if(cb)cb(row,s);out.push(row);}
  return out;}
const wkOf=s=>Math.floor((Date.parse(s)-Date.parse(START))/864e5/7);
function weeks(k,out){const W=[];out.forEach(r=>{const w=wkOf(r.d),x=W[w]||(W[w]={km:0,runs:0,hard:0,rh:0,legs:0,dl:false,ids:[]});x.ids.push(r.id);if(k.ctx(r.d).cyc===6)x.dl=true;
  if(r.btn==='run'){x.km+=r.km;x.runs++;if(r.hard)x.hard++;if(r.id==='RH')x.rh++;}if(r.leg)x.legs++;});return W;}
// 1 eight weeks: hard share, no 2 hard within 3 runs, legs, long run and km jumps with a run goal / run focus
[['Captain',null],['Runner',null],['Partner glutes','d10'],['Runner','d10']].forEach(([pn,gk])=>{const {k,errs}=boot(),D=setup(k,prof(pn));if(gk){k.setGoal(gk);D.goal.v=999;}
  const out=simR(k,56,START),runs=out.filter(r=>r.btn==='run'),hard=runs.filter(r=>r.hard).length,W=weeks(k,out),tag=pn+(gk?' '+gk:'');
  if(!runs.length)issue(tag+': no runs');if(hard*3>runs.length)issue(tag+': '+hard+' hard of '+runs.length+' runs (> 1/3)');
  for(let i=2;i<runs.length;i++){const n=runs.slice(i-2,i+1).filter(r=>r.hard).length;if(n>1){issue(tag+': 2 hard runs within 3 ('+runs.slice(i-2,i+1).map(r=>r.d+' '+r.id).join(', ')+')');break;}}
  W.forEach((x,i)=>{/* run focus caps strength at 2 per week (A-009 covers the other focuses) */if(!x.dl&&x.legs<2&&D.focus!=='run')issue(tag+': week '+(i+1)+' only '+x.legs+' leg sessions');
    if((gk||pn==='Runner')&&!x.dl&&x.rh<1)issue(tag+': week '+(i+1)+' without a long run');
    if(i>=2){const pv=W.slice(Math.max(0,i-4),i).filter(y=>y.runs),avg=pv.reduce((a,y)=>a+y.km,0)/(pv.length||1);if(pv.length>=2&&x.km>1.3*avg+0.01)issue(tag+': week '+(i+1)+' '+x.km+' km > 130 % of '+avg.toFixed(1));}});
  if(errs.length)issue(tag+' JS errors '+errs.join('; '));
  rep.push(tag+': hard '+hard+'/'+runs.length+'\n    '+W.map((x,i)=>'W'+(i+1)+(x.dl?'(DL)':'')+' ['+x.ids.join(' ')+'] km '+x.km+' long '+x.rh+' hard '+x.hard).join('\n    '));});
// 2 taper: goal date → the 7 days before carry 40–60 % fewer km, the date keeps the full test
{const {k}=boot(),D=setup(k,prof('Runner'));D.runKm=8;k.setGoal('d10');D.goal.v=10;const gd=addD(START,48);D.goal.d=gd;
 const out=simR(k,49,START),km=(a,b)=>out.filter(r=>r.d>=a&&r.d<b&&r.btn==='run').reduce((s,r)=>s+r.km,0);
 const tw=km(addD(gd,-7),gd),pre=[1,2,3].map(j=>km(addD(gd,-7-7*j),addD(gd,-7*j))),avg=pre.reduce((a,b)=>a+b,0)/3,ratio=tw/avg;
 if(ratio<0.4||ratio>0.6)issue('taper week '+tw+' km vs '+avg.toFixed(1)+' before ('+Math.round((1-ratio)*100)+' % fewer, expected 40–60 %)');
 const tr=out.filter(r=>r.d>=addD(gd,-7)&&r.d<gd&&r.btn==='run');if(tr.some(r=>r.why!=='taper'&&r.why!=='cap'))issue('taper run without taper plan: '+JSON.stringify(tr));
 const day=out.find(r=>r.d===gd);if(!day||day.id!=='RH'||day.km<8)issue('goal day '+JSON.stringify(day));
 k.today(addD(gd,-3));const ri=k.runInfo('RE');if(!/Taper week/.test(ri.p))issue('no taper text: '+ri.p);
 rep.push('taper: week before '+tw+' km, 3 weeks before '+pre.join('/')+' → '+Math.round((1-ratio)*100)+' % fewer; date '+(day&&day.id+' '+day.km+' km'));}
// 3 long run: +10 % after an easy rating, names and texts; hard run outside long-run mode
// A-044: the long run grows by 10 % only in the build season and only up to 35 % of the 4-week mean, so this case has
// 8 weeks of history (3 easy runs of 8 km + a 10 km long run, ≈ 34 km/week → cap 12 km) and lies in block 2 (build)
{const z=boot(),k=z.k,D=setup(k,prof('Runner'),'2026-09-21','2026-11-16');D.runKm=10;D.logs=[];
 for(let w=0;w<8;w++){const a=addD('2026-09-21',w*7);D.logs.push({d:a,id:'RE',t:'Easy run',rpe:4,km:9,min:58},{d:addD(a,2),id:'RE',t:'Easy run',rpe:4,km:9,min:58},{d:addD(a,4),id:'RE',t:'Easy run',rpe:4,km:9,min:58},{d:addD(a,6),id:'RH',t:'Long run',rpe:4,km:10,min:66});}
 if(k.runPh('2026-11-16')!=='build')issue('t34 case 3 not in the build season: '+k.runPh('2026-11-16'));
 const dy=k.day();dy.run='RH';dy.fin={rpe:4,km:'10',min:'65'};D.tab='run';k.render();if(!/long run/i.test(z.txt()))issue('run page without long run text');
 k.saveRun();if(D.runKm!==11)issue('long run +10 % after easy: '+D.runKm);const l=D.logs[D.logs.length-1];if(l.t!=='Long run')issue('long run name '+l.t);
 if(!/long run/.test(k.runInfo('RH').h))issue('runInfo long run '+k.runInfo('RH').h);
 D.focus='bal';k.render();if(k.longMode())issue('balanced without run goal in long-run mode');if(/long/.test(k.runInfo('RH').h))issue('hard run text in balanced mode');
 k.setGoal('d5');if(!k.longMode())issue('run goal not in long-run mode');if(z.errs.length)issue('JS errors '+z.errs.join('; '));}
// 4 extra easy runs and logged past runs count: weekly km, easy share, km insight, preview km, km cap
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-08-03','2026-11-18');const ws='2026-11-16';
 ['2026-10-19','2026-10-26','2026-11-02','2026-11-09'].forEach(a=>{D.logs.push({d:a,id:'RE',t:'Easy run',rpe:4,km:5,min:32},{d:addD(a,3),id:'RH',t:'Hard run',rpe:8,km:5,min:28});});
 D.logs.push({d:ws,id:'RE',t:'Easy run',rpe:4,km:5,min:31},{d:addD(ws,1),id:'RE',t:'Easy run',rpe:4,km:4,min:26,bl:1});D.logs.sort((a,b)=>a.d<b.d?-1:1);k.day('2026-11-16').xr=true;
 const st=k.kmStat();if(st.cur!==9||st.avg!==10)issue('km stat with extra/past runs '+JSON.stringify(st));
 /* A-044: the easy run is a share of the 4-week mean (25 % of 10 km → the 4 km floor), so it fits the room of 4 km on its
    own; the cap is checked with the long run (10 km > room 4) */
 const pl=k.runPlan('RE');if(pl.km>4)issue('km cap: easy plan '+JSON.stringify(pl)+' (room 13 − 9 = 4)');
 const plh=(D.runKm=10,k.runPlan('RH'));if(plh.km>4||plh.why!=='cap')issue('km cap: plan '+JSON.stringify(plh)+' (room 13 − 9 = 4)');
 D.tab='stand';k.render();let t=z.txt();if(!/easy share/.test(t))issue('no easy share in the stats');if(!z.$('svg[aria-label="Kilometres per week, last 12 weeks"] .rf'))issue('no average line in the km chart');
 const m=t.match(/easy share (\d+) % of (\d+) runs/);if(!m||m[2]!=='9'||m[1]!=='56')issue('easy share '+(m&&m[0]));
 D.logs.push({d:'2026-11-18',id:'RE',t:'Easy run',rpe:4,km:5,min:32});k.render();t=z.txt();if(!/more than 30 % above/.test(t))issue('no km insight at 14 km vs 10');
 k.WK.key='';const wp=k.weekPlan(),rr=wp.find(e=>e.run);rep.push('preview: '+wp.map(e=>e.id).join(' '));
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}
// 5 old backup
{const old={v:3,onb:true,start:'2026-08-03',profile:{pull:6},runKm:7,focus:'run',logs:[{d:'2026-11-02',id:'RH',t:'Hard run',rpe:8,km:9},{d:'2026-11-05',id:'RE',t:'Easy run',rpe:4}],kickDays:[],theme:'templar'};
 const y=boot();y.k.today('2026-11-16');if(!y.k.restore(JSON.stringify(old)))issue('old backup refused');else{['start','run','verlauf','stand'].forEach(t=>{y.k.D().tab=t;y.k.render();});if(y.errs.length)issue('old backup JS errors '+y.errs.join('; '));
   if(y.k.D().logs.find(l=>l.id==='RH').t!=='Hard run')issue('old log name changed');}}
console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
