// @name load-extras
// P-4 total load: every log carries minutes (strength from the session estimate, kickboxing 90 by default and changeable,
// runs as entered, other activity as entered); old logs get estimates (never written back). Weekly load = how hard ×
// minutes as a bar chart next to the 4-week average (weeks without training do not count); extra easy runs and logged past
// days count. Insight only as a line: > 1.5 × the average (warning with ≥ 2 sessions at the limit). Extras under More, all
// off: weekly rest day (≤ 6 active days in 7 over 8-week simulations), other activity (hiking 3 h hard → next day no Strength
// C / hard run, in the week preview too; past days too; not a training week for the cycle), "Easy week now" (deload moves
// forward, cycle, tests, Skill Trial and week preview follow, one-tap undo until the week begins). Backup round trip with
// the new fields, junk refused, old backup. Playwright 390×844 screenshots.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',typeof pre==='string'?pre:JSON.stringify(pre));
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  const click=s=>{const e=$(s);if(!e){issue('missing '+s);return false;}e.click();return true;};
  const set=(s,v)=>{const e=$(s);if(!e){issue('missing '+s);return;}e.value=v;e.dispatchEvent(new w.Event('change',{bubbles:true}));};
  return {w,k:w.__kz,errs,$,click,set,txt:()=>w.document.body.textContent};}
const START='2026-09-21',TD='2026-11-16';const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start,td){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:start||START,short:false,fav:(p.fav||[]).slice(),bkTs:Date.now(),tab:'start'});k.today(td||start||START);return D;}
// 1 minutes on logs: kickboxing default 90 and changeable, strength from s.min, old logs estimated
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-10-05',TD);D.tab='kick';k.render();
 const dur=z.$('#f_dur');if(!dur||dur.value!=='90')issue('kickboxing duration field missing or not 90: '+(dur&&dur.value));
 z.click('[data-a=rpe][data-v="8"]');z.click('[data-a=savekick]');let l=D.logs[D.logs.length-1];if(!l||l.id!=='KI'||l.min!==90)issue('KI log without min 90 '+JSON.stringify(l));
 k.today(addD(TD,3));D.tab='kick';k.render();z.set('#f_dur','75');z.click('[data-a=rpe][data-v="6"]');z.click('[data-a=savekick]');l=D.logs[D.logs.length-1];if(l.min!==75)issue('KI duration not changeable: '+l.min);
 k.today(addD(TD,5));const dy=k.day();dy.pick='KA';dy.fin={rpe:6};const s=k.S('KA',k.ctx(k.today()));k.saveTrain();l=D.logs[D.logs.length-1];if(l.id!=='KA'||l.min!==s.min||!(l.min>0))issue('strength log min '+l.min+' vs s.min '+s.min);
 const est={KA:75,KC:75,CH:45,HO:50,SK:40,RS:16,MO:12,RE:35,RI:40,KI:90};Object.keys(est).forEach(id=>{const m=k.logMin({d:TD,id});if(m!==est[id])issue('estimate '+id+' '+m);});
 if(k.logMin({id:'RH',km:10})!==65)issue('RH estimate km × 6.5: '+k.logMin({id:'RH',km:10}));if(k.logMin({id:'RE',km:5,min:31})!==31)issue('logged min not used');
 if(JSON.stringify(D.logs).includes('"min":75,"lg"')&&false)issue('');
 const old=D.logs.filter(x=>x.id==='MO');if(old.some(x=>x.min))issue('estimate written back');
 D.logs.push({d:TD,id:'KB',t:'Strength B',rpe:6});['verlauf','start','stand','mehr'].forEach(t=>{D.tab=t;k.render();});if(z.errs.length)issue('JS errors with old logs: '+z.errs.join('; '));
 if(D.logs.find(x=>x.id==='KB'&&x.d===TD).min!=null)issue('estimate written into an old log');}
