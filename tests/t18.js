// @name emphasis-matrix
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/fonts\.g/,r=>r.abort());
await p.goto('file://'+require('path').resolve(__dirname,'../.build/index.html'));const iss=[];
const base={profile:{pull:5,dips:8,push:15,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0}};
for(const em of ["bal","lower","glutes","upper","core"]) for(const loc of ["g","h"]){
  const f=Object.assign({},base,{onb:true,seenFocus:true,loc,emph:em,fav:["Cable kickbacks","Ab wheel rollouts","Dumbbell curls","Frog pumps","Side plank","Banded hip abduction"],logs:[]});
  await p.evaluate(x=>localStorage.setItem('kz_app_v3',x),JSON.stringify(f));await p.reload();
  const out=await p.evaluate(()=>{const K=window.__kz,res={};["KA","KB","KC","HO"].forEach(id=>{const s=K.S(id,K.ctx(new Date().toISOString().slice(0,10)));res[id]=s.blocks.map(b=>({n:b.name,i:b.items.length,r:b.rounds}));});return res;});
  for(const id of (loc==="g"?["KA","KB","KC"]:["HO"])){const bl=out[id];const names=bl.map(x=>x.n);
    const want={lower:"Lower body focus",glutes:"Glute focus",upper:"Upper body focus",core:"Core focus"}[em];
    if(want&&!names.includes(want))iss.push(em+loc+id+" missing "+want);
    if(!want&&names.some(n=>/focus$/.test(n)&&n!=="Shoulder stability"))iss.push(em+id+" extra block");
    if(!names.includes("★ Your favourites"))iss.push(em+loc+id+" no fav block");
    if(names[names.length-1]!=="Cool-down")iss.push(em+id+" cooldown not last");}
  if(em==="core"&&loc==="g")console.log(JSON.stringify(out.KA.map(x=>x.n)));
}
// UI flow
const f=Object.assign({},base,{onb:true,seenFocus:true,loc:"g",logs:[{d:"2026-11-10",id:"KA",rpe:7}]});
await p.evaluate(x=>localStorage.setItem('kz_app_v3',x),JSON.stringify(f));await p.reload();
let txt=await p.evaluate(()=>document.body.innerText);if(!/New: pick a strength emphasis/.test(txt))iss.push("no start hint");
await p.click('.wbtn[data-tab=favs]');txt=await p.evaluate(()=>document.body.innerText);
if(!/How it works/.test(txt))iss.push("no explanation");
await p.check('[name=f_emph][value=glutes]');
await p.fill('#favq','kick');const vis=await p.$$eval('.fvg .fvrow:not(.hid)',x=>x.map(b=>b.dataset.n));if(!vis.length||vis.some(n=>!/kick/i.test(n)))iss.push("search bad "+vis);
await p.click('.fvg .fvrow:not(.hid) >> nth=0');
let st=await p.evaluate(()=>JSON.parse(localStorage.getItem('kz_app_v3')));if(st.emph!=="glutes")iss.push("emph");if(!(st.fav||[]).length)iss.push("fav not saved");
await p.screenshot({path:'/tmp/favs.png',fullPage:true});
await p.click('.bk');await p.evaluate(()=>document.querySelector('[data-tab=train]').click());
txt=await p.evaluate(()=>document.body.innerText);if(!/favourite in your plan/.test(txt))iss.push("no train card: ");
if(!/Glute focus/.test(txt))iss.push("no glute block in train");
await p.click('.favcard');txt=await p.evaluate(()=>document.body.innerText);if(!/Back to training/.test(txt))iss.push("back label");
await p.click('.bk');txt=await p.evaluate(()=>document.body.innerText);if(!/Log training/.test(txt))iss.push("not back in train");
await p.screenshot({path:'/tmp/train.png'});
// onboarding shows emphasis
await p.evaluate(x=>localStorage.setItem('kz_app_v3',x),JSON.stringify({}));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-a=obnext]');const oe=await p.$$('[name=o_emph]');if(oe.length!==5)iss.push("onb emph "+oe.length);
console.log("errs",errs,"=== AUFFÄLLIGKEITEN ("+(iss.length+errs.length)+") ===",iss);await b.close();})();
