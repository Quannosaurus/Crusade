// @name rotation
// A-043 (L5): planned rotation of the secondary exercises. 15 rotating exercises (mostly lower body and core) have 3 equal
// sets A/B/C (A = the item itself, B/C own items with own keys, 30 new exercises); the set follows the block (blkNo % 3),
// so it changes per block, not per session [Q54][Q55]. Anchors and goal anchors stay, favourites, "Never suggest" and the
// pain filter keep precedence. Progress stays per variant; a set that returns after its pause steps back at most once
// (pause rule by rhythm, L1). Deload and test come in 3 versions in turn (the test keeps every test value). Every new
// exercise is in the pattern table (fixtures/pattern-table.js), in PATK and in the difficulty order ORD; an old backup loads.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const TBL=require('./fixtures/pattern-table.js');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const START='2026-01-05';const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const PROF={pull:8,dips:10,push:20,expl:3,mu:0,hsw:30,hsf:0,pike:8,tuck:15,lsit:5,hang:40};
function setup(k,wk,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:o.loc||'g',focus:'bal',emph:o.emph||'lower',kickDays:[],logs:[],start:START,short:false,goal:null,fav:o.fav||[],never:o.never||[],pain:{},theme:'templar'});
  delete D.easy;Object.assign(D.profile,PROF);D.skills={hs:false,mu:false,ls:false,fl:false,pl:false};D.ex={};D.days={};Object.keys(D.home).forEach(q=>D.home[q]=true);
  for(let w=0;w<wk-1;w++)D.logs.push({d:addD(START,w*7+1),id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8,push:8},ex:{}});
  const T=addD(START,(wk-1)*7+1);k.today(T);k.setGoal('none');return D;}
const names=S=>S.blocks.flatMap(b=>b.items.filter(it=>!it.gone).map(it=>{const v=0;return it.k||'';}));
const keyset=(k,S)=>new Set(S.blocks.flatMap(b=>b.items.concat(b.more||[]).filter(it=>it.k&&!it.gone).map(it=>it.k)));
const sess=(k,wk,id,o)=>{setup(k,wk,o);const c=k.ctx(k.today());return {S:k.S(id,c),c};};
// 1 catalogue: 15 rotating exercises × 2 new sets = 30 new exercises, every one in the doctrine table, PATK and ORD
{const {k}=boot();const R=k.ROT,fam=Object.keys(R);let n=0,lowerCore=0;const all=new Set();
  fam.forEach(f=>{if(R[f].length!==2)issue('family '+f+' has '+R[f].length+' alternates');R[f].forEach(x=>{n++;const key=x[0];all.add(key);
    const row=TBL.ROWS.find(r=>r[0]===key);if(!row)issue('no pattern-table row for '+key);
    const want=row?row[2]:undefined,base=TBL.pattern(f,'*')!==undefined?TBL.pattern(f,'*'):TBL.row(f,'')&&TBL.row(f,'')[2];
    const pk=k.PATK[key]||'';if(want!==undefined&&pk!==want)issue('PATK '+key+': '+pk+' (table '+want+')');
    if(base!==undefined&&want!==undefined&&want!==base)issue(key+' pattern '+want+' differs from its family '+f+' ('+base+')');
    if(want==='legs'||want==='hinge'||want==='core'||(row&&/calf|hipab/.test(row[3])))lowerCore++;
    if(!k.ORD[key]||!k.ORD[key].length)issue('no ORD entry for '+key);
    else k.ORD[key].forEach(i=>{const o=x[5][i];if(!o)issue('ORD '+key+' index '+i+' out of range');else if(/\|.*w$/.test(o))issue('ORD '+key+' lists a weighted form: '+o);});});});
  if(n<30)issue('only '+n+' new exercises');if(lowerCore<24)issue('only '+lowerCore+' of '+n+' for lower body and core');
  const cat=k.favCatalog();const nn=Object.values(cat).filter(x=>all.has(x.it.k)).length;if(nn<n*2)issue('rotation exercises missing in the catalogue: '+nn);
  const dup={};Object.keys(cat).forEach(nm=>{dup[nm]=(dup[nm]||0)+1;});
  rep.push(n+' new exercises in '+fam.length+' families ('+lowerCore+' lower body/core), '+nn+' new variant names in the catalogue');}
