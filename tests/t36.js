// @name pause-injury
// P-7: pause mode and injury regions. Pause: one tap under More (end date and reason folded), start page card with Resume,
// no recommendation and a paused week preview, streaks bridged (no loss), ends with Resume, the next training log or after
// its end date (archived in pauseH); cycle waits (fully paused weeks do not count). Comeback after 3 weeks of pause (and
// after an unannounced 12-day break): the first 2 strength sessions keep the low round count, no extras, no target steps
// up, no Skill Trial/test in the first 7 days and no hard run in the first 3; comeback logs never raise stall or a plateau
// check, the load average skips paused weeks (no false warning), the set band is not lowered and the plateau boost does not
// run out over the pause. Injury: knee/lower back/ankle/hip with filter and rehab block, knee/ankle → no runs, upper body
// normal, the pain filter ranks above additions and band swaps, "Healed" in one tap; old pain data, backup round trip,
// junk refused; Playwright 390×844 screenshots (More, start card, knee day).
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD,doTrain}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',typeof pre==='string'?pre:JSON.stringify(pre));
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  const click=s=>{const e=$(s);if(!e){issue('missing '+s);return false;}e.click();return true;};
  const set=(s,v)=>{const e=$(s);if(!e){issue('missing '+s);return;}e.value=v;e.dispatchEvent(new w.Event('change',{bubbles:true}));};
  return {w,k:w.__kz,errs,$,click,set,txt:()=>w.document.getElementById('app').textContent};}
const npAfter=r=>r.np;const START='2026-09-21';const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[],tab:'start'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||START);return D;}
// one day like sim(), but paused days log nothing
function step(k,s){const D=k.D();k.today(s);const r=k.recAll(s,false);if(r.pause)return {d:s,id:'PAUSE',pause:1};const row={d:s,id:r.id,btn:r.btn};
  if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});
  else if(r.btn==='run'){D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});}
  else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
  else{const c=k.ctx(s);row.pre={};row.s=k.S(r.id,c);row.c=c;
    // targets before logging
    row.s.blocks.forEach(b=>b.items.forEach(it=>{const v=k.curVar(it,k.LOC());if(v<0||it.f||it.iso||it.test||!it.k)return;const st=D.ex[it.k+'#'+v];if(st)row.pre[it.k+'#'+v]={st:Object.assign({},st),g:k.target(it,v)};}));
    row.cb=k.cbInfo(s);row.low=row.s.blocks.filter(b=>b.rounds&&!b.lowb).every(b=>k.rounds(b,c,r.id)===b.rounds[0]);
    doTrain(k,r.id);row.l=D.logs[D.logs.length-1];row.np=D.goal?D.goal.np||0:0;}
  return row;}

