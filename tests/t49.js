// @name longterm
// @longrun
// A-030b: 104-week check stones of the long-term concept (docs/longterm-concept.md). 5 profiles (Captain, Partner
// lower, Partner glutes, Runner, beginner "Just starting" with glute emphasis) × 2 courses (progress, standstill),
// shared simulation tests/fixtures/longsim.js. Every check stone is measured and printed; a stone whose order is not
// done yet reports "open" instead of failing (ACTIVE lists the done orders). Own run: sh tests/longterm.sh.
// Stones: under = no target under the range of its exercise (A-037) · dur = every strength session 60–90 min with
// warm-up first and cool-down last (now) · top = no bodyweight exercise > 12 weeks at the top without an offered step
// (A-039) · names = new exercise names in every quarter: names never shown before or absent for at least 12 weeks (A-043) · run = weekly km and long run change between the phases
// (A-044: compared per run season, ≥ 10 % spread of weekly km and of the mean long run) · wk = week preview after 2 years ≤ 2 × the time with 12 weeks (A-038; the final state with its whole history
// against the same state with only its last 12 weeks, so the plan of the day is the same; weeks 12–15 vs the last 4 weeks
// are printed as information) · lvl = in the progress course the beginner and the partner profiles rise in the lower stand
// (A-041; upper and lower stand at the start and the end, and the week of the first rise, are printed for every profile)
// · blk = volume and ranges differ between the accent blocks: the planned volume per strength session (sets × range middle)
// differs by ≥ 5 % between the accents and weighted exercises sit lower in their range in the strength block than in the
// volume block (A-042) · A-054: names = two measures per block (share of other names than the block before, repetition
// after 3 blocks) plus the share of new names against the block two back (same phase), which needs the rotation (without it
// 2–5 %); run = the hold factor alone is not enough (the other seasons differ too, or the tempo season changes its interval
// form); lvl with a realistic start (anchor 40 kg); wk = ratio of the medians of 5 alternating measurements; courses also
// "mixed" (Tired, Hold weeks, Limited time, a 2-week illness pause) for the Captain and a Home profile · start = in the progress course every weighted exercise ends at or above its start weight unless only
// stall resets (3 × no progress) or a logged value under the range ("weight down", P-5) took it under (printed apart); under
// also counts a weighted target under the start weight of its variant that is no planned lighter weight (A-051).
// A-057: the Home week preview is a hard stone (wkh: unchanged plan – one entry per older training week keeps the cycle week,
// the Home A/B parity is kept – ratio of the medians of 5 ≤ 2, A-038); the mixed course carries hard stones (mix): Tired and
// Hold (strength, running, skills) ⅔ of the sets ± 1 and ≥ 45 min, hold running ⅔ km, no step back through hold or the
// declared 14-day pause, an easier re-entry after it.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const ACTIVE=['A-030b','A-037','A-038','A-039','A-041','A-042','A-043','A-044','A-051','A-057'];
const STONE={mix:'A-057',wkh:'A-057',dur:'A-030b',under:'A-037',wk:'A-038',top:'A-039',lvl:'A-041',blk:'A-042',names:'A-043',run:'A-044',start:'A-051'};
const sharp=x=>ACTIVE.includes(STONE[x]);
const ONLY=process.argv.slice(2).filter(a=>!a.startsWith('-'));const WEEKS=+(process.argv.find(a=>/^--weeks=/.test(a))||'--weeks=104').split('=')[1];
const DAYS=WEEKS*7,START='2026-11-16',STR=['KA','KB','KC','CH','HO'];
const P=[];const issue=m=>P.push(m);const out=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz};}
const HOME={n:'Home',prof:{pull:6,dips:10,push:20,expl:2,mu:0,hsw:20,hsf:0,pike:6,tuck:15,lsit:5,hang:30},focus:'bal',emph:'upper',skills:{hs:true},kick:[],loc:'h'};
const BEG={n:'Beginner',prof:null,startP:'s0',focus:'bal',emph:'glutes',skills:{},kick:[]};
function setup(k,p){const D=k.D();if(p.startP)D.startP=p.startP;
  Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph=p.emph;
  D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:p.loc||'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:START,short:false,fav:(p.fav||[]).slice()});if(p.loc==='h')Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(START);}
/* A-054 mixed course: Tired on some days, Hold weeks 40–45 (strength and running, then switched off), Limited time on some
   days, a 2-week illness pause in weeks 60–61 */
function mixDay(k,i,s){const D=k.D();D.opt.ready=true;const dy=k.day();if(i%9===4)dy.ready=3;else delete dy.ready;D.short=i%11===3;
  const wk=Math.floor(i/7);D.hold.str=D.hold.run=D.hold.sk=wk>=40&&wk<46;if(wk===46&&i%7===0)D.holdR=s;if(i===420)D.pause={from:s,to:addD(s,13),why:'ill'};if(i===434&&D.pause)k.pauseEnd(s);}/* A-057 b: the pause ends like in the app (pauseEnd records it in pauseH) */
/* A-057 b: hard check stones of the mixed course. Tired and Hold: about ⅔ of the working sets of the normal session of the
   same day (T = round(⅔ · normal), ± 1; above T + 1 only where the 45 min floor stopped the cut), never under 45 min (not
   with Limited time; the normal session keeps skill hold, as the app designs it); hold running about ⅔ of the planned km; skill blocks marked hold; no step back and no lower weight
   through Hold or the pause; after the 14-day pause an easier re-entry (comeback: fewer sets than before, no trial/test
   for 7 days, no hard run for 3 days). */
const PZ0=420,PZ1=434,TRN=l=>l.id!=='MO'&&l.id!=='OA';
function wset(k,S,c,id){const D=k.D();let n=0;S.blocks.forEach(b=>{if(b.warm||b.cool||(D.short&&b.p>1))return;b.items.forEach(it=>{if(!it.k||it.f||it.iso||it.test||k.curVar(it,k.LOC())<0)return;n+=k.setsOf(it,b,c,id);});});return n;}
function mixChk(k,ev,m){const D=k.D(),X=m.mx;if(ev.type==='session'&&STR.includes(ev.id)){const c=k.ctx(ev.d),dy=k.day(),td=dy.ready===3,hd=D.hold.str,w1=wset(k,ev.s,c,ev.id);
    if(ev.i<PZ0&&!td&&!hd&&!D.short&&!k.dlWk(ev.d,c)){const a=X.pre[ev.id]=X.pre[ev.id]||[];a.push(w1);if(a.length>4)a.shift();}/* the last 4 normal sessions of each unit before the pause */
    if(ev.i>=PZ1){X.reN++;if(!X.re){let hi=0;ev.s.blocks.forEach(b=>{if(b.warm||b.cool||!b.rounds)return;if(k.rounds(b,c,ev.id)>b.rounds[0]+(b.accP?1:0))hi++;});X.re={d:ev.d,id:ev.id,w:w1,low:!!(k.cbInfo(ev.d)||{}).low,hi};}}
    if(ev.i>=PZ1&&ev.i<PZ1+7&&(ev.id==='CH'||ev.id==='TE'))X.bad.push(ev.d+' '+ev.id+' within 7 days after the pause');
    if((td||hd)&&!k.dlWk(ev.d,c)&&!k.gTaper(ev.d)){const r0=dy.ready,h0=Object.assign({},D.hold);delete dy.ready;D.hold.str=false;let w0;try{w0=wset(k,k.S(ev.id,k.ctx(ev.d)),k.ctx(ev.d),ev.id);}finally{if(r0!=null)dy.ready=r0;Object.assign(D.hold,h0);}
      const T=Math.round(w0*2/3);X.n++;X.ratio.push(w0?w1/w0:1);
      if(w1<T-1||(w1>T+1&&ev.s.min>47))X.bad.push(ev.d+' '+ev.id+(td?' tired':' hold')+': '+w1+' of '+w0+' sets (target '+T+' ± 1, '+ev.s.min+' min)');
      if(!D.short&&ev.s.min<45)X.bad.push(ev.d+' '+ev.id+(td?' tired':' hold')+': '+ev.s.min+' min < 45');}
  }
  if(ev.type==='session'&&D.hold.sk)ev.s.blocks.forEach(b=>{if((b.skill||b.hsb)&&!b.hold)X.bad.push(ev.d+' '+ev.id+': skill block "'+b.name+'" not on hold');else if(b.skill||b.hsb)X.sk++;});
  if(ev.type==='target'&&ev.i>=PZ1&&X.reN>=1&&X.reN<=2&&ev.st&&!ev.g.rng){const {g,st}=ev;if((g.w||0)>(st.w||0)||(g.r||0)>(st.r||0)&&!(st.w>0&&(g.w||0)<st.w))X.bad.push(ev.d+' '+ev.name+': re-entry session '+X.reN+' raises the target ('+st.r+'×'+(st.w||0)+' → '+g.r+'×'+(g.w||0)+')');}
  if(ev.type==='target'&&(D.hold.str||(ev.i>=PZ0&&ev.i<PZ1+21))){const {g,st}=ev;
    if(g.back)X.bad.push(ev.d+' '+ev.name+': step back '+(D.hold.str?'in hold':'after the pause')+' ('+g.note+')');
    else if(st&&st.w>0&&g.w!=null&&g.w<st.w&&!g.reset)X.bad.push(ev.d+' '+ev.name+': '+g.w+' kg < '+st.w+' kg '+(D.hold.str?'in hold':'after the pause'));}
  if(ev.type==='run'){if(ev.i>=PZ1&&ev.i<PZ1+3&&(ev.id==='RH'&&!k.longMode()||ev.id==='RI'))X.bad.push(ev.d+' hard run '+ev.id+' within 3 days after the pause');
    /* hold running: the planned distance before the weekly cap is ⅔ of the one without hold (floor 2 km), and the run is not longer */
    if(D.hold.run){const on=k.runBase(ev.id,ev.d);D.hold.run=false;const full=k.runBase(ev.id,ev.d);D.hold.run=true;X.run.push(on/full);X.rs.push(ev.id+' '+on+'/'+full);if((full>3&&(on>full*0.75||on<full*0.55))||ev.km>on+0.01)X.bad.push(ev.d+' '+ev.id+' hold running '+on+' of '+full+' km (run '+ev.km+')');}}}
const W0=key=>/^(g_ht|gl_ht|c_sq|gl_sq)#/.test(key)?40:20;
function wkTime(k){const t=[];for(let j=0;j<15;j++){k.WK.plan=null;k.WK.key='';const a=process.hrtime.bigint();k.weekPlan();t.push(Number(process.hrtime.bigint()-a)/1e6);}
  return t.sort((a,b)=>a-b)[7];}
function one(p,course){const {k}=boot();setup(k,p);const D=k.D();const q=i=>Math.floor(i/91);
  const m={under:0,underEx:'',dur:0,durEx:'',top:{},topMax:0,topEx:'',names:[],km:[],long:[],sets:[],wk12:0,wkEnd:0,wkA:[],wkB:[],rankWk:null};
  m.mx={reN:0,pre:{},re:null,bad:[],n:0,ratio:[],run:[],rs:[],sk:0};m.acc={};m.blkN={};m.ri={};m.lastUse={};m.w0={};m.dn={};m.rs={};m.rph={};m.phd={};const seen=new Set();m.lv0=[k.lvUp(),k.lvLo()];m.lvW=[null,null];
  longSim(k,DAYS,START,course==='mix'?'prog':course,7+p.n.length,ev=>{const Q=q(ev.i);if(course==='mix'&&DAYS>PZ1+21)mixChk(k,ev,m);
    if(ev.type==='target'){const {it,g,st,v}=ev;
      if(st&&st.r>=it.lo&&g.r<it.lo){m.under++;if(!m.underEx)m.underEx=ev.d+' '+ev.name+' '+g.r+' < '+it.lo;}
      const kk=it.k+'#'+v,w0=m.w0[kk];if(g.w>0&&w0==null)m.w0[kk]=g.w;else if(!st&&(it.opts[v].w||g.wl)&&w0==null)m.w0[kk]=20;
      if(st&&st.w>0&&g.w!=null&&g.w<st.w){if(g.reset||g.low||g.back)m.rs[kk]=1;else if(!m.dn[kk])m.dn[kk]=ev.d+' '+g.w+' kg ('+g.note+')';}
      if(w0!=null&&st&&st.w>=w0&&g.w!=null&&g.w<w0&&!g.reset&&!g.low&&!g.rng&&!g.back){m.under++;if(!m.underEx)m.underEx=ev.d+' '+ev.name+' '+g.w+' kg < start '+w0+' kg ('+g.note+')';}
if(!it.opts[v].w&&!g.wl&&g.top&&ev.nv<0&&!g.lad){const t=m.top[kk]||(m.top[kk]={from:ev.d});const wks=(Date.parse(ev.d)-Date.parse(t.from))/864e5/7;if(wks>m.topMax){m.topMax=wks;m.topEx=ev.name;}}
      else delete m.top[kk];}
    if(ev.type==='session'){const S=ev.s,bl=S.blocks;
      if(STR.includes(ev.id)){const ac=k.accNow(),c=k.ctx(ev.d),A=m.acc[ac]||(m.acc[ac]={n:0,sets:0,reps:0,mid:0,mn:0});A.n++;
        bl.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(it.gone||it.f||it.iso||it.test)return;const ns=k.setsOf(it,b,c,ev.id);A.sets+=ns;if(it.lo&&it.hi)A.reps+=ns*(it.lo+it.hi)/2;const v=k.curVar(it,k.LOC());if(v>=0&&it.k&&k.wOn(it,v)&&it.hi>it.lo){A.mid+=(it.lo+it.hi)/2;A.mn++;}});});
        const wi=bl.findIndex(b=>b.warm),ci=bl.findIndex(b=>b.cool);
        const lo=D.short?0:p.loc==='h'?45:(k.day().ready===3||D.hold.str)?45:60;if(S.min<lo||S.min>90||wi!==0||ci!==bl.length-1){m.dur++;if(!m.durEx)m.durEx=ev.d+' '+ev.id+' '+S.min+' min'+(wi!==0?' no warm-up first':'')+(ci!==bl.length-1?' no cool-down last':'');}}
      if(STR.includes(ev.id)){const bn=k.blkNo(ev.d),Bs=m.blkN[bn]||(m.blkN[bn]=new Set());bl.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(it.gone||it.f||it.iso||it.test)return;const v=k.curVar(it,k.LOC());if(v>=0)Bs.add(it.opts[v].n);});});}
      const ns=m.names[Q]||(m.names[Q]={all:new Set(),neu:0,fr:new Set()});bl.forEach(b=>b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,k.LOC());if(v<0)return;const n=it.opts[v].n;ns.all.add(n);
        /* new = never shown before or absent for at least 12 weeks (A-043: a rotation set returns after two blocks) */
        const lu=m.lastUse[n];if((lu==null||ev.i-lu>=84)&&!ns.fr.has(n)){ns.fr.add(n);ns.neu++;}m.lastUse[n]=ev.i;if(!seen.has(n))seen.add(n);}));}
    if(ev.type==='run'){if(ev.id==='RI'){const ph=k.runPh(ev.d),F=m.ri[ph]||(m.ri[ph]=new Set());F.add(k.riForm(ev.d));}m.km[Q]=(m.km[Q]||0)+ev.km;if(ev.id==='RH')m.long[Q]=Math.max(m.long[Q]||0,ev.km);const ph=k.runPh(ev.d),R=m.rph[ph]||(m.rph[ph]={km:0,rh:0,nr:0});R.km+=ev.km;if(ev.id==='RH'){R.rh+=ev.km;R.nr++;}}
    /* week preview: mean of weeks 12–15 against the mean of the last 4 weeks (both a mix of normal and deload weeks) */
    if(ev.type==='day'){const pd=k.runPh(ev.d);m.phd[pd]=(m.phd[pd]||0)+1;if([83,90,97,104].includes(ev.i))m.wkA.push(wkTime(k));if([DAYS-29,DAYS-22,DAYS-15,DAYS-8].includes(ev.i))m.wkB.push(wkTime(k));if(m.rankWk==null&&k.xpTotal()>=16000)m.rankWk=Math.floor(ev.i/7)+1;
      if(ev.i%7===6){const u=k.lvUp(),l=k.lvLo(),wk=Math.floor(ev.i/7)+1;if(m.lvW[0]==null&&u>m.lv0[0])m.lvW[0]=wk;if(m.lvW[1]==null&&l>m.lv0[1])m.lvW[1]=wk;}}},{w0:W0,day:course==='mix'?mixDay:null});
  const mean=a=>a.reduce((x,y)=>x+y,0)/(a.length||1);m.wkW12=mean(m.wkA);m.wkW104=mean(m.wkB);
  /* the stone: the same final state with 2 years of history against only its last 12 weeks (same day, same plan),
     alternating, the median of 5 rounds each (each round a median of 15 runs) */
  /* A-057 a: the plan of the day stays the same – Home strength A/B alternates by the number of home sessions, so the cut keeps
     its parity; the plan (unit and estimate per day) of both states is recorded and must match */
  const full=JSON.stringify(D),td=k.today(),lim=addD(td,-84),sig=()=>k.weekPlan().map(e=>e.id+(e.leg?'L':'')+(e.dl?'D':'')+(e.rest?'R':'')).join(' '),one=tr=>{const S=JSON.parse(full);if(tr){const cut=S.logs.filter(l=>l.d<lim),ho=cut.filter(l=>l.id==='HO'),wk={},keep=[];cut.forEach(l=>{if(!TRN(l))return;const w=Math.floor((Date.parse(l.d)-Date.parse(S.start))/6048e5);if(!wk[w]){wk[w]=1;keep.push(l);}});
      /* one training entry per older training week keeps the cycle week (accent, deload); the number of home sessions keeps its parity (Home A/B) */
      if(keep.filter(l=>l.id==='HO').length%2!==ho.length%2){const x=ho.find(l=>!keep.includes(l));if(x)keep.push(x);else keep.splice(keep.indexOf(ho[0]),1);}
      S.logs=keep.sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0).concat(S.logs.filter(l=>l.d>=lim));}k.setD(S);k.today(td);k.hist(td);const t=wkTime(k);m[tr?'sigA':'sigB']=sig();return t;};
  const A=[],B=[],med=a=>a.slice().sort((x,y)=>x-y)[Math.floor(a.length/2)];for(let r=0;r<5;r++){A.push(one(true));B.push(one(false));}m.wk12=med(A);m.wkEnd=med(B);k.setD(JSON.parse(full));k.today(td);
  D.logs.forEach(l=>{if(!l.vs||l.bl)return;const Q=q(Math.round((Date.parse(l.d)-Date.parse(START))/864e5));m.sets[Q]=(m.sets[Q]||0)+Object.values(l.vs).reduce((a,b)=>a+b,0);});
  const fin=k.D().ex;const und=Object.keys(m.w0).filter(q=>fin[q]&&fin[q].w>0&&fin[q].w<m.w0[q]);m.wRs=und.filter(q=>!m.dn[q]).length;m.wUnder=und.filter(q=>m.dn[q]).map(q=>(fin[q].n||q)+' '+fin[q].w+' < '+m.w0[q]+', first lower target '+m.dn[q]);m.wN=Object.keys(m.w0).filter(q=>fin[q]&&fin[q].w>0).length;
  m.lvl=k.lvl();m.lv1=[k.lvUp(),k.lvLo()];m.runKm=D.runKm;m.runI=D.runI;m.logs=D.logs.length;return m;}
