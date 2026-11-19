// @name train-together
// A-063 Train together (Extra, off by default, no network): phone 1 shares its strength session as a text code
// ("CTB", Crockford Base32, check symbol), phone 2 trains the same exercises dosed by its own state.
// a) round trip: profile A (Captain, muscle-up skill) makes the code for a Legs & full body (KC) and a Muscle-up day (KA);
//    profile B (Partner lower) reads it → the same exercise order (minus replaced slots, each with a reason), B's doses
//    follow B's own state and differ measurably from A's.
// b) log: B trains the code session → entry with id, B's own name, tg:1, lg from the leg sets actually logged; the
//    progression of an exercise rises at B; B's week counts the leg session (hist legW).
// c) robustness: garbage, a cut code, a wrong check symbol, another format version, another catalogue check, HTML signs
//    → a message, nothing changes (kz_app_v3 before = after, no markup rendered).
// d) replacements: B with the knee pain filter, B without the muscle-up skill → forms of the same group, no doubling (no
//    slot of the partner's plan had to give way to a replacement), hint "(partner's plan)" visible; Swap offers no doubling.
// e) data: backup round trip keeps tg; an old backup without tg imports with the same level, records and XP.
// f) Extra off → no together actions on Today.
// Mutations: A's doses used at B → (a) red; tg or lg not set → (b) red; check symbol not checked → (c) red; replacement
// without sesHas → (d) red; tg dropped on import → (e) red; Extra check off → (f) red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const START='2026-09-21',DAYS=56,TD=addD(START,DAYS);
const A32='0123456789ABCDEFGHJKMNPQRSTVWXYZ',CK=A32+'*~$=U';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document,errs};}
function prof(html,n,seed){const z=boot(html),k=z.k,D=k.D(),p=PROF.find(x=>x.n===n);
  Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:[],loc:'g',onb:true,seenFocus:true,seenFav:true,favP:true,logs:[],ex:{},start:START,short:false,fav:[],never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);
  longSim(k,DAYS,START,'prog',seed,null);k.today(TD);D.opt.tg=true;D.tab='start';return z;}
const live=(k,s)=>{const D=k.D(),loc=k.LOC(),L=[];s.blocks.forEach(b=>{if(b.warm||b.cool||(D.short&&b.p>1))return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,loc);if(v<0)return;L.push({it,b,v,n:it.opts[v].n});});});return L;};
const allItems=(k,s)=>{const loc=k.LOC(),L=[];s.blocks.forEach(b=>b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,loc);if(v>=0)L.push({it,b,v,n:it.opts[v].n,part:b.warm?'w':b.cool?'c':'m'});}));return L;};
function share(z,id){const k=z.k;z.k.day().pick=id;const s=k.S(id,k.ctx(TD));return {s,code:k.tgMake(id,s).code};}
function read(z,code){const k=z.k,d=z.d;k.tgUI({mode:'join'});k.render();const el=d.getElementById('tgin');if(!el)return {err:'no input field'};el.value=code;d.querySelector('[data-a=tgread]').click();return k.tgUI()||{};}
function bitsOf(code){const b=code.slice(3,-1),out=[];for(const ch of b){const v=A32.indexOf(ch);for(let j=4;j>=0;j--)out.push((v>>j)&1);}return out;}
function enc(bits){let s='',r=0;for(let i=0;i<bits.length;i+=5){let v=0;for(let j=0;j<5;j++)v=v*2+(bits[i+j]||0);s+=A32[v];r=(r*32+v)%37;}return 'CTB'+s+CK[r];}

