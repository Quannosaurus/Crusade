// @name progression-volume
// P-5: progression, plateau and volume from the history. Weight steps of about 5 % (at least 0.5 kg; a 5 kg lateral raise
// no longer jumps by 50 %), three logs without progress → 10 % lighter or 2 reps fewer and the rebuild starts, the top of a
// bodyweight range is no stall and offers "Next variation" (one tap). One pause rule for every exercise by movement
// pattern (patKey, not the name): any variant, Field kit replacements ("mx_") and kit days count, two weeks of kit days do
// not step the gym variant back. Working sets per pattern on every log (l.vs) and the set band per 7 days in rounds()
// (under → high, over → low, band +2 after a plateau, 60–90 min kept, additions kept). Plateau at the goal value: hint only
// after 3 checks without progress (A-035: checks only where the goal value is measurable, 1 per training week, at the earliest after 3 weeks; boost at most 6 weeks), exactly one measure (easy week / +2 sets / swap), English, theme words. Logged past days
// (bl) count for the pause rule and frequency but never for progression, stall, plateau or the bands. Captain 6-week
// simulation: pull and push ≤ ~20 sets per week, legs ≥ 10. Backup round trip, junk refused, old backup.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)],txt:()=>w.document.getElementById('app').textContent};}
const TD='2026-11-16';
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||'2026-10-05',short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return D;}
const cat=(k,n)=>{const c=k.favCatalog()[n];if(!c)issue('catalogue has no '+n);return c;};
// log a strength session: every exercise at its target, except the overrides {key:[reps,kg]}
function logSession(k,id,over){const D=k.D(),dy=k.day();dy.pick=id;dy.fin={rpe:6};const c=k.ctx(k.today()),s=k.S(id,c);
  s.blocks.forEach((b,bi)=>{if(D.short&&b.p>1)return;const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{const v=k.curVar(it,k.LOC());if(v<0)return;const key=id+'-'+bix+'-'+ii;dy.done[key]=true;
    if(it.f||it.iso)return;const n=b.rounds?k.rounds(b,c,id):(parseInt(it.sets,10)||1);
    if(it.test){dy.inp[key]={s:[String((D.profile[it.test]||0))]};return;}
    const g=k.target(it,v),o=over&&over[it.k];dy.inp[key]={s:Array(n).fill(String(o?o[0]:g.r)),w:it.opts[v].w?String(o?o[1]:(g.w||20)):''};});});
  k.saveTrain();return s;}
const findIt=(k,s,key)=>{let r=null;s.blocks.forEach(b=>b.items.forEach(it=>{if(it.k===key&&k.curVar(it,k.LOC())>=0)r=it;}));return r;};

// 1 weight steps ≈ 5 %, at least 0.5 kg, rounded by load
{const z=boot(),k=z.k;setup(k,prof('Captain'));
 [[5,0.5],[10,0.5],[20,1],[40,2],[60,2.5],[100,5],[150,7.5]].forEach(([w,e])=>{if(k.kgStep(w)!==e)issue('kgStep('+w+') = '+k.kgStep(w)+', want '+e);});
 const D=k.D();[['Dumbbell lateral raises',5],['Barbell back squat',100],['Cable kickbacks',10],['Barbell hip thrust',60]].forEach(([n,w])=>{const c=cat(k,n);if(!c)return;
   D.ex[c.it.k+'#'+c.v]={r:c.it.hi,w,d:addD(TD,-3),hold:false,n};const g=k.target(c.it,c.v);
   if(!(g.w>w&&g.w<=w*1.1+1e-9))issue(n+' '+w+' kg at the top → '+g.w+' kg (want ≤ +10 %, ≈ 5 %)');rep.push(n+' '+w+' → '+g.w+' kg');});
 const lat=cat(k,'Dumbbell lateral raises');D.ex[lat.it.k+'#'+lat.v]={r:lat.it.hi,w:5,d:addD(TD,-3),hold:false,n:'x'};if(k.target(lat.it,lat.v).w>=7.5)issue('5 kg lateral raise still jumps by 50 %');
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}

