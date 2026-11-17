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
// ---------- A-029 ----------
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
function prof(z,i,o){const k=z.k,D=k.D(),p=PROF[i];const S0='2026-10-05';k.today(S0);
  Object.assign(D.profile,p.prof);Object.assign(D,{focus:p.focus,emph:p.emph,skills:Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills),kickDays:p.kick.slice(),loc:'g',onb:true,seenFocus:true,seenFav:true,start:S0,fav:(p.fav||[]).slice(),bkTs:Date.now()},o||{});
  return D;}
const PLAINBAD=/crusade|Emperor|\boath\b|\bvow\b|Templar|heretic|battle|Battle day|First Oath|Dawn Vigil|Iron Week|Lever of Faith|Trial of Strength|the challenge/i;
// Today: quote, card name · length, run "Also possible", header order, done card
{const z=boot(),k=z.k,D=prof(z,0);sim(k,14,'2026-10-05');k.today(addD('2026-10-05',14));Object.assign(D.profile,{pull:10,expl:5});k.setGoal('mu');D.tab='start';k.render();
 if(!z.$('.quote')||z.$$('#app p.note').some(p=>/✠/.test(p.textContent)))issue('U1 quote line');
 const rc=z.$('.big.rec');if(rc&&rc.dataset.tab==='train'){const t=rc.textContent;if(!/≈ \d+ min/.test(t)||/still to do|last done|was yesterday/.test(t))issue('U2 training card: '+t);}
 const r=k.recAll(k.today(),false);if(r.btn==='train'&&['KA','KB','KC','CH'].includes(r.id)){const al=z.$('.big.also');if(!al||!/Also possible/.test(al.textContent))issue('U3 run not "Also possible" on a strength day');if(z.$$('.big[data-tab=run]').length)issue('U3 full run card on a strength day');}
 const all=z.$$('#app > *');const gi=all.indexOf(z.$('.gcard')),ri=all.indexOf(z.$('.rkline'));if(gi<0||ri<0||ri<gi)issue('U18 header: goal card then rank line');
 const css=fs.readFileSync(R+'/app.css','utf8');if(!/\.toast\{[^}]*animation:toastout/.test(css))issue('U18 toast does not hide itself');
 // log a training through the UI → finish card, done card
 const dy=k.day();D.tab='train';k.render();const tid=k.trainId(dy).id;const sets=z.$$('input[data-set]').slice(0,4);sets.forEach(e=>{e.value='8';e.dispatchEvent(new z.w.Event('change',{bubbles:true}));});
 if(!z.w.document.body.classList.contains('tmr'))issue('U9 rest timer not shown after a logged set');
 z.click('[data-a=rpe][data-v="6"]');z.click('[data-a=savetr]');const fc=z.$('.fincard');if(!fc||!/Logged/.test(fc.textContent)||!/≈ \d+ min · \d+ sets?/.test(fc.textContent))issue('U17 finish card: '+(fc&&fc.textContent));
 if(z.$('.lovefin'))issue('U17 love sentence outside the love theme');
 k.render();const dc=z.$('.big.done[data-tab=train]');if(!dc||/Gym or home/.test(dc.textContent)||!new RegExp(k.shortN(tid)+' · \\d+ min').test(dc.textContent))issue('U19 done card: '+(dc&&dc.textContent));
 ERR.push(...z.errs);}