function unitA(html,mutDose){const bad=[];const A=prof(html,'Captain',3),B=prof(html,'Partner lower',9);
  ['KC','KA'].forEach(id=>{const {s,code}=share(A,id);const t=read(B,code);if(!t.ok){bad.push('a: '+id+' not read: '+(t.err||'?'));return;}
    if(mutDose){B.k.setD(JSON.parse(JSON.stringify(A.k.D())));B.k.today(TD);}/* mutation: phone 2 doses from phone 1's state */
    const sb=B.k.tgS(id,B.k.ctx(TD),t.ok);const LA=allItems(A.k,s),LB=allItems(B.k,sb);
    /* same order: B's items without a replacement reason are A's items in A's order */
    const keyA=LA.map(x=>A.k.tgKey(x.it,x.v)),keyB=LB.filter(x=>!(x.it.tgx||x.it.ddv||x.it.ddx||x.it.px)).map(x=>B.k.tgKey(x.it,x.v));
    let j=0;keyB.forEach(q=>{while(j<keyA.length&&keyA[j]!==q)j++;if(j>=keyA.length)bad.push('a: '+id+': '+q+' not in A\'s order');j++;});
    /* every slot of A is at B: the same item, a replacement with its reason, or left out with its reason (skill, pain, gear: s.tgo) */
    const repl=LB.length-keyB.length,out=(sb.tgo||[]).length;if(keyB.length+repl+out<keyA.length)bad.push('a: '+id+': B lost slots ('+keyB.length+' kept, '+repl+' replaced, '+out+' left out with a reason, of '+keyA.length+')');
    /* doses: the same exercise, B's state against A's */
    let n=0,diff=0;LB.forEach(x=>{if(x.part!=='m'||x.it.f||x.it.iso||x.it.test)return;const y=LA.find(a=>A.k.tgKey(a.it,a.v)===B.k.tgKey(x.it,x.v));if(!y)return;n++;
      const ga=A.k.target(y.it,y.v),gb=B.k.target(x.it,x.v);if(ga.r!==gb.r||(ga.w||0)!==(gb.w||0))diff++;});
    if(n<3)bad.push('a: '+id+': only '+n+' shared exercises compared');else if(diff<1)bad.push('a: '+id+': B\'s doses equal A\'s ('+n+' compared)');
    console.log('a: '+id+' code '+code.length+' signs, '+LA.length+' items at A, '+LB.length+' at B ('+repl+' replaced, '+out+' left out: '+(sb.tgo||[]).join(', ')+'), '+diff+' of '+n+' doses differ');});
  /* coverage: every item of every planned strength session of every profile is known to the dictionaries (no miss) */
  let ns=0,miss=0,ex='';PROF.forEach((p,i)=>{const z=boot(html),k=z.k,D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
    Object.assign(D,{kickDays:p.kick||[],loc:i===3?'h':'g',onb:true,seenFocus:true,seenFav:true,favP:true,logs:[],ex:{},start:START,short:false,fav:(p.fav||[]).slice(),never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);
    longSim(k,140,START,'prog',20+i,ev=>{if(ev.type!=='session'||k.TGIDL.indexOf(ev.id)<0)return;ns++;const r=k.tgMake(ev.id,ev.s);if(r.miss||r.bmiss){miss+=r.miss+r.bmiss;if(!ex)ex=ev.id+' '+ev.d;}
      if(ns%9===0){k.day().kit=true;D.kit=[];const s2=k.S(ev.id,k.ctx(ev.d)),r2=k.tgMake(ev.id,s2);ns++;if(r2.miss||r2.bmiss){miss+=r2.miss+r2.bmiss;if(!ex)ex='kit '+ev.id+' '+ev.d;}k.day().kit=false;}});});
  if(miss)bad.push('a: '+miss+' items of '+ns+' sessions not in the code (first '+ex+')');console.log('a: coverage '+ns+' sessions, '+miss+' unknown items or block forms');
  [A,B].forEach(z=>{if(z.errs.length)bad.push('a: JS errors '+z.errs.slice(0,2).join('; '));});return bad;}

function unitB(html){const bad=[];const A=prof(html,'Partner glutes',5),B=prof(html,'Partner lower',9),k=B.k,D=k.D();const {code}=share(A,'KC');
  const t=read(B,code);if(!t.ok)return ['b: not read '+(t.err||'')];B.d.querySelector('[data-a=tgstart]').click();
  const dy=k.day();if(!dy.tg||dy.tg.id!=='KC')bad.push('b: Start did not set the together session');
  const c=k.ctx(TD),s=k.S('KC',c);if(!s.tg)bad.push('b: training page does not show the partner\'s session');
  const legW0=k.hist(addD(TD,1)).legW;let lgN=0,up=null;
  s.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.gone)return;const v=k.curVar(it,k.LOC());if(v<0)return;const key='KC-'+bix+'-'+ii;dy.done[key]=true;if(it.f||it.iso||it.test)return;
    const n=k.setsOf(it,b,c,'KC'),g=k.target(it,v),w=it.opts[v].w;dy.inp[key]={s:Array(n).fill(String(g.r+1)),w:w?String(g.w||20):''};const p=k.itPat(it,v);if(p==='legs'||p==='hinge')lgN+=n;
    if(!up&&D.ex[it.k+'#'+v])up={key:it.k+'#'+v,r:D.ex[it.k+'#'+v].r,w:D.ex[it.k+'#'+v].w||0};});});
  dy.fin={rpe:6};k.saveTrain();const l=D.logs[D.logs.length-1];
  if(!l||l.id!=='KC')bad.push('b: no KC entry');else{if(l.tg!==1)bad.push('b: entry without tg:1');if(l.t!==k.NAMES.KC)bad.push('b: entry name '+l.t);if((l.lg?1:0)!==(lgN>=6?1:0))bad.push('b: lg '+l.lg+' with '+lgN+' leg sets logged');if(lgN<6)bad.push('b: only '+lgN+' leg sets in the test session');}
  if(!up)bad.push('b: no exercise with history at B');else{const e=D.ex[up.key];if(!e||!(e.r>up.r||(e.w||0)>up.w))bad.push('b: progression of '+up.key+' did not rise');}
  if(k.hist(addD(TD,1)).legW!==legW0+1)bad.push('b: B\'s week does not count the leg session ('+legW0+' → '+k.hist(addD(TD,1)).legW+')');
  k.WK.key='';const wp=k.weekPlan();if(!wp||!wp.length)bad.push('b: week preview empty');
  [A,B].forEach(z=>{if(z.errs.length)bad.push('b: JS errors '+z.errs.slice(0,2).join('; '));});return bad;}

