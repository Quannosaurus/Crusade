// @name plan-logic
// A-035 plan logic. Plateau (H-2): a check is only a session in which the goal value is measurable, at most 1 per training
// week, no plateau line in the first 3 weeks, the +2 boost ends (3 weeks, progress extends it once, at most 6 weeks). Today
// follows the week preview: on a strength day running is at most an optional easy run, also after logging the strength
// session, and the run page matches the week plan. The emphasis anchor comes right after the warm-up / skill blocks, set by
// set with full rest, never in a circuit; its companions follow. "Just starting": easy runs only, at most 2 per training
// week, in the first 4 training weeks. Home skills start with a warm-up including wrist prep (N-3). A comeback in a deload
// cycle week is no deload (N-4). A kg goal without history takes its start value from the first log (N-11). Tired may go
// down to 45 min, the other floors stay. Run focus: ≥ 1 leg session and 2 strength sessions per training week (deload week
// excepted), Skill Trial every 14 ± 2 days without deload days (N-5), the focus text matches. A-027 rests: kickboxing
// cool-down through the pain filter, additions on the pain list like painApply, b2_tr counts as push (also old logs).
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD,doTrain}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');const TBL=require('./fixtures/pattern-table.js');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)],txt:()=>w.document.getElementById('app').textContent};}
const TD='2026-11-16',START='2026-09-21';
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||START);return D;}
const day=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
const STR={KA:1,KB:1,KC:1,CH:1,HO:1,DL:1,TE:1};

// 1 plateau (H-2) in a 10-week simulation without progress: checks only on measurable sessions, ≤ 1 per training week,
// no plateau measure in the first 3 weeks after the goal was set, the boost ends
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),START);k.setGoal('pull');D.goal.v=99;const g0=D.goal.s;let last=0,pzSeen=null;const perWk={};
 for(let i=0;i<70;i++){const s=addD(START,i);k.today(s);const r=k.recAll(s,false);
   if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
   else{/* no progress: every test repeats the current value, every exercise its target */const dy=k.day();dy.pick=r.id;dy.fin={rpe:6};const c=k.ctx(s),ss=k.S(r.id,c);
     ss.blocks.forEach((b,bi)=>{const bix=b.bi!=null?b.bi:bi;b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(v<0)return;const key=r.id+'-'+bix+'-'+ii;dy.done[key]=true;if(it.f||it.iso)return;
       if(it.test){dy.inp[key]={s:[String(D.profile[it.test]||0)]};return;}const g=k.target(it,v);dy.inp[key]={s:Array(k.setsOf(it,b,c,r.id)).fill(String(it.gx?Math.max(1,g.r-1):g.r)),w:it.opts[v].w?String(g.w||20):''};});});
     k.saveTrain();}
   const G=D.goal;if(!G){issue('plateau sim: goal gone on '+s);break;}const np=G.np||0;
   if(np>last){const w=Math.floor(day(D.start,s)/7);perWk[w]=(perWk[w]||0)+np-last;const l=D.logs[D.logs.length-1];if(!l||!(l.id==='CH'||l.id==='TE'))issue('plateau check from a session without a measurable goal value: '+s+' '+(l&&l.id));}
   last=np;if(G.pm&&day(g0,s)<21)issue('plateau measure '+G.pm+' only '+day(g0,s)+' days after the goal was set');if(k.platHTML()&&day(g0,s)<21)issue('plateau line in the first 3 weeks ('+s+')');
   if(G.pz&&!pzSeen)pzSeen=G.pz;if(pzSeen&&k.plBoost()&&day(pzSeen,s)>=42)issue('plateau boost still on '+day(pzSeen,s)+' days after it began');}
 Object.keys(perWk).forEach(w=>{if(perWk[w]>1)issue('training week '+(+w+1)+': '+perWk[w]+' plateau checks');});
 rep.push('plateau sim: np '+(D.goal&&D.goal.np)+', measure '+(D.goal&&D.goal.pm)+', boost from '+pzSeen+', checks per week '+JSON.stringify(perWk));
 // unit: a strength session without the goal anchor at its top is no check; the anchor at its top is one; kg goal: CH no check
 const g={k:'pull',v:99,s:TD};if(k.goalIsCheck(g,{d:TD,id:'KA',ex:{'gl_pull#0':[7,0]}})||!k.goalIsCheck(g,{d:TD,id:'KA',ex:{'gl_pull#0':[8,0]}})||!k.goalIsCheck(g,{d:TD,id:'CH'}))issue('goalIsCheck: rep goal rules');
 if(k.goalIsCheck({k:'sq',v:100,s:TD},{d:TD,id:'CH'})||!k.goalIsCheck({k:'sq',v:100,s:TD},{d:TD,id:'KC',ex:{'gl_sq#0':[8,80]}}))issue('goalIsCheck: kg goal rules');
 if(k.goalIsCheck({k:'mu',v:3,s:TD},{d:TD,id:'KA',ex:{}})||!k.goalIsCheck({k:'mu',v:3,s:TD},{d:TD,id:'TE'}))issue('goalIsCheck: skill goal rules');
 /* A-056 b: a distance goal is checked by the long run only */if(!k.goalIsCheck({k:'d10',v:10,s:TD},{d:TD,id:'RH',km:8})||k.goalIsCheck({k:'d10',v:10,s:TD},{d:TD,id:'RE',km:8})||k.goalIsCheck({k:'d10',v:10,s:TD},{d:TD,id:'RH',km:8,bl:1}))issue('goalIsCheck: run goal (long run only)');
 // progress made through training logs between two checks counts at the next check (value at the last check, g.ck)
 {const y=boot(),q=y.k,E=setup(q,prof('Captain'),START);q.today('2026-10-05');q.setGoal('pull');E.goal.v=99;E.goal.s='2026-09-01';E.goal.np=2;E.goal.ck=E.profile.pull;
  E.profile.pull+=1;q.goalCheck({d:'2026-10-05',id:'KA',rpe:6});q.today('2026-10-06');q.goalCheck({d:'2026-10-06',id:'CH',rpe:6});
  if(E.goal.np!==0||E.goal.ck!==E.profile.pull)issue('progress between two checks not counted at the next check: '+JSON.stringify(E.goal));
  q.today('2026-10-13');q.goalCheck({d:'2026-10-13',id:'CH',rpe:6});if(E.goal.np!==1)issue('a check without progress after that: np '+E.goal.np);}
 if(z.errs.length)issue('plateau JS errors '+z.errs.join('; '));}

