// @name hold
// A-045 (L7 part 2): hold mode per area under More → Extras (off by default): strength, running, skills. About a third
// fewer sets per session (the same cut as the tired doctrine, every day, floor 45 min, anchors stay) or kilometres, same
// load and intensity [Q56][Q57]; no standstill step back, no plateau line, no ladder offers, no level-up toast. D.hold
// {str,run,sk} defaults all off; t05/t09/t43 hold the import cases.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const START='2026-01-05';const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const PROF={pull:8,dips:10,push:20,expl:3,mu:0,hsw:30,hsf:0,pike:8,tuck:15,lsit:5,hang:40};
function setup(k,wk,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:o.focus||'bal',emph:o.emph||'lower',kickDays:[],logs:[],start:START,short:false,goal:null,fav:[],theme:o.theme||'templar',runKm:10,runI:5,pr:{}});
  delete D.easy;Object.assign(D.profile,PROF);D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},o.skills||{});D.ex={};D.days={};D.hold={str:false,run:false,sk:false};
  for(let w=0;w<wk-1;w++){const a=addD(START,w*7);D.logs.push({d:addD(a,1),id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8,push:8},ex:{}},{d:addD(a,2),id:'RE',t:'Easy run',rpe:4,km:6,min:40},{d:addD(a,4),id:'RH',t:'Hard run',rpe:7,km:10,min:55});}
  const T=addD(START,(wk-1)*7+1);k.today(T);k.setGoal('none');return D;}
const sets=(k,S,c,id)=>S.blocks.reduce((a,b)=>b.warm||b.cool?a:a+b.items.reduce((x,it)=>it.gone||it.f||it.iso||it.test?x:x+k.setsOf(it,b,c,id),0),0);
// 1 default off, the Extras row, one tap per area, Plain wording
{const {k,d}=boot();const D=setup(k,3);if(k.hold('str')||k.hold('run')||k.hold('sk'))issue('hold on by default');
  D.tab='mehr';k.render();const btn=[...d.querySelectorAll('[data-a=holdm]')];if(btn.length!==3)issue('Extras: '+btn.length+' hold switches');
  const b=btn.find(x=>x.dataset.k==='run');if(b){b.click();if(!k.hold('run'))issue('one tap does not switch hold running on');const b2=d.querySelector('[data-a=holdm][data-k=run]');if(b2.getAttribute('aria-pressed')!=='true')issue('switch state not shown');b2.click();if(k.hold('run'))issue('second tap does not switch it off');}
  const t1=(d.querySelector('.xrow.hold b')||{}).textContent;D.theme='plain';k.render();const t2=(d.querySelector('.xrow.hold b')||{}).textContent;
  if(t1!=='Hold the line'||t2!=='Hold')issue('wording templar/plain: '+t1+' / '+t2);rep.push('Extras: '+btn.length+' switches, templar "'+t1+'", plain "'+t2+'"');}
// 1b the hold timer (data-a="hold" with seconds) is not taken over by the hold-mode switches
{const {k,d}=boot();const D=setup(k,3);D.tab='mehr';k.render();if(d.querySelector('[data-a=hold][data-k]'))issue('a hold-mode switch uses the hold-timer action');}
// 2 strength: about a third fewer working sets (± 1), anchors and load stay, warm-up/cool-down complete, ≥ 45 min
{const {k}=boot();const res=[];[['KA',3],['KB',3],['KC',3],['KC',9]].forEach(([id,wk])=>{let D=setup(k,wk);let c=k.ctx(k.today());const S0=k.S(id,c),n0=sets(k,S0,c,id);
    D.hold.str=true;c=k.ctx(k.today());const S1=k.S(id,c),n1=sets(k,S1,c,id);const want=Math.round(n0*2/3);
    if(n1>want+1||n1<want-2)issue(id+' week '+wk+': '+n0+' → '+n1+' sets (target about '+want+')');
    const anc=S=>S.blocks.flatMap(b=>b.items.filter(it=>it.anc&&!it.gone).map(it=>it.k)).join(',');if(anc(S1)!==anc(S0))issue(id+': anchor changed '+anc(S0)+' → '+anc(S1));
    if(S1.min<45&&!k.D().short)issue(id+': '+S1.min+' min under 45');if(!S1.blocks[0].warm||!S1.blocks[S1.blocks.length-1].cool)issue(id+': warm-up/cool-down');
    const it=S1.blocks.flatMap(b=>b.items).find(x=>x.k&&!x.gone&&!x.f&&k.curVar(x,'g')>=0);if(it){const v=k.curVar(it,'g');D.ex[it.k+'#'+v]={r:it.lo+1,w:40,d:addD(k.today(),-3),stall:0};const g=k.target(it,v);if(g.w!==null&&g.w<40)issue(id+': load lowered in hold');}
    res.push(id+'/'+wk+' '+n0+'→'+n1+' ('+S1.min+' min)');});
  rep.push('strength hold: '+res.join(' · '));}
