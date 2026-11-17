// @name daily-form
// P-8: daily readiness tip, off by default. Off (and on without a tap): plans identical to the plan without P-8 for 4
// profiles × Strength A/B/C and over a 6-week simulation, no bar on the training page. Tired: low round count, fewer sets,
// (A-047: about ⅓ fewer working sets of the whole session ± 1 – whole accessory/circuit exercises first, then one set less
// per exercise ≥ 2, circuits one round less – in all 4 profiles in week 5 and 10, explicitly Partner Strength B week 10;
// same loads, no tests, "Easy week now" hint after 3 tired days in 7) the hint "3–4 reps before failure", never under the
// floors (45 min, 2 working sets, a leg session keeps ≥ 4 leg sets on the tired day; legs + hinge ≥ 10 over the training
// week, checked with one tired Strength B per week over 10 weeks). Good: high round count only where the week has room, level 0
// never raised, 12 weeks of "good" every day keep the band tolerance (peak ≤ upper + 2 / + 4, average ≤ upper limit).
// Log rd, passive stats line, backup fields, junk refused; Extras switch and bar in the UI, Plain wording; Playwright
// 390×844 screenshots.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {sim,addD,doTrain,sig}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const $=s=>w.document.querySelector(s);
  const click=s=>{const e=$(s);if(!e){issue('missing '+s);return false;}e.click();return true;};
  return {w,k:w.__kz,errs,$,click,txt:()=>w.document.getElementById('app').textContent};}
const START='2026-09-21',V=['pull','push','legs','hinge','core'];const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[],tab:'start'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||START);return D;}
function simR(k,days,rd,cb){const D=k.D();let s=START;for(let i=0;i<days;i++){k.today(s);if(rd)k.day().ready=rd;const r=k.recAll(s,false);
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});
    else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});else{const ss=doTrain(k,r.id);if(cb)cb(r.id,ss,s);}s=addD(s,1);}}
const tot=(k,s,c,id)=>{let n=0;s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(k.curVar(it,k.LOC())<0||!it.k||it.f||it.iso||it.test)return;n+=k.setsOf(it,b,c,id);});});return n;};
const hist=(k,p,days)=>{const z=boot(),D=setup(z.k,p,START);simR(z.k,days||28,0);return z;};

// 1 off and on-without-tap: identical plans; the off switch ignores a stored tap
PROF.forEach(p=>{const z=hist(boot().k,p),k=z.k,D=k.D();const td=addD(START,28);k.today(td);const c=k.ctx(td);
  ['KA','KB','KC'].forEach(id=>{const a=sig(k,k.S(id,c));k.day().ready=3;const b=sig(k,k.S(id,c));D.opt.ready=true;delete k.day().ready;const e=sig(k,k.S(id,c));D.opt.ready=false;
    if(a!==b)issue(p.n+' '+id+': plan changes with readiness off');if(a!==e)issue(p.n+' '+id+': plan changes with readiness on but no tap');});
  D.tab='train';k.day().pick='KA';k.render();if(z.$('.rdbar'))issue(p.n+': readiness bar shown while off');
  if(z.errs.length)issue(p.n+' JS errors '+z.errs.join('; '));});
// six-week simulation: switch on, never tap → same days and sessions as off
{const a=boot(),b=boot();setup(a.k,prof('Partner glutes'));setup(b.k,prof('Partner glutes'));b.k.D().opt.ready=true;
 const ra=sim(a.k,42,START).map(r=>r.id+(r.sig||'')),rb=sim(b.k,42,START).map(r=>r.id+(r.sig||''));let d=0;ra.forEach((x,i)=>{if(x!==rb[i])d++;});if(d)issue('6-week simulation with the switch on and no tap: '+d+' days differ');}