// 2 stall: three logs without progress → 10 % lighter / 2 reps fewer, the reset session starts the rebuild; top of a bodyweight range is no stall
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));D.logs=[{d:'2026-10-20',id:'KA',t:'KA',rpe:6}];
 k.today(addD(TD,-6));let s=k.S('KC',k.ctx(k.today()));const sq=findIt(k,s,'c_sq'),v=k.curVar(sq,'g'),key='c_sq#'+v;
 if(!sq){issue('no c_sq in Strength C');}else{
  D.ex[key]={r:8,w:60,d:addD(TD,-8),hold:false,n:sq.opts[v].n,stall:2};
  logSession(k,'KC',{c_sq:[8,60]});if(D.ex[key].stall!==3)issue('stall after a 3rd log without progress = '+D.ex[key].stall);
  k.today(addD(TD,-3));const g=k.target(sq,v);if(!(g.w<60&&g.w>=60*0.88&&g.reset))issue('stall 3 at 60 kg → target '+JSON.stringify(g));rep.push('stall 3 at 60 kg → '+g.w+' kg × '+g.r);
  if(!/10 % lighter/.test(g.note))issue('stall note '+g.note);
  logSession(k,'KC');if(D.ex[key].stall!==0)issue('reset session did not start the rebuild: stall '+D.ex[key].stall);
  if(D.ex[key].w!==g.w)issue('reset session weight '+D.ex[key].w);}
 // bodyweight stall → 2 reps fewer
 const ap=cat(k,'Archer Push-Ups');if(ap){D.ex[ap.it.k+'#'+ap.v]={r:10,w:0,d:addD(TD,-4),hold:false,n:'Archer Push-Ups',stall:3};const g=k.target(ap.it,ap.v);
   if(g.r!==Math.max(1,Math.min(ap.it.hi,10)-2))issue('bodyweight stall target '+g.r+' (want 8)');}
 // top of a bodyweight range: logging the top again is no stall
 k.today(TD);s=k.S('KC',k.ctx(TD));const pu=findIt(k,s,'c_pu');if(pu){const pv=k.curVar(pu,'g'),pk='c_pu#'+pv;D.ex[pk]={r:pu.hi,w:0,d:addD(TD,-2),hold:false,n:pu.opts[pv].n,stall:0};
   logSession(k,'KC',{c_pu:[pu.hi,0]});k.today(addD(TD,2));logSession(k,'KC',{c_pu:[pu.hi,0]});k.today(addD(TD,4));logSession(k,'KC',{c_pu:[pu.hi,0]});
   if((D.ex[pk].stall||0)!==0)issue('top of a bodyweight range counted as stall '+D.ex[pk].stall);}
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}

