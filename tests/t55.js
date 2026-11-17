// @name blocks
// A-042 (L4): blocks of 6 training weeks (5 work, 1 deload with test) with four accents in turn: base → strength →
// volume → skill & tempo [Q53]. The block comes from the training week (cycWk().ef, no new field), so a running cycle
// carries on (weeks 1–6 = block 1). A kg/rep goal turns the skill block into a strength block, a skill goal the volume block
// into a skill block. Strength: anchor and main exercises in the lower range (weighted), +1 set, longer rests, secondary
// work −1 set. Volume: upper range, band +2 for the emphasis pattern, shorter rests. Skill & tempo: skill blocks in the long
// form, band at its lower edge. Never 60–90 min, warm-up or cool-down; no accent in the deload week. Header and hero name
// the accent in one word per theme (Plain without Warhammer words).
const {JSDOM}=require('./domguard');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const P=[];const issue=m=>P.push(m);const rep=[];
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return {w,k:w.__kz,d:w.document};}
const START='2026-01-05';const addD=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const PROF={pull:8,dips:10,push:20,expl:3,mu:0,hsw:30,hsf:0,pike:8,tuck:15,lsit:5,hang:40};
/* a state in training week `wk` (one strength log in every week before, today = Tuesday of week wk) */
function setup(k,wk,o){o=o||{};const D=k.D();Object.assign(D,{onb:true,seenFocus:true,seenFav:true,favP:true,loc:'g',focus:o.focus||'bal',emph:o.emph||'lower',kickDays:[],logs:[],start:START,short:false,goal:null,fav:[],easy:'',theme:o.theme||'templar'});
  delete D.easy;Object.assign(D.profile,PROF);D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},o.skills||{});D.ex={};
  for(let w=0;w<wk-1;w++)D.logs.push({d:addD(START,w*7+1),id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8,push:8},ex:{'a_row#1':[10,20]}});
  const T=addD(START,(wk-1)*7+1);k.today(T);k.setGoal('none');return {D,T};}
const items=S=>S.blocks.flatMap(b=>b.items.map(it=>({b,it})));
const sets=(k,S,c,id)=>S.blocks.reduce((a,b)=>b.warm||b.cool?a:a+b.items.reduce((x,it)=>it.gone||it.f||it.iso||it.test?x:x+k.setsOf(it,b,c,id),0),0);
// 1 sequence of the accents and the deload week without accent
{const {k}=boot();
  const real=[];for(let wk=1;wk<=27;wk++){setup(k,wk);real.push(k.accOf(k.today()));}
  const map={base:'b',str:'s',vol:'v',skill:'k'};const r=real.map(a=>map[a]).join('');
  if(r!=='bbbbbbssssssvvvvvvkkkkkkbbb')issue('accent order per training week: '+r);
  [6,12,18,24].forEach(wk=>{setup(k,wk);if(k.accNow()!=='base')issue('accent acts in the deload week '+wk+': '+k.accNow());if(k.ctx(k.today()).cyc!==6)issue('week '+wk+' is not the deload week');});
  [7,13,19].forEach(wk=>{setup(k,wk);if(k.accNow()==='base')issue('no accent in week '+wk);});
  setup(k,8);const c=k.ctx(k.today());if(c.blk!==2||c.acc!=='str')issue('ctx block/accent week 8: '+c.blk+'/'+c.acc);
  rep.push('accents per training week '+r+' (b base, s strength, v volume, k skill), deload weeks without accent');}
// 2 a goal co-decides the accent
{const {k}=boot();let {D}=setup(k,20);k.setGoal('sq');if(k.accOf(k.today())!=='str')issue('kg goal: skill block not a strength block: '+k.accOf(k.today()));
  ({D}=setup(k,14));k.setGoal('sq');if(k.accOf(k.today())!=='vol')issue('kg goal changed the volume block');
  ({D}=setup(k,14,{skills:{hs:true}}));k.setGoal('hs');if(k.accOf(k.today())!=='skill')issue('skill goal: volume block not a skill block: '+k.accOf(k.today()));
  ({D}=setup(k,8));k.setGoal('d10');if(k.accOf(k.today())!=='str')issue('run goal changed the strength block');
  rep.push('kg goal: block 4 → strength · skill goal: block 3 → skill · run goal: no change');}
