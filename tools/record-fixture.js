#!/usr/bin/env node
// Re-records tests/fixtures/t31-nogoal.json (A-034) and prints a summary per profile: changed days and the kind of
// change – session type (another unit), exercises (another set of exercises), order (same exercises, other order)
// or estimate only (same session, other "≈ min").
// Only after a documented rule change. Usage (repo root):
//   python3 tools/build.py && node tools/record-fixture.js          writes the fixture and prints the summary
//   node tools/record-fixture.js --check                            summary only, writes nothing
const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'..');
const {JSDOM}=require(path.join(R,'tests/domguard.js'));
const {sim}=require(path.join(R,'tests/fixtures/sim.js'));
const PROF=require(path.join(R,'tests/fixtures/profiles.json'));
const FXP=path.join(R,'tests/fixtures/t31-nogoal.json');const OLD=fs.existsSync(FXP)?JSON.parse(fs.readFileSync(FXP,'utf8')):{};
const html=fs.readFileSync(path.join(R,'.build/index.html'),'utf8').replace(/<link[^>]*>/g,'');
const START='2026-09-21',DAYS=42,check=process.argv.includes('--check');
function boot(){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://x.test/'});const w=dom.window;w.scrollTo=()=>{};w.eval(html.match(/<script>([\s\S]*)<\/script>/)[1]);return w.__kz;}
function setup(k,p){const D=k.D();Object.assign(D.profile,p.prof);D.focus=p.focus;D.emph=p.emph;D.skills=Object.assign({hs:false,mu:false,ls:false,fl:false,pl:false},p.skills);
  Object.assign(D,{kickDays:p.kick,loc:'g',onb:true,seenFocus:true,seenFav:true,logs:[],start:START,short:false,fav:(p.fav||[]).slice()});k.today(START);}
// "KA Block:ex,ex|Block:ex ~79" → {id, ex:[…] in order, min}
function parse(x){x=x||'';const sp=x.indexOf(' ');const id=sp<0?x:x.slice(0,sp),rest=sp<0?'':x.slice(sp+1);const m=rest.match(/^(.*) ~(\d+)$/);const body=m?m[1]:rest;
  const ex=body?body.split('|').reduce((a,b)=>{const i=b.indexOf(':');return a.concat(b.slice(i+1).split(',').filter(Boolean));},[]):[];return {id,ex,min:m?+m[2]:null,body};}
function kind(a,b){const x=parse(a),y=parse(b);if(x.id!==y.id)return 'session type';
  if(x.body===y.body)return x.min!==y.min?'estimate only':'same';
  const sa=x.ex.slice().sort().join('\n'),sb=y.ex.slice().sort().join('\n');return sa===sb?'order':'exercises';}
const NEW={},lines=[];let total=0;
PROF.forEach(p=>{const k=boot();setup(k,p);NEW[p.n]=sim(k,DAYS,START).map(r=>r.id+(r.sig?' '+r.sig:''));
  const old=OLD[p.n]||[],cnt={'session type':0,exercises:0,order:0,'estimate only':0},days=[];
  NEW[p.n].forEach((x,i)=>{const kd=kind(old[i],x);if(kd==='same')return;cnt[kd]++;days.push('day '+(i+1)+' '+parse(x).id+': '+kd);});
  const n=days.length;total+=n;lines.push(p.n+': '+n+' of '+DAYS+' days changed'+(n?' – '+Object.keys(cnt).filter(c=>cnt[c]).map(c=>c+' '+cnt[c]).join(', '):''));
  days.forEach(d=>lines.push('  '+d));});
console.log('t31-nogoal: '+total+' of '+DAYS*PROF.length+' days changed'+(check?' (check only, nothing written)':''));lines.forEach(l=>console.log(l));
if(!check){fs.writeFileSync(FXP,JSON.stringify(NEW));console.log('written: tests/fixtures/t31-nogoal.json');}