// 3 "Next variation": one tap at the top of a bodyweight range
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));D.loc='h';k.setGoal('pull');D.vr['h|gl_pull']=1;const c=k.ctx(TD),s=k.S('HO',c);let hit=null;
 s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,'h');if(hit||v<0||it.f||it.iso||it.test||it.opts[v].w)return;const nv=k.nextVar(it,v,'h');if(nv>=0)hit={it,v,nv,id:'HO-'+(b.bi!=null?b.bi:bi)+'-'+ii};}));
 if(!hit)issue('no bodyweight item with a next variation in home strength');else{
  D.tab='train';k.day().pick='HO';D.ex[hit.it.k+'#'+hit.v]={r:hit.it.lo,w:0,d:addD(TD,-3),hold:false,n:'x'};k.render();
  if(z.$('[data-a=nxv][data-id="'+hit.id+'"]'))issue('Next variation offered below the top');
  D.ex[hit.it.k+'#'+hit.v].r=hit.it.hi;k.render();const b=z.$('[data-a=nxv][data-id="'+hit.id+'"]');
  if(!b)issue('no Next variation button at the top ('+hit.it.opts[hit.v].n+')');else{if(!/^→ Next variation: /.test(b.textContent))issue('button text '+b.textContent);
   b.click();const it2=k.S('HO',c).blocks.flatMap(x=>x.items).find(x=>x.k===hit.it.k);if(k.curVar(it2,'h')!==hit.nv)issue('Next variation tap did not switch to '+hit.it.opts[hit.nv].n);
   else rep.push('next variation: '+hit.it.opts[hit.v].n+' → '+hit.it.opts[hit.nv].n);}}
 if(hit&&hit.it.k==='gl_pull'&&!/Clean pull-ups/.test(hit.it.opts[hit.nv].n))issue('goal anchor next variation '+hit.it.opts[hit.nv].n);
 // lists without a known progression get no button (the note says "swap"), easier forms are never next
 const pk=cat(k,'Pike push-ups, feet on a chair');if(pk&&k.nextVar(pk.it,pk.v,'h')>=0)issue('next variation offered for an unordered list: '+pk.it.opts[k.nextVar(pk.it,pk.v,'h')].n);
 const gp=k.S('HO',c).blocks.flatMap(x=>x.items).find(x=>x.k==='gl_pull');if(gp&&k.nextVar(gp,2,'h')!==0)issue('negatives → next should skip band-assisted to clean pull-ups');
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}

// 4 one pause rule per movement pattern (patKey, not the name), Field kit included
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));const c=k.ctx(TD),s=k.S('KC',c),sq=findIt(k,s,'c_sq'),v=k.curVar(sq,'g'),old=addD(TD,-20);
 const set=o=>{D.ex={};D.kitD={};Object.assign(D.ex,o.ex||{});Object.assign(D.kitD,o.kd||{});};
 const back=()=>/back/.test(k.target(sq,v).note||'');
 set({ex:{['c_sq#'+v]:{r:8,w:60,d:old,n:'a'}}});if(!back())issue('20 days without the pattern: no step back');
 set({ex:{['c_sq#'+v]:{r:8,w:60,d:old,n:'a'},['c_sq#'+(v?0:2)]:{r:8,w:20,d:addD(TD,-3),n:'b'}}});if(back())issue('another variant 3 days ago: still stepped back');
 set({ex:{['c_sq#'+v]:{r:8,w:60,d:old,n:'a'},'mx_c_sq#3':{r:12,w:0,d:addD(TD,-3),n:'kit'}}});if(back())issue('Field kit replacement of the pattern 3 days ago: still stepped back');
 set({ex:{['c_sq#'+v]:{r:8,w:60,d:old,n:'a'}},kd:{c_sq:addD(TD,-2)}});if(back())issue('kit day of the pattern: still stepped back');
 // A-051: by movement pattern (PATK), not by name or key: the glute RDL trains hinge like the Strength C RDL → no step back;
 // an exercise of another pattern (rows, pull) two days ago does not hold the hinge pattern
 const rd=findIt(k,s,'c_rdl'),rv=k.curVar(rd,'g');set({ex:{['c_rdl#'+rv]:{r:10,w:60,d:old,n:'Romanian deadlift'},'g_rdl#0':{r:10,w:60,d:addD(TD,-2),n:'Romanian deadlift'}}});
 if(/back/.test(k.target(rd,rv).note||''))issue('pause rule: another exercise of the hinge pattern 2 days ago, still stepped back');
 set({ex:{['c_rdl#'+rv]:{r:10,w:60,d:old,n:'Romanian deadlift'},'a_row#0':{r:10,w:30,d:addD(TD,-2),n:'Row'}}});
 if(!/back/.test(k.target(rd,rv).note||''))issue('pause rule: an exercise of another pattern held the hinge pattern');
 // the kit replacement itself: its own entry is old, the gym variant fresh → no step back
 D.kit=[];k.day().kit=true;const ks=k.S('KC',c),kx=ks.blocks.flatMap(b=>b.items).find(it=>/^mx_/.test(it.k||'')&&!it.f&&k.curVar(it,'m')>=0);
 if(kx){const kv=k.curVar(kx,'m'),base=kx.k.replace(/^mx_/,'');set({ex:{[kx.k+'#'+kv]:{r:12,w:0,d:old,n:'kit'},[base+'#0']:{r:8,w:60,d:addD(TD,-2),n:'gym'}}});
   if(/back/.test(k.target(kx,kv).note||''))issue('kit replacement '+kx.k+' stepped back although the gym variant was trained');
   set({ex:{[kx.k+'#'+kv]:{r:12,w:0,d:old,n:'kit'}}});if(!/back/.test(k.target(kx,kv).note||''))issue('kit replacement '+kx.k+': no step back after 20 days');rep.push('kit pattern '+kx.k+' ↔ '+base);}
 else issue('no Field kit replacement in Strength C');
 k.day().kit=false;
 // two weeks of kit days: the gym variant keeps its values and does not step back
 set({ex:{['c_sq#'+v]:{r:8,w:60,d:addD(TD,-15),n:'a'}}});['2026-11-05','2026-11-09','2026-11-13'].forEach(d=>{k.today(d);k.day().kit=true;D.kit=[];logSession(k,'KC');k.day().kit=false;});k.today(TD);
 const e=D.ex['c_sq#'+v];if(e.w!==60||e.r!==8)issue('kit days changed the gym variant '+JSON.stringify(e));if(back())issue('gym variant stepped back after 2 weeks of kit days');
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}

