// @name bar-weight
// A-072: bar exercises take the bar and the added plates in two fields; the stored weight stays the total.
// a) training page: a bar exercise (Barbell deadlift as favourite) shows "Bar kg" (default 20, EZ/SZ 10) and "Added kg";
//    a weighted exercise without a bar keeps one kg field.
// b) saving bar 15 + added 40 stores 55 kg (D.ex, record), remembers the bar per exercise (D.bar) and prefills it next time;
//    without input the target total stays the fallback.
// c) Own workout: the same two fields, bar 20 + added 60 → 80 kg.
// d) backup round trip keeps D.bar; junk is dropped.
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';const BAR='Barbell deadlift';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[BAR],never:[],kickDays:[],focus:'bal',emph:'balanced'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
function favItem(k,id){const s=k.S(id,k.ctx(TD));let r=null;s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(!r&&b.fav&&!it.gone&&v>=0&&it.opts[v].n===BAR)r={it,b,v,id:id+'-'+(b.bi!=null?b.bi:bi)+'-'+ii};}));return r;}
function run(html){const bad=[];
  {const z=boot(html),{k,d,D}=z;const id=['KA','KB','KC'].find(u=>favItem(k,u));if(!id)return ['a: Barbell deadlift favourite in no session'];const x=favItem(k,id);
   D.tab='train';k.day().pick=id;k.render();const bi=d.querySelector('[data-inp="bar"][data-id="'+x.id+'"]'),ai=d.querySelector('[data-inp="add"][data-id="'+x.id+'"]');
   if(!bi||!ai)bad.push('a: no bar/added fields');else if(bi.value!=='20')bad.push('a: bar default '+bi.value);
   if(d.querySelector('[data-inp="w"][data-id="'+x.id+'"]'))bad.push('a: bar exercise still has the single kg field');
   const nb=k.favCatalog()['Machine chest fly'];if(nb&&k.barEx(nb.it,nb.v))bad.push('a: machine fly counted as a bar exercise');
   {const cat=k.favCatalog();[['Romanian deadlift',true],['Seated good mornings',true],['Dumbbell B-stance Romanian deadlift',false],['Hip thrust machine',false],['Dumbbell bench press',false]].forEach(([n,want])=>{const c=cat[n];if(c&&k.barEx(c.it,c.v)!==want)bad.push('a: '+n+' bar exercise '+!want+' (expected '+want+')');});}
   if(k.barW('EZ-bar curls')!==10)bad.push('a: EZ bar default '+k.barW('EZ-bar curls'));
   // b
   const dy=k.day(),n=k.setsOf(x.it,x.b,k.ctx(TD),id);dy.inp[x.id]={s:Array(n).fill('6'),bar:'15',add:'40'};dy.done[x.id]=1;dy.fin={rpe:6};k.saveTrain();
   const key=x.it.k+'#'+x.v;if(!D.ex[key]||D.ex[key].w!==55)bad.push('b: stored weight '+JSON.stringify(D.ex[key])+' (expected 55)');
   if(!D.bar||D.bar[BAR]!==15)bad.push('b: bar not remembered '+JSON.stringify(D.bar));
   k.today('2026-11-26');D.tab='train';k.day().pick=id;k.render();const x2=favItem(k,id),b2=x2&&d.querySelector('[data-inp="bar"][data-id="'+x2.id+'"]');if(!b2||b2.value!=='15')bad.push('b: bar not prefilled next time ('+(b2&&b2.value)+')');
   // d
   const bk=k.bkJSON();const z2=boot(html),r=z2.k.parseBk(bk),st=r&&(r.state||r.s||r);if(!st||!st.bar||st.bar[BAR]!==15)bad.push('d: backup lost D.bar');
   const j=JSON.parse(bk);j.bar={'Ok bar':12.3,'constructor':5,'Neg':-1,'Big':500,'Str':'20'};const st2=(q=>q&&(q.state||q.s||q))(z2.k.parseBk(JSON.stringify(j)));
   if(!st2||JSON.stringify(st2.bar)!==JSON.stringify({'Ok bar':12.5}))bad.push('d: junk not cleaned '+JSON.stringify(st2&&st2.bar));}
  {const z=boot(html),{k,d,D}=z;D.tab='verlauf';k.render();btn(d,'owopen').click();btn(d,'owpick').click();btn(d,'owx',b=>b.dataset.n===BAR).click();
   const bi=d.querySelector('[data-owbar][data-owi="0"]'),ai=d.querySelector('[data-owadd][data-owi="0"]');if(!bi||!ai)bad.push('c: no bar/added fields in Own workout');
   else{bi.value='20';ai.value='60';d.querySelectorAll('[data-owi="0"][data-ows]').forEach(e=>{e.value='5';});d.getElementById('ow_d').value=TD;btn(d,'owrpe',b=>+b.dataset.v===6).click();btn(d,'owsave').click();
     const c=k.favCatalog()[BAR],key=c.it.k+'#'+c.v;if(!D.ex[key]||D.ex[key].w!==80)bad.push('c: OW stored '+JSON.stringify(D.ex[key])+' (expected 80)');}}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a2','return BARX.test(n)||(BARN.test(n)&&!NOBAR.test(n));','return BARX.test(n);','a'],['a','var BARX=/barbell|smith|landmine|ez-bar|\\bsz\\b|t-bar|trap bar/i;','var BARX=/^$/;','a'],
  ['b','return Math.max(0,(b===null?barW(n):b)+(a===null?0:a));','return Math.max(0,(a===null?0:a));','b'],
  ['c','x.bar=e.value;var b=num(e.value),a=ad?num(ad.value):null;x.w=a===null?"":String(Math.max(0,(b===null?barW(x.n):b)+a));','x.bar=e.value;x.w=ad?ad.value:"";','c'],
  ['d','if(n.bar&&typeof n.bar==="object"){b.bar={};','if(0){b.bar={};','d']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
