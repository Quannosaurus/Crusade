// @name add-exercise
// A-021 part 1+2: "+ Add exercise" and "+ Easy run". Kickbacks join a session without a glute block in ≤ 3 taps, in the
// block "Your additions" before the cool-down with targets from target(); design() leaves the rest unchanged, the header
// shows the new duration and additions stay even beyond 90 min; only an active pain filter hides one (with a hint).
// They survive a reload, are gone the next day, go with one tap (inputs of the others stay with them), are logged
// normally and lead once to "Keep as favourite?". "+ Easy run" works on a day without a planned run and on top of a
// training: both entries are saved, training progress is kept, the order hint shows, the next day keeps the day-before-
// kickboxing rule and the week preview follows. Backup round trip with the new fields. Playwright 390×844 screenshots.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',typeof pre==='string'?pre:JSON.stringify(pre));
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const TD='2026-11-16',KB='Cable kickbacks';
function base(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,start:'2026-10-05',tab:'start',emph:'bal',loc:'g',fav:[],kickDays:[],bkTs:Date.now()});
  Object.assign(D.profile,{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hang:45});D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};k.today(TD);
  D.logs=[{d:addD(TD,-3),id:'KC',t:'Strength C',rpe:6,lg:1},{d:addD(TD,-2),id:'RE',t:'Easy run',rpe:4,km:5,min:32}];return D;}
