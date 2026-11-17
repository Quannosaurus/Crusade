// @name longterm-views
// A-046 (L8): long-term views and passive gamification. Period choice 12 weeks / 1 year / everything for the calendar,
// load and kilometres (monthly values from 1 year); exercise progress from 40 points as monthly bests; year review card
// under Status (after 52 weeks and in January, by itself); ranks count on after the highest rank in stages of 8,000 XP
// (own name per theme plus a number); six tiered honours; daily lines and finish messages ≥ 60 per theme (love excluded),
// picked without repetition within a pass; the Chronicle builds older entries only on request.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const T0='2026-11-17';
/* history: from `start` a strength log every 2 days, a run every 3 days, a Blitz on every 4th log */
function setup(k,start,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:'bal',emph:'lower',kickDays:[],logs:[],start,short:false,goal:null,fav:[],theme:o.theme||'templar',pr:{},honSeen:[],goalsDone:[]});
  D.ex={};D.days={};let i=0;for(let d=start;d<=(o.end||T0);d=addD(d,1),i++){if(i%2===0)D.logs.push({d,id:'KA',t:'Strength A',rpe:6,min:70,vs:{pull:8},ex:{'a_row#1':[8+(i%5),20+Math.floor(i/30)]},abs:i%8===0?1:undefined,pr:i%40===0?1:undefined});if(i%3===0)D.logs.push({d,id:'RE',t:'Easy run',rpe:4,km:5,min:33});}
  D.logs.forEach(l=>{if(l.abs===undefined)delete l.abs;if(l.pr===undefined)delete l.pr;});k.today(o.today||T0);return D;}
// 1 period choice: chips in Status and Chronicle, monthly values from 1 year, everything from the first month
{const {k,d}=boot();const D=setup(k,'2024-09-02');D.tab='stand';k.render();
  const chips=[...d.querySelectorAll('[data-a=per]')];if(chips.length<3)issue('Status: no period chips');
  const aria=()=>[...d.querySelectorAll('svg[aria-label]')].map(s=>s.getAttribute('aria-label')).join(' | ');
  if(!/per week, last 12 weeks/.test(aria()))issue('12 weeks not the default');
  d.querySelector('[data-a=per][data-v="1y"]').click();let a=aria();if(!/Training sessions per month, 1 year/.test(a)||!/Load per month, 1 year/.test(a)||!/Kilometres per month, 1 year/.test(a))issue('1 year not monthly: '+a);
  const pm=k.perMonths();if(pm.m.length!==12||pm.m[11]!=='2026-11')issue('1 year months: '+pm.m.join(','));
  d.querySelector('[data-a=per][data-v=all]').click();const pa=k.perMonths();if(pa.m[0]!=='2024-09'||pa.m.length!==27)issue('all months: '+pa.m[0]+' × '+pa.m.length);
  const nsum=pa.n.reduce((x,y)=>x+y,0),real=D.logs.filter(l=>l.id!=='MO').length;if(nsum!==real)issue('monthly sessions '+nsum+' ≠ '+real);
  const kmsum=Math.round(pa.km.reduce((x,y)=>x+y,0)),realkm=Math.round(D.logs.reduce((x,l)=>x+(l.km||0),0));if(kmsum!==realkm)issue('monthly km '+kmsum+' ≠ '+realkm);
  D.tab='verlauf';k.render();if(!/Training sessions per month, everything/.test(aria()))issue('Chronicle calendar does not follow the period');
  d.querySelector('[data-a=per][data-v="12w"]').click();if(!/Training calendar of the last 12 weeks/.test(aria()))issue('Chronicle 12 weeks heatmap missing');
  rep.push('period: 1 year 12 months, all '+pa.m.length+' months, sessions '+nsum+', km '+kmsum);}
// 2 exercise progress: from 40 points the best value per month
{const {k,d}=boot();const D=setup(k,'2025-06-02');D.tab='stand';k.render();const sel=d.getElementById('statex');
  if(!sel)issue('no exercise progress');else{const txt=d.getElementById('app').textContent;if(!/Best value per month/.test(txt))issue('≥ 40 points not shown as monthly bests');
    const ch=[...d.querySelectorAll('svg[aria-label$="progress"] circle')].length;if(ch&&ch>20)issue('monthly chart has '+ch+' points');}
  const D2=setup(k,'2026-09-01');D2.tab='stand';k.render();if(/Best value per month/.test(d.getElementById('app').textContent))issue('few points shown as monthly bests');rep.push('exercise progress: monthly bests from 40 points');}
// 3 year review: after 52 weeks (last 12 months), in January the year before, not before 52 weeks
{const {k,d}=boot();let D=setup(k,'2025-11-01');D.goalsDone=[{k:'pull',v:10,d:'2026-05-01',r:'f'},{k:'d5',v:5,d:'2026-07-01',r:'e'}];D.tab='stand';k.render();
  let r=k.yearRev();if(!r||!/last 12 months/.test(r.lab))issue('no year review after 52 weeks: '+JSON.stringify(r));else{if(r.goals!==1)issue('goals reached '+r.goals);if(!(r.ses>100&&r.km>100&&r.streak>=1))issue('review numbers '+JSON.stringify(r));}
  if(!d.querySelector('.yrev'))issue('year review card not under Status');
  D=setup(k,'2026-03-01');if(k.yearRev())issue('year review before 52 weeks');
  D=setup(k,'2025-10-01',{end:'2026-01-10',today:'2026-01-12'});r=k.yearRev();if(!r||r.lab!=='Your year 2025'||r.f!=='2025-01-01')issue('January review of the year before: '+JSON.stringify(r));
  rep.push('year review: "'+(k.yearRev()||{}).lab+'"');}
