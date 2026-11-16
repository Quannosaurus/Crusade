// @name naming-doctrine
// A-011: the app uses its own names. No terms from foreign programmes, brands or authors in sources or build;
// internal IDs stay, old backups load, honours and stats keep counting.
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const R=p=>path.resolve(__dirname,'..',p);
const P=[];const issue=m=>P.push(m);
// Forbidden display terms (case-insensitive). Extend this list when the Captain bans another name.
const BAN=['venus','tabata','garmin','body battery'];
// The encrypted love notes are ciphertext and not display text: cut them out before scanning.
let enc='';try{enc=JSON.stringify(JSON.parse(fs.readFileSync(R('src/love.enc.json'),'utf8')));}catch(e){}
const files=['src/app.js','src/head.html','src/pics.js','index.html','app.js','app.css','sw.js','manifest.webmanifest','.build/index.html'];
files.forEach(f=>{if(!fs.existsSync(R(f))){issue('missing '+f);return;}let t=fs.readFileSync(R(f),'utf8');if(enc)t=t.split(enc).join('');
  BAN.forEach(b=>{const m=t.toLowerCase().indexOf(b);if(m>=0)issue(f+': forbidden term "'+b+'" near "'+t.slice(Math.max(0,m-30),m+30).replace(/\s+/g,' ')+'"');});});
// CLAUDE.md carries the naming glossary and the rule
const cm=fs.readFileSync(R('CLAUDE.md'),'utf8');if(!/## Naming/.test(cm))issue('CLAUDE.md: Naming glossary missing');
// Old backup: abs sessions, CH sessions, templar theme. Must load unchanged and keep counting.
const html=fs.readFileSync(R('.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document,errs};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const a=boot();const B=JSON.parse(JSON.stringify(a.k.D()));
B.onb=true;B.theme='templar';B.start='2026-08-03';B.logs=[];
for(let i=0;i<26;i++)B.logs.push({d:addD('2026-08-03',i*3),id:i%2?'KA':'KB',t:i%2?'KA':'KB',rpe:6,abs:1});
for(let i=0;i<3;i++)B.logs.push({d:addD('2026-08-04',i*14),id:'CH',t:'CH',rpe:7});
const txt=JSON.stringify(B);
const b=boot();b.k.restore(txt,'start');const D=b.k.D();
if(D.logs.length!==B.logs.length)issue('backup: '+D.logs.length+' of '+B.logs.length+' entries loaded');
if(D.logs.filter(l=>l.abs).length!==26)issue('backup: abs flags lost');
if(D.logs.filter(l=>l.id==='CH').length!==3)issue('backup: CH entries lost');
let z=b.k.honours().find(h=>h.k==='zealot');
if(!z)issue('honour zealot (ID) missing');else{if(!z.got)issue('honour zealot not earned with 26 abs sessions');if(z.n!=='Zealot of the Blitz')issue('templar zealot name: '+z.n);}
b.k.today('2026-11-16');D.tab='verlauf';b.k.render();let t=b.d.getElementById('app').textContent;
if(!/Core Blitz/.test(t))issue('stats: Core Blitz row missing');if(!/Strength C \/ Skill Trial/.test(t))issue('stats: Skill Trial row missing');
if(!/Zealot of the Blitz/.test(t))issue('honours: themed name not shown');
D.tab='start';b.k.render();t=b.d.getElementById('app').textContent;if(/Venus|Tabata/i.test(t))issue('start page: old term');
if(b.k.NAMES.CH!=='Skill Trial')issue('NAMES.CH: '+b.k.NAMES.CH);
D.tab='mehr';b.k.render();t=b.d.getElementById('app').textContent;D.tab='stand';b.k.render();t+=b.d.getElementById('app').textContent;if(!/phase 1, 6 weeks phase 2/.test(t))issue('settings: cycle text');if(!/Watch import/.test(t))issue('settings: watch import section');
// Plain theme: no Warhammer word in the honour name
D.theme='plain';z=b.k.honours().find(h=>h.k==='zealot');if(!z||/zealot/i.test(z.n))issue('plain zealot name: '+(z&&z.n));
// Training: the ab block shows the own name and explains the rhythm
D.theme='templar';let blk=null;for(let i=0;i<14&&!blk;i++){b.k.today(addD('2026-11-16',i));D.tab='train';D.days={};b.k.render();blk=b.d.querySelector('[data-blk=abs]');}
if(!blk)issue('no ab block found in 14 days');else{const s=blk.textContent;if(!/Core Blitz/.test(s))issue('ab block name: '+s.slice(0,80));if(!/20 s work, 10 s rest/.test(s))issue('ab block lacks rhythm explanation');}
[a,b].forEach(x=>{if(x.errs.length)issue('JS errors: '+x.errs.join('; '));});
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