// 3 effects per accent on Strength A/B/C (partner lower), each against the same day designed without accent (same phase,
// same history), floors and fixed blocks unchanged
function sess(k,wk,id,o,base){setup(k,wk,o);let c=k.ctx(k.today());if(base)c=Object.assign({},c,{acc:'base'});const S=k.S(id,c);return {S,c,id,acc:k.accNow()};}
function weighted(k,S){const out={};items(S).forEach(({b,it})=>{if(b.warm||b.cool||it.gone||!it.k)return;const v=k.curVar(it,k.LOC());if(v<0||!k.wOn(it,v))return;out[it.k+(it.anc?'*':'')]=[it.lo,it.hi];});return out;}
{const {k}=boot();const W={str:8,vol:14,skill:20};const res={};
  ['KA','KB','KC'].forEach(id=>{const R={},B={};Object.keys(W).forEach(a=>{const x=sess(k,W[a],id,{emph:'lower'});if(x.acc!==a)issue(id+' week '+W[a]+' accent '+x.acc);R[a]=x;B[a]=sess(k,W[a],id,{emph:'lower'},true);
      [x,B[a]].forEach(y=>{const S=y.S,bl=S.blocks;if(S.min<60||S.min>90)issue(id+' '+a+': '+S.min+' min');if(!bl[0].warm||!bl[bl.length-1].cool)issue(id+' '+a+': warm-up/cool-down not first/last');});});
    const nm=x=>JSON.stringify([x.S.blocks[0].items.map(i=>i.opts[0].n),x.S.blocks[x.S.blocks.length-1].items.map(i=>i.opts[0].n)]);
    Object.keys(W).forEach(a=>{if(nm(R[a])!==nm(B[a]))issue(id+' '+a+': warm-up or cool-down changed by the accent');});
    const cmp=(a,f)=>{const wb=weighted(k,B[a].S),wa=weighted(k,R[a].S);let n=0;Object.keys(wb).forEach(q=>{if(wa[q]&&f(wa[q],wb[q]))n++;});return n;};
    if(!cmp('str',(x,y)=>x[1]<y[1]))issue(id+': strength block keeps no weighted exercise in the lower range');
    if(!cmp('vol',(x,y)=>x[0]>y[0]))issue(id+': volume block raises no weighted lower end');
    if(cmp('str',(x,y)=>x[0]!==y[0])||cmp('vol',(x,y)=>x[1]!==y[1]))issue(id+': range moved past its own ends');
    const rest=x=>x.S.blocks.filter(b=>!b.warm&&!b.cool&&!b.ser&&b.rest&&(b.p||1)===1&&!b.fav&&!b.skill&&!b.hsb).map(b=>b.name+':'+b.rest);
    const mx=x=>Math.max(0,...rest(x).map(r=>+r.split(':')[1]));
    if(!(mx(R.str)>mx(B.str)))issue(id+': strength block without longer rest ('+rest(B.str)+' → '+rest(R.str)+')');
    if(!(mx(R.vol)<mx(B.vol)))issue(id+': volume block without shorter rest ('+rest(B.vol)+' → '+rest(R.vol)+')');
    const ser=x=>x.S.blocks.find(b=>b.ser);if(ser(R.str)&&ser(R.str).ancR!==180)issue(id+': anchor rest in the strength block '+ser(R.str).ancR);if(ser(R.vol)&&ser(R.vol).ancR!==90)issue(id+': anchor rest in the volume block '+ser(R.vol).ancR);
    const st=x=>sets(k,x.S,x.c,id);res[id]='strength '+st(B.str)+'→'+st(R.str)+', volume '+st(B.vol)+'→'+st(R.vol)+', skill '+st(B.skill)+'→'+st(R.skill);
    /* periodisation: the strength block moves volume from secondary work to the main work (total may fall, [Q53]) */
    const sh=x=>{let m=0,t=0;x.S.blocks.forEach(b=>{if(b.warm||b.cool)return;b.items.forEach(it=>{if(it.gone||it.f||it.iso||it.test)return;const n=k.setsOf(it,b,x.c,id);t+=n;if((b.p||1)===1&&!b.fav&&!b.acc&&!b.sh)m+=n;});});return t?m/t:0;};
    if(!(sh(R.str)>sh(B.str)))issue(id+': strength block does not shift sets to the main work ('+sh(B.str).toFixed(2)+' → '+sh(R.str).toFixed(2)+')');
    res[id]+=' (main share '+sh(B.str).toFixed(2)+' → '+sh(R.str).toFixed(2)+')';});
  rep.push('working sets without → with accent: '+Object.keys(res).map(id=>id+' '+res[id]).join(' · '));}
