// @name muscle-function
// A-064 (doctrine of the Captain): patterns follow the muscle function. Knee flexion trains the hamstrings and counts to the
// posterior chain (hinge, picker "Glutes & hamstrings"); adductors are their own pattern-free group ("hipad", picker
// "Adductors" between "Glutes & hamstrings" and "Calves"). Numbers and limits stay. Sources [Q68][Q69][Q70].
// a) every knee-flexion form (catalogue and Field kit pool, swept by name) counts for hinge, none for legs; a session with
//    them carries their sets on hinge.
// b) every adductor form (swept by name) lies in its own group and counts for no pattern; replacements (Field kit "Nothing",
//    Never, pain) stay inside the group (or the slot goes); the Field kit pool has a gear-free adductor form.
// c) picker order Pull · Push · Arms & shoulders · Squat & lunge · Glutes & hamstrings · Adductors · Calves · Core, the entries
//    add up to favCatalog, every exercise exactly once.
// d) no planned session (6 profiles × 24 weeks, the t49 simulation) holds two knee-flexion forms, and no pair of slots
//    breaks the duplicate rule (dupWhy: name, function, key – the rule of sesHas/planDedup, unchanged); sessions with a
//    knee-flexion form next to a Romanian deadlift are counted.
// Mutations: Leg curl back on legs → (a) red; adductors back on hipab → (b) red; group "Adductors" removed → (c) red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const TBL=require('./fixtures/pattern-table.js');const {longSim}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const TD='2026-11-20';
const KNEERX=/\bleg curls?\b|nordic|hamstring curls?|glute[- ]ham|knee flexion/i,ADDRX=/adduct|copenhagen/i,RDLRX=/romanian deadlift/i;
const ORDER=['Pull','Push','Arms & shoulders','Squat & lunge','Glutes & hamstrings','Adductors','Calves','Core'];
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {k:w.__kz,errs};}
function fresh(html,kick){const z=boot(html),D=z.k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,start:'2026-09-01',kickDays:kick||[],fav:[],never:[],loc:'g'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);z.k.today(TD);return z;}
const live=(k,s)=>{const D=k.D(),loc=k.LOC(),L=[];s.blocks.forEach(b=>{if(b.warm||b.cool||(D.short&&b.p>1))return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,loc);if(v<0)return;L.push({it,b,v,n:it.opts[v].n});});});return L;};
function one(k,it,v){const x=Object.assign({},it);x.fx=v;delete x.def;x.ts=3;return {blocks:[{name:'x',p:1,rest:60,items:[x]}]};}

function unitA(html){const bad=[];const z=fresh(html),k=z.k,c=k.ctx(TD),cat=k.favCatalog();
  const names=new Set(Object.keys(cat));Object.values(k.KPOOL).forEach(l=>l.forEach(o=>names.add(o.split('|')[0])));
  names.forEach(n=>{if(KNEERX.test(n)&&!TBL.KNEEF.includes(n))bad.push('a: knee-flexion form not in the doctrine list: '+n);});
  let n=0;Object.keys(cat).forEach(nm=>{if(!TBL.KNEEF.includes(nm))return;n++;const e=cat[nm],p=k.itPat(e.it,e.v);if(p!=='hinge')bad.push('a: '+nm+' counts for "'+p+'" (hinge)');
    const vs=k.volSets(one(k,e.it,e.v),c,'KC');if(vs.legs!==0||vs.hinge!==3)bad.push('a: '+nm+' sets '+JSON.stringify(vs));
    if(k.favGrp(e)!=='hip')bad.push('a: '+nm+' in picker group '+k.favGrp(e));});
  Object.keys(k.KPOOL).forEach(g=>k.KPOOL[g].forEach((o,i)=>{const nm=o.split('|')[0];if(!TBL.KNEEF.includes(nm))return;n++;const mx={k:'mx_g_ht',kx:g,opts:k.KPOOL[g].map(q=>({n:q.split('|')[0],req:'',w:false})),fx:i,ts:3,lo:8,hi:15,unit:'reps'};
    if(k.itPat(mx,i)!=='hinge')bad.push('a: pool form '+nm+' counts for "'+k.itPat(mx,i)+'"');if(g!=='hip')bad.push('a: pool form '+nm+' in pool '+g);}));
  if(n<4)bad.push('a: only '+n+' knee-flexion forms checked');
  ['c_rdl','h_ham'].forEach(q=>{if(!k.LEGK.test(q))bad.push('a: '+q+' no longer a leg key (legs + hinge)');});
  if(z.errs.length)bad.push('a: JS errors '+z.errs.join('; '));return bad;}