// Training page
{const z=boot(),k=z.k,D=prof(z,2,{favP:false});k.today('2026-10-05');D.tab='train';k.day().pick='KC';k.render();
 const tr=z.$$('.chips.trow .chip').map(b=>b.textContent.replace(/^✓ /,''));if(tr.slice(0,3).join()!=='Gym,Home,Limited time'||!/Field kit/.test(tr[3]||''))issue('U4 chip row '+tr);
 if(z.$('.tgl'))issue('U4 old toggles still there');
 if(!z.$('.favcard'))issue('U5 favourites card not shown the first time');k.render();if(z.$('.favcard'))issue('U5 favourites card shown again');
 const op=z.$('details.opt:not(.pain)'),pn=z.$('details.opt.pain');if(!pn||!/^Something hurts\?/.test(pn.querySelector('summary').textContent)||!pn.querySelector('input[data-a=pain]'))issue('U6 pain entry');if(!op||!op.querySelector('#pick')||op.querySelector('input[data-a=pain]'))issue('U6 session choice mixed with pain');
 const exs=z.$$('.ex').filter(e=>e.querySelector('.acts'));let bad=0;exs.forEach(e=>{const a=e.querySelector('.acts');if(a.querySelector(':scope > [data-a=skip],:scope > [data-a=fav],:scope > [data-a=never]'))bad++;if(e.querySelector('[data-a=chg]')&&e.querySelector('[data-a=chg]').closest('details.mnu'))bad++;if(!a.querySelector('details.mnu'))bad++;});if(bad)issue('U7 actions: '+bad+' exercises without Swap outside / ⋯ menu');
 const cl=z.$$('details.blk:not([open])');if(!cl.length||!cl.every(d=>d.querySelector('summary .bx')&&d.querySelector('summary .bx').textContent.length>3))issue('U8 closed blocks without names');
 if(z.w.document.body.classList.contains('tmr'))issue('U9 rest timer before the first set');
 const op1=z.$('details.blk[open]');const key=op1&&op1.dataset.blk;if(op1){for(let g=0;g<30;g++){const c=[...z.$$('details.blk[data-blk="'+key+'"] input[data-a=done]')].find(c=>!c.checked&&!c.disabled);if(!c)break;c.checked=true;c.dispatchEvent(new z.w.Event('change',{bubbles:true}));}
   const now=z.$('details.blk[data-blk="'+key+'"]');const nx=z.$$('details.blk[open]');if(now&&now.open)issue('U8 finished block stays open');if(!nx.length)issue('U8 next block does not open');}
 const kf=z.$$('.kgfirst');if(!kf.length||!/Pick a weight you could lift about 12 times/.test(kf[0].textContent))issue('U24 no start hint for kg without history');if(/~50 %/.test(z.$('#app').textContent))issue('U24 percent of an unknown weight');
 ERR.push(...z.errs);}
// empty log asks first; last value next day
{const z=boot(),k=z.k,D=prof(z,0);k.today('2026-10-05');D.tab='train';k.render();const n0=D.logs.length;z.click('[data-a=rpe][data-v="6"]');z.click('[data-a=savetr]');
 if(D.logs.length!==n0||!z.$('#eask')||!/Nothing logged – log anyway\?/.test(z.$('#eask').textContent))issue('U16 empty log not asked');
 z.click('[data-a=saveno]');if(z.$('#eask')||D.logs.length!==n0)issue('U16 Back');z.click('[data-a=savetr]');z.click('[data-a=saveany]');if(D.logs.length!==n0+1)issue('U16 Log anyway');
 sim(k,10,'2026-10-06');k.today('2026-10-16');D.tab='train';let lv=false;for(const id of ['KA','KB','KC']){k.day().pick=id;k.render();if(z.$$('.lastv').some(e=>/^last: \d+/.test(e.textContent)))lv=true;}if(!lv)issue('last value not shown');
 ERR.push(...z.errs);}
// Morning and run: timer only with holds
{const z=boot(),k=z.k,D=prof(z,0);k.today('2026-10-05');D.tab='morgen';k.render();if(z.w.document.body.classList.contains('tmr'))issue('U9 timer on the morning routine without a hold');
 D.tab='run';k.render();if(z.w.document.body.classList.contains('tmr'))issue('U9 timer on the run page');ERR.push(...z.errs);}
