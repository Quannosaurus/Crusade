// @name minimal-kit
// A-019: the day switch "Field kit". For the 3 audit profiles and several kits it checks Strength A/B/C: with "Nothing" only
// bodyweight exercises, with "Pull-up bar" also pulls on the bar, every muscle group of the original session covered,
// anchor and leg block kept, estimate 60–90 min. Then the flow (2 taps with a remembered kit), logging under the kit
// (records per variant, no false records), next day off, week preview unaffected, Limited time combined, backups.
// Playwright 390×844: screenshots of the quick question and a Strength A session with "Nothing".
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const R=path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);let checked=0;
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const PROF=[
 {n:'Captain',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8},focus:'bal',emph:'bal',skills:{hs:1,mu:1},kick:[2,5],fav:['Dumbbell lateral raises','Cable Pallof press']},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',emph:'lower',skills:{},kick:[],fav:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},focus:'str',emph:'glutes',skills:{},kick:[],fav:['Barbell hip thrust']}
];
// independent of the app's own classifier: words that mean equipment
const GEAR=/cable|machine|barbell|dumbbell|kettlebell|\bband|\bring|smith|weighted|vest|pull-up|chin-up|hanging|\bhang\b|bench|chair|\bbox\b|sofa|table|parallettes|parallel bar|\bdips\b|lat pulldown|leg press|rowing|jump rope|false grip|ez-bar|landmine|on a step|bar curls|bar\/rings|bodyweight rows|explosive rows|l-rows|frenchie|nordic|copenhagen|bulgarian|step-ups?\b|dragon flag/i;
// A-027: muscle groups come from the fixed doctrine table of t45 (tests/fixtures/pattern-table.js), not from the app's kitGroup.
const TBL=require('./fixtures/pattern-table.js');
const BAR=/pull-up|chin-up|hang|on bar|bar\/rings|bodyweight rows|explosive rows|l-rows|frenchie/i;
function setup(k,p){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  D.kickDays=p.kick;D.loc='g';D.onb=true;D.seenFocus=true;D.seenFav=true;D.fav=p.fav.slice();D.short=false;}
function vis(k,s,loc){const out=[];s.blocks.forEach(b=>{if(k.D().short&&b.p>1)return;b.items.forEach(it=>{const v=k.curVar(it,loc);if(v<0)return;out.push({b,it,n:it.opts[v].n,v});});});return out;}
const KITS=[['Nothing',[]],['Pull-up bar',['k']],['Bands',['b']],['Dumbbells + chair',['d','s']],['Rings',['r']],['Everything',['k','b','d','s','r']]];
PROF.forEach(p=>{const {k,errs}=boot();setup(k,p);const D=k.D(),T=k.today();
  [0,3].forEach(lw=>{ // fresh week (leg block needed) and a week with history
    D.logs=[];D.start=addD(T,-7*lw-3);if(lw){for(let i=lw;i>=1;i--){D.logs.push({d:addD(T,-7*i),id:'KC',t:'KC',rpe:6,lg:1},{d:addD(T,-7*i+2),id:'KA',t:'KA',rpe:6,lg:1});}}
    ['KA','KB','KC'].forEach(id=>{const c=k.ctx(T);k.day().kit=false;const g=k.S(id,c),gv=vis(k,g,'g').filter(x=>!x.b.warm&&!x.b.cool);
      const gGroups=new Set(gv.filter(x=>x.it.k).map(x=>TBL.group(x.it.k,x.n)));if(gv.some(x=>x.it.k&&TBL.group(x.it.k,x.n)===undefined))issue(p.n+' '+id+': key missing in the pattern table: '+gv.filter(x=>x.it.k&&TBL.group(x.it.k,x.n)===undefined).map(x=>x.it.k).join());const gLeg=g.blocks.some(b=>b.legs),gAnc=gv.some(x=>x.it.anc);
      KITS.forEach(([kn,kit])=>{D.kit=kit;k.day().kit=true;if(!k.kitOn()||k.LOC()!=='m')issue('kit not active');
        checked++;const s=k.S(id,c),sv=vis(k,s,'m').filter(x=>!x.b.warm&&!x.b.cool),tag=p.n+' '+id+' ['+kn+']'+(lw?' wk'+lw:'');
        if(kn==='Nothing'){sv.concat(vis(k,s,'m').filter(x=>x.b.warm||x.b.cool)).forEach(x=>{if(GEAR.test(x.n))issue(tag+': equipment exercise "'+x.n+'"');});}
        if(kn==='Pull-up bar'&&!sv.some(x=>BAR.test(x.n)))issue(tag+': no pull on the bar');
        /* A-035: a pattern group also counts as covered by an exercise of its pattern by the shown variant (doctrine table),
           e.g. jumping squats (b_jump, pattern legs) cover "knee". */
        const PG={pull:'pull',push:'push',legs:'knee',hinge:'hip',core:'core'};
        const sGroups=new Set(sv.filter(x=>x.it.k).map(x=>x.it.kx||TBL.group(x.it.k,x.n)));sv.forEach(x=>{if(x.it.k&&!x.it.kx){const pt=TBL.pattern(x.it.k,x.n);if(pt&&PG[pt])sGroups.add(PG[pt]);}});gGroups.forEach(gr=>{if(!sGroups.has(gr))issue(tag+': muscle group "'+gr+'" not covered');});
        if(gLeg&&!s.blocks.some(b=>b.legs&&vis(k,{blocks:[b]},'m').length))issue(tag+': leg block lost');
        if(gAnc&&!sv.some(x=>x.it.anc))issue(tag+': anchor lost');
        if(s.min<60||s.min>90)issue(tag+': estimate '+s.min+' min');
        const names=sv.filter(x=>x.it.kx).map(x=>x.n);// replacements avoid repeats while the pool allows
        if(kn!=='Nothing'&&new Set(names).size<names.length-1)issue(tag+': repeated replacements '+names.join(', '));
        const ab=s.ab;if(ab){const A=k.ABS?null:null;}
        k.day().kit=false;});});});
  if(errs.length)issue(p.n+': errors '+errs.join('; '));});