// 2 weekly load, average without pause weeks, extra easy run and past days count, insight
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-09-07',TD);const wk=s=>k.weekLoad(s);const ws=addD(TD,0);/* TD is a Monday */
 // 4 normal weeks (but one week without training in between: must not count), then this week
 const wkDays=[addD(ws,-35),addD(ws,-28),addD(ws,-21),addD(ws,-7)];/* week -14 is a pause */
 wkDays.forEach(a=>{[0,2,4].forEach(i=>D.logs.push({d:addD(a,i),id:'KA',t:'Strength A',rpe:6,min:70}));});
 D.logs.sort((a,b)=>a.d<b.d?-1:1);k.today(addD(ws,2));let st=k.loadStat();
 if(st.avg!==1260||st.n!==4)issue('4-week average should skip the pause week: avg '+st.avg+' n '+st.n);
 // this week: extra easy run (xr) and a logged past day count
 D.logs.push({d:ws,id:'RE',t:'Easy run',rpe:4,km:5,min:30});D.logs.push({d:addD(ws,1),id:'KC',t:'Strength C',rpe:8,bl:1});
 st=k.loadStat();if(st.cur!==4*30+8*75)issue('this week load with xr + backlog: '+st.cur);
 D.tab='stand';k.render();if(!/Weekly load/.test(z.txt())||!z.w.document.querySelector('svg[aria-label="Weekly load, last 12 weeks"]'))issue('weekly load chart missing');
 const ins=()=>[...z.w.document.querySelectorAll('.ins')].map(x=>x.className+' '+x.textContent).filter(x=>/Load this week/.test(x));
 if(ins().length)issue('load insight without reason: '+ins());
 D.logs.push({d:addD(ws,2),id:'KB',t:'Strength B',rpe:8,min:150});k.render();let i1=ins();if(i1.length!==1||!/info/.test(i1[0]))issue('load insight (> 1.5×, info) '+i1+' cur '+k.loadStat().cur);
 D.logs.push({d:addD(ws,2),id:'RH',t:'Hard run',rpe:10,km:8,min:45});D.logs[D.logs.length-3].rpe=10;k.render();i1=ins();if(i1.length!==1||!/warn/.test(i1[0])||!/at the limit/.test(i1[0]))issue('load insight with 2 at the limit '+i1);
 if(z.w.document.querySelector('.modal,dialog[open]'))issue('load hint is more than a line');}
// 3 Extras: off by default, toggles
{const z=boot(),k=z.k,D=setup(k,prof('Partner lower'),'2026-10-05',TD);if(D.opt.rest||D.opt.oa||D.opt.ready)issue('extras not off by default '+JSON.stringify(D.opt));
 D.tab='start';k.render();if(z.$('[data-tab=other]'))issue('other activity link visible while off');
 D.tab='mehr';k.render();if(!/Extras/.test(z.txt()))issue('no Extras section');['rest','oa'].forEach(x=>{const b=z.$('[data-a=opt][data-k='+x+']');if(!b||b.getAttribute('aria-pressed')!=='false')issue('extra '+x+' toggle');});
 if(!z.$('[data-a=easy]'))issue('no "Easy week now"');z.click('[data-a=opt][data-k=oa]');if(!D.opt.oa)issue('oa toggle');D.tab='start';k.render();if(!z.$('[data-tab=other]'))issue('other activity link missing when on');}
// 4 weekly rest day: ≤ 6 active days in 7 (simulation, overachiever = every recommendation done)
['Captain','Partner glutes','Runner'].forEach(pn=>{const {k,errs}=boot(),D=setup(k,prof(pn));D.opt.rest=true;const act=[];
  sim(k,56,START,(r,s)=>{const l=k.D().logs.filter(x=>x.d===s);act.push(l.some(x=>x.id!=='MO'&&x.id!=='RS')?1:0);});
  for(let i=6;i<act.length;i++){const n=act.slice(i-6,i+1).reduce((a,b)=>a+b,0);if(n>6){issue(pn+': 7 active days up to day '+(i+1)+' with the rest day on');break;}}
  const {k:k2}=boot(),D2=setup(k2,prof(pn));const act2=[];sim(k2,56,START,(r,s)=>{act2.push(k2.D().logs.some(x=>x.d===s&&x.id!=='MO'&&x.id!=='RS')?1:0);});
  rep.push(pn+' active days/8 wks: rest on '+act.reduce((a,b)=>a+b,0)+', off '+act2.reduce((a,b)=>a+b,0));if(errs.length)issue(pn+' JS errors '+errs.join('; '));});
