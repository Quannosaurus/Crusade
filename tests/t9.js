// @name import-security
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
const k=w.__kz,d=w.document;let D=k.D();D.onb=true;D.logs=[{d:'2026-11-10',id:'KA',t:'Strength A',rpe:6,note:'good',sk:['hs','mu']},{d:'2026-11-11',id:'RE',t:'Easy run',rpe:4,km:5,min:31}];D.ex={'p_pull#0':{r:8,w:0,d:'2026-11-10',n:'Pull-ups'}};D.focus='run';D.kickDays=[2];
D.tab='mehr';k.render();d.querySelector('[data-a=exp]').click();const txt=d.getElementById('bk').value;
// restore round trip
D=k.D();D.logs=[];d.getElementById('bk').value=txt;d.querySelector('[data-a=imp]').click();D=k.D();
if(D.logs.length!==2||D.focus!=='run'||D.kickDays.join()!=='2'||!D.ex['p_pull#0'])issue('Round-trip verliert Daten: '+JSON.stringify({n:D.logs.length,f:D.focus,k:D.kickDays}));
// malicious
const evil=JSON.parse(txt);evil.logs.push({d:'2026-11-12',id:'KA',t:'<img src=x onerror=alert(1)>',note:'"><script>x()</script>',rpe:'7'},{d:'bad',id:'KA'},{d:'2026-11-12',id:'<b>'});evil.focus='<x>';evil.profile.pull='1e9';evil.__proto__x=1;evil.ex["<x>#0"]={r:1};
D.tab='mehr';k.render();d.getElementById('bk').value=JSON.stringify(evil);d.querySelector('[data-a=imp]').click();
// A-031: replacing a state with entries asks first (preview line), then the confirm tap restores
if(!d.querySelector('[data-a=rsok]'))issue('Keine Vorschau vor dem Ersetzen');else d.querySelector('[data-a=rsok]').click();D=k.D();
if(D.logs.length!==3)issue('Ungültige Logs nicht gefiltert: '+D.logs.length);if(D.focus!=='bal')issue('Fokus nicht geprüft');if(D.profile.pull>999)issue('Profilwert nicht begrenzt');if(D.ex['<x>#0'])issue('ex-Key nicht geprüft');
D.tab='verlauf';k.render();if(d.querySelector('#app img')||d.querySelector('#app script'))issue('Markup aus Backup gerendert');
if(!/&lt;img/.test(d.getElementById('app').innerHTML))issue('Text nicht maskiert');
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