// 2 tired vs normal for every profile × A/B/C in week 5 and week 10 (A-047 Tired doctrine, measured on the whole session):
//   about a third fewer working sets of the session (⅔ of the normal count ± 1), whole accessory/circuit exercises first,
//   then one set less per exercise (never deeper than ⅔ of an exercise, at least 2), load and variation unchanged, warm-up
//   and cool-down complete, floors (45 min, a leg session keeps ≥ 4 leg sets), hint "3–4 reps before failure";
//   explicitly Partner lower and Partner glutes Strength B in week 10
const TW=[];
[28,63].forEach(off=>PROF.forEach(p=>{const z=hist(boot().k,p,off),k=z.k,D=k.D();const td=addD(START,off);k.today(td);D.opt.ready=true;const c=k.ctx(td);const wkN=off/7+1;
  ['KA','KB','KC'].forEach(id=>{k.day().ready=2;const sn=k.S(id,c),nn=tot(k,sn,c,id);k.day().ready=3;const st=k.S(id,c),nt=tot(k,st,c,id);
    const tg=Math.round(nn*2/3);if(Math.abs(nt-tg)>1)issue(p.n+' '+id+' week '+wkN+': tired '+nt+' working sets, target ⅔ of '+nn+' = '+tg+' ± 1');
    TW.push({p:p.n,id,wk:wkN,nn,nt,mn:sn.min,mt:st.min});
    if(nt>nn)issue(p.n+' '+id+': tired '+nt+' sets > normal '+nn);
    if(st.min<45&&sn.min>=45)issue(p.n+' '+id+': tired '+st.min+' min, under the 45 min floor');
    const per=(s,f)=>{const m={};s.blocks.forEach(b=>{b.items.forEach(it=>{const v=k.curVar(it,'g');if(v<0||!it.k)return;m[(b.warm?'W':b.cool?'C':'')+it.k]=f(it,b,v);});});return m;};
    const setsN=per(sn,(it,b)=>it.f||it.iso||it.test?null:k.setsOf(it,b,c,id)),setsT=per(st,(it,b)=>it.f||it.iso||it.test?null:k.setsOf(it,b,c,id));
    k.day().ready=2;const wN=per(sn,(it,b,v)=>it.opts[v].n+'|'+(it.opts[v].w?k.target(it,v).w:''));k.day().ready=3;const wT=per(st,(it,b,v)=>it.opts[v].n+'|'+(it.opts[v].w?k.target(it,v).w:''));
    Object.keys(setsT).forEach(q=>{const a=setsN[q],t=setsT[q];if(a==null||t==null)return;
      if(t>a)issue(p.n+' '+id+' '+q+': tired '+t+' sets > normal '+a);
      if(t<Math.min(a,Math.max(2,Math.ceil(a*2/3)))&&t<a-1)issue(p.n+' '+id+' '+q+': tired '+t+' of '+a+' sets, deeper than ⅔');
      if(t<2&&a>=2)issue(p.n+' '+id+' '+q+': under 2 sets when tired');});
    Object.keys(wT).forEach(q=>{if(wN[q]!=null&&wN[q]!==wT[q])issue(p.n+' '+id+' '+q+': load or variation changed when tired '+wN[q]+' → '+wT[q]);});
    const wc=s=>s.blocks.filter(b=>b.warm||b.cool).map(b=>b.name+':'+b.items.length).join();if(wc(sn)!==wc(st))issue(p.n+' '+id+': warm-up/cool-down shortened when tired');
    if(k.legSets(sn,c,id)>=6&&k.legSets(st,c,id)<4)issue(p.n+' '+id+' week '+wkN+': tired leg session under 4 leg sets ('+k.legSets(st,c,id)+')');
    rep.push(p.n+' '+id+' week '+wkN+': normal '+nn+' sets / '+sn.min+' min · tired '+nt+' sets / '+st.min+' min');});
  D.tab='train';k.day().pick='KC';k.day().ready=3;k.render();if(!/3–4 reps before failure/.test(z.txt()))issue(p.n+': no "3–4 reps before failure" hint');
  if(z.errs.length)issue(p.n+' JS errors '+z.errs.join('; '));}));