// 5 volume: l.vs on every log, bands in rounds(), goal band, plateau boost, 60–90 min, additions kept
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));D.logs=[{d:'2026-10-26',id:'KA',t:'KA',rpe:6,vs:{pull:6,push:6,legs:0,hinge:0,core:0}}];
 const s=logSession(k,'KC'),l=D.logs[D.logs.length-1];
 if(!l.vs||['pull','push','legs','hinge','core'].some(p=>typeof l.vs[p]!=='number'))issue('no vs on the log '+JSON.stringify(l.vs));
 else{const exp=k.volSets(s,k.ctx(TD),'KC');if(l.vs.legs!==exp.legs||l.vs.pull!==exp.pull)issue('vs '+JSON.stringify(l.vs)+' ≠ session sets '+JSON.stringify(exp));if(l.vs.legs+l.vs.hinge<6)issue('Strength C with '+(l.vs.legs+l.vs.hinge)+' leg sets');}
 if(k.itPat({k:'mx_c_sq',opts:[{n:'x'}]})!=='legs'||k.itPat({k:'fav_u_row',opts:[{n:'x'}]})!=='pull'||k.itPat({k:'u_lat',opts:[{n:'x'}]})!=='')issue('pattern by key wrong');
 // band in rounds(): a pull block in cycle week 3 → low when pull is over 14, high when under 8; in cycle week 1 under the band → high
 const z2=boot(),k2=z2.k,D2=setup(k2,prof('Captain'),'2026-10-26');k2.today(TD);
 const pullB={name:'Pull',rounds:[3,4],items:[{k:'a2_wpu',lo:4,hi:8,unit:'reps',opts:[{n:'Wide pull-ups',req:'',w:false}]}]};
 const mk=pull=>{D2.logs=[{d:'2026-10-27',id:'KA',t:'KA',rpe:6,vs:{pull:0,push:0,legs:0,hinge:0,core:0}},{d:addD(TD,-2),id:'KA',t:'KA',rpe:6,vs:{pull,push:8,legs:6,hinge:6,core:0}}];};
 const c3={cyc:3},c1={cyc:1};
 mk(24);if(k2.rounds(pullB,c3,'KB')!==3)issue('pull 24 sets in 7 days: rounds '+k2.rounds(pullB,c3,'KB')+' (want low 3)');
 mk(4);if(k2.rounds(pullB,c1,'KB')!==4)issue('pull 4 sets in 7 days, cycle week 1: rounds '+k2.rounds(pullB,c1,'KB')+' (want high 4)');
 mk(10);if(k2.rounds(pullB,c1,'KB')!==3||k2.rounds(pullB,c3,'KB')!==4)issue('pull inside the band: old rule not kept');
 mk(4);D2.logs[1].rpe=10;D2.logs[1].id='KB';if(k2.rounds(pullB,c1,'KB')!==3)issue('session at the limit last time: band overrode the low count');D2.logs[1].rpe=6;
 mk(4);D2.short=true;if(k2.rounds(pullB,c1,'KB')!==3)issue('Limited time: band overrode the low count');D2.short=false;
 // a logged past day without values never feeds the band
 mk(4);D2.logs.push({d:addD(TD,-1),id:'KA',t:'KA',rpe:6,bl:1});const v0=k2.vs7(TD).pull;if(v0!==4)issue('bl log counted for the band: pull '+v0);
 // goal band and plateau boost +2 for 3 weeks
 k2.setGoal('pull');let b=k2.vBand('pull');if(b[0]!==12||b[1]!==20)issue('goal pattern band '+b);if(k2.vBand('push')[1]!==14)issue('other pattern band '+k2.vBand('push'));
 D2.goal.pz=addD(TD,-5);b=k2.vBand('pull');if(b[0]!==14||b[1]!==22)issue('plateau boost band '+b);
 D2.goal.pz=addD(TD,-22);b=k2.vBand('pull');if(b[1]!==20)issue('boost not over after 3 weeks '+b);D2.goal.pk=1;if(k2.vBand('pull')[1]!==22)issue('boost not kept after progress came back');
 // legs at least 10 sets per 7 days: a leg block under 10 (legs + hinge) gets the high count
 const legB={name:'Legs',rounds:[3,4],items:[{k:'c_sq',lo:6,hi:10,unit:'reps',opts:[{n:'Goblet squat',req:'',w:false}]}]};D2.goal=null;
 D2.logs=[{d:'2026-10-27',id:'KA',t:'KA',rpe:6},{d:addD(TD,-2),id:'KC',t:'KC',rpe:6,vs:{pull:6,push:6,legs:4,hinge:4,core:0}}];if(k2.rounds(legB,c3,'KC')!==4)issue('legs 8 sets in 7 days: leg block not high');
 // whole sessions stay 60–90 min with high bands; additions are kept
 D.logs=[{d:'2026-10-27',id:'KA',t:'KA',rpe:6}];['KA','KB','KC','CH'].forEach(id=>{const m=k.S(id,k.ctx(TD)).min;if(m>90||m<60)issue(id+' with empty bands: '+m+' min');});
 k.day().add=['Cable kickbacks'];const sa=k.S('KA',k.ctx(TD));if(!sa.blocks.some(x=>x.add&&x.items.some(it=>it.opts[k.curVar(it,'g')]&&/kickback/i.test(it.opts[k.curVar(it,'g')].n))))issue('addition lost');k.day().add=[];
 if(z.errs.length||z2.errs.length)issue('JS errors '+z.errs.concat(z2.errs).join('; '));}

