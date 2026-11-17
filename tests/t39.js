// @name import-keys
// A-022: variant choices survive a restore. D.vr keys have the form "<loc>|<key>" (g gym, h home, m Field kit) with
// item keys, mx_/fav_ keys, iso/test keys and "f:"+name of fixed items. A round trip through file and text into fresh
// storage gives an identical D.vr; the variant shown in a session is the same as before. Crafted keys (__proto__,
// "g|__proto__", constructor, overlong, wrong prefix, markup) are refused, values stay 0–20, at most 300 keys, no
// prototype pollution. Other composite-key fields (ex, pr, kitD, fav, log ex, days) keep their real keys. Old backups load.
const {JSDOM}=require('./domguard');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};}
const TD='2026-11-16';
const canon=v=>JSON.stringify(v,(k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.keys(x).sort().reduce((o,q)=>(o[q]=x[q],o),{}):x);
function base(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,start:'2026-10-05',tab:'train'});k.today(TD);
  Object.keys(D.home).forEach(x=>D.home[x]=true);D.skills.hs=true;D.skills.mu=true;D.fav=['Cable kickbacks'];D.kit=['b','d'];return D;}
// shown variant names of a session at a location
function shownVars(k,id,loc){const s=k.S(id,k.ctx(k.today()));const out=[];s.blocks.forEach(b=>b.items.forEach(it=>{const v=k.curVar(it,loc);if(v>=0)out.push(it.opts[v].n);}));return out.join('/');}
// change variants through the real "chg" button on the training page
function tapChanges(x,id,n){const D=x.k.D();const dy=x.k.day();dy.pick=id;D.tab='train';x.k.render();let c=0;
  for(let i=0;i<n;i++){const bs=x.$$('[data-a=chg]');if(!bs.length)break;const b=bs[(i*3)%bs.length];b.click();c++;x.k.render();}return c;}
