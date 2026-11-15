const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
const k=w.__kz,d=w.document;let D=k.D();D.onb=true;D.skills={hs:true,mu:true,ls:true,fl:false,pl:false};
D.logs=[{d:'2026-11-10',id:'RE',t:'Easy run',rpe:4,km:5,min:31},{d:'2026-11-12',id:'KA',t:'Strength A',rpe:6}];
// edit
D.tab='verlauf';k.render();d.querySelector('[data-a=edit][data-i="0"]').click();
if(!d.getElementById('e_km'))issue('Edit-Formular ohne km bei Lauf');
d.getElementById('e_km').value='6.2';d.getElementById('e_min').value='36';d.getElementById('e_d').value='2026-11-13';d.getElementById('e_rpe').value='6';d.getElementById('e_note').value='windy';
d.querySelector('[data-a=editsave]').click();D=k.D();const L=D.logs.find(l=>l.note==='windy');
if(!L||L.km!==6.2||L.min!==36||L.d!=='2026-11-13'||L.rpe!==6)issue('Bearbeitung nicht gespeichert: '+JSON.stringify(L));
if(D.logs[D.logs.length-1]!==L)issue('Nach Datumsänderung nicht neu sortiert');
d.querySelector('[data-a=edit][data-i="0"]').click();d.getElementById('e_d').value='2099-01-01';d.querySelector('[data-a=editsave]').click();if(k.D().logs.some(l=>l.d==='2099-01-01'))issue('Zukunftsdatum akzeptiert');
// how-to
D.tab='train';D.loc='g';D.days={};k.render();const hows=d.querySelectorAll('.how');if(hows.length<4)issue('Zu wenige How-to-Hinweise: '+hows.length);
const noHow=[...d.querySelectorAll('.ex:not(.pose)')].filter(e=>!e.querySelector('.how')&&!/Warm|Rowing|Jump rope|Wrist|Band Pull|shrug|hang/i.test(e.textContent)).map(e=>e.querySelector('.n').textContent);
console.log('ohne How:',noHow.slice(0,8).join(' | '));
// hold buttons
D.tab='morgen';k.render();const hb=d.querySelectorAll('[data-a=hold]');if(hb.length<3)issue('Hold-Knöpfe fehlen in Morgenroutine: '+hb.length);
hb[0].click();const clk=d.getElementById('clock').textContent;if(!/\d:\d\d/.test(clk))issue('Hold-Timer startet nicht: '+clk);
if(!d.body.className.includes('train'))issue('Timerleiste in Morgenroutine nicht sichtbar');
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