// 2 Today follows the week preview: strength day → no recommended (hard) run, also after logging; run page = week plan
PROF.forEach(p=>{const z=boot(),k=z.k,D=setup(k,p,START);let strDays=0,runDays=0;
 for(let i=0;i<35;i++){const s=addD(START,i);k.today(s);const wp=k.weekPlan()[0],rr=k.runRec(),r=k.recAll(s,false);
   if(wp.id!==r.id&&!(r.btn==='train'&&r.id!=='RS'))issue(p.n+' '+s+': week preview '+wp.id+' ≠ recommendation '+r.id);
   if(r.btn==='train'&&STR[r.id]){strDays++;if(rr.id!=='RE')issue(p.n+' '+s+': strength day, run page suggests '+rr.id);
     D.tab='start';k.render();const run=z.$$('.big').find(b=>b.dataset.tab==='run');if(run&&run.classList.contains('rec'))issue(p.n+' '+s+': run card recommended on a strength day');}
   if(r.btn==='run'){runDays++;if(rr.id!==r.id)issue(p.n+' '+s+': run page '+rr.id+' ≠ week plan '+r.id);}
   if(r.btn==='kick')D.logs.push({d:s,id:'KI',t:'KI',rpe:6});else if(r.btn==='run')D.logs.push({d:s,id:r.id,t:r.id,rpe:6,km:5,min:30});else if(r.id==='RS')D.logs.push({d:s,id:'RS',t:'RS',rpe:4});
   else{doTrain(k,r.id);if(STR[r.id]){const a=k.recAll(s,false),b=k.runRec();if(a.btn==='run')issue(p.n+' '+s+': run recommended after logging '+r.id+': '+a.id);if(b.id!=='RE'||!b.opt)issue(p.n+' '+s+': run page after logging '+r.id+' suggests '+b.id);
     D.tab='start';k.render();const run=z.$$('.big').find(x=>x.dataset.tab==='run');if(run&&run.classList.contains('rec'))issue(p.n+' '+s+': run card recommended after logging strength');if(!z.$('[data-a=xrun]'))issue(p.n+' '+s+': no optional easy run link after strength');}}}
 rep.push(p.n+': '+strDays+' strength days, '+runDays+' run days checked');if(z.errs.length)issue(p.n+' Today JS errors '+z.errs.join('; '));});

