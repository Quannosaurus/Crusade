// @name bar-alone
// A-077: "only Bar" means training with the bar alone – the bar is the total, in a training session and in Own workout alike.
// a) training: bar only 15 → 15 kg stored; added only 40 → default bar 20 + 40 = 60; both 15 + 45 = 60; no input → the target total.
// b) Own workout: bar only 15 (Added cleared) logs 15 kg and remembers the bar; both fields empty: the form shows the default bar again, so that bar is logged.
// c) the Added placeholder follows the bar: target − typed bar when rendered and right after the bar changes, never below 0.
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';const BAR='Barbell deadlift';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[BAR],never:[],kickDays:[],focus:'bal',emph:'balanced'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
function favItem(k){for(const id of ['KA','KB','KC']){const s=k.S(id,k.ctx(TD));let r=null;s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(!r&&b.fav&&!it.gone&&v>=0&&it.opts[v].n===BAR)r={it,b,v,sid:id,id:id+'-'+(b.bi!=null?b.bi:bi)+'-'+ii};}));if(r)return r;}return null;}
function train(html,inp){const z=boot(html),{k,D}=z;const x=favItem(k);if(!x)return {err:'no Barbell deadlift favourite'};const key=x.it.k+'#'+x.v;
  D.ex[key]={r:6,w:60,d:'2026-11-16',hold:false,n:BAR,s:[6,6,6]};const dy=k.day();dy.pick=x.sid;const n=k.setsOf(x.it,x.b,k.ctx(TD),x.sid);
  dy.inp[x.id]=Object.assign({s:Array(n).fill('6')},inp);dy.done[x.id]=1;dy.fin={rpe:6};k.saveTrain();return {w:D.ex[key].w,bar:D.bar&&D.bar[BAR],z,x};}
function ow(html,bar,add){const z=boot(html),{k,d,D}=z;D.tab='verlauf';k.render();btn(d,'owopen').click();btn(d,'owpick').click();btn(d,'owx',b=>b.dataset.n===BAR).click();
  const bi=d.querySelector('[data-owbar][data-owi="0"]'),ai=d.querySelector('[data-owadd][data-owi="0"]');if(!bi||!ai)return {err:'no bar/added fields'};
  bi.value=bar;ai.value=add;d.querySelectorAll('[data-owi="0"][data-ows]').forEach(e=>{e.value='5';});d.getElementById('ow_d').value=TD;btn(d,'owrpe',b=>+b.dataset.v===6).click();btn(d,'owsave').click();
  const l=D.logs.filter(q=>q.id==='OW').pop();const v=l&&l.ex&&Object.values(l.ex)[0];return {w:v?v[1]:null,bar:D.bar&&D.bar[BAR]};}
function run(html){const bad=[];
  // a
  {let r=train(html,{bar:'15'});if(r.err)return ['a: '+r.err];if(r.w!==15||r.bar!==15)bad.push('a: bar only stored '+r.w+' / bar '+r.bar+' (expected 15)');
   r=train(html,{add:'40'});if(r.w!==60)bad.push('a: added only stored '+r.w+' (expected 60)');
   r=train(html,{bar:'15',add:'45'});if(r.w!==60)bad.push('a: both stored '+r.w+' (expected 60)');
   r=train(html,{});if(r.w!==60)bad.push('a: no input stored '+r.w+' (expected the target 60)');}
  // b
  {let r=ow(html,'15','');if(r.err)return bad.concat('b: '+r.err);if(r.w!==15||r.bar!==15)bad.push('b: OW bar only logged '+r.w+' / bar '+r.bar+' (expected 15)');
   r=ow(html,'','');if(r.w!==20)bad.push('b: OW both empty logged '+r.w+' (expected the default bar 20 the form shows again)');
   r=ow(html,'20','40');if(r.w!==60)bad.push('b: OW both logged '+r.w+' (expected 60)');}
  // c
  {const z=boot(html),{k,d,D,w}=z;const x=favItem(k);const key=x.it.k+'#'+x.v;D.ex[key]={r:6,w:60,d:'2026-11-16',hold:false,n:BAR,s:[6,6,6]};
   const dy=k.day();dy.pick=x.sid;dy.inp[x.id]={bar:'15'};D.tab='train';k.render();
   let ai=d.querySelector('[data-inp="add"][data-id="'+x.id+'"]');if(!ai)bad.push('c: no Added field');else if(ai.placeholder!=='45')bad.push('c: placeholder with bar 15 is '+ai.placeholder+' (expected 45)');
   const bi=d.querySelector('[data-inp="bar"][data-id="'+x.id+'"]');if(bi){bi.value='25';bi.dispatchEvent(new w.Event('change',{bubbles:true}));ai=d.querySelector('[data-inp="add"][data-id="'+x.id+'"]');
     if(!ai||ai.placeholder!=='35')bad.push('c: placeholder after bar 25 is '+(ai&&ai.placeholder)+' (expected 35)');
     bi.value='80';bi.dispatchEvent(new w.Event('change',{bubbles:true}));ai=d.querySelector('[data-inp="add"][data-id="'+x.id+'"]');if(!ai||ai.placeholder!=='0')bad.push('c: placeholder below 0: '+(ai&&ai.placeholder));}}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','return Math.max(0,(b===null?barW(n):b)+(a===null?0:a));','if(a===null)return null;return Math.max(0,(b===null?barW(n):b)+a);','a'],
  ['b','x.bar=e.value;var t=barTot({bar:e.value,add:ad?ad.value:""},x.n);x.w=t===null?"":String(t);','x.bar=e.value;var b=num(e.value),a=ad?num(ad.value):null;x.w=a===null?"":String(Math.max(0,(b===null?barW(x.n):b)+a));','b'],
  ['c','var bw=barW(o.n),bi=num(inp.bar);if(bi!==null&&bi>=0)bw=bi;','var bw=barW(o.n);','c'],
  ['c2','if(q.inp==="bar"){var ad=','if(0){var ad=','c']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
