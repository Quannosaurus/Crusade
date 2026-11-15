const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz;k.D().onb=true;return {k,w};}
const S='2026-11-19',Y='2026-11-18';
function sc(name,logs,kick){const {k}=boot();const D=k.D();D.logs=logs;D.kickDays=kick||[2,5];const m=k.morning(S);const L=k.mSections(m,false),Ls=k.mSections(m,true);
 const n=L.reduce((a,s)=>a+s.items.length,0),ns=Ls.reduce((a,s)=>a+s.items.length,0);
 console.log(name.padEnd(28),'top',m.top.padEnd(9),'sec',(m.sec||'').padEnd(9),'items',n,'/',ns,'|',m.why.join(' '));return {m,L,Ls};}
let r=sc('Fresh start',[]);
r=sc('Yesterday hard run',[{d:Y,id:'RH',rpe:8}]);if(r.m.top!=='rec')issue('nach starkem Lauf keine Erholung');
r=sc('Yesterday legs',[{d:Y,id:'KC',rpe:6}]);if(!['hips','ankles'].includes(r.m.top))issue('nach Beintag nicht Hüfte/Waden');
r=sc('Yesterday pull day',[{d:Y,id:'KA',rpe:6}]);
r=sc('Kick day today (Thu)',[],[4]);if(r.m.top!=='hips')issue('Kicktag nicht Hüfte: '+r.m.top);
// rotation over days: different desk items
const {k}=boot();const d1=k.morning('2026-11-19').desk.map(x=>x[0]).join(),d2=k.morning('2026-11-20').desk.map(x=>x[0]).join();if(d1===d2)issue('Desk-Teil rotiert nicht');
// flexion check: no deep flexion in wake/raise/cars
const flex=/Child|forward fold|Toe touch|Deep squat|Crunch|Sit-up/i;r.L.slice(0,3).forEach(s=>s.items.forEach(x=>{if(flex.test(x[0]))issue('Tiefe Beugung früh: '+x[0]);}));
// all morning + cooldown poses have pictures
const {w}=boot();const missing=[];r.L.concat(sc('x',[{d:Y,id:'RH'}]).L).forEach(s=>s.items.forEach(x=>{if(!w.eval('picFor')(x[0]))missing.push(x[0]);}));
['up','legs','run','kick'].forEach(c=>w.__kz.COOLS[c].items.forEach(x=>{if(!w.eval('picFor')(x[0]))missing.push(x[0]);}));
Object.values(w.__kz.MMOD).forEach(m=>m.items.forEach(x=>{if(!w.eval('picFor')(x[0]))missing.push(x[0]);}));
if(missing.length)issue('Ohne Bild: '+[...new Set(missing)].join(', '));
// every gym session ends with cool-down
['KA','KB','KC','SK','CH','TE','DL','HO','HK'].forEach(id=>{const b=k.S(id,k.ctx(S)).blocks;if(b[b.length-1].name!=='Cool-down')issue(id+' ohne Cool-down');});
console.log('\n=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
