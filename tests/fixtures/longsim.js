// Long simulation for t49 (A-030b, model of A-030a): every day follows recAll; strength through saveTrain, runs through
// saveRun with the planned distance (runPlan), kickboxing/rest as plain logs, morning routine on 5 days a week.
// Course "prog" (progress): the app's target is hit with a rate falling from 90 % to 45 % (else the last value is
// repeated), an offered next variation is taken every second time, test values rise fast at first, then rarely, easy
// runs are often rated "Easy"; the Core Blitz is done with the session (A-051: it counts for the core pattern); an offered ladder rung (A-039) is taken every second time, the load rung logs a weight. Course "still" (standstill): always the last value, runs always "Fine".
// cb(ev) receives {type:'target'|'session'|'run'|'day', …} for the measurements of t49. A-054: opts.day(k,i,s) runs before each
// day (Tired, Hold, Limited time, pause …), opts.w0(key) gives the first weight of a weighted exercise (default 20 kg).
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
function rng(seed){let x=seed>>>0||1;return()=>{x^=x<<13;x>>>=0;x^=x>>17;x^=x<<5;x>>>=0;return (x%100000)/100000;};}
function train(k,id,s,i,days,course,rnd,cb,o){o=o||{};const D=k.D(),dy=k.day(),loc=k.LOC();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(s),S=k.S(id,c);
  const hit=0.9-0.45*(i/days),pTest=i<84?0.8:0.1,swaps=[],lads=[];
  if(cb)cb({type:'session',d:s,id,s:S,i});
  if(S.ab)dy.done['abs-T']=true;
  S.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.gone)return;const v=k.curVar(it,loc);if(v<0)return;const key=id+'-'+bix+'-'+ii;dy.done[key]=true;
    if(it.f||it.iso)return;const n=k.setsOf(it,b,c,id);
    if(it.test){const t=it.test,cur=D.profile[t]||0;const val=course==='prog'?cur+(rnd()<pTest?1:0):Math.max(cur,1);dy.inp[key]={s:[String(val)]};return;}
    const g=k.target(it,v),st=D.ex[it.k+'#'+v],w=it.opts[v].w||g.wl;
    if(cb)cb({type:'target',d:s,id,it,v,g,st,i,nv:g.top?k.nextVar(it,v,loc):-1,name:it.opts[v].n});
    let r=g.r,wt=g.w||(w?(o.w0?o.w0(it.k+'#'+v):20):0);
    if(st&&(course==='still'||rnd()>hit)){r=st.r;wt=st.w||wt;}
    dy.inp[key]={s:Array(n).fill(String(r)),w:w?String(wt):''};
    /* A-060: a test merged into this slot (it.tsv): set 1 is the trial, like a test item (rises fast at first, then rarely), never under the set value */
    if(it.tsv){const cur=D.profile[it.tsv.t]||0;dy.inp[key].s[0]=String(it.tsv.tvo?r+(course==='prog'&&rnd()<pTest?2:1):Math.max(course==='prog'?cur+(rnd()<pTest?1:0):Math.max(cur,1),r));}
    if(course==='prog'&&g.top&&!w){const nv=k.nextVar(it,v,loc);if(nv>=0&&rnd()<0.5)swaps.push([loc+'|'+(it.k||it.iso||it.test),nv]);else if(g.lad&&rnd()<0.5)lads.push([it,v]);}});});
  k.saveTrain();swaps.forEach(([q,nv])=>{D.vr[q]=nv;});lads.forEach(([it,v])=>{if(k.ladTake)k.ladTake(it,v);});return S;}
function run(k,id,s,i,days,course,rnd,cb){const D=k.D(),dy=k.day();dy.run=id;const km=k.runPlan(id,s).km||5;
  const easy=course==='prog'&&id!=='RI'&&rnd()<0.6-0.4*(i/days);const pace=course==='prog'?6.6-0.6*(i/days):6.6;
  dy.fin={rpe:easy?4:6,km:String(km),min:String(Math.round(km*pace*10)/10)};k.saveRun();if(cb)cb({type:'run',d:s,id,km,i});}
function longSim(k,days,start,course,seed,cb,o){o=o||{};const D=k.D(),rnd=rng(seed);
  for(let i=0;i<days;i++){const s=addD(start,i);k.today(s);if(o.day)o.day(k,i,s);const r=k.recAll(s,false)||{};
    if(r.btn==='pause'){}
    else if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6,min:90});
    else if(r.btn==='run')run(k,r.id,s,i,days,course,rnd,cb);
    else if(r.id==='RS'||!r.id)D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
    else train(k,r.id,s,i,days,course,rnd,cb,o);
    if(i%7<5)D.logs.push({d:s,id:'MO',t:'MO'});
    if(cb)cb({type:'day',d:s,i,r});}}
module.exports={longSim,addD,rng};
