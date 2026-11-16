// @name never-suggest-backlog
// A-021 part 3+4. "Never suggest": tapped on a planned exercise it is replaced at once by an equivalent for the same muscle
// group (another variant of the item, or a catalogue exercise via kitGroup with an "Instead of" hint), across the 3 audit
// profiles × Strength A/B/C × gym/home and with Field kit; exclusion beats favourite; an exercise added today stays; the
// list under More brings it back; favourites page toggles it. "Log a past day": training, run or kickboxing up to 14 days
// back; the entry shows in the Chronicle, counts for leg frequency, the pause rule (no step back), recommendations,
// records and XP; validation. Backup round trip with the new fields, junk refused, old backup loads.
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);let checked=0;
function boot(pre){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',JSON.stringify(pre));
  w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const TD='2026-11-16';
const PROF=[
 {n:'Captain',prof:{pull:10,dips:15,push:25,expl:5,mu:0,hsw:30,hsf:0,tuck:30,lsit:10,hang:45,pike:8},emph:'bal',skills:{hs:1,mu:1},fav:['Dumbbell lateral raises']},
 {n:'Partner lower',prof:{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,tuck:5,lsit:0,hang:15,pike:0},emph:'lower',skills:{},fav:[]},
 {n:'Partner glutes',prof:{pull:3,dips:5,push:12,expl:0,mu:0,hsw:0,hsf:0,tuck:10,lsit:0,hang:25,pike:2},emph:'glutes',skills:{},fav:['Barbell hip thrust']}];
function setup(k,p){const D=k.D();Object.assign(D.profile,p.prof);D.emph=p.emph;D.skills={hs:!!p.skills.hs,mu:!!p.skills.mu,ls:false,fl:false,pl:false};
  Object.assign(D,{onb:true,seenFocus:true,seenFav:true,loc:'g',fav:p.fav.slice(),kickDays:[],start:'2026-10-08',never:[]});Object.keys(D.home).forEach(q=>D.home[q]=true);k.today(TD);return D;}
// visible exercises of a session (Limited time aside), with block flags
function vis(k,s,loc){const out=[];s.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>{const v=k.curVar(it,loc);if(v>=0)out.push({b,bi,ii,it,n:it.opts[v].n});}));return out;}
const main=x=>!x.b.warm&&!x.b.cool&&!x.b.add&&!x.it.f&&!x.it.iso&&!x.it.test;
// 1 matrix: exclude the first main exercise → gone, replaced within the same muscle group
PROF.forEach(p=>{const {k,errs}=boot();const D=setup(k,p);
  ['g','h'].forEach(loc=>{D.loc=loc;(loc==='g'?['KA','KB','KC']:['HO']).forEach(id=>{D.never=[];k.day().kit=false;
    const c=k.ctx(TD),s0=k.S(id,c),v0=vis(k,s0,loc).filter(main);if(!v0.length){issue(p.n+' '+id+loc+': no main exercise');return;}
    [0,Math.floor(v0.length/2)].forEach(pos=>{D.never=[];const t=v0[pos],g=k.kitGroup(t.it);D.never=[t.n];
      const s1=k.S(id,k.ctx(TD)),v1=vis(k,s1,loc);checked++;
      if(v1.some(x=>x.n===t.n))issue(p.n+' '+id+loc+': excluded '+t.n+' still planned');
      const rep=s1.blocks[t.bi]&&s1.blocks[t.bi].name===t.b.name?s1.blocks[t.bi].items[t.ii]:null;
      if(!rep||k.curVar(rep,loc)<0)issue(p.n+' '+id+loc+': no alternative for '+t.n);
      else if(k.kitGroup(rep)!==g&&!(rep.opts.length&&t.it.opts.some(o=>o.n===rep.opts[k.curVar(rep,loc)].n)))issue(p.n+' '+id+loc+': '+t.n+' ('+g+') replaced by '+rep.opts[k.curVar(rep,loc)].n+' ('+k.kitGroup(rep)+')');
      // every variant of the item excluded → catalogue/pool equivalent with hint
      D.never=t.it.opts.map(o=>o.n);const s2=k.S(id,k.ctx(TD)),r2=s2.blocks[t.bi]&&s2.blocks[t.bi].items[t.ii];checked++;
      if(vis(k,s2,loc).filter(main).some(x=>D.never.indexOf(x.n)>=0))issue(p.n+' '+id+loc+': a fully excluded item still shows');
      if(!r2||k.curVar(r2,loc)<0||!r2.nx||k.kitGroup(r2)!==g)issue(p.n+' '+id+loc+': fully excluded '+t.n+' not replaced in group '+g+' → '+(r2&&r2.opts[k.curVar(r2,loc)]?r2.opts[k.curVar(r2,loc)].n+' ('+k.kitGroup(r2)+')':'none'));
      if(!(s2.min>0&&s2.min<=90))issue(p.n+' '+id+loc+': estimate '+s2.min+' with exclusions');});
    // with Field kit, nothing breaks
    D.never=[v0[0].n];k.day().kit=true;D.kit=[];const sk=k.S(id,k.ctx(TD));if(vis(k,sk,'m').some(x=>x.n===v0[0].n))issue(p.n+' '+id+': excluded shows under Field kit');k.day().kit=false;});});
  D.never=[];if(errs.length)issue(p.n+': JS errors '+errs.join('; '));});
