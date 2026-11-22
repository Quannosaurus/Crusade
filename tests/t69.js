// @name plan-duplicates
// A-060: no exercise, function or form twice in a session out of the base plan itself (outside warm-up/cool-down).
// planDedup() runs after the filters, before design() and once more after it: the later slot gives way (another form of
// the same item, its progression stays at its own key; else a catalogue exercise of the same group; else it goes and the
// design fills the time); a test whose exercise is already a training slot merges into that slot (set 1 = trial, the value
// counts for test and goal). Case 1: Partner lower, Strength A – a2_wpu and a2_com both on "Band-assisted pull-ups".
// Case 2: Skill Trial with the Hip thrust goal – "Barbell hip thrust" as goal anchor and as lower-body test.
// 48 weeks for Captain, Partner lower, Partner glutes, Runner, Beginner, Home (through recTrain) with and without a goal,
// plus a Captain course with Field kit days: 0 duplicates in every session (also deload, test, Skill Trial, skill, home).
// One mutation per case must turn the check red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {doTrain}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json').slice();
PROF.push({n:'Beginner',prof:null,startP:'s0',focus:'bal',emph:'glutes',skills:{},kick:[]});
PROF.push({n:'Home',prof:{pull:6,dips:10,push:20,expl:2,mu:0,hsw:20,hsf:0,pike:6,tuck:15,lsit:5,hang:30},focus:'bal',emph:'upper',skills:{hs:true},kick:[],loc:'h'});
const GOAL={Captain:'pull','Partner lower':'sq','Partner glutes':'ht',Runner:'d10',Beginner:'ht',Home:'push'};
const P=[];const issue=m=>P.push(m);const rep=[];const START='2026-09-21',DAYS=336;
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {k:w.__kz,errs};}
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,gk){const D=k.D();if(p.startP)D.startP=p.startP;
  Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph=p.emph;
  D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:p.loc||'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(START);if(gk){k.setGoal(gk);D.goal.v=999;}return D;}
/* the check itself only uses functions older than A-060 (curVar, funOf, patKey), so it also measures the build before */
function dups(k,s){const D=k.D(),loc=k.LOC(),L=[],out=[];
  s.blocks.forEach(b=>{if(b.warm||b.cool||b.add||(D.short&&b.p>1))return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,loc);if(v<0)return;L.push({it,b,n:it.opts[v].n});});});
  for(let i=0;i<L.length;i++)for(let j=0;j<i;j++){const a=L[j],c=L[i],f=k.funOf(a.n);
    const why=a.n===c.n?'name':(f&&f===k.funOf(c.n))?'function':(a.it.k&&c.it.k&&k.patKey(a.it.k)===k.patKey(c.it.k))?'key':'';
    if(why)out.push(why+' '+a.n+' ['+a.b.name+'] / '+c.n+' ['+c.b.name+']');}
  return out;}
/* one course: every day follows recAll (home: recTrain, like the Today page at home); kit = Field kit every 3rd training day */
function course(html,n,gk,o){o=o||{};const {k,errs}=boot(html),p=prof(n),D=setup(k,p,gk),tab={},ex=[];let tot=0;
  for(let i=0;i<(o.days||DAYS);i++){const s=addD(START,i);k.today(s);let r=k.recAll(s,false)||{};
    if(r.btn==='train'&&r.id&&r.id!=='RS'&&D.loc==='h')r=Object.assign({btn:'train'},k.recTrain(s,'h'));
    if(r.btn==='kick'){D.logs.push({d:s,id:'KI',t:'KI',rpe:6});continue;}
    if(r.btn==='run'){D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});continue;}
    if(!r.id||r.id==='RS'||r.btn==='pause'){D.logs.push({d:s,id:'RS',t:'RS',rpe:4});continue;}
    if(o.kit&&i%3===0){D.kit=['b','d'];k.day().kit=true;}
    if(o.pre)o.pre(k,D,r.id);const S=doTrain(k,r.id),d=dups(k,S);if(o.post)o.post(k,S,r.id,s);const t=tab[r.id]||(tab[r.id]=[0,0]);t[0]++;t[1]+=d.length;tot+=d.length;
    if(o.only&&!o.only.includes(r.id))continue;
    d.forEach(x=>{if(ex.length<4)ex.push(s+' '+r.id+(k.LOC()==='m'?' (Field kit)':'')+': '+x);});
    /* 60–90 min for gym strength sessions (Field kit and home may stay under 60, A-013), never over 90 */
    if(!o.loose&&(S.min>90||(['KA','KB','KC','CH'].includes(r.id)&&k.LOC()==='g'&&S.min<60)))issue(n+(gk?' + '+gk:'')+' '+s+' '+r.id+': '+S.min+' min');}
  return {tab,tot,ex,errs,k,D};}