// 4 strength block: main circuits +1 round in their range, secondary −1 (floor 2); volume band +2 for the emphasis pattern; skill band at the lower edge
{const {k}=boot();const S0=sess(k,2,'KA',{emph:'lower'}).S,S1=sess(k,8,'KA',{emph:'lower'}).S;
  const mr=S=>S.blocks.filter(b=>b.rounds&&!b.warm&&!b.cool&&!b.ser&&(b.p||1)===1&&!b.sh&&!b.acc&&!b.fav).map(b=>b.name+':'+b.rounds.join('-'));
  const sr=S=>S.blocks.filter(b=>b.rounds&&(b.sh||b.acc||(b.p||1)>1)&&!b.fav).map(b=>b.name+':'+b.rounds.join('-'));
  const a=mr(S0),b=mr(S1);if(!a.length||a.every((x,i)=>x===b[i]))issue('strength block: main circuit rounds unchanged '+a+' → '+b);
  sr(S1).forEach(x=>{const n=+x.split(':')[1].split('-')[0];if(n<2)issue('secondary under 2 rounds: '+x);});
  setup(k,2);const hb=k.vBand('hinge'),ob=k.vBand('pull');setup(k,14);const hv=k.vBand('hinge'),ov=k.vBand('pull');setup(k,20);const hs=k.vBand('hinge'),os=k.vBand('pull');
  if(hv[1]!==hb[1]+2||hv[0]!==hb[0])issue('volume band of the emphasis pattern: '+hb+' → '+hv);if(ov.join()!==ob.join())issue('volume band moved a non-emphasis pattern: '+ob+' → '+ov);
  if(!(os[1]<ob[1])||os[0]!==ob[0]||os[1]<os[0]+4)issue('skill block band not at the lower edge: '+ob+' → '+os);
  setup(k,12);if(k.vBand('hinge').join()!==hb.join())issue('deload week band changed: '+k.vBand('hinge'));
  rep.push('main rounds '+a.join(',')+' → '+b.join(',')+' · hinge band '+hb.join('–')+' / vol '+hv.join('–')+' · pull band skill block '+os.join('–'));}
// 5 skill block: skill blocks in the long form, explosive cue; strength sessions keep 60–90 min
{const {k}=boot();const a=sess(k,2,'KA',{emph:'upper',skills:{hs:true,fl:true}}),b=sess(k,20,'KA',{emph:'upper',skills:{hs:true,fl:true}});
  const lg=x=>x.S.blocks.filter(bb=>bb.lng).length;if(!(lg(b)>=1))issue('skill block without a long skill block (base '+lg(a)+', skill '+lg(b)+')');
  if(!b.S.blocks.some(bb=>/lift fast, lower under control/.test(bb.info||'')))issue('skill block without the tempo cue');
  if(b.S.min<60||b.S.min>90)issue('skill block KA '+b.S.min+' min');rep.push('skill block: long skill blocks '+lg(a)+' → '+lg(b)+', '+b.S.min+' min');}
// 6 deload/test sessions and the deload week carry no accent; Limited time and tired keep their rules
{const {k}=boot();const x=sess(k,12,'KA');if(x.S.acc)issue('accent in the deload week: '+x.S.acc);
  ['DL','TE','SK','HK'].forEach(id=>{setup(k,8);let S=null;try{S=k.S(id,k.ctx(k.today()));}catch(e){return;}if(S&&S.acc)issue(id+' carries an accent');});
  const y=sess(k,8,'KC');if(y.S.acc!=='str')issue('KC week 8 has no accent');}
// 7 header, hero and Status name the accent in one word per theme; Plain without Warhammer words
{const {k,d}=boot();let {D}=setup(k,8);D.tab='train';k.render();const sub=d.getElementById('subline').textContent,hero=(d.querySelector('.hero .eyebrow')||{}).textContent||'';
  if(!/ · Wrath$/.test(sub))issue('templar header: '+sub);if(!/Block 2 · Wrath/.test(hero))issue('templar hero: '+hero);
  ({D}=setup(k,14,{theme:'plain'}));D.tab='stand';k.render();const sub2=d.getElementById('subline').textContent,t=d.getElementById('app').textContent;
  if(!/ · Volume$/.test(sub2))issue('plain header: '+sub2);if(!/Block 3 · Volume/.test(t))issue('plain Status tile');
  const ban=/Wrath|Foundation|Precision|Fury|Zeal|Excess|Rooting|Abundance/;if(ban.test(sub2+t))issue('Plain shows a theme word');
  Object.keys(k.ACCW).forEach(th=>{const a=k.ACCW[th];if(a.length!==4||a.some(w=>!/^[A-Z][a-z]+$/.test(w)))issue('theme '+th+' accent words not one word each: '+a);});
  rep.push('header templar "'+sub+'", plain "'+sub2+'"');}
// 8 no new field: an old backup loads, the running cycle carries on (block from the training week)
{const {k}=boot();const {D}=setup(k,9);const s=JSON.stringify(D);const c=k.cleanImport(JSON.parse(s));
  if(!c)issue('backup does not load');else{['acc','blk','block'].forEach(f=>{if(f in c)issue('new field '+f);});k.setD(c);k.today(addD(START,8*7+1));if(k.accOf(k.today())!=='str'||k.ctx(k.today()).blk!==2)issue('restored state not in block 2 strength');}}
// 9 easy week: the block shifts with the effective week
{const {k}=boot();const {D}=setup(k,3);D.easy=k.today();const c=k.ctx(k.today());if(c.cyc!==6||k.accNow()!=='base')issue('easy week not a deload without accent: cyc '+c.cyc+' '+k.accNow());
  D.logs.push({d:k.today(),id:'KA',t:'KA',rpe:6,min:70,vs:{pull:8},ex:{}});k.today(addD(k.today(),7));if(k.accOf(k.today())!=='str')issue('after an easy week the strength block does not follow: '+k.accOf(k.today()));}
rep.forEach(r=>console.log(' · '+r));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(x=>console.log(' - '+x));
