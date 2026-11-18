// I-44: one fixed Chromium for every Playwright test.
// Loaded by tests/run.sh and tests/longterm.sh through NODE_OPTIONS="--require ./tests/browser.js".
// 1. The Chromium build pinned by the exact Playwright version in package.json (npx playwright install chromium).
// 2. If that build is not installed (offline machine, blocked download): an installed Chrome
//    (KZ_CHROME, else google-chrome / chromium on the PATH), with one clear line on stderr.
// No test changes its launch call; run.sh and longterm.sh print once (stderr) which browser runs.
const fs=require('fs');
let pw;try{pw=require('playwright');}catch(e){return;}
const C=pw.chromium,orig=C.launch.bind(C);
function fallback(){
  const env=process.env.KZ_CHROME;if(env&&fs.existsSync(env))return env;
  for(const p of['/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser','/opt/google/chrome/chrome'])if(fs.existsSync(p))return p;
  return null;
}
function pinned(){try{const p=C.executablePath();return p&&fs.existsSync(p)?p:null;}catch(e){return null;}}
let said=false;
C.launch=function(opts){
  opts=Object.assign({},opts||{});
  if(!opts.executablePath&&!pinned()){
    const f=fallback();
    if(f){opts.executablePath=f;if(!said&&!process.env.KZ_QUIET){said=true;process.stderr.write('NOTE pinned Chromium not installed – using installed Chrome: '+f+'\n');}}
  }
  return orig(opts);
};
function report(){const v=require('playwright/package.json').version,p=pinned();
  if(p){process.stderr.write('browser: pinned Chromium of Playwright '+v+' ('+p+')\n');return;}
  const f=fallback();let ver='';try{ver=require('child_process').execFileSync(f,['--version'],{encoding:'utf8',timeout:10000}).trim();}catch(e){}
  process.stderr.write(f?'NOTE browser: the pinned Chromium of Playwright '+v+' is not installed (npx playwright install chromium) – offline fallback to the installed Chrome '+f+(ver?' ('+ver+')':'')+'\n':'NOTE browser: no Chromium found – run npx playwright install chromium\n');}
module.exports={pinned,fallback,report};
