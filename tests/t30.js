// @name goals-basic
// P-1 goals I: data model, one-tap choice, passive progress. Fresh state and old backups have no goal; one tap in the
// onboarding (step 2) or under More sets a complete goal (catalogue default, start value, set date); "No goal yet" leaves
// the plan as it is; a skill goal switches the skill on with a hint; exactly 1 active goal; progress comes from existing
// values (profile, D.ex, run records, time records from saveRun) without an extra tap; milestone and reached goal toast,
// reached goal goes to the archive; Adjust (value, date, remove); "No goal" leaves the plan unchanged;
// import whitelist; Plain theme without Warhammer words; Playwright 390×844 screenshots.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  return {w,k:w.__kz,errs,$,$$:s=>[...w.document.querySelectorAll(s)],click:s=>{const e=$(s);if(!e){issue('missing '+s);return;}e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));},
    change:(s,v)=>{const e=$(s);if(!e){issue('missing '+s);return;}e.value=v;e.dispatchEvent(new w.Event('change',{bubbles:true}));}};}
const TD='2026-11-16';
function ready(k){const D=k.D();k.today(TD);Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-10-05',kickDays:[]});return D;}
const sig=(k,id)=>JSON.stringify(k.S(id,k.ctx(k.today())).blocks.map(b=>[b.name,b.items.map(it=>it.opts[Math.max(0,k.curVar(it,'g'))].n)]));
(async()=>{
// 1 fresh state, onboarding one tap
{const z=boot(),D=z.k.D();z.k.today(TD);if(D.goal!==null||!Array.isArray(D.goalsDone)||D.goalsDone.length)issue('fresh: goal fields '+JSON.stringify([D.goal,D.goalsDone]));
 D.obStep=1;z.k.render();const chips=z.$$('[data-a=goal]').map(b=>b.textContent);
 ['Muscle-Up','Handstand','Front lever','Pull-ups','Strong legs','Run 5 km','Run 10 km','No goal yet'].forEach(n=>{if(!chips.includes(n))issue('onboarding: chip missing '+n);});
 if(!z.$('[data-a=goal][data-k=none][aria-pressed=true]'))issue('onboarding: "No goal yet" not preselected');
 z.click('[data-a=goal][data-k=hs]');const g=D.goal;
 if(!g||g.k!=='hs'||!(g.v>0)||g.s!==TD||g.b==null||!Array.isArray(g.h))issue('onboarding: one tap no complete goal '+JSON.stringify(g));
 if(!D.skills.hs)issue('onboarding: skill goal did not switch the skill on');if(!/added to your skills/.test(z.$('.dlg').textContent))issue('onboarding: no skill hint');
 if(!z.$('[data-a=goal][data-k=hs][aria-pressed=true]'))issue('onboarding: chip not marked');
 z.click('[data-a=goal][data-k=pull]');if(D.goal.k!=='pull')issue('onboarding: second tap did not switch the goal');
 z.click('[data-a=goal][data-k=none]');if(D.goal!==null)issue('onboarding: "No goal yet" kept a goal');
 z.click('[data-a=goal][data-k=legs]');if(!D.goal||D.goal.k!=='sq')issue('onboarding: Strong legs → '+(D.goal&&D.goal.k));
 D.emph='glutes';z.click('[data-a=goal][data-k=legs]');if(!D.goal||D.goal.k!=='ht')issue('onboarding: Strong legs with glute emphasis → '+(D.goal&&D.goal.k));
 if(z.errs.length)issue('onboarding JS errors: '+z.errs.join('; '));}
// 2 every catalogue goal: default, line, steps; exactly one active
{const z=boot(),k=z.k,D=ready(k);Object.assign(D.profile,{pull:6,dips:10,push:20,hsw:25,hsf:0,tuck:12,lsit:0,flSt:1,plSt:0,expl:2,negmu:1,mu:0});
 Object.keys(k.GOALS).forEach(key=>{k.setGoal(key);const g=D.goal;if(!g||g.k!==key||!(g.v>0))issue(key+': no goal '+JSON.stringify(g));
   const pos=k.goalPos(g);if(!pos.s.length)issue(key+': no milestones');if(!/step \d+ of \d+/.test(k.goalLine()))issue(key+': line '+k.goalLine());});
 if(typeof D.goal!=='object'||Array.isArray(D.goal))issue('more than one goal shape');
 k.setGoal('pull');if(D.goal.v!==11||D.goal.b!==6)issue('pull default '+JSON.stringify(D.goal));
 k.setGoal('push');if(D.goal.v!==30)issue('push default '+D.goal.v);
 k.setGoal('mu');if(D.goal.v!==1||!/2\/5 explosive/.test(k.goalLine())&&!/6\/8 pull-ups/.test(k.goalLine()))issue('mu line '+k.goalLine());
 k.setGoal('fl');if(D.goal.v!==2)issue('fl default stage '+D.goal.v);
 // kg goal from history (Barbell back squat in D.ex), run goals from records
 D.ex['c_sq#0']={r:8,w:60,d:'2026-11-10',n:'Barbell back squat'};D.ex['c_rdl#0']={r:8,w:200,d:'2026-11-10',n:'Barbell hip thrust'};
 if(k.goalCur('sq')!==60)issue('sq current '+k.goalCur('sq'));k.setGoal('sq');if(D.goal.v!==65)issue('sq default '+D.goal.v);
 if(k.goalCur('rdl')!==0)issue('rdl reads a wrong exercise '+k.goalCur('rdl'));
 D.pr['run:long']={km:3.2,d:'2026-11-10'};k.setGoal('d5');if(!/step 4 of 5 · 3\.2\/4 km/.test(k.goalLine()))issue('d5 line '+k.goalLine());
 if(z.errs.length)issue('catalogue JS errors: '+z.errs.join('; '));}
// 3 progress follows values without a tap; milestone toast; reached goal → toast + archive
{const z=boot(),k=z.k,D=ready(k);D.profile.pull=6;k.setGoal('pull');D.goal.v=8;
 D.profile.pull=7;if(!/7\/8/.test(k.goalLine()))issue('progress: profile change not shown '+k.goalLine());
 // run goal: two runs via saveRun (the real flow)
 k.setGoal('d5');const run=(km,mn)=>{const dy=k.day();dy.run='RE';dy.fin={rpe:4,km:String(km),min:String(mn)};k.saveRun();};
 const toast=()=>(z.$('.toast')||{}).textContent||'';
 run(3.1,20);if(!/milestone/i.test(toast()))issue('milestone toast missing: '+toast());
 if(!D.goal||D.goal.st<3)issue('milestone count '+JSON.stringify(D.goal));
 k.today('2026-11-18');run(5.2,30);
 if(D.goal!==null)issue('reached goal still active');if(!(D.goalsDone||[]).some(x=>x.k==='d5'&&x.r==='f'&&x.d==='2026-11-18'))issue('archive entry missing '+JSON.stringify(D.goalsDone));
 if(!/Vow fulfilled/.test(toast()))issue('reached toast missing: '+toast());
 const t5=D.pr['run:t5'];if(!t5||Math.abs(t5.min-28.8)>0.1)issue('time record run:t5 '+JSON.stringify(t5));if(D.pr['run:t10'])issue('run:t10 from a 5 km run');
 k.setGoal('t5');if(k.goalCur('t5')!==t5.min||!(D.goal.v<t5.min))issue('t5 goal from record '+JSON.stringify(D.goal));
 D.tab='mehr';k.render();if(!/Vow fulfilled/.test(z.$('.garch')?z.$('.garch').textContent:''))issue('archive not listed under More');
 if(z.errs.length)issue('progress JS errors: '+z.errs.join('; '));}
// 4 More: chips, Adjust (value, date, remove); start line; status ladder
{const z=boot(),k=z.k,D=ready(k);D.tab='mehr';k.render();
 if(z.$$('[data-a=goal]').length<17)issue('More: catalogue chips '+z.$$('[data-a=goal]').length);
 z.click('[data-a=goal][data-k=dips]');if(!D.goal||D.goal.k!=='dips')issue('More: one tap');
 z.change('#m_gv','25');if(D.goal.v!==25)issue('Adjust value '+D.goal.v);
 z.change('#m_gd','2027-02-01');if(D.goal.d!=='2027-02-01')issue('Adjust date '+D.goal.d);
 z.change('#m_gd','2020-01-01');if(D.goal.d!=='2027-02-01')issue('Adjust accepted a past date');
 z.change('#m_gd','');if(D.goal.d)issue('Adjust date not cleared');
 D.tab='start';k.render();const gl=z.$('.gline');if(!gl||!/Dips/.test(gl.textContent)||gl.dataset.tab!=='stand')issue('start line '+(gl&&gl.outerHTML));
 z.click('.gline');if(D.tab!=='stand'||!z.$('.gl li'))issue('status ladder missing');
 D.tab='mehr';k.render();z.click('[data-a=goalx]');if(D.goal!==null)issue('remove goal');
 D.tab='start';k.render();if(z.$('.gline'))issue('start line without a goal');
 if(z.errs.length)issue('More JS errors: '+z.errs.join('; '));}
// 5 "No goal yet" leaves the plan as it is: choosing a goal and removing it again restores the same recommendation and sessions
//   (since P-2 an active goal does change the plan; that is tested in t31)
{const z=boot(),k=z.k,D=ready(k);Object.assign(D.profile,{pull:10,dips:15,expl:5});D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};
 const ids=['KA','KB','KC','CH','SK','HO'],before=ids.map(id=>sig(k,id)).join('|'),rec0=JSON.stringify(k.recAll(TD,false));
 k.setGoal('pull');k.setGoal('none');const after=ids.map(id=>sig(k,id)).join('|'),rec1=JSON.stringify(k.recAll(TD,false));
 if(before!==after)issue('plan changed after "No goal"');if(rec0!==rec1)issue('recommendation changed after "No goal"');}
// 6 backups: old backup without goal, round trip, junk refused
{const z=boot(),k=z.k,D=ready(k);k.setGoal('mu');D.goal.d='2027-03-01';D.goalsDone=[{k:'d5',v:5,d:'2026-10-01',r:'f'}];D.pr['run:t5']={min:28.5,d:TD};
 const txt=k.bkJSON(),y=boot();y.k.today(TD);if(!y.k.restore(txt))issue('round trip rejected');else{const E=y.k.D();
   const srt=o=>JSON.stringify(o,Object.keys(o).sort());if(srt(E.goal)!==srt(D.goal))issue('round trip goal '+JSON.stringify(E.goal));if(E.goalsDone.length!==1)issue('round trip archive');if(!E.pr['run:t5']||E.pr['run:t5'].min!==28.5)issue('round trip time record');}
 const old=JSON.parse(txt);delete old.goal;delete old.goalsDone;const o2=boot();o2.k.today(TD);if(!o2.k.restore(JSON.stringify(old)))issue('old backup rejected');else if(o2.k.D().goal!==null)issue('old backup has a goal');
 const C=k.cleanImport;[{k:'__proto__',v:1},{k:'constructor'},{k:'xyz',v:3},'mu',[1],{k:'toString'}].forEach(g=>{const r=C(Object.assign(JSON.parse(txt),{goal:g}));if(r.goal!==null)issue('junk goal kept '+JSON.stringify(g));});
 const r=C(Object.assign(JSON.parse(txt),{goal:{k:'pull',v:'<b>x</b>',b:-5,s:'nope',d:'2027-13-99"><script>',h:[['2026-11-01',3],['bad',4],5],x:'<img>'},goalsDone:[{k:'d5',v:5,d:'2026-10-01',r:'f'},{k:'evil',d:'2026-10-01'},{k:'pull',v:3,d:'x'},null]}));
 if(!r.goal||r.goal.k!=='pull'||r.goal.v!==1||r.goal.b!==0||r.goal.s!==TD||r.goal.d||r.goal.x||r.goal.h.length!==1)issue('goal not cleaned '+JSON.stringify(r.goal));
 if(r.goalsDone.length!==1)issue('archive not cleaned '+JSON.stringify(r.goalsDone));
 if(/<script|<img|<b>/.test(JSON.stringify(r)))issue('markup survived the import');}
// 7 Plain theme: no Warhammer words in the goal texts
{const z=boot(),k=z.k,D=ready(k);D.theme='plain';k.setGoal('mu');D.goal.d='2027-01-10';const BAD=/vow|emperor|crusade|templar|xenos|heretic|chapter|litany|oath/i;
 D.tab='start';k.render();if(BAD.test(z.$('.gline').textContent))issue('plain start line: '+z.$('.gline').textContent);
 D.tab='stand';k.render();const st=z.$$('.sec').filter(s=>s.querySelector('.gl')).map(s=>s.textContent).join(' ');if(!st||BAD.test(st))issue('plain status: '+st.slice(0,120));
 D.tab='mehr';k.render();const mh=z.$('#app .sec').textContent;if(BAD.test(mh))issue('plain More goal section: '+mh.slice(0,160));
 D.goalsDone=[];k.setGoal('pull');D.goal.v=1;D.profile.pull=2;if(BAD.test(k.goalCheck()))issue('plain reached toast');}
// 8 Playwright 390×844: onboarding chips, start line, status ladder, More section
let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
const guard=require('./netguard');const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
await p.goto('file://'+R+'/.build/index.html');
await p.evaluate(()=>{const D=window.__kz.D();D.obStep=1;window.__kz.render();});await p.waitForTimeout(80);
await p.locator('[data-a=goal]').first().scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t30-onboarding-goal.png'});
await p.click('[data-a=goal][data-k=mu]');await p.waitForTimeout(60);
if(!await p.evaluate(()=>window.__kz.D().goal&&window.__kz.D().goal.k==='mu'))issue('playwright: one tap did not set the goal');
await p.evaluate(()=>{const k=window.__kz,D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,tab:'start',bkTs:Date.now()});Object.assign(D.profile,{pull:9,expl:3,negmu:1});
  D.logs=[{d:k.today(),id:'MO',t:'Morning routine',m:['hips']}];localStorage.setItem('kz_app_v3',JSON.stringify(D));});
await p.reload();await p.waitForTimeout(150);
const line=await p.$('.gline');if(!line)issue('playwright: start line missing');else{const bb=await line.boundingBox();if(bb.width>390)issue('playwright: start line wider than the screen');}
await p.screenshot({path:R+'/.build/t30-start-goal.png'});
await p.click('.gline');await p.waitForTimeout(100);await p.locator('.gl').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t30-status-ladder.png'});
await p.click('.nav [data-tab=mehr]');await p.waitForTimeout(100);await p.screenshot({path:R+'/.build/t30-more-goal.png'});
const ow=await p.evaluate(()=>document.documentElement.scrollWidth);if(ow>390)issue('playwright: horizontal overflow '+ow);
if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();
})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);}