// 5 other activity: hiking 3 h hard → next day no Strength C / hard run (recommendation and week preview), then back
{const z=boot(),k=z.k,D=setup(k,prof('Partner lower'),'2026-10-05','2026-11-10');D.opt.oa=true;
 // history so that Strength C and a hard run are due tomorrow
 D.logs=[{d:'2026-11-02',id:'KC',t:'Strength C',rpe:6,lg:1},{d:'2026-11-04',id:'KA',t:'Strength A',rpe:6},{d:'2026-11-06',id:'KB',t:'Strength B',rpe:6},{d:'2026-11-08',id:'RE',t:'Easy run',rpe:4,km:5,min:30}];
 const tom='2026-11-11';const base=k.recAll(tom,false).id;if(!['KC','RH'].includes(base))rep.push('note: without the hike tomorrow is '+base);
 D.tab='start';k.render();z.click('[data-tab=other]');if(D.tab!=='other')issue('other activity view not opened');
 if(!z.click('[data-a=oaname][data-v=Hiking]'))return;z.set('#f_dur','180');z.click('[data-a=rpe][data-v="8"]');z.click('[data-a=saveoa]');
 const l=D.logs[D.logs.length-1];if(!l||l.id!=='OA'||l.t!=='Hiking'||l.min!==180||l.rpe!==8)issue('hike log '+JSON.stringify(l));
 if(k.loadStat&&k.logLoad(l)!==1440)issue('hike load '+k.logLoad(l));
 const r=k.recAll(tom,false);if(['KC','RH','RI'].includes(r.id))issue('day after a hard 3 h hike: '+r.id);
 k.today(tom);const rt=k.recTrain(tom,'g',false);if(rt.id==='KC')issue('recTrain after the hike: KC');k.today('2026-11-10');
 k.WK.key='';const pl=k.weekPlan();if(['KC','RH','RI'].includes(pl[1].id))issue('week preview tomorrow after the hike: '+pl[1].id);
 const r2=k.recAll('2026-11-12',false);rep.push('hike: base tomorrow '+base+', with hike '+r.id+', day after '+r2.id+', preview '+pl.map(e=>e.id).join(' '));
 // an easy short activity does not block
 D.logs.pop();D.logs.push({d:'2026-11-10',id:'OA',t:'Dancing',rpe:4,min:60});if(k.recAll(tom,false).id!==base)issue('easy activity changed tomorrow: '+k.recAll(tom,false).id+' vs '+base);
 D.logs.pop();
 // not a training week for the cycle
 const c0=k.ctx('2026-11-10').week;D.logs.push({d:'2026-11-30',id:'OA',t:'Hiking',rpe:6,min:120});if(k.ctx('2026-12-07').week!==k.ctx('2026-12-07').week)issue('');
 const wkA=k.ctx('2026-12-08').week;D.logs.pop();const wkB=k.ctx('2026-12-08').week;if(wkA!==wkB)issue('other activity counted as a training week ('+wkA+' vs '+wkB+')');
 // past day
 D.tab='verlauf';D._bl=true;k.render();if(!z.$('#bl_id option[value=OA]'))issue('past day: no other activity');else{z.$('#bl_d').value='2026-11-09';z.$('#bl_id').value='OA';z.$('#bl_rpe').value='6';z.$('#bl_min').value='120';z.$('#bl_oa').value='Cycling';z.click('[data-a=blsave]');
   const b=D.logs.find(x=>x.bl&&x.id==='OA');if(!b||b.t!=='Cycling'||b.min!==120)issue('past other activity '+JSON.stringify(b));}
 if(z.errs.length)issue('other activity JS errors '+z.errs.join('; '));}
