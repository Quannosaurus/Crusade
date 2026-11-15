const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return w.__kz;}
const ds=d=>d.toISOString().slice(0,10);
const HARDRUN=new Set(['RH','RI']),STR=new Set(['KA','KB','KC','CH','DL','TE','HO']),RUN=new Set(['RE','RH','RI']);
function sim(name,{focus,skills,kick=[2,5],weeks=12,doDay=()=>true}){
  const k=boot(),D=k.D();D.onb=true;D.logs=[];D.start='2026-11-16';D.focus=focus;Object.assign(D.skills,skills);D.kickDays=kick;
  let dt=new Date('2026-11-16T12:00Z'),seq=[],skc={};
  for(let i=0;i<weeks*7;i++){const s=ds(dt),r=k.recAll(s,false);
    if(doDay(i,dt.getUTCDay())){let sk=[];if(['KA','KB','KC','SK'].includes(r.id)){sk=k.skillPlan(r.id,s);if(r.id==='KA'&&D.skills.mu)sk.push('mu');}
      sk.forEach(x=>skc[x]=(skc[x]||0)+1);D.logs.push({d:s,id:r.id,rpe:6,sk});seq.push(r.id);}else seq.push('--');
    dt.setUTCDate(dt.getUTCDate()+1);}
  const c={};D.logs.forEach(l=>c[l.id]=(c[l.id]||0)+1);
  for(let i=1;i<seq.length;i++){const a=seq[i-1],b=seq[i];
    if(STR.has(a)&&STR.has(b))issue(name+': Kraft 2 Tage hintereinander T'+i);
    if(HARDRUN.has(a)&&(STR.has(b)||HARDRUN.has(b)))issue(name+': nach hartem Lauf '+b+' T'+i);
    if(a==='KC'&&HARDRUN.has(b))issue(name+': harter Lauf nach Beintag T'+i);
    if(b==='KI'&&(a==='KC'||HARDRUN.has(a)))issue(name+': '+a+' vor Kickboxen T'+i);}
  const runs=seq.filter(x=>RUN.has(x)).length/weeks, str=seq.filter(x=>STR.has(x)).length/weeks;
  console.log('\n'+name+'  Läufe/Wo '+runs.toFixed(1)+'  Kraft/Wo '+str.toFixed(1)+'  Skills '+JSON.stringify(skc));
  for(let w=0;w<Math.min(weeks,4);w++)console.log('  W'+(w+1)+' '+seq.slice(w*7,w*7+7).join(' '));
  console.log('  '+JSON.stringify(c));return {c,runs,str,skc,k,D};}
const all={hs:true,mu:true,ls:true,fl:false,pl:false};
let r=sim('AUSGEWOGEN Standard',{focus:'bal',skills:all});
r=sim('LÄUFER mit Kick',{focus:'run',skills:all});
if(r.runs<3)issue('Läufer: nur '+r.runs.toFixed(1)+' Läufe/Woche');if(!r.c.RI)issue('Läufer: keine Intervalle');if(!r.c.RH)issue('Läufer: kein langer Lauf');if(r.str>2.4)issue('Läufer: zu viel Kraft '+r.str);if(r.str<1.5)issue('Läufer: zu wenig Kraft '+r.str);
r=sim('LÄUFER ohne Kick',{focus:'run',skills:all,kick:[]});
if(r.runs<4)issue('Läufer ohne Kick: nur '+r.runs.toFixed(1)+' Läufe');
const easy=(r.c.RE||0)/((r.c.RE||0)+(r.c.RH||0)+(r.c.RI||0));console.log('  Anteil locker:',easy.toFixed(2));if(easy<0.55)issue('Läufer: zu wenig locker '+easy.toFixed(2));
r=sim('KRAFT mit Kick',{focus:'str',skills:all});
if(r.runs>0)issue('Kraft: Läufe empfohlen');if(r.str<2.8)issue('Kraft: nur '+r.str.toFixed(1)+' Kraft/Woche');
r=sim('KRAFT ohne Kick',{focus:'str',skills:all,kick:[]});
if(r.str<3.2)issue('Kraft ohne Kick: nur '+r.str.toFixed(1));
r=sim('NUR FRONT LEVER',{focus:'str',skills:{hs:false,mu:false,ls:false,fl:true,pl:false},kick:[]});
if(!r.skc.fl||r.skc.hs)issue('Nur FL: Plan falsch '+JSON.stringify(r.skc));
let s=r.k.S('KA',r.k.ctx('2026-11-20')).blocks.map(b=>b.name);console.log('  KA-Blöcke:',s.join(' | '));
if(s.includes('Handstand')||s.some(n=>/Muscle-Up/.test(n)))issue('Nur FL: Handstand/MU in KA');if(!s.includes('Front Lever'))issue('Nur FL: kein FL in KA');
s=r.k.S('SK',r.k.ctx('2026-11-20'));console.log('  SK-Blöcke:',s.blocks.map(b=>b.name+'['+b.items.map(i=>i.opts[0].n).join(', ')+']').join(' | '));
r=sim('DREI SKILLS hs+fl+pl',{focus:'bal',skills:{hs:true,mu:true,ls:true,fl:true,pl:true}});
const v=['hs','fl','pl'].map(x=>r.skc[x]||0);if(Math.min(...v)<Math.max(...v)*0.5)issue('Rotation ungleich '+v);if(r.skc.hs<Math.max(r.skc.fl,r.skc.pl))issue('Handstand seltener als andere');
r=sim('KEINE SKILLS',{focus:'bal',skills:{hs:false,mu:false,ls:false,fl:false,pl:false}});
if(r.c.SK)issue('Keine Skills: trotzdem Skill-Einheit');
s=r.k.S('KA',r.k.ctx('2026-11-20')).blocks.map(b=>b.name);console.log('  KA ohne Skills:',s.join(' | '));
const t=r.k.S('TE',r.k.ctx('2026-11-20')).blocks[1].items.map(i=>i.test);console.log('  Test ohne Skills:',t.join(','));if(t.includes('mu')||t.includes('hsw'))issue('Test enthält abgewählte Skills');
// home sessions with planche only
r=sim('NUR PLANCHE zuhause-Check',{focus:'str',skills:{hs:false,mu:false,ls:false,fl:false,pl:true},weeks:1});
['HO','HK'].forEach(id=>{const b=r.k.S(id,r.k.ctx('2026-11-20')).blocks.map(b=>b.name);console.log('  '+id+':',b.join(' | '));if(!b.includes('Planche'))issue(id+' ohne Planche');if(b.some(n=>/^Handstand/.test(n)))issue(id+' mit Handstand trotz Abwahl');});
// run page RI
r=sim('LÄUFER runRec',{focus:'run',skills:all,weeks:0});const rr=r.k.runRec();console.log('  runRec leer:',rr.id,rr.why);
console.log('\n=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));
