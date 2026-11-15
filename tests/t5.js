const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};
 if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return w;}
// migration old v3 with kickDay 2
let w=boot({v:3,start:'2026-11-01',tab:'start',onb:true,profile:{pull:10,dips:15},logs:[],days:{},ex:{},vr:{},kickDay:2,pain:{},home:{b:true}});
let D=w.__kz.D();if(JSON.stringify(D.kickDays)!=='[2,5]')issue('Migration kickDay2 → '+JSON.stringify(D.kickDays));
if(!w.__kz.isKick('2026-11-20'))issue('Freitag kein Kick-Tag');if(!w.__kz.isKick('2026-11-17'))issue('Dienstag kein Kick-Tag');
if(w.__kz.isKick('2026-11-18'))issue('Mittwoch fälschlich Kick');
w=boot({v:3,start:'2026-11-01',tab:'start',onb:true,profile:{pull:10,dips:15},logs:[],days:{},ex:{},vr:{},kickDay:-1,pain:{},home:{b:true}});
if(w.__kz.D().kickDays.length)issue('Kein-Tag-Migration falsch');
// UI chips in Mehr
w=boot({...JSON.parse(boot().localStorage.getItem('kz_app_v3')||'{}')});
D=w.__kz.D();D.onb=true;D.kickDays=[2,5];D.tab='mehr';w.__kz.render();
const d=w.document;let chips=[...d.querySelectorAll('#m_kick button')];
if(chips.length!==7)issue('Nicht 7 Wochentags-Knöpfe: '+chips.length);
const on=()=>[...d.querySelectorAll('#m_kick button.on')].map(b=>b.textContent).join(',');
console.log('Aktiv:',on());if(on()!=='Tu,Fr')issue('Vorauswahl nicht Di,Fr: '+on());
d.querySelector('#m_kick [data-v="5"]').click();if(on()!=='Tu')issue('Fr abwählen klappt nicht: '+on());
d.querySelector('#m_kick [data-v="5"]').click();if(on()!=='Tu,Fr')issue('Fr wieder an klappt nicht');
if(JSON.parse(w.localStorage.getItem('kz_app_v3')).kickDays.sort().join()!=='2,5')issue('Kick-Tage nicht gespeichert');
// Thursday before Friday: no KC/RH recommended
D.logs=[];['2026-11-16','KA','2026-11-17','KI','2026-11-18','KB'].forEach((x,i,a)=>{if(i%2===0)D.logs.push({d:x,id:a[i+1],rpe:6});});
const th=w.__kz.recAll?w.__kz.recAll('2026-11-19'):null;console.log('Donnerstag:',th&&th.id,th&&th.why);
if(th&&(th.id==='KC'||th.id==='RH'))issue('Vor Kick-Tag Beine/starker Lauf');
console.log('\n=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));
// focus UI + migration hint
P.length=0;
w=boot({v:3,start:'2026-11-01',tab:'start',onb:true,profile:{pull:10,dips:15},logs:[],days:{},ex:{},vr:{},kickDays:[2,5],pain:{},home:{b:true}});
let doc=w.document;if(!/choose your doctrine/.test(doc.getElementById('app').textContent))issue('Hinweis für Bestandsnutzer fehlt');
D=w.__kz.D();if(D.focus!=='bal'||!D.skills.hs||D.skills.fl)issue('Defaults falsch');
D.tab='mehr';w.__kz.render();if(!D.seenFocus)issue('seenFocus nicht gesetzt');
let rr=doc.querySelector('input[name=m_focus][value=run]');rr.checked=true;rr.dispatchEvent(new w.Event('change',{bubbles:true}));
if(w.__kz.D().focus!=='run')issue('Fokus-Wechsel greift nicht');
let fl=doc.querySelector('[data-a=skill][data-k=fl]');fl.checked=true;fl.dispatchEvent(new w.Event('change',{bubbles:true}));
if(!doc.getElementById('m_flSt'))issue('FL-Stufenwahl erscheint nicht');
let sel=doc.getElementById('m_flSt');sel.value='2';sel.dispatchEvent(new w.Event('change',{bubbles:true}));
if(w.__kz.D().profile.flSt!==2)issue('FL-Stufe nicht gespeichert');
console.log('FOKUS-UI ('+P.length+')');P.forEach(p=>console.log(' - '+p));