// Chronicle and Status
{const z=boot(),k=z.k,D=prof(z,1);k.today('2026-10-05');D.tab='stand';k.render();
 if(!/fill in after your first 3 entries/.test(z.$('#app').textContent)||z.$('#app svg.bars, #app .bal'))issue('U11 empty state for new users');
 D.tab='verlauf';k.render();if(!/Nothing logged yet/.test(z.$('#app').textContent))issue('U11 Chronicle empty state');
 sim(k,21,'2026-10-05');k.today('2026-10-26');D.tab='verlauf';k.render();const ct=z.$('#app').textContent;
 if(!/Training calendar/.test(ct)||!/All entries/.test(ct)||/Balance · last 4 weeks|Honours|Where to focus|Weekly load/.test(ct))issue('U10 Chronicle content');
 D.tab='stand';k.render();const st=z.$('#app').textContent;['Rank','Balance · last 4 weeks','Honours','Weekly load','This week'].forEach(x=>{if(!st.includes(x))issue('U10 Status lacks '+x);});
 if(z.$('#app input[data-prof]')||!z.$('.tvl'))issue('U12 test values not shown as a display');z.click('[data-a=tvedit]');if(!z.$('#app input[data-prof]'))issue('U12 Edit does not open');
 const cy=z.$('#p_start');if(!cy||cy.type!=='date'||!cy.closest('details'))issue('U13 cycle date picker folded');
 if(!z.$$('details summary').some(s=>s.textContent==='How the app learns'))issue('U14 "How the app learns" not folded');
 D.tab='mehr';k.render();const gh=z.$$('h2.grp').map(h=>h.textContent);if(gh.join()!=='Training,App,Data')issue('U15 groups '+gh);
 const hw=z.$('.howit');if(!hw||!/How it works/.test(hw.textContent)||hw.querySelectorAll('ol.why li').length<10)issue('U15 doctrine under "How it works"');
 ERR.push(...z.errs);}
// Plain: onboarding and other pages without Templar wording; onboarding order; level text; texts without kick days
{const z=boot(),k=z.k,D=k.D();k.today('2026-10-05');D.theme='plain';D.emph='glutes';D.kickDays=[];
 const tx=()=>{const a=z.$('#app').cloneNode(true);a.querySelectorAll('.thc').forEach(e=>e.remove());return a.textContent;};let txt='';for(let st=0;st<4;st++){D.obStep=st;k.render();txt+=' '+tx();}if(PLAINBAD.test(txt))issue('U20 plain onboarding: '+txt.match(PLAINBAD)[0]);
 D.obStep=1;k.render();const fs1=z.$$('.dlg fieldset legend').map(l=>l.textContent);const ie=fs1.indexOf('Strength emphasis');const sk=z.$('details.obsk');
 if(ie<0||!sk||!/optional/.test(sk.querySelector('summary').textContent)||sk.open)issue('U21 step 2 order/skills folded '+fs1);
 if(sk&&z.$$('.dlg fieldset').indexOf(sk.querySelector('fieldset'))<z.$$('.dlg fieldset').findIndex(f=>/Strength emphasis/.test(f.textContent)))issue('U21 skills before emphasis');
 D.obStep=3;k.render();const sm=z.$('.sum').textContent;if(/no skills/.test(sm)||!/emphasis Glutes/.test(sm))issue('U21 summary: '+sm);
 D.obStep=2;k.render();if(/pull-up and dip base/.test(z.$('#lvlnote').textContent))issue('U22 level text with glutes: '+z.$('#lvlnote').textContent);
 Object.assign(D,{onb:true,seenFocus:true,seenFav:true,logs:[{d:'2026-10-04',id:'KI',t:'Kickboxing',rpe:6}]});
 for(const t of ['kick','morgen','start','stand','mehr']){D.tab=t;k.render();const x=tx();if(PLAINBAD.test(x))issue('U20/N-6 plain '+t+': '+x.match(PLAINBAD)[0]);}
 if(k.honours().some(h=>/Oath|Vigil|Iron Week|of Faith|Trial of Strength/.test(h.n)))issue('N-6 plain honour names');
 // N-10/U23 without kick days
 D.theme='templar';D.emph='bal';D.skills={hs:false,mu:false,ls:false,fl:false,pl:false};k.render();
 if(/kick/i.test(k.NAMES.RS))issue('N-10 rest day name '+k.NAMES.RS);const c=k.ctx(k.today());if(/kick/i.test(k.S('KC',c).goal))issue('N-10 Strength C text');
 D.tab='start';k.render();if(/K = kickboxing/.test(z.$('#app').textContent))issue('N-10 legend K without kick days');
 const fa=k.FOREARM?k.FOREARM():null;if(fa&&/muscle-up/i.test(fa.info))issue('U23 forearm block names muscle-ups without the skill');
 D.runKm=8;if(/6:30/.test(k.runInfo('RH').p))issue('U23 fixed hard-run pace');
 const ab=k.ABS.find(a=>/Rotation/.test(a.n));D.tab='train';k.render();if(/\(kickboxing\)/.test(z.$('#app').textContent))issue('N-10 Blitz group kickboxing');
 ERR.push(...z.errs);}
