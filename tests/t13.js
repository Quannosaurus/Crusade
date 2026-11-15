const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const F=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document,errs};}
function fdur(f){f=String(f);let side=/each side|per leg|each way|each direction/.test(f)?2:1,m;
 if(m=f.match(/(\d+)\s*×\s*(\d+)\s*s/))return +m[1]*(+m[2])*side+(+m[1])*10;if(m=f.match(/(\d+)\s*×\s*(\d+)/))return +m[1]*(+m[2])*3*side+(+m[1])*20;
 if(m=f.match(/(\d+)\s*min/))return +m[1]*60;if(m=f.match(/(\d+)\s*s/))return +m[1]*side+10;if(m=f.match(/(\d+)/))return +m[1]*3*side+10;return 45;}
function est(k,D,s,loc){let tot=0;s.blocks.forEach(b=>{if(D.short&&b.p>1)return;let t=0;const c=k.ctx('2026-11-20'),R=b.rounds?k.rounds(b,c,s.id):0;const its=b.items.filter(it=>k.curVar(it,loc)>=0);
 its.forEach(it=>{if(it.f){t+=fdur(it.f)*(R||1);return;}if(it.iso){const q=k.isoP(D.profile[it.iso]);t+=q.n*(q.h+(b.rounds?0:(b.rest||60)));return;}if(it.test){t+=180;return;}
  const n=R||parseInt(it.sets||1)||1,g=k.target(it,k.curVar(it,loc)),reps=parseInt(g.r)||it.lo;t+=n*(/^s/.test(it.unit)?reps:reps*3)+(b.rounds?0:(n-1)*(b.rest||60))+20;});
 if(R)t+=R*(b.rest||90);tot+=t;});return Math.round(tot/60)+4;}
