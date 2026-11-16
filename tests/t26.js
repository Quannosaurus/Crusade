// @name backup-watch
// A-014: backup watch. Last successful backup is remembered (share, download, copied text); a quiet reminder on the
// start page appears after > 7 days or ≥ 5 new entries (without any backup from the 3rd entry) and one tap saves the
// file. File and text backup hold the full user state including day progress ("days"), never the love key; a round
// trip into fresh storage restores identical logs, profile, progress and days. Old backups load, oversized input only
// gives a hint.
const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre,ls){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));if(ls)Object.keys(ls).forEach(k=>w.localStorage.setItem(k,ls[k]));
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){w.__dl=(w.__dl||0)+1;};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s)};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const ts=s=>new Date(s+'T12:00:00').getTime();
const TD='2026-11-16';
function base(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,start:'2026-10-05',logs:[],tab:'start'});k.today(TD);return D;}
function logs(n,from){const a=[];for(let i=0;i<n;i++)a.push({d:addD(from||'2026-10-06',i),id:'MO',t:'Morning routine',m:['hips']});return a;}
function shown(x){x.k.D().tab='start';x.k.render();return !!x.$('#bkrem');}
// 1 reminder rules
{const x=boot();const D=base(x.k);
 D.logs=logs(2);if(shown(x))issue('reminder with 2 entries and no backup');
 D.logs=logs(3);if(!shown(x))issue('no reminder from the 3rd entry without any backup');
 if(!/No backup yet/.test(x.$('#bkrem').textContent))issue('no-backup wording');
 D.logs=logs(10);D.bkTs=ts(TD);D.bkAt=10;D.bkDate=TD;if(shown(x))issue('reminder right after a backup');
 D.logs=logs(14);if(shown(x))issue('reminder after 4 new entries');
 D.logs=logs(15);if(!shown(x))issue('no reminder after 5 new entries');
 if(!/5 new entries/.test(x.$('#bkrem').textContent))issue('entry count wording: '+x.$('#bkrem').textContent);
 D.logs=logs(10);D.bkTs=ts(addD(TD,-7));D.bkDate=addD(TD,-7);if(shown(x))issue('reminder at exactly 7 days');
 D.bkTs=ts(addD(TD,-8));D.bkDate=addD(TD,-8);if(!shown(x))issue('no reminder after 8 days');
 if(!/8 days ago/.test(x.$('#bkrem').textContent))issue('age wording');
 // older data: date only, no time stamp
 delete D.bkTs;D.bkDate=addD(TD,-2);if(shown(x))issue('old-style recent backup still reminds');
 D.bkDate=addD(TD,-9);if(!shown(x))issue('old-style stale backup does not remind');
 // one tap: download path marks the backup and the reminder goes
 const el=x.$('#bkrem');if(el.getAttribute('data-a')!=='bkfile')issue('reminder does not lead to the backup');
 el.click();if(!x.w.__dl)issue('tap did not save a file');if(!(D.bkTs>0&&D.bkAt===D.logs.length&&D.bkDate===TD))issue('download not recorded '+JSON.stringify({bkTs:D.bkTs,bkAt:D.bkAt,bkDate:D.bkDate}));
 if(shown(x))issue('reminder stays after the backup');
 // no popup or blocking: other cards still there
 D.bkTs=0;D.bkDate=undefined;D.bkAt=0;shown(x);if(!x.$('.big'))issue('start page blocked by the reminder');
 if(x.errs.length)issue('rules: JS errors '+x.errs.join('; '));}
