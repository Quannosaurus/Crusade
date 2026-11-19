// @name visible-names
// A-062: visible names say what a session holds – no letter labels and no template names.
// a) No rendered view (every tab, every theme, the week preview and each tapped day, How it works, the picker, the training
//    page of every strength session incl. both home variants, with and without the muscle-up skill) shows "Strength A",
//    "Strength B", "Strength C", "Home strength A", "Home strength B" or "From your plan".
// b) A fixture backup with old titles imports and the Chronicle shows only the new names; a second import and a reload
//    change nothing; level, records, XP and stats are the same before (old titles in memory) and after the migration;
//    other fields, free titles (OA) and notes stay untouched.
// c) Picker: the groups are exactly Pull · Push · Arms & shoulders · Squat & lunge · Glutes & hamstrings · Adductors (A-064) · Calves · Core in
//    this order (empty ones left out), the entries add up to the size of favCatalog, every exercise appears exactly once,
//    one sample per group lies in the right group, the rendered picker shows the same groups and counts.
// Mutations: an old name back in NAMES → (a) red; the migration switched off → (b) red; an exercise dropped from the grouping
// or a rest group appended → (c) red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const OLD=/Strength [ABC](?![a-z])|Home strength [AB](?![a-z])|From your plan/;
const THEMES=['templar','sanguine','sisters','slaanesh','nurgle','plain','love'];
const TABS=['start','train','run','stand','verlauf','mehr','favs','morgen','kick','other'];
const TD='2026-11-18';
function boot(html,pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document,errs};}
const txt=d=>{const r=d.body.cloneNode(true);r.querySelectorAll('script,style').forEach(e=>e.remove());return r.textContent;};
/* the old backup: 10 weeks of KA/KB/KC/HO with the old titles of every era, plus a free OA title and notes */
function oldState(k){const D=JSON.parse(JSON.stringify(k.D()));
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,theme:'templar',start:'2026-09-07',focus:'bal',emph:'glutes',kickDays:[2],loc:'g'});
  Object.assign(D.profile,{pull:6,dips:8,push:20,hang:40});D.skills={hs:true,mu:true,ls:false,fl:false,pl:false};
  const T={KA:['Strength A: Muscle-up','Strength A: Pull & push','Strength A'],KB:['Strength B: Volume','Strength B'],KC:['Strength C: Full body & legs','Strength C'],HO:['Home strength A','Home strength B','Home strength']};
  const L=[];for(let w=0;w<10;w++){const d=addD('2026-09-07',w*7);
    L.push({d,id:'KA',t:T.KA[w%3],rpe:7,min:70,ex:{'p_pull#0':[6+(w>>1),0]},vs:{pull:8,push:6,legs:0,hinge:0,core:3},note:w===2?'Strength A felt good':''});
    L.push({d:addD(d,1),id:'KB',t:T.KB[w%2],rpe:6,min:72,ex:{'c_sq#0':[8,40+w*2]}});
    L.push({d:addD(d,3),id:'KC',t:T.KC[w%2],rpe:7,min:75,lg:1,ex:{'g_ht#0':[10,60+w*2.5],'c_sq#0':[8,45+w*2]},vs:{pull:0,push:0,legs:6,hinge:8,core:3}});
    L.push({d:addD(d,5),id:'HO',t:T.HO[w%3],rpe:6,min:50});
    if(w%3===0)L.push({d:addD(d,6),id:'OA',t:'Strength A',rpe:5,min:90});}
  D.logs=L;D.ex={'g_ht#0':{r:10,w:82.5,d:L[L.length-3].d,hold:false,n:'Barbell hip thrust',stall:0}};
  D.pr={'g_ht#0':{sc:82510,r:10,w:82.5,d:L[L.length-3].d,n:'Barbell hip thrust'}};return D;}