const names=s=>s.blocks.map(b=>b.name+':'+b.items.map(it=>it.opts.map(o=>o.n).join('/')).join(',')+':'+(b.rounds||'')).join(' | ');
function sess(k,id){return k.S(id,k.ctx(k.today()));}
let taps=0;const tap=(x,sel)=>{const e=x.$(sel);if(!e)throw new Error('missing '+sel);taps++;e.click();};
(async()=>{
// 1 kickbacks on a day without a glute block, ≤ 3 taps
{const x=boot();const D=base(x.k);x.k.day().pick='KA';D.tab='train';x.k.render();
 const s0=sess(x.k,'KA');if(s0.blocks.some(b=>b.items.some(it=>it.opts.some(o=>/kickback/i.test(o.n)))))issue('setup: KA already holds kickbacks');
 if(s0.blocks.some(b=>/glute/i.test(b.name)))issue('setup: KA has a glute block');
 if(!x.$('[data-a=addopen]'))issue('no "+ Add exercise" at the end of Strength A');
 taps=0;tap(x,'[data-a=addopen]');if(!x.$('#addq'))issue('add search not shown');
 const row=x.$$('[data-a=addx]').find(b=>b.dataset.n===KB);if(!row)issue('kickbacks not in the add list');else{taps++;row.click();}
 if(taps>3)issue('kickbacks took '+taps+' taps');
 const s1=sess(x.k,'KA'),ai=s1.blocks.findIndex(b=>b.add),ci=s1.blocks.findIndex(b=>b.cool);
 if(ai<0)issue('no additions block');else{const ab=s1.blocks[ai];
   if(ab.name!=='Your additions')issue('block name '+ab.name);if(ci!==ai+1)issue('additions block not right before the cool-down');
   const it=ab.items[0],v=x.k.curVar(it,'g');if(!it||it.opts[v].n!==KB)issue('added item is not kickbacks');
   const g=x.k.target(it,v);if(!(g.r>=it.lo))issue('no target from target()');}
 // design() leaves the rest alone
 const rest=Object.assign({},s1,{blocks:s1.blocks.filter(b=>!b.add)});if(names(rest)!==names(s0))issue('design() changed the session around the additions');
 if(!(s1.min>s0.min))issue('duration did not grow: '+s0.min+' → '+s1.min);
 const dur=x.$('.dur').textContent;if(dur.indexOf(String(s1.min))<0||!/addition/i.test(dur))issue('header does not show the new duration: '+dur);
 const blk=x.$('details[data-blk="KA-80"]');if(!blk||!blk.open||!/Cable kickbacks/.test(blk.textContent))issue('additions block not rendered open with kickbacks');
 const kids=x.$$('#app details.blk').map(d=>d.dataset.blk);if(kids.indexOf('KA-80')!==kids.length-2)issue('additions not rendered right before the cool-down: '+kids.join());
 // beyond 90 min: more additions, kickbacks stay
 const more=x.$$('[data-a=addx]');x.$('[data-a=addopen]').click();
 const cand=x.$$('[data-a=addx]').filter(b=>!b.disabled&&b.dataset.n!==KB).map(b=>b.dataset.n).filter(n=>/press|row|curl|raise|squat|deadlift/i.test(n)).slice(0,9);
 cand.forEach(n=>{const d=x.k.day();d.add.push(n);});x.k.render();
 const s2=sess(x.k,'KA');if(!(s2.min>90))issue('test setup: not over 90 min ('+s2.min+')');
 const ab2=s2.blocks.find(b=>b.add);if(!ab2||ab2.items.length!==1+cand.length||x.k.curVar(ab2.items[0],'g')<0)issue('additions dropped over 90 min');
 if(!x.$('details[data-blk="KA-80"]')||!/Cable kickbacks/.test(x.$('details[data-blk="KA-80"]').textContent))issue('kickbacks not shown over 90 min');
 if(x.$('.dur').textContent.indexOf(String(s2.min))<0)issue('header not updated over 90 min');
 // only the pain filter hides one, with a hint
 const dy=x.k.day();dy.add=[KB,'Dumbbell curls'];D.pain.e=true;x.k.render();
 const curl=x.$$('details[data-blk="KA-80"] .ex').find(e=>/Dumbbell curls/.test(e.textContent));
 if(!curl||!curl.classList.contains('skip')||!/pain filter/i.test(curl.textContent))issue('pain filter does not hide the curl addition with a hint');
 const kb=x.$$('details[data-blk="KA-80"] .ex').find(e=>/Cable kickbacks/.test(e.textContent));if(!kb||kb.classList.contains('skip'))issue('kickbacks hidden without pain');
 D.pain.e=false;x.k.render();
 // reload: still there; next day: gone
 x.k.render();const ls=x.w.localStorage.getItem('kz_app_v3');
 const y=boot(ls);y.k.today(TD);y.k.D().tab='train';y.k.render();if(!y.$('details[data-blk="KA-80"]')||!/Cable kickbacks/.test(y.$('details[data-blk="KA-80"]').textContent))issue('additions gone after reload');
 y.k.today(addD(TD,1));y.k.day().pick='KA';y.k.render();if(y.$('details[data-blk="KA-80"]')||sess(y.k,'KA').blocks.some(b=>b.add))issue('additions still there the next day');
 // remove with one tap; inputs of the other addition move with it
 const dd=x.k.day();dd.add=['Dumbbell curls',KB];dd.inp={'KA-80-1':{s:['12','11','10'],w:'15'}};dd.done={'KA-80-0':1};x.k.render();
 const rm=x.$$('details[data-blk="KA-80"] [data-a=addrm]');if(rm.length!==2)issue('remove buttons '+rm.length);else rm[0].click();
 if(JSON.stringify(dd.add)!==JSON.stringify([KB]))issue('remove: list '+JSON.stringify(dd.add));
 if(!dd.inp['KA-80-0']||dd.inp['KA-80-0'].w!=='15'||dd.inp['KA-80-1']||dd.done['KA-80-0'])issue('remove: inputs not shifted '+JSON.stringify({inp:dd.inp,done:dd.done}));
 // log: values recorded, ask once to keep as favourite
 dd.fin={rpe:6};x.k.render();x.$('[data-a=savetr]').click();
 const L=D.logs.find(l=>l.d===TD&&l.id==='KA');if(!L)issue('training not logged');else if(!Object.keys(L.ex||{}).some(q=>/^g_kb#0$/.test(q)))issue('addition not in the log: '+JSON.stringify(L.ex));
 if(!D.ex['g_kb#0']||D.ex['g_kb#0'].r!==10||D.ex['g_kb#0'].w!==15)issue('addition progression not stored '+JSON.stringify(D.ex['g_kb#0']));
 if(x.k.day().add)issue('additions not cleared after logging');
 if(!x.$('.favask')||!/Cable kickbacks/.test(x.$('.favask').textContent))issue('no "Keep as favourite?" after logging');
 x.$('[data-a=favkeep]').click();if((D.fav||[]).indexOf(KB)<0)issue('keep did not star kickbacks');if(x.$('.favask'))issue('question stays after answering');
 // once per exercise: next day again, no question
 D.fav=[];x.k.today(addD(TD,2));const d2=x.k.day();d2.pick='KB';d2.add=[KB];d2.done={};D.tab='train';x.k.render();const s3=sess(x.k,'KB');const bi=80;
 d2.inp={['KB-'+bi+'-0']:{s:['12','12','12'],w:'15'}};d2.fin={rpe:6};x.k.render();x.$('[data-a=savetr]').click();if(x.$('.favask'))issue('asked again for the same exercise');
 if(x.errs.length)issue('add: JS errors '+x.errs.join('; '));if(y.errs.length)issue('reload: JS errors '+y.errs.join('; '));}
// 2 "+ Easy run" on a day without a planned run and on top of a training
{const x=boot();const D=base(x.k);const T=TD,kick=(new Date(addD(T,2)+'T12:00:00').getDay());D.kickDays=[kick];D.tab='start';x.k.render();
 const r=x.k.recAll(T);if(r.btn==='run')issue('setup: a run is recommended today');
 if(!x.$('[data-a=xrun]'))issue('no "+ Easy run" on a day without a planned run');
 // half-way through a training: progress must survive the run
 const dy=x.k.day();dy.pick='KA';dy.inp={'KA-1-0':{s:['5','5']}};dy.done={'KA-0-0':1};x.k.render();
 const wk0=x.k.weekPlan().map(e=>e.id).join();
 x.$('[data-a=xrun]').click();if(x.k.D().tab!=='run'||dy.run!=='RE')issue('easy run not opened');
 if(!/strength training/i.test((x.$('.xrh')||{}).textContent||''))issue('no order hint on the extra run');
 dy.fin={rpe:4,km:'5',min:'33'};x.k.render();x.$('[data-a=saverun]').click();
 if(!D.logs.some(l=>l.d===T&&l.id==='RE'))issue('easy run not logged');
 if(!dy.inp['KA-1-0']||!dy.done['KA-0-0']||dy.pick!=='KA')issue('training progress lost by logging the run');
 D.tab='train';x.k.render();dy.fin={rpe:6};x.k.render();x.$('[data-a=savetr]').click();
 const td=D.logs.filter(l=>l.d===T).map(l=>l.id).sort().join();if(td!=='KA,RE')issue('both entries not saved: '+td);
 x.k.render();if(x.$('[data-a=xrun]'))issue('"+ Easy run" still offered after a run today');
 // the week preview follows, tomorrow (day before kickboxing) stays easy
 const wk1=x.k.weekPlan();if(wk1.map(e=>e.id).join()===wk0&&!wk1[0].done)issue('week preview not updated');
 const tom=x.k.recAll(addD(T,1));if(['KC','CH','RH','RI'].indexOf(tom.id)>=0)issue('day before kickboxing gets '+tom.id);
 if(['KC','CH','RH','RI'].indexOf(wk1[1].id)>=0)issue('week preview: day before kickboxing gets '+wk1[1].id);
 // easy run also after the training is done (no run yet)
 const z=boot();const E=base(z.k);E.logs.push({d:TD,id:'KB',t:'Strength B',rpe:6,lg:0});E.tab='start';z.k.render();if(!z.$('[data-a=xrun]')||!/after your training/.test(z.$('[data-a=xrun]').textContent))issue('no "+ Easy run" after a training');
 if(x.errs.length)issue('run: JS errors '+x.errs.join('; '));if(z.errs.length)issue('run2: JS errors '+z.errs.join('; '));}
// 3 backup round trip with the new fields, junk refused, old backup
{const x=boot();const D=base(x.k);const dy=x.k.day();dy.add=[KB,'Dumbbell curls'];dy.xr=true;D.favQ=['Dumbbell curls'];D.favAsk=[KB,'Dumbbell curls'];
 const txt=x.k.bkJSON();const y=boot();y.k.today(TD);if(!y.k.restore(txt))issue('backup with new fields rejected');const E=y.k.D();
 if(JSON.stringify(E.days[TD].add)!==JSON.stringify(dy.add)||E.days[TD].xr!==true||JSON.stringify(E.favQ)!==JSON.stringify(D.favQ)||JSON.stringify(E.favAsk)!==JSON.stringify(D.favAsk))issue('round trip lost new fields '+JSON.stringify({add:E.days[TD].add,xr:E.days[TD].xr,q:E.favQ,a:E.favAsk}));
 E.tab='train';y.k.day().pick='KA';y.k.render();if(!/Cable kickbacks/.test((y.$('details[data-blk="KA-80"]')||{}).textContent||''))issue('restored additions not shown');
 const j=y.k.cleanImport({profile:{},logs:[],favQ:[{},'x'.repeat(95),'<b>ok</b>'],favAsk:'no',days:{[TD]:{add:[1,null,'x'.repeat(95),'Dumbbell curls','Dumbbell curls'],xr:'yes'}}});
 if(JSON.stringify(j.favQ)!==JSON.stringify(['<b>ok</b>'])||j.favAsk||JSON.stringify(j.days[TD].add)!==JSON.stringify(['Dumbbell curls'])||j.days[TD].xr)issue('junk in new fields accepted '+JSON.stringify({q:j.favQ,a:j.favAsk,d:j.days[TD]}));
 y.k.D().favQ=['<img src=x onerror=alert(1)>'];y.k.D().tab='start';y.k.render();if(y.$('#app img'))issue('favourite question renders markup');
 const old={v:3,start:'2026-09-07',onb:true,profile:{pull:4,dips:6,push:15},logs:[{d:'2026-11-09',id:'KC',t:'x',rpe:6}],days:{[TD]:{done:{},inp:{},skip:{},pick:null,run:null,fin:{},noKick:false}},vr:{},pain:{},home:{}};
 const z=boot();z.k.today(TD);if(!z.k.restore(JSON.stringify(old)))issue('old backup rejected');z.k.D().tab='train';z.k.render();z.k.D().tab='start';z.k.render();
 [x,y,z].forEach(q=>{if(q.errs.length)issue('backup: JS errors '+q.errs.join('; '));});}
// 4 Playwright 390×844: add search, session with additions, Today with "+ Easy run"
let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
const guard=require('./netguard');const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
await p.goto('file://'+R+'/.build/index.html');
await p.evaluate(()=>{const k=window.__kz,D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,emph:'bal',loc:'g',tab:'start',bkTs:Date.now()});D.logs=[{d:k.today(),id:'MO',t:'Morning routine',m:['hips']}];localStorage.setItem('kz_app_v3',JSON.stringify(D));});
await p.reload();await p.waitForTimeout(150);
if(!await p.$('[data-a=xrun]'))issue('playwright: no "+ Easy run"');else{await p.locator('[data-a=xrun]').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t38-today-easyrun.png'});}
await p.click('.big[data-tab=train]');await p.waitForTimeout(100);
await p.click('[data-a=addopen]');await p.waitForTimeout(100);await p.fill('#addq','kick');await p.waitForTimeout(50);
const vis=await p.$$eval('.adr:not(.hid)',x=>x.map(b=>b.dataset.n));if(!vis.length||vis.some(n=>!/kick/i.test(n)))issue('playwright: search filter '+vis);
await p.screenshot({path:R+'/.build/t38-add-search.png'});
await p.click('.adr:not(.hid)[data-n="Cable kickbacks"]');await p.waitForTimeout(100);
await p.locator('details[data-blk$="-80"]').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t38-additions-block.png'});
const ok=await p.evaluate(()=>{const d=window.__kz.day();return d.add&&d.add[0];});if(ok!=='Cable kickbacks')issue('playwright: not added '+ok);
await p.reload();await p.waitForTimeout(150);if(!await p.$('details[data-blk$="-80"]'))issue('playwright: additions gone after reload');
if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();
})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);}
