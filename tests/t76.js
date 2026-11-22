// @name gym-catalogue
// A-069: six gym forms from the Captain's 4-day split join the catalogue (catalogue only, no base plan or generator).
// a) each is in the picker exactly once, in its group (Push, Glutes & hamstrings, Squat & lunge, Core); picker sum = favCatalog.
// b) movement pattern as in the doctrine table (push, push, hinge, legs, legs, core).
// c) loggable as Own workout through the UI with progression (D.ex of the form, record).
// d) as a favourite in a session Swap offers only forms without a duplicate in that session.
// e) gym forms are not available without the gym (home / Field kit "Nothing"); the bodyweight form is.
// One mutation per point must turn its check red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
const NEW=[['Smith machine incline press','push','push'],['Machine chest fly','push','push'],['Barbell deadlift','hinge','hip'],
  ['Hack squat','legs','knee'],['Leg extension','legs','knee'],['Diagonal jackknife','core','core']];
const GRP={push:'Push',hip:'Glutes & hamstrings',knee:'Squat & lunge',core:'Core'};
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[],never:[],kickDays:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
function unitA(html){const bad=[];const {k}=boot(html),cat=k.favCatalog(),G=k.favGroups();let sum=0;
  G.forEach(g=>sum+=g[1].length);if(sum!==Object.keys(cat).length)bad.push('a: picker sum '+sum+' ≠ catalogue '+Object.keys(cat).length);
  NEW.forEach(([n,,gr])=>{const hits=G.filter(g=>g[1].some(o=>o.n===n));if(hits.length!==1)bad.push('a: '+n+' in '+hits.length+' groups');
    else if(hits[0][0]!==GRP[gr])bad.push('a: '+n+' in "'+hits[0][0]+'" (expected '+GRP[gr]+')');});
  rep.push('a: picker '+sum+' exercises, the 6 new forms once each in their group');return bad;}
function unitB(html){const bad=[];const {k}=boot(html),cat=k.favCatalog();
  NEW.forEach(([n,pt])=>{const c=cat[n];if(!c){bad.push('b: '+n+' not in the catalogue');return;}const p=k.itPat(c.it,c.v);if(p!==pt)bad.push('b: '+n+' pattern '+p+' (expected '+pt+')');});return bad;}
function unitC(html){const bad=[];const z=boot(html),k=z.k,d=z.d,D=z.D;D.tab='verlauf';k.render();const ob=btn(d,'owopen');if(!ob)return ['c: no Own workout button'];ob.click();
  const n='Hack squat';btn(d,'owpick').click();const r=btn(d,'owx',b=>b.dataset.n===n);if(!r)return ['c: Own workout picker has no '+n];r.click();
  const i=D._ow.ex.findIndex(x=>x.n===n);while(D._ow.ex[i].s.length<3)btn(d,'owset',b=>+b.dataset.i===i).click();
  d.querySelectorAll('[data-owi="'+i+'"][data-ows]').forEach(e=>{e.value='10';});const w=d.querySelector('[data-owi="'+i+'"][data-oww]');if(!w)bad.push('c: no kg field for '+n);else w.value='60';
  d.getElementById('ow_d').value=TD;btn(d,'owrpe',b=>+b.dataset.v===6).click();btn(d,'owsave').click();const l=D.logs[D.logs.length-1],cat=k.favCatalog(),c=cat[n],key=c.it.k+'#'+c.v;
  if(!l||l.id!=='OW')bad.push('c: no OW entry');else{if(!l.exs||!l.exs[key])bad.push('c: OW has no sets for '+key);
    if(!D.ex[key]||D.ex[key].w!==60||D.ex[key].r!==10)bad.push('c: progression store '+JSON.stringify(D.ex[key]));if(!D.pr[key])bad.push('c: no record for '+n);}
  if(!bad.length)rep.push('c: Hack squat 3 × 10 × 60 kg as Own workout → D.ex and record');return bad;}
function unitD(html){const bad=[];const {k,D}=boot(html);D.fav=['Hack squat','Barbell deadlift','Smith machine incline press'];D.emph='lower';D.focus='bal';
  let seen=0;['KA','KB','KC'].forEach(id=>{const s=k.S(id,k.ctx(TD));const names=[];s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,'g');if(v>=0)names.push(it.opts[v].n);});});
    s.blocks.forEach(b=>{if(!b.fav)return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,'g'),cur=v>=0?it.opts[v].n:'';if(!NEW.some(x=>x[0]===cur))return;seen++;
      (it.swa||[]).forEach(j=>{const o=it.opts[j].n;if(o!==cur&&names.includes(o))bad.push('d: '+id+' Swap of '+cur+' offers '+o+' which is already in the session');});});});});
  if(!seen)bad.push('d: no new form as a favourite in any session');else rep.push('d: '+seen+' favourite slots with new forms, Swap offers no duplicate');return bad;}
function unitE(html){const bad=[];const {k}=boot(html),cat=k.favCatalog();
  NEW.forEach(([n])=>{const c=cat[n];if(!c)return;const can=loc=>k.avail(c.it,loc).indexOf(c.v)>=0;
    if(n==='Diagonal jackknife'){if(!can('h'))bad.push('e: '+n+' not available at home');}else{if(can('h'))bad.push('e: '+n+' available at home');if(!can('g'))bad.push('e: '+n+' not available in the gym');}});return bad;}
function run(html){return [].concat(unitA(html),unitB(html),unitC(html),unitD(html),unitE(html));}
run(HTML0).forEach(issue);
const MUT=[['a',[['push:"y_sip y_fly a2_dtp','push:"y_fly a2_dtp'],['core:"y_jk x_aw','core:"y_jk y_sip x_aw']],'a'],
  ['b',[['hinge:"y_dl c_rdl','hinge:"c_rdl'],['legs:"y_hs y_le c_sq','legs:"y_hs y_le y_dl c_sq']],'b'],
  ['c',[['GLUTES().concat(GLUTEX(),UPPERX(),COREX(),GYMX())','GLUTES().concat(GLUTEX(),UPPERX(),COREX())']],'c'],
  ['d',[['itPat(it,i)===pt&&!sesHas(s,cp(it,i),it)','itPat(it,i)===pt']],'d'],
  ['e',[['["Hack squat|g|w"','["Hack squat||w"']],'e']];
MUT.forEach(([n,rs,u])=>{let m=HTML0;for(const [a,b] of rs){const m2=m.split(a).join(b);if(m2===m){issue('mutation '+n+': code not found ('+a+')');return;}m=m2;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}
  if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
