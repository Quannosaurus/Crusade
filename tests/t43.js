// @name import-hardening
// A-031: harden import. Every lookup field of cleanImport takes own keys only (prototype names such as constructor,
// __proto__ or toString are dropped, no pollution); a restore is rendered in memory first and the old state stays when
// that fails; a damaged saved state still starts with Backup and Reset reachable (also ?theme=… on a fresh install);
// the replaced state is kept one generation (kz_app_v3_prev) with "Undo restore" for 1 day and a preview line before
// the confirm tap; the old kickDay field migrates like load(); distance/minutes have limits (also saveRun); dates are real
// calendar dates; the run file import has a size limit; the love key stays outside backups; old backups still load.
const {JSDOM}=require('./domguard');const fs=require('fs');
const html=fs.readFileSync(require('path').resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);
function boot(pre,url,extra){const dom=new JSDOM(html,{runScripts:'outside-only',url:url||'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};const errs=[];
  w.addEventListener('error',e=>errs.push(e.message));if(pre)w.localStorage.setItem('kz_app_v3',typeof pre==='string'?pre:JSON.stringify(pre));if(extra)extra(w);
  w.URL.createObjectURL=()=>'blob:x';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  try{w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);}catch(e){errs.push('boot: '+e.message);}
  return {w,k:w.__kz,errs,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)]};}
