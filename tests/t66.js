// @name content-round
// A-056: a) handstand ladder past stage 3 (N-11): stage 4 from a 10 s free hold, stage 5 from 3 × 20 s free; kick-up
// practice, wrist balance drills, line hold, shape changes; past the top open targets (+seconds, no freeze, no "harder
// form"), never an easier form as the next step; sources in docs/longterm-concept.md; wrist/shoulder pain filters the new
// forms. b) run-goal plateau like strength goals: only measurable checks (long run / goal distance), 3 checks in ≥ 21 days →
// easy week or run measure (easy runs +10 % inside the 130 % guard), 6 checks in ≥ 42 days → another interval form; hold
// running and the hold season make no plateau line; the hard-run limit stays. c) hinge band doctrine for accent blocks
// (N-6): a pattern outside the emphasis may sit at ⅔ of its lower limit in the strength and skill blocks, documented.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const doc=fs.readFileSync(path.resolve(__dirname,'../docs/longterm-concept.md'),'utf8');
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
function base(k,o){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'bal',kickDays:[],logs:[],start:'2026-01-05',short:false,goal:null,fav:[],never:[],pr:{},theme:'templar',startP:'s1',hold:{str:false,run:false,sk:false}},o||{});D.days={};D.pain={w:false,s:false,e:false,k:false,b:false,a:false,h:false};return D;}
// a) handstand ladder
{const {k,d}=boot();const D=base(k,{});D.skills=Object.assign({},D.skills,{hs:true});const names=b=>b.items.map(it=>it.opts.map(o=>o.n).join('/'));
  const st=(hsw,hsf)=>{D.profile.hsw=hsw;D.profile.hsf=hsf;return k.hsStage();};
  [[20,0,1],[50,0,2],[50,6,3],[50,9,3],[50,10,4],[60,20,4],[60,33,4],[60,34,5],[60,200,5]].forEach(([w,f,e])=>{const s=st(w,f);if(s!==e)issue('stage for hsw '+w+' / hsf '+f+': '+s+' (expected '+e+')');});
  st(60,12);const b4=k.HSB(true),n4=names(b4).join(' | ');
  ['Kick-ups to a free hold','Toe Pulls','Heel Pulls','Freestanding handstand: hold','line hold'].forEach(x=>{if(!n4.includes(x))issue('stage 4 lacks '+x+': '+n4);});
  const hf=b4.items.filter(it=>it.iso==='hsf')[0];if(!hf)issue('stage 4 has no free hold');else if(hf.opts.some(o=>/frog|substitute|wall/i.test(o.n)))issue('stage 4 free hold offers an easier form: '+hf.opts.map(o=>o.n).join(', '));
  st(60,40);const n5=names(k.HSB(false)).join(' | ');if(!/shape changes/.test(n5))issue('stage 5 lacks shape changes: '+n5);if(/line hold/.test(n5))issue('line hold in the short block');
  rep.push('stage 4: '+n4);
  // open targets past the top: always rising, never lev 1, never an easier form from 10 s on
  let prev=0;for(let m=34;m<=240;m+=6){const q=k.isoQ('hsf',m);if(q.lev>0)issue('hsf '+m+' s: "harder form" at the top');if(!(q.open>=2))issue('hsf '+m+' s: no open goal');if(q.h<prev)issue('hsf target falls at '+m+' s');prev=q.h;}
  for(let m=10;m<34;m++){const q=k.isoQ('hsf',m);if(q.lev<0)issue('hsf '+m+' s points to an easier form');}
  if(k.isoQ('hsw',40).lev!==1)issue('hsw lost its harder form at 3 × 20 s');
  // logging the top keeps raising the max (no freeze, past the old 120 s cap)
  st(60,110);let ok=0;
  for(let i=0;i<8;i++){const dy=k.day();Object.assign(dy,{pick:'SK',done:{},inp:{}});const c=k.ctx(k.today());const s=k.S('SK',c);let found=false;s.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.iso!=='hsf')return;found=true;const q=k.isoQ('hsf',D.profile.hsf);const key='SK-'+bix+'-'+ii;dy.done[key]=true;dy.inp[key]={s:Array(q.n).fill(String(q.h+1))};});});
    if(!found){issue('no free handstand hold in the skill session at stage 5');break;}const m0=D.profile.hsf;dy.fin={rpe:6};k.saveTrain();if(D.profile.hsf>m0)ok++;D.logs=[];k.today(addD(k.today(),2));}
  if(ok<8)issue('free hold max did not rise after every full log at the top ('+ok+'/8, now '+D.profile.hsf+' s)');rep.push('top: max after 8 full logs '+D.profile.hsf+' s, target '+JSON.stringify(k.isoQ('hsf',D.profile.hsf)));
  // render: open goal shown, no easier form hint
  st(60,40);D.logs=[];D.tab='train';Object.assign(k.day(),{pick:'SK',done:{},inp:{}});k.render();const tx=d.getElementById('app').textContent;
  if(!/Open goal: a free hold of \d+ s/.test(tx))issue('training page shows no open goal for the free hold');if(/harder form is the next step[^.]*\. Hold longer/.test(tx))issue('free hold still says "harder form"');
  // pain: wrist and shoulder filter the new forms
  D.pain.w=true;['Kick-ups to a free hold','Toe Pulls, back to the wall','Chest-to-wall line hold','Straddle-to-straight shape changes','Wrist rocks on all fours, palms and backs of the hands'].forEach(n=>{if(!k.painHit(n))issue('wrist pain does not filter '+n);});D.pain.w=false;
  D.pain.s=true;['Kick-ups to a free hold','Toe Pulls, back to the wall','Straddle-to-straight shape changes'].forEach(n=>{if(!k.painHit(n))issue('shoulder pain does not filter '+n);});D.pain.s=false;
  // documentation
  ['[Q65]','[Q66]','[Q67]'].forEach(q=>{if(!doc.includes(q))issue('docs/longterm-concept.md lacks '+q);});if(!/Handstand-Leiter/i.test(doc))issue('docs lack the handstand ladder section');}