function unitB(html){const bad=[];const z=fresh(html),k=z.k,c=k.ctx(TD),cat=k.favCatalog(),G=k.favGroups();
  const names=new Set(Object.keys(cat));Object.values(k.KPOOL).forEach(l=>l.forEach(o=>names.add(o.split('|')[0])));
  names.forEach(n=>{if(ADDRX.test(n)&&!TBL.ADDF.includes(n))bad.push('b: adductor form not in the doctrine list: '+n);});
  let n=0;Object.keys(cat).forEach(nm=>{if(!TBL.ADDF.includes(nm))return;n++;const e=cat[nm];if(k.itPat(e.it,e.v)!=='')bad.push('b: '+nm+' counts for '+k.itPat(e.it,e.v));
    if(k.kitGroup(e.it,e.v)!=='hipad')bad.push('b: '+nm+' replacement group '+k.kitGroup(e.it,e.v));
    const g=G.find(x=>x[1].some(o=>o.n===nm));if(!g||g[0]!=='Adductors')bad.push('b: '+nm+' in picker group '+(g&&g[0]));
    const vs=k.volSets(one(k,e.it,e.v),c,'KC');if(Object.keys(vs).some(q=>vs[q]))bad.push('b: '+nm+' counts sets '+JSON.stringify(vs));});
  if(n<3)bad.push('b: only '+n+' adductor forms in the catalogue');
  const pool=k.KPOOL.hipad||[];if(!pool.length)bad.push('b: no Field kit pool for the adductors');
  pool.forEach(o=>{const nm=o.split('|')[0];if(!TBL.ADDF.includes(nm))bad.push('b: pool form outside the group '+nm);});
  if(!pool.some(o=>{const h=o.split('|');return k.kitReq({n:h[0],req:h[1]||'',w:!!h[2]})==='';}))bad.push('b: Field kit "Nothing" has no adductor form');
  /* replacements stay in the group: Field kit Nothing, Never on every adductor form, hip pain (the slot may go, never leave the group) */
  const slot=(s,orig)=>live(k,s).filter(x=>x.it.k&&String(x.it.k).replace(/^(mx_|fav_)+/,'')===orig||x.it.nx&&ADDRX.test(x.it.nx)||x.it.pxk==='kp_cop');
  const cases=[['kit',(D,dy)=>{dy.kit=true;D.kit=[];}],['never',D=>{D.never=TBL.ADDF.filter(x=>x!=='Side-lying adductor raises');}],['never2',D=>{D.never=['Copenhagen Plank','Adductor machine'];}],['pain',D=>{D.pain={h:true};}]];
  let seen0=0;cases.forEach(([nm,f])=>{const y=fresh(html,[1,4]),K=y.k,D=K.D(),dy=K.day();const s0=K.S('KC',K.ctx(TD));if(!live(K,s0).some(x=>x.it.k==='kp_cop')){bad.push('b: KC without the adductor slot');return;}seen0++;
    f(D,dy);const s=K.S('KC',K.ctx(TD));const sl=slot(s,'kp_cop');
    sl.forEach(x=>{if(!ADDRX.test(x.n))bad.push('b: '+nm+': the adductor slot became "'+x.n+'"');if(x.it.kx&&x.it.kx!=='hipad')bad.push('b: '+nm+': pool '+x.it.kx);});
    if(nm==='kit'&&!sl.length)bad.push('b: kit Nothing: the adductor slot went (a gear-free form exists)');
    if(nm==='kit'&&sl.some(x=>K.kitReq(x.it.opts[x.v])!==''))bad.push('b: kit Nothing shows a form that needs gear');
    if(y.errs.length)bad.push('b: JS errors '+y.errs.join('; '));});
  if(z.errs.length)bad.push('b: JS errors '+z.errs.join('; '));return bad;}

