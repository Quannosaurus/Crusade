// @name records-honours
const {JSDOM}=require('./domguard');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
const k=w.__kz,d=w.document;let D=k.D();D.onb=true;D.kickDays=[];D.skills={hs:false,mu:false,ls:false,fl:true,pl:false};
function train(v){D.tab='train';D.days={};k.render();const ins=[...d.querySelectorAll('input[data-set]')].filter(i=>/front lever/i.test(i.closest('.ex').textContent));ins.forEach(i=>{i.value=String(v);i.dispatchEvent(new w.Event('change',{bubbles:true}));});
 d.querySelector('[data-a=rpe][data-v="6"]').click();d.querySelector('[data-a=savetr]').click();return d.querySelector('.toast')?d.querySelector('.toast').textContent:'';}
let t1=train(8);console.log('1:',t1);if(!/Honour earned: First Oath/.test(t1))issue('Erste Ehrung fehlt');
D.logs[D.logs.length-1].d='2026-11-10';
let t2=train(10);console.log('2:',t2);if(!/New record/.test(t2))issue('Rekord-Toast fehlt');
const L=D.logs[D.logs.length-1];if(!L.ex||!L.pr)issue('Log ohne ex/pr: '+JSON.stringify(L));
if(D.logs.length<3)D.logs.unshift({d:'2026-11-01',id:'MO',t:'Morning routine',m:['hips']});/* A-029 U11: stats show from 3 entries */D.tab='verlauf';k.render();let txt=d.getElementById('app').textContent;D.tab='stand';k.render();txt+=d.getElementById('app').textContent;/* A-029 U10: calendar on Chronicle, stats on Status */
['Where to focus','Balance','Training calendar','Exercise progress','Honours','Personal records'].forEach(x=>{if(!txt.includes(x))issue('Abschnitt fehlt: '+x);});
if(!d.querySelector('#statex'))issue('Übungsauswahl fehlt');
// theme switch
D.tab='mehr';k.render();const r=d.querySelector('input[name=m_theme][value=sisters]');r.checked=true;r.dispatchEvent(new w.Event('change',{bubbles:true}));
if(d.body.getAttribute('data-theme')!=='sisters')issue('Theme greift nicht');D.tab='stand';k.render();if(!/Postulant|Novitiate|Sister/.test(d.getElementById('app').textContent))issue('Rangnamen nicht thematisch');
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