['Partner lower','Partner glutes'].forEach(pn=>{const x=TW.find(t=>t.p===pn&&t.id==='KB'&&t.wk===10);if(!x)issue(pn+' KB week 10 not measured');else{const tg=Math.round(x.nn*2/3);
  rep.push(pn+' KB week 10 (explicit): normal '+x.nn+' → tired '+x.nt+' working sets (target '+tg+' ± 1), '+x.mn+' → '+x.mt+' min');if(Math.abs(x.nt-tg)>1)issue(pn+' KB week 10: '+x.nt+' instead of '+tg+' ± 1');}});
// weekly floor over the week: one tired day per training week (Strength B), the rest normal – legs + hinge ≥ 10 per training week
PROF.forEach(p=>{const {k}=boot(),D=setup(k,p,START);D.opt.ready=true;let s=START;
  for(let i=0;i<70;i++){k.today(s);const r=k.recAll(s,false);if(['KB'].includes(r.id))k.day().ready=3;
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});
    else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});else{const id=k.recTrain(s,'g',false).id;doTrain(k,id);}s=addD(s,1);}
  const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5),wk={};D.logs.forEach(l=>{const w=Math.floor(day(l.d)/7),x=wk[w]||(wk[w]={lh:0,dl:false,t:0});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.rd===3)x.t++;if(l.vs)x.lh+=l.vs.legs+l.vs.hinge;});
  const tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<10);let td=0;tw.forEach(w=>{td+=wk[w].t;if(wk[w].lh<10)issue(p.n+' week '+(+w+1)+' with a tired Strength B: legs + hinge '+wk[w].lh+' (< 10)');});
  rep.push(p.n+': 10 weeks with a tired Strength B, '+td+' tired logs, legs + hinge per training week '+tw.map(w=>wk[w].lh).join(' '));});
// no tests on a tired day: a due Skill Trial waits; "Easy week now" suggested after 3 tired days in 7
{const z=boot(),k=z.k,D=setup(k,prof('Partner glutes'));let td=null;let s=START;
 for(let i=0;i<70&&!td;i++){k.today(s);const r=k.recAll(s,false);if(r.id==='CH'&&r.btn==='train'){td=s;break;}
   if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});else doTrain(k,r.id);s=addD(s,1);}
 if(!td)issue('no Skill Trial day found for the tired check');else{D.opt.ready=true;k.day().ready=3;const t=k.recTrain(td,'g',false);if(t.id==='CH'||!/Skill Trial waits/.test(t.why))issue('tired day still plans the Skill Trial: '+JSON.stringify(t));
   delete k.day().ready;if(k.recTrain(td,'g',false).id!=='CH')issue('Skill Trial gone without the tired tap');}
 D.opt.ready=true;const t0=k.today();D.logs.push({d:addD(t0,-6),id:'KA',t:'KA',rpe:6,rd:3},{d:addD(t0,-3),id:'KB',t:'KB',rpe:6,rd:3});D.easy='';D.tab='start';k.render();
 if(z.$('.tired3'))issue('easy-week hint after 2 tired days');D.logs.push({d:addD(t0,-1),id:'KC',t:'KC',rpe:6,rd:3});D.logs.sort((a,b)=>a.d<b.d?-1:1);k.render();
 const h=z.$('.tired3');if(k.ctx(t0).cyc!==6&&(!h||!h.querySelector('[data-a=easy]')))issue('no easy-week hint after 3 tired days in 7');
 D.opt.ready=false;k.render();if(z.$('.tired3'))issue('easy-week hint with readiness off');
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}
{let vis=0;PROF.forEach(p=>{const z=hist(boot().k,p),k=z.k,D=k.D();const td=addD(START,28);k.today(td);D.opt.ready=true;const c=k.ctx(td);['KA','KB','KC'].forEach(id=>{k.day().ready=2;const a=tot(k,k.S(id,c),c,id);k.day().ready=3;if(tot(k,k.S(id,c),c,id)<a)vis++;});});
 if(vis<6)issue('tired shortens only '+vis+' of 12 sessions visibly');}

