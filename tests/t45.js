// @name pattern-table
// A-027: movement pattern and replacement group per item key and variant against a fixed doctrine table
// (tests/fixtures/pattern-table.js, written by hand, independent of PATK, itPat and kitGroup): hip extension = hinge
// (x_be bench, a_hyp), knee flexion (leg curl, Nordic curl) = legs, variant-dependent b_jump / x_be / u_cur, u_tri push,
// calf raises and abduction pattern-free and outside the leg count (LEGK derived, legSets), Core Blitz counts for core,
// fixed items with real load count by their pattern, Field kit / Never groups follow the pattern; old logs are read by
// the new mapping (vm 2; vm 3 since A-035 with b2_tr push) without being changed.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const TBL=require('./fixtures/pattern-table.js');
const P=[];const issue=m=>P.push(m);
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs};}
const TD='2026-11-16';
const {k,errs}=boot();const D=k.D();k.today(TD);Object.assign(D,{onb:true,start:'2026-10-01',fav:[],never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);
// every keyed item the app can show: sessions × emphases × gym/home with all skills, plus the catalogue
Object.keys(D.skills).forEach(q=>D.skills[q]=true);
const items={};const addIt=it=>{if(!it||!it.k||/^(mx_|fav_|gl_x)/.test(it.k))return;const key=it.k+'|'+it.opts.map(o=>o.n).join('/');if(!items[key])items[key]=it;};
const sessions=[];
for(const em of ['bal','lower','glutes','upper','core'])for(const loc of ['g','h'])for(const id of ['KA','KB','KC','CH','SK','HO','HK','DL','TE','RS']){D.emph=em;D.loc=loc;
  const s=k.S(id,k.ctx(TD));sessions.push({id,loc,em,s});s.blocks.forEach(b=>{b.items.forEach(addIt);(b.more||[]).forEach(addIt);});}
D.emph='bal';D.loc='g';const cat=k.favCatalog();Object.keys(cat).forEach(n=>addIt(cat[n].it));
let nChecked=0;
// 1 pattern per key and variant
Object.values(items).forEach(it=>{it.opts.forEach((o,v)=>{const want=TBL.pattern(it.k,o.n);nChecked++;
  if(want===undefined){issue('not in the doctrine table: '+it.k+' / '+o.n);return;}
  const got=k.itPat(it,v);if(got!==want)issue('pattern '+it.k+' / '+o.n+': '+JSON.stringify(got)+' (doctrine '+JSON.stringify(want)+')');});});
// 2 replacement group (Field kit / Never) per key, gym view and home view
Object.values(items).forEach(it=>{D.loc='g';const g=k.kitGroup(it),want=TBL.group(it.k,'',false);if(want!==undefined&&g!==want)issue('group (gym) '+it.k+': '+g+' (doctrine '+want+')');
  D.loc='h';const h=k.kitGroup(it),wh=TBL.group(it.k,'',true);if(wh!==undefined&&k.curVar(it,'h')>=0&&TBL.HOME_GROUP[TBL.pk(it.k)]&&h!==wh)issue('group (home) '+it.k+': '+h+' (doctrine '+wh+')');});
D.loc='g';
// copies share the key's pattern (Field kit "mx_", favourite "fav_")
[['mx_c_sq','legs'],['fav_g_ht','hinge'],['mx_c_calf',''],['fav_g_ab',''],['mx_u_tri','push']].forEach(([key,p])=>{if(k.itPat({k:key})!==p)issue('copy '+key+': '+k.itPat({k:key})+' ≠ '+p);});
// 3 leg keys: legs + hinge only (calf raises and abduction out), derived
TBL.ROWS.forEach(r=>{const leg=TBL.ROWS.some(x=>x[0]===r[0]&&(x[1]==='*'||x===TBL.ROWS.find(y=>y[0]===r[0]))&&(x[2]==='legs'||x[2]==='hinge'));if(!!k.LEGK.test(r[0])!==leg)issue('LEGK '+r[0]+': '+k.LEGK.test(r[0])+' (doctrine '+leg+')');});
['c_calf','g_ab','mx_g_ab','c_gm'].forEach(q=>{if(k.LEGK.test(q))issue(q+' still a leg key');});
// legSets / volSets: calf raises and abduction never count, knee flexion counts for legs
{const find=key=>Object.values(items).find(it=>it.k===key);const mk=(arr)=>({blocks:[{name:'x',p:1,rest:60,items:arr.map(([key,v])=>{const it=Object.assign({},find(key));it.fx=v;it.ts=3;return it;})}]});
 const c=k.ctx(TD);let s=mk([['c_calf',0],['g_ab',0],['c_sq',0]]);if(k.legSets(s,c,'KC')!==3)issue('legSets counts calf raises/abduction: '+k.legSets(s,c,'KC'));
 let v=k.volSets(s,c,'KC');if(v.legs!==3||v.hinge!==0)issue('volSets calf/abduction: '+JSON.stringify(v));
 s=mk([['c_rdl',2],['c_rdl',0],['b_jump',1],['b_jump',0],['u_tri',0],['u_cur',3],['u_cur',0]]);v=k.volSets(s,c,'KC');
 if(v.legs!==6||v.hinge!==6||v.push!==3||v.pull!==3)issue('volSets variant mapping: '+JSON.stringify(v)+' (legs 6, hinge 6, push 3, pull 3)');
 if(k.legSets(s,c,'KC')!==12)issue('legSets with knee flexion: '+k.legSets(s,c,'KC'));
 D.loc='h';const xb=Object.assign({},find('x_be'));xb.ts=3;s={blocks:[{name:'x',p:1,rest:60,items:[xb]}]};const vh=k.volSets(s,c,'HO');if(vh.core!==3||vh.hinge!==0)issue('x_be at home (superman/bird dog) not core: '+JSON.stringify(vh));D.loc='g';
 // 4 Core Blitz counts for core (rounds / 2 sets)
 const e={blocks:[]};e.ab={i:0,rounds:8,mini:false};if(k.volSets(e,c,'KA').core!==TBL.BLITZ.full)issue('full Core Blitz not '+TBL.BLITZ.full+' core sets');e.ab={i:0,rounds:4,mini:true};if(k.volSets(e,c,'KA').core!==TBL.BLITZ.mini)issue('compact Core Blitz not '+TBL.BLITZ.mini+' core sets');
 const ka=sessions.find(x=>x.id==='KA'&&x.loc==='g'&&x.em==='bal').s;if(ka.ab){const w0=Object.assign({},ka,{ab:null});if(k.volSets(ka,c,'KA').core-k.volSets(w0,c,'KA').core!==Math.round(ka.ab.rounds/2))issue('Blitz in a real session not counted');}
 // 5 fixed items with real load count by their pattern; other fixed items, holds and tests count for none
 const seen={};sessions.forEach(x=>x.s.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(!it.f)return;const row=TBL.FIXED.find(f=>f[0]===b.name&&(f[1]==='*'||f[1]===it.opts[0].n));const one={blocks:[{name:b.name,p:1,rest:0,items:[it]}]};const vv=k.volSets(one,c,x.id),sum=Object.keys(vv).reduce((a,q)=>a+(typeof vv[q]==='number'?vv[q]:0),0);
   if(row){seen[row[0]]=1;if(vv[row[2]]<1||(row[3]!=null&&vv[row[2]]!==row[3]))issue('fixed item with load '+row[0]+' ('+it.opts[0].n+'): '+JSON.stringify(vv));}
   else if(sum)issue('fixed item without load counts: '+b.name+' / '+it.opts[0].n+' '+JSON.stringify(vv));});}));
 ['Muscle-Up EMOM','Muscle-Up-Skill','Block 2','Block 3','Block 4'].forEach(n=>{if(!seen[n])issue('fixed item with load not found in any session: '+n);});
 // 6 replacements count under their own pattern: a Field kit replacement of a hinge item that lands on Nordic curls counts legs
 const mx={k:'mx_g_ht',kx:'hip',opts:[{n:'Nordic curls, feet under the sofa',req:'s',w:false},{n:'Glute bridge',req:'',w:false}],fx:0,ts:3,lo:8,hi:15,unit:'reps'};
 if(k.itPat(mx,0)!=='legs'||k.itPat(mx,1)!=='hinge')issue('pool replacement not under its own pattern: '+k.itPat(mx,0)+'/'+k.itPat(mx,1));}
