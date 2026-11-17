// @name suite-naming
// Meta test: every test has a name, is listed in tests/README.md, and every gap is documented as retired or reserved.
const fs=require('fs');const path=require('path');
const P=[];const issue=m=>P.push(m);
const dir=__dirname;const pad=n=>'t'+String(n).padStart(2,'0');
const readme=fs.readFileSync(path.join(dir,'README.md'),'utf8');
const files=fs.readdirSync(dir).filter(f=>/^t\d+\.js$/.test(f));
const nums=files.map(f=>+f.slice(1,-3)).sort((a,b)=>a-b);
const names={};
nums.forEach(n=>{
  const f='t'+n+'.js';const first=fs.readFileSync(path.join(dir,f),'utf8').split('\n')[0];
  const m=first.match(/^\/\/ @name ([a-z0-9]+(?:-[a-z0-9]+)*)\s*$/);
  if(!m){issue(f+': line 1 has no valid "// @name <kebab-name>"');return;}
  const name=m[1];
  if(names[name])issue(f+': name "'+name+'" already used by '+names[name]);names[name]=f;
  const row=new RegExp('^\\| '+pad(n)+' \\| '+name+' \\| '+f.replace('.','\\.')+' \\| \\S','m');
  if(!row.test(readme))issue(f+': no README row "| '+pad(n)+' | '+name+' | '+f+' | …"');
});
// README must not list tests that do not exist
const listed=[...readme.matchAll(/^\| (t\d\d) \| [a-z0-9-]+ \| t(\d+)\.js \|/gm)];
listed.forEach(([,id,n])=>{if(!nums.includes(+n))issue('README lists '+id+' but t'+n+'.js does not exist');});
// Every gap below the highest number is documented as retired
const sec=h=>{const x=readme.split(new RegExp('^## '+h,'m'))[1];return x==null?null:x.split(/^## /m)[0];};
const ret=sec('Retired numbers')||'';if(!ret)issue('README has no "## Retired numbers" section');
// Reserved numbers: assigned by the control station to planned orders; a gap may be reserved, a used number must leave the list
const res=sec('Reserved numbers')||'';
const max=nums[nums.length-1]||0;
for(let n=1;n<=max;n++){
  const inRet=new RegExp('^\\| '+pad(n)+' \\|','m').test(ret);
  const inRes=new RegExp('^\\| '+pad(n)+' \\|','m').test(res);
  if(!nums.includes(n)&&!inRet&&!inRes)issue(pad(n)+' is missing but not listed as retired or reserved');
  if(nums.includes(n)&&inRes)issue(pad(n)+' exists but is still listed as reserved');
  if(inRet&&inRes)issue(pad(n)+' is listed as retired and reserved');
  if(nums.includes(n)&&inRet)issue(pad(n)+' exists but is listed as retired');
}
// A-034: every JSDOM test loads jsdom through the guard (runtime errors from click handlers fail the test)
nums.forEach(n=>{const src=fs.readFileSync(path.join(dir,'t'+n+'.js'),'utf8');if(/require\(['"]jsdom['"]\)/.test(src))issue('t'+n+'.js: loads jsdom directly, use require(\'./domguard\')');});
console.log('tests:',nums.map(pad).join(' '));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
