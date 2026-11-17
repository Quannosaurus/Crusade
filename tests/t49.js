// @name longterm
// @longrun
// A-030b: 104-week check stones of the long-term concept (docs/longterm-concept.md). 5 profiles (Captain, Partner
// lower, Partner glutes, Runner, beginner "Just starting" with glute emphasis) × 2 courses (progress, standstill),
// shared simulation tests/fixtures/longsim.js. Every check stone is measured and printed; a stone whose order is not
// done yet reports "open" instead of failing (ACTIVE lists the done orders). Own run: sh tests/longterm.sh.
// Stones: under = no target under the range of its exercise (A-037) · dur = every strength session 60–90 min with
// warm-up first and cool-down last (now) · top = no bodyweight exercise > 12 weeks at the top without an offered step
// (A-039) · names = new exercise names in every quarter (A-043) · run = weekly km and long run change between the phases
// (A-044) · wk = week preview after 2 years ≤ 2 × the time with 12 weeks (A-038; the final state with its whole history
// against the same state with only its last 12 weeks, so the plan of the day is the same; weeks 12–15 vs the last 4 weeks
// are printed as information).
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {longSim,addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const ACTIVE=['A-030b','A-037','A-038','A-039'];
const STONE={dur:'A-030b',under:'A-037',wk:'A-038',top:'A-039',names:'A-043',run:'A-044'};
const sharp=x=>ACTIVE.includes(STONE[x]);
const ONLY=process.argv.slice(2).filter(a=>!a.startsWith('-'));const WEEKS=+(process.argv.find(a=>/^--weeks=/.test(a))||'--weeks=104').split('=')[1];
const DAYS=WEEKS*7,START='2026-11-16',STR=['KA','KB','KC','CH','HO'];
const P=[];const issue=m=>P.push(m);const out=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz};}
const BEG={n:'Beginner',prof:null,startP:'s0',focus:'bal',emph:'glutes',skills:{},kick:[]};
function setup(k,p){const D=k.D();if(p.startP)D.startP=p.startP;
  Object.assign(D.profile,p.prof||{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15});D.focus=p.focus;D.emph=p.emph;
  D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:START,short:false,fav:(p.fav||[]).slice()});k.today(START);}
function wkTime(k){const t=[];for(let j=0;j<15;j++){k.WK.plan=null;k.WK.key='';const a=process.hrtime.bigint();k.weekPlan();t.push(Number(process.hrtime.bigint()-a)/1e6);}
  return t.sort((a,b)=>a-b)[7];}
function one(p,course){const {k}=boot();setup(k,p);const D=k.D();const q=i=>Math.floor(i/91);
  const m={under:0,underEx:'',dur:0,durEx:'',top:{},topMax:0,topEx:'',names:[],km:[],long:[],sets:[],wk12:0,wkEnd:0,wkA:[],wkB:[],rankWk:null};
  const seen=new Set();
  longSim(k,DAYS,START,course,7+p.n.length,ev=>{const Q=q(ev.i);
    if(ev.type==='target'){const {it,g,st,v}=ev;
      if(st&&st.r>=it.lo&&g.r<it.lo){m.under++;if(!m.underEx)m.underEx=ev.d+' '+ev.name+' '+g.r+' < '+it.lo;}
      const kk=it.k+'#'+v;if(!it.opts[v].w&&!g.wl&&g.top&&ev.nv<0&&!g.lad){const t=m.top[kk]||(m.top[kk]={from:ev.d});const wks=(Date.parse(ev.d)-Date.parse(t.from))/864e5/7;if(wks>m.topMax){m.topMax=wks;m.topEx=ev.name;}}
      else delete m.top[kk];}
    if(ev.type==='session'){const S=ev.s,bl=S.blocks;
      if(STR.includes(ev.id)){const wi=bl.findIndex(b=>b.warm),ci=bl.findIndex(b=>b.cool);
        if(S.min<60||S.min>90||wi!==0||ci!==bl.length-1){m.dur++;if(!m.durEx)m.durEx=ev.d+' '+ev.id+' '+S.min+' min'+(wi!==0?' no warm-up first':'')+(ci!==bl.length-1?' no cool-down last':'');}}
      const ns=m.names[Q]||(m.names[Q]={all:new Set(),neu:0});bl.forEach(b=>b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,k.LOC());if(v<0)return;const n=it.opts[v].n;ns.all.add(n);if(!seen.has(n)){seen.add(n);ns.neu++;}}));}
    if(ev.type==='run'){m.km[Q]=(m.km[Q]||0)+ev.km;if(ev.id==='RH')m.long[Q]=Math.max(m.long[Q]||0,ev.km);}
    /* week preview: mean of weeks 12–15 against the mean of the last 4 weeks (both a mix of normal and deload weeks) */
    if(ev.type==='day'){if([83,90,97,104].includes(ev.i))m.wkA.push(wkTime(k));if([DAYS-29,DAYS-22,DAYS-15,DAYS-8].includes(ev.i))m.wkB.push(wkTime(k));if(m.rankWk==null&&k.xpTotal()>=16000)m.rankWk=Math.floor(ev.i/7)+1;}});
  const mean=a=>a.reduce((x,y)=>x+y,0)/(a.length||1);m.wkW12=mean(m.wkA);m.wkW104=mean(m.wkB);
  /* the stone: the same final state with 2 years of history against only its last 12 weeks (same day, same plan),
     alternating, the lowest median of 4 rounds each */
  const full=JSON.stringify(D),td=k.today(),lim=addD(td,-84),one=tr=>{const S=JSON.parse(full);if(tr)S.logs=S.logs.filter(l=>l.d>=lim);k.setD(S);k.today(td);k.hist(td);return wkTime(k);};
  const A=[],B=[];for(let r=0;r<4;r++){A.push(one(true));B.push(one(false));}m.wk12=Math.min(...A);m.wkEnd=Math.min(...B);k.setD(JSON.parse(full));k.today(td);
  D.logs.forEach(l=>{if(!l.vs||l.bl)return;const Q=q(Math.round((Date.parse(l.d)-Date.parse(START))/864e5));m.sets[Q]=(m.sets[Q]||0)+Object.values(l.vs).reduce((a,b)=>a+b,0);});
  m.lvl=k.lvl();m.runKm=D.runKm;m.runI=D.runI;m.logs=D.logs.length;return m;}