// 6 Captain 6-week simulation: pull and push ≤ ~20 sets per 7 days, legs ≥ 10, every session ≤ 90 min
PROF.forEach(p=>{const z=boot(),k=z.k,D=setup(k,p,'2026-09-21');const wk={};
 sim(k,42,'2026-09-21',(r,s)=>{if(r.s&&r.min>90)issue(p.n+' '+s+' '+r.id+' '+r.min+' min');});
 D.logs.forEach(l=>{const w=Math.floor((Date.parse(l.d)-Date.parse('2026-09-21'))/864e5/7);const x=wk[w]||(wk[w]={pull:0,push:0,legs:0,hinge:0,core:0,dl:false});if(l.id==='DL'||l.id==='TE')x.dl=true;if(l.vs)['pull','push','legs','hinge','core'].forEach(q=>x[q]+=l.vs[q]);});
 rep.push(p.n+': '+Object.keys(wk).map(w=>{const x=wk[w];return 'W'+(+w+1)+' P'+x.pull+'/D'+x.push+'/L'+(x.legs+x.hinge)+(x.dl?'(deload)':'');}).join(' '));
 if(p.n==='Captain')Object.keys(wk).forEach(w=>{const x=wk[w];if(x.pull>22||x.push>22)issue('Captain week '+(+w+1)+': upper body pull '+x.pull+' / push '+x.push+' sets (> ~20)');if(!x.dl&&x.legs+x.hinge<10)issue('Captain week '+(+w+1)+': legs '+(x.legs+x.hinge)+' sets (< 10)');});
 if(z.errs.length)issue(p.n+' simulation JS errors '+z.errs.join('; '));});

