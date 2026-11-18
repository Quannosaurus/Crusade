// @name ui-polish
// A-055: a) the Status tile "Hard run" follows the week preview – with no hard run planned (beginner, week 1, base) it
// never shows the interval run as current, but the next planned run or "Next hard run · once unlocked"; with a hard run
// planned it shows it. b) the stats period chips are kept in D.per: survives render, travels with the backup (round trip),
// cleanImport takes only 12w/1y/all, an old backup without the field loads unchanged (default 12w). c) Field kit
// "Nothing": the option list keeps its stored order, "Nothing" means pure bodyweight (no form needs gear), pain filter and
// Never still act, ≤ 90 min, Limited time like the other kits. d) "Never suggest" in the warm-up: the item takes an
// equivalent warm-up exercise, the warm-up stays complete and first, leg days keep hips, knees and ankles; with no
// equivalent the item stays and Never is not offered for it.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
function base(k,o){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'bal',kickDays:[],logs:[],start:'2026-01-05',short:false,goal:null,fav:[],never:[],pr:{},theme:'templar',startP:'s1'},o||{});D.days={};return D;}
const tile=d=>{const t=d.querySelector('.t.hrt');return t?t.textContent:'';};
const isHard=(k,e)=>e.id==='RI'||(e.id==='RH'&&!k.longMode());
// a) beginner week 1 (Plain, Balanced, glute emphasis): no hard run planned → no interval run shown as current
{const {k,d}=boot();const D=base(k,{theme:'plain',startP:'s0',emph:'glutes'});k.today('2026-01-05');D.start=k.today();D.tab='stand';k.render();
  const P0=k.weekPlan(),hard=P0.filter(e=>!e.done&&isHard(k,e));const t=tile(d);rep.push('beginner week 1: plan '+P0.map(e=>e.id).join(' ')+' · tile "'+t+'"');
  if(hard.length)issue('beginner week 1 plans a hard run: '+hard.map(e=>e.id+' '+e.d).join(', '));
  if(!t)issue('no hard-run tile on Status (Balanced)');
  else{if(/Hard run · intervals/.test(t))issue('tile shows the interval run as current without a planned hard run: '+t);
    const nx=P0.map((e,i)=>({e,i})).filter(x=>x.e.run&&!x.e.done)[0];
    if(nx){if(!t.includes(k.NAMES[nx.e.id]))issue('tile does not name the next planned run '+k.NAMES[nx.e.id]+': '+t);if(!/Next run/.test(t))issue('tile not marked "Next run": '+t);}
    else if(!/once unlocked/.test(t))issue('no run planned, tile not marked "once unlocked": '+t);}}
// a) no run planned at all → "Next hard run · once unlocked"
{const {k,d}=boot();const D=base(k,{startP:'s0'});k.today('2026-01-05');D.start=k.today();k.WK.key='';
  const real=k.weekPlan;const P0=real().map(e=>Object.assign({},e,{run:false,id:e.run?'RS':e.id}));k.WK.plan=P0;k.WK.key=k.WK.key||'x';
  const h=k.hardTile();if(k.weekPlan()===P0){if(!/once unlocked/.test(h))issue('without any planned run the tile is not "once unlocked": '+h.replace(/<[^>]+>/g,' '));}else rep.push('(cache check skipped)');}
// a) a planned hard run → the tile shows it
{const {k,d}=boot();let found=0;
  for(let dow=0;dow<7&&!found;dow++){const D=base(k,{});const S0='2026-01-05';
    for(let w=0;w<8;w++){const a=addD(S0,w*7);D.logs.push({d:a,id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8}},{d:addD(a,1),id:'RE',t:'RE',rpe:4,km:6,min:36},{d:addD(a,2),id:'KB',t:'KB',rpe:6,min:70},{d:addD(a,3),id:'RE',t:'RE',rpe:4,km:6,min:36},{d:addD(a,4),id:'KC',t:'KC',rpe:6,min:70},{d:addD(a,5),id:'RE',t:'RE',rpe:4,km:7,min:40});}
    k.today(addD(S0,8*7+dow));k.WK.key='';const P1=k.weekPlan();const hr=P1.filter(e=>!e.done&&isHard(k,e));
    if(hr.length){found=1;D.tab='stand';k.render();const t=tile(d);rep.push('regular week 9: plan '+P1.map(e=>e.id).join(' ')+' · tile "'+t+'"');if(!/Hard run · intervals/.test(t))issue('hard run planned ('+hr[0].id+' '+hr[0].d+') but the tile does not show it: '+t);}}
  if(!found)issue('no regular state with a planned hard run found (check the scenario)');}
