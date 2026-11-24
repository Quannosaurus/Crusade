// @name harder-form
// A-071 "I can do this already": every item with a known ladder offers its next harder form in the ⋯ menu at any time.
// a) the muscle-up skill drill (fixed item) climbs its ladder: Smith transition with feet → band-assisted muscle-up →
//    ring muscle-up with foot assist (harderVar by vkey); the transition negatives (b_neg) climb theirs.
// b) UI: the menu shows "↑ I can do this already · <form>"; the first tap only asks ("Sure? Tap again"), the second takes the
//    form (D.vr, per place) and the item shows it; the top of a ladder offers nothing.
// c) never a form that doubles something in the session (it.swa) and never on warm-up/cool-down, tests or holds.
// d) I-67: bodyweight pull-up and dip forms climb to their weighted form (Pull-ups + hold → Weighted pull-ups, Dips → Weighted dips,
//    Commando → Archer, Wall → Weighted tibialis raises); a weighted top form offers nothing.
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
const DRILL='Transition on a Smith machine, low bar, feet on floor';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[],never:[],kickDays:[],focus:'str',emph:'upper'});
  D.skills={hs:false,mu:true,ls:false,fl:false,pl:false};Object.assign(D.profile,{pull:8,dips:10,push:25,expl:4,mu:0});Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
function find(s,f){let r=null;s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{if(!r&&!it.gone&&f(it,b))r={it,b,key:(b.bi!=null?b.bi:bi)+'-'+ii};}));return r;}
function run(html){const bad=[];
  {const {k}=boot(html);const s=k.S('KA',k.ctx(TD)),x=find(s,it=>it.f&&it.opts[0].n===DRILL);
   if(!x)bad.push('a: no muscle-up skill drill in Muscle-up day');
   else{const seq=[];let v=k.curVar(x.it,'g');seq.push(x.it.opts[v].n);for(let i=0;i<5;i++){const nv=k.harderVar(x.it,v,'g');if(nv<0)break;v=nv;seq.push(x.it.opts[v].n);}
     const want=[DRILL,'Band-assisted muscle-up on a high bar','Ring muscle-up with foot assist'];if(String(seq)!==String(want))bad.push('a: drill ladder '+seq.join(' → '));else rep.push('a: '+seq.join(' → '));}
   const ng=k.P('b_neg',4,8,'reps','',['Transition negatives on a Smith machine, feet assist','5 s negative pull-ups alternating with straight bar dips','Negative Ring-Muscle-Ups|r','Negative pull-ups|k'],'less foot','3');
   if(k.harderVar(ng,0,'g')!==2)bad.push('a: b_neg after the Smith negatives offers '+k.harderVar(ng,0,'g'));if(k.harderVar(ng,2,'g')!==-1)bad.push('a: b_neg top offers more');}
  {const z=boot(html),{k,w,D}=z;D.tab='train';k.day().pick='KA';k.render();const s=k.S('KA',k.ctx(TD)),x=find(s,it=>it.f&&it.opts[0].n===DRILL);
   if(x){const id='KA-'+x.key,q=()=>w.document.querySelector('[data-a="harder"][data-id="'+id+'"]');let b=q();
     if(!b)bad.push('b: no harder-form button for the drill');else{if(!/I can do this already/.test(b.textContent))bad.push('b: label '+b.textContent);b.click();
       const vk='g|f:'+DRILL;if(D.vr[vk]!=null)bad.push('b: first tap already changed the form');b=q();if(!b||!/Sure\? Tap again/.test(b.textContent))bad.push('b: no confirmation step');else{b.click();
         if(D.vr[vk]!==2)bad.push('b: second tap set '+D.vr[vk]);const s2=k.S('KA',k.ctx(TD)),x2=find(s2,it=>it.f&&it.opts[0].n===DRILL);if(!x2||k.curVar(x2.it,'g')!==2)bad.push('b: item does not show the harder form');
         D.vr[vk]=3;k.render();if(q())bad.push('b: top of the ladder still offers a harder form');}}}}
  {const {k}=boot(html);const it=k.P('b_neg',4,8,'reps','',['Transition negatives on a Smith machine, feet assist','5 s negative pull-ups alternating with straight bar dips','Negative Ring-Muscle-Ups|r','Negative pull-ups|k'],'less foot','3');
   it.swa=[0,1];if(k.harderVar(it,0,'g')!==-1)bad.push('c: offers a form Swap refuses (duplicate in the session)');
   const t={test:'pull',unit:'reps',opts:[{n:'Pull-ups',req:'',w:false}]};if(k.harderVar(t,0,'g')!==-1)bad.push('c: a test offers a harder form');
   ['KA','KB','KC'].forEach(id=>{const s=k.S(id,k.ctx(TD));s.blocks.forEach(b=>{if(!(b.warm||b.cool))return;b.items.forEach(it=>{});});});}
  {const z=boot(html),k=z.k,cat=k.favCatalog();[['Pull-ups + hold at the top','Weighted pull-ups'],['Dips','Weighted dips'],['Commando Pull-Ups','Archer Pull-Ups'],['Wall tibialis raises','Weighted tibialis raises'],['Weighted pull-ups','-']].forEach(([n,want])=>{const c=cat[n];if(!c){bad.push('d: '+n+' not in the catalogue');return;}
     const h=k.harderVar(c.it,c.v,'g'),got=h>=0?c.it.opts[h].n:'-';if(got!==want)bad.push('d: '+n+' → '+got+' (expected '+want+')');});}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','"f:Transition on a Smith machine, low bar, feet on floor":[1,0,2,3],','"f:Transition on a Smith machine, low bar, feet on floor":[1,0,3,2],','a'],
  ['b','if(D._hvc!==hk){D._hvc=hk;keepRender();return;}','','b'],
  ['c','return a.indexOf(j)>=0&&(!it.swa||it.swa.indexOf(j)>=0);','return a.indexOf(j)>=0;','c'],
  ['d','var HLAD={c_pu:[3,2,0,1],','var HLAD={c_pu:[3,2,1,0],','d']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
