// @name love-finish
// A-020: after a finished workout the unlocked love theme shows exactly one short sentence from the encrypted notes,
// different from today's daily note and fixed per day; locked or other theme: nothing new. No plaintext in sources,
// build or storage. Text contrast in the love theme (WCAG AA), old backup loads. Playwright 390×844 with screenshots.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const R=path.resolve(__dirname,'..');const iss=[];const errs=[];
const CODE='finish line code 2026',MSGS=['QXZ finish note one','QXZ finish note two ♥','QXZ finish note three','QXZ finish note four','QXZ finish note five','QXZ finish note six'];
const py='import sys,json;sys.path.insert(0,'+JSON.stringify(R+'/tools')+');import encrypt_love as e;print(e.encrypt_json(json.loads(sys.argv[1]),sys.argv[2]))';
const enc=cp.execFileSync('python3',['-I','-c',py,JSON.stringify(MSGS),CODE],{cwd:R}).toString().trim();
// no plaintext love text in sources or build (grep on a fixture note)
const scan=['src/app.js','src/head.html','src/pics.js','src/love.enc.json','app.js','app.css','index.html','.build/index.html'];
for(const f of scan){const s=fs.readFileSync(R+'/'+f,'utf8');if(s.includes('QXZ finish note'))iss.push('fixture plaintext in '+f);}
const before=cp.execSync('git diff --name-only HEAD -- src/love.enc.json tools/encrypt_love.py',{cwd:R}).toString().trim();if(before)iss.push('love file or tool changed: '+before);
const built=fs.readFileSync(R+'/.build/index.html','utf8');
fs.writeFileSync(R+'/.build/t29.html',built.replace(/var LOVEENC=(null|\{[^;]*\});/,'var LOVEENC='+enc+';'));
const url='file://'+R+'/.build/t29.html';
function lum(c){const m=c.match(/[\d.]+/g).map(Number);const f=x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);};return 0.2126*f(m[0])+0.7152*f(m[1])+0.0722*f(m[2]);}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
await require('./netguard')(p,errs);await p.goto(url);
// pick logic: always different from the daily note, stable per day
const pk=await p.evaluate(()=>{const k=window.__kz,o={diff:true,stable:true,range:true,one:true};
  for(const n of [2,3,5,6,30,31])for(let d=20000;d<20400;d++){const f=k.loveFinIdx(n,d);if(f===k.love.pick(n,d))o.diff=false;if(f!==k.loveFinIdx(n,d))o.stable=false;if(f<0||f>=n)o.range=false;}
  if(k.loveFinIdx(1,20000)!==-1)o.one=false;return o;});
Object.keys(pk).forEach(x=>{if(!pk[x])iss.push('finish pick: '+x);});
const base={v:3,onb:true,seenFocus:true,seenFav:true,loc:"g",bkTs:Date.now(),bkAt:1,profile:{pull:8,dips:10,push:20,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},logs:[{d:"2026-11-02",id:"KA",t:"Strength A",rpe:6}],days:{}};
const set=async(st,key)=>{await p.evaluate(([x,k])=>{localStorage.clear();localStorage.setItem('kz_app_v3',x);if(k)localStorage.setItem('kz_love_k',k);},[JSON.stringify(st),key||null]);await p.reload();await p.waitForTimeout(120);};
// unlock once to obtain the stored key for this fixture
await set(Object.assign({},base,{theme:"love"}));
const ok=await p.evaluate(c=>window.__kz.love.unlock(c),CODE);if(!ok)iss.push('fixture unlock failed');
const KEY=await p.evaluate(()=>localStorage.getItem('kz_love_k'));
async function finishRun(){await p.evaluate(()=>{const k=window.__kz,D=k.D();D.tab='run';k.day().fin={rpe:6,km:'5',min:'30'};k.render();});
  await p.click('[data-a="saverun"]');await p.waitForTimeout(250);}
// 1) unlocked love theme: one sentence, not the daily note, not stored
await set(Object.assign({},base,{theme:"love"}),KEY);await p.waitForSelector('.lovecard p',{timeout:20000}).catch(()=>iss.push('daily note not shown'));
const daily=(await p.locator('.lovecard p').textContent().catch(()=>'')).trim();
if(await p.locator('.lovefin').count())iss.push('sentence before any workout');
await finishRun();
await p.waitForSelector('.lovefin',{timeout:20000}).catch(()=>{});
const fins=await p.locator('.lovefin').allTextContents();
if(fins.length!==1)iss.push(fins.length+' finish sentences');
else{const t=fins[0].replace('♥','').trim();if(MSGS.indexOf(t)<0)iss.push('sentence not from the notes: '+t);if(t===daily)iss.push('sentence equals the daily note');
  const exp=await p.evaluate(m=>{const k=window.__kz;return m[k.loveFinIdx(m.length,k.love.day())];},MSGS);if(t!==exp)iss.push('sentence not the fixed one for today');}
