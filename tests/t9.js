// @name import-security
const {JSDOM}=require('./domguard');const fs=require('fs');
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
// I-43: per-set values – markup, strings and junk refused, valid ones kept
{const c=k.cleanImport({v:3,logs:[{d:'2026-11-10',id:'KA',t:'A',rpe:6,exs:{'p_pull#0':['8','<b>',8,-2],'<x>#0':[1],'p_dip#0':'8,8'}}],ex:{'p_pull#0':{r:8,w:0,d:'2026-11-10',n:'P',s:['<script>',7,{}]}}});
 const l=c.logs[0];if(!l.exs||JSON.stringify(l.exs['p_pull#0'])!=='[8,8]'||l.exs['<x>#0']||l.exs['p_dip#0'])issue('I-43 exs not cleaned: '+JSON.stringify(l.exs));
 if(JSON.stringify(c.ex['p_pull#0'].s)!=='[7]')issue('I-43 D.ex s not cleaned: '+JSON.stringify(c.ex['p_pull#0'].s));}
// A-039: ladder rung 1–5 only
{const c=k.cleanImport({v:3,ex:{'p_pull#0':{r:8,n:'P',lad:'<b>'},'p_dip#0':{r:8,n:'D',lad:9},'p_row#0':{r:8,n:'R',lad:4}}});
 if(c.ex['p_pull#0'].lad!=null||c.ex['p_dip#0'].lad!=null||c.ex['p_row#0'].lad!==4)issue('A-039 lad not cleaned: '+JSON.stringify(c.ex));}
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
