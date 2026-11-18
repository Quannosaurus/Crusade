// @name test-net
// A-057: the parts of the test net that belong to no other test. e) I-44 one fixed Chromium: Playwright pinned to an exact
// version (package.json and lock agree), tests/run.sh and tests/longterm.sh load tests/browser.js and report the browser
// once, the fallback to an installed Chrome only takes effect when the pinned build is missing and passes its path, CLAUDE.md
// names the version and both ways. Wiring of the new check stones: t49 marks the A-057 stones (wkh, mix) sharp, t42 measures
// the band per accent block with the N-6 floor, t24 holds a ban list of sensible length and scans Plain, t48 checks the rank
// line in the extreme case in every theme.
const fs=require('fs'),path=require('path');const R=p=>path.resolve(__dirname,'..',p);const rd=p=>fs.readFileSync(R(p),'utf8');
const P=[];const issue=m=>P.push(m);const rep=[];
// e) exact pin
const pkg=JSON.parse(rd('package.json')),lock=JSON.parse(rd('package-lock.json'));const pin=(pkg.devDependencies||{}).playwright||'';
if(!/^\d+\.\d+\.\d+$/.test(pin))issue('playwright not pinned to an exact version: "'+pin+'"');
const lk=((lock.packages||{})['node_modules/playwright']||{}).version,lr=(((lock.packages||{})['']||{}).devDependencies||{}).playwright;
if(lk!==pin)issue('package-lock playwright '+lk+' ≠ package.json '+pin);if(lr!==pin)issue('package-lock root spec '+lr+' ≠ '+pin);
let inst='';try{inst=require('playwright/package.json').version;}catch(e){}if(inst&&inst!==pin)issue('installed playwright '+inst+' ≠ pin '+pin+' (run npm ci)');
rep.push('playwright pin '+pin+', installed '+(inst||'–'));
// runners load the launcher and report once
['tests/run.sh','tests/longterm.sh'].forEach(f=>{const t=rd(f);if(!/NODE_OPTIONS="--require [^"]*tests\/browser\.js/.test(t))issue(f+' does not load tests/browser.js');if(!/browser\.js'\)\.report\(\)/.test(t))issue(f+' does not report the browser');
  const iB=t.indexOf('browser.js'),iL=t.search(/\bfor (t|f) in\b/);if(iL>=0&&iB>iL)issue(f+': browser set up after the test loop starts');});
// launcher: pinned first, fallback only when the pinned build is missing, with its path
{const pw=require('playwright'),C=pw.chromium,orig=C.launch;const B=require('./browser.js');
  if(C.launch===orig&&!/executablePath/.test(String(C.launch)))issue('browser.js does not wrap chromium.launch');
  let seen=null;const inner=C.launch;
  // stub the real launch underneath: reload browser.js against a fake chromium
  const fake={executablePath:()=>'/nonexistent/chrome-for-testing',launch:o=>{seen=o;return Promise.resolve('ok');}};
  const Mod=require('module'),key=require.resolve('./browser.js'),pkey=require.resolve('playwright');const savedP=require.cache[pkey],savedB=require.cache[key];
  require.cache[pkey]={id:pkey,filename:pkey,loaded:true,exports:{chromium:fake}};delete require.cache[key];process.env.KZ_QUIET='1';
  const F=require('./browser.js');fake.launch({headless:true});const fb=F.fallback();
  if(fb){if(!seen||seen.executablePath!==fb)issue('pinned build missing: the fallback path is not passed ('+JSON.stringify(seen)+')');}else rep.push('no installed Chrome on this machine (fallback not testable)');
  seen=null;fake.executablePath=()=>process.execPath;/* an existing file stands for the pinned build */fake.launch({});if(seen&&seen.executablePath)issue('pinned build present but the fallback still takes over');
  seen=null;fake.executablePath=()=>'/nonexistent';fake.launch({executablePath:'/own/chrome'});if(!seen||seen.executablePath!=='/own/chrome')issue('an explicit executablePath is overridden');
  require.cache[pkey]=savedP;if(savedB)require.cache[key]=savedB;else delete require.cache[key];
  rep.push('pinned build '+(B.pinned()?'installed':'missing')+' · fallback '+(fb||'none'));}
// CLAUDE.md documents version and ways
{const cm=rd('CLAUDE.md');if(!cm.includes('Playwright '+pin))issue('CLAUDE.md does not name Playwright '+pin);if(!/tests\/browser\.js/.test(cm))issue('CLAUDE.md does not name tests/browser.js');
  if(!/npx playwright install chromium/.test(cm))issue('CLAUDE.md lacks the install way');if(!/offline|installed Chrome/i.test(cm))issue('CLAUDE.md lacks the offline fallback way');}
// wiring of the new stones
{const t49=rd('tests/t49.js');if(!/ACTIVE=\[[^\]]*'A-057'/.test(t49))issue('t49: A-057 stones not active');['wkh','mix'].forEach(x=>{if(!new RegExp(x+":'A-057'").test(t49))issue('t49: stone '+x+' not mapped to A-057');});
  if(!/hold\.sk=/.test(t49))issue('t49 mixed course without skill hold');if(!/pauseEnd\(/.test(t49))issue('t49 pause does not end like the app (pauseEnd)');
  const t42=rd('tests/t42.js');if(!/accOf\(/.test(t42)||!/Math\.ceil\(lo\*2\/3\)/.test(t42))issue('t42 does not measure the band per accent block with the ⅔ floor');
  const t24=rd('tests/t24.js'),m=t24.match(/const BAN=\[([\s\S]*?)\];/);const n=m?(m[1].match(/'[^']+'/g)||[]).length:0;if(n<60)issue('t24 ban list '+n+' terms (< 60)');rep.push('t24 ban list '+n+' terms');
  if(!/theme:'plain'/.test(t24))issue('t24 does not scan the Plain theme');
  const t48=rd('tests/t48.js');if(!/400/.test(t48)||!/THEMES/.test(t48)||!/rankline/.test(t48))issue('t48 lacks the extreme rank line check');}
rep.forEach(r=>console.log('  '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
