// @name leg-frequency-anchor
// A-009: legs at least twice a week (V1) and a fixed anchor exercise for the lower/glute emphasis (V2).
// Simulates 6 weeks for the three audit profiles with the real recommender and saveTrain(), then checks
// leg frequency, anchor stability and progression, the 14-day pause rule, old backups and favourites.
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const START='2026-09-21';// a Monday
const PROF=[
 {n:'Captain',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8},focus:'bal',emph:'bal',skills:{hs:1,mu:1},kick:[2,5]},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',emph:'lower',skills:{},kick:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},focus:'str',emph:'glutes',skills:{},kick:[]}
];
// Log a training session the way a user does it: every exercise done, target reps entered, weight 20 kg on first sight.
function doTrain(w,k,id){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const s=k.S(id,k.ctx(k.today()));const anc=[];
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;b.items.forEach((it,ii)=>{const v=k.curVar(it,D.loc);if(v<0)return;const key=id+'-'+bi+'-'+ii;dy.done[key]=true;
    if(it.f||it.test)return;if(it.iso){return;}
    const g=k.target(it,v),n=b.rounds?k.rounds(b,k.ctx(k.today()),id):(parseInt(it.sets,10)||1);
    dy.inp[key]={s:Array(n).fill(String(g.r)),w:it.opts[v].w?String(g.w||20):''};
    if(it.anc)anc.push({k:it.k,v,n:it.opts[v].n});});});
  k.saveTrain();return anc;}
