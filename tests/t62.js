// @name planned-absence
// A-051 (H-1): a step back only for a real pause of the movement pattern. Synthetic histories: a deload week and a test
// week count for no gap; an exercise that rests while another exercise of its pattern keeps training (lat pulldown rests,
// weighted pull-ups go on) gets no step back, its weight holds and its reps go at most 1 down; a rotation set and a
// phase change likewise; a pattern-free exercise rests while other training goes on: no step back; a real pause of the
// whole pattern (and of all training for a pattern-free exercise) still steps back. 20-week Captain run with every target
// hit (two deload weeks, two phase changes, rotation): no pause-rule step back, no falling weight between two sessions of
// a variant and no weight under its start, except a planned lighter weight for a new block range (volume block) or a stall reset.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {addD}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz};}
const S0='2026-06-01',J=JSON.stringify;
const back=g=>/(one step|two steps) back/.test(g.note||'');
/* logs: [date, {key#v:[reps,kg]}, id] → D.logs, D.ex from the newest entry per key */
function hist(k,rows,start){const D=k.D();D.start=start||S0;D.logs=rows.map(([d,ex,id])=>({d,id:id||'KA',t:'A',rpe:6,ex})).sort((a,b)=>a.d<b.d?-1:1);D.ex={};
  D.logs.forEach(l=>{Object.keys(l.ex||{}).forEach(q=>{D.ex[q]={r:l.ex[q][0],w:l.ex[q][1],d:l.d,hold:false,n:q,stall:0};});});D.kitD={};D.pause=null;D.pauseH=[];}
const days=(from,step,n)=>Array.from({length:n},(_,i)=>addD(from,i*step));
{const {k}=boot();const D=k.D();Object.assign(D,{onb:true,logs:[]});
  const lat=k.P('a_lat',10,12,'reps','',['Cable straight-arm pulldown||w']),wpu=k.P('a2_wpu',6,9,'reps','',['Weighted pull-ups|g|w']),fp=k.P('sh_fp',10,15,'reps','',['Cable face pulls|g|w']);
  const TD=addD(S0,7*6+2);k.today(TD); // Wednesday of the 7th training week; week 6 (days 35–41) is the deload/test week
  // 1 deload week: the pull pattern weekly until week 5, nothing in the deload week (only a deload session without it) → gap 16 − 7
  const wk5=days(S0,7,5),dl=addD(S0,36);
  hist(k,wk5.map(d=>[d,{'a_lat#0':[10,30]}]).concat([[dl,{},'DL']]));
  if(!k.dlDay(dl)||k.dlDay(addD(S0,34))||k.dlDay(TD))issue('deload days: '+[k.dlDay(addD(S0,34)),k.dlDay(dl),k.dlDay(TD)].join(','));
  let g=k.target(lat,0);if(back(g)||g.w<30)issue('deload week counted as a gap: '+J(g));rep.push('deload week: gap '+k.gapDays(wk5[4],TD)+' days without the deload week → '+g.r+' × '+g.w+' kg ('+g.note+')');
  // 2 test week: the same with a test session in week 6
  hist(k,wk5.map(d=>[d,{'a_lat#0':[10,30]}]).concat([[dl,{},'TE']]));g=k.target(lat,0);if(back(g)||g.w<30)issue('test week counted as a gap: '+J(g));
  // without the week-6 exclusion the same gap is a real pause: a start after the history puts no deload week in between
  hist(k,wk5.map(d=>[d,{'a_lat#0':[10,30]}]),TD);g=k.target(lat,0);if(!back(g))issue('16 days without the pattern and no deload week: no step back ('+g.note+')');
  // 3 exercise rests, another exercise of the pattern goes on (lat pulldown rests 30 days, weighted pull-ups every 3–4 days)
  const lt=days(addD(TD,-58),7,5),pu=days(addD(TD,-58),4,15);
  hist(k,lt.map(d=>[d,{'a_lat#0':[11,30]}]).concat(pu.map(d=>[d,{'a2_wpu#0':[7,10]}])),TD);g=k.target(lat,0);
  if(back(g)||g.w!==30||g.r<10)issue('lat pulldown rests, pull-ups go on: '+J(g));
  if(!/Back after/.test(g.note||''))issue('return after rest: no note ('+g.note+')');
  rep.push('lat pulldown rests '+k.gapDays(lt[4],TD)+' days, weighted pull-ups go on → '+g.r+' × '+g.w+' kg ('+g.note+')');
  // 4 phase change: Phase-1 exercise rests 6 weeks (51 days) while the pattern trains in Phase 2 → weight holds, −1 rep at most
  const ph=days(addD(TD,-100),7,7);hist(k,ph.map(d=>[d,{'a_lat#0':[12,35]}]).concat(days(addD(TD,-50),3,16).map(d=>[d,{'a2_wpu#0':[8,15]}])),TD);
  g=k.target(lat,0);if(back(g)||g.w!==35||g.r<11)issue('phase change: '+J(g));rep.push('phase change after '+k.gapDays(ph[6],TD)+' days → '+g.r+' × '+g.w+' kg');
  // 5 rotation set returns after 2 blocks (84 days), the pull pattern goes on
  const ri=(k.favCatalog&&Object.values(k.favCatalog()).map(x=>x.it).find(it=>it.k==='r_ur1'))||null;
  if(!ri)issue('rotation item r_ur1 not in the catalogue');else{const rv=0;
    hist(k,days(addD(TD,-130),7,6).map(d=>[d,{['r_ur1#'+rv]:[ri.lo+1,20]}]).concat(days(addD(TD,-84),3,28).map(d=>[d,{'a2_wpu#0':[7,10]}])),TD);
    g=k.target(ri,rv);if(back(g)||(ri.opts[rv].w&&g.w!==20)||g.r<ri.lo)issue('rotation set returns: '+J(g));rep.push('rotation set r_ur1 back after 84+ days → '+g.r+(g.w?' × '+g.w+' kg':''));}
  // 6 a real pause of the whole pattern: pull every 3 days, then 30 days nothing → step back with weight down
  hist(k,days(addD(TD,-60),3,10).map((d,i)=>[d,i%2?{'a2_wpu#0':[7,10]}:{'a_lat#0':[11,30]}]),TD);g=k.target(lat,0);
  if(!back(g)||!(g.w<30))issue('real pause of the pull pattern: '+J(g));rep.push('real pause of the pull pattern ('+k.gapDays(addD(TD,-33),TD)+' days) → '+g.r+' × '+g.w+' kg ('+g.note+')');
  // 7 pattern-free exercise (face pulls): rests 30 days while training goes on → no step back; all training stops → step back
  hist(k,days(addD(TD,-70),7,6).map(d=>[d,{'sh_fp#0':[12,20]}]).concat(days(addD(TD,-40),3,13).map(d=>[d,{'a2_wpu#0':[7,10]}])),TD);
  g=k.target(fp,0);if(back(g)||g.w!==20)issue('face pulls rest, training goes on: '+J(g));
  hist(k,days(addD(TD,-70),3,14).map(d=>[d,{'sh_fp#0':[12,20]}]),TD);g=k.target(fp,0);if(!back(g))issue('face pulls, all training paused 31 days: no step back ('+g.note+')');
  if(k.patGrp('a_lat')!=='@pull'||k.patGrp('mx_a2_wpu')!=='@pull'||k.patGrp('sh_fp')!=='@all')issue('pattern groups: '+[k.patGrp('a_lat'),k.patGrp('mx_a2_wpu'),k.patGrp('sh_fp')]);}
