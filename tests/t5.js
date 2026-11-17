// @name data-migration
const {JSDOM}=require('./domguard');const fs=require('fs');
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
// Session 14 additive fields: old states load unchanged, new fields keep their values
{const w5=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[{d:'2026-11-10',id:'KA',t:'Strength A',rpe:6,ex:{'p_pull#0':[8,0]}},{d:'2026-11-11',id:'KA',t:'Strength A',rpe:6,ex:{'p_pull#0':[8,0]},exs:{'p_pull#0':[8,8,7]}}],days:{},ex:{'p_pull#0':{r:7,w:0,d:'2026-11-11',n:'Pull-ups',s:[8,8,7]},'p_dip#0':{r:8,w:0,d:'2026-11-10',n:'Dips'}},vr:{},pain:{},home:{b:true}});
 const D5=w5.__kz.D();if(D5.logs[0].exs||D5.ex['p_dip#0'].s)issue('I-43: old entry got per-set values');if(JSON.stringify(D5.logs[1].exs)!=='{"p_pull#0":[8,8,7]}'||JSON.stringify(D5.ex['p_pull#0'].s)!=='[8,8,7]')issue('I-43: per-set values lost on load');}
{const w6=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[],days:{},ex:{'p_pull#0':{r:7,w:0,d:'2026-11-11',n:'Pull-ups',lad:2},'p_dip#0':{r:8,w:0,d:'2026-11-10',n:'Dips'}},vr:{},pain:{},home:{b:true}});
 const D6=w6.__kz.D();if(D6.ex['p_pull#0'].lad!==2||D6.ex['p_dip#0'].lad!=null)issue('A-039: ladder rung not kept or added on load');}
{const w7=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[],days:{},ex:{},vr:{},pain:{},home:{b:true}});if(JSON.stringify(w7.__kz.D().goalNext)!=='[]')issue('A-040: old state without goalNext not defaulted');
 const w8=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[],days:{},ex:{},vr:{},pain:{},home:{b:true},goalNext:[{k:'pull',v:13}]});if(JSON.stringify(w8.__kz.D().goalNext)!=='[{"k":"pull","v":13}]')issue('A-040: goalNext lost on load');}
// A-045: hold mode defaults off for an old state and keeps a stored choice
{const w9=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[],days:{},ex:{},vr:{},pain:{},home:{b:true}});if(JSON.stringify(w9.__kz.D().hold)!=='{"str":false,"run":false,"sk":false}')issue('A-045: old state without hold not defaulted: '+JSON.stringify(w9.__kz.D().hold));
 const w10=boot({v:3,start:'2026-10-01',tab:'start',onb:true,profile:{pull:8},logs:[],days:{},ex:{},vr:{},pain:{},home:{b:true},hold:{str:false,run:true,sk:false}});if(!w10.__kz.hold('run')||w10.__kz.hold('str'))issue('A-045: stored hold lost on load');}
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