if(!await p.locator('.toast').count())iss.push('finish toast missing');
const store=await p.evaluate(()=>Object.keys(localStorage).map(k=>localStorage.getItem(k)).join('\n'));if(store.includes('QXZ'))iss.push('plaintext note in localStorage');
await p.screenshot({path:R+'/.build/t29-finish.png'});
// contrast of all visible text in the love theme (start page with sentence, then the training view)
async function contrast(){return p.evaluate(()=>{const out=[];const parse=c=>{const m=c.match(/[\d.]+/g);return m?m.map(Number):null;};
  const bgOf=el=>{for(let e=el;e;e=e.parentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&(c.length<4||c[3]>0.5))return c;}return parse(getComputedStyle(document.body).backgroundColor);};
  document.querySelectorAll('#app *,header *').forEach(el=>{if(!el.childNodes.length)return;const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)return;
    const r=el.getBoundingClientRect(),cs=getComputedStyle(el);if(!r.width||!r.height||cs.visibility==='hidden'||cs.display==='none'||el.closest('[hidden]')||el.disabled||cs.opacity<0.9)return;
    let o=1;for(let e=el;e;e=e.parentElement)o*=+getComputedStyle(e).opacity;if(o<0.9)return;
    out.push({t:el.textContent.trim().slice(0,30),fg:cs.color,bg:'rgb('+bgOf(el).slice(0,3).join(',')+')',big:parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&+cs.fontWeight>=700)});});return out;});}
const L=(await contrast()).map(x=>Object.assign(x,{c:(Math.max(lum(x.fg),lum(x.bg))+0.05)/(Math.min(lum(x.fg),lum(x.bg))+0.05)}));
await p.evaluate(()=>{const k=window.__kz,D=k.D();D.tab='train';k.day().pick='KA';k.render();});await p.waitForTimeout(80);
await p.evaluate(()=>{document.querySelectorAll('details.blk').forEach((d,i)=>{if(i<3)d.open=true;});});
const L2=(await contrast()).map(x=>Object.assign(x,{c:(Math.max(lum(x.fg),lum(x.bg))+0.05)/(Math.min(lum(x.fg),lum(x.bg))+0.05)}));
await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:R+'/.build/t29-train.png'});
const all=L.concat(L2);let min=99,minT='';const pairs={};
all.forEach(x=>{const need=x.big?3:4.5;pairs[x.fg+' on '+x.bg]=Math.round(x.c*100)/100;if(x.c<min){min=x.c;minT=x.t;}if(x.c<need)iss.push('contrast '+x.c.toFixed(2)+' < '+need+': "'+x.t+'" '+x.fg+' on '+x.bg);});
console.log('love theme: '+all.length+' text elements, lowest contrast '+min.toFixed(2)+' ("'+minT+'")');
Object.keys(pairs).sort((a,b)=>pairs[a]-pairs[b]).slice(0,8).forEach(k=>console.log('  '+pairs[k]+'  '+k));
// sentence only once: next render has no sentence
await p.evaluate(()=>{const k=window.__kz;k.D().tab='start';k.render();});if(await p.locator('.lovefin').count())iss.push('sentence shown again on the next render');
// 2) love theme chosen but locked on this phone: nothing new
await set(Object.assign({},base,{theme:"love"}),null);await finishRun();await p.waitForTimeout(150);
if(await p.locator('.lovefin').count())iss.push('sentence with a locked love theme');
// 3) other theme, even with a valid key: nothing new
await set(Object.assign({},base,{theme:"templar"}),KEY);await finishRun();await p.waitForTimeout(300);
if(await p.locator('.lovefin').count())iss.push('sentence outside the love theme');
const txt=await p.evaluate(()=>document.body.innerText);if(/QXZ/.test(txt))iss.push('note text visible outside the love theme');
// 4) old backup (pre A-020) restores and renders in the love theme
await set(Object.assign({},base,{theme:"love"}),KEY);
const oldBk=JSON.stringify({v:3,onb:true,start:'2026-01-05',theme:'love',profile:{pull:8,dips:10,push:20},logs:[{d:'2026-01-06',id:'KA',t:'Strength A',rpe:6}],kickDays:[2]});
const rs=await p.evaluate(t=>{const r=window.__kz.restore(t,'mehr');return r;},oldBk);await p.waitForTimeout(200);
const th=await p.evaluate(()=>window.__kz.D().theme);if(th!=='love')iss.push('old backup: theme '+th);
if(errs.length)iss.push('page errors: '+errs.join('; '));
await b.close();
console.log('=== AUFFÄLLIGKEITEN ('+iss.length+') ===');iss.slice(0,30).forEach(m=>console.log(' - '+m));})();