// 8 20-week Captain run, every target hit: no pause-rule step back, weights never under their start and never falling
{const {k}=boot();const D=k.D();const p=PROF.find(x=>x.n==='Captain'),ST='2026-11-16';
  Object.assign(D.profile,p.prof||{});D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:ST,short:false,fav:(p.fav||[]).slice()});k.today(ST);
  const W0={},WL={},PL={};let backs=0,bex='',fall=0,fex='',rets=0;
  for(let i=0;i<140;i++){const s=addD(ST,i);k.today(s);const r=k.recAll(s,false)||{};
    if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6,min:90});
    else if(r.btn==='run'){const dy=k.day();dy.run=r.id;const km=k.runPlan(r.id,s).km||5;dy.fin={rpe:5,km:String(km),min:String(km*6)};k.saveRun();}
    else if(r.id==='RS'||!r.id)D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
    else{const id=r.id,dy=k.day(),loc=k.LOC();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(s),S=k.S(id,c);
      S.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.gone)return;const v=k.curVar(it,loc);if(v<0)return;const key=id+'-'+bix+'-'+ii;dy.done[key]=true;
        if(it.f||it.iso)return;const n=k.setsOf(it,b,c,id);if(it.test){dy.inp[key]={s:[String((D.profile[it.test]||0)+1)]};return;}
        const g=k.target(it,v),wf=it.opts[v].w||g.wl,q=it.k+'#'+v;if(back(g)){backs++;if(!bex)bex=s+' '+it.opts[v].n+': '+g.note;}if(g.ret)rets++;
        const wt=g.w||(wf?20:0);if(wf&&wt>0){if(W0[q]==null)W0[q]=wt;if(WL[q]!=null&&wt<WL[q]-1e-9&&(g.reset||g.rng))PL[q]=1;if(WL[q]!=null&&wt<WL[q]-1e-9&&!g.reset&&!g.rng){fall++;if(!fex)fex=s+' '+it.opts[v].n+' '+WL[q]+' → '+wt+' ('+g.note+')';}WL[q]=wt;}
        dy.inp[key]={s:Array(n).fill(String(g.r)),w:wf?String(wt):''};});});
      k.saveTrain();}
    if(i%7<5)D.logs.push({d:s,id:'MO',t:'MO'});}
  const under=Object.keys(WL).filter(q=>WL[q]<W0[q]&&!PL[q]),pl=Object.keys(PL).length;
  rep.push('Captain 20 weeks, every target hit: pause-rule step backs '+backs+', returns after rest '+rets+', falling weights '+fall+', weights under start '+under.length+' of '+Object.keys(WL).length+' (planned lighter for a new block range or after 3 stalls: '+pl+')');
  if(backs)issue('Captain 20 weeks: '+backs+' pause-rule step backs without a pause, e.g. '+bex);
  if(fall)issue('Captain 20 weeks: '+fall+' falling weights, e.g. '+fex);
  if(under.length)issue('Captain 20 weeks: weights under start: '+under.join(', '));}
console.log('--- t62 planned-absence ---');rep.forEach(x=>console.log(x));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