// 1 one tap under More, start card, no recommendation, week preview paused, options, Resume
{const {k,w,errs,click,set,txt,$}=boot(),D=setup(k,prof('Captain'),'2026-10-05');k.today('2026-11-16');
 for(let i=1;i<=6;i++)D.logs.push({d:addD('2026-11-16',-i),id:i%2?'KA':'RE',t:'x',rpe:6});
 const st0=k.streaks().day.now;
 D.tab='mehr';k.render();if(!$('[data-a=pause]'))issue('More: no pause button');click('[data-a=pause]');
 if(!D.pause||D.pause.from!=='2026-11-16'||D.pause.to!==''||D.pause.why!=='pause')issue('pause after one tap: '+JSON.stringify(D.pause));
 if(!/Training paused|Standing down/.test(txt()))issue('More does not show the active pause');
 set('#pz_to','2026-11-30');if(D.pause.to!=='2026-11-30')issue('end date not set: '+D.pause.to);
 set('#pz_to','2026-11-01');if(D.pause.to!=='')issue('end date before the start accepted');set('#pz_to','2026-11-30');
 click('[data-a=pausewhy][data-k=ill]');if(D.pause.why!=='ill')issue('reason not set');
 D.tab='start';k.render();const t=txt();
 if(!$('.pausecard')||!$('.pausecard [data-a=resume]'))issue('start: no pause card with Resume');
 if(/Recommended/.test(t))issue('start: a recommendation while paused');
 if(k.recAll('2026-11-16',false).btn!=='pause')issue('recAll not paused');
 const wp=k.weekPlan();if(!wp.every(e=>e.pause))issue('week preview not paused through 30 Nov: '+wp.map(e=>e.id).join(' '));if(!/Paused/.test(t))issue('week strip without "Paused"');
 if(k.streaks().day.now!==st0)issue('streak changed on the first paused day');
 // days pass: streak bridged, then Resume
 k.today('2026-11-25');D.tab='start';k.render();if(k.streaks().day.now<st0)issue('streak lost over paused days: '+k.streaks().day.now+' < '+st0);
 click('.pausecard [data-a=resume]');if(D.pause)issue('Resume did not end the pause');
 if(!D.pauseH.length||D.pauseH[0].f!=='2026-11-16'||D.pauseH[0].t!=='2026-11-24')issue('pause archive '+JSON.stringify(D.pauseH));
 if(k.recAll('2026-11-25',false).btn==='pause')issue('still paused after Resume');
 // the next training log ends a pause, a morning routine or a past-day log does not
 D.tab='mehr';k.render();click('[data-a=pause]');k.today('2026-11-28');D.logs.push({d:'2026-11-28',id:'MO',t:'MO',rpe:3});
 if(!D.pause)issue('pause gone without a training log');
 const dy=k.day();dy.pick='KA';dy.fin={rpe:6};k.saveTrain();if(D.pause)issue('logging a training did not end the pause');
 if(D.pauseH.length!==2||D.pauseH[1].t!=='2026-11-27')issue('second archive '+JSON.stringify(D.pauseH));
 // end date passes → ends by itself
 D.pause={from:'2026-11-29',to:'2026-12-02',why:'pause'};k.today('2026-12-04');D.tab='start';k.render();if(D.pause)issue('pause did not end after its end date');
 if(D.pauseH[2].t!=='2026-12-02')issue('auto end archive '+JSON.stringify(D.pauseH[2]));
 // a pause started and resumed the same day leaves no archive
 D.tab='mehr';k.render();click('[data-a=pause]');click('[data-a=resume]');if(D.pause||D.pauseH.length!==3)issue('same-day resume archived something');
 if(errs.length)issue('UI JS errors '+errs.join('; '));}

// 2 three weeks of pause after 5 weeks of training: cycle waits, comeback, no false load warning, band and plateau boost
['Captain','Partner glutes','Runner'].forEach(pn=>{const {k,errs}=boot(),p=prof(pn),D=setup(k,p,START);
 k.setGoal(pn==='Runner'?'pull':'pull');D.goal.v=999;
 let s=START;for(let i=0;i<35;i++){step(k,s);s=addD(s,1);}
 const wkBefore=k.ctx(s).week,ex0=JSON.parse(JSON.stringify(D.ex)),np0=D.goal.np||0;D.goal.pz=addD(s,-5);D.goal.pm='s';D.goal.np=3;
 k.today(s);D.pause={from:s,to:'',why:'pause'};const ps=s;
 for(let i=0;i<21;i++){const r=step(k,s);if(!r.pause)issue(pn+' '+s+': not paused');s=addD(s,1);}
 if(D.logs.some(l=>l.d>=ps&&l.d<s))issue(pn+': something logged during the pause');
 k.today(s);const bandB=k.vBand('pull');if(!k.D().goal||!k.plBoost())issue(pn+': plateau boost ran out over the pause (paused days counted)');
 if(k.ctx(s).week!==wkBefore)issue(pn+': cycle moved over the pause '+wkBefore+' → '+k.ctx(s).week);
 // resume and train 10 days
 k.pauseEnd(s);const rs=s,rows=[];
 for(let i=0;i<10;i++){rows.push(step(k,s));s=addD(s,1);}
 const strR=rows.filter(r=>r.s);
 strR.forEach((r,i)=>{const c=r.cb;
   if(i<2){if(!c.low)issue(pn+' '+r.d+' strength session '+(i+1)+' after the pause not a comeback');
     if(!r.low)issue(pn+' '+r.d+' '+r.id+': comeback without the low round count');
     if(r.l.cb!==1)issue(pn+' '+r.d+': comeback log without cb');
     Object.keys(r.pre).forEach(key=>{const x=r.pre[key];if(x.g.r>x.st.r||(x.g.w||0)>(x.st.w||0))issue(pn+' '+r.d+' '+key+': target steps up in the comeback ('+x.st.r+'/'+(x.st.w||0)+' → '+x.g.r+'/'+(x.g.w||0)+')');
       const now=D.ex[key];if(now&&(now.stall||0)>(x.st.stall||0))issue(pn+' '+r.d+' '+key+': stall raised by a comeback log');});
     if(D.goal&&i===1&&npAfter(r)>3)issue(pn+': comeback logs counted as plateau checks (np '+npAfter(r)+')');
     const extra=r.s.blocks.find(b=>b.fav);if(extra&&extra.items.length>4)issue(pn+': comeback with extra favourites');}
   else if(c.low)issue(pn+' '+r.d+': third strength session still a comeback');});
 if(strR.length<2)issue(pn+': only '+strR.length+' strength sessions in 10 days after the pause');
 rows.forEach(r=>{const dd=Math.round((Date.parse(r.d)-Date.parse(rs))/864e5);if(dd<7&&(r.id==='CH'||r.id==='TE'))issue(pn+' '+r.d+': test in the comeback week ('+r.id+')');
   if(dd<3&&(r.id==='RH'||r.id==='RI'))issue(pn+' '+r.d+': hard run on day '+(dd+1)+' of the comeback');});
 k.today(addD(rs,3));const ls=k.loadStat();if(ls.n&&ls.cur>1.5*ls.avg)issue(pn+': load warning after the pause '+ls.cur+' vs '+ls.avg);
 if(k.vBand('pull')[0]<bandB[0])issue(pn+': band lowered after the pause');
 rep.push(pn+': comeback '+strR.slice(0,3).map(r=>r.d+' '+r.id+(r.cb.low?' (comeback, low rounds, '+r.s.min+' min)':' ('+r.s.min+' min)')).join(', ')+' · days '+rows.map(r=>r.id).join(' '));
 if(errs.length)issue(pn+' JS errors '+errs.join('; '));});