// 2 the set follows the block: A in block 1, B in block 2, C in block 3, A again in block 4; anchors and fixed blocks stay
{const {k}=boot();const W=[2,8,14,20,26,32];const seq={};const anc={};
  ['KC','KA','KB'].forEach(id=>{const sets=W.map(wk=>{const x=sess(k,wk,id);const ks=keyset(k,x.S);
      const S=x.S,bl=S.blocks;if(S.min<60||S.min>90)issue(id+' week '+wk+': '+S.min+' min');if(!bl[0].warm||!bl[bl.length-1].cool)issue(id+' week '+wk+': warm-up/cool-down');
      anc[id+wk]=bl.flatMap(b=>b.items.filter(it=>it.anc).map(it=>it.k)).join(',');
      if(x.S.rset!==((x.c.blk-1)%3))issue(id+' week '+wk+' set '+x.S.rset+' not block '+x.c.blk+' mod 3');
      return [...ks].sort().join(' ');});
    seq[id]=sets;
    if(sets[0]===sets[1]||sets[1]===sets[2]||sets[0]===sets[2])issue(id+': the three blocks do not differ');
    if(sets[0]!==sets[3]&&id==='KC'){const a=new Set(sets[0].split(' ')),d=new Set(sets[3].split(' '));const rot=[...a].filter(x=>!d.has(x));if(rot.some(x=>k.ROT[x]))issue(id+': set A does not return in block 4: '+rot.join(','));}
    W.forEach((wk,i)=>{if(anc[id+wk]!==anc[id+W[0]]&&i%2===0)issue(id+': anchor changed in week '+wk+': '+anc[id+W[0]]+' → '+anc[id+wk]);});});
  const x1=sess(k,8,'KC'),k1=keyset(k,x1.S);if(!['r_lu1','r_ca1','r_gm1'].some(q=>k1.has(q)))issue('KC block 2 without set B: '+[...k1].join(' '));
  const x2=sess(k,14,'KC'),k2=keyset(k,x2.S);if(!['r_lu2','r_ca2','r_gm2'].some(q=>k2.has(q)))issue('KC block 3 without set C');
  rep.push('KC block 2: '+[...k1].filter(q=>/^r_/.test(q)).join(' ')+' · block 3: '+[...k2].filter(q=>/^r_/.test(q)).join(' '));}
// 3 precedence: favourite keeps its exercise, an excluded alternate keeps set A, the pain filter acts after the rotation,
//   goal anchor stays
{const {k}=boot();let x=sess(k,8,'KC',{fav:['Dumbbell walking lunges']});if(keyset(k,x.S).has('r_lu1'))issue('favourite rotated away');if(!keyset(k,x.S).has('c_lu'))issue('favourite lunge missing');
  x=sess(k,8,'KC',{never:['Dumbbell reverse lunges','Reverse lunges, slow lowering','Deficit reverse lunges on a step']});if(keyset(k,x.S).has('r_lu1'))issue('excluded set B still shown');
  setup(k,8);const D=k.D();D.pain={w:false,s:false,e:false,k:true,b:false,a:false,h:false};const S=k.S('KC',k.ctx(k.today()));S.blocks.forEach(b=>{if(b.rehab)return;b.items.forEach(it=>{if(it.gone||!it.k)return;const v=k.curVar(it,k.LOC());if(v>=0&&!k.painOK(it))issue('pain day shows '+it.opts[v].n);});});
  setup(k,20,{emph:'glutes'});k.setGoal('ht');const G=k.S('KC',k.ctx(k.today()));const gx=G.blocks.flatMap(b=>b.items.filter(it=>it.gx).map(it=>it.k));if(!gx.length||gx.some(q=>/^r_/.test(q)))issue('goal anchor rotated or missing: '+gx);
  rep.push('favourite and Never keep set A, pain filter after the rotation, goal anchor '+gx.join(','));}
