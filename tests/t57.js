// @name run-seasons
// A-044 (L6): run seasons in step with the accent blocks (blkNo % 4): base (easy share grows the week), build (long run
// grows), tempo (interval forms take turns), hold (every run −20 %, intensity kept [Q57]). The easy run is a share of the
// 4-week mean (with the old fixed distance as floor), the long run may grow up to 30 % of the 4-week mean (A-053, was 35 %) (not a fixed
// number), the 130 % week guard stays, at most 1 of 3 runs hard; tempo hint from the own best times (text only);
// "Just starting" keeps 4 weeks of easy runs; run goals up to 42 km stay in the goal chain. No new field.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const START='2026-01-05';const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
/* state in training week wk: one strength log per week, runs per week (easy 8, 8, long 12; o.re/o.rh change them) */
function setup(k,wk,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:o.focus||'run',emph:'bal',kickDays:[],logs:[],start:START,short:false,goal:null,fav:[],pr:{},runKm:o.runKm||12,runI:o.runI||5});
  delete D.easy;delete D.startP;if(o.startP)D.startP=o.startP;D.days={};
  for(let w=0;w<wk-1;w++){const a=addD(START,w*7);D.logs.push({d:a,id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8},ex:{}});if(!o.noRuns)D.logs.push({d:addD(a,1),id:'RE',t:'Easy run',rpe:4,km:o.re||8,min:52},{d:addD(a,3),id:'RE',t:'Easy run',rpe:4,km:o.re||8,min:52},{d:addD(a,5),id:'RH',t:'Long run',rpe:4,km:o.rh||12,min:80});}
  const T=addD(START,(wk-1)*7+2);k.today(T);k.setGoal('none');return D;}
// 1 seasons in step with the blocks
{const {k}=boot();const seq=[];for(let wk=1;wk<=25;wk+=6){setup(k,wk);seq.push(k.runPh(k.today()));}
  if(seq.join(',')!=='base,build,tempo,hold,base')issue('season order: '+seq);
  setup(k,8);k.setGoal('sq');if(k.runPh(k.today())!=='build')issue('a goal shifted the run season');
  rep.push('seasons per block: '+seq.join(' → '));}
// 2 easy run as a share of the 4-week mean, old fixed distance as floor; hold −20 %
{const {k}=boot();let D=setup(k,3);const b=k.runPlan('RE').km;// base: 30 % of 28 = 8.5 → cap 12
  setup(k,9);const bu=k.runPlan('RE').km;setup(k,21);const ho=k.runPlan('RE').km;
  if(b!==8.5)issue('base easy run not 30 % of the mean (28 km): '+b);if(bu!==7)issue('build easy run not 25 %: '+bu);if(Math.abs(ho-5.5)>0.01)issue('hold easy run not −20 %: '+ho);
  D=setup(k,3,{noRuns:true});if(k.runPlan('RE').km!==6)issue('without run history not the old 6 km: '+k.runPlan('RE').km);
  D=setup(k,3,{focus:'bal',runKm:7});D.logs=D.logs.filter(l=>l.id!=='RE');const sm=k.runPlan('RE').km;if(sm<5)issue('balanced easy run under its old floor 5: '+sm);
  const ri=(setup(k,3),k.runInfo('RE'));if(!/8\.5 km easy/.test(ri.h))issue('easy text without km: '+ri.h);
  rep.push('easy run base '+b+' · build '+bu+' · hold '+ho+' km (mean 28 km/week)');}
// 3 long run (A-053: 12 + 12 + 14 = 38 km a week): cap 30 % of the mean, at least the easy run + 1 km, growth by season (build +10 %, base +0.5, tempo/hold hold), planned growth in build, hold −20 %
{const {k}=boot();const V={re:12,rh:14};let D=setup(k,9,{runKm:9,...V});const cap=k.longCap(k.today());if(cap!==11.5)issue('long cap not 30 % of 38: '+cap);
  const pl=[];for(let c=0;c<5;c++){D.logs.push({d:addD(k.today(),1),id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8},ex:{}});}
  D=setup(k,9,{runKm:10,...V});const p1=k.runPlan('RH').km;D=setup(k,11,{runKm:10,...V});const p3=k.runPlan('RH').km;if(!(p3>p1))issue('build season: planned long run does not rise in the block: '+p1+' → '+p3);if(p3>k.longCap(k.today()))issue('planned long run over the cap');
  const save=(wk,rk,rpe)=>{const D=setup(k,wk,{runKm:rk,...V});const dy=k.day();dy.run='RH';dy.fin={rpe,km:String(rk),min:String(rk*6.5)};k.saveRun();return D.runKm;};
  const g1=save(9,9,4),g0=save(3,9,4),g2=save(15,9,4),g3=save(21,9,4),gc=save(9,11.5,4);
  if(g1!==10)issue('build: +10 % up to the cap expected 10, got '+g1);if(g0!==9.5)issue('base: +0.5 expected 9.5, got '+g0);if(g2!==9||g3!==9)issue('tempo/hold changed the long run: '+g2+'/'+g3);if(gc!==11.5)issue('long run grew past the cap: '+gc);
  const big=save(9,14,4);if(big!==14)issue('a longer stored run was cut: '+big);
  D=setup(k,21,{runKm:12,...V});if(k.runPlan('RH').km!==9.5)issue('hold long run not −20 %: '+k.runPlan('RH').km);
  rep.push('long cap '+cap+' km · planned build '+p1+' → '+p3+' · after easy: build '+g1+', base '+g0+', tempo '+g2+', hold '+g3);}