// 2 UI flow: tap "Never suggest", favourite beaten, addition kept, More list brings it back, favourites page toggle
{const x=boot();const D=setup(x.k,PROF[0]);D.tab='train';x.k.day().pick='KA';x.k.render();
 const btn=x.$$('[data-a=never]')[0];if(!btn){issue('no "Never suggest" on planned exercises');}
 else{const n=btn.dataset.n;btn.click();if(D.never.indexOf(n)<0)issue('tap did not exclude');
   if(x.$$('#app .ex label.n').some(l=>l.textContent.replace('★ ','')===n))issue('excluded still on the training page');
   if(!/will not be suggested again/.test(x.$('#app').textContent))issue('no confirmation after excluding');
   // favourite beaten
   D.fav=[n];x.k.render();if(x.k.S('KA',x.k.ctx(TD)).blocks.some(b=>b.items.some(it=>{const v=x.k.curVar(it,'g');return v>=0&&it.opts[v].n===n&&!it.add;})))issue('favourite beats the exclusion');
   // added today stays
   x.k.day().add=[n];x.k.render();const ab=x.k.S('KA',x.k.ctx(TD)).blocks.find(b=>b.add);if(!ab||x.k.curVar(ab.items[0],'g')<0||ab.items[0].opts[x.k.curVar(ab.items[0],'g')].n!==n)issue('exercise added today dropped by the exclusion');
   if(!/Cable|.+/.test(n)||!(x.$('details[data-blk="KA-80"]')||{textContent:''}).textContent.includes(n))issue('added excluded exercise not shown');
   delete x.k.day().add;D.fav=[];
   // More list
   D.tab='mehr';x.k.render();const un=x.$$('[data-a=unnever]').find(b=>b.dataset.n===n);if(!un)issue('excluded exercise not listed under More');else{un.click();if(D.never.length)issue('bring back did not work');}
   D.tab='train';x.k.render();if(!x.k.S('KA',x.k.ctx(TD)).blocks.some(b=>b.items.some(it=>{const v=x.k.curVar(it,'g');return v>=0&&it.opts[v].n===n;})))issue('brought back exercise not planned again');}
 // replacement hint in the UI
 const s=x.k.S('KA',x.k.ctx(TD)),t=vis(x.k,s,'g').filter(main)[0];D.never=t.it.opts.map(o=>o.n);x.k.render();if(!/Instead of/.test(x.$('#app').textContent))issue('no "Instead of" hint for a replaced exercise');D.never=[];
 // favourites page
 D.tab='favs';x.k.render();const fx=x.$('.fvx[data-a=never]');if(!fx)issue('no never button on the favourites page');else{const fn=fx.dataset.n;fx.click();if(D.never.indexOf(fn)<0)issue('favourites page did not exclude');
   const fx2=x.$$('.fvx').find(b=>b.dataset.n===fn);if(!fx2||fx2.dataset.a!=='unnever')issue('favourites page shows no undo');else{fx2.click();if(D.never.indexOf(fn)>=0)issue('favourites page undo failed');}}
 // week preview key follows the list
 const k0=x.k.weekPlan();D.never=['Pull-ups'];const k1=x.k.weekPlan();if(k0===k1)issue('week preview not refreshed after excluding');D.never=[];
 if(x.errs.length)issue('never UI: JS errors '+x.errs.join('; '));}