const MUT=process.env.KZ_T69_MUT;/* internal: KZ_T69_MUT=pre runs only the table (for the build before A-060) */

// 0 units: case 1 and case 2 directly, merged trial set into the log
function unit(html,tag,log){const bad=[];
  /* case 1: Partner lower in phase 2 of the cycle (Strength + Transitions); both slots forced onto band-assisted pull-ups */
  {let seen=0;const r=course(html,'Partner lower',null,{days:84,loose:1,pre:(k,D,id)=>{if(id==='KA'){D.vr['g|a2_wpu']=3;D.vr['g|a2_com']=3;}},post:(k,s,id,d)=>{if(id!=='KA')return;
     const f=key=>{let x=null;s.blocks.forEach(b=>b.items.forEach(it=>{if(it.k===key)x=it;}));return x;};const a=f('a2_wpu'),c=f('a2_com');if(!a||!c)return;seen++;
     const na=a.opts[k.curVar(a,'g')].n,nc=c.gone?'(gone)':c.opts[k.curVar(c,'g')].n;
     if(na!=='Band-assisted pull-ups')bad.push('case 1 '+d+': a2_wpu is '+na);
     if(nc==='Band-assisted pull-ups')bad.push('case 1 '+d+': Band-assisted pull-ups twice in Strength A (Strength / Transitions)');
     if(c.k!=='a2_com')bad.push('case 1 '+d+': the yielding slot changed its key ('+c.k+')');
     if(!c.gone&&!/Commando|Archer|Single-arm cable lat pulldown/.test(nc))bad.push('case 1 '+d+': no other form of a2_com ('+nc+')');
     if(log&&seen===1)log.push(tag+'case 1 ('+d+'): Strength '+na+' · Transitions '+nc+(c.ddv?' (was '+c.ddv+')':''));}});
   if(!seen)bad.push('case 1: no Strength A with a2_wpu and a2_com in 12 weeks');if(r.errs.length)bad.push('JS '+r.errs.join('; '));}
  {const {k,errs}=boot(html),D=setup(k,prof('Partner glutes'),'ht');const dy=k.day();dy.pick='CH';dy.fin={rpe:6};const c=k.ctx(START),s=k.S('CH',c);
   const d=dups(k,s);if(d.length)bad.push('case 2: '+d.join('; '));
   let anc=null,key='';s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(it.gx&&!it.gone){anc=it;key='CH-'+(b.bi!=null?b.bi:bi)+'-'+ii;}}));
   /* A-061 (I-50): the goal anchor has its own weight store, so its trial set is the series lbx */
   if(!anc||!anc.tsv||anc.tsv.t!=='lbx')bad.push('case 2: the goal anchor carries no trial set ('+JSON.stringify(anc&&anc.tsv)+')');
   else{const n=k.setsOf(anc,s.blocks.find(b=>b.items.includes(anc)),c,'CH');dy.inp[key]={s:[15].concat(Array(n-1).fill(8)).map(String),w:'40'};dy.done[key]=true;k.saveTrain();
     const l=D.logs[D.logs.length-1];if(!l.tv||l.tv.lbx!==15)bad.push('case 2: trial value of set 1 not logged (tv '+JSON.stringify(l.tv)+')');
     if(!D.pr['test:lbx']||D.pr['test:lbx'].w!==40)bad.push('case 2: trial record without the working weight');
     const st=D.ex[anc.k+'#'+k.curVar(anc,'g')];if(!st||st.r!==8||st.w!==40)bad.push('case 2: anchor progression not from its working sets ('+JSON.stringify(st)+')');
     if(!/trial/i.test(anc.c))bad.push('case 2: the anchor does not say that set 1 is the trial');
     if(log)log.push(tag+'case 2: goal anchor set 1 = trial (tv.lbx '+l.tv.lbx+', anchor '+st.r+' × '+st.w+' kg)');}
   if(errs.length)bad.push('JS '+errs.join('; '));}
  {const {k,errs}=boot(html),D=setup(k,prof('Captain'),'pull');const dy=k.day();dy.pick='CH';dy.fin={rpe:6};const c=k.ctx(START),s=k.S('CH',c);
   let anc=null,key='';s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(it.gx&&!it.gone){anc=it;key='CH-'+(b.bi!=null?b.bi:bi)+'-'+ii;}}));
   if(dups(k,s).length)bad.push('pull goal: '+dups(k,s).join('; '));
   if(anc&&anc.tsv){const n=k.setsOf(anc,s.blocks.find(b=>b.items.includes(anc)),c,'CH');dy.inp[key]={s:[13].concat(Array(n-1).fill(8)).map(String),w:''};dy.done[key]=true;k.saveTrain();
     const l=D.logs[D.logs.length-1];if(D.profile.pull!==13||!l.tv||l.tv.pull!==13)bad.push('pull goal: set 1 does not write the pull trial (profile '+D.profile.pull+')');}
   else bad.push('pull goal: anchor without trial set');if(errs.length)bad.push('JS '+errs.join('; '));}
  return bad;}