// 3 unannounced 12-day break also starts a comeback; a single old log or a 9-day gap does not
{const {k}=boot(),D=setup(k,prof('Partner lower'),START);let s=START;for(let i=0;i<28;i++){step(k,s);s=addD(s,1);}
 const last=D.logs[D.logs.length-1].d;let t=addD(last,12);k.today(t);if(!k.cbInfo(t).low)issue('12 days without training: no comeback');
 const c=k.ctx(t),ss=k.S('KC',c);if(!ss.blocks.filter(b=>b.rounds&&!b.lowb).every(b=>k.rounds(b,c,'KC')===b.rounds[0]))issue('12-day break: rounds not low');
 t=addD(last,9);k.today(t);if(k.cbInfo(t).on)issue('9-day gap counted as a comeback');
 D.logs=[{d:'2026-10-01',id:'KA',t:'KA',rpe:6}];k.today('2026-11-16');if(k.cbInfo('2026-11-16').on)issue('one old log counted as a comeback (no rhythm before)');}

// 4 injury regions: knee → no runs, no knee exercises, upper body normal, rehab block, Healed; filter above additions/swaps
{const {k,errs,click,txt,$,w}=boot(),D=setup(k,prof('Runner'),START);let s=START;for(let i=0;i<21;i++){step(k,s);s=addD(s,1);}
 const base=k.S('KC',k.ctx(s));k.today(s);const v0=k.volSets(base,k.ctx(s),'KC');
 D.pain.k=true;let runs=0;const s0=s;for(let i=0;i<14;i++){const r=step(k,s);if(r.btn==='run')runs++;s=addD(s,1);}
 if(runs)issue('knee on: '+runs+' runs suggested in 14 days');
 k.today(s);if(k.recAll(s,true,true).btn==='run')issue('knee on: run recommended');
 const c=k.ctx(s),ks=k.S('KC',c),v1=k.volSets(ks,c,'KC');
 if(v1.pull<v0.pull||v1.push<v0.push)issue('knee on: upper body changed '+JSON.stringify(v0)+' → '+JSON.stringify(v1));
 const kneeEx=[];ks.blocks.forEach(b=>b.items.forEach(it=>{const v=k.curVar(it,'g');if(v>=0&&/squat|lunge|step-up|pistol|leg press|box jump/i.test(it.opts[v].n))kneeEx.push(it.opts[v].n);}));
 kneeEx.forEach(n=>{if(!k.painHit(n))issue('knee exercise not filtered: '+n);});
 const dy=k.day();dy.pick='KC';dy.add=['Sumo squats','Cable lateral raises'];D.tab='train';k.render();const t=txt();
 if(!/Knee rehab/.test(t))issue('no knee rehab block');if(!/Pain rule/.test(t))issue('no pain rule text');
 if(!/Sumo squats: removed today|Instead of Sumo squats · pain-free choice/.test(t))issue('addition not filtered by the knee filter (A-035: replace or remove with a hint)');
 {const sa=k.S('KC',k.ctx(k.today())),ab=sa.blocks.find(b=>b.add);if(!ab)issue('no additions block');else ab.items.forEach(it=>{const v=k.curVar(it,'g');if(v>=0&&k.painHit(it.opts[v].n))issue('painful addition still in the session: '+it.opts[v].n);});}
 kneeEx.slice(0,1).forEach(n=>{if(t.indexOf(n)>=0&&!/Skipped because of pain/.test(t))issue('knee exercise shown without the pain skip');});
 if(!/No runs are planned/.test(t))issue('no hint about runs');
 // lower back, ankle, hip filters
 [['b','Romanian deadlift'],['b','Kettlebell Swings'],['a','Box Jumps'],['a','Standing calf raises'],['h','Barbell hip thrust'],['h','Abductor machine'],['k','Barbell back squat']].forEach(([r,n])=>{const o=Object.assign({},D.pain);Object.keys(D.pain).forEach(x=>D.pain[x]=false);D.pain[r]=true;if(!k.painHit(n))issue(r+' does not filter '+n);D.pain=o;});
 ['Clean pull-ups','Dumbbell bench press','Cable row'].forEach(n=>{const o=Object.assign({},D.pain);['k','b','a','h'].forEach(x=>D.pain[x]=true);if(k.painHit(n))issue('lower-body regions filter an upper-body exercise: '+n);D.pain=o;});
 Object.keys(k.REHAB).forEach(r=>{if(!k.PAINN[r])issue('rehab block without a region name: '+r);});['k','b','a','h'].forEach(r=>{if(!k.REHAB[r])issue('no rehab block for '+r);});
 // logging with the knee on: skipped exercises do not count
 const dz=k.day();dz.add=[];dz.fin={rpe:6};k.saveTrain();const l=D.logs[D.logs.length-1];
 if(l.vs&&l.vs.legs>v0.legs)issue('knee on: skipped leg sets counted '+l.vs.legs);
 // Healed in one tap
 k.today(addD(s,1));D.tab='train';k.render();if(!$('[data-a=healed][data-k=k]'))issue('no Healed button');else{click('[data-a=healed][data-k=k]');if(D.pain.k)issue('Healed did not clear the knee');}
 if(k.painRun())issue('runs still blocked after Healed');
 if(errs.length)issue('injury JS errors '+errs.join('; '));}

