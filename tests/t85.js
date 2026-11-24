// @name run-time-min-sec
// A-079: run times are entered as minutes + seconds and shown as m:ss; the stored value stays decimal minutes (l.min).
// a) after the run: 25 min + 30 s for 5 km → fin.min 25.5, pace "5:06/km", the log keeps min 25.5; a stored decimal time prefills 25 / 30.
// b) edit form: a run of 36.25 min shows 36 / 15; changing the seconds to 45 saves 36.75; minutes alone (old way) still work.
// c) past day: a run with 27 min 12 s logs 27.2; a class with minutes only keeps its duration.
// d) display: the Chronicle shows "27:12" and the pace rounds without "x:60" (5.9995 min/km → 6:00).
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
function boot(html){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,loc:'g',logs:[],start:'2026-09-21',kickDays:[]});k.today(TD);return {w,k,d:w.document,D};}
const set=(z,sel,v)=>{const e=z.d.querySelector(sel);e.value=v;e.dispatchEvent(new z.w.Event('change',{bubbles:true}));};
function run(html){const bad=[];
  {const z=boot(html),{k,d,D}=z;D.tab='run';k.day().run='RE';k.render();
   if(!d.getElementById('f_sec'))return ['a: no seconds field after the run'];
   set(z,'#f_km','5');set(z,'#f_min','25');set(z,'#f_sec','30');
   if(+k.day().fin.min!==25.5)bad.push('a: fin.min '+k.day().fin.min+' (expected 25.5)');
   const tg=[...d.querySelectorAll('.tg')].find(e=>/^Pace /.test(e.textContent));if(!tg||!/5:06\/km/.test(tg.textContent))bad.push('a: pace '+(tg&&tg.textContent));
   k.day().fin.rpe=4;d.querySelector('[data-a=saverun]').click();const l=D.logs[D.logs.length-1];if(!l||l.min!==25.5)bad.push('a: logged min '+(l&&l.min));
   const z2=boot(html);z2.D.tab='run';z2.k.day().run='RE';z2.k.day().fin={km:'10',min:'52.75'};z2.k.render();
   if(z2.d.getElementById('f_min').value!=='52'||z2.d.getElementById('f_sec').value!=='45')bad.push('a: prefill '+z2.d.getElementById('f_min').value+'/'+z2.d.getElementById('f_sec').value+' (expected 52/45)');}
  {const z=boot(html),{k,d,D}=z;D.logs=[{d:'2026-11-10',id:'RE',t:'Easy run',rpe:4,km:6,min:36.25}];D.tab='verlauf';k.render();d.querySelector('[data-a=edit][data-i="0"]').click();
   const em=d.getElementById('e_min'),es=d.getElementById('e_sec');if(!em||!es)bad.push('b: edit form without minutes/seconds');
   else{if(em.value!=='36'||es.value!=='15')bad.push('b: edit prefill '+em.value+'/'+es.value);es.value='45';d.querySelector('[data-a=editsave]').click();if(D.logs[0].min!==36.75)bad.push('b: edit saved '+D.logs[0].min+' (expected 36.75)');
     d.querySelector('[data-a=edit][data-i="0"]').click();d.getElementById('e_min').value='40';d.getElementById('e_sec').value='';d.querySelector('[data-a=editsave]').click();if(D.logs[0].min!==40)bad.push('b: minutes only saved '+D.logs[0].min);}}
  {const z=boot(html),{k,d,D}=z;D.tab='verlauf';k.render();d.querySelector('[data-a=blopen]').click();
   const day=d.querySelector('#bl_d option').value;d.getElementById('bl_d').value=day;d.getElementById('bl_id').value='RE';d.getElementById('bl_rpe').value='4';d.getElementById('bl_km').value='5';
   const bs=d.getElementById('bl_sec');if(!bs)bad.push('c: past day without seconds');else{d.getElementById('bl_min').value='27';bs.value='12';d.querySelector('[data-a=blsave]').click();
     const l=D.logs.find(x=>x.id==='RE');if(!l||l.min!==27.2)bad.push('c: past-day run min '+(l&&l.min)+' (expected 27.2)');
     D.tab='verlauf';k.render();if(!/27:12/.test(d.getElementById('app').textContent))bad.push('d: Chronicle does not show 27:12');}
   d.querySelector('[data-a=blopen]').click();const day2=[...d.querySelectorAll('#bl_d option')].map(o=>o.value).find(v=>!D.logs.some(l=>l.d===v));d.getElementById('bl_d').value=day2;d.getElementById('bl_id').value='KI';d.getElementById('bl_rpe').value='6';d.getElementById('bl_min').value='75';d.querySelector('[data-a=blsave]').click();
   const ki=D.logs.find(x=>x.id==='KI');if(!ki||ki.min!==75)bad.push('c: class minutes '+(ki&&ki.min));}
  {
   const pc=boot(html);pc.D.logs=[{d:'2026-11-10',id:'RE',t:'Easy run',rpe:4,km:2,min:11.999}];pc.D.tab='verlauf';pc.k.render();const tx=pc.d.getElementById('app').textContent;
   if(/:60/.test(tx))bad.push('d: pace or time shows ":60"');if(!/6:00\/km/.test(tx))bad.push('d: 5.9995 min/km not shown as 6:00/km');}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','return Math.round((a+b/60)*1000)/1000;}','return Math.round(a*1000)/1000;}','a'],
  ['b','function msPair(m){var t=Math.round((+m||0)*60);return m>0?[String(Math.floor(t/60)),String(t%60)]:["",""];}','function msPair(m){return m>0?[String(m),""]:["",""];}','a'],
  ['b2','mn=lim(msIn(g("e_min"),g("e_sec")),MINMAX)','mn=lim(g("e_min"),MINMAX)','b'],
  ['c','mn=lim(msIn(g("bl_min"),g("bl_sec")),MINMAX)','mn=lim(g("bl_min"),MINMAX)','c'],
  ['d','function pace(l){return mss(l.min/l.km)+"/km";}','function pace(l){var p=l.min/l.km;return Math.floor(p)+":"+pad(Math.round((p%1)*60))+"/km";}','d']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
