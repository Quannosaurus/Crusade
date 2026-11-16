// @name love-lock
// A-008 love-lock: no code hash ships; the love theme opens only with a code whose PBKDF2 key decrypts the verifier in love.enc.json; min. 12 characters,
// text input; without love.enc.json it stays locked with a hint; A-006 devices (old key / loveOK flag) keep theme choice + logs and ask once for the new code.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const R=path.resolve(__dirname,'..');const iss=[];const errs=[];
const CODE='Correct horse 4 battery',BAD='Correct horse 4 batterz',SHORT='short 1234',MSGS=['ZQX lock note one','ZQX lock note two','ZQX lock note three'];
const py='import sys,json;sys.path.insert(0,'+JSON.stringify(R+'/tools')+');import encrypt_love as e;print(e.encrypt_json(json.loads(sys.argv[1]),sys.argv[2]))';
const enc=cp.execFileSync('python3',['-I','-c',py,JSON.stringify(MSGS),CODE],{cwd:R}).toString().trim();const E=JSON.parse(enc);
// no fast check of the code anywhere
for(const f of ['src/app.js','app.js','index.html','.build/index.html','tools/encrypt_love.py']){const s=fs.readFileSync(R+'/'+f,'utf8');
  for(const [n,re] of [['LOVEH',/LOVEH/],['codeHash',/codeHash|code_hash/],['FNV',/2166136261|16777619|\bFNV\b/i],['old code hash',/1005865574/],['fixed salt',/LOVESALT|crusade-love-notes-v1/]])if(re.test(s))iss.push(n+' in '+f);}
const built=fs.readFileSync(R+'/.build/index.html','utf8');
fs.writeFileSync(R+'/.build/t15e.html',built.replace(/var LOVEENC=(null|\{[^;]*\});/,'var LOVEENC='+enc+';'));
fs.writeFileSync(R+'/.build/t15n.html',built.replace(/var LOVEENC=(null|\{[^;]*\});/,'var LOVEENC=null;'));
const U=n=>'file://'+R+'/.build/'+n;
const base={v:3,start:"2026-10-01",onb:true,seenFocus:true,seenFav:true,loc:"g",profile:{pull:5,dips:8,push:15,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},
  logs:[{d:"2026-11-03",id:"KA",rpe:7},{d:"2026-11-05",id:"MO"},{d:"2026-11-08",id:"KB",rpe:8}]};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