(async()=>{
// 1 build a realistic D.vr with taps in gym, home and Field kit
const x=boot();const D=base(x.k);
D.loc='g';const ng=tapChanges(x,'KA',6)+tapChanges(x,'KC',4);
D.loc='h';const nh=tapChanges(x,'HO',6);
D.loc='g';x.k.day().kit=true;const nm=tapChanges(x,'KB',5);x.k.day().kit=false;
const keys=Object.keys(D.vr);
['g|','h|','m|'].forEach(p=>{if(!keys.some(q=>q.indexOf(p)===0))issue('no variant choice recorded for '+p+' (taps g'+ng+' h'+nh+' m'+nm+')');});
// add the other real key shapes so every form is covered: fixed item, iso, mx_ and fav_ keys
Object.assign(D.vr,{'g|f:Rowing machine':1,"h|f:World's greatest stretch":0,'h|hsw':2,'m|mx_c_sq':3,'g|fav_g_ht':1,'h|f:Transition on a Smith machine, low bar, feet on floor':1,'g|f:45° back extension':2});
D.ex={'c_sq#0':{r:8,w:60,d:'2026-11-09',hold:false,n:'Barbell back squat'},'mx_c_sq#2':{r:12,w:0,d:'2026-11-10',hold:false,n:'Bodyweight squat'},'fav_g_ht#1':{r:10,w:40,d:'2026-11-09',hold:false,n:'Hip thrust machine'}};
D.pr={'c_sq#0':{sc:60008,r:8,w:60,d:'2026-11-09',n:'Barbell back squat'},'iso:hsw':{sc:30,r:30,w:0,d:'2026-11-09',n:'Wall hold (s)'},'test:pull':{sc:10,r:10,w:0,d:'2026-11-08',n:'Pull-ups'},'run:pace5':{p:6.1,d:'2026-11-10'},'run:long':{km:12,d:'2026-11-11'}};
D.kitD={c_sq:'2026-11-10',b_pu:'2026-11-10'};D.logs=[{d:'2026-11-10',id:'KB',t:'Strength B',rpe:6,ex:{'mx_c_sq#2':[12,0],'iso:hsw':[30,0]},tv:{pull:10}}];
const before={KA:shownVars(x.k,'KA','g'),HO:shownVars(x.k,'HO','h')};x.k.day().kit=true;before.KB=shownVars(x.k,'KB','m');x.k.day().kit=false;
// other composite-key fields: same keys (values of run records are normalised by cleanImport, so keys and core values)
const rest=E=>canon({ex:Object.keys(E.ex).sort(),pr:Object.keys(E.pr).sort().map(q=>q+':'+(E.pr[q].sc||0)+':'+(E.pr[q].km||0)+':'+(E.pr[q].p||0)),kitD:E.kitD,fav:E.fav,logs:E.logs});
const want=canon(D.vr),wantRest=rest(D);
const txtFile=x.k.bkJSON();D.tab='mehr';x.k.render();x.$('[data-a=exp]').click();const txtText=x.$('#bk').value;
// 2 file round trip into fresh storage through the real file input
{const a=boot();a.k.today(TD);Object.assign(a.k.D(),{onb:true,tab:'mehr'});a.k.render();
 await new Promise(res=>{const inp=a.$('#bkin');const f=new a.w.File([txtFile],'crusade-backup.json',{type:'application/json'});Object.defineProperty(inp,'files',{value:[f]});inp.dispatchEvent(new a.w.Event('change',{bubbles:true}));setTimeout(res,100);});
 const E=a.k.D();if(canon(E.vr)!==want)issue('file round trip: D.vr differs '+canon(E.vr).slice(0,200)+' ≠ '+want.slice(0,200));
 {const got=rest(E);if(got!==wantRest)issue('file round trip: ex/pr/kitD/fav/log keys differ '+got.slice(0,300));}
 const after={KA:shownVars(a.k,'KA','g'),HO:shownVars(a.k,'HO','h')};a.k.day().kit=true;after.KB=shownVars(a.k,'KB','m');a.k.day().kit=false;
 Object.keys(before).forEach(id=>{if(after[id]!==before[id])issue('file round trip: shown variants differ in '+id);});
 if(a.errs.length)issue('file: JS errors '+a.errs.join('; '));}
// 3 text round trip
{const b=boot();b.k.today(TD);Object.assign(b.k.D(),{onb:true,tab:'mehr'});b.k.render();b.$('#bk').value=txtText;b.$('[data-a=imp]').click();
 const E=b.k.D();if(canon(E.vr)!==want)issue('text round trip: D.vr differs');
 if(rest(E)!==wantRest)issue('text round trip: ex/pr/kitD/fav/log keys differ');
 E.tab='train';b.k.day().pick='KA';b.k.render();if(!b.$('[data-a=chg]'))issue('training page after restore');
 if(b.errs.length)issue('text: JS errors '+b.errs.join('; '));}
// 4 crafted keys are refused, real ones kept, values clamped
{const y=boot();y.k.today(TD);const ci=y.k.cleanImport;
 const evil=JSON.parse('{"profile":{},"logs":[],"vr":{"__proto__":{"polluted":1},"g|__proto__":3,"h|constructor":2,"constructor":1,"prototype":1,"m|f:__proto__":1,"x|pull":1,"G|a_row":1,"g||a_row":1,"g|A_ROW":1,"g|a_row ":1,"g|f:<img src=x>":1,"g|f:":1,"g|":1,"|a_row":1,"gh|a_row":1,"g|f:a\\u0000b":1}}');
 evil.vr['g|'+'a'.repeat(61)]=1;evil.vr['g|f:'+'A'.repeat(91)]=1;evil.vr['g|a_row']=99;evil.vr['h|b_pu']=-5;evil.vr['m|mx_c_sq']='7';evil.vr['g|f:Rowing machine']=2.9;
 const b=ci(evil),ks=Object.keys(b.vr).sort();
 if(ks.join()!==['g|a_row','g|f:Rowing machine','h|b_pu','m|mx_c_sq'].sort().join())issue('crafted keys not refused / real keys lost: '+JSON.stringify(ks));
 if(b.vr['g|a_row']!==20||b.vr['h|b_pu']!==0||b.vr['m|mx_c_sq']!==7||b.vr['g|f:Rowing machine']!==2)issue('values not clamped to 0–20 integers '+JSON.stringify(b.vr));
 if(Object.getPrototypeOf(b.vr)!==y.w.Object.prototype||({}).polluted||y.w.Object.prototype.polluted||b.vr.polluted)issue('prototype pollution through vr');
 const many={};for(let i=0;i<400;i++)many['g|k'+i]=1;if(Object.keys(ci({profile:{},logs:[],vr:many}).vr).length>300)issue('more than 300 keys accepted');
 // other fields keep refusing junk
 const j=ci({profile:{},logs:[],ex:{'__proto__':{r:1},'g|c_sq#0':{r:1},'<x>#0':{r:1}},pr:{'__proto__':{sc:1},'<b>':{sc:1}},kitD:{'__proto__':'2026-11-10','g|c_sq':'2026-11-10',c_sq:'bad'},fav:['x'.repeat(95),{}]});
 if(Object.keys(j.ex).length||Object.keys(j.pr).length||(j.kitD&&Object.keys(j.kitD).length)||j.fav.length)issue('junk in ex/pr/kitD/fav accepted '+canon({ex:j.ex,pr:j.pr,kitD:j.kitD,fav:j.fav}));
 if(y.errs.length)issue('crafted: JS errors '+y.errs.join('; '));}
// 5 old backups load: no vr, bare keys of the old form, empty vr
{const old={v:3,start:'2026-09-07',onb:true,profile:{pull:4,dips:6,push:15},logs:[{d:'2026-11-09',id:'KC',t:'x',rpe:6}],ex:{'g_ht#1':{r:10,w:30,d:'2026-11-09',n:'Hip thrust machine'}},pain:{},home:{}};
 [old,Object.assign({},old,{vr:{a_row:2}}),Object.assign({},old,{vr:{}})].forEach((o,i)=>{const z=boot();z.k.today(TD);if(!z.k.restore(JSON.stringify(o)))issue('old backup '+i+' rejected');
   const E=z.k.D();if(E.logs.length!==1||E.ex['g_ht#1'].w!==30)issue('old backup '+i+' content');if(i===1&&E.vr.a_row!==2)issue('old bare vr key dropped');
   E.tab='train';z.k.day().pick='KC';z.k.render();if(z.errs.length)issue('old backup '+i+': JS errors '+z.errs.join('; '));});}
if(x.errs.length)issue('setup: JS errors '+x.errs.join('; '));
console.log('variant keys in the round trip: '+Object.keys(JSON.parse(want)).length);
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));process.exit(0);
})();