// b) run-goal plateau
function runState(k,o){o=o||{};const D=base(k,{focus:'run'});const S0='2026-01-05';
  for(let w=0;w<8;w++){const a=addD(S0,w*7);D.logs.push({d:a,id:'KA',t:'KA',rpe:6,min:70},{d:addD(a,1),id:'RE',t:'RE',rpe:4,km:6,min:36},{d:addD(a,3),id:'RE',t:'RE',rpe:4,km:6,min:36},{d:addD(a,5),id:'RH',t:'RH',rpe:4,km:8,min:52});}
  D.pr={'run:long':{km:8,d:addD(S0,54)}};k.today(addD(S0,56));k.setGoal('d10');D.goal.v=10;return D;}
function week(k,D,i,id,km){const a=addD('2026-03-02',i*7);D.logs.push({d:addD(a,1),id:'RE',t:'RE',rpe:4,km:6,min:36},{d:addD(a,3),id:'RE',t:'RE',rpe:4,km:6,min:36});const lg={d:addD(a,5),id:id||'RH',t:id||'RH',rpe:4,km:km||8,min:52};D.logs.push(lg);k.today(lg.d);k.goalCheck(lg);return lg;}
{const {k,d}=boot();const D=runState(k);const re0=k.runBase('RE',k.today()),f0=k.riForm0(k.today());
  // easy runs are no checks for a distance goal
  const a=addD('2026-03-02',0);const e={d:addD(a,1),id:'RE',t:'RE',rpe:4,km:6,min:36};D.logs.push(e);k.today(e.d);k.goalCheck(e);if((D.goal.np||0)>0)issue('an easy run counted as a check for a distance goal');
  if(k.runCheck(D.goal,{d:k.today(),id:'RE',km:12}))issue('runCheck takes an easy run for a distance goal');
  week(k,D,0);week(k,D,1);week(k,D,2);const np3=D.goal.np;week(k,D,3);
  rep.push('distance goal after 4 flat long runs: np '+D.goal.np+', measure '+D.goal.pm);
  if(!(D.goal.np>=3))issue('3 flat long runs counted as '+np3+' checks');if(!D.goal.pm)issue('no plateau measure after 3 checks in ≥ 21 days');
  if(D.goal.pm==='s'){if(k.runPm()!=='s')issue('run measure not active');const re=k.runBase('RE',k.today()),rp=k.runPlan('RE').km;
    if(!(re>re0))issue('run measure does not lengthen the easy run ('+re0+' → '+re+')');rep.push('easy run '+re0+' → '+re+' km (planned '+rp+')');
    const room=k.kmStat(k.today());if(rp>Math.max(2,Math.floor((1.3*room.avg-room.cur)*2)/2)+0.01&&room.n>=2)issue('run measure breaks the 130 % guard');
    D.tab='start';k.render();const pl=d.querySelector('.gplat');if(!pl||!/easy runs grow/.test(pl.textContent))issue('no run plateau line on Today: '+(pl?pl.textContent:'none'));}
  week(k,D,4);week(k,D,5);week(k,D,6);
  rep.push('after 7 flat long runs: np '+D.goal.np+', measure '+D.goal.pm);
  if(D.goal.pm!=='v')issue('no change of form after 6 checks in ≥ 42 days (pm '+D.goal.pm+')');
  else{const f=k.riForm(k.today()),f1=k.riForm0(k.today());if(f===f1)issue('change of form keeps the interval form '+f);rep.push('interval form '+f1+' → '+f);
    D.tab='start';k.render();const pl=d.querySelector('.gplat');if(!pl||!/Change of form/.test(pl.textContent))issue('no change-of-form line: '+(pl?pl.textContent:'none'));if(pl&&/variation of your goal exercise/.test(pl.textContent))issue('run goal told to swap an exercise variation');}
  // hold running: no check, no line
  D.hold.run=true;const np=D.goal.np;week(k,D,7);if(D.goal.np!==np)issue('hold running counted a check');D.tab='start';k.render();if(d.querySelector('.gplat'))issue('plateau line shown while hold running is on');if(k.runPm())issue('run measure active during hold running');D.hold.run=false;
  // progress resets
  week(k,D,8,'RH',9);D.pr['run:long']={km:9,d:k.today()};week(k,D,9,'RH',9.5);D.pr['run:long']={km:9.5,d:k.today()};const lg=week(k,D,10,'RH',10.5);
  rep.push('after progress: np '+D.goal.np+', measure '+(D.goal&&D.goal.pm));}
