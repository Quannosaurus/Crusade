// @name trial-content
// A-033 Skill Trial content. M-5: blocks 2–4 follow skills and level – without any skill the "Pull & push" circuit plus one
// core block, no front lever, planche, back lever or dragon flags for profiles without those skills, level 0 starts every
// item with its easy variant; the front lever / planche skill brings its own work. M-6: no Skill Trial the day after a hard
// other activity; a trial on such a day carries only the emphasis anchor with 2 sets and no jumps. Day before kickboxing
// (also the 16-day fallback): no jumps, every Romanian deadlift at most 2 sets.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const {sim,addD}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),txt:()=>w.document.getElementById('app').textContent};}
const TD='2026-11-16',START='2026-09-21';
const prof=n=>PROF.find(p=>p.n===n);
function setup(k,p,start){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],ex:{},start:start||START,short:false,fav:(p.fav||[]).slice(),never:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(start||TD);return D;}
const ADV=/front lever|planche|back lever|dragon flag/i;
const shown=(k,s)=>{const out=[];s.blocks.forEach(b=>{if(b.warm||b.cool||b.trial)return;b.items.forEach(it=>{const v=k.curVar(it,k.LOC());if(v>=0)out.push({b,it,n:it.opts[v].n});});});return out;};

// 1 M-5: no skills / level 0 → no advanced content, Pull & push + core, easy variants; skills bring their own work
[['Partner lower',{},null],['Partner glutes',{},null],['Captain',{hs:true,mu:true},null],['Captain',{fl:true},'fl'],['Captain',{pl:true},'pl'],['Runner',{hs:true},null]].forEach(([pn,sk,want])=>{
  const z=boot(),k=z.k,D=setup(k,prof(pn),START);D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},sk);k.today(TD);D.logs=[{d:addD(TD,-20),id:'KA',t:'KA',rpe:6}];
  const s=k.S('CH',k.ctx(TD)),v=shown(k,s),names=v.map(x=>x.n),any=Object.keys(sk).some(q=>sk[q]),L=k.lvl();
  if(!sk.fl&&!sk.pl)v.forEach(x=>{if(ADV.test(x.n))issue(pn+' '+JSON.stringify(sk)+': advanced trial content "'+x.n+'" in '+x.b.name);});
  if(sk.fl&&!sk.pl)v.forEach(x=>{if(/planche/i.test(x.n))issue(pn+' fl only: planche content "'+x.n+'"');});
  if(sk.pl&&!sk.fl)v.forEach(x=>{if(/lever|dragon flag/i.test(x.n))issue(pn+' pl only: lever content "'+x.n+'"');});
  if(want==='fl'&&!names.some(n=>/front lever/i.test(n)))issue(pn+' with the front lever skill: no front lever work in the trial');
  if(want==='pl'&&!names.some(n=>/planche/i.test(n)))issue(pn+' with the planche skill: no planche work in the trial');
  if(!any){if(!s.blocks.some(b=>b.name==='Pull & push'))issue(pn+' without skills: no Pull & push circuit');if(!s.blocks.some(b=>b.name==='Core'))issue(pn+' without skills: no core block');
    if(s.blocks.some(b=>/^Block [234]$/.test(b.name)))issue(pn+' without skills: blocks 2–4 still there');}
  if(L===0)s.blocks.forEach(b=>{if(b.warm||b.cool||b.trial)return;b.items.forEach(it=>{if(!it.f||!it.lv||it.opts.length<2)return;const vv=k.curVar(it,'g');if(vv!==1&&k.avail(it,'g').indexOf(1)>=0)issue(pn+' level 0: '+b.name+' starts with "'+it.opts[vv].n+'" instead of the easy variant');});});
  if(s.min<60||s.min>90)issue(pn+' '+JSON.stringify(sk)+': trial '+s.min+' min');
  rep.push(pn+' '+JSON.stringify(sk)+' L'+L+': '+s.blocks.filter(b=>!b.warm&&!b.cool).map(b=>b.name+'['+b.items.map(it=>{const q=k.curVar(it,'g');return q<0?'-':it.opts[q].n;}).join(', ')+']').join(' ')+' · '+s.min+' min');
  if(z.errs.length)issue(pn+' JS errors '+z.errs.join('; '));});
// level 0 vs level 1 on the same items
{const z=boot(),k=z.k,D=setup(k,prof('Captain'),START);k.today(TD);D.logs=[{d:addD(TD,-20),id:'KA',t:'KA',rpe:6}];const b2=s=>s.blocks.find(b=>b.name==='Block 2');
 const pu=s=>{const it=b2(s).items.find(x=>x.fp==='push');return it.opts[k.curVar(it,'g')].n;};const hi=pu(k.S('CH',k.ctx(TD)));
 Object.assign(D.profile,{pull:0,dips:0,mu:0});const lo=pu(k.S('CH',k.ctx(TD)));if(hi!=='Push-Ups'||!/easier/.test(lo))issue('level 1 → '+hi+', level 0 → '+lo+' (want Push-Ups / the easy variant)');}