// ---------- a) no old name in any rendered view ----------
function unitA(html){const hits=new Set(),errs=[];
  const scan=(where,t)=>{const m=t.match(OLD);if(m)hits.add(where+': "'+t.slice(Math.max(0,m.index-30),m.index+40).replace(/\s+/g,' ')+'"');};
  [true,false].forEach(mu=>[0,1].forEach(hb=>{const z=boot(html),D=z.k.D();const B=oldState(z.k);B.skills.mu=mu;
    /* hb: one more HO log → the other home variant is next */if(hb)B.logs.push({d:addD(TD,-1),id:'HO',t:'Home strength',rpe:6,min:50});
    z.k.today(TD);z.k.restore(JSON.stringify(B),'start');
    THEMES.forEach(th=>{D.theme=th;TABS.forEach(tab=>{D.tab=tab;if(tab==='train')z.k.day().pick=null;z.k.render();scan(th+'/'+tab+'/mu'+mu+'/h'+hb,txt(z.d));});});
    D.theme='templar';
    /* training page of every strength session (both home variants via hb) */
    ['KA','KB','KC','HO','CH','HK','SK','TE','DL'].forEach(id=>{D.tab='train';z.k.day().pick=id;z.k.render();scan('train '+id+'/mu'+mu+'/h'+hb,txt(z.d));});
    z.k.day().pick=null;
    /* week preview: each tapped day */
    D.tab='start';z.k.render();for(let i=0;i<7;i++){const b=z.d.querySelectorAll('[data-a=wkday]')[i];if(!b)break;b.click();scan('week day '+i+'/mu'+mu+'/h'+hb,txt(z.d));b.click();}
    /* How it works, every details open; the add-exercise search */
    D.tab='mehr';z.k.render();z.d.querySelectorAll('details').forEach(x=>x.open=true);scan('more (open)',txt(z.d));
    Object.values(z.k.NAMES).forEach(n=>scan('NAMES',String(n)));Object.values(z.k.WKS).forEach(n=>scan('WKS',String(n)));
    (z.k.weekPlan()||[]).forEach(e=>scan('weekPlan',JSON.stringify(e&&e.t||'')+JSON.stringify(e&&e.n||'')));
    z.k.favGroups().forEach(g=>scan('picker group',g[0]));
    if(z.errs.length)errs.push(...z.errs);}));
  return {bad:[...hits].slice(0,10),errs};}