// 4 interval forms take turns in the tempo season (4 forms), alternate in build, 3 min in base/hold (hold fewer reps)
{const {k}=boot();let D=setup(k,15);const forms=[],heads=[];for(let i=0;i<5;i++){forms.push(k.riForm(k.today()));heads.push(k.runInfo('RI').h);D.logs.push({d:addD(k.today(),-1),id:'RI',t:'Intervals',rpe:6,km:7,min:45});D.logs.sort((a,b)=>a.d<b.d?-1:1);}
  if(forms.slice(0,4).sort().join()!=='i1,i3,i6,str'||forms[4]!==forms[0])issue('tempo forms: '+forms);
  D=setup(k,9);const b1=k.riForm(k.today());D.logs.push({d:addD(k.today(),-1),id:'RI',t:'Intervals',rpe:6,km:7,min:45});const b2=k.riForm(k.today());if(b1===b2)issue('build forms do not alternate');
  setup(k,3);if(k.riForm(k.today())!=='i3')issue('base form not 3 min');D=setup(k,21,{runI:6});if(!/^5 × 3 min/.test(k.runInfo('RI').h))issue('hold intervals not fewer: '+k.runInfo('RI').h);
  /* runI rises only after a 3 min form, never in hold */
  D=setup(k,15);while(k.riForm(k.today())!=='i1')D.logs.push({d:addD(k.today(),-1),id:'RI',t:'Intervals',rpe:6,km:7,min:45});const i0=D.runI;const dy=k.day();dy.run='RI';dy.fin={rpe:6,km:'7',min:'45'};k.saveRun();if(D.runI!==i0)issue('runI rose after a 1 min form');
  rep.push('tempo season: '+heads.slice(0,4).join(' | '));}
// 5 tempo hint from the own best times (text only), none without times
{const {k}=boot();let D=setup(k,3);if(/Pace guide/.test(k.runInfo('RE').p))issue('pace hint without best times');
  D.pr['run:t5']={min:30.8,d:addD(k.today(),-10)};const t=k.runInfo('RE').p;if(!/best 5 km 6:10\/km, today easy from about 7:10\/km/.test(t))issue('easy pace hint: '+t);
  setup(k,15);k.D().pr['run:t5']={min:30.8,d:'2026-01-01'};const ri=k.runInfo('RI');if(!/Pace guide/.test(ri.p)&&!/strides/.test(ri.h))issue('interval pace hint missing: '+ri.p);
  rep.push('hint: '+t.match(/Pace guide[^.]*\./)[0]);}
// 6 kept: Just starting (easy only in the first 4 weeks), 130 % guard, ≤ 1 of 3 runs hard, goal chain to 42 km
{const {k}=boot();let D=setup(k,2,{startP:'s0',focus:'run'});const r=k.recAll(k.today(),false)||{};if(r.id==='RH'||r.id==='RI')issue('Just starting: hard run in week 2');
  D=setup(k,9);D.logs.push({d:addD(k.today(),-1),id:'RE',t:'Easy run',rpe:4,km:30,min:200});const pl=k.runPlan('RH');if(pl.km>Math.max(2,k.kmStat().avg*1.3-k.kmStat().cur)+0.01&&pl.why!=='cap')issue('130 % guard lost: '+JSON.stringify(pl));
  const ch=JSON.stringify(k.GCHAIN||'');if(ch.indexOf('d42')<0)issue('goal chain without 42 km');
  rep.push('just starting, 130 % guard, chain with 42 km');}
// 7 104-week runner (progress): weekly km and long run differ between seasons, hard ≤ 1/3 of runs, weekly km ≤ 130 % of the 4-week mean
{const {k}=boot();const p=PROF.find(x=>x.n==='Runner');const D=k.D();Object.assign(D.profile,p.prof||{});D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick||[],loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:'2026-11-16',short:false,fav:[]});delete D.startP;k.today('2026-11-16');
  const ph={},runs=[];let hard=0,over=0;
  longSim(k,52*7,'2026-11-16','prog',11,ev=>{if(ev.type==='run'){const x=k.runPh(ev.d),R=ph[x]||(ph[x]={km:0,lr:[],d:new Set()});R.km+=ev.km;if(ev.id==='RH')R.lr.push(ev.km);runs.push(ev.id);if(ev.id==='RI')hard++;}
    if(ev.type==='day'){const x=k.runPh(ev.d);(ph[x]||(ph[x]={km:0,lr:[],d:new Set()})).d.add(ev.d);if(ev.i%7===6){const st=k.kmStat(ev.d);if(st.n>=4&&st.cur>1.3*st.avg+2.01)over++;}}});
  const pk=Object.keys(ph).map(x=>[x,ph[x].km/(ph[x].d.size/7),ph[x].lr.reduce((a,b)=>a+b,0)/(ph[x].lr.length||1)]);
  const sp=i=>{const a=pk.map(r=>r[i]);return (Math.max(...a)-Math.min(...a))/Math.min(...a);};
  if(sp(1)<0.1)issue('weekly km do not differ between seasons: '+pk.map(r=>r[0]+' '+r[1].toFixed(1)));if(sp(2)<0.1)issue('long run does not differ between seasons');
  if(hard>runs.length/3+1)issue('hard runs '+hard+' of '+runs.length);if(over)issue(over+' weeks over 130 % of the 4-week mean');
  rep.push('52-week runner: '+pk.map(r=>r[0]+' '+r[1].toFixed(1)+' km/wk, long '+r[2].toFixed(1)).join(' · ')+' · intervals '+hard+'/'+runs.length);}
// 8 no new field; old backup loads
{const {k}=boot();const D=setup(k,9);const c=k.cleanImport(JSON.parse(JSON.stringify(D)));if(!c)issue('backup does not load');else['runPh','season','rf'].forEach(f=>{if(f in c)issue('new field '+f);});}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
