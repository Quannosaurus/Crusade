// @name ux-polish
// A-028 / A-029: vow card and 2-step goal choice under More, goal card on Today, numbered step ladder on Status;
// UX polish (see tests/README.md). JSDOM checks plus Playwright 390×844 screenshots in Templar and Plain;
// runtime errors from click handlers are collected (0 expected).
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  return {w,k:w.__kz,errs,$,$$:s=>[...w.document.querySelectorAll(s)],click:s=>{const e=typeof s==='string'?$(s):s;if(!e){issue('missing '+s);return;}e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));},
    change:(s,v)=>{const e=$(s);if(!e){issue('missing '+s);return;}e.value=v;e.dispatchEvent(new w.Event('change',{bubbles:true}));}};}
const TD='2026-11-16';
function ready(k,o){const D=k.D();k.today(TD);Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-10-05',kickDays:[]},o||{});return D;}
const ERR=[];
(async()=>{
// ---------- A-028 ----------
// 1 More without a goal: small card, theme word, 2-step choice
for(const [th,word] of [['templar','Swear a vow'],['plain','Set a goal'],['sanguine','Swear a blood oath']]){
 const z=boot(),k=z.k,D=ready(k,{theme:th});D.tab='mehr';k.render();
 const e=z.$('.gsec .gempty');if(!e||!/Optional: set a goal and the plan works toward it\./.test(e.textContent))issue(th+': empty goal card missing');
 const bt=z.$('.gsec [data-a=gpopen]');if(!bt||bt.textContent!==word)issue(th+': goal button "'+(bt&&bt.textContent)+'" ≠ '+word);
 if(z.$$('.gsec [data-a=goal]').length)issue(th+': chip wall still under More');
 ERR.push(...z.errs);}
{const z=boot(),k=z.k,D=ready(k);D.tab='mehr';k.render();
 z.click('[data-a=gpopen]');const kinds=z.$$('[data-a=gpc]').map(b=>b.textContent);if(kinds.join()!=='Skill,Strength,Running')issue('step 1 kinds '+kinds);
 if(!/Step 1 of 2/.test(z.$('.gpick').textContent))issue('step 1 label');
 z.click('[data-a=gpc][data-k="2"]');const run=z.$$('[data-a=gpk]').map(b=>b.textContent);if(!/Step 2 of 2/.test(z.$('.gpick').textContent))issue('step 2 label');
 if(run.some(t=>/\bX\b/.test(t)))issue('literal X in run goals: '+run);if(!run.includes('5 km time'))issue('run goals '+run);
 if(!z.$('[data-a=gpsave][disabled]'))issue('Save enabled before a goal is chosen');
 z.click('[data-a=gpk][data-k=t5]');const v=z.$('#gp_gv');if(!v||!(+v.value>0))issue('run time not prefilled');if(!z.$('#gp_gd')||z.$('#gp_gd').value)issue('date not optional/empty');
 if(!/Target time \(min\)/.test(z.$('.gpick').textContent))issue('target time input label');
 z.click('[data-a=gpx]');if(D.goal||z.$('.gpick'))issue('Cancel kept a goal or the picker');
 z.click('[data-a=gpopen]');z.click('[data-a=gpc][data-k="1"]');z.click('[data-a=gpk][data-k=pull]');
 if(z.$('#gp_gv').value!==String(k.goalDef('pull')))issue('pull-ups not prefilled with the default');
 z.$('#gp_gv').value='12';z.$('#gp_gd').value='2027-03-01';z.click('[data-a=gpsave]');
 if(!D.goal||D.goal.k!=='pull'||D.goal.v!==12||D.goal.d!=='2027-03-01')issue('Save: '+JSON.stringify(D.goal));
 const sec=z.$('.gsec');const acts=z.$$('.gsec .gact button').map(b=>b.textContent);if(acts.join()!=='Adjust,Change goal,Remove goal')issue('goal actions '+acts);
 if(!/Step \d of \d/.test(sec.textContent)||!sec.querySelector('.gcard svg.bt'))issue('goal card without step or progress');
 if(z.$$('.gsec summary').some(s=>/^Adjust/.test(s.textContent)))issue('loose Adjust summary');
 if(z.$$('.gsec p').some(p=>/^[^·]{2,30}\.\s*$/.test(p.textContent.trim())))issue('orphan status line: '+z.$$('.gsec p').map(p=>p.textContent).join('|'));
 z.click('[data-a=gadj]');z.change('#m_gv','14');if(D.goal.v!==14)issue('Adjust value');
 z.click('[data-a=gpopen]');z.click('[data-a=gpc][data-k="0"]');z.click('[data-a=gpk][data-k=hs]');z.click('[data-a=gpsave]');if(D.goal.k!=='hs')issue('Change goal');
 D.goalsDone=[{k:'dips',v:10,d:'2026-11-01',r:'f'}];k.render();const ad=z.$('details.garchd');if(!ad||ad.open||!/Past goals \(1\)/.test(ad.textContent))issue('past goals not folded');
 z.click('[data-a=goalx]');if(D.goal!==null||!z.$('.gempty'))issue('Remove goal');
 ERR.push(...z.errs);}
// 2 Today goal card / 3 Status ladder
{const z=boot(),k=z.k,D=ready(k);Object.assign(D.profile,{pull:5});k.setGoal('pull');D.goal.v=8;D.goal.b=0;D.goal.st=k.goalPos(D.goal).done;D.tab='start';k.render();
 const c=z.$('.gcard.gline');if(!c||c.dataset.tab!=='stand')issue('Today goal card missing');
 else{const t=c.textContent;if(!/Step \d of \d · \d+ pull-ups/.test(t))issue('goal card step text: '+t);if(!/5\/\d/.test(t))issue('goal card progress: '+t);
  if(c.querySelectorAll('.gdots i').length!==k.goalPos(D.goal).s.length)issue('step dots');if(!c.querySelector('svg.bt'))issue('progress bar');}
 if(z.$('.rkline.gline'))issue('old grey goal line still there');
 z.click('.gcard.gline');if(D.tab!=='stand')issue('tap does not open the details');
 const li=z.$$('.gl li');if(li.filter(l=>l.classList.contains('now')).length!==1)issue('ladder: not exactly one current step');
 if(!li.every((l,i)=>l.querySelector('.gn')&&l.querySelector('.gn').textContent===String(i+1)))issue('ladder not numbered');
 li.forEach(l=>{if(l.classList.contains('ok')&&!/✓/.test(l.textContent))issue('done step without ✓');});
 if(!li.some(l=>l.classList.contains('next')))issue('no dimmed future step');
 D.tab='start';D.goal=null;k.render();if(z.$('.gcard'))issue('goal card without a goal');ERR.push(...z.errs);}
{const z=boot(),k=z.k,D=ready(k);Object.assign(D.profile,{pull:10,expl:5,negmu:1});k.setGoal('mu');D.tab='stand';k.render();
 const li=z.$$('.gl li');if(!li[0]||!/already reached/.test(li[0].textContent)||/already reached/.test(li[2].textContent))issue('already reached marks: '+li.map(l=>l.textContent).join('|'));
 // 4 onboarding step 2 stays one tap
 D.onb=false;D.obStep=1;k.render();z.click('[data-a=goal][data-k=fl]');if(!D.goal||D.goal.k!=='fl')issue('onboarding one tap');ERR.push(...z.errs);}
// ---------- Playwright 390×844 ----------
let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
const guard=require('./netguard');const b=await chromium.launch();const errs=[];
for(const th of ['templar','plain']){
 const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(th+': '+e.message));await guard(p,errs);
 await p.goto('file://'+R+'/.build/index.html');
 await p.evaluate(th=>{const k=window.__kz,D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,tab:'mehr',theme:th,bkTs:Date.now(),loc:'g'});
   D.logs=[{d:k.today(),id:'MO',t:'Morning routine',m:['hips']}];localStorage.setItem('kz_app_v3',JSON.stringify(D));},th);
 await p.reload();await p.waitForTimeout(120);
 await p.screenshot({path:R+'/.build/t48-'+th+'-more-empty.png'});
 await p.click('[data-a=gpopen]');await p.click('[data-a=gpc][data-k="1"]');await p.click('[data-a=gpk][data-k=pull]');await p.waitForTimeout(60);
 await p.screenshot({path:R+'/.build/t48-'+th+'-more-pick.png'});
 await p.click('[data-a=gpsave]');await p.waitForTimeout(60);await p.screenshot({path:R+'/.build/t48-'+th+'-more-goal.png'});
 const w=await p.evaluate(()=>[...document.querySelectorAll('.gsec *')].filter(e=>e.getBoundingClientRect().right>391).length);if(w)issue(th+': goal section wider than the screen');
 await p.click('.nav [data-tab=start]');await p.waitForTimeout(80);await p.screenshot({path:R+'/.build/t48-'+th+'-today.png'});
 await p.click('.gcard.gline');await p.waitForTimeout(80);await p.locator('.gl').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t48-'+th+'-status.png'});
 await p.close();}
await b.close();
ERR.push(...errs);if(ERR.length)issue('runtime errors: '+ERR.join('; '));
done();})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.slice(0,40).forEach(m=>console.log(' - '+m));}