const report=[];
PROF.forEach(p=>{const {w,k,errs}=boot();const D=k.D();
  Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  D.kickDays=p.kick;D.loc='g';D.onb=true;D.seenFocus=true;D.seenFav=true;D.logs=[];D.start=START;D.short=false;
  const weeks=[],ancSeen={},ancProg={};
  for(let i=0;i<42;i++){const s=addD(START,i);k.today(s);const wk=Math.floor(i/7);const c=k.ctx(s);
    if(!weeks[wk])weeks[wk]={legs:0,deload:false,ids:[]};if(c.cyc===6)weeks[wk].deload=true;
    const r=k.recAll(s,false);
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});
    else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:r.id==='RE'?5:6,min:r.id==='RE'?32:40});
    else{const anc=doTrain(w,k,r.id);anc.forEach(a=>{(ancSeen[r.id]=ancSeen[r.id]||[]).push(a.k+'#'+a.v);const e=D.ex[a.k+'#'+a.v];(ancProg[a.k+'#'+a.v]=ancProg[a.k+'#'+a.v]||[]).push(e?e.w*1000+e.r:0);});}
    const last=D.logs[D.logs.length-1];if(last&&last.d===s&&k.legLog(last))weeks[wk].legs++;
    weeks[wk].ids.push(last&&last.d===s?last.id+(k.legLog(last)?'*':''):'--');}
  weeks.forEach((x,i)=>{if(!x.deload&&x.legs<2)issue(p.n+': week '+(i+1)+' only '+x.legs+' leg session(s): '+x.ids.join(' '));});
  if(p.emph!=='bal'){
    ['KA','KB','KC'].forEach(id=>{const a=ancSeen[id]||[];if(a.length<2)issue(p.n+': '+id+' anchor seen only '+a.length+'×');if(new Set(a).size>1)issue(p.n+': '+id+' anchor changes: '+a.join(','));});
    Object.keys(ancProg).forEach(key=>{const v=ancProg[key];for(let j=1;j<v.length;j++)if(v[j]<v[j-1])issue(p.n+': anchor '+key+' went back '+v[j-1]+'→'+v[j]);
      if(v.length>=3&&!(v[v.length-1]>v[0]))issue(p.n+': anchor '+key+' did not progress '+v.join(','));});
    // Since P-3 the Skill Trial is back for these emphases, but it takes a Strength A/B slot: Strength C stays every training week.
    const kcN=D.logs.filter(l=>l.id==='KC').length;weeks.forEach((x,i)=>{if(!x.deload&&!x.ids.some(t=>t.startsWith('KC')))issue(p.n+': week '+(i+1)+' without KC (CH replaced KC?)');});if(kcN<4)issue(p.n+': KC only '+kcN+'× in 6 weeks');
  }else{
    // Balanced: no anchor marks, no emphasis block
    const s=k.S('KA',k.ctx(k.today()));if(s.blocks.some(b=>b.items.some(it=>it.anc)))issue(p.n+': anchor in balanced plan');
  }
  if(errs.length)issue(p.n+': JS errors '+errs.join('; '));
  report.push(p.n+': '+weeks.map((x,i)=>'W'+(i+1)+(x.deload?'(DL)':'')+' legs '+x.legs+' ['+x.ids.join(' ')+']').join('\n   ')+'\n   anchors '+JSON.stringify(Object.fromEntries(Object.entries(ancSeen).map(([a,b])=>[a,[...new Set(b)].join(',')]))));
});
// Pause rule: < 14 days no step back, from 14 days one step back (any exercise)
{const {w,k}=boot();const D=k.D();D.emph='lower';D.onb=true;k.today('2026-11-16');
 const it=k.S('KA',k.ctx(k.today())).blocks.flatMap(b=>b.items).find(x=>x.anc);
 if(!it)issue('pause: no anchor in KA');else{const key=it.k+'#0';
  D.ex[key]={r:10,w:40,d:addD(k.today(),-13),n:'x'};let g=k.target(it,0);if(/back/.test(g.note)||g.r!==11||g.w!==40)issue('pause 13 days: '+JSON.stringify(g));
  D.ex[key]={r:10,w:40,d:addD(k.today(),-14),n:'x'};g=k.target(it,0);if(!/one step back/.test(g.note)||g.w>=40)issue('pause 14 days: '+JSON.stringify(g));
  D.ex[key]={r:10,w:40,d:addD(k.today(),-29),n:'x'};g=k.target(it,0);if(!/two steps back/.test(g.note))issue('pause 29 days: '+JSON.stringify(g));}
}
// Old backup (pre A-009: no "lg" field, old emphasis, favourites) loads, keeps favourites, counts KC/HO as leg sessions
{const old={v:3,start:'2026-09-07',onb:true,emph:'glutes',fav:['Hip thrust machine','Cable kickbacks'],profile:{pull:4,dips:6,push:15},
   logs:[{d:'2026-11-09',id:'KC',t:'x',rpe:6},{d:'2026-11-11',id:'KA',t:'x',rpe:6},{d:'2026-11-13',id:'HO',t:'x',rpe:8}],days:{},ex:{'g_ht#1':{r:10,w:30,d:'2026-11-09',n:'Hip thrust machine'}},vr:{},pain:{},home:{}};
 const {w,k,errs}=boot();k.today('2026-11-16');k.restore(JSON.stringify(old));const D=k.D();
 if(D.logs.length!==3)issue('old backup: logs '+D.logs.length);if(D.emph!=='glutes')issue('old backup: emphasis lost');
 if(!['KC','HO'].every(id=>k.legLog(D.logs.find(l=>l.id===id)))||k.legLog(D.logs.find(l=>l.id==='KA')))issue('old backup: legLog fallback wrong');
 if(k.hist('2026-11-14').legW!==2)issue('old backup: legW '+k.hist('2026-11-14').legW);
 D.loc='g';const s=k.S('KA',k.ctx(k.today())),items=s.blocks.flatMap(b=>b.items);const a=items.find(x=>x.anc);
 if(!a||a.k!=='g_ht')issue('favourite: anchor is not hip thrust');else if(k.curVar(a,'g')!==1)issue('favourite: anchor ignores starred variant ('+k.curVar(a,'g')+')');
 const names=items.map(it=>{const v=k.curVar(it,'g');return v<0?'':it.opts[v].n;});if(names.filter(n=>n==='Hip thrust machine').length!==1)issue('favourite: hip thrust machine '+names.filter(n=>n==='Hip thrust machine').length+'×');
 if(!names.includes('Cable kickbacks'))issue('favourite: kickbacks missing');
 const g=k.target(a,1);if(!(g.w===30&&g.r===11))issue('old backup: anchor target '+JSON.stringify(g));
 // new logs carry lg and survive export/import
 const n2=JSON.parse(JSON.stringify(D));n2.logs.push({d:'2026-11-16',id:'KA',t:'x',rpe:6,lg:1});k.restore(JSON.stringify(n2));
 if(k.D().logs.slice(-1)[0].lg!==1)issue('lg not kept on import');
 // UI: anchor is marked in the session and explained on the favourites page
 k.D().tab='train';k.D().days={};k.day().pick='KA';k.render();const txt=w.document.getElementById('app').textContent;if(!w.document.querySelector('.anc .ancb'))issue('UI: no anchor mark');
 if(!/keeps growing/.test(txt))issue('UI: anchor hint missing');
 k.D().tab='favs';k.render();if(!/fixed main exercise/.test(w.document.getElementById('app').textContent))issue('UI: How it works has no anchor note');
 k.D().theme='plain';k.D().tab='train';k.day().pick='KA';k.render();const pl=w.document.querySelector('.ancb');if(!pl||!/Anchor/.test(pl.textContent))issue('UI: plain anchor label '+(pl&&pl.textContent));
 if(errs.length)issue('old backup: JS errors '+errs.join('; '));
}
console.log(report.join('\n'));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