// 3 good: never lower than normal, level 0 never raised; 12 weeks of good / of tired keep the tolerance and the floors
PROF.forEach(p=>{const z=hist(boot().k,p),k=z.k,D=k.D();const td=addD(START,28);k.today(td);D.opt.ready=true;const c=k.ctx(td);
  ['KA','KB','KC'].forEach(id=>{k.day().ready=2;const sn=k.S(id,c);k.day().ready=1;const sg=k.S(id,c);
    sg.blocks.forEach((b,i)=>{if(!b.rounds||b.lowb)return;const bn=sn.blocks.find(x=>x.name===b.name);if(!bn)return;const rg=k.rounds(b,c,id),rn=k.rounds(bn,c,id);
      if(k.lvl()===0&&rg>rn)issue(p.n+' '+id+' '+b.name+': level 0 raised on a good day');});
    if(sg.min>90)issue(p.n+' '+id+': good day '+sg.min+' min');});});
['good','tired'].forEach(mode=>PROF.forEach(p=>{const {k,errs}=boot(),D=setup(k,p,START);D.opt.ready=true;const hotP=({lower:['legs','hinge'],glutes:['hinge']})[p.emph]||[];
  simR(k,84,mode==='good'?1:3,(id,ss,s)=>{if(['KA','KB','KC','CH','HO'].includes(id)&&(ss.min<(mode==='tired'?45:60)||ss.min>90))issue(mode+' '+p.n+' '+s+' '+id+': '+ss.min+' min');});
  const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5),wk={};D.logs.forEach(l=>{const w=Math.floor(day(l.d)/7),x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs)V.forEach(q=>x[q]+=l.vs[q]);});
  const tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<11);const out=[];
  V.forEach(q=>{const hot=hotP.includes(q),hi=hot?20:(p.focus==='str'?16:14),tol=hot?2:4;let peak=0;for(let i=6;i<84;i++){let h=0;D.logs.forEach(l=>{const x=day(l.d);if(x>i-7&&x<=i&&l.vs&&!l.bl)h+=l.vs[q];});peak=Math.max(peak,h);}
    const avg=tw.reduce((a,w)=>a+wk[w][q],0)/(tw.length||1);out.push(q[0]+peak+'/'+avg.toFixed(1));
    if(peak>hi+tol)issue(mode+' '+p.n+': '+q+' peak '+peak+' over '+hi+' + '+tol);if(avg>hi)issue(mode+' '+p.n+': '+q+' average '+avg.toFixed(1)+' over '+hi);});
  tw.forEach(w=>{if(wk[w].legs+wk[w].hinge<10)issue(mode+' '+p.n+' week '+(+w+1)+': legs + hinge '+(wk[w].legs+wk[w].hinge));});
  if(!D.logs.some(l=>l.rd===(mode==='good'?1:3)))issue(mode+' '+p.n+': logs without rd');
  rep.push('12 weeks '+mode+', '+p.n+' (peak/avg): '+out.join(' '));if(errs.length)issue(mode+' '+p.n+' JS errors '+errs.join('; '));}));