// b) period chips in D.per
{const {k,d,w}=boot();const D=base(k,{});for(let i=0;i<4;i++)D.logs.push({d:addD('2026-01-05',i*2),id:'KA',t:'KA',rpe:6,min:70});k.today('2026-01-20');D.tab='stand';k.render();
  const chip=d.querySelector('[data-a=per][data-v="1y"]');if(!chip)issue('no period chip 1y on Status');else{chip.click();
    if(D.per!=='1y')issue('period not stored in D.per: '+D.per);if(k.perNow()!=='1y')issue('perNow not 1y');
    k.render();const on=d.querySelector('[data-a=per][data-v="1y"]');if(!on||!/\bon\b/.test(on.className)&&on.getAttribute('aria-pressed')!=='true')issue('chip 1y not shown as chosen after render');
    const bk=k.bkJSON();if(!/"per":"1y"/.test(bk))issue('backup does not carry per');
    const back=k.cleanImport(JSON.parse(bk));if(back.per!=='1y')issue('round trip loses per: '+back.per);
    const {k:k2}=boot();base(k2,{});k2.today('2026-01-20');k2.restore(bk);if(k2.D().per!=='1y'||k2.perNow()!=='1y')issue('restored backup: period '+k2.D().per);}
  ['x','',5,null,{a:1},'__proto__'].forEach(v=>{const o=k.cleanImport({v:3,logs:[],per:v});if('per' in o)issue('cleanImport keeps junk per '+JSON.stringify(v));});
  const old=k.cleanImport({v:3,logs:[{d:'2026-01-05',id:'KA',t:'KA',rpe:6}]});if('per' in old)issue('old backup without per gets a per field');
  const {k:k3}=boot();base(k3,{});k3.today('2026-01-20');k3.restore(JSON.stringify({v:3,onb:true,profile:k3.D().profile,logs:[{d:'2026-01-05',id:'KA',t:'KA',rpe:6}]}));
  if(k3.perNow()!=='12w'||'per' in k3.D())issue('old backup: period not the default 12w ('+k3.perNow()+')');}
// c) Field kit "Nothing"
{const {k,d}=boot();const D=base(k,{loc:'h',emph:'glutes'});k.today('2026-03-04');
  const order=k.KITS.map(x=>x[0]).join('');if(order!=='nkbdsr')issue('Field kit option list order changed: '+order);
  D.tab='train';k.day().pick='HO';D._kitAsk=true;D._kitSel=['k'];k.render();
  const n=d.querySelector('[data-a=kitsel][data-k=n]');if(!n)issue('no "Nothing" chip in the kit question');else{n.click();const ok=d.querySelector('[data-a=kitok]');ok.click();if(!(Array.isArray(D.kit)&&D.kit.length===0&&k.kitOn()))issue('"Nothing" does not give an empty kit: '+JSON.stringify(D.kit));}
  const mins={};
  [[],['k','b']].forEach(kit=>{D.kit=kit;k.day().kit=true;[false,true].forEach(sh=>{D.short=sh;['KA','KB','KC','HO','CH'].forEach(id=>{const s=k.S(id,k.ctx(k.today()));mins[JSON.stringify(kit)+sh+id]=s.min;
    if(s.min>90)issue('kit '+JSON.stringify(kit)+' '+id+': '+s.min+' min > 90');
    if(!kit.length)s.blocks.forEach(b=>{if(sh&&b.p>1)return;b.items.forEach(it=>{const v=k.curVar(it,'m');if(v<0)return;const r=k.kitReq(it.opts[v]);if(r)issue('Nothing '+id+': '+it.opts[v].n+' needs gear ['+r+']');});});});});});
  ['KA','KB','KC','HO','CH'].forEach(id=>{const a=mins['[]true'+id],b=mins['["k","b"]true'+id];if(Math.abs(a-b)>8)issue('Limited time with Nothing '+id+' '+a+' min vs '+b+' with bar+bands');if(mins['[]false'+id]<45)issue('Nothing '+id+' under 45 min: '+mins['[]false'+id]);});
  rep.push('Nothing: '+['KA','KB','KC','HO','CH'].map(id=>id+' '+mins['[]false'+id]+'/'+mins['[]true'+id]).join(' · ')+' min (normal/Limited time)');
  D.kit=[];D.short=false;D.pain={w:false,s:false,e:false,k:true,b:false,a:false,h:false};
  ['KC','HO'].forEach(id=>{const s=k.S(id,k.ctx(k.today()));s.blocks.forEach(b=>b.items.forEach(it=>{if(b.rehab)return;const v=k.curVar(it,'m');if(v>=0&&k.painHit(it.opts[v].n))issue('Nothing + knee pain: '+it.opts[v].n);}));});
  D.pain={w:false,s:false,e:false,k:false,b:false,a:false,h:false};const s1=k.S('HO',k.ctx(k.today()));let nm='';s1.blocks.some(b=>!b.warm&&!b.cool&&b.items.some(it=>{if(it.f||it.iso||it.test)return false;const v=k.curVar(it,'m');if(v>=0){nm=it.opts[v].n;return true;}return false;}));
  D.never=[nm];const s2=k.S('HO',k.ctx(k.today()));s2.blocks.forEach(b=>b.items.forEach(it=>{const v=k.curVar(it,'m');if(v>=0&&it.opts[v].n===nm)issue('Nothing + Never: '+nm+' still suggested');}));D.never=[];k.day().kit=false;}