// 3 log a past day
{const x=boot();const D=setup(x.k,PROF[1]);D.logs=[{d:addD(TD,-10),id:'KC',t:'Strength C',rpe:6,lg:1},{d:addD(TD,-2),id:'KA',t:'Strength A',rpe:6,lg:1}];
 D.ex={'c_sq#0':{r:8,w:40,d:addD(TD,-20),hold:false,n:'Barbell back squat'}};
 const c0=x.k.ctx(TD),h0=x.k.hist(TD),xp0=x.k.xpTotal();
 const sq=x.k.S('KC',c0).blocks.flatMap(b=>b.items).find(it=>it.k==='c_sq');if(!sq)issue('setup: no squat in Strength C');
 const tg0=sq&&x.k.target(sq,0);if(!tg0||!/days/.test(tg0.note))issue('setup: no step back before the backlog '+(tg0&&tg0.note));
 D.tab='verlauf';x.k.render();x.$('[data-a=blopen]').click();if(!x.$('#blf'))issue('backlog form not shown');
 const days=[...x.$('#bl_d').options].map(o=>o.value);if(days.length!==14||days[0]!==addD(TD,-1)||days.indexOf(TD)>=0||days[13]!==addD(TD,-14))issue('day choice wrong '+days[0]+'…'+days[days.length-1]);
 // validation: no rating
 x.$('#bl_d').value=addD(TD,-3);x.$('#bl_id').value='KC';x.$('[data-a=blsave]').click();if(D.logs.length!==2||!/how hard/i.test(x.$('#app').textContent))issue('saved without a rating');
 x.$('#bl_d').value=addD(TD,-3);x.$('#bl_id').value='KC';x.$('#bl_rpe').value='6';x.$('#bl_note').value='late <b>';x.$('[data-a=blsave]').click();
 const L=D.logs.find(l=>l.d===addD(TD,-3));if(!L)issue('backlog training not logged');else{
   if(L.id!=='KC'||L.bl!==1||L.lg!==1||L.rpe!==6)issue('backlog entry fields '+JSON.stringify(L));
   if(D.logs.indexOf(L)!==1)issue('entry not in date order');
   if(!/Strength C/.test(x.$('#app').textContent)||!/Logged for/.test(x.$('#app').textContent))issue('entry not in the Chronicle / no confirmation');
   if(x.$('#app b')&&/late <b>/.test(x.$('#app').innerHTML))issue('note not escaped');
   const h1=x.k.hist(TD);if(h1.KC!==3)issue('recommendation history: Strength C '+h1.KC+' days');
   if(!(h1.legW>h0.legW))issue('leg frequency did not count it: '+h0.legW+' → '+h1.legW);
   const tg1=x.k.target(sq,0);if(/days/.test(tg1.note||'')||tg1.r<8)issue('pause rule still steps back: '+tg1.note);
   if(D.ex['c_sq#0'].r!==8||D.ex['c_sq#0'].d!==addD(TD,-20))issue('backlog changed stored values');
   if(!(x.k.xpTotal()>xp0))issue('XP did not count the entry');
   const r=x.k.recAll(TD);if(r.id==='KC'&&h1.KC<6)issue('Strength C recommended 3 days after the backlog');}
 // run and kickboxing
 x.$('[data-a=blopen]').click();x.$('#bl_d').value=addD(TD,-5);x.$('#bl_id').value='RE';x.$('#bl_rpe').value='4';x.$('#bl_km').value='14';x.$('#bl_min').value='88';x.$('[data-a=blsave]').click();
 const RL=D.logs.find(l=>l.id==='RE'&&l.d===addD(TD,-5));if(!RL||RL.km!==14||RL.min!==88)issue('backlog run '+JSON.stringify(RL));if(!D.pr['run:long']||D.pr['run:long'].km!==14||D.pr['run:long'].d!==addD(TD,-5))issue('run record not updated');
 x.$('[data-a=blopen]').click();x.$('#bl_d').value=addD(TD,-6);x.$('#bl_id').value='KI';x.$('#bl_rpe').value='8';x.$('[data-a=blsave]').click();if(!D.logs.some(l=>l.id==='KI'&&l.d===addD(TD,-6)))issue('backlog kickboxing not logged');
 // tampered date is refused
 x.$('[data-a=blopen]').click();const o=x.w.document.createElement('option');o.value=addD(TD,-30);x.$('#bl_d').appendChild(o);x.$('#bl_d').value=addD(TD,-30);x.$('#bl_rpe').value='6';const n0=D.logs.length;x.$('[data-a=blsave]').click();if(D.logs.length!==n0)issue('entry older than 14 days accepted');
 // Today link opens the form
 D.tab='start';D._bl=false;x.k.render();const tl=x.$('.big ~ p [data-a=blopen], [data-a=blopen]');if(!tl)issue('no backlog link on Today');else{tl.click();if(D.tab!=='verlauf'||!x.$('#blf'))issue('Today link does not open the form');}
 if(x.errs.length)issue('backlog: JS errors '+x.errs.join('; '));}
