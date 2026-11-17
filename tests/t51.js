// @name longterm-tech
// A-038: long-term technique. Import cap 20,000 entries (was 2000): a backup with 2500 entries keeps all of them; one
// with 20,001 entries shows a hint on the preview card before anything changes (also on an empty state) and keeps the
// newest 20,000 after the confirm tap, nothing is cut silently; the file itself is untouched. Date with year (dLabY)
// once an entry is not in the current year: Chronicle, records, exercise history table, goal archive, pause dates;
// entries of the current year stay without it. cycWk is remembered per day and number of entries and gives the same
// training weeks as the old full scan (also with "Easy week now"); the week preview with 2 years of history needs at
// most twice the time of 12 weeks. Old backups (no vs/vm, old 2000-entry backups) load unchanged.
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);
  return {w,k:w.__kz,$:s=>w.document.querySelector(s),$$:s=>[...w.document.querySelectorAll(s)],click(s){const e=w.document.querySelector(s);if(!e){issue('missing '+s);return;}e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));}};}
const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const TD='2026-11-16';
function logs(n,end,step){const a=[];let d=end;const ids=['KA','RE','KB','MO','KC','RH','KI'];for(let i=0;i<n;i++){const id=ids[i%7];a.unshift({d,id,t:id,rpe:6,km:id[0]==='R'?6:undefined,min:60});if(i%(step||2)===1)d=addD(d,-1);}return a;}
function bk(n,extra){return JSON.stringify(Object.assign({profile:{pull:8},start:'2010-01-04',logs:logs(n,'2026-11-15',3),theme:'templar',focus:'bal',bkTs:Date.parse('2026-11-15T10:00:00Z')},extra||{}));}
function base(x){const D=x.k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,start:'2026-10-05',tab:'mehr'});x.k.today(TD);return D;}
// 1 import cap
{const x=boot();base(x);const txt=bk(2500);if(!x.k.restoreText(txt,'mehr'))issue('2500: restore refused');
 if(x.k.rsp())issue('2500 on an empty state: preview card without a reason');if(x.k.D().logs.length!==2500)issue('2500: kept '+x.k.D().logs.length);}
{const x=boot();base(x);const src=bk(20001);const before=src;if(src.length>x.k.MAXBK)issue('test backup over MAXBK');
 if(!x.k.restoreText(src,'mehr'))issue('20,001: restore refused');const r=x.k.rsp();
 if(!r)issue('20,001 on an empty state: no preview card (would cut silently)');else{
  if(x.k.D().logs.length!==0)issue('20,001: data changed before the confirm tap');x.k.render();const card=x.$('.rscut');
  if(!card)issue('20,001: no cut hint on the preview card');else{const t=card.textContent;if(!/20001 entries/.test(t)||!/20,000/.test(t)||!/oldest 1 entry/.test(t))issue('cut hint text: '+t);}
  x.click('[data-a=rsok]');const L=x.k.D().logs;if(L.length!==20000)issue('20,001: kept '+L.length);
  const want=JSON.parse(src).logs.slice(-20000);if(L[0].d!==want[0].d||L[L.length-1].d!==want[want.length-1].d)issue('20,001: not the newest 20,000 kept');}
 if(src!==before)issue('backup text changed');}
{const x=boot();const D=base(x);D.logs=logs(30,'2026-11-10');x.k.render();x.k.restoreText(bk(20003),'mehr');x.k.render();const c=x.$('.rscut');
 if(!c||!/oldest 3 entries/.test(c.textContent))issue('with existing data: cut hint missing or wrong ('+(c&&c.textContent)+')');
 x.click('[data-a=rsno]');if(x.k.D().logs.length!==30)issue('cancel: data changed');}
{const x=boot();base(x);x.k.restoreText(bk(20000),'mehr');if(x.k.rsp())issue('exactly 20,000 on an empty state: preview card');if(x.k.D().logs.length!==20000)issue('20,000: kept '+x.k.D().logs.length);}
// 2 date with year
{const x=boot();const D=base(x);D.start='2025-01-06';
 D.logs=[{d:'2025-10-03',id:'KA',t:'Strength A',rpe:6,min:70},{d:'2026-11-06',id:'KC',t:'Strength C',rpe:6,min:70},{d:'2026-11-08',id:'RE',t:'Easy run',rpe:6,km:5,min:32},{d:'2026-11-10',id:'KB',t:'Strength B',rpe:6,min:70}];
 D.pr={'a_row#0':{sc:9,r:9,w:0,d:'2025-10-03',n:'Underhand rows'},'b_dip#0':{sc:10,r:10,w:0,d:'2026-11-10',n:'Dips'}};
 D.goalsDone=[{k:'pull',v:10,d:'2025-12-01',r:'f'},{k:'dips',v:12,d:'2026-06-01',r:'e'}];
 const y=x.k.dLabY;if(y('2025-11-16')!=='16 Nov 2025')issue('dLabY last year: '+y('2025-11-16'));if(y('2026-11-10')!=='10 Nov')issue('dLabY this year: '+y('2026-11-10'));if(y('2027-01-03')!=='3 Jan 2027')issue('dLabY next year: '+y('2027-01-03'));
 D.tab='verlauf';x.k.render();let t=x.$('#app').textContent;if(!/3 Oct 2025/.test(t))issue('Chronicle: no year on last year’s entry');if(/10 Nov 2026/.test(t))issue('Chronicle: year on this year’s entry');
 D.tab='stand';x.k.render();t=x.$('#app').textContent;if(/\b3 Oct(?! 2025)/.test(t))issue('Status: last year’s record without the year');
 if(!/3 Oct 2025/.test(t))issue('records: no year on last year’s record');
 D.tab='mehr';x.k.render();const ga=x.$('.garch');if(!ga||!/1 Dec 2025/.test(ga.textContent)||/1 Jun 2026/.test(ga.textContent))issue('goal archive dates: '+(ga&&ga.textContent));
 x.k.today('2027-01-05');D.pause={from:'2026-12-20',to:'2027-01-20',why:'pause'};D.tab='start';x.k.render();t=x.$('#app').textContent;
 if(!/20 Dec 2026/.test(t))issue('pause card: no year on last year’s start date');if(/20 Jan 2027/.test(t))issue('pause card: year on this year’s end date');}