const fmtQ=(a,f)=>Array.from({length:Math.ceil(DAYS/91)},(_,i)=>f(a[i]||0)).join(' ');
function stone(x,ok,val){const st=ok?'ok':(sharp(x)?'FAIL':'open');return x+' '+st+' ('+val+')';}
const t0=Date.now();
PROF.concat([BEG,HOME]).filter(p=>!ONLY.length||ONLY.some(o=>p.n.toLowerCase().includes(o.toLowerCase()))).forEach(p=>{
  (p.n==='Home'?['mix']:p.n==='Captain'?['prog','still','mix']:['prog','still']).forEach(course=>{const a=Date.now(),m=one(p,course),tag=p.n+' · '+({prog:'progress',still:'standstill',mix:'mixed'})[course];
    const nq=m.names.slice(1).map(x=>x?x.neu:0);const NB=m.blkN,bk=Object.keys(NB).map(Number).sort((a,b)=>a-b),shr=(b,c,f)=>{const S=NB[b];return S&&NB[c]&&S.size?[...S].filter(n=>f(NB[c].has(n))).length/S.size:null;};
    const avg=a=>{a=a.filter(x=>x!=null);return a.length?a.reduce((x,y)=>x+y,0)/a.length:0;},nPrev=avg(bk.map(b=>shr(b,b-1,h=>!h))),nRep3=avg(bk.map(b=>shr(b,b-3,h=>h))),nPh=avg(bk.map(b=>shr(b,b-2,h=>!h)));
    /* thresholds: with rotation same-phase 11–21 %, without rotation 2–5 % (A-054 calibration) */
    const namesOk=bk.length>=4&&nPh>=0.08&&nPrev>=0.25&&nRep3>=0.5;
    const kmw=m.km.map(x=>x/13),kmQ=kmw.slice(1),lgQ=m.long.slice(1);const chg=a=>a.length>1&&a.some((x,i)=>i>0&&Math.abs(x-a[i-1])/(a[i-1]||1)>=0.1);
    /* A-044: compared per run season (base, build, tempo, hold): weekly km and the mean long run differ by ≥ 10 % */
    const PH=['base','build','tempo','hold'].filter(x=>m.rph[x]&&m.phd[x]),pkm=PH.map(x=>m.rph[x].km/(m.phd[x]/7)),plg=PH.filter(x=>m.rph[x].nr).map(x=>m.rph[x].rh/m.rph[x].nr);
    const spread=a=>a.length>1&&(Math.max(...a)-Math.min(...a))/(Math.min(...a)||1)>=0.1;
    /* A-054: not by the hold factor alone – the other seasons differ by ≥ 5 % too, or the tempo season changes its interval form */
    const PHn=PH.filter(x=>x!=='hold'),sp5=a=>a.length>1&&(Math.max(...a)-Math.min(...a))/(Math.min(...a)||1)>=0.05,nkm=PHn.map(x=>m.rph[x].km/(m.phd[x]/7)),nlg=PHn.filter(x=>m.rph[x].nr).map(x=>m.rph[x].rh/m.rph[x].nr),riT=m.ri.tempo?m.ri.tempo.size:0;
    const runOk=!kmQ.length||(spread(pkm)&&spread(plg)&&(sp5(nkm)||sp5(nlg)||riT>=3));const phTxt=PH.map(x=>x+' '+(m.rph[x].km/(m.phd[x]/7)).toFixed(1)+' km/wk'+(m.rph[x].nr?' long '+(m.rph[x].rh/m.rph[x].nr).toFixed(1):'')).join(' · ');const runner=p.focus==='run'||kmQ.some(x=>x>0);
    const rat=m.wk12?m.wkEnd/m.wk12:0,wkOk=rat<=2;
    const lvNeed=course==='prog'&&(p.n==='Beginner'||/^Partner/.test(p.n)),lvOk=m.lv1[1]>m.lv0[1];
    const lvTxt='upper '+m.lv0[0]+' → '+m.lv1[0]+(m.lvW[0]?' (week '+m.lvW[0]+')':'')+' · lower '+m.lv0[1]+' → '+m.lv1[1]+(m.lvW[1]?' (week '+m.lvW[1]+')':'');
    const AC=['base','str','vol','skill'].filter(a=>m.acc[a]&&m.acc[a].n>=3),ms=a=>m.acc[a].sets/m.acc[a].n,mr=a=>m.acc[a].reps/m.acc[a].n,mm=a=>m.acc[a].mn?m.acc[a].mid/m.acc[a].mn:0;
    const rv=AC.map(mr),blkOk=AC.length>=3&&(Math.max(...rv)-Math.min(...rv))/(Math.min(...rv)||1)>=0.05&&(!m.acc.str||!m.acc.vol||!m.acc.str.mn||!m.acc.vol.mn||mm('str')<mm('vol'));
    const blkTxt=AC.map(a=>a+' '+m.acc[a].n+'× '+ms(a).toFixed(1)+' sets '+Math.round(mr(a))+' reps'+(m.acc[a].mn?' mid '+mm(a).toFixed(1):'')).join(' · ');
    const res=[stone('under',m.under===0,m.under+(m.underEx?', e.g. '+m.underEx:'')),stone('dur',m.dur===0,m.dur+(m.durEx?', e.g. '+m.durEx:'')),
      stone('top',m.topMax<=12,'max '+m.topMax.toFixed(1)+' weeks'+(m.topEx?' '+m.topEx:'')),p.loc==='h'?'names info (rotation is a gym feature; '+Math.round(nPh*100)+' % new against the block two back)':stone('names',namesOk,'other names than the block before '+Math.round(nPrev*100)+' % (≥ 25), repeated after 3 blocks '+Math.round(nRep3*100)+' % (≥ 50), new against the block two back (same phase, rotation) '+Math.round(nPh*100)+' % (≥ 8) · info: new per quarter '+nq.join(' ')),
      runner?stone('run',runOk,phTxt+' · without hold: km '+(sp5(nkm)?'≥':'<')+' 5 %, long '+(sp5(nlg)?'≥':'<')+' 5 %, interval forms in tempo '+riT+' · per quarter km/week '+fmtQ(kmw,x=>x.toFixed(1))+' · long run '+fmtQ(m.long,x=>x)):'run n/a (no runs)',
      course==='prog'?stone('start',!m.wUnder.length,m.wUnder.length+' of '+m.wN+' weighted exercises under their start weight by a lower target that was no reaction to the logged values · '+m.wRs+' under start only through stall resets or a value under the range (P-5)'+(m.wUnder.length?', e.g. '+m.wUnder.slice(0,3).join('; '):'')):'start info ('+m.wUnder.length+' of '+m.wN+' under start)',
      lvNeed?stone('lvl',lvOk,lvTxt):'lvl info ('+lvTxt+')',stone('blk',blkOk,blkTxt),
      p.loc==='h'?stone('wkh',wkOk&&m.sigA===m.sigB,'home week preview with an unchanged plan (same unit and day type every day) '+m.wk12.toFixed(1)+' ms → '+m.wkEnd.toFixed(1)+' ms, × '+rat.toFixed(2)+' (≤ 2, median of 5)'+(m.sigA===m.sigB?'':' · plans differ: '+m.sigA+' | '+m.sigB)):stone('wk',wkOk,'week preview of the final day '+m.wk12.toFixed(1)+' ms with the last 12 weeks → '+m.wkEnd.toFixed(1)+' ms with '+WEEKS+' weeks of history, × '+rat.toFixed(2)+' · info: weeks 12–15 '+m.wkW12.toFixed(1)+' ms, weeks '+(WEEKS-3)+'–'+WEEKS+' '+m.wkW104.toFixed(1)+' ms')];
    if(course==='mix'&&DAYS>PZ1+21){const X=m.mx,med=a=>a&&a.length?a.slice().sort((x,y)=>x-y)[Math.floor(a.length/2)]:0,pre=X.re?(med(X.pre[X.re.id])||med([].concat(...Object.values(X.pre)))):0,reOk=!!X.re&&X.re.low&&!X.re.hi,mr=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):'–';
      res.push(stone('mix',!X.bad.length&&reOk&&X.n>=10&&X.run.length>0&&X.sk>0,X.n+' tired/hold sessions, sets ratio mean '+mr(X.ratio)+' · hold running ratio '+mr(X.run)+' ('+X.run.length+' runs: '+X.rs.slice(0,6).join(', ')+') · skill blocks on hold '+X.sk+' · re-entry '+(X.re?X.re.d+' '+X.re.id+' '+X.re.w+' sets ('+pre+' before), comeback '+X.re.low+', circuits over the low count '+X.re.hi:'none')+(X.bad.length?' · '+X.bad.length+' issues, e.g. '+X.bad.slice(0,process.env.KZ_ALL?99:3).join('; '):'')));}
    res.forEach(r=>{if(/ FAIL /.test(r))issue(tag+': '+r);});
    out.push('### '+tag+' ('+((Date.now()-a)/1000).toFixed(0)+' s, '+m.logs+' entries)');res.forEach(r=>out.push('  '+r));
    out.push('  sets/week per quarter '+fmtQ(m.sets,x=>Math.round(x/13))+' · level '+m.lvl+' · highest rank week '+(m.rankWk||'–')+' · runKm '+m.runKm+' · intervals '+m.runI);});});
console.log('--- t49 longterm: '+WEEKS+' weeks from '+START+', active orders '+ACTIVE.join(', ')+' ('+((Date.now()-t0)/1000).toFixed(0)+' s) ---');
out.forEach(l=>console.log(l));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