// 4 backup round trip, junk, old backup
{const x=boot();const D=setup(x.k,PROF[0]);D.never=['Pull-ups','Barbell hip thrust'];D.logs=[{d:addD(TD,-3),id:'KC',t:'Strength C',rpe:6,lg:1,bl:1,sk:[]}];
 const y=boot();y.k.today(TD);if(!y.k.restore(x.k.bkJSON()))issue('backup rejected');const E=y.k.D();
 if(JSON.stringify(E.never)!==JSON.stringify(D.never)||E.logs[0].bl!==1)issue('round trip lost never/bl '+JSON.stringify({n:E.never,l:E.logs[0]}));
 const j=y.k.cleanImport({profile:{},logs:[{d:TD,id:'KA',t:'x',bl:'yes'}],never:[1,{},'x'.repeat(95),'Pull-ups','Pull-ups']});
 if(JSON.stringify(j.never)!==JSON.stringify(['Pull-ups'])||j.logs[0].bl!==1)issue('never/bl not cleaned '+JSON.stringify({n:j.never,b:j.logs[0].bl}));
 const z=boot();z.k.today(TD);if(!z.k.restore(JSON.stringify({v:3,start:'2026-09-07',onb:true,profile:{pull:4},logs:[{d:'2026-11-09',id:'KC',t:'x'}],vr:{},pain:{},home:{}})))issue('old backup rejected');
 const Z=z.k.D();Z.tab='mehr';z.k.render();Z.tab='train';z.k.render();Z.tab='verlauf';z.k.render();if(Z.never&&Z.never.length)issue('old backup got exclusions');
 [x,y,z].forEach(q=>{if(q.errs.length)issue('backup: JS errors '+q.errs.join('; '));});}
console.log('sessions checked with exclusions: '+checked);if(checked<20)issue('too few sessions checked: '+checked);
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.slice(0,40).forEach(m=>console.log(' - '+m));process.exit(0);