// d) Never in the warm-up
{const {k,d}=boot();const D=base(k,{});k.today('2026-03-04');const c=k.ctx(k.today());
  const warm=s=>s.blocks.filter(b=>b.warm)[0];const shown=(b,loc)=>b.items.map(it=>{const v=k.curVar(it,loc||'g');return v<0?null:it.opts[v].n;}).filter(Boolean);
  const s0=k.S('KA',c),w0=shown(warm(s0));if(!s0.blocks[0].warm)issue('KA: warm-up not first');
  // the button is offered for an item with an equivalent, and the flow replaces it
  D.tab='train';k.day().pick='KA';k.render();
  const nb=[...d.querySelectorAll('[data-a=never]')].filter(b=>b.dataset.n==='Wrist prep')[0];if(!nb)issue('no Never button for the warm-up item "Wrist prep"');else nb.click();
  if(!(D.never||[]).includes('Wrist prep'))D.never=['Wrist prep'];
  const s1=k.S('KA',k.ctx(k.today())),w1=shown(warm(s1));
  if(w1.includes('Wrist prep'))issue('"Wrist prep" still in the warm-up after Never');
  if(w1.length!==w0.length)issue('warm-up not complete after Never: '+w0.length+' → '+w1.length);
  if(!w1.some(n=>/wrist/i.test(n)))issue('no wrist warm-up left after Never: '+w1.join(', '));
  if(!s1.blocks[0].warm)issue('warm-up not first after Never');
  const rp=warm(s1).items.filter(it=>it.nx==='Wrist prep')[0];if(!rp)issue('replacement has no "Instead of" hint');
  rep.push('KA warm-up after Never "Wrist prep": '+w1.join(' · '));
  // leg day keeps hips, knees and ankles
  D.never=['Ankle rocks, knee to the wall','Leg swings, front to back and sideways',"World's greatest stretch",'Deep lunge with rotation','Bodyweight squats','Glute bridges'];
  const s2=k.S('KC',k.ctx(k.today())),w2=shown(warm(s2)),lw=w2.join(' | ');
  if(!s2.blocks[0].warm)issue('KC: warm-up not first');
  if(!/hip/i.test(lw))issue('leg day warm-up without hips after Never: '+lw);if(!/ankle/i.test(lw))issue('leg day warm-up without ankles after Never: '+lw);if(!/lunge|squat/i.test(lw))issue('leg day warm-up without knees after Never: '+lw);
  D.never.forEach(n=>{if(w2.includes(n))issue('excluded warm-up item still shown: '+n);});
  const s2n=k.S('KC',(D.never=[],k.ctx(k.today())));if(shown(warm(s2n)).length!==w2.length)issue('KC warm-up count changed by Never: '+shown(warm(s2n)).length+' → '+w2.length);
  rep.push('KC warm-up after 6 exclusions: '+w2.join(' · '));
  // no equivalent: the item stays and Never is not offered for it
  D.skills=Object.assign({},D.skills,{mu:true});D.never=['False grip hang','False grip ring rows'];D.tab='train';k.day().pick='KA';k.render();
  const s3=k.S('KA',k.ctx(k.today())),w3=shown(warm(s3));
  if(!w3.some(n=>/False grip/.test(n)))issue('false grip item without equivalent was removed');
  const fb=[...d.querySelectorAll('[data-a=never]')].filter(b=>/False grip/.test(b.dataset.n));if(fb.length)issue('Never offered for a warm-up item without equivalent: '+fb.map(b=>b.dataset.n).join(', '));
  D.never=[];k.render();const gb=[...d.querySelectorAll('[data-a=never]')].filter(b=>b.dataset.n==='False grip hang');if(!gb.length)issue('Never not offered for "False grip hang" while ring rows are another form');D.skills=Object.assign({},D.skills,{mu:false});
  // Field kit Nothing + Never in the warm-up: the replacement fits the kit
  D.kit=[];k.day().kit=true;D.never=['Prone Y-T-W'];const s4=k.S('HO',k.ctx(k.today())),w4=warm(s4).items.map(it=>{const v=k.curVar(it,'m');return v<0?null:it.opts[v];}).filter(Boolean);
  w4.forEach(o=>{if(o.n==='Prone Y-T-W')issue('Nothing: excluded warm-up item still shown');if(k.kitReq(o))issue('Nothing: warm-up replacement needs gear: '+o.n);});k.day().kit=false;D.never=[];}
rep.forEach(r=>console.log('  '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
