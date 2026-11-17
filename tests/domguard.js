// JSDOM guard (A-034): every JSDOM test loads jsdom through this module ("const {JSDOM}=require('./domguard')").
// Each window it creates collects runtime errors (uncaught exceptions from click/change handlers, timers and
// other listeners reach the window "error" event). On exit the test prints one result line
//   === AUFFÄLLIGKEITEN Laufzeitfehler (n) ===
// and fails with at least 1 error. A test that provokes an error on purpose wraps that step in
// allow(fn) or names the expected message with expect(re).
const jsdom=require('jsdom');
const Orig=jsdom.JSDOM;const errs=[];const exp=[];let quiet=0;
class Guarded extends Orig{
  constructor(html,opts){super(html,opts);const w=this.window;
    w.addEventListener('error',e=>{if(quiet)return;const m=String((e&&e.message)||(e&&e.error&&e.error.message)||'error');
      if(exp.some(r=>r.test(m)))return;errs.push(m+(e&&e.error&&e.error.stack?' @ '+String(e.error.stack).split('\n')[1].trim():''));});}
}
if(jsdom.JSDOM!==Guarded&&!jsdom.__guarded){jsdom.JSDOM=Guarded;jsdom.__guarded=true;
  process.on('exit',()=>{console.log('=== AUFFÄLLIGKEITEN Laufzeitfehler ('+errs.length+') ===');errs.slice(0,8).forEach(m=>console.log(' - runtime error: '+m));
    if(errs.length&&!process.exitCode)process.exitCode=1;});}
jsdom.allow=fn=>{quiet++;try{return fn();}finally{quiet--;}};
jsdom.expect=re=>exp.push(re);
jsdom.runtimeErrors=()=>errs.slice();
module.exports=jsdom;