function unitC(html){const bad=[];const z=fresh(html),k=z.k,cat=k.favCatalog(),G=k.favGroups(),names=G.map(g=>g[0]);
  if(names.join(' · ')!==ORDER.join(' · '))bad.push('c: groups '+names.join(' · '));
  const all=[].concat(...G.map(g=>g[1].map(o=>o.n))),n=Object.keys(cat).length;if(all.length!==n)bad.push('c: '+all.length+' entries ≠ favCatalog '+n);
  const seen={};all.forEach(x=>{seen[x]=(seen[x]||0)+1;});Object.keys(seen).forEach(x=>{if(seen[x]>1)bad.push('c: twice '+x);});Object.keys(cat).forEach(x=>{if(!seen[x])bad.push('c: missing '+x);});
  if(z.errs.length)bad.push('c: JS errors '+z.errs.join('; '));return bad;}

/* d) the t49 simulation (progress course), 24 weeks per profile */
const PL=PROF.slice();PL.push({n:'Beginner',prof:null,startP:'s0',focus:'bal',emph:'glutes',skills:{},kick:[]});
function unitD(html,rep){const bad=[];let ses=0,both=0;
  PL.forEach(p=>{const z=boot(html),k=z.k,D=k.D();if(p.startP)D.startP=p.startP;
    Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
    Object.assign(D,{kickDays:p.kick||[],loc:p.loc||'g',onb:true,seenFocus:true,seenFav:true,favP:true,logs:[],ex:{},start:'2026-09-21',short:false,fav:(p.fav||[]).slice(),never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);
    longSim(k,168,'2026-09-21','prog',11+p.n.length,ev=>{if(ev.type!=='session')return;ses++;const L=live(k,ev.s),kn=L.filter(x=>TBL.KNEEF.includes(x.n));
      if(kn.length>1)bad.push('d: '+p.n+' '+ev.d+' '+ev.id+': two knee-flexion forms '+kn.map(x=>x.n).join(' + '));
      if(kn.length&&L.some(x=>RDLRX.test(x.n)))both++;
      for(let i=0;i<L.length;i++)for(let j=0;j<i;j++){const w=k.dupWhy(L[j].it,L[i].it,k.LOC());if(w)bad.push('d: '+p.n+' '+ev.d+' '+ev.id+': duplicate ('+w+') '+L[j].n+' / '+L[i].n);}});
    if(z.errs.length)bad.push('d: '+p.n+' JS errors '+z.errs.slice(0,3).join('; '));});
  if(rep)console.log('d: sessions '+ses+', with a knee-flexion form next to a Romanian deadlift: '+both);return bad;}

const runAll=(html,rep)=>({a:unitA(html),b:unitB(html),c:unitC(html),d:rep?unitD(html,rep):[]});
const R=runAll(HTML,true);Object.keys(R).forEach(q=>R[q].slice(0,12).forEach(issue));
/* mutations */
const MUT=[['a Leg curl back on legs',h=>h.replace('"Leg curl machine":"hinge"','"Leg curl machine":"legs"'),'a'],
  ['b adductors back on hipab',h=>h.split('"hipad"').join('"hipab"'),'b'],
  ['c group Adductors removed',h=>h.replace('["hipad","Adductors"],',''),'c']];
MUT.forEach(([nm,f,u])=>{const h=f(HTML);if(h===HTML){issue('mutation '+nm+': pattern not found');return;}const r=runAll(h,false)[u];console.log('mutation '+nm+': '+(r.length?'red ('+r.length+') – '+r[0].slice(0,110):'GREEN'));if(!r.length)issue('mutation '+nm+' stays green');});
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
