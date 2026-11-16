(function(){
"use strict";
/* ================= Embedding guard ================= */
/* Inside a foreign frame (clickjacking) nothing is rendered or stored; only a short note with a link to the real app. */
var CANON="https://quannosaurus.github.io/Crusade/",framed=true;
try{framed=window.top!==window.self;}catch(x){}
if(framed){document.body.textContent="";var fp=document.createElement("p");fp.className="framed";fp.id="framed";
  fp.appendChild(document.createTextNode("This app does not run inside another page. Open it directly: "));
  var fl=document.createElement("a");fl.href=CANON;fl.target="_top";fl.rel="noopener noreferrer";fl.textContent=CANON;fp.appendChild(fl);
  document.body.appendChild(fp);return;}
/* ================= Speicher ================= */
var KEY="kz_app_v3", memOnly=false;
function pad(n){return String(n).padStart(2,"0");}
function ds(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function pd(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2],12);}
function addD(s,n){var d=pd(s);d.setDate(d.getDate()+n);return ds(d);}
function diff(a,b){return Math.round((pd(b)-pd(a))/864e5);}
var TODAY=ds(new Date());
function fresh(){return {v:3,onb:false,start:TODAY,profile:{pull:5,dips:8,push:15,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},ex:{},vr:{},logs:[],days:{},abs:0,runKm:6,tab:"start",mlen:"n",loc:"g",short:false,kickDays:[],focus:"bal",startP:"s1",pr:{},theme:"templar",skills:{hs:false,mu:false,ls:false,fl:false,pl:false},runI:4,obStep:0,seenFocus:true,pain:{w:false,s:false,e:false},bkAt:0,home:{b:true,s:true,k:false,d:false,p:false,w:false,r:false}};}
function load(){
  try{
    var v=JSON.parse(localStorage.getItem(KEY));if(v&&v.profile){if(!Array.isArray(v.kickDays)){v.kickDays=(v.kickDay==null||v.kickDay===2)?[2,5]:(v.kickDay>=0?[v.kickDay]:[]);delete v.kickDay;}return v;}
    var o=JSON.parse(localStorage.getItem("kz_app_v2"))||JSON.parse(localStorage.getItem("kz_app_v1"));
    if(o&&o.profile){var f=fresh();["profile","logs","start","runKm","home","loc","mlen","abs"].forEach(function(k){if(o[k]!=null)f[k]=o[k];});f.onb=true;return f;}
  }catch(e){memOnly=true;}
  return fresh();}
var D=load();
(function(){try{var q=new URLSearchParams(location.search).get("theme");if(q&&!D.onb&&!D.logs.length&&/^[a-z]+$/.test(q))D.pendingTheme=q;}catch(x){}})();
(function(){delete D.loveOK;var f=fresh();if(D.skills==null&&D.onb)D.skills={hs:true,mu:true,ls:true,fl:false,pl:false};Object.keys(f).forEach(function(k){if(D[k]==null){D[k]=f[k];if(k==="focus")D.seenFocus=false;}});Object.keys(f.profile).forEach(function(k){if(D.profile[k]==null)D.profile[k]=f.profile[k];});Object.keys(f.skills).forEach(function(k){if(D.skills[k]==null)D.skills[k]=f.skills[k];});})();
(function(){var cut=addD(TODAY,-14);Object.keys(D.days||{}).forEach(function(k){if(k<cut)delete D.days[k];});})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(D));}catch(e){memOnly=true;}}
function day(s){s=s||TODAY;if(!D.days[s])D.days[s]={done:{},inp:{},skip:{},pick:null,run:null,fin:{},noKick:false};var d=D.days[s];d.skip=d.skip||{};return d;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function num(v){var x=parseFloat(String(v==null?"":v).replace(",","."));return isNaN(x)?null:x;}
/* Backup import: keep only known fields with the expected types, so a foreign backup cannot inject markup or odd values. */
function cleanImport(n){var b=fresh(),DS=/^\d{4}-\d{2}-\d{2}$/,str=function(v,m){return typeof v==="string"?v.slice(0,m||300):"";},numv=function(v){v=+v;return isFinite(v)?v:0;};
  if(typeof n.start==="string"&&DS.test(n.start))b.start=n.start;
  Object.keys(b.profile).forEach(function(k){if(n.profile&&n.profile[k]!=null)b.profile[k]=Math.max(0,Math.min(999,numv(n.profile[k])));});
  ["onb","seenFocus","short"].forEach(function(k){if(typeof n[k]==="boolean")b[k]=n[k];});
  if(["bal","str","run"].indexOf(n.focus)>=0)b.focus=n.focus;
  if(n.skills&&typeof n.skills==="object")Object.keys(b.skills).forEach(function(k){if(typeof n.skills[k]==="boolean")b.skills[k]=n.skills[k];});
  if(n.home&&typeof n.home==="object")Object.keys(EQ).forEach(function(k){b.home[k]=n.home[k]===true;});
  if(Array.isArray(n.kickDays))b.kickDays=n.kickDays.map(Number).filter(function(x){return x>=0&&x<=6;}).slice(0,7);
  ["runKm","runI"].forEach(function(k){if(n[k]!=null)b[k]=Math.max(0,Math.min(99,numv(n[k])));});
  if(n.bkAt!=null)b.bkAt=Math.max(0,Math.min(1e5,Math.floor(numv(n.bkAt))));
  if(typeof n.bkDate==="string"&&DS.test(n.bkDate))b.bkDate=n.bkDate;
  if(n.bkTs!=null&&numv(n.bkTs)>0)b.bkTs=Math.floor(numv(n.bkTs));
  if(n.abs!=null)b.abs=Math.max(0,Math.min(ABS.length-1,Math.floor(numv(n.abs))));
  if(n.pain&&typeof n.pain==="object")Object.keys(b.pain).forEach(function(k){b.pain[k]=n.pain[k]===true;});
  if(typeof n.startP==="string"&&STARTP[n.startP])b.startP=n.startP;
  b.days=cleanDays(n.days);
  if(n.loc==="h"||n.loc==="g")b.loc=n.loc; if(n.mlen==="k"||n.mlen==="n")b.mlen=n.mlen;
  b.logs=(Array.isArray(n.logs)?n.logs:[]).filter(function(l){return l&&typeof l==="object"&&DS.test(l.d)&&typeof l.id==="string"&&/^[A-Z]{2}$/.test(l.id);}).slice(-2000).map(function(l){
    var o={d:l.d,id:l.id,t:str(l.t,60)};if(l.rpe!=null)o.rpe=Math.max(0,Math.min(10,numv(l.rpe)));if(l.note!=null)o.note=str(l.note);if(l.sum!=null)o.sum=str(l.sum);if(l.abs!=null)o.abs=l.abs?1:0;
    if(l.km!=null)o.km=numv(l.km);if(l.min!=null)o.min=numv(l.min);if(l.lg!=null)o.lg=l.lg?1:0;if(l.bl!=null)o.bl=l.bl?1:0;
    if(Array.isArray(l.sk))o.sk=l.sk.filter(function(x){return ["hs","mu","ls","fl","pl"].indexOf(x)>=0;});
    if(Array.isArray(l.m))o.m=l.m.filter(function(x){return typeof x==="string"&&MMOD[x];});
    if(l.pr!=null)o.pr=Math.max(0,Math.min(20,Math.floor(numv(l.pr))));
    if(l.ex&&typeof l.ex==="object"){o.ex={};Object.keys(l.ex).slice(0,60).forEach(function(k){var v=l.ex[k];if(/^[a-z0-9_:#]+$/.test(k)&&Array.isArray(v))o.ex[k]=[numv(v[0]),numv(v[1])];});}
    if(l.tv&&typeof l.tv==="object"){o.tv={};Object.keys(l.tv).forEach(function(k){if(/^[a-z]+$/.test(k))o.tv[k]=numv(l.tv[k]);});}
    return o;});
  if(n.ex&&typeof n.ex==="object")Object.keys(n.ex).slice(0,500).forEach(function(k){var e=n.ex[k];if(/^[a-z0-9_]+#\d+$/.test(k)&&e&&typeof e==="object"){var x=b.ex[k]={r:numv(e.r),w:numv(e.w),d:DS.test(e.d)?e.d:"",hold:!!e.hold,n:str(e.n,80)};if(e.stall!=null)x.stall=numv(e.stall);}});
  if(n.pr&&typeof n.pr==="object")Object.keys(n.pr).slice(0,500).forEach(function(k){var e=n.pr[k];if(/^[a-z0-9_:#]+$/.test(k)&&e&&typeof e==="object"){var x=b.pr[k]={sc:numv(e.sc),r:numv(e.r),w:numv(e.w),d:DS.test(e.d)?e.d:"",n:str(e.n,80)};if(e.p!=null)x.p=numv(e.p);if(e.km!=null)x.km=numv(e.km);}});
  if(EMPH.some(function(x){return x[0]===n.emph;}))b.emph=n.emph; if(typeof n.seenFav==="boolean")b.seenFav=n.seenFav; if(Array.isArray(n.fav))b.fav=n.fav.filter(function(x){return typeof x==="string"&&x.length<90;}).slice(0,20); if(THEMES[n.theme])b.theme=n.theme; if(Array.isArray(n.honSeen))b.honSeen=n.honSeen.filter(function(x){return typeof x==="string";}).slice(0,50);
  if(n.kitD&&typeof n.kitD==="object")Object.keys(n.kitD).slice(0,500).forEach(function(k){if(/^[a-z0-9_]{1,40}$/.test(k)&&typeof n.kitD[k]==="string"&&DS.test(n.kitD[k]))(b.kitD=b.kitD||{})[k]=n.kitD[k];});
  if(Array.isArray(n.kit))b.kit=n.kit.filter(function(x){return typeof x==="string"&&"kbdsr".indexOf(x)>=0&&x.length===1;}).filter(function(x,i,a){return a.indexOf(x)===i;});
  ["never","favAsk","favQ"].forEach(function(k){if(Array.isArray(n[k])){var a=n[k].filter(function(x,i,arr){return typeof x==="string"&&x.length>0&&x.length<90&&arr.indexOf(x)===i;}).slice(-200);if(k==="never")a=a.slice(-100);if(k==="favQ")a=a.slice(-20);b[k]=a;}});
  if(n.vr&&typeof n.vr==="object")Object.keys(n.vr).slice(0,300).forEach(function(k){if(vrKeyOK(k))b.vr[k]=Math.max(0,Math.min(20,Math.floor(numv(n.vr[k]))));});
  return b;}
/* Variant choice keys (A-022): "<loc>|<key>" with loc g gym, h home, m Field kit and key = vkey(it): an item key
   (also mx_/fav_ prefixed), an iso/test key, or "f:"+name of a fixed item. Bare keys of the old form stay accepted.
   Prototype names are refused in any part. */
var VRK=/^(?:[ghm]\|)?(?:[a-z0-9_]{1,60}|f:[A-Za-z0-9 '\u2019(),.\/:+&\u00b0\u00d7\u2013-]{1,90})$/;
function vrKeyOK(k){return typeof k==="string"&&VRK.test(k)&&!/(^|[|:])(__proto__|constructor|prototype)$/.test(k)&&k.indexOf("__proto__")<0;}
/* Day progress (A-014): today's ticks, entries and choices, last 14 days, every value type-checked. */
function cleanDays(n){var out={},DS=/^\d{4}-\d{2}-\d{2}$/,K=/^[A-Za-z0-9_:#-]{1,40}$/,cut=addD(TODAY,-14);if(!n||typeof n!=="object")return out;
  function sv(v,m){return typeof v==="string"?v.slice(0,m):(typeof v==="number"&&isFinite(v)?v:"");}
  function flags(o){var r={};if(o&&typeof o==="object")Object.keys(o).slice(0,400).forEach(function(k){if(K.test(k)&&o[k])r[k]=true;});return r;}
  Object.keys(n).filter(function(k){return DS.test(k)&&k>=cut;}).slice(0,20).forEach(function(k){var d=n[k];if(!d||typeof d!=="object")return;
    var o={done:flags(d.done),inp:{},skip:flags(d.skip),pick:typeof d.pick==="string"&&/^[A-Z]{2}$/.test(d.pick)?d.pick:null,run:typeof d.run==="string"&&RUNT[d.run]?d.run:null,fin:{},noKick:d.noKick===true};if(d.kit===true)o.kit=true;if(d.xr===true)o.xr=true;
    if(Array.isArray(d.add)){var ad=d.add.filter(function(x,i,arr){return typeof x==="string"&&x.length>0&&x.length<90&&arr.indexOf(x)===i;}).slice(0,12);if(ad.length)o.add=ad;}
    if(d.open&&typeof d.open==="object")o.open=flags(d.open);
    if(d.inp&&typeof d.inp==="object")Object.keys(d.inp).slice(0,400).forEach(function(q){var e=d.inp[q];if(!K.test(q)||!e||typeof e!=="object")return;var r={};
      if(Array.isArray(e.s))r.s=e.s.slice(0,20).map(function(x){return x==null?null:String(sv(x,12));});if(e.w!=null)r.w=String(sv(e.w,12));o.inp[q]=r;});
    var f=d.fin;if(f&&typeof f==="object"){if(f.rpe!=null&&isFinite(+f.rpe))o.fin.rpe=Math.max(0,Math.min(10,+f.rpe));if(typeof f.note==="string")o.fin.note=f.note.slice(0,300);
      ["km","min"].forEach(function(x){if(f[x]!=null)o.fin[x]=sv(f[x],12);});if(typeof f.gmsg==="string")o.fin.gmsg=f.gmsg.slice(0,200);}
    out[k]=o;});
  return out;}
/* Backup = the full user state including day progress. Left out on purpose: transient UI state and the love key
   (kz_love_k lives outside D). bkTs marks when this backup was made, so a restore counts as backed up. */
var BKSKIP=["tab","obStep","pendingTheme","wantLove","statEx","loveOK"],MAXBK=10*1024*1024;
function bkJSON(){var o=JSON.parse(JSON.stringify(D));Object.keys(o).forEach(function(k){if(k.charAt(0)==="_"||BKSKIP.indexOf(k)>=0)delete o[k];});o.bkTs=Date.now();return JSON.stringify(o);}
function markBk(){D.bkTs=Date.now();D.bkAt=D.logs.length;D.bkDate=TODAY;save();}
/* Passive reminder on the start page: last backup over 7 days ago or 5+ new entries since; without any backup from the 3rd entry. */
function bkDue(){var n=D.logs.length,last=D.bkTs?ds(new Date(D.bkTs)):(D.bkDate||"");
  if(!last)return n>=3?{none:1,n:n}:null;var dd=diff(last,TODAY),nn=n-(D.bkAt||0);return (dd>7||nn>=5)?{d:dd,n:Math.max(0,nn)}:null;}
function bkName(){return "crusade-backup-"+TODAY+".json";}
function saveBackupFile(){var txt=bkJSON(),f=null;try{f=new File([txt],bkName(),{type:"application/json"});}catch(x){}
  if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:"Crusade backup"}).then(function(){markBk();D._msg="Backup shared. Keep it somewhere safe, e.g. Google Drive.";render();}).catch(function(){});return;}
  markBk();
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"application/json"}));a.download=bkName();document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1000);
  D._msg="Backup file saved to your downloads.";render();}
function restoreText(txt,where){try{if(typeof txt!=="string"||txt.length>MAXBK)return false;var n=JSON.parse(txt);if(!n||!n.profile||!n.logs)throw 0;var b=cleanImport(n);b.onb=true;if(b.bkTs){b.bkAt=b.logs.length;b.bkDate=ds(new Date(b.bkTs));}D=b;D.tab=where||"start";D._toast="Restored: "+b.logs.length+" entries. Welcome back.";save();render();window.scrollTo(0,0);return true;}catch(x){return false;}}
function askPersist(){try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persisted().then(function(p){if(!p)navigator.storage.persist();});}catch(x){}}
function fmtKg(w){return String(w);}

/* ================= Bausteine ================= */
/* Variante "Name|Bedarf|w" · Bedarf zuhause: g Gym-Gerät, k Stange, b Band, d Hanteln, s Stühle, p Parallettes, w freie Wand, r Ringe · w = mit Gewicht */
var EQ={k:"Pull-up bar",b:"Resistance band",d:"Dumbbells or kettlebell",s:"Two sturdy chairs",p:"Parallettes",w:"Free wall",r:"Rings / suspension trainer"};
/* Field kit (A-019): a day switch for days with little or no equipment. The kit location "m" checks every variant against
   today's kit (D.kit: k bar, b bands, d dumbbells/kettlebell, s bench/chair, r rings; [] = nothing). Gym-only gear never
   counts, parallettes count as two chairs, a free wall is always there. Items without any fitting variant are replaced by
   an equivalent from the same muscle group (key "mx_"+original key, so progression and records stay per variant). */
var KITS=[["n","Nothing"],["k","Pull-up bar"],["b","Bands"],["d","Dumbbells/Kettlebell"],["s","Bench/Chair"],["r","Rings"]];
function kitOn(){return !WK.sim&&!!(D.days[TODAY]&&D.days[TODAY].kit);}
function LOC(){return kitOn()?"m":D.loc;}
function kitReq(o){var n=o.n.toLowerCase(),r=o.req.replace(/w/g,"");
  if(/cable|machine|smith|barbell|\bsz\b|ez-bar|pulldown|leg press|t-bar|landmine|butterfly|chest-supported|medicine ball|jump rope|hyperextension bench|back extension bench|45° back extension|reverse hyperextension|ab wheel|leg curl|abductor/.test(n))r+="g";
  if(/bar\/rings|bodyweight rows|explosive rows|l-rows/.test(n))r+="x";
  else if(/\bring/.test(n))r+="r";
  else if(/pull-ups?\b|chin-ups?\b|muscle-ups?\b|hanging|\bhang\b|false grip|front lever|back lever|bar curls|frenchie|high bar/.test(n))r+="k";
  if(/\bdips?\b/.test(n)&&!/chair|\bring/.test(n))r+="p";
  if(/parallettes/.test(n))r+="p";
  if(o.w||/dumbbell|kettlebell|goblet|weighted|vest/.test(n))r+="d";
  if(/band/.test(n))r+="b";
  if(/chair|\bbox\b|bench|step-ups?|on a step|sofa|table|bulgarian|copenhagen|dragon flag|nordic/.test(n))r+="s";
  return r;}
function kitCan(o){var r=kitReq(o),k=D.kit||[];for(var i=0;i<r.length;i++){var ch=r[i];
    if(ch==="g")return false;if(ch==="p"){if(k.indexOf("s")<0)return false;continue;}if(ch==="x"){if(k.indexOf("k")<0&&k.indexOf("r")<0)return false;continue;}
    if(k.indexOf(ch)<0)return false;}return true;}
function kitGroup(it){var n=it.opts.map(function(o){return o.n;}).join(" ").toLowerCase();
  if(/wrist|reverse curl/.test(n))return "fore";
  if(/face pull|external rotation|y-raise|y-t-w|reverse butterfly|reverse fl|lateral raise|serratus|pull-apart|t-raise/.test(n))return "shoulder";
  if(/calf|tibialis/.test(n))return "calf";
  if(/abduct|band walk|hydrant|side-lying leg raise|copenhagen|adductor/.test(n))return "hipab";
  if(/hyperext|back extension|good morning|deadlift|leg curl|nordic|hip thrust|bridge|swing|kickback|frog pump|pull-through|hip extension/.test(n))return "hip";
  if(/squat|lunge|leg press|step-up|pistol|box jump|jumping/.test(n))return "knee";
  if(/woodchop|pallof|rotation|plank|leg raise|knee raise|dead bug|ab wheel|rollout|walkout|leg lower|dragon|neck|superman|bird dog/.test(n))return "core";
  if(/curl/.test(n))return "arms";
  if(/triceps|french|pushdown/.test(n))return "push";
  if(/pull|chin|row|lat |pulldown|pullover|muscle|transition|lever|hang/.test(n))return "pull";
  if(/dip|push|press|pike|hspu|wall walk|planche/.test(n))return "push";
  return "core";}
var KPOOL={pull:["Pull-ups|k","Ring rows|r","Band rows|b","One-arm dumbbell row|d|w","Inverted rows under a table|s","Towel rows on a door frame","Prone pull-downs on the floor","Reverse snow angels","Door-frame isometric pulls"],
  push:["Ring push-ups|r","Dips between two chairs|s","Archer push-ups","Push-ups","Knee push-ups"],
  knee:["Bulgarian split squat, foot on a chair|s","Goblet squat|d|w","Assisted pistol squat","Cossack squats","Bodyweight squats"],
  hip:["Nordic curls, feet under the sofa|s","Single-leg Romanian deadlift|d|w","Single-leg hip thrust, shoulders on a chair|s","Single-leg glute bridge","Glute bridge"],
  calf:["Single-leg calf raises on a step|s","Single-leg calf raises"],
  hipab:["Banded hip abduction|b","Side-lying leg raises","Fire hydrants"],
  core:["Hanging knee raises|k","Band Pallof press|b","Side plank with reach","Lying leg raises","Dead bug"],
  shoulder:["Band face pulls|b","Side-lying dumbbell external rotation|d|w","Prone Y-T-W","Side-lying external rotation, no weight"],
  fore:["Band wrist curls|b","Dumbbell wrist curls|d|w","Towel wringing, both directions","Knuckle plank holds"],
  arms:["Chin-up negatives|k","Band curls|b","Dumbbell curls|d|w","Towel curls, one foot in the towel"]};
function kitApply(s){var used={};
  s.blocks.forEach(function(b){b.items.forEach(function(it){var v=curVar(it,"m");if(v>=0)used[it.opts[v].n]=1;});});
  s.blocks.forEach(function(b){if(b.warm||b.cool)return;b.items=b.items.map(function(it){if(it.test||it.iso||curVar(it,"m")>=0)return it;
    var g=kitGroup(it),n={};Object.keys(it).forEach(function(k){n[k]=it[k];});n.opts=KPOOL[g].map(O);delete n.lv;delete n.def;n.kx=g;if(n.k)n.k="mx_"+it.k;
    var a=avail(n,"m"),pick=a.filter(function(i){return !used[n.opts[i].n];})[0];if(pick==null)pick=a[0];
    if(pick!=null){used[n.opts[pick].n]=1;n.def=(function(v){return function(){return v;};})(pick);}
    if(!n.f&&/^(reps|each side)$/.test(n.unit||"")){n.lo=Math.max(n.lo,8);n.hi=Math.max(n.hi,15);n.up="slower or a harder variation";}
    if(it.c&&!n.f)n.c="";return n;});});}
/* Pause rule per movement pattern on kit days: a kit session of the pattern (any variant, also a same-group replacement
   "mx_"+key) counts as training for the gym variant, so two weeks with only kit days do not step it back. */
function patKey(k){return String(k||"").replace(/^(mx_|fav_)+/,"");}
function patLast(k,d){var x=(D.kitD||{})[patKey(k)];return x&&x>d?x:d;}
function kitLabel(){var k=D.kit||[];return k.length?KITS.filter(function(x){return k.indexOf(x[0])>=0;}).map(function(x){return x[1];}).join(", "):"Nothing";}
function isKick(s){return D.kickDays.indexOf(pd(s).getDay())>=0;}
function O(s){var p=s.split("|");return {n:p[0],req:p[1]||"",w:p[2]==="w"};}
/* P: Übung mit Steigerung · lv=[Startvariante Basis, Startvariante Profi] */
function P(k,lo,hi,unit,cue,opts,up,sets,lv){return {k:k,lo:lo,hi:hi,unit:unit,c:cue||"",opts:opts.map(O),up:up||"",sets:sets||0,lv:lv||null};}
function F(dose,cue,opts){return {f:dose,c:cue||"",opts:opts.map(O)};}
/* I: Halteübung, Zeiten aus deinem Maximalwert, passt den Maximalwert selbst an */
function I(key,cue,opts){return {iso:key,c:cue||"",opts:opts.map(O)};}
/* T: Testwert, schreibt direkt in deinen Stand */
function T(key,unit,opts){return {test:key,unit:unit,opts:opts.map(O)};}
function lvl(){var p=D.profile;if(p.pull<5||p.dips<8)return 0;if(p.mu>=3)return 2;return 1;}
var LVN=["Basic","Intermediate","Advanced"];
function can(o,loc){if(loc==="g")return true;if(loc==="m")return kitCan(o);for(var i=0;i<o.req.length;i++){var ch=o.req[i];if(ch==="g"||!D.home[ch])return false;}return true;}
function avail(it,loc){var a=[];it.opts.forEach(function(o,i){if(can(o,loc))a.push(i);});
  if(it.gone)return [];if(it.fx!=null)return a.indexOf(it.fx)>=0?[it.fx]:[];
  if(!it.add&&nev().length){var b=a.filter(function(i){return !isNever(it.opts[i].n);});if(b.length)return b;}
  return a;}
/* Never suggest (A-021): excluded exercise names, kept for good until brought back under More. A variant on the list drops out
   of every choice while the item has another variant; an item with nothing else left is replaced by neverApply(). Additions
   of the day ("it.add") and fixed picks ("it.fx") are not filtered. */
function nev(){return D.never||[];}
function isNever(n){return nev().indexOf(n)>=0;}
function vkey(it){return it.k||it.iso||it.test||("f:"+it.opts[0].n);}
function curVar(it,loc){var a=avail(it,loc);if(!a.length)return -1;var v=D.vr[loc+"|"+vkey(it)];if(a.indexOf(v)>=0)return v;
  if(loc==="m"){v=D.vr[D.loc+"|"+vkey(it)];if(a.indexOf(v)>=0)return v;}
  if(it.def){var dd=it.def();if(a.indexOf(dd)>=0)return dd;}
  if(it.lv){var L=lvl(),d=L===0?it.lv[0]:(L===2?it.lv[1]:0);if(a.indexOf(d)>=0)return d;}return a[0];}
function isoP(m){m=Math.round(m||0);
  if(m<11)return {n:5,h:Math.max(3,Math.round(m*0.6)),lev:-1};
  if(m<15)return {n:10,h:6,lev:0}; if(m<19)return {n:6,h:10,lev:0}; if(m<23)return {n:5,h:12,lev:0}; if(m<29)return {n:4,h:15,lev:0}; if(m<32)return {n:3,h:20,lev:0}; if(m<34)return {n:4,h:16,lev:0};
  return {n:3,h:20,lev:1};}
function hsStage(){var p=D.profile;return p.hsf>=5?3:(p.hsw>=45?2:1);}
function lsKey(){return D.profile.lsit>=11?"lsit":"tuck";}

function WARM(){return {name:"Warm-up",info:"approx. 8 min",p:1,rest:0,warm:1,min:8,items:[
  F("3 min","Just get warm",["Rowing machine|g","Jump rope","Jumping Jacks, High Knees"]),
  F("60 s","Circle, then load with fingers forward, sideways, backward",["Wrist prep"]),
  F("15","Arms long, chest proud",["Band Pull-Aparts|b","Light cable face pulls|g","Prone Y-T-W"]),
  F("8–12 + 10 s","Press the shoulders down, hold at the top",["Dip shrugs on parallel bars|p","Shrugs between two chairs|s","Scapula Push-Ups"]),
  F("5–10 + 10 s","From a hang, pull the shoulders down",["Active-passive hang|k","Band straight-arm pulldown|b"]),
  F("3 × 20 s","Heel of the hand over the bar: the base for the muscle-up",["False grip hang|k","False grip ring rows|r"])
]};}
function HSB(longer,p){var pr=D.profile,st=hsStage(),it=[
  F("3 × 3","Hands as close to the wall as you can do cleanly",pr.hsw<10?["Pike Walk-Ins","Wall Walks|w"]:["Wall Walks|w","Pike Walk-Ins"])];
  if(st===1) it.push(I("hsw","Shoulders to ears, ribs in, glutes tight",pr.hsw<10?["Pike handstand, feet on a box|s","Wall plank, feet on the wall|w","Pike handstand, feet on the floor"]:["Chest-to-wall hold|w","Back-to-wall hold (easier)|w","Pike handstand, feet on a chair|s","Pike handstand, feet on the floor"]));
  if(st===1)it.push(F("3 × 8","Only the shoulders move up and down",pr.hsw<10?["Pike shrugs","Overhead barbell shrugs|g"]:["Wall handstand shrugs|w","Pike shrugs","Overhead barbell shrugs|g"]));
  if(st>=2)it.push(F("3 × 6–10","Shift your weight, hips stay still",["Wall shoulder taps|w","Pike shoulder taps"]),F("3 × 5 per leg","Pull one heel off the wall, balance with the fingers",["Heel Pulls|w"]),
    I("hsf","Kick up, then hold free as long as you can",["Freestanding handstand: attempts","Frog stand hold (substitute)"]));
  if(st===1&&longer)it.push(F("3 × 20 s","Learn to balance on your hands",["Frogstand / Crow"]));
  if(pr.hsw>=20) it.push(F("3 each side","Required before you kick up freely",["Bail practice (cartwheel out)|w"]));
  return {name:"Handstand",info:(longer?"20 min":"10 min")+" · stage "+st,p:p||1,rest:60,items:it,hsb:1,lg:!!longer};}
var FLN=["Tuck","Advanced Tuck","One leg","Straddle","Full"], PLN=["Planche Lean","Tuck","Advanced Tuck","Straddle","Full"];
function FLB(longer,p){var st=D.profile.flSt||0,it=[
  P("fl_h",6,15,"s","Arms straight, shoulder blades down, body rigid like a shield",["Tuck Front Lever|k","Advanced Tuck Front Lever|k","One-leg front lever|k","Straddle Front Lever|k","Full front lever|k","Tuck front lever on rings|r"],"next stage via “Swap”","4"),
  P("fl_pull",4,8,"reps","Pull into the hold with straight arms, lower slowly",["Front lever raises (same stage as the hold)|k","Tuck Front Lever Rows|k","Heavy straight-arm pulldown|g|w","Band Straight-Arm Pulldown|b"],"Extend the legs further","3")];
  it[0].def=function(){return Math.min(4,D.profile.flSt||0);};
  if(longer) it.push(F("3 × 5","Lower slowly for 5 s, back stays rounded",["Negative Dragon Flags","Hollow body hold, arms overhead"]));
  return {name:"Front Lever",info:(longer?"15 min":"10 min")+" · stage "+FLN[Math.min(4,st)]+" · 2 min rest",p:p||1,rest:120,skill:"fl",items:it};}
function PLB(longer,p){var st=D.profile.plSt||0,it=[
  P("pl_h",6,15,"s","Arms straight, shoulders far in front of the hands, upper back rounded",["Planche Lean","Tuck planche on parallettes|p","Advanced tuck planche on parallettes|p","Straddle Planche|p","Full planche|p","Tuck planche on the floor"],"next stage via “Swap”","4"),
  P("pl_pu",5,10,"reps","Shoulders stay in front of the hands, elbows tight",["Pseudo-Planche Push-Ups","Tuck Planche Push-Ups|p","Leaning ring push-ups|r"],"Move the hands further toward the hips","3")];
  it[0].def=function(){return Math.min(4,D.profile.plSt||0);};
  if(longer) it.push(F("2 × 10 + 10 s","Push the shoulder blades wide apart, then hold",["Scapula Push-Ups Plus","Planche lean with protraction"]));
  return {name:"Planche",info:(longer?"15 min":"10 min")+" · stage "+PLN[Math.min(4,st)]+" · 2 min rest",p:p||1,rest:120,skill:"pl",items:it};}
function selSk(){return ["hs","fl","pl"].filter(function(k){return D.skills[k];});}
function hasSk(l,k){if(l.sk)return l.sk.indexOf(k)>=0;return k==="hs"&&!!HASHS[l.id];}
function skLast(k,s){for(var i=D.logs.length-1;i>=0;i--){var l=D.logs[i];if(l.d<s&&hasSk(l,k))return diff(l.d,s);}return 99;}
function skillPlan(id,s){var rot=selSk(),n={KA:D.skills.mu?1:2,KB:1,KC:1,SK:3}[id]||0;if(!n||!rot.length)return [];
  if(rot.length===1)return rot.slice();
  return rot.map(function(k,i){return {k:k,sc:skLast(k,s)+(k==="hs"?1:0)-i*0.01};}).sort(function(a,b){return b.sc-a.sc;}).slice(0,n).map(function(x){return x.k;});}
function SKB(k,longer,p){var b=k==="hs"?HSB(longer,p):(k==="fl"?FLB(longer,p):PLB(longer,p));b.skill=k;return b;}
function skBlocks(id,longer,p){var pl=skillPlan(id,TODAY),one=selSk().length===1;var lg=(longer||one)&&!D.short;return pl.map(function(k){var b=SKB(k,lg,p);if(lg)b.lng=[k,p];return b;});}
function LSIT(){var full=D.profile.lsit>=11,n=full?"L-Sit":"Tuck L-Sit";return I(lsKey(),full?"Legs straight, shoulders down":"Knees to chest, shoulders down. Then 3 short attempts with straight legs",[n+" on parallel bars|p",n+" between chairs|s",n+" on the floor","Hanging "+n+"|k"]);}
function MUB(){var L=lvl(),mu=D.profile.mu;
  if(L===0) return {name:"Pulling base",info:"2 min rest · the base before muscle-ups make sense",p:1,rest:120,items:[
    P("mu_neg",3,5,"reps","Start at the top, lower slowly for 5 s",["Negative pull-ups","Band-assisted negative pull-ups|b"],"8 s lowering","3"),
    F("3 × 20 s","Shoulder blades down and together",["Flexed arm hang at the top|k"])]};
  if(L===2) return {mu:1,name:"Muscle-Up",info:"fresh, 2–3 min rest · clean reps only",p:1,rest:150,items:[
    P("mu_pro",Math.max(2,Math.round(mu*0.5)),Math.max(4,mu),"reps","Strict, no kipping, deep dip at the top",["Strict muscle-ups (high bar, e.g. park)|k","Ring-Muscle-Ups|r","Weighted vest muscle-ups|k|w","Weighted explosive pull-ups (gym substitute)|g|w"],"add a vest","4")]};
  return {mu:1,name:"Muscle-Up-Skill",info:"fresh, 2–3 min rest · stop when technique gets sloppy",p:1,rest:150,items:[
    F(mu>=1?"EMOM 10 × 1–2":"5 × 1–2","Pull explosively to the hips, elbows fast forward",["Transition on a Smith machine, low bar, feet on floor|g","Explosive chest-to-bar pull-ups|k","Band-assisted muscle-up on a high bar|kb","Ring muscle-up with foot assist|r"])]};}
function SHOULDER(p,rot){return {sh:1,name:"Shoulder stability",info:"Back to back · 60 s rest after the round",p:p||3,rest:60,rounds:[2,2],items:[
  rot?P("sh_y",12,15,"reps","Lower traps, thumbs up",["Prone Y-Raises","Cable Y-raises|g|w","Reverse Butterfly|g|w"],"add weight","2"):P("sh_fp",10,15,"reps","Elbows high, hands next to the head",["Cable face pulls|g|w","Band face pulls|b","Reverse Butterfly|g|w"],"more weight","2"),
  P("sh_er",10,15,"each side","Rotator cuff, elbow at your side",["Cable external rotation|g|w","Band external rotation|b","Side-lying dumbbell external rotation|d|w"],"more weight","2"),
  P("sh_sa",8,12,"reps","Serratus: at the top, push the shoulders far forward",["Scapula Push-Ups Plus","Serratus Wall Slides|w","Landmine Serratus Press|g|w"],"slower or add weight","2")]};}
function FOREARM(){return {acc:1,name:"Forearms & elbows",info:"Back to back · protects the tendons for false grip and muscle-ups",p:3,rest:45,rounds:[2,2],items:[
  P("fa_rc",12,20,"reps","Lower slowly, elbows still",["EZ-bar reverse curls|g|w","Band reverse curls|b","Dumbbell reverse curls|d|w"],"more weight","2"),
  P("fa_wc",15,20,"reps","Alternate wrist flexors and extensors",["Dumbbell wrist curls|g|w","Band wrist curls|b"],"more weight","2")]};}
function LEGMINI(why){return {legs:1,name:"Compact legs",info:(why==="week"?"Second leg day this week":"Strength C was a while ago")+" · 3 sets · 90 s rest",p:2,rest:90,items:[
  P("c_sq",6,10,"reps","",["Dumbbell Bulgarian split squat|g|w","Barbell back squat|g|w","Leg press|g|w","Assisted pistol squat"],"more weight","3",[3,0]),
  P("c_rdl",8,12,"reps","Hips back, back straight",["Romanian deadlift|g|w","Leg curl machine|g|w","Nordic Curls"],"more weight","3")]};}
/* Lower-body emphasis: glute- and leg-focused exercises, rotated two per session. */
function GLUTES(){return [
  P("g_ht",8,12,"reps","Chin tucked, ribs down, squeeze the glutes 2 s at the top",["Barbell hip thrust|g|w","Hip thrust machine|g|w","Single-leg glute bridge","Dumbbell hip thrust on a chair|sd|w"],"more weight","3"),
  P("g_kb",10,15,"each side","Hips square, kick back and up, squeeze at the end",["Cable kickbacks|g|w","Glute kickback machine|g|w","Band kickbacks|b","Donkey kickbacks"],"more weight or slower","3"),
  P("g_bss",8,12,"each side","Lean slightly forward, the front glute does the work",["Dumbbell Bulgarian split squat|g|w","Bulgarian split squat, foot on a chair|s","Reverse lunges"],"more weight","3"),
  P("g_ab",12,20,"reps","Sit tall or lean slightly forward, push the knees out",["Abductor machine|g|w","Banded hip abduction|b","Side-lying leg raises","Fire hydrants"],"more weight or band","3"),
  P("g_rdl",8,12,"reps","Hips back, back long, feel the hamstrings",["Romanian deadlift|g|w","Single-leg Romanian deadlift|d|w","Good mornings, hands behind head"],"more weight","3"),
  P("g_su",8,12,"each side","Whole foot on the box, drive up through the heel",["Dumbbell step-ups|g|w","Step-ups on a chair|s","Sumo squats"],"more weight","3")];}
var EMPH=[["bal","Balanced","Upper and lower body evenly. The standard plan."],
  ["lower","Legs & glutes","An extra leg and glute block in every strength session, a bit less upper-body volume, leg day more often."],
  ["glutes","Glutes","Like legs & glutes, but glute-dominant: hip thrusts, kickbacks, abduction, bridges. Less squatting."],
  ["upper","Upper body","An extra arm and shoulder block: lateral raises, curls, triceps, rows. Leg day a bit less often."],
  ["core","Core & posture","An extra core and back block: anti-rotation, side planks, leg raises, back extensions. Good for kickboxing and desk days."]];
function emph(){var e=D.emph||"bal";return EMPH.some(function(x){return x[0]===e;})?e:"bal";}
function GLUTEX(){var g=GLUTES();return [g[0],g[1],g[3],
  P("g_fp",15,25,"reps","Soles together, knees out, squeeze hard at the top",["Cable pull-through|g|w","Frog pumps","Banded glute bridge|b"],"more reps or weight","3"),
  P("g_45",10,15,"reps","Round the upper back slightly, push the hips into the pad with the glutes",["45° back extension, glute-biased|g","Reverse hyperextension|g","Hip extension on the floor (superman)"],"hold a plate","3"),
  g[5]];}
function UPPERX(){return [
  P("u_lat",10,15,"reps","Lead with the elbows, stop at shoulder height",["Cable lateral raises|g|w","Dumbbell lateral raises|d|w","Band lateral raises|b"],"more weight or slower","3"),
  P("u_cur",8,12,"reps","Elbows fixed at your sides",["EZ-bar curls|g|w","Dumbbell curls|d|w","Band curls|b","Chin-up negatives|k"],"more weight","3"),
  P("u_tri",10,15,"reps","Elbows stay still, full lockout",["Cable triceps pushdown|g|w","Overhead dumbbell extension|d|w","Diamond push-ups","Bench dips between chairs|s"],"more weight or reps","3"),
  P("u_row",8,12,"reps","Pull the elbow to the hip, pause 1 s",["Chest-supported row|g|w","One-arm dumbbell row|d|w","Band rows|b","Inverted rows under a table"],"more weight","3"),
  P("u_rd",12,20,"reps","Thumbs up, squeeze the shoulder blades",["Reverse fly machine|g|w","Bent-over dumbbell reverse fly|d|w","Band pull-aparts|b","Prone T-raises"],"more weight","3"),
  P("u_sh",8,12,"reps","Ribs down, press straight up",["Seated dumbbell shoulder press|g|w","Dumbbell shoulder press|d|w","Pike push-ups"],"more weight","3")];}
function COREX(){return [
  P("x_db",8,12,"each side","Lower back stays on the floor, exhale fully",["Dead bug with a weight|g|w","Dead bug"],"slower or add weight","3"),
  P("x_pal",10,12,"each side","Press out, resist the turn, hips square",["Cable Pallof press|g|w","Band Pallof press|b","Side plank with reach"],"step further out","3"),
  P("x_sp",20,40,"s each side","Straight line from head to heels",["Side plank, top leg raised","Side plank","Side plank on knees"],"longer or raise the leg","3"),
  P("x_lr",8,15,"reps","No swinging, roll the pelvis up",["Hanging knee or leg raises|g","Hanging knee raises|k","Lying leg raises"],"straighter legs","3"),
  P("x_be",10,15,"reps","Long spine, squeeze the glutes at the top",["Back extension bench|g","Superman holds","Bird dog"],"hold a plate","3"),
  P("x_aw",6,12,"reps","Ribs down, only roll as far as you can hold",["Ab wheel rollouts|g","Plank walkouts","Plank shoulder taps"],"further out","3")];}
/* Anchor (lower/glutes emphasis): one fixed exercise per session type that stays the same week after week, so it can
   progress (repeated exposure is what progressive overload needs), plus one rotating exercise. First match that is not
   already in the session wins; Hip thrust is shared by Strength A and C, so it is trained twice a week on one progression. */
var ANCH={lower:{KA:["g_ht","g_bss"],KB:["g_rdl","g_bss"],KC:["g_ht","g_su"],HO:["g_su","g_ab"]},glutes:{KA:["g_ht","g_45"],KB:["g_45","g_su"],KC:["g_ht","g_45"],HO:["g_su","g_fp"]}};
function EMB(id,pres){var e=emph();var cfg={lower:[GLUTES,"Lower body focus","Glutes & legs"],glutes:[GLUTEX,"Glute focus","Glutes"],upper:[UPPERX,"Upper body focus","Arms & shoulders"],core:[COREX,"Core focus","Core & back"]}[e];if(!cfg)return null;
  pres=pres||[];var all=cfg[0]().filter(function(it){return !it.opts.some(function(o){return pres.indexOf(o.n)>=0;});});
  var big=(e==="lower"||e==="glutes")?id==="KC":(e==="upper"&&(id==="KA"||id==="KB"));
  var cnt=D.logs.filter(function(l){return l.id===id;}).length,n=Math.min(big?3:2,all.length),out=[];
  if(ANCH[e]&&all.length){var anc=null;(ANCH[e][id]||[]).some(function(k){anc=all.filter(function(it){return it.k===k;})[0]||null;return !!anc;});if(!anc)anc=all[0];
    anc.anc=1;out.push(anc);var rest=all.filter(function(it){return it!==anc;});if(rest.length)out.push(rest[cnt%rest.length]);}
  else for(var i=0;i<n;i++)out.push(all[(cnt*n+i)%all.length]);
  var more=all.filter(function(it){return out.indexOf(it)<0;});more=more.slice(cnt%(more.length||1)).concat(more.slice(0,cnt%(more.length||1)));
  return out.length?{name:cfg[1],info:cfg[2]+" · your emphasis · 60–90 s rest",p:1,rest:75,rounds:[3,3],lowb:1,items:out,more:more}:null;}
/* Favourite exercises: always included in strength sessions. */
var FAVIDS={KA:1,KB:1,KC:1,CH:1,HO:1};
function favCatalog(){var cat={};function add(it,v){var n=it.opts[v].n;if(!cat[n])cat[n]={it:it,v:v};}
  GLUTES().concat(GLUTEX(),UPPERX(),COREX()).forEach(function(it){it.opts.forEach(function(o,v){add(it,v);});});
  ["KA","KB","KC","HO"].forEach(function(id){[1,2].forEach(function(ph){var s=S0(id,{phase:ph,week:2,cyc:2,lowFreq:false});s.blocks.forEach(function(b){b.items.forEach(function(it){if(it.f||it.test||it.iso)return;it.opts.forEach(function(o,v){add(it,v);});});});});});
  return cat;}
function FAVB(id,present){var fav=(D.fav||[]).filter(function(n){return present.indexOf(n)<0&&!isNever(n);});if(!fav.length)return null;var cat=favCatalog(),items=[];
  var off=fav.length>4?(D.logs.filter(function(l){return STR[l.id];}).length*4)%fav.length:0;fav=fav.slice(off).concat(fav.slice(0,off));
  var more=[];fav.forEach(function(n,i){var c=cat[n];if(!c)return;var it={};Object.keys(c.it).forEach(function(k){it[k]=c.it[k];});it.k="fav_"+c.it.k;it.def=(function(v){return function(){return v;};})(c.v);it.sets=it.sets||"3";(items.length<4?items:more).push(it);});
  return items.length?{name:"★ Your favourites",info:((D.fav||[]).length>4?"Up to 4 per session, they take turns":"Always in your plan")+" · 60–90 s rest",p:1,rest:75,fav:1,items:items,more:more}:null;}
function KPOW(){return {acc:1,name:"Kickboxing power",info:"60 s rest",p:3,rest:60,rounds:[2,3],items:[
  P("kp_rot",6,10,"each side","Rotate from the hips",["Cable Woodchopper|g|w","Medicine ball rotational throw|g|w","Landmine rotation|g|w","Band Woodchopper|b"],"more weight"),
  P("kp_pal",8,12,"each side","The torso does not rotate",["Cable Pallof press|g|w","Band Pallof press|b"],"more weight"),
  P("kp_cop",20,40,"s each side","Adductors, stabilises the standing leg",["Copenhagen Plank","Adductor machine|g|w"],"Leg straight"),
  F("10 s each direction","Neck isometrics: press your hand against forehead, back of head and sides. Helps you take hits",["Neck isometrics"])]};}
var KM_PRE={name:"Before kickboxing",info:"8 min · dynamic",p:1,rest:0,items:[
  F("10 each side","Swing loosely, go higher each time",["Leg swings front to back"]),F("10 each side","",["Lateral leg swings"]),
  F("6 each side","",["Cossack Squats"]),F("5 each way","Knee high, big circle",["Standing hip circles"]),
  F("6 each side","Rotation for punches",["Open Books","Thread the Needle"]),F("60 s","",["Wrist prep"]),F("30 s","",["Ankle hops / jump rope"])]};
function KM_ACT(){return {name:"Kick mobility",info:"15 min · active",p:1,rest:30,items:[
  P("km_front",5,8,"× 5 s each side","Hold the straight leg up in front, no swinging",["Active front leg raise"],"hold higher"),
  P("km_side",5,8,"× 5 s each side","Slowly hold a side kick at the end position",["Side kick hold at a chair or door"],"hold higher"),
  P("km_horse",30,60,"s","Deep, back straight",["Horse Stance"],"deeper","3"),
  F("2 × 45 s","Straddle, chest forward",["Pancake / straddle fold"]),
  F("2 × 60 s","Stand wide, sink slowly",["Side split progression","Frog Pose"])]};}
var REHAB={
  w:{name:"Wrist rehab",items:[F("2 min","Gentle, pain-free",["Circle the wrists, open and close the fingers"]),F("3 × 15","Rubber band around the fingers, open",["Finger extensions with a rubber band"]),F("3 × 20 s","Fist against the other hand, no movement",["Wrist isometrics in 4 directions"])]},
  s:{name:"Shoulder rehab",items:[F("3 × 15","Light band, pain-free",["Band external rotation"]),F("3 × 10","Shoulder blades back and down, hold 3 s",["Scapula Setting"]),F("2 × 10","Lying down, only as far as it feels good",["Floor Angels"])]},
  e:{name:"Elbow rehab",items:[F("3 × 15","Lower slowly for 3 s, light weight",["Eccentric wrist curls"]),F("3 × 15","Light, slow",["Light reverse curls"]),F("2 × 30 s","",["Forearm stretch, both sides"])]}
};
var PAINRX={w:/Handstand|Push-up|Shoulder taps|Bail|wrist|Frog stand|Wall Walk|Pike|Frogstand|Crow|Planche|Push-Up|Liegestütz|Dips|Handgelenk|Heel Pulls|Schulter-Taps|Aussteigen|Victorian|L-Sit/i,
  s:/German Hang|Shoulder press|shoulder press|Overhead|Shoulder taps|Bail|Dips|Handstand|Wall Walk|Skin the Cat|Dislocates|Muscle-Up|Transition|Pike|Schulterdrücken|Schulterpresse|Landmine Press|HSPU|Überkopf|Heel Pulls|Schulter-Taps|Aussteigen/i,
  e:/Muscle-up|muscle-up|pull-ups|Pull-ups|pulldown|curls|triceps|Triceps|chin-ups|Transition|False-Grip|Curls|Explosive|Frenchie|Klimmzüge|Chin-Ups|Pull-Ups|Latzug|Dips|French Press|Trizeps/i};

/* ================= Einheiten ================= */
var NAMES={KA:"Strength A: Muscle-up",KB:"Strength B: Volume",KC:"Strength C: Full body & legs",CH:"Skill Trial",SK:"Skill session",RS:"Recovery & kick mobility",DL:"Deload",TE:"Test",HO:"Home strength",HK:"Home skills",RE:"Easy run",RH:"Hard run",RI:"Interval run",KI:"Kickboxing",MO:"Morning routine"};
function homeB(){return D.logs.filter(function(l){return l.id==="HO";}).length%2===1;}
function updNames(){NAMES.HO=homeB()?"Home strength B":"Home strength A";NAMES.KA=D.skills.mu?"Strength A: Muscle-up":"Strength A: Pull & push";}
function favDef(b){b.items.forEach(function(it){if(it.f||it.test||it.iso)return;var a=avail(it,LOC());for(var j=0;j<it.opts.length;j++){if((D.fav||[]).indexOf(it.opts[j].n)>=0&&a.indexOf(j)>=0){it.def=(function(v){return function(){return v;};})(j);break;}}});}
function postBlocks(id,bl){var sk=D.skills,out=[];
  bl.forEach(function(b){
    if(b.hsb){ skBlocks(id,b.lg,b.p).forEach(function(x){out.push(x);}); return; }
    if(!sk.hs&&/^Handstand/.test(b.name)&&!b.skill) return;
    if(!sk.mu&&(b.mu||b.name==="Muscle-up transition"||b.name==="Muscle-Up EMOM")) return;
    var it=b.items.filter(function(x){
      if(!sk.ls&&(x.iso==="tuck"||x.iso==="lsit"||x.test==="tuck"||x.test==="lsit")) return false;
      if(!sk.mu&&(x.test==="mu"||x.test==="expl"||(x.opts[0].n==="False grip hang"&&b.name==="Warm-up"))) return false;
      if(!sk.hs&&(x.test==="hsw"||x.test==="hsf")) return false;
      return true;});
    if(!it.length) return;
    var nb={};Object.keys(b).forEach(function(k){nb[k]=b[k];});nb.items=it;
    if(!sk.ls&&b.name==="L-sit & grip") nb.name="Grip & hang";
    if(/^Handstand/.test(b.name)&&!nb.skill) nb.skill="hs";
    if(b.name==="Kickboxing power"&&!D.kickDays.length){nb.name="Power & core";nb.items=nb.items.filter(function(x){return !/Neck/.test(x.opts[0].n);});}
    if(!sk.ls&&b.name==="L-sit & support") nb.name="Support";
    out.push(nb);});
  if((id==="HO"||id==="HK")){var ex=[];
    if(sk.pl) ex.push(PLB(id==="HK",1));
    if(sk.fl&&D.home.k) ex.push(FLB(id==="HK",1));
    if(id==="HO"&&sk.hs) ex=[];
    var at=out.length&&out[0].name==="Warm-up"?1:0; Array.prototype.splice.apply(out,[at,0].concat(ex.slice(0,id==="HO"?1:2)));}
  var em=emph();
  if(em!=="bal"&&(id==="KA"||id==="KB"||id==="HO"||id==="KC")){
    if((em==="lower"||em==="glutes")&&id!=="KC")out.forEach(function(b){if(b.rounds&&!b.lowb&&/Strength|Circuit|Pull|Push|Transitions|Base strength|Explosive/.test(b.name))b.rounds=[Math.max(2,b.rounds[0]-1),Math.max(2,b.rounds[1]-1)];});
    if(em==="upper"&&id==="KC")out.forEach(function(b){if(b.name==="Legs"&&b.items.length>3)b.items=b.items.slice(0,3);});
    var pr0=[];out.forEach(function(b){b.items.forEach(function(it){it.opts.forEach(function(o){pr0.push(o.n);});});});var eb=EMB(id,pr0);if(eb)out.push(eb);}
  if(FAVIDS[id]&&(D.fav||[]).length)out.forEach(favDef);
  if(FAVIDS[id]){var pres=[];out.forEach(function(b){b.items.forEach(function(it){var v=curVar(it,LOC());if(v>=0)it.opts.forEach(function(o){pres.push(o.n);});});});var fb=FAVB(id,pres);if(fb)out.push(fb);}
  if(COOLK[id]) out.push(COOL(COOLK[id]));
  return out;}
var GYM=["KA","KB","KC","CH","SK","RS","DL","TE"], HOME=["HO","HK","RS"];
var HARD={KA:1,KB:1,KC:1,CH:1,RH:1,RI:1,KI:1,TE:1,HO:1}, STR={KA:1,KB:1,KC:1,CH:1,DL:1,TE:1,HO:1}, HASHS={KA:1,KB:1,SK:1,KC:1,HO:1,HK:1};
function S(id,c){
  var s=S0(id,c),sk=D.skills;
  if(!sk.mu&&id==="KA") s.goal="Pulling and pushing strength, explosive power"+(selSk().length?" and your skills.":".");
  if(!sk.mu&&id==="KB") s.goal="Lots of clean pulling and pushing volume in a circuit, plus shoulder health.";
  if(id==="HO"&&homeB()){s.goal="Home strength B: same muscles, different variations and legs first.";s.blocks.forEach(function(b){if(b.rounds){b.items=b.items.slice(2).concat(b.items.slice(0,2));b.items.forEach(function(it){if(!it.def&&it.opts.length>1)it.def=function(){return 1;};});}});}
  s.blocks=postBlocks(id,s.blocks);
  if(legDay(id)) s.blocks.forEach(function(b){if(b.warm){b.items=b.items.concat(LEGWARM());b.min=11;b.info="approx. 11 min · hips, knees and ankles too";}});
  if(kitOn()) kitApply(s);
  neverApply(s);
  if(D.short) shortLegs(s,c);
  design(s,id,c);
  var adb=ADDIDS[id]&&ADDB();
  if(adb){var ci=-1;s.blocks.forEach(function(b,i){if(b.cool&&ci<0)ci=i;});if(ci<0)s.blocks.push(adb);else s.blocks.splice(ci,0,adb);s.min=estMin(s,c,id);s.addMin=1;}
  return s;
}
/* Never suggest: an item whose every fitting variant is excluded gets an equivalent from the same muscle group (kitGroup):
   first an exercise from the catalogue (its own key and variant, so progression is shared), else the Field kit pool. */
function neverApply(s){if(!nev().length)return;var loc=LOC(),used={},cat=null;
  s.blocks.forEach(function(b){b.items.forEach(function(it){var v=curVar(it,loc);if(v>=0)used[it.opts[v].n]=1;});});
  s.blocks.forEach(function(b){if(b.warm||b.cool)return;b.items=b.items.map(function(it){if(it.f||it.test||it.iso||it.add)return it;var v=curVar(it,loc);if(v<0||!isNever(it.opts[v].n))return it;
    var g=kitGroup(it),n={},pick=null;cat=cat||favCatalog();
    Object.keys(cat).some(function(nm){var x=cat[nm];if(isNever(nm)||used[nm]||x.it.f||x.it.iso||x.it.test||!can(x.it.opts[x.v],loc)||kitGroup(x.it)!==g)return false;pick=x;return true;});
    if(pick){Object.keys(pick.it).forEach(function(k){n[k]=pick.it[k];});n.fx=pick.v;}
    else{Object.keys(it).forEach(function(k){n[k]=it[k];});n.opts=KPOOL[g].map(O);if(n.k)n.k="mx_"+String(n.k).replace(/^(mx_)+/,"");var a=avail(n,loc).filter(function(i){return !used[n.opts[i].n]&&!isNever(n.opts[i].n);});if(!a.length)return it;n.fx=a[0];n.kx=g;}
    delete n.def;delete n.lv;n.nx=it.opts[v].n;if(it.anc)n.anc=it.anc;used[n.opts[n.fx].n]=1;return n;});});}
/* Additions (A-021): "+ Add exercise" puts catalogue exercises into today's session, in the block "Your additions" before the
   cool-down. They live in the day progress (day().add), so they survive a reload and are gone the next day. design() never
   touches them, the header shows the new duration (may exceed 90 min); only the pain filter hides one (with its hint).
   Ids use the fixed block index ADDBI, so removing one does not move another session's inputs. */
var ADDIDS={KA:1,KB:1,KC:1,CH:1,SK:1,DL:1,HO:1,HK:1},ADDBI=80;
function ADDB(){var dy=D.days[TODAY];if(WK.sim||!dy||!dy.add||!dy.add.length)return null;var cat=favCatalog(),items=[];
  dy.add.forEach(function(n){var c=cat[n],it={};if(!c){items.push({k:"add_x",lo:8,hi:12,unit:"reps",c:"",opts:[{n:n,req:"g",w:false}],fx:0,add:1,gone:1});return;}
    Object.keys(c.it).forEach(function(k){it[k]=c.it[k];});delete it.def;delete it.lv;delete it.anc;it.fx=c.v;it.add=1;it.sets=it.sets||"3";items.push(it);});
  return {name:W("adds"),info:"Today only · 60–90 s rest",p:1,rest:75,add:1,bi:ADDBI,items:items};}
/* Search list for "+ Add exercise": every catalogue exercise that fits today's location or kit. */
function addRows(loc){var q=(D._addq||"").toLowerCase(),out=[];favGroups().forEach(function(g){var rows=g[1].filter(function(o){return can(o,loc);});if(rows.length)out.push([g[0],rows]);});return out;}
/* V4 (A-010): leg days warm up hips, knees and ankles as well, not only wrists and shoulders. */
function legDay(id){var e=emph();return id==="KC"||((e==="lower"||e==="glutes")&&(id==="KA"||id==="KB"||id==="HO"));}
function LEGWARM(){return [
  F("10 each side","Swing loosely, a little higher each time",["Leg swings, front to back and sideways"]),
  F("5 each side","Low lunge, elbow to the instep, then rotate open",["World's greatest stretch","Deep lunge with rotation"]),
  F("10 each side","Knee travels over the toes, heel stays down",["Ankle rocks, knee to the wall"]),
  F("10","Slow and deep, knees push out",["Bodyweight squats","Glute bridges"])];}
/* V4: warm-up sets before heavy basic lifts, derived from today's working weight. Display only: they have no inputs,
   so they never reach volume, records or XP. */
var HEAVY=/^(fav_)?(c_sq|c_rdl|g_ht|g_rdl|b_gl|a_sbd|a2_dtp|a2_wpu|b2_sw|b2_dl|c_pu|c_dip)$/;
function r25(x){return Math.round(x/2.5)*2.5;}
function wuSets(it,v){if(it.f||it.iso||it.test||!HEAVY.test(it.k)||v<0)return null;var o=it.opts[v],g=target(it,v),w=o.w?(g.w||0):0;
  if(o.w&&w>=20)return [[r25(w*0.5),8],[r25(w*0.7),5],[r25(w*0.85),2]];
  if(o.w&&w>0)return [[r25(w*0.5),8],[r25(w*0.75),4]];
  if(o.w)return [["~50 %",8],["~75 %",4]];
  return [["",5]];}
function wuText(x){if(x.length===1&&x[0][0]==="")return "1 × 5 easier: band, foot assist or half range";
  return x.map(function(y){return (typeof y[0]==="number"?fmtKg(y[0])+" kg":y[0])+" × "+y[1];}).join(" · ");}
/* V3 (A-010): estimated minutes. Circuit: rounds × exercises × 45 s + rounds × rest. Set by set: sets × (40 s + rest).
   Blocks timed in their info ("10 min") count as stated. Warm-up 8–11 min, cool-down 5 min, Core Blitz rounds/2 + 1 min,
   warm-up sets 1 min each. */
function fSets(f){var m=String(f).match(/^(\d+)\s*×/);return m?+m[1]:1;}
function blockSec(b,c,id){if(b.warm)return (b.min||8)*60;if(b.cool)return 300;
  var its=b.items.filter(function(it){return curVar(it,LOC())>=0;});if(!its.length)return 0;var wu=0,inf=String(b.info||"");
  its.forEach(function(it){var x=wuSets(it,curVar(it,LOC()));if(x)wu+=x.length*60;});
  var m=inf.match(/^(\d+) min/)||inf.match(/for (\d+) minutes/);if(m)return +m[1]*60+wu;
  if(b.rounds){var R=rounds(b,c,id);return R*its.length*45+R*(b.rest||0)+wu;}
  var t=0;its.forEach(function(it){if(it.iso){var q=isoP(D.profile[it.iso]);t+=q.n*(q.h+(b.rest||60));return;}if(it.test){t+=180;return;}
    var n=it.f?fSets(it.f):setsOf(it,b,c,id);t+=n*(40+(b.rest||0));});
  return t+wu;}
function estMin(s,c,id){var t=0;s.blocks.forEach(function(b){if(D.short&&b.p>1)return;t+=blockSec(b,c,id);});if(s.ab)t+=(s.ab.rounds/2+1)*60;return Math.round(t/60);}
/* Session design (A-013): every session is put together so that its estimate lands in the 60–90 min band. Nothing is
   trimmed afterwards and no trim list is shown. Precedence when shaping: warm-up, cool-down, anchor and a needed leg block
   > favourites and shoulder prevention > pure accessory work. Over 90 min pure accessory gives way first (fewer rounds,
   compact form), then circuit rounds, Core Blitz, emphasis extras, favourites down to 2; then the compact accessory goes,
   the long skill block takes its standard form, Shoulder stability its compact form, and finally secondary blocks. Under 60 min it adds sensible extras (favourites, emphasis, Core Blitz) but never filler.
   Limited time, deload, test and non-strength sessions are only kept under 90 min, never filled up. */
var DURMAX=90,DURLO=60,DURMIN=45,BANDIDS={KA:1,KB:1,KC:1,CH:1,HO:1};
function isFavIt(it){var v=curVar(it,LOC());return v>=0&&(D.fav||[]).indexOf(it.opts[v].n)>=0;}
function shMini(b){if(b.shm)return false;b.shm=1;b.items=b.items.slice(0,2);b.rounds=[2,2];b.name="Shoulder stability";b.info="Compact · 2 exercises back to back · 60 s rest after the round";return true;}
/* Limited time keeps a needed leg block (week < 2 leg sessions or Strength C over 7 days ago). One upper-body round goes instead. */
function shortLegs(s,c){var lb=s.blocks.filter(function(b){return b.legs;})[0];if(!lb||!c.legB)return;lb.p=1;
  s.blocks.some(function(b){if(b.p===1&&b.rounds&&!b.legs&&!b.lowb&&!b.warm&&!b.cool&&b.rounds[0]>2){b.rounds=[b.rounds[0]-1,b.rounds[0]-1];return true;}});}
function design(s,id,c){s.ab=absFor(id);
  function blk(f){return s.blocks.filter(f)[0];}
  function est(){return estMin(s,c,id);}
  function drop(f){for(var j=s.blocks.length-1;j>=0;j--){if(f(s.blocks[j])){s.blocks.splice(j,1);return true;}}return false;}
  var free=function(b){return !b.warm&&!b.cool&&!b.legs&&!b.lowb&&!b.fav&&!b.sh&&!b.acc;};
  var trim=[
    function(){var ch=false;s.blocks.forEach(function(b){if(b.acc&&b.rounds&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){var b=blk(function(x){return x.acc&&!x.accm&&/Kickboxing|Power/.test(x.name);});if(!b)return false;var k=b.items.filter(function(it){return it.k==="kp_cop"||/Neck/.test(it.opts[0].n);});if(!k.length||k.length===b.items.length)return false;b.items=k;b.accm=1;b.info="Compact · tendons, adductors and neck · 60 s rest";return true;},
    function(){var b=blk(function(x){return x.acc&&!x.accm&&x.name==="Forearms & elbows";});if(!b)return false;b.items=b.items.slice(0,1);b.accm=1;b.info="Compact · protects the tendons for false grip and muscle-ups";return true;},
    function(){var ch=false;s.blocks.forEach(function(b){if(b.p>1&&b.rounds&&!b.lowb&&!b.legs&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){var ch=false;s.blocks.forEach(function(b){if(b.rounds&&!b.lowb&&!b.legs&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){if(s.ab&&!s.ab.mini){s.ab.rounds=4;s.ab.mini=true;return true;}},
    function(){if(s.ab){s.ab=null;return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.rounds&&b.rounds[1]>2){b.rounds=[2,2];return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.items.length>1){var a=b.items.filter(function(it,i){return it.anc||isFavIt(it)||(i===0&&!b.items.some(function(x){return x.anc;}));});if(a.length<b.items.length){b.items=a;return true;}}},
    function(){var b=blk(function(x){return x.fav;});if(b&&b.items.length>2){b.items=b.items.slice(0,2);b.info="2 today, they take turns · 60–90 s rest";return true;}},
    function(){return drop(function(b){return b.acc&&b.name==="Forearms & elbows";});},
    function(){return drop(function(b){return b.acc;});},
    function(){var j=-1;s.blocks.forEach(function(b,x){if(b.lng&&j<0)j=x;});if(j<0)return false;var o=s.blocks[j],nb=SKB(o.lng[0],false,o.lng[1]);if(FAVIDS[id])favDef(nb);s.blocks[j]=nb;return true;},
    function(){var b=blk(function(x){return x.sh;});return b?shMini(b):false;}];
  for(var r=0;r<8;r++)trim.push(function(){return drop(function(b){return b.p>=2&&free(b);});});
  /* Last resort, only once all pure accessory work is gone: one favourite today. */
  trim.push(function(){var b=blk(function(x){return x.fav;});if(b&&b.items.length>1&&!blk(function(x){return x.acc;})){b.items=b.items.slice(0,1);b.info="1 today, they take turns · 60–90 s rest";return true;}});
  s.min=est();
  for(var i=0;i<trim.length&&s.min>DURMAX;i++){if(trim[i]())s.min=est();}
  if(D.short||!BANDIDS[id]||c.cyc===6)return s;
  /* Under 60 min: sensible extras only, each kept only if the session stays within 90 min. */
  var fill=[
    function(){var b=blk(function(x){return x.fav;});if(b&&b.more&&b.more.length&&b.items.length<6){b.items.push(b.more.shift());return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.more&&b.more.length&&b.items.length<3){b.items.push(b.more.shift());return true;}},
    function(){if(s.ab&&s.ab.mini&&id!=="CH"){s.ab.rounds=8;s.ab.mini=false;return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.rounds&&b.rounds[0]<4){b.rounds=[4,4];return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.more&&b.more.length&&b.items.length<4){b.items.push(b.more.shift());return true;}}];
  for(var k=0;k<4;k++)fill.push(fill[0]);
  for(var j=0;j<fill.length&&s.min<DURLO;j++){var keep=s.blocks.map(function(b){return b.items.slice();}),ab0=s.ab&&{i:s.ab.i,rounds:s.ab.rounds,mini:s.ab.mini},rd=s.blocks.map(function(b){return b.rounds;});
    if(!fill[j]())continue;var m=est();
    if(m>DURMAX){s.blocks.forEach(function(b,x){var add=b.items.slice(keep[x].length);if(add.length&&b.more)b.more=add.concat(b.more);b.items=keep[x];b.rounds=rd[x];});s.ab=ab0;}else s.min=m;}
  return s;}
function S0(id,c){
  var ph=c.phase,L=lvl(),lf=c.legB!=null?!!c.legB:(c.lowFreq&&c.kcGap>=10),pr=D.profile,b;
  switch(id){
  case "KA":
    if(ph===1) b=[WARM(),HSB(),MUB(),
      {name:L===0?"Base strength":"Explosive strength",info:L===0?"Exercises back to back · 2 min rest after the round · 1–2 reps in reserve":"Exercises back to back · 2–3 min rest after the round · stop as soon as it slows down",p:1,rest:L===0?120:150,rounds:[3,4],items:[
        P("a_expu",3,6,"reps","Goal: chest over the bar",["Explosive pull-ups","Weighted vest explosive pull-ups||w","Explosive lat pulldown||w","Band-assisted pull-ups|b"],"vest or pull higher","",[3,1]),
        P("a_sbd",4,8,"reps","Lock out fully at the top",["Straight bar dips on a Smith machine","Weighted dips||w","Parallel bar dips|p","Ring-Dips|r","Negative parallel bar dips|p"],"add weight or go more explosive","",[4,1]),
        LSIT()]},
      {name:"Strength",info:"Exercises back to back · 90 s rest after the round",p:2,rest:90,rounds:[3,4],items:[
        P("a_pike",6,8,"reps","Head in front of the hands, feet elevated",["Deep Pike Push-Ups","Wall HSPU|w","Dumbbell shoulder press||w","Shoulder press machine||w","Pike push-ups, feet on the floor"],"feet higher or add weight","",[4,1]),
        P("a_row",6,12,"reps","Chest to the bar, body straight",["Underhand rows on bar/rings","Single-arm dumbbell row||w","Cable row||w"],"lower angle or more weight"),
        P("a_lat",10,12,"reps","Arms stay straight",["Cable straight-arm pulldown||w","Dumbbell pullover||w"],"more weight"),
        P("a_hyp",8,12,"reps","Tempo 2-0-1-2",["Hyperextension bench","Romanian deadlift||w","Reverse Hyperextension"],"add weight"),
        F("1 × 10/10/10 s","10 s down, 10 s hold, 10 s up",["Slow Push-Up"])]},
      SHOULDER(3,true)];
    else b=[WARM(),HSB(),MUB(),
      {name:"Strength",info:"Exercises back to back · 90 s rest after the round",p:1,rest:90,rounds:[3,4],items:[
        P("a2_dtp",6,12,"reps","Briefly lift the feet at the top",["Dips to tuck planche","Weighted dips||w","Parallel bar dips|p","Negative parallel bar dips|p"],"hold longer or more weight","",[3,1]),
        P("a2_wpu",6,12,"reps","",["Wide pull-ups","Weighted pull-ups||w","Wide lat pulldown||w","Band-assisted pull-ups|b"],"add weight","",[3,1]),
        P("a2_fl",8,15,"reps","Shoulders in front of the bar",["Straight bar dips on a Smith machine, leaning forward","Ring-Dips|r","Parallel bar dips, leaning forward|p"],"lean further forward"),
        P("a2_row",8,15,"reps","Tempo 2-0-1-2",["Bodyweight Rows","Cable row||w","T-bar row||w"],"lower angle or more weight")]},
      {name:"Transitions",info:"Exercises back to back · 90 s rest",p:2,rest:90,rounds:[3,4],items:[
        F(L===0?"3/2/1, hands elevated":"3/2/1 → 6/5/4/3/2/1","From L-sit into a push-up and back",["L-sit to push-up"]),
        P("a2_com",6,12,"reps","",["Commando Pull-Ups","Archer Pull-Ups","Single-arm cable lat pulldown||w","Band-assisted pull-ups|b"],"add weight","",[3,1]),
        P("a2_ww",pr.pike>=15?2:4,pr.pike>=15?8:6,"reps","Pause briefly at the top",pr.pike>=15?["Wall HSPU|w","Wall Walks|w"]:["Wall Walks|w","Negative wall HSPU|w","Pike Walk-Ins"],"hold longer at the top"),
        P("a_hyp",8,12,"reps","Back extensors, tempo 2-0-1-2",["Hyperextension bench","Romanian deadlift||w","Reverse Hyperextension"],"add weight")]},
      SHOULDER(3,true)];
    if(lf) b.splice(b.length-1,0,LEGMINI(c.legWhy));
    return {goal:L===0?"Build pulling and support strength so pull-ups, dips and later muscle-ups are solid.":(L===2?"Consolidate muscle-ups and add weight, plus overhead pressing strength.":(ph===1?"Explosiveness and transition for the first clean muscle-up, plus overhead pressing strength.":"Transitions and support strength: dip to tuck planche, L-sit to push-up.")),blocks:b};
  case "KB":
    if(ph===1) b=[WARM(),HSB(false,2),
      {name:"Muscle-up transition",info:"2 min rest",p:1,rest:120,items:[
        P("b_neg",4,8,"reps","Support at the top, lower as slowly as possible",["Transition negatives on a Smith machine, feet assist","5 s negative pull-ups alternating with straight bar dips","Negative Ring-Muscle-Ups|r","Negative pull-ups|k"],"less foot assist","3",[3,0])]},
      {name:"Circuit",info:"Exercises back to back · 90 s rest after the round",p:1,rest:90,rounds:[3,5],items:[
        P("b_fr",2,5,"reps","Pauses at the top, 90° and 120°, 5 s each",["Frenchie Chin-Ups","Underhand lat pulldown with pauses||w","Band-assisted chin-ups, hold at the top|b"],"longer pauses","",[1,0]),
        P("b_pu",8,15,"reps","",["Dumbbell bench press||w","Chest press machine||w","Ring-Push-Ups|r","Diamond Push-Ups"],"more weight"),
        P("b_jump",10,15,"reps","",["Kettlebell Swings||w","Box Jumps","Jumping Squats"],"heavier or higher"),
        P("b_er",10,15,"reps","",["Explosive cable row||w","Explosive Rows","Explosive band row|b"],"more weight"),
        P("b_pk",8,15,"reps","",["Landmine Press||w","Shoulder press machine||w","Pike Push-Ups"],"more weight"),
        P("b_gl",8,15,"reps","Tempo 4-0-2-2",["Barbell hip thrust||w","Hip thrust machine||w","Single-leg glute bridges"],"more weight")]},
      SHOULDER(2,false),FOREARM()];
    else b=[WARM(),HSB(false,2),
      {name:"Pull",info:"Exercises back to back · 90 s rest",p:1,rest:90,rounds:[3,4],items:[
        P("b2_sw",6,12,"reps","",["Pull-ups with grip changes","Weighted pull-ups||w","Close-grip lat pulldown||w","Band-assisted pull-ups|b"],"add weight","",[3,1]),
        P("b2_lr",6,12,"reps","Chest to the bar",["Cable row||w","L-Rows","T-bar row||w"],"more weight"),
        P("b2_cu",8,15,"reps","",["Dumbbell curls||w","Hammer Curls||w","Bodyweight Bar Curls"],"more weight"),
        F("1 × 5/5/5 → 30/30/30 s","Down, hold, up",["Slow Pull-Up","Slow lat pulldown"])]},
      {name:"Push",info:"Exercises back to back · 90 s rest",p:1,rest:90,rounds:[3,4],items:[
        P("b2_dl",6,10,"reps","",["Weighted dips||w","Dips to L-sit","Parallel bar dips|p","Negative parallel bar dips|p"],"more weight","",[3,0]),
        P("b2_dp",8,15,"reps","",["Dumbbell bench press||w","Chest press machine||w","Deep Push-Ups"],"more weight"),
        P("b2_tr",8,15,"reps","",["Cable triceps pushdown||w","SZ French Press||w","Bodyweight triceps extensions"],"more weight"),
        P("b2_am",20,60,"reps total","As many clean reps as possible in 10 min",["Push-Ups AMRAP 10 min","Ring-Push-Ups AMRAP 10 min|r"],"rings or feet elevated","1")]},
      SHOULDER(2,false),FOREARM(),KPOW()];
    if(lf) b.splice(b.length-1,0,LEGMINI(c.legWhy));
    return {goal:ph===1?"Learn the muscle-up transition from the top down and build strength endurance in a circuit.":"Lots of clean pulling and pushing volume as the base for multiple muscle-ups.",blocks:b};
  case "KC": return {goal:"Legs for running and kicks, plus slow upper-body strength endurance and kickboxing power.",blocks:[WARM(),HSB(true),
    {name:"Legs",info:"Exercises back to back · 90 s rest",p:1,rest:90,rounds:[3,4],items:[
      P("c_sq",6,10,"reps","",["Barbell back squat||w","Dumbbell Bulgarian split squat||w","Leg press||w","Assisted pistol squat"],"more weight","",[2,0]),
      P("c_rdl",8,12,"reps","Hips back, back straight",["Romanian deadlift||w","Leg curl machine||w","Nordic Curls"],"more weight"),
      P("c_lu",8,12,"each side","Explosive for kicks",["Dumbbell walking lunges||w","Box Jumps","Switching Lunges"],"more weight"),
      P("c_calf",12,15,"reps","",["Standing calf raises||w","Single-leg calf raises on a step"],"more weight")]},
    {name:"Running prehab",info:"2 sets · 45 s rest",p:2,rest:45,items:[
      P("c_gm",12,20,"each side","Hip abductors: stabilise the knee when running",["Abductor machine||w","Lateral band walks|b","Side-lying leg raises"],"stronger band or add weight","2"),
      P("c_tib",15,25,"reps","Shin muscle: back against a wall, pull the toes up",["Wall tibialis raises","Weighted tibialis raises||w"],"heels further from the wall","2")]},
    {name:"Upper body, slow",info:"Tempo 4-1-2-1 · 90 s rest",p:2,rest:90,rounds:[3,3],items:[
      P("c_pu",8,12,"reps","Hold 5 s at the top",["Pull-ups + hold at the top","Weighted pull-ups||w","Lat pulldown with holds||w","Band-assisted pull-ups|b"],"add weight","",[3,1]),
      P("c_dip",8,15,"reps","",["Dips","Weighted dips||w","Negative parallel bar dips|p"],"add weight","",[2,1]),
      P("c_rf",8,12,"reps","Anti-hunchback",["Reverse Butterfly||w","Dumbbell reverse flyes||w","Ring reverse flyes|r"],"more weight")]},
    KPOW()]};
  case "CH": b={goal:"A check-in every two weeks. Note time and clean attempts in the note.",blocks:[WARM(),
    {name:"Muscle-Up EMOM",info:"2 attempts every minute for 10 minutes",p:1,rest:0,items:[F("10 × 2",L===0?"Basic: 2 negative pull-ups each":"Sloppy? Switch to transitions",L===0?["Negative pull-ups"]:["Explosive chest-to-bar pull-ups","Transition on a Smith machine","Strict muscle-ups (high bar)","Ring muscle-up with foot assist"])]},
    {name:"Block 2",info:"60 s rest between exercises",p:1,rest:60,items:[F("60 s accumulated","",["Tuck Front Lever","Straight-arm pulldown hold"]),F("30","",["Push-Ups"]),F("5","5 s lowering",["Negative Dragon Flags","Lying leg lowers (easier)"])]},
    {name:"Block 3",info:"60 s rest",p:1,rest:60,items:[F("60 s accumulated","",["Tuck planche on parallettes","Planche lean (easier)"]),F("30","",["Bodyweight Rows","Cable row"]),F("5","",["Negative Dragon Flags","Lying leg lowers (easier)"])]},
    {name:"Block 4",info:"60 s rest",p:1,rest:60,items:[F("60 s accumulated","",["Tuck Back Lever","Reverse hyperextension hold"]),F("30","",["Jumping Squats"]),F("5","",["Negative Dragon Flags","Lying leg lowers (easier)"])]}]};
    if(lf) b.blocks.push(LEGMINI(c.legWhy));
    return b;
  case "SK": return {goal:"Calm technique session. Everything clean, nothing to failure.",blocks:[WARM(),HSB(true),
    {name:"L-sit & grip",info:"10 min",p:1,rest:60,items:[LSIT(),F("3 × 20–30 s","",["False grip hang","Active Hang"]),P("s_hang",30,60,"s","Shoulders active",["Active Hang"],"start single-arm","2")]},
    SHOULDER(2,true)]};
  case "RS": return {goal:"Active recovery. Costs little energy and gives higher kicks.",blocks:[KM_ACT()]};
  case "HO": return {goal:"Strength at home. Exercises match what you have at home.",blocks:[WARM(),
    {name:"Handstand foundations",info:"10 min",p:1,rest:60,items:[
      I("hsw","Hips over the shoulders",["Chest-to-wall hold|w","Pike handstand, feet on a chair|s","Pike handstand, feet on the floor"]),
      F("3 × 20 s","Balance on your hands",["Frogstand / Crow"]),
      P("h_pike",6,12,"reps","Head in front of the hands",["Pike push-ups, feet on a chair|s","Pike Push-Ups","Dumbbell shoulder press|d|w"],"feet higher","3")]},
    {name:"Circuit",info:"Exercises back to back · 60 s rest after the round",p:1,rest:60,rounds:[3,4],items:[
      P("h_pull",4,10,"reps","",["Pull-ups|k","Band row|b","Table rows","Dumbbell row|d|w"],"slower or a vest"),
      P("h_pu",8,20,"reps","",["Archer Push-Ups","Diamond Push-Ups","Pseudo-Planche Push-Ups","Push-ups on parallettes|p","Knee push-ups"],"harder variation","",[4,2]),
      P("h_sq",6,12,"each side","",["Bulgarian split squat, foot on a chair|s","Goblet Split Squat|d|w","Cossack Squats","Pistol squat holding a door"],"slower or add weight"),
      P("h_dip",6,15,"reps","",["Dips between two chairs|s","Dips on parallettes|p","Close-grip triceps push-ups"],"feet elevated"),
      P("h_ham",8,15,"reps","",["Single-leg glute bridge","Romanian deadlift|d|w","Nordic curls, feet under the sofa"],"slower")]},
    {name:"Shoulder stability",info:"2 sets",p:2,rest:45,items:[P("h_fp",10,20,"reps","",["Band Pull-Aparts|b","Prone Y-T-W"],"stronger band","2"),P("sh_er",10,15,"each side","Elbow at your side",["Band external rotation|b","Side-lying dumbbell external rotation|d|w","Side-lying external rotation, no weight"],"stronger band","2"),P("sh_sa",8,12,"reps","Shoulders far forward at the top",["Scapula Push-Ups Plus"],"slower","2")]}]};
  case "HK": return {goal:"Technique at home: your skills, support and shoulders.",blocks:[
    {name:"Handstand",info:"15 min",p:1,rest:60,items:[
      F("3 × 3","",["Wall Walks|w","Pike Walk-Ins"]),
      I("hsw","Shoulders to the ears",["Chest-to-wall hold|w","Pike handstand, feet on a chair|s","Pike handstand, feet on the floor"]),
      F("3 × 8","",["Wall handstand shrugs|w","Pike shrugs"]),
      F("5 × 15 s","",["Frogstand / Crow"])]},
    {name:"L-sit & support",info:"10 min",p:1,rest:60,items:[LSIT(),P("hk_pl",15,40,"s","Lean the shoulders in front of the hands",["Planche Lean"],"lean further forward","3"),P("sh_sa",8,12,"reps","",["Scapula Push-Ups Plus"],"slower","2")]}]};
  case "DL": return {goal:"Deload week: train light so the test is honest. Nothing to the limit.",blocks:[WARM(),
    {name:"Resistance Deload",info:"3 rounds, all easy · 60–90 s rest",p:1,rest:75,items:[F("6–10","",["Chin-Ups","Underhand lat pulldown","Band-assisted pull-ups"]),F("8–15","",["Dips","Straight bar dips on a Smith machine","Band-assisted dips"]),F("5–10","",["Bodyweight Rows","Cable row"]),F("5 each side","",["Bulgarian Split Squat"]),F("15/15/15 s","",["Slow Push-Up"]),F("15 s","",["L-Sit","Tuck L-Sit"])]},
    {name:"Easy handstand",info:"",p:2,rest:60,items:[F("3 × 15 s","",["Chest-to-wall hold","Pike handstand"])]}]};
  case "TE": return {goal:"Test all values. What you enter becomes your new status right away.",blocks:[WARM(),
    {name:"Test",info:"2–3 min rest between tests · only clean reps count",p:1,rest:150,items:[
      T("pull","reps",["Clean pull-ups"]),T("dips","reps",["Dips"]),T("expl","reps",["Explosive chest-to-bar pull-ups"]),T("mu","reps",["Clean muscle-ups"]),
      T("tuck","s",["Tuck L-sit hold"]),T("lsit","s",["Straight-leg L-sit hold"]),T("hsw","s",["Chest-to-wall handstand"]),T("hsf","s",["Freestanding handstand"]),T("pike","reps",["Pike Push-Ups"]),T("hang","s",["Active Hang"])]}]};
  }
}
var ABS=[
 {n:"Anti-Extension",items:[F("20 s","Low back stays on the floor",["Hollow Rocks","Hollow Body Hold","Fast dead bugs"]),F("20 s","Glutes tight, do not sag",["Plank with shoulder taps","Body Saw","Slow mountain climbers","Ab Wheel Rollouts|g"])]},
 {n:"Compression",items:[F("20 s","Raise the straight legs, hands next to the knees",["Seated Pike Compressions","Tuck-Ups"]),F("20 s","No swinging",["Lying leg raises","V-Ups","Hanging Knee Raises|k"])]},
 {n:"Rotation (kickboxing)",items:[F("20 s","The ribcage rotates, not just the arms",["Russian Twists","Weighted Russian twists|d"]),F("20 s","Elbow to opposite knee, extend fully",["Bicycle Crunches","Windshield wipers, knees bent","Side plank dips, switch sides each round"])]},
 {n:"Posterior chain",items:[F("20 s","Arms and legs long, eyes to the floor",["Arch Body Rocks","Superman pulses","Swimmers"]),F("20 s","Hips up, pelvis still",["Glute bridge march","Fast bird dogs","Reverse Hyperextension|g"])]}
];

/* ================= Vorgaben aus den letzten Einträgen ================= */
function target(it,v){
  var o=it.opts[v], st=D.ex[it.k+"#"+v], isS=it.unit.indexOf("s")===0, step=isS?(it.hi-it.lo>=20?5:2):1, w=null;
  if(!st) return {r:it.lo,w:null,note:"",first:true};
  w=st.w||null; var gap=diff(patLast(it.k,st.d),TODAY), inc=w&&w>=40?5:2.5;
  if(gap>=14){var back=gap>28?2:1, r0=Math.max(1,Math.min(it.hi,st.r)-back*step), w0=(o.w&&w)?Math.max(0,w-back*inc):w;
    return {r:r0,w:w0,note:"Last entry "+gap+" days: "+(back===2?"two steps":"one step")+" back."};}
  if(st.hold) return {r:Math.min(it.hi,Math.max(st.r,1)),w:w,note:"At the limit last time: same target."};
  if((st.stall||0)>=3) return {r:Math.min(it.hi,Math.max(st.r,1)),w:w,note:"Three times without progress. Swap the variation, the blade needs a new edge.",low:true};
  if(st.r>=it.hi){ if(o.w&&w) return {r:it.lo,w:w+inc,note:"Last time "+st.r+" at "+fmtKg(w)+" kg: weight up.",top:true};
    return {r:it.hi,w:w,note:"Top of the range reached"+(it.up?". Next step: "+it.up:"")+". If it stays easy, swap the variation.",top:true}; }
  if(st.r<it.lo){ if(o.w&&w) return {r:it.lo,w:Math.max(0,w-inc),note:"Last time only "+st.r+": weight down.",low:true};
    return {r:Math.max(1,st.r+1),w:w,note:"Below the range. Easier variation or band via “Swap” until "+it.lo+" are clean.",low:true}; }
  return {r:Math.min(it.hi,st.r+step),w:w,note:"Last time "+st.r+(o.w&&w?" at "+fmtKg(w)+" kg":"")+"."};
}
function setsOf(it,b,c,id){ if(b&&b.rounds) return rounds(b,c,id); var n=parseInt(String(it.sets),10); return isNaN(n)?1:n; }

/* ================= Empfehlung ================= */
function onDay(s){return D.logs.filter(function(l){return l.d===s;});}
function since(id,s){var m=Infinity;D.logs.forEach(function(l){if(l.id===id&&l.d<s){var x=diff(l.d,s);if(x<m)m=x;}});return m;}
function isTrain(l){return l.id!=="MO";}
function ctx(s){
  var n=Math.floor(Math.max(0,diff(D.start,s))/7),wk=0;
  for(var w=0;w<=n;w++){var a=addD(D.start,7*w),z=addD(a,6);
    if(w===n||D.logs.some(function(l){return isTrain(l)&&l.d>=a&&l.d<=z;}))wk++;}
  var h=hist(s);
  var lowE=emph()==="lower"||emph()==="glutes",kcOld=h.KC>7,legB=!lowE&&(kcOld||h.legW<2);
  return {week:wk,cyc:(wk-1)%6+1,phase:((wk-1)%12)<6?1:2,lowFreq:h.lowFreq,kcGap:Math.min(h.KC,h.CH),legB:legB,legWhy:kcOld?"kc":"week"};
}
function hist(s){
  var h={},y=onDay(addD(s,-1));
  ["KA","KB","KC","CH","RE","RH","RI","DL","TE","HO","SK","KI","RS"].forEach(function(k){h[k]=since(k,s);});
  h.C=Math.min(h.KC,h.CH);
  h.strY=y.some(function(l){return STR[l.id];}); h.kcY=y.some(function(l){return l.id==="KC";});
  h.rhY=y.some(function(l){return l.id==="RH"||l.id==="RI";}); h.limitY=y.some(function(l){return HARD[l.id]&&(l.rpe||0)>=10;});
  h.hardRun=0; for(var i=1;i<=4;i++){if(onDay(addD(s,-i)).some(function(l){return HARD[l.id]&&(l.rpe||6)>=6;}))h.hardRun++;else break;}
  h.hsN=D.logs.filter(function(l){var x=diff(l.d,s);return x>=0&&x<=6&&HASHS[l.id];}).length;
  h.runs7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=7&&isRun(l);}).length;
  h.str7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=6&&STR[l.id];}).length;
  h.lim7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=7&&(l.rpe||0)>=10&&HARD[l.id];}).length;
  h.skN=D.logs.filter(function(l){var x=diff(l.d,s);return x>=0&&x<=6&&(l.sk?l.sk.length>0:!!HASHS[l.id]);}).length;
  h.skT=selSk().length?4:0; h.hardR=Math.min(h.RH,h.RI);
  h.run=Math.min(h.RE,h.RH,h.RI);
  var td=onDay(s); h.ranToday=td.some(isRun); h.strToday=td.some(function(l){return STR[l.id];});
  var first=D.logs.filter(isTrain)[0], days={};
  D.logs.forEach(function(l){var x=diff(l.d,s);if(isTrain(l)&&x>=1&&x<=14)days[l.d]=1;});
  h.lowFreq=!!first&&diff(first.d,s)>=14&&Object.keys(days).length<=7;
  var w0=addD(D.start,7*Math.floor(Math.max(0,diff(D.start,s))/7));h.legW=D.logs.filter(function(l){return l.d>=w0&&l.d<s&&legLog(l);}).length;
  return h;
}
/* Leg sessions (V1, A-009): legs at least twice per training week (weeks count from D.start, like ctx()). Strength A/B (and the
   challenge, which stands in for Strength C) get the compact leg block while Strength C is more than 7 days old or the week has fewer than 2 leg sessions so far. A session counts when it holds ≥ 6 direct lower-body working sets
   (Strength C, home strength, a compact leg block or a lower/glute emphasis block). Old logs without "lg": KC and HO count. */
var LEGK=/^(fav_|mx_)*(c_sq|c_rdl|c_lu|c_calf|g_[a-z0-9]+|h_sq|h_ham|b_gl)$/;
function legSets(s,c,id){var n=0;s.blocks.forEach(function(b){if(D.short&&b.p>1)return;b.items.forEach(function(it){if(it.f||it.iso||it.test||!LEGK.test(it.k)||curVar(it,LOC())<0)return;n+=setsOf(it,b,c,id);});});return n;}
function legLog(l){return l.lg!=null?!!l.lg:(l.id==="KC"||l.id==="HO");}
function ago(n){return n===Infinity?"still to do":(n===1?"was yesterday":"last done "+n+" days ago");}
function cap(n){return n===Infinity?21:Math.min(n,21);}
function isRun(l){return l.id==="RE"||l.id==="RH"||l.id==="RI";}
function skPick(h,why){return {btn:"train",id:"SK",why:why+" Today technique: "+selSk().map(function(k){return SKN[k];}).join(", ")+"."};}
var SKN={hs:"Handstand",mu:"Muscle-Up",ls:"L-Sit",fl:"Front Lever",pl:"Planche"};
function easyPick(h,why){
  var F=D.focus;
  if(F==="run"&&h.runs7<5&&h.run>=1&&!h.ranToday) return {btn:"run",id:"RE",why:why+" Today just an easy run, very relaxed."};
  if(F==="bal"&&h.runs7<2&&h.run>=1&&!h.rhY&&!h.ranToday) return {btn:"run",id:"RE",why:why+" Today just an easy run."};
  if(h.skN<h.skT) return skPick(h,why);
  if(F!=="str"&&h.runs7<3&&h.run>=2&&!h.rhY&&!h.ranToday) return {btn:"run",id:"RE",why:why+" Today just an easy run."};
  return {btn:"train",id:"RS",why:why+" Today recovery and mobility."};
}
function recAll(s,noKick){
  var h=hist(s),c=ctx(s),td=onDay(s),F=D.focus,kickT=isKick(addD(s,1));
  if(isKick(s)&&!noKick&&!td.some(function(l){return l.id==="KI";})) return {btn:"kick",id:"KI",why:"Today is kickboxing day."};
  if(h.rhY) return easyPick(h,"Yesterday was a hard run.");
  if(h.limitY) return easyPick(h,"Yesterday was at the limit.");
  if(h.lim7>=3&&h.RS>=3) return {btn:"train",id:"RS",why:"Three hard sessions at the limit in 7 days: today is a rest day with light mobility. Progress happens while you recover."};
  if(h.hardRun>=3) return easyPick(h,"Three hard days in a row.");
  var strOK=!h.strY&&!h.strToday&&(F!=="run"||h.str7<2);
  if(c.cyc===6){
    if(strOK&&h.DL>=6&&h.TE>=6) return {btn:"train",id:"DL",why:"Week "+c.week+" is a deload week."};
    if(strOK&&h.TE>=6&&h.DL>=2) return {btn:"train",id:"TE",why:"Deload done, now test your bests."};
    if(F!=="str"&&h.RE>=2&&!h.ranToday) return {btn:"run",id:"RE",why:"Deload week: easy running only."};
    return easyPick(h,"Deload week.");
  }
  var C=[],W={bal:{KA:10,KB:9,C:8,RH:7,RE:6,RI:0},str:{KA:10,KB:9,C:9,RH:0,RE:0,RI:0},run:{KA:7,KB:6,C:7,RH:8,RE:9,RI:8}}[F]||{},mS=F==="str"?4:6;
  var em0=emph();
  if(em0==="lower"||em0==="glutes"){W={KA:W.KA-1,KB:W.KB-1,C:(W.C||8)+3,RH:W.RH,RE:W.RE,RI:W.RI};}
  else if(em0==="upper"){W={KA:W.KA+1,KB:W.KB+1,C:Math.max(1,(W.C||8)-2),RH:W.RH,RE:W.RE,RI:W.RI};}
  function add(id,btn,wt,since,ok,why,min){ if(wt&&ok&&since>=(min||6)) C.push({id:id,btn:btn,sc:wt*cap(since)/7,why:why}); }
  var hardOK=!h.kcY&&!h.ranToday&&!kickT;
  add("KA","train",W.KA,h.KA,strOK&&!h.ranToday,"Strength A "+ago(h.KA)+".",mS);
  add("KB","train",W.KB,h.KB,strOK,"Strength B "+ago(h.KB)+".",mS);
  var lowE=em0==="lower"||em0==="glutes",kcId=(!lowE&&h.CH>=13&&h.KC<h.CH)?"CH":"KC";
  add(kcId,"train",W.C,lowE?h.KC:h.C,strOK&&!kickT&&!(F==="run"&&h.hardR<=1),kcId==="CH"?"The skill trial has been due for 2 weeks.":"Legs and full body "+ago(h.C)+".",mS);
  add("RH","run",W.RH,h.RH,hardOK,(F==="run"?"Long run ":"Hard run ")+ago(h.RH)+".");
  add("RI","run",W.RI,h.RI,hardOK&&h.RH>=2,"Intervals "+ago(h.RI)+".",5);
  add("RE","run",W.RE,h.RE,!h.ranToday&&h.runs7<(F==="run"?5:3),"Easy run "+ago(h.RE)+".",F==="run"?2:3);
  C.sort(function(a,b){return b.sc-a.sc;});
  if(C.length){var w=C[0];return {btn:w.btn,id:w.id,why:w.why};}
  if(h.skN<h.skT) return skPick(h,"Weekly goals are met. Skill training only "+h.skN+"× in 7 days, the goal is "+h.skT+".");
  if(F!=="str"&&h.runs7<3&&h.run>=2&&!h.ranToday) return {btn:"run",id:"RE",why:"Third run of the week, easy."};
  return {btn:"train",id:"RS",why:"All weekly goals are met. Today mobility."};
}
function recTrain(s,loc,noKick){
  var r=recAll(s,noKick),h=hist(s),c=ctx(s),strOK=!h.strY&&!h.strToday&&!h.rhY&&!h.limitY&&h.hardRun<3;
  if(r.btn==="train"&&r.id!=="RS"){
    if(loc==="g") return r;
    if(STR[r.id]) return {id:"HO",why:"Today without the gym: "+r.why};
    return {id:"HK",why:r.why};
  }
  if(loc==="h") return strOK&&Math.min(h.KA,h.KB,h.HO)>=3&&c.cyc!==6?{id:"HO",why:"Strength "+ago(Math.min(h.KA,h.KB,h.HO))+"."}:{id:"HK",why:"Today only technique at home."};
  if(r.id==="RS") return r;
  if(!strOK||c.cyc===6) return {id:h.skN<h.skT?"SK":"RS",why:"No heavy strength training today."};
  var best=[["KA",h.KA],["KB",h.KB],["KC",h.C]].filter(function(x){return !(x[0]==="KA"&&h.ranToday);}).sort(function(a,b){return cap(b[1])-cap(a[1]);})[0];
  if(best&&best[1]>=3) return {id:best[0],why:(h.ranToday&&best[0]!=="KA"?"Already ran today, so not Strength A. ":"")+NAMES[best[0]]+" "+ago(best[1])+"."};
  return {id:selSk().length?"SK":"RS",why:"Strength sessions were done recently. Today "+(selSk().length?"technique.":"mobility.")};
}
function absFor(id){
  var i=D.abs%ABS.length; if((id==="KA"||id==="SK"||id==="HK")&&i===1) i=2; if(id==="KC"&&i===2) i=3;
  var mini=id==="CH"||id==="TE"||id==="DL"||D.short;
  return {i:i,rounds:mini?4:8,mini:mini};
}
function COOLS_KICK(){return COOLS.kick.items.map(function(x){return F(x[1],x[2],[x[0]]);});}
/* ================= Morning routine (home, mat, right after waking) =================
   Built on: gentle start without deep loaded spinal flexion in the first hour (discs are fully hydrated after sleep),
   RAMP order (raise, activate, mobilise), daily CARs for joint health, then one focus module by need. */
var MPH={
 wake:{n:"Wake up",info:"lying on the mat",items:[["Supine belly breathing","5 slow breaths","Hands on belly, breathe into them, long exhale"],["Pelvic tilts","10","Small and slow: flatten the low back, then arch gently"],["Glute bridge","10 × 2 s","Squeeze the glutes at the top, ribs stay down"]]},
 raise:{n:"Raise",info:"get warm",items:[["March in place with arm swings","60 s","Knees to hip height, swing the arms"],["Arm circles","10 each way","Big, relaxed circles"],["Hip hinge, hands on hips","10","Push the hips back, back stays long"]]},
 cars:{n:"Joint circles",info:"CARs · slow and controlled",items:[["Neck CARs","3 each way","Slow circle, the rest of the body stays still"],["Shoulder CARs","3 each side","Biggest circle you can, ribs do not move"],["Hip CARs on all fours","3 each side","The knee draws a big circle, back stays flat"],["Wrist and ankle circles","10 each way",""]]},
 fin:{n:"Finish",info:"stand tall",items:[["Overhead reach","3 breaths","Reach high, ribs down, feel tall"]]}
};
var MMOD={
 desk:{n:"Desk antidote",why:"Daily: upper back, neck and shoulders against hours at the desk.",items:[["Sphinx","5 × 3 breaths","Pull the chest forward, shoulders away from the ears"],["Quadruped T-spine rotation","6 each side","Hand behind the head, open the elbow to the ceiling"],["Open book","6 each side","Knees stay together, follow the hand with your eyes"],["Prone Y raises","3 × 5 breaths","Thumbs up, eyes to the floor"],["Chin tucks lying","10 × 5 s","Slide the chin straight back, make a double chin"],["Floor angels","8","Back of the hands slide along the floor"]]},
 hips:{n:"Hips",why:"",items:[["Half-kneeling hip flexor stretch","45 s each side","Squeeze the back glute, tuck the pelvis"],["90/90 windshield wipers","8 each side","Knees fall side to side, chest stays tall"],["World's greatest stretch","4 each side","Lunge, hand down, then rotate the other arm up"],["Adductor rock-back","8 each side","One leg out to the side, rock the hips back"],["Cossack squat","5 each side","Heel down, straight leg toes up"]]},
 shoulders:{n:"Shoulders & wrists",why:"",items:[["Wrist prep on all fours","60 s","Fingers forward, sideways, backward. Lean gently"],["Scapular push-ups","10","Arms straight, only the shoulder blades move"],["Thread the needle","5 each side","Slide the arm under, shoulder to the mat"],["Puppy pose","45 s","Hips over knees, chest sinks to the floor"]]},
 ankles:{n:"Ankles & calves",why:"",items:[["Half-kneeling ankle rocks","10 each side","Knee travels over the toes, heel stays down"],["Downward dog calf pedals","45 s","Press one heel down, then the other"],["Heel and toe walks","30 s each","Tall posture, small steps"]]},
 rec:{n:"Easy recovery",why:"",items:[["Legs-up breathing","60 s","Legs up, long slow exhales"],["Supine figure-4 stretch","40 s each side","Pull the thigh in, keep the head down"],["Gentle supine twist","30 s each side","Let the knees fall, shoulders stay on the mat"]]}
};
var MNEED={RE:["ankles","hips"],RH:["ankles","hips"],RI:["ankles","hips"],KC:["hips","ankles"],KI:["hips"],KA:["shoulders"],KB:["shoulders"],SK:["shoulders"],HO:["shoulders"],HK:["shoulders"],CH:["shoulders","hips"],TE:["shoulders","hips"],DL:["shoulders"]};
function mLast(k,s){for(var i=D.logs.length-1;i>=0;i--){var l=D.logs[i];if(l.id==="MO"&&l.d<s&&l.m&&l.m.indexOf(k)>=0)return diff(l.d,s);}return 9;}
function morning(s){
  var r=recAll(s,day(s).noKick),y=onDay(addD(s,-1)),sc={hips:0,shoulders:0,ankles:0,rec:0},why=[];
  (MNEED[r.id]||[]).forEach(function(k,i){sc[k]+=i?1.5:3;});
  y.forEach(function(l){(MNEED[l.id]||[]).forEach(function(k,i){sc[k]+=i?1:2;});if(l.id==="RH"||l.id==="RI"||(l.rpe||0)>=10)sc.rec+=4;});
  Object.keys(sc).forEach(function(k){sc[k]+=Math.min(mLast(k,s),5)*0.4;});
  var order=Object.keys(sc).sort(function(a,b){return sc[b]-sc[a];}),top=order[0],sec=order[1];
  var lab={RE:"an easy run",RH:"a hard run",RI:"intervals",KC:"legs",KI:"kickboxing",KA:"pulling and handstand",KB:"pushing and handstand",SK:"skill work",HO:"strength at home",HK:"skills at home",CH:"the challenge",TE:"test day",DL:"deload",RS:"recovery"};
  if(sc.rec>=4&&top==="rec") why.push("Yesterday was hard, so today starts with recovery.");
  else if(lab[r.id]) why.push("Today: "+lab[r.id]+". Focus: "+MMOD[top].n.toLowerCase()+".");
  var yl=y.filter(function(l){return lab[l.id];})[0]; if(yl&&top!=="rec") why.push("Yesterday: "+lab[yl.id]+".");
  var doy=Math.floor(pd(s).getTime()/864e5),dk=MMOD.desk.items,desk=[0,1,2].map(function(i){return dk[(doy+i*2)%dk.length];});
  return {r:r,top:top,sec:sec,why:why,desk:desk};
}
function mSections(m,short){
  var L=[];
  L.push({k:"wake",n:MPH.wake.n,info:MPH.wake.info,items:short?[MPH.wake.items[0],MPH.wake.items[2]]:MPH.wake.items});
  L.push({k:"raise",n:MPH.raise.n,info:MPH.raise.info,items:short?[MPH.raise.items[0]]:MPH.raise.items});
  L.push({k:"cars",n:MPH.cars.n,info:MPH.cars.info,items:short?MPH.cars.items.slice(1,3):MPH.cars.items});
  L.push({k:"desk",n:MMOD.desk.n,info:"anti-hunchback",items:short?m.desk.slice(0,2):m.desk});
  var t=MMOD[m.top];L.push({k:m.top,n:t.n,info:"focus today",items:short?t.items.slice(0,2):t.items});
  if(!short&&m.sec&&m.sec!==m.top){var s2=MMOD[m.sec];L.push({k:m.sec,n:s2.n,info:"short extra",items:s2.items.slice(0,1)});}
  L.push({k:"fin",n:MPH.fin.n,info:MPH.fin.info,items:MPH.fin.items});
  return L;
}
function poseRow(x,id2,dy){var on=!!dy.done[id2],pc=picFor(x[0]);
  return '<div class="ex pose'+(on?" done":"")+'"><input type="checkbox" id="c'+id2+'" data-a="done" data-id="'+id2+'"'+(on?" checked":"")+' aria-label="'+esc(x[0])+' done">'+(pc?'<div class="pw">'+pc+'</div>':'')+'<div class="exb"><label class="n" for="c'+id2+'">'+esc(x[0])+'</label><div class="tg">'+esc(x[1])+'</div>'+(x[2]?'<div class="c">'+esc(x[2])+'</div>':'')+(holdBtn(x[1])?'<div class="acts">'+holdBtn(x[1])+'</div>':'')+'</div></div>';}

/* ================= Cool-down: 5 min static stretching after every session =================
   About 30–45 s per stretch on warm muscles. Static stretching improves flexibility; gains level off around
   4 min per muscle group per session and 10 min per week, so a daily 5-minute cool-down adds up. */
var COOLS={
 up:{n:"after upper-body work",items:[["Passive dead hang","30 s","Relax the shoulders, let the body hang","g"],["Doorway chest stretch","30 s each side","Elbow at shoulder height, step through",""],["Kneeling lat stretch on a bench","45 s","Sink the chest, arms long","g"],["Wrist flexor stretch","30 s","Fingers point to the knees, lean back gently",""],["Overhead triceps stretch","30 s each side","Elbow up, other hand pulls gently",""],["Child's pose","45 s","Arms long, breathe into the back",""],["Puppy pose","45 s","Hips over knees, chest sinks",""]]},
 legs:{n:"after leg work",items:[["Couch stretch","45 s each side","Back knee down, squeeze that glute",""],["Pigeon pose","45 s each side","Hips square, chest tall",""],["Supine hamstring stretch","40 s each side","Leg straight, pull gently",""],["Standing calf stretch","30 s each side","Back heel down, knee straight","g"],["Butterfly stretch","45 s","Soles together, knees fall out",""],["Deep squat hold","45 s","Heels down, elbows push the knees out",""]]},
 run:{n:"after running",items:[["Standing calf stretch","30 s each side","Hands on a wall, tree or fence. Back knee straight, heel down",""],["Bent-knee calf stretch","30 s each side","Same stance, bend the back knee",""],["Half-kneeling hip flexor stretch","40 s each side","Squeeze the back glute",""],["Standing quad stretch","30 s each side","Knees together, hips forward",""],["Supine figure-4 stretch","40 s each side","Pull the thigh in",""],["Supine hamstring stretch","40 s each side","Leg straight, pull gently",""]]},
 kick:{n:"after kickboxing",items:[["Frog stretch","60 s","Knees wide, rock the hips back",""],["Pigeon pose","45 s each side","Hips square",""],["Half-kneeling hip flexor stretch","40 s each side","Squeeze the back glute",""],["Seated straddle reach","45 s","Long spine, reach to each foot",""],["Gentle supine twist","30 s each side","Shoulders stay down",""]]}
};
function coolItems(kind,loc,s){var c=COOLS[kind],doy=Math.floor(pd(s||TODAY).getTime()/864e5),it=c.items.filter(function(x){return !(x[3]==="g"&&(loc==="h"||loc==="m"));}),out=[];
  for(var i=0;i<Math.min(5,it.length);i++) out.push(it[(doy+i)%it.length]);
  return out.filter(function(x,i,a){return a.indexOf(x)===i;});}
function COOL(kind){return {name:"Cool-down",info:"5 min · "+COOLS[kind].n+" · hold, breathe slowly",p:1,rest:0,cool:kind,items:coolItems(kind,LOC()).map(function(x){return F(x[1],x[2],[x[0]]);})};}
var KM_POST={name:"Cool-down",info:"5 min · after kickboxing · hold, breathe slowly",p:1,rest:0,items:COOLS_KICK()};
var COOLK={KA:"up",KB:"up",SK:"up",HO:"up",HK:"up",CH:"legs",TE:"up",DL:"legs",KC:"legs"};

/* Short technique notes: first matching pattern wins. Families share one note. */
var HOWTO=[
 [/bail|cartwheel/i,"From the handstand, turn one hand and step down sideways like a cartwheel. Practise it near the wall until it is automatic."],
 [/hollow|plank|dead bug|mountain climber|bird dog|superman|swimmer|windshield|russian twist|v-up|sit-up|crunch|leg lower|leg raise|rocks/i,"Brace as if someone is about to poke your belly. Low back stays controlled, move slowly and breathe out on the effort."],
 [/muscle-up/i,"From a dead hang, pull explosively to the hips, lean the chest over the bar and push to straight arms. Control the way down. Only clean reps count."],
 [/transition/i,"Low bar, feet on the floor. Practise rolling the chest over the bar from pull to dip, slowly, with the feet helping."],
 [/explosive.*pull|chest-to-bar/i,"Pull as fast and high as you can, aim the chest or belly at the bar. Stop the set when the height drops."],
 [/negative pull|negative.*chin/i,"Jump or step to the top, chin over the bar, then lower as slowly as you can. Shoulders stay active down to the hang."],
 [/archer pull|commando|wide pull|pull-ups|chin-up|pull-up/i,"Hang with straight arms, pull the shoulder blades down first, then pull until the chin clears the bar. Lower under control, no swinging."],
 [/lat pulldown|straight-arm pulldown|pullover/i,"Chest up, pull the elbows down toward your hips. Shoulders stay away from the ears. Slow on the way up."],
 [/row/i,"Body or torso straight, pull the elbows back until the hands reach the ribs. Squeeze the shoulder blades, lower slowly."],
 [/front lever/i,"Hang with straight arms, press the bar down toward the hips and lift the body to horizontal. Ribs in, shoulder blades down. Tuck the knees as much as you need."],
 [/planche lean|pseudo-planche/i,"Hands turned out slightly, arms straight, lean the shoulders forward past the hands. Push the floor away, upper back round."],
 [/planche/i,"Hands on floor or parallettes, arms locked, lean forward until the feet lift. Push the floor away, round the upper back, knees as tucked as needed."],
 [/hspu|pike push|shoulder press|landmine press/i,"Press overhead: head moves forward through the arms at the top, elbows slightly in front. Lower under control."],
 [/chest-to-wall|handstand|wall walk|pike handstand|pike walk/i,"Hands shoulder-width, fingers spread, push tall through the shoulders. Ribs in, glutes tight, body in one line. Come down by stepping or cartwheeling out."],
 [/l-sit|tuck l-sit|l-rows/i,"Hands next to the hips, arms locked, push the shoulders down hard and lift the legs. Tuck the knees until you can straighten them."],
 [/dips to|ring-dips|dips/i,"Start at the top with straight arms, shoulders down. Lower until the shoulders are just below the elbows, chest slightly forward, then press up."],
 [/archer push|diamond push|deep push|push-ups|push-up|knee push/i,"Hands under the shoulders, body like a plank. Lower the chest to the floor with elbows about 45° from the body, press up. Knees on the floor if needed."],
 [/bench press|chest press/i,"Shoulder blades pulled back, feet planted. Lower to mid-chest, elbows about 45°, press up."],
 [/triceps|french press/i,"Elbows stay in place, only the forearms move. Full stretch at the bottom, lock out at the top."],
 [/curl/i,"Elbows at your sides, curl without swinging. Lower slowly, the way down builds the tendons."],
 [/face pull|reverse fly|reverse butterfly|pull-apart|y-raise|y-t-w/i,"Light weight. Pull back and slightly up, thumbs out, squeeze between the shoulder blades. No shrugging."],
 [/external rotation/i,"Elbow fixed at your side (or on your hip when lying). Rotate the forearm out slowly, back slowly. Light weight, no pain."],
 [/serratus|scapula push/i,"Arms straight, push the shoulder blades apart at the end, as if pushing the floor or wall away. Small but deliberate."],
 [/squat|lunge|leg press|split/i,"Knee follows the toes, heel stays down, chest up. Go as deep as you can with a neutral back, drive up through the whole foot."],
 [/romanian deadlift|hip thrust|glute bridge|hyperext|swing|nordic|leg curl/i,"Hinge at the hips with a long back. Drive the hips forward and squeeze the glutes at the top. Nordics: lower as slowly as possible."],
 [/calf raise|tibialis/i,"Full range: deep stretch at the bottom, pause at the top. Slow on the way down."],
 [/abductor|adductor|copenhagen|band walk|side-lying leg/i,"Hips level, slow and controlled. Feel the side or inside of the hip, not the lower back."],
 [/pallof|woodchop|rotation|medicine ball|landmine/i,"Power comes from the hips and trunk. Arms stay long, the core controls the rotation."],
 [/box jump|jumping|switching lunges/i,"Land softly with bent knees, step down from the box. Quality over count: stop when jumps get lower."],
 [/horse stance|side kick hold|leg raise/i,"Stand tall, hips square. Hold the position actively without leaning back."],
 [/active hang|hang/i,"Hang from the bar, pull the shoulders down away from the ears, arms straight. Breathe."]
];
function howto(name){for(var i=0;i<HOWTO.length;i++)if(HOWTO[i][0].test(name))return HOWTO[i][1];return "";}
/* A-015: EMOM and AMRAP stay as terms, but every place that uses them explains them briefly. */
var TERMS=[[/\bEMOM\b/,"EMOM = every minute on the minute: one set at the start of each minute, rest for the remainder."],[/\bAMRAP\b/,"AMRAP = as many reps as possible in the time."]];
function termNote(t){return TERMS.filter(function(x){return x[0].test(t||"");}).map(function(x){return x[1];}).join(" ");}

/* ================= Darstellung ================= */
var app=document.getElementById("app"), rendering=false, TB=null;
var TABS=[["start","Today"],["verlauf","Chronicle"],["stand","Status"],["mehr","More"]];
function tabs(){return TABS.map(function(t){return t[0]==="verlauf"?[t[0],W("chron")]:t;});}
function back(){return '<button type="button" class="lnk bk" data-tab="start">← Today</button>';}
function rpeHTML(f){return '<p class="q" id="rpeq">'+W("battle")+'</p><div class="seg" role="group" aria-labelledby="rpeq">'+[[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return '<button type="button" class="b'+(f.rpe===x[0]?" on":"")+'" data-a="rpe" data-v="'+x[0]+'" aria-pressed="'+(f.rpe===x[0])+'">'+x[1]+'</button>';}).join("")+'</div>';}
function painHit(name){var p=D.pain||{};return Object.keys(PAINRX).some(function(k){return p[k]&&PAINRX[k].test(name);});}
function setBoxes(id,n,inp,ph,isS,rest,last){
  var s=inp.s||[],h='';
  for(var i=0;i<n;i++) h+='<label>'+(n>1?(i+1)+'.':(isS?"Sec.":"reps"))+'<input type="number" inputmode="numeric" data-set="'+i+'" data-id="'+id+'" data-rest="'+rest+'" data-last="'+(last?1:0)+'" data-n="'+n+'" value="'+esc(s[i])+'" placeholder="'+ph+'" aria-label="Set '+(i+1)+(isS?" seconds":" reps")+'"></label>';
  return h;
}
function holdBtn(dose){var m=String(dose).match(/^(\d+)\s*s( each side| each)?$/);if(!m)return "";var sec=+m[1],sides=m[2]?2:1;
  return '<button type="button" class="lnk hold" data-a="hold" data-s="'+sec+'" data-sides="'+sides+'">▶ Hold '+sec+' s'+(sides>1?' × 2':'')+'</button>';}
function itemHTML(it,id,dy,loc,b,c,sid,last){
  var v=curVar(it,loc); if(v<0) return "";
  var o=it.opts[v], a=avail(it,loc), on=!!dy.done[id], sk=!!dy.skip[id], inp=dy.inp[id]||{}, rest=b&&b.rest||0, tg, g=null, n=1, isS=false, extra="", pain=!(b&&b.rehab)&&painHit(o.n);
  if(pain) sk=true;
  if(it.f) tg=it.f;
  else if(it.iso){var m=D.profile[it.iso],q=isoP(m);n=q.n;isS=true;tg=q.n+" × "+q.h+" s";g={r:q.h};
    if(q.lev<0) extra='<div class="c gold">Max under 11 s: pick an easier variation via “Swap”.</div>';
    if(q.lev>0) extra='<div class="c gold">Max over 33 s: pick a harder variation'+(it.iso==="hsw"?' or hands closer to the wall, only the toes touch':(it.iso==="tuck"?', so practise the straight-leg L-sit':''))+'.</div>';
    extra+='<div class="c">Your max: '+Math.round(m)+' s. Complete all sets and it goes up automatically.</div>';}
  else if(it.test){n=1;isS=it.unit==="s";tg="Max · so far "+D.profile[it.test]+" "+it.unit;g={r:""};}
  else {g=target(it,v);n=setsOf(it,b,c,sid);isS=it.unit.indexOf("s")===0;tg=n+" × "+g.r+" "+it.unit+(o.w&&g.w?" · "+fmtKg(g.w)+" kg":"");}
  var pc=picFor(o.n);
  var h='<div class="ex'+(pc?" pose":"")+(on?" done":"")+(sk?" skip":"")+'"><input type="checkbox" id="c'+id+'" data-a="done" data-id="'+id+'"'+(on?" checked":"")+(sk?" disabled":"")+' aria-label="'+esc(o.n)+' done">'+(pc?'<div class="pw">'+pc+'</div>':'')+'<div class="exb">';
  h+='<label class="n" for="c'+id+'">'+((D.fav||[]).indexOf(o.n)>=0?'<span class="fvs" aria-label="favourite">★ </span>':'')+esc(o.n)+'</label>';
  if(it.nx) h+='<div class="c muted nxn">Instead of '+esc(it.nx)+' · '+esc(W("never")).toLowerCase()+'</div>';
  if(sk) return h+'<div class="c">'+(pain?(it.add?"Hidden today: your pain filter is on.":"Skipped because of pain."):"Skipped today.")+(pain?'':' <button type="button" class="lnk" data-a="skip" data-id="'+id+'">Undo</button>')+'</div></div></div>';
  h+='<div class="tg">'+esc(tg)+'</div>';
  var wu=wuSets(it,v); if(wu) h+='<div class="wus"><span class="wub">'+esc(W("wsets"))+'</span> '+esc(wuText(wu))+' <span class="muted">· not counted</span></div>';
  if(it.anc) h+='<div class="anc"><span class="ancb">⚓ '+esc(W("anchor"))+'</span> Same every week, so it keeps growing.</div>';
  if(it.c) h+='<div class="c">'+esc(it.c)+'</div>';
  var tn=termNote(o.n+" "+tg+" "+(it.c||"")),hw=((pc?"":howto(o.n))+(tn?" "+tn:"")).trim(); if(hw) h+='<details class="how"><summary>How?</summary><p>'+esc(hw)+'</p></details>';
  if(g&&g.note) h+='<div class="c gold">'+esc(g.note)+'</div>';
  h+=extra;
  if(!it.f){ h+='<div class="inp">';
    if(o.w&&!it.iso&&!it.test) h+='<label>kg<input type="number" step="0.5" inputmode="decimal" data-inp="w" data-id="'+id+'" value="'+esc(inp.w)+'" placeholder="'+(g.w||"")+'"></label>';
    h+=setBoxes(id,n,inp,g.r,isS,rest,last)+'</div>'; }
  var isFav=(D.fav||[]).indexOf(o.n)>=0,pl=!it.f&&!it.test&&!it.iso;
  h+='<div class="acts">'+(it.f?holdBtn(tg):'')+(pl&&!it.kx?'<button type="button" class="lnk fv'+(isFav?" on":"")+'" data-a="fav" data-n="'+esc(o.n)+'" aria-pressed="'+isFav+'">'+(isFav?"★ Favourite":"☆ Add to favourites")+'</button>':'')+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="'+id+'">⇄ Swap</button>':'')+
    (it.add?'<button type="button" class="lnk" data-a="addrm" data-id="'+id+'">✕ Remove</button>':'<button type="button" class="lnk" data-a="skip" data-id="'+id+'">Skip</button>'+(pl&&!(b&&(b.rehab||b.warm||b.cool))?'<button type="button" class="lnk nv" data-a="never" data-n="'+esc(o.n)+'">⊘ Never suggest</button>':''))+'</div>';
  return h+'</div></div>';
}
function blockHTML(b,bi,id,dy,loc,c,first){
  var vis=[];b.items.forEach(function(it,ii){if(curVar(it,loc)>=0)vis.push(ii);});
  if(!vis.length) return "";
  var n=0,dn=0,rows=vis.map(function(ii,k){var iid=id+"-"+bi+"-"+ii;var r=itemHTML(b.items[ii],iid,dy,loc,b,c,id,k===vis.length-1);if(r){n++;if(dy.done[iid]||dy.skip[iid]||(!b.rehab&&painHit(b.items[ii].opts[curVar(b.items[ii],loc)].n)))dn++;}return r;}).join("");
  var key=id+"-"+bi, op=dy.open&&dy.open[key]!=null?dy.open[key]:first;
  var kind=b.rounds?'<span class="kind z">Circuit · '+rounds(b,c,id)+' rounds</span>':(b.rest?'<span class="kind">Set by set</span>':'');
  return '<details class="blk'+(dn===n?" fin":"")+'" data-blk="'+key+'"'+(op?" open":"")+'><summary><span class="bn">'+esc(b.name)+'</span><span class="bc">'+(dn===n?"✓":dn+"/"+n)+'</span><span class="bi">'+kind+esc(b.info||"")+'</span></summary>'+
    (termNote(b.name+" "+(b.info||""))?'<p class="hint">'+esc(termNote(b.name+" "+(b.info||"")))+'</p>':'')+(b.rounds?'<p class="hint">Do all exercises once back to back, then rest. That is one round. Enter each round in the boxes.</p>':'')+rows+'</details>';
}
function absHTML(ab,dy,loc,first){
  var A=ABS[ab.i],on=!!dy.done["abs-T"],run=TB!==null;
  var h='<details class="blk'+(on?" fin":"")+'" data-blk="abs" '+((dy.open&&dy.open.abs!=null?dy.open.abs:!!first)||run?"open":"")+'><summary><span class="bn">Core Blitz · '+esc(A.n)+'</span><span class="bc">'+(on?"✓":"")+'</span><span class="bi"><span class="kind z">Blitz</span>'+ab.rounds+' × 20 s work, 10 s rest · '+(ab.rounds/2)+' min · two exercises alternating</span></summary>';
  A.items.forEach(function(it,ii){var v=curVar(it,loc),a=avail(it,loc);
    h+='<div class="ex"><span class="num">'+(ii?"B":"A")+'</span><div class="exb"><div class="tgrow"><span class="n">'+esc(it.opts[v].n)+'</span>'+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="abs-'+ab.i+'-'+ii+'">⇄ Swap</button>':'')+'</div><div class="c">'+esc(it.c)+'</div>'+(howto(it.opts[v].n)?'<details class="how"><summary>How?</summary><p>'+esc(howto(it.opts[v].n))+'</p></details>':'')+'</div></div>';});
  h+='<div class="tb"><div class="tbbox" id="tbbox"'+(run?'':' hidden')+'><span class="eyebrow" id="tbp">Ready</span><span class="tbt" id="tbt">5</span><span class="muted" id="tbn"></span></div>'+
     (run?'<button type="button" class="b wide" data-a="tbstop">Cancel</button>':'<button type="button" class="b red wide" data-a="tbgo" data-r="'+ab.rounds+'" data-i="'+ab.i+'">'+(on?"Start again":"Start Blitz")+'</button>'+(on?'':'<button type="button" class="lnk" data-a="tbdone">Mark as done without the timer</button>'))+'</div>';
  return h+'</details>';
}
function rounds(b,c,id){
  if(!b.rounds) return 0;
  var last=D.logs.filter(function(l){return l.id===id;}).slice(-1)[0];
  return (c.cyc<=2||D.short||lvl()===0||(last&&(last.rpe||0)>=10))?b.rounds[0]:b.rounds[1];
}
function pace(l){var p=l.min/l.km;return Math.floor(p)+":"+pad(Math.round((p%1)*60)%60)+"/km";}
function trainId(dy){var loc=D.loc,list=loc==="g"?GYM:HOME;
  if(dy.pick&&list.indexOf(dy.pick)>=0) return {id:dy.pick,rec:null};
  var t=recTrain(TODAY,loc,dy.noKick); return {id:t.id,rec:{why:[t.why]}};
}
function kickSel(id){return '<div class="seg wd" id="'+id+'" role="group" aria-label="Kickboxing days">'+[["Mo",1],["Tu",2],["We",3],["Th",4],["Fr",5],["Sa",6],["Su",0]].map(function(x){var on=D.kickDays.indexOf(x[1])>=0;return '<button type="button" class="b'+(on?" on":"")+'" data-a="kickday" data-v="'+x[1]+'" aria-pressed="'+on+'">'+x[0]+'</button>';}).join("")+'</div><p class="hint">Pick several days if you like. None selected = no fixed class.</p>';}
var FOC=[["bal","Balanced","Strength, skills and running in balance. 3 strength sessions, 2–3 runs."],["str","Strength & skills","No running in the plan. Up to 4 strength sessions, skill technique in between."],["run","Runner","3–5 runs with intervals and a long run. Strength twice a week as armour."]];
function focusHTML(pre){
  var h='<fieldset class="fs"><legend>Focus</legend>'+FOC.map(function(x){var on=D.focus===x[0];return '<label class="optc"><input type="radio" name="'+pre+'_focus" value="'+x[0]+'" data-a="focus"'+(on?" checked":"")+'><span><b>'+x[1]+'</b><span class="muted">'+x[2]+'</span></span></label>';}).join("")+'</fieldset>';
  h+='<fieldset class="fs"><legend>Skills</legend><p class="muted">One skill gets more time in every session. Several skills take turns: whatever rested longest comes first.</p>'+
    [["hs","Handstand"],["mu","Muscle-Up"],["ls","L-Sit"],["fl","Front Lever"],["pl","Planche"]].map(function(x){return '<label class="chk"><input type="checkbox" data-a="skill" data-k="'+x[0]+'"'+(D.skills[x[0]]?" checked":"")+'>'+x[1]+'</label>'+
      (x[0]==="fl"&&D.skills.fl?stageSel(pre,"flSt","Front lever stage",FLN):"")+(x[0]==="pl"&&D.skills.pl?stageSel(pre,"plSt","Planche stage",PLN):"");}).join("")+'</fieldset>';
  return h;}
function stageSel(pre,k,lab,names){return '<div class="row sub2"><label class="lab" for="'+pre+'_'+k+'">'+lab+'</label><select id="'+pre+'_'+k+'" data-a="stage" data-k="'+k+'">'+names.map(function(n,i){return '<option value="'+i+'"'+((D.profile[k]||0)===i?" selected":"")+'>'+n+(i===0?" (entry)":"")+'</option>';}).join("")+'</select></div>';}
function profGrid(list,pre){var p=D.profile;return '<div class="grid2">'+list.map(function(x){return '<label for="'+pre+x[0]+'">'+x[1]+'</label><input type="number" id="'+pre+x[0]+'" inputmode="numeric" min="0" data-prof="'+x[0]+'" value="'+Math.round(p[x[0]]*10)/10+'">';}).join("")+'</div>';}
function lvlNote(){var L=lvl();return 'Your level: <b>'+LVN[L]+'</b>'+(L===0?' · Build the pull-up and dip base first':(L===2?' · Muscle-ups get built up':' · Building toward the muscle-up'));}
var STARTP={s0:["Just starting","No pull-ups yet, a few push-ups. Totally fine: the app starts gently.",{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15}],
  s1:["Some training","A few pull-ups and push-ups, some gym experience.",{pull:5,dips:8,push:15,expl:2,mu:0,hsw:20,hsf:0,pike:6,tuck:15,lsit:0,hang:30}],
  s2:["Experienced","Solid pull-ups and dips, working on skills.",{pull:12,dips:20,push:30,expl:6,mu:2,hsw:45,hsf:5,pike:12,tuck:30,lsit:10,hang:60}]};
function vOnb(){
  var st=D.obStep||0,T=["Welcome","Choose your path","Your numbers","Equipment & training days"],h='',sk=D.skills;
  h+='<section class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgt"><div class="dlgh"><span class="eyebrow">'+W("oath")+' · step '+(st+1)+' of 4</span><h2 id="dlgt" tabindex="-1">'+T[st]+'</h2><div class="steps" aria-hidden="true">'+[0,1,2,3].map(function(i){return '<i class="'+(i<=st?"on":"")+'"></i>';}).join("")+'</div></div><div class="dlgb">';
  if(st===0){
    h+='<p>'+esc(W("welcome"))+'</p>'+themeHTML("o")+
      '<fieldset class="fs"><legend>Have a backup?</legend><p class="muted">Coming from another phone or browser? Restore your backup and you are done. New here? Just tap Next.</p><label class="b filebtn2" for="bkin">Restore from backup file</label><input type="file" id="bkin" class="vh" accept=".json,application/json" data-a="bkin"><details class="tv"><summary>Paste backup text instead</summary><textarea id="obbk" aria-label="Backup text" placeholder="Paste your backup text here"></textarea><button type="button" class="b" data-a="obimp">Restore from text</button></details>'+(D._msg?'<p class="warn" role="alert">'+esc(D._msg)+'</p>':'')+'</fieldset>';
  }
  if(st===1){
    h+='<p>Welcome to the crusade. First: where do you start, and what do you want to work on? Everything can be changed later under “More”.</p>';
    h+='<fieldset class="fs"><legend>Where do you start?</legend>'+Object.keys(STARTP).map(function(k){var x=STARTP[k];return '<label class="optc"><input type="radio" name="o_start" value="'+k+'" data-a="startp"'+(D.startP===k?" checked":"")+'><span><b>'+x[0]+'</b><span class="muted">'+x[1]+'</span></span></label>';}).join("")+'</fieldset>';
    h+=focusHTML("o")+emphHTML("o")+'<p class="muted">Favourite exercises: star them later under More → Emphasis & favourites, or with ☆ during training.</p>';
  }
  if(st===2){
    var rep=[["push","Push-ups (knees count too)"],["pull","Clean pull-ups"],["dips","Dips"]],hold=[["hang","Hanging from a bar (seconds)"]];
    if(sk.mu){rep.push(["expl","Explosive chest-to-bar pull-ups"]);rep.push(["mu","Clean muscle-ups"]);}
    if(sk.hs){rep.push(["pike","Pike push-ups"]);hold.push(["hsw","Handstand, chest to wall"]);hold.push(["hsf","Freestanding handstand"]);}
    if(sk.ls){hold.push(["tuck","Tuck L-sit"]);hold.push(["lsit","Straight-leg L-sit"]);}
    h+='<p>Rough numbers are fine. Your starting point already filled them in, adjust if you know better. Can’t do something yet? Leave it at 0: that is where most people begin, and the app picks easier variations for you.</p>'+
      '<h3>Reps</h3>'+profGrid(rep,"o_")+'<h3>Holds · seconds</h3>'+profGrid(hold,"o_")+
      '<p class="muted" id="lvlnote" role="status">'+lvlNote()+'</p>';
  }
  if(st===3) h+='<p>Almost done. Do you have a fixed kickboxing class, and what do you have at home?</p><h3>Kickboxing days</h3>'+kickSel("o_kick")+
    '<h3>At home</h3><p class="muted">The yoga mat is always there.</p>'+Object.keys(EQ).map(function(k){return '<label class="chk"><input type="checkbox" data-a="eq" data-k="'+k+'"'+(D.home[k]?" checked":"")+'>'+EQ[k]+'</label>';}).join("")+
    '<div class="sum"><b>'+W("crusade")+'</b><span>'+LVN[lvl()]+' · '+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+' · '+(["hs","mu","ls","fl","pl"].filter(function(k){return D.skills[k];}).map(function(k){return SKN[k];}).join(", ")||"no skills")+'</span></div>';
  h+='</div><div class="dlgf">'+(st>0?'<button type="button" class="b" data-a="obback">Back</button>':'<span></span>')+(st<3?'<button type="button" class="b red" data-a="obnext">Next</button>':'<button type="button" class="b red" data-a="onb">'+W("begin")+'</button>')+'</div></section>';
  return h;
}
function vStart(){
  var dy=day(),r=recAll(TODAY,dy.noKick),td=onDay(TODAY),h="";
  function was(f){return td.some(f);}
  var dn={morgen:was(function(l){return l.id==="MO";}),train:was(function(l){return GYM.indexOf(l.id)>=0||HOME.indexOf(l.id)>=0;}),run:was(isRun),kick:was(function(l){return l.id==="KI";})};
  if(D._toast){h+='<div class="toast" role="status">'+esc(D._toast)+'</div>';D._toast="";}
  h+=loveFinHTML();
  if(D.favQ&&D.favQ.length){var fq=D.favQ[0];h+='<div class="favask" role="group" aria-label="Keep as favourite"><p>You added <b>'+esc(fq)+'</b> today. Keep it as a favourite? Then it joins every strength session.</p><div class="row"><button type="button" class="b red" data-a="favkeep">★ Keep as favourite</button><button type="button" class="b" data-a="favnot">No, today only</button></div></div>';}
  if(!D.seenFav&&D.logs.length) h+='<button type="button" class="warn wbtn" data-tab="favs" data-from="start">New: pick a strength emphasis (legs & glutes, glutes, upper body, core) and star your favourite exercises →</button>';
  else if(!D.seenFocus) h+='<button type="button" class="warn wbtn" data-tab="mehr">New: choose your doctrine. Focus on running, strength or balanced, plus your skills →</button>';
  if(memOnly) h+='<div class="warn">This browser does not allow saving here. Use the backup under More.</div>';
  var bd=bkDue();
  if(bd) h+='<button type="button" class="bkrem" data-a="bkfile" id="bkrem"><b>'+esc(W("bkrem"))+'</b><span class="muted">'+(bd.none?'No backup yet · '+bd.n+' entries live only on this device.':'Last backup '+(bd.d===0?'today':(bd.d===1?'yesterday':bd.d+' days ago'))+(bd.n?' · '+bd.n+' new entr'+(bd.n===1?'y':'ies'):'')+'.')+' Tap to save a backup file.</span></button>';
  function big(tab,title,sub){var rec=r.btn===tab&&!dn[tab];
    return '<button type="button" class="big'+(dn[tab]?" done":(rec?" rec":""))+'" data-tab="'+tab+'"><span class="bt"><b>'+title+'</b>'+(dn[tab]?'<i class="tag ok">Done</i>':(rec?'<i class="tag">Recommended</i>':''))+'</span><span>'+(rec?'<span class="rn">'+esc(NAMES[r.id])+'</span><br>'+esc(r.why):esc(sub))+'</span></button>';}
  if(D.logs.length){var xp0=xpTotal(),st0=streaks();h+='<button type="button" class="rkline lnk" data-tab="verlauf"><span><b>'+esc(rankName(rankOf(xp0)))+'</b> · '+xp0+' XP</span><span>'+(st0.day.now>1?st0.day.now+'-day streak · ':'')+'Stats →</span></button>';}
  h+=loveCard();
  if(TH().notes){var nt=TH().notes;h+='<p class="note"><span aria-hidden="true">'+({templar:"✠",sanguine:"✦",sisters:"⚜",slaanesh:"✧",nurgle:"☣",love:"♥",plain:"•"}[thKey()]||"•")+'</span> '+esc(nt[Math.floor(pd(TODAY).getTime()/864e5)%nt.length])+'</p>';}
  h+='<h2 class="q">'+W("orders")+'</h2>';
  h+=big("morgen","Morning routine","Home, on the mat · 7 or 15 min");
  h+=big("train","Training","Gym or home");
  h+=big("run","Running",D.focus==="str"?"Not in the plan · log it anyway":"Easy, intervals or hard "+fmtKg(D.runKm)+" km");
  if(!dn.run&&!(r.btn==="run"&&r.id==="RE")) h+='<button type="button" class="lnk ctr xrun" data-a="xrun">'+esc(W("xrun"))+' <span class="muted">· extra and relaxed, '+(dn.train?'after your training':'also on a training day')+'</span></button>';
  if(D.kickDays.length||dn.kick) h+=big("kick","Kickboxing","Log it, with mobility before and after");
  else h+='<p class="ctr"><button type="button" class="lnk" data-tab="kick">Did a kickboxing or other class? Log it →</button></p>';
  if(r.btn==="kick"&&!dn.kick){var alt=recAll(TODAY,true);h+='<button type="button" class="lnk ctr" data-a="nokick">No kickboxing today? Then: '+esc(NAMES[alt.id])+'</button>';}
  if(dy.noKick&&isKick(TODAY)&&!dn.kick) h+='<button type="button" class="lnk ctr" data-a="nokick">Kickboxing after all</button>';
  if(D.logs.length) h+='<p class="ctr"><button type="button" class="lnk" data-a="blopen">Missed logging a day? '+esc(W("backlog"))+' →</button></p>';
  h+=weekHTML();
  return h;
}
/* Week preview (A-015): a forecast of the next 7 days, assuming every recommended session is done as planned.
   It runs on a deep copy of the state (D and TODAY are swapped and always restored); nothing is saved or logged. */
var WK={sel:-1,key:"",plan:null,sim:false};
var WKSYM={KA:"⚔",KB:"⚔",KC:"⚔",CH:"⚔",HO:"⚔",SK:"✦",HK:"✦",RS:"☾",DL:"▽",TE:"◎",RE:"➶",RH:"➶",RI:"➶",KI:"✊"};
var WKS={KA:"Str A",KB:"Str B",KC:"Str C",CH:"Trial",HO:"Home",SK:"Skill",HK:"Skill",RS:"Rest",DL:"Deload",TE:"Test",RE:"Easy run",RH:"Hard run",RI:"Intervals",KI:"Kick"};
var WDN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function wkKey(){var l=D.logs[D.logs.length-1],dy=D.days[TODAY]||{};return [TODAY,D.logs.length,l?l.d+l.id+(l.rpe||0):"",D.focus,D.emph,D.loc,D.short,D.start,D.kickDays.join(),JSON.stringify(D.skills),(D.fav||[]).join(),nev().join(),JSON.stringify(D.home),!!dy.noKick,lvl()].join("|");}
function wkLog(id,s,c){var o={d:TODAY,id:id,t:NAMES[id],rpe:id==="RS"?4:6,sim:1};
  if(c&&!isRun(o)&&id!=="KI"){var ss=S(id,c),sk=[];ss.blocks.forEach(function(b){if(D.short&&b.p>1)return;if(b.skill&&sk.indexOf(b.skill)<0)sk.push(b.skill);if(b.mu&&sk.indexOf("mu")<0)sk.push("mu");});o.lg=legSets(ss,c,id)>=6?1:0;o.sk=sk;o._min=ss.min;o._goal=ss.goal;}
  if(isRun(o)){o.km=D.runKm;o.min=Math.round(D.runKm*6.5);}
  return o;}
function weekPlan(){var k=wkKey();if(WK.plan&&WK.key===k)return WK.plan;
  var D0=D,T0=TODAY,out=[];
  WK.sim=true;try{D=JSON.parse(JSON.stringify(D0));
    for(var i=0;i<7;i++){var s=addD(T0,i);TODAY=s;updNames();var dy=day(s),c=ctx(s),td=onDay(s).filter(isTrain),e;
      if(i===0&&td.length){var l=td[td.length-1];e={id:l.id,done:1,leg:legLog(l)};}
      else{var r=recAll(s,i===0&&dy.noKick),id=r.id;
        if(r.btn==="train"&&id!=="RS")id=recTrain(s,D.loc,i===0&&dy.noKick).id;
        else if(r.btn==="train"&&D.loc==="h")id=recTrain(s,"h",i===0&&dy.noKick).id;
        var lg=wkLog(id,s,c);addLog(lg);
        e={id:id,why:r.why,leg:legLog(lg),min:lg._min,goal:lg._goal};delete lg._min;delete lg._goal;}
      e.d=s;e.name=NAMES[e.id];e.kick=isKick(s);e.dl=c.cyc===6;e.run=e.id==="RE"||e.id==="RH"||e.id==="RI";e.rest=e.id==="RS";out.push(e);}
  }finally{D=D0;TODAY=T0;WK.sim=false;updNames();}
  WK.key=k;WK.plan=out;return out;}
function wkInfo(e){if(e.run){var ri=runInfo(e.id);return {goal:ri.p.split(". ")[0]+".",dur:ri.h};}
  if(e.id==="KI")return {goal:"Your class, with mobility before and after.",dur:"class + ≈ 13 min mobility"};
  return {goal:e.goal||"",dur:e.min?"≈ "+e.min+" min":""};}
function weekHTML(){var P=weekPlan(),legs=P.filter(function(e){return e.leg;}).length,runs=P.filter(function(e){return e.run;}).length,dl=P.some(function(e){return e.dl;});
  var h='<section class="wk" aria-label="'+esc(W("week"))+'"><h2 class="q">'+esc(W("week"))+'</h2><div class="wkr" role="group">';
  P.forEach(function(e,i){var on=WK.sel===i,cls="wkd"+(i===0?" now":"")+(e.done?" done":"")+(e.rest?" rest":"")+(e.dl?" dl":"")+(on?" on":"");
    h+='<button type="button" class="'+cls+'" data-a="wkday" data-v="'+i+'" aria-pressed="'+on+'" aria-label="'+esc((i===0?"Today":WDN[pd(e.d).getDay()])+": "+e.name+(e.done?", done":"")+(e.leg?", legs":"")+(e.kick&&e.id!=="KI"?", kickboxing day":""))+'">'+
      '<span class="wkw">'+(i===0?"Today":WDN[pd(e.d).getDay()])+'</span><span class="wks" aria-hidden="true">'+(e.done?"✓":(WKSYM[e.id]||"•"))+'</span><span class="wkn">'+esc(WKS[e.id]||e.id)+'</span>'+
      '<span class="wkm" aria-hidden="true">'+(e.leg?'<i class="lg">L</i>':'')+(e.kick&&e.id!=="KI"?'<i class="kk">K</i>':'')+'</span></button>';});
  h+='</div>';
  if(WK.sel>=0&&P[WK.sel]){var e=P[WK.sel],inf=wkInfo(e);h+='<div class="wkx" role="status"><b>'+esc(e.name)+'</b>'+(e.done?' <span class="tag ok">Done</span>':'')+(inf.dur?' <span class="muted">· '+esc(inf.dur)+'</span>':'')+(inf.goal?'<p>'+esc(inf.goal)+'</p>':'')+(e.dl?'<p class="muted">Deload/test week: lighter, then test your bests.</p>':'')+'</div>';}
  h+='<p class="muted wkf">Legs '+legs+'× · runs '+runs+'×'+(dl?' · deload/test week':'')+' · L = legs, K = kickboxing day. Adapts to what you actually train.</p></section>';
  return h;}
function vMorgen(){
  var dy=day(),m=morning(TODAY),short=D.mlen==="k",L=mSections(m,short);
  var h=back()+'<div class="seg" role="group" aria-label="Length"><button type="button" class="b'+(!short?" on":"")+'" data-a="mlen" data-v="n" aria-pressed="'+(!short)+'">Normal · 15 min</button><button type="button" class="b'+(short?" on":"")+'" data-a="mlen" data-v="k" aria-pressed="'+short+'">Short · 7 min</button></div><div class="hero"><span class="eyebrow">'+esc(TH().morns?TH().morns[Math.floor(pd(TODAY).getTime()/864e5)%TH().morns.length]:TH().morn)+' · home, on the mat</span><h2>Morning routine</h2><p>'+esc(m.why.join(" "))+'</p><p class="muted">Gentle start: no deep forward bends in the first hour after waking.</p></div>';
  L.forEach(function(sec,si){
    h+='<details class="blk" open><summary><span class="bn">'+esc(sec.n)+'</span><span class="bi">'+esc(sec.info)+'</span></summary>';
    sec.items.forEach(function(x,ii){h+=poseRow(x,"m-"+sec.k+"-"+ii,dy);});
    h+='</details>';});
  var dM=onDay(TODAY).some(function(l){return l.id==="MO";});
  h+=(dM?'<p class="ctr"><span class="pill ok">Done today</span></p>':'<button type="button" class="b red wide" data-a="savemo">Morning routine done</button>');
  return h;
}
function kitHTML(kon){
  var h='<button type="button" class="tgl'+(kon?" on":"")+'" data-a="kit" aria-pressed="'+kon+'"><span class="sw" aria-hidden="true"></span>'+esc(W("kit"))+' <span class="muted">· '+(kon?"on, "+esc(kitLabel()):"off, full equipment")+'</span></button>';
  if(!D._kitAsk) return h;var sel=D._kitSel||[];
  h+='<div class="kitq" role="group" aria-labelledby="kitqh"><p class="q" id="kitqh">What do you have today?</p><div class="chips">'+KITS.map(function(x){var on=x[0]==="n"?!sel.length:sel.indexOf(x[0])>=0;
    return '<button type="button" class="chip'+(on?" on":"")+'" data-a="kitsel" data-k="'+x[0]+'" aria-pressed="'+on+'">'+x[1]+'</button>';}).join("")+'</div>'+
    '<button type="button" class="b red wide" data-a="kitok">Confirm</button><button type="button" class="lnk ctr" data-a="kitno">Cancel</button></div>';
  return h;}
/* "+ Add exercise" at the end of a strength or skill session: tap, then tap the exercise (search narrows the list). */
function addHTML(s,loc){
  if(!D._addOpen) return '<button type="button" class="b wide addb" data-a="addopen">'+esc(W("addex"))+' <span class="muted">· today only</span></button>';
  var pres={},q=(D._addq||"").toLowerCase();s.blocks.forEach(function(b){b.items.forEach(function(it){var v=curVar(it,loc);if(v>=0)pres[it.opts[v].n]=1;});});
  var h='<div class="card addp" id="addp"><div class="sec"><h3>'+esc(W("addex").replace(/^\+ /,""))+'</h3><p class="muted">Joins today\'s session before the cool-down. Tomorrow the plan is as before.</p><label class="lab" for="addq">Search</label><input type="search" id="addq" placeholder="e.g. kickback, curl, plank" value="'+esc(D._addq||"")+'" autocomplete="off">';
  addRows(loc).forEach(function(g,gi){var vis=g[1].filter(function(o){return !q||o.n.toLowerCase().indexOf(q)>=0;}).length;
    h+='<details class="fvg adg'+(vis?'':' hid')+'"'+(gi<1||q?" open":"")+'><summary>'+esc(g[0])+' <span class="muted fvc">'+vis+'</span></summary><div class="fvlist">'+g[1].map(function(o){var inS=!!pres[o.n],hid=q&&o.n.toLowerCase().indexOf(q)<0;
      return '<button type="button" class="fvrow adr'+(hid?" hid":"")+'" data-a="addx" data-n="'+esc(o.n)+'"'+(inS?' disabled':'')+'><span class="st" aria-hidden="true">+</span><span class="fn">'+esc(o.n)+'</span>'+(inS?'<span class="gt">In session</span>':'')+(isNever(o.n)?'<span class="gt">'+esc(W("never"))+'</span>':'')+(painHit(o.n)?'<span class="gt">Pain</span>':'')+'</button>';}).join("")+'</div></details>';});
  return h+'<button type="button" class="lnk ctr" data-a="addclose">Cancel</button></div></div>';}
function vTrain(){
  var dy=day(),loc=LOC(),c=ctx(TODAY),Tt=trainId(dy),id=Tt.id,s=S(id,c),ab=s.ab,f=dy.fin,list=D.loc==="g"?GYM:HOME,pn=D.pain||{},kon=kitOn();
  var h=back()+'<div class="seg"><button type="button" class="b'+(D.loc==="g"?" on":"")+'" data-a="loc" data-v="g" aria-pressed="'+(D.loc==="g")+'">Gym</button><button type="button" class="b'+(D.loc==="h"?" on":"")+'" data-a="loc" data-v="h" aria-pressed="'+(D.loc==="h")+'">Home</button></div><button type="button" class="tgl'+(D.short?" on":"")+'" data-a="short" aria-pressed="'+D.short+'"><span class="sw" aria-hidden="true"></span>Limited time <span class="muted">· '+(D.short?"on, essentials only":"off, full session")+'</span></button>'+kitHTML(kon);
  var pnL=Object.keys(pn).filter(function(k){return pn[k];}).map(function(k){return {w:"Wrist",s:"Shoulder",e:"Elbow"}[k];});
  h+='<div class="hero"><span class="eyebrow">Week '+c.week+(c.cyc===6?' · Deload':' · Phase '+c.phase)+' · '+LVN[lvl()]+(D.short?' · shortened':'')+(kon?' · '+esc(W("kit")):'')+'</span><h2>'+NAMES[id]+'</h2><p class="dur">⏱ ≈ '+s.min+' min'+(s.addMin?' <span class="muted">· with your additions</span>':'')+'</p>'+(s.min<DURMIN&&STR[id]?'<p class="muted">A short one today. Nothing gets padded: shorter is fine.</p>':'')+'<p>'+esc(s.goal)+'</p>'+(Tt.rec?'<p class="muted">'+esc(Tt.rec.why[0])+'</p>':'')+(pnL.length?'<p class="c gold">Rehab active: '+pnL.join(", ")+'</p>':'')+'</div>';
  if(D._nvMsg){h+='<p class="note" role="status">'+esc("“"+D._nvMsg+"” will not be suggested again. An equivalent for the same muscles takes its place. Bring it back under More.")+'</p>';D._nvMsg="";}
  if(FAVIDS[id]){var nf=(D.fav||[]).length,emn=EMPH.filter(function(x){return x[0]===emph();})[0][1];h+='<button type="button" class="favcard" data-tab="favs" data-from="train"><span class="fvi" aria-hidden="true">★</span><span><b>'+(nf?nf+' favourite'+(nf>1?"s":"")+' in your plan':'Add your favourite exercises')+'</b><span class="muted">Emphasis: '+emn+(nf?'':' · starred exercises join every strength session')+'</span></span><span class="go">Edit →</span></button>';}
  h+='<details class="opt"><summary>Other session · pain'+(D.loc==="h"?' · equipment':'')+'</summary><label class="lab" for="pick">Session</label><select id="pick" data-a="pick">'+list.map(function(k){return '<option value="'+k+'"'+(k===id?" selected":"")+'>'+NAMES[k]+'</option>';}).join("")+'</select>'+
     '<p class="muted">Pain? Affected exercises are skipped and a rehab block is added.</p>'+[["w","Wrist"],["s","Shoulder"],["e","Elbow"]].map(function(x){return '<label class="chk"><input type="checkbox" data-a="pain" data-k="'+x[0]+'"'+(pn[x[0]]?" checked":"")+'>'+x[1]+'</label>';}).join("")+
     (D.loc==="h"?'<p class="muted">What do you have at home? The mat is always there.</p>'+Object.keys(EQ).map(function(k){return '<label class="chk"><input type="checkbox" data-a="eq" data-k="'+k+'"'+(D.home[k]?" checked":"")+'>'+EQ[k]+'</label>';}).join(""):'')+'</details>';
  var first=true,extraDone=false;
  function extras(){ if(extraDone) return; extraDone=true;
    Object.keys(REHAB).forEach(function(k,ki){ if(pn[k]) h+=blockHTML({name:REHAB[k].name,info:"light and pain-free",items:REHAB[k].items,rest:0,rehab:true},90+ki,id,dy,loc,c,false); });
    if(ab){var ao=first&&!dy.done["abs-T"]; h+=absHTML(ab,dy,loc,ao); if(ao) first=false;} }
  s.blocks.forEach(function(b,bi0){ if(D.short&&b.p>1) return; var bi=b.bi!=null?b.bi:bi0;
    if(b.cool||b.add) extras();
    var all=b.items.every(function(it,ii){var v=curVar(it,loc);return v<0||dy.done[id+"-"+bi+"-"+ii]||dy.skip[id+"-"+bi+"-"+ii]||painHit(it.opts[v].n);});
    var x=blockHTML(b,bi,id,dy,loc,c,first&&!all); if(x&&first&&!all) first=false; h+=x; });
  extras();
  if(ADDIDS[id]) h+=addHTML(s,loc);
  h+='<div class="card"><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="savetr">Log training</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function runRec(){var h0=hist(TODAY),a=recAll(TODAY,true);if(a.btn==="run")return a;
  var hardOK=!h0.kcY&&!h0.rhY&&!isKick(addD(TODAY,1))&&!(isKick(TODAY)&&!day().noKick);
  if(hardOK&&D.focus==="run"&&h0.RI>=5&&h0.RH>=2&&cap(h0.RI)>=cap(h0.RH)) return {id:"RI",why:"Intervals "+ago(h0.RI)+"."};
  return (hardOK&&cap(h0.RH)>=cap(h0.RE)&&h0.RH>=6)?{id:"RH",why:NAMES.RH+" "+ago(h0.RH)+"."}:{id:"RE",why:"Easy run "+ago(h0.RE)+"."};}
var RUNT={RE:"Easy",RI:"Intervals",RH:"Hard"};
function runInfo(id){var R=D.focus==="run";
  if(id==="RE"&&D.runKm<6&&!R) return {h:"20–30 min easy",p:"Easy enough to talk. Walking breaks are completely fine: e.g. 3 min jog, 1 min walk. Strength training today as well? Then strength first, or keep 3 hours apart."};
  if(id==="RE") return {h:R?"30–45 min easy":"5 km easy",p:(R?"30–45 min. ":"30–35 min. ")+"Easy enough that you can speak in full sentences."+(R?" At the end 4–6 strides of 20 s: build speed smoothly, walk back.":"")+" Strength training today as well? Then strength first, or keep 3 hours apart."};
  if(id==="RI") return {h:D.runI+" × 3 min fast",p:"10 min warm-up jog. Then "+D.runI+" × 3 min fast with 2 min jogging in between. 10 min cool-down jog. Fast means: only single words possible, but every rep equally quick. No strength training afterwards."};
  return {h:fmtKg(D.runKm)+" km "+(D.runKm<6?"steady":"hard"),p:(D.runKm<6?"Faster than your easy runs, but steady the whole way.":"About 6:30/km.")+" 5 min warm-up jog, no strength training afterwards."};}
function vRun(){
  var dy=day(),rr=runRec(),id=dy.run||rr.id,f=dy.fin,ri=runInfo(id);
  var h=back()+'<div class="seg" role="group" aria-label="Run type">'+["RE","RI","RH"].map(function(k){return '<button type="button" class="b'+(id===k?" on":"")+'" data-a="runtype" data-v="'+k+'" aria-pressed="'+(id===k)+'">'+RUNT[k]+'</button>';}).join("")+'</div>';
  var xr=dy.xr&&id==="RE";
  h+='<div class="hero"><span class="eyebrow">'+(xr?"Extra easy run":(id===rr.id?"Recommended":"Your choice"))+'</span><h2>'+esc(ri.h)+'</h2><p>'+esc(ri.p)+'</p>'+(xr?'<p class="c gold xrh">Order: best after your strength training, or a few hours apart from it. Keep it truly easy.</p>':'<p class="muted">'+esc(rr.why)+'</p>')+'</div>';
  h+='<details class="blk"><summary><span class="bn">Cool-down</span><span class="bi">5 min after the run · hold each stretch, breathe slowly</span></summary>'+coolItems("run","h").map(function(x,i){return poseRow(x,"rc-"+i,dy);}).join("")+'</details>';
  h+='<div class="card"><div class="sec"><p class="q">After the run</p><div class="inp two"><label>Distance km<input type="number" id="f_km" step="0.01" inputmode="decimal" data-fin="km" value="'+esc(f.km)+'"></label><label>Time min<input type="number" id="f_min" step="0.1" inputmode="decimal" data-fin="min" value="'+esc(f.min)+'"></label></div>'+
     (num(f.km)>0&&num(f.min)>0?'<p class="tg">Pace '+pace({km:num(f.km),min:num(f.min)})+'</p>':'')+
     '<label class="filebtn" for="gfile">Import run file (GPX/TCX)</label><input type="file" id="gfile" class="vh" accept=".gpx,.tcx,application/gpx+xml,text/xml" data-a="gfile">'+(f.gmsg?'<p class="muted" role="status">'+esc(f.gmsg)+'</p>':'')+'</div>'+
     '<div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="saverun">Log run</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function vKick(){
  var dy=day(),f=dy.fin,c=ctx(TODAY);
  return back()+'<div class="hero"><span class="eyebrow">Battle day</span><h2>Kickboxing</h2><p>No handstand today, wrists and shoulders get enough work.</p></div>'+blockHTML(KM_PRE,0,"KI",dy,"h",c,true)+blockHTML(KM_POST,1,"KI",dy,"h",c,false)+
    '<div class="card"><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="savekick">Log kickboxing</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
}
var THEMES={
 templar:{n:"Black Templars",sw:["#0c0c0d","#ece5d3","#c0141f"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#ece5d3" stroke="#c0141f" stroke-width="4"/><g fill="#0c0c0d"><g transform="rotate(0 50 50)"><path d="M43 50Q45 27 27 9H73Q55 27 57 50Z"/></g><g transform="rotate(90 50 50)"><path d="M43 50Q45 27 27 9H73Q55 27 57 50Z"/></g><g transform="rotate(180 50 50)"><path d="M43 50Q45 27 27 9H73Q55 27 57 50Z"/></g><g transform="rotate(270 50 50)"><path d="M43 50Q45 27 27 9H73Q55 27 57 50Z"/></g><circle cx="50" cy="50" r="9"/></g>',
   ranks:["Aspirant","Neophyte","Initiate","Crusader","Veteran Crusader","Sword Brother","Castellan","Marshal","Emperor's Champion"],
   toast:["Logged. The Emperor sees your toil.","Logged. Another step in the crusade.","Logged. The blade grows sharper.","Logged. Honour to the diligent."],up:"The Emperor marks your ascent.",morn:"Morning litany"},
 sanguine:{n:"Sanguinius",sw:["#110909","#e8c06a","#a3111c"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#3a0a0f" stroke="#e8c06a" stroke-width="4"/><g fill="#e8c06a"><path d="M47 60C36 42 22 34 6 34C16 40 20 46 22 52C14 50 8 52 4 56C14 58 20 62 24 68C32 64 42 63 47 66Z"/><path transform="translate(100 0) scale(-1 1)" d="M47 60C36 42 22 34 6 34C16 40 20 46 22 52C14 50 8 52 4 56C14 58 20 62 24 68C32 64 42 63 47 66Z"/><rect x="47" y="22" width="6" height="58" rx="2"/><rect x="38" y="30" width="24" height="5" rx="2"/></g>',
   ranks:["Aspirant","Neophyte","Initiate","Battle Angel","Veteran Angel","Sanguinary Guard","Captain","Chapter Master","Herald of Sanguinius"],
   toast:["Logged. The Angel would be proud.","Logged. Wings of gold, will of iron.","Logged. Nobility in every rep.","Logged. Rise, and rise again."],up:"Your wings grow stronger.",morn:"Morning devotion"},
 sisters:{n:"Sisters of Battle",sw:["#0a0a0b","#f2ebe0","#9b0f1a"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#141316" stroke="#9b0f1a" stroke-width="4"/><g fill="#f2ebe0"><path d="M50 12C42 26 41 42 50 58C59 42 58 26 50 12Z"/><path d="M47 56C30 54 18 40 26 28C30 26 34 28 34 32C32 38 36 46 47 50Z"/><path d="M53 56C70 54 82 40 74 28C70 26 66 28 66 32C68 38 64 46 53 50Z"/><rect x="32" y="56" width="36" height="7" rx="2"/><path d="M45 63L50 86L55 63Z"/><path d="M40 63C34 70 30 76 26 78C34 79 40 74 44 66Z"/><path d="M60 63C66 70 70 76 74 78C66 79 60 74 56 66Z"/></g>',
   ranks:["Postulant","Novitiate","Sister Militant","Sister Superior","Veteran Superior","Palatine","Canoness","Canoness Superior","Living Saint"],
   toast:["Logged. Faith is your armour.","Logged. The Emperor protects, Sister.","Logged. Another prayer answered in sweat.","Logged. Your devotion burns bright."],up:"Your faith is rewarded.",morn:"Morning prayer"},
 slaanesh:{n:"Slaanesh",sw:["#100914","#f39ce4","#a8248f"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#2a1030" stroke="#f07ad8" stroke-width="4"/><g fill="#f39ce4"><path transform="rotate(-70 50 70)" d="M50 24C41 42 41 58 50 70C59 58 59 42 50 24Z"/><path transform="rotate(-35 50 70)" d="M50 24C41 42 41 58 50 70C59 58 59 42 50 24Z"/><path transform="rotate(0 50 70)" d="M50 24C41 42 41 58 50 70C59 58 59 42 50 24Z"/><path transform="rotate(35 50 70)" d="M50 24C41 42 41 58 50 70C59 58 59 42 50 24Z"/><path transform="rotate(70 50 70)" d="M50 24C41 42 41 58 50 70C59 58 59 42 50 24Z"/></g><circle cx="50" cy="66" r="6" fill="#2a1030"/>',
   ranks:["Seeker","Devotee","Hedonist","Bliss-Bringer","Exalted","Champion of Excess","Herald","Daemon Prince","Chosen of the Prince"],
   toast:["Logged. Exquisite. More!","Logged. Perfection is a habit.","Logged. Delicious burn.","Logged. Nothing in moderation."],up:"Such perfection. The Prince is pleased.",morn:"Morning indulgence"},
 love:{n:"Love of my life",sw:["#140c10","#ffd6e4","#c2185b"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#ffe3ec" stroke="#c2185b" stroke-width="4"/><g fill="#c2185b"><path d="M50 82C24 64 12 50 12 34C12 22 21 14 32 14C40 14 46 19 50 26C54 19 60 14 68 14C79 14 88 22 88 34C88 50 76 64 50 82Z"/></g><path d="M30 34C30 27 35 23 40 24" stroke="#ffe3ec" stroke-width="4" fill="none" stroke-linecap="round"/>',
   ranks:["Spark","Sweetheart","Darling","Heartbeat","Sunshine","Shining Star","Queen of the Gym","Legend of my Heart","Love of my Life"],
   toast:["Logged. I'm so proud of you, every single time.","Logged. You're the best girlfriend in the world, and now an even stronger one.","Logged. Strong, beautiful and all mine.","Logged. You light up every room, and every rep.","Logged. Watching you grow stronger is my favourite thing.","Logged. I'd choose you in every lifetime, and every gym.","Logged. You did that. I'm grinning like an idiot.","Logged. My heart does a little happy dance for you.","Logged. You're even more amazing than yesterday.","Logged. Somewhere, I'm bragging about you right now.","Logged. You make hard things look beautiful.","Logged. Proud of you. Always. No matter what.","Logged. You are my favourite person, and today you proved why again.","Logged. Go get a hug, you earned it. From me. Lots of them.","Logged. You + discipline = my heart melting.","Logged. Thank you for being you. I love you."],
   ups:["","Sweetheart already. Of course you are.","Darling! I knew it from the first day.","Heartbeat: you make mine faster, you know that?","Sunshine! You brighten my days and now your stats too.","Shining Star. I'm the luckiest person alive.","Queen of the Gym. Crown well deserved, my queen.","Legend of my Heart. You always were.","Love of my Life. The highest rank there is, and you've had it with me since the beginning."],
   up:"Look at you go, love. I'm so proud.",
   morns:["Good morning, beautiful","Morning, sunshine","Rise and shine, my love","Good morning, my favourite person","Morning, gorgeous","Hello, sleepyhead. I love you"],
   notes:["Reminder: I love you more than rest days.","You're stronger than you think, and loved more than you know.","Every rep you do, I'm cheering for you.","You don't have to be perfect. You're already perfect to me.","Hard day? Then an easy session counts double. Love you.","I'm proud of you for showing up. Every time.","You make my world better just by being in it.","Small steps, big love.","Fun fact: you're my favourite notification.","Whatever today brings, you've got this. And you've got me.","I fall for you a little more every day.","Drink some water, stretch a bit, and remember I adore you.","You're the best part of my day.","Strong body, kind heart, beautiful soul. That's you.","If you skip today, I still love you. If you train, I love you too. Win-win.","You and me, always."],
   hon:{first:"First Kiss",dawn:"Morning Sunshine",week:"Seven Days of You",unbroken:"Unstoppable Heart",pilgrim:"Marathon of Love",march:"100 km of Proud",zealot:"Core of Steel, Heart of Gold",trial:"Brave Heart",records:"Record Queen",centurion:"100 Reasons to Be Proud",ascend:"Sky High",inverted:"Head Over Heels",lever:"Gravity-Defying Love"},
   morn:"Good morning, beautiful"},
 nurgle:{n:"Nurgle",sw:["#0f110a","#c5d86d","#566616"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#212518" stroke="#8a9a3a" stroke-width="4"/><g fill="#c5d86d"><ellipse cx="50" cy="58" rx="13" ry="20"/><circle cx="50" cy="34" r="9"/><ellipse cx="32" cy="44" rx="16" ry="9" transform="rotate(-30 32 44)" opacity=".55"/><ellipse cx="68" cy="44" rx="16" ry="9" transform="rotate(30 68 44)" opacity=".55"/><path d="M38 56L24 62M38 64L24 74M62 56L76 62M62 64L76 74M44 74L36 86M56 74L64 86" stroke="#c5d86d" stroke-width="3" stroke-linecap="round"/></g><circle cx="46" cy="32" r="2.5" fill="#212518"/><circle cx="54" cy="32" r="2.5" fill="#212518"/>',
   ranks:["Blighted","Rotling","Plague Acolyte","Plaguebearer","Blightbringer","Rotting Champion","Lord of Decay","Herald of Grandfather","Chosen of Grandfather"],
   toast:["Logged."],up:"Grandfather is pleased.",morn:"Good morning, rotling"},
 plain:{n:"Plain",sw:["#0e1013","#e8ebf0","#2f6fd8"],emb:'<rect x="2" y="2" width="96" height="96" rx="12" fill="#e8ebf0"/><g fill="#2f6fd8"><rect x="16" y="34" width="12" height="32" rx="3"/><rect x="72" y="34" width="12" height="32" rx="3"/><rect x="8" y="40" width="8" height="20" rx="2"/><rect x="84" y="40" width="8" height="20" rx="2"/><rect x="28" y="46" width="44" height="8" rx="3"/></g>',
   ranks:["Starter","Regular","Committed","Athlete","Strong","Advanced","Expert","Elite","Legend"],
   toast:["Logged. Nice work.","Logged. Consistency wins.","Logged. One more in the bank.","Logged. Keep it up."],up:"Level up!",morn:"Morning routine"}
};
/* Extra flavour per theme: messages, daily notes, rank-up lines, badge names and UI words. */
var THX={
 templar:{
  toast:["Logged. The Emperor sees your toil.","Logged. Another step in the crusade.","Logged. The blade grows sharper.","Logged. Honour to the diligent.","Logged. Weakness purged, one rep at a time.","Logged. Your oath holds, brother.","Logged. Iron in the arms, faith in the heart.","Logged. The Marshal would nod in approval.","Logged. No pity, no remorse, no skipped sets.","Logged. Your armour fits a little better today.","Logged. Sigismund himself trained like this.","Logged. The crusade marches on, and so do you.","Logged. Sweat is the prayer of the faithful.","Logged. Another heretic named Laziness falls.","Logged. Steel your body as you steel your will.","Logged. Rest now. Tomorrow, the crusade continues."],
  ups:["","Neophyte. You have taken the first oath.","Initiate. The Chapter sees potential in you.","Crusader. You fight among the faithful now.","Veteran Crusader. Scars and strength in equal measure.","Sword Brother. Few earn this blade.","Castellan. Others look to you for strength.","Marshal. The crusade follows your lead.","Emperor's Champion. None stand above you in faith or deed."],
  morns:["Rise, brother. The crusade awaits","Dawn breaks over the crusade","Morning litany: steel your body","The Emperor does not sleep. Rise","A new day, a new oath"],
  notes:["Suffer not the rest day to become a rest week.","Faith without effort is merely hope.","The strongest armour is forged in repetition.","Even a single clean rep is a victory over weakness.","Discipline is a weapon. Keep it sharp.","The crusade is long. Pace yourself, never stop.","A tired body still obeys a determined mind.","Purity of form before weight of iron.","Recovery is not weakness. It is preparation for war.","Your will is the blade. Training is the whetstone.","Every morning routine is a small vow kept.","The enemy you fight today is yesterday's limit.","Stand tall. Shoulders back. A Templar does not slouch.","Rest well, for the Emperor needs you strong.","No crusade was won in a single day.","Doubt is the first heresy. Begin anyway."],
  hon:{first:"First Oath",dawn:"Dawn Vigil",week:"Iron Week",unbroken:"Unbroken",pilgrim:"Pilgrim",march:"Long March",zealot:"Zealot of the Blitz",trial:"Trial of Strength",records:"Record Breaker",centurion:"Centurion",ascend:"Ascension",inverted:"World Upside Down",lever:"Lever of Faith"},
  ui:{bkrem:"Secure the archives",orders:"Your orders for today",battle:"How hard was the battle?",wsets:"Whetting sets",anchor:"Oath lift",oath:"Oath of induction",begin:"Begin the crusade",chron:"Chronicle",crusade:"Your crusade",focus:"Where to focus",honours:"Honours",records:"Personal records",rank:"Rank",title:"Crusade Training Book",sub:"Induction of a new recruit",ready:"The crusade begins. The Emperor watches over you.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New record! ",newhon:"Honour earned: "}},
 sanguine:{
  toast:["Logged. The Angel would be proud.","Logged. Wings of gold, will of iron.","Logged. Nobility in every rep.","Logged. Rise, and rise again.","Logged. The red thirst is quenched by effort.","Logged. Grace and strength, as the Angel taught.","Logged. Your form is a work of art.","Logged. The Sanguinary Guard takes note.","Logged. Beauty is forged in discipline.","Logged. Another golden feather for your wings.","Logged. Baal's sun shines on your progress.","Logged. Strength worthy of a son of the Angel.","Logged. The Black Rage has nothing on your focus.","Logged. Noble work, brother.","Logged. Your sacrifice today is your glory tomorrow.","Logged. Fly higher tomorrow."],
  ups:["","Neophyte. The Angel's blood stirs in you.","Initiate. Your wings begin to form.","Battle Angel. You take to the sky.","Veteran Angel. Grace earned in many battles.","Sanguinary Guard. Gold suits you.","Captain. Lead with the Angel's nobility.","Chapter Master. Baal stands behind you.","Herald of Sanguinius. You embody the Angel's light."],
  morns:["Morning devotion under Baal's sun","Rise, angel","Golden light, golden effort","The Angel's sons rise early","A noble morning begins"],
  notes:["Grace is strength under control.","Beauty in form, power in purpose.","Nobility is shown in what you do when no one watches.","Sanguinius fell so that others could rise. Rise.","Control the thirst. Channel it into effort.","A clean rep is a beautiful rep.","Spread your wings: mobility is freedom.","The Angel valued art. Make your training art.","Your blood is gold. Treat your body accordingly.","Rest is part of glory. Even angels land.","Each morning is a chance to be noble.","Strength without grace is merely force.","Fly high, land soft.","Sacrifice a little comfort for a lot of strength.","The best warriors are also the most graceful.","Shine, son of the Angel."],
  hon:{first:"First Feather",dawn:"Dawn over Baal",week:"Seven Golden Days",unbroken:"Unbroken Wings",pilgrim:"Pilgrim of Baal",march:"Long Flight",zealot:"Core of Gold",trial:"Trial of the Angel",records:"Golden Records",centurion:"Hundred Feathers",ascend:"Ascension of the Angel",inverted:"Angelic Inversion",lever:"Wings of Lever"},
  ui:{bkrem:"Preserve the annals",orders:"Your duty for today",wsets:"Rising sets",anchor:"Angel's lift",battle:"How fierce was the fight?",oath:"Blood oath",begin:"Spread your wings",chron:"Annals",crusade:"Your ascent",focus:"Counsel of the Angel",honours:"Golden honours",records:"Golden records",rank:"Rank",title:"Angel's Training Book",sub:"A new son of the Angel",ready:"Your ascent begins. The Angel watches over you.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New golden record! ",newhon:"Golden honour earned: "}},
 sisters:{
  toast:["Logged. Faith is your armour.","Logged. The Emperor protects, Sister.","Logged. Another prayer answered in sweat.","Logged. Your devotion burns bright.","Logged. The flame of faith grows stronger.","Logged. Saint Celestine would be proud.","Logged. Purity of body, purity of soul.","Logged. Your litanies are spoken in reps.","Logged. Righteous effort, righteous rewards.","Logged. The Ecclesiarchy records your devotion.","Logged. Your faith is your strength, Sister.","Logged. Each rep a bead on your rosarius.","Logged. The heretic called Weakness burns.","Logged. Sing the litany of strength once more.","Logged. Your order is proud of you.","Logged. Rest, Sister. Faith renews in sleep."],
  ups:["","Novitiate. Your training in faith begins.","Sister Militant. You bear arms for the Emperor.","Sister Superior. You lead your squad with devotion.","Veteran Superior. Your faith has been tested and holds.","Palatine. Your order looks to you.","Canoness. You lead an order of the faithful.","Canoness Superior. Your devotion is legend.","Living Saint. The Emperor's light shines through you."],
  morns:["Morning prayer, Sister","Rise in faith","The flame burns at dawn","Matins of strength","A blessed morning, Sister"],
  notes:["Faith is a muscle. Train it daily.","The Emperor protects those who protect their bodies.","Devotion is not a feeling. It is a practice.","Light the flame: one small session counts.","A Sister's strength is her discipline.","Purity of form before speed of rep.","Celestine rose again. So can you, after any break.","Prayer and training share one secret: consistency.","Rest is holy. Even saints sleep.","Hymns are sung in breaths. Breathe through the effort.","Your armour is faith. Your shield is routine.","The Emperor asks for devotion, not perfection.","Burn doubt with action.","Every morning routine is a small act of devotion.","Stand straight. Faith deserves good posture.","Strength in faith, faith in strength."],
  hon:{first:"First Prayer",dawn:"Matins Kept",week:"Seven Days of Devotion",unbroken:"Unbroken Faith",pilgrim:"Pilgrimage",march:"Long Pilgrimage",zealot:"Core of Faith",trial:"Trial of Faith",records:"Blessed Records",centurion:"Hundred Prayers",ascend:"Ascension",inverted:"Miracle of Balance",lever:"Lever of Devotion"},
  ui:{bkrem:"Copy the sacred records",orders:"Your devotions for today",wsets:"Prayer sets",anchor:"Vow lift",battle:"How hard was the trial?",oath:"Vows of the order",begin:"Take the vows",chron:"Chronicle of faith",crusade:"Your path of faith",focus:"Counsel of the Canoness",honours:"Blessings",records:"Blessed records",rank:"Rank",title:"Book of Devotion",sub:"A new Sister of the order",ready:"Your vows are taken. The Emperor protects, Sister.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"A blessed record! ",newhon:"Blessing received: "}},
 slaanesh:{
  toast:["Logged. Exquisite. More!","Logged. Perfection is a habit.","Logged. Delicious burn.","Logged. Nothing in moderation.","Logged. Every rep a sensation.","Logged. The pursuit of perfection continues.","Logged. Feel that? That's progress.","Logged. Excess suits you.","Logged. The Prince adores your dedication.","Logged. Indulge in another set tomorrow.","Logged. Beautiful form. Divine burn.","Logged. Pain is merely intense sensation.","Logged. You crave improvement. Good.","Logged. Your reflection approves.","Logged. Rest, then indulge again.","Logged. Flawless. Almost. Again tomorrow."],
  ups:["","Devotee. You have tasted progress.","Hedonist. You crave more.","Bliss-Bringer. Your effort is intoxicating.","Exalted. Perfection draws near.","Champion of Excess. Nothing is enough.","Herald. Your devotion sings.","Daemon Prince. Ascension achieved.","Chosen of the Prince. Perfection, embodied."],
  morns:["Morning indulgence","Wake to sensation","A perfect morning awaits","Stretch, and savour it","Rise, devotee"],
  notes:["Perfection is not a goal. It is a habit.","Savour the burn.","Moderation is for those who fear greatness.","Treat your stretches like a luxury.","Excess in effort, moderation in nothing but rest.","The mirror is your judge. Impress it.","Every sensation is information.","Beauty demands discipline.","A perfect rep is better than ten sloppy ones.","Rest is an indulgence. Enjoy it fully.","Crave progress, not approval.","Your body is your masterpiece.","Pleasure in effort is the secret of champions.","Try the harder variation. You know you want to.","Elegance is strength made visible.","Never enough. Always more."],
  hon:{first:"First Taste",dawn:"Morning Indulgence",week:"Seven Days of Excess",unbroken:"Insatiable",pilgrim:"Marathon of Sensation",march:"Hundred Kilometres of Bliss",zealot:"Core of Desire",trial:"Trial of Perfection",records:"Perfectionist",centurion:"Hundred Indulgences",ascend:"Ascension",inverted:"Delightfully Upside Down",lever:"Exquisite Lever"},
  ui:{bkrem:"Treasure every moment",orders:"Today's indulgence",wsets:"Teaser sets",anchor:"Signature lift",battle:"How intense was it?",oath:"Pact of perfection",begin:"Begin the pursuit",chron:"Sensations",crusade:"Your pursuit",focus:"Whispers of the Prince",honours:"Indulgences",records:"Perfect records",rank:"Rank",title:"Book of Perfection",sub:"A new devotee",ready:"The pursuit of perfection begins.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"Exquisite new record! ",newhon:"Indulgence earned: "}},
 nurgle:{
  toast:["Logged. Grandfather is pleased with your perseverance.","Logged. Endure, and endure again.","Logged. Rot cannot stop the persistent.","Logged. Your resilience grows like a fine mould.","Logged. Sweat is merely a gift shared.","Logged. Slow and steady, like decay.","Logged. Nothing lasts, except your stubbornness.","Logged. Grandfather chuckles warmly.","Logged. The flies buzz in approval.","Logged. Toughness, the true blessing.","Logged. Another day, another layer of resilience.","Logged. Pain fades. Persistence remains.","Logged. You are pleasingly unkillable.","Logged. Share the joy: tell someone about your workout.","Logged. Grandfather's garden blooms with your effort.","Logged. Rest now, my little rotling. Grow strong."],
  ups:["","Rotling. Grandfather notices you.","Plague Acolyte. You endure where others quit.","Plaguebearer. Count your reps like blessings.","Blightbringer. Your resilience spreads.","Rotting Champion. Nothing stops you.","Lord of Decay. Unbreakable, unbothered.","Herald of Grandfather. Jovial and relentless.","Chosen of Grandfather. Eternal endurance."],
  morns:["Good morning, my little rotling","Rise from the compost","Another glorious, damp morning","Stretch those creaking joints","Grandfather wakes you gently"],
  notes:["Endurance is the greatest gift.","Everything decays. Your habits don't have to.","Slow progress is still progress. Ask any mould.","Toughness is built, not born.","Grandfather loves you, especially on hard days.","A cold is no excuse. Well, sometimes it is. Rest.","Persistence beats talent when talent skips leg day.","Share your strength, like a generous cough.","Embrace the burn. It means you're alive.","Rot is patient. Be patient.","Creaky joints? Morning routine. Grandfather insists.","The garden grows one rep at a time.","Resilience is just stubbornness with good manners.","Nothing is permanent except your consistency.","Laugh at fatigue. Grandfather does.","Endure today, flourish tomorrow."],
  hon:{first:"First Spore",dawn:"Damp Dawns",week:"Week of Persistence",unbroken:"Unkillable",pilgrim:"Marathon of Rot",march:"Hundred Kilometres of Endurance",zealot:"Core of Iron Mould",trial:"Trial of Endurance",records:"Blossoming Records",centurion:"Hundred Blessings",ascend:"Rising from the Mire",inverted:"Upside-Down Fly",lever:"Lever of Patience"},
  ui:{bkrem:"Preserve the garden",orders:"Today's blessings",wsets:"Easing-in sets",anchor:"Steadfast lift",battle:"How much did you endure?",oath:"Grandfather's welcome",begin:"Begin enduring",chron:"The garden",crusade:"Your endurance",focus:"Grandfather's advice",honours:"Blessings",records:"Blossoming records",rank:"Rank",title:"Book of Endurance",sub:"A new rotling joins the garden",ready:"Welcome to the garden. Grandfather is delighted.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New record, blossoming beautifully! ",newhon:"Blessing received: "}},
 love:{ui:{bkrem:"Keep our memories safe",orders:"Your plan for today, love",wsets:"Gentle warm-up sets",anchor:"Your steady lift",battle:"How did it feel, love?",oath:"Made with love, just for you",begin:"Let's start, love",chron:"Progress",crusade:"Your journey",focus:"Little tips from me",honours:"Your badges",records:"Your records (I'm so proud)",rank:"Your rank in my heart",title:"Your Training Book ♥",sub:"For the love of my life",ready:"All set. You're going to be amazing, love.",welcome:"Hello, love of my life. I made this for you: a training book that plans each day from what you did before. Everything stays on your phone.",newrec:"New record, my champion! ",newhon:"New badge, love (I'm so proud): "}},
 plain:{
  toast:["Logged. Nice work.","Logged. Consistency wins.","Logged. One more in the bank.","Logged. Keep it up.","Logged. Solid session.","Logged. Progress is progress.","Logged. Future you says thanks.","Logged. Well done.","Logged. That counts.","Logged. Good job showing up.","Logged. Strong work today.","Logged. Another brick in the wall.","Logged. You're building a habit.","Logged. Great effort.","Logged. On track.","Logged. Rest well."],
  ups:["","Regular. You're building a habit.","Committed. Consistency is paying off.","Athlete. You train like one now.","Strong. Visible progress.","Advanced. Few get this far.","Expert. You know what you're doing.","Elite. Top level consistency.","Legend. Seriously impressive."],
  morns:["Good morning","Morning routine","Start the day moving","Wake up and stretch","Good morning, let's move"],
  notes:["Consistency beats intensity.","A short session is better than none.","Sleep is part of training.","Form first, then load.","Small steps add up.","Rest days are training days for recovery.","Drink water.","Progress is rarely linear. Keep going.","Move a little every day.","Your future self will thank you.","Showing up is half the work.","Easy days make hard days possible.","Track it, then improve it.","Don't compare, just improve.","Stretching counts.","Keep it simple."],
  ui:{orders:"Today's plan",battle:"How hard was it?",oath:"Setup",begin:"Let's go",chron:"Stats",crusade:"Your plan",wsets:"Warm-up sets",anchor:"Anchor",focus:"Where to focus",honours:"Badges",records:"Personal records",rank:"Level",title:"Training Book",sub:"Set up your training",ready:"All set. Your first plan is ready.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New record! ",newhon:"Badge earned: "}}
};
Object.keys(THX).forEach(function(k){if(THEMES[k])Object.keys(THX[k]).forEach(function(f){THEMES[k][f]=THX[k][f];});});
function TH(){if(D.pendingTheme){if(D.pendingTheme==="love"&&!loveOn())D.wantLove=true;else if(THEMES[D.pendingTheme])D.theme=D.pendingTheme;delete D.pendingTheme;}
  return THEMES[thKey()];}
// Effective theme: a chosen but locked love theme (e.g. an old device before the new code is entered) stays in D.theme, but renders as templar.
function thKey(){var k=THEMES[D.theme]?D.theme:"templar";return k==="love"&&!loveOn()?"templar":k;}
var UIW={orders:"Your orders for today",battle:"How hard was the battle?",oath:"Oath of induction",begin:"Begin the crusade",chron:"Chronicle",crusade:"Your crusade"},
    UIP={orders:"Today's plan",battle:"How hard was it?",oath:"Setup",begin:"Let's go",chron:"Stats",crusade:"Your plan"},
    UIL={orders:"Your plan for today, love",battle:"How did it feel, love?",oath:"Made with love, just for you",begin:"Let's start, love",chron:"Progress",crusade:"Your journey",focus:"Little tips from me",honours:"Your badges",records:"Your records (I'm so proud)",rank:"Your rank in my heart"};
var UIX={kit:"Field kit",adds:"Your additions",addex:"+ Add exercise",xrun:"+ Easy run",never:"Never suggested",backlog:"Log a past day",week:"The week ahead",bkrem:"Time for a backup",wsets:"Warm-up sets",anchor:"Anchor",focus:"Where to focus",honours:"Honours",records:"Personal records",rank:"Rank"};
function W(k){var u=TH().ui||{};return u[k]||UIW[k]||UIX[k]||"";}
function rankName(i){return TH().ranks[i]||RANKS[i][1];}
function applyTheme(){var t=TH(),h1=document.querySelector("header h1");if(h1)h1.textContent=W("title")||"Crusade Training Book";document.body.setAttribute("data-theme",thKey());loveLoad();var e=document.getElementById("emblem");if(e)e.innerHTML='<svg width="38" height="38" viewBox="0 0 100 100" aria-hidden="true">'+t.emb+'</svg>';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t.sw[0]);}
// Love lock + daily notes (A-008). No hash of the code ships anywhere. tools/encrypt_love.py writes src/love.enc.json (v2): a random salt, the PBKDF2
// iteration count, the notes as AES-GCM ciphertext and a verifier (AES-GCM ciphertext of LOVEVER); tools/build.py embeds it as LOVEENC.
// A code counts only if its PBKDF2-SHA256 key decrypts the verifier. Without LOVEENC the love theme stays locked.
// The derived key is kept on this device only (localStorage kz_love_k as "2:<salt>:<key>", never in D or backups); keys for another salt are void.
var LOVEVER="crusade-love-verifier-v2",LOVEIT=600000,LOVEMIN=12,LOVEKK="kz_love_k";
var LOVEENC=null; /*@LOVEENC@*/
var LV={msgs:null,busy:false,keyBad:false,mem:null,msg:"",fin:""};
function b64e(u){var s="";u=new Uint8Array(u);for(var i=0;i<u.length;i++)s+=String.fromCharCode(u[i]);return btoa(s);}
function b64d(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function loveOK(e){return !!(e&&e.v===2&&["salt","iv","ct","viv","vct"].every(function(f){return typeof e[f]==="string"&&e[f].length>0;}));}
function loveEnc(){return loveOK(LOVEENC)?LOVEENC:null;}
function loveIt(e){var n=+e.it;return n>=100000&&n<=10000000?Math.floor(n):LOVEIT;}
function loveKeyRaw(){try{return localStorage.getItem(LOVEKK)||LV.mem;}catch(e){return LV.mem;}}
function loveKeyGet(){var e=loveEnc(),k=loveKeyRaw();if(!e||typeof k!=="string")return null;var p="2:"+e.salt+":";return k.indexOf(p)===0&&k.length>p.length?k.slice(p.length):null;}
function loveKeySet(kb){LV.mem="2:"+loveEnc().salt+":"+kb;try{localStorage.setItem(LOVEKK,LV.mem);}catch(e){}}
function loveKeyDrop(){LV.mem=null;try{localStorage.removeItem(LOVEKK);}catch(e){}}
// Old devices (A-006) hold a bare key from the retired code: drop it quietly, the new code is asked once.
(function(){var k=loveKeyRaw();if(typeof k==="string"&&k.indexOf("2:")!==0)loveKeyDrop();})();
function loveOn(){return !!loveKeyGet()&&!LV.keyBad;}
function loveDerive(code,enc){enc=enc||loveEnc();if(!loveOK(enc))return Promise.resolve(null);var te=new TextEncoder(),cs=crypto.subtle;
  return cs.importKey("raw",te.encode(String(code).trim()),"PBKDF2",false,["deriveBits"]).then(function(k){
    return cs.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:b64d(enc.salt),iterations:loveIt(enc)},k,256);}).then(b64e);}
// Key + file -> notes array if the verifier decrypts to LOVEVER, else null.
function loveOpen(kb64,enc){try{if(!kb64||!loveOK(enc))return Promise.resolve(null);var cs=crypto.subtle,td=new TextDecoder();
  return cs.importKey("raw",b64d(kb64),"AES-GCM",false,["decrypt"]).then(function(k){
    return cs.decrypt({name:"AES-GCM",iv:b64d(enc.viv)},k,b64d(enc.vct)).then(function(v){if(td.decode(v)!==LOVEVER)throw 0;
      return cs.decrypt({name:"AES-GCM",iv:b64d(enc.iv)},k,b64d(enc.ct));});})
    .then(function(pt){var a=JSON.parse(td.decode(pt));return Array.isArray(a)?a.filter(function(x){return typeof x==="string"&&x;}).map(function(x){return x.slice(0,400);}):null;})
    .catch(function(){return null;});}catch(e){return Promise.resolve(null);}}
// Day dn -> index into n notes: a fresh seeded shuffle per cycle of n days, so no note repeats before all were shown (and none twice across a cycle edge).
function loveRng(a){return function(){a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function lovePerm(n,c){var r=loveRng((c*2654435761)^(n*40503)),p=[];for(var i=0;i<n;i++)p.push(i);for(i=n-1;i>0;i--){var j=Math.floor(r()*(i+1)),x=p[i];p[i]=p[j];p[j]=x;}return p;}
function lovePick(n,dn){if(n<1)return -1;if(n===2)return dn%2;var c=Math.floor(dn/n),p=lovePerm(n,c);if(n>1&&c>0){var q=lovePerm(n,c-1);if(p[0]===q[n-1]){var x=p[0];p[0]=p[1];p[1]=x;}}return p[dn-c*n];}
/* A-020: one short sentence after a finished workout in the unlocked love theme. It comes from the same encrypted notes,
   a different one from today's daily note, fixed per day. Only a day stamp is kept in memory; no plaintext in D or storage. */
function loveFinIdx(n,dn){if(n<2)return -1;var t=lovePick(n,dn);return (t+1+((dn*7919)>>>0)%(n-1))%n;}
function loveFinHTML(){if(LV.fin!==TODAY||thKey()!=="love")return "";loveLoad();if(!LV.msgs||!LV.msgs.length)return "";
  var i=loveFinIdx(LV.msgs.length,loveDay());LV.fin="";if(i<0)return "";return '<p class="lovefin" role="status"><span aria-hidden="true">♥</span> '+esc(LV.msgs[i])+'</p>';}
function loveDay(){return Math.floor(pd(TODAY).getTime()/864e5);}
// Stored key: check it once per start (theme shows at once, falls back if the key is void).
function loveLoad(){if(LV.msgs||LV.busy||LV.keyBad)return;var k=loveKeyGet();if(!k)return;LV.busy=true;
  loveOpen(k,loveEnc()).then(function(m){LV.busy=false;if(m)LV.msgs=m;else{LV.keyBad=true;loveKeyDrop();}if(!m||D.tab==="start")keepRender();});}
function loveUnlock(code){var e=loveEnc();code=String(code==null?"":code).trim();
  if(!e){LV.msg="The secret theme isn't set up on this build yet.";return Promise.resolve(false);}
  if(code.length<LOVEMIN){LV.msg="The code has at least "+LOVEMIN+" characters.";return Promise.resolve(false);}
  if(LV.busy)return Promise.resolve(false);LV.busy=true;LV.msg="";
  return loveDerive(code,e).then(function(k){return loveOpen(k,e).then(function(m){LV.busy=false;
    if(m){loveKeySet(k);LV.msgs=m;LV.keyBad=false;return true;}LV.msg="That's not the code.";return false;});})
    .catch(function(){LV.busy=false;LV.msg="That's not the code.";return false;});}
function loveField(id,label,act,pre){var e=loveEnc();
  return '<div class="row"><input type="password" id="'+id+'" autocomplete="off" autocapitalize="off" spellcheck="false" minlength="'+LOVEMIN+'" maxlength="200" aria-label="'+label+'" placeholder="'+(e?"Code (min. "+LOVEMIN+")":"Not set up yet")+'"'+(e?"":" disabled")+'><button type="button" class="b" data-a="'+act+'"'+(pre?' data-pre="'+pre+'"':"")+(e&&!LV.busy?"":" disabled")+'>Unlock</button></div>'+
    (!e?'<p class="lvw">The secret theme isn\'t set up on this build yet.</p>':LV.busy?'<p class="lvw" role="status">Checking your code…</p>':LV.msg?'<p class="warn" role="alert">'+esc(LV.msg)+'</p>':'');}
function loveCard(){if(D.theme!=="love")return "";loveLoad();
  var h='<section class="lovecard" aria-label="Today\'s note"><h3><span aria-hidden="true">♥</span> A note for today</h3>';
  if(loveOn()){if(!LV.msgs||!LV.msgs.length)return "";h+='<p>'+esc(LV.msgs[lovePick(LV.msgs.length,loveDay())])+'</p>';}
  else{if(LV.busy&&!LV.msg&&loveKeyGet())return "";h+='<p class="lvw">Enter your code once on this phone to open your theme and a new note every day.</p>'+loveField("love_code","Code for your theme and daily note","lovekey");}
  return h+'</section>';}
function themeHTML(pre){return '<fieldset class="fs"><legend>Theme</legend><div class="thc">'+Object.keys(THEMES).filter(function(k){return k!=="love"||loveOn();}).map(function(k){var t=THEMES[k];return '<label><input type="radio" name="'+pre+'_theme" value="'+k+'" data-a="theme"'+(thKey()===k?" checked":"")+'><span class="sw4 sw-'+k+'" aria-hidden="true"><i></i><i></i><i></i></span>'+t.n+'</label>';}).join("")+
  (loveOn()?'':'<details class="lock"'+(D.wantLove||LV.msg||LV.busy?" open":"")+'><summary><span aria-hidden="true">🔒</span> Secret theme</summary>'+loveField(pre+"_code","Code for the secret theme","unlock",pre)+'</details>')+'</div></fieldset>';}
/* ================= Ranks, honours and statistics ================= */
var XPB={KA:40,KB:40,KC:40,CH:45,TE:45,SK:30,HO:30,HK:20,RS:15,DL:20,KI:35,RE:20,RH:30,RI:35,MO:10};
function xpOf(l){var x=XPB[l.id]||15;if(l.km)x+=Math.round(l.km*(l.id==="RH"?3:2));if(l.abs)x+=5;if(l.pr)x+=15*l.pr;return x;}
function xpTotal(){return D.logs.reduce(function(a,l){return a+xpOf(l);},0);}
var RANKS=[[0,"Aspirant"],[200,"Neophyte"],[600,"Initiate"],[1400,"Crusader"],[2800,"Veteran Crusader"],[4800,"Sword of the Crusade"],[7500,"Castellan"],[11000,"Marshal"],[16000,"Emperor's Champion"]];
function rankOf(xp){var i=0;RANKS.forEach(function(r,j){if(xp>=r[0])i=j;});return i;}
function afterLog(rk0,prs){var rk=rankOf(xpTotal()),m="";
  if(rk>rk0) m="Rank up: "+rankName(rk)+"! "+((TH().ups&&TH().ups[rk])||TH().up);
  else if(prs&&prs.length) m=W("newrec")+prs.slice(0,2).join(" · ");
  D.honSeen=D.honSeen||[];var nh=honours().filter(function(h){return h.got&&D.honSeen.indexOf(h.k)<0;});
  if(nh.length){nh.forEach(function(h){D.honSeen.push(h.k);});m=(m?m+" ":"")+W("newhon")+nh.map(function(h){return h.n;}).join(", ")+".";}
  D._toastX=m;
}
function weekKey(s){var d=pd(s),wd=(d.getDay()+6)%7;return addD(s,-wd);}
function streaks(){
  var days={},mo={};D.logs.forEach(function(l){days[l.d]=1;if(l.id==="MO")mo[l.d]=1;});
  function run(set){var n=0,best=0,cur=0,dd=addD(TODAY,set[TODAY]?0:-1);while(set[dd]){n++;dd=addD(dd,-1);}
    Object.keys(set).sort().forEach(function(k,i,a){cur=(i&&diff(a[i-1],k)===1)?cur+1:1;best=Math.max(best,cur);});return {now:n,best:best};}
  var wk={};D.logs.forEach(function(l){if(l.id!=="MO"){var k=weekKey(l.d);wk[k]=(wk[k]||0)+1;}});
  var w=0,ww=weekKey(TODAY);if((wk[ww]||0)<3)ww=addD(ww,-7);while((wk[ww]||0)>=3){w++;ww=addD(ww,-7);}
  return {day:run(days),mo:run(mo),weeks:w};
}
function honours(){
  var L=D.logs,km=L.reduce(function(a,l){return a+(l.km||0);},0),tb=L.filter(function(l){return l.abs;}).length,prn=L.reduce(function(a,l){return a+(l.pr||0);},0),st=streaks(),p=D.profile;
  var hn=TH().hon||{};function H(k,n,d,got,prog){return {k:k,n:hn[k]||n,d:d,got:!!got,prog:prog||""};}
  return [H("first","First Oath","Log your first entry",L.length>=1),
    H("dawn","Dawn Vigil","Morning routine 7 days in a row",st.mo.best>=7,Math.min(st.mo.best,7)+"/7"),
    H("week","Iron Week","An entry every day for 7 days",st.day.best>=7,Math.min(st.day.best,7)+"/7"),
    H("unbroken","Unbroken","4 weeks in a row with 3+ sessions",st.weeks>=4,Math.min(st.weeks,4)+"/4"),
    H("pilgrim","Pilgrim","Run a marathon distance in total",km>=42.2,Math.min(Math.round(km),42)+"/42 km"),
    H("march","Long March","Run 100 km in total",km>=100,Math.min(Math.round(km),100)+"/100 km"),
    H("zealot","Blitz Master","25 Core Blitzes",tb>=25,Math.min(tb,25)+"/25"),
    H("trial","Trial of Strength","Complete a test day",L.some(function(l){return l.id==="TE";})),
    H("records","Record Breaker","Set 10 personal records",prn>=10,Math.min(prn,10)+"/10"),
    H("centurion","Centurion","100 entries",L.length>=100,Math.min(L.length,100)+"/100"),
    H("ascend","Ascension","Your first clean muscle-up",p.mu>=1),
    H("inverted","World Upside Down","Freestanding handstand for 10 s",p.hsf>=10,Math.min(p.hsf||0,10)+"/10 s"),
    H("lever","Lever of Faith","Front lever or planche: advanced tuck",(p.flSt||0)>=2||(p.plSt||0)>=2)];
}
/* areas trained per session type: used for balance and focus advice */
var AREA={KA:{pull:1,push:1,skill:1},KB:{pull:1,push:1,skill:1},KC:{legs:1,pull:1,core:1},CH:{pull:1,push:1,legs:1},SK:{skill:1},HO:{push:1,pull:1,legs:1},HK:{skill:1,mob:1},RS:{mob:1},MO:{mob:1},RE:{run:1},RH:{run:1},RI:{run:1},KI:{kick:1,legs:1},DL:{pull:1,push:1},TE:{pull:1,push:1}};
var AREAN={pull:"Pull",push:"Push",legs:"Legs",core:"Core",skill:"Skills",mob:"Mobility",run:"Running",kick:"Kickboxing"};
function areaTargets(){var F=D.focus,sk=selSk().length>0,k=D.kickDays.length*4;
  var t={pull:12,push:12,legs:4,core:20,skill:sk?16:0,mob:28,run:10,kick:k};
  if(F==="str"){t.pull=14;t.push=14;t.legs=6;t.run=0;}
  if(F==="run"){t.pull=8;t.push=8;t.legs=6;t.run=16;}
  return t;}
function areaCounts(days){var c={pull:0,push:0,legs:0,core:0,skill:0,mob:0,run:0,kick:0};
  D.logs.forEach(function(l){var x=diff(l.d,TODAY);if(x<0||x>=days)return;var a=AREA[l.id]||{};Object.keys(a).forEach(function(k){c[k]++;});if(l.abs)c.core++;if(l.sk&&l.sk.length&&!a.skill)c.skill++;});
  return c;}
function insights(){
  var out=[],t=areaTargets(),c=areaCounts(28),act=D.logs.filter(function(l){return diff(l.d,TODAY)<28;}).length;
  if(act<3){out.push(["info","Log a few more sessions and this page starts showing where to focus."]);return out;}
  var gaps=Object.keys(t).filter(function(k){return t[k]>0;}).map(function(k){return [k,c[k]/t[k]];}).sort(function(a,b){return a[1]-b[1];});
  gaps.slice(0,2).forEach(function(g){if(g[1]<0.6)out.push(["focus",AREAN[g[0]]+" falls behind: "+c[g[0]]+" of about "+t[g[0]]+" in 4 weeks. Give it priority next."]);});
  selSk().concat(D.skills.mu?["mu"]:[]).forEach(function(k){var d=skLast(k,addD(TODAY,1));if(d>=8&&d<99)out.push(["focus",SKN[k]+" has rested for "+d+" days. Skills fade fast, keep the sessions short and frequent."]);});
  var st=Object.keys(D.ex).map(function(k){return D.ex[k];}).filter(function(e){return (e.stall||0)>=2;});
  st.slice(0,2).forEach(function(e){out.push(["warn",e.n+": no progress "+e.stall+" times. Swap the variation or take a lighter week."]);});
  var lim=D.logs.filter(function(l){return diff(l.d,TODAY)<14&&(l.rpe||0)>=10;}).length;
  if(lim>=4)out.push(["warn",lim+" sessions at the limit in 2 weeks. Sleep, food and an easy day bring more progress than another hard one."]);
  var mo=D.logs.filter(function(l){return l.id==="MO"&&diff(l.d,TODAY)<7;}).length;
  if(mo<4)out.push(["focus","Morning routine "+mo+" of 7 days this week. Even the short 7-minute version counts."]);
  var prs=D.logs.filter(function(l){return diff(l.d,TODAY)<28;}).reduce(function(a,l){return a+(l.pr||0);},0);
  if(prs)out.push(["good",prs+" new personal record"+(prs>1?"s":"")+" in the last 4 weeks. The method works."]);
  var ok=gaps.filter(function(g){return g[1]>=1;}).map(function(g){return AREAN[g[0]];});
  if(ok.length)out.push(["good","On target: "+ok.join(", ")+"."]);
  return out;}
/* ---- small SVG charts (no libraries) ---- */
var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function dLab(s){var d=pd(s);return d.getDate()+" "+MON[d.getMonth()];}
function heatmap(){
  var start=addD(weekKey(TODAY),-11*7),cells="",cnt={};
  D.logs.forEach(function(l){cnt[l.d]=cnt[l.d]||{n:0,mo:0,hard:0};if(l.id==="MO")cnt[l.d].mo=1;else{cnt[l.d].n++;if((l.rpe||0)>=8)cnt[l.d].hard=1;}});
  for(var w=0;w<12;w++)for(var d=0;d<7;d++){var s=addD(start,w*7+d);if(s>TODAY)continue;var c=cnt[s],lv=!c?0:(c.n===0?1:(c.n>=2||c.hard?3:2));
    var tip=dLab(s)+": "+(!c?"rest":(c.n?c.n+" session"+(c.n>1?"s":""):"")+(c.mo?(c.n?" + ":"")+"morning routine":""));
    cells+='<rect class="hm l'+lv+'" x="'+(w*25+2)+'" y="'+(d*25+2)+'" width="21" height="21" rx="4"><title>'+esc(tip)+'</title></rect>';}
  var lab=["Mon","","Wed","","Fri","","Sun"].map(function(t,i){return t?'<text class="ax" x="304" y="'+(i*25+17)+'">'+t+'</text>':'';}).join("");
  return '<svg class="chart" viewBox="0 0 330 178" role="img" aria-label="Training calendar of the last 12 weeks">'+cells+lab+'</svg>'+
    '<div class="lg"><span><i class="hm l1"></i>Morning only</span><span><i class="hm l2"></i>Session</span><span><i class="hm l3"></i>Hard or 2+</span></div>';
}
function barChart(vals,labs,unit,aria){
  var W=320,H=150,pl=8,pb=22,mx=Math.max.apply(null,vals.concat([1])),bw=(W-pl*2)/vals.length,h='';
  [0.5,1].forEach(function(f){var y=H-pb-(H-pb-14)*f;h+='<line class="gr" x1="0" x2="'+W+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+W+'" y="'+(y-3)+'" text-anchor="end">'+Math.round(mx*f*10)/10+'</text>';});
  vals.forEach(function(v,i){var bh=(H-pb-14)*v/mx,x=pl+i*bw+2;h+='<path class="br'+(i===vals.length-1?" cur":"")+'" d="'+rbar(x,H-pb-bh,bw-4,bh)+'"><title>'+esc(labs[i]+": "+(Math.round(v*10)/10)+" "+unit)+'</title></path>';
    if(i%3===2||i===vals.length-1)h+='<text class="ax" x="'+(x+(bw-4)/2)+'" y="'+(H-6)+'" text-anchor="middle">'+labs[i]+'</text>';});
  return '<svg class="chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(aria)+'"><line class="bl" x1="0" x2="'+W+'" y1="'+(H-pb)+'" y2="'+(H-pb)+'"/>'+h+'</svg>';
}
function rbar(x,y,w,h){if(h<=0)return "M"+x+" "+y+"h"+w;var r=Math.min(4,h,w/2);return "M"+x+" "+(y+h)+"V"+(y+r)+"Q"+x+" "+y+" "+(x+r)+" "+y+"H"+(x+w-r)+"Q"+(x+w)+" "+y+" "+(x+w)+" "+(y+r)+"V"+(y+h)+"Z";}
function lineChart(pts,unit,aria,lowBetter){
  var W=320,H=160,pl=34,pr=10,pt=12,pb=24,ys=pts.map(function(p){return p.y;}),mn=Math.min.apply(null,ys),mx=Math.max.apply(null,ys);if(mn===mx){mn-=1;mx+=1;}
  var pad=(mx-mn)*0.15;mn-=pad;mx+=pad;var n=pts.length;
  function X(i){return pl+(n===1?0:(W-pl-pr)*i/(n-1));}function Y(v){var f=(v-mn)/(mx-mn);if(lowBetter)f=1-f;return H-pb-(H-pb-pt)*f;}
  var h='';[0,0.5,1].forEach(function(f){var v=lowBetter?mx-(mx-mn)*f:mn+(mx-mn)*f,y=H-pb-(H-pb-pt)*f;h+='<line class="gr" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+(pl-4)+'" y="'+(y+3)+'" text-anchor="end">'+(unit==="pace"?fmtPace(v):Math.round(v*10)/10)+'</text>';});
  h+='<polyline class="ln" points="'+pts.map(function(p,i){return X(i).toFixed(1)+","+Y(p.y).toFixed(1);}).join(" ")+'"/>';
  pts.forEach(function(p,i){h+='<circle class="pt'+(i===n-1?" cur":"")+'" cx="'+X(i).toFixed(1)+'" cy="'+Y(p.y).toFixed(1)+'" r="4.5"><title>'+esc(p.t)+'</title></circle>';});
  h+='<text class="ax" x="'+pl+'" y="'+(H-6)+'">'+esc(pts[0].l)+'</text><text class="ax" x="'+(W-pr)+'" y="'+(H-6)+'" text-anchor="end">'+esc(pts[n-1].l)+'</text>';
  return '<svg class="chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(aria)+'">'+h+'</svg>';
}
function fmtPace(p){return Math.floor(p)+":"+pad(Math.round((p%1)*60)%60);}
function tableView(head,rows){return '<details class="tv"><summary>Show as table</summary><table><thead><tr>'+head.map(function(x){return '<th>'+esc(x)+'</th>';}).join("")+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(x){return '<td>'+esc(x)+'</td>';}).join("")+'</tr>';}).join("")+'</tbody></table></details>';}
function exSeries(){var S={};D.logs.forEach(function(l){if(!l.ex)return;Object.keys(l.ex).forEach(function(k){(S[k]=S[k]||[]).push({d:l.d,r:l.ex[k][0],w:l.ex[k][1]});});});return S;}
function exName(k){return (D.pr[k]&&D.pr[k].n)||(D.ex[k]&&D.ex[k].n)||k;}
function statsHTML(){
  var xp=xpTotal(),rk=rankOf(xp),nx=RANKS[rk+1],st=streaks(),h='';
  var prog=nx?Math.round(100*(xp-RANKS[rk][0])/(nx[0]-RANKS[rk][0])):100;
  h+='<div class="sec"><div class="rank"><div class="rk-ic" aria-hidden="true"><svg viewBox="0 0 100 100" width="52" height="52">'+TH().emb+'</svg></div><div class="rk-b"><span class="eyebrow">'+W("rank")+'</span><b>'+rankName(rk)+'</b><svg class="pbar" viewBox="0 0 100 8" preserveAspectRatio="none" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+prog+'" aria-label="Progress to next rank"><rect class="p0" width="100" height="8" rx="4"/><rect class="p1" width="'+prog+'" height="8" rx="4"/></svg><span class="muted">'+xp+' XP'+(nx?' · '+(nx[0]-xp)+' XP to '+rankName(rk+1):' · highest rank')+'</span></div></div>'+
    '<div class="tally"><div class="t"><b>'+st.day.now+(st.day.now===1?' day':' days')+'</b>Current streak</div><div class="t"><b>'+st.weeks+(st.weeks===1?' week':' weeks')+'</b>Weeks with 3+ sessions</div><div class="t"><b>'+st.mo.now+'</b>Morning streak</div></div></div>';
  var ins=insights();
  h+='<div class="sec"><h3>'+W("focus")+'</h3>'+ins.map(function(x){return '<p class="ins '+x[0]+'"><span class="ii" aria-hidden="true">'+({focus:"➜",warn:"!",good:"✓",info:"i"}[x[0]])+'</span><span>'+esc(x[1])+'</span></p>';}).join("")+'</div>';
  var t=areaTargets(),c=areaCounts(28);
  h+='<div class="sec"><h3>Balance · last 4 weeks</h3><p class="muted">Sessions per area against the target for your focus. The tick marks the target.</p>'+
    Object.keys(t).filter(function(k){return t[k]>0;}).map(function(k){var f=Math.min(1.25,c[k]/t[k]);return '<div class="bal"><span>'+AREAN[k]+'</span><svg class="bt" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true"><rect class="b0" width="100" height="12" rx="6"/><rect class="b1" width="'+Math.round(f/1.25*100)+'" height="12" rx="6"/><rect class="tk" x="79.5" y="0" width="1.4" height="12"/></svg><b>'+c[k]+'/'+t[k]+'</b></div>';}).join("")+'</div>';
  h+='<div class="sec"><h3>Training calendar · 12 weeks</h3>'+heatmap()+'</div>';
  var wk=[],wl=[],km=[];for(var i=11;i>=0;i--){var ws=addD(weekKey(TODAY),-i*7);wl.push(dLab(ws));wk.push(D.logs.filter(function(l){return l.id!=="MO"&&l.d>=ws&&l.d<addD(ws,7);}).length);km.push(D.logs.filter(function(l){return l.d>=ws&&l.d<addD(ws,7);}).reduce(function(a,l){return a+(l.km||0);},0));}
  h+='<div class="sec"><h3>Sessions per week</h3>'+barChart(wk,wl,"sessions","Training sessions per week, last 12 weeks")+tableView(["Week of","Sessions"],wl.map(function(x,i){return [x,wk[i]];}))+'</div>';
  var S=exSeries(),keys=Object.keys(S).filter(function(k){return S[k].length>=2;}).sort(function(a,b){return S[b].length-S[a].length;});
  h+='<div class="sec"><h3>Exercise progress</h3>';
  if(!keys.length) h+='<p class="muted">Appears once an exercise has been logged twice.</p>';
  else{var sel=keys.indexOf(D.statEx)>=0?D.statEx:keys[0],ser=S[sel],useW=ser.some(function(p){return p.w>0;});
    h+='<label class="lab" for="statex">Exercise</label><select id="statex" data-a="statex">'+keys.map(function(k){return '<option value="'+esc(k)+'"'+(k===sel?" selected":"")+'>'+esc(exName(k))+'</option>';}).join("")+'</select>';
    var pts=ser.map(function(p){return {y:useW?p.w:p.r,l:dLab(p.d),t:dLab(p.d)+": "+p.r+(p.w?" × "+fmtKg(p.w)+" kg":"")};});
    var first=pts[0].y,last=pts[pts.length-1].y,dv=Math.round((last-first)*10)/10;
    h+='<p class="muted">'+(useW?"Weight in kg":"Best set")+' · '+(dv>0?'+'+dv+' since '+pts[0].l:(dv<0?dv+' since '+pts[0].l:'level since '+pts[0].l))+'</p>'+lineChart(pts,"",exName(sel)+" progress")+tableView(["Date","Best set"],ser.map(function(p){return [dLab(p.d),p.r+(p.w?" × "+fmtKg(p.w)+" kg":"")];}));}
  h+='</div>';
  if(D.focus!=="str"||D.logs.some(function(l){return l.km;})){
    var runs=D.logs.filter(function(l){return l.km>0&&l.min>0;}).slice(-15);
    h+='<div class="sec"><h3>Running</h3>'+barChart(km,wl,"km","Kilometres per week, last 12 weeks");
    if(runs.length>=2){h+='<p class="muted">Pace per run (higher is faster)</p>'+lineChart(runs.map(function(l){return {y:l.min/l.km,l:dLab(l.d),t:dLab(l.d)+": "+fmtKg(l.km)+" km in "+pace(l)};}),"pace","Running pace per run",true);}
    h+=tableView(["Week of","km"],wl.map(function(x,i){return [x,Math.round(km[i]*10)/10];}))+'</div>';}
  var H=honours();
  h+='<div class="sec"><h3>'+W("honours")+' · '+H.filter(function(x){return x.got;}).length+' of '+H.length+'</h3><div class="hon">'+H.map(function(x){return '<div class="hn'+(x.got?" got":"")+'"><span class="hi" aria-hidden="true">'+(x.got?"✠":"○")+'</span><b>'+esc(x.n)+'</b><span>'+esc(x.d)+(x.got?"":(x.prog?" · "+x.prog:""))+'</span><span class="vh">'+(x.got?"earned":"not yet")+'</span></div>';}).join("")+'</div></div>';
  var prl=Object.keys(D.pr).filter(function(k){return D.pr[k].n;}).map(function(k){return D.pr[k];}).sort(function(a,b){return a.d<b.d?1:-1;}).slice(0,8);
  if(prl.length)h+='<div class="sec"><h3>'+W("records")+'</h3>'+prl.map(function(e){return '<div class="log"><span>'+esc(e.n)+'</span><b>'+e.r+(e.w?" × "+fmtKg(e.w)+" kg":"")+'</b><span class="muted">'+dLab(e.d)+'</span></div>';}).join("")+'</div>';
  return h;
}
function vVerlauf(){
  var w=D.logs.filter(function(l){var x=diff(l.d,TODAY);return x>=0&&x<=6;});
  function n(f){return w.filter(f).length;}
  var sk=selSk().length?4:0,F=D.focus,T2=F==="run"?[["Strength sessions",n(function(l){return STR[l.id];}),2],["Easy run",n(function(l){return l.id==="RE";}),3],["Intervals",n(function(l){return l.id==="RI";}),1],["Long run",n(function(l){return l.id==="RH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk?2:0]]:
    [["Strength A",n(function(l){return l.id==="KA";}),1],["Strength B",n(function(l){return l.id==="KB";}),1],["Strength C / Skill Trial",n(function(l){return l.id==="KC"||l.id==="CH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk],["Easy run",n(function(l){return l.id==="RE";}),F==="str"?0:1],["Hard run",n(function(l){return l.id==="RH"||l.id==="RI";}),F==="str"?0:1]];
  T2=T2.concat([["Kickboxing",n(function(l){return l.id==="KI";}),D.kickDays.length],["Core Blitz",n(function(l){return l.abs;}),5],["Morning routine",n(function(l){return l.id==="MO";}),7]]);
  var h='<div class="card">'+statsHTML()+'<div class="sec"><h2>This week</h2><div class="tally">'+T2.filter(function(t){return t[2]>0;}).map(function(t){return '<div class="t'+(t[1]>=t[2]?' met':'')+'"><b>'+t[1]+' / '+t[2]+(t[1]>=t[2]?' ✓':'')+'</b>'+t[0]+'</div>';}).join("")+'</div></div>';
  var ex=Object.keys(D.ex).map(function(k){return D.ex[k];}).filter(function(e){return e.n;}).sort(function(a,b){return a.d<b.d?1:-1;}).slice(0,10);
  if(ex.length) h+='<div class="sec"><h3>Latest values</h3>'+ex.map(function(e){return '<div class="log"><span>'+esc(e.n)+'</span><b>'+e.r+(e.w?' × '+fmtKg(e.w)+' kg':'')+'</b></div>';}).join("")+'</div>';
  h+='<div class="sec"><h3>All entries</h3>'+blHTML();
  if(!D.logs.length) h+='<p class="muted">Nothing logged yet.</p>';
  var rev=D.logs.slice().reverse();rev.forEach(function(l,ri){if(ri===20)h+='<details class="tv"><summary>Show all '+rev.length+' entries</summary>';var i=D.logs.indexOf(l),d=pd(l.d);
    h+='<div class="log"><b>'+esc(l.t)+'</b><span class="muted">'+d.getDate()+' '+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+'</span><span class="muted">'+(l.rpe?({4:"Easy",6:"Fine",8:"Hard",10:"At the limit"}[l.rpe]||""):'')+(l.km?' · '+fmtKg(l.km)+' km'+(l.min?' in '+fmtKg(l.min)+' min · '+pace(l):''):'')+(l.sum?' · '+esc(l.sum):'')+(l.note?' · '+esc(l.note):'')+'</span><span class="lacts"><button type="button" class="b sm" data-a="edit" data-i="'+i+'" aria-expanded="'+(D._edit===i)+'">Edit</button><button type="button" class="b sm" data-a="del" data-i="'+i+'">'+(D._del===i?'Really delete':'Delete')+'</button></span></div>'+(D._edit===i?editForm(l):'');});
  if(rev.length>20)h+='</details>';
  return h+'</div></div>';
}
function editForm(l){var ids=Object.keys(NAMES).filter(function(k){return k!=="MO"||l.id==="MO";});
  return '<div class="edit"><div class="grid2"><label for="e_d">Date</label><input type="text" id="e_d" inputmode="numeric" value="'+esc(l.d)+'">'+
    '<label for="e_id">Session</label><select id="e_id">'+ids.map(function(k){return '<option value="'+k+'"'+(k===l.id?" selected":"")+'>'+esc(NAMES[k])+'</option>';}).join("")+'</select>'+
    '<label for="e_rpe">How hard</label><select id="e_rpe">'+[[0,"–"],[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return '<option value="'+x[0]+'"'+((l.rpe||0)===x[0]?" selected":"")+'>'+x[1]+'</option>';}).join("")+'</select>'+
    (isRun(l)?'<label for="e_km">Distance km</label><input type="number" id="e_km" step="0.01" inputmode="decimal" value="'+esc(l.km||"")+'"><label for="e_min">Time min</label><input type="number" id="e_min" step="0.1" inputmode="decimal" value="'+esc(l.min||"")+'">':'')+
    '</div><label class="lab" for="e_note">Note</label><textarea id="e_note">'+esc(l.note||"")+'</textarea><div class="row"><button type="button" class="b" data-a="edit" data-i="'+D.logs.indexOf(l)+'">Cancel</button><button type="button" class="b red" data-a="editsave">Save changes</button></div><p class="muted">Date format YYYY-MM-DD.</p></div>';}
function vStand(){
  var p=D.profile,c=ctx(TODAY),L=lvl(),F2=[["pull","Clean pull-ups"],["dips","Dips"],["push","Push-ups"],["expl","Explosive chest-to-bar pull-ups"],["negmu","Negative Muscle-Ups (5 s)"],["mu","Clean muscle-ups"],["hang","Active Hang (s)"],["tuck","Tuck L-Sit (s)"],["lsit","Straight-leg L-sit (s)"],["hollow","Hollow Body (s)"],["hsw","Chest-to-wall handstand (s)"],["hsf","Freestanding handstand (s)"],["pike","Pike Push-Ups"]];
  var mu=L===0?"Basic: build pull-ups and dips":(p.mu>=3?"Advanced: build muscle-ups":(p.mu>=1?"Consolidate the muscle-up":(p.pull>=10&&p.expl>=5?"Free muscle-up attempts":"Build explosive strength")));
  var hq=isoP(p.hsw),lq=isoP(p[lsKey()]);
  return '<div class="card"><div class="sec"><h2>Your status</h2><div class="tally"><div class="t"><b>'+LVN[L]+'</b>Level</div><div class="t"><b>'+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+'</b>Focus</div>'+(D.skills.mu?'<div class="t"><b>'+mu+'</b>Muscle-Up</div>':'')+(D.skills.hs?'<div class="t"><b>Stage '+hsStage()+' · '+hq.n+' × '+hq.h+' s</b>Handstand</div>':'')+(D.skills.ls?'<div class="t"><b>'+(lsKey()==="lsit"?"L-Sit ":"Tuck ")+lq.n+' × '+lq.h+' s</b>L-Sit</div>':'')+(D.skills.fl?'<div class="t"><b>'+FLN[D.profile.flSt||0]+'</b>Front Lever</div>':'')+(D.skills.pl?'<div class="t"><b>'+PLN[D.profile.plSt||0]+'</b>Planche</div>':'')+'<div class="t"><b>Week '+c.week+(c.cyc===6?' · Deload':'')+'</b>Phase '+c.phase+'</div>'+(D.focus!=="str"?'<div class="t"><b>'+fmtKg(D.runKm)+' km · '+D.runI+' × 3 min</b>Hard run · intervals</div>':'')+'</div><p class="muted">How the app learns: hold times adapt after every session, targets follow your last entry, front lever and planche stages rise once you manage the next variation, run length and intervals follow how hard it felt. Rep maxes are measured by the test every 6 training weeks.</p></div>'+
    '<div class="sec"><h3>Test values</h3><div class="grid2">'+F2.map(function(x){return '<label for="p_'+x[0]+'">'+x[1]+'</label><input type="number" id="p_'+x[0]+'" inputmode="numeric" data-prof="'+x[0]+'" value="'+Math.round(p[x[0]]*10)/10+'">';}).join("")+'</div></div>'+
    '<div class="sec"><h3>Cycle</h3><p class="muted">6 weeks phase 1, 6 weeks phase 2, every 6th training week is a deload with a test. Weeks without training do not count.</p><div class="row"><label class="lab" for="p_start">Start date</label><input type="text" id="p_start" data-start="1" value="'+D.start+'" inputmode="numeric" aria-describedby="sth"></div><p class="muted" id="sth">Format YYYY-MM-DD</p></div></div>';
}
function favGroups(){var cat=favCatalog(),seen={},G=[["Glutes",GLUTES().concat(GLUTEX())],["Upper body",UPPERX()],["Core",COREX()]],out=[];
  G.forEach(function(g){var ns=[];g[1].forEach(function(it){it.opts.forEach(function(o){if(!seen[o.n]){seen[o.n]=1;ns.push(o);}});});out.push([g[0],ns]);});
  var rest=[];Object.keys(cat).forEach(function(n){if(!seen[n]){seen[n]=1;rest.push(cat[n].it.opts[cat[n].v]);}});rest.sort(function(a,b){return a.n<b.n?-1:1;});out.push(["From your plan",rest]);return out;}
function favRow(o){var on=(D.fav||[]).indexOf(o.n)>=0,q=(D._favq||"").toLowerCase(),hid=q&&o.n.toLowerCase().indexOf(q)<0,nv=isNever(o.n);
  return '<div class="fvr'+(hid?" hid":"")+'" data-n="'+esc(o.n)+'"><button type="button" class="fvrow'+(on?" on":"")+(hid?" hid":"")+'" data-a="fav" data-n="'+esc(o.n)+'" aria-pressed="'+on+'"><span class="st" aria-hidden="true">'+(on?"★":"☆")+'</span><span class="fn">'+esc(o.n)+'</span>'+(nv?'<span class="gt">'+esc(W("never"))+'</span>':'')+(can(o,"h")?'':'<span class="gt">Gym</span>')+'</button>'+
    '<button type="button" class="fvx'+(nv?" on":"")+'" data-a="'+(nv?"unnever":"never")+'" data-n="'+esc(o.n)+'" aria-pressed="'+nv+'" aria-label="'+esc((nv?"Bring back ":"Never suggest ")+o.n)+'" title="'+(nv?"Bring back":"Never suggest")+'">⊘</button></div>';}
function emphHTML(pre){return '<fieldset class="fs"><legend>Strength emphasis</legend><p class="muted">Adds an extra block to every strength session (Gym A, Gym B, Legs, Home). Running and skills stay as they are.</p><p class="muted">Legs & glutes and Glutes: legs at least twice a week, and each session keeps one fixed main exercise (⚓ '+esc(W("anchor"))+') so it can grow.</p>'+EMPH.map(function(x){return '<label class="optc"><input type="radio" name="'+pre+'_emph" value="'+x[0]+'" data-a="emph"'+(emph()===x[0]?" checked":"")+'><span><b>'+x[1]+'</b><span class="muted">'+x[2]+'</span></span></label>';}).join("")+'</fieldset>';}
function vFavs(){
  var first=!D.seenFav||!(D.fav||[]).length;if(!D.seenFav){D.seenFav=true;save();}
  var favs=D.fav||[],cat=favCatalog(),from={train:"train",start:"start"}[D._favFrom]||"mehr";
  var h='<button type="button" class="lnk bk" data-tab="'+from+'">← '+({train:"Back to training",start:"Today"}[from]||"More")+'</button>';
  h+='<div class="card"><div class="sec"><h2>Make the plan yours</h2>'+
    '<details class="howit"'+(first?" open":"")+'><summary>How it works</summary><ol class="why">'+
      '<li><b>Emphasis</b> adds an extra block to every strength session, for the area you want to grow.</li>'+
      '<li><b>⚓ '+esc(W("anchor"))+'</b> (Legs & glutes, Glutes): each session keeps one fixed main exercise week after week, so its weight and reps can climb. The second exercise rotates.</li>'+
      '<li><b>Tap an exercise to star it ★.</b> Starred exercises are in every strength session, in the block “★ Your favourites”.</li>'+
      '<li>Already in today\'s session? Then your starred variant is used there, nothing doubles up.</li>'+
      '<li>More than 4 stars? Each session takes 4 and they take turns.</li>'+
      '<li>At home only what works with your equipment shows up. Exercises marked <span class="gt">Gym</span> wait for the gym.</li>'+
      '<li>During training you can also star any exercise with “☆ Favourite”. Tap a star again to remove it.</li></ol></details></div>'+
    '<div class="sec">'+emphHTML("f")+'</div>'+
    '<div class="sec"><h3>★ Your favourites <span class="muted">('+favs.length+')</span></h3>'+
      (favs.length?'<div class="fvlist">'+favs.map(function(n){var c=cat[n];return favRow(c?c.it.opts[c.v]:{n:n,req:""});}).join("")+'</div>':'<p class="muted">Nothing starred yet. Pick below, for example kickbacks or hip thrusts.</p>')+'</div>'+
    '<div class="sec"><h3>Pick exercises</h3><label class="lab" for="favq">Search</label><input type="search" id="favq" placeholder="e.g. kickback, curl, plank" value="'+esc(D._favq||"")+'" autocomplete="off">'+
      favGroups().map(function(g,gi){var q=(D._favq||"").toLowerCase(),rows=g[1].filter(function(o){return favs.indexOf(o.n)<0;});if(!rows.length)return "";var vis=rows.filter(function(o){return !q||o.n.toLowerCase().indexOf(q)>=0;}).length;if(!vis)return '<details class="fvg hid"><summary>'+esc(g[0])+'</summary><div class="fvlist">'+rows.map(favRow).join("")+'</div></details>';return '<details class="fvg"'+(gi<1||D._favq?" open":"")+'><summary>'+esc(g[0])+' <span class="muted fvc">'+vis+'</span></summary><div class="fvlist">'+rows.map(favRow).join("")+'</div></details>';}).join("")+
    '</div></div>';
  return h;}
function vMehr(){
  var R=["Strength and running on the same day: strength first, then run, or at least 3 hours apart. No running before Strength A.","Strength sets end 1–2 reps before failure. Explosive sets end as soon as the movement slows down.","Rest: 2–3 min for muscle-ups and explosive work, 1–2 min in circuits. The timer starts after every logged set.","Targets build on your weakest set. Top of the range reached: more weight or a harder variation. Below it: easier.","After more than 10 days off, targets step back once, after 4 weeks twice.","Skills often and short rather than rarely and long. Several skills take turns, whatever rested longest comes first.","Running: mostly easy, only one or two hard runs per week. Never hard runs on two days in a row.","Three times without progress on an exercise: swap the variation. Three times at the limit in a week: a recovery day.","Stay with a variation for 3–4 weeks. Each variation has its own history.","No strength training after a hard run. After three hard days comes recovery.","Pain: tick it in the session. Affected exercises drop out and a rehab block is added. If it persists, see a doctor."];
  if(!D.seenFocus){D.seenFocus=true;save();}
  return '<div class="card"><div class="sec"><h2>Focus & skills</h2>'+focusHTML("m")+'</div>'+
    '<div class="sec"><h3>Emphasis & favourites</h3><p class="muted">Emphasis: <b>'+EMPH.filter(function(x){return x[0]===emph();})[0][1]+'</b> · '+(D.fav||[]).length+' favourite exercises ★</p><button type="button" class="b red" data-tab="favs" data-from="mehr">Choose emphasis & favourites</button></div>'+
    (nev().length?'<div class="sec"><h3>'+esc(W("never"))+'</h3><p class="muted">The plan uses an equivalent for the same muscles instead. Tap to bring one back.</p><div class="fvlist">'+nev().map(function(n){return '<button type="button" class="fvrow" data-a="unnever" data-n="'+esc(n)+'"><span class="st" aria-hidden="true">⊘</span><span class="fn">'+esc(n)+'</span><span class="gt">Bring back</span></button>';}).join("")+'</div></div>':'')+
    '<div class="sec">'+themeHTML("m")+'</div>'+
    '<div class="sec"><h3>Kickboxing days</h3>'+kickSel("m_kick")+'</div>'+
    '<div class="sec"><h3>Basics</h3><p class="muted">Re-enter values, focus and equipment in three steps.</p><button type="button" class="b" data-a="reonb">Re-enter basics</button></div>'+
    '<div class="sec"><h3>Training doctrine</h3><ol class="why">'+R.map(function(r){return "<li>"+esc(r)+"</li>";}).join("")+'</ol></div>'+
    '<div class="sec"><h3>Watch import</h3><p class="muted">Runs: export a GPX or TCX file from your watch app and import it on the run screen. Values like sleep or recovery scores need a connection outside this file.</p></div>'+
    '<div class="sec"><h3>Backup</h3><p class="muted">Your data lives only in this browser on this device.'+(D.bkDate?' Last backup: '+dLab(D.bkDate)+'.':' No backup yet.')+'</p><div class="row"><button type="button" class="b red" data-a="bkfile">Save backup file</button><label class="b filebtn2" for="bkin">Restore from file</label><input type="file" id="bkin" class="vh" accept=".json,application/json" data-a="bkin"></div><details class="tv"><summary>Backup as text instead</summary><button type="button" class="b" data-a="exp">Create backup text</button><textarea id="bk" aria-label="Backup text" placeholder="The backup appears here. Paste text here to restore. Only restore backups you made yourself.">'+esc(D._bk)+'</textarea><div class="row"><button type="button" class="b" data-a="copy">Copy</button><button type="button" class="b" data-a="imp">Restore from text</button></div></details>'+(D._msg?'<p class="muted" role="status">'+esc(D._msg)+'</p>':'')+'</div>'+
    '<div class="sec"><h3>Reset</h3><button type="button" class="b" data-a="reset">'+(D._rs?'Really delete everything':'Delete all data')+'</button></div></div>';
}
function render(){
  updNames(); applyTheme(); setTimeout(wake,0);
  var c=ctx(TODAY),d=new Date();
  document.getElementById("subline").textContent=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]+" "+d.getDate()+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" · Week "+c.week+" · "+LVN[lvl()];
  var top={morgen:"start",train:"start",run:"start",kick:"start",favs:D._favFrom==="mehr"?"mehr":"start"}[D.tab]||D.tab;
  document.getElementById("nav").innerHTML=D.onb?tabs().map(function(t){return '<button type="button" data-tab="'+t[0]+'" class="'+(top===t[0]?"on":"")+'"'+(top===t[0]?' aria-current="page"':'')+'>'+t[1]+'</button>';}).join(""):"";
  document.body.className=D.onb?(["train","morgen","run","kick"].indexOf(D.tab)>=0?"train":""):"ob";
  if(!D.onb) document.getElementById("subline").textContent=W("sub");
  rendering=true;
  app.innerHTML=D.onb?(({start:vStart,morgen:vMorgen,train:vTrain,run:vRun,kick:vKick,verlauf:vVerlauf,stand:vStand,mehr:vMehr,favs:vFavs}[D.tab]||vStart)()):vOnb();
  rendering=false;
}

/* ================= Aktionen ================= */
function findItem(id){
  var p=id.split("-"),c=ctx(TODAY);
  if(p[0]==="abs") return ABS[+p[1]].items[+p[2]];
  if(p[0]==="KI") return [KM_PRE,KM_POST][+p[1]].items[+p[2]];
  var bi=+p[1]; if(bi===ADDBI){var ab=S(p[0],c).blocks.filter(function(b){return b.add;})[0];return ab?ab.items[+p[2]]:null;}
  if(bi>=90){var ks=Object.keys(REHAB);return REHAB[ks[bi-90]].items[+p[2]];}
  return S(p[0],c).blocks[bi].items[+p[2]];
}
function addLog(o){D.logs.push(o);D.logs.sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0);});}
/* keep (A-021): logging a run or kickboxing keeps today's training progress and additions, so both can be done on one day. */
function finish(dy,keep){LV.fin=thKey()==="love"?TODAY:"";var tl=TH().toast;D._toast=D._toastX||tl[D.logs.length%tl.length];D._toastX="";dy.fin={};dy.run=null;delete dy.xr;
  if(keep){var rx=/^(rc|KI)-/;Object.keys(dy.done).forEach(function(k){if(rx.test(k))delete dy.done[k];});["inp","skip"].forEach(function(f){Object.keys(dy[f]).forEach(function(k){if(rx.test(k))delete dy[f][k];});});}
  else{dy.open={};dy.pick=null;delete dy.add;Object.keys(dy.done).forEach(function(k){if(k.indexOf("m-")!==0)delete dy.done[k];});dy.inp={};dy.skip={};}
  D.tab="start";save();render();window.scrollTo(0,0);}
function needRpe(dy){if(!dy.fin.rpe){dy.fin.err="Please choose how hard it was.";save();render();return true;}dy.fin.err="";return false;}
function saveTrain(){
  var dy=day(); if(needRpe(dy)) return;
  var loc=LOC(),kit=loc==="m",c=ctx(TODAY),id=trainId(dy).id,s=S(id,c),f=dy.fin,wts=[],hold=f.rpe>=10,isoDone={},exl={},tv={},prs=[];
  function rec(key,r,w,nm){exl[key]=[r,w||0];var sc=(w||0)*1000+r,b=D.pr[key];if(b&&sc>b.sc)prs.push(nm+": "+r+(w?" × "+fmtKg(w)+" kg":""));if(!b||sc>b.sc)D.pr[key]={sc:sc,r:r,w:w||0,d:TODAY,n:nm};}
  var addN=[];
  s.blocks.forEach(function(b,bi0){ if(D.short&&b.p>1) return; var bi=b.bi!=null?b.bi:bi0; b.items.forEach(function(it,ii){
    var iid=id+"-"+bi+"-"+ii, v=curVar(it,loc); if(v<0||dy.skip[iid]||painHit(it.opts[v].n)) return;
    if(it.add&&(dy.done[iid]||((dy.inp[iid]||{}).s||[]).some(function(x){return num(x)!==null;})))addN.push(it.opts[v].n);
    var inp=dy.inp[iid]||{}, sets=(inp.s||[]).map(num).filter(function(x){return x!==null&&x>=0;});
    if(it.iso){ if(isoDone[it.iso]) return; var cur=D.profile[it.iso],q=isoP(cur);
      if(sets.length){ isoDone[it.iso]=1; var mn=Math.min.apply(null,sets),mx=Math.max.apply(null,sets);
        if(sets.length>=q.n&&mn>=q.h) D.profile[it.iso]=Math.min(120,Math.max(cur,mx)+2);
        else if(mn<q.h*0.75) D.profile[it.iso]=Math.max(Math.round(mx),Math.max(3,cur-2));
        if(mx>D.profile[it.iso]) D.profile[it.iso]=mx; rec("iso:"+it.iso,mx,0,it.opts[v].n+" (s)"); }
      else if(dy.done[iid]&&!hold){ isoDone[it.iso]=1; D.profile[it.iso]=cur+1; }
      return; }
    if(it.test){ if(sets.length){ D.profile[it.test]=sets[0]; tv[it.test]=sets[0]; rec("test:"+it.test,sets[0],0,it.opts[0].n); } return; }
    if(it.f) return;
    var g=target(it,v), r, w=num(inp.w);
    if(sets.length) r=Math.min.apply(null,sets); else if(dy.done[iid]) r=g.r; else return;
    if(w===null) w=g.w||0;
    var pv=D.ex[it.k+"#"+v],stall=(pv&&!pv.hold&&r<=pv.r&&(w||0)<=(pv.w||0))?(pv.stall||0)+1:0;
    if(kit){D.kitD=D.kitD||{};D.kitD[patKey(it.k)]=TODAY;}
    /* Field kit days never downgrade a shared variant and never count towards a stall (A-019 addendum). */
    if(kit&&pv&&((w||0)<(pv.w||0)||((w||0)===(pv.w||0)&&r<=pv.r))) D.ex[it.k+"#"+v]={r:pv.r,w:pv.w,d:TODAY,hold:false,n:it.opts[v].n,stall:pv.stall||0};
    else D.ex[it.k+"#"+v]={r:r,w:w,d:TODAY,hold:hold,n:it.opts[v].n,stall:kit?(pv&&pv.stall||0):stall};
    if((it.k==="fl_h"||it.k==="pl_h")&&v<=4&&r>=it.lo){var pk=it.k==="fl_h"?"flSt":"plSt";if(v>D.profile[pk])D.profile[pk]=v;}
    if(it.opts[v].w&&w) wts.push(it.opts[v].n+" "+fmtKg(w)+" kg × "+r);
    if(sets.length) rec(it.k+"#"+v,Math.max.apply(null,sets),w,it.opts[v].n);
  });});
  var absDone=!!dy.done["abs-T"]; if(absDone) D.abs=(absFor(id).i+1)%ABS.length;
  var skl=[];s.blocks.forEach(function(b){if(D.short&&b.p>1)return;if(b.skill&&skl.indexOf(b.skill)<0)skl.push(b.skill);if(b.mu&&skl.indexOf("mu")<0)skl.push("mu");});
  var rk0=rankOf(xpTotal());
  addLog({d:TODAY,id:id,t:NAMES[id],lg:legSets(s,c,id)>=6?1:0,rpe:f.rpe,note:(f.note||"").slice(0,300),abs:absDone?1:0,sum:wts.slice(0,4).join(", "),sk:skl,ex:exl,tv:tv,pr:prs.length});
  /* Keep as favourite? Asked once per added exercise, on the Today page after logging. */
  var fa=D.favAsk||[];addN.forEach(function(n){if((D.fav||[]).indexOf(n)<0&&fa.indexOf(n)<0){fa.push(n);(D.favQ=D.favQ||[]).push(n);}});if(addN.length)D.favAsk=fa.slice(-200);
  afterLog(rk0,prs); finish(dy);
}
/* Log a past day (A-021): a training, run or kickboxing for one of the last 14 days ("bl":1, no exercise values).
   A training gets its leg flag and skills from the session as planned for that day (simulated like the week preview,
   without kit or additions); its movement patterns count for the pause rule via kitD, records and targets stay as they
   are. A run updates run records. Stats, leg frequency and recommendations read the log, so they follow at once. */
var BLMAX=14;
function blDays(){var a=[];for(var i=1;i<=BLMAX;i++)a.push(addD(TODAY,-i));return a;}
var BLIDS=["KA","KB","KC","CH","SK","HO","HK","RS","DL","TE"];
function saveBacklog(){var g=function(x){var e=document.getElementById(x);return e?e.value:"";};
  var d=g("bl_d"),id=g("bl_id"),rp=+g("bl_rpe"),o,prs=[],rk0=rankOf(xpTotal());
  if(blDays().indexOf(d)<0||!(BLIDS.indexOf(id)>=0||RUNT[id]||id==="KI")){D._blErr="Please pick a day and what you did.";return false;}
  if([4,6,8,10].indexOf(rp)<0){D._blErr="Please choose how hard it was.";return false;}
  o={d:d,id:id,t:NAMES[id],rpe:rp,note:(g("bl_note")||"").slice(0,300),bl:1};
  if(isRun(o)){var km=num(g("bl_km")),mn=num(g("bl_min"));o.km=km&&km>0?Math.round(km*100)/100:0;o.min=mn&&mn>0?Math.round(mn*10)/10:0;
    if(o.km&&o.min){var pc=o.min/o.km,b=D.pr["run:pace5"],bl=D.pr["run:long"];if(o.km>=5&&(!b||pc<b.p)){if(b)prs.push("Fastest 5 km+ pace: "+pace(o));D.pr["run:pace5"]={p:pc,d:d};}
      if(!bl||o.km>bl.km){if(bl)prs.push("Longest run: "+fmtKg(Math.round(o.km*10)/10)+" km");D.pr["run:long"]={km:o.km,d:d};}}}
  else if(id!=="KI"){var T0=TODAY,sim=WK.sim;
    try{TODAY=d;WK.sim=true;updNames();o.t=NAMES[id];var c=ctx(d),ss=S(id,c),sk=[];D.kitD=D.kitD||{};
      ss.blocks.forEach(function(bk){if(D.short&&bk.p>1)return;if(bk.skill&&sk.indexOf(bk.skill)<0)sk.push(bk.skill);if(bk.mu&&sk.indexOf("mu")<0)sk.push("mu");
        if(bk.warm||bk.cool)return;bk.items.forEach(function(it){if(it.f||it.iso||it.test||!it.k||curVar(it,D.loc)<0)return;var pk=patKey(it.k);if(!D.kitD[pk]||D.kitD[pk]<d)D.kitD[pk]=d;});});
      o.lg=legSets(ss,c,id)>=6?1:0;o.sk=sk;}
    finally{TODAY=T0;WK.sim=sim;updNames();}}
  addLog(o);afterLog(rk0,prs);D._bl=false;D._blErr="";D._blOk="Logged for "+dLab(d)+": "+o.t+"."+(D._toastX?" "+D._toastX:"");D._toastX="";save();render();return true;}
function blHTML(){
  if(!D._bl) return '<button type="button" class="b wide" data-a="blopen">+ '+esc(W("backlog"))+'</button>'+(D._blOk?'<p class="muted" role="status">'+esc(D._blOk)+'</p>':'');
  var opt=function(v,t,sel){return '<option value="'+v+'"'+(sel?" selected":"")+'>'+esc(t)+'</option>';};
  return '<div class="edit" id="blf"><p class="q">'+esc(W("backlog"))+'</p><p class="muted">Up to '+BLMAX+' days back. It counts for your stats, leg days, rest rules and recommendations.</p><div class="grid2">'+
    '<label for="bl_d">Day</label><select id="bl_d">'+blDays().map(function(x,i){return opt(x,WDN[pd(x).getDay()]+" "+dLab(x)+" · "+(i===0?"yesterday":(i+1)+" days ago"),i===0);}).join("")+'</select>'+
    '<label for="bl_id">What</label><select id="bl_id"><optgroup label="Training">'+BLIDS.map(function(k){return opt(k,NAMES[k],k===(D.loc==="h"?"HO":"KA"));}).join("")+'</optgroup><optgroup label="Running">'+["RE","RI","RH"].map(function(k){return opt(k,NAMES[k]);}).join("")+'</optgroup><optgroup label="Class">'+opt("KI",NAMES.KI)+'</optgroup></select>'+
    '<label for="bl_rpe">How hard</label><select id="bl_rpe">'+[[0,"Choose"],[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return opt(x[0],x[1]);}).join("")+'</select>'+
    '<label for="bl_km">Run: km</label><input type="number" id="bl_km" step="0.01" inputmode="decimal"><label for="bl_min">Run: min</label><input type="number" id="bl_min" step="0.1" inputmode="decimal">'+
    '</div><label class="lab" for="bl_note">Note (optional)</label><textarea id="bl_note"></textarea><div class="row"><button type="button" class="b" data-a="blopen">Cancel</button><button type="button" class="b red" data-a="blsave">Save entry</button></div>'+(D._blErr?'<p class="warn" role="alert">'+esc(D._blErr)+'</p>':'')+'</div>';}
function saveRun(){
  var dy=day(); if(needRpe(dy)) return; var rk0=rankOf(xpTotal()),nl=D.logs.length;
  var f=dy.fin,id=dy.run||runRec().id,km=num(f.km),mn=num(f.min);
  if(id==="RH"){ if(f.rpe<=4) D.runKm=Math.min(D.focus==="run"?16:10,D.runKm+0.5); else if(f.rpe>=10) D.runKm=Math.max(5,D.runKm-0.5); }
  if(id==="RI"){ if(f.rpe<=6) D.runI=Math.min(8,D.runI+1); else if(f.rpe>=10) D.runI=Math.max(3,D.runI-1); }
  var prs=[];if(km&&mn){var pc=mn/km,b=D.pr["run:pace5"];if(km>=5){if(b&&pc<b.p)prs.push("Fastest 5 km+ pace: "+pace({km:km,min:mn}));if(!b||pc<b.p)D.pr["run:pace5"]={p:pc,d:TODAY};}
    var bl=D.pr["run:long"];if(bl&&km>bl.km)prs.push("Longest run: "+fmtKg(Math.round(km*10)/10)+" km");if(!bl||km>bl.km)D.pr["run:long"]={km:km,d:TODAY};}
  addLog({d:TODAY,id:id,t:NAMES[id],rpe:f.rpe,note:(f.note||"").slice(0,300),km:km===null?0:Math.round(km*100)/100,min:mn===null?0:Math.round(mn*10)/10,pr:prs.length});
  afterLog(rk0,prs); finish(dy,true);
}
function parseTrack(txt){
  var x=new DOMParser().parseFromString(txt,"application/xml"),m=0,sec=0,i;
  var laps=x.getElementsByTagName("Lap");
  if(laps.length){ for(i=0;i<laps.length;i++){ var ch=laps[i].children; for(var j=0;j<ch.length;j++){ if(ch[j].tagName==="DistanceMeters") m+=parseFloat(ch[j].textContent)||0; if(ch[j].tagName==="TotalTimeSeconds") sec+=parseFloat(ch[j].textContent)||0; } } }
  else { var pts=x.getElementsByTagName("trkpt"),prev=null,t0=null,t1=null;
    for(i=0;i<pts.length;i++){ var la=parseFloat(pts[i].getAttribute("lat"))*Math.PI/180,lo=parseFloat(pts[i].getAttribute("lon"))*Math.PI/180,tm=pts[i].getElementsByTagName("time")[0];
      if(prev){var a=Math.pow(Math.sin((la-prev[0])/2),2)+Math.cos(la)*Math.cos(prev[0])*Math.pow(Math.sin((lo-prev[1])/2),2);m+=2*6371000*Math.asin(Math.sqrt(a));}
      prev=[la,lo]; if(tm){var t=Date.parse(tm.textContent); if(!isNaN(t)){ if(t0===null)t0=t; t1=t; }} }
    if(t0!==null) sec=(t1-t0)/1000; }
  if(!(m>0)) return null;
  return {km:Math.round(m/10)/100,min:Math.round(sec/6)/10};
}
/* Copying the backup text by hand counts as a backup too. */
document.addEventListener("copy",function(e){var t=e.target;if(t&&t.id==="bk"&&D._bk&&t.value===D._bk)markBk();});
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-a],[data-tab]"); if(!t||t.tagName==="SELECT"||t.tagName==="INPUT") return;
  var dy=day(),a=t.dataset.a;
  if(t.dataset.tab){TB=null;if(t.dataset.tab==="favs")D._favFrom=t.dataset.from||D.tab;D.tab=t.dataset.tab;D._del=null;D._kitAsk=false;D._rs=false;D._msg="";dy.fin={};save();render();window.scrollTo(0,0);var h2=app.querySelector("h2");if(h2&&t.closest(".nav,.bk,.big")){h2.tabIndex=-1;h2.focus({preventScroll:true});}return;}
  if(a==="rpe"){dy.fin.rpe=+t.dataset.v;}
  else if(a==="onb"){askPersist();D.onb=true;D.tab="start";D.obStep=0;D.seenFocus=true;D.seenFav=true;if(!D.logs.length)D.start=TODAY;D._toast=W("ready");}
  else if(a==="reonb"){D.onb=false;D.obStep=0;}
  else if(a==="obnext"||a==="obback"){D._msg="";D.obStep=Math.max(0,Math.min(3,(D.obStep||0)+(a==="obnext"?1:-1)));save();render();window.scrollTo(0,0);var hd=document.getElementById("dlgt");if(hd)hd.focus({preventScroll:true});return;}
  else if(a==="wkday"){var wi=+t.dataset.v;WK.sel=WK.sel===wi?-1:wi;keepRender();return;}
  else if(a==="nokick"){dy.noKick=!dy.noKick;}
  else if(a==="kickday"){var v=+t.dataset.v,i=D.kickDays.indexOf(v);if(i>=0)D.kickDays.splice(i,1);else D.kickDays.push(v);}
  else if(a==="loc"){D.loc=t.dataset.v;dy.pick=null;}
  else if(a==="short"){D.short=!D.short;}
  else if(a==="kit"){if(kitOn()){dy.kit=false;D._kitAsk=false;}else{D._kitAsk=!D._kitAsk;D._kitSel=(D.kit||[]).slice();}}
  else if(a==="kitsel"){var kk=t.dataset.k,ks=D._kitSel||[];if(kk==="n")ks=[];else{var ki=ks.indexOf(kk);if(ki>=0)ks.splice(ki,1);else ks.push(kk);}D._kitSel=ks;keepRender();return;}
  else if(a==="kitok"){D.kit=(D._kitSel||[]).filter(function(x){return "kbdsr".indexOf(x)>=0;});dy.kit=true;D._kitAsk=false;delete D._kitSel;}
  else if(a==="kitno"){D._kitAsk=false;delete D._kitSel;}
  else if(a==="skip"){var sid=t.dataset.id;if(dy.skip[sid])delete dy.skip[sid];else{dy.skip[sid]=1;delete dy.done[sid];}}
  else if(a==="chg"){var lc=D.tab==="kick"?"h":LOC(),it=findItem(t.dataset.id),av=avail(it,lc),cur=curVar(it,lc);D.vr[lc+"|"+vkey(it)]=av[(av.indexOf(cur)+1)%av.length];delete dy.inp[t.dataset.id];}
  else if(a==="runtype"){dy.run=t.dataset.v;}
  else if(a==="tbgo"){var A2=ABS[+t.dataset.i],lc2=LOC();audio();TB={start:Date.now(),rounds:+t.dataset.r,names:A2.items.map(function(it){return it.opts[curVar(it,lc2)].n;}),last:""};if(!tbIv)tbIv=setInterval(tbTick,200);}
  else if(a==="tbstop"){TB=null;}
  else if(a==="tbdone"){dy.done["abs-T"]=1;}
  else if(a==="savetr"){saveTrain();return;}
  else if(a==="saverun"){saveRun();return;}
  else if(a==="savekick"){if(needRpe(dy))return;var rk0=rankOf(xpTotal());addLog({d:TODAY,id:"KI",t:NAMES.KI,rpe:dy.fin.rpe,note:(dy.fin.note||"").slice(0,300)});afterLog(rk0,[]);finish(dy,true);return;}
  else if(a==="savemo"){var mm=morning(TODAY),rk0=rankOf(xpTotal());addLog({d:TODAY,id:"MO",t:NAMES.MO,m:[mm.top].concat(D.mlen==="k"?[]:[mm.sec])});D.tab="start";afterLog(rk0,[]);D._toast=D._toastX||"Morning routine logged. Let the day come.";D._toastX="";}
  else if(a==="mlen"){D.mlen=t.dataset.v;}
  else if(a==="unlock"||a==="lovekey"){var ci=document.getElementById(a==="lovekey"?"love_code":t.dataset.pre+"_code"),pr=loveUnlock(ci?ci.value:"");if(a==="unlock")D.wantLove=true;keepRender();
    pr.then(function(ok){if(ok){D.theme="love";D.wantLove=false;D._toast=D.onb?"Secret theme unlocked. Hello, love.":"";save();}keepRender();});return;}
  else if(a==="fav"){var fn=t.dataset.n;D.fav=D.fav||[];var fi=D.fav.indexOf(fn);if(fi>=0)D.fav.splice(fi,1);else D.fav.push(fn);save();keepRender();return;}
  else if(a==="hold"){startHold(+t.dataset.s,+t.dataset.sides);return;}
  else if(a==="addopen"){D._addOpen=true;D._addq="";render();var ap=document.getElementById("addp");if(ap&&ap.scrollIntoView)ap.scrollIntoView();var aq=document.getElementById("addq");if(aq)aq.focus({preventScroll:true});return;}
  else if(a==="addclose"){D._addOpen=false;D._addq="";}
  else if(a==="addx"){var an=t.dataset.n;dy.add=dy.add||[];if(dy.add.indexOf(an)<0&&dy.add.length<12)dy.add.push(an);D._addOpen=false;D._addq="";(dy.open||(dy.open={}))[trainId(dy).id+"-"+ADDBI]=true;save();keepRender();return;}
  else if(a==="addrm"){var ap2=t.dataset.id.split("-"),aj=+ap2[2],pre=ap2[0]+"-"+ADDBI+"-";if(dy.add&&aj>=0&&aj<dy.add.length){dy.add.splice(aj,1);if(!dy.add.length)delete dy.add;
      ["done","inp","skip"].forEach(function(f){var o=dy[f],nw={};Object.keys(o).forEach(function(k){if(k.indexOf(pre)!==0){nw[k]=o[k];return;}var j=+k.slice(pre.length);if(j<aj)nw[k]=o[k];else if(j>aj)nw[pre+(j-1)]=o[k];});dy[f]=nw;});}
    save();keepRender();return;}
  else if(a==="never"){var nn=t.dataset.n;D.never=nev().slice();if(D.never.indexOf(nn)<0)D.never.push(nn);D._nvMsg=D.tab==="train"?nn:"";save();keepRender();return;}
  else if(a==="unnever"){var un=t.dataset.n;D.never=nev().filter(function(x){return x!==un;});save();keepRender();return;}
  else if(a==="favkeep"||a==="favnot"){var fq=(D.favQ||[]).shift();if(a==="favkeep"&&fq){D.fav=D.fav||[];if(D.fav.indexOf(fq)<0)D.fav.push(fq);D._toast="★ "+fq+" joins your strength sessions.";}}
  else if(a==="xrun"){dy.run="RE";dy.xr=true;dy.fin={};D.tab="run";save();render();window.scrollTo(0,0);return;}
  else if(a==="blopen"){D._bl=!D._bl;D._blErr="";if(D.tab!=="verlauf"){D.tab="verlauf";D._bl=true;save();render();window.scrollTo(0,0);var bf=document.getElementById("blf");if(bf&&bf.scrollIntoView)bf.scrollIntoView();return;}}
  else if(a==="blsave"){if(saveBacklog())return;}
  else if(a==="edit"){D._edit=D._edit===+t.dataset.i?null:+t.dataset.i;D._del=null;}
  else if(a==="editsave"){var ei=D._edit,L=D.logs[ei];if(L){var g=function(id){var e=document.getElementById(id);return e?e.value:null;};
      var nd=g("e_d");if(/^\d{4}-\d{2}-\d{2}$/.test(nd)&&!isNaN(pd(nd))&&nd<=TODAY)L.d=nd;
      var nt=g("e_id");if(nt&&NAMES[nt]){L.id=nt;L.t=NAMES[nt];}
      var rp=+g("e_rpe");if([0,4,6,8,10].indexOf(rp)>=0){if(rp)L.rpe=rp;else delete L.rpe;}
      if(isRun(L)){var km=num(g("e_km")),mn=num(g("e_min"));L.km=km&&km>0?Math.round(km*100)/100:0;L.min=mn&&mn>0?Math.round(mn*10)/10:0;}
      L.note=(g("e_note")||"").slice(0,300);
      D.logs.sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0);});D._edit=null;D._toast="Entry updated.";}}
  else if(a==="del"){var i=+t.dataset.i; if(D._del===i){D.logs.splice(i,1);D._del=null;} else D._del=i;}
  else if(a==="exp"){D._bk=bkJSON();D._msg="Backup created. Copy it now and store it, e.g. in a note.";}
  else if(a==="copy"){var tx=document.getElementById("bk").value;try{navigator.clipboard.writeText(tx).then(function(){if(D._bk&&tx===D._bk)markBk();D._msg="Copied.";render();},function(){D._msg="Copying is not allowed. Please select the text by hand.";render();});}catch(x){D._msg="Copying is not allowed. Please select the text by hand.";}}
  else if((a==="imp"||a==="obimp")&&((document.getElementById(a==="imp"?"bk":"obbk")||{}).value||"").length>MAXBK){D._msg="This backup is too large (over 10 MB). Nothing was changed.";}
  else if(a==="imp"){if(restoreText(document.getElementById("bk").value,"mehr"))return;D._msg="This text is not a valid backup.";}
  else if(a==="bkfile"){saveBackupFile();return;}
  else if(a==="obimp"){var ta=document.getElementById("obbk");if(ta&&restoreText(ta.value,"start"))return;D._msg="This text is not a valid backup.";}
  else if(a==="reset"){if(D._rs){D=fresh();}else D._rs=true;}
  save(); render();
});
function keepRender(){var y=window.scrollY,ae=document.activeElement,sel=ae&&ae.id?"#"+ae.id:(ae&&ae.dataset&&ae.dataset.a?'[data-a="'+ae.dataset.a+'"]'+(ae.dataset.k?'[data-k="'+ae.dataset.k+'"]':'')+(ae.value&&ae.type==="radio"?'[value="'+ae.value+'"]':''):null);render();window.scrollTo(0,y);if(sel){var n=app.querySelector(sel);if(n)n.focus({preventScroll:true});}}
/* One tap per set: an empty set box takes the previous set's value (or the target) when tapped; leaving it commits. */
document.addEventListener("focusin",function(e){var t=e.target;if(!t.dataset||t.dataset.set==null||t.value!=="")return;
  var i=+t.dataset.set,prev=i>0?document.querySelector('input[data-set="'+(i-1)+'"][data-id="'+t.dataset.id+'"]'):null,v=(prev&&prev.value)||t.placeholder;
  if(/^\d+(\.\d+)?$/.test(v)){t.value=v;t.dataset.pre="1";try{t.select();}catch(x){}}});
document.addEventListener("focusout",function(e){var t=e.target;if(!t.dataset||t.dataset.pre!=="1")return;t.dataset.pre="";
  var dy=day(),cur=((dy.inp[t.dataset.id]||{}).s||[])[+t.dataset.set];if(t.value!==""&&String(cur||"")!==t.value)t.dispatchEvent(new Event("change",{bubbles:true}));});
/* Keep the screen on while training, running or doing the morning routine. */
var wl=null;function wake(){var want=D.onb&&["train","run","morgen","kick"].indexOf(D.tab)>=0;
  try{if(want&&!wl&&navigator.wakeLock){navigator.wakeLock.request("screen").then(function(x){wl=x;wl.addEventListener("release",function(){wl=null;});}).catch(function(){});}
  else if(!want&&wl){wl.release();wl=null;}}catch(x){}}
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")wake();});
document.addEventListener("toggle",function(e){var t=e.target;if(rendering||!t.dataset||!t.dataset.blk)return;var dy=day();(dy.open||(dy.open={}))[t.dataset.blk]=t.open;save();},true);
document.addEventListener("input",function(e){if(e.target.id!=="addq")return;var q=e.target.value.trim().toLowerCase();D._addq=q;
  app.querySelectorAll(".adg").forEach(function(g){var n=0;g.querySelectorAll(".adr").forEach(function(b){var hit=!q||b.dataset.n.toLowerCase().indexOf(q)>=0;b.classList.toggle("hid",!hit);if(hit)n++;});g.classList.toggle("hid",!n);if(q&&n)g.open=true;var c=g.querySelector(".fvc");if(c)c.textContent=n;});});
document.addEventListener("input",function(e){if(e.target.id!=="favq")return;var q=e.target.value.trim().toLowerCase();D._favq=q;
  app.querySelectorAll(".fvg:not(.adg)").forEach(function(g){var any=false;g.querySelectorAll(".fvr").forEach(function(b){var hit=!q||b.dataset.n.toLowerCase().indexOf(q)>=0;b.classList.toggle("hid",!hit);var fr=b.querySelector(".fvrow");if(fr)fr.classList.toggle("hid",!hit);if(hit)any=true;});g.classList.toggle("hid",!any);if(q&&any)g.open=true;var c=g.querySelector(".fvc");if(c)c.textContent=g.querySelectorAll(".fvr:not(.hid)").length;});});
document.addEventListener("change",function(e){
  var t=e.target,dy=day(),q=t.dataset;
  if(q.a==="done"){ if(t.checked) dy.done[q.id]=1; else delete dy.done[q.id]; save(); render(); }
  else if(q.a==="eq"){ D.home[q.k]=t.checked; save(); keepRender(); }
  else if(q.a==="focus"){ D.focus=t.value; save(); keepRender(); }
  else if(q.a==="emph"){ D.emph=t.value; save(); keepRender(); }
  else if(q.a==="theme"){ D.theme=t.value; save(); keepRender(); }
  else if(q.a==="statex"){ D.statEx=t.value; save(); keepRender(); }
  else if(q.a==="startp"){ D.startP=t.value; D.runKm={s0:4,s1:6,s2:7}[t.value]||7; var pp=STARTP[t.value][2]; Object.keys(pp).forEach(function(k){D.profile[k]=pp[k];}); save(); keepRender(); }
  else if(q.a==="skill"){ D.skills[q.k]=t.checked; save(); keepRender(); }
  else if(q.a==="stage"){ D.profile[q.k]=+t.value; save(); keepRender(); }
  else if(q.a==="pain"){ D.pain[q.k]=t.checked; save(); render(); }
  else if(q.a==="pick"){ dy.pick=t.value; save(); render(); }
  else if(q.set!=null){ var e2=dy.inp[q.id]||(dy.inp[q.id]={}),s=e2.s||(e2.s=[]); s[+q.set]=t.value;
    var n=+q.n, filled=0; for(var i=0;i<n;i++) if(num(s[i])!==null) filled++;
    if(filled>=n) dy.done[q.id]=1;
    save();
    if(t.value!==""&&+q.rest>0){ var det=t.closest("details"), circuit=!!(det&&det.querySelector(".kind.z")), lastSet=+q.set===n-1;
      if(circuit?q.last==="1":!lastSet) startRest(+q.rest); }
    if(filled>=n){ var y=window.scrollY; render(); window.scrollTo(0,y); } }
  else if(q.inp){ (dy.inp[q.id]||(dy.inp[q.id]={}))[q.inp]=t.value; save(); }
  else if(q.fin){ dy.fin[q.fin]=t.value; save(); if(q.fin==="km"||q.fin==="min") render(); }
  else if(q.prof){ var v=num(t.value); if(v!==null&&v>=0){D.profile[q.prof]=v; save(); var ln=document.getElementById("lvlnote"); if(ln) ln.innerHTML=lvlNote(); if(D.onb) render();} }
  else if(q.start){ if(/^\d{4}-\d{2}-\d{2}$/.test(t.value)&&!isNaN(pd(t.value))){D.start=t.value; save(); render();} }
  else if(q.a==="bkin"&&t.files&&t.files[0]&&t.files[0].size>MAXBK){t.value="";D._msg="This file is too large for a backup (over 10 MB). Nothing was changed.";render();}
  else if(q.a==="bkin"&&t.files&&t.files[0]){var frb=new FileReader();frb.onload=function(){if(!restoreText(String(frb.result),D.onb?"mehr":"start")){D._msg="This file is not a valid backup.";render();}};frb.readAsText(t.files[0]);}
  else if(q.a==="gfile"&&t.files&&t.files[0]){ var fr=new FileReader(), name=t.files[0].name;
    fr.onload=function(){ var r=null; try{r=parseTrack(String(fr.result));}catch(x){}
      if(r){dy.fin.km=r.km; if(r.min>0)dy.fin.min=r.min; dy.fin.gmsg="Imported from "+name+": "+fmtKg(r.km)+" km"+(r.min>0?" in "+fmtKg(r.min)+" min.":". Please enter the time by hand.");}
      else dy.fin.gmsg="The file could not be read. Please export GPX or TCX, FIT does not work.";
      save(); render(); };
    fr.onerror=function(){dy.fin.gmsg="The file could not be opened.";save();render();};
    fr.readAsText(t.files[0]); }
});

/* ================= Core Blitz timer (20 s work / 10 s rest) ================= */
var actx=null,tbIv=null;
function audio(){try{if(!actx){var AC=window.AudioContext||window.webkitAudioContext;if(AC)actx=new AC();}if(actx&&actx.state==="suspended")actx.resume();}catch(e){}}
function tone(f,n){try{if(!actx)return;for(var i=0;i<n;i++){var o=actx.createOscillator(),g=actx.createGain(),t=actx.currentTime+i*0.22;o.frequency.value=f;o.connect(g);g.connect(actx.destination);g.gain.setValueAtTime(0.22,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.18);o.start(t);o.stop(t+0.18);}}catch(e){}}
function tbTick(){
  if(!TB){clearInterval(tbIv);tbIv=null;return;}
  var el=(Date.now()-TB.start)/1000-5,box=document.getElementById("tbbox"),ph,left,txt="",key;
  if(el>=TB.rounds*30-10){TB=null;day().done["abs-T"]=1;save();tone(660,3);render();return;}
  if(el<0){ph="Ready";left=-el;txt="Next: "+TB.names[0];key="p";}
  else{var r=Math.floor(el/30),w=el-r*30;
    if(w<20){ph="Work";left=20-w;txt="Round "+(r+1)+" of "+TB.rounds+" · "+TB.names[r%2];key="w"+r;}
    else{ph="Rest";left=30-w;txt="Next: "+TB.names[(r+1)%2];key="r"+r;}}
  if(key!==TB.last){ if(TB.last!=="") tone(ph==="Work"?880:440,ph==="Work"?2:1); TB.last=key; }
  if(box){box.hidden=false;box.className="tbbox "+(ph==="Work"?"work":"");document.getElementById("tbp").textContent=ph;document.getElementById("tbt").textContent=Math.ceil(left);document.getElementById("tbn").textContent=txt;}
}

/* ================= Pausen-Timer ================= */
var clock=document.getElementById("clock"),iv=null;
function fmt(s){return Math.floor(s/60)+":"+pad(s%60);}
function stop(){clearInterval(iv);iv=null;clock.classList.remove("run");}
function startRest(sec){audio();stop();var end=Date.now()+sec*1000;clock.classList.add("run");
  function tick(){var left=Math.ceil((end-Date.now())/1000);clock.textContent=fmt(Math.max(left,0));if(left<=0){stop();tone(880,3);try{navigator.vibrate&&navigator.vibrate([250,120,250]);}catch(x){}clock.textContent="Go!";var lv=document.getElementById("live");if(lv)lv.textContent="Rest over, next set.";}}
  tick();iv=setInterval(tick,250);}
function startHold(sec,sides){audio();stop();var side=1,end=Date.now()+sec*1000,lv=document.getElementById("live");clock.classList.add("run");
  function tick(){var left=Math.ceil((end-Date.now())/1000);clock.textContent=(sides>1?(side===1?"L ":"R "):"")+fmt(Math.max(left,0));
    if(left<=0){if(side<sides){side++;tone(660,2);try{navigator.vibrate&&navigator.vibrate(200);}catch(x){}if(lv)lv.textContent="Switch sides.";end=Date.now()+(sec+3)*1000;return;}
      stop();tone(880,3);try{navigator.vibrate&&navigator.vibrate([250,120,250]);}catch(x){}clock.textContent="Done";if(lv)lv.textContent="Hold done.";}}
  tick();iv=setInterval(tick,250);}
document.querySelectorAll(".timer [data-t]").forEach(function(b){b.addEventListener("click",function(){startRest(parseInt(b.dataset.t,10));});});
document.getElementById("tstop").addEventListener("click",function(){stop();clock.textContent="0:00";});
render();
window.__kz={xpTotal:xpTotal,favCatalog:favCatalog,blDays:blDays,ADDBI:ADDBI,loveFinIdx:loveFinIdx,patLast:patLast,kitOn:kitOn,kitGroup:kitGroup,kitReq:kitReq,kitCan:kitCan,KPOOL:KPOOL,LOC:LOC,cleanImport:cleanImport,weekPlan:weekPlan,WK:WK,termNote:termNote,weekHTML:weekHTML,blockSec:blockSec,bkJSON:bkJSON,bkDue:bkDue,MAXBK:MAXBK,tb:function(){return TB;},honours:function(){return honours();},estMin:estMin,wuSets:wuSets,legDay:legDay,DURMAX:DURMAX,legSets:legSets,legLog:legLog,hist:hist,today:function(s){if(s)TODAY=s;return TODAY;},day:day,saveTrain:saveTrain,recAll:recAll,recTrain:recTrain,S:S,NAMES:NAMES,D:function(){return D;},setD:function(x){D=x;},parseTrack:parseTrack,target:target,GYM:GYM,HOME:HOME,lvl:lvl,ctx:ctx,isoP:isoP,render:render,startRest:startRest,isKick:isKick,skillPlan:skillPlan,runRec:runRec,rounds:rounds,curVar:curVar,morning:morning,mSections:mSections,COOLS:COOLS,MMOD:MMOD,restore:restoreText,love:{derive:loveDerive,open:loveOpen,pick:lovePick,unlock:loveUnlock,day:loveDay,on:loveOn,LV:LV,KK:LOVEKK,MIN:LOVEMIN}};
})();
