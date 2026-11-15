const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(url,pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:url||'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
let {w,k,d}=boot('https://x.test/?theme=love');
if(d.querySelector('input[value=love]'))issue('Love-Theme ohne Code sichtbar');
if(k.D().theme==='love'||d.body.getAttribute('data-theme')==='love')issue('Link schaltet Love ohne Code frei');
const lk=d.querySelector('details.lock');if(!lk||!lk.open)issue('Schloss nicht geöffnet bei Love-Link');
d.getElementById('o_code').value='1234';d.querySelector('[data-a=unlock]').click();if(!/not the code/.test(d.body.textContent))issue('Falscher Code ohne Hinweis');if(k.D().loveOK)issue('Falscher Code entsperrt');
const LH=+html.match(/var LOVEH=(\d+)/)[1];const ch=x=>{let h=2166136261;for(let i=0;i<x.length;i++){h^=x.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h;};let code='';for(let i=0;i<10000&&!code;i++){const c=String(i).padStart(4,'0');if(ch('crusade:'+c)===LH)code=c;}
d.getElementById('o_code').value=code;d.querySelector('[data-a=unlock]').click();
if(!k.D().loveOK||k.D().theme!=='love'||d.body.getAttribute('data-theme')!=='love')issue('Richtiger Code entsperrt nicht');
if(!d.querySelector('input[value=love]'))issue('Love nach Entsperren nicht wählbar');
// existing love user keeps it
({w,k,d}=boot('https://x.test/',{v:3,start:'2026-11-01',onb:true,profile:{pull:5},logs:[],days:{},ex:{},vr:{},theme:'love',skills:{hs:false,mu:false,ls:false,fl:false,pl:false}}));
if(k.D().theme!=='love'||!k.D().loveOK)issue('Bestandsnutzerin verliert Love-Theme');
// manipulated storage without unlock falls back
({w,k,d}=boot('https://x.test/',{v:3,start:'2026-11-01',onb:true,profile:{pull:5},logs:[],days:{},ex:{},vr:{},theme:'templar'}));
k.D().theme='love';k.render();if(d.body.getAttribute('data-theme')==='love'&&!k.D().loveOK)issue('Love ohne Freischaltung aktiv');
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