// 7 Field kit / Never replacement group follows the pattern (never by name for pattern items)
{D.loc='g';D.kit=[];k.day().kit=true;const s=k.S('KA',k.ctx(TD));s.blocks.forEach(b=>b.items.forEach(it=>{if(!it.kx||!it.k)return;const orig=TBL.group(it.k,'',false);if(orig!==undefined&&it.kx!==orig)issue('Field kit replacement group '+it.k+': '+it.kx+' (doctrine '+orig+')');}));k.day().kit=false;}
// 8 old logs read by the new mapping, unchanged
{const old={d:'2026-11-14',id:'KC',t:'KC',rpe:6,vm:1,abs:1,vs:{pull:6,push:3,legs:9,hinge:9,core:3},ex:{'c_calf#0':[15,40],'c_rdl#2':[6,0],'b_jump#1':[10,0],'x_be#0':[12,10],'u_tri#0':[12,15],'u_cur#3':[5,0],'c_sq#0':[8,60]}};
 const v0={d:'2026-11-13',id:'KB',t:'KB',rpe:6,vs:{pull:4,push:4,legs:3,hinge:9,core:0},ex:{'g_ab#0':[15,30]}};
 const neu={d:'2026-11-12',id:'KB',t:'KB',rpe:6,vm:2,vs:{pull:5,push:5,legs:0,hinge:0,core:4},ex:{'c_calf#0':[15,40],'b2_tr#0':[12,20]}};
 D.logs=[{d:'2026-10-01',id:'KA',t:'KA',rpe:6,vs:{pull:0,push:0,legs:0,hinge:0,core:0}},neu,v0,old];const snap=JSON.stringify(D.logs);
 const t=k.vs7(TD);const want={pull:5+4+6+3,push:5+3+4+3+3,legs:0+3+(9-3+3+3),hinge:0+(9-3)+(9-3-3+3),core:4+0+(3-3+4)};
 Object.keys(want).forEach(q=>{if(t[q]!==want[q])issue('old logs by the new mapping: '+q+' '+t[q]+' (expected '+want[q]+')');});
 if(JSON.stringify(D.logs)!==snap)issue('old logs were changed');
 // a log written today carries vm 3 (A-035: b2_tr counts as push, vm 2 logs get its sets on push)
 D.logs=[];const dy=k.day();dy.pick='KC';dy.fin={rpe:6};const c=k.ctx(TD),s=k.S('KC',c);s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(k.curVar(it,'g')>=0)dy.done['KC-'+bi+'-'+ii]=true;}));dy.done['abs-T']=!!s.ab;k.saveTrain();
 const l=D.logs[D.logs.length-1];if(!l||l.vm!==3)issue('new log without vm 3');else{const pv=k.volSets(s,c,'KC');if(s.ab&&l.vs.core<Math.round(s.ab.rounds/2))issue('logged Core Blitz not in l.vs.core');}}
console.log('variants checked: '+nChecked+', items '+Object.keys(items).length);
if(errs.length)issue('JS errors: '+errs.join('; '));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