function unitC(html){const bad=[];const A=prof(html,'Captain',3),B=prof(html,'Partner lower',9);const {code}=share(A,'KC');const st=()=>B.w.localStorage.getItem('kz_app_v3');B.k.render();
  const bits=bitsOf(code);const ver=bits.slice();ver[2]=ver[2]^1;const hsh=bits.slice();hsh[5]=hsh[5]^1;const wrong=code.slice(0,-1)+CK[(CK.indexOf(code.slice(-1))+1)%37];
  const cases=[['garbage','hello world'],['cut',code.slice(0,code.length-9)],['check',wrong],['version',enc(ver)],['catalogue',enc(hsh)],['html','CTB<script>alert(1)</script><img src=x onerror=alert(1)>'],['long',code+code+code]];
  cases.forEach(([nm,txt])=>{const s0=st();const t=read(B,txt);if(t.ok)bad.push('c: '+nm+' was accepted');if(!t.err)bad.push('c: '+nm+' without a message');
    if((nm==='version'||nm==='catalogue')&&!/Update the app on both phones/.test(t.err||''))bad.push('c: '+nm+' message: '+t.err);
    if(st()!==s0)bad.push('c: '+nm+' changed kz_app_v3');if(B.d.querySelector('.tgcard script,.tgcard img'))bad.push('c: '+nm+' rendered markup');
    if(nm==='html'&&!B.d.querySelector('.tgerr'))bad.push('c: html: no message shown');});
  /* tolerant reading: lower case, spaces, dashes, O/0 and I/L/1 */
  const t2=read(B,code.toLowerCase().replace(/0/g,'o').replace(/1/g,'l').replace(/(.{4})/g,'$1 '));if(!t2.ok)bad.push('c: tolerant reading failed: '+t2.err);
  [A,B].forEach(z=>{if(z.errs.length)bad.push('c: JS errors '+z.errs.slice(0,2).join('; '));});return bad;}