// b) hold season: no checks
{const {k}=boot();const D=runState(k);for(let w=8;w<40;w++){const a=addD('2026-01-05',w*7);D.logs.push({d:a,id:'KA',t:'KA',rpe:6,min:70},{d:addD(a,1),id:'RE',t:'RE',rpe:4,km:6,min:36});}let hs=null;for(let i=0;i<40&&!hs;i++){const s=addD('2026-03-02',i*7+5);if(k.runPh(s)==='hold')hs=s;}
  if(!hs)issue('no hold season found in 40 weeks');else if(k.runCheck(D.goal,{d:hs,id:'RH',km:8}))issue('a long run in the hold season counts as a check');}
// b) time goal: only runs of the goal distance
{const {k}=boot();const D=runState(k);k.setGoal('t5');if(k.runCheck(D.goal,{d:k.today(),id:'RE',km:4}))issue('time goal: a 4 km run counts as a check');if(!k.runCheck(D.goal,{d:k.today(),id:'RE',km:5}))issue('time goal: a 5 km run is no check');}
// c) hinge doctrine documented
{if(!/N-6/.test(doc)||!/Akzent-Block/.test(doc)||!/⅔/.test(doc))issue('docs lack the accent-block band doctrine (N-6)');
  const {k}=boot();base(k,{});['hinge','legs','pull','push'].forEach(p=>{const lo=k.vBand(p)[0];const f=k.bandLo(p,'str');if(f!==Math.ceil(lo*2/3))issue('accent floor of '+p+' in the strength block '+f+' (band '+lo+')');if(k.bandLo(p,'vol')!==lo)issue('volume block lowers the floor of '+p);if(k.bandLo(p,'base')!==lo)issue('base block lowers the floor of '+p);});}
rep.forEach(r=>console.log('  '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
