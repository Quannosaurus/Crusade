// Shared plan invariants (A-034): checked on simulated sessions instead of relying on a snapshot alone.
// - every strength session (Strength A/B/C, Skill Trial, home) is estimated at 60–90 min (not with Limited time),
//   warm-up first, cool-down last;
// - every pattern exercise keeps at least 2 working sets;
// - tolerance rule of the control station (A-026): the training-week average of every pattern lies inside its band
//   (core: only the upper limit), a 7-day peak may reach the upper limit + 2 for an emphasis/goal pattern and + 4 for
//   the others.
const V=['pull','push','legs','hinge','core'];
const STR=['KA','KB','KC','CH','HO'];
const dayN=(d,start)=>Math.round((Date.parse(d)-Date.parse(start))/864e5);
function session(k,r,s,issue,pre){if(!r.s)return;const D=k.D(),bl=r.s.blocks;pre=pre||'';
  if(STR.includes(r.id)&&!D.short&&(r.min<60||r.min>90))issue(pre+s+' '+r.id+': estimated '+r.min+' min (60–90)');
  if(STR.includes(r.id)){const wi=bl.findIndex(b=>b.warm),ci=bl.findIndex(b=>b.cool);
    if(wi!==0)issue(pre+s+' '+r.id+': warm-up not first');if(ci!==bl.length-1)issue(pre+s+' '+r.id+': cool-down not last');}
  const c=k.ctx(s);bl.forEach(b=>{if(D.short&&b.p>1)return;b.items.forEach(it=>{if(it.gone||!k.itPat(it)||k.curVar(it,k.LOC())<0)return;const n=k.setsOf(it,b,c,r.id);
    if(n<2)issue(pre+s+' '+r.id+' '+it.k+': '+n+' working set(s), floor is 2');});});}
// Band per pattern from the app (state at the end of the run); hot = the 12–20 band of an emphasis/goal pattern.
function tolerance(k,start,days,issue,pre,out){const D=k.D();pre=pre||'';const wk={};
  D.logs.forEach(l=>{const w=Math.floor(dayN(l.d,start)/7);const x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs&&!l.bl)V.forEach(q=>x[q]+=l.vs[q]);});
  const full=Math.floor(days/7),tw=Object.keys(wk).filter(w=>!wk[w].dl&&+w<full);const sum=[];
  V.forEach(q=>{const [lo,hi]=k.vBand(q),hot=hi>=20,tol=hot?2:4;let peak=0;
    for(let i=6;i<days;i++){let h=0;D.logs.forEach(l=>{const x=dayN(l.d,start);if(x>i-7&&x<=i&&l.vs&&!l.bl)h+=l.vs[q];});peak=Math.max(peak,h);}
    const avg=tw.reduce((a,w)=>a+wk[w][q],0)/(tw.length||1);sum.push(q+' '+avg.toFixed(1)+'/'+peak+' ('+lo+'–'+hi+')');
    if(q!=='core'&&peak>hi+tol)issue(pre+q+' '+peak+' sets in 7 days (> '+hi+' + '+tol+')');
    if(q==='core'&&peak>hi+tol)issue(pre+'core '+peak+' sets in 7 days (> '+hi+' + '+tol+')');
    if(q!=='core'&&avg<lo)issue(pre+q+' average '+avg.toFixed(1)+' per training week under the band ('+lo+')');
    if(avg>hi)issue(pre+q+' average '+avg.toFixed(1)+' per training week over the band ('+hi+')');});
  if(out)out.push(pre+sum.join(' | '));}
module.exports={session,tolerance,V,STR};
