// @name getting-started
// A-074: new users start in Plain and get a "Getting started" guide.
// a) a new install starts with the Plain theme; a saved state or a backup with another theme keeps it.
// b) finishing the first onboarding without entries opens the guide; re-entering basics with entries goes to Today.
// c) the guide holds its 7 sections (what it does, data, settings, Extras, during training, logging, progress), a backup
//    button, the theme picker and a way to all settings; More opens it again.
// d) the guide uses no theme wording (Plain rule).
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(html,store){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  if(store)w.localStorage.setItem('kz_app_v3',store);w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const SECS=['What it does','Your data','Settings','Extras','During training','Logging','Progress'];
const WH=/crusade|emperor|heretic|xenos|battle-brother|brother|chapter|oath|vow|templar|holy|zealot/i;
function run(html){const bad=[];
  {const {k}=boot(html);if(k.D().theme!=='plain')bad.push('a: new install theme '+k.D().theme);
   const D=k.D();D.theme='templar';D.onb=true;const st=JSON.stringify(D);const z=boot(html,st);if(z.k.D().theme!=='templar')bad.push('a: saved templar theme became '+z.k.D().theme);
   const bk=k.bkJSON();const r=boot(html).k.parseBk(bk),s2=r&&(r.state||r.s||r);if(!s2||s2.theme!=='templar')bad.push('a: backup theme not kept ('+(s2&&s2.theme)+')');}
  {const {k,d}=boot(html);const D=k.D();D.obStep=3;k.render();const b=d.querySelector('[data-a="onb"]');if(!b)bad.push('b: no finish button');else{b.click();if(D.tab!=='guide')bad.push('b: first onboarding ends on '+D.tab);}
   const txt=d.getElementById('app').textContent;SECS.forEach(sn=>{if(!txt.includes(sn))bad.push('c: guide misses "'+sn+'"');});
   if(!d.querySelector('#app [data-a="bkfile"]'))bad.push('c: guide has no backup button');if(!d.querySelector('#app [data-a="theme"]'))bad.push('c: guide has no theme picker');
   if(!d.querySelector('#app [data-tab="mehr"]'))bad.push('c: guide has no way to the settings');
   if(WH.test(txt.replace(/Theme[\s\S]*?Plain/,'')))bad.push('d: guide uses theme wording: '+(txt.match(WH)||[])[0]);
   D.tab='mehr';k.render();const g=d.querySelector('[data-tab="guide"]');if(!g)bad.push('c: More has no way to the guide');
   D.logs.push({d:k.today(),id:'RE',t:'Easy run',rpe:4,km:5,min:30});d.querySelector('[data-a="reonb"]').click();D.obStep=3;k.render();d.querySelector('[data-a="onb"]').click();if(D.tab!=='start')bad.push('b: re-entering basics with entries ends on '+D.tab);}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','pr:{},theme:"plain"','pr:{},theme:"templar"','a'],
  ['b','D.tab=D.logs.length?"start":"guide";','D.tab="start";','b'],
  ['c','h+=sec("5 · During training",','h+=("5 · During training",','c']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
