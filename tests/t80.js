// @name numbers-explained
// A-073: numbers in plain words.
// a) every tempo "a-b-c-d" a training page shows is spelled out right there ("lower 4 s · no pause · lift 2 s · hold 2 s");
//    checked over the rendered training pages of every strength unit, both emphases with tempo work, gym and home.
// b) "How?" explains the short forms: tempo, "3 × 8–12", "each side", "reps in reserve" (TERMS / termNote).
// c) a rendered item with "each side" carries the explanation in its "How?".
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';
function boot(html,o){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',logs:[],ex:{},start:'2026-09-21',fav:[],never:[],kickDays:[2],focus:'bal',emph:'balanced'},o||{});
  D.skills={hs:true,mu:true,ls:true,fl:false,pl:false};Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
function run(html){const bad=[];let tempos=0,eachHow=0;
  if(!/lower 4 s · no pause · lift 2 s · hold 2 s/.test(boot(html).k.tempoTxt('Tempo 4-0-2-2')))bad.push('a: tempoTxt does not spell 4-0-2-2');
  for(const o of [{emph:'glutes'},{emph:'lower'},{emph:'upper'},{emph:'core'},{emph:'glutes',loc:'h'},{emph:'upper',loc:'h'}]){
    for(const id of ['KA','KB','KC','HO','SK','HK']){const z=boot(html,o);z.D.tab='train';z.k.day().pick=id;try{z.k.render();}catch(e){continue;}
      const txt=z.d.getElementById('app').textContent;const re=/\b\d-\d-\d-\d\b/g;let m;
      while((m=re.exec(txt))){const after=txt.slice(m.index+m[0].length,m.index+m[0].length+8);if(after.startsWith(' (lower'))tempos++;else{const ctx=txt.slice(Math.max(0,m.index-40),m.index+30);
        if(!/Tempo a-b-c-d/.test(ctx))bad.push('a: '+id+' '+o.emph+'/'+(o.loc||'g')+': tempo '+m[0]+' not spelled out ("'+ctx.replace(/\s+/g,' ')+'")');}}
      z.d.querySelectorAll('details.how').forEach(h=>{if(/Each side \/ per leg/.test(h.textContent))eachHow++;});}}
  if(!tempos)bad.push('a: no tempo seen on any training page');else rep.push('a: '+tempos+' tempo notes spelled out');
  const k=boot(html).k;if(/sets of/.test(k.termNote('3 × 20 s')))bad.push('b: a hold "3 × 20 s" explained as reps');[['Tempo 4-1-2-1','Tempo a-b-c-d'],['3 × 8–12','3 sets of 8 to 12'],['5 × 1–2','5 sets of 1 to 2'],['2 × 5 reps','2 sets of 5 reps'],['10 each side','Each side'],['1–2 reps in reserve','Reps in reserve']].forEach(([t,w])=>{if(!k.termNote(t).includes(w))bad.push('b: no explanation for "'+t+'"');});
  if(!eachHow)bad.push('c: no rendered "How?" explains "each side"');else rep.push('c: '+eachHow+' items explain "each side" in How?');
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','function tempoTxt(t){return String(t||"").replace(','function tempoTxt(t){return String(t||"");String(t||"").replace(','a'],
  ['b','  [/reps? in reserve/,','  [/^$/,','b'],
  ['c','[/\\beach side\\b|\\bper (?:leg|side|arm)\\b/,','[/^$/,','c']];
MUT.forEach(([n,a,b,u])=>{const m=HTML0.split(a).join(b);if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