// 4 stats line, backup fields, junk
{const {k,errs,txt}=boot(),D=setup(k,prof('Captain'),'2026-10-01');k.today('2026-11-16');D.opt.ready=true;
 [[1,1],[3,3],[5,3],[8,3],[10,2]].forEach(([n,r])=>D.logs.push({d:addD('2026-11-16',-n),id:'KA',t:'x',rpe:6,rd:r}));D.tab='stand';k.render();
 if(!/Readiness over 4 weeks: good 1 · normal 1 · tired 3/.test(txt()))issue('no passive readiness line in the stats');
 const ci=k.cleanImport({v:3,opt:{ready:true},logs:[{d:'2026-11-10',id:'KA',t:'x',rd:3},{d:'2026-11-11',id:'KA',t:'x',rd:7},{d:'2026-11-12',id:'KA',t:'x',rd:'<b>'}],days:{'2026-11-16':{ready:3},'2026-11-15':{ready:9}}});
 if(!ci||!ci.opt.ready||ci.logs[0].rd!==3||ci.logs[1].rd!=null||ci.logs[2].rd!=null||!ci.days['2026-11-16']||ci.days['2026-11-16'].ready!==3||(ci.days['2026-11-15']&&ci.days['2026-11-15'].ready!=null))issue('backup readiness fields wrong '+JSON.stringify(ci&&[ci.opt,ci.logs.map(l=>l.rd),ci.days]));
 const old=boot({v:3,onb:true,start:'2026-09-07',profile:{pull:4},logs:[{d:'2026-11-10',id:'KA',t:'x',rpe:6}],opt:{rest:true}});old.k.today('2026-11-16');if(old.k.D().opt.ready)issue('old state: readiness not off');
 ['start','train','mehr','verlauf'].forEach(t=>{old.k.D().tab=t;old.k.render();});if(old.errs.length||errs.length)issue('JS errors '+old.errs.concat(errs).join('; '));}

// 5 UI: Extras switch, bar, toggle, Plain wording
{const {k,errs,click,txt,$}=boot(),D=setup(k,prof('Captain'),'2026-10-01');k.today('2026-11-16');D.tab='mehr';k.render();
 if(!/Daily readiness check/.test(txt()))issue('Extras: no readiness switch');click('[data-a=opt][data-k=ready]');if(!D.opt.ready)issue('switch did not turn on');
 D.tab='train';k.day().pick='KB';k.render();if(!$('.rdbar'))issue('no readiness bar');click('[data-a=ready][data-v="3"]');if(k.day().ready!==3)issue('tap tired not stored');
 if(!/3–4 reps before failure/.test(txt()))issue('tired hint missing in the UI');click('[data-a=ready][data-v="3"]');if(k.day().ready)issue('second tap did not clear');
 k.day().pick='RS';k.render();if($('.rdbar'))issue('bar on a recovery session');
 D.theme='plain';k.day().pick='KA';k.render();if(/warrior/i.test(txt()))issue('Plain theme with Warhammer wording');D.theme='templar';k.render();if(!/warrior/.test(txt()))issue('templar question missing');
 if(errs.length)issue('UI JS errors '+errs.join('; '));}

// 6 Playwright 390×844
(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
 const guard=require('./netguard');const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
 await p.goto('file://'+R+'/.build/index.html');
 await p.evaluate(()=>{const k=window.__kz,D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',start:'2026-08-03',tab:'mehr',bkTs:Date.now()});localStorage.setItem('kz_app_v3',JSON.stringify(D));});
 await p.reload();await p.waitForTimeout(150);const sw=p.locator('[data-a=opt][data-k=ready]');if(!await sw.count())issue('playwright: no switch');else{await sw.scrollIntoViewIfNeeded();await sw.click();await p.waitForTimeout(60);await p.screenshot({path:R+'/.build/t37-extras.png'});}
 await p.evaluate(()=>{const k=window.__kz,D=k.D();D.tab='train';k.day().pick='KC';k.render();});await p.waitForTimeout(80);
 const t=p.locator('[data-a=ready][data-v="3"]');if(!await t.count())issue('playwright: no tired chip');else{await t.click();await p.waitForTimeout(80);await p.locator('.rdbar').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t37-tired.png'});}
 const ow=await p.evaluate(()=>document.documentElement.scrollWidth);if(ow>390)issue('playwright overflow '+ow);
 if(errs.length)issue('playwright errors: '+errs.join('; '));await b.close();done();})().catch(e=>{issue('crash: '+e.stack);done();});
function done(){console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(P.length?1:0);}
