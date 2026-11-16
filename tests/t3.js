// @name weekly-plan
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};
 if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
 const js=html.match(/<script>([\s\S]*)<\/script>/)[1];w.eval(js);if(!pre)Object.assign(w.__kz.D().skills,{hs:true,mu:true,ls:true});if(!pre)w.__kz.D().kickDays=[2,5];return {w,k:w.__kz,d:w.document};}
const ds=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
const P=[];const issue=m=>P.push(m);
const HARD=new Set(['KA','KB','KC','CH','RH','KI','TE','HO']),STR=new Set(['KA','KB','KC','CH','DL','TE','HO']);
function sim(name,days,doDay,prof){const {k}=boot();const D=k.D();D.onb=true;D.logs=[];D.start='2026-11-16';if(prof)Object.assign(D.profile,prof);
 let dt=new Date('2026-11-16T12:00'),seq=[];
 for(let i=0;i<days;i++){const s=ds(dt);const nk=doDay.noKick||false;const r=k.recAll(s,nk&&[2,5].includes(dt.getDay()));const did=doDay(i,dt.getDay(),r);
   if(did){D.logs.push({d:s,id:r.id,rpe:did==='limit'?10:6});seq.push(r.id);}else seq.push('--');dt.setDate(dt.getDate()+1);}
 const c={};D.logs.forEach(l=>c[l.id]=(c[l.id]||0)+1);
 // rule checks
 for(let i=1;i<seq.length;i++){const a=seq[i-1],b=seq[i];
   if(STR.has(a)&&STR.has(b))issue(name+': Kraft an zwei Tagen hintereinander (Tag '+i+': '+a+'→'+b+')');
   if(a==='RH'&&(STR.has(b)||b==='RH'))issue(name+': nach starkem Lauf '+b+' (Tag '+i+')');
   if(a==='KC'&&b==='RH')issue(name+': starker Lauf nach Beintag (Tag '+i+')');}
 let run=0;seq.forEach((x,i)=>{run=HARD.has(x)?run+1:0;if(run>=4)issue(name+': 4 harte Tage am Stück bis Tag '+i);});
 console.log('\n'+name);for(let w=0;w*7<days;w++)console.log('  W'+(w+1)+' '+seq.slice(w*7,w*7+7).join(' '));console.log('  '+JSON.stringify(c));return {c,seq,k};}
let r=sim('REGELMÄSSIG 12 Wo',84,()=>true);
if(!r.c.KC)issue('Regelmäßig: kein Kraft C');if(!r.c.CH)issue('Regelmäßig: keine Challenge');
// A-024: the Skill Trial takes a Strength A/B slot every 14 ± 2 days, so A and B each give up ~2 sessions in 12 weeks;
// the upper-body slots together (A + B + Skill Trial) stay as frequent as before.
['KA','KB'].forEach(x=>{if((r.c[x]||0)<6)issue('Regelmäßig: '+x+' nur '+(r.c[x]||0)+'×');});if((r.c.KA||0)+(r.c.KB||0)+(r.c.CH||0)<17)issue('Regelmäßig: Kraft A/B/Skill Trial nur '+((r.c.KA||0)+(r.c.KB||0)+(r.c.CH||0))+'×');if((r.c.CH||0)<4)issue('Regelmäßig: Skill Trial nur '+(r.c.CH||0)+'× in 12 Wochen');if((r.c.RE||0)+(r.c.RH||0)<18)issue('Regelmäßig: zu wenig Läufe');if((r.c.RH||0)<5)issue('Regelmäßig: RH nur '+r.c.RH);if(r.c.KI!==24)issue('KI nicht 2×/Woche');
r=sim('UNREGELMÄSSIG Mo/Do/Sa',84,(i,wd)=>[1,4,6].includes(wd));
['KA','KB','RE','RH'].forEach(x=>{if(!(r.c[x]))issue('Unregelmäßig: nie '+x);});if(!(r.c.KC||r.c.CH))issue('Unregelmäßig: nie Beine');
r=sim('PAUSE 3 Wochen',70,(i)=>i<14||i>=35);
r=sim('KEIN KICKBOXEN',28,(()=>{const f=()=>true;f.noKick=true;return f;})());
if(r.c.KI)issue('Kein Kickboxen: KI trotzdem eingetragen');
r=sim('WENIG ZEIT: 2× pro Woche (Mi, So)',56,(i,wd)=>[3,0].includes(wd));
r=sim('OFT AM LIMIT',28,()=> 'limit');
// pause week counting
{const {k}=boot();const D=k.D();D.start='2026-09-01';D.logs=[{d:'2026-09-02',id:'KA',rpe:6},{d:'2026-09-09',id:'KA',rpe:6}];
 const c=k.ctx(ds(new Date()));console.log('\nPause seit September → Woche',c.week);if(c.week>4)issue('Pausenwochen zählen mit');}
