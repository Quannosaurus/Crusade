// @name suite-naming
// Meta test: every test has a name, is listed in tests/README.md, and every gap is documented as retired.
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
const ret=(readme.split(/^## Retired numbers/m)[1]||'');if(!ret)issue('README has no "## Retired numbers" section');
const max=nums[nums.length-1]||0;
for(let n=1;n<=max;n++){
  const inRet=new RegExp('^\\| '+pad(n)+' \\|','m').test(ret);
  if(!nums.includes(n)&&!inRet)issue(pad(n)+' is missing but not listed as retired');
  if(nums.includes(n)&&inRet)issue(pad(n)+' exists but is listed as retired');
}
console.log('tests:',nums.map(pad).join(' '));
console.log('=== AUFFÄLLIGKEITEN ('+P.length+') ===');P.forEach(p=>console.log(' - '+p));process.exit(0);
