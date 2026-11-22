// @name own-workout-templates
// A-070: an Own workout can be saved as a template and repeated with one tap.
// a) "Save as template" on save stores {name, exercises in order} in D.owT; without the tick nothing is stored.
// b) the Chronicle shows a chip per template; a tap opens the form with the name and the same exercises in order, each row
//    prefilled from its newest stored value; saving it logs a second OW entry.
// c) the same name replaces its template (no duplicate); "Delete this template" removes it.
// d) backup round trip keeps D.owT; junk in an imported owT (no name, non-strings, prototype names, unknown fields) is dropped.
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[],never:[],kickDays:[]});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
function logOW(z,rows,nm,tpl,day){const {k,d,D}=z;D.tab='verlauf';k.render();btn(d,'owopen').click();
  for(const [n,reps,kg] of rows){btn(d,'owpick').click();const r=btn(d,'owx',b=>b.dataset.n===n);if(!r)return 'no picker row '+n;r.click();
    const i=D._ow.ex.findIndex(x=>x.n===n);d.querySelectorAll('[data-owi="'+i+'"][data-ows]').forEach(e=>{e.value=String(reps);});const w=d.querySelector('[data-owi="'+i+'"][data-oww]');if(w)w.value=String(kg);}
  d.getElementById('ow_d').value=day||TD;d.getElementById('ow_nm').value=nm;d.getElementById('ow_tpl').checked=!!tpl;btn(d,'owrpe',b=>+b.dataset.v===6).click();btn(d,'owsave').click();return '';}
const ROWS=[['Hack squat',10,60],['Barbell deadlift',6,80],['Machine chest fly',12,30]];
function run(html){const bad=[];
  // a
  {const z=boot(html);const e=logOW(z,ROWS,'Gym day 1',false,'2026-11-20');if(e)bad.push('a: '+e);if((z.D.owT||[]).length)bad.push('a: template stored without the tick');}
  const z=boot(html),{k,d,D}=z;{const e=logOW(z,ROWS,'Gym day 1',true,'2026-11-20');if(e)bad.push('a: '+e);
    const T=D.owT||[];if(T.length!==1||T[0].nm!=='Gym day 1'||String(T[0].ex)!==String(ROWS.map(r=>r[0])))bad.push('a: template '+JSON.stringify(T));}
  // b
  {D.tab='verlauf';k.render();const chip=btn(d,'owtpl');if(!chip)bad.push('b: no template chip in the Chronicle');
    else{chip.click();const o=D._ow;if(D.tab!=='own'||!o)bad.push('b: chip did not open the form');
      else{if(o.nm!=='Gym day 1')bad.push('b: name '+o.nm);if(String(o.ex.map(x=>x.n))!==String(ROWS.map(r=>r[0])))bad.push('b: exercises '+o.ex.map(x=>x.n));
        const hs=o.ex.find(x=>x.n==='Hack squat');if(!hs||String(hs.w)!=='60'||hs.s[0]!=='10')bad.push('b: row not prefilled from the newest value '+JSON.stringify(hs));
        d.getElementById('ow_d').value=TD;btn(d,'owrpe',b=>+b.dataset.v===6).click();btn(d,'owsave').click();const n=D.logs.filter(l=>l.id==='OW').length;if(n!==2)bad.push('b: OW entries '+n+' (expected 2)');
        if((D.owT||[]).length!==1)bad.push('b: repeating made '+(D.owT||[]).length+' templates');}}}
  // c
  {const e=logOW(z,[['Leg extension',12,40]],'Gym day 1',true,TD);if(e)bad.push('c: '+e);const T=D.owT||[];if(T.length!==1||String(T[0].ex)!=='Leg extension')bad.push('c: same name did not replace '+JSON.stringify(T));
    logOW(z,[['Hack squat',10,60]],'Gym day 2',true,TD);if((D.owT||[]).length!==2)bad.push('c: second template missing');
    D.tab='verlauf';k.render();btn(d,'owtpl',b=>b.textContent.includes('Gym day 2')).click();const del=btn(d,'owtdel');if(!del)bad.push('c: no delete button');else{del.click();if((D.owT||[]).some(t=>t.nm==='Gym day 2'))bad.push('c: template not deleted');}}
  // d
  {const bk=k.bkJSON();const z2=boot(html);const r=z2.k.parseBk(bk);const st=r&&(r.state||r.s||r);if(!st||!Array.isArray(st.owT)||st.owT.length!==1||st.owT[0].nm!=='Gym day 1')bad.push('d: backup lost owT '+JSON.stringify(st&&st.owT));
    const j=JSON.parse(bk);j.owT=[{nm:'',ex:['Hack squat']},{nm:'Ok',ex:['Hack squat',5,'constructor','Hack squat'],x:1},'bad',{nm:'Empty',ex:[]}];
    const st2=(r2=>r2&&(r2.state||r2.s||r2))(z2.k.parseBk(JSON.stringify(j)));const T=st2&&st2.owT;
    if(!T||T.length!==1||T[0].nm!=='Ok'||String(T[0].ex)!=='Hack squat'||T[0].x!==undefined)bad.push('d: junk not cleaned '+JSON.stringify(T));}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','if(o.tpl){var T=owTpls()','if(0&&o.tpl){var T=owTpls()','a'],
  ['b','tp.ex.forEach(function(n){if(own(ct,n)&&o0.ex.length<OWMAX)o0.ex.push(owRow(n,ct));});','','b'],
  ['c','if(ti>=0)T[ti]=tn;else T.push(tn);','T.push(tn);','c'],
  ['d','if(Array.isArray(n.owT))b.owT=','if(0)b.owT=','d']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