// Profiles
function sess(label,prof,ph){const {k}=boot();const D=k.D();Object.assign(D.profile,prof);D.onb=true;
 console.log('\n'+label+' (Stufe '+['Basis','Fortg.','Profi'][k.lvl()]+')');
 ['KA','KB','KC','SK'].forEach(id=>{const s=k.S(id,{phase:ph||1,cyc:3});console.log(' '+id+': '+s.blocks.map(b=>b.name+'['+b.items.map(it=>{const a=[...Array(it.opts.length).keys()];let v=0;if(it.lv){const L=k.lvl();v=L===0?it.lv[0]:L===2?it.lv[1]:0;}return it.opts[v].n+(it.iso?' ('+JSON.stringify(k.isoP(D.profile[it.iso]))+')':'');}).join('; ')+']').join(' | '));});
 return k;}
sess('ANFÄNGER',{pull:2,dips:3,push:8,expl:0,negmu:0,mu:0,tuck:8,lsit:0,hsw:8,hsf:0,pike:3});
sess('PROFI',{pull:20,dips:30,expl:12,negmu:10,mu:8,tuck:60,lsit:30,hsw:90,hsf:30,pike:25},2);
// target logic
{const {k}=boot();const D=k.D();const it=k.S('KA',{phase:1}).blocks[3].items[0];const t=ds(new Date());
 const ago=n=>{const x=new Date();x.setDate(x.getDate()-n);return ds(x);};
 const cases=[['normal',{r:4,d:ago(3)}],['oben',{r:6,d:ago(3)}],['unten',{r:1,d:ago(3)}],['Limit',{r:4,d:ago(3),hold:true}],['12 Tage Pause',{r:5,d:ago(12)}],['40 Tage Pause',{r:5,d:ago(40)}]];
 cases.forEach(([n,st])=>{D.ex['a_expu#0']=st;console.log(' Ziel '+n+':',JSON.stringify(k.target(it,0)));});
 D.ex['a_expu#1']={r:6,w:5,d:ago(3)};console.log(' Weste oben:',JSON.stringify(k.target(it,1)));
 D.ex['a_expu#1']={r:2,w:10,d:ago(3)};console.log(' Weste unten:',JSON.stringify(k.target(it,1)));
 D.ex['a_expu#1']={r:5,w:10,d:ago(40)};console.log(' Weste 40 Tage Pause:',JSON.stringify(k.target(it,1)));
 const t40=k.target(it,0);}
// coverage audit
{const {k}=boot();const D=k.D();const cats={
 'Vertikal ziehen':/Klimmz|Chin|pulldown|Pull-up|pull-up|Muscle/i,'Horizontal ziehen':/Row|row/i,'Vertikal drücken':/Pike|HSPU|Shoulder press|shoulder press|Landmine Press|Handstand/i,'Horizontal drücken':/Push-Up|Bankdrück|Brustpresse/i,'Dips':/Dips/i,
 'Beine Kniebeuge':/Squat|squat|Leg press|Lunge|lunge/i,'Hüftstrecker/Hamstrings':/deadlift|Leg curl|Nordic|Hip thrust|hip thrust|Glute|Hyperext/i,'Waden':/calf|Calf/i,'Schienbein':/Tibialis/i,'Hüftabduktoren':/Abduct|abduct|band walks|Side-lying leg/i,'Adduktoren':/Copenhagen|Adductor/i,
 'Rotatorenmanschette':/external rotation|External rotation|Cuban/i,'Untere Trapez/Y':/Y-Raise|Y-T-W/i,'Hintere Schulter':/Face Pull|Reverse Butterfly|Reverse Flies/i,'Serratus':/Serratus|Scapula Push/i,'Unterarm/Ellbogen':/reverse curls|Reverse Curls|wrist curls/i,'Bizeps':/Curls|Frenchie|Chin/i,'Trizeps':/triceps|Triceps|French Press|Dips/i,
 'Griff':/Hang|hang/i,'Rotation (Kick)':/Woodchopper|Rotation|Pallof/i,'Nacken':/Neck|neck/i,'L-Sit/Kompression':/L-Sit|Compression/i,'Handgelenk-Vorbereitung':/Wrist prep/i,'Explosiv/Plyo':/Explosive|Box Jumps|Swings|Jumping|Lunges/i};
 const week=['KA','KB','KC','SK'].flatMap(id=>k.S(id,{phase:1}).blocks.flatMap(b=>b.items.map(it=>it.opts[0].n))).join(' || ');
 const week2=['KA','KB','KC','SK'].flatMap(id=>k.S(id,{phase:2}).blocks.flatMap(b=>b.items.map(it=>it.opts[0].n))).join(' || ');
 console.log('\nABDECKUNG (Teil 1 / Teil 2):');Object.entries(cats).forEach(([n,rx])=>{const a=(week.match(new RegExp(rx.source,'gi'))||[]).length,b=(week2.match(new RegExp(rx.source,'gi'))||[]).length;console.log('  '+n.padEnd(26)+a+' / '+b);if(!a||!b)issue('Lücke: '+n+' (Teil1 '+a+', Teil2 '+b+')');});}
console.log('\n=== AUFFÄLLIGKEITEN ('+P.length+') ===');[...new Set(P)].slice(0,40).forEach(x=>console.log(' - '+x));