// 2 M-6: no trial the day after a hard other activity; a trial on such a day: anchor only with 2 sets, no jumps
['Partner lower','Partner glutes','Captain'].forEach(pn=>{const z=boot(),k=z.k,D=setup(k,prof(pn),START);D.kickDays=[];
 let due=null;sim(k,70,START,(r,s)=>{if(!due&&r.id==='CH'&&s>addD(START,30))due=s;});if(!due){issue(pn+': no trial found in the simulation');return;}
 D.logs=D.logs.filter(l=>l.d<due);D.days={};k.today(due);const r0=k.recAll(due,false);if(r0.id!=='CH')issue(pn+' setup: '+due+' recommends '+r0.id);
 D.logs.push({d:addD(due,-1),id:'OA',t:'Hiking',rpe:8,min:180});D.logs.sort((a,b)=>a.d<b.d?-1:1);const r1=k.recAll(due,false);if(r1.id==='CH')issue(pn+': Skill Trial the day after a hard other activity');
 const c=k.ctx(due),s=k.S('CH',c),lb=s.blocks.find(b=>b.lowb);
 if(lb){if(lb.items.length!==1||!lb.items[0].anc)issue(pn+' after hard OA: emphasis block '+lb.items.map(it=>it.k).join()+' (want the anchor only)');lb.items.forEach(it=>{if(k.setsOf(it,lb,c,'CH')!==2)issue(pn+' after hard OA: anchor '+k.setsOf(it,lb,c,'CH')+' sets (want 2)');});}
 else if(['lower','glutes'].includes(D.emph))issue(pn+' after hard OA: no emphasis block');
 shown(k,s).forEach(x=>{if(/jump/i.test(x.n))issue(pn+' after hard OA: jumps in the trial ("'+x.n+'")');});
 rep.push(pn+' after hard OA on '+due+': recommendation '+r1.id+' · trial '+s.min+' min, emphasis '+(lb?lb.items.map(it=>it.k+'×'+k.setsOf(it,lb,c,'CH')).join(' '):'-'));
 const s0=(()=>{D.logs=D.logs.filter(l=>l.id!=='OA');return k.S('CH',c);})();if(['lower','glutes'].includes(D.emph)){const l0=s0.blocks.find(b=>b.lowb);if(!l0||l0.items.length<2)issue(pn+': without the other activity the emphasis block is cut too');}
 if(z.errs.length)issue(pn+' JS errors '+z.errs.join('; '));});

// 3 day before kickboxing (also the 16-day fallback): no jumps, Romanian deadlift at most 2 sets
['Partner lower','Captain'].forEach(pn=>{const z=boot(),k=z.k,D=setup(k,prof(pn),START);
 let day=null;sim(k,70,START,(r,s)=>{if(!day&&r.id==='CH'&&s>addD(START,30))day=s;});if(!day){issue(pn+': no trial');return;}
 D.logs=D.logs.filter(l=>l.d<day);D.days={};k.today(day);D.kickDays=[new Date(addD(day,1)+'T12:00:00Z').getUTCDay()];
 const c=k.ctx(day),s=k.S('CH',c),v=shown(k,s);v.forEach(x=>{if(/jump/i.test(x.n))issue(pn+' day before kickboxing: jumps in the trial ("'+x.n+'")');
   if(/romanian deadlift/i.test(x.n)&&x.it.k&&k.setsOf(x.it,x.b,c,'CH')>2)issue(pn+' day before kickboxing: '+x.n+' '+k.setsOf(x.it,x.b,c,'CH')+' sets in '+x.b.name);});
 const rdl=v.filter(x=>/romanian deadlift/i.test(x.n)&&x.it.k);rep.push(pn+' day before kickboxing '+day+': trial '+s.min+' min, RDL '+(rdl.map(x=>x.b.name+' '+k.setsOf(x.it,x.b,c,'CH')).join(', ')||'none')+', jumps '+(v.some(x=>/jump/i.test(x.n))?'yes':'none'));
 if(s.min<60||s.min>90)issue(pn+' day before kickboxing: trial '+s.min+' min');
 // the 16-day fallback lands on the day before kickboxing with the same rules
 const h=k.hist(day),gap=k.chGap(day,h);if(gap<16){const d16=addD(day,16-gap);k.today(d16);D.kickDays=[new Date(addD(d16,1)+'T12:00:00Z').getUTCDay()];const r=k.recAll(d16,false);
   if(r.id==='CH'){const s16=k.S('CH',k.ctx(d16));shown(k,s16).forEach(x=>{if(/jump/i.test(x.n))issue(pn+' 16-day fallback: jumps ("'+x.n+'")');if(/romanian deadlift/i.test(x.n)&&x.it.k&&k.setsOf(x.it,x.b,k.ctx(d16),'CH')>2)issue(pn+' 16-day fallback: RDL over 2 sets');});rep.push(pn+' 16-day fallback '+d16+': trial checked');}}
 // without the kick rule the jumps are back (skill profiles)
 D.kickDays=[];k.today(day);const sn=k.S('CH',c);if(Object.keys(D.skills).some(q=>D.skills[q])&&!shown(k,sn).some(x=>/jump/i.test(x.n))&&!k.painHit('Jumping Squats'))issue(pn+': no jumps on a normal trial day');
 if(z.errs.length)issue(pn+' JS errors '+z.errs.join('; '));});

console.log(rep.join('\n'));console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
