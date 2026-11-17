// @name level-two-axes
// A-041: level on two axes (L3). Upper stand (pull-ups, dips, muscle-ups) and lower stand from the leg anchor (hip thrust
// or squat: best weight against the first weight of the same variant and the weeks since). Four stages each, the fourth
// without a muscle-up: +25 %/12 weeks, +50 %/26 weeks, +75 %/104 weeks [Q3][Q58] (A-049: the fourth stage needs 104 weeks since the first value). Upper stage 1 as before (5 pull-ups,
// 8 dips); past Basic upper or an "Experienced" start makes the lower stand ≥ 1. Rounds follow the stand of the block's own
// axis, the band of a pattern +2 at the fourth stand of its axis. Status shows the two tiles (A-049: not the header line nor the
// onboarding summary, the header shows date and week only, since A-042 plus the block accent), a rise is
// only reported in the toast. No new field: an old backup loads unchanged.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const T0='2026-11-16';const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const BASIC={pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15};
function setup(k,prof,startP){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'lower',kickDays:[],logs:[],start:'2025-01-06',short:false,goal:null});
  delete D.startP;if(startP)D.startP=startP;Object.assign(D.profile,BASIC,prof||{});k.today(T0);return D;}
const anc=(D,wks,w0,w1,key)=>{key=key||'g_ht#0';D.logs.push({d:addD(T0,-Math.round(wks*7)),id:'KC',t:'KC',rpe:6,vs:{legs:4,hinge:6},ex:{[key]:[10,w0]}});
  D.logs.push({d:addD(T0,-2),id:'KC',t:'KC',rpe:6,vs:{legs:4,hinge:6},ex:{[key]:[10,w1]}});};
// 1 lower stand: ratio and weeks both count, the best stage wins, every anchor variant (hip thrust, squat)
{const {k}=boot();
  [[1.24,20,0],[1.25,12,1],[1.3,11,0],[1.5,26,2],[1.5,25,1],[1.75,52,2],[1.75,40,2],[1.75,103,2],[1.75,104,3],[2,80,2],[2,104,3]].forEach(([r,wk,want])=>{const D=setup(k);anc(D,wk,40,40*r);
    const s=k.lvLo();if(s!==want)issue('lower: ×'+r+' after '+wk+' weeks → '+s+', expected '+want);});
  {const D=setup(k);anc(D,30,60,90,'gl_sq#0');if(k.lvLo()!==2)issue('squat anchor not read: '+k.lvLo());}
  {const D=setup(k);anc(D,60,20,60,'g_bss#0');if(k.lvLo()!==0)issue('a non-anchor exercise lifts the lower stand');}
  {const D=setup(k,null,'s2');if(k.lvLo()!==1)issue('Experienced start: lower not ≥ 1');}
  {const D=setup(k,{pull:6,dips:9});if(k.lvLo()!==1)issue('upper past Basic: lower not ≥ 1 (training status)');}
  {const D=setup(k);if(k.lvLo()!==0||k.lvUp()!==0)issue('beginner not Basic/Basic: '+k.lvTxt());}
  rep.push('lower stages ok: ×1.25/12 wk → 1, ×1.5/26 → 2, ×1.75/52 → 2, ×1.75/104 → 3 (A-049)');}