// Flow, logging, records, next day, preview, Limited time, backups
{const {w,k,errs}=boot();setup(k,PROF[0]);const D=k.D(),T=k.today(),doc=w.document;
  D.start=addD(T,-10);D.logs=[{d:addD(T,-5),id:'KC',t:'KC',rpe:6,lg:1},{d:addD(T,-3),id:'KB',t:'KB',rpe:6,lg:0}];
  D.kit=['k'];D.tab='train';D.pr['c_sq#0']={sc:120*1000+8,r:8,w:120,d:addD(T,-5),n:'Barbell back squat'};D.ex['c_sq#0']={r:8,w:120,d:addD(T,-5),hold:false,n:'Barbell back squat',stall:0};
  k.WK.plan=null;const plan0=JSON.stringify(k.weekPlan().map(e=>[e.id,e.min]));
  k.render();const click=sel=>{const e=doc.querySelector(sel);if(!e){issue('missing '+sel);return false;}e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));return true;};
  if(k.kitOn())issue('kit on before switching');
  const tg=doc.querySelector('[data-a="kit"]');if(!tg)issue('kit switch missing');else if(!/Field kit/.test(tg.textContent))issue('switch label: '+tg.textContent);
  let taps=0;if(click('[data-a="kit"]'))taps++;
  const chips=[...doc.querySelectorAll('[data-a="kitsel"]')].map(e=>[e.textContent,e.getAttribute('aria-pressed')]);
  if(chips.map(c=>c[0]).join('|')!=='Nothing|Pull-up bar|Bands|Dumbbells/Kettlebell|Bench/Chair|Rings')issue('kit options: '+chips.map(c=>c[0]).join('|'));
  if(!chips.some(c=>c[0]==='Pull-up bar'&&c[1]==='true'))issue('remembered kit not preselected');
  if(click('[data-a="kitok"]'))taps++;
  if(!k.kitOn())issue('kit not on after '+taps+' taps');if(taps!==2)issue('needed '+taps+' taps');
  if(!/Field kit/.test(doc.querySelector('.hero .eyebrow').textContent))issue('hero does not show the kit');
  // preview unchanged by the kit
  k.WK.plan=null;if(JSON.stringify(k.weekPlan().map(e=>[e.id,e.min]))!==plan0)issue('week preview changed by the kit');if(!k.kitOn())issue('preview switched the kit off');
  // log Strength C under the kit
  const dy=k.day();dy.pick='KC';const c=k.ctx(T),s=k.S('KC',c);
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,'m');if(v<0)return;const key='KC-'+bi+'-'+ii;dy.done[key]=true;
    if(it.f||it.test||it.iso)return;const g=k.target(it,v),n=b.rounds?k.rounds(b,c,'KC'):(parseInt(it.sets,10)||1);dy.inp[key]={s:Array(n).fill(String(g.r+1)),w:it.opts[v].w?'10':''};});});
  dy.fin={rpe:6};const n0=D.logs.length;k.saveTrain();
  const L=D.logs[D.logs.length-1];if(D.logs.length!==n0+1||L.id!=='KC')issue('training under the kit not logged');
  if(L&&!k.legLog(L))issue('kit Strength C does not count as a leg session');
  if(D.pr['c_sq#0'].w!==120||D.pr['c_sq#0'].r!==8)issue('gym record overwritten by a kit variant');
  const exk=Object.keys(L.ex||{});if(!exk.length)issue('no exercise values logged');
  exk.forEach(key=>{const m=key.match(/^(.*)#(\d+)$/);if(!m)return;const e=D.ex[key];if(!e)issue('no progression for '+key);});
  if(exk.indexOf('c_sq#0')>=0)issue('kit logged into the barbell squat variant');
  // next day: switch off, gym variants back
  k.today(addD(T,1));if(k.kitOn())issue('kit still on the next day');if(k.LOC()!=='g')issue('location not back to gym the next day');
  const s2=k.S('KA',k.ctx(addD(T,1)));if(s2.blocks.some(b=>b.items.some(it=>it.kx)))issue('replacements the next day');
  k.today(T);
  // Limited time combined
  D.short=true;dy.kit=true;const s3=k.S('KA',k.ctx(T));if(s3.min>90)issue('kit + Limited time over 90 min');
  if(k.ctx(T).legB&&!s3.blocks.some(b=>b.legs&&b.p===1))issue('kit + Limited time dropped a needed leg block');
  D.short=false;
  // backups: round trip keeps the kit, junk is refused, old backup loads
  const bk=k.bkJSON(),o=JSON.parse(bk);if(JSON.stringify(o.kit)!=='["k"]')issue('kit not in the backup');
  const ci=k.cleanImport(o);if(JSON.stringify(ci.kit)!=='["k"]'||!(ci.days[T]&&ci.days[T].kit))issue('kit lost in import');
  const bad=k.cleanImport(Object.assign({},o,{kit:['x','k','k',5,'<b>'],days:{[T]:{kit:'yes'}}}));if(JSON.stringify(bad.kit)!=='["k"]'||bad.days[T].kit)issue('junk kit accepted: '+JSON.stringify(bad.kit));
  if(errs.length)issue('flow errors: '+errs.join('; '));}

// Addendum: two weeks with only kit days neither step the gym variant back nor put it into a stall
{const {k,errs}=boot();setup(k,PROF[0]);const D=k.D(),T0=k.today();D.start=addD(T0,-30);D.logs=[];
  const findIt=(s,key)=>{let r=null;s.blocks.forEach(b=>b.items.forEach(it=>{if(it.k===key||it.k==='mx_'+key)r=r||it;}));return r;};
  // gym state: barbell squat (gym only) and weighted dips (shared with a dumbbell kit), both 2× without progress
  D.ex['c_sq#0']={r:8,w:100,d:addD(T0,-1),hold:false,n:'Barbell back squat',stall:2};
  D.ex['c_dip#1']={r:10,w:20,d:addD(T0,-1),hold:false,n:'Weighted dips',stall:2};
  D.vr['g|c_dip']=1;D.vr['g|c_sq']=0;const kits=[[],['d','s']];let n=0;let lastShared='';
  for(let i=0;i<15;i+=3){const d=addD(T0,i);k.today(d);D.kit=kits[n%2];const dy=k.day();dy.kit=true;dy.pick='KC';const c=k.ctx(d),s=k.S('KC',c);
    s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,'m');if(v<0)return;const key='KC-'+bi+'-'+ii;dy.done[key]=true;
      if(it.f||it.test||it.iso)return;const g=k.target(it,v),nn=b.rounds?k.rounds(b,c,'KC'):(parseInt(it.sets,10)||1);
      dy.inp[key]={s:Array(nn).fill(String(Math.max(1,(g.r||8)-2))),w:it.opts[v].w?'5':''};});});
    dy.fin={rpe:6};k.saveTrain();if(D.kit.length)lastShared=d;n++;}
  if(D.ex['c_dip#1'].d!==lastShared)issue('addendum: shared weighted dips variant was not trained on the dumbbell kit day');
  const dEnd=addD(T0,16);k.today(dEnd);D.kit=[];if(k.kitOn())issue('addendum: kit on after the two weeks');
  const s=k.S('KC',k.ctx(dEnd)),sq=findIt(s,'c_sq'),dp=findIt(s,'c_dip');
  if(!sq||!dp)issue('addendum: squat or dips missing in Strength C');else{
    const g1=k.target(sq,0),g2=k.target(dp,1);
    if(/back/.test(g1.note||'')||g1.w<100||g1.r<8)issue('addendum: barbell squat stepped back: '+JSON.stringify(g1));
    if(/back/.test(g2.note||'')||g2.w<20||g2.r<10)issue('addendum: weighted dips stepped back: '+JSON.stringify(g2));
    if(g1.low||g2.low||/Three times/.test((g1.note||'')+(g2.note||'')))issue('addendum: stall hint after kit days');}
  if(D.ex['c_sq#0'].stall!==2||D.ex['c_dip#1'].stall!==2)issue('addendum: stall changed: squat '+D.ex['c_sq#0'].stall+', dips '+D.ex['c_dip#1'].stall);
  if(D.ex['c_dip#1'].w!==20)issue('addendum: shared dips variant lowered to '+D.ex['c_dip#1'].w+' kg');
  if(!D.kitD||!D.kitD.c_sq)issue('addendum: kit day not counted for the squat pattern');
  // control: the same two weeks without any training do step back
  const {k:k2}=boot();setup(k2,PROF[0]);const D2=k2.D();D2.ex['c_sq#0']={r:8,w:100,d:addD(T0,-1),hold:false,n:'Barbell back squat',stall:2};k2.today(dEnd);
  const sq2=findIt(k2.S('KC',k2.ctx(dEnd)),'c_sq');if(sq2&&!/back/.test(k2.target(sq2,0).note||''))issue('addendum control: pause rule no longer steps back without training');
  const ci=k.cleanImport(JSON.parse(k.bkJSON()));if(!ci.kitD||ci.kitD.c_sq!==D.kitD.c_sq)issue('addendum: kitD lost in the backup');
  if(errs.length)issue('addendum errors: '+errs.join('; '));}
{const old={v:3,onb:true,start:'2026-01-05',profile:{pull:8,dips:10,push:20},logs:[{d:'2026-01-06',id:'KA',t:'Strength A',rpe:6}],days:{},home:{b:true,s:true},kickDays:[2]};
  const {w,k,errs}=boot(old);k.D().tab='train';k.render();if(k.kitOn())issue('old backup: kit on');if(!w.document.querySelector('[data-a="kit"]'))issue('old backup: switch missing');
  w.document.querySelector('[data-a="kit"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  const pre=[...w.document.querySelectorAll('[data-a="kitsel"][aria-pressed="true"]')].map(e=>e.textContent);if(pre.join()!=='Nothing')issue('first time preselection: '+pre.join());
  if(errs.length)issue('old backup errors: '+errs.join('; '));}

(async()=>{let chromium;try{({chromium}=require('playwright'));}catch(e){issue('playwright missing');return done();}
  const guard=require('./netguard');const b=await chromium.launch();const errs=[];
  const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
  await p.goto('file://'+R+'/.build/index.html');
  await p.evaluate(({prof})=>{const k=window.__kz,D=k.D(),T=k.today();Object.assign(D.profile,prof);D.onb=true;D.seenFocus=true;D.seenFav=true;D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};D.loc='g';D.tab='train';
    D.logs=[];D.kit=[];D.bkTs=Date.now();k.day().pick='KA';localStorage.setItem('kz_app_v3',JSON.stringify(D));},{prof:PROF[0].prof});
  await p.reload();await p.waitForTimeout(150);
  await p.click('[data-a="kit"]');await p.waitForTimeout(80);
  await p.locator('.kitq').scrollIntoViewIfNeeded();await p.screenshot({path:R+'/.build/t28-kit-question.png'});
  await p.click('[data-a="kitok"]');await p.waitForTimeout(100);
  const on=await p.evaluate(()=>window.__kz.kitOn());if(!on)issue('playwright: kit not on');
  await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:R+'/.build/t28-kit-ka.png'});
  await p.evaluate(()=>{const e=[...document.querySelectorAll('details.blk')].find(d=>/Explosive|Strength/.test(d.textContent));if(e){e.open=true;e.scrollIntoView();}});await p.waitForTimeout(50);
  await p.screenshot({path:R+'/.build/t28-kit-ka2.png'});
  if(errs.length)issue('page errors: '+errs.join('; '));
  await b.close();done();})();
function done(){console.log('sessions checked under a kit: '+checked);if(checked<100)issue('too few kit sessions checked: '+checked);console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.slice(0,30).forEach(m=>console.log(' - '+m));}
