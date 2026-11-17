// @name trial-rhythm
// A-024: Skill Trial every 14 ± 2 days for every emphasis. 12-week simulations of 4 profiles (captain balanced with a
// muscle-up goal, partner lower, partner glutes, beginner without a pull-up): Skill Trial gaps 14 ± 2 days (deload days not
// counted), it never takes the Strength C slot (Strength C every training week with lower/glutes), ≥ 2 leg sessions per
// training week, no Strength C / hard run the day before kickboxing (Skill Trial there only as the fallback at 16 days), the week preview of the day before shows
// every Skill Trial. Beginner: the trial tests an earlier stage (dead hang, then negative pull-ups in seconds) and shows its
// last value instead of "0 reps"; values land in profile/tv. Old logs and backups load.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s)};}
const START='2026-09-21';
const BEG={n:'Beginner',prof:{pull:0,dips:0,push:3,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:12,pike:0},focus:'bal',emph:'bal',skills:{},kick:[]};
const prof=n=>n==='Beginner'?BEG:PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:start||START,short:false,fav:(p.fav||[]).slice()});k.today(start||START);return D;}
const gap=(k,a,b)=>{const g0=Math.round((Date.parse(b)-Date.parse(a))/864e5);let g=g0;for(let q=1;q<g0;q++)if(k.ctx(addD(a,q)).cyc===6)g--;return [g0,g];};
// 1 twelve-week simulations
['Captain','Partner lower','Partner glutes','Beginner'].forEach(pn=>{const {k,errs}=boot(),p=prof(pn),D=setup(k,p);
  if(pn==='Captain'){k.setGoal('mu');D.goal.v=99;}
  const chD=[],wk=[],planned={},seq=[];
  sim(k,84,START,(r,s)=>{const i=Math.round((Date.parse(s)-Date.parse(START))/864e5),w=Math.floor(i/7),x=wk[w]||(wk[w]={kc:0,legs:0,dl:false,ids:[]});
    if(k.ctx(s).cyc===6)x.dl=true;x.ids.push(r.id);seq.push([s,r.id]);if(r.id==='KC')x.kc++;
    if(r.id==='CH'){chD.push(s);if(r.s&&!r.s.blocks.some(b=>b.trial&&b.items.length))issue(pn+': Skill Trial on '+s+' without test items');
      if(pn==='Captain'&&r.s){const t=r.s.blocks.find(b=>b.trial).items.map(it=>it.test);if(!t.includes('mu')||!t.includes('expl'))issue('captain MU goal: trial without muscle-up tests ('+t+')');}
      if(planned[s]!==undefined&&planned[s]!=='CH')issue(pn+': week preview of the day before showed '+planned[s]+' for the Skill Trial on '+s);}
    const l=k.D().logs[k.D().logs.length-1];if(l&&l.d===s&&k.legLog(l))x.legs++;
    k.today(addD(s,1));k.WK.key='';const pl=k.weekPlan();planned[addD(s,1)]=pl[0].id;k.today(s);});
  if(chD.length<4)issue(pn+': Skill Trial only '+chD.length+'× in 12 weeks ('+chD.join(',')+')');
  for(let j=1;j<chD.length;j++){const [g0,g]=gap(k,chD[j-1],chD[j]);if((g<12||g>16)&&(g0<12||g0>16))issue(pn+': Skill Trial gap '+g+' days ('+chD[j-1]+' → '+chD[j]+')');}
  /* the last trial is not overdue at the end of the simulation */
  if(chD.length){const [,g]=gap(k,chD[chD.length-1],addD(START,83));if(g>16)issue(pn+': Skill Trial overdue at the end ('+g+' days)');}
  const low=p.emph==='lower'||p.emph==='glutes';
  wk.forEach((x,i)=>{if(!x.dl&&!x.kc&&low)issue(pn+': week '+(i+1)+' without Strength C');if(!x.dl&&x.legs<2)issue(pn+': week '+(i+1)+' only '+x.legs+' leg sessions');});
  /* day-before rule: never Strength C or a hard run; the Skill Trial only as the fallback once it is 16 days old */
  seq.forEach(([s,id])=>{if(!k.isKick(addD(s,1)))return;if(['KC','RH','RI'].includes(id))issue(pn+': '+id+' on '+s+', the day before kickboxing');
    if(id==='CH'){const j=chD.indexOf(s);const g=j>0?gap(k,chD[j-1],s)[1]:99;if(g<16)issue(pn+': Skill Trial on '+s+', the day before kickboxing, only '+g+' days after the last');}});
  if(errs.length)issue(pn+' JS errors: '+errs.join('; '));
  rep.push(pn+': Skill Trial '+chD.join(', ')+'\n    '+wk.map((x,i)=>'W'+(i+1)+(x.dl?'(DL)':'')+' ['+x.ids.join(' ')+'] legs '+x.legs).join('\n    '));});