function unitD(html){const bad=[];const A=prof(html,'Captain',3);
  const cases=[['knee','KC',D=>{D.pain={w:false,s:false,e:false,k:true,b:false,a:false,h:false};}],['no muscle-up','KA',D=>{D.skills.mu=false;}]];let seenRep=0;
  cases.forEach(([nm,id,f])=>{const B=prof(html,'Partner lower',9),k=B.k,D=k.D();f(D);const {s,code}=share(A,id);const t=read(B,code);if(!t.ok){bad.push('d: '+nm+' not read');return;}
    const sb=k.tgS(id,k.ctx(TD),t.ok),L=live(k,sb),R=k.tgReg();
    L.forEach(x=>{if(x.it.tgx){seenRep++;const o=allItems(A.k,s).find(a=>a.n===x.it.tgx);if(o){const ga=A.k.kitGroup(o.it,o.v),gb=k.kitGroup(x.it,x.v);if(ga!==gb)bad.push('d: '+nm+': '+x.it.tgx+' ('+ga+') → '+x.n+' ('+gb+')');}}
      if(x.it.ddv||x.it.ddx||x.it.ddg)bad.push('d: '+nm+': a slot gave way to a doubling: '+x.n);
      if(nm==='knee'&&k.painHit(x.n))bad.push('d: knee: pain item shown '+x.n);});
    for(let i=0;i<L.length;i++)for(let j=0;j<i;j++){const w=k.dupWhy(L[j].it,L[i].it,k.LOC());if(w)bad.push('d: '+nm+': doubling ('+w+') '+L[j].n+' / '+L[i].n);}
    L.forEach(x=>{(x.it.swa||[]).forEach(v=>{if(v===x.v)return;const c=Object.assign({},x.it,{fx:v});if(k.sesHas(sb,c,x.it))bad.push('d: '+nm+': Swap offers a doubling '+x.it.opts[v].n);});});
    if(nm==='no muscle-up'){if(!L.some(x=>x.it.tgx&&/muscle/i.test(x.it.tgx)))bad.push('d: no muscle-up: no muscle-up slot replaced');if(L.some(x=>/muscle-up/i.test(x.n)))bad.push('d: no muscle-up: a muscle-up form is shown');}
    if(L.some(x=>x.it.tgx)){B.d.querySelector('[data-a=tgread]');const tx=(B.d.querySelector('.tgprev')||{}).textContent||'';if(!/partner's plan/.test(tx))bad.push('d: '+nm+': hint not visible in the preview');}
    if(B.errs.length)bad.push('d: JS errors '+B.errs.slice(0,2).join('; '));});
  /* the first replacement candidate already stands in the partner's plan: the replacement must take another form */
  {const B=prof(html,'Partner lower',9),k=B.k,D=k.D();D.skills.mu=false;const {code}=share(A,'KA');const t=read(B,code);
   if(t.ok){const s1=k.tgS('KA',k.ctx(TD),t.ok),r1=live(k,s1).find(x=>x.it.tgx);if(!r1)bad.push('d: crafted: no replacement in KA');else{
     const q=k.tgKey(r1.it,r1.v),tg=JSON.parse(JSON.stringify(t.ok));tg.m[0][1].unshift(q);const s2=k.tgS('KA',k.ctx(TD),tg),L2=live(k,s2);
     if(L2.filter(x=>x.n===r1.n).length>1)bad.push('d: crafted: '+r1.n+' twice');L2.forEach(x=>{if(x.it.ddv||x.it.ddx||x.it.ddg)bad.push('d: crafted: a slot gave way to a doubling: '+x.n);});
     for(let i=0;i<L2.length;i++)for(let j=0;j<i;j++){const w=k.dupWhy(L2[j].it,L2[i].it,k.LOC());if(w)bad.push('d: crafted: doubling ('+w+') '+L2[j].n+' / '+L2[i].n);}}}}
  if(!seenRep)bad.push('d: no replacement happened at all');return bad;}

const nPR=pr=>JSON.stringify(Object.keys(pr||{}).sort().map(q=>[q,pr[q].r||0,pr[q].w||0,pr[q].km||0,pr[q].min||0]));
function unitE(html){const bad=[];const A=prof(html,'Captain',3),B=prof(html,'Partner lower',9),k=B.k,D=k.D();const {code}=share(A,'KA');const t=read(B,code);if(!t.ok)return ['e: not read'];B.d.querySelector('[data-a=tgstart]').click();
  const dy=k.day(),c=k.ctx(TD),s=k.S('KA',c);s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(!it.gone&&k.curVar(it,k.LOC())>=0)dy.done['KA-'+(b.bi!=null?b.bi:bi)+'-'+ii]=true;}));dy.fin={rpe:6};k.saveTrain();
  const lv=()=>[k.xpTotal(),k.lvUp(),k.lvLo(),nPR(D.pr)].join('|');const st0=lv(),n=D.logs.length;
  const z=boot(html);z.k.today(TD);z.k.restore(JSON.stringify(D),'start');const E=z.k.D();const l=E.logs.find(x=>x.tg);if(!l)bad.push('e: backup lost tg');if(E.logs.length!==n)bad.push('e: entries '+E.logs.length+' of '+n);
  if([z.k.xpTotal(),z.k.lvUp(),z.k.lvLo(),nPR(E.pr)].join('|')!==st0)bad.push('e: level/records/XP differ after the round trip');
  const old=JSON.parse(JSON.stringify(D));old.logs.forEach(x=>delete x.tg);delete old.opt.tg;Object.keys(old.days||{}).forEach(q=>{delete old.days[q].tg;delete old.days[q].tgs;});
  const y=boot(html);y.k.today(TD);y.k.restore(JSON.stringify(old),'start');const F=y.k.D();if(F.logs.some(x=>x.tg))bad.push('e: old backup got tg');
  if([y.k.xpTotal(),y.k.lvUp(),y.k.lvLo(),nPR(F.pr)].join('|')!==st0)bad.push('e: old backup without tg: level/records/XP differ');
  if(F.opt.tg!==false)bad.push('e: old backup: Extra not off');
  [A,B,z,y].forEach(q=>{if(q.errs.length)bad.push('e: JS errors '+q.errs.slice(0,2).join('; '));});return bad;}