// 3 anchor early, set by set with full rest, never in a circuit; companions follow
['Partner lower','Partner glutes'].forEach(pn=>{const z=boot(),k=z.k,D=setup(k,prof(pn),START);k.today(TD);D.logs=[{d:addD(TD,-20),id:'KA',t:'KA',rpe:6}];
 ['KA','KB','KC','CH'].forEach(id=>{const c=k.ctx(TD),s=k.S(id,c);const i=s.blocks.findIndex(b=>b.lowb);if(i<0){issue(pn+' '+id+': no emphasis block');return;}const b=s.blocks[i];
   let lead=0;while(lead<s.blocks.length&&(s.blocks[lead].warm||s.blocks[lead].gx||s.blocks[lead].skill||s.blocks[lead].hsb||s.blocks[lead].mu||s.blocks[lead].trial))lead++;
   if(i!==lead)issue(pn+' '+id+': emphasis block at '+i+', want right after warm-up/skill blocks ('+lead+')');
   if(!b.ser)issue(pn+' '+id+': emphasis block with anchor is a circuit');if(!b.items[0]||!b.items[0].anc)issue(pn+' '+id+': anchor is not the first exercise');
   const sec=k.blockSec(b,c,id),n=k.setsOf(b.items[0],b,c,id);if(sec<n*(40+120))issue(pn+' '+id+': anchor estimate without full rest ('+sec+' s)');
   rep.push(pn+' '+id+': '+s.blocks.map(x=>x.lowb?'['+x.name+']':x.name).join(' > ')+' · '+s.min+' min');});
 D.tab='train';k.day().pick='KA';k.render();const det=z.$$('details.blk').find(d=>/focus/i.test(d.querySelector('.bn').textContent));
 if(!det||!/Anchor set by set/.test(det.textContent)||/Circuit/.test(det.querySelector('.kind').textContent))issue(pn+': emphasis block not shown as anchor set by set');
 if(z.errs.length)issue(pn+' anchor JS errors '+z.errs.join('; '));});

// 4 "Just starting": first 4 training weeks only easy runs, ≤ 2 per training week; hard runs later possible
{const z=boot(),k=z.k,D=setup(k,prof('Partner lower'),START);D.startP='s0';D.focus='bal';D.emph='bal';const rows=sim(k,56,START);const W={};
 rows.forEach(r=>{const w=Math.floor(day(START,r.d)/7),x=W[w]||(W[w]={runs:0,hard:0,ids:[]});x.ids.push(r.id);if(r.btn==='run'){x.runs++;if(r.id!=='RE')x.hard++;}});
 Object.keys(W).forEach(w=>{const x=W[w];if(+w<4){if(x.hard)issue('Just starting week '+(+w+1)+': hard run ('+x.ids.join(' ')+')');if(x.runs>2)issue('Just starting week '+(+w+1)+': '+x.runs+' runs');}});
 k.today(addD(START,10));if(k.runRec().id!=='RE')issue('Just starting: run page suggests '+k.runRec().id+' in week 2');
 const later=Object.keys(W).filter(w=>+w>=4).reduce((a,w)=>a+W[w].hard,0);rep.push('Just starting: '+Object.keys(W).map(w=>'W'+(+w+1)+' ['+W[w].ids.join(' ')+']').join(' ')+' · hard runs after week 4: '+later);
 if(!later)issue('Just starting: no hard run or intervals after the first 4 training weeks');if(z.errs.length)issue('beginner JS errors '+z.errs.join('; '));}

// 5 home skills start with a warm-up including wrist prep (N-3)
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),START);k.today(TD);D.loc='h';const s=k.S('HK',k.ctx(TD));const b=s.blocks[0];
 if(!b||!b.warm)issue('Home skills without a warm-up first');else if(!b.items.some(it=>k.curVar(it,'h')>=0&&/Wrist prep/.test(it.opts[k.curVar(it,'h')].n)))issue('Home skills warm-up without wrist prep');
 if(!s.blocks[s.blocks.length-1].cool&&!s.blocks.some(x=>x.cool))rep.push('HK has no cool-down block (unchanged)');}

