// @name front-lever
const {JSDOM}=require('./domguard');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
const k=w.__kz,D=k.D(),d=w.document;D.onb=true;D.logs=[];D.skills={hs:false,mu:false,ls:false,fl:true,pl:false};D.profile.flSt=2;D.kickDays=[];D.tab='train';D.loc='g';k.render();
const t=d.getElementById('app').textContent;console.log('Einheit:',d.querySelector('.hero h2').textContent);
if(!/One-leg front lever/.test(t))issue('FL-Stufe 2 nicht als Startvariante');
if(/Muscle-Up/.test(d.querySelector('.hero h2').textContent))issue('Name enthält Muscle-Up trotz Abwahl');
// enter FL hold sets and save; check log sk and stall
const ids=[...d.querySelectorAll('input[data-set]')].filter(i=>i.dataset.id&&i.closest('.ex').textContent.includes('One-leg front lever'));
ids.forEach(i=>{i.value='10';i.dispatchEvent(new w.Event('change',{bubbles:true}));});
d.querySelector('[data-a=rpe][data-v="6"]').click();d.querySelector('[data-a=savetr]').click();
const L=D.logs.slice(-1)[0];console.log('Log:',JSON.stringify(L));if(!L.sk||!L.sk.includes('fl'))issue('Skill nicht geloggt');
if(!/Logged|Honour|record|Rank/.test(d.getElementById('app').textContent))issue('Keine Bestätigung nach Speichern');
// stall
const key=Object.keys(D.ex).find(x=>x.startsWith('fl_h'));D.ex[key].stall=3;D.ex[key].d=k.D().logs.slice(-1)[0].d;
const it={k:'fl_h',lo:6,hi:15,unit:'s',opts:[{n:'x'},{n:'x'},{n:'x'}],up:''};const g=k.target(it,2);console.log('Stillstand:',g.note);if(!/without progress/.test(g.note))issue('Stillstand-Hinweis fehlt');
// home without bar: FL removed
D.loc='h';D.home.k=false;D.tab='train';D.days={};k.render();const t2=d.getElementById('app').textContent;console.log('Zuhause:',d.querySelector('.hero h2').textContent);
if(/[Ff]ront lever/.test(t2)&&!/straight-arm|Band/.test(t2))issue('FL zuhause ohne Stange');
console.log('\n=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));
process.exit(0);
