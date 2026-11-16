// @name love-crypto
// A-006/A-008 love-crypto: encrypted daily love notes (file v2: random salt + verifier). Python tool encrypts, app logic decrypts; wrong code or broken
// verifier -> no text; min. code length in tool and app; daily pick stable, no repeats per cycle.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const R=path.resolve(__dirname,'..');const iss=[];const errs=[];
const CODE='my love code 4711',BAD='my love code 4712',MSGS=['ZQX test note one, love','ZQX test note two ♥','ZQX test note three','ZQX test note four','ZQX test note five'];
const py='import sys,json;sys.path.insert(0,"tools");import encrypt_love as e;print(e.encrypt_json(json.loads(sys.argv[1]),sys.argv[2]))';
const enc=cp.execFileSync('python3',['-I','-c',py.replace('sys.path.insert(0,"tools")','sys.path.insert(0,'+JSON.stringify(R+'/tools')+')'),JSON.stringify(MSGS),CODE],{cwd:R}).toString().trim();
if(/ZQX/.test(enc))iss.push('plaintext in ciphertext');
const E1=JSON.parse(enc),E2=JSON.parse(cp.execFileSync('python3',['-I','-c',py.replace('sys.path.insert(0,"tools")','sys.path.insert(0,'+JSON.stringify(R+'/tools')+')'),JSON.stringify(MSGS),CODE],{cwd:R}).toString());
if(E1.v!==2||!E1.salt||!E1.viv||!E1.vct||E1.it!==600000)iss.push('file format '+Object.keys(E1));if(E1.salt===E2.salt)iss.push('salt not random per run');
const shortPy='import sys;sys.path.insert(0,'+JSON.stringify(R+'/tools')+');import encrypt_love as e\ntry:\n e.encrypt_json(["x"],"  eleven ch  ")\n print("WROTE")\nexcept ValueError:\n print("REFUSED")';
if(cp.execFileSync('python3',['-I','-c',shortPy]).toString().trim()!=='REFUSED')iss.push('tool accepts short code');
if(/LOVEH|code_hash/.test(fs.readFileSync(R+'/tools/encrypt_love.py','utf8')))iss.push('tool still checks a hash');
const built=fs.readFileSync(R+'/.build/index.html','utf8');
if(!built.includes('var LOVEENC=null;')&&!/var LOVEENC=\{/.test(built))iss.push('no LOVEENC in build');
for(const f of ['app.js','index.html','.build/index.html'])if(fs.readFileSync(R+'/'+f,'utf8').includes('ZQX test note'))iss.push('plaintext shipped in '+f);
if(cp.execSync('git ls-files',{cwd:R}).toString().split('\n').some(x=>/love\.txt$/.test(x)))iss.push('love.txt tracked');
const html=built.replace(/var LOVEENC=(null|\{[^;]*\});/,'var LOVEENC='+enc+';');fs.writeFileSync(R+'/.build/t20.html',html);
const url='file://'+R+'/.build/t20.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
await require('./netguard')(p,errs);await p.goto(url);
const base={onb:true,seenFocus:true,seenFav:true,loc:"g",profile:{pull:5,dips:8,push:15,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},logs:[{d:"2026-11-10",id:"KA",rpe:7}]};
const set=async st=>{await p.evaluate(x=>{localStorage.clear();localStorage.setItem('kz_app_v3',x);},JSON.stringify(st));await p.reload();};
// crypto round trip in app logic
const r=await p.evaluate(async([enc,CODE,BAD])=>{const L=window.__kz.love,E=JSON.parse(enc);const k=await L.derive(CODE,E),kb=await L.derive(BAD,E);const T=Object.assign({},E,{vct:E.ct});return {ok:await L.open(k,E),bad:await L.open(kb,E),tamp:await L.open(k,T),v1:await L.open(k,Object.assign({},E,{v:1})),k2:await L.derive(' '+CODE+' ',E)===k};},[enc,CODE,BAD]);
if(JSON.stringify(r.ok)!==JSON.stringify(MSGS))iss.push('roundtrip '+JSON.stringify(r.ok));
if(r.bad!==null)iss.push('wrong code gave text');if(r.tamp!==null)iss.push('broken verifier accepted');if(r.v1!==null)iss.push('old v1 file accepted');if(!r.k2)iss.push('trim mismatch');
// daily pick: stable, full cycle without repeats, no repeat across cycle edges
const pk=await p.evaluate(()=>{const P=window.__kz.love.pick,o={stable:true,cyc:true,edge:true};
  for(const n of [1,2,5,30,31]){for(let d=20000;d<20000+n*6;d++){if(P(n,d)!==P(n,d))o.stable=false;if(d>0&&n>1&&P(n,d)===P(n,d-1))o.edge=false;}
    for(let c=600;c<606;c++){const s=new Set();for(let i=0;i<n;i++)s.add(P(n,c*n+i));if(s.size!==n)o.cyc=false;}}return o;});
Object.keys(pk).forEach(k=>{if(!pk[k])iss.push('pick '+k);});
// no love theme -> no card
await set(Object.assign({},base,{theme:"templar"}));if(await p.$('.lovecard'))iss.push('card outside love theme');
// love chosen, no key on this phone yet -> code field, wrong code, right code
await set(Object.assign({},base,{theme:"love"}));
if(!await p.$('#love_code'))iss.push('no code field');
let txt=await p.evaluate(()=>document.body.innerText);if(/ZQX/.test(txt))iss.push('note visible without key');
await p.fill('#love_code',BAD);await p.click('[data-a=lovekey]');await p.waitForSelector('.lovecard .warn',{timeout:20000}).catch(()=>iss.push('no wrong-code msg'));
await p.fill('#love_code',CODE);await p.click('[data-a=lovekey]');await p.waitForFunction(()=>/ZQX/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('no note after code'));
const shown=await p.$$eval('.lovecard p',x=>x.map(e=>e.textContent));if(shown.length!==1||!MSGS.includes(shown[0]))iss.push('not exactly one note '+shown);
const exp=await p.evaluate(n=>{const L=window.__kz.love;return L.pick(n,L.day());},MSGS.length);if(shown[0]!==MSGS[exp])iss.push('wrong daily note');
await p.screenshot({path:'/tmp/love.png'});
// restart: key persisted, note shows without code; key not in state or backup
await p.reload();await p.waitForFunction(()=>/ZQX/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('no note after restart'));
if(await p.$('#love_code'))iss.push('code asked again after restart');
const kk=await p.evaluate(()=>{const k=localStorage.getItem(window.__kz.love.KK);return {k,st:localStorage.getItem('kz_app_v3').includes(k.split(':').pop())};});
if(!kk.k)iss.push('key not stored');if(kk.st)iss.push('key inside app state/backup');
// old backup restore stays valid and keeps the note
const old=JSON.stringify(Object.assign({},base,{theme:"love",loveOK:true,logs:[{d:"2026-10-01",id:"KB",rpe:6},{d:"2026-10-03",id:"MO"}]}));
const ok=await p.evaluate(t=>{const K=window.__kz;return K.restore(t,"start");},old);
if(ok!==true)iss.push('old backup restore '+ok);
await p.waitForFunction(()=>/ZQX/.test(document.body.innerText),null,{timeout:20000}).catch(()=>iss.push('note gone after restore'));
// unlock via the theme gate also stores the key (fresh user)
await set(Object.assign({},base,{theme:"templar"}));const gate=await p.evaluate(async([enc,CODE])=>{const L=window.__kz.love;return await L.unlock(CODE,false);},[enc,CODE]);
if(!gate)iss.push('unlock() failed');if(await p.evaluate(()=>window.__kz.love.unlock('too short'))!==false)iss.push('app accepts short code');if(!await p.evaluate(()=>!!localStorage.getItem(window.__kz.love.KK)))iss.push('unlock did not store key');
fs.unlinkSync(R+'/.build/t20.html');
iss.push(...errs.map(e=>"pageerror: "+e));console.log("=== AUFFÄLLIGKEITEN ("+iss.length+") ===");iss.forEach(x=>console.log(" - "+x));await b.close();})();