// ---------- b) migration of old titles ----------
function vals(k){const D=k.D();return JSON.stringify({up:k.lvUp(),lo:k.lvLo(),xp:k.xpTotal(),pr:D.pr,ex:D.ex,n:D.logs.length});}
const strip=L=>L.map(l=>{const o=Object.assign({},l);delete o.t;return o;});
function unitB(html){const bad=[];
  const z0=boot(html);z0.k.today(TD);const B=oldState(z0.k),raw=JSON.stringify(B);
  /* before: the old state in memory, no import, no migration */
  const zb=boot(html);zb.k.today(TD);Object.assign(zb.k.D(),JSON.parse(raw));const before=vals(zb.k);
  zb.k.D().tab='stand';zb.k.render();const stB=zb.d.getElementById('app').textContent.replace(/Pull & push|Muscle-up day|Volume day|Legs & full body/g,'X');
  /* after: import through the real restore */
  const z=boot(html);z.k.today(TD);z.k.restore(raw,'start');const D=z.k.D();
  const unit=D.logs.filter(l=>/^(KA|KB|KC|HO)$/.test(l.id));
  unit.forEach(l=>{if(OLD.test(l.t)||/^Strength [ABC]$|^Home strength$/.test(l.t))bad.push('b: title stays old: '+l.id+' "'+l.t+'"');});
  const exp={KA:/^(Muscle-up day|Pull & push)$/,KB:/^Volume day$/,KC:/^Legs & full body$/,HO:/^Home · (upper body|legs) first$/};
  unit.forEach(l=>{if(!exp[l.id].test(l.t))bad.push('b: '+l.id+' got "'+l.t+'"');});
  const ka=D.logs.filter(l=>l.id==='KA').map(l=>l.t),ho=D.logs.filter(l=>l.id==='HO').map(l=>l.t);
  if(ka[0]!=='Muscle-up day'||ka[1]!=='Pull & push'||ka[2]!=='Pull & push')bad.push('b: KA mapping '+ka.slice(0,3).join(' | '));
  if(ho[0]!=='Home · upper body first'||ho[1]!=='Home · legs first'||ho[2]!=='Home · upper body first'||ho[5]!=='Home · legs first')bad.push('b: HO mapping '+ho.slice(0,6).join(' | '));
  if(JSON.stringify(strip(D.logs))!==JSON.stringify(strip(JSON.parse(z.k.bkJSON()).logs)))bad.push('b: export differs');
  /* other fields, free titles and notes untouched */
  {const B2=JSON.parse(raw);B2.logs.forEach(l=>{l.t='zz';});const zc=boot(html);zc.k.today(TD);zc.k.restore(JSON.stringify(B2),'start');
   if(JSON.stringify(strip(D.logs))!==JSON.stringify(strip(zc.k.D().logs)))bad.push('b: other fields changed');if(zc.errs.length)bad.push('b: JS errors '+zc.errs.join('; '));}
  D.logs.filter(l=>l.id==='OA').forEach(l=>{if(l.t!=='Strength A')bad.push('b: free OA title changed to "'+l.t+'"');});
  if(!D.logs.find(l=>l.note==='Strength A felt good'))bad.push('b: note changed');
  /* Chronicle: only new names as unit titles */
  D.tab='verlauf';z.k.render();z.d.querySelectorAll('[data-a=chmore]').forEach(b=>b.click());
  const tt=[...z.d.querySelectorAll('.log b')].map(b=>b.textContent);if(!tt.length)bad.push('b: Chronicle shows no entries');
  tt.forEach(t=>{if(OLD.test(t)&&t!=='Strength A')bad.push('b: Chronicle shows "'+t+'"');});
  if(!tt.includes('Legs & full body')||!tt.includes('Home · legs first'))bad.push('b: Chronicle lacks new names');
  /* level, records, XP and stats unchanged */
  const after=vals(z.k);if(after!==before)bad.push('b: values before '+before.slice(0,120)+' ≠ after '+after.slice(0,120));
  D.tab='stand';z.k.render();const stA=z.d.getElementById('app').textContent.replace(/Pull & push|Muscle-up day|Volume day|Legs & full body/g,'X');
  if(stA.replace(/\d+/g,'')!==stB.replace(/\d+/g,'')||(stA.match(/\d+/g)||[]).join()!==(stB.match(/\d+/g)||[]).join())bad.push('b: Status/stats differ after the migration');
  /* idempotent: second import and a reload change nothing */
  const once=JSON.stringify(D.logs);
  if(z.k.migTitles(D.logs)!==0||JSON.stringify(D.logs)!==once)bad.push('b: second migration pass changes titles');
  const z2=boot(html);z2.k.today(TD);z2.k.restore(z.k.bkJSON(),'start');if(JSON.stringify(z2.k.D().logs)!==once)bad.push('b: second import changes logs');
  const z3=boot(html,z.k.D());if(JSON.stringify(z3.k.D().logs)!==once)bad.push('b: reload changes logs');
  /* load: an old state in localStorage is migrated on load */
  const z4=boot(html,JSON.parse(raw));if(z4.k.D().logs.some(l=>/^(KA|KB|KC|HO)$/.test(l.id)&&OLD.test(l.t)))bad.push('b: load keeps old titles');
  else if(JSON.stringify(z4.k.D().logs.map(l=>l.t))!==JSON.stringify(D.logs.map(l=>l.t)))bad.push('b: load and import migrate differently');
  [z0,zb,z,z2,z3,z4].forEach(x=>{if(x.errs.length)bad.push('b: JS errors '+x.errs.join('; '));});
  return bad;}

// ---------- c) picker by movement and muscle ----------
const ORDER=['Pull','Push','Arms & shoulders','Squat & lunge','Glutes & hamstrings','Adductors','Calves','Core'];
const SAMPLE={'Pull-ups':'Pull','Dips':'Push','Dumbbell lateral raises':'Arms & shoulders','Dumbbell curls':'Arms & shoulders','Barbell back squat':'Squat & lunge',
  'Barbell hip thrust':'Glutes & hamstrings','Banded hip abduction':'Glutes & hamstrings','Standing calf raises':'Calves','Side plank':'Core',
  /* A-064: knee flexion under Glutes & hamstrings, adductors in their own group */'Leg curl machine':'Glutes & hamstrings','Nordic Curls':'Glutes & hamstrings','Copenhagen Plank':'Adductors','Adductor machine':'Adductors'};