const fmtQ=(a,f)=>Array.from({length:Math.ceil(DAYS/91)},(_,i)=>f(a[i]||0)).join(' ');
function stone(x,ok,val){const st=ok?'ok':(sharp(x)?'FAIL':'open');return x+' '+st+' ('+val+')';}
const t0=Date.now();
PROF.concat([BEG]).filter(p=>!ONLY.length||ONLY.some(o=>p.n.toLowerCase().includes(o.toLowerCase()))).forEach(p=>{
  ['prog','still'].forEach(course=>{const a=Date.now(),m=one(p,course),tag=p.n+' · '+(course==='prog'?'progress':'standstill');
    const nq=m.names.slice(1).map(x=>x?x.neu:0),namesOk=nq.length>0&&nq.every(n=>n>0);
    const kmw=m.km.map(x=>x/13),kmQ=kmw.slice(1),lgQ=m.long.slice(1);const chg=a=>a.length>1&&a.some((x,i)=>i>0&&Math.abs(x-a[i-1])/(a[i-1]||1)>=0.1);
    const runOk=!kmQ.length||(chg(kmQ)&&chg(lgQ));const runner=p.focus==='run'||kmQ.some(x=>x>0);
    const rat=m.wk12?m.wkEnd/m.wk12:0,wkOk=rat<=2;
    const res=[stone('under',m.under===0,m.under+(m.underEx?', e.g. '+m.underEx:'')),stone('dur',m.dur===0,m.dur+(m.durEx?', e.g. '+m.durEx:'')),
      stone('top',m.topMax<=12,'max '+m.topMax.toFixed(1)+' weeks'+(m.topEx?' '+m.topEx:'')),stone('names',namesOk,'new per quarter after Q1: '+nq.join(' ')),
      runner?stone('run',runOk,'km/week per quarter '+fmtQ(kmw,x=>x.toFixed(1))+' · long run '+fmtQ(m.long,x=>x)):'run n/a (no runs)',
      stone('wk',wkOk,'week preview of the final day '+m.wk12.toFixed(1)+' ms with the last 12 weeks → '+m.wkEnd.toFixed(1)+' ms with '+WEEKS+' weeks of history, × '+rat.toFixed(2)+' · info: weeks 12–15 '+m.wkW12.toFixed(1)+' ms, weeks '+(WEEKS-3)+'–'+WEEKS+' '+m.wkW104.toFixed(1)+' ms')];
    res.forEach(r=>{if(/ FAIL /.test(r))issue(tag+': '+r);});
    out.push('### '+tag+' ('+((Date.now()-a)/1000).toFixed(0)+' s, '+m.logs+' entries)');res.forEach(r=>out.push('  '+r));
    out.push('  sets/week per quarter '+fmtQ(m.sets,x=>Math.round(x/13))+' · level '+m.lvl+' · highest rank week '+(m.rankWk||'–')+' · runKm '+m.runKm+' · intervals '+m.runI);});});
console.log('--- t49 longterm: '+WEEKS+' weeks from '+START+', active orders '+ACTIVE.join(', ')+' ('+((Date.now()-t0)/1000).toFixed(0)+' s) ---');
out.forEach(l=>console.log(l));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