if(MUT==='pre'){/* table for the build before A-060 */}
else{unit(HTML,'',rep).forEach(issue);}

// 1 48 weeks, every profile with and without goal, plus Field kit days
const RUNS=[];PROF.forEach(p=>{RUNS.push([p.n,null]);RUNS.push([p.n,GOAL[p.n]]);});RUNS.push(['Captain',null,{kit:1}]);
rep.push('profile | '+['KA','KB','KC','CH','SK','DL','TE','HO','HK'].join(' | ')+' (duplicates / sessions)');
RUNS.forEach(([n,gk,o])=>{const r=course(HTML,n,gk,Object.assign({loose:MUT==='pre'},o)),nm=n+(gk?' + '+gk:'')+(o&&o.kit?' + Field kit':'');
  rep.push(nm+' | '+['KA','KB','KC','CH','SK','DL','TE','HO','HK'].map(id=>r.tab[id]?r.tab[id][1]+'/'+r.tab[id][0]:'–').join(' | '));
  if(MUT!=='pre'){if(r.tot)issue(nm+': '+r.tot+' duplicates – '+r.ex.join(' · '));if(r.errs.length)issue(nm+' JS errors '+r.errs.join('; '));}});

// 2 mutations: switching off either fix must turn the check red
if(!MUT){const M=[['case 1','if(lose)yieldIt(lose);','if(lose&&0)yieldIt(lose);','Partner lower',null,'KA',/Band-assisted pull-ups \[Strength\] \/ Band-assisted pull-ups \[Transitions\]/],
  ['case 2','if(tst&&!oth.it.test','if(0&&tst&&!oth.it.test','Partner glutes','ht','CH',/Barbell hip thrust \[(?:Your vow|Goal): Hip thrust\] \/ Barbell hip thrust \[Trial\]/]];
  M.forEach(([tag,a,b,n,gk,id,rx])=>{if(!HTML.includes(a)){issue('mutation '+tag+': code "'+a+'" not found');return;}const h=HTML.replace(a,b);
    const u=unit(h,'',null).filter(x=>x.startsWith(tag));const r=course(h,n,gk,{days:140,only:[id],loose:1});const hit=r.ex.some(x=>rx.test(x));
    rep.push('mutation '+tag+': unit '+(u.length?'red':'green')+', 20 weeks '+r.tot+' duplicates'+(hit?' (expected pair seen)':''));
    if(!u.length||!hit)issue('mutation '+tag+' stays green (unit '+u.length+', course '+r.tot+')');});}

rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