// 7 plateau at the goal value (A-035, H-2): a check is only a session where the goal value is measurable (Skill Trial/test,
// goal anchor at the top of its range), at most 1 per training week; the measure comes at the earliest 3 weeks after the
// goal was set, the swap advice after 6 checks and 6 weeks without progress; bl, run, kickboxing and comeback logs no check
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-09-07');D.logs=[{d:'2026-09-01',id:'KA',t:'KA',rpe:6}];k.today('2026-09-07');k.setGoal('pull');D.goal.v=99;
 const chk=(d,lg)=>{k.today(d);k.goalCheck(Object.assign({d,t:'x',rpe:6},lg));},np=()=>D.goal.np||0;
 chk('2026-09-08',{id:'KA'});chk('2026-09-09',{id:'KB',ex:{'gl_pull#0':[6,0]}});if(np())issue('strength session without a measurable goal value counted as a check: np '+np());
 chk('2026-09-10',{id:'KA',ex:{'gl_pull#0':[8,0]}});if(np()!==1)issue('goal anchor at the top of its range is no check: np '+np());
 chk('2026-09-11',{id:'CH'});chk('2026-09-12',{id:'TE'});if(np()!==1)issue('more than 1 check in a training week: np '+np());
 chk('2026-09-15',{id:'CH',bl:1});chk('2026-09-15',{id:'RE'});chk('2026-09-15',{id:'KI'});chk('2026-09-15',{id:'CH',cb:1});if(np()!==1)issue('bl/run/kickboxing/comeback log counted as a check: np '+np());
 chk('2026-09-16',{id:'CH'});chk('2026-09-21',{id:'CH'});if(np()!==3||D.goal.pm||k.platHTML())issue('plateau before 3 weeks: '+JSON.stringify(D.goal));
 chk('2026-09-28',{id:'TE'});if(np()!==4||D.goal.pm!=='s'||D.goal.pz!=='2026-09-28')issue('check in week 4, normal load: '+JSON.stringify(D.goal));
 let h=k.platHTML();if(!/The vow stands still/.test(h)||!/4 checks without progress/.test(h)||!/2 extra sets a week for 3 weeks/.test(h))issue('plateau hint (templar) '+h);
 if(k.vBand('pull')[1]!==22)issue('measure +2 sets not in the band');
 D.tab='start';k.render();const el=z.$('.gplat');if(!el)issue('plateau hint not on the Today page');else if(z.$$('.gplat').length!==1)issue('more than one plateau line');
 D.theme='plain';k.render();h=z.$('.gplat')?z.$('.gplat').textContent:'';if(!/^Plateau · /.test(h)||/vow|crusade|emperor/i.test(h))issue('plain theme plateau text '+h);D.theme='templar';
 chk('2026-10-05',{id:'CH'});chk('2026-10-12',{id:'CH'});if(np()!==6||D.goal.pm!=='s')issue('swap advice before 6 weeks without progress: '+JSON.stringify(D.goal));
 chk('2026-10-19',{id:'CH'});if(np()!==7||D.goal.pm!=='v'||!/Swap the variation/.test(k.platHTML()))issue('6 weeks without progress: swap the variation '+JSON.stringify(D.goal));
 D.profile.pull+=2;chk('2026-10-26',{id:'CH'});if(np()!==0||D.goal.pm||k.platHTML()||D.goal.lp!=='2026-10-26')issue('progress did not clear the plateau '+JSON.stringify(D.goal));
 // the boost ends: 3 weeks, progress inside it extends it once to at most 6 weeks, never for good
 k.today(TD);Object.assign(D.goal,{pz:addD(TD,-10)});delete D.goal.pk;D.profile.pull+=1;k.goalCheck({d:TD,id:'CH',rpe:6});if(!D.goal.pk)issue('progress inside the boost did not extend it');
 D.goal.pz=addD(TD,-30);if(!k.plBoost())issue('extended boost over after 30 days');D.goal.pz=addD(TD,-42);if(k.plBoost()||k.vBand('pull')[1]!==20)issue('boost still on after 6 weeks '+k.vBand('pull'));
 delete D.goal.pk;D.goal.pz=addD(TD,-21);if(k.plBoost())issue('boost without progress still on after 3 weeks');
 // high load → easy week
 const z2=boot(),k2=z2.k,D2=setup(k2,prof('Captain'),'2026-09-07');k2.setGoal('pull');D2.goal.v=99;D2.goal.s=addD(TD,-30);
 for(let w=1;w<=4;w++)D2.logs.push({d:addD(TD,-7*w),id:'KA',t:'KA',rpe:6,min:60});[0,1,2].forEach(i=>D2.logs.push({d:addD(TD,-i),id:'KC',t:'KC',rpe:10,min:80}));D2.logs.sort((a,b)=>a.d<b.d?-1:1);
 [14,7,0].forEach(x=>k2.goalCheck({d:addD(TD,-x),id:'CH',rpe:6}));if(D2.goal.pm!=='e'||D2.goal.pz||!/easy week/i.test(k2.platHTML()))issue('high load: measure '+D2.goal.pm+' '+k2.platHTML());
 if(z.errs.length||z2.errs.length)issue('JS errors '+z.errs.concat(z2.errs).join('; '));}