// 5 old pain data, backup round trip, junk refused, Plain theme words
{const old={v:3,onb:true,start:'2026-09-07',profile:{pull:4,dips:6,push:15},logs:[{d:'2026-11-10',id:'KA',t:'x',rpe:6}],pain:{w:true,s:false,e:false},home:{}};
 const y=boot(old);y.k.today('2026-11-16');const D=y.k.D();if(!D.pain.w||!y.k.painHit('Handstand'))issue('old pain data: wrist filter lost');
 ['start','train','mehr','verlauf'].forEach(t=>{D.tab=t;y.k.render();});if(y.errs.length)issue('old state JS errors '+y.errs.join('; '));
 const z=boot();z.k.today('2026-11-16');if(!z.k.restore(JSON.stringify(old)))issue('old backup refused');else{const E=z.k.D();if(!E.pain.w||E.pause)issue('old backup pain/pause '+JSON.stringify(E.pain)+' '+JSON.stringify(E.pause));}
 const ci=y.k.cleanImport({v:3,pause:{from:'2026-11-10',to:'2026-11-20',why:'ill'},pauseH:[{f:'2026-10-01',t:'2026-10-05'}],pain:{k:true,b:false,a:true,h:false},logs:[{d:'2026-11-09',id:'KA',t:'x',cb:1}]});
 if(!ci||JSON.stringify(ci.pause)!=='{"from":"2026-11-10","to":"2026-11-20","why":"ill"}'||ci.pauseH.length!==1||!ci.pain.k||!ci.pain.a||ci.logs[0].cb!==1)issue('backup fields not kept '+JSON.stringify(ci&&[ci.pause,ci.pauseH,ci.pain]));
 const cj=y.k.cleanImport({v:3,pause:{from:'<b>',to:'x',why:'evil'},pauseH:[{f:'2026-10-05',t:'2026-10-01'},'x',{f:'__proto__'}],pain:{k:'yes',zz:true,__proto__:{a:true}}});
 if(!cj||cj.pause||cj.pauseH.length||cj.pain.k||cj.pain.zz||cj.pain.a)issue('junk accepted '+JSON.stringify(cj&&[cj.pause,cj.pauseH,cj.pain]));
 const cp=y.k.cleanImport({v:3,pause:{from:'2026-11-10',to:'2026-11-01',why:'evil'}});if(!cp||!cp.pause||cp.pause.to!==''||cp.pause.why!=='pause')issue('pause with a bad end date/reason not cleaned '+JSON.stringify(cp&&cp.pause));
 // file round trip through bkJSON keeps pause and pauseH
 const x=boot();x.k.today('2026-11-16');const X=x.k.D();X.onb=true;X.pause={from:'2026-11-14',to:'',why:'ill'};X.pauseH=[{f:'2026-10-01',t:'2026-10-03'}];X.pain.h=true;
 const bj=x.k.bkJSON();const q=boot();q.k.today('2026-11-16');if(!q.k.restore(bj))issue('round trip refused');else{const Q=q.k.D();if(JSON.stringify(Q.pause)!==JSON.stringify(X.pause)||JSON.stringify(Q.pauseH)!==JSON.stringify(X.pauseH)||!Q.pain.h)issue('round trip differs');}
 // Plain theme: no Warhammer words in the pause texts
 const pl=boot();pl.k.today('2026-11-16');const L=pl.k.D();Object.assign(L,{onb:true,theme:'plain',tab:'mehr'});pl.k.render();const pt=pl.txt();
 if(/Stand down|crusade|Wounds closed|Return to arms/i.test(pt))issue('Plain theme shows Warhammer pause words');if(!/Pause training/.test(pt))issue('Plain theme: no "Pause training"');
 L.theme='templar';pl.k.render();if(!/Stand down/.test(pl.txt()))issue('templar theme: no "Stand down"');}

