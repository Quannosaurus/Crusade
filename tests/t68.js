// @name band-design
// A-059: two design faults from the 24-week probe of A-057 stay fixed. 1) No exercise and no function twice in a session:
// the band swap brought "Abductor machine" next to an emphasis "Abductor machine" (Partner glutes, Strength B, weeks 13–24),
// because the under-60 fill later took it from the emphasis list; every step that brings an exercise in now asks sesHas()
// and leaves it out without a valid one. 2) The 7-day hinge peak of the goal profiles (Partner glutes + Hip thrust, Partner
// lower + Squat) and of the glute/lower profiles stays at the upper limit 20 + 2 also in the volume block (peakGuard: goal
// and anchor stay, companions of the pattern give way, the time goes to patterns with room). 48 weeks, every accent block.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const START='2026-09-21',prof=n=>PROF.find(p=>p.n===n);
function setup(k,p){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(START);return D;}
const day=d=>Math.round((Date.parse(d)-Date.parse(START))/864e5);

// 0 units: sesHas sees the same name and the same function, not the item it replaces; the peak limit is 20 + 2 in every block
{const {k,errs}=boot();setup(k,prof('Partner glutes'));const it=(key,n)=>({k:key,opts:[{n}]});
 const a=it('g_ab','Abductor machine'),b=it('kp_cop','Copenhagen Plank'),s={blocks:[{name:'X',items:[a]}]};
 if(!k.sesHas(s,it('mx_g_ab','Abductor machine')))issue('sesHas misses the same name');
 if(!k.sesHas(s,it('r_fp1','Fire hydrants')))issue('sesHas misses the same function (abduction)');
 if(k.sesHas(s,b))issue('sesHas sees a function the session does not have');
 if(k.sesHas(s,it('mx_g_ab','Abductor machine'),a))issue('sesHas counts the item it replaces');
 if(k.sesHas({blocks:[{warm:1,items:[a]}]},it('mx_g_ab','Abductor machine')))issue('sesHas counts the warm-up');
const pl=k.pkLim('hinge');if(pl!==22)issue('peak limit hinge '+pl+' (expected 20 + 2)');
 if(errs.length)issue('JS errors '+errs.join('; '));}

// 1+2 48 weeks: duplicates and hinge peaks
const RUNS=[['Partner glutes',null],['Partner glutes','ht'],['Partner lower','sq'],['Partner lower',null]];
RUNS.forEach(([n,gk])=>{const {k,errs}=boot(),D=setup(k,prof(n)),pn=n+(gk?' + goal '+gk:'');if(gk){k.setGoal(gk);D.goal.v=999;}
  let dup=0,ses=0;
  sim(k,336,START,(r,s)=>{if(!r.s||!['KA','KB','KC','CH','HO'].includes(r.id))return;ses++;const seen={},fun={};
    r.s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(it.gone)return;const v=k.curVar(it,k.LOC());if(v<0)return;const nm=it.opts[v].n,f=k.funOf(nm);
      /* name twice: only where one of the two came in by a swap or the design (band swap bx, emphasis swap sw, goal swap gsw); a trial test
         of the anchor exercise is no second exercise */
      const inn=!!(it.bx||it.sw||it.gsw);if(!it.test&&seen[nm]&&(inn||seen[nm]>1)){dup++;issue(pn+' '+s+' '+r.id+': '+nm+' twice (one brought in by the design)');}if(!it.test)seen[nm]=seen[nm]||(inn?2:1);
      if(f&&fun[f]&&fun[f]!==nm){dup++;issue(pn+' '+s+' '+r.id+': function '+f+' twice ('+fun[f]+' / '+nm+')');}if(f)fun[f]=nm;});});
    if(r.min<60||r.min>90)issue(pn+' '+s+' '+r.id+': '+r.min+' min');});
  /* tolerance rule (A-026/A-053): one set over with the newest leg session at the floor legs + hinge 10 ranks the floor first: noted */
  let peak=0,pkd='',flo=0;for(let i=6;i<336;i++){let h=0,last=null;D.logs.forEach(l=>{const x=day(l.d);if(x>i-7&&x<=i&&l.vs&&!l.bl){h+=l.vs.hinge;if(l.vs.hinge)last=l;}});
    if(h===23&&last&&last.vs.legs+last.vs.hinge<=10){flo=Math.max(flo,h);continue;}if(h>peak){peak=h;pkd=i;}}
  if(flo)rep.push('  note: '+pn+' hinge '+flo+' in 7 days with the newest leg session at the floor legs + hinge 10');
  if(peak>22)issue(pn+': hinge '+peak+' sets in 7 days (day '+pkd+', > 20 + 2)');
  rep.push(pn+': '+ses+' strength sessions, duplicates '+dup+', hinge peak '+peak+' (day '+pkd+')');
  if(errs.length)issue(pn+' JS errors '+errs.join('; '));});

rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exit(P.length?1:0);