// 2 share path: recorded only when the share succeeds
(async()=>{
{const x=boot();const D=base(x.k);D.logs=logs(6);let ok=false;
 x.w.navigator.canShare=()=>true;x.w.navigator.share=()=>ok?Promise.resolve():Promise.reject(new Error('abort'));
 shown(x);x.$('#bkrem').click();await new Promise(r=>setTimeout(r,20));if(D.bkTs)issue('cancelled share counted as backup');
 ok=true;shown(x);x.$('#bkrem').click();await new Promise(r=>setTimeout(r,20));if(!D.bkTs||D.bkAt!==6)issue('successful share not recorded');
 // text: creating alone is no backup, copying is
 const y=boot();const E=base(y.k);E.logs=logs(4);E.tab='mehr';y.k.render();y.$('[data-a=exp]').click();if(E.bkTs)issue('creating the text counted as backup');
 y.$('#bk').dispatchEvent(new y.w.Event('copy',{bubbles:true}));if(!E.bkTs||E.bkAt!==4)issue('copied text not recorded');
 [x,y].forEach(z=>{if(z.errs.length)issue('share/text: JS errors '+z.errs.join('; '));});}
// 3 round trip: realistic state incl. day progress
{const x=boot(null,{kz_love_k:'2:c2FsdA:a2V5LXNlY3JldA'});const D=base(x.k);
 Object.assign(D.profile,{pull:9,dips:14,push:22});D.emph='glutes';D.fav=['Cable kickbacks','Hip thrust machine'];D.loc='g';D.theme='sisters';D.kickDays=[2];D.pain={w:true,s:false,e:false};D.abs=2;
 D.logs=[{d:'2026-11-09',id:'KC',t:'Strength C',lg:1,rpe:7,note:'good <b>',abs:1,sum:'Squat 60 kg × 8',sk:['hs'],ex:{'c_sq#0':[8,60]},tv:{},pr:1},
   {d:'2026-11-10',id:'RE',t:'Easy run',rpe:4,note:'',km:6.2,min:38.5,pr:0},{d:'2026-11-11',id:'KI',t:'Kickboxing',rpe:8,note:''},{d:'2026-11-12',id:'MO',t:'Morning routine',m:['hips']}];
 D.ex={'c_sq#0':{r:8,w:60,d:'2026-11-09',hold:false,n:'Barbell back squat',stall:0},'g_ht#1':{r:10,w:40,d:'2026-11-09',hold:false,n:'Hip thrust machine'}};
 D.pr={'c_sq#0':{sc:60008,r:8,w:60,d:'2026-11-09',n:'Barbell back squat'},'run':{sc:1,r:0,w:0,d:'2026-11-10',n:'5 km',p:6.1,km:6.2}};D.vr={a_row:2};
 const dy=x.k.day(TD);dy.pick='KA';dy.done={'KA-0-0':true,'m-hips':true};dy.inp={'KA-3-0':{s:['5','4',null],w:'7.5'}};dy.skip={'KA-2-1':true};dy.fin={rpe:7,note:'half done'};dy.open={abs:true};
 x.k.day(addD(TD,-1)).done={'m-core':true};
 const txtFile=x.k.bkJSON();
 if(/kz_love_k|a2V5LXNlY3JldA|loveOK/.test(txtFile))issue('love key in the file backup');
 D.tab='mehr';x.k.render();x.$('[data-a=exp]').click();const txtText=x.$('#bk').value;
 if(/kz_love_k|a2V5LXNlY3JldA/.test(txtText))issue('love key in the text backup');
 if(!JSON.parse(txtText).days||!JSON.parse(txtFile).days)issue('days missing in a backup');
 if(/"_bk"|"_msg"|"tab"/.test(txtFile))issue('transient UI state in the backup');
 const want=JSON.parse(JSON.stringify(D)),pick=o=>canon({logs:o.logs,profile:o.profile,ex:o.ex,pr:o.pr,vr:o.vr,days:o.days,fav:o.fav,emph:o.emph,theme:o.theme,kickDays:o.kickDays,pain:o.pain,abs:o.abs,loc:o.loc});
 // file round trip through the real file input
 const a=boot();a.k.today(TD);a.k.D().tab='start';a.k.render();
 await new Promise(res=>{const inp=a.$('#bkin')||(()=>{a.k.D().onb=true;a.k.D().tab='mehr';a.k.render();return a.$('#bkin');})();
   const f=new a.w.File([txtFile],'crusade-backup.json',{type:'application/json'});Object.defineProperty(inp,'files',{value:[f]});inp.dispatchEvent(new a.w.Event('change',{bubbles:true}));setTimeout(res,100);});
 if(pick(a.k.D())!==pick(want))issue('file round trip differs: '+diffs(a.k.D(),want));
 if(a.w.localStorage.getItem('kz_love_k'))issue('love key appeared after restore');
 if(shown(a))issue('reminder right after restoring a fresh backup');
 // text round trip through the text field
 const b=boot();b.k.today(TD);Object.assign(b.k.D(),{onb:true,tab:'mehr'});b.k.render();b.$('#bk').value=txtText;b.$('[data-a=imp]').click();
 if(pick(b.k.D())!==pick(want))issue('text round trip differs: '+diffs(b.k.D(),want));
 b.k.D().tab='train';b.k.render();if(!b.$('#app'))issue('render after restore');
 [x,a,b].forEach(z=>{if(z.errs.length)issue('round trip: JS errors '+z.errs.join('; '));});}
// 4 old backup without days and time stamp
{const old={v:3,start:'2026-09-07',onb:true,profile:{pull:4,dips:6,push:15},bkAt:150,logs:logs(4,'2026-11-01').concat([{d:'2026-11-09',id:'KC',t:'x',rpe:6}]),ex:{'g_ht#1':{r:10,w:30,d:'2026-11-09',n:'Hip thrust machine'}},vr:{},pain:{},home:{}};
 const x=boot();x.k.today(TD);if(!x.k.restore(JSON.stringify(old)))issue('old backup rejected');const D=x.k.D();
 if(D.logs.length!==5||D.ex['g_ht#1'].w!==30)issue('old backup content');if(!D.days||typeof D.days!=='object')issue('old backup: days not initialised');
 if(D.bkAt!==150)issue('bkAt clamped '+D.bkAt);
 D.tab='train';x.k.render();if(!shown(x))issue('old backup without stamp: no reminder at 5 entries');
 if(x.errs.length)issue('old backup: JS errors '+x.errs.join('; '));}
// 5 oversize: hint, nothing changed, app usable
{const x=boot();const D=base(x.k);D.logs=logs(3);D.tab='mehr';x.k.render();const n0=JSON.stringify(D.logs);
 const big=new x.w.File(['x'],'big.json');Object.defineProperty(big,'size',{value:11*1024*1024});const inp=x.$('#bkin');Object.defineProperty(inp,'files',{value:[big],configurable:true});
 inp.dispatchEvent(new x.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,30));
 if(!/too large/.test(x.$('#app').textContent))issue('no hint for an oversized file');if(JSON.stringify(x.k.D().logs)!==n0)issue('oversized file changed data');
 x.$('#bk').value='{"profile":{},"logs":[],"pad":"'+'a'.repeat(x.k.MAXBK)+'"}';x.$('[data-a=imp]').click();
 if(!/too large/.test(x.$('#app').textContent))issue('no hint for oversized text');if(JSON.stringify(x.k.D().logs)!==n0)issue('oversized text changed data');
 if(x.k.restore('x'.repeat(x.k.MAXBK+1)))issue('restore accepted oversized text');
 x.$('.nav [data-tab=start]').click();if(!x.$('.big'))issue('app not usable after the oversize hint');
 if(x.errs.length)issue('oversize: JS errors '+x.errs.join('; '));}
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));process.exit(0);
})();
// key order is irrelevant for identity, values are compared exactly
function canon(v){return JSON.stringify(v,(k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.keys(x).sort().reduce((o,q)=>(o[q]=x[q],o),{}):x);}
function diffs(a,b){const o=[];['logs','profile','ex','pr','vr','days','fav','emph','theme','kickDays','pain','abs','loc'].forEach(k=>{if(canon(a[k])!==canon(b[k]))o.push(k+': '+canon(a[k]).slice(0,300)+' ≠ '+canon(b[k]).slice(0,300));});return o.join(' | ');}