// 4 ranks count on after the highest rank: stage every 8,000 XP, own name per theme plus a number
{const {k,d}=boot();const D=setup(k,'2026-11-01');const top=16000;
  if(k.rankExt(top)!==0||k.rankExt(top+7999)!==0||k.rankExt(top+8000)!==1||k.rankExt(top+24000)!==3)issue('rank stages '+[k.rankExt(top),k.rankExt(top+8000),k.rankExt(top+24000)]);
  if(k.rankLabel(top+8000)!=='Hero of the Crusade 1')issue('templar stage name '+k.rankLabel(top+8000));D.theme='plain';k.render();if(k.rankLabel(top+16000)!=='Legend 2')issue('plain stage name '+k.rankLabel(top+16000));
  if(/Crusade/.test(k.rankLabel(top+8000)))issue('plain shows templar stage');rep.push('stages: '+k.rankLabel(top+16000)+' · templar '+(D.theme='templar',k.rankLabel(top+8000)));}
// 5 tiered honours: six, tiers by the concept, passive toast, tiers stay once seen
{const {k,d}=boot();let D=setup(k,'2024-11-01');const T=k.honTiers();if(T.length!==6)issue(T.length+' tiered honours');
  const want={t_ent:[100,500,1000,2000],t_km:[100,500,1000,2000],t_wks:[4,26,52,104],t_yrs:[1,2,3],t_rec:[10,50,100],t_blz:[25,100,250]};
  T.forEach(t=>{const w=want[t.k];if(!w)issue('unknown tier '+t.k);else{const exp=w.filter(x=>t.v>=x).length;if(t.tier!==exp)issue(t.k+' value '+t.v+' tier '+t.tier+' expected '+exp);}});
  const yrs=T.find(t=>t.k==='t_yrs');if(!yrs||yrs.tier!==2)issue('years tier '+(yrs&&yrs.tier));
  D.tab='stand';k.render();if(!d.querySelector('.hon.tiers'))issue('tier section missing');
  /* passive toast when a new tier is reached by a log */
  D=setup(k,'2026-11-10');D.logs=[];for(let i=0;i<99;i++)D.logs.push({d:addD('2026-08-10',i),id:'KA',t:'Strength A',rpe:6,min:70});D.honSeen=[];k.honTiers();const dy=k.day();dy.run='RE';dy.fin={rpe:4,km:'5',min:'33'};k.saveRun();
  const t=(d.querySelector('.toast')||{}).textContent||'';if(!/Chronicler I\b/.test(t))issue('no tier toast at 100 entries: '+t);if(D.honSeen.indexOf('t_ent1')<0)issue('tier not in honSeen');
  D.logs=D.logs.slice(0,50);if(k.honTiers().find(x=>x.k==='t_ent').tier!==1)issue('a seen tier was lost');
  D.theme='plain';if(!/^Logbook/.test(k.honTiers()[0].n))issue('plain tier names');
  const c=k.cleanImport({v:3,honSeen:['t_ent1','t_km2','__proto__','x'.repeat(50)]});if(c.honSeen.join()!=='t_ent1,t_km2')issue('honSeen import '+c.honSeen);
  rep.push('tiers: '+T.map(t=>t.n+' ('+t.v+')').join(', '));}
// 6 texts: ≥ 60 daily lines and finish messages per theme (love unchanged), unique, no repetition inside a pass
{const {k}=boot();const TH=k.THEMES||null;const out=[];
  ['templar','sanguine','sisters','slaanesh','nurgle','plain'].forEach(th=>{const D=k.D();D.theme=th;['notes','toast'].forEach(f=>{const L=k.TH()[f];const u=new Set(L);if(L.length<60)issue(th+' '+f+': '+L.length);if(u.size!==L.length)issue(th+' '+f+': duplicates');
      const pass=new Set();for(let n=0;n<L.length;n++)pass.add(k.pickNR(L,n,th.length));if(pass.size!==L.length)issue(th+' '+f+': repeats inside a pass ('+pass.size+'/'+L.length+')');
      const p2=new Set();for(let n=L.length;n<2*L.length;n++)p2.add(k.pickNR(L,n,th.length));if(p2.size!==L.length)issue(th+' '+f+': second pass repeats');});out.push(th+' '+k.TH().notes.length+'/'+k.TH().toast.length);});
  const D=k.D();D.theme='plain';const all=k.TH().notes.concat(k.TH().toast).join(' ');if(/Emperor|Xenos|heretic|crusade|Grandfather|chapter|Imperator|Baal|Slaanesh|Nurgle/i.test(all))issue('Plain texts with theme words');
  if(k.TXX.love)issue('love theme got new texts');rep.push('texts '+out.join(', '));}
// 7 Chronicle: 20 entries, older ones only on request (50 more per tap)
{const {k,d}=boot();const D=setup(k,'2025-01-01');D.tab='verlauf';k.render();const n=()=>d.querySelectorAll('.log').length;const n0=n();
  const b=d.querySelector('[data-a=chmore]');if(!b)issue('no "older entries" button');if(n0>30)issue('Chronicle builds '+n0+' entries at once');
  if(b){b.click();const n1=n();if(n1!==n0+50)issue('one tap did not add 50: '+n0+' → '+n1);}
  rep.push('Chronicle: '+n0+' entries, then '+n()+' ('+D.logs.length+' total)');}
// 8 render every tab in all themes with a long history (runtime errors are counted by domguard)
{const {k,d}=boot();const D=setup(k,'2024-06-01');['templar','sanguine','sisters','slaanesh','nurgle','plain'].forEach(th=>{D.theme=th;['start','stand','verlauf','mehr'].forEach(t=>{D.tab=t;k.render();if(!d.getElementById('app').textContent.trim())issue(th+' '+t+' empty');});});}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