const theme=()=>p.evaluate(()=>document.body.getAttribute('data-theme'));
const set=async(url,st,key)=>{await p.goto(url);await p.evaluate(([x,k])=>{localStorage.clear();if(x)localStorage.setItem('kz_app_v3',x);if(k)localStorage.setItem('kz_love_k',k);},[st?JSON.stringify(st):null,key||null]);await p.reload();await p.waitForTimeout(150);};
// 1) build without love.enc.json: locked, clear hint in the code field
await set(U('t15n.html')+'?theme=love',null);
if(await p.$('input[value=love]'))iss.push('no-enc: love selectable');
const ni=await p.$('#o_code');if(!ni)iss.push('no-enc: no code field');else{if(!await ni.isDisabled())iss.push('no-enc: field not disabled');if(!/Not set up/.test(await ni.getAttribute('placeholder')||''))iss.push('no-enc: no placeholder hint');}
if(!/isn't set up on this build/.test(await p.evaluate(()=>document.body.innerText)))iss.push('no-enc: no hint text');
if(await p.evaluate(()=>window.__kz.love.unlock('Correct horse 4 battery'))!==false)iss.push('no-enc: unlock() not false');
await set(U('t15n.html'),Object.assign({},base,{theme:"love"}),'2:abc:def');
if(await theme()==='love')iss.push('no-enc: old love device shows theme');
// 2) link ?theme=love with the cipher file: lock opens, nothing unlocked
await set(U('t15e.html')+'?theme=love',null);
if(await p.$('input[value=love]'))iss.push('love visible without code');if(await theme()==='love')iss.push('link unlocks love without code');
if(!await p.$('details.lock[open]'))iss.push('lock not open for love link');
const ia=await p.$eval('#o_code',e=>({t:e.type,im:e.getAttribute('inputmode'),ml:e.minLength}));
if(ia.t!=='password'||ia.im==='numeric'||ia.ml!==12)iss.push('code field '+JSON.stringify(ia));
await p.fill('#o_code',SHORT);await p.click('[data-a=unlock]');await p.waitForTimeout(100);
if(!/at least 12 characters/.test(await p.evaluate(()=>document.body.innerText)))iss.push('short code without hint');
await p.fill('#o_code',BAD);await p.click('[data-a=unlock]');
await p.waitForFunction(()=>/not the code/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('wrong code without hint'));
if(await theme()==='love'||await p.$('input[value=love]'))iss.push('wrong code unlocks');
if(await p.evaluate(()=>localStorage.getItem('kz_love_k')))iss.push('wrong code stored a key');
await p.screenshot({path:'/tmp/love-lock.png'});
await p.fill('#o_code',CODE);await p.click('[data-a=unlock]');
await p.waitForFunction(()=>document.body.getAttribute('data-theme')==='love',null,{timeout:20000}).catch(()=>iss.push('right code does not unlock'));
if(!await p.$('input[value=love]'))iss.push('love not selectable after unlock');
const k1=await p.evaluate(()=>localStorage.getItem('kz_love_k'));if(!k1||k1.indexOf('2:'+E.salt+':')!==0)iss.push('key not stored with salt');
await p.reload();await p.waitForTimeout(300);if(await theme()!=='love')iss.push('love lost after restart');if(await p.$('#o_code'))iss.push('code asked again after restart');
// 3) A-006 device: theme love + loveOK + old bare key -> no error, theme kept as choice, asked once on start, logs kept
const errs0=errs.length;
await set(U('t15e.html'),Object.assign({},base,{theme:"love",loveOK:true}),'q8Zr0bWw2xJx0hZQ4Xh1kq5bqf6x4v4t0aV0nUj3n3k=');
if(errs.length>errs0)iss.push('migration: page error');
if(await theme()==='love')iss.push('migration: love open with old key');
let st=await p.evaluate(()=>window.__kz.D());if(st.theme!=='love')iss.push('migration: theme choice lost ('+st.theme+')');if(st.logs.length!==3)iss.push('migration: logs lost');if('loveOK' in st)iss.push('migration: loveOK kept');
if(await p.evaluate(()=>localStorage.getItem('kz_love_k')))iss.push('migration: old key not dropped');
if(!await p.$('#love_code'))iss.push('migration: no code field on start');
if(await p.$('input[value=love]'))iss.push('migration: love radio without code');
await p.screenshot({path:'/tmp/love-code.png'});
await p.fill('#love_code',CODE);await p.click('[data-a=lovekey]');
await p.waitForFunction(()=>document.body.getAttribute('data-theme')==='love'&&/ZQX/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('migration: new code does not open theme + note'));
await p.reload();await p.waitForFunction(()=>/ZQX/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('migration: note gone after restart'));
if(await theme()!=='love'||await p.$('#love_code'))iss.push('migration: asked again after restart');
st=await p.evaluate(()=>window.__kz.D());if(st.logs.length!==3)iss.push('migration: logs lost after unlock');
// 4) manipulated storage: theme love without key, or a forged key with the right salt -> no love
await set(U('t15e.html'),Object.assign({},base,{theme:"love"}));if(await theme()==='love')iss.push('love without key');
await set(U('t15e.html'),Object.assign({},base,{theme:"love"}),'2:'+E.salt+':'+Buffer.alloc(32,7).toString('base64'));await p.waitForTimeout(400);
if(await theme()==='love')iss.push('forged key opens love');if(await p.evaluate(()=>localStorage.getItem('kz_love_k')))iss.push('forged key not dropped');
// 5) old backup (with loveOK) still restores, flag grants nothing
const ok=await p.evaluate(t=>window.__kz.restore(t,"start"),JSON.stringify(Object.assign({},base,{theme:"templar",loveOK:true})));
if(ok!==true)iss.push('old backup restore '+ok);st=await p.evaluate(()=>window.__kz.D());if(st.logs.length!==3||st.loveOK)iss.push('restore state '+JSON.stringify({n:st.logs.length,l:st.loveOK}));
if(await p.$('input[value=love]'))iss.push('restored loveOK unlocks');
for(const f of ['t15e.html','t15n.html'])fs.unlinkSync(R+'/.build/'+f);
iss.push(...errs.map(e=>"pageerror: "+e));console.log("=== AUFFÄLLIGKEITEN ("+iss.length+") ===");iss.forEach(x=>console.log(" - "+x));await b.close();})();