const P=[
 {n:'1 Nils (intermediate, kick Tu/Fr)',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45},focus:'bal',skills:{hs:1,mu:1,ls:1},kick:[2,5],loc:'g',freq:0.85},
 {n:'2 Partner (beginner, home, no skills)',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},focus:'bal',skills:{},kick:[],loc:'h',home:{b:true},freq:0.45},
 {n:'3 Runner (run focus, no skills)',prof:{pull:3,dips:5,push:15,hang:30,tuck:10},focus:'run',skills:{},kick:[],loc:'g',freq:0.8},
 {n:'4 Strength advanced (MU, FL, PL)',prof:{pull:18,dips:25,push:40,expl:10,mu:5,hsw:60,hsf:15,tuck:40,lsit:20,hang:90,flSt:2,plSt:1},focus:'str',skills:{hs:1,mu:1,fl:1,pl:1},kick:[],loc:'g',freq:0.8},
 {n:'5 Returner with wrist+shoulder pain, 5-week pause',prof:{pull:6,dips:8,push:15,hang:30,tuck:10,hsw:20},focus:'bal',skills:{hs:1},kick:[],loc:'g',freq:0.6,pain:{w:true,s:true},pause:[14,49]},
 {n:'6 Shift worker, irregular 1-2x/week',prof:{pull:8,dips:12,push:20,hang:40,tuck:20},focus:'bal',skills:{ls:1},kick:[],loc:'g',freq:0.2},
 {n:'7 Home only, mat only',prof:{pull:4,dips:6,push:15,hang:20,tuck:10,hsw:10},focus:'str',skills:{hs:1},kick:[],loc:'h',home:{},freq:0.6},
 {n:'8 Overachiever, daily, always at the limit',prof:{pull:12,dips:18,push:30,expl:6,mu:1,hsw:40,hsf:5,tuck:30,lsit:12,hang:60},focus:'bal',skills:{hs:1,mu:1,ls:1},kick:[2],loc:'g',freq:1,rpe:10},
 {n:'9 Busy parent, limited time, 2x/week',prof:{pull:5,dips:8,push:20,hang:30,tuck:10},focus:'bal',skills:{hs:1},kick:[],loc:'g',freq:0.3,short:true},
 {n:'10 Kickboxer 3x/week (Mo/We/Fr)',prof:{pull:7,dips:12,push:30,hang:40,tuck:20,hsw:25},focus:'bal',skills:{hs:1},kick:[1,3,5],loc:'g',freq:0.75},
];
const out=[];
P.forEach(p=>{const {w,k,d,errs}=boot();const D=k.D();const flags=[];
 Object.assign(D.profile,p.prof);D.focus=p.focus;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:!!p.skills.ls,fl:!!p.skills.fl,pl:!!p.skills.pl};D.kickDays=p.kick;D.loc=p.loc;if(p.home)D.home=Object.assign({},p.home);D.pain=p.pain||{};D.short=!!p.short;D.onb=true;D.logs=[];D.start='2026-09-21';
 let dt=new Date('2026-09-21T12:00Z'),seq=[],durs=[],same=0,last='',hardStreak=0,maxHard=0;const rnd=(()=>{let x=7+p.n.length;return()=>{x=(x*9301+49297)%233280;return x/233280;};})();
 for(let i=0;i<56;i++){const s=dt.toISOString().slice(0,10);const rec=k.recAll(s,false);let id=rec.id;
  if(rec.btn==='train'&&p.loc==='h'){id=k.recTrain(s,'h',false).id;}
  const paused=p.pause&&i>=p.pause[0]&&i<p.pause[1];
  if(!paused&&rnd()<p.freq){const sk=['KA','KB','KC','SK'].includes(id)?k.skillPlan(id,s):[];D.logs.push({d:s,id,t:id,rpe:p.rpe||[4,6,6,8][Math.floor(rnd()*4)],sk,km:rec.btn==='run'?(id==='RE'?5:8):0,min:rec.btn==='run'?(id==='RE'?32:52):0,abs:rnd()<0.6?1:0});seq.push(id);
   if(id===last&&id!=='HO')same++;else same=0;if(same>=2)flags.push('Same session 3x in a row: '+id+' on '+s);last=id;
   if(['KA','KB','KC','CH','RH','RI','KI','TE','HO'].includes(id)){hardStreak++;maxHard=Math.max(maxHard,hardStreak);}else hardStreak=0;
   if(rec.btn==='train'||rec.btn==='kick'){}
  }else seq.push('--');
  if(rnd()<0.5)D.logs.push({d:s,id:'MO',t:'MO'});
  dt.setUTCDate(dt.getUTCDate()+1);}
 // session quality
 const ids=p.loc==='h'?['HO','HK']:['KA','KB','KC','SK','CH','TE','DL','RS'];
 ids.forEach(id=>{if(p.focus==='str'&&false)return;const s=k.S(id,k.ctx('2026-11-20'));
  const avail=s.blocks.map(b=>b.items.filter(it=>k.curVar(it,p.loc)>=0).length),tot=avail.reduce((a,b)=>a+b,0);
  if(tot<5)flags.push(id+': only '+tot+' doable exercises');
  s.blocks.forEach((b,i)=>{if(b.items.length&&avail[i]===0&&b.name!=='Cool-down')flags.push(id+': block "'+b.name+'" empty with this equipment');});
  const dm=est(k,D,s,p.loc);durs.push(id+' '+dm+'m');
  if(!['DL','RS','HK'].includes(id)&&(dm>95||dm<25))flags.push(id+' duration '+dm+' min');
  if(D.short&&dm>50&&!['DL','RS'].includes(id))flags.push(id+' limited-time still '+dm+' min');
  if(p.pain){s.blocks.forEach(b=>{if(b.rehab)return;b.items.forEach(it=>{const v=k.curVar(it,p.loc);if(v<0)return;const nm=it.opts[v].n;if(/Handstand|Push-up|Pike|wrist prep|Wrist prep|Planche/i.test(nm)&&b.name!=='Cool-down'){/* allowed only if pain filter skips at render */}});});}
 });
 // render all screens
 ['start','train','run','kick','morgen','verlauf','stand','mehr'].forEach(t=>{D.tab=t;try{k.render();}catch(e){flags.push('Render error on '+t+': '+e.message);}});
 D.tab='verlauf';k.render();const ins=[...d.querySelectorAll('.ins')].map(x=>x.textContent);
 if(!ins.length)flags.push('No focus advice');
 if(p.rpe===10&&!ins.some(x=>/at the limit/.test(x)))flags.push('Overreaching not flagged in stats');
 if(p.pain){D.tab='train';k.render();const txt=d.getElementById('app').textContent;if(!/rehab/i.test(txt))flags.push('No rehab block with pain');}
 const restDays=seq.filter(x=>x==='--'||x==='RS'||x==='RE').length;
 if(p.freq===1&&maxHard>4)flags.push('Overachiever: '+maxHard+' hard days in a row');
 const cnt={};seq.forEach(x=>cnt[x]=(cnt[x]||0)+1);
 if(errs.length)flags.push('JS errors: '+errs.join(';'));
 out.push({n:p.n,flags:[...new Set(flags)],cnt,durs,ins:ins.slice(0,3)});
});
out.forEach(o=>{console.log('\n### '+o.n);console.log('  sessions:',JSON.stringify(o.cnt));console.log('  durations:',o.durs.join(', '));console.log('  advice:',o.ins.join(' | '));o.flags.forEach(f=>console.log('  ⚠ '+f));});
process.exit(0);