const TD='2026-11-16';
const BAD=['constructor','__proto__','toString','hasOwnProperty','valueOf','prototype','isPrototypeOf'];
function base(k){const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,start:'2026-10-05',tab:'start'});k.today(TD);return D;}
function logs(n){const a=[];for(let i=0;i<n;i++)a.push({d:'2026-11-'+String(1+i).padStart(2,'0'),id:i%2?'RE':'KA',t:i%2?'Easy run':'Strength A',rpe:6,km:i%2?5:undefined,min:i%2?30:75});return a.map(l=>JSON.parse(JSON.stringify(l)));}
const polluted=w=>({}).polluted!==undefined||({}).x!==undefined||w.eval('({}).polluted')!==undefined;
(async()=>{
// 1 prototype names in every whitelist field
{const x=boot();x.k.today(TD);const ci=x.k.cleanImport;const WOP=x.w.eval('Object.prototype');const own=(o,q)=>Object.prototype.hasOwnProperty.call(o,q);
 BAD.forEach(nm=>{
  const raw='{"profile":{},"start":"2026-10-01","logs":[{"d":"2026-11-10","id":"KA","t":"A","m":["'+nm+'"],"ex":{"'+nm+'":[5,0],"p_pull#0":[8,0]},"tv":{"'+nm+'":9,"pull":8}}],'+
   '"theme":"'+nm+'","startP":"'+nm+'","emph":"'+nm+'","focus":"'+nm+'","loc":"'+nm+'","mlen":"'+nm+'",'+
   '"days":{"2026-11-15":{"run":"'+nm+'","pick":"'+nm+'","done":{"'+nm+'":1,"KA-1-0":1},"skip":{"'+nm+'":1},"open":{"'+nm+'":1},"inp":{"'+nm+'":{"s":["5"]},"KA-1-0":{"s":["8"]}}}},'+
   '"ex":{"'+nm+'":{"r":1},"p_pull#0":{"r":8,"w":0,"d":"2026-11-10","n":"Pull-ups"}},"pr":{"'+nm+'":{"sc":1},"run:long":{"km":9,"d":"2026-11-10"}},'+
   '"kitD":{"'+nm+'":"2026-11-10","c_sq":"2026-11-10"},"vr":{"'+nm+'":1,"g|a_row":1},"pain":{"'+nm+'":true,"k":true},'+
   '"goal":{"k":"'+nm+'","v":5},"goalsDone":[{"k":"'+nm+'","v":1,"d":"2026-11-01"}],"skills":{"'+nm+'":true},"home":{"'+nm+'":true},"opt":{"'+nm+'":true},'+
   '"kit":["'+nm+'"],"kickDays":["'+nm+'",1]}';
  let b;try{b=ci(JSON.parse(raw));}catch(e){issue(nm+': cleanImport throws '+e.message);return;}
  const l=b.logs[0]||{};
  if(b.theme!=='templar')issue(nm+': theme taken');if(b.startP!=='s1')issue(nm+': startP taken');if(b.emph!==undefined)issue(nm+': emph taken');
  if(b.focus!=='bal'||b.loc!=='g'||b.mlen!=='n')issue(nm+': focus/loc/mlen taken');
  const dd=b.days['2026-11-15']||{};if(dd.run!==null)issue(nm+': days.run taken');if(dd.pick!==null)issue(nm+': days.pick taken');
  ['done','skip','open','inp'].forEach(f=>{if(dd[f]&&own(dd[f],nm))issue(nm+': days.'+f+' key kept');if(dd[f]&&Object.getPrototypeOf(dd[f])!==WOP)issue(nm+': days.'+f+' prototype changed');});
  if(!dd.done||!dd.done['KA-1-0']||!dd.inp['KA-1-0'])issue(nm+': real day keys lost');
  if((l.m||[]).length)issue(nm+': logs.m taken');if(l.ex&&own(l.ex,nm))issue(nm+': log ex key kept');if(!l.ex||!l.ex['p_pull#0'])issue(nm+': real log ex lost');
  if(l.tv&&own(l.tv,nm))issue(nm+': log tv key kept');if(!l.tv||l.tv.pull!==8)issue(nm+': real tv lost');
  [['ex',b.ex,'p_pull#0'],['pr',b.pr,'run:long'],['kitD',b.kitD,'c_sq'],['vr',b.vr,'g|a_row'],['pain',b.pain,'k']].forEach(([f,o,real])=>{
    if(!o){issue(nm+': '+f+' missing');return;}if(own(o,nm))issue(nm+': '+f+' key kept');if(Object.getPrototypeOf(o)!==WOP)issue(nm+': '+f+' prototype changed');if(!o[real])issue(nm+': real '+f+' key lost');});
  if(b.goal!==null)issue(nm+': goal taken');if(b.goalsDone.length)issue(nm+': goalsDone taken');
  ['skills','home','opt'].forEach(f=>{if(own(b[f],nm))issue(nm+': '+f+' key kept');});
  if((b.kit||[]).length)issue(nm+': kit taken');if(b.kickDays.join()!=='1')issue(nm+': kickDays '+JSON.stringify(b.kickDays));
  if(Object.getPrototypeOf(b)!==WOP)issue(nm+': state prototype changed');
 });
 if(polluted(x.w))issue('prototype polluted');
 // the restored state renders with the default theme
 const D=base(x.k);x.k.setD(Object.assign(ci(JSON.parse('{"profile":{},"logs":[],"theme":"constructor","onb":true}')),{tab:'mehr'}));x.k.render();
 if(x.$('body').getAttribute('data-theme')!=='templar')issue('restored proto theme not templar');if(x.errs.length)issue('JS errors (1): '+x.errs.join('; '));}

// 1b A-034: the remaining whitelist fields (profile, fav, honSeen, never, favAsk, favQ, favP, seenFav, onb, runKm/runI,
// logs.sk/rd, days.add/ready/fin, pause, pauseH, easy/easyP, bkDate, goal.s0 and the other goal fields, top-level
// prototype keys) refuse prototype names without pollution, and the restored state renders on every tab.
{const x=boot();x.k.today(TD);const ci=x.k.cleanImport;const WOP=x.w.eval('Object.prototype');const own=(o,q)=>Object.prototype.hasOwnProperty.call(o,q);
 BAD.forEach(nm=>{const J=JSON.stringify(nm);
  const raw='{"__proto__":{"polluted":1},"constructor":{"prototype":{"x":1}},"profile":{'+J+':5,"pull":7},"start":"2026-10-01",'+
   '"fav":['+J+',"Pull-ups"],"honSeen":['+J+',"first"],"never":['+J+',"Burpees"],"favAsk":['+J+',"Dips"],"favQ":['+J+',"Dips"],'+
   '"favP":'+J+',"seenFav":'+J+',"onb":'+J+',"runKm":'+J+',"runI":'+J+',"bkDate":'+J+',"easy":'+J+',"easyP":'+J+',"abs":'+J+','+
   '"logs":[{"d":"2026-11-10","id":"KA","t":"A","sk":['+J+',"hs"],"rd":'+J+',"vs":{'+J+':5,"pull":4}}],'+
   '"days":{"2026-11-15":{"add":['+J+',"Hip thrust"],"ready":'+J+',"fin":{'+J+':1,"rpe":5,"oan":"Hike"}}},'+
   '"pause":{"from":"2026-11-01","to":'+J+',"why":'+J+'},"pauseH":[{"f":'+J+',"t":'+J+'},{"f":"2026-10-01","t":"2026-10-05"}],'+
   '"goal":{"k":"pull","v":12,"b":5,"s":"2026-10-01","s0":'+J+','+J+':1,"h":[['+J+',1],["2026-10-02",6]],"pm":'+J+',"pz":'+J+',"lp":'+J+',"cw":'+J+',"ck":'+J+'}}';
  let b;try{b=ci(JSON.parse(raw));}catch(e){issue('1b '+nm+': cleanImport throws '+e.message);return;}
  if(Object.getPrototypeOf(b)!==WOP)issue('1b '+nm+': state prototype changed');if(own(b,'polluted')||b.x!==undefined)issue('1b '+nm+': top-level prototype key taken');
  if(own(b.profile,nm)||Object.getPrototypeOf(b.profile)!==WOP)issue('1b '+nm+': profile key kept');if(b.profile.pull!==7)issue('1b '+nm+': real profile value lost');
  [['fav','Pull-ups'],['honSeen','first'],['never','Burpees'],['favAsk','Dips'],['favQ','Dips']].forEach(([f,real])=>{const a=b[f]||[];if(a.indexOf(nm)>=0)issue('1b '+nm+': '+f+' keeps the prototype name');if(a.indexOf(real)<0)issue('1b '+nm+': real '+f+' entry lost');});
  if(typeof b.favP==='string'||typeof b.seenFav==='string'||b.onb!==false)issue('1b '+nm+': favP/seenFav/onb taken');
  if(b.runKm!==6||b.runI!==4)issue('1b '+nm+': runKm/runI '+b.runKm+'/'+b.runI);
  if(b.bkDate||b.easy||b.easyP)issue('1b '+nm+': bkDate/easy/easyP taken');if(b.abs!==0)issue('1b '+nm+': abs '+b.abs);
  const l=b.logs[0]||{};if((l.sk||[]).join()!=='hs')issue('1b '+nm+': logs.sk '+JSON.stringify(l.sk));if(l.rd!==undefined)issue('1b '+nm+': logs.rd taken');
  if(l.vs&&(own(l.vs,nm)||l.vs.pull!==4))issue('1b '+nm+': logs.vs '+JSON.stringify(l.vs));
  const dd=b.days['2026-11-15']||{};if((dd.add||[]).indexOf(nm)>=0||(dd.add||[]).indexOf('Hip thrust')<0)issue('1b '+nm+': days.add '+JSON.stringify(dd.add));
  if(dd.ready!==undefined)issue('1b '+nm+': days.ready taken');if(!dd.fin||own(dd.fin,nm)||dd.fin.rpe!==5||dd.fin.oan!=='Hike')issue('1b '+nm+': days.fin '+JSON.stringify(dd.fin));
  if(!b.pause||b.pause.to!==''||b.pause.why!=='pause')issue('1b '+nm+': pause '+JSON.stringify(b.pause));
  if(b.pauseH.length!==1||b.pauseH[0].f!=='2026-10-01')issue('1b '+nm+': pauseH '+JSON.stringify(b.pauseH));
  const g=b.goal;if(!g)issue('1b '+nm+': real goal lost');else{if(g.s0!==undefined)issue('1b '+nm+': goal.s0 taken ('+g.s0+')');if(own(g,nm))issue('1b '+nm+': goal key kept');
    if(g.h.length!==1||g.h[0][0]!=='2026-10-02')issue('1b '+nm+': goal.h '+JSON.stringify(g.h));if(g.pm||g.pz||g.lp||g.cw)issue('1b '+nm+': goal pm/pz/lp/cw taken');
    if(Object.getPrototypeOf(g)!==WOP)issue('1b '+nm+': goal prototype changed');}
  const y=boot();y.k.today(TD);y.k.setD(Object.assign(b,{onb:true,seenFocus:true,seenFav:true}));
  ['start','train','run','kick','morgen','verlauf','stand','mehr','favs'].forEach(t=>{y.k.D().tab=t;try{y.k.render();}catch(e){issue('1b '+nm+': render '+t+' throws '+e.message);}});
  if(y.$('#app')&&/rescue|Reset all data/i.test(y.$('#app').className||''))issue('1b '+nm+': rescue page');
  if(polluted(y.w))issue('1b '+nm+': prototype polluted after render');if(y.errs.length)issue('1b '+nm+': JS errors '+y.errs.join('; '));});
 if(polluted(x.w))issue('1b prototype polluted');}

// 2 restore falls back when the new state cannot be rendered
{const x=boot();const D=base(x.k);D.logs=logs(3);D.tab='mehr';x.k.render();x.k.D().tab='mehr';
 const w=x.w;w.localStorage.setItem('kz_app_v3',JSON.stringify(x.k.D()));const saved=w.localStorage.getItem('kz_app_v3');
 const broken=JSON.parse(JSON.stringify(x.k.D()));broken.logs=[null];broken.ex=null;
 x.k.applyState(broken,'start','x',true);
 if(x.k.D().logs.length!==3)issue('fallback: old state not kept ('+x.k.D().logs.length+')');
 if(w.localStorage.getItem('kz_app_v3')!==saved)issue('fallback: storage changed by a failed restore');
 if(w.localStorage.getItem(x.k.PREVK))issue('fallback: prev written by a failed restore');
 if(!/could not be shown/.test(x.$('#app').textContent))issue('fallback: no hint');
 if(!x.$('[data-a=bkfile]'))issue('fallback: page not rendered');
 if(x.errs.length)issue('JS errors (2): '+x.errs.join('; '));}

// 3 damaged saved state starts; Backup and Reset reachable
{const okMore=(x,nm)=>{const D=x.k.D();try{D.tab='mehr';}catch(e){}x.k.render();if(!x.$('[data-a=bkfile]')||!x.$('[data-a=reset]')||!x.$('#bkin'))issue(nm+': Backup/Reset not reachable');
   if(x.errs.length)issue(nm+': JS errors '+x.errs.join('; '));};
 BAD.forEach(nm=>{const s=boot({v:3,onb:true,profile:{pull:5},logs:logs(2),theme:nm,tab:'start',days:{}});
   if(s.$('body').getAttribute('data-theme')!=='templar')issue('stored theme '+nm+': not templar');
   if(!s.$('#nav button'))issue('stored theme '+nm+': normal start page missing');okMore(s,'stored theme '+nm);});
 [['logs null',{v:3,onb:true,profile:{pull:5},logs:[null,{d:'x'}],days:{}}],['kickDays text',{v:3,onb:true,profile:{pull:5},logs:logs(2),kickDays:'x',days:{}}],
  ['ex null',{v:3,onb:true,profile:{pull:5},logs:logs(2),ex:null,pr:5,days:{}}],['goal junk',{v:3,onb:true,profile:{pull:5},logs:logs(2),goal:{k:'constructor'},days:{}}]].forEach(([nm,st])=>okMore(boot(st),nm));
 const raw=boot('{"v":3,"onb":true,"profile":{"pull":5},"logs":[],"theme":"__proto__","days":{"2026-11-16":{"run":"constructor"}}}');okMore(raw,'raw __proto__ theme');
 // reset from the rescue page gives a fresh state
 const r=boot({v:3,onb:true,profile:{pull:5},logs:[null],days:{}});r.$('[data-a=reset]')&&r.$('[data-a=reset]').click();r.$('[data-a=reset]')&&r.$('[data-a=reset]').click();
 if(r.k.D().onb!==false||r.k.D().logs.length!==0)issue('reset from damaged state did not reset');
 BAD.concat(['nosuchtheme']).forEach(nm=>{const f=boot(null,'https://x.test/?theme='+encodeURIComponent(nm));
   if(f.$('body').getAttribute('data-theme')!=='templar')issue('?theme='+nm+': not templar');if(f.k.D().theme!=='templar')issue('?theme='+nm+': stored theme '+f.k.D().theme);
   if(!f.$('#app').textContent.length)issue('?theme='+nm+': nothing rendered');if(f.errs.length)issue('?theme='+nm+': JS errors '+f.errs.join('; '));});
 const g=boot(null,'https://x.test/?theme=sanguine');g.k.D().onb=true;g.k.render();if(g.k.D().theme!=='sanguine')issue('?theme=sanguine no longer works');}

// 4 kz_app_v3_prev, preview line, confirm, undo for 1 day, cancel
{const src=boot();const S=base(src.k);S.logs=logs(5);const bk=src.k.bkJSON();
 const x=boot();const D=base(x.k);D.logs=logs(3);D.tab='mehr';x.k.render();
 x.$('#bk').value=bk;x.$('[data-a=imp]').click();
 if(x.k.D().logs.length!==3)issue('preview: restored before the confirm tap');
 const pv=x.$('.rsq');if(!pv||!/Backup: 5 entries, last 5 Nov/.test(pv.textContent))issue('preview line missing/wrong: '+(pv&&pv.textContent));
 if(pv&&!/3 entries/.test(pv.textContent))issue('preview: current count missing');
 x.$('[data-a=rsno]').click();if(x.k.D().logs.length!==3||x.$('.rsq'))issue('cancel changed data');
 x.$('#bk').value=bk;x.$('[data-a=imp]').click();x.$('[data-a=rsok]').click();
 if(x.k.D().logs.length!==5)issue('confirm did not restore');
 const pr=JSON.parse(x.w.localStorage.getItem('kz_app_v3_prev')||'null');if(!pr||!pr.s||pr.s.logs.length!==3)issue('kz_app_v3_prev not holding the old state');
 if(JSON.parse(x.w.localStorage.getItem('kz_app_v3')).logs.length!==5)issue('restore not saved after success');
 x.k.D().tab='mehr';x.k.render();const ub=x.$('[data-a=rsundo]');if(!ub)issue('Undo restore missing');
 else{ub.click();if(x.k.D().logs.length!==3)issue('undo did not bring the old state back');if(x.w.localStorage.getItem('kz_app_v3_prev'))issue('prev kept after undo (1 generation)');
   if(JSON.parse(x.w.localStorage.getItem('kz_app_v3')).logs.length!==3)issue('undo not saved');x.k.D().tab='mehr';x.k.render();if(x.$('[data-a=rsundo]'))issue('undo still offered');}
 // second restore keeps only one generation
 x.$('#bk').value=bk;x.$('[data-a=imp]').click();x.$('[data-a=rsok]').click();x.$('#bk').value=bk;x.$('[data-a=imp]').click();x.$('[data-a=rsok]').click();
 const p2=JSON.parse(x.w.localStorage.getItem('kz_app_v3_prev'));if(!p2||p2.s.logs.length!==5)issue('prev not the last replaced state');
 // older than 1 day: no undo, removed on start
 const old={at:Date.now()-864e5-1000,s:{profile:{},logs:logs(1)}};
 const y=boot(Object.assign(JSON.parse(x.w.localStorage.getItem('kz_app_v3')),{tab:'mehr'}),null,w=>w.localStorage.setItem('kz_app_v3_prev',JSON.stringify(old)));
 y.k.render();if(y.$('[data-a=rsundo]'))issue('undo offered after 1 day');if(y.w.localStorage.getItem('kz_app_v3_prev'))issue('stale prev not removed');
 // restore into fresh storage stays one step (nothing to replace)
 const z=boot();z.k.today(TD);Object.assign(z.k.D(),{onb:true,tab:'mehr'});z.k.render();z.$('#bk').value=bk;z.$('[data-a=imp]').click();if(z.k.D().logs.length!==5)issue('fresh restore needs a second tap');
 [x,y,z].forEach((q,i)=>{if(q.errs.length)issue('JS errors (4.'+i+'): '+q.errs.join('; '));});}

// 5 N-7: kickDay migration, limits, dates, run file size
{const x=boot();x.k.today(TD);const ci=x.k.cleanImport;
 [[{kickDay:4},'4'],[{kickDay:2},'2,5'],[{kickDay:null},'2,5'],[{kickDay:-1},''],[{kickDay:'x'},''],[{kickDays:[1,1,3],kickDay:4},'1,3'],[{},'']].forEach(([f,want])=>{
   const b=ci(Object.assign({profile:{},logs:[]},f));if(b.kickDays.join()!==want)issue('kickDay '+JSON.stringify(f)+' → '+b.kickDays.join()+' (want '+want+')');});
 const b=ci({profile:{},logs:[{d:'2026-11-10',id:'RE',km:-5,min:-3},{d:'2026-11-11',id:'RE',km:1e6,min:1e9},{d:'2026-11-12',id:'RE',km:'7.5',min:'40'}],pr:{'run:long':{km:-2,d:'2026-11-10'},'run:t5':{min:1e7,d:'2026-11-10'}}});
 const L=b.logs;if(L[0].km!==0||L[0].min!==0)issue('negative km/min kept');if(L[1].km!==300||L[1].min!==1440)issue('km/min not capped: '+L[1].km+'/'+L[1].min);if(L[2].km!==7.5||L[2].min!==40)issue('real km/min changed');
 if(b.pr['run:long'].km!==0||b.pr['run:t5'].min!==1440)issue('record km/min not limited');
 // saveRun limits
 const D=base(x.k);const dy=x.k.D().days[TD]||(x.k.D().days[TD]={done:{},inp:{},skip:{},pick:null,run:'RE',fin:{},noKick:false});
 dy.run='RE';dy.fin={rpe:4,km:'-5',min:'5000'};x.k.saveRun();let l=x.k.D().logs[x.k.D().logs.length-1];if(!l||l.km!==0||l.min!==1440)issue('saveRun limits: '+JSON.stringify(l&&{km:l.km,min:l.min}));
 x.k.today('2026-11-17');const d2=x.k.D().days['2026-11-17']={done:{},inp:{},skip:{},pick:null,run:'RE',fin:{rpe:4,km:'9999',min:'-1'},noKick:false};x.k.saveRun();l=x.k.D().logs[x.k.D().logs.length-1];
 if(!l||l.km!==300||l.min!==0)issue('saveRun cap: '+JSON.stringify(l&&{km:l.km,min:l.min}));if(x.k.D().pr['run:long']&&x.k.D().pr['run:long'].km>300)issue('record over cap');
 x.k.today(TD);
 // dates
 const dd=ci({profile:{},start:'2026-02-30',easy:'2026-13-01',bkDate:'2026-04-31',logs:[{d:'2026-02-29',id:'KA'},{d:'2028-02-29',id:'KA'},{d:'2026-00-10',id:'KA'},{d:'2026-11-10',id:'KA'}],
   goal:{k:'pull',v:10,s:'2026-02-31',d:'2026-06-31',h:[['2026-09-31',3],['2026-10-01',4]]},pause:{from:'2026-11-31',to:''},kitD:{c_sq:'2026-11-31',b_pu:'2026-11-10'},
   ex:{'p_pull#0':{r:8,d:'2026-11-31'}},pr:{'run:long':{km:5,d:'2026-02-30'}},pauseH:[{f:'2026-01-01',t:'2026-01-32'}],
   days:{'2026-11-31':{run:'RE'},'2026-11-15':{run:'RE'}}});
 if(dd.start!==TD)issue('impossible start date kept');if(dd.easy)issue('impossible easy date kept');if(dd.bkDate)issue('impossible bkDate kept');
 if(dd.logs.map(l=>l.d).join()!=='2028-02-29,2026-11-10')issue('log dates: '+dd.logs.map(l=>l.d).join());
 if(!dd.goal||dd.goal.s!==TD||dd.goal.d||dd.goal.h.length!==1)issue('goal dates not checked: '+JSON.stringify(dd.goal));
 if(dd.pause)issue('impossible pause kept');if(dd.pauseH.length)issue('impossible pauseH kept');if(dd.kitD.c_sq||!dd.kitD.b_pu)issue('kitD dates');
 if(dd.ex['p_pull#0'].d!==''||dd.pr['run:long'].d!=='')issue('ex/pr dates');if(dd.days['2026-11-31']||!dd.days['2026-11-15'])issue('day keys');
 if(!x.k.dOK('2028-02-29')||x.k.dOK('2026-02-29')||x.k.dOK('2026-1-01'))issue('dOK');
 // run file size limit
 const D2=x.k.D();D2.tab='run';x.k.day().run='RE';x.k.render();const inp=x.$('#gfile');
 if(!inp)issue('run file input missing');else{let read=0;x.w.FileReader.prototype.readAsText=function(){read++;};
   Object.defineProperty(inp,'files',{value:[{size:21*1024*1024,name:'big.gpx'}],configurable:true});inp.dispatchEvent(new x.w.Event('change',{bubbles:true}));
   if(read)issue('oversized run file read');if(!/too large/.test(x.$('#app').textContent))issue('no size hint for run file');
   Object.defineProperty(inp,'files',{value:[{size:2000,name:'ok.gpx'}],configurable:true});const i2=x.$('#gfile');Object.defineProperty(i2,'files',{value:[{size:2000,name:'ok.gpx'}],configurable:true});i2.dispatchEvent(new x.w.Event('change',{bubbles:true}));if(!read)issue('normal run file not read');}
 if(x.errs.length)issue('JS errors (5): '+x.errs.join('; '));}

// 6 love key outside backups; old backups load
{const x=boot(null,null,w=>w.localStorage.setItem('kz_love_k','2:abc:def'));const D=base(x.k);D.logs=logs(2);
 const bk=x.k.bkJSON();if(/kz_love_k|2:abc:def/.test(bk))issue('love key in backup');
 x.k.D().tab='mehr';x.k.render();x.$('#bk').value=bk;x.$('[data-a=imp]').click();x.$('[data-a=rsok]')&&x.$('[data-a=rsok]').click();
 if(x.w.localStorage.getItem('kz_love_k')!=='2:abc:def')issue('restore touched the love key');
 if(JSON.parse(x.w.localStorage.getItem('kz_app_v3_prev')||'{"s":{}}').s.kz_love_k)issue('love key in prev');
 // old backup (A-006 era): kickDay, abs, no days/bkTs, loveOK, CH logs
 const oldBk=JSON.stringify({v:3,onb:true,start:'2026-03-02',profile:{pull:6,dips:9,push:20},logs:[{d:'2026-03-10',id:'KA',t:'Strength A',rpe:8,abs:1},{d:'2026-03-12',id:'CH',t:'Skill check',rpe:6,tv:{pull:7}},{d:'2026-03-14',id:'RE',t:'Easy run',km:5.2,min:33}],
   ex:{'p_pull#0':{r:8,w:0,d:'2026-03-10',n:'Pull-ups'}},kickDay:3,abs:4,loveOK:true,theme:'templar',focus:'run'});
 const y=boot();y.k.today(TD);Object.assign(y.k.D(),{onb:true,tab:'mehr'});y.k.render();y.$('#bk').value=oldBk;y.$('[data-a=imp]').click();
 const E=y.k.D();if(E.logs.length!==3||E.kickDays.join()!=='3'||E.focus!=='run'||!E.ex['p_pull#0']||E.loveOK)issue('old backup: '+JSON.stringify({n:E.logs.length,k:E.kickDays,f:E.focus,lo:E.loveOK}));
 E.tab='verlauf';y.k.render();E.tab='start';y.k.render();if(!y.$('#nav button'))issue('old backup: no normal page');
 // a current backup with every field still round-trips through the file input
 const src=boot();const S=base(src.k);S.logs=logs(4);S.kickDays=[2,5];S.goal={k:'pull',v:12,b:5,s:'2026-10-01',h:[['2026-11-01',6]],st:0};const f2=src.k.bkJSON();
 const z=boot();z.k.today(TD);Object.assign(z.k.D(),{onb:true,tab:'mehr'});z.k.render();
 await new Promise(res=>{const inp=z.$('#bkin');const f=new z.w.File([f2],'b.json',{type:'application/json'});Object.defineProperty(inp,'files',{value:[f]});inp.dispatchEvent(new z.w.Event('change',{bubbles:true}));setTimeout(res,100);});
 const Z=z.k.D();if(Z.logs.length!==4||Z.kickDays.join()!=='2,5'||!Z.goal||Z.goal.v!==12)issue('file round trip: '+JSON.stringify({n:Z.logs.length,k:Z.kickDays,g:Z.goal}));
 [x,y,z,src].forEach((q,i)=>{if(q.errs.length)issue('JS errors (6.'+i+'): '+q.errs.join('; '));});}

// I-43: prototype names as per-set keys are refused without pollution
{const z=boot();const c=z.k.cleanImport(JSON.parse('{"v":3,"logs":[{"d":"2026-11-10","id":"KA","t":"A","rpe":6,"exs":{"__proto__":[1,2],"constructor":[3],"toString":[4],"p_pull#0":[8]}}]}'));
 const e=c.logs[0].exs||{};if(['__proto__','constructor','toString'].some(q=>Object.prototype.hasOwnProperty.call(e,q))||JSON.stringify(e)!=='{"p_pull#0":[8]}')issue('I-43: prototype keys in exs: '+JSON.stringify(Object.getOwnPropertyNames(e)));
 if(({})[0]!==undefined||[].constructor!==Array)issue('I-43: prototype polluted');}
// A-039: prototype names as exercise keys with a ladder rung are refused
{const z=boot();const c=z.k.cleanImport(JSON.parse('{"v":3,"ex":{"__proto__":{"r":1,"lad":3},"constructor":{"r":1,"lad":2},"p_pull#0":{"r":5,"lad":1}}}'));
 if(Object.getOwnPropertyNames(c.ex).join()!=='p_pull#0'||c.ex['p_pull#0'].lad!==1||({}).lad!==undefined)issue('A-039: prototype ex keys with lad: '+JSON.stringify(Object.getOwnPropertyNames(c.ex)));}
// A-040: prototype names as next-goal keys are refused without pollution
{const z=boot();const c=z.k.cleanImport(JSON.parse('{"v":3,"goalNext":[{"k":"__proto__","v":1},{"k":"constructor","v":2},{"k":"toString","v":3},{"k":"pull","v":12}]}'));
 if(JSON.stringify(c.goalNext)!=='[{"k":"pull","v":12}]'||({}).v!==undefined)issue('A-040: prototype keys in goalNext: '+JSON.stringify(c.goalNext));}
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
})();