// 2 upper stand: stage 1 as before, stage 2 with 3 muscle-ups or the ratio, stage 3 without a muscle-up
{const {k}=boot();
  let D=setup(k,{pull:4,dips:10});if(k.lvUp()!==0)issue('4 pull-ups not Basic');
  D=setup(k,{pull:5,dips:8});if(k.lvUp()!==1)issue('5/8 not Intermediate: '+k.lvUp());
  D=setup(k,{pull:6,dips:10,mu:3});if(k.lvUp()<2)issue('3 muscle-ups not Advanced');
  D=setup(k,{pull:9,dips:16,mu:0},'s1');D.logs.push({d:addD(T0,-740),id:'KA',t:'KA',rpe:6,vs:{pull:6},ex:{'a_row#0':[8,0]}},{d:addD(T0,-735),id:'CH',t:'CH',rpe:6,vs:{pull:4},ex:{},tv:{pull:4}});
  if(k.lvUp()!==3)issue('fourth stage without muscle-up not reached (pull 9 vs first trial 4, 105 weeks): '+k.lvUp());
  D.logs=[Object.assign({},D.logs[0],{d:addD(T0,-200)}),Object.assign({},D.logs[1],{d:addD(T0,-190)})];if(k.lvUp()!==2)issue('pull ×1.8 after 28 weeks should be Advanced: '+k.lvUp());
  D=setup(k,{pull:12,dips:20});D.logs.push({d:addD(T0,-400),id:'CH',t:'CH',rpe:6,vs:{pull:4},ex:{},tv:{pull:10}});if(k.lvUp()!==1)issue('start value from the first trial not used (12 vs 10): '+k.lvUp());
  D=setup(k,{pull:12,dips:20},'s1');D.logs.push({d:addD(T0,-400),id:'KA',t:'KA',rpe:6,vs:{pull:6},ex:{'a_row#0':[8,0]}});if(k.lvUp()!==1)issue('start preset taken as a measurement: '+k.lvUp());
  rep.push('upper: 5/8 → 1, mu 3 → 2, pull ×1.75 over 104 weeks → 3 ('+k.LVN[3]+')');}
// 3 rounds follow the block's own axis
{const {k}=boot();const D=setup(k);anc(D,30,40,62);/* upper Basic, lower Advanced */
  const c=Object.assign({},k.ctx(T0),{cyc:4});const S=k.S('KC',c);let lo=null,up=null;
  S.blocks.forEach(b=>{if(!b.rounds||b.rounds[0]===b.rounds[1]||b.warm||b.cool)return;const st=k.bStand(b);if(st===2&&!lo)lo=b;if(st===0&&!up)up=b;});
  const mk=(b,items)=>Object.assign({},b,{items,tr:null,vb0:0});
  if(!lo){const leg=[];S.blocks.forEach(b=>b.items.forEach(it=>{const p=k.itPat?k.itPat(it):'';if(p==='legs'||p==='hinge')leg.push(it);}));if(leg.length)lo=mk({rounds:[3,4],name:'legs'},leg.slice(0,2));}
  if(lo){const r=k.rounds(Object.assign({},lo,{tr:null}),c,'KC');if(r!==lo.rounds[1])issue('leg block at lower Advanced not high: '+r+' of '+lo.rounds);}else issue('no leg block found');
  const pull=k.S('KA',c).blocks.find(b=>b.rounds&&b.rounds[0]!==b.rounds[1]&&!b.warm&&k.bStand(b)===0);
  if(pull){const r=k.rounds(Object.assign({},pull,{tr:null}),c,'KA');if(r!==pull.rounds[0])issue('upper block at upper Basic not low: '+r);}else issue('no upper block at Basic found');
  rep.push('rounds: leg block '+(lo&&lo.name)+' high, upper block '+(pull&&pull.name)+' low');}
// 4 band: +2 on the upper limit at the fourth stand of the pattern's axis only
{const {k}=boot();const D=setup(k);D.emph='';const b0=k.vBand('legs').join('–'),p0=k.vBand('pull').join('–');anc(D,110,40,80);
  const b1=k.vBand('legs'),p1=k.vBand('pull').join('–');if(b1[1]!==+b0.split('–')[1]+2)issue('legs band at lower Veteran not +2: '+b0+' → '+b1.join('–'));
  if(p1!==p0)issue('pull band moved with the lower stand: '+p0+' → '+p1);rep.push('band legs '+b0+' → '+b1.join('–')+', pull '+p0+' unchanged');}
