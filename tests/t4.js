// @name ui-flow
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>{P.push(m);};
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.scrollY=0;
 if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));const js=html.match(/<script>([\s\S]*)<\/script>/)[1];w.eval(js);
 const d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 const click=s=>{const e=typeof s==='string'?$(s):s;if(!e)throw new Error('fehlt: '+s);e.click();};
 const set=(s,v)=>{const e=typeof s==='string'?$(s):s;if(!e)throw new Error('fehlt: '+s);e.value=v;e.dispatchEvent(new w.Event('change',{bubbles:true}));};
 return {w,d,$,$$,click,set,k:w.__kz,txt:()=>$('#app').textContent};}
// 1 Onboarding fresh
let A=boot();
if(!/Welcome/.test(A.txt()))issue('Grunddaten-Fenster erscheint nicht beim ersten Start');if(!A.$('[role=dialog]'))issue('kein Dialog');
if(A.$$('.nav button').length)issue('Reiterleiste während Einstufung sichtbar');
A.click('[data-a=obnext]');if(/muscle-up/i.test(A.txt().replace(/Muscle-Up<\/label>|Muscle-Up/g,'')))issue('Schritt 1 fragt Muscle-Ups ab');
{const r=A.$('input[name=o_start][value=s0]');r.checked=true;r.dispatchEvent(new A.w.Event('change',{bubbles:true}));}
A.click('[data-a=obnext]');if(!/Your numbers/.test(A.txt()))issue('Schritt 2 fehlt');
if(A.$('#o_mu'))issue('Muscle-Up-Frage ohne gewählten Skill');if(A.$('#o_pull').value!=='0')issue('Startpunkt nicht übernommen: '+A.$('#o_pull').value);
A.set('#o_pull','2');A.set('#o_dips','3');
if(!/Basic/.test(A.$('#lvlnote').textContent))issue('Stufe aktualisiert sich nicht live in der Einstufung');
A.click('[data-a=obnext]');if(!/Kickboxing days/.test(A.txt()))issue('Schritt 3 fehlt');A.click('[data-a=onb]');if(!/Your orders for today/.test(A.txt()))issue('Nach Einstufung keine Startseite');
console.log('Anfänger-Start:',A.$$('.big span').map(x=>x.textContent).slice(0,8).join(' | '));
// 2 Training flow as intermediate
A=boot({...JSON.parse(A.w.localStorage.getItem('kz_app_v3')),skills:{hs:true,mu:true,ls:true,fl:false,pl:false},profile:{pull:10,dips:15,push:25,expl:5,negmu:5,mu:0,hang:45,tuck:30,lsit:10,hollow:90,hsw:30,hsf:0,pike:12},onb:true,logs:[]});
A.click('[data-tab=train]');
const title=A.$('.hero h2').textContent;console.log('Training heute:',title);
const blocks=A.$$('details.blk summary .bn').map(x=>x.textContent);console.log('Blöcke:',blocks.join(' | '));
const open=A.$$('details.blk[open] summary .bn').map(x=>x.textContent);if(open.length!==2)console.log('  offen:',open.join(','));
// circuit hint
if(!A.$('.hint'))issue('Zirkel-Hinweis fehlt');
// set boxes on explosive pullups
let inputs=A.$$('input[data-set]');console.log('Satz-Kästchen gesamt:',inputs.length);
const ex=A.$$('input[data-set]').filter(i=>/Explosive pull-ups/.test(i.closest('.exb').textContent));
console.log('Explosive Klimmzüge Kästchen:',ex.length);
if(ex.length<3)issue('Zu wenige Satz-Kästchen im Zirkel');
// rest timer: first exercise in circuit should NOT start timer; last exercise should
A.set(ex[0],'5');const c1=A.$('#clock').classList.contains('run');
if(c1)issue('Timer startet im Zirkel schon nach der ersten Übung');
const lastIn=A.$$('input[data-set]').filter(i=>i.dataset.last==='1'&&/Tuck L-sit|L-sit|L-Sit/.test(i.closest('.exb').textContent));
if(lastIn[0]){A.set(lastIn[0],'20');if(!A.$('#clock').classList.contains('run'))issue('Timer startet nach letzter Zirkelübung nicht');else console.log('Timer nach Runde:',A.$('#clock').textContent);}
// fill all 3 sets of explosive → auto done
let ex2=A.$$('input[data-set]').filter(i=>/Explosive pull-ups/.test(i.closest('.exb').textContent));ex2.forEach((e,i)=>A.set(e,String([5,5,4][i]||4)));
const doneEx=A.$$('.ex.done .n').map(x=>x.textContent);if(!doneEx.some(t=>/Explosive/.test(t)))issue('Übung wird nach allen Sätzen nicht automatisch abgehakt');
// weighted variant
let chg=A.$$('[data-a=chg]').find(b=>/Explosive pull-ups/.test(b.closest('.exb').textContent));A.click(chg);
if(!/vest/.test(A.txt()))issue('Wechseln funktioniert nicht');
if(!A.$('input[data-inp=w]'))issue('Kein kg-Feld bei Gewichtsvariante');
A.set('input[data-inp=w]','5');A.$$('input[data-set]').filter(i=>/vest/.test(i.closest('.exb').textContent)).forEach((e,i)=>A.set(e,String([6,6,6][i]||6)));
// skip
let sk=A.$$('[data-a=skip]').find(b=>/Straight bar dips/.test(b.closest('.exb').textContent));A.click(sk);if(!/Skipped today/.test(A.txt()))issue('Auslassen funktioniert nicht');
// iso hold: handstand 3x20 all success → profile up
let hs=A.$$('input[data-set]').filter(i=>/Chest-to-wall/.test(i.closest('.exb').textContent));console.log('Handstand Kästchen:',hs.length);hs.forEach(e=>A.set(e,'22'));
// pain
A.$('details.opt').open=true;A.set('input[data-a=pain][data-k=w]',true);let pw=A.$('input[data-a=pain][data-k=w]');pw.checked=true;pw.dispatchEvent(new A.w.Event('change',{bubbles:true}));
if(!/Wrist rehab/.test(A.txt()))issue('Schonungsblock fehlt');// A-027: affected exercises are filtered before the design (pain-free variant, replacement with hint, or gone), so none is shown
{const shown=A.$$('.ex .n').map(x=>x.textContent);const hit=shown.filter(n=>/Handstand|Push-up|Pike|Planche|Frogstand|Crow|Wall Walk|Wrist prep|Bail/i.test(n)&&!A.$$('.blk').some(b=>/rehab/i.test(b.textContent)&&b.textContent.includes(n)));
 if(hit.length)issue('Betroffene Übungen werden nicht geschont: '+hit.join(', '));if(!/pain-free choice/.test(A.txt())&&!A.$$('.nxn').length)console.log('(keine Ersatzübung nötig)');}