// 6 Playwright 390×844 screenshots
(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
 const guard=require('./netguard');const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
 await p.goto('file://'+R+'/.build/index.html');
 await p.evaluate(()=>{const k=window.__kz,D=k.D(),t=k.today();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-08-03',kickDays:[2],tab:'mehr',bkTs:Date.now()});
   const add=(n,o)=>{const d=new Date(t+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-n);D.logs.push(Object.assign({d:d.toISOString().slice(0,10)},o));};
   for(let i=1;i<=20;i+=2)add(i,{id:'KA',t:'Strength A',rpe:6,min:70});D.logs.sort((a,b)=>a.d<b.d?-1:1);localStorage.setItem('kz_app_v3',JSON.stringify(D));});
 await p.reload();await p.waitForTimeout(150);
 const pb=p.locator('[data-a=pause]');if(!await pb.count())issue('playwright: no pause button');else{await pb.scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t36-more.png'});await pb.click();await p.waitForTimeout(80);
   await p.locator('summary:has-text("End date and reason")').click();await p.waitForTimeout(60);await p.locator('[data-a=resume]').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t36-more-paused.png'});}
 await p.click('#nav [data-tab=start]');await p.waitForTimeout(100);if(!await p.$('.pausecard'))issue('playwright: no pause card');await p.screenshot({path:R+'/.build/t36-start.png'});
 await p.click('.pausecard [data-a=resume]');await p.waitForTimeout(80);if(await p.$('.pausecard'))issue('playwright: card stays after Resume');
 await p.evaluate(()=>{const k=window.__kz,D=k.D();D.pain.k=true;D.tab='train';k.day().pick='KC';k.render();});await p.waitForTimeout(100);await p.screenshot({path:R+'/.build/t36-knee.png'});
 const ow=await p.evaluate(()=>document.documentElement.scrollWidth);if(ow>390)issue('playwright overflow '+ow);
 if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(P.length?1:0);}