// 8 logged past days (bl): count for the pause rule and frequency, never for progression, stall, plateau or bands
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-10-05');k.setGoal('pull');D.goal.v=99;D.goal.np=2;
 const s=k.S('KC',k.ctx(TD)),sq=findIt(k,s,'c_sq'),v=k.curVar(sq,'g');D.ex['c_sq#'+v]={r:8,w:60,d:addD(TD,-20),hold:false,n:sq.opts[v].n,stall:2};
 D.logs=[{d:'2026-10-20',id:'KA',t:'KA',rpe:6,vs:{pull:6,push:6,legs:0,hinge:0,core:0}}];
 const ex0=JSON.stringify(D.ex),vs0=JSON.stringify(k.vs7(TD)),g0=JSON.stringify(D.goal),pr0=JSON.stringify(D.pr);
 D.tab='verlauf';k.render();z.$('[data-a=blopen]').click();z.$('#bl_d').value=addD(TD,-3);z.$('#bl_id').value='KC';z.$('#bl_rpe').value='8';z.$('[data-a=blsave]').click();
 const l=D.logs.find(x=>x.bl);if(!l)issue('past day not logged');else{if(l.vs||l.ex)issue('bl log carries values '+JSON.stringify(l));if(!k.legLog(l))issue('bl Strength C does not count as a leg session');}
 if(JSON.stringify(D.ex)!==ex0)issue('bl log changed exercise values or stall');
 if(JSON.stringify(k.vs7(TD))!==vs0)issue('bl log fed the set band '+JSON.stringify(k.vs7(TD))+' vs '+vs0);
 const g1=JSON.parse(g0);if(D.goal.np!==g1.np||D.goal.pm!==g1.pm)issue('bl log counted as a plateau check '+JSON.stringify(D.goal));
 if(JSON.stringify(D.pr)!==pr0)issue('bl log changed records');
 if(/back/.test(k.target(sq,v).note||''))issue('bl log did not count for the pause rule');
 if(k.hist(TD).legW<1&&k.hist(TD).KC!==3)issue('bl log did not count for frequency');
 if(z.errs.length)issue('JS errors '+z.errs.join('; '));}