// 3 no standstill step back, no ladder offer, stall not counted while holding
{const {k}=boot();const D=setup(k,5);D.hold.str=true;const it=k.P('h_pu',8,20,'reps','',['Archer Push-Ups','Diamond Push-Ups']);
  D.ex['h_pu#0']={r:12,w:0,d:addD(k.today(),-3),stall:3};let g=k.target(it,0);if(g.reset)issue('standstill reset while holding: '+g.note);
  D.ex['h_pu#0']={r:20,w:0,d:addD(k.today(),-3),stall:0};D.logs.push({d:addD(k.today(),-10),id:'HO',t:'HO',rpe:6,ex:{'h_pu#0':[20,0]}},{d:addD(k.today(),-3),id:'HO',t:'HO',rpe:6,ex:{'h_pu#0':[20,0]}});D.logs.sort((a,b)=>a.d<b.d?-1:1);
  g=k.target(it,0);if(g.lad)issue('ladder offered while holding');D.hold.str=false;const g2=k.target(it,0);rep.push('stall 3 → '+(g.reset?'reset':'no reset')+', ladder while holding '+(g.lad?'yes':'no')+' (off: '+(g2.lad?'offered':'none')+')');
  /* saveTrain keeps stall while holding */
  D.hold.str=true;const dy=k.day();dy.pick='KA';dy.fin={rpe:6};const c=k.ctx(k.today()),S=k.S('KA',c);let key=null,kk=null;
  S.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((x,ii)=>{if(x.gone||x.f||x.iso||x.test||!x.k||key)return;const v=k.curVar(x,'g');if(v<0)return;key='KA-'+bix+'-'+ii;kk=x.k+'#'+v;D.ex[kk]={r:x.lo,w:20,d:addD(k.today(),-4),stall:1};dy.done[key]=true;dy.inp[key]={s:[String(x.lo),String(x.lo)],w:'20'};});});
  k.saveTrain();if(D.ex[kk]&&D.ex[kk].stall!==1)issue('stall counted while holding: '+D.ex[kk].stall);}
// 4 no plateau line (goal or no goal), no level-up toast
{const {k,d}=boot();const D=setup(k,8);k.setGoal('pull');D.goal.np=4;D.goal.pm='s';D.goal.pz=k.today();D.tab='start';k.render();const on=!!d.querySelector('.gplat');
  D.hold.str=true;k.render();if(d.querySelector('.gplat'))issue('plateau line while holding strength');if(!on)rep.push('(plateau line case not shown without hold)');
  D.hold.str=false;k.setGoal('d10');D.goal.np=4;D.goal.pm='e';D.hold.run=true;k.render();if(d.querySelector('.gplat'))issue('plateau line for a run goal while holding running');
  const D2=setup(k,3);D2.hold.str=true;D2.logs.push({d:addD(k.today(),-100),id:'KC',t:'KC',rpe:6,vs:{legs:4,hinge:6},ex:{'g_ht#0':[10,40]}});const dy=k.day();dy.pick='KC';dy.fin={rpe:6};
  const c=k.ctx(k.today()),S=k.S('KC',c);S.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{if(it.gone)return;const v=k.curVar(it,'g');if(v<0)return;const key='KC-'+bix+'-'+ii;dy.done[key]=true;if(it.f||it.iso||it.test)return;const n=k.setsOf(it,b,c,'KC');let w=it.opts[v].w?'20':'';if(it.k==='g_ht'&&v===0)w='60';dy.inp[key]={s:Array(n).fill(String(it.lo)),w};});});
  k.saveTrain();const t=(d.querySelector('.toast')||{}).textContent||'';if(/Level up/.test(t))issue('level-up toast while holding: '+t);rep.push('no plateau line, toast "'+t.replace(/\s+/g,' ').slice(0,60)+'"');}
