// @name hardening
// A-012 hardening: no external URLs in the build (only the canonical app URL), off-site <link>s stripped, frame-buster (embedded -> only a short
// note with a link to the real URL, nothing rendered or stored; normal open unchanged), service worker not registered when framed, net guard works.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const guard=require('./netguard');
const R=path.resolve(__dirname,'..');const iss=[];const errs=[];const CANON='https://quannosaurus.github.io/Crusade/';
// 1. static: no external URLs anywhere in sources and build output
// the SVG namespace in data: icons is an identifier, not a request
const files=['src/head.html','src/app.js','src/pics.js','index.html','app.js','app.css','sw.js','manifest.webmanifest','.build/index.html'];
for(const f of files){const s=fs.readFileSync(R+'/'+f,'utf8');
  if(/googleapis|gstatic/.test(s))iss.push('google fonts reference in '+f);
  for(const m of s.matchAll(/(?:https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}[^\s"'`)<>]*/gi)){const u=m[0];if(u!==CANON&&!/^(?:https?:)?\/\/www\.w3\.org\/2000\/svg/.test(u))iss.push('external URL in '+f+': '+u.slice(0,80));}}
const idx=fs.readFileSync(R+'/index.html','utf8');
if(!/Content-Security-Policy/.test(idx))iss.push('no CSP in index.html');
if(/<link\b[^>]*href="(?:https?:)?\/\//.test(idx))iss.push('off-site <link> in index.html');
const js=fs.readFileSync(R+'/app.js','utf8');const gi=js.indexOf('window.top!==window.self'),ri=js.indexOf('\nrender();');
if(gi<0||ri<0||gi>ri)iss.push('frame guard missing or after first render in app.js');
if(!/"serviceWorker" in navigator&&window\.top===window\.self/.test(js))iss.push('service worker registered even when framed');
// framing page next to the single-file build
fs.writeFileSync(R+'/.build/t21frame.html','<!DOCTYPE html><html><body><iframe id="f" src="index.html" width="390" height="700"></iframe></body></html>');
const U=n=>'file://'+R+'/.build/'+n;
(async()=>{const b=await chromium.launch();
// 2. net guard self-check: an external request must be caught
{const p=await b.newPage();const caught=[];await guard(p,caught);await p.goto(U('index.html'));
  await p.evaluate(()=>fetch('https://example.com/x').catch(()=>0));await p.waitForTimeout(100);
  if(!caught.some(x=>x.includes('example.com')))iss.push('net guard did not catch an external request');await p.close();}
const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));await guard(p,errs);
// 3. normal open: app renders as before, no note
await p.goto(U('index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(150);
const n=await p.evaluate(()=>({framed:!!document.getElementById('framed'),app:!!document.getElementById('app'),appKids:(document.getElementById('app')||{children:[]}).children.length,nav:!!document.getElementById('nav'),kz:!!window.__kz}));
if(n.framed)iss.push('note shown on normal open');if(!n.app||!n.appKids)iss.push('app not rendered on normal open');if(!n.nav)iss.push('nav missing on normal open');if(!n.kz)iss.push('test hook missing on normal open');
// 4. embedded: only the note with a link to the real URL
await p.evaluate(()=>localStorage.clear());
await p.goto(U('t21frame.html'));await p.waitForTimeout(300);
const fr=p.frames().find(f=>f!==p.mainFrame());
if(!fr)iss.push('iframe not loaded');else{
  const e=await fr.evaluate(()=>{const a=document.querySelector('#framed a');let ls=null;try{ls=localStorage.getItem('kz_app_v3');}catch(x){ls='(blocked)';}
    return {kids:[...document.body.children].map(x=>x.id||x.tagName),href:a&&a.getAttribute('href'),target:a&&a.target,text:(document.body.textContent||'').trim(),
      app:!!document.getElementById('app'),nav:!!document.getElementById('nav'),kz:!!window.__kz,ls:ls};});
  if(e.kids.length!==1||e.kids[0]!=='framed')iss.push('framed body has more than the note: '+e.kids.join(','));
  if(e.href!==CANON)iss.push('note link is not the real URL: '+e.href);if(e.target!=='_top')iss.push('note link does not open at top level');
  if(!/another page/.test(e.text))iss.push('note text missing');
  if(e.app||e.nav)iss.push('app markup present in frame');if(e.kz)iss.push('app logic ran in frame');
  if(e.ls&&e.ls!=='(blocked)')iss.push('state written while framed');}
await p.screenshot({path:R+'/.build/t21-framed.png'});
iss.push(...errs.map(e=>'pageerror: '+e));console.log("=== AUFFÄLLIGKEITEN ("+iss.length+") ===");iss.forEach(x=>console.log(" - "+x));await b.close();})();