// 9 backup: vs and plateau fields round trip, junk refused, bl logs carry no vs, old backup
{const z=boot(),k=z.k,D=setup(k,prof('Captain'));k.setGoal('pull');Object.assign(D.goal,{np:4,pm:'s',pz:addD(TD,-3),pk:1,lp:addD(TD,-40),cw:addD(TD,-7)});
 D.logs=[{d:addD(TD,-2),id:'KA',t:'KA',rpe:6,vs:{pull:9,push:6,legs:3,hinge:3,core:2}},{d:addD(TD,-1),id:'KC',t:'KC',rpe:6,bl:1,vs:{pull:50}}];
 const txt=k.bkJSON();const y=boot();y.k.today(TD);if(!y.k.restore(txt))issue('backup refused');else{const E=y.k.D();
  if(JSON.stringify(E.logs[0].vs)!==JSON.stringify({pull:9,push:6,legs:3,hinge:3,core:2}))issue('vs lost '+JSON.stringify(E.logs[0].vs));
  if(E.logs[1].vs)issue('bl log kept vs after import');const g=E.goal;if(!g||g.np!==4||g.pm!=='s'||g.pz!==addD(TD,-3)||g.pk!==1||g.lp!==addD(TD,-40)||g.cw!==addD(TD,-7))issue('plateau fields lost '+JSON.stringify(g));}
 const junk=JSON.parse(txt);junk.logs[0].vs={pull:'<b>',push:1e9,legs:-4,x:3};Object.assign(junk.goal,{np:'x',pm:'<i>',pz:'tomorrow',pk:0,lp:'__proto__',cw:'2026-02-30',nb:1});
 const j=boot();j.k.today(TD);if(!j.k.restore(JSON.stringify(junk)))issue('junk backup refused as a whole');else{const v=j.k.D().logs[0].vs,g=j.k.D().goal;
  if(!v||v.pull!==0||v.push!==60||v.legs!==0||'x' in v)issue('junk vs '+JSON.stringify(v));if(g.pm||g.pz||g.pk||g.np!==0||g.lp||g.cw||g.nb)issue('junk plateau fields '+JSON.stringify(g));}
 const old={v:3,onb:true,start:'2026-08-03',profile:{pull:6,dips:10},focus:'bal',ex:{'c_sq#1':{r:8,w:60,d:'2026-11-01',hold:false,n:'Barbell back squat',stall:1}},logs:[{d:'2026-11-12',id:'KC',t:'Strength C',rpe:6},{d:'2026-11-14',id:'KA',t:'Strength A',rpe:6}],kickDays:[],theme:'templar',goal:{k:'sq',v:100,b:60,s:'2026-11-01',h:[['2026-11-01',60]]}};
 const o=boot();o.k.today(TD);if(!o.k.restore(JSON.stringify(old)))issue('old backup refused');else{['start','train','verlauf','stand'].forEach(t=>{o.k.D().tab=t;o.k.render();});
  const t=o.k.vs7(TD);if(t.legs!==9||t.pull!==14)issue('old logs: estimate per session type '+JSON.stringify(t));if(o.errs.length)issue('old backup JS errors '+o.errs.join('; '));}
 if(z.errs.length||y.errs.length||j.errs.length)issue('JS errors '+z.errs.concat(y.errs,j.errs).join('; '));}

console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