// bandDrop note gone; doctrine and naming
{const src=fs.readFileSync(R+'/src/app.js','utf8')+fs.readFileSync(R+'/.build/index.html','utf8');if(/Left out today/.test(src))issue('"Left out today" still in the sources');}
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
 // A-029: training page (second visit, favourites card already seen), chips, ⋯ menu, pain entry, timer, back target
 await p.evaluate(()=>{const k=window.__kz,D=k.D();D.favP=true;D.tab='train';k.render();window.scrollTo(0,0);});await p.waitForTimeout(80);
 await p.screenshot({path:R+'/.build/t48-'+th+'-train.png'});
 const top=await p.evaluate(()=>{const b=document.querySelector('details.blk');return b?b.getBoundingClientRect().top:9999;});if(top>844-60-40)issue(th+': U4 workout not visible without scrolling (first block at '+Math.round(top)+' px)');
 const bk=await p.locator('.lnk.bk').boundingBox();if(!bk||bk.width<44||bk.height<44)issue(th+': N-14 "← Today" target '+(bk?Math.round(bk.width)+'×'+Math.round(bk.height):'missing'));
 if(await p.locator('.timer').isVisible())issue(th+': U9 timer visible before the first set');
 if(th==='plain'){const ff=await p.evaluate(()=>getComputedStyle(document.querySelector('.hero h2')).fontFamily);if(/Cinzel/.test(ff))issue('U20 plain uses the Templar display font');}
 await p.click('.chips.trow [data-a=short]');await p.waitForTimeout(60);await p.click('.chips.trow [data-a=short]');await p.waitForTimeout(60);
 await p.locator('details.opt.pain summary').click();await p.waitForTimeout(60);
 const mn=p.locator('details.blk[open] details.mnu summary').first();if(await mn.count()){await mn.click();await p.waitForTimeout(60);await p.screenshot({path:R+'/.build/t48-'+th+'-menu.png'});}
 const inp=p.locator('details.blk[open] input[data-set]').first();if(await inp.count()){await inp.scrollIntoViewIfNeeded();await inp.fill('8');await inp.dispatchEvent('change');await p.waitForTimeout(80);if(!await p.locator('.timer').isVisible())issue(th+': U9 timer not shown after a set');}
 for(const t of ['verlauf','stand']){await p.click('.nav [data-tab='+t+']');await p.waitForTimeout(80);await p.screenshot({path:R+'/.build/t48-'+th+'-'+t+'.png'});}
 await p.evaluate(()=>{const k=window.__kz,D=k.D();D.onb=false;D.obStep=1;k.render();});await p.waitForTimeout(80);await p.screenshot({path:R+'/.build/t48-'+th+'-onboarding2.png'});
 await p.close();}
await b.close();
ERR.push(...errs);if(ERR.length)issue('runtime errors: '+ERR.join('; '));
done();})().catch(e=>{issue('crash: '+e.stack);done();process.exit(1);});
function done(){console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.slice(0,40).forEach(m=>console.log(' - '+m));}