function unitC(html){const bad=[];const z=boot(html);z.k.today(TD);const D=z.k.D();Object.assign(D,{onb:true,seenFav:true,fav:[],never:[]});
  const cat=z.k.favCatalog(),n=Object.keys(cat).length,G=z.k.favGroups(),names=G.map(g=>g[0]);
  let i=-1;names.forEach(g=>{const j=ORDER.indexOf(g);if(j<0)bad.push('c: unknown group "'+g+'"');else if(j<=i)bad.push('c: group order '+names.join(' · '));i=Math.max(i,j);});
  G.forEach(g=>{if(!g[1].length)bad.push('c: empty group shown '+g[0]);});
  const all=[].concat(...G.map(g=>g[1].map(o=>o.n)));if(all.length!==n)bad.push('c: '+all.length+' entries ≠ favCatalog '+n);
  const seen={};all.forEach(x=>{seen[x]=(seen[x]||0)+1;});Object.keys(seen).forEach(x=>{if(seen[x]>1)bad.push('c: twice '+x);});
  Object.keys(cat).forEach(x=>{if(!seen[x])bad.push('c: missing '+x);});
  G.forEach(g=>{const s=g[1].map(o=>o.n.toLowerCase());if(s.join('|')!==s.slice().sort((a,b)=>a.localeCompare(b,'en')).join('|'))bad.push('c: not A–Z in '+g[0]);});
  Object.keys(SAMPLE).forEach(x=>{const g=G.find(g=>g[1].some(o=>o.n===x));if(!g)bad.push('c: sample missing '+x);else if(g[0]!==SAMPLE[x])bad.push('c: '+x+' in '+g[0]+' (expected '+SAMPLE[x]+')');});
  ORDER.forEach(o=>{if(!names.includes(o))bad.push('c: group missing '+o);});
  /* rendered picker: same groups, counts as before, search and stars keep working */
  D.tab='favs';z.k.render();const sm=[...z.d.querySelectorAll('details.fvg summary')].map(s=>s.textContent.trim());
  const rn=sm.map(s=>s.replace(/\s*\d+$/,'')),rc=sm.map(s=>+(s.match(/(\d+)$/)||[0,0])[1]);
  if(rn.join('|')!==names.join('|'))bad.push('c: rendered groups '+rn.join(' · '));
  if(rc.reduce((a,b)=>a+b,0)!==n)bad.push('c: rendered counts '+rc.reduce((a,b)=>a+b,0)+' ≠ '+n);
  const b=z.d.querySelector('[data-a=fav][data-n="Barbell hip thrust"]');if(!b)bad.push('c: row Barbell hip thrust missing');else{b.click();if(!(D.fav||[]).includes('Barbell hip thrust'))bad.push('c: star does not work');}
  z.k.render();const sm2=[...z.d.querySelectorAll('details.fvg summary')].map(s=>+(s.textContent.match(/(\d+)$/)||[0,0])[1]).reduce((a,b)=>a+b,0);if(sm2!==n-1)bad.push('c: starred exercise still listed in a group ('+sm2+')');
  if(z.errs.length)bad.push('c: JS errors '+z.errs.join('; '));
  return bad;}

// ---------- main run ----------
const A=unitA(HTML);A.bad.forEach(issue);if(A.errs.length)issue('a: JS errors '+[...new Set(A.errs)].slice(0,3).join('; '));
unitB(HTML).forEach(issue);unitC(HTML).forEach(issue);
// ---------- mutations ----------
const mut=(name,a,b,unit)=>{if(!HTML.includes(a)){issue('mutation '+name+': anchor not found');return;}const h=HTML.split(a).join(b);const r=unit(h);if(!r.length)issue('mutation '+name+' stays green');else console.log('mutation '+name+': red ('+r.length+') – '+String(r[0]).slice(0,90));};
mut('a old name','KB:"Volume day"','KB:"Strength B: Volume"',h=>unitA(h).bad);
mut('b no migration','function migTitles(L){','function migTitles(L){return 0;',unitB);
mut('c drop one','by[g]=by[g]||[]).push(cat[n].it.opts[cat[n].v]);','by[g]=by[g]||[]).push(cat[n].it.opts[cat[n].v]);if(n==="Side plank")by[g].pop();',unitC);
mut('c rest group','return [g[1],by[g[0]].sort(','return [g[1],by[g[0]].concat(g[0]==="core"?[{n:"Rest",req:""}]:[]).sort(',unitC);
mut('c rest group 2','.localeCompare(b.n.toLowerCase(),"en");})];});}','.localeCompare(b.n.toLowerCase(),"en");})];}).concat([["From your plan",[{n:"Rest x",req:""}]]]);}',unitC);
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