// 3 cycWk: same weeks as the old full scan, remembered per day and number of entries
{const x=boot();const D=base(x);D.start='2024-11-18';D.logs=logs(900,'2026-11-15',2).filter((l,i)=>Math.floor(i/40)%5!==3);
 const old=s=>{const n=Math.floor(Math.max(0,(Date.parse(s)-Date.parse(D.start))/864e5)/7);let wk=0,sh=0;const e=D.easy&&D.easy>=D.start?Math.floor((Date.parse(D.easy)-Date.parse(D.start))/864e5/7):-1;
   for(let w=0;w<=n;w++){const a=addD(D.start,7*w),z=addD(a,6);if(w===n||D.logs.some(l=>l.id!=='MO'&&l.id!=='OA'&&l.d>=a&&l.d<=z))wk++;if(w===e)sh=(6-wk%6)%6;}return {wk,ef:Math.max(1,wk+sh)};};
 let bad=0;for(let i=0;i<730;i+=9){const s=addD('2024-11-18',i);const a=x.k.cycWk(s),b=old(s);if(a.wk!==b.wk||a.ef!==b.ef){bad++;if(bad<3)issue('cycWk '+s+': '+JSON.stringify(a)+' ≠ '+JSON.stringify(b));}}
 D.easy='2026-03-02';for(let i=0;i<730;i+=13){const s=addD('2024-11-18',i);const a=x.k.cycWk(s),b=old(s);if(a.ef!==b.ef){bad++;if(bad<4)issue('cycWk with easy week '+s+': '+a.ef+' ≠ '+b.ef);}}
 D.logs.push({d:'2026-11-16',id:'KA',t:'A',rpe:6});const a=x.k.cycWk('2026-11-20'),b=old('2026-11-20');if(a.wk!==b.wk)issue('cycWk not refreshed after a new entry');}
// 4 week preview time: 2 years of history ≤ 2 × 12 weeks. 12 weeks are simulated (Captain, fixtures/sim.js); the
// 2-year history repeats those entries 8 times back in time (same contents, older dates).
{const {sim}=require('./fixtures/sim.js');const PROF=require('./fixtures/profiles.json');const x=boot(),k=x.k,D=k.D(),p=PROF[0];
 Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
 const S0=addD(TD,-84);Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:S0,short:false,fav:(p.fav||[]).slice()});k.today(S0);sim(k,84,S0);
 const L12=D.logs.slice(),L2y=[];for(let j=7;j>=0;j--)L12.forEach(l=>L2y.push(Object.assign({},l,{d:addD(l.d,-84*j)})));
 const t=(L,st)=>{D.logs=L.slice();D.start=st;k.today(TD);const r=[];for(let j=0;j<7;j++){k.WK.plan=null;k.WK.key='';const a=process.hrtime.bigint();k.weekPlan();r.push(Number(process.hrtime.bigint()-a)/1e6);}return r.sort((a,b)=>a-b)[1];};
 t(L12,S0);const a=[],b=[];for(let i=0;i<5;i++){a.push(t(L12,S0));b.push(t(L2y,addD(S0,-84*7)));}const ra=Math.min(...a),rb=Math.min(...b),rat=rb/ra;
 rep.push('week preview: 12 weeks ('+L12.length+' entries) '+ra.toFixed(1)+' ms, 2 years ('+L2y.length+' entries) '+rb.toFixed(1)+' ms, × '+rat.toFixed(2));if(rat>2)issue('week preview with 2 years needs × '+rat.toFixed(2)+' of 12 weeks (max 2)');}
// 5 old backups
{const x=boot();base(x);const old=JSON.stringify({profile:{pull:6},start:'2025-03-03',logs:logs(2000,'2026-10-30').map(l=>({d:l.d,id:l.id,t:l.t,rpe:l.rpe})),theme:'templar',ex:{'a_row#0':{r:8,w:0,d:'2026-10-28',n:'Underhand rows'}}});
 if(!x.k.restoreText(old,'mehr'))issue('old 2000-entry backup refused');if(x.k.rsp())issue('old 2000-entry backup asks without data');if(x.k.D().logs.length!==2000)issue('old backup: '+x.k.D().logs.length+' entries');
 ['start','train','verlauf','stand','mehr'].forEach(tb=>{x.k.D().tab=tb;try{x.k.render();}catch(e){issue('old backup render '+tb+': '+e.message);}});}
rep.forEach(r=>console.log(r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
