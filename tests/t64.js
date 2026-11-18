// @name run-transition
// A-053 (M-4, M-5, N-4, N-5): runs after the hold season and after hold running – the first training week of the base season
// runs at × 0.9 (between hold × 0.8 and the full distance), and so do the 7 days after hold running is switched off; the long
// run is capped at 30 % of the 4-week mean [Q61] and is at least the easy run + 1 km, it grows a little in the build season
// also after "Fine"; hard runs count against the runs actually run: at most 1 of 3 of the runs of the last 14 days, so a run
// that is the only one of its week is easy; Balanced: the hard run stays ≤ 8 km (growth through brisk parts, text), the
// season line names a long run only in long-run mode; 52-week Runner and Captain runs of the t49 model: no week with a long
// run shorter than an easy run, no run of the first base week > 20 % over the same kind in the last hold week, hard runs ≤ 1/3
// in every 14 days.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const START='2026-01-05';
function setup(k,wk,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:o.focus||'run',emph:'bal',kickDays:[],logs:[],start:START,short:false,goal:null,fav:[],pr:{},runKm:o.runKm||12,runI:o.runI||5,hold:{str:false,run:false,sk:false}});
  delete D.easy;delete D.holdR;D.days={};const re=o.re||8,rh=o.rh||12;
  for(let w=0;w<wk-1;w++){const a=addD(START,w*7);D.logs.push({d:a,id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8},ex:{}});(o.runs||[[1,'RE',re,4],[3,'RE',re,4],[5,'RH',rh,4]]).forEach(([dd,id,km,rpe])=>D.logs.push({d:addD(a,dd),id,t:id,rpe,km,min:km*6}));}
  const T=addD(START,(wk-1)*7+(o.dow==null?2:o.dow));k.today(T);k.setGoal('none');return D;}
// 1 hold season → base: × 0.8, then × 0.9 for one training week, then the full distance
{const {k}=boot();const plan=(wk,id)=>{setup(k,wk,{});return k.runPlan(id).km;};
  const ph=[23,25,26].map(w=>{setup(k,w,{});return k.runPh(k.today());});if(ph.join()!=='hold,base,base')issue('seasons of weeks 23/25/26: '+ph);
  ['RE','RH','RI'].forEach(id=>{const h=plan(23,id),t=plan(25,id),f=plan(26,id);rep.push(id+': hold '+h+' → first base week '+t+' → '+f+' km');
    if(!(t<f&&t>=h))issue(id+': no transition week after the hold season ('+h+' → '+t+' → '+f+')');if(f>0&&t>f*0.9+0.51)issue(id+': transition not × 0.9 ('+t+' of '+f+')');});
  setup(k,25,{});if(!k.transWk(k.today()))issue('transWk false in the first base week');setup(k,26,{});if(k.transWk(k.today()))issue('transWk still on in the second base week');}
// 2 hold running switched off by tap: 7 days × 0.9, then full; switched on again: hold × ⅔
{const {k,d}=boot();const D=setup(k,10,{});const full=k.runPlan('RE').km;D.tab='mehr';k.render();
  const tap=()=>{const b=d.querySelector('[data-a=holdm][data-k=run]');if(!b){issue('no hold running switch');return;}b.click();};
  tap();if(!k.hold('run'))issue('hold running not on');const hk=k.runPlan('RE').km;tap();if(k.hold('run'))issue('hold running not off');if(D.holdR!==k.today())issue('end of hold running not stamped: '+D.holdR);
  const t=k.runPlan('RE').km;k.today(addD(k.today(),6));const t6=k.runPlan('RE').km;k.today(addD(k.today(),1));const t7=k.runPlan('RE').km;
  rep.push('hold running '+hk+' km → off: '+t+' km (day 6 '+t6+') → day 7 '+t7+' km (full '+full+')');
  if(!(t<full&&t6<full&&t7>=full-0.01))issue('7 days × 0.9 after hold running: '+[t,t6,t7,full].join(' / '));
  const o=k.cleanImport({v:3,logs:[],holdR:k.today()});if(o.holdR!==k.today())issue('backup drops holdR');const o2=k.cleanImport({v:3,logs:[],holdR:'x'});if(o2.holdR)issue('junk holdR kept');}
// 3 long run: 30 % cap and at least the easy run + 1 km; "Fine" grows a little in build
{const {k}=boot();let D=setup(k,9,{runKm:5,re:12,rh:14});const cap=k.longCap(k.today()),re=k.runPlan('RE').km,rh=k.runPlan('RH').km;
  if(cap!==11.5)issue('cap not 30 % of 38: '+cap);if(rh<Math.min(cap,re+1))issue('long run '+rh+' < easy '+re+' + 1');rep.push('cap '+cap+' · easy '+re+' · long '+rh+' (stored 5)');
  D=setup(k,9,{runKm:9,re:12,rh:14});const dy=k.day();dy.run='RH';dy.fin={rpe:6,km:'9',min:'60'};k.saveRun();if(D.runKm!==9.5)issue('build: Fine should add 0.5 km: '+D.runKm);
  D=setup(k,15,{runKm:9,re:12,rh:14});const dy2=k.day();dy2.run='RH';dy2.fin={rpe:6,km:'9',min:'60'};k.saveRun();if(D.runKm!==9)issue('tempo: Fine changed the long run: '+D.runKm);}
