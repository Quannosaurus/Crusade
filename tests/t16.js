// @name emphasis-favs
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(__dirname,'../.build/index.html'));
const r=await p.evaluate(()=>{const K=window.__kz;localStorage.clear();return 1;});
await p.evaluate(()=>{const K=window.__kz;const D=K.D?K.D():null;});
await p.evaluate(()=>{document.querySelector('#welcome,[data-a]');});
await p.evaluate(()=>{const raw=localStorage.getItem('kz_app_v3');});
const st=await p.evaluate(()=>window.__kz.fresh?JSON.stringify(window.__kz.fresh()):null);
const f=st?JSON.parse(st):{profile:{mu:0,pu:5,dips:5,pushups:20,hs:0,lsit:0,km5:30}};Object.assign(f,{onb:true,seenFocus:true,loc:"gym",emph:"lower",fav:["Cable kickbacks","Abductor machine","Donkey kickbacks"],logs:[]});
await p.evaluate(x=>localStorage.setItem('kz_app_v3',x),JSON.stringify(f));
await p.reload();
const out=await p.evaluate(()=>{const K=window.__kz,res={};["KA","KB","KC","HO"].forEach(id=>{try{const s=K.S(id,K.ctx(new Date().toISOString().slice(0,10)));res[id]=s?s.blocks.map(b=>b.name+":"+b.items.map(i=>i.opts[i.def?i.def():0].n.split("|")[0]).join("/")):"noS";}catch(e){res[id]="ERR "+e.message;}});return res;});
console.log(JSON.stringify(out,null,1));
const issues=[];for(const id of ["KA","KB","KC"]){const v=out[id];if(typeof v==="string"){issues.push(id+" "+v);continue;}if(!v.some(x=>x.startsWith("Lower body")))issues.push(id+" no lower block");if(!/kickbacks/.test(v.join()))issues.push(id+" fav missing");if(v.join().split("Abductor machine").length>2)issues.push(id+" fav dup");}
// UI: settings + star toggle
await p.evaluate(()=>{document.querySelector('[data-tab="mehr"]')?.click();});

console.log("errs",errs);console.log("=== AUFFÄLLIGKEITEN ("+(issues.length+errs.length)+") ===",issues);await b.close();})();