// 2 beginner trial: earlier stage, a value > 0 or seconds, never "0 reps"
{const z=boot(),k=z.k,D=setup(k,BEG,'2026-10-05');k.today('2026-11-16');
 const first=()=>k.trialItems()[0];let t=first();if(t.test!=='hang'||t.unit!=='s')issue('beginner (hang 12 s): first test '+t.test+' '+t.unit);
 D.tab='train';const dy=k.day();dy.pick='CH';k.render();let txt=(z.$('details[data-blk="CH-1"]')||{}).textContent||'';
 if(!/Dead hang/.test(txt)||!/so far 12 s/.test(txt))issue('beginner trial shows no dead hang with its last value: '+txt.slice(0,160));if(/0 reps/.test(txt))issue('beginner trial shows "0 reps"');
 // log it: the hang value goes into the profile and tv
 const s=k.S('CH',k.ctx(k.today()));s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(it.test)dy.inp['CH-'+bi+'-'+ii]={s:[it.test==='hang'?'34':'1']};}));dy.fin={rpe:6};k.saveTrain();
 const l=D.logs[D.logs.length-1];if(!l||!l.tv||l.tv.hang!==34||D.profile.hang!==34)issue('hang trial not stored '+JSON.stringify(l&&l.tv)+' '+D.profile.hang);
 // next stage: negative pull-ups in seconds, last value shown, only into tv
 k.today('2026-11-30');D.tab='train';t=first();if(t.test!=='neg'||t.unit!=='s')issue('beginner (hang 34 s): first test '+t.test+' '+t.unit);
 const dy2=k.day();dy2.pick='CH';k.render();txt=(z.$('details[data-blk="CH-1"]')||{}).textContent||'';if(!/Negative pull-ups/.test(txt)||!/first trial/.test(txt)||/0 reps/.test(txt))issue('negative trial display: '+txt.slice(0,160));
 const s2=k.S('CH',k.ctx(k.today()));s2.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(it.test)dy2.inp['CH-'+bi+'-'+ii]={s:[it.test==='neg'?'6':'1']};}));dy2.fin={rpe:6};k.saveTrain();
 const l2=D.logs[D.logs.length-1];if(!l2.tv||l2.tv.neg!==6)issue('negative trial not in tv '+JSON.stringify(l2.tv));if(D.profile.neg!=null)issue('negative trial leaked into the profile');
 k.today('2026-12-14');D.tab='train';const dy3=k.day();dy3.pick='CH';k.render();txt=(z.$('details[data-blk="CH-1"]')||{}).textContent||'';if(!/last trial 6 s/.test(txt))issue('negative trial without its last value: '+txt.slice(0,160));
 // with a first pull-up the real test returns
 D.profile.pull=1;if(first().test!=='pull')issue('pull-up test not back with pull 1');
 // backup round trip keeps tv.neg/hang
 const y=boot();y.k.today('2026-12-14');if(!y.k.restore(y.k.bkJSON?k.bkJSON():''))issue('backup refused');else{const E=y.k.D();if(!E.logs.some(x=>x.tv&&x.tv.neg===6))issue('tv.neg lost in the backup');E.tab='verlauf';y.k.render();E.tab='stand';y.k.render();}
 if(z.errs.length||y.errs.length)issue('beginner JS errors '+z.errs.concat(y.errs).join('; '));}
// 3 old logs and backups: old CH logs (no tv), old Strength C slot trials, no new fields
{const old={v:3,onb:true,start:'2026-08-03',profile:{pull:6,dips:10,push:20,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},ex:{},logs:[
  {d:'2026-08-04',id:'KA',t:'Strength A',rpe:7},{d:'2026-08-06',id:'KC',t:'Strength C',rpe:7},{d:'2026-08-18',id:'CH',t:'Challenge',rpe:8},{d:'2026-09-01',id:'CH',t:'Skill Trial',rpe:8,tv:{pull:7}},{d:'2026-09-03',id:'KB',t:'Strength B',rpe:7}],
  kickDays:[2,5],focus:'bal',theme:'templar',skills:{hs:true,mu:false,ls:false,fl:false,pl:false}};
 const z=boot();z.k.today('2026-09-21');if(!z.k.restore(JSON.stringify(old)))issue('old backup refused');else{const k=z.k;
   if(!(k.hist('2026-09-21').CH===20))issue('old CH log not counted: '+k.hist('2026-09-21').CH);
   ['start','train','verlauf','stand','mehr'].forEach(t=>{k.D().tab=t;k.render();});k.D().tab='start';k.WK.key='';const pl=k.weekPlan();if(!pl||pl.length!==7)issue('week preview after old backup');
   if(z.errs.length)issue('old backup JS errors '+z.errs.join('; '));}
 const z2=boot(old);z2.k.today('2026-09-21');z2.k.render();if(z2.errs.length)issue('old state from storage JS errors '+z2.errs.join('; '));}
console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