// 4 progress per variant; a set that returns after 12 weeks steps back once, not twice
{const {k}=boot();const D=setup(k,20);const it=k.P('r_lu1',8,12,'reps','',['Dumbbell reverse lunges||w','Reverse lunges, slow lowering','Deficit reverse lunges on a step']);it.rot='c_lu';
  const old=addD(k.today(),-84);D.ex['r_lu1#0']={r:12,w:20,d:old,stall:0};D.logs.push({d:addD(old,-14),id:'KC',t:'KC',rpe:6,ex:{'r_lu1#0':[11,20]}},{d:addD(old,-7),id:'KC',t:'KC',rpe:6,ex:{'r_lu1#0':[11,20]}},{d:old,id:'KC',t:'KC',rpe:6,ex:{'r_lu1#0':[12,20]}});
  D.logs.sort((a,b)=>a.d<b.d?-1:1);
  const g=k.target(it,0);const it2=Object.assign({},it);delete it2.rot;const g2=k.target(it2,0);
  if(!/one step back/.test(g.note))issue('returning set: '+g.note);if(/two steps/.test(g.note))issue('returning set two steps back');
  rep.push('return after 12 weeks: "'+g.note+'" (without rotation flag: "'+g2.note+'")');}
// 5 deload and test in 3 versions in turn; the test keeps every test value
{const {k}=boot();const dl=[],te=[];let te0='';[6,12,18,24].forEach(wk=>{setup(k,wk);const c=k.ctx(k.today());const a=k.S('DL',c),b=k.S('TE',c);
    dl.push(a.blocks.flatMap(x=>x.items.map(i=>i.opts[0].n)).join('|'));te.push(b.blocks.flatMap(x=>x.items.map(i=>i.test||i.opts[0].n)).join('|'));
    const tests=b.blocks.flatMap(x=>x.items.filter(i=>i.test).map(i=>i.test)).sort().join(',');if(!te0)te0=tests;else if(tests!==te0)issue('test week '+wk+' values: '+tests+' (first '+te0+')');
    if(!a.blocks[0].warm||!b.blocks[0].warm)issue('deload/test without warm-up');});
  if(new Set(dl.slice(0,3)).size!==3)issue('deload not 3 versions');if(dl[3]!==dl[0])issue('deload version 1 does not return in block 4');
  if(new Set(te.slice(0,3)).size!==3)issue('test not 3 versions');if(te[3]!==te[0])issue('test version 1 does not return');
  rep.push('deload versions '+new Set(dl).size+', test versions '+new Set(te).size);}
// 6 home sessions and the Field kit work with the new exercises
{const {k}=boot();[8,14].forEach(wk=>{const x=sess(k,wk,'HO',{loc:'h'});x.S.blocks.forEach(b=>b.items.forEach(it=>{if(it.gone||!it.k||it.f)return;if(k.curVar(it,k.LOC())<0)issue('HO week '+wk+': no home variant for '+it.k);}));});
  setup(k,8);k.D().kit=[];k.day().kit=true;const S=k.S('KC',k.ctx(k.today()));S.blocks.forEach(b=>b.items.forEach(it=>{if(it.gone||!it.k||it.f||b.warm||b.cool)return;const v=k.curVar(it,k.LOC());if(v<0)issue('Field kit (nothing): '+it.k+' without a fitting variant');}));}
// 7 old backup: no new field
{const {k}=boot();const D=setup(k,9);const c=k.cleanImport(JSON.parse(JSON.stringify(D)));if(!c)issue('backup does not load');else['rot','rset','rotSet'].forEach(f=>{if(f in c)issue('new field '+f);});}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