// 6 comeback in a deload cycle week is no deload (N-4)
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),'2026-09-07');D.kickDays=[];
 for(let w=0;w<5;w++)['KA','KB','KC'].forEach((id,j)=>D.logs.push({d:addD('2026-09-07',7*w+2*j),id,t:id,rpe:6,lg:id==='KC'?1:0}));
 const R='2026-10-26';k.today(R);const c=k.ctx(R);if(c.cyc!==6)issue('comeback setup: cycle week '+c.cyc+' (want 6)');const cb=k.cbInfo(R);if(!cb.on||!cb.low)issue('comeback setup: '+JSON.stringify(cb));
 if(k.dlWk(R,c))issue('comeback day in a deload cycle week counted as deload');D.tab='train';k.day().pick='KA';k.render();if(/· Deload/.test(z.$('.hero .eyebrow').textContent))issue('comeback session header shows Deload');
 D.logs.push({d:R,id:'KA',t:'KA',rpe:6,lg:0},{d:addD(R,2),id:'KB',t:'KB',rpe:6,lg:0});const T3=addD(R,4);k.today(T3);const c3=k.ctx(T3),cb3=k.cbInfo(T3);
 if(!cb3.on||cb3.low)issue('third comeback session setup: '+JSON.stringify(cb3));const s3=k.S('KC',c3);if(s3.min<60)issue('third comeback session in the deload cycle week not filled up: '+s3.min+' min');
 D.tab='train';k.day().pick='KC';k.render();if(/Deload/.test(z.$('.hero .eyebrow').textContent))issue('header shows Deload in the comeback week');
 rep.push('comeback in deload cycle week: KC '+s3.min+' min, header "'+z.$('.hero .eyebrow').textContent+'"');
 const z2=boot(),k2=z2.k,D2=setup(k2,prof('Captain'),'2026-09-07');D2.kickDays=[];for(let w=0;w<5;w++)['KA','KB','KC'].forEach((id,j)=>D2.logs.push({d:addD('2026-09-07',7*w+2*j),id,t:id,rpe:6}));
 k2.today('2026-10-12');const c2=k2.ctx('2026-10-12');if(c2.cyc!==6||!k2.dlWk('2026-10-12',c2))issue('a real deload week is no longer deload');}

// 7 kg goal without history: the first log sets the start value, never meets the goal at once (N-11)
{const z=boot(),k=z.k,D=setup(k,prof('Partner lower'),START);k.today(TD);D.logs=[{d:addD(TD,-9),id:'KA',t:'KA',rpe:6}];k.setGoal('sq');const g0=JSON.stringify(D.goal);
 if(!D.goal||D.goal.b!==0)issue('kg goal setup '+g0);const dy=k.day();dy.pick='KC';dy.fin={rpe:6};const c=k.ctx(TD),s=k.S('KC',c);
 s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(v<0)return;const key='KC-'+bi+'-'+ii;dy.done[key]=true;if(it.f||it.iso||it.test)return;
   dy.inp[key]={s:Array(k.setsOf(it,b,c,'KC')).fill('6'),w:it.opts[v].w?(/^Barbell back squat$/.test(it.opts[v].n)?'100':'20'):''};}));k.saveTrain();
 const G=D.goal;if(!G)issue('kg goal met by the first log ('+JSON.stringify(D.goalsDone)+')');else{if(G.b!==100)issue('kg goal start value not from the first log: '+G.b);if(!(G.v>100))issue('kg goal target not above the start: '+G.v);if(G.nb)issue('kg goal still waiting for a start value');}
 rep.push('kg goal without history: '+g0+' → '+JSON.stringify(G));}

// 8 Tired may shorten to 45 min; the other floors stay (A-047: a leg session keeps ≥ 4 leg sets on the tired day, the
//   weekly legs + hinge floor is checked over the week in t37)
PROF.forEach(p=>{const z=boot(),k=z.k,D=setup(k,p,START);sim(k,28,START);const td=addD(START,28);k.today(td);D.opt.ready=true;const c=k.ctx(td);let under60=0;
 ['KA','KB','KC'].forEach(id=>{k.day().ready=2;const sn=k.S(id,c);k.day().ready=3;const st=k.S(id,c);if(st.min<45&&sn.min>=45)issue(p.n+' '+id+': tired '+st.min+' min (< 45)');if(st.min<60)under60++;
   st.blocks.forEach(b=>b.items.forEach(it=>{if(!k.itPat(it)||k.curVar(it,'g')<0)return;if(k.setsOf(it,b,c,id)<2)issue(p.n+' '+id+' '+it.k+': tired under 2 sets');}));
   if(k.legSets(sn,c,id)>=6&&k.legSets(st,c,id)<4)issue(p.n+' '+id+': tired leg session under 4 leg sets (A-047)');
   const lb=st.blocks.find(b=>b.lowb);if(sn.blocks.some(b=>b.lowb&&b.items.some(it=>it.anc))&&!(lb&&lb.items.some(it=>it.anc)))issue(p.n+' '+id+': tired lost the anchor');
   rep.push(p.n+' '+id+': normal '+sn.min+' · tired '+st.min+' min');});
 if(z.errs.length)issue(p.n+' tired JS errors '+z.errs.join('; '));});