// 6 Easy week now
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));const days=[];sim(k,15,START);/* 2 weeks + 1 day of training, today = day 16 (Tue of week 3) */
 const td=addD(START,15);k.today(td);const c0=k.ctx(td);if(c0.cyc!==3)issue('setup cycle '+c0.cyc);
 D.tab='mehr';k.render();if(!z.click('[data-a=easy]'))return;const ez=D.easy;
 // week 3 already has training (Mon) → next week (day 21)
 if(ez!==addD(START,21))issue('easy week start '+ez+' (expected '+addD(START,21)+')');
 if(k.ctx(addD(START,22)).cyc!==6)issue('easy week is not the deload part: cyc '+k.ctx(addD(START,22)).cyc);
 k.WK.key='';const pl=k.weekPlan().map(e=>e.id);rep.push('easy week preview from '+td+': '+pl.join(' '));
 /* the preview's last day is the first day of the easy week */if(!['DL','TE','RE','RS','KI','SK'].includes(pl[6]))issue('preview shows no easy week: '+pl[6]);if(pl.slice(6).some(id=>['KA','KB','KC','CH','RH','RI'].includes(id)))issue('hard session in the easy week of the preview: '+pl.join(' '));
 D.tab='mehr';k.render();if(!z.$('[data-a=easyx]'))issue('no undo before the week began');
 z.click('[data-a=easyx]');if(D.easy)issue('undo failed '+D.easy);if(k.ctx(addD(START,22)).cyc!==4)issue('undo did not restore the cycle '+k.ctx(addD(START,22)).cyc);
 D.tab='mehr';k.render();z.click('[data-a=easy]');
 // follow the plan through the easy week and beyond: DL + TE inside, no Strength/Skill Trial/hard runs, cycle restarts
 const out=sim(k,21,td);const ewk=out.filter(r=>r.d>=addD(START,21)&&r.d<addD(START,28)).map(r=>r.id);
 if(!ewk.includes('DL')||!ewk.includes('TE'))issue('easy week without deload/test: '+ewk.join(' '));if(ewk.some(id=>['KA','KB','KC','CH','RH','RI'].includes(id)))issue('hard session in the easy week: '+ewk.join(' '));
 if(k.ctx(addD(START,28)).cyc!==1)issue('cycle after the easy week: '+k.ctx(addD(START,28)).cyc);
 k.today(addD(START,24));D.tab='mehr';k.render();if(z.$('[data-a=easyx]'))issue('undo still offered after the easy week began');
 k.today(addD(START,36));const more=sim(k,42,addD(START,36)),dl=more.find(r=>r.id==='DL');if(!dl||dl.d<addD(START,63)||dl.d>addD(START,69))issue('next deload '+(dl&&dl.d)+' (expected in the week from '+addD(START,63)+')');
 rep.push('easy week ran: '+out.map(r=>r.id).join(' '));if(z.errs.length)issue('easy week JS errors '+z.errs.join('; '));
 // Skill Trial follows: the gap counts without the deload days
 const {k:k3}=boot(),D3=setup(k3,prof('Partner lower'));sim(k3,30,START);k3.today(addD(START,30));D3.easy=k3.ctx(addD(START,30)).cyc===6?'':addD(START,35);const o3=sim(k3,40,addD(START,30));
 const ch=D3.logs.filter(l=>l.id==='CH').map(l=>l.d);for(let j=1;j<ch.length;j++){const g0=Math.round((Date.parse(ch[j])-Date.parse(ch[j-1]))/864e5);let g=g0;for(let q=1;q<g0;q++)if(k3.ctx(addD(ch[j-1],q)).cyc===6)g--;if(g<12||g>16)issue('Skill Trial gap '+g+' around the easy week ('+ch[j-1]+' → '+ch[j]+')');}
 if(o3.some(r=>r.id==='CH'&&k3.ctx(r.d).cyc===6))issue('Skill Trial inside the easy week');rep.push('partner with easy week from '+D3.easy+': Skill Trial '+ch.join(', '));}