// 5 running: about a third fewer km, same intensity; long run and intervals do not grow
{const {k}=boot();let D=setup(k,9,{focus:'run'});const a=k.runPlan('RE').km,b=k.runPlan('RH').km;D.hold.run=true;const a1=k.runPlan('RE').km,b1=k.runPlan('RH').km;
  if(Math.abs(a1-Math.round(a*2/3*2)/2)>0.51||Math.abs(b1-Math.round(b*2/3*2)/2)>0.51)issue('run hold not about −⅓: '+a+'→'+a1+', '+b+'→'+b1);
  const k0=D.runKm,i0=D.runI;let dy=k.day();dy.run='RH';dy.fin={rpe:4,km:String(b1),min:'50'};k.saveRun();if(D.runKm!==k0)issue('long run grew while holding');
  D=setup(k,3,{focus:'run'});D.hold.run=true;dy=k.day();dy.run='RI';dy.fin={rpe:4,km:'6',min:'40'};k.saveRun();if(D.runI!==5)issue('intervals grew while holding');
  rep.push('run hold: easy '+a+'→'+a1+', long '+b+'→'+b1+' km');}
// 6 skills: skill blocks in the standard form with fewer sets
{const {k}=boot();let D=setup(k,3,{emph:'upper',skills:{hs:true}});let c=k.ctx(k.today());const A=k.S('KA',c);D.hold.sk=true;c=k.ctx(k.today());const B=k.S('KA',c);
  const sk=S=>S.blocks.filter(b=>b.skill||b.hsb);const lg=S=>sk(S).filter(b=>b.lng).length;
  if(lg(B))issue('long skill block while holding skills');const ss=S=>sk(S).reduce((a,b)=>a+b.items.reduce((x,it)=>it.f||it.iso||it.test?x:x+k.setsOf(it,b,c,'KA'),0),0);
  if(sk(A).length&&ss(B)>ss(A))issue('skill sets not lower: '+ss(A)+' → '+ss(B));if(B.min>90)issue('skills hold over 90 min');rep.push('skills: long blocks '+lg(A)+'→'+lg(B)+', skill sets '+ss(A)+'→'+ss(B));}
// 7 week preview and Today render with every hold on
{const {k,d,w}=boot();const D=setup(k,6);D.hold={str:true,run:true,sk:true};['start','train','mehr','stand'].forEach(t=>{D.tab=t;k.render();if(!d.getElementById('app').textContent)issue('tab '+t+' empty');});const wp=k.weekPlan();if(!wp||!wp.length)issue('no week preview');}
// A-052 (M-3): hold + Limited time cuts about a third of the visible session, not of hidden p>1 blocks
{const {k}=boot();const D=setup(k,6);D.short=true;const c=k.ctx(k.today()),vis=(S,id)=>S.blocks.reduce((a,b)=>b.warm||b.cool||(b.p>1)?a:a+b.items.reduce((x,it)=>it.gone||it.f||it.iso||it.test||!it.k||k.curVar(it,k.LOC())<0?x:x+k.setsOf(it,b,c,id),0),0);
  ['KA','KC'].forEach(id=>{const a=vis(k.S(id,c),id);D.hold.str=true;const b=vis(k.S(id,c),id);D.hold.str=false;const tg=Math.round(a*2/3);rep.push('hold + Limited time '+id+': visible sets '+a+' → '+b+' (target '+tg+')');
    if(a>4&&(b<tg-2||b>tg+1))issue('hold + Limited time '+id+': '+a+' → '+b+' sets, not about ⅔ ('+tg+')');});D.short=false;}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