function unitF(html){const bad=[];const z=prof(html,'Captain',3),k=z.k,D=k.D();D.opt.tg=false;D.tab='start';k.render();
  if(z.d.querySelector('[data-a=tgshare],[data-a=tgjoin]'))bad.push('f: together actions on Today with the Extra off');
  D.opt.tg=true;k.render();if(!z.d.querySelector('[data-a=tgjoin]'))bad.push('f: no join action with the Extra on');
  D.tab='mehr';k.render();if(!/Train together/.test(z.d.body.textContent))bad.push('f: Extra row missing under More');
  if(z.errs.length)bad.push('f: JS errors '+z.errs.slice(0,2).join('; '));return bad;}

const U={a:h=>unitA(h,false),b:unitB,c:unitC,d:unitD,e:unitE,f:unitF};
Object.keys(U).forEach(q=>U[q](HTML).slice(0,10).forEach(issue));
const MUT=[['a doses of A at B',null,h=>unitA(h,true)],
  ['b tg not set',h=>h.replace('if(tgL)lgo.tg=1;',''),unitB],['b lg not set',h=>h.replace('lg:(s.tg?lgN:legSets(s,c,id))>=6?1:0,','lg:0,'),unitB],
  ['c check symbol not checked',h=>h.replace('if(TGCK.indexOf(chk)<0||TGCK.indexOf(chk)!==r)return','if(false)return'),unitC],
  ['d replacement without sesHas',h=>h.replace('if(sesHas(s,t,it))return false;pick=t;','pick=t;'),unitD],
  ['e tg dropped on import',h=>h.replace('if(l.tg===1||l.tg===true)o.tg=1;',''),unitE],
  ['f Extra check off',h=>h.replace('function tgHTML(dy){if(!tgOn())return "";','function tgHTML(dy){'),unitF]];
MUT.forEach(([nm,f,u])=>{const h=f?f(HTML):HTML;if(f&&h===HTML){issue('mutation '+nm+': pattern not found');return;}let r;try{r=u(h);}catch(e){r=['crash '+e.message];}
  console.log('mutation '+nm+': '+(r.length?'red ('+r.length+') – '+r[0].slice(0,110):'GREEN'));if(!r.length)issue('mutation '+nm+' stays green');});
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
