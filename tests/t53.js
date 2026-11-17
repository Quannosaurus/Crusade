// @name next-goal
// A-040: next goal and standstill without a goal (L7, part 1). After a reached goal the Today page shows two goals and
// "No goal" (one tap): the next stage of the same goal and a related goal, never one that would already be met; run chain
// 5 → 10 → 21 → 25 → 30 → 42 km, then time goals. Standstill without a goal gets the same answer as with a goal: checks are
// strength logs (≤ 1 per training week), 3 without progress and ≥ 21 days → easy week (high load) or +2 sets for the
// pattern, 6 and ≥ 42 days → swap; bodyweight at the top of its range, past-day logs and an active goal give none.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const T0='2026-11-16';const J=x=>JSON.stringify(x);
function setup(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'',kickDays:[],logs:[],start:'2026-06-01',short:false,goal:null});k.today(T0);return D;}
// 1 suggestions per goal
{const {k}=boot();const D=setup(k);Object.assign(D.profile,{mu:1,pull:10,dips:12,push:30,flSt:4,plSt:0,hsf:10,lsit:10});D.pr={'run:long':{km:5}};
  const ex={mu:[['mu',3],'pl'],/* front lever already at its last stage here, so the next related goal */pull:[['pull',15],'dips'],fl:[null,'pl'],d5:[['d10',10],'t5'],d10:[['d21',21],'t10'],d21:[['d25',25],'t10'],d25:[['d30',30],'t10'],d30:[['d42',42],'t10'],d42:[['t10',null],'t5']};
  const v0={mu:1,pull:10,fl:4,d5:5,d10:10,d21:21,d25:25,d30:30,d42:42};
  Object.keys(ex).forEach(g=>{const a=k.goalNextOf({k:g,v:v0[g]}),[same,rel]=ex[g];
    if(same){const x=a.find(y=>y.k===same[0]);if(!x||(same[1]!=null&&x.v!==same[1]))issue(g+': next stage '+J(same)+' missing: '+J(a));}
    if(!a.some(y=>y.k===rel))issue(g+': related goal '+rel+' missing: '+J(a));
    if(a.length>2)issue(g+': more than two suggestions');a.forEach(y=>{if(!k.GOALS[y.k])issue(g+': unknown goal '+y.k);});});
  // never one already met
  D.profile.pull=22;const a=k.goalNextOf({k:'pull',v:10});const p=a.find(y=>y.k==='pull');if(!p||p.v<=22)issue('pull suggestion already met: '+J(a));
  D.pr={'run:long':{km:26}};const b=k.goalNextOf({k:'d10',v:10});if(b.some(y=>y.k==='d21'||y.k==='d25'))issue('met run distance offered: '+J(b));if(!b.some(y=>y.k==='d30'))issue('chain does not skip met distances: '+J(b));
  ['d25','d30','d42'].forEach(q=>{if(!k.GOALS[q]||k.GOALS[q].km!==+q.slice(1))issue('goal '+q+' missing');});
  rep.push('mu 1 → '+k.goalNextOf({k:'mu',v:1}).map(x=>x.k+' '+x.v).join(', ')+' · d21 → '+k.goalNextOf({k:'d21',v:21}).map(x=>x.k+' '+x.v).join(', '));}
// 2 reached goal → card on Today, one tap, No goal
{const {k,d}=boot();const D=setup(k);D.profile.pull=8;k.setGoal('pull');D.goal.v=10;D.profile.pull=10;
  const m=k.goalCheck({d:T0,id:'CH',ex:{}});if(D.goal)issue('goal not archived at the target');if(!/one tap on Today/.test(m))issue('toast does not point to Today: '+m);
  if((D.goalNext||[]).length!==2)issue('two suggestions expected: '+J(D.goalNext));
  D.tab='start';k.render();const ch=[...d.querySelectorAll('[data-a=gnext]')];if(ch.length!==3)issue('Today shows '+ch.length+' choices, expected 3');
  if(!ch.some(x=>x.textContent==='No goal'))issue('no "No goal" choice');
  const want=D.goalNext[0];ch[0].click();const D2=k.D();if(!D2.goal||D2.goal.k!==want.k||D2.goal.v!==want.v)issue('one tap did not set the suggestion: '+J(D2.goal));
  if((D2.goalNext||[]).length)issue('suggestions not cleared after the choice');k.render();if(d.querySelector('[data-a=gnext]'))issue('card still shown');
  D2.goal=null;D2.goalNext=[{k:'dips',v:20}];k.render();d.querySelector('[data-a=gnext][data-k=none]').click();if(k.D().goal||(k.D().goalNext||[]).length)issue('No goal did not clear');
  // a suggestion met in the meantime is not shown
  const D3=k.D();D3.profile.dips=25;D3.goalNext=[{k:'dips',v:20}];k.render();if(d.querySelector('[data-a=gnext]'))issue('met suggestion still offered');}
