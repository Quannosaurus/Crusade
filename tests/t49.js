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
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const ACTIVE=['A-030b','A-037','A-038','A-039','A-041','A-042','A-043','A-044','A-051'];
const STONE={dur:'A-030b',under:'A-037',wk:'A-038',top:'A-039',lvl:'A-041',blk:'A-042',names:'A-043',run:'A-044',start:'A-051'};
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
  const wk=Math.floor(i/7);D.hold.str=D.hold.run=wk>=40&&wk<46;if(wk===46&&i%7===0)D.holdR=s;if(i===420)D.pause={from:s,to:addD(s,13),why:'ill'};if(i===434)D.pause=null;}
const W0=key=>/^(g_ht|gl_ht|c_sq|gl_sq)#/.test(key)?40:20;
function wkTime(k){const t=[];for(let j=0;j<15;j++){k.WK.plan=null;k.WK.key='';const a=process.hrtime.bigint();k.weekPlan();t.push(Number(process.hrtime.bigint()-a)/1e6);}
  return t.sort((a,b)=>a-b)[7];}
function one(p,course){const {k}=boot();setup(k,p);const D=k.D();const q=i=>Math.floor(i/91);
  const m={under:0,underEx:'',dur:0,durEx:'',top:{},topMax:0,topEx:'',names:[],km:[],long:[],sets:[],wk12:0,wkEnd:0,wkA:[],wkB:[],rankWk:null};
  m.acc={};m.blkN={};m.ri={};m.lastUse={};m.w0={};m.dn={};m.rs={};m.rph={};m.phd={};const seen=new Set();m.lv0=[k.lvUp(),k.lvLo()];m.lvW=[null,null];
  longSim(k,DAYS,START,course==='mix'?'prog':course,7+p.n.length,ev=>{const Q=q(ev.i);
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
  const full=JSON.stringify(D),td=k.today(),lim=addD(td,-84),one=tr=>{const S=JSON.parse(full);if(tr)S.logs=S.logs.filter(l=>l.d>=lim);k.setD(S);k.today(td);k.hist(td);return wkTime(k);};
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
      p.loc==='h'?'wk info (× '+rat.toFixed(2)+'; the 12-week state plans other home sessions than the full history)':stone('wk',wkOk,'week preview of the final day '+m.wk12.toFixed(1)+' ms with the last 12 weeks → '+m.wkEnd.toFixed(1)+' ms with '+WEEKS+' weeks of history, × '+rat.toFixed(2)+' · info: weeks 12–15 '+m.wkW12.toFixed(1)+' ms, weeks '+(WEEKS-3)+'–'+WEEKS+' '+m.wkW104.toFixed(1)+' ms')];
    res.forEach(r=>{if(/ FAIL /.test(r))issue(tag+': '+r);});
    out.push('### '+tag+' ('+((Date.now()-a)/1000).toFixed(0)+' s, '+m.logs+' entries)');res.forEach(r=>out.push('  '+r));
    out.push('  sets/week per quarter '+fmtQ(m.sets,x=>Math.round(x/13))+' · level '+m.lvl+' · highest rank week '+(m.rankWk||'–')+' · runKm '+m.runKm+' · intervals '+m.runI);});});
console.log('--- t49 longterm: '+WEEKS+' weeks from '+START+', active orders '+ACTIVE.join(', ')+' ('+((Date.now()-t0)/1000).toFixed(0)+' s) ---');
out.forEach(l=>console.log(l));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