// 5 header, Status, onboarding note
{const {k,d}=boot();const D=setup(k,{pull:6,dips:10});anc(D,30,40,62);
  D.tab='train';k.render();const ey=(d.getElementById('subline')||{}).textContent||'';if(!/ · Week \d+( · [A-Z][a-z]+)?$/.test(ey.trim())||/Upper|Lower|Basic|Intermediate|Advanced|Veteran/.test(ey))issue('header line shows the level (A-049): '+ey);
  D.tab='stand';k.render();const t=[...d.querySelectorAll('.tally .t')].map(x=>x.textContent);
  if(!t.some(x=>/Intermediate\s*Upper body/.test(x))||!t.some(x=>/Advanced\s*Lower body/.test(x)))issue('Status tiles: '+t.slice(0,3).join(' | '));
  const nx=(d.querySelector('.lvnx')||{}).textContent||'';if(!/Lower: next stage at \+75 %/.test(nx)||!/104 weeks/.test(nx))issue('next-stage hint: '+nx);
  if(!/Upper: next stage at \+50 % pull-ups/.test(nx))issue('upper hint: '+nx);
  rep.push('header "'+ey.replace(/\s+/g,' ').trim()+'"');}
// 5b A-049: Veteran not before 104 weeks on the upper axis either; onboarding summary without the level
{const {k,d}=boot();let D=setup(k,{pull:12,dips:20},'s1');D.logs.push({d:addD(T0,-560),id:'KA',t:'KA',rpe:6,vs:{pull:6},ex:{'a_row#0':[8,0]}},{d:addD(T0,-555),id:'CH',t:'CH',rpe:6,vs:{pull:4},ex:{},tv:{pull:5}});
  if(k.lvUp()!==2)issue('upper Veteran before 104 weeks (×2.4 after 80 weeks): '+k.lvUp());
  D=setup(k,{pull:6,dips:10});anc(D,30,40,62);D.onb=false;D.obStep=3;k.render();const sm=[...d.querySelectorAll('.sum')].map(x=>x.textContent).join(' | ');
  if(!sm)issue('onboarding summary not found');else if(/Upper:|Lower:|Basic|Intermediate|Advanced|Veteran/.test(sm))issue('onboarding summary shows the level: '+sm);
  rep.push('Veteran ≥ 104 weeks on both axes, onboarding summary "'+sm.replace(/\s+/g,' ').trim().slice(0,70)+'"');}
// 6 a rise of the lower stand is reported in the toast (passive), no question
{const {k,d}=boot();const D=setup(k);D.logs.push({d:addD(T0,-100),id:'KC',t:'KC',rpe:6,vs:{legs:4,hinge:6},ex:{'g_ht#0':[10,40]}});
  const L0=k.lvLo();const dy=k.day();dy.pick='KC';dy.fin={rpe:6};const c=k.ctx(T0),S=k.S('KC',c);let hit=0;
  S.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.gone)return;const v=k.curVar(it,k.LOC());if(v<0)return;const key='KC-'+bix+'-'+ii;dy.done[key]=true;
    if(it.f||it.iso||it.test)return;const n=k.setsOf(it,b,c,'KC');const g=k.target(it,v);let w=it.opts[v].w?String(g.w||20):'';if(it.k==='g_ht'&&v===0){w='52';hit=1;}dy.inp[key]={s:Array(n).fill(String(g.r)),w};});});
  if(!hit)issue('KC without barbell hip thrust – case not built');
  k.saveTrain();const L1=k.lvLo(),t=(d.querySelector('.toast')||{}).textContent||'';
  if(!(L0===0&&L1===1))issue('lower stand did not rise 0 → 1: '+L0+' → '+L1);else if(!/Level up: Lower Intermediate/.test(t))issue('no lower level-up toast: '+t);
  if(d.querySelector('[data-a=lvup]'))issue('a level question appears');rep.push('toast: '+t.replace(/\s+/g,' ').trim().slice(0,90));}
// 7 an old backup loads unchanged (no new field)
{const {k}=boot();const D=setup(k);anc(D,30,40,62);const s=JSON.stringify(D);const c=k.cleanImport(JSON.parse(s));
  if(!c||c.logs.length!==D.logs.length)issue('backup does not load');['lvU','lvL','level'].forEach(f=>{if(c&&f in c)issue('new field '+f);});
  k.setD(c);k.today(T0);if(k.lvLo()!==2)issue('stand after restore: '+k.lvLo());}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
