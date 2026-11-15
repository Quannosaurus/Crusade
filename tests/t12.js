const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
let {w,k,d}=boot();let D=k.D();
// welcome restore
if(!/Welcome/.test(d.body.textContent)||!d.querySelector('input[name=o_theme]'))issue('Willkommen ohne Theme-Wahl');
if(!d.querySelector('#bkin'))issue('Kein Backup-Import im Willkommen');
const bk=JSON.stringify({profile:{pull:9,dips:12},logs:[{d:'2026-11-10',id:'KA',t:'x',rpe:6}],skills:{hs:true,mu:false,ls:false,fl:false,pl:false},theme:'sisters'});
d.querySelector('#obbk').value=bk;d.querySelector('[data-a=obimp]').click();D=k.D();
if(!D.onb||D.logs.length!==1||D.theme!=='sisters')issue('Wiederherstellen im Willkommen klappt nicht');
if(!/Restored: 1/.test(d.body.textContent))issue('Keine Bestätigung nach Restore');
// one-tap sets
D.tab='train';D.days={};k.render();
const box=[...d.querySelectorAll('input[data-set]')].find(i=>i.dataset.n>1&&i.dataset.set==='0');const id=box.dataset.id;
box.value='7';box.dispatchEvent(new w.Event('change',{bubbles:true}));
const b2=d.querySelector('input[data-set="1"][data-id="'+id+'"]');b2.dispatchEvent(new w.FocusEvent('focusin',{bubbles:true}));
if(b2.value!=='7')issue('Satz 2 übernimmt Satz 1 nicht: '+b2.value);
b2.dispatchEvent(new w.FocusEvent('focusout',{bubbles:true}));
if(((k.D().days[Object.keys(k.D().days)[0]].inp[id]||{}).s||[])[1]!=='7')issue('Übernommener Wert nicht gespeichert');
// empty first box takes target placeholder
const other=[...d.querySelectorAll('input[data-set="0"]')].find(i=>i.dataset.id!==id&&i.placeholder&&/^\d/.test(i.placeholder)&&i.value==='');
if(other){other.dispatchEvent(new w.FocusEvent('focusin',{bubbles:true}));if(other.value!==other.placeholder)issue('Leeres Feld übernimmt Vorgabe nicht');}
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
