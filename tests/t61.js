// @name build-repro
// A-048: the build is reproducible – every file list in tools/build.py is sorted (FILES in sw.js incl. the fonts),
// so macOS and Linux give byte-identical output, and a second build run changes nothing.
const fs=require('fs');const path=require('path');const cp=require('child_process');const crypto=require('crypto');
const R=path.join(__dirname,'..');const P=[];const issue=m=>P.push(m);
const OUT=['index.html','app.js','app.css','sw.js','manifest.webmanifest','.build/index.html','icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png'];
const fontFiles=()=>fs.readdirSync(path.join(R,'fonts')).filter(f=>!f.startsWith('.')).sort().map(f=>'fonts/'+f);
const snap=()=>{const o={};OUT.concat(fontFiles()).forEach(f=>{o[f]=crypto.createHash('sha256').update(fs.readFileSync(path.join(R,f))).digest('hex');});return o;};
const build=()=>cp.execFileSync('python3',[path.join(R,'tools/build.py')],{cwd:R}).toString().trim();
const v1=build();const s1=snap();
const v2=build();const s2=snap();
if(v1!==v2)issue('build version differs between runs: '+v1+' vs '+v2);
Object.keys(s1).forEach(f=>{if(s1[f]!==s2[f])issue('second build changed '+f);});
Object.keys(s2).forEach(f=>{if(!(f in s1))issue('second build added '+f);});
// FILES in sw.js: fixed head, then the fonts sorted
const sw=fs.readFileSync(path.join(R,'sw.js'),'utf8');const m=sw.match(/const FILES=(\[[^\]]*\]);/);
if(!m)issue('sw.js has no FILES list');else{
  const F=JSON.parse(m[1]);const fonts=F.filter(f=>f.startsWith('fonts/'));
  const sorted=fonts.slice().sort();
  if(JSON.stringify(fonts)!==JSON.stringify(sorted))issue('fonts in FILES not sorted: '+fonts.join(', '));
  if(fonts.length!==5)issue('expected 5 fonts in FILES, got '+fonts.length);
  if(F.slice(0,F.length-fonts.length).some(f=>f.startsWith('fonts/')))issue('fonts not at the end of FILES');
  if(new Set(F).size!==F.length)issue('FILES has duplicates');
  F.forEach(f=>{if(f!=='./'&&!fs.existsSync(path.join(R,f)))issue('FILES lists missing '+f);});
}
// build.py: every glob is sorted (a new unsorted glob would break reproducibility)
const src=fs.readFileSync(path.join(R,'tools/build.py'),'utf8');
(src.match(/[^\n]*glob\.glob\([^\n]*/g)||[]).forEach(l=>{if(!/sorted\(/.test(l))issue('unsorted glob in build.py: '+l.trim().slice(0,80));});
if(/os\.listdir|os\.walk|os\.scandir/.test(src)&&!/sorted\(os\./.test(src))issue('directory listing in build.py without sorted()');
console.log('build',v1,'files',Object.keys(s1).length);
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