// 9 run focus: ≥ 1 leg session and 2 strength sessions per training week outside the deload week, trial 14 ± 2 days
{const z=boot(),k=z.k,D=setup(k,prof('Runner'),'2026-08-31');sim(k,84,'2026-08-31');const W={};
 D.logs.forEach(l=>{const w=Math.floor(day('2026-08-31',l.d)/7),x=W[w]||(W[w]={leg:0,str:0,dl:false});if(l.id==='DL'||l.id==='TE')x.dl=true;if(k.legLog(l))x.leg++;if({KA:1,KB:1,KC:1,CH:1,HO:1}[l.id])x.str++;});
 Object.keys(W).forEach(w=>{const x=W[w];if(x.dl)return;if(x.leg<1)issue('Runner week '+(+w+1)+': no leg session');if(x.str<2)issue('Runner week '+(+w+1)+': '+x.str+' strength session(s), the focus text says twice a week');});
 const ch=D.logs.filter(l=>l.id==='CH').map(l=>l.d);for(let i=1;i<ch.length;i++){let g=day(ch[i-1],ch[i]);for(let d=addD(ch[i-1],1);d<ch[i];d=addD(d,1)){k.today(d);if(k.ctx(d).cyc===6)g--;}if(g<12||g>16)issue('Runner trial gap '+ch[i-1]+' → '+ch[i]+': '+g+' days without deload days');}
 if(ch.length<4)issue('Runner: only '+ch.length+' trials in 12 weeks');const foc=k.FOC.find(f=>f[0]==='run');if(!/Strength twice a week/.test(foc[2]))rep.push('focus text changed: '+foc[2]);
 rep.push('Runner: trials '+ch.join(', ')+' · weeks '+Object.keys(W).map(w=>(W[w].dl?'DL':W[w].str+'/'+W[w].leg)).join(' '));}

// 10 A-027 rests: kickboxing cool-down through the pain filter, additions like painApply, b2_tr = push
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),START);k.today(TD);D.tab='kick';k.render();const t0=z.txt();if(!/Pigeon pose/.test(t0))issue('kickboxing cool-down without pigeon pose (setup)');
 D.pain={h:true};k.render();const t1=z.txt();['Pigeon pose','Frog stretch','hip flexor stretch'].forEach(n=>{if(t1.indexOf(n)>=0)issue('kickboxing cool-down shows "'+n+'" with hip pain');});
 if(k.KMPOST().items.some(it=>k.painHit(it.opts[0].n)))issue('KMPOST keeps a painful stretch');
 // additions: own pain-free variant, else a replacement of the same group, else removed with a hint
 D.pain={b:true};k.day().add=['Barbell back squat'];let a=k.ADDB(),it=a.items[0],v=k.curVar(it,'g');
 if(v<0||k.painHit(it.opts[v].n)||it.px!=='Barbell back squat')issue('addition with a pain-free variant: '+(v>=0?it.opts[v].n:'-')+' px '+it.px);
 D.pain={k:true};k.day().add=['Sumo squats','Cable lateral raises'];a=k.ADDB();it=a.items[0];v=k.curVar(it,'g');const ok=(v<0&&it.pgone==='Sumo squats')||(v>=0&&!k.painHit(it.opts[v].n)&&it.px==='Sumo squats');
 if(!ok)issue('painful addition neither replaced nor removed: '+JSON.stringify({v,px:it.px,gone:it.pgone}));if(k.curVar(a.items[1],'g')<0)issue('pain-free addition lost');
 if(v>=0&&TBL.group(it.k,it.opts[v].n)!=='knee'&&k.kitGroup(it)!=='knee')issue('addition replacement out of its group: '+it.opts[v].n);
 D.tab='train';k.day().pick='KA';k.render();if(v<0&&!/Sumo squats: removed today/.test(z.txt()))issue('removed addition without a hint');
 D.pain={};k.day().add=[];
 // b2_tr counts as push (doctrine table, volSets, old logs)
 const b2={k:'b2_tr',opts:[{n:'Cable triceps pushdown',req:'',w:true}]};if(k.itPat(b2,0)!=='push'||TBL.pattern('b2_tr','Cable triceps pushdown')!=='push')issue('b2_tr is not push: app '+k.itPat(b2,0)+' / table '+TBL.pattern('b2_tr','Cable triceps pushdown'));
 const old={d:addD(TD,-2),id:'KB',t:'KB',rpe:6,vm:2,vs:{pull:6,push:6,legs:0,hinge:0,core:0},ex:{'b2_tr#0':[12,20]}};const lv=k.logVs(old);if(!lv||lv.push!==9||lv.pull!==6)issue('old log: b2_tr sets not read as push '+JSON.stringify(lv));
 if(JSON.stringify(old.vs)!=='{"pull":6,"push":6,"legs":0,"hinge":0,"core":0}')issue('old log changed');
 if(z.errs.length)issue('rests JS errors '+z.errs.join('; '));}

console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
