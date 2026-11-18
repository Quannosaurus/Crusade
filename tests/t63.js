// @name action-names
// A-054: static check of every data-a action name: names written in src/app.js (data-a="…" plus the names set through a
// variable, listed in DYN and checked against the source) and names seen in the rendered DOM of every tab (Captain after 4
// weeks, Templar and Plain, training/run/kickboxing/morning/favourites/other pages) all have a click or change handler, no
// name has both, every handler name is generated, and no name appears with two attribute sets where neither contains the
// other (as data-a="hold" once did for the hold timer and the hold-mode switch). M-6: the JSDOM guard counts a rescue page
// (render() failed) as a runtime error – checked in a child process with a broken state.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path'),cp=require('child_process');
const R=path.resolve(__dirname,'..');const src=fs.readFileSync(R+'/src/app.js','utf8');
const html=fs.readFileSync(R+'/.build/index.html','utf8').replace(/<link[^>]*>/g,'');
const {longSim}=require('./fixtures/longsim.js');const PROF=require('./fixtures/profiles.json');
const P=[];const issue=m=>P.push(m);const rep=[];
// names that src/app.js sets through a variable (data-a="'+act+'" …): written down here, checked as string literals
const DYN={act:['unlock','lovekey'],a:['loc','short','kit'],'(nv?"unnever":"never")':['unnever','never'],'ae.dataset.a':[]};
const ci=src.indexOf('document.addEventListener("click",function(e){'),chi=src.indexOf('document.addEventListener("change",function(e){');
const click=src.slice(ci,src.indexOf('document.addEventListener("input"',ci)),change=src.slice(chi,src.indexOf('\nvar actx=null',chi));
if(ci<0||chi<0)issue('handlers not found');
const set=(b,re)=>new Set([...b.matchAll(re)].map(m=>m[1]));
const C=set(click,/\ba==="([a-z0-9_]+)"/g),H=set(change,/q\.a==="([a-z0-9_]+)"/g),G=set(src,/data-a="([a-z0-9_]+)"/g);
[...src.matchAll(/data-a="'\+([^']{0,80})\+'"/g)].forEach(m=>{const e=m[1];if(!(e in DYN)){issue('data-a set through an unlisted expression: '+e);return;}
  DYN[e].forEach(n=>{if(!src.includes('"'+n+'"'))issue('DYN name '+n+' not in the source');G.add(n);});});
// rendered DOM: names and attribute sets
const sig={};const seen=new Set();
function scan(d,where){d.querySelectorAll('[data-a]').forEach(el=>{const n=el.getAttribute('data-a');seen.add(n);const k=[...el.attributes].map(a=>a.name).filter(a=>/^data-/.test(a)&&a!=='data-a').sort().join(',');
  const s=sig[n]||(sig[n]={});if(!s[k])s[k]=where+' '+el.tagName.toLowerCase();});}
['templar','plain'].forEach(th=>{const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,d=w.document;
  const p=PROF.find(x=>x.n==='Captain'),D=k.D();Object.assign(D.profile,p.prof||{});D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:'2026-11-16',short:false,fav:(p.fav||[]).slice(),theme:th});k.today('2026-11-16');
  longSim(k,28,'2026-11-16','prog',3);D.opt={ready:true,rest:true,oa:true};k.today('2026-12-15');
  ['start','train','run','kick','morgen','stand','verlauf','mehr','favs','other'].forEach(t=>{D.tab=t;try{k.render();}catch(e){issue(th+' tab '+t+': '+e.message);}scan(d,th+'/'+t);
    d.querySelectorAll('details').forEach(x=>x.open=true);});});
seen.forEach(n=>{if(!G.has(n))issue('rendered data-a "'+n+'" is not written in the source list');});
[...G].forEach(n=>{if(!C.has(n)&&!H.has(n))issue('data-a "'+n+'" has no click or change handler');});
[...C].forEach(n=>{if(H.has(n))issue('data-a "'+n+'" is handled on click and on change');});
[...C,...H].forEach(n=>{if(!G.has(n))issue('handler for "'+n+'" but no element generates it');});
Object.keys(sig).forEach(n=>{const ks=Object.keys(sig[n]).map(k=>k?k.split(','):[]);
  for(let i=0;i<ks.length;i++)for(let j=i+1;j<ks.length;j++){const a=ks[i],b=ks[j];if(!a.every(x=>b.includes(x))&&!b.every(x=>a.includes(x)))
    issue('data-a "'+n+'" with two attribute sets: ['+a+'] ('+sig[n][ks[i].join(',')]+') and ['+b+'] ('+sig[n][ks[j].join(',')]+')');}});
rep.push('names written '+G.size+', rendered '+seen.size+', click handlers '+C.size+', change handlers '+H.size);
// M-6: a broken state makes render() fail; the guard must count the rescue page (child process, it fails on purpose)
{const t=path.join(require('os').tmpdir(),'t63-rescue.js');
  fs.writeFileSync(t,"const {JSDOM}=require("+JSON.stringify(R+'/tests/domguard')+");const fs=require('fs');const html=fs.readFileSync("+JSON.stringify(R+'/.build/index.html')+",'utf8').replace(/<link[^>]*>/g,'');"+
    "const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\\s\\S]*)<\\/script>/)[1]);const k=w.__kz;k.D().logs=[null];k.D().tab='start';k.render();");
  const r=cp.spawnSync(process.execPath,[t],{encoding:'utf8'});fs.unlinkSync(t);
  if(r.status===0||!/rescue page shown/.test(r.stdout))issue('guard did not count the rescue page: exit '+r.status+' '+String(r.stdout).slice(-200));
  else rep.push('guard self-check: rescue page counted as a runtime error');}
console.log('--- t63 action-names ---');rep.forEach(x=>console.log(x));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