console.log('Geschont:',A.$$('.ex.skip .n').map(x=>x.textContent).join(', '));
pw=A.$('input[data-a=pain][data-k=w]');pw.checked=false;pw.dispatchEvent(new A.w.Event('change',{bubbles:true}));
// save without rpe
A.click('[data-a=savetr]');if(!/Please choose how hard/.test(A.txt()))issue('Speichern ohne Anstrengung nicht abgefangen');
A.click('[data-a=rpe][data-v="6"]');A.click('[data-a=savetr]');
let D=A.k.D();console.log('Gespeichert:',D.logs.map(l=>l.id+(l.sum?' ('+l.sum+')':'')).join(', '));
console.log('ex:',JSON.stringify(Object.fromEntries(Object.entries(D.ex).map(([k,v])=>[k,v.r+(v.w?'@'+v.w:'')]))),'hsw',D.profile.hsw);
if(D.profile.hsw<=30)issue('Handstand-Maximum steigt nach erfolgreichen Sätzen nicht');
if(!D.ex['a_expu#1']||D.ex['a_expu#1'].w!==5)issue('Gewicht wird nicht gespeichert');
if(D.ex['a_sbd#0'])issue('Ausgelassene Übung wurde trotzdem gespeichert');
// next session target for weighted
const it=A.k.S('KA',{phase:1}).blocks[3].items[0];console.log('Nächste Vorgabe Weste:',JSON.stringify(A.k.target(it,1)));
// 3 Tuesday no-kick
const tue=(()=>{const x=new Date();return x.getDay();})();
A.k.D().kickDays=[tue];A.k.render();A.click('.nav [data-tab=start]');
if(!/No kickboxing today/.test(A.txt()))issue('Dienstag-Alternative fehlt');else{A.click('[data-a=nokick]');console.log('Ohne Kickboxen:',A.$('.big.rec span:last-child')?A.$('.big.rec span:last-child').textContent:'(keine Empfehlung markiert)');}
// 4 test session writes profile
A.click('[data-tab=train]');A.set('#pick','TE');
let tin=A.$$('input[data-set]');console.log('Test-Felder:',tin.length);
const pullIn=tin.find(i=>/Clean pull-ups/.test(i.closest('.exb').textContent));A.set(pullIn,'12');
A.click('[data-a=rpe][data-v="8"]');A.click('[data-a=savetr]');if(A.k.D().profile.pull!==12)issue('Test schreibt Wert nicht in den Stand');
// 5 backup banner
const D5=A.k.D();for(let i=0;i<10;i++)D5.logs.push({d:'2026-10-0'+(i%9+1),id:'MO',t:'Morgenroutine'});A.k.render();A.click('.nav [data-tab=start]');
if(!A.$('#bkrem')||!/backup/.test(A.$('#bkrem').textContent))issue('Sicherungshinweis fehlt');
A.click('.nav [data-tab=mehr]');A.click('[data-a=exp]');A.click('.nav [data-tab=start]');if(!A.$('#bkrem'))issue('Sicherungshinweis verschwindet schon beim Erzeugen des Texts');
A.click('.nav [data-tab=mehr]');A.click('[data-a=exp]');A.$('#bk').dispatchEvent(new A.w.Event('copy',{bubbles:true}));A.click('.nav [data-tab=start]');if(A.$('#bkrem'))issue('Sicherungshinweis verschwindet nach Sicherung nicht');
// 6 home
A.click('[data-tab=train]');A.click('[data-a=loc][data-v=h]');console.log('Zuhause:',A.$('.hero h2').textContent,'|',A.$$('.ex .n').map(x=>x.textContent).slice(0,12).join(', '));
// 7 short mode
A.click('[data-a=loc][data-v=g]');A.set('#pick','KA');const nb=A.$$('details.blk').length,mb=+((A.$('.dur')||{}).textContent||'').replace(/^\D*(\d+).*$/,'$1');A.click('[data-a=short]');const ns=A.$$('details.blk').length,ms=+((A.$('.dur')||{}).textContent||'').replace(/^\D*(\d+).*$/,'$1');console.log('Blöcke normal/kurz:',nb,ns,'min',mb,ms);if(ns>=nb&&!(ms<mb))issue('Begrenzte Zeit kürzt nicht');
// 8 run + kick + morning saves
A.click('.nav [data-tab=start]');A.click('[data-tab=run],[data-a=xrun]');/* A-029 U3: on a strength day the run card is "Also possible" (data-a=xrun) */A.set('#f_km','5');A.set('#f_min','32');if(!/Pace 6:24/.test(A.txt()))issue('Tempo falsch: '+(A.$('.tg')||{}).textContent);
A.click('[data-a=rpe][data-v="6"]');A.click('[data-a=saverun]');
A.click('[data-tab=morgen]');A.click('[data-a=savemo]');
console.log('Startseite erledigt:',A.$$('.big .tag.ok').length);
console.log('\n=== UX-AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