// 7 backup round trip, junk, old backup
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-10-05',TD);Object.assign(D.opt,{rest:true,oa:true});D.easy='2026-11-23';D.easyP='';
 D.logs.push({d:'2026-11-14',id:'OA',t:'Hiking',rpe:8,min:180},{d:'2026-11-13',id:'KI',t:'Kickboxing',rpe:8,min:75},{d:'2026-11-12',id:'KA',t:'Strength A',rpe:6,min:68});k.day().fin={dur:'80',oan:'Climbing'};
 const js=k.bkJSON(),y=boot();y.k.today(TD);if(!y.k.restore(js))issue('backup refused');else{const E=y.k.D();
   if(!E.opt.rest||!E.opt.oa||E.opt.ready)issue('opt lost '+JSON.stringify(E.opt));if(E.easy!=='2026-11-23')issue('easy lost '+E.easy);
   const oa=E.logs.find(l=>l.id==='OA');if(!oa||oa.t!=='Hiking'||oa.min!==180)issue('OA log lost '+JSON.stringify(oa));if(E.logs.find(l=>l.id==='KI').min!==75)issue('KI min lost');
   const f=(E.days[TD]||{}).fin||{};if(f.dur!=='80'||f.oan!=='Climbing')issue('day fin lost '+JSON.stringify(f));if(y.k.ctx('2026-11-24').cyc!==k.ctx('2026-11-24').cyc)issue('cycle differs after restore');}
 const bad=JSON.parse(js);bad.opt={rest:'yes',oa:1,ready:true,evil:'<b>'};bad.easy='<script>';bad.easyP=5;bad.logs.push({d:'2026-11-15',id:'OA',t:'x'.repeat(500),rpe:99,min:'<b>'});
 const y2=boot();y2.k.today(TD);if(!y2.k.restore(JSON.stringify(bad)))issue('junk backup refused completely');else{const E=y2.k.D();if(E.opt.rest!==false||E.opt.oa!==false||E.opt.ready!==true||E.opt.evil)issue('junk opt '+JSON.stringify(E.opt));
   if(E.easy||E.easyP)issue('junk easy kept');const j=E.logs.find(l=>l.d==='2026-11-15');if(j&&(j.t.length>60||j.rpe>10||typeof j.min!=='number'))issue('junk log '+JSON.stringify(j));
   ['verlauf','start','mehr'].forEach(t=>{E.tab=t;y2.k.render();});if(y2.errs.length)issue('junk JS errors '+y2.errs.join('; '));}
 const old={v:3,onb:true,start:'2026-08-03',profile:{pull:6,dips:10,push:20},logs:[{d:'2026-11-02',id:'KA',t:'Strength A',rpe:7},{d:'2026-11-03',id:'KI',t:'Kickboxing',rpe:8},{d:'2026-11-05',id:'RH',t:'Hard run',rpe:8,km:8}],kickDays:[2,5],focus:'bal',theme:'templar'};
 const y3=boot();y3.k.today(TD);if(!y3.k.restore(JSON.stringify(old)))issue('old backup refused');else{const E=y3.k.D();if(!E.opt||E.opt.rest||E.opt.oa)issue('old backup opt defaults '+JSON.stringify(E.opt));if(E.easy)issue('old backup easy');
   ['verlauf','start','mehr','kick'].forEach(t=>{E.tab=t;y3.k.render();});if(y3.errs.length)issue('old backup JS errors '+y3.errs.join('; '));if(y3.k.weekLoad('2026-11-02')!==7*75+8*90+8*52)issue('old backup load '+y3.k.weekLoad('2026-11-02'));}
 const y4=boot(old);y4.k.today(TD);y4.k.render();if(y4.errs.length)issue('old state JS errors '+y4.errs.join('; '));if(!y4.k.D().opt)issue('old state not migrated (opt)');}
// 8 Playwright 390×844
(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
 const guard=require('./netguard');const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
 await p.goto('file://'+R+'/.build/index.html');
 await p.evaluate(()=>{const k=window.__kz,D=k.D(),t=k.today();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-08-03',kickDays:[2,5],tab:'mehr',bkTs:Date.now()});
   const add=(n,o)=>{const d=new Date(t+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-n);D.logs.push(Object.assign({d:d.toISOString().slice(0,10)},o));};
   for(let w=0;w<10;w++){add(w*7+1,{id:'KA',t:'Strength A',rpe:6,min:70});add(w*7+3,{id:'KI',t:'Kickboxing',rpe:8,min:90});add(w*7+5,{id:'RE',t:'Easy run',rpe:4,km:5,min:32});}
   add(2,{id:'OA',t:'Hiking',rpe:8,min:180});D.logs.sort((a,b)=>a.d<b.d?-1:1);localStorage.setItem('kz_app_v3',JSON.stringify(D));});
 await p.reload();await p.waitForTimeout(150);const ex=p.locator('text=Extras');if(!await ex.count())issue('playwright: no Extras');else{await ex.first().scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t33-extras.png'});}
 await p.click('[data-a=opt][data-k=oa]');await p.waitForTimeout(80);await p.click('nav [data-tab=start], #nav [data-tab=start]');await p.waitForTimeout(80);
 if(!await p.$('[data-tab=other]'))issue('playwright: no other activity link');else{await p.click('[data-tab=other]');await p.waitForTimeout(80);await p.click('[data-a=oaname][data-v=Hiking]');await p.waitForTimeout(60);await p.screenshot({path:R+'/.build/t33-other.png'});}
 await p.click('#nav [data-tab=stand]');await p.waitForTimeout(100);const ch=p.locator('svg[aria-label="Weekly load, last 12 weeks"]');if(!await ch.count())issue('playwright: no load chart');else{await ch.scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t33-load.png'});}
 const ow=await p.evaluate(()=>document.documentElement.scrollWidth);if(ow>390)issue('playwright overflow '+ow);
 await p.click('#nav [data-tab=start]');await p.waitForTimeout(60);await p.click('#nav [data-tab=start]');
 if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);}