// 4 hard runs against the runs actually run (Balanced, no long-run mode)
{const {k}=boot();const day=(o)=>{setup(k,6,Object.assign({focus:'bal',dow:6},o));return k.hard3OK(k.today());};
  if(day({runs:[[1,'RE',6,4]]}))issue('one easy run in 14 days allows a hard run');
  if(!day({runs:[[1,'RE',6,4],[3,'RE',6,4]]}))issue('two easy runs a week: no hard run');
  if(day({runs:[[1,'RE',6,4],[3,'RH',8,7],[5,'RE',6,4]]}))issue('1 hard of 3 in 14 days and the next hard: allowed');
  const D=setup(k,6,{focus:'bal',dow:6,runs:[[5,'RE',6,4]]});const r=k.runRec?k.runRec():null;rep.push('Balanced, one run a week: '+(r?r.id:'(runRec n/a)'));if(r&&(r.id==='RH'||r.id==='RI'))issue('the only run of the week is hard: '+r.id);}
// 5 Balanced hard run ≤ 8 km, text, season line
{const {k}=boot();let D=setup(k,9,{focus:'bal',runKm:10,runs:[[1,'RE',6,4],[5,'RH',10,7]]});const p=k.runPlan('RH').km;if(p>8)issue('Balanced hard run '+p+' km > 8');
  const dy=k.day();dy.run='RH';dy.fin={rpe:4,km:'8',min:'45'};D.runKm=8;k.saveRun();if(D.runKm>8)issue('Balanced hard run grew past 8: '+D.runKm);
  const inf=k.runInfo('RH');const t=JSON.stringify(inf);if(!/brisk/.test(t))issue('hard run at 8 km without the brisk hint: '+t);if(/long run grows/.test(t))issue('Balanced season line names a long run: '+t);
  D=setup(k,9,{focus:'run'});const t2=JSON.stringify(k.runInfo('RH'));if(!/long run grows/.test(t2)&&k.runPh(k.today())==='build')issue('run focus build: season line without the long run');}
// 6 52-week runs of the t49 model
['Runner','Captain'].forEach(pn=>{const p=PROF.find(x=>x.n===pn);const {k}=boot();const D=k.D();Object.assign(D.profile,p.prof||{});D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:'2026-11-16',short:false,fav:(p.fav||[]).slice()});k.today('2026-11-16');
  const runs=[];longSim(k,364,'2026-11-16','prog',11,ev=>{if(ev.type==='run')runs.push(ev);});
  const wk={};runs.forEach(r=>{const w=Math.floor(r.i/7),x=wk[w]||(wk[w]={RE:0,RH:0,RI:0});x[r.id]=Math.max(x[r.id],r.km);});
  let short=0,jump=0,jx='',hard=0,hx='',tr=0;Object.keys(wk).forEach(w=>{const x=wk[w];if(D.focus==='run'&&x.RH&&x.RE&&x.RH<x.RE)short++;const y=wk[w-1],d0=addD('2026-11-16',w*7+3),d1=addD('2026-11-16',(w-1)*7+3);if(y&&k.runPh(d1)==='hold'&&k.runPh(d0)==='base'){tr++;['RE','RH','RI'].forEach(id=>{if(x[id]&&y[id]&&x[id]>y[id]*1.2+0.26){jump++;if(!jx)jx='week '+(+w+1)+' '+id+' '+y[id]+' → '+x[id];}});}});
  const isHard=r=>r.id==='RI'||(r.id==='RH'&&D.focus!=='run');runs.forEach((r,i)=>{const win=runs.filter(q=>q.i<=r.i&&q.i>r.i-14),h=win.filter(isHard).length;if(isHard(r)&&h*3>win.length+0.01){hard++;if(!hx)hx=r.d+' '+h+' of '+win.length;}});
  rep.push(pn+' 52 weeks: '+runs.length+' runs, weeks with a long run shorter than an easy run '+short+', hold → base transitions '+tr+', jumps > 20 % there '+jump+(jx?' ('+jx+')':'')+', hard over 1/3 of 14 days '+hard+(hx?' ('+hx+')':''));
  if(short)issue(pn+': '+short+' weeks with a long run shorter than an easy run');if(jump)issue(pn+': '+jump+' runs > 20 % over the last hold week, e.g. '+jx);if(!tr)issue(pn+': no hold → base transition measured');if(hard)issue(pn+': '+hard+' hard runs over 1/3 of 14 days, e.g. '+hx);});
console.log('--- t64 run-transition ---');rep.forEach(x=>console.log(x));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