// 3 backup: goalNext kept, junk refused, old backup without the field
{const {k}=boot();const c=k.cleanImport({v:3,goalNext:[{k:'pull',v:15},{k:'__proto__',v:1},{k:'xx',v:2},{k:'d25',v:'<b>'},{k:'dips',v:12},{k:'fl',v:3}]});
  if(J(c.goalNext)!==J([{k:'pull',v:15},{k:'dips',v:12}]))issue('goalNext import: '+J(c.goalNext));
  const o=k.cleanImport({v:3,logs:[]});if(J(o.goalNext)!=='[]')issue('old backup goalNext: '+J(o.goalNext));}
// 4 standstill without a goal
function stand(k,key,name,weeks,score,opts){const D=k.D();opts=opts||{};D.logs=[];for(let i=weeks;i>=1;i--){const dd=new Date(Date.parse(T0)-i*7*864e5+864e5).toISOString().slice(0,10);
  const r=opts.prog&&i===opts.prog?score[0]+1:score[0];D.logs.push({d:dd,id:'KC',t:'C',rpe:6,min:70,ex:{[key]:[r,score[1]]},...(opts.bl?{bl:1}:{})});}
  const last=D.logs[D.logs.length-1];D.ex={[key]:{r:score[0],w:score[1],d:last.d,hold:false,n:name,stall:0}};}
{const {k,d}=boot();const D=setup(k);
  stand(k,'g_ht#0','Barbell hip thrust',4,[10,60]);let ng=k.plNoGoal();if(!ng||ng.np!==3||ng.pm!=='s'||ng.p!=='hinge'&&ng.p!=='legs')issue('3 checks over 3 weeks without progress: '+J(ng));
  if(ng){const p=ng.p,b=k.vBand(p);D.logs.push({d:'2026-10-01',id:'KA',t:'A',ex:{}});D.logs.sort((a,b)=>a.d<b.d?-1:1);const D0=JSON.parse(JSON.stringify(D));
    rep.push('standstill: '+ng.n+' · '+ng.np+' checks · measure '+ng.pm+' · band '+p+' '+b.join('–'));
    D.tab='start';k.render();const pl=d.querySelector('.gplat');if(!pl||!/Barbell hip thrust: 3 checks without progress/.test(pl.textContent)||!/2 extra sets/.test(pl.textContent))issue('plateau line: '+(pl&&pl.textContent));
    k.setGoal('pull');const b2=k.vBand(p);if(k.plNoGoal()!==null)issue('plateau without goal while a goal is set');if(b2[1]>=b[1]&&p!=='pull')issue('band boost stays with a goal: '+b2.join('–'));D.goal=null;}
  stand(k,'g_ht#0','Barbell hip thrust',3,[10,60]);if(k.plNoGoal())issue('plateau after only 2 checks');
  stand(k,'g_ht#0','Barbell hip thrust',7,[10,60]);ng=k.plNoGoal();if(!ng||ng.pm!=='v')issue('6 checks over 42 days → swap: '+J(ng));
  stand(k,'g_ht#0','Barbell hip thrust',5,[10,60],{prog:2});if(k.plNoGoal())issue('progress 2 weeks ago still a plateau');
  stand(k,'g_ht#0','Barbell hip thrust',5,[10,60],{bl:1});if(k.plNoGoal())issue('past-day logs count as checks');
  // two logs in the same training week count once
  stand(k,'g_ht#0','Barbell hip thrust',3,[10,60]);D.logs.push({d:addD0(D.logs[2].d,1),id:'KA',t:'A',rpe:6,ex:{'g_ht#0':[10,60]}});if(k.plNoGoal())issue('two logs of one training week counted as two checks');
  // bodyweight exercise at the top of its range: the ladder's job
  const it=Object.values(k.favCatalog()).map(x=>x.it).find(x=>x.k&&x.hi&&!x.opts[0].w&&k.PATN!==undefined&&/^(x_|g_su|h_)/.test(x.k));
  if(it){stand(k,it.k+'#0',it.opts[0].n,5,[it.hi,0]);if(k.plNoGoal())issue('bodyweight at the top counted as a plateau: '+it.opts[0].n);}
  // high load → easy week first
  stand(k,'g_ht#0','Barbell hip thrust',4,[10,60]);const T=k.D();for(let i=0;i<3;i++)T.logs.push({d:T0,id:'KI',t:'KI',rpe:10,min:400});T.logs.sort((a,b)=>a.d<b.d?-1:1);ng=k.plNoGoal();if(!ng||ng.pm!=='e')issue('high load should give the easy week: '+J(ng));}
function addD0(s,n){return new Date(Date.parse(s)+n*864e5).toISOString().slice(0,10);}
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
