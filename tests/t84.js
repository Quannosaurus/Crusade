// @name text-and-theme-fixes
// A-078: findings of the review A-076.
// a) "How?" explains "N × M" only for sets × reps: not for breaths, "a/b/c s" sequences or arrow sequences; "1 × 5" says "1 set of 5 reps".
// b) a stored state or a backup without a valid theme keeps templar; only a new install (fresh()) starts in Plain.
// c) the Bar/Added pair sits on its own row (div.barp) in training and in Own workout, so the set boxes do not break around it.
// d) the six gym catalogue forms of A-069 appear in no generated session (gym and home, 60 days).
// One mutation per point must turn it red.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');const sim=require('./fixtures/sim.js');
const HTML0=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];const TD='2026-11-23';const BAR='Barbell deadlift';
const NEW=['Smith machine incline press','Machine chest fly','Barbell deadlift','Hack squat','Leg extension','Diagonal jackknife'];
function boot(html,ls){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  if(ls)w.localStorage.setItem('kz_app_v3',ls);w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);const k=w.__kz,D=k.D();
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',never:[],kickDays:[2],focus:'bal',emph:'balanced'});
  Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return {w,k,d:w.document,D};}
const btn=(d,a,f)=>[...d.querySelectorAll('[data-a="'+a+'"]')].find(f||(()=>true));
function run(html,quick){const bad=[];
  {const z=boot(html),k=z.k;
   [['5 × 3 breaths',''],['1 × 10/10/10 s',''],['1 × 5/5/5 → 30/30/30 s',''],['3 × 20 s',''],['2 × 5 min','']].forEach(([t,want])=>{const n=k.termNote(t);if(/sets? of/.test(n))bad.push('a: "'+t+'" explained as sets × reps: '+n);});
   const one=k.termNote('1 × 5 easier');if(!/1 set of 5 reps/.test(one))bad.push('a: "1 × 5" → '+one);
   const r=k.termNote('3 × 8–12');if(!/3 sets of 8 to 12 reps/.test(r))bad.push('a: "3 × 8–12" → '+r);}
  {const z=boot(html);const st=JSON.parse(JSON.stringify(z.D));delete st.theme;st.logs=[{d:'2026-11-01',id:'KA',t:'Pull & push',rpe:6}];
   const z2=boot(html,JSON.stringify(st));if(z2.k.D().theme!=='templar')bad.push('b: stored state without theme → '+z2.k.D().theme);
   const bk=JSON.parse(z.k.bkJSON());delete bk.theme;const p=z.k.parseBk(JSON.stringify(bk));if(!p||p.theme!=='templar')bad.push('b: backup without theme → '+(p&&p.theme));
   bk.theme='nope';const p2=z.k.parseBk(JSON.stringify(bk));if(!p2||p2.theme!=='templar')bad.push('b: backup with unknown theme → '+(p2&&p2.theme));
   bk.theme='sang';const p3=z.k.parseBk(JSON.stringify(bk));if(p3&&z.k.THEMES.sang&&p3.theme!=='sang')bad.push('b: valid theme not kept');
   const f=boot(html);if(f.k.D().theme!=='plain')bad.push('b: new install starts in '+f.k.D().theme);}
  {const z=boot(html),{k,d,D}=z;D.fav=[BAR];let x=null;for(const id of ['KA','KB','KC']){const s=k.S(id,k.ctx(TD));s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,'g');if(!x&&b.fav&&!it.gone&&v>=0&&it.opts[v].n===BAR)x={id,iid:id+'-'+(b.bi!=null?b.bi:bi)+'-'+ii};}));if(x)break;}
   if(!x)bad.push('c: no Barbell deadlift favourite');else{D.tab='train';k.day().pick=x.id;k.render();const bi=d.querySelector('[data-inp="bar"][data-id="'+x.iid+'"]');
     if(!bi||!bi.closest('.barp')||!bi.closest('.barp').querySelector('[data-inp="add"]'))bad.push('c: training Bar/Added not in one .barp row');}
   D.tab='verlauf';k.render();btn(d,'owopen').click();btn(d,'owpick').click();btn(d,'owx',b=>b.dataset.n===BAR).click();const ob=d.querySelector('[data-owbar]');
   if(!ob||!ob.closest('.barp')||!ob.closest('.barp').querySelector('[data-owadd]'))bad.push('c: Own workout Bar/Added not in one .barp row');}
  if(!quick){const seen=new Set();for(const loc of ['g','h']){const z=boot(html);z.D.loc=loc;z.D.fav=[];z.D.logs=[];z.D.ex={};z.D.start='2026-08-01';
     sim.sim(z.k,60,'2026-08-01',row=>{if(!row.s)return;row.s.blocks.forEach(b=>b.items.forEach(it=>{const v=z.k.curVar(it,z.k.LOC());if(v>=0&&NEW.indexOf(it.opts[v].n)>=0)seen.add(it.opts[v].n+' ('+loc+' '+row.d+')');}));});}
   if(seen.size)bad.push('d: catalogue form in a generated session: '+[...seen].slice(0,3).join(', '));}
  return bad;}
run(HTML0).forEach(issue);
const MUT=[['a','(?! breaths?\\b)(?! ?→)',''.toString(),'a',true],['a2','(m[1]==="1"?" set of ":" sets of ")','" sets of "','a',true],
  ['b','if(own(THEMES,n.theme))b.theme=n.theme;else b.theme="templar";','if(own(THEMES,n.theme))b.theme=n.theme;','b',true],
  ['b2','if(v.theme==null)v.theme="templar";','','b',true],
  ['c','<div class="barp"><label>Bar kg<input type="number" step="0.5" min="0" inputmode="decimal" data-inp="bar"','<div><label>Bar kg<input type="number" step="0.5" min="0" inputmode="decimal" data-inp="bar"','c',true],
  ['d','["y_hs"','["y_hs","Hack squat"]&&["y_hs"','d',false]];
MUT.forEach(([n,a,b,u,quick])=>{let m;
  if(n==='d'){/* put Hack squat into a base plan: rename the base split-squat form of the leg item */const t='sq",6,10,"reps","",["Dumbbell Bulgarian split squat|g|w"';m=HTML0.split(t).join('sq",6,10,"reps","",["Hack squat|g|w"');}
  else m=HTML0.split(a).join(b);
  if(m===HTML0){issue('mutation '+n+': code not found');return;}
  let r;try{r=run(m,quick);}catch(e){r=['crash '+e.message];}if(!r.some(x=>x.startsWith(u+':')||x.startsWith('crash')))issue('mutation '+n+' stays green');else rep.push('mutation '+n+': red');});
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(m=>console.log(' - '+m));
process.exitCode=P.length?1:0;
