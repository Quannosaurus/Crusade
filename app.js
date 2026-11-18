/* ================= Pose pictograms ================= */
/* Each pose: P = pelvis [x,y]; t = torso angle (pelvis -> neck); a1/a2 = arm [upper, fore]; l1/l2 = leg [thigh, shin].
   Angles in degrees, 0 = right, 90 = down, -90 = up. Index 1 = near limb, 2 = far limb (drawn dimmer).
   Extras: ring = [[x,y,r]], box = [x,y,w,h], wall = x, bar = y, nf = no floor, arrow = [[x1,y1,x2,y2]]. */
var PL={t:14,h:4.3,u:8,f:7.5,th:10.5,sh:10.5};
var STAND={P:[32,23],t:-90,a1:[100,95],a2:[80,85],l1:[93,90],l2:[87,90]};
var SUP={P:[38,41.5],t:180,a1:[5,0],a2:[0,-5],l1:[-55,55],l2:[-60,50]};
var QUAD={P:[42,33],t:198,a1:[90,90],a2:[88,92],l1:[90,0],l2:[92,2]};
var HK={P:[30,33.5],t:-93,a1:[60,30],a2:[70,40],l1:[0,90],l2:[110,180]};
var PRONE={P:[38,41.5],t:180,a1:[175,180],a2:[178,182],l1:[0,0],l2:[2,2]};
function pz(base,o){var r={};for(var k in base)r[k]=base[k];for(var k2 in o)r[k2]=o[k2];return r;}
var POSES={
 "Supine belly breathing":pz(SUP,{a1:[20,-10],a2:[15,-15]}),
 "Pelvic tilts":pz(SUP,{arrow:[[40,36,40,30]]}),
 "Glute bridge":{P:[36,33],t:146,a1:[8,0],a2:[6,-2],l1:[-11,76],l2:[-14,72]},
 "March in place with arm swings":pz(STAND,{l1:[5,90],a1:[130,110],a2:[45,10]}),
 "Arm circles":pz(STAND,{a1:[-55,-55],a2:[-125,-125],ring:[[32,9,10]],vb:"-6 -14 76 62"}),
 "Hip hinge, hands on hips":{P:[28,24],t:-35,a1:[150,119],a2:[145,115],l1:[82,100],l2:[86,96]},
 "Neck CARs":pz(STAND,{ring:[[32,4,5.5]]}),
 "Shoulder CARs":pz(STAND,{a1:[-95,-95],ring:[[32,9,9]],vb:"-6 -14 76 62"}),
 "Hip CARs on all fours":pz(QUAD,{l1:[30,100],ring:[[42,33,7]]}),
 "Wrist and ankle circles":pz(STAND,{a1:[60,0],ring:[[44,17,3.5],[32,44,3.5]]}),
 "Sphinx":{P:[40,41.5],t:-153,a1:[90,180],a2:[92,182],l1:[0,0],l2:[2,2]},
 "Quadruped T-spine rotation":pz(QUAD,{a1:[-100,160],arrow:[[24,18,32,14]],vb:"-6 -14 76 62"}),
 "Open book":pz(SUP,{a1:[-100,-120],a2:[10,5],arrow:[[30,26,20,30]]}),
 "Prone Y raises":pz(PRONE,{t:-175,a1:[-172,-172],a2:[-170,-170]}),
 "Chin tucks lying":pz(SUP,{ring:[[19,41,4.5]]}),
 "Floor angels":pz(SUP,{a1:[180,180],a2:[200,160]}),
 "Half-kneeling hip flexor stretch":HK,
 "90/90 windshield wipers":{P:[30,42],t:-90,a1:[130,100],a2:[125,95],l1:[-40,50],l2:[-30,60],arrow:[[38,30,46,30]]},
 "World's greatest stretch":{P:[30,31],t:-20,a1:[-80,-85],a2:[95,90],l1:[15,90],l2:[148,150],vb:"-6 -14 76 62"},
 "Adductor rock-back":pz(QUAD,{l1:[0,0],arrow:[[50,26,40,26]]}),
 "Cossack squat":{P:[32,30],t:-90,a1:[60,-30],a2:[120,-150],l1:[150,100],l2:[42,42]},
 "Wrist prep on all fours":pz(QUAD,{ring:[[28,44,4]]}),
 "Scapular push-ups":{P:[30.5,34.7],t:-153.7,a1:[90,90],a2:[92,90],l1:[26.3,26.3],l2:[27,27],arrow:[[18,22,18,16]]},
 "Thread the needle":pz(QUAD,{P:[42,32],t:165,a1:[70,10],a2:[100,85],arrow:[[26,40,36,40]]}),
 "Puppy pose":{P:[40,33],t:152,a1:[172,178],a2:[175,180],l1:[90,0],l2:[92,2]},
 "Half-kneeling ankle rocks":pz(HK,{l1:[10,70],t:-80,arrow:[[44,36,48,36]]}),
 "Downward dog calf pedals":{P:[34,25.5],t:140,a1:[140,140],a2:[138,138],l1:[56,56],l2:[50,100]},
 "Heel and toe walks":pz(STAND,{l1:[80,100],a1:[110,100],a2:[70,80]}),
 "Deep squat hold":{P:[32,38],t:-80,a1:[60,-20],a2:[55,-25],l1:[-38,105],l2:[-34,108]},
 "Legs-up breathing":pz(SUP,{l1:[-85,-88],l2:[-88,-92],a1:[0,0],a2:[3,3]}),
 "Supine figure-4 stretch":pz(SUP,{a1:[-30,-60],a2:[-25,-55],l1:[-75,0],l2:[-30,-120]}),
 "Gentle supine twist":pz(SUP,{a1:[-90,-90],a2:[-95,-95],l1:[-15,70],l2:[-10,75],arrow:[[46,30,52,36]]}),
 "Overhead reach":pz(STAND,{t:-93,a1:[-72,-78],a2:[-108,-102],vb:"-6 -14 76 62"}),
 "Passive hang":{P:[32,28],t:-90,a1:[-82,-88],a2:[-98,-92],l1:[100,120],l2:[95,115],bar:-2,nf:1},
 "Doorway chest stretch":pz(STAND,{t:-85,a1:[180,-90],wall:22}),
 "Kneeling lat stretch on a bench":{P:[42,33],t:160,a1:[175,180],a2:[178,182],l1:[90,0],l2:[92,2],box:[6,33,14,11]},
 "Wrist flexor stretch":{P:[38,33],t:-150,a1:[100,95],a2:[95,92],l1:[90,0],l2:[92,2]},
 "Overhead triceps stretch":pz(STAND,{a1:[-100,100],a2:[-60,-140],vb:"-6 -14 76 62"}),
 "Child's pose":{P:[44,38],t:167,a1:[180,180],a2:[182,182],l1:[145.5,0],l2:[147,2]},
 "Couch stretch":pz(HK,{l2:[115,-95],box:[16,30,8,14]}),
 "Pigeon pose":{P:[34,40],t:-85,a1:[100,90],a2:[95,88],l1:[10,180],l2:[175,180]},
 "Supine hamstring stretch":pz(SUP,{l1:[-85,-85],l2:[0,0],a1:[-25,-70],a2:[-20,-65]}),
 "Standing calf stretch":{P:[30,24],t:-60,a1:[-10,-5],a2:[-5,0],l1:[70,95],l2:[117,117],wall:52},
 "Standing quad stretch":pz(STAND,{l1:[110,-125],a1:[130,110]}),
 "Butterfly stretch":{P:[30,42],t:-75,a1:[80,100],a2:[85,105],l1:[-15,160],l2:[-20,165]},
 "Frog stretch":{P:[40,33],t:176,a1:[95,180],a2:[97,182],l1:[90,0],l2:[92,2]},
 "Seated straddle reach":{P:[32,41],t:-60,a1:[20,10],a2:[30,20],l1:[10,10],l2:[170,170]},
 "Low lunge with side bend":pz(HK,{a1:[-120,-140],a2:[-110,-130],t:-100,vb:"-6 -14 76 62"}),
};
var PALIAS={"Passive dead hang":"Passive hang","Bent-knee calf stretch":"Standing calf stretch","Quadruped thoracic rotation":"Quadruped T-spine rotation"};
function picFor(name){var k=POSES[name]?name:(PALIAS[name]||null);if(!k){for(var n in POSES){if(name.indexOf(n)===0){k=n;break;}}}return k?pic(POSES[k]):"";}
function pic(p){
  function pt(o,a,l){return [o[0]+l*Math.cos(a*Math.PI/180),o[1]+l*Math.sin(a*Math.PI/180)];}
  var P=p.P,N=pt(P,p.t,PL.t),H=pt(N,p.t,PL.h),f=function(v){return Math.round(v*10)/10;};
  function limb(o,ang,l1,l2,cls){var a=pt(o,ang[0],l1),b=pt(a,ang[1],l2);return '<polyline class="'+cls+'" points="'+f(o[0])+','+f(o[1])+' '+f(a[0])+','+f(a[1])+' '+f(b[0])+','+f(b[1])+'"/>';}
  var s='<svg class="pic" viewBox="'+(p.vb||"0 -4 64 52")+'" aria-hidden="true" focusable="false">';
  if(!p.nf) s+='<line class="fl" x1="2" y1="45" x2="62" y2="45"/>';
  if(p.wall!=null) s+='<line class="fl" x1="'+p.wall+'" y1="-2" x2="'+p.wall+'" y2="45"/>';
  if(p.bar!=null) s+='<line class="fl" x1="18" y1="'+p.bar+'" x2="46" y2="'+p.bar+'"/>';
  if(p.box) s+='<rect class="bx" x="'+p.box[0]+'" y="'+p.box[1]+'" width="'+p.box[2]+'" height="'+p.box[3]+'" rx="1"/>';
  s+=limb(N,p.a2,PL.u,PL.f,"lb2")+limb(P,p.l2,PL.th,PL.sh,"lb2");
  s+='<line class="lb" x1="'+f(P[0])+'" y1="'+f(P[1])+'" x2="'+f(N[0])+'" y2="'+f(N[1])+'"/>';
  s+=limb(P,p.l1,PL.th,PL.sh,"lb")+limb(N,p.a1,PL.u,PL.f,"lb");
  s+='<circle class="hd" cx="'+f(H[0])+'" cy="'+f(H[1])+'" r="3.4"/>';
  (p.ring||[]).forEach(function(r){s+='<circle class="rg" cx="'+r[0]+'" cy="'+r[1]+'" r="'+r[2]+'"/>';});
  (p.arrow||[]).forEach(function(a){var ang=Math.atan2(a[3]-a[1],a[2]-a[0]),h1=[a[2]-2.6*Math.cos(ang-0.5),a[3]-2.6*Math.sin(ang-0.5)],h2=[a[2]-2.6*Math.cos(ang+0.5),a[3]-2.6*Math.sin(ang+0.5)];
    s+='<path class="ar" d="M'+a[0]+' '+a[1]+'L'+a[2]+' '+a[3]+'M'+f(h1[0])+' '+f(h1[1])+'L'+a[2]+' '+a[3]+'L'+f(h2[0])+' '+f(h2[1])+'"/>';});
  return s+'</svg>';
}

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
var KEY="kz_app_v3", PREVK="kz_app_v3_prev", memOnly=false;
function pad(n){return String(n).padStart(2,"0");}
function ds(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function pd(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2],12);}
/* A-038: results kept per date and offset (ADC, emptied at 20,000 entries). */
var ADC={},ADN=0;function addD(s,n){var k=s+"|"+n,v=ADC[k];if(v!==undefined)return v;var d=pd(s);d.setDate(d.getDate()+n);v=ds(d);if(++ADN>20000){ADC={};ADN=0;}ADC[k]=v;return v;}
/* A-038: day numbers are kept per date string (DNC), so long histories do not parse the same dates again and again. */
var DNC={};function dnum(s){var v=DNC[s];if(v===undefined){v=pd(s).getTime();if(typeof s==="string"&&s.length===10)DNC[s]=v;}return v;}
function diff(a,b){return Math.round((dnum(b)-dnum(a))/864e5);}
/* A-031: lookups only by own keys (a prototype name such as "constructor" or "__proto__" is never a table entry),
   real calendar dates, and sane limits for distance and minutes. */
function own(o,k){return o!=null&&typeof k==="string"&&Object.prototype.hasOwnProperty.call(o,k);}
function okKey(k){return typeof k==="string"&&!(k in Object.prototype)&&k!=="prototype";}
function dOK(s){return typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&ds(pd(s))===s;}
var DSOK={test:dOK},KMMAX=300,MINMAX=1440,TRKMAX=20*1024*1024;
function lim(v,hi){v=typeof v==="number"?v:num(v);return v!=null&&isFinite(v)&&v>0?Math.min(hi,v):null;}
var TODAY=ds(new Date());
function fresh(){return {v:3,onb:false,start:TODAY,profile:{pull:5,dips:8,push:15,expl:2,negmu:3,mu:0,hang:30,tuck:15,lsit:0,hollow:45,hsw:20,hsf:0,pike:6,flSt:0,plSt:0},ex:{},vr:{},logs:[],days:{},abs:0,runKm:6,tab:"start",mlen:"n",loc:"g",short:false,kickDays:[],focus:"bal",startP:"s1",pr:{},theme:"templar",skills:{hs:false,mu:false,ls:false,fl:false,pl:false},runI:4,obStep:0,seenFocus:true,pain:{w:false,s:false,e:false,k:false,b:false,a:false,h:false},pause:null,pauseH:[],bkAt:0,goal:null,goalsDone:[],goalNext:[],opt:{ready:false,rest:false,oa:false},hold:{str:false,run:false,sk:false},easy:"",home:{b:true,s:true,k:false,d:false,p:false,w:false,r:false}};}
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
(function(){try{if(localStorage.getItem(PREVK)&&!prevSt())localStorage.removeItem(PREVK);}catch(x){}})();
(function(){var cut=addD(TODAY,-14);Object.keys(D.days||{}).forEach(function(k){if(k<cut)delete D.days[k];});})();
var holdSave=false;
function save(){if(holdSave)return;try{localStorage.setItem(KEY,JSON.stringify(D));}catch(e){memOnly=true;}}
function day(s){s=s||TODAY;if(!D.days[s])D.days[s]={done:{},inp:{},skip:{},pick:null,run:null,fin:{},noKick:false};var d=D.days[s];d.skip=d.skip||{};return d;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function num(v){var x=parseFloat(String(v==null?"":v).replace(",","."));return isNaN(x)?null:x;}
/* Backup import: keep only known fields with the expected types, so a foreign backup cannot inject markup or odd values. */
/* A-038: up to LOGMAX entries are kept (was 2000); cleanImport.cut tells how many the last import would leave out. */
var LOGMAX=20000;
function cleanImport(n){var b=fresh(),DS=DSOK,str=function(v,m){return typeof v==="string"?v.slice(0,m||300):"";},numv=function(v){v=+v;return isFinite(v)?v:0;};
  if(typeof n.start==="string"&&DS.test(n.start))b.start=n.start;
  Object.keys(b.profile).forEach(function(k){if(n.profile&&n.profile[k]!=null)b.profile[k]=Math.max(0,Math.min(999,numv(n.profile[k])));});
  ["onb","seenFocus","short"].forEach(function(k){if(typeof n[k]==="boolean")b[k]=n[k];});
  if(["bal","str","run"].indexOf(n.focus)>=0)b.focus=n.focus;
  if(n.skills&&typeof n.skills==="object")Object.keys(b.skills).forEach(function(k){if(typeof n.skills[k]==="boolean")b.skills[k]=n.skills[k];});
  if(n.home&&typeof n.home==="object")Object.keys(EQ).forEach(function(k){b.home[k]=n.home[k]===true;});
  if(Array.isArray(n.kickDays))b.kickDays=n.kickDays.map(Number).filter(function(x,i,a){return x>=0&&x<=6&&x===Math.floor(x)&&a.indexOf(x)===i;}).slice(0,7);
  else if(own(n,"kickDay")){var kd=n.kickDay;b.kickDays=(kd==null||kd===2)?[2,5]:(typeof kd==="number"&&kd>=0&&kd<=6&&kd===Math.floor(kd)?[kd]:[]);}
  ["runKm","runI"].forEach(function(k){if(n[k]!=null&&n[k]!==""&&isFinite(+n[k]))b[k]=Math.max(0,Math.min(99,+n[k]));});
  if(n.opt&&typeof n.opt==="object")["ready","rest","oa"].forEach(function(k){b.opt[k]=n.opt[k]===true;});
  if(n.hold&&typeof n.hold==="object"&&!Array.isArray(n.hold))["str","run","sk"].forEach(function(k){b.hold[k]=own(n.hold,k)&&n.hold[k]===true;});
  ["easy","easyP","holdR"].forEach(function(k){if(typeof n[k]==="string"&&DS.test(n[k]))b[k]=n[k];});
  /* P-7: pause mode and the ended pauses (for streaks, plateau boost and the Skill Trial gap). */
  if(n.pause&&typeof n.pause==="object"&&DS.test(n.pause.from))b.pause={from:n.pause.from,to:typeof n.pause.to==="string"&&DS.test(n.pause.to)&&n.pause.to>=n.pause.from?n.pause.to:"",why:n.pause.why==="ill"?"ill":"pause"};
  if(Array.isArray(n.pauseH))b.pauseH=n.pauseH.filter(function(x){return x&&DS.test(x.f)&&DS.test(x.t)&&x.t>=x.f;}).slice(-30).map(function(x){return {f:x.f,t:x.t};});
  if(n.bkAt!=null)b.bkAt=Math.max(0,Math.min(1e5,Math.floor(numv(n.bkAt))));
  if(typeof n.bkDate==="string"&&DS.test(n.bkDate))b.bkDate=n.bkDate;
  if(n.bkTs!=null&&numv(n.bkTs)>0)b.bkTs=Math.floor(numv(n.bkTs));
  if(n.abs!=null)b.abs=Math.max(0,Math.min(ABS.length-1,Math.floor(numv(n.abs))));
  /* Only the regions the backup holds (an old one has wrist/shoulder/elbow only; missing regions count as off). */
  if(n.pain&&typeof n.pain==="object"){b.pain={};Object.keys(PAINN).forEach(function(k){if(Object.prototype.hasOwnProperty.call(n.pain,k))b.pain[k]=n.pain[k]===true;});}
  if(own(STARTP,n.startP))b.startP=n.startP;
  b.days=cleanDays(n.days);
  if(n.loc==="h"||n.loc==="g")b.loc=n.loc; if(n.mlen==="k"||n.mlen==="n")b.mlen=n.mlen;
  var lv=(Array.isArray(n.logs)?n.logs:[]).filter(function(l){return l&&typeof l==="object"&&DS.test(l.d)&&typeof l.id==="string"&&/^[A-Z]{2}$/.test(l.id);});cleanImport.cut=Math.max(0,lv.length-LOGMAX);
  b.logs=lv.slice(-LOGMAX).map(function(l){
    var o={d:l.d,id:l.id,t:str(l.t,60)};if(l.rpe!=null)o.rpe=Math.max(0,Math.min(10,numv(l.rpe)));if(l.note!=null)o.note=str(l.note);if(l.sum!=null)o.sum=str(l.sum);if(l.abs!=null)o.abs=l.abs?1:0;
    if(l.km!=null)o.km=lim(numv(l.km),KMMAX)||0;if(l.cb!=null)o.cb=l.cb?1:0;if(l.rd===1||l.rd===2||l.rd===3)o.rd=l.rd;if(l.min!=null)o.min=lim(numv(l.min),MINMAX)||0;if(l.lg!=null)o.lg=l.lg?1:0;if(l.bl!=null)o.bl=l.bl?1:0;
    if(l.vs&&typeof l.vs==="object"&&!o.bl){o.vs=vsZero();VPAT.forEach(function(p){o.vs[p]=Math.max(0,Math.min(60,Math.floor(numv(l.vs[p]))));});}if(o.vs&&l.vm!=null)o.vm=Math.max(0,Math.min(VMAP,Math.floor(numv(l.vm))));
    if(Array.isArray(l.sk))o.sk=l.sk.filter(function(x){return ["hs","mu","ls","fl","pl"].indexOf(x)>=0;});
    if(Array.isArray(l.m))o.m=l.m.filter(function(x){return own(MMOD,x);});
    if(l.pr!=null)o.pr=Math.max(0,Math.min(20,Math.floor(numv(l.pr))));
    if(l.ex&&typeof l.ex==="object"){o.ex={};Object.keys(l.ex).slice(0,60).forEach(function(k){var v=l.ex[k];if(/^[a-z0-9_:#]+$/.test(k)&&okKey(k)&&Array.isArray(v))o.ex[k]=[numv(v[0]),numv(v[1])];});}
    if(l.exs&&typeof l.exs==="object"&&!Array.isArray(l.exs)){var xs={};Object.keys(l.exs).slice(0,60).forEach(function(k){var v=l.exs[k];if(/^[a-z0-9_:#]+$/.test(k)&&okKey(k)&&Array.isArray(v)){var a=setsArr(v);if(a.length)xs[k]=a;}});if(Object.keys(xs).length)o.exs=xs;}
    if(l.tv&&typeof l.tv==="object"){o.tv={};Object.keys(l.tv).forEach(function(k){if(/^[a-z]+$/.test(k)&&okKey(k))o.tv[k]=numv(l.tv[k]);});}
    return o;});
  if(n.ex&&typeof n.ex==="object")Object.keys(n.ex).slice(0,500).forEach(function(k){var e=n.ex[k];if(/^[a-z0-9_]+#\d+$/.test(k)&&okKey(k)&&e&&typeof e==="object"){var x=b.ex[k]={r:numv(e.r),w:numv(e.w),d:DS.test(e.d)?e.d:"",hold:!!e.hold,n:str(e.n,80)};if(e.stall!=null)x.stall=numv(e.stall);if(Array.isArray(e.s)){var sa=setsArr(e.s);if(sa.length)x.s=sa;}if(e.lad!=null){var ld=Math.round(numv(e.lad));if(ld>=1&&ld<=5)x.lad=ld;}}});
  if(n.pr&&typeof n.pr==="object")Object.keys(n.pr).slice(0,500).forEach(function(k){var e=n.pr[k];if(/^[a-z0-9_:#]+$/.test(k)&&okKey(k)&&e&&typeof e==="object"){var x=b.pr[k]={sc:numv(e.sc),r:numv(e.r),w:numv(e.w),d:DS.test(e.d)?e.d:"",n:str(e.n,80)};if(e.p!=null)x.p=numv(e.p);if(e.km!=null)x.km=lim(numv(e.km),KMMAX)||0;if(e.min!=null)x.min=lim(numv(e.min),MINMAX)||0;}});
  if(typeof n.emph==="string"&&EMPH.some(function(x){return x[0]===n.emph;}))b.emph=n.emph; if(typeof n.seenFav==="boolean")b.seenFav=n.seenFav; if(typeof n.favP==="boolean")b.favP=n.favP; if(Array.isArray(n.fav))b.fav=n.fav.filter(function(x){return typeof x==="string"&&x.length<90&&okKey(x);}).slice(0,20); if(own(THEMES,n.theme))b.theme=n.theme; if(Array.isArray(n.honSeen))b.honSeen=n.honSeen.filter(function(x){return typeof x==="string"&&x.length<40&&okKey(x);}).slice(0,50);
  if(n.kitD&&typeof n.kitD==="object")Object.keys(n.kitD).slice(0,500).forEach(function(k){if(/^[a-z0-9_]{1,40}$/.test(k)&&okKey(k)&&typeof n.kitD[k]==="string"&&DS.test(n.kitD[k]))(b.kitD=b.kitD||{})[k]=n.kitD[k];});
  if(Array.isArray(n.kit))b.kit=n.kit.filter(function(x){return typeof x==="string"&&"kbdsr".indexOf(x)>=0&&x.length===1;}).filter(function(x,i,a){return a.indexOf(x)===i;});
  ["never","favAsk","favQ"].forEach(function(k){if(Array.isArray(n[k])){var a=n[k].filter(function(x,i,arr){return typeof x==="string"&&x.length>0&&x.length<90&&okKey(x)&&arr.indexOf(x)===i;}).slice(-200);if(k==="never")a=a.slice(-100);if(k==="favQ")a=a.slice(-20);b[k]=a;}});
  b.goal=cleanGoal(n.goal,DS);
  if(Array.isArray(n.goalNext))b.goalNext=n.goalNext.filter(function(x){return x&&typeof x==="object"&&typeof x.k==="string"&&own(GOALS,x.k)&&okKey(x.k)&&isFinite(+x.v)&&+x.v>0&&+x.v<=100000;}).slice(0,2).map(function(x){return {k:x.k,v:Math.round(+x.v*100)/100};});
  if(Array.isArray(n.goalsDone))b.goalsDone=n.goalsDone.map(function(x){var g=cleanGoal(x,DS);return g&&DS.test(x.d)?{k:g.k,v:g.v,d:x.d,r:x.r==="e"?"e":"f"}:null;}).filter(Boolean).slice(-30);
  if(n.vr&&typeof n.vr==="object")Object.keys(n.vr).slice(0,300).forEach(function(k){if(vrKeyOK(k))b.vr[k]=Math.max(0,Math.min(20,Math.floor(numv(n.vr[k]))));});
  return b;}
/* Goal from a backup: known catalogue key, numbers in range, dates checked, check values capped (P-1). */
function cleanGoal(g,DS){if(!g||typeof g!=="object"||typeof g.k!=="string"||!Object.prototype.hasOwnProperty.call(GOALS,g.k))return null;
  var nv=function(v){v=+v;return isFinite(v)?Math.max(0,Math.min(999,v)):0;},o={k:g.k,v:nv(g.v),b:nv(g.b),s:DS.test(g.s)?g.s:TODAY};
  if(GOALS[g.k].u==="stage")o.v=Math.max(1,Math.min(4,Math.round(o.v)));if(!o.v)o.v=1;
  if(typeof g.d==="string"&&DS.test(g.d))o.d=g.d;if(g.st!=null)o.st=Math.max(0,Math.min(9,Math.floor(nv(g.st))));if(typeof g.s0==="number"&&isFinite(g.s0))o.s0=Math.max(0,Math.min(9,Math.floor(nv(g.s0))));if(g.fh)o.fh=1;
  if(g.np!=null)o.np=Math.max(0,Math.min(99,Math.floor(nv(g.np))));if(["e","s","v"].indexOf(g.pm)>=0)o.pm=g.pm;if(typeof g.pz==="string"&&DS.test(g.pz))o.pz=g.pz;if(g.pk)o.pk=1;if(typeof g.lp==="string"&&DS.test(g.lp))o.lp=g.lp;if(typeof g.cw==="string"&&DS.test(g.cw))o.cw=g.cw;if(g.ck!=null&&isFinite(+g.ck))o.ck=nv(g.ck);if(g.nb&&GOALS[g.k].g==="k")o.nb=1;
  o.h=(Array.isArray(g.h)?g.h:[]).filter(function(x){return Array.isArray(x)&&DS.test(x[0]);}).slice(-12).map(function(x){return [x[0],nv(x[1])];});
  return o;}
/* Variant choice keys (A-022): "<loc>|<key>" with loc g gym, h home, m Field kit and key = vkey(it): an item key
   (also mx_/fav_ prefixed), an iso/test key, or "f:"+name of a fixed item. Bare keys of the old form stay accepted.
   Prototype names are refused in any part. */
var VRK=/^(?:[ghm]\|)?(?:[a-z0-9_]{1,60}|f:[A-Za-z0-9 '\u2019(),.\/:+&\u00b0\u00d7\u2013-]{1,90})$/;
function vrKeyOK(k){return typeof k==="string"&&VRK.test(k)&&!/(^|[|:])(__proto__|constructor|prototype)$/.test(k)&&k.indexOf("__proto__")<0;}
/* Day progress (A-014): today's ticks, entries and choices, last 14 days, every value type-checked. */
function cleanDays(n){var out={},DS=DSOK,K=/^[A-Za-z0-9_:#-]{1,40}$/,cut=addD(TODAY,-14);if(!n||typeof n!=="object")return out;
  function sv(v,m){return typeof v==="string"?v.slice(0,m):(typeof v==="number"&&isFinite(v)?v:"");}
  function flags(o){var r={};if(o&&typeof o==="object")Object.keys(o).slice(0,400).forEach(function(k){if(K.test(k)&&okKey(k)&&o[k])r[k]=true;});return r;}
  Object.keys(n).filter(function(k){return DS.test(k)&&k>=cut;}).slice(0,20).forEach(function(k){var d=n[k];if(!d||typeof d!=="object")return;
    var o={done:flags(d.done),inp:{},skip:flags(d.skip),pick:typeof d.pick==="string"&&/^[A-Z]{2}$/.test(d.pick)?d.pick:null,run:own(RUNT,d.run)?d.run:null,fin:{},noKick:d.noKick===true};if(d.kit===true)o.kit=true;if(d.xr===true)o.xr=true;if(d.ready===1||d.ready===2||d.ready===3)o.ready=d.ready;
    if(Array.isArray(d.add)){var ad=d.add.filter(function(x,i,arr){return typeof x==="string"&&x.length>0&&x.length<90&&okKey(x)&&arr.indexOf(x)===i;}).slice(0,12);if(ad.length)o.add=ad;}
    if(d.open&&typeof d.open==="object")o.open=flags(d.open);
    if(d.inp&&typeof d.inp==="object")Object.keys(d.inp).slice(0,400).forEach(function(q){var e=d.inp[q];if(!K.test(q)||!okKey(q)||!e||typeof e!=="object")return;var r={};
      if(Array.isArray(e.s))r.s=e.s.slice(0,20).map(function(x){return x==null?null:String(sv(x,12));});if(e.w!=null)r.w=String(sv(e.w,12));o.inp[q]=r;});
    var f=d.fin;if(f&&typeof f==="object"){if(f.rpe!=null&&isFinite(+f.rpe))o.fin.rpe=Math.max(0,Math.min(10,+f.rpe));if(typeof f.note==="string")o.fin.note=f.note.slice(0,300);
      ["km","min","dur"].forEach(function(x){if(f[x]!=null)o.fin[x]=sv(f[x],12);});if(typeof f.oan==="string")o.fin.oan=f.oan.slice(0,40);if(typeof f.gmsg==="string")o.fin.gmsg=f.gmsg.slice(0,200);}
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
/* A-031: a restore is checked and rendered in memory first; only when that works is it saved. The replaced state is kept
   one generation under PREVK ("Undo restore" for 1 day). Replacing a state that holds entries asks first with a preview line. */
var RSP=null;
function parseBk(txt){if(typeof txt!=="string"||txt.length>MAXBK)return null;try{var n=JSON.parse(txt);if(!n||typeof n!=="object"||!n.profile||!n.logs)return null;var b=cleanImport(n);parseBk.cut=cleanImport.cut||0;b.onb=true;if(b.bkTs){b.bkAt=b.logs.length;b.bkDate=ds(new Date(b.bkTs));}return b;}catch(x){return null;}}
function restoreText(txt,where){var b=parseBk(txt);if(!b)return false;var cut=parseBk.cut||0;
  /* A-038: a backup that would be cut always goes through the preview card with a hint, never silently. */
  if((D.logs&&D.logs.length)||cut){RSP={b:b,where:where||"start",cut:cut};D._msg="";render();window.scrollTo(0,0);var rq=document.getElementById("rsqt");if(rq){rq.tabIndex=-1;rq.focus({preventScroll:true});}return true;}
  return applyState(b,where,rsToast(b),true);}
function rsToast(b){return "Restored: "+b.logs.length+" entries. Welcome back.";}
function bkLine(b){var n=b.logs.length,l=n?b.logs.reduce(function(m,x){return x.d>m?x.d:m;},""):"";return n+(n===1?" entry":" entries")+(l?", last "+dLab(l):"");}
function rsHTML(){if(!RSP)return "";var cur=(D.logs||[]).length;
  return '<div class="card rsq" role="alertdialog" aria-labelledby="rsqt"><div class="sec"><h2 id="rsqt">Restore this backup?</h2><p class="q">Backup: '+esc(bkLine(RSP.b))+'</p>'+(RSP.cut?'<p class="warn rscut">This backup holds '+(RSP.b.logs.length+RSP.cut)+' entries. The app keeps the newest '+LOGMAX.toLocaleString("en")+', so the oldest '+RSP.cut+(RSP.cut===1?' entry':' entries')+' would be left out. Keep the file: nothing is deleted from it.</p>':'')+'<p class="muted">It replaces your current data ('+cur+(cur===1?' entry':' entries')+'). You can undo this for one day.</p><div class="row"><button type="button" class="b red" data-a="rsok">Replace with backup</button><button type="button" class="b" data-a="rsno">Cancel</button></div></div></div>';}
function keepPrev(o){try{var c={};Object.keys(o).forEach(function(k){if(k.charAt(0)!=="_")c[k]=o[k];});localStorage.setItem(PREVK,JSON.stringify({at:Date.now(),s:c}));}catch(x){}}
function prevSt(){try{var p=JSON.parse(localStorage.getItem(PREVK));if(p&&typeof p.at==="number"&&p.s&&typeof p.s==="object"&&p.s.profile&&Array.isArray(p.s.logs)&&Date.now()-p.at<864e5&&Date.now()>=p.at)return p;}catch(x){}return null;}
function applyState(b,where,toast,prev){var old=D;RSP=null;holdSave=true;D=b;D.tab=where||"start";D._toast=toast;
  try{render0();}catch(e){rendering=false;holdSave=false;D=old;D._msg="This backup could not be shown, so nothing was changed.";render();return true;}
  holdSave=false;if(prev)keepPrev(old);else{try{localStorage.removeItem(PREVK);}catch(x){}}save();window.scrollTo(0,0);return true;}
function undoRestore(){var p=prevSt();if(!p)return false;var b=p.s;b.onb=true;applyState(b,"mehr","Restore undone. Your earlier data is back.",false);return true;}
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
function kitGroup(it){var p=it.k?itPat(it,curVar(it,D.loc==="h"?"h":"g")):"";if(!p&&it.k){var k0=patKey(it.k);p=own(PATK,k0)&&!/^(u_cur)$/.test(k0)?PATK[k0]:"";}if(p)return PGRP[p];
  var n=it.opts.map(function(o){return o.n;}).join(" ").toLowerCase();
  if(/wrist|reverse curl/.test(n))return "fore";
  if(/face pull|external rotation|y-raise|y-t-w|reverse butterfly|reverse fl|lateral raise|serratus|scapula|pull-apart|t-raise/.test(n))return "shoulder";
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
    var a=avail(n,"m"),fr=a.filter(function(i){return !used[n.opts[i].n];}),pick=fr.filter(function(i){return poolPat(g,n.opts[i].n)===GRPP[g];})[0];if(pick==null)pick=fr[0];if(pick==null)pick=a[0];
    if(pick!=null){used[n.opts[pick].n]=1;n.def=(function(v){return function(){return v;};})(pick);}
    if(!n.f&&/^(reps|each side)$/.test(n.unit||"")){n.lo=Math.max(n.lo,8);n.hi=Math.max(n.hi,15);n.up="slower or a harder variation";}
    if(it.c&&!n.f)n.c="";return n;});});}
/* Pause rule per movement pattern on kit days: a kit session of the pattern (any variant, also a same-group replacement
   "mx_"+key) counts as training for the gym variant, so two weeks with only kit days do not step it back. */
var PKC={};function patKey(k){var v=PKC[k];if(v===undefined){v=String(k||"").replace(/^(mx_|fav_)+/,"");if(typeof k==="string")PKC[k]=v;}return v;}
/* P-5: one pause rule for every exercise, by movement pattern (patKey), never by name: the last session of the pattern is
   the newest of every variant of it (gym, home, Field kit "mx_"+key, favourite copies) and of kitD (kit days, logged past days). */
/* A-051: the pause rule measures the movement pattern (PATK), not the single exercise: patGrp() = "@<pattern>", items
   without a pattern belong to "@all" (any training), so only a real pause of the whole pattern steps back. */
var PGC={};function patGrp(k){var v=PGC[k];if(v===undefined){var pk=patKey(k);v=own(PATK,pk)?"@"+PATK[pk]:"@all";if(typeof k==="string")PGC[k]=v;}return v;}
function grpHas(p,k){return p==="@all"||patKey(k)===p||patGrp(k)===p;}
function patLast(k,d,key){var p=key?patKey(k):patGrp(k),kd=D.kitD||{};for(var x in kd)if(own(kd,x)&&typeof kd[x]==="string"&&kd[x]>d&&grpHas(p,x))d=kd[x];
  for(var q in D.ex){var e=D.ex[q],i=q.indexOf("#");if(e&&e.d&&e.d>d&&i>0&&grpHas(p,q.slice(0,i)))d=e.d;}return d;}
function kitLabel(){var k=D.kit||[];return k.length?KITS.filter(function(x){return k.indexOf(x[0])>=0;}).map(function(x){return x[1];}).join(", "):"Nothing";}
function isKick(s){return D.kickDays.indexOf(pd(s).getDay())>=0;}
function O(s){var p=s.split("|");return {n:p[0],req:p[1]||"",w:p[2]==="w"};}
/* P: Übung mit Steigerung · lv=[Startvariante Basis, Startvariante Profi] */
function P(k,lo,hi,unit,cue,opts,up,sets,lv){return {k:k,lo:lo,hi:hi,unit:unit,c:cue||"",opts:opts.map(O),up:up||"",sets:sets||0,lv:lv||null};}
function F(dose,cue,opts){return {f:dose,c:cue||"",opts:opts.map(O)};}
/* A-027: a fixed item with real load counts for its pattern with fv sets (volume only; never cut by the set band). */
function FL(it,p,n){it.fp=p;it.fv=n;return it;}
/* I: Halteübung, Zeiten aus deinem Maximalwert, passt den Maximalwert selbst an */
function I(key,cue,opts){return {iso:key,c:cue||"",opts:opts.map(O)};}
/* T: Testwert, schreibt direkt in deinen Stand */
function T(key,unit,opts){return {test:key,unit:unit,opts:opts.map(O)};}
function lvl(){var p=D.profile;if(p.pull<5||p.dips<8)return 0;if(p.mu>=3)return 2;return 1;}
/* A-041 (L3): the level on two axes, computed only (no field). lvl() keeps choosing variations and blocks (it.lv, MUB);
   rounds() and vBand() follow the stand of a block's / pattern's own axis: lvUp() for pulling, pushing and core, lvLo() for
   legs and hinge. Lower stand = the leg anchor (hip thrust or squat, LANK): best logged weight against the first logged
   weight of the same variant, and the weeks since that first log. Upper stand = stage 1 as before (5 pull-ups, 8 dips),
   stage 2 also with 3 muscle-ups; the ratio counts pull-ups (from at least 5) against the first trial value. Both axes have a
   fourth stage, reached without a muscle-up. LVQ [ratio, weeks]: [Q3] novice → intermediate after about 6 months of
   training, advanced after years; [Q58] strength gains shrink from about 40 % (untrained) over 20 % to about 10 %
   (advanced), so the stages ask +25 %/12 weeks, +50 %/26 weeks, +75 %/104 weeks (A-049: [Q3] places "advanced" only after years of
   training, so the fourth stage also needs 104 weeks since the first value). Training status is about training
   experience [Q3]: whoever is past Basic in the upper body or started as "Experienced" (s2) is no novice, lower ≥ 1. */
var LVN=["Basic","Intermediate","Advanced","Veteran"],LVQ=[[1.25,12],[1.5,26],[1.75,104]],LANK=/^(g_ht|gl_ht|c_sq|gl_sq)#/;
var LVW=typeof WeakMap!=="undefined"?new WeakMap():null,LVLAST=null;
function lvClr(){LVLAST=null;if(LVW)LVW=new WeakMap();}
function lvStep(r,w){var s=0;LVQ.forEach(function(q,i){if(r>=q[0]-1e-9&&w>=q[1])s=i+1;});return s;}
/* One pass over the entries per entries array, extended when entries are appended (week preview copies start from the
   real state's pass): first and best weight per anchor variant, first pull-up trial value, first strength day. */
function lvScan(){var L=D.logs,c=LVW&&LVW.get(L);
  if(c&&(c.n>L.length||(c.n&&L[c.n-1]!==c.last)))c=null;
  if(!c){var o=LVLAST;c={n:0,last:null,f:{},p0:null,d0:null};
    if(o&&o.n<=L.length&&o.n&&L[o.n-1]===o.last){c.n=o.n;c.last=o.last;c.p0=o.p0;c.d0=o.d0;Object.keys(o.f).forEach(function(k){c.f[k]={d:o.f[k].d,w:o.f[k].w,b:o.f[k].b};});}
    if(LVW)LVW.set(L,c);}
  for(var i=c.n;i<L.length;i++){var l=L[i];if(!l||l.sim)continue;
    if(l.ex&&typeof l.ex==="object"){if(!c.d0&&(l.vs||Object.keys(l.ex).length))c.d0=l.d;
      for(var k in l.ex){if(!own(l.ex,k)||!LANK.test(k))continue;var a=l.ex[k],w=a&&+a[1];if(!(w>0))continue;var f=c.f[k];if(!f)c.f[k]={d:l.d,w:w,b:w};else if(w>f.b)f.b=w;}}
    if(c.p0==null&&l.tv&&typeof l.tv.pull==="number")c.p0=l.tv.pull;}
  c.n=L.length;c.last=L[L.length-1]||null;LVLAST=c;return c;}
function lvLo(){var c=lvScan(),s=0;Object.keys(c.f).forEach(function(k){var f=c.f[k];s=Math.max(s,lvStep(f.b/f.w,diff(f.d,TODAY)/7));});
  return D.startP==="s2"||lvl()>0?Math.max(s,1):s;}
/* start value of the pull-ups: the first trial value, else today's value (the start preset is no measurement) */
function lvP0(){var c=lvScan();return Math.max(5,c.p0!=null?c.p0:(D.profile.pull||0));}
function lvUp(){var L=lvl();if(L===0)return 0;var c=lvScan(),s=Math.max(1,lvStep((D.profile.pull||0)/lvP0(),c.d0?diff(c.d0,TODAY)/7:0));return L===2?Math.max(s,2):s;}
/* the stand of a block: its leg/hinge exercises against the others (core counts with the upper body, as before) */
function bStand(b){var lo=0,up=0;(b.items||[]).forEach(function(it){var p=itPat(it);if(p==="legs"||p==="hinge")lo++;else if(p)up++;});return lo&&lo>=up?lvLo():lvUp();}
function pStand(p){return p==="legs"||p==="hinge"?lvLo():lvUp();}
function lvHint(){var a=[lvNext("up"),lvNext("lo")].filter(Boolean);return a.length?'<p class="muted lvnx">'+a.join('<br>')+'.</p>':'';}
function lvTxt(){return "Upper: "+LVN[lvUp()]+" · Lower: "+LVN[lvLo()];}
/* what the next stage asks, in plain words (Status) */
function lvNext(ax){var s=ax==="lo"?lvLo():lvUp();if(s>=3)return "";var q=LVQ[s];
  if(ax==="up"&&s===0)return "Upper: next stage at 5 pull-ups and 8 dips";
  var pc=Math.round((q[0]-1)*100);return (ax==="lo"?"Lower: next stage at +"+pc+" % on your hip thrust or squat":"Upper: next stage at +"+pc+" % pull-ups")+" over your start and "+q[1]+" weeks of training";}
function can(o,loc){if(loc==="g")return true;if(loc==="m")return kitCan(o);for(var i=0;i<o.req.length;i++){var ch=o.req[i];if(ch==="g"||!D.home[ch])return false;}return true;}
function avail(it,loc){var a=[];it.opts.forEach(function(o,i){if(can(o,loc))a.push(i);});
  if(it.gone)return [];if(it.fx!=null)return a.indexOf(it.fx)>=0?[it.fx]:[];
  if(!it.add&&nev().length){var b=a.filter(function(i){return !isNever(it.opts[i].n);});if(b.length)a=b;}
  if(painAny()){var pf=a.filter(function(i){return !painHit(it.opts[i].n);});if(pf.length)a=pf;}
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
  var gs=gSkill();if(gs&&rot.indexOf(gs)>=0){var oth=rot.filter(function(k){return k!==gs;}).map(function(k,i){return {k:k,sc:skLast(k,s)+(k==="hs"?1:0)-i*0.01};}).sort(function(a,b){return b.sc-a.sc;}).map(function(x){return x.k;});return [gs].concat(oth).slice(0,n);}
  return rot.map(function(k,i){return {k:k,sc:skLast(k,s)+(k==="hs"?1:0)-i*0.01};}).sort(function(a,b){return b.sc-a.sc;}).slice(0,n).map(function(x){return x.k;});}
function SKB(k,longer,p){var b=k==="hs"?HSB(longer,p):(k==="fl"?FLB(longer,p):PLB(longer,p));b.skill=k;return b;}
function skBlocks(id,longer,p){var pl=skillPlan(id,TODAY),one=selSk().length===1,gs=gSkill();return pl.map(function(k){var lg=(longer||one||k===gs||accNow()==="skill")&&!D.short&&!holdOn("sk"),b=SKB(k,lg,p);if(lg)b.lng=[k,p];if(k===gs)b.gx=1;return b;});}
function LSIT(){var full=D.profile.lsit>=11,n=full?"L-Sit":"Tuck L-Sit";return I(lsKey(),full?"Legs straight, shoulders down":"Knees to chest, shoulders down. Then 3 short attempts with straight legs",[n+" on parallel bars|p",n+" between chairs|s",n+" on the floor","Hanging "+n+"|k"]);}
function MUB(){var L=lvl(),mu=D.profile.mu;
  if(L===0) return {name:"Pulling base",info:"2 min rest · the base before muscle-ups make sense",p:1,rest:120,items:[
    P("mu_neg",3,5,"reps","Start at the top, lower slowly for 5 s",["Negative pull-ups","Band-assisted negative pull-ups|b"],"8 s lowering","3"),
    F("3 × 20 s","Shoulder blades down and together",["Flexed arm hang at the top|k"])]};
  if(L===2) return {mu:1,name:"Muscle-Up",info:"fresh, 2–3 min rest · clean reps only",p:1,rest:150,items:[
    P("mu_pro",Math.max(2,Math.round(mu*0.5)),Math.max(4,mu),"reps","Strict, no kipping, deep dip at the top",["Strict muscle-ups (high bar, e.g. park)|k","Ring-Muscle-Ups|r","Weighted vest muscle-ups|k|w","Weighted explosive pull-ups (gym substitute)|g|w"],"add a vest","4")]};
  return {mu:1,name:"Muscle-Up-Skill",info:"fresh, 2–3 min rest · stop when technique gets sloppy",p:1,rest:150,items:[
    FL(F(mu>=1?"EMOM 10 × 1–2":"5 × 1–2","Pull explosively to the hips, elbows fast forward",["Transition on a Smith machine, low bar, feet on floor|g","Explosive chest-to-bar pull-ups|k","Band-assisted muscle-up on a high bar|kb","Ring muscle-up with foot assist|r"]),"pull",mu>=1?2:1)]};}
function SHOULDER(p,rot){return {sh:1,name:"Shoulder stability",info:"Back to back · 60 s rest after the round",p:p||3,rest:60,rounds:[2,2],items:[
  rot?P("sh_y",12,15,"reps","Lower traps, thumbs up",["Prone Y-Raises","Cable Y-raises|g|w","Reverse Butterfly|g|w"],"add weight","2"):P("sh_fp",10,15,"reps","Elbows high, hands next to the head",["Cable face pulls|g|w","Band face pulls|b","Reverse Butterfly|g|w"],"more weight","2"),
  P("sh_er",10,15,"each side","Rotator cuff, elbow at your side",["Cable external rotation|g|w","Band external rotation|b","Side-lying dumbbell external rotation|d|w"],"more weight","2"),
  P("sh_sa",8,12,"reps","Serratus: at the top, push the shoulders far forward",["Scapula Push-Ups Plus","Serratus Wall Slides|w","Landmine Serratus Press|g|w"],"slower or add weight","2")]};}
function FOREARM(){return {acc:1,name:"Forearms & elbows",info:D.skills.mu?"Back to back · protects the tendons for false grip and muscle-ups":"Back to back · protects elbows and wrists for pulling",p:3,rest:45,rounds:[2,2],items:[
  P("fa_rc",12,20,"reps","Lower slowly, elbows still",["EZ-bar reverse curls|g|w","Band reverse curls|b","Dumbbell reverse curls|d|w"],"more weight","2"),
  P("fa_wc",15,20,"reps","Alternate wrist flexors and extensors",["Dumbbell wrist curls|g|w","Band wrist curls|b"],"more weight","2")]};}
function LEGMINI(why){return {legs:1,name:"Compact legs",info:(why==="week"?"Second leg day this week":why==="ch"?"Legs on trial day too":"Strength C was a while ago")+" · 3 sets · 90 s rest",p:2,rest:90,items:[
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
  P("g_45",10,15,"reps","Round the upper back slightly, push the hips into the pad with the glutes",["45° back extension, glute-biased|g|w","Reverse hyperextension|g","Hip extension on the floor (superman)"],"hold a plate","3"),
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
var ANCH={lower:{KA:["g_ht","g_bss"],KB:["g_rdl","g_bss"],KC:["g_ht","g_su"],HO:["g_su","g_ab"],CH:["g_rdl","g_bss"]},glutes:{KA:["g_ht","g_45"],KB:["g_45","g_su"],KC:["g_ht","g_45"],HO:["g_su","g_fp"],CH:["g_45","g_su"]}};
function EMB(id,pres){var e=emph();var cfg={lower:[GLUTES,"Lower body focus","Glutes & legs"],glutes:[GLUTEX,"Glute focus","Glutes"],upper:[UPPERX,"Upper body focus","Arms & shoulders"],core:[COREX,"Core focus","Core & back"]}[e];if(!cfg)return null;
  pres=pres||[];var all=cfg[0]().filter(function(it){return !it.opts.some(function(o){return pres.indexOf(o.n)>=0;});});
  var big=(e==="lower"||e==="glutes")?id==="KC":(e==="upper"&&(id==="KA"||id==="KB"));
  var cnt=D.logs.filter(function(l){return l.id===id;}).length,n=Math.min(big?3:2,all.length),out=[];
  if(ANCH[e]&&all.length){var anc=null;(ANCH[e][id]||[]).some(function(k){anc=all.filter(function(it){return it.k===k;})[0]||null;return !!anc;});if(!anc)anc=all[0];
    anc.anc=1;out.push(anc);var rest=all.filter(function(it){return it!==anc;});
    /* A-027: the second exercise takes its turn among the emphasis patterns with the most room in the 7-day band (e.g. legs once
       calf raises no longer count); pattern-free accessory comes when the emphasis patterns are full. */
    if(rest.length){var rot=rest.slice(cnt%rest.length).concat(rest.slice(0,cnt%rest.length)),t7=vs7(TODAY),sc=function(it){var p=itPat(it);if(!t7.on)return 0;if(!p)return 1.5;if((EMPAT[e]||[]).indexOf(p)<0)return 1.8;var hi=vBand(p)[1];return t7[p]+3<=hi?t7[p]/hi:2;},bi=0;
      rot.forEach(function(it,q){if(sc(it)<sc(rot[bi]))bi=q;});out.push(rot[bi]);}}
  else for(var i=0;i<n;i++)out.push(all[(cnt*n+i)%all.length]);
  var more=all.filter(function(it){return out.indexOf(it)<0;});more=more.slice(cnt%(more.length||1)).concat(more.slice(0,cnt%(more.length||1)));
  /* A-035 (T1): with an anchor the anchor is no circuit: it comes first, set by set with full rest (2–3 min); the companion
     exercises follow it back to back. postBlocks puts the block right after the warm-up and the skill blocks. */
  if(out.some(function(it){return it.anc;}))return {name:cfg[1],info:cfg[2]+" · your emphasis · anchor first, set by set with 2–3 min rest, then the others back to back, 60–90 s rest",p:1,rest:75,rounds:[3,3],lowb:1,ser:1,items:out,more:more};
  return out.length?{name:cfg[1],info:cfg[2]+" · your emphasis · 60–90 s rest",p:1,rest:75,rounds:[3,3],lowb:1,items:out,more:more}:null;}
var ANCREST=120;
/* Where an anchored emphasis block goes: right after the warm-up, the goal anchor and the skill blocks at the start. */
function leadEnd(out){var i=0;while(i<out.length&&(out[i].warm||out[i].gx||out[i].skill||out[i].hsb||out[i].mu||out[i].trial))i++;return i;}
/* Favourite exercises: always included in strength sessions. */
var FAVIDS={KA:1,KB:1,KC:1,CH:1,HO:1};
/* A-043 (L5): planned rotation of the secondary exercises. A rotating exercise has 3 equal sets A/B/C: A is the item
   itself, B and C are own items with own keys (progress stays per variant, like Field kit); the set follows the block
   (blkNo % 3), so it changes per block, not per session [Q54] – varied selection keeps the gains and raises motivation
   [Q55]. Anchors, goal anchors, favourites, "Never suggest" and the pain filter keep precedence. Spec:
   [key, lo, hi, unit, cue, options]; options keep their order (stored variant indices). */
var ROT={
  c_lu:[["r_lu1",8,12,"reps","Front shin stays vertical, back knee lightly to the floor",["Dumbbell reverse lunges||w","Reverse lunges, slow lowering","Deficit reverse lunges on a step"]],
        ["r_lu2",8,12,"reps","Sit back into the hip, the other leg stays long",["Dumbbell lateral lunges||w","Lateral lunges","Slider lateral lunges"]]],
  g_bss:[["r_bs1",8,12,"reps","Front foot on a plate, sink deep",["Dumbbell front-foot elevated split squat|g|w","Split squat","Front-foot elevated split squat"]],
         ["r_bs2",8,12,"reps","Step behind and across, hips stay square",["Dumbbell curtsy lunges|g|w","Curtsy lunges","Goblet curtsy lunges|d|w"]]],
  g_su:[["r_su1",8,12,"reps","Push through the heel on the box",["Dumbbell lateral step-ups|g|w","Lateral step-ups on a chair|s","Skater squats"]],
        ["r_su2",8,12,"reps","Sit back to the box, stand up without rocking",["Goblet box squat|g|w","Box squat to a chair|s","Heels-elevated squats"]]],
  g_rdl:[["r_rd1",8,12,"reps","Back foot only for balance, hinge at the hip",["Dumbbell B-stance Romanian deadlift|g|w","B-stance hip hinge, hands on hips","Single-leg reaching hinge"]],
         ["r_rd2",8,12,"reps","Flat back, push the hips back",["Kettlebell deadlift|g|w","Dumbbell deadlift|d|w","Hip hinge with a long reach"]]],
  g_kb:[["r_kb1",10,15,"reps","Hips square, squeeze at the top",["Cable standing hip extension|g|w","Band standing hip extension|b","Quadruped hip extension"]],
        ["r_kb2",10,15,"reps","Knee bent, lift from the glute",["Machine hip extension|g|w","Banded donkey kicks|b","Prone bent-knee hip extension"]]],
  g_fp:[["r_fp1",15,25,"reps","Ribs down, squeeze 1 s at the top",["Dumbbell glute bridge|g|w","Glute bridge, 1 s squeeze","Glute bridge, feet elevated"]],
        ["r_fp2",15,25,"reps","Shins vertical at the top",["Barbell glute bridge|g|w","Glute bridge with a 3 s hold","Single-leg glute bridge, short lever"]]],
  g_45:[["r_45a",10,15,"reps","Push the hips back, soft knees",["Kettlebell sumo deadlift|g|w","Sumo good mornings","Sumo good mornings, slow lowering"]],
        ["r_45b",10,15,"reps","Long spine, the hips do the work",["Seated good mornings|g|w","Prone hip extension off a bed","Kneeling hip hinge"]]],
  c_calf:[["r_ca1",12,15,"reps","Knees bent, full stretch at the bottom",["Seated calf raises|g|w","Bent-knee calf raises on a step","Bent-knee calf raises"]],
          ["r_ca2",12,15,"reps","Quick and springy, stay on the balls of the feet",["Leg press calf raises|g|w","Pogo hops","Single-leg pogo hops"]]],
  c_gm:[["r_gm1",12,20,"reps","Knees open, pelvis still",["Cable hip abduction|g|w","Banded clamshells|b","Clamshells with a pause"]],
        ["r_gm2",12,20,"reps","Slow out, slower back",["Seated band abduction|b","Side plank clamshells","Standing hip abduction"]]],
  x_db:[["r_db1",8,12,"reps","Low back stays down, slow",["Cable crunch|g|w","Reverse crunches","Reverse crunches, slow lowering"]],
        ["r_db2",8,12,"reps","Lower only as far as the back stays flat",["Decline sit-ups|g|w","Dead bug with leg lowering","Hollow leg lowers"]]],
  x_pal:[["r_pa1",10,12,"reps","Chop across, hips stay still",["Cable half-kneeling chop|g|w","Band half-kneeling chop|b","Plank with arm reach"]],
         ["r_pa2",10,12,"reps","Do not lean, ribs stacked over the hips",["Suitcase march|d|w","Bird dog with a 3 s hold","Bear plank shoulder taps"]]],
  x_sp:[["r_sp1",20,40,"s","Body in one line, hips high",["Side plank, feet on a bench|g","Side plank on the forearm, feet staggered","Side plank with a reach-through hold"]],
        ["r_sp2",20,40,"s","Stand tall, do not lean to the weight",["Suitcase hold|d|w","Side-lying lateral leg hold","Short-lever adductor plank|s"]]],
  x_lr:[["r_lr1",8,15,"reps","No swinging, curl the pelvis to the side",["Hanging oblique knee raises|g","Hanging oblique knee raises at the bar|k","Lying windshield wipers"]],
        ["r_lr2",8,15,"reps","Slow up, slower down",["Dip-station leg raises|g","Lying toe touches","Lying leg raises with a hip lift"]]],
  x_aw:[["r_aw1",6,12,"reps","Ribs down, hips do not sag",["Barbell rollouts|g","Long-lever plank walkouts","Bear crawl"]],
        ["r_aw2",6,12,"reps","Rock from the shoulders, body stays rigid",["Body saw on a cable machine|g","Plank reaches","Body saw on the floor"]]],
  u_row:[["r_ur1",8,12,"reps","Chest stays on the bench",["Seal row|g|w","Prone dumbbell row on a chair|sd|w","Towel rows on a door"]],
         ["r_ur2",8,12,"reps","Pull the elbow to the hip",["Landmine row|g|w","Single-arm band row|b","Table rows, feet elevated"]]]};
var ROTK={};Object.keys(ROT).forEach(function(k){ROTK[k]=k;ROT[k].forEach(function(x){ROTK[x[0]]=k;});});
function rotSet(s){return blkNo(s||TODAY)%3;}
function rotItem(it,set){var f=ROT[it.k];if(!f){if(ROTK[it.k])it.rot=ROTK[it.k];return it;}
  if(!set){var a=Object.assign({},it);a.rot=it.k;return a;}
  var x=f[set-1],n=P(x[0],x[1],x[2],x[3],x[4],x[5],"more weight or the next variation");
  if(n.opts.every(function(o){return isNever(o.n);}))return it;
  var r=Object.assign({},it);delete r.def;delete r.lv;delete r.up;Object.keys(n).forEach(function(q){r[q]=n[q];});r.sets=it.sets;r.rot=it.k;if(it.ts!=null)r.ts=it.ts;return r;}
/* in S() right after postBlocks(): blocks that hold user choices or fixed content keep their items */
function rotApply(s,id,c){var set=c&&c.blk?(c.blk-1)%3:rotSet();s.rset=set;
  s.blocks.forEach(function(b){if(b.warm||b.cool||b.skill||b.hsb||b.trial||b.jump||b.add||b.rehab||b.gx||b.fav)return;
    var m=function(it){return it.anc||it.gx||it.f||it.iso||it.test||!it.k||isFavIt(it)?it:rotItem(it,set);};
    b.items=b.items.map(m);if(b.more)b.more=b.more.map(m);});}
function favCatalog(){var cat={};function add(it,v){var n=it.opts[v].n;if(!cat[n])cat[n]={it:it,v:v};}
  GLUTES().concat(GLUTEX(),UPPERX(),COREX()).forEach(function(it){it.opts.forEach(function(o,v){add(it,v);});});
  Object.keys(ROT).forEach(function(k){ROT[k].forEach(function(x){var it=P(x[0],x[1],x[2],x[3],x[4],x[5],"more weight or the next variation");it.opts.forEach(function(o,v){add(it,v);});});});
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
function KM_ACT(){return {name:D.kickDays.length?"Kick mobility":"Mobility",info:"15 min · active",p:1,rest:30,items:[
  P("km_front",5,8,"× 5 s each side","Hold the straight leg up in front, no swinging",["Active front leg raise"],"hold higher"),
  P("km_side",5,8,"× 5 s each side","Slowly hold a side kick at the end position",["Side kick hold at a chair or door"],"hold higher"),
  P("km_horse",30,60,"s","Deep, back straight",["Horse Stance"],"deeper","3"),
  F("2 × 45 s","Straddle, chest forward",["Pancake / straddle fold"]),
  F("2 × 60 s","Stand wide, sink slowly",["Side split progression","Frog Pose"])]};}
var REHAB={
  w:{name:"Wrist rehab",items:[F("2 min","Gentle, pain-free",["Circle the wrists, open and close the fingers"]),F("3 × 15","Rubber band around the fingers, open",["Finger extensions with a rubber band"]),F("3 × 20 s","Fist against the other hand, no movement",["Wrist isometrics in 4 directions"])]},
  s:{name:"Shoulder rehab",items:[F("3 × 15","Light band, pain-free",["Band external rotation"]),F("3 × 10","Shoulder blades back and down, hold 3 s",["Scapula Setting"]),F("2 × 10","Lying down, only as far as it feels good",["Floor Angels"])]},
  e:{name:"Elbow rehab",items:[F("3 × 15","Lower slowly for 3 s, light weight",["Eccentric wrist curls"]),F("3 × 15","Light, slow",["Light reverse curls"]),F("2 × 30 s","",["Forearm stretch, both sides"])]},
  k:{name:"Knee rehab",items:[F("3 × 30 s","Lying, leg straight, press the back of the knee down",["Quad sets"]),F("3 × 10","Lying on your back, other knee bent, slow",["Straight-leg raises"]),F("3 × 30 s","Back on the wall, only as deep as it stays pain-free",["Shallow wall sit"])]},
  b:{name:"Lower back rehab",items:[F("2 × 10","Slow, only the pain-free range",["Cat-cow"]),F("2 × 8 each side","Back stays flat, reach long",["Bird dog"]),F("3 × 20 s each side","On the forearm, hips high",["Side plank on knees"])]},
  a:{name:"Ankle rehab",items:[F("2 × 10 each way","Seated, slow circles",["Ankle circles"]),F("3 × 15","Band around the forefoot, push and pull",["Band ankle pumps"]),F("3 × 30 s","Hold on to a wall, only if pain-free",["Single-leg balance"])]},
  h:{name:"Hip rehab",items:[F("3 × 10","Lying on the side, small range, pelvis still",["Clamshells"]),F("3 × 10 s","Lying, knees bent, squeeze a pillow between them",["Pillow squeeze"]),F("2 × 30 s each side","Gentle, no pinch at the front of the hip",["Supine figure-four stretch"])]}
};
var PAINN={w:"Wrist",s:"Shoulder",e:"Elbow",k:"Knee",b:"Lower back",a:"Ankle",h:"Hip"};
/* A-027 (N-2): word boundaries, so a name only hits its own region: Woodchopper is no hop, external rotation and
   march in place are no loaded back rotation/swing, Frogstand/Crow no hip opener, side plank dips no dips. */
var PAINRX={w:/\b(?:handstands?|(?:chest|back)-to-wall|push-ups?|shoulder taps|bail|frog ?stand|wall walks?|pike|crow|planche|dips|l-sit|heel pulls|victorian|wrist (?:prep|curls?|flexor)|hspu)\b|liegestütz|handgelenk|schulter-taps|aussteigen/i,
  s:/\b(?:german hang|(?:chest|back)-to-wall|shoulder press|overhead|shoulder taps|bail|dips|handstands?|wall walks?|skin the cat|dislocates|muscle-ups?|transitions?|pike|landmine press|hspu|heel pulls)\b|schulterdrücken|schulterpresse|überkopf|schulter-taps|aussteigen/i,
  k:/\b(?:hops?|hopping|squats?|lunges?|step-ups?|pistol|leg press|box jumps?|jumping|jump rope|skipping|cossack|leg curls?|nordic|wall sit|horse stance|leg extensions?|sumo)\b/i,
  b:/\b(?:deadlifts?|good mornings?|kettlebell swings?|back extensions?|hyperextensions?|superman|pull-through|bent-over|t-bar|woodchoppers?|chops?|hip extension off a bed|(?:hip|reaching) hinge|windshield wipers?|toe touches|rotational|landmine rotation|leg raises|knee raises|barbell back squat|rowing machine|jefferson)\b/i,
  a:/\b(?:jumps?|jumping|skipping|hops?|hopping|calf raises?|pistol|lunges?|step-ups?|sprints?|tibialis|cossack)\b/i,
  h:/\b(?:hip extensions?|donkey kicks?|clamshells?|hip thrusts?|glute bridges?|kickbacks?|abduction|abductor|hydrants?|side-lying leg raises|copenhagen|adductors?|cossack|split squats?|lunges?|sumo|frog(?! ?stand)|hip flexor|leg raises|horse stance|90\/90|pigeon)\b/i,
  e:/\b(?:muscle-ups?|pull-ups?|pulldowns?|curls?|triceps|chin-ups?|transitions?|false-grip|explosive|frenchie|dips|french press)\b|klimmzüge|latzug|trizeps/i};
/* A-052: exceptions per region instead of lookbehind (older iOS Safari has none): these names are cut before the test. */
var PAINEX={w:/\bplank dips\b/gi,s:/\bplank dips\b/gi,e:/\bplank dips\b|\b(?:nordic|leg) curls?\b/gi,b:/\bside-lying leg raises\b/gi};
function painRx(k,name){var n=String(name||"");if(own(PAINEX,k))n=n.replace(PAINEX[k]," ");return PAINRX[k].test(n);}
/* A-027: the pain filter works on whole sessions too. Knee, ankle or hip: no Strength C, no leg block on upper-body days,
   no run goal day; shoulder, elbow or wrist: no Skill Trial or test (postponed); knee or ankle: kickboxing only with a hint. */
var PAINU={k:{kc:1,leg:1,rgoal:1,kick:1},a:{kc:1,leg:1,rgoal:1,kick:1},h:{kc:1,leg:1,rgoal:1},s:{test:1},e:{test:1},w:{test:1}};
function painU(f){var p=D.pain||{};return Object.keys(PAINU).some(function(k){return p[k]===true&&PAINU[k][f];});}
function painAny(){var p=D.pain||{};return Object.keys(PAINRX).some(function(k){return p[k]===true;});}
/* Central check for every list the app suggests: an item (some fitting variant is pain-free) or a name. */
function painOK(x,loc){if(typeof x==="string")return !painHit(x);if(!x||!x.opts)return true;var v=curVar(x,loc||LOC());return v<0||!painHit(x.opts[v].n);}


/* ================= Einheiten ================= */
var NAMES={KA:"Strength A: Muscle-up",KB:"Strength B: Volume",KC:"Strength C: Full body & legs",CH:"Skill Trial",SK:"Skill session",RS:"Recovery & kick mobility",DL:"Deload",TE:"Test",HO:"Home strength",HK:"Home skills",RE:"Easy run",RH:"Hard run",RI:"Interval run",KI:"Kickboxing",MO:"Morning routine",OA:"Other activity"};
/* Total load (P-4): every log has minutes (logged, or this estimate for old logs and entries without a time; never written
   back), load = how hard (4/6/8/10) × minutes. A hard other activity (hard, or ≥ 150 min at a fine effort) keeps the next day
   free of Strength C and hard runs. */
var MINEST={KI:90,KA:75,KB:75,KC:75,CH:45,HO:50,SK:40,HK:40,RS:16,MO:12,RE:35,RI:40,DL:40,TE:45,OA:60};
function logMin(l){if(l.min>0)return l.min;if(l.id==="RH")return l.km>0?Math.round(l.km*6.5):45;return MINEST[l.id]||45;}
function logLoad(l){return (l.rpe||(l.id==="MO"?3:6))*logMin(l);}
function oaHard(l){return l.id==="OA"&&((l.rpe||0)>=8||((l.rpe||0)>=6&&logMin(l)>=150));}
function weekLoad(ws){var z=addD(ws,7);return D.logs.reduce(function(a,l){return l.d>=ws&&l.d<z?a+logLoad(l):a;},0);}
/* This week so far against the average of the last 4 weeks with training (weeks without any training do not count). */
function loadStat(){var ws=weekKey(TODAY),cur=weekLoad(ws),prev=[];
  for(var i=1;i<=12&&prev.length<4;i++){var w=addD(ws,-7*i),z=addD(w,7);if(pausedIn(w,z))continue;if(D.logs.some(function(l){return l.d>=w&&l.d<z&&isTrain(l);}))prev.push(weekLoad(w));}
  var avg=prev.length?prev.reduce(function(a,x){return a+x;},0)/prev.length:0,lim=D.logs.filter(function(l){return l.d>=ws&&l.d<=TODAY&&(l.rpe||0)>=10&&l.id!=="MO";}).length;
  return {cur:Math.round(cur),avg:Math.round(avg),n:prev.length,lim:lim};}
var OAS=["Hiking","Dancing","Cycling","Swimming","Ball sports"];
function homeB(){return D.logs.filter(function(l){return l.id==="HO";}).length%2===1;}
function updNames(){var lm=longMode();NAMES.RH=lm?"Long run":"Hard run";WKS.RH=NAMES.RH;RUNT.RH=lm?"Long":"Hard";NAMES.HO=homeB()?"Home strength B":"Home strength A";NAMES.KA=D.skills.mu?"Strength A: Muscle-up":"Strength A: Pull & push";NAMES.RS=D.kickDays.length?"Recovery & kick mobility":"Recovery & mobility";}
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
  if(em!=="bal"&&(id==="KA"||id==="KB"||id==="HO"||id==="KC"||(id==="CH"&&(em==="lower"||em==="glutes")))){
    if((em==="lower"||em==="glutes")&&id!=="KC")out.forEach(function(b){if(b.rounds&&!b.lowb&&/Strength|Circuit|Pull|Push|Transitions|Base strength|Explosive/.test(b.name))b.rounds=[Math.max(2,b.rounds[0]-1),Math.max(2,b.rounds[1]-1)];});
    if(em==="upper"&&id==="KC")out.forEach(function(b){if(b.name==="Legs"&&b.items.length>3)b.items=b.items.slice(0,3);});
    var pr0=[];out.forEach(function(b){b.items.forEach(function(it){it.opts.forEach(function(o){pr0.push(o.n);});});});var eb=EMB(id,pr0);if(eb){if(eb.ser)out.splice(leadEnd(out),0,eb);else out.push(eb);}}
  goalBlock(id,out);
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
  rotApply(s,id,c);
  if(legDay(id)) s.blocks.forEach(function(b){if(b.warm){b.items=b.items.concat(LEGWARM());b.min=11;b.info="approx. 11 min · hips, knees and ankles too";}});
  if(kitOn()) kitApply(s);
  neverApply(s);
  painApply(s);
  if(D.short) shortLegs(s,c);
  if(id==="CH") trialDay(s,c);
  accApply(s,id,c);
  holdSk(s);
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
    if(it.gx){it.nh=1;return it;}
    var g=kitGroup(it),n={},pick=null;cat=cat||favCatalog();
    Object.keys(cat).some(function(nm){var x=cat[nm];if(isNever(nm)||painHit(nm)||used[nm]||x.it.f||x.it.iso||x.it.test||!can(x.it.opts[x.v],loc)||kitGroup(x.it)!==g)return false;pick=x;return true;});
    if(pick){Object.keys(pick.it).forEach(function(k){n[k]=pick.it[k];});n.fx=pick.v;}
    else{Object.keys(it).forEach(function(k){n[k]=it[k];});n.opts=KPOOL[g].map(O);if(n.k)n.k="mx_"+String(n.k).replace(/^(mx_)+/,"");var a=avail(n,loc).filter(function(i){return !used[n.opts[i].n]&&!isNever(n.opts[i].n)&&!painHit(n.opts[i].n);});if(!a.length)return it;a.sort(function(x,y){return (poolPat(g,n.opts[x].n)===GRPP[g]?0:1)-(poolPat(g,n.opts[y].n)===GRPP[g]?0:1);});n.fx=a[0];n.kx=g;}
    delete n.def;delete n.lv;n.nx=it.opts[v].n;if(it.anc)n.anc=it.anc;used[n.opts[n.fx].n]=1;return n;});});}
/* A-027 (M-1): the pain filter acts before design(), so duration, the 60 min floor and the variants are right. An item
   with a pain-free variant already gets it (avail); one without gets an exercise of the same muscle group (pattern from
   PATK, else kitGroup) from the catalogue, else the Field kit pool; with nothing pain-free it goes. Warm-up, cool-down,
   fixed, hold and test items only go. Additions keep their hint; rehab blocks are never filtered. */
/* A block rebuilt inside design() (standard skill form) goes through the same filter. */
function painFix(s){painApply(s);}
function painApply(s){if(!painAny())return;var loc=LOC(),used={},cat=null;
  s.blocks.forEach(function(b){b.items.forEach(function(it){var v=curVar(it,loc);if(v>=0)used[it.opts[v].n]=1;});});
  s.blocks.forEach(function(b){if(b.rehab||b.add)return;if(b.more)b.more=b.more.filter(function(m){return painOK(m,loc);});
    b.items=b.items.map(function(it){var v=curVar(it,loc);if(v<0||!painHit(it.opts[v].n))return it;
      if(b.warm||b.cool||it.f||it.iso||it.test||it.add)return null;
      var g=kitGroup(it),n={},pick=null;cat=cat||favCatalog();
      Object.keys(cat).some(function(nm){var x=cat[nm];if(painHit(nm)||isNever(nm)||used[nm]||x.it.f||x.it.iso||x.it.test||!can(x.it.opts[x.v],loc)||kitGroup(x.it)!==g)return false;pick=x;return true;});
      if(pick){Object.keys(pick.it).forEach(function(k){n[k]=pick.it[k];});n.fx=pick.v;}
      else{Object.keys(it).forEach(function(k){n[k]=it[k];});n.opts=KPOOL[g].map(O);if(n.k)n.k="mx_"+String(n.k).replace(/^(mx_)+/,"");var a=avail(n,loc).filter(function(i){return !used[n.opts[i].n]&&!painHit(n.opts[i].n)&&!isNever(n.opts[i].n);});if(!a.length)return null;
        a.sort(function(x,y){return (poolPat(g,n.opts[x].n)===GRPP[g]?0:1)-(poolPat(g,n.opts[y].n)===GRPP[g]?0:1);});n.fx=a[0];n.kx=g;}
      delete n.def;delete n.lv;delete n.nx;n.px=it.opts[v].n;n.pxk=it.k||"";if(it.anc)n.anc=it.anc;if(it.gx)n.gx=it.gx;used[n.opts[n.fx].n]=1;return n;}).filter(Boolean);});
  s.blocks=s.blocks.filter(function(b){return b.items.length||b.warm||b.cool||b.rehab||b.add;});}
/* Additions (A-021): "+ Add exercise" puts catalogue exercises into today's session, in the block "Your additions" before the
   cool-down. They live in the day progress (day().add), so they survive a reload and are gone the next day. design() never
   touches them, the header shows the new duration (may exceed 90 min); only the pain filter hides one (with its hint).
   Ids use the fixed block index ADDBI, so removing one does not move another session's inputs. */
var ADDIDS={KA:1,KB:1,KC:1,CH:1,SK:1,DL:1,HO:1,HK:1},ADDBI=80;
function ADDB(){var dy=D.days[TODAY];if(WK.sim||!dy||!dy.add||!dy.add.length)return null;var cat=favCatalog(),items=[];
  dy.add.forEach(function(n){var c=cat[n],it={};if(!c){items.push({k:"add_x",lo:8,hi:12,unit:"reps",c:"",opts:[{n:n,req:"g",w:false}],fx:0,add:1,gone:1});return;}
    Object.keys(c.it).forEach(function(k){it[k]=c.it[k];});delete it.def;delete it.lv;delete it.anc;it.fx=c.v;it.add=1;it.sets=it.sets||"3";items.push(addPain(it,cat));});
  return {name:W("adds"),info:"Today only · 60–90 s rest",p:1,rest:75,add:1,bi:ADDBI,items:items};}
/* A-035 (A-027 rest): an addition on the pain list is handled like painApply: first a pain-free variant of the same
   exercise, else a catalogue exercise of the same muscle group (hint "pain-free choice"), else it is removed for today with
   a hint (it keeps its place, so the inputs of the other additions do not move). */
function addPain(it,cat){if(!painAny())return it;var loc=LOC(),v=it.fx;if(v==null||!it.opts[v]||!painHit(it.opts[v].n))return it;var old=it.opts[v].n;
  var a=[];it.opts.forEach(function(o,i){if(can(o,loc)&&!painHit(o.n))a.push(i);});
  if(a.length){it.fx=a[0];it.px=old;return it;}
  var g=kitGroup(it),pick=null,used={};(D.days[TODAY].add||[]).forEach(function(n){used[n]=1;});
  Object.keys(cat).some(function(nm){var x=cat[nm];if(painHit(nm)||used[nm]||x.it.f||x.it.iso||x.it.test||!can(x.it.opts[x.v],loc)||kitGroup(x.it)!==g)return false;pick=x;return true;});
  if(pick){var n={};Object.keys(pick.it).forEach(function(k){n[k]=pick.it[k];});delete n.def;delete n.lv;delete n.anc;n.fx=pick.v;n.add=1;n.sets=n.sets||"3";n.px=old;return n;}
  it.gone=1;it.pgone=old;return it;}
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
  /* A-035: anchor set by set with full rest, the companions after it back to back (rest after each round). */
  if(b.ser){var ts=0,cp=0,cr=0;its.forEach(function(it){var n=setsOf(it,b,c,id);if(it.anc){ts+=n*(40+(b.ancR||ANCREST));return;}cp+=n*45;cr=Math.max(cr,n);});return ts+cp+cr*(b.rest||0)+wu;}
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
/* A-047: a tired day is designed as the normal session first (same fill, band and rounds, frozen in b.tr), then tiredCut()
   takes about a third of the session's working sets away. A taper session keeps its taper. */
function design(s,id,c){if((rdDay()!==3&&!holdOn("str"))||!BANDIDS[id])return design0(s,id,c);
  RD2=true;try{s=design0(s,id,c);s.blocks.forEach(function(b){if(b.rounds&&b.tr==null&&!b.warm&&!b.cool)b.tr=rounds(b,c,id);});}finally{RD2=false;}
  if(!s.taper&&tiredCut(s,c,id,function(){return estMin(s,c,id);}))s.min=estMin(s,c,id);return s;}
function design0(s,id,c){s.ab=absFor(id);
  function blk(f){return s.blocks.filter(f)[0];}
  function est(){return estMin(s,c,id);}
  function drop(f){for(var j=s.blocks.length-1;j>=0;j--){if(f(s.blocks[j])){s.blocks.splice(j,1);return true;}}return false;}
  var free=function(b){return !b.warm&&!b.cool&&!b.legs&&!b.lowb&&!b.fav&&!b.sh&&!b.acc&&!b.gx;};
  var trim=[
    /* P-5: an extra round from the set band only fits inside 90 min, so it is the first thing to give way. */
    function(){var ch=false;s.blocks.forEach(function(b){if(b.rounds&&!b.vb0&&b.tr==null&&volBias(b)>0&&!legLow(b)){var r1=rounds(b,c,id);b.vb0=1;if(rounds(b,c,id)<r1)ch=true;}});return ch;},
    function(){var ch=false;s.blocks.forEach(function(b){if(b.acc&&b.rounds&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){var b=blk(function(x){return x.acc&&!x.accm&&/Kickboxing|Power/.test(x.name);});if(!b)return false;var k=b.items.filter(function(it){return it.k==="kp_cop"||/Neck/.test(it.opts[0].n);});if(!k.length||k.length===b.items.length)return false;b.items=k;b.accm=1;b.info="Compact · tendons, adductors and neck · 60 s rest";return true;},
    function(){var b=blk(function(x){return x.acc&&!x.accm&&x.name==="Forearms & elbows";});if(!b)return false;b.items=b.items.slice(0,1);b.accm=1;b.info=D.skills.mu?"Compact · protects the tendons for false grip and muscle-ups":"Compact · protects elbows and wrists for pulling";return true;},
    function(){var ch=false;s.blocks.forEach(function(b){if(b.p>1&&b.rounds&&!b.lowb&&!b.legs&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){var ch=false;s.blocks.forEach(function(b){if(b.rounds&&!b.lowb&&!b.legs&&b.rounds[1]>b.rounds[0]){b.rounds=[b.rounds[0],b.rounds[0]];ch=true;}});return ch;},
    function(){if(s.ab&&!s.ab.mini){s.ab.rounds=4;s.ab.mini=true;return true;}},
    function(){if(s.ab){s.ab=null;return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.rounds&&b.rounds[1]>2){b.rounds=[2,2];return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.items.length>1){var a=b.items.filter(function(it,i){return it.anc||isFavIt(it)||(i===0&&!b.items.some(function(x){return x.anc;}));});if(a.length<b.items.length){b.items=a;return true;}}},
    function(){var b=blk(function(x){return x.fav;});if(b&&b.items.length>2){b.items=b.items.slice(0,2);b.info="2 today, they take turns · 60–90 s rest";return true;}},
    function(){return drop(function(b){return b.acc&&b.name==="Forearms & elbows";});},
    function(){return drop(function(b){return b.acc;});},
    function(){var j=-1;s.blocks.forEach(function(b,x){if(b.lng&&!b.gx&&j<0)j=x;});if(j<0)return false;var o=s.blocks[j],nb=SKB(o.lng[0],false,o.lng[1]);if(FAVIDS[id])favDef(nb);s.blocks[j]=nb;painFix(s);return true;},
    function(){var b=blk(function(x){return x.sh;});return b?shMini(b):false;}];
  for(var r=0;r<8;r++)trim.push(function(){return drop(function(b){return b.p>=2&&free(b);});});
  /* Goal skill (P-2, D1): ranks above favourites, so its long form goes only now, before favourites drop below 2. */
  trim.push(function(){var j=-1;s.blocks.forEach(function(b,x){if(b.lng&&b.gx&&j<0)j=x;});if(j<0)return false;var o=s.blocks[j],nb=SKB(o.lng[0],false,o.lng[1]);nb.gx=1;if(FAVIDS[id])favDef(nb);s.blocks[j]=nb;painFix(s);return true;});
  /* Last resort, only once all pure accessory work is gone: one favourite today. */
  trim.push(function(){var b=blk(function(x){return x.fav;});if(b&&b.items.length>1&&!blk(function(x){return x.acc;})){b.items=b.items.slice(0,1);b.info="1 today, they take turns · 60–90 s rest";return true;}});
  /* With a goal block only: a secondary main block gives way rather than the goal (keeps every session within 90 min). */
  if(blk(function(x){return x.gx;}))for(var g2=0;g2<4;g2++)trim.push(function(){return drop(function(b){return free(b)&&!b.skill&&!b.mu&&!b.hsb;});});
  /* A-042: the strength block's extra round / set gives way last, so the accent never breaks 90 min */
  trim.push(function(){var ch=false;s.blocks.forEach(function(b){if(b.accP&&b.rounds){b.rounds=[b.rounds[0]-1,b.rounds[1]-1];b.accP=0;ch=true;}b.items.forEach(function(it){if(it.accP&&it.ts==null){it.sets=Math.max(2,parseInt(String(it.sets),10)-1);it.accP=0;ch=true;}});});return ch;});
  s.min=est();
  for(var i=0;i<trim.length&&s.min>DURMAX;i++){if(trim[i]())s.min=est();}
  /* A-025: the set band also works through the sets of single exercises (blocks without a round range had nothing to cut). */
  /* A-032 (M-3): the goal anchor counts into the cap like any exercise; when it trains the same pattern as the emphasis,
     the emphasis gives sets: each of its exercises of that pattern one set less (floor 2). */
  var gxi=null;s.blocks.forEach(function(b){if(b.gx)b.items.forEach(function(it){if(it.gx&&curVar(it,LOC())>=0)gxi=it;});});
  var gpx=gxi?itPat(gxi):"",lbg=blk(function(x){return x.lowb;});
  /* The goal anchor then is the session's anchor: the emphasis anchor of the same pattern becomes a companion. */
  if(gpx&&lbg&&(EMPAT[emph()]||[]).indexOf(gpx)>=0){var rep1=false,lgb=legSets(s,c,id),snap=lbg.items.map(function(it){return [it,it.ts,it.anc];}),more0=lbg.more&&lbg.more.slice();lbg.items=lbg.items.map(function(it){if(itPat(it)!==gpx||curVar(it,LOC())<0)return it;if(it.anc){it.gan=1;delete it.anc;}
      /* one exercise of the goal pattern makes way for a pattern-free emphasis exercise (e.g. abduction), the others give a set */
      if(!it.gan&&!rep1&&lbg.more){var j=-1;lbg.more.some(function(m,q){if(!itPat(m)&&curVar(m,LOC())>=0){j=q;return true;}});if(j>=0){var m=lbg.more.splice(j,1)[0];lbg.more.push(it);m.ts=setsOf(it,lbg,c,id);m.gsw=1;rep1=true;return m;}}
      var n=setsOf(it,lbg,c,id);if(n>2){it.ts=n-1;it.gcut=1;}return it;});
    /* a session that has to stay a leg session (A-009) keeps what the emphasis would have given */
    if(legKeep(id,lgb)&&legSets(s,c,id)<6){lbg.items=snap.map(function(x){var it=x[0];if(x[1]==null)delete it.ts;else it.ts=x[1];if(x[2])it.anc=x[2];delete it.gan;delete it.gcut;return it;});lbg.more=more0;}
    s.min=est();}
  var cap=BANDIDS[id]?bandCaps(id):null;if(cap&&bandFit(s,c,id,cap,est))s.min=est();
  /* Taper week before a goal date (P-2): same exercises and loads, about half the working sets (taken evenly, from the end
     of the session first; every exercise keeps at least 1 set). Frequency stays, nothing is filled up. */
  if(gTaper()){var U=[];s.blocks.forEach(function(b){if(b.warm||b.cool)return;var its=b.items.filter(function(it){return it.k&&!it.f&&!it.iso&&!it.test&&curVar(it,LOC())>=0;});if(!its.length)return;
      if(b.rounds)U.push({b:b,n:its.length,r:1});else its.forEach(function(it){U.push({b:b,it:it,n:1});});});
    var cur=function(u){return u.r?rounds(u.b,c,id):setsOf(u.it,u.b,c,id);},tot=0;U.forEach(function(u){tot+=cur(u)*u.n;});
    var tg=Math.round(tot*0.5),fl=Math.ceil(tot*0.4),ch=true;
    while(tot>tg&&ch){ch=false;for(var q=U.length-1;q>=0&&tot>tg;q--){var u=U[q],v=cur(u);if(v>1&&tot-u.n>=fl){if(u.r)u.b.tr=v-1;else u.it.ts=v-1;tot-=u.n;ch=true;}}}
    s.taper=1;s.min=est();return s;}
  if(D.short||!BANDIDS[id]||dlWk(TODAY,c)||cbInfo(TODAY).low)return s;
  /* P-8: on a tired day no extras are added, unless the session would be under 60 min (the floor ranks first). */
  if(rdDay()===3&&s.min>=DURMIN)return s;
  /* Under 60 min: sensible extras only, each kept only if the session stays within 90 min. */
  var fill=[
    function(){var b=blk(function(x){return x.fav;});if(b&&b.more&&b.more.length&&b.items.length<6){b.items.push(b.more.shift());return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.more&&b.more.length&&b.items.length<3){b.items.push(nextMore(b));return true;}},
    function(){if(s.ab&&s.ab.mini&&(id!=="CH"||!D.skills.mu)){s.ab.rounds=8;s.ab.mini=false;return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.rounds&&b.rounds[0]<4){b.rounds=[4,4];return true;}},
    function(){var b=blk(function(x){return x.lowb;});if(b&&b.more&&b.more.length&&b.items.length<4){b.items.push(nextMore(b));return true;}}];
  /* A-025: an emphasis extra takes the first exercise whose pattern still has room in the band (e.g. a split squat when
     hinge is full), else the one that goes over it least. */
  function nextMore(b){var j=0;if(cap){var v=volSets(s,c,id),r=rounds(b,c,id),bx=Infinity;for(var q=0;q<b.more.length;q++){var p=itPat(b.more[q]),x=p?v[p]+r-cap[p]:-99;if(x<=0){j=q;break;}if(x<bx){bx=x;j=q;}}}return b.more.splice(j,1)[0];}
  for(var k=0;k<4;k++)fill.push(fill[0]);
  /* A-027: on a pain day the filter may leave a session short; then a main circuit gets one round back (up to 3), so the 60 min floor holds. */
  if(painAny())for(var k2=0;k2<2;k2++)fill.push(function(){var b=blk(function(x){return x.rounds&&!x.lowb&&!x.warm&&!x.cool&&!x.acc&&x.tr==null&&rounds(x,c,id)<3&&x.items.some(function(it){return curVar(it,LOC())>=0;});});if(!b)return false;var r=rounds(b,c,id)+1;b.rounds=[r,r];return true;});
  /* A-025: first only extras that keep every pattern inside its band; the 60 min frame stays the hard limit (concept 5.3),
     so if the session is still short, a second pass may go over the band. */
  var flo=rdDay()===3?DURMIN:DURLO;
  function runFill(strict){for(var j=0;j<fill.length&&s.min<flo;j++){var keep=s.blocks.map(function(b){return b.items.slice();}),ab0=s.ab&&{i:s.ab.i,rounds:s.ab.rounds,mini:s.ab.mini},rd=s.blocks.map(function(b){return b.rounds;});
    var v0=strict&&volSets(s,c,id);if(!fill[j]())continue;var m=est(),v1=strict&&volSets(s,c,id);
    if(m>DURMAX||(strict&&VPAT.some(function(p){return v1[p]>v0[p]&&v1[p]>cap[p];}))){s.blocks.forEach(function(b,x){var add=b.items.slice(keep[x].length);if(add.length&&b.more)b.more=add.concat(b.more);b.items=keep[x];b.rounds=rd[x];});s.ab=ab0;}else s.min=m;}}
  runFill(!!cap);if(cap)runFill(false);
  /* A-025: what the fill made room for (now over 60 min) can now give way to the band too. */
  if(cap&&bandFit(s,c,id,cap,est))s.min=est();
  /* A-032: a leave-out that the fill could not make up for comes back: 60 min stays the floor. */
  if(!D.short&&s.min<flo){var bdl=[];s.blocks.forEach(function(b){b.items.forEach(function(it){if(it.bd)bdl.push(it);});});while(bdl.length&&s.min<flo){var r0=bdl.pop();delete r0.gone;delete r0.bd;s.min=est();}}
  /* A-035: the anchor set by set takes longer, so the emphasis block brings fewer extras through the under-60 fill. An
     emphasis pattern still under its band lower limit (7 days with today, and under its share per session) gets one more
     emphasis exercise of that pattern when it fits the caps and 90 min. */
  if(cap&&rdDay()!==3){var lbx=blk(function(x){return x.lowb&&x.more&&x.more.length;});if(lbx){var vv=volSets(s,c,id);(EMPAT[emph()]||[]).some(function(p){var lo=vBand(p)[0];
      if(cap._u[p]+vv[p]>=lo||vv[p]>=Math.round(lo/cap._n[p]))return false;var j=-1;lbx.more.some(function(m,q){if(itPat(m)===p&&curVar(m,LOC())>=0){j=q;return true;}});if(j<0)return false;
      var m0=lbx.more[j];lbx.items.push(m0);lbx.more.splice(j,1);var m1=est(),v1=volSets(s,c,id);if(m1>DURMAX||v1[p]>cap[p]){lbx.items.pop();lbx.more.splice(j,0,m0);return false;}s.min=m1;return true;});}}
  return s;}
/* Skill Trial (P-3): test items for the goal and the active skills (values go into the profile and the log's tv), with a
   lower/glute emphasis also a lower-body test: max clean reps of the anchor exercise at its working weight (tv.lb). */
/* Beginners without a pull-up (A-024) test a fitting earlier stage instead of "0 reps": a dead hang in seconds (into the
   profile's hang) while it is under 30 s, then a slow negative pull-up in seconds (only into tv.neg, like the lower-body test). */
function pullTest(){if((D.profile.pull||0)>0)return T("pull","reps",["Clean pull-ups"]);
  if((D.profile.hang||0)<30){var t=T("hang","s",["Dead hang"]);t.c="Hang from the bar, arms straight, shoulders active. Stop when the grip opens.";t.pre=1;return t;}
  return {test:"neg",tvo:1,pre:1,unit:"s",opts:[{n:"Negative pull-ups",req:"",w:false}],c:"Jump to the top, chin over the bar, lower as slowly as you can. Count the seconds until the arms are straight."};}
function trialItems(){var sk=D.skills,g=D.goal&&GOALS[D.goal.k]?D.goal.k:"",out=[pullTest()];
  if(sk.mu||g==="mu"){out.push(T("expl","reps",["Explosive chest-to-bar pull-ups"]));out.push(T("mu","reps",["Clean muscle-ups"]));}
  if(sk.hs||g==="hs"){out.push(T("hsw","s",["Chest-to-wall handstand"]));out.push(T("hsf","s",["Freestanding handstand"]));}
  if(sk.ls||g==="ls"){out.push(lsKey()==="lsit"?T("lsit","s",["Straight-leg L-sit hold"]):T("tuck","s",["Tuck L-sit hold"]));}
  if(g==="dips")out.push(T("dips","reps",["Dips"]));if(g==="push")out.push(T("push","reps",["Push-ups"]));
  var lb=lbTest();if(lb)out.push(lb);return out;}
function lbTest(){var e=emph();if(e!=="lower"&&e!=="glutes")return null;var key=(ANCH[e].KC||[])[0],src=(e==="lower"?GLUTES():GLUTEX()).filter(function(it){return it.k===key;})[0];if(!src)return null;
  var v=curVar(src,LOC());if(v<0)return null;var o=src.opts[v],st=D.ex[src.k+"#"+v],w=o.w&&st?st.w:0;
  return {test:"lb",tvo:1,unit:"reps",lw:w,opts:[{n:o.n,req:o.req,w:false}],c:"Max clean reps"+(w?" with your working weight "+fmtKg(w)+" kg":" at your working weight")+". Stop when the form breaks."};}
function lastTv(k){for(var i=D.logs.length-1;i>=0;i--){var l=D.logs[i];if(l.tv&&l.tv[k]!=null)return l.tv[k];}return null;}
/* A-033 (M-5): blocks 2–4 of the Skill Trial follow skills and level. Lever, planche and dragon-flag work only with the front
   lever / planche skill (the back lever goes with the front lever); without any skill the trial brings the "Pull & push"
   circuit plus one core block; at level 0 every item starts with its easy variant (it.lv). */
function trialBlocks(L){var sk=D.skills,fl=!!sk.fl,pl=!!sk.pl,any=["hs","mu","ls","fl","pl"].some(function(k){return sk[k];});
  function ez(it){it.lv=[1,0];return it;}
  function core(cue){return ez(F("5",cue,fl?["Negative Dragon Flags","Lying leg lowers (easier)"]:["Lying leg lowers","Bent-knee leg lowers (easier)"]));}
  if(!any)return [{name:"Core",info:"60 s rest between exercises",p:1,rest:60,items:[ez(F("3 × 30 s","Lower back on the floor, ribs down",["Hollow body hold","Dead bug (easier)"])),ez(F("3 × 8 each side","Straight line from head to heels",["Side plank","Side plank on knees (easier)"])),ez(F("3 × 10","5 s lowering, lower back stays down",["Lying leg lowers","Bent-knee leg lowers (easier)"]))]}];
  var b2=[ez(FL(F("30","",["Push-Ups","Knee push-ups (easier)"]),"push",3)),core("5 s lowering")],b3=[FL(F("30","",["Bodyweight Rows","Cable row"]),"pull",3),core("")],b4=[ez(FL(F("30","",["Jumping Squats","Bodyweight squats (easier)"]),"legs",3)),core("")];
  b2.unshift(fl?ez(F("60 s accumulated","",["Tuck Front Lever","Straight-arm pulldown hold"])):F("60 s accumulated","Arms straight, pull the bar to the thighs and hold",["Straight-arm pulldown hold","Band straight-arm pulldown hold|b"]));
  b3.unshift(pl?ez(F("60 s accumulated","",["Tuck planche on parallettes","Planche lean (easier)"])):ez(F("60 s accumulated","Lower back on the floor, ribs down",["Hollow body hold","Dead bug (easier)"])));
  b4.unshift(fl?ez(F("60 s accumulated","",["Tuck Back Lever","Reverse hyperextension hold"])):F("60 s accumulated","",["Reverse hyperextension hold","Superman hold"]));
  return [{name:"Block 2",info:"60 s rest between exercises",p:1,rest:60,items:b2},{name:"Block 3",info:"60 s rest",p:2,rest:60,items:b3},{name:"Block 4",info:"60 s rest",p:2,rest:60,jump:1,items:b4}];}
/* A-033 (M-6 and the kick rule): a Skill Trial the day after a hard other activity carries only the emphasis anchor with 2
   sets; after a hard other activity and the day before kickboxing (also the 16-day fallback) it has no jump block, and on the
   day before kickboxing every Romanian deadlift has at most 2 sets. */
function trialDay(s,c){var oa=hist(TODAY).oaY,kt=isKick(addD(TODAY,1));if(!oa&&!kt)return;
  /* the jump block loses its jumps (its hold and core work stay, so the trial keeps its time) */
  if(oa||kt)s.blocks.forEach(function(b){if(b.jump){b.items=b.items.filter(function(it){return it.fp!=="legs";});b.jump=0;b.nojump=1;}});
  if(oa)s.blocks.forEach(function(b){if(!b.lowb)return;var a=b.items.filter(function(it){return it.anc;});if(a.length)b.items=a.slice(0,1);b.items.forEach(function(it){it.ts=2;});b.more=[];b.oa=1;});
  if(kt)s.blocks.forEach(function(b){if(b.warm||b.cool)return;b.items.forEach(function(it){var v=curVar(it,LOC());if(v>=0&&it.k&&/romanian deadlift/i.test(it.opts[v].n)){var n=setsOf(it,b,c,"CH");if(n>2)it.ts=2;}});});}
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
  case "KC": return {goal:D.kickDays.length?"Legs for running and kicks, plus slow upper-body strength endurance and kickboxing power.":"Legs and full body, plus slow upper-body strength endurance and power.",blocks:[WARM(),HSB(true),
    {name:"Legs",info:"Exercises back to back · 90 s rest",p:1,rest:90,rounds:[3,4],items:[
      P("c_sq",6,10,"reps","",["Barbell back squat||w","Dumbbell Bulgarian split squat||w","Leg press||w","Assisted pistol squat"],"more weight","",[2,0]),
      P("c_rdl",8,12,"reps","Hips back, back straight",["Romanian deadlift||w","Leg curl machine||w","Nordic Curls"],"more weight"),
      P("c_lu",8,12,"each side",D.kickDays.length?"Explosive for kicks":"Explosive, land softly",["Dumbbell walking lunges||w","Box Jumps","Switching Lunges"],"more weight"),
      P("c_calf",12,15,"reps","",["Standing calf raises||w","Single-leg calf raises on a step"],"more weight")]},
    {name:"Running prehab",info:"2 sets · 45 s rest",p:2,rest:45,items:[
      P("c_gm",12,20,"each side","Hip abductors: stabilise the knee when running",["Abductor machine||w","Lateral band walks|b","Side-lying leg raises"],"stronger band or add weight","2"),
      P("c_tib",15,25,"reps","Shin muscle: back against a wall, pull the toes up",["Wall tibialis raises","Weighted tibialis raises||w"],"heels further from the wall","2")]},
    {name:"Upper body, slow",info:"Tempo 4-1-2-1 · 90 s rest",p:2,rest:90,rounds:[3,3],items:[
      P("c_pu",8,12,"reps","Hold 5 s at the top",["Pull-ups + hold at the top","Weighted pull-ups||w","Lat pulldown with holds||w","Band-assisted pull-ups|b"],"add weight","",[3,1]),
      P("c_dip",8,15,"reps","",["Dips","Weighted dips||w","Negative parallel bar dips|p"],"add weight","",[2,1]),
      P("c_rf",8,12,"reps","Anti-hunchback",["Reverse Butterfly||w","Dumbbell reverse flyes||w","Ring reverse flyes|r"],"more weight")]},
    KPOW()]};
  case "CH": b={goal:"A check-in every two weeks: test what you train for, then practise. Values you enter become your new status.",blocks:[WARM(),
    {name:"Trial",info:"2–3 min rest between tests · only clean reps count",p:1,rest:150,trial:1,items:trialItems()},
    {name:"Muscle-Up EMOM",info:"2 attempts every minute for 10 minutes",p:1,rest:0,items:[FL(F("10 × 2",L===0?"Basic: 2 negative pull-ups each":"Sloppy? Switch to transitions",L===0?["Negative pull-ups"]:["Explosive chest-to-bar pull-ups","Transition on a Smith machine","Strict muscle-ups (high bar)","Ring muscle-up with foot assist"]),"pull",2)]},
    ].concat(trialBlocks(L))};
    if(!D.skills.mu)b.blocks.splice(2,0,{name:"Pull & push",info:"Exercises back to back · 60 s rest after the round",p:1,rest:60,rounds:[3,3],items:[
      P("ch_row",8,12,"reps","Chest to the bar, shoulders down",["Bodyweight Rows","Cable row||w","Band rows|b","Inverted rows under a table|s"],"feet higher or more weight","",[0,0]),
      P("ch_push",6,15,"reps","Body in one line",["Push-ups","Knee push-ups","Incline push-ups on a chair|s"],"harder variation","",[1,0])]});
    if(D.skills.fl)b.blocks.splice(2,0,FLB(false,1));
    /* A-024: the trial takes a Strength A/B slot, so without a lower/glute emphasis it always brings the compact leg block
       (it keeps the leg contact that slot would have had). */
    var lowT=emph()==="lower"||emph()==="glutes";
    if((lf||!lowT)&&!painU("leg")) b.blocks.push(LEGMINI(lf?c.legWhy:"ch"));
    return b;
  case "SK": return {goal:"Calm technique session. Everything clean, nothing to failure.",blocks:[WARM(),HSB(true),
    {name:"L-sit & grip",info:"10 min",p:1,rest:60,items:[LSIT(),F("3 × 20–30 s","",["False grip hang","Active Hang"]),P("s_hang",30,60,"s","Shoulders active",["Active Hang"],"start single-arm","2")]},
    SHOULDER(2,true)]};
  case "RS": return {goal:D.kickDays.length?"Active recovery. Costs little energy and gives higher kicks.":"Active recovery. Costs little energy and keeps hips and legs mobile.",blocks:[KM_ACT()]};
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
  case "HK": return {goal:"Technique at home: your skills, support and shoulders.",blocks:[WARM(),
    {name:"Handstand",info:"15 min",p:1,rest:60,items:[
      F("3 × 3","",["Wall Walks|w","Pike Walk-Ins"]),
      I("hsw","Shoulders to the ears",["Chest-to-wall hold|w","Pike handstand, feet on a chair|s","Pike handstand, feet on the floor"]),
      F("3 × 8","",["Wall handstand shrugs|w","Pike shrugs"]),
      F("5 × 15 s","",["Frogstand / Crow"])]},
    {name:"L-sit & support",info:"10 min",p:1,rest:60,items:[LSIT(),P("hk_pl",15,40,"s","Lean the shoulders in front of the hands",["Planche Lean"],"lean further forward","3"),P("sh_sa",8,12,"reps","",["Scapula Push-Ups Plus"],"slower","2")]}]};
  /* A-043: deload and test come in 3 versions in turn (blkNo % 3), same dose and purpose */
  case "DL": var dv=c.blk?(c.blk-1)%3:rotSet();return {goal:"Deload week: train light so the test is honest. Nothing to the limit.",dv:dv,blocks:[WARM()].concat([
    [{name:"Resistance Deload",info:"3 rounds, all easy · 60–90 s rest",p:1,rest:75,items:[F("6–10","",["Chin-Ups","Underhand lat pulldown","Band-assisted pull-ups"]),F("8–15","",["Dips","Straight bar dips on a Smith machine","Band-assisted dips"]),F("5–10","",["Bodyweight Rows","Cable row"]),F("5 each side","",["Bulgarian Split Squat"]),F("15/15/15 s","",["Slow Push-Up"]),F("15 s","",["L-Sit","Tuck L-Sit"])]},
     {name:"Easy handstand",info:"",p:2,rest:60,items:[F("3 × 15 s","",["Chest-to-wall hold","Pike handstand"])]}],
    [{name:"Easy full body",info:"3 rounds, all easy · 60–90 s rest",p:1,rest:75,items:[F("6–10","",["Neutral-grip pull-ups","Neutral-grip lat pulldown","Band-assisted pull-ups"]),F("8–12","",["Push-ups, slow","Knee push-ups"]),F("8–12","",["Chest-supported dumbbell row","Bodyweight Rows"]),F("6 each side","",["Reverse lunges, slow lowering"]),F("12","",["Glute bridge, 1 s squeeze"]),F("20 s","",["Hollow Body Hold","Dead bug"])]},
     {name:"Easy mobility",info:"",p:2,rest:30,items:[F("2 × 30 s","",["Deep squat hold"]),F("5 each side","",["World's greatest stretch"])]}],
    [{name:"Light circuit",info:"3 rounds, all easy · 60–90 s rest",p:1,rest:75,items:[F("5–8","",["Scapula pull-ups","Band lat pulldown"]),F("6–10","",["Bench dips, feet on the floor","Band-assisted dips"]),F("8–12","",["Inverted rows under a table","Cable row"]),F("6 each side","",["Step-ups, slow"]),F("8 each side","",["Bird dog with a 3 s hold"]),F("20 s each side","",["Side plank on the forearm, feet staggered"])]},
     {name:"Easy balance",info:"",p:2,rest:30,items:[F("3 × 20 s","",["Single-leg stand, eyes closed"])]}]][dv])};
  case "TE": var tv=c.blk?(c.blk-1)%3:rotSet(),TT={pull:T("pull","reps",["Clean pull-ups"]),dips:T("dips","reps",["Dips"]),expl:T("expl","reps",["Explosive chest-to-bar pull-ups"]),mu:T("mu","reps",["Clean muscle-ups"]),
      tuck:T("tuck","s",["Tuck L-sit hold"]),lsit:T("lsit","s",["Straight-leg L-sit hold"]),hsw:T("hsw","s",["Chest-to-wall handstand"]),hsf:T("hsf","s",["Freestanding handstand"]),pike:T("pike","reps",["Pike Push-Ups"]),hang:T("hang","s",["Active Hang"])},
      TO=[["pull","dips","expl","mu","tuck","lsit","hsw","hsf","pike","hang"],["hsw","hsf","tuck","lsit","pull","expl","mu","dips","pike","hang"],["dips","pike","pull","expl","mu","tuck","lsit","hsw","hsf","hang"]][tv],
      TF=[null,{name:"Flush",info:"Easy, nose breathing",p:2,rest:0,items:[F("5 min","",["Easy cycling","Easy rowing"])]},{name:"Flush",info:"Easy, nose breathing",p:2,rest:0,items:[F("5 min","",["Easy walk"])]}][tv];
    return {goal:"Test all values. What you enter becomes your new status right away.",tv:tv,blocks:[WARM(),
    {name:"Test",info:["2–3 min rest between tests · only clean reps count","Skills first while fresh · 2–3 min rest between tests · only clean reps count","Pushing first · 2–3 min rest between tests · only clean reps count"][tv],p:1,rest:150,items:TO.map(function(q){return TT[q];})}].concat(TF?[TF]:[])};
  }
}
var ABS=[
 {n:"Anti-Extension",items:[F("20 s","Low back stays on the floor",["Hollow Rocks","Hollow Body Hold","Fast dead bugs"]),F("20 s","Glutes tight, do not sag",["Plank with shoulder taps","Body Saw","Slow mountain climbers","Ab Wheel Rollouts|g"])]},
 {n:"Compression",items:[F("20 s","Raise the straight legs, hands next to the knees",["Seated Pike Compressions","Tuck-Ups"]),F("20 s","No swinging",["Lying leg raises","V-Ups","Hanging Knee Raises|k"])]},
 {n:"Rotation (kickboxing)",items:[F("20 s","The ribcage rotates, not just the arms",["Russian Twists","Weighted Russian twists|d"]),F("20 s","Elbow to opposite knee, extend fully",["Bicycle Crunches","Windshield wipers, knees bent","Side plank dips, switch sides each round"])]},
 {n:"Posterior chain",items:[F("20 s","Arms and legs long, eyes to the floor",["Arch Body Rocks","Superman pulses","Swimmers"]),F("20 s","Hips up, pelvis still",["Glute bridge march","Fast bird dogs","Reverse Hyperextension|g"])]}
];

/* ================= Vorgaben aus den letzten Einträgen ================= */
/* P-5 progression: weight steps of about 5 % (at least 0.5 kg, rounded to 0.5 / 1 / 2.5 kg by load), three logs without
   progress (stall) take 10 % off the weight or 2 reps off and build up again, the top of a bodyweight range offers the next
   variation in one tap. The pause is measured per movement pattern (patLast). */
function kgUnit(w){return w<20?0.5:(w<50?1:2.5);}
function kgStep(w){var u=kgUnit(w);return Math.max(u,Math.round(Math.max(0.5,w*0.05)/u)*u);}
function kgRnd(x,w){var u=kgUnit(w);return Math.max(0,Math.round(x/u)*u);}
/* Only where the option list is a known progression: stage lists ("next stage") run upward, items with start variants
   (lv = [base, advanced]) run toward the advanced one. Gym-only weighted options and easier forms are never "next". */
var EASYV=/assist|negative|knee|incline|easier|between (two )?chairs|bench dips|wall push/i;
/* ===== A-039 step ladder (L2). Options stay in their stored order (variant indices are saved data); ORD lists the
   bodyweight forms of an item from easy to hard, so "Next variation" also works where the list mixes equipment.
   After the variations, every bodyweight progression gets fixed rungs (D.ex[key].lad 0–5): slow lowering 3 s, 5 s, a 2 s
   pause at the hardest point, 15 s less rest between sets, then a load (vest, backpack, plate) with normal weight steps.
   Holds in seconds skip the tempo rungs. A rung is offered after the top of the range twice in a row; the range starts
   again at the bottom. Source: [Q52] (repetitions, tempo and rest are valid overload where load is not possible). */
var ORD={x_sp:[2,1,0],x_lr:[2,1,0],x_aw:[2,1,0],x_be:[2,1,0],g_45:[2,1,0],h_dip:[2,0,1],a2_ww:[2,0,1],h_sq:[0,2,3],g_bss:[2,1,0],g_su:[2,1],
  c_calf:[0,1],h_ham:[0,2],g_ht:[2,3],h_pike:[1,0],c_lu:[2,0],ch_row:[3,0],a2_row:[0],u_row:[3],h_pull:[2,0],b_pu:[3,2],b2_dp:[2],g_fp:[2,1],x_db:[1,0],
  /* A-043 rotation sets: bodyweight forms easy → hard */
  r_lu1:[1,2],r_lu2:[1,2],r_bs1:[1,2],r_bs2:[1],r_su1:[1,2],r_su2:[1,2],r_rd1:[1,2],r_rd2:[2],r_kb1:[2],r_kb2:[2],r_fp1:[1,2],r_fp2:[1,2],r_45a:[1,2],r_45b:[2,1],
  r_ca1:[2,1],r_ca2:[1,2],r_gm1:[2],r_gm2:[2,1],r_db1:[1,2],r_db2:[1,2],r_pa1:[2],r_pa2:[1,2],r_sp1:[1,2],r_sp2:[1,2],r_lr1:[2,1],r_lr2:[1,2],r_aw1:[1,2],r_aw2:[1,2],r_ur1:[2],r_ur2:[2]};
var LADN=["","Slow lowering, 3 s","Slow lowering, 5 s","2 s pause at the hardest point","15 s less rest between sets","Add a load (vest, backpack or plate)"];
var LADC=["","Lower for 3 s on every rep.","Lower for 5 s on every rep.","Hold 2 s at the hardest point of every rep.","Rest 15 s less between sets than the block says.","Add a light load: about 2.5–5 kg to start, then the weight goes up."];
var LADMAX=5;
function ladOf(it,v){var st=it&&it.k&&D.ex[it.k+"#"+v];return st&&st.lad?st.lad:0;}
/* weight entry: the option has one, or the load rung of the ladder is reached */
function wOn(it,v){return !!(it.opts[v]&&it.opts[v].w)||(!it.f&&!it.iso&&!it.test&&ladOf(it,v)>=LADMAX);}
function ladNext(it,v){var l=ladOf(it,v),isS=it.unit.indexOf("s")===0;if(l>=LADMAX)return 0;var n=l+1;if(isS&&n<4)n=4;return n;}
/* top of the range twice in a row: the stored weakest set now and the previous log of the same variant */
/* one tap: the next rung, the range starts at the bottom (shown as "New step" until the next log) */
function ladTake(it,v){if(!it||!it.k)return false;var e=D.ex[it.k+"#"+v],nl=e&&ladNext(it,v);if(!nl)return false;e.lad=nl;e.r=it.lo;e.hold=true;e.stall=0;return true;}
function topTwice(it,v){var K=it.k+"#"+v,st=D.ex[K];if(!st||st.r<it.hi)return false;var L=D.logs,n=0;
  for(var i=L.length-1,i0=Math.max(0,L.length-400);i>=i0;i--){var l=L[i];if(l.bl||!l.ex||!own(l.ex,K))continue;var x=l.exs&&own(l.exs,K)?Math.min.apply(null,l.exs[K]):l.ex[K][0];if(x>=it.hi)n++;else break;if(n>=2)return true;}
  return false;}
function nextVar(it,v,loc){if(it.kx||it.fx||it.test||it.iso||it.f)return -1;
  if(own(ORD,it.k)&&!/next stage/.test(it.up||"")&&!(it.lv&&it.lv[0]!==it.lv[1])){var od=ORD[it.k],p=od.indexOf(v),a0=avail(it,loc);if(p<0)return -1;
    for(var q=p+1;q<od.length;q++)if(a0.indexOf(od[q])>=0)return od[q];return -1;}
  var dir=/next stage/.test(it.up||"")?1:(it.lv&&it.lv[0]!==it.lv[1]?(it.lv[1]>it.lv[0]?1:-1):0);if(!dir)return -1;var a=avail(it,loc);
  /* A-037: a stage ladder ends at its highest stage ("Full …"); nothing after it is offered as the next step. */
  var top=-1;it.opts.forEach(function(o,i){if(top<0&&/^Full /i.test(o.n))top=i;});if(top>=0&&dir>0&&v>=top)return -1;
  for(var j=v+dir;j>=0&&j<it.opts.length&&!(top>=0&&dir>0&&j>top);j+=dir){var o=it.opts[j];if(a.indexOf(j)>=0&&o.req.indexOf("g")<0&&!EASYV.test(o.n))return j;}return -1;}
/* A-037 pause rule by rhythm (L1): the gap of an exercise is measured against the usual rhythm of its movement pattern
   (patKey), the median of its last 4 gaps. One step back only at ≥ 14 days and ≥ 1.5 × the rhythm, two steps at > 28 days
   and ≥ 2 × the rhythm; never twice in a row unless the stepped-back target was reached in between; never under the lower
   end of the range (unless the last value already was). With fewer than 2 known gaps the old rule holds (14 / 28 days).
   Paused days (P-7) count for no gap. Dates per pattern come from the logs (l.ex keys), the kit days (kitD) and D.ex;
   computed once per day and number of entries (RHC). No new data fields. */
var RHC={k:"",L:null,m:null},RHN=40,VPK={pull:1,push:1,legs:1,hinge:1,core:1};
function patDates(p){var L=D.logs,ln=L.length,ky=ln+"|"+(ln?L[ln-1].d:"")+"|"+(D.pause?D.pause.from+D.pause.to:"")+"|"+(D.pauseH||[]).length+"|"+Object.keys(D.kitD||{}).length;
  if(RHC.k!==ky||RHC.L!==L||RHC.D!==D||RHC.last!==L[ln-1]){var lm,i0=0,dp=0;if(grown(RHC,L)&&RHC.dp<8){lm=Object.create(RHC.lm);dp=RHC.dp+1;i0=RHC.n;}else lm={};
    /* A-051: per key (patKey), per pattern group ("@pull" …, from the logged keys and from l.vs, so the Core Blitz, holds and
       loaded fixed items count) and "@all"; each a short ascending list of the newest dates (copied on growth, never shared). */
    var put=function(pk,d){var a=lm[pk];if(!a){a=lm[pk]=[];}else if(i0&&!own(lm,pk)){a=lm[pk]=a.slice(-RHN);}if(a[a.length-1]!==d){a.push(d);if(a.length>2*RHN)lm[pk]=a.slice(-RHN);}};
    /* the entry that was newest last time is read again: saveTrain adds its l.vs after the entry is stored */
    for(var j=i0?i0-1:0;j<ln;j++){var l=L[j],ex=l.ex,vs=l.vs,any=0;if(ex)for(var q in ex){var i=q.indexOf("#");if(i>0){var k0=q.slice(0,i),g=patGrp(k0);put(patKey(k0),l.d);if(g!=="@all")put(g,l.d);any=1;}}
      if(vs&&typeof vs==="object")for(var pp in vs)if(own(vs,pp)&&vs[pp]>0&&own(VPK,pp)){put("@"+pp,l.d);any=1;}if(any)put("@all",l.d);}
    RHC={k:ky,L:L,D:D,lm:lm,n:ln,last:L[ln-1],m:{},dp:dp};}
  /* Per pattern: the newest dates of the logs plus kitD and D.ex, sorted once per state. */
  var r=RHC.m[p];if(r)return r;var m={},a=RHC.lm[p];if(a)for(var x0=Math.max(0,a.length-RHN);x0<a.length;x0++)m[a[x0]]=1;var kd=D.kitD||{};for(var x in kd)if(own(kd,x)&&typeof kd[x]==="string"&&grpHas(p,x))m[kd[x]]=1;
  for(var q in D.ex){var e=D.ex[q],i=q.indexOf("#");if(e&&e.d&&i>0&&grpHas(p,q.slice(0,i)))m[e.d]=1;}
  return RHC.m[p]=Object.keys(m).sort();}
/* A-051: deload and test weeks (cycle week 6) count for no gap, like paused days. */
var DLW={m:{}};
function dlDay(d){if(!D.start||d<D.start)return false;var w=Math.floor(diff(D.start,d)/7),L=D.logs,ln=L.length,e=D.easy||"";
  /* past weeks keep their answer while entries are only appended after them (week preview, a new log) */
  if(DLW.D!==D||DLW.st!==D.start||DLW.e!==e||DLW.L!==L)DLW={D:D,st:D.start,e:e,L:L,n:ln,last:L[ln-1],m:{}};
  else if(DLW.n!==ln||DLW.last!==L[ln-1]){if(grown(DLW,L)){var w0=Math.floor(diff(D.start,L[DLW.n].d)/7);for(var q in DLW.m)if(+q>=w0)delete DLW.m[q];}else DLW.m={};DLW.n=ln;DLW.last=L[ln-1];}
  var r=DLW.m[w];if(r===undefined)r=DLW.m[w]=(cycWk(d).ef-1)%6===5;return r;}
/* newest logged date of a pattern group up to t (logged keys and l.vs; kitD and D.ex come live through patLast) */
function grpLogLast(p,t){patDates(p);var a=RHC.lm[p];if(!a||!a.length)return "";var i=lbIdx(a,addD(t,1))-1;return i>=0?a[i]:"";}
function gapDays(a,z){var n=diff(a,z),o=0;if(n<=0)return 0;var p=D.pause||(D.pauseH&&D.pauseH.length);for(var d=a,i=0;d<z&&i<400;d=addD(d,1),i++)if(dlDay(d)||(p&&pausedDay(d)))o++;return Math.max(0,n-o);}
/* Usual rhythm of a pattern up to date d (median of the last 4 gaps up to d), null with fewer than 2 gaps. */
function rhythm(p,d){var a=patDates(p),g=[],e=lbIdx(a,d);if(e<a.length&&a[e]===d)e++;for(var i=e-1;i>0&&g.length<4;i--)g.push(gapDays(a[i-1],a[i]));
  if(g.length<2)return null;g.sort(function(x,y){return x-y;});var n=g.length;return n%2?g[(n-1)/2]:(g[n/2-1]+g[n/2])/2;}
function backSteps(gap,rh){if(rh==null)return gap>=14?(gap>28?2:1):0;return gap>28&&gap>=2*rh?2:(gap>=14&&gap>=1.5*rh?1:0);}
/* Was the last session of this variant itself a step back whose target was not reached? Then no second step back. */
function backTwice(it,v,step){var K=it.k+"#"+v,p=patGrp(it.k),h=[];D.logs.forEach(function(l){if(l.ex&&l.ex[K]&&l.d<TODAY)h.push([l.d,l.ex[K]]);});
  if(!h.length)return false;var last=h[h.length-1],dl=last[0],a=patDates(p),ai=lbIdx(a,dl);if(!ai)return false;
  var pg=a[ai-1],bl=backSteps(gapDays(pg,dl),rhythm(p,pg));if(!bl)return false;var prev=h.length>1?h[h.length-2][1]:null;if(!prev)return false;
  var rT=Math.max(Math.min(it.lo,prev[0]),Math.min(it.hi,prev[0])-bl*step),wT=prev[1]?kgRnd(prev[1]-bl*kgStep(prev[1]),prev[1]):0;
  return !(last[1][0]>=rT&&(last[1][1]||0)>=wT);}
function target(it,v){
  var o=it.opts[v], st=D.ex[it.k+"#"+v], isS=it.unit.indexOf("s")===0, step=isS?(it.hi-it.lo>=20?5:2):1, w=null, ow=wOn(it,v);
  if(!st) return {r:it.lo,w:null,note:"",first:true};
  var g=target0(it,v,o,st,isS,step,ow),lad=st.lad||0;if(lad){g.ladC=LADC[lad];if(lad>=LADMAX)g.wl=true;}
  if(g.top&&!ow&&!holdOn("str")&&nextVar(it,v,LOC())<0&&topTwice(it,v)){var nl=ladNext(it,v);if(nl){g.lad=nl;g.note="Top of the range twice: next step “"+LADN[nl]+"”.";}}
  return g;}
function target0(it,v,o,st,isS,step,ow){var w=null;
  w=st.w||null; var gp=patGrp(it.k), p0=patLast(it.k,st.d), pl=grpLogLast(gp,TODAY);if(pl>p0)p0=pl;var gap=gapDays(p0,TODAY), inc=w?kgStep(w):0, rh=rhythm(gp,p0), back=backSteps(gap,rh);
  if(back&&backTwice(it,v,step)) back=0;
  /* A-051: the exercise rested (rotation, phase change) while its pattern kept training: no weight step back, at most one rep
     less for getting used to the technique again. Only a real pause of the whole pattern steps back (below). */
  var gk=0;if(!back){var k0=patLast(it.k,st.d,1);gk=gapDays(k0,TODAY);if(!(gk>28&&backSteps(gk,rhythm(patKey(it.k),k0))))gk=0;}
  /* A-043: a rotation set that returns after a block pause steps back once, never twice (L5) */
  if(back>1&&it.rot) back=1;
  if(back){var fl=Math.max(1,Math.min(it.lo,st.r)), r0=Math.max(fl,Math.min(it.hi,st.r)-back*step), w0=(ow&&w)?kgRnd(w-back*inc,w):w;
    return {r:r0,w:w0,back:back,note:"Last entry "+gap+" days"+(rh?" (usual rhythm about "+Math.round(rh)+" days)":"")+": "+(back===2?"two steps":"one step")+" back."};}
  if(cbInfo(TODAY).low) return {r:Math.min(it.hi,Math.max(st.r,1)),w:w,note:"Comeback after a break: same target as last time, no step up yet."};
  if(st.hold&&st.lad&&st.r===it.lo) return {r:it.lo,w:w,note:"New step: "+LADN[st.lad]+". Start at the bottom of the range."};
  if(st.hold) return {r:Math.min(it.hi,Math.max(st.r,1)),w:w,note:"At the limit last time: same target."};
  if((st.stall||0)>=3&&!holdOn("str")){
    if(ow&&w){var w1=kgRnd(w*0.9,w);if(w1>=w)w1=kgRnd(w-kgUnit(w),w);
      return {r:Math.min(it.hi,Math.max(st.r,it.lo)),w:w1,note:"Three times without progress: 10 % lighter, then build back up.",low:true,reset:true};}
    var rr=Math.max(Math.max(1,Math.min(it.lo,st.r)),Math.min(it.hi,st.r)-2*step),dd=Math.min(it.hi,st.r)-rr;
    return {r:rr,w:w,note:"Three times without progress: "+(dd>0?dd+" "+(isS?"s":"reps")+" fewer":"hold at the bottom of the range")+", then build back up.",low:true,reset:true};}
  /* A-051: return after a rest of the exercise (rotation, phase change, > 28 days) while the pattern trained: at most one rep
     less, weight holds (a new block range that moved its bottom above the last value aims for its bottom, below). */
  if(gk&&!(ow&&w&&st.r<it.lo)){var flr=Math.max(1,Math.min(it.lo,st.r)),rb=Math.max(flr,Math.min(it.hi,st.r)-(isS?step:1));
    return {r:rb,w:w,ret:true,note:"Back after "+gk+" days (the movement pattern kept training): "+(rb<Math.min(it.hi,st.r)?"one "+(isS?"step":"rep")+" less":"same target")+(ow&&w?", same weight":"")+"."};}
  if(st.r>=it.hi){ if(ow&&w) return {r:it.lo,w:w+inc,note:"Last time "+st.r+" at "+fmtKg(w)+" kg: weight up.",top:true};
    return {r:it.hi,w:w,note:"Top of the range reached"+(it.up?". Next step: "+it.up:"")+". If it stays easy, "+(nextVar(it,v,LOC())>=0?"take the next variation.":"swap the variation."),top:true}; }
  /* A-051 (N-12): the block's range moved its bottom above a value that was inside the normal range: no failure, the weight
     holds and the target is the new bottom. */
  if(st.r<it.lo&&ow&&w&&it.lo0!=null&&st.r>=it.lo0) return {r:it.lo,w:w,rng:true,note:"New range this block ("+it.lo+"–"+it.hi+"): same weight, aim for "+it.lo+"."};
  if(st.r<it.lo){ if(ow&&w) return {r:it.lo,w:kgRnd(w-inc,w),note:"Last time only "+st.r+": weight down.",low:true};
    return {r:Math.max(1,st.r+1),w:w,note:"Below the range. Easier variation or band via “Swap” until "+it.lo+" are clean.",low:true}; }
  return {r:Math.min(it.hi,st.r+step),w:w,note:"Last time "+st.r+(ow&&w?" at "+fmtKg(w)+" kg":"")+"."};
}
function setsOf(it,b,c,id){ if(b&&b.rounds){var r=rounds(b,c,id);return b.lowb&&it.ts!=null?Math.min(it.ts,r):r;} var n=parseInt(String(it.sets),10); if(it.ts!=null) return it.ts; return isNaN(n)?1:n; }

/* ================= Empfehlung ================= */
/* A-038: entries per date, indexed once per state and number of entries (ODC). */
var ODC={k:"",D:null,L:null,m:null};
/* Shared rule for the history caches: when the same list only got new entries at its end (the week preview and a new log
   append the newest entry), only those are added; anything else rebuilds. */
function grown(C,L){return C.L===L&&C.D===D&&C.n>0&&L.length>C.n&&L[C.n-1]===C.last;}
function onDay(s){var L=D.logs,ln=L.length,ky=ln+"|"+(ln?L[ln-1].d+L[ln-1].id:"");
  if(ODC.k!==ky||ODC.D!==D||ODC.L!==L||ODC.last!==L[ln-1]){var m,i0=0;var dp=0;if(grown(ODC,L)&&ODC.dp<8){m=Object.create(ODC.m);dp=ODC.dp+1;i0=ODC.n;}else m={};
    for(var i=i0;i<ln;i++){var l=L[i];if(i0)m[l.d]=(m[l.d]||[]).concat([l]);else (m[l.d]=m[l.d]||[]).push(l);}ODC={k:ky,D:D,L:L,m:m,n:ln,last:L[ln-1],dp:dp};}
  var a=ODC.m[s];return a?a.slice():[];}
function since(id,s){var b="";D.logs.forEach(function(l){if(l.id===id&&l.d<s&&l.d>b)b=l.d;});return b?diff(b,s):Infinity;}
function isTrain(l){return l.id!=="MO"&&l.id!=="OA";}
/* Training weeks from D.start (weeks without training do not count). "Easy week now" (P-4, D.easy = start of that week)
   shifts the count so that week becomes the deload week (part 6); later cycles follow from there. */
/* A-038: the weeks with training are collected once per state, day and number of entries (CWC, like cbInfo), and every
   result is kept per date; before, every call went through all weeks × all entries. */
var CWC={k:"",D:null,L:null,tw:null,r:null};
function cycWk(s){var L=D.logs,ln=L.length,ky=D.start+"|"+(D.easy||"")+"|"+ln+"|"+(ln?L[ln-1].d+L[ln-1].id:"");
  if(CWC.k!==ky||CWC.D!==D||CWC.L!==L||CWC.last!==L[ln-1]){var tw,i0=0;var dp=0;if(grown(CWC,L)&&CWC.st===D.start&&CWC.dp<8){tw=Object.create(CWC.tw);dp=CWC.dp+1;i0=CWC.n;}else tw={};
    for(var i=i0;i<ln;i++){var l=L[i];if(isTrain(l)&&l.d>=D.start)tw[Math.floor(diff(D.start,l.d)/7)]=1;}CWC={k:ky,D:D,L:L,tw:tw,r:{},n:ln,last:L[ln-1],st:D.start,dp:dp};}
  var hit=CWC.r[s];if(hit)return {wk:hit.wk,ef:hit.ef};
  var n=Math.floor(Math.max(0,diff(D.start,s))/7),wk=0,sh=0,e=D.easy&&D.easy>=D.start?Math.floor(diff(D.start,D.easy)/7):-1;
  for(var w=0;w<=n;w++){if(w===n||CWC.tw[w])wk++;if(w===e)sh=(6-wk%6)%6;}
  var r={wk:wk,ef:Math.max(1,wk+sh)};CWC.r[s]=r;return {wk:r.wk,ef:r.ef};}
function ctx(s){
  var cw=cycWk(s),wk=cw.wk,we=cw.ef;
  var h=hist(s);
  var lowE=emph()==="lower"||emph()==="glutes",kcOld=h.KC>7,legB=!lowE&&(kcOld||h.legW<2)&&!painU("leg");
  return {week:wk,cyc:(we-1)%6+1,phase:((we-1)%12)<6?1:2,lowFreq:h.lowFreq,kcGap:Math.min(h.KC,h.CH),legB:legB,legWhy:kcOld?"kc":"week",blk:blkNo(s)+1,acc:accOf(s)};
}
/* A-042 (L4): blocks of 6 training weeks (5 work, 1 deload with test, as before) with four accents in turn: base →
   strength → volume → skill & tempo [Q53] (periodised plans bring more maximal strength, variation of the stimulus is
   essential). The block comes from the training week (cycWk().ef), no new field; the running cycle carries on without a
   break (weeks 1–6 = block 1). An active goal co-decides: a kg/rep goal turns the skill block into a strength block, a
   skill goal turns the volume block into a skill block. The accent changes ranges, sets and rests only, never the
   60–90 min, warm-up or cool-down; deload week and goal taper have no accent. Rests [Q3]: 2–3 min for heavy multi-joint
   sets in strength work, 1–2 min for hypertrophy work. */
var ACCK=["base","str","vol","skill"],ACCN={base:"Base",str:"Strength",vol:"Volume",skill:"Skill"},
    ACCW={templar:["Foundation","Wrath","Endurance","Precision"],sanguine:["Foundation","Fury","Thirst","Grace"],sisters:["Devotion","Zeal","Endurance","Grace"],
      slaanesh:["Prelude","Power","Excess","Finesse"],nurgle:["Rooting","Might","Abundance","Cunning"],plain:["Base","Strength","Volume","Skill"],love:["Basics","Strength","Volume","Skills"]};
function blkNo(s){return Math.floor((cycWk(s).ef-1)/6);}
function accOf(s){var a=ACCK[blkNo(s)%4];if(a==="skill"&&gStr())a="str";else if(a==="vol"&&gSkill())a="skill";return a;}
/* the accent that acts today: none in the deload week of the block and in the goal taper */
function accNow(s){s=s||TODAY;if(ctxCyc(s)>5||gTaper(s))return "base";return accOf(s);}
function accWord(a){var t=ACCW[thKey()]||ACCW.templar;return t[ACCK.indexOf(a)]||"";}
function accLeg(b){return !!b.legs||b.items.some(function(it){var p=itPat(it);return p==="legs"||p==="hinge";});}
function accMain(b){return !b.warm&&!b.cool&&!b.trial&&!b.jump&&!b.add&&!b.skill&&!b.hsb&&!b.acc&&!b.sh&&!b.fav&&!b.rehab&&!b.ser&&(b.p||1)===1;}
function accSide(b){return !b.warm&&!b.cool&&!b.trial&&!b.jump&&!b.add&&!b.skill&&!b.hsb&&!b.fav&&!b.rehab&&!b.ser&&!b.gx&&(b.acc||b.sh||(b.p||1)>1);}
function accRange(it,a){var v=curVar(it,LOC());if(v<0||!wOn(it,v)||it.hi-it.lo<2)return it;var mid=it.lo+Math.floor((it.hi-it.lo)/2),n=Object.assign({},it);
  n.lo0=it.lo;if(a==="str")n.hi=Math.max(it.lo+1,mid);else n.lo=Math.min(it.hi-1,mid);return n;}
function accSets(it,d){if(it.f||it.iso||it.test||it.ts!=null)return it;var n=parseInt(String(it.sets),10);if(isNaN(n)||n<=0)return it;var x=Object.assign({},it);x.sets=Math.max(2,n+d);if(d>0)x.accP=1;return x;}
/* applied in S() after the filters and before design(): design() and the band then keep 60–90 min and the caps */
function accApply(s,id,c){var a=c&&c.acc;if(!a||a==="base"||!BANDIDS[id]||c.cyc>5||gTaper(TODAY))return;s.acc=a;
  s.blocks.forEach(function(b){
    if(a==="str"){
      /* emphasis block: anchor heavier with 3 min rest; the extra anchor set only on Strength C (the leg day stays the
         richest leg session of its week, A-032), companions keep their sets */
      if(b.ser){b.ancR=180;var r0=b.rounds&&b.rounds[0];if(id==="KC"&&b.rounds&&!D.short){b.rounds=[b.rounds[0]+1,b.rounds[1]+1];b.accP=1;}
        b.items=b.items.map(function(it){if(it.anc)return accRange(it,a);if(!b.accP||it.ts!=null)return it;var x=Object.assign({},it);x.ts=r0;return x;});b.info+=" · strength block: anchor heavier with 3 min rest";return;}
      if(b.gx&&!b.skill){b.items=b.items.map(function(it){return accRange(it,a);});return;}
      /* Limited time stays a hard limit (ranges only); the legs + hinge floor ranks above the accent: blocks with leg or
         hinge work keep their sets */
      if(accMain(b)){b.items=b.items.map(function(it){return D.short?accRange(it,a):accSets(accRange(it,a),1);});if(!D.short){if(b.rounds){b.rounds=[b.rounds[0]+1,b.rounds[1]+1];b.accP=1;}if(b.rest)b.rest+=30;b.info+=" · strength block: heavier, 30 s more rest";}return;}
      if(accSide(b)&&!accLeg(b)){b.items=b.items.map(function(it){return accSets(it,-1);});if(b.rounds)b.rounds=[Math.max(2,b.rounds[0]-1),Math.max(2,b.rounds[1]-1)];}
      return;}
    if(a==="vol"){
      if(b.ser){b.ancR=90;b.items=b.items.map(function(it){return it.anc?accRange(it,a):it;});b.info+=" · volume block: anchor in the upper range with 90 s rest";return;}
      if(b.gx&&!b.skill){b.items=b.items.map(function(it){return accRange(it,a);});return;}
      if(accMain(b)||accSide(b)){b.items=b.items.map(function(it){return accRange(it,a);});if(b.rest)b.rest=Math.max(45,b.rest-15);if(accMain(b))b.info+=" · volume block: upper range, 15 s less rest";}
      return;}
    if(a==="skill"&&accMain(b))b.info+=" · skill block: lift fast, lower under control";});}
/* ===== P-8 daily readiness (off by default, D.opt.ready): one tap before training, day().ready 1 good, 2 normal, 3 tired.
   Tired: the low round count, one set fewer per exercise and no extra favourites or emphasis exercises, never under the floors
   (60 min, 2 working sets, legs + hinge ≥ 10, a leg session keeps 6 leg sets). Good: the high round count where every
   pattern of the block has room in the week (bandFit still holds the caps); level 0 is never raised. Off or no tap:
   nothing changes. The log keeps rd for a passive line in the stats. ===== */
var RD2=false;
function rdDay(){if(!D.opt||!D.opt.ready||WK.sim)return 0;if(RD2)return 2;var d=D.days&&D.days[TODAY];var r=d&&d.ready;return r===1||r===2||r===3?r:0;}
/* ===== P-7 pause and comeback =====
   D.pause = {from, to ("" = open), why: "pause"|"ill"} while training is paused (More → Pause training, 1 tap; end date and
   reason optional). It ends with "Resume", with the next training log or after its end date; the paused days go to
   D.pauseH ({f,t}, ≤ 30). Paused days: no recommendation, no streak loss, they do not count for the plateau boost or the
   Skill Trial gap, and paused weeks stay out of the load average. The cycle only counts weeks with training anyway. */
function pauseOn(s){var p=D.pause;return !!(p&&p.from&&s>=p.from&&(!p.to||s<=p.to));}
function pausedDay(d){return pauseOn(d)||(D.pauseH||[]).some(function(x){return d>=x.f&&d<=x.t;});}
function pausedIn(a,z){if(!D.pause&&!(D.pauseH&&D.pauseH.length))return 0;var n=0;for(var d=a;d<z&&n<400;d=addD(d,1))if(pausedDay(d))n++;return n;}
function pauseEnd(day){var p=D.pause;if(!p)return;var t=addD(day,-1);if(p.to&&p.to<t)t=p.to;if(t>=p.from){(D.pauseH=D.pauseH||[]).push({f:p.from,t:t});if(D.pauseH.length>30)D.pauseH.splice(0,D.pauseH.length-30);}D.pause=null;WK.key="";}
function pauseTick(){var p=D.pause;if(p&&p.to&&p.to<TODAY&&!WK.sim)pauseEnd(addD(p.to,1));}
function pauseStart(){if(D.pause)return;D.pause={from:TODAY,to:"",why:"pause"};WK.key="";}
/* Comeback (≥ 10 days without any training, paused or not, after a rhythm of ≥ 3 training days in the 4 weeks before): the first 2 strength sessions (within 14 days) keep the low round count, add no
   extras and no target steps up (targets of exercises not done for 14+ days step back as always); no tests (Skill Trial,
   test day) in the first 7 days and no hard runs in the first 3. These sessions never count towards a stall or the plateau. */
var CBC={};
/* Index of the first element ≥ s in a sorted list (= number of elements < s). */
function lbIdx(a,s){var lo=0,hi=a.length;while(lo<hi){var md=(lo+hi)>>1;if(a[md]<s)lo=md+1;else hi=md;}return lo;}
/* Training days (sorted, distinct), rh[i] = ≥ 3 training days in the 28 days up to ds[i], q = days that end a break of
   ≥ 10 days after a rhythm (cbInfo). */
var TDI={k:"",D:null,L:null};
function trDays(){var L=D.logs,ln=L.length,ky=ln+"|"+(ln?L[ln-1].d+L[ln-1].id:"");
  if(TDI.k===ky&&TDI.D===D&&TDI.L===L&&TDI.last===L[ln-1])return TDI;
  var ds=[],rh=[],q=[],i0=0;if(grown(TDI,L)){var ok=true;for(var j=TDI.n;j<ln;j++)if(isTrain(L[j])&&TDI.ds.length&&L[j].d<TDI.ds[TDI.ds.length-1])ok=false;if(ok){ds=TDI.ds.slice();rh=TDI.rh.slice();q=TDI.q.slice();i0=TDI.n;}}
  if(!i0){var st={};L.forEach(function(l){if(isTrain(l))st[l.d]=1;});ds=Object.keys(st).sort();rh=[];q=[];var from=0;}
  else{var from=ds.length;for(var j2=i0;j2<ln;j2++){var l=L[j2];if(isTrain(l)&&ds[ds.length-1]!==l.d)ds.push(l.d);}}
  for(var i=from;i<ds.length;i++){var n=0;for(var x=i;x>=0&&diff(ds[x],ds[i])<28;x--)n++;rh[i]=n>=3;if(i>0&&diff(ds[i-1],ds[i])>=10&&rh[i-1])q.push(ds[i]);}
  TDI={k:ky,D:D,L:L,ds:ds,rh:rh,q:q,n:ln,last:L[ln-1]};return TDI;}
function cbInfo(s){var lk=D.logs.length+"|"+(D.logs.length?D.logs[D.logs.length-1].d:"")+"|"+(D.pause?1:0)+(D.pauseH||[]).length,k=s+"|"+lk;
  /* A-038: kept per date for the same entries (the week preview asks for several dates in turn). */
  if(CBC.L!==D.logs||CBC.lk!==lk||CBC.last!==D.logs[D.logs.length-1])CBC={L:D.logs,lk:lk,m:{},last:D.logs[D.logs.length-1]};if(CBC.m[s])return CBC.m[s];
  /* A-038: the training days and their qualifying breaks come from a list kept per state (TDI, appended entries are added),
     so a date only needs a binary search; same rules as before. */
  var T=trDays(),ds=T.ds,n=lbIdx(ds,s),R="",gap=0;
  /* A comeback needs a rhythm to come back to: ≥ 3 training days in the 4 weeks before the break. */
  if(n&&diff(ds[n-1],s)>=10&&T.rh[n-1]){R=s;gap=diff(ds[n-1],s);}
  else{var qi=lbIdx(T.q,ds[n-1]||"");/* last qualifying break that ends on or before the last training day < s */
    var qn=qi<T.q.length&&T.q[qi]===ds[n-1]?qi+1:qi;if(qn>0){var e=T.q[qn-1],j=lbIdx(ds,e);R=e;gap=diff(ds[j-1],e);}}
  var v={on:false,low:false,noHard:false,noTest:false,R:R,gap:gap};
  if(R){var dd=diff(R,s),str=0;if(dd<14){for(var q=0;q<dd;q++)onDay(addD(R,q)).forEach(function(l){if(STR[l.id]&&!l.bl)str++;});}
    else str=D.logs.filter(function(l){return STR[l.id]&&!l.bl&&l.d>=R&&l.d<s;}).length;v.on=dd<7;v.low=dd<14&&str<2;v.noHard=dd<3;v.noTest=v.on;v.n=str;}
  CBC.m[s]=v;return v;}
/* A-035 (T2): "Just starting" runs easy only in the first 4 training weeks, at most 2 runs per training week; hard runs and
   intervals come after that. */
function begRun(s){return D.startP==="s0"&&cycWk(s).wk<=4;}
function begRuns(s){var w0=blkStart(s);return D.logs.filter(function(l){return isRun(l)&&l.d>=w0&&l.d<s;}).length;}
/* A-038: hist(s) scans the whole history many times per page and per simulated day; it is kept per date, state and
   number of entries (HSC) and handed out as a copy. */
var HSC={k:"",D:null,L:null,r:null};
function hist(s){var L=D.logs,ln=L.length,g=D.goal,ky=TODAY+"|"+ln+"|"+(ln?L[ln-1].d+L[ln-1].id+(L[ln-1].rpe||0):"")+"|"+JSON.stringify([D.skills,g?[g.k,g.v,g.d]:0,D.pain,D.pause,(D.pauseH||[]).length,D.focus,D.emph,D.startP,D.start,D.easy,D.kickDays]);
  if(HSC.k!==ky||HSC.D!==D||HSC.L!==L||HSC.last!==L[ln-1])HSC={k:ky,D:D,L:L,r:{},last:L[ln-1]};var c=HSC.r[s];if(!c)c=HSC.r[s]=hist0(s);var h={};for(var q in c)h[q]=c[q];return h;}
/* A-038: per session id the sorted dates of its entries and the first training date, kept like the day index (IDI). */
var IDI={k:"",D:null,L:null};
function idIdx(){var L=D.logs,ln=L.length,ky=ln+"|"+(ln?L[ln-1].d+L[ln-1].id:"");
  if(IDI.k!==ky||IDI.D!==D||IDI.L!==L||IDI.last!==L[ln-1]){var m,f,i0=0,srt=false;var dp=0;if(grown(IDI,L)&&IDI.dp<8){m=Object.create(IDI.m);dp=IDI.dp+1;f=IDI.first;i0=IDI.n;}else{m={};f=null;srt=true;}
    for(var i=i0;i<ln;i++){var l=L[i],a=m[l.id]||[];if(!srt&&a.length&&a[a.length-1]>l.d)srt=true;if(i0)m[l.id]=a.concat([l.d]);else{a.push(l.d);m[l.id]=a;}if(isTrain(l)&&(!f||l.d<f))f=l.d;}
    if(srt)Object.keys(m).forEach(function(q){m[q].sort();});IDI={k:ky,D:D,L:L,m:m,first:f,n:ln,last:L[ln-1],dp:dp};}
  return IDI;}
function lastBefore(a,s){var lo=0,hi=a?a.length:0;while(lo<hi){var md=(lo+hi)>>1;if(a[md]<s)lo=md+1;else hi=md;}return lo>0?a[lo-1]:"";}
function hist0(s){
  var h={},y=onDay(addD(s,-1)),IDS=["KA","KB","KC","CH","RE","RH","RI","DL","TE","HO","SK","KI","RS"],X=idIdx();
  var w0=addD(D.start,7*Math.floor(Math.max(0,diff(D.start,s))/7)),days={};
  h.hsN=0;h.runs7=0;h.str7=0;h.lim7=0;h.skN=0;h.legW=0;
  /* A-038: the windows (≤ 14 days) are read through the day index instead of scanning the whole history; same rules. */
  for(var q=14;q>=0;q--){var d=addD(s,-q);onDay(d).forEach(function(l){
    if(q<=6){if(HASHS[l.id])h.hsN++;if(l.sk?l.sk.length>0:!!HASHS[l.id])h.skN++;}
    if(q>=1&&q<=7){if(isRun(l))h.runs7++;if((l.rpe||0)>=10&&HARD[l.id])h.lim7++;}
    /* A-035 (N-5): the light deload session does not use up one of the run focus' two strength slots. */
    if(q>=1&&q<=6&&STR[l.id]&&l.id!=="DL")h.str7++;
    if(q>=1&&isTrain(l))days[d]=1;if(q>=1&&d>=w0&&legLog(l))h.legW++;});}
  IDS.forEach(function(k){var b=lastBefore(X.m[k],s);h[k]=b?diff(b,s):Infinity;});
  h.C=Math.min(h.KC,h.CH);
  h.strY=y.some(function(l){return STR[l.id];}); h.kcY=y.some(function(l){return l.id==="KC";});
  h.rhY=y.some(function(l){return l.id==="RH"||l.id==="RI";}); h.limitY=y.some(function(l){return (HARD[l.id]||l.id==="OA")&&(l.rpe||0)>=10;});h.oaY=y.some(oaHard);
  h.hardRun=0; for(var i=1;i<=4;i++){if(onDay(addD(s,-i)).some(function(l){return HARD[l.id]&&(l.rpe||6)>=6;}))h.hardRun++;else break;}
  h.skT=selSk().length?(gSkill()?5:4):0; h.hardR=Math.min(h.RH,h.RI);
  h.run=Math.min(h.RE,h.RH,h.RI);h.beg=begRun(s);h.kmOK=kmRoom(s)>=2&&!painRun()&&!(h.beg&&begRuns(s)>=2);
  var td=onDay(s); h.ranToday=td.some(isRun); h.strToday=td.some(function(l){return STR[l.id];});
  h.lowFreq=!!X.first&&diff(X.first,s)>=14&&Object.keys(days).length<=7;
  return h;
}
/* Leg sessions (V1, A-009): legs at least twice per training week (weeks count from D.start, like ctx()). Strength A/B (and the
   challenge, which stands in for Strength C) get the compact leg block while Strength C is more than 7 days old or the week has fewer than 2 leg sessions so far. A session counts when it holds ≥ 6 direct lower-body working sets
   (Strength C, home strength, a compact leg block or a lower/glute emphasis block). Old logs without "lg": KC and HO count. */
function legSets(s,c,id){var n=0;s.blocks.forEach(function(b){if(D.short&&b.p>1)return;b.items.forEach(function(it){var q=curVar(it,LOC()),p=itPat(it,q);if((p!=="legs"&&p!=="hinge")||q<0||painHit(it.opts[q].n))return;n+=setsOf(it,b,c,id);});});return n;}
/* ===== P-5 volume: direct working sets per movement pattern (l.vs) and a set band per pattern and 7 days. =====
   Same counting as legSets (F/T/I items never count). Old logs without vs use an estimate per session type; logged past
   days (bl) carry no exercise values and never count. rounds() takes the high count when every pattern of the block is
   under its band and the low one when one is over it; else the old rule. design() keeps the 60–90 min frame. */
var VPAT=["pull","push","legs","hinge","core"];
var VSEST={KA:{pull:8,push:8,core:3},KB:{pull:8,push:8,core:3},KC:{legs:9,hinge:3,pull:6,core:3},CH:{pull:6,push:4,legs:4},HO:{pull:6,push:6,legs:6,core:3},DL:{pull:4,push:4},TE:{pull:2,push:2}};
/* Pattern per item key (patKey, so gym, home, Field kit "mx_" and favourite "fav_" copies share it). Arms, shoulder care,
   forearms, mobility and skill holds count for no pattern. Leg keys match LEGK. */
/* A-026: hip abduction (abductor machine, banded abduction, side-lying leg raises, fire hydrants: key g_ab) is leg
   accessory and counts for no pattern, like the running prehab abduction c_gm; it is no hip hinge. Logs written since
   carry vm = VMAP; for older logs logVs() reads their sets by the new mapping (the logs themselves stay as they are). */
/* A-027 mapping (doctrine): hip extension = hinge (x_be bench, a_hyp); knee flexion (leg curl, Nordic curl) = legs;
   by variant: b_jump (swing hinge, jumps legs), x_be (home variants superman holds and bird dog core), u_cur (only chin-up
   negatives pull), u_tri push. Calf raises (c_calf) and hip abduction (g_ab) are leg accessory without a pattern and do not
   count for legs + hinge ≥ 10 or the 6 leg sets of a leg session. The Core Blitz counts for core (rounds / 2 sets), fixed
   items with real load by their pattern (it.fp, it.fv sets: one set per started 10 reps of the dose).
   Logs written since carry vm = VMAP (3 since A-035); older logs are read through logVs() by this mapping, the logs stay unchanged. */
/* A-035: triceps work of Strength B (b2_tr) counts as pressing too (VMAP 3); logs before carry it under no pattern. */
var VMAP=3,V1P={c_calf:"legs",x_be:"core",u_tri:"",u_cur:"",b_jump:"hinge",c_rdl:"hinge",h_ham:"hinge",b2_tr:""};
var PATK=(function(){var m={},t={pull:"a2_com a2_row a2_wpu a_expu a_lat a_row b2_lr b2_sw b_er b_fr b_neg c_pu ch_row fl_pull gl_pull h_pull mu_neg mu_pro u_row r_ur1 r_ur2",
  push:"a2_dtp a2_fl a2_ww a_pike a_sbd b2_am b2_dl b2_dp b2_tr b_pk b_pu c_dip ch_push gl_dip gl_push h_dip h_pike h_pu pl_pu u_sh u_tri",
  legs:"c_sq c_lu g_bss g_su gl_sq h_sq r_lu1 r_lu2 r_bs1 r_bs2 r_su1 r_su2",hinge:"c_rdl g_ht g_kb g_rdl g_fp g_45 h_ham b_gl b_jump a_hyp gl_ht gl_rdl x_be r_rd1 r_rd2 r_kb1 r_kb2 r_fp1 r_fp2 r_45a r_45b",
  core:"x_aw x_db x_lr x_pal x_sp kp_pal kp_rot r_db1 r_db2 r_pa1 r_pa2 r_sp1 r_sp2 r_lr1 r_lr2 r_aw1 r_aw2"};Object.keys(t).forEach(function(p){t[p].split(" ").forEach(function(k){m[k]=p;});});return m;})();
/* Variant names that move to another pattern than their item key (knee flexion, jumps, home back-extension forms, chin-up negatives). */
var PATN={"Leg curl machine":"legs","Nordic Curls":"legs","Nordic curls, feet under the sofa":"legs","Box Jumps":"legs","Jumping Squats":"legs","Kettlebell Swings":"hinge",
  "Superman holds":"core","Bird dog":"core","Back extension bench":"hinge","Chin-up negatives":"pull"};
var EMPAT={lower:["legs","hinge"],glutes:["hinge"],upper:["pull","push"],core:["core"]};
var GPAT={pull:"pull",dips:"push",push:"push",sq:"legs",ht:"hinge",rdl:"hinge",mu:"pull",fl:"pull",hs:"push",pl:"push",ls:"core"};
function itPat(it,v){if(!it||it.f||it.iso||it.test||!it.k)return "";var k=patKey(it.k);if(v==null)v=it.opts?curVar(it,LOC()):-1;var n=v>=0&&it.opts[v]?it.opts[v].n:"";
  if(own(PATN,n))return PATN[n];return own(PATK,k)?PATK[k]:"";}
/* Leg keys (legs + hinge) derived from PATK; legSets() counts by the pattern of the shown variant. */
var LEGK=(function(){var m={};Object.keys(PATK).forEach(function(k){if(PATK[k]==="legs"||PATK[k]==="hinge")m[k]=1;});return {keys:m,test:function(k){return own(m,patKey(k));}};})();
/* Muscle group for Field kit and Never replacements (M-2): from the pattern; the name rules only for pattern-free items. */
var PGRP={pull:"pull",push:"push",legs:"knee",hinge:"hip",core:"core"},GRPP={pull:"pull",push:"push",knee:"legs",hip:"hinge",core:"core"};
function poolPat(g,n){return own(PATN,n)?PATN[n]:(GRPP[g]||"");}
function fPat(it){return it&&it.f&&it.fp?it.fp:"";}
function blitzSets(ab){return ab?Math.round(ab.rounds/2):0;}
function vsZero(){return {pull:0,push:0,legs:0,hinge:0,core:0};}
/* Sets per pattern of a strength log by today's mapping. A log from before A-026 (no vm) still counts the sets of a
   remapped exercise under its old pattern; they are taken off it (its default 3 sets, as the log keeps no set count). */
/* Old logs by today's mapping: an exercise whose pattern changed has its sets (its default 3, the log keeps no set count)
   moved from the old pattern to the new one; a done Core Blitz adds its core sets. Field kit copies ("mx_") keep their key. */
var KEYV=null;function keyVar(k,i){if(!KEYV){KEYV={c_rdl:["Romanian deadlift","Leg curl machine","Nordic Curls"]};var cat=favCatalog();Object.keys(cat).forEach(function(n){var it=cat[n].it;if(it.k&&!KEYV[it.k])KEYV[it.k]=it.opts.map(function(o){return o.n;});});}var a=KEYV[k];return a&&a[i]||"";}
function oldPat(k,vm){if(k==="g_ab")return vm<1?"hinge":"";if(own(V1P,k))return V1P[k];return own(PATK,k)?PATK[k]:"";}
function newPat(q){var h=q.split("#"),k=patKey(h[0]),n=/^mx_/.test(h[0])?"":keyVar(k,+h[1]);return own(PATN,n)?PATN[n]:(own(PATK,k)?PATK[k]:"");}
function logVs(l){var v=l.vs;if(!v)return VSEST[l.id]||null;var vm=l.vm||0;if(vm>=VMAP)return v;var o={pull:v.pull||0,push:v.push||0,legs:v.legs||0,hinge:v.hinge||0,core:v.core||0},ch=false;
  if(l.ex)Object.keys(l.ex).forEach(function(q){var k=patKey(q.split("#")[0]),b=/^mx_/.test(q)?(own(PATK,k)?PATK[k]:""):newPat(q),a=vm>=2?(k==="b2_tr"?"":b):oldPat(k,vm);if(a===b)return;ch=true;if(a)o[a]=Math.max(0,o[a]-3);if(b)o[b]=Math.min(60,o[b]+3);});
  if(l.abs&&vm<2){o.core=Math.min(60,o.core+({CH:1,TE:1,DL:1}[l.id]?2:4));ch=true;}
  return ch?o:v;}
function volSets(s,c,id){var t=vsZero();s.blocks.forEach(function(b){if(D.short&&b.p>1)return;b.items.forEach(function(it){var q=curVar(it,LOC()),p=itPat(it,q),fp=fPat(it);if(q<0||painHit(it.opts[q].n))return;if(fp){t[fp]+=it.fv||1;return;}if(!p)return;t[p]+=setsOf(it,b,c,id);});});
  t.core+=blitzSets(s.ab);
  VPAT.forEach(function(p){t[p]=Math.min(60,t[p]);});return t;}
var VSC={};
function vs7(s){var n=D.logs.length,key=s+"|"+n+"|"+(n?D.logs[n-1].d+D.logs[n-1].id:"");if(VSC.L===D.logs&&VSC.k===key)return VSC.v;
  var t=vsZero(),first="";D.logs.forEach(function(l){if(!STR[l.id]||l.bl)return;if(!first||l.d<first)first=l.d;var x=diff(l.d,s);if(x<0||x>6)return;var v=logVs(l);if(v)VPAT.forEach(function(p){t[p]+=v[p]||0;});});
  t.on=!!first&&diff(first,s)>=7;VSC={L:D.logs,k:key,v:t};return t;}
function goalPat(){var g=D.goal;return g&&GOALS[g.k]?(GPAT[g.k]||""):"";}
function pzAge(g){return diff(g.pz,TODAY)-pausedIn(g.pz,TODAY);}
function plBoost(){var g=D.goal;if(!(g&&g.pz&&goalPat()))return false;var a=pzAge(g);return a<21||(!!g.pk&&a<42);}
function vHot(p){return goalPat()===p||(EMPAT[emph()]||[]).indexOf(p)>=0;}
/* A-032/A-035: the band of the other patterns follows the strength sessions per week of the focus (strength & skills: up to
   4), so the floors of 4 sessions (2 sets, 2 circuit rounds) do not push it over by design: + 2 per session over 3. */
var UNITS={str:4,bal:3,run:2};
function vUnits(){return UNITS[D.focus]||3;}
/* A-041: at the fourth stand of its axis the pattern's upper limit rises by 2 sets: the dose-response of weekly sets keeps
   paying off in trained lifters, with smaller gains per set [Q2][Q4]. */
function vBand(p){var gp=goalPat(),hot=vHot(p),b=hot?[12,20]:[8,14+2*Math.max(0,vUnits()-3)];if(pStand(p)>=3)b=[b[0],b[1]+2];
  /* A-042: volume block +2 on the upper limit of the emphasis/goal pattern; skill block keeps the band at its lower edge */
  var ac=accNow();if(ac==="vol"&&hot)b=[b[0],b[1]+2];else if(ac==="skill")b=[b[0],Math.max(b[0]+4,b[1]-2)];
  if(gp===p&&plBoost())b=[b[0]+2,b[1]+2];else if(!D.goal){var ng=plNoGoal();if(ng&&ng.pm==="s"&&ng.p===p)b=[b[0]+2,b[1]+2];}return b;}
function legLow(b){var t=vs7(TODAY);return t.on&&t.legs+t.hinge<10&&b.items.some(function(it){var p=itPat(it);return (p==="legs"||p==="hinge")&&curVar(it,LOC())>=0;});}
function volBias(b){var P={};b.items.forEach(function(it){var p=itPat(it);if(p&&curVar(it,LOC())>=0)P[p]=1;});var ps=Object.keys(P);if(!ps.length)return 0;
  var t=vs7(TODAY);if(!t.on)return 0;
  if(ps.some(function(p){return t[p]>vBand(p)[1];}))return -1;
  /* Legs always ≥ 10 sets per 7 days (legs and hinge together, V1/A-009). */
  if(ps.every(function(p){return t[p]<vBand(p)[0]||((p==="legs"||p==="hinge")&&t.legs+t.hinge<10);}))return 1;return 0;}
/* A-025: band per session. cap[p] = what today's session may add to pattern p: the room left in the band over the last
   6 days (today's own logs excluded, so a logged session does not shrink afterwards) and a fair share of the band upper
   limit per session with that pattern (its sessions in the window incl. today; for a goal/emphasis pattern, which rides
   on every strength session, at least NDEF per focus and half its sessions of the last 14 days; NDEF for every pattern
   while the history is short). bandFit() then cuts single sets
   until every pattern fits: pure accessory first, then secondary blocks, main blocks, favourites, the leg block and the
   emphasis block last; a unit is only cut while every pattern it trains is over its cap and keeps its band lower limit
   (bandLoOK), never below 2 sets/rounds, and
   legs + hinge stay ≥ 10 per 7 days. Warm-up, cool-down, skill blocks, tests, the goal anchor and the user's additions are
   never cut. Last step: the emphasis block keeps only its anchor (and favourites). It only ever lowers, never below
   60 min (outside Limited time) and never below 6 leg sets in a session that is a leg session. */
var NDEF={str:3,bal:3,run:2};
/* A-032: legs and hinge: Strength C (the leg day) takes the bigger share of the per-session cap (weight KCW), the other
   sessions the smaller one, so the leg day is not the thinnest leg dose of the week. */
var KCW=1.6;
function bandCaps(id){var t=vsZero(),n=vsZero(),f=vsZero(),cap={};
  D.logs.forEach(function(l){if(!STR[l.id]||l.bl)return;var x=diff(l.d,TODAY);if(x<1||x>14)return;var v=logVs(l);if(!v)return;VPAT.forEach(function(p){if(v[p]){f[p]++;if(x<7){t[p]+=v[p];n[p]++;}}});});
  /* a second Strength C within 6 days takes the normal share: the bigger one belongs to one leg day per 7 days */
  var kc6=D.logs.some(function(l){var x=diff(l.d,TODAY);return l.id==="KC"&&!l.bl&&x>=1&&x<=6;});
  var on=vs7(TODAY).on;cap._n={};VPAT.forEach(function(p){var hi=vBand(p)[1],nw=on&&!vHot(p)?n[p]+1:Math.max(n[p]+1,NDEF[D.focus]||3,Math.ceil(f[p]/2),vUnits()),sh=hi/nw;
    if((p==="legs"||p==="hinge")&&nw>1&&legPlan())sh=hi*(id==="KC"&&!kc6?KCW:1)/(nw-1+KCW);
    cap[p]=Math.max(0,Math.min(hi-t[p],Math.floor(sh)));cap._n[p]=nw;});
  cap._u=t;return cap;}
/* Profiles whose week has a leg day (Strength C): every one but the upper-body emphasis and a knee/ankle/hip pain week. */
function legPlan(){return emph()!=="upper"&&!painU("kc");}
/* A cut keeps a pattern at its band lower limit: over the 7 days, or at least its share of it per session. */
function bandLoOK(cap,v,p,k){var lo=vBand(p)[0];return cap._u[p]+v[p]-k>=lo||v[p]-k>=Math.round(lo/cap._n[p]);}
/* A-029 Tired doctrine (control station after research: Bell et al. 2023, Sports Medicine – Open 9:87; Spiering et al. 2021,
   J Strength Cond Res 35(5)): a tired day is a volume deload for one day. About a third fewer working sets (3 → 2, 4 → 3,
   at least 2 per exercise), circuits one round less, load and variation unchanged; every set ends 3–4 reps before failure,
   no tests and no max attempts. Accessory and circuits give way first; anchor and skill stay, only shorter. The duration
   follows from that, never under 45 min (DURMIN); warm-up and cool-down stay complete. Each step is undone if it takes the
   session under 45 min, a leg session under 6 leg sets or legs + hinge of the 7 days under 10. */
function tiredSets(n){return Math.min(n,Math.max(2,Math.ceil(n*2/3)));}
/* A-047 Tired doctrine (control station): measured on the whole session. Target about a third fewer working sets of the
   session (T = ⅔ of the normal count, ± 1). Order: first whole accessory and circuit exercises go (D1 rank from the bottom:
   pure accessory, shoulder stability, secondary circuits, the emphasis/leg block's companions), then one set less per
   exercise (floor 2) and circuits one round less (floor 2), the anchor and goal anchor last; they always stay. Load and
   variation unchanged, 3–4 reps in reserve, no tests, never under 45 min (DURMIN), warm-up and cool-down complete. The weekly
   floor legs + hinge ≥ 10 holds over the week, not on the tired day: a leg session may go down to its anchor + 1 exercise
   (≥ 4 leg sets). Sources: Bell et al. 2023; Spiering et al. 2021. */
function tWork(s,c,id){var n=0;s.blocks.forEach(function(b){if(b.warm||b.cool||(D.short&&b.p>1))return;/* A-052 (M-3): blocks hidden by Limited time do not count */b.items.forEach(function(it){if(!it.k||it.f||it.iso||it.test||curVar(it,LOC())<0)return;n+=setsOf(it,b,c,id);});});return n;}
function tiredCut(s,c,id,est){var ch=false,lg0=legSets(s,c,id),W=tWork(s,c,id),T=Math.round(W*2/3);
  function ok(){return (D.short||est()>=DURMIN)&&!(lg0>=4&&legSets(s,c,id)<Math.min(4,lg0));}
  function live(b){return !(b.warm||b.cool||b.add||b.trial||b.rehab||(D.short&&b.p>1));}
  function anc(it){return !!(it&&(it.anc||it.gx||it.gan));}
  function work(it){return it.k&&!it.f&&!it.iso&&!it.test&&curVar(it,LOC())>=0;}
  function core(b){return b.gx||b.skill||b.mu||b.hsb||b.lng||b.jump;}
  function left(b){return b.items.filter(work).length;}
  /* 1 whole exercises */
  function drop(b,keep){for(var i=b.items.length-1;i>=0&&W>T;i--){var it=b.items[i];if(!work(it)||anc(it)||it.add||left(b)<=keep)continue;var n=setsOf(it,b,c,id);if(W-n<T-1)continue;
      it.gone=1;it.tdrop=1;if(ok()){W=tWork(s,c,id);ch=true;}else{delete it.gone;delete it.tdrop;}}}
  var bl=s.blocks.filter(live),rv=bl.slice().reverse();
  rv.forEach(function(b){if(b.acc)drop(b,0);});
  rv.forEach(function(b){if(b.sh)drop(b,1);});
  rv.forEach(function(b){if(!b.acc&&!b.sh&&!b.fav&&!core(b)&&!b.lowb&&!b.legs&&b.rounds)drop(b,1);});
  rv.forEach(function(b){if((b.lowb||b.legs)&&!core(b))drop(b,b.items.some(anc)?2:1);});
  /* 2 one set / one round less (floor 2): accessory, circuits, single exercises, then anchor and goal anchor */
  function cutR(b){if(W<=T)return;var r=rounds(b,c,id),k=b.items.filter(work).length;if(r<=2||!k||W-k<T-1)return;var o=b.tr;b.tr=r-1;if(ok()){b.rdc=1;W=tWork(s,c,id);ch=true;}else b.tr=o;}
  function cutI(b,it){if(W<=T||!work(it))return;var n=setsOf(it,b,c,id);if(n<=2)return;var o=it.ts;it.ts=n-1;if(ok()){it.rdc=1;W=tWork(s,c,id);ch=true;}else if(o==null)delete it.ts;else it.ts=o;}
  function circ(b){return b.rounds&&!b.lowb;}
  bl.forEach(function(b){if(b.acc){if(circ(b))cutR(b);else b.items.forEach(function(it){cutI(b,it);});}});
  bl.forEach(function(b){if(!b.acc&&!core(b)&&circ(b))cutR(b);});
  bl.forEach(function(b){if(!b.acc&&!circ(b))b.items.forEach(function(it){if(!anc(it))cutI(b,it);});});
  bl.forEach(function(b){if(core(b)&&circ(b))cutR(b);});
  bl.forEach(function(b){if(!circ(b))b.items.forEach(function(it){if(anc(it))cutI(b,it);});});
  /* 3 a long skill block to its standard form */
  s.blocks.forEach(function(b,x){if(W<=T||!b.lng||!live(b))return;var nb=SKB(b.lng[0],false,b.lng[1]);if(b.gx)nb.gx=1;if(FAVIDS[id])favDef(nb);s.blocks[x]=nb;painFix(s);if(ok()){W=tWork(s,c,id);ch=true;}else s.blocks[x]=b;});
  return ch;}
/* A-029: three tired days within 7 days → a passive hint toward the existing easy week (the user decides). */
function tired3(){if(!D.opt||!D.opt.ready||easyOpen()||ctx(TODAY).cyc===6)return false;var n=D.logs.filter(function(l){var x=diff(l.d,TODAY);return l.rd===3&&x>=0&&x<7;}).length;
  var d=D.days&&D.days[TODAY];if(d&&d.ready===3&&!onDay(TODAY).some(function(l){return l.rd===3;}))n++;return n>=3;}
/* A-035: a band swap never takes away the last exercise of a muscle group (kitGroup) in the session. */
function grpLast(s,it){var g=kitGroup(it),n=0;s.blocks.forEach(function(b){if(b.warm||b.cool)return;b.items.forEach(function(x){if(x!==it&&x.k&&!x.f&&curVar(x,LOC())>=0&&kitGroup(x)===g)n++;});});return n===0;}
/* A-032: under the band a leg session stays one (≥ 6 leg sets, A-009). With lower/glutes only where it is needed: Strength C,
   or a training week that still needs a second leg session besides Strength C (a goal anchor alone does not lock it). */
function legKeep(id,lg0){if(lg0<6)return false;var e=emph();if(id==="KC"||(e!=="lower"&&e!=="glutes")||painU("kc"))return true;
  /* with lower/glutes Strength C comes every training week and every session carries leg work, so a session only has to
     stay a leg session while the week still needs it besides Strength C */
  var w0=blkStart(TODAY),kc=!D.logs.some(function(l){return l.id==="KC"&&l.d>=w0&&l.d<=TODAY;});return hist(TODAY).legW+(kc?1:0)<2;}
/* A-032: the leg day is not the thinnest leg dose of its training week. Strength C keeps at least the legs + hinge sets of
   every other strength session of the week so far (kcLow, a floor above the band); a session after Strength C in the same
   week counts as over its leg/hinge share once it would pass Strength C (kcCeil). Profiles with a leg day only (legPlan). */
function wkLh(f){var w0=blkStart(TODAY),m=0;D.logs.forEach(function(l){if(!STR[l.id]||l.bl||l.d<w0||l.d>=TODAY||!f(l))return;var v=logVs(l);if(v)m=Math.max(m,(v.legs||0)+(v.hinge||0));});return m;}
var KCF=0;
/* Set at the start of bandFit: the floor for today's Strength C, or 0. The band tolerance ranks first: the floor holds only
   while it fits into the room legs and hinge have left over the 7 days up to their tolerance (upper limit + 2 for an
   emphasis/goal pattern, + 4 for the others). */
function kcFloor(s,c,id){if(id!=="KC"||!legPlan())return 0;var f=wkLh(function(l){return l.id!=="KC";});if(!f)return 0;var u=vs7(TODAY),tl=function(p){return vBand(p)[1]+(vHot(p)?2:4);};
  return f<=tl("legs")-u.legs+tl("hinge")-u.hinge?f:0;}
function kcLow(s,c,id,v0){if(!KCF||id!=="KC")return false;var v=volSets(s,c,id);if(v.legs+v.hinge>=KCF)return false;
  /* a cut that brings legs or hinge back into the tolerance is never undone for the floor */
  if(v0){var u=vs7(TODAY);if(["legs","hinge"].some(function(p){return v[p]<v0[p]&&u[p]+v0[p]>vBand(p)[1]+(vHot(p)?2:4);}))return false;}return true;}
function kcCeil(id){if(id==="KC"||!legPlan())return 0;return wkLh(function(l){return l.id==="KC";});}
/* The time floor of the band steps: 60 min, 45 min on a tired day (explicit user wish, A-035). */
function bfLo(){return rdDay()===3?DURMIN:DURLO;}
function bandFit(s,c,id,cap,est){var u=cap._u,U=[],ch=false,lb=null,lg0=legSets(s,c,id);
  s.blocks.forEach(function(b,bi){if(b.lowb)lb=b;
    if(b.warm||b.cool||b.add||b.trial||b.gx||b.skill||b.mu||b.hsb||b.lng||(D.short&&b.p>1))return;
    var its=b.items.filter(function(it){return itPat(it)&&!it.gx&&curVar(it,LOC())>=0;});if(!its.length)return;
    var pr=b.acc?0:(b.lowb?5:(b.legs?4:(b.fav?3:(b.p>1?1:2))));
    /* The emphasis block is not a circuit: its exercises are cut one by one (it.ts, read by setsOf), the anchor last (an
       anchor whose pattern the goal anchor already trains ranks like the other emphasis exercises, M-3). */
    if(b.lowb)its.forEach(function(it){U.push({b:b,its:[it],pr:it.anc&&!it.gan?6:5,i:bi});});
    else if(b.rounds)U.push({b:b,its:its,r:1,pr:pr,i:bi});else its.forEach(function(it){U.push({b:b,its:[it],pr:pr,i:bi});});});
  function cur(x){return x.r?rounds(x.b,c,id):setsOf(x.its[0],x.b,c,id);}
  var kcc=kcCeil(id);KCF=kcFloor(s,c,id);
  for(var g=0;g<200;g++){var v=volSets(s,c,id),over=VPAT.filter(function(p){return v[p]>cap[p]||((p==="legs"||p==="hinge")&&kcc&&v[p]>0&&v.legs+v.hinge>kcc);});if(!over.length)break;
    var best=null;U.forEach(function(x){if(x.no)return;var ps={};x.its.forEach(function(it){var p=itPat(it);ps[p]=(ps[p]||0)+1;});
      if(!Object.keys(ps).every(function(p){return over.indexOf(p)>=0&&bandLoOK(cap,v,p,ps[p]);})||cur(x)<=2)return;
      var lh=(ps.legs||0)+(ps.hinge||0);if(lh&&u.legs+u.hinge+v.legs+v.hinge-lh<10)return;
      if(!best||x.pr<best.pr||(x.pr===best.pr&&x.i>best.i))best=x;});
    if(best){var o=best.r?best.b.tr:best.its[0].ts,n=cur(best)-1;if(best.r)best.b.tr=n;else best.its[0].ts=n;
      /* The 60–90 min frame stays the hard limit (concept 5.3) and a leg session stays one (≥ 6 leg sets, A-009). */
      if((!D.short&&est()<bfLo())||(legKeep(id,lg0)&&legSets(s,c,id)<6)||kcLow(s,c,id,v)){if(best.r)best.b.tr=o;else best.its[0].ts=o;best.no=1;}else ch=true;continue;}
    /* A-026: an exercise of a full pattern outside the emphasis block (circuits mix patterns, so their rounds cannot be cut
       for one of them) swaps for a pattern-free one of the same body area and the same sets: rear delts for a pull,
       lateral raises for a push, hip abduction, adductors or shins for legs and hinge. Same order as the cuts. Only for a
       real surplus: the 7 days with today's session would go over the band upper limit, not just over the fair share. */
    if(bandSwap(s,c,id,cap,v,over,est,lg0)||bandDrop(s,c,id,cap,v,over,est,lg0)){ch=true;continue;}
    /* Before dropping: an emphasis exercise of a full pattern swaps for one whose pattern has room (same time, fewer sets
       of the full pattern), e.g. a split squat for a kickback once hinge is full. */
    var sw=lb?lb.items.filter(function(it){var p=itPat(it);return !(it.anc&&!it.gan)&&!isFavIt(it)&&!it.sw&&p&&over.indexOf(p)>=0&&!grpLast(s,it);}).pop():null;
    if(sw&&lb.more){var r3=setsOf(sw,lb,c,id),nx=null;/* A-027: an exercise of a pattern with room goes before a pattern-free one. */[1,0].some(function(pp){return lb.more.some(function(m){var p=itPat(m);if(curVar(m,LOC())>=0&&(pp?(p&&over.indexOf(p)<0&&v[p]+r3<=cap[p]):!p)){nx=m;return true;}});});
      var lh3=nx&&(itPat(sw)==="legs"||itPat(sw)==="hinge")&&!(itPat(nx)==="legs"||itPat(nx)==="hinge")?r3:0;
      if(nx&&bandLoOK(cap,v,itPat(sw),r3)&&(!lh3||u.legs+u.hinge+v.legs+v.hinge-lh3>=10)){
        var its0=lb.items,more0=lb.more,tsS=sw.ts,tsN=nx.ts,e0=est();nx.ts=sw.ts;delete sw.ts;
        lb.items=lb.items.map(function(it){return it===sw?nx:it;});lb.more=lb.more.filter(function(m){return m!==nx;}).concat([sw]);
        /* a swap of the same sets only fails the time floor when it makes the session shorter */
        if((!D.short&&est()<bfLo()&&est()<e0)||(legKeep(id,lg0)&&legSets(s,c,id)<6)||kcLow(s,c,id,v)){lb.items=its0;lb.more=more0;sw.ts=tsS;nx.ts=tsN;}else{nx.sw=1;ch=true;}
        sw.sw=1;continue;}}
    var drop=lb?lb.items.filter(function(it){var p=itPat(it);return !(it.anc&&!it.gan)&&!isFavIt(it)&&p&&over.indexOf(p)>=0;}).pop():null;
    if(drop&&lb.items.length>1){var r2=rounds(lb,c,id),lh2=(itPat(drop)==="legs"||itPat(drop)==="hinge")?r2:0;if((lh2&&u.legs+u.hinge+v.legs+v.hinge-lh2<10)||!bandLoOK(cap,v,itPat(drop),r2))break;
      var keep=lb.items;lb.items=lb.items.filter(function(it){return it!==drop;});
      if((!D.short&&est()<bfLo())||(legKeep(id,lg0)&&legSets(s,c,id)<6)||kcLow(s,c,id,v)){lb.items=keep;break;}
      lb.more=[drop].concat(lb.more||[]);lb.vcut=1;ch=true;continue;}
    break;}
  return ch;}
var BSWAP={pull:["Reverse fly machine","Cable face pulls","Bent-over dumbbell reverse fly","Band face pulls","Band pull-aparts","Prone T-raises","Prone Y-Raises"],
  push:["Cable lateral raises","Dumbbell lateral raises","Band lateral raises","Scapula Push-Ups Plus"],
  legs:["Abductor machine","Lateral band walks","Copenhagen Plank","Wall tibialis raises","Side-lying leg raises"],
  hinge:["Abductor machine","Banded hip abduction","Lateral band walks","Copenhagen Plank","Fire hydrants"],core:[]};
/* A-032 (M-4): at most 1 band swap per session, never the first exercise of a main block, never a basic exercise of a stage
   (BASEK), sets are cut first (bandFit), and the swap brings no function the session already has (e.g. abduction twice). */
var BASEK=/^(fav_|mx_)?(mu_neg|a_expu|a2_wpu|b2_sw|c_pu|c_dip|c_sq|c_rdl|g_ht|g_rdl|b_gl|a_sbd|a2_dtp|b2_dl|h_pull|h_pu|h_sq)$/;
var FUNX=[["abd",/abduct|band walks?|fire hydrants?|side-lying leg raises|clamshells?/i],["add",/adduct|copenhagen/i],["rear",/reverse fl|pull-aparts?|t-raises?|reverse butterfly/i],["fp",/face pulls?/i],["lat",/lateral raises?/i],["tib",/tibialis|shin/i],["sa",/serratus|scapula push-ups plus/i]];
function funOf(n){for(var i=0;i<FUNX.length;i++)if(FUNX[i][1].test(n))return FUNX[i][0];return "";}
function bandSwap(s,c,id,cap,v,over,est,lg0){var u=cap._u,loc=LOC(),used={},keys={},fun={},C=[],cat=null,nsw=0;
  s.blocks.forEach(function(b){b.items.forEach(function(it){var q=curVar(it,loc);if(q>=0){used[it.opts[q].n]=1;if(!b.warm&&!b.cool){var f=funOf(it.opts[q].n);if(f)fun[f]=1;}}if(it.k)keys[patKey(it.k)]=1;if(it.bx)nsw++;});});
  if(nsw>=1)return false;
  s.blocks.forEach(function(b,bi){if(b.warm||b.cool||b.add||b.trial||b.gx||b.skill||b.mu||b.hsb||b.lng||b.lowb||(D.short&&b.p>1))return;
    var pr=b.acc?0:(b.legs?4:(b.fav?3:(b.p>1?1:2))),main=!b.acc&&!b.sh&&!b.fav,first=-1;b.items.forEach(function(x,q){if(first<0&&curVar(x,loc)>=0)first=q;});
    b.items.forEach(function(it,ii){var p=itPat(it);if(!p||over.indexOf(p)<0||u[p]+v[p]<=vBand(p)[1]||it.anc||it.gx||it.add||it.bx||isFavIt(it)||curVar(it,loc)<0)return;
      if((main&&ii===first)||BASEK.test(it.k||""))return;C.push({b:b,it:it,ii:ii,p:p,pr:pr,i:bi});});});
  /* the one swap goes to the pattern with the biggest surplus over its band upper limit, then by the cut order */
  var sur=function(p){return u[p]+v[p]-vBand(p)[1];};
  C.sort(function(a,b){return sur(b.p)-sur(a.p)||a.pr-b.pr||b.i-a.i||b.ii-a.ii;});
  for(var j=0;j<C.length;j++){var x=C[j],n0=setsOf(x.it,x.b,c,id),lh=(x.p==="legs"||x.p==="hinge")?n0:0;
    if(!bandLoOK(cap,v,x.p,n0)||(lh&&u.legs+u.hinge+v.legs+v.hinge-lh<10))continue;
    cat=cat||favCatalog();var pick=null;
    BSWAP[x.p].some(function(nm){var y=cat[nm];if(!y||used[nm]||keys[patKey(y.it.k)]||(funOf(nm)&&fun[funOf(nm)])||isNever(nm)||painHit(nm)||y.it.f||y.it.iso||y.it.test||itPat(y.it)||!can(y.it.opts[y.v],loc))return false;pick=y;return true;});
    if(!pick)continue;var n={};Object.keys(pick.it).forEach(function(k){n[k]=pick.it[k];});delete n.def;delete n.lv;delete n.up;n.fx=pick.v;n.bx=x.it.opts[curVar(x.it,loc)].n;n.bxk=x.it.k||"";n.bxf=x.ii===0;
    if(!x.b.rounds)n.ts=n0;var old=x.b.items,e0=est();x.b.items=old.map(function(it){return it===x.it?n:it;});
    if((!D.short&&est()<bfLo()&&est()<e0)||(legKeep(id,lg0)&&legSets(s,c,id)<6)||kcLow(s,c,id,v)){x.b.items=old;continue;}
    return true;}
  return false;}
/* A-032: once the session's one swap is used, a real surplus (the 7 days with today over the band upper limit) leaves out
   the last fitting exercise of the full pattern in a block outside the emphasis block (same rules as the swap: never the
   first exercise of a main block, a basic exercise, anchor, goal anchor, favourite or addition; the block keeps 2
   exercises; 60 min, leg session and the Strength C floor hold). It keeps its place (it.gone, it.bd = name for the hint). */
function bandDrop(s,c,id,cap,v,over,est,lg0){var u=cap._u,loc=LOC(),C=[];
  s.blocks.forEach(function(b,bi){if(b.warm||b.cool||b.add||b.trial||b.gx||b.skill||b.mu||b.hsb||b.lng||b.lowb||(D.short&&b.p>1))return;
    var vis=b.items.filter(function(x){return curVar(x,loc)>=0;});if(vis.length<3)return;var main=!b.acc&&!b.sh&&!b.fav,first=b.items.indexOf(vis[0]);
    b.items.forEach(function(it,ii){var p=itPat(it);if(!p||over.indexOf(p)<0||u[p]+v[p]<=vBand(p)[1]||it.anc||it.gx||it.add||it.bx||isFavIt(it)||curVar(it,loc)<0)return;
      if((main&&ii===first)||BASEK.test(it.k||""))return;C.push({b:b,it:it,ii:ii,p:p,pr:b.acc?0:(b.legs?4:(b.fav?3:(b.p>1?1:2))),i:bi});});});
  C.sort(function(a,b){return a.pr-b.pr||b.i-a.i||b.ii-a.ii;});
  for(var j=0;j<C.length;j++){var x=C[j],n0=setsOf(x.it,x.b,c,id),lh=(x.p==="legs"||x.p==="hinge")?n0:0;
    if(!bandLoOK(cap,v,x.p,n0)||(lh&&u.legs+u.hinge+v.legs+v.hinge-lh<10))continue;
    var nm=x.it.opts[curVar(x.it,loc)].n;x.it.gone=1;
    /* a leave-out may take the session a little under 60 min: the under-60 fill then adds what fits the band */
    if((!D.short&&est()<bfLo()-(rdDay()===3?0:4))||(legKeep(id,lg0)&&legSets(s,c,id)<6)||kcLow(s,c,id,v)){delete x.it.gone;continue;}
    x.it.bd=nm;return true;}
  return false;}
function legLog(l){return l.lg!=null?!!l.lg:(l.id==="KC"||l.id==="HO");}
function ago(n){return n===Infinity?"still to do":(n===1?"was yesterday":"last done "+n+" days ago");}
function cap(n){return n===Infinity?21:Math.min(n,21);}
function isRun(l){return l.id==="RE"||l.id==="RH"||l.id==="RI";}
function skPick(h,why){return {btn:"train",id:"SK",why:why+" Today technique: "+selSk().map(function(k){return SKN[k];}).join(", ")+"."};}
var SKN={hs:"Handstand",mu:"Muscle-Up",ls:"L-Sit",fl:"Front Lever",pl:"Planche"};
function easyPick(h,why){
  var F=D.focus;
  if(gRun()&&F==="str"&&h.runs7<2&&h.run>=1&&!h.rhY&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:why+" Today an easy run for your goal."};
  if(F==="run"&&h.runs7<5&&h.run>=1&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:why+" Today just an easy run, very relaxed."};
  if(F==="bal"&&h.runs7<2&&h.run>=1&&!h.rhY&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:why+" Today just an easy run."};
  if(h.skN<h.skT) return skPick(h,why);
  if(F!=="str"&&h.runs7<3&&h.run>=2&&!h.rhY&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:why+" Today just an easy run."};
  return {btn:"train",id:"RS",why:why+" Today recovery and mobility."};
}
/* Skill Trial due (A-024): 13 days since the last one (deload days not counted) and 2 weeks of strength history. */
function chGap(s,h){if(!D.logs.some(function(l){return STR[l.id]&&diff(l.d,s)>=13;}))return 0;if(h.CH===Infinity){var f=D.logs.filter(function(l){return STR[l.id]&&l.d<s;})[0];return Math.max(13,diff(f.d,s)-1);}
  var g=h.CH;if(g<13)return g;for(var q=1;q<h.CH&&q<60;q++)if(ctxCyc(addD(s,-q))===6||pausedDay(addD(s,-q)))g--;return g;}
/* A-035 (N-5): the run focus has only 2 strength slots a week, so its trial may take one from day 12 (14 − 2) on. */
function chDue(s,h){return chGap(s,h)>=(D.focus==="run"?12:13);}
/* A-035 (N-4): a deload cycle week that a comeback stands in for is no deload week: its sessions are designed like any
   other (filled up to 60 min unless the comeback keeps them low) and the header shows no "Deload". */
function dlWk(s,c){return (c||ctx(s)).cyc===6&&!gNear(s)&&!cbInfo(s).on;}
function ctxCyc(s){return (cycWk(s).ef-1)%6+1;}
/* Easy week now (P-4): the current training week if it has no training yet, else the next one. Undo while it has not begun. */
function blkStart(s){return addD(D.start,7*Math.floor(Math.max(0,diff(D.start,s))/7));}
function easyNext(){var b=blkStart(TODAY);return D.logs.some(function(l){return isTrain(l)&&l.d>=b&&l.d<=TODAY;})?addD(b,7):b;}
function easyOpen(){return !!D.easy&&D.easy>=blkStart(TODAY)&&!D.logs.some(function(l){return isTrain(l)&&l.d>=D.easy;});}
/* Weekly rest day (P-4, Extras, default off): at most 6 active days in 7. Active = any log but morning routine and recovery. */
function actLog(l){return l.id!=="MO"&&l.id!=="RS";}
function restDue(s){function act(k){var d=addD(s,-k);return D.logs.some(function(l){return l.d===d&&actLog(l);});}
  var n=isKick(addD(s,1))?5:6;for(var k=1;k<=n;k++)if(!act(k))return false;return true;}
/* A-047: with "Tired" chosen for today, Today follows the training page: a due Skill Trial waits for a fresher day
   (a Skill Trial picked by hand stays allowed). */
function recAll(s,noKick,noPause){var r=recAll0(s,noKick,noPause);
  if(r&&r.btn==="train"&&r.id==="CH"&&s===TODAY&&D.loc==="g"&&rdDay()===3){var h=hist(s),ab2=cap(h.KA)>=cap(h.KB)?"KA":"KB";return {btn:"train",id:ab2,why:"Tired today: the Skill Trial waits for a fresher day. "+NAMES[ab2]+" "+ago(h[ab2])+".",tired:1};}
  return r;}
function recAll0(s,noKick,noPause){
  if(!noPause&&pauseOn(s))return {btn:"pause",id:"RS",pause:1,why:D.pause.why==="ill"?"Training paused: get well first. No plan until you resume or log a session.":"Training paused. No plan until you resume or log a session."};
  var h=hist(s),c=ctx(s),td=onDay(s),F=D.focus,kickT=isKick(addD(s,1)),cb=cbInfo(s);
  var gd=goalDay(s,td);if(gd)return gd;
  if(isKick(s)&&!noKick&&!td.some(function(l){return l.id==="KI";})) return painU("kick")?{btn:"kick",id:"KI",pain:1,why:"Kickboxing day, but knee or ankle is on the pain list. Better skip it today (one tap below), or only train what stays pain-free."}:{btn:"kick",id:"KI",why:"Today is kickboxing day."};
  /* A-035: once today's strength session is logged, the day stays a strength day: no run is recommended any more (an extra
     easy run stays possible via "+ Easy run"). */
  if(h.strToday) return {btn:"train",id:"RS",done:1,why:"Strength is done for today. An easy run stays optional."};
  if(D.opt&&D.opt.rest&&restDue(s)&&!td.some(function(l){return actLog(l);})) return {btn:"train",id:"RS",why:"Weekly rest day: "+(isKick(addD(s,1))?"kickboxing tomorrow after five active days":"six active days in a row")+". Today light mobility or nothing at all."};
  if(h.rhY) return easyPick(h,"Yesterday was a hard run.");
  if(h.limitY) return easyPick(h,"Yesterday was at the limit.");
  if(h.lim7>=3&&h.RS>=3) return {btn:"train",id:"RS",why:"Three hard sessions at the limit in 7 days: today is a rest day with light mobility. Progress happens while you recover."};
  if(h.hardRun>=3) return easyPick(h,"Three hard days in a row.");
  var strOK=!h.strY&&!h.strToday&&(F!=="run"||h.str7<2);
  /* P-7: a comeback week stands in for a deload week (it is light already and has no tests). */
  if(c.cyc===6&&!gNear(s)&&!cb.on){
    if(strOK&&h.DL>=6&&h.TE>=6) return {btn:"train",id:"DL",why:"Week "+c.week+" is a deload week."};
    if(strOK&&h.TE>=6&&h.DL>=2&&!cb.noTest&&!painU("test")) return {btn:"train",id:"TE",why:"Deload done, now test your bests."};
    if((F!=="str"||gRun())&&h.RE>=2&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:"Deload week: easy running only."};
    return easyPick(h,"Deload week.");
  }
  var C=[],W={bal:{KA:10,KB:9,C:8,RH:7,RE:6,RI:0},str:{KA:10,KB:9,C:9,RH:0,RE:0,RI:0},run:{KA:7,KB:6,C:7,RH:8,RE:9,RI:8}}[F]||{},mS=F==="str"?4:6;
  var em0=emph();
  if(em0==="lower"||em0==="glutes"){W={KA:W.KA-1,KB:W.KB-1,C:(W.C||8)+3,RH:W.RH,RE:W.RE,RI:W.RI};}
  else if(em0==="upper"){W={KA:W.KA+1,KB:W.KB+1,C:Math.max(1,(W.C||8)-2),RH:W.RH,RE:W.RE,RI:W.RI};}
  /* Run goal (P-2): at least 2 runs a week, one of them long, also with the strength focus; time goals add one fast run. */
  var gr=gRun();if(gr){W={KA:W.KA,KB:W.KB,C:W.C,RH:Math.max(W.RH||0,7),RE:Math.max(W.RE||0,6),RI:GOALS[gr].g==="t"?Math.max(W.RI||0,6):W.RI};}
  function add(id,btn,wt,since,ok,why,min){ if(wt&&ok&&since>=(min||6)) C.push({id:id,btn:btn,sc:wt*cap(since)/7,why:why}); }
  var hardOK=!h.kcY&&!h.ranToday&&!kickT&&!h.oaY&&!cb.noHard&&!h.beg;
  /* Skill Trial every 14 ± 2 days for every emphasis (P-3, A-024): it takes the slot of the more due of Strength A/B, never
     Strength C (the leg block of A/B comes along via ctx().legB), not the day before kickboxing (unless it is 16 days old, so
     plans with kickboxing on alternate days still get it); it needs 2 weeks of strength
     history first. Deload weeks keep their own plan (returned above). */
  var lowE=em0==="lower"||em0==="glutes",chAB=chDue(s,h)&&!cb.noTest&&!painU("test")&&!h.oaY&&(!kickT||chGap(s,h)>=16)?(cap(h.KA)>=cap(h.KB)?"KA":"KB"):"",chW="The skill trial has been due for 2 weeks.";
  /* A due trial counts as a week-old session from its due day on and grows more urgent each day (A-024), so a recent
     Strength A/B does not hold it back past 14 ± 2 days. */
  var chS=chAB?7+chGap(s,h)-13:0;
  add(chAB==="KA"?"CH":"KA","train",W.KA,chAB==="KA"?Math.max(h.KA,chS):h.KA,strOK&&!h.ranToday,chAB==="KA"?chW:"Strength A "+ago(h.KA)+".",mS);
  add(chAB==="KB"?"CH":"KB","train",W.KB,chAB==="KB"?Math.max(h.KB,chS):h.KB,strOK,chAB==="KB"?chW:"Strength B "+ago(h.KB)+".",mS);
  add("KC","train",W.C,h.KC,strOK&&!kickT&&!h.oaY&&!painU("kc")&&!(F==="run"&&h.hardR<=1),"Legs and full body "+ago(h.KC)+".",mS);
  var h3=hard3OK(s),lm=longMode(),kmOK=h.kmOK;if(!kmOK)hardOK=false;
  add("RH","run",W.RH,h.RH,hardOK&&(lm||h3),(lm?"Long run ":"Hard run ")+ago(h.RH)+".");
  add("RI","run",W.RI,h.RI,hardOK&&h.RH>=2&&h3,"Intervals "+ago(h.RI)+".",5);
  add("RE","run",W.RE,h.RE,kmOK&&!h.ranToday&&h.runs7<(F==="run"?5:3),"Easy run "+ago(h.RE)+".",F==="run"?2:3);
  if(gr&&h.kmOK&&h.runs7<2&&!h.ranToday&&h.run>=2&&!C.some(function(x){return x.btn==="run";})&&!strOK) C.push({id:"RE",btn:"run",sc:0.1,why:"Your goal needs 2 runs a week. Today an easy one."});
  /* Week guard (P-6): run steering may push strength out at the end of a training week. On its last 2 days a still
     missing leg session (≥ 2 per week) or, with lower/glutes, a missing Strength C gets priority over a run; in long-run
     mode a missing long run gets priority too. */
  var dLeft=6-Math.floor(Math.max(0,diff(D.start,s)))%7,w0=blkStart(s),kcW=D.logs.some(function(l){return l.id==="KC"&&l.d>=w0&&l.d<s;});
  var rhW=D.logs.some(function(l){return l.id==="RH"&&l.d>=w0&&l.d<s;});
  /* A-035: the run focus promises strength twice a week (one of them with legs): on the last 3 days of a training week a
     missing second strength session gets priority too (a day earlier than the long run, so both fit). */
  var strW=D.logs.filter(function(l){return STR[l.id]&&l.d>=w0&&l.d<s;}).length;
  if(dLeft<=2&&!(c.cyc===6)&&F==="run")C.forEach(function(x){if(x.id==="RH"&&!rhW&&!lowE&&dLeft===2)x.sc*=1.6;});
  if(dLeft<=1&&!(c.cyc===6))C.forEach(function(x){if(x.id==="RH"&&longMode()&&!rhW&&!lowE)x.sc*=1.6;if(x.btn!=="train")return;if((lowE&&x.id==="KC"&&!kcW)||(!lowE&&h.legW<2&&{KA:1,KB:1,CH:1,KC:1}[x.id]))x.sc*=1.5;});
  /* A-053: a hard run on the second-last day would block a still missing Strength C on the last day (no strength after a
     hard run); with fewer hard runs it can land there, so it waits. */
  if(dLeft===1&&!(c.cyc===6)&&lowE&&!kcW&&!painU("kc"))C=C.filter(function(x){return !(x.id==="RI"||(x.id==="RH"&&!lm));});
  if(dLeft<=2&&!(c.cyc===6)&&F==="run"&&strW<2)C.forEach(function(x){if(x.btn==="train"&&{KA:1,KB:1,CH:1,KC:1}[x.id])x.sc*=1.6;});
  /* A-035 (N-5): from 14 days (deload days not counted) no run pushes a trial whose slot is open further out, so the gap
     holds 14 ± 2 with the run focus too. */
  /* With the run focus a due trial also goes before the other strength sessions (it brings the compact leg block). */
  if(chAB&&(chGap(s,h)>=14||F==="run")){var rmx=0;C.forEach(function(x){if(x.btn==="run"?chGap(s,h)>=14:(F==="run"&&x.id!=="CH"))rmx=Math.max(rmx,x.sc);});C.forEach(function(x){if(x.id==="CH"&&x.sc<=rmx)x.sc=rmx+0.01;});}
  C.sort(function(a,b){return b.sc-a.sc;});
  if(C.length){var w=C[0];return {btn:w.btn,id:w.id,why:w.why};}
  if(h.skN<h.skT) return skPick(h,"Weekly goals are met. Skill training only "+h.skN+"× in 7 days, the goal is "+h.skT+".");
  if(F!=="str"&&h.runs7<3&&h.run>=2&&!h.ranToday&&h.kmOK) return {btn:"run",id:"RE",why:"Third run of the week, easy."};
  return {btn:"train",id:"RS",why:"All weekly goals are met. Today mobility."};
}
function recTrain(s,loc,noKick){
  var r=recAll(s,noKick,true),h=hist(s),c=ctx(s),strOK=!h.strY&&!h.strToday&&!h.rhY&&!h.limitY&&h.hardRun<3;
  if(r.btn==="train"&&r.id==="CH"&&loc==="g"&&rdDay()===3){var ab2=cap(h.KA)>=cap(h.KB)?"KA":"KB";return {id:ab2,why:"Tired today: the Skill Trial waits for a fresher day. "+NAMES[ab2]+" "+ago(h[ab2])+"."};}
  if(r.btn==="train"&&r.id!=="RS"){
    if(loc==="g") return r;
    if(STR[r.id]) return {id:"HO",why:"Today without the gym: "+r.why};
    return {id:"HK",why:r.why};
  }
  if(loc==="h") return strOK&&Math.min(h.KA,h.KB,h.HO)>=3&&c.cyc!==6?{id:"HO",why:"Strength "+ago(Math.min(h.KA,h.KB,h.HO))+"."}:{id:"HK",why:"Today only technique at home."};
  if(r.id==="RS") return r;
  if(!strOK||c.cyc===6) return {id:h.skN<h.skT?"SK":"RS",why:"No heavy strength training today."};
  var best=[["KA",h.KA],["KB",h.KB],["KC",h.C]].filter(function(x){return !(x[0]==="KA"&&h.ranToday)&&!(x[0]==="KC"&&(h.oaY||painU("kc")));}).sort(function(a,b){return cap(b[1])-cap(a[1]);})[0];
  if(best&&best[1]>=3) return {id:best[0],why:(h.ranToday&&best[0]!=="KA"?"Already ran today, so not Strength A. ":"")+NAMES[best[0]]+" "+ago(best[1])+"."};
  return {id:selSk().length?"SK":"RS",why:"Strength sessions were done recently. Today "+(selSk().length?"technique.":"mobility.")};
}
function absFor(id){
  var i=D.abs%ABS.length; if((id==="KA"||id==="SK"||id==="HK")&&i===1) i=2; if(id==="KC"&&i===2) i=3;
  var mini=id==="CH"||id==="TE"||id==="DL"||D.short;
  /* A-027: with a pain region the Blitz takes the next group whose two exercises have a pain-free variant, else none. */
  if(painAny()){var j=0;for(;j<ABS.length;j++){var q=(i+j)%ABS.length;if(ABS[q].items.every(function(it){return painOK(it);})){i=q;break;}}if(j===ABS.length)return null;}
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
  var lab={RE:"an easy run",RH:"a hard run",RI:"intervals",KC:"legs",KI:"kickboxing",KA:"pulling and handstand",KB:"pushing and handstand",SK:"skill work",HO:"strength at home",HK:"skills at home",CH:"the Skill Trial",TE:"test day",DL:"deload",RS:"recovery"};
  if(sc.rec>=4&&top==="rec") why.push("Yesterday was hard, so today starts with recovery.");
  else if(lab[r.id]) why.push("Today: "+lab[r.id]+". Focus: "+MMOD[top].n.toLowerCase()+".");
  var yl=y.filter(function(l){return lab[l.id];})[0]; if(yl&&top!=="rec") why.push("Yesterday: "+lab[yl.id]+".");
  var doy=Math.floor(pd(s).getTime()/864e5),dk=MMOD.desk.items,desk=[0,1,2].map(function(i){return dk[(doy+i*2)%dk.length];});
  return {r:r,top:top,sec:sec,why:why,desk:desk};
}
function mSections(m,short){var L=mSections0(m,short);
  /* A-027: pain-hit poses leave the morning routine (a section left empty goes too). */
  if(painAny())L=L.map(function(x){var o={};Object.keys(x).forEach(function(k){o[k]=x[k];});o.items=x.items.filter(function(y){return !painHit(y[0]);});return o;}).filter(function(x){return x.items.length;});
  return L;}
function mSections0(m,short){
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
function coolItems(kind,loc,s){var c=COOLS[kind],doy=Math.floor(pd(s||TODAY).getTime()/864e5),it=c.items.filter(function(x){return !(x[3]==="g"&&(loc==="h"||loc==="m"))&&!painHit(x[0]);}),out=[];
  for(var i=0;i<Math.min(5,it.length);i++) out.push(it[(doy+i)%it.length]);
  return out.filter(function(x,i,a){return a.indexOf(x)===i;});}
function COOL(kind){return {name:"Cool-down",info:"5 min · "+COOLS[kind].n+" · hold, breathe slowly",p:1,rest:0,cool:kind,items:coolItems(kind,LOC()).map(function(x){return F(x[1],x[2],[x[0]]);})};}
/* A-035 (A-027 rest): the kickboxing cool-down goes through the pain filter like every other list. */
function KMPOST(){return {name:"Cool-down",info:"5 min · after kickboxing · hold, breathe slowly",p:1,rest:0,cool:"kick",items:COOLS_KICK().filter(function(it){return painOK(it,"h");})};}
var COOLK={KA:"up",KB:"up",SK:"up",HO:"up",HK:"up",CH:"legs",TE:"up",DL:"legs",KC:"legs"};

/* Short technique notes: first matching pattern wins. Families share one note. */
var HOWTO=[
 /* A-043: how-to for the rotation sets (first match wins, so the specific forms come first) */
 [/calf raises|pogo hops/i,"Full range on the balls of the feet: deep stretch, short pause at the top. Pogo hops: short, springy contacts, knees almost straight."],
 [/clamshell|abduction/i,"Hips level, slow and controlled. Feel the side of the hip, not the lower back."],
 [/step-ups|skater squat/i,"Whole foot on the box or floor, push through the heel, stand tall at the top and lower slowly."],
 [/good mornings|hinge|deadlift|hip extension|donkey kicks|glute bridge/i,"Hinge at the hips with a long back. Drive the hips forward and squeeze the glutes at the top, no arching of the lower back."],
 [/crunch|sit-ups|leg lowers|leg lowering|toe touches|windshield/i,"Low back stays in control, move slowly and breathe out as you curl or lower."],
 [/^(?!side-lying).*(leg raises|knee raises)/i,"No swinging: curl the pelvis up, lower slowly, the lower back stays in control."],
 [/chop/i,"Power comes from the hips and trunk. Arms stay long, the core controls the rotation."],
 [/suitcase|side plank|adductor plank|lateral leg hold/i,"Hold tall and square, do not lean: ribs stacked over the hips, breathe calmly."],
 [/rollouts|body saw|walkouts|bear crawl|plank reaches|bear plank|arm reach|bird dog with/i,"Ribs down, glutes tight: the hips neither sag nor pike. Move only as far as the back stays flat."],
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
/* A-029 (U2): the hero shows name and length; the "last done …" part of a reason is not repeated. */
function whyX(w){return String(w||"").replace(/\s*[^.]*\b(still to do|last done \d+ days ago|was yesterday)\.\s*$/,"").trim();}
function rpeHTML(f){return '<p class="q" id="rpeq">'+W("battle")+'</p><div class="seg" role="group" aria-labelledby="rpeq">'+[[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return '<button type="button" class="b'+(f.rpe===x[0]?" on":"")+'" data-a="rpe" data-v="'+x[0]+'" aria-pressed="'+(f.rpe===x[0])+'">'+x[1]+'</button>';}).join("")+'</div>';}
/* P-7: a knee or ankle on the pain list: no run is suggested (every run path reads hist().kmOK). */
function painRun(){var p=D.pain||{};return !!(p.k||p.a);}
function painHit(name){var p=D.pain||{};return Object.keys(PAINRX).some(function(k){return p[k]&&painRx(k,name);});}
function setBoxes(id,n,inp,ph,isS,rest,last){
  var s=inp.s||[],h='';
  for(var i=0;i<n;i++) h+='<label>'+(n>1?(i+1)+'.':(isS?"Sec.":"reps"))+'<input type="number" inputmode="numeric" data-set="'+i+'" data-id="'+id+'" data-rest="'+rest+'" data-last="'+(last?1:0)+'" data-n="'+n+'" value="'+esc(s[i])+'" placeholder="'+ph+'" aria-label="Set '+(i+1)+(isS?" seconds":" reps")+'"></label>';
  return h;
}
function holdBtn(dose){var m=String(dose).match(/^(\d+)\s*s( each side| each)?$/);if(!m)return "";var sec=+m[1],sides=m[2]?2:1;
  return '<button type="button" class="lnk hold" data-a="hold" data-s="'+sec+'" data-sides="'+sides+'">▶ Hold '+sec+' s'+(sides>1?' × 2':'')+'</button>';}
function itemHTML(it,id,dy,loc,b,c,sid,last){
  var v=curVar(it,loc); if(v<0) return "";
  var o=it.opts[v], a=avail(it,loc), on=!!dy.done[id], sk=!!dy.skip[id], inp=dy.inp[id]||{}, rest=b&&b.ser&&it.anc?(b.ancR||ANCREST):(b&&b.rest||0), tg, g=null, n=1, isS=false, extra="", pain=!(b&&b.rehab)&&painHit(o.n);
  if(pain) sk=true;
  if(it.f) tg=it.f;
  else if(it.iso){var m=D.profile[it.iso],q=isoP(m);n=q.n;isS=true;tg=q.n+" × "+q.h+" s";g={r:q.h};
    if(q.lev<0) extra='<div class="c gold">Max under 11 s: pick an easier variation via “Swap”.</div>';
    if(q.lev>0) extra='<div class="c gold">3 × 20 s reached: the harder form is the next step, not more seconds'+(it.iso==="hsw"?'. Hands closer to the wall, only the toes touch':(it.iso==="lsit"?'. Lift the legs higher, toward a V':(it.iso==="hsf"?'. Hold longer only once the line is clean':'')))+'.</div>'+(it.iso==="tuck"?'<div class="c"><button type="button" class="lnk nxv isoup" data-a="isoup" data-k="tuck">→ Harder form: L-Sit, legs straight</button></div>':'');
    extra+='<div class="c">Your max: '+Math.round(m)+' s.'+(q.lev>0?'':' Complete all sets and it goes up automatically.')+'</div>';}
  else if(it.test&&it.tvo){n=1;isS=it.unit==="s";var lt=lastTv(it.test);tg="Max "+(isS?"s":"reps")+(it.lw?" · "+fmtKg(it.lw)+" kg":"")+(lt!=null?" · last trial "+lt+(isS?" s":""):" · first trial");g={r:""};}
  else if(it.test){n=1;isS=it.unit==="s";tg=(D.profile[it.test]||0)>0?"Max · so far "+D.profile[it.test]+" "+it.unit:"Max "+it.unit+" · first trial";g={r:""};}
  else {g=target(it,v);n=setsOf(it,b,c,sid);isS=it.unit.indexOf("s")===0;tg=n+" × "+g.r+" "+it.unit+(wOn(it,v)&&g.w?" · "+fmtKg(g.w)+" kg":"");}
  var pc=picFor(o.n);
  var h='<div class="ex'+(pc?" pose":"")+(on?" done":"")+(sk?" skip":"")+'"><input type="checkbox" id="c'+id+'" data-a="done" data-id="'+id+'"'+(on?" checked":"")+(sk?" disabled":"")+' aria-label="'+esc(o.n)+' done">'+(pc?'<div class="pw">'+pc+'</div>':'')+'<div class="exb">';
  h+='<label class="n" for="c'+id+'">'+((D.fav||[]).indexOf(o.n)>=0?'<span class="fvs" aria-label="favourite">★ </span>':'')+esc(o.n)+'</label>';
  if(it.nh) h+='<div class="c muted nxn">On your never list, but it is your goal exercise and has no equivalent here. Change the goal under More to drop it.</div>';
  if(it.nx) h+='<div class="c muted nxn">Instead of '+esc(it.nx)+' · '+esc(W("never")).toLowerCase()+'</div>';
  if(it.bx) h+='<div class="c muted nxn">Instead of '+esc(it.bx)+' · enough of these sets this week</div>';
  if(it.px) h+='<div class="c muted nxn">Instead of '+esc(it.px)+' · pain-free choice</div>';
  if(sk) return h+'<div class="c">'+(pain?(it.add?"Hidden today: your pain filter is on.":"Skipped because of pain."):"Skipped today.")+(pain?'':' <button type="button" class="lnk" data-a="skip" data-id="'+id+'">Undo</button>')+'</div></div></div>';
  h+='<div class="tg">'+esc(tg)+'</div>';
  var wu=wuSets(it,v); if(wu&&typeof wu[0][0]==="string"&&wu[0][0]) h+='<div class="c gold kgfirst">Pick a weight you could lift about 12 times. Warm up with 2 lighter sets first.</div>';
  else if(wu) h+='<div class="wus"><span class="wub">'+esc(W("wsets"))+'</span> '+esc(wuText(wu))+' <span class="muted">· not counted</span></div>';
  else if(o.w&&g&&!g.w&&!it.f&&!it.iso&&!it.test) h+='<div class="c gold kgfirst">Pick a weight you could lift about 12 times.</div>';
  var lx=!it.f&&!it.iso&&!it.test&&D.ex[it.k+"#"+v],lt=lastTxt(it,v,lx);if(lt) h+='<div class="c muted lastv">last: '+esc(lt)+'</div>';
  if(it.anc) h+='<div class="anc"><span class="ancb">⚓ '+esc(W("anchor"))+'</span> Same every week, so it keeps growing.</div>';
  if(it.c) h+='<div class="c">'+esc(it.c)+'</div>';
  var tn=termNote(o.n+" "+tg+" "+(it.c||"")),hw=((pc?"":howto(o.n))+(tn?" "+tn:"")).trim(); if(hw) h+='<details class="how"><summary>How?</summary><p>'+esc(hw)+'</p></details>';
  if(g&&g.note) h+='<div class="c gold">'+esc(g.note)+'</div>';
  if(g&&g.ladC) h+='<div class="c gold ladc">'+esc(g.ladC)+'</div>';
  if(g&&g.lad) h+='<div class="c"><button type="button" class="lnk nxv lad" data-a="lad" data-id="'+id+'" data-v="'+v+'">→ Next step: '+esc(LADN[g.lad])+'</button></div>';
  if(g&&g.top&&!wOn(it,v)){var nv=nextVar(it,v,loc);if(nv>=0)h+='<div class="c"><button type="button" class="lnk nxv" data-a="nxv" data-id="'+id+'" data-v="'+nv+'">→ Next variation: '+esc(it.opts[nv].n)+'</button></div>';}
  h+=extra;
  if(!it.f){ h+='<div class="inp">';
    if(wOn(it,v)&&!it.iso&&!it.test) h+='<label>kg<input type="number" step="0.5" inputmode="decimal" data-inp="w" data-id="'+id+'" value="'+esc(inp.w)+'" placeholder="'+(g.w||"")+'"></label>';
    h+=setBoxes(id,n,inp,g.r,isS,rest,last)+'</div>'; }
  var isFav=(D.fav||[]).indexOf(o.n)>=0,pl=!it.f&&!it.test&&!it.iso;
  var mn=(pl&&!it.kx?'<button type="button" class="lnk fv'+(isFav?" on":"")+'" data-a="fav" data-n="'+esc(o.n)+'" aria-pressed="'+isFav+'">'+(isFav?"★ Favourite":"☆ Favourite")+'</button>':'')+
    (it.add?'<button type="button" class="lnk" data-a="addrm" data-id="'+id+'">✕ Remove</button>':'<button type="button" class="lnk" data-a="skip" data-id="'+id+'">Skip</button>'+(pl&&!(b&&(b.rehab||b.warm||b.cool))?'<button type="button" class="lnk nv" data-a="never" data-n="'+esc(o.n)+'">⊘ Never suggest</button>':''));
  h+='<div class="acts">'+(it.f?holdBtn(tg):'')+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="'+id+'">⇄ Swap</button>':'')+'<details class="mnu"><summary aria-label="More actions for '+esc(o.n)+'">⋯</summary><div class="mnub">'+mn+'</div></details></div>';
  return h+'</div></div>';
}
function blockHTML(b,bi,id,dy,loc,c,first){
  var vis=[];b.items.forEach(function(it,ii){if(curVar(it,loc)>=0)vis.push(ii);});
  if(!vis.length) return "";
  var n=0,dn=0,rows=vis.map(function(ii,k){var iid=id+"-"+bi+"-"+ii;var r=itemHTML(b.items[ii],iid,dy,loc,b,c,id,k===vis.length-1);if(r){n++;if(dy.done[iid]||dy.skip[iid]||(!b.rehab&&painHit(b.items[ii].opts[curVar(b.items[ii],loc)].n)))dn++;}return r;}).join("");
  var key=id+"-"+bi, op=dy.open&&dy.open[key]!=null?dy.open[key]:first;
  /* A-025: emphasis exercises may carry fewer sets than the block (it.ts), then the tag shows the range. */
  var rr=b.rounds?b.items.filter(function(it){return curVar(it,loc)>=0;}).map(function(it){return setsOf(it,b,c,id);}):[],rlo=rr.length?Math.min.apply(null,rr):0,rhi=rr.length?Math.max.apply(null,rr):0;
  var ser=b.ser&&b.items.some(function(it){return it.anc;});
  var kind=ser?'<span class="kind">Anchor set by set · '+(rlo&&rlo<rhi?rlo+"–"+rhi:(rhi||rounds(b,c,id)))+' sets</span>':b.rounds?'<span class="kind z">Circuit · '+(rlo&&rlo<rhi?rlo+"–"+rhi:(rhi||rounds(b,c,id)))+' rounds</span>':(b.rest?'<span class="kind">Set by set</span>':'');
  return '<details class="blk'+(dn===n?" fin":"")+'" data-blk="'+key+'"'+(op?" open":"")+'><summary><span class="bn">'+esc(b.name)+'</span><span class="bc">'+(dn===n?"✓":dn+"/"+n)+'</span><span class="bi">'+kind+esc(b.info||"")+'</span><span class="bx">'+esc(vis.map(function(ii){var it=b.items[ii];return it.opts[curVar(it,loc)].n;}).join(" · "))+'</span></summary>'+(termNote(b.name+" "+(b.info||""))?'<p class="hint">'+esc(termNote(b.name+" "+(b.info||"")))+'</p>':'')+(ser?'<p class="hint">Anchor first: all its sets, full rest after each. Then the other exercises once back to back, rest, repeat. Enter each set in the boxes.</p>':'')+(b.rounds&&!ser?'<p class="hint">Do all exercises once back to back, then rest. That is one round. Enter each round in the boxes.</p>':'')+rows+'</details>';
}
function absHTML(ab,dy,loc,first){
  var A=ABS[ab.i],on=!!dy.done["abs-T"],run=TB!==null;
  var h='<details class="blk'+(on?" fin":"")+'" data-blk="abs" '+((dy.open&&dy.open.abs!=null?dy.open.abs:!!first)||run?"open":"")+'><summary><span class="bn">Core Blitz · '+esc(D.kickDays.length?A.n:A.n.replace(/ \(kickboxing\)/,""))+'</span><span class="bc">'+(on?"✓":"")+'</span><span class="bi"><span class="kind z">Blitz</span>'+ab.rounds+' × 20 s work, 10 s rest · '+(ab.rounds/2)+' min · two exercises alternating</span><span class="bx">'+esc(A.items.map(function(it){return it.opts[curVar(it,loc)].n;}).join(" · "))+'</span></summary>';
  A.items.forEach(function(it,ii){var v=curVar(it,loc),a=avail(it,loc);
    h+='<div class="ex"><span class="num">'+(ii?"B":"A")+'</span><div class="exb"><div class="tgrow"><span class="n">'+esc(it.opts[v].n)+'</span>'+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="abs-'+ab.i+'-'+ii+'">⇄ Swap</button>':'')+'</div><div class="c">'+esc(it.c)+'</div>'+(howto(it.opts[v].n)?'<details class="how"><summary>How?</summary><p>'+esc(howto(it.opts[v].n))+'</p></details>':'')+'</div></div>';});
  h+='<div class="tb"><div class="tbbox" id="tbbox"'+(run?'':' hidden')+'><span class="eyebrow" id="tbp">Ready</span><span class="tbt" id="tbt">5</span><span class="muted" id="tbn"></span></div>'+
     (run?'<button type="button" class="b wide" data-a="tbstop">Cancel</button>':'<button type="button" class="b red wide" data-a="tbgo" data-r="'+ab.rounds+'" data-i="'+ab.i+'">'+(on?"Start again":"Start Blitz")+'</button>'+(on?'':'<button type="button" class="lnk" data-a="tbdone">Mark as done without the timer</button>'))+'</div>';
  return h+'</details>';
}
/* A-038: last entry of a session id, scanned from the end (rounds() runs for every item). */
function lastOf(id){for(var i=D.logs.length-1;i>=0;i--)if(D.logs[i].id===id)return D.logs[i];return undefined;}
function rounds(b,c,id){
  if(!b.rounds) return 0;
  var last=lastOf(id);
  if(b.tr!=null) return b.tr;
  /* Limited time and a session at the limit last time stay hard limits; level and cycle week give way to the band (P-5). */
  /* A-041: the stand of the block's own axis (upper or lower), not one overall level. */
  var st=bStand(b),rd=rdDay(),lim=D.short||(last&&(last.rpe||0)>=10)||cbInfo(TODAY).low,base=(c.cyc<=2||lim||st===0)?b.rounds[0]:b.rounds[1];
  if(lim||b.rounds[0]===b.rounds[1]||b.vb0)return base;
  /* A-025 (concept 5.3): at stand 0 the band may only lower, never raise. */
  var vb=volBias(b);if(rd===1&&st>0&&vb>=0)return b.rounds[1];if(rd===3)return base;
  /* A-042: in the skill block the band stays at its lower edge – low count unless the legs + hinge floor needs a round */
  if(accNow()==="skill")return vb>0&&st>0&&legLow(b)?b.rounds[1]:b.rounds[0];
  return vb>0&&st>0?b.rounds[1]:(vb<0?b.rounds[0]:base);
}
function pace(l){var p=l.min/l.km;return Math.floor(p)+":"+pad(Math.round((p%1)*60)%60)+"/km";}
function trainId(dy){var loc=D.loc,list=loc==="g"?GYM:HOME;
  if(dy.pick&&list.indexOf(dy.pick)>=0) return {id:dy.pick,rec:null};
  var t=recTrain(TODAY,loc,dy.noKick); return {id:t.id,rec:{why:[t.why]}};
}
function kickSel(id){return '<div class="seg wd" id="'+id+'" role="group" aria-label="Kickboxing days">'+[["Mo",1],["Tu",2],["We",3],["Th",4],["Fr",5],["Sa",6],["Su",0]].map(function(x){var on=D.kickDays.indexOf(x[1])>=0;return '<button type="button" class="b'+(on?" on":"")+'" data-a="kickday" data-v="'+x[1]+'" aria-pressed="'+on+'">'+x[0]+'</button>';}).join("")+'</div><p class="hint">Pick several days if you like. None selected = no fixed class.</p>';}
var FOC=[["bal","Balanced","Strength, skills and running in balance. 3 strength sessions, 2–3 runs."],["str","Strength & skills","No running in the plan. Up to 4 strength sessions, skill technique in between."],["run","Runner","3–5 runs with intervals and a long run. Strength twice a week as armour."]];
function focusHTML(pre,only){
  var h='<fieldset class="fs"><legend>Focus</legend>'+FOC.map(function(x){var on=D.focus===x[0];return '<label class="optc"><input type="radio" name="'+pre+'_focus" value="'+x[0]+'" data-a="focus"'+(on?" checked":"")+'><span><b>'+x[1]+'</b><span class="muted">'+x[2]+'</span></span></label>';}).join("")+'</fieldset>';
  return only?h:h+skillsHTML(pre);}
function skillsHTML(pre){var h='';
  h+='<fieldset class="fs"><legend>Skills</legend><p class="muted">One skill gets more time in every session. Several skills take turns: whatever rested longest comes first.</p>'+
    [["hs","Handstand"],["mu","Muscle-Up"],["ls","L-Sit"],["fl","Front Lever"],["pl","Planche"]].map(function(x){return '<label class="chk"><input type="checkbox" data-a="skill" data-k="'+x[0]+'"'+(D.skills[x[0]]?" checked":"")+'>'+x[1]+'</label>'+
      (x[0]==="fl"&&D.skills.fl?stageSel(pre,"flSt","Front lever stage",FLN):"")+(x[0]==="pl"&&D.skills.pl?stageSel(pre,"plSt","Planche stage",PLN):"");}).join("")+'</fieldset>';
  return h;}
function stageSel(pre,k,lab,names){return '<div class="row sub2"><label class="lab" for="'+pre+'_'+k+'">'+lab+'</label><select id="'+pre+'_'+k+'" data-a="stage" data-k="'+k+'">'+names.map(function(n,i){return '<option value="'+i+'"'+((D.profile[k]||0)===i?" selected":"")+'>'+n+(i===0?" (entry)":"")+'</option>';}).join("")+'</select></div>';}
function profGrid(list,pre){var p=D.profile;return '<div class="grid2">'+list.map(function(x){return '<label for="'+pre+x[0]+'">'+x[1]+'</label><input type="number" id="'+pre+x[0]+'" inputmode="numeric" min="0" data-prof="'+x[0]+'" value="'+Math.round(p[x[0]]*10)/10+'">';}).join("")+'</div>';}
function lvlNote(){var L=lvl(),e=emph(),mu=D.skills&&D.skills.mu,t;
  if(e==="glutes")t=L===0?"Glute strength comes first; the upper body starts with easy variations":"Glute strength leads, the upper body keeps building";
  else if(e==="lower")t=L===0?"Legs and glutes come first; the upper body starts with easy variations":"Legs and glutes lead, the upper body keeps building";
  else if(e==="core")t=L===0?"Core strength first, plus the pull-up and dip base":"Core strength leads, pulling and pushing keep building";
  else t=L===0?"Build the pull-up and dip base first":(mu?(L===2?"Muscle-ups get built up":"Building toward the muscle-up"):(L===2?"Advanced pulling and pushing":"Building pulling and pushing strength"));
  return 'Your level: Upper <b>'+LVN[lvUp()]+'</b> · Lower <b>'+LVN[lvLo()]+'</b> · '+t;}
var STARTP={s0:["Just starting","No pull-ups yet, a few push-ups. Totally fine: the app starts gently.",{pull:0,dips:0,push:5,expl:0,mu:0,hsw:0,hsf:0,pike:0,tuck:5,lsit:0,hang:15}],
  s1:["Some training","A few pull-ups and push-ups, some gym experience.",{pull:5,dips:8,push:15,expl:2,mu:0,hsw:20,hsf:0,pike:6,tuck:15,lsit:0,hang:30}],
  s2:["Experienced","Solid pull-ups and dips, working on skills.",{pull:12,dips:20,push:30,expl:6,mu:2,hsw:45,hsf:5,pike:12,tuck:30,lsit:10,hang:60}]};
/* ================= Goals (P-1) =================
   Exactly one active goal (D.goal); a reached or ended goal goes to the archive D.goalsDone. One tap on a catalogue chip sets
   a complete goal (target from GOALS, value and date only via "Adjust"). Progress is read from values that exist anyway:
   profile (tests, holds, stages), exercise history D.ex / records D.pr (kg) and run records, so it needs no extra tap.
   D.goal = {k:key, v:target, b:value when set, s:date set, d:optional date, h:[[date,value]] check values, st:steps done}. */
var GOALS={
  mu:{n:"Muscle-Up",g:"s",u:"reps",p:"mu",sk:"mu"},
  hs:{n:"Freestanding handstand",g:"s",u:"s",p:"hsf",sk:"hs"},
  fl:{n:"Front lever",g:"s",u:"stage",p:"flSt",sk:"fl"},
  pl:{n:"Planche",g:"s",u:"stage",p:"plSt",sk:"pl"},
  ls:{n:"L-sit",g:"s",u:"s",p:"lsit",sk:"ls"},
  pull:{n:"Pull-ups",g:"r",u:"reps",p:"pull"},
  dips:{n:"Dips",g:"r",u:"reps",p:"dips"},
  push:{n:"Push-ups",g:"r",u:"reps",p:"push"},
  sq:{n:"Back squat",g:"k",u:"kg",rx:/^Barbell back squat$/i},
  ht:{n:"Hip thrust",g:"k",u:"kg",rx:/^Barbell hip thrust$/i},
  rdl:{n:"Romanian deadlift",g:"k",u:"kg",rx:/^Romanian deadlift$/i},
  d5:{n:"Run 5 km",g:"d",u:"km",km:5},d10:{n:"Run 10 km",g:"d",u:"km",km:10},d21:{n:"Run 21 km",g:"d",u:"km",km:21},
  d25:{n:"Run 25 km",g:"d",u:"km",km:25},d30:{n:"Run 30 km",g:"d",u:"km",km:30},d42:{n:"Run 42 km",g:"d",u:"km",km:42},
  t5:{n:"5 km under",g:"t",u:"min",km:5},t10:{n:"10 km under",g:"t",u:"min",km:10}};
var GOALQ=[["mu","Muscle-Up"],["hs","Handstand"],["fl","Front lever"],["pull","Pull-ups"],["legs","Strong legs"],["d5","Run 5 km"],["d10","Run 10 km"]];
var GOALG=[["Skills",["mu","hs","fl","pl","ls"]],["Strength",["pull","dips","push","sq","ht","rdl"]],["Running",["d5","d10","d21","d25","d30","d42","t5","t10"]]];
/* ===== A-040 next goal (L7, part 1): after a reached goal the Today page offers two goals and "No goal" in one tap: the next
   stage of the same goal and a related goal (D.goalNext = [{k,v},{k,v}], cleared by the choice). Run distances form a chain
   5 → 10 → 21 → 25 → 30 → 42 km, then time goals. A goal that would already be met is never offered. */
var GCHAIN={d5:"d10",d10:"d21",d21:"d25",d25:"d30",d30:"d42",d42:"t10"};
var GREL={mu:"fl",fl:"pl",pl:"hs",hs:"ls",ls:"mu",pull:"dips",dips:"pull",push:"dips",sq:"rdl",ht:"sq",rdl:"ht",d5:"t5",d10:"t10",d21:"t10",d25:"t10",d30:"t10",d42:"t5",t5:"d10",t10:"d21"};
function gUp(k,v){var G=GOALS[k];if(!G)return null;
  if(own(GCHAIN,k))return {k:GCHAIN[k],v:goalDef(GCHAIN[k])};
  if(k==="mu")return {k:k,v:v<3?3:v+2};if(k==="hs")return {k:k,v:v+10};if(k==="ls")return {k:k,v:v+5};
  if(G.u==="stage")return v>=4?null:{k:k,v:v+1};if(k==="pull"||k==="dips")return {k:k,v:v+5};if(k==="push")return {k:k,v:v+10};
  if(G.g==="k")return {k:k,v:Math.max(r25(v*1.1),v+2.5)};if(G.g==="t")return {k:k,v:Math.max(1,Math.floor(v*0.95*2)/2)};return null;}
function gOpen(x){return x&&GOALS[x.k]&&!goalMet(x);}
function goalNextOf(g){var out=[],a=gUp(g.k,g.v),i=0;
  while(a&&!gOpen(a)&&i++<12)a=a.k===g.k||own(GCHAIN,a.k)?gUp(a.k,a.v):null;if(gOpen(a))out.push(a);
  var r=GREL[g.k],j=0;while(r&&j++<6){var b={k:r,v:goalDef(r)};if(gOpen(b)&&!out.some(function(x){return x.k===b.k;})){out.push(b);break;}r=GREL[r];}
  return out.slice(0,2);}
function goalNextHTML(){var a=D.goal?[]:(D.goalNext||[]).filter(gOpen);if(!a.length)return "";
  return '<div class="sec gnext" role="group" aria-label="Next goal"><p class="eyebrow">'+esc(W("gdone"))+' · Next '+esc(W("goal").toLowerCase())+'?</p><div class="chips">'+a.map(function(x,i){return '<button type="button" class="chip" data-a="gnext" data-k="'+i+'">'+esc(goalName(x))+'</button>';}).join("")+'<button type="button" class="chip" data-a="gnext" data-k="none">No goal</button></div></div>';}
/* ===== A-040 standstill without a goal: the same answer as with a goal (plateau doctrine A-035), per exercise. A check is a
   strength log of the exercise (not past-day, comeback or simulated logs), at most one per training week; 3 checks without
   beating the best so far and at least 21 days since the last progress (paused days not counted) → one measure: high load →
   easy week, else +2 sets a week for its movement pattern (while the checks stay without progress, about 3 weeks); 6 checks
   and 42 days → swap the variation. A bodyweight exercise at the top of its range is the ladder's job (A-039), not a plateau.
   Computed from the logs (no field), kept per day and entries. */
var NGC={k:"",D:null,r:null},HIK=null;
function hiOf(k){if(!HIK){HIK={};var c=favCatalog();Object.keys(c).forEach(function(n){var it=c[n].it;if(it.k&&it.hi!=null&&!own(HIK,it.k))HIK[it.k]=it.hi;});}return own(HIK,k)?HIK[k]:null;}
function plNoGoal(){if(D.goal||holdOn("str"))return null;var L=D.logs,ln=L.length,ky=TODAY+"|"+ln+"|"+(ln?L[ln-1].d+L[ln-1].id:"");if(NGC.k===ky&&NGC.D===D)return NGC.r;
  var from=addD(TODAY,-180),i0=ln;while(i0>0&&L[i0-1].d>=from)i0--;var per={};
  for(var i=i0;i<ln;i++){var l=L[i];if(!STR[l.id]||l.bl||l.cb||l.sim||!l.ex||l.d>TODAY)continue;var wk=blkStart(l.d);
    for(var q in l.ex){if(!own(l.ex,q))continue;var e=l.ex[q],pk=patKey(q.split("#")[0]);if(!own(PATK,pk)||!Array.isArray(e))continue;var sc=(+e[1]||0)*1000+(+e[0]||0),a=per[q]||(per[q]=[]),z=a[a.length-1];
      if(z&&z.wk===wk){if(sc>z.sc)z.sc=sc;}else a.push({wk:wk,d:l.d,sc:sc,bk:blkNo(l.d)});}}
  var best=null;Object.keys(per).forEach(function(q){var a=per[q];if(a.length<4||diff(a[a.length-1].d,TODAY)>21)return;
    var st=D.ex[q],k0=q.split("#")[0],hi=hiOf(k0);if(st&&!(st.w>0)&&hi!=null&&st.r>=hi)return;
    /* A-051 (M-1): after an accent change (new block) or a real pause (gap ≥ 14 days) the comparison starts anew: a value
       lowered on purpose there (new range, step back) becomes the new mark and is no standstill check. */
    var b=a[0].sc,lp=a[0].d,np=0,fr=0;for(var j=1;j<a.length;j++){var nw=a[j].bk!==a[j-1].bk||gapDays(a[j-1].d,a[j].d)>=14;
      if(a[j].sc>b){b=a[j].sc;lp=a[j].d;np=0;fr=0;}else if(a[j].sc<b&&(nw||fr)){b=a[j].sc;fr=nw?1:0;}else{np++;fr=0;}}
    var age=diff(lp,TODAY)-pausedIn(lp,TODAY);if(np<3||age<21)return;
    if(!best||np>best.np||(np===best.np&&lp<best.lp))best={q:q,n:st&&st.n||q,p:PATK[patKey(k0)],np:np,lp:lp,age:age};});
  if(best)best.pm=best.np>=6&&best.age>=42?"v":(loadHigh()?"e":"s");
  NGC={k:ky,D:D,r:best};return best;}
function goalKg(rx){var m=0;[D.ex,D.pr].forEach(function(o){Object.keys(o||{}).forEach(function(k){var e=o[k];if(e&&e.n&&rx.test(e.n)&&+e.w>m)m=+e.w;});});return m;}
function goalCur(k){var G=GOALS[k];if(!G)return 0;
  if(G.p)return +D.profile[G.p]||0;
  if(G.g==="k")return goalKg(G.rx);
  if(G.g==="d")return +((D.pr["run:long"]||{}).km)||0;
  return +((D.pr["run:t"+G.km]||{}).min)||0;}
function goalDef(k){var G=GOALS[k],c=goalCur(k);if(!G)return 0;
  if(k==="mu")return c>=1?c+1:1;
  if(k==="hs")return c>=10?c+10:10;
  if(k==="ls")return c>=10?c+5:10;
  if(k==="fl")return Math.min(4,Math.max(1,c+1));
  if(k==="pl")return Math.min(4,Math.max(1,c+1));
  if(k==="pull")return c<1?1:c+5;
  if(k==="dips")return c<1?5:c+5;
  if(k==="push")return c+10;
  if(G.g==="k")return c?Math.max(r25(c*1.1),c+2.5):20;
  if(G.g==="d")return G.km;
  return c?Math.floor(c*0.95):(G.km===5?30:60);}
function goalLow(k){return GOALS[k]&&GOALS[k].g==="t";}
function goalMet(g){var c=goalCur(g.k);return goalLow(g.k)?(c>0&&c<=g.v):c>=g.v;}
function goalName(g){var G=GOALS[g.k];if(!G)return "";if(G.g==="t")return G.n+" "+fmtKg(g.v)+" min";if(G.g==="d")return G.n;
  if(G.g==="r")return G.n+" × "+g.v;if(G.g==="k")return G.n+" "+fmtKg(g.v)+" kg";if(G.u==="stage")return G.n+": "+(G.p==="flSt"?FLN:PLN)[g.v];
  if(G.u==="s")return G.n+" "+g.v+" s";return G.n+(g.v>1?" × "+g.v:"");}
/* Milestones: skills follow their own ladder, numbers rise in even steps from the value when the goal was set. */
function goalSteps(g){var G=GOALS[g.k],p=D.profile,out=[];if(!G)return out;
  function st(c,v,l,lo){out.push({c:c,v:v,l:l,lo:!!lo,ok:lo?(c>0&&c<=v):c>=v});}
  if(g.k==="mu"){st(p.pull,8,"pull-ups");st(p.expl,5,"explosive pull-ups");st(p.negmu,3,"negative muscle-ups");st(p.mu,g.v,g.v>1?"muscle-ups":"muscle-up");}
  else if(g.k==="hs"){st(p.hsw,30,"s chest-to-wall");st(p.hsw,60,"s chest-to-wall");if(g.v>5)st(p.hsf,5,"s freestanding");st(p.hsf,g.v,"s freestanding");}
  else if(g.k==="ls"){st(p.tuck,15,"s tuck L-sit");if(g.v>5)st(p.lsit,5,"s L-sit");st(p.lsit,g.v,"s L-sit");}
  else if(G.u==="stage"){var N=G.p==="flSt"?FLN:PLN;for(var i=1;i<=g.v;i++)out.push({c:p[G.p]||0,v:i,l:N[i],ok:(p[G.p]||0)>=i,stage:1});}
  else{var c=goalCur(g.k),b=+g.b||0,lo=goalLow(g.k),n=G.g==="d"?5:4,seen={};
    for(var j=1;j<=n;j++){var v=G.g==="d"?Math.round(G.km*j/n*10)/10:(lo?(b?b-(b-g.v)*j/n:g.v):b+(g.v-b)*j/n);
      v=G.g==="k"?r25(v):(G.g==="t"?Math.round(v*2)/2:(G.g==="d"?v:Math.round(v)));if(j===n)v=g.v;
      if(seen[v]||(!lo&&G.g!=="d"&&v<=b&&j<n))continue;seen[v]=1;st(c,v,G.u==="reps"?G.n.toLowerCase():G.u,lo);}}
  return out;}
function goalPos(g){var s=goalSteps(g),i=0;while(i<s.length&&s[i].ok)i++;return {s:s,done:i,cur:s[Math.min(i,s.length-1)]};}
function goalVal(x){return x.stage?(x.ok?"done":"next "+x.l):(x.lo?(x.c?fmtKg(x.c):"–")+" / "+fmtKg(x.v)+" min":fmtKg(Math.round(x.c*10)/10)+"/"+fmtKg(x.v)+" "+x.l);}
function goalLine(){var g=D.goal;if(!g||!GOALS[g.k])return "";var q=goalPos(g),n=q.s.length,c=q.cur;
  var tail=c.stage?(c.ok?"stage reached":"next "+c.l):goalVal(c);
  var tr=gTrend();return esc(W("goal"))+': '+esc(goalName(g))+' · step '+Math.min(n,q.done+1)+' of '+n+' · '+esc(tail)+(tr?' · '+tr:'');}
function setGoal(k){D._gmsg="";D.goalNext=[];if(k==="none"||!k){D.goal=null;return;}
  if(k==="legs")k=emph()==="glutes"?"ht":"sq";if(!GOALS[k])return;
  var G=GOALS[k],c=goalCur(k);D.goal={k:k,v:goalDef(k),b:c,s:TODAY,h:[[TODAY,c]]};if(G.g==="k"&&!c)D.goal.nb=1;D.goal.st=goalPos(D.goal).done;D.goal.s0=D.goal.st;
  if(G.sk&&!D.skills[G.sk]){D.skills[G.sk]=true;D._gmsg=SKN[G.sk]+" was added to your skills.";}}
/* After every log: record a new check value, toast a new milestone, archive a reached goal (passive, no extra tap). */
/* P-5 plateau at the goal value, A-035 (H-2) definition: a check is only a session in which the goal value is measurable:
   the Skill Trial or the test day (skill and rep goals), the goal anchor logged at the top of its range (rep and kg goals),
   for run goals a run as before. Logged past days (bl), comeback sessions and other logs are no check; at most 1 check per
   training week (weeks from D.start, g.cw). 3 checks without beating the best value so far, and at the earliest 3 weeks
   after the goal was set or last moved (g.lp, paused days not counted) → exactly one measure: load high → easy week; load
   normal → +2 sets per week for the goal pattern for 3 weeks; progress inside that boost extends it once, to at most 6 weeks
   in all (pk), never for good. The swap advice comes at 6 checks and at the earliest 6 weeks without progress. Passive: one
   line on the Today page. */
function goalBest(g){var v=(g.h||[]).map(function(x){return x[1];}).concat([g.b||0]);
  if(goalLow(g.k)){v=v.filter(function(x){return x>0;});return v.length?Math.min.apply(null,v):Infinity;}return Math.max.apply(null,v);}
function goalIsCheck(g,lg){if(!lg||lg.bl||lg.sim||lg.cb)return false;var t=GOALS[g.k].g;if("srk".indexOf(t)<0)return isRun(lg);
  if(t!=="k"&&(lg.id==="CH"||lg.id==="TE"))return true;if(t==="s"||!GANCH[g.k])return false;
  var a=GANCH[g.k](),hit=false;Object.keys(lg.ex||{}).forEach(function(q){var e=lg.ex[q];if(patKey(q.split("#")[0])===a.k&&Array.isArray(e)&&+e[0]>=a.hi)hit=true;});return hit;}
/* Plateau age: days since the goal was set or last moved forward, paused days not counted. */
/* A-045 (L7 part 2): hold mode per area (strength, running, skills), off by default under Extras. About a third fewer sets
   or kilometres with the same load and intensity: a third to a ninth of the building volume kept strength and size over
   32 weeks [Q56]; volume may drop when intensity is kept [Q57]. No standstill step back, no plateau line, no ladder offers,
   no level-up toast. */
function holdOn(a){return !!(D.hold&&D.hold[a]===true);}
function goalArea(){return gRun()?"run":gSkill()?"sk":"str";}
function holdSk(s){if(!holdOn("sk"))return;s.blocks.forEach(function(b){if(!(b.skill||b.hsb))return;if(b.rounds)b.rounds=[Math.max(2,Math.round(b.rounds[0]*2/3)),Math.max(2,Math.round(b.rounds[1]*2/3))];
  b.items=b.items.map(function(it){var n=parseInt(String(it.sets),10);if(it.f||it.iso||it.test||isNaN(n)||n<=2)return it;var x=Object.assign({},it);x.sets=Math.max(2,Math.round(n*2/3));return x;});b.hold=1;});}
function plAge(g){var d=g.lp&&g.lp>g.s?g.lp:g.s;return diff(d,TODAY)-pausedIn(d,TODAY);}
function loadHigh(){var ls=loadStat();return (ls.n>=2&&ls.avg>0&&ls.cur>1.5*ls.avg)||hist(addD(TODAY,1)).lim7>=2;}
function plStep(g,c,best){/* progress is measured against the value at the last check (g.ck), so a value that moved up through training logs
     in between still counts as progress at the next check */var ref=g.ck!=null?g.ck:(+g.b||0),up=goalLow(g.k)?(c>0&&(!ref||c<ref)):c>ref;
  if(c>0||!goalLow(g.k))g.ck=goalLow(g.k)?(ref?Math.min(ref,c):c):Math.max(ref,c);
  if(up){if(g.pz&&pzAge(g)<21)g.pk=1;g.np=0;g.lp=TODAY;delete g.pm;return;}
  g.np=Math.min(99,(g.np||0)+1);
  if(!g.pm&&g.np>=3&&plAge(g)>=21){if(loadHigh())g.pm="e";else{g.pm="s";g.pz=TODAY;delete g.pk;}}
  else if(g.pm&&g.pm!=="v"&&g.np>=6&&plAge(g)>=42)g.pm="v";}
function platHTML(){var g=D.goal;if(g?holdOn(goalArea()):holdOn("str"))return "";if(!g){var ng=plNoGoal();if(!ng)return "";
    var tn=ng.pm==="e"?"Take an easy week first: More → "+W("easy")+".":(ng.pm==="s"?"Its movement gets 2 extra sets a week for the next 3 weeks.":"Swap the variation of "+ng.n+" for a while.");
    return '<p class="gplat" role="status"><b>'+esc(W("plat"))+'</b> · '+esc(ng.n)+': '+ng.np+' checks without progress. '+esc(tn)+'</p>';}
  if(!GOALS[g.k]||!(g.np>=3)||!g.pm)return "";
  var t=g.pm==="e"?"Take an easy week first: More → "+W("easy")+".":(g.pm==="s"?(goalPat()?"Your goal exercise gets 2 extra sets a week for 3 weeks.":"Add one more easy run a week for the next 3 weeks."):"Swap the variation of your goal exercise for a while.");
  return '<p class="gplat" role="status"><b>'+esc(W("plat"))+'</b> · '+g.np+' checks without progress. '+esc(t)+'</p>';}
function goalCheck(lg){var g=D.goal;if(!g||!GOALS[g.k])return "";var c=goalCur(g.k),h=g.h||(g.h=[]),m="",best=goalBest(g);
  /* A-035 (N-11): a kg goal set without any history takes its start value from the first logs, so the first log can never
     meet it at once; a target at or under that start moves up like a fresh goal would. */
  if(g.nb){if(!(c>0))return "";delete g.nb;g.b=c;g.ck=c;g.h=[[TODAY,c]];if(g.v<=c)g.v=Math.max(r25(c*1.1),c+2.5);g.st=goalPos(g).done;return "";}
  if(goalIsCheck(g,lg)&&!holdOn(goalArea())){var wk=blkStart(lg.d||TODAY);if(g.cw!==wk){g.cw=wk;plStep(g,c,best);}}
  if(!h.length||h[h.length-1][1]!==c){if(h.length&&h[h.length-1][0]===TODAY)h[h.length-1][1]=c;else h.push([TODAY,c]);if(h.length>12)h.splice(0,h.length-12);}
  if(goalMet(g)){(D.goalsDone=D.goalsDone||[]).push({k:g.k,v:g.v,d:TODAY,r:"f"});if(D.goalsDone.length>30)D.goalsDone.splice(0,D.goalsDone.length-30);D.goal=null;
    D.goalNext=goalNextOf(g);return W("gdone")+": "+goalName(g)+"."+(D.goalNext.length?" Your next goal is one tap on Today.":" Choose your next goal under More.");}
  var q=goalPos(g);if(q.done>(g.st||0)){m=W("gstep")+" "+q.done+" of "+q.s.length+": "+(q.s[q.done-1].stage?q.s[q.done-1].l:goalVal(q.s[q.done-1]))+".";}
  g.st=q.done;return m;}
function goalChips(list){var cur=D.goal?D.goal.k:"";return '<div class="chips">'+list.map(function(x){var k=x[0],on=k==="none"?!D.goal:(k==="legs"?(cur==="sq"||cur==="ht"):cur===k);
  return '<button type="button" class="chip'+(on?" on":"")+'" data-a="goal" data-k="'+k+'" aria-pressed="'+on+'">'+esc(x[1])+'</button>';}).join("")+'</div>';}
function goalInp(pre,k,v,d,attr){var G=GOALS[k],lab=G.u==="stage"?"Target stage":(G.g==="t"?"Target time (min)":"Target ("+G.u+")"),h='';
  if(G.g!=="d")h+='<label for="'+pre+'_gv">'+lab+'</label>'+(G.u==="stage"?'<select id="'+pre+'_gv"'+attr+'>'+(G.p==="flSt"?FLN:PLN).map(function(n,i){return i?'<option value="'+i+'"'+(v===i?" selected":"")+'>'+n+'</option>':'';}).join("")+'</select>'
    :'<input type="number" id="'+pre+'_gv" inputmode="decimal" min="0" step="'+(G.g==="k"?"2.5":(G.g==="r"||G.u==="reps"?"1":"0.5"))+'"'+attr+' value="'+v+'">');
  return '<div class="grid2">'+h+'<label for="'+pre+'_gd">Date (optional)</label><input type="date" id="'+pre+'_gd"'+attr.replace('"v"','"d"')+' min="'+addD(TODAY,1)+'" value="'+(d||"")+'"></div>';}
function goalAdjust(pre){var g=D.goal;if(!g||!GOALS[g.k])return "";return '<div class="gadj">'+goalInp(pre,g.k,g.v,g.d,' data-goal="v"')+'</div>';}
/* Onboarding step 2 keeps its one tap; More uses the goal card (goalMore). */
function goalHTML(pre){var g=D.goal,h=goalChips(GOALQ.concat([["none","No goal yet"]]));
  if(g&&GOALS[g.k])h+='<p class="muted" role="status">'+esc(goalName(g))+(g.d?' · by '+dLab(g.d):'')+'. '+(D._gmsg?esc(D._gmsg)+' ':'')+'</p><details class="tv"><summary>Adjust number or date</summary>'+goalAdjust(pre)+'</details>';
  return h;}
/* A-028: the goal as a card. Current step in plain words, progress of that step and one dot per step. */
var GPN=["Skill","Strength","Running"];
function gpLab(k){var G=GOALS[k];return G.g==="t"?G.km+" km time":G.n;}
function gStepTxt(x){return x.stage?x.l:fmtKg(x.v)+" "+(x.lo?"min":x.l);}
function gFrac(x){return x.stage?(x.ok?1:0):(x.lo?(x.c?Math.max(0,Math.min(1,x.v/x.c)):0):Math.max(0,Math.min(1,x.v?x.c/x.v:0)));}
function gNow(x){return x.stage?(x.ok?"✓":"next"):(x.lo&&!x.c?"–":fmtKg(Math.round((+x.c||0)*10)/10))+"/"+fmtKg(x.v)+(x.lo?" min":"");}
function gBar(f){return '<svg class="bt" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true"><rect class="b0" x="0" y="0" width="100" height="12" rx="6"/><rect class="b1" x="0" y="0" width="'+(Math.round(f*1000)/10)+'" height="12" rx="6"/></svg>';}
function gDots(q){return '<span class="gdots" aria-hidden="true">'+q.s.map(function(x,i){return '<i class="'+(x.ok?"ok":(i===q.done?"now":""))+'"></i>';}).join("")+'</span>';}
function goalSum(g){var q=goalPos(g),n=q.s.length,i=Math.min(n,q.done+1);return {q:q,n:n,c:q.cur,txt:"Step "+i+" of "+n+" · "+gStepTxt(q.cur)};}
function goalBody(g){var z=goalSum(g),tr=gTrend();
  return '<span class="gnow">'+esc(z.txt)+'</span><span class="gprog">'+gBar(gFrac(z.c))+'<b>'+esc(gNow(z.c))+'</b></span>'+gDots(z.q)+(g.d||tr?'<span class="muted gby">'+(g.d?'By '+dLab(g.d):'')+(g.d&&tr?' · ':'')+esc(tr)+'</span>':'');}
function goalCard(){var g=D.goal;if(!g||!GOALS[g.k])return "";
  return '<button type="button" class="gcard gline" data-tab="stand"><span class="gtop"><span class="eyebrow">'+esc(W("goal"))+'</span><span class="muted">Details →</span></span><b class="gname">'+esc(goalName(g))+'</b>'+goalBody(g)+'</button>';}
function goalPick(gp){var h='<div class="gpick" role="group" aria-label="Choose a goal">';
  if(gp.c==null){h+='<p class="lab">Step 1 of 2 · What kind of goal?</p><div class="chips">'+GPN.map(function(n,i){return '<button type="button" class="chip" data-a="gpc" data-k="'+i+'">'+n+'</button>';}).join("")+'</div><div class="row"><button type="button" class="b" data-a="gpx">Cancel</button></div>';}
  else{h+='<p class="lab">Step 2 of 2 · '+GPN[gp.c]+' <button type="button" class="lnk" data-a="gpback">Change kind</button></p><div class="chips">'+GOALG[gp.c][1].map(function(k){var on=gp.k===k;return '<button type="button" class="chip'+(on?" on":"")+'" data-a="gpk" data-k="'+k+'" aria-pressed="'+on+'">'+esc(gpLab(k))+'</button>';}).join("")+'</div>';
    if(gp.k)h+='<p class="muted">'+esc(goalName({k:gp.k,v:gp.v}))+'</p>'+goalInp("gp",gp.k,gp.v,"","");
    h+='<div class="row"><button type="button" class="b red" data-a="gpsave"'+(gp.k?'':' disabled')+'>Save</button><button type="button" class="b" data-a="gpx">Cancel</button></div>';}
  return h+'</div>';}
function goalMore(){var g=D.goal,gp=D._gp,h='<div class="sec gsec"><h3>'+esc(W("goal"))+'</h3>',a=D.goalsDone||[];
  if(gp)h+=goalPick(gp);
  else if(g&&GOALS[g.k]){var op=!!D._gadj;h+='<div class="gcard gm"><b class="gname">'+esc(goalName(g))+'</b>'+goalBody(g)+'</div>'+(D._gmsg?'<p class="muted" role="status">'+esc(D._gmsg)+'</p>':'')+
    '<div class="row gact"><button type="button" class="b sm" data-a="gadj" aria-expanded="'+op+'">Adjust</button><button type="button" class="b sm" data-a="gpopen">Change goal</button><button type="button" class="b sm" data-a="goalx">Remove goal</button></div>'+(op?goalAdjust("m"):'');}
  else h+='<div class="gempty"><p>Optional: set a goal and the plan works toward it.</p><button type="button" class="b red" data-a="gpopen">'+esc(W("gset"))+'</button></div>';
  if(a.length)h+='<details class="tv garchd"><summary>Past goals ('+a.length+')</summary>'+goalArch()+'</details>';
  return h+'</div>';}
function gpSave(){var gp=D._gp;if(!gp||!gp.k||!GOALS[gp.k])return;var G=GOALS[gp.k],ve=document.getElementById("gp_gv"),de=document.getElementById("gp_gd");
  setGoal(gp.k);var g=D.goal;if(!g)return;
  var v=ve?num(ve.value):null;if(v!==null&&v>0)g.v=G.u==="stage"?Math.max(1,Math.min(4,Math.round(v))):Math.min(999,v);
  var d=de?de.value:"";if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&dOK(d)&&d>TODAY)g.d=d;
  g.st=goalPos(g).done;g.s0=g.st;D._gp=null;D._gadj=false;}
function goalArch(){var a=D.goalsDone||[];if(!a.length)return "";
  return '<ul class="garch">'+a.slice().reverse().slice(0,8).map(function(x){return '<li><b>'+esc(x.r==="f"?W("gdone"):"Ended")+'</b> · '+esc(goalName(x))+' · '+dLabY(x.d)+'</li>';}).join("")+'</ul>';}
/* ===== Goals II (P-2): the active goal steers selection, content and the date. Everything is gated on D.goal, so
   without a goal the plan is exactly the same as before. ===== */
function gKey(t){var g=D.goal;return g&&GOALS[g.k]&&(!t||t.indexOf(GOALS[g.k].g)>=0)?g.k:"";}
function gSkill(){return gKey("s");}
function gStr(){return gKey("rk");}
function gRun(){return gKey("dt");}
function gDays(s){var g=D.goal;return g&&g.d&&GOALS[g.k]?diff(s||TODAY,g.d):null;}
/* Taper: the last 7 days before the goal date (volume about −40–60 %, same intensity); the date itself is the test day. */
function gTaper(s){var x=gDays(s);return x!==null&&x>=1&&x<=7;}
/* A deload week within the last 10 days before the date is replaced by the taper. */
function gNear(s){var x=gDays(s);return x!==null&&x>=0&&x<=10;}
/* Feasibility (passive): the trend of the last 3 check values, carried forward to the date. */
function gTrend(){var g=D.goal;if(!g||!g.d||!g.h||g.h.length<3||goalMet(g))return "";var h=g.h.slice(-3),d0=h[0][0],t=diff(d0,h[2][0]);if(t<=0)return "";
  var sl=(h[2][1]-h[0][1])/t,pr=h[2][1]+sl*Math.max(0,diff(h[2][0],g.d));return (goalLow(g.k)?pr<=g.v:pr>=g.v)?"on course":"tight";}
/* Goal anchor for strength goals: early in the session (fresh), never trimmed by design(); upper-body goals ride on Strength
   A/B and home strength, leg goals on Strength C, home strength and every session that carries a leg block. */
var GANCH={
  pull:function(){return P("gl_pull",3,8,"reps","Full hang, chin over the bar, 1–2 reps in reserve",["Clean pull-ups|k","Band-assisted pull-ups|bk","Negative pull-ups, 5 s down|k"],"more reps, then a weight vest","4",[1,0]);},
  dips:function(){return P("gl_dip",4,10,"reps","Shoulders down, chest up, 1–2 reps in reserve",["Parallel bar dips","Dips between two chairs|s","Bench dips, feet on the floor|s"],"more reps, then a weight belt","4",[2,0]);},
  push:function(){return P("gl_push",8,20,"reps","Body in one line, chest to the floor",["Push-ups","Incline push-ups on a chair|s","Knee push-ups"],"more reps, then slower","4",[1,0]);},
  sq:function(){return P("gl_sq",5,8,"reps","Full depth, neutral back, 1–2 reps in reserve",["Barbell back squat|g|w","Goblet squat|d|w","Bulgarian split squat, foot on a chair|s"],"more weight","4");},
  ht:function(){return P("gl_ht",6,10,"reps","Chin tucked, squeeze the glutes 2 s at the top",["Barbell hip thrust|g|w","Single-leg hip thrust, shoulders on a chair|s","Single-leg glute bridge"],"more weight","4");},
  rdl:function(){return P("gl_rdl",6,10,"reps","Hips back, back long, bar close to the legs",["Romanian deadlift|g|w","Single-leg Romanian deadlift|d|w","Good mornings, hands behind head"],"more weight","4");}};
var GUP={pull:1,dips:1,push:1};
/* Upper-body sessions so far in this training week (weeks from D.start, like hist().legW). A-024: the Skill Trial no longer
   stands in for Strength C, so an upper-body goal also rides on Strength C while the week has fewer than 2 of them. */
function upWeek(s){var w0=addD(D.start,7*Math.floor(Math.max(0,diff(D.start,s))/7));return D.logs.filter(function(l){return l.d>=w0&&l.d<s&&{KA:1,KB:1,HO:1,CH:1}[l.id];}).length;}
function goalBlock(id,out){var k=gStr();if(!k)return;var up=GUP[k],ok=up?({KA:1,KB:1,HO:1,CH:1}[id]||(id==="KC"&&upWeek(TODAY)<2)):({KC:1,HO:1,CH:1}[id]||out.some(function(b){return b.legs||b.lowb;}));if(!ok)return;
  var it=GANCH[k]();it.gx=1;var v=curVar(it,LOC()),nm=v>=0?it.opts[v].n:"";
  /* A-032: a leg goal anchor rides on every session with leg work; Strength C (the leg day) keeps its 4 sets, the others 3. */
  if(!up&&id!=="KC")it.sets="3";
  out.forEach(function(b){if(b.warm||b.cool)return;b.items=b.items.filter(function(x){if(x.f||x.test||x.iso)return true;var w=curVar(x,LOC());return !(w>=0&&x.opts[w].n===nm);});});
  /* A leg goal is leg work itself: the compact leg block gives up its exercise for the same movement (the block still counts). */
  /* A-032 (M-3): also the main leg block of Strength C, so the goal anchor is not doubled by a second exercise of its pattern. */
  if(!up){var gg=kitGroup(it);out.forEach(function(b){if(!(b.legs||(id==="KC"&&b.name==="Legs"))||b.items.length<2)return;var j=-1;b.items.forEach(function(x,i){if(j<0&&!x.f&&kitGroup(x)===gg)j=i;});if(j>=0)b.items.splice(j,1);});}
  for(var j=out.length-1;j>=0;j--)if(!out[j].items.length)out.splice(j,1);
  var at=out.length&&out[0].warm?1:0;out.splice(at,0,{name:W("goal")+": "+GOALS[k].n,info:"Fresh and early in the session · 2–3 min rest",p:1,rest:150,gx:1,items:[it]});}
/* On the goal date: the test. Runs: the run itself; skills and strength: the Skill Trial (home: home strength). */
/* A-027: a goal test the pain table or a comeback week blocks is postponed (goalTick moves the date to tomorrow). */
function goalBlocked(s){if(cbInfo(s).noTest)return true;return gRun()?(painU("rgoal")||painRun()):painU("test");}
function goalDay(s,td){var g=D.goal;if(!g||g.d!==s||!GOALS[g.k]||goalBlocked(s))return null;
  if(gRun()){if(td.some(isRun))return null;return {btn:"run",id:"RH",why:"Goal day: "+goalName(g)+". Today is the test."};}
  if(td.some(function(l){return STR[l.id];}))return null;return {btn:"train",id:"CH",why:"Goal day: "+goalName(g)+". Today is the test."};}
/* After the date without reaching it: archived as "ended", no penalty, the next goal is suggested once. */
function goalTick(){var g=D.goal;if(!g||!g.d||WK.sim)return;if(g.d<=TODAY&&goalBlocked(TODAY)){g.d=addD(TODAY,1);save();return;}if(g.d>=TODAY)return;(D.goalsDone=D.goalsDone||[]).push({k:g.k,v:g.v,d:TODAY,r:"e"});if(D.goalsDone.length>30)D.goalsDone.splice(0,D.goalsDone.length-30);
  D.goal=null;D._toast=goalName(g)+": the date has passed. Your progress stays. Choose your next goal under More.";save();}
/* One-time focus hint: a run goal with the strength focus (one tap to Runner), a skill goal with the runner focus (note). */
function goalFocusHTML(){var g=D.goal;if(!g||g.fh)return "";
  if(gRun()&&D.focus==="str")return '<div class="favask" role="group" aria-label="Focus"><p>Your goal is a run, but your focus has no running. Switch focus to Runner? Without switching, the plan still keeps 2 runs a week.</p><div class="row"><button type="button" class="b red" data-a="goalfoc">Switch to Runner</button><button type="button" class="b" data-a="goalfh">Keep my focus</button></div></div>';
  if(gSkill()&&D.focus==="run")return '<div class="favask" role="group" aria-label="Focus"><p>Your goal is a skill and your focus is running. Skill work stays short and frequent; running keeps its priority.</p><div class="row"><button type="button" class="b" data-a="goalfh">Understood</button></div></div>';
  return "";}
/* Status page: milestone ladder as SVG bars (CSP-safe) and the check values as a line. */
function goalLadder(){var g=D.goal;if(!g||!GOALS[g.k])return "";var q=goalPos(g),G=GOALS[g.k],s0=g.s0!=null?g.s0:(G.u==="stage"?Math.max(0,+g.b||0):0),h='';
  h+='<div class="sec"><h3>'+esc(W("goal"))+': '+esc(goalName(g))+'</h3>'+(g.d?'<p class="muted">By '+dLab(g.d)+(gTrend()?' · '+gTrend():'')+(gTaper()?' · lighter week before the date':'')+'</p>':'')+'<ol class="gl">';
  q.s.forEach(function(x,i){var now=!x.ok&&i===q.done,pre=x.ok&&i<s0;
    h+='<li class="'+(x.ok?"ok":(now?"now":"next"))+'"><i class="gn" aria-hidden="true">'+(i+1)+'</i><span>'+(x.ok?"✓ ":"")+esc(gStepTxt(x))+(pre?' <em class="gpre">already reached</em>':'')+(now?' <em class="gpre">current step</em>':'')+'</span>'+gBar(gFrac(x))+'<b>'+esc(x.stage?(x.ok?"✓":""):(x.c?fmtKg(Math.round(x.c*10)/10):"–"))+'</b><span class="vh">'+(x.ok?"done":(now?"current":"later"))+'</span></li>';});
  h+='</ol>';var pts=(g.h||[]).map(function(p){return {y:p[1],l:dLab(p[0]),t:dLab(p[0])+": "+fmtKg(p[1])};});
  if(pts.length>=2)h+=lineChart(pts,"",W("goal")+" check values",goalLow(g.k));
  return h+'</div>';}
function vOnb(){
  var st=D.obStep||0,T=["Welcome","Choose your path","Your numbers","Equipment & training days"],h='',sk=D.skills;
  h+='<section class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgt"><div class="dlgh"><span class="eyebrow">'+W("oath")+' · step '+(st+1)+' of 4</span><h2 id="dlgt" tabindex="-1">'+T[st]+'</h2><div class="steps" aria-hidden="true">'+[0,1,2,3].map(function(i){return '<i class="'+(i<=st?"on":"")+'"></i>';}).join("")+'</div></div><div class="dlgb">';
  if(st===0){
    h+='<p>'+esc(W("welcome"))+'</p>'+themeHTML("o")+
      '<fieldset class="fs"><legend>Have a backup?</legend><p class="muted">Coming from another phone or browser? Restore your backup and you are done. New here? Just tap Next.</p><label class="b filebtn2" for="bkin">Restore from backup file</label><input type="file" id="bkin" class="vh" accept=".json,application/json" data-a="bkin"><details class="tv"><summary>Paste backup text instead</summary><textarea id="obbk" aria-label="Backup text" placeholder="Paste your backup text here"></textarea><button type="button" class="b" data-a="obimp">Restore from text</button></details>'+(D._msg?'<p class="warn" role="alert">'+esc(D._msg)+'</p>':'')+'</fieldset>';
  }
  if(st===1){
    h+='<p>'+esc(W("obhi"))+' First: where do you start, and what do you want to work on? Everything can be changed later under “More”.</p>';
    h+='<fieldset class="fs"><legend>Where do you start?</legend>'+Object.keys(STARTP).map(function(k){var x=STARTP[k];return '<label class="optc"><input type="radio" name="o_start" value="'+k+'" data-a="startp"'+(D.startP===k?" checked":"")+'><span><b>'+x[0]+'</b><span class="muted">'+x[1]+'</span></span></label>';}).join("")+'</fieldset>';
    h+='<fieldset class="fs"><legend>Your goal (optional)</legend><p class="muted">One tap is enough. The plan shows your progress; number and date can be adjusted, nothing has to be.</p>'+goalHTML("o",false)+'</fieldset>';
    h+=focusHTML("o",1)+emphHTML("o")+'<details class="tv obsk"'+(selSk().length?" open":"")+'><summary>Skills <span class="muted">· optional</span></summary>'+skillsHTML("o")+'</details><p class="muted">Favourite exercises: star them later under More → Emphasis & favourites, or with ☆ during training.</p>';
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
    '<div class="sum"><b>'+W("crusade")+'</b><span>'+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+' · emphasis '+EMPH.filter(function(x){return x[0]===emph();})[0][1]+(selSk().length?' · '+["hs","mu","ls","fl","pl"].filter(function(k){return D.skills[k];}).map(function(k){return SKN[k];}).join(", "):'')+(D.goal&&GOALS[D.goal.k]?' · '+esc(goalName(D.goal)):'')+'</span></div>';
  h+='</div><div class="dlgf">'+(st>0?'<button type="button" class="b" data-a="obback">Back</button>':'<span></span>')+(st<3?'<button type="button" class="b red" data-a="obnext">Next</button>':'<button type="button" class="b red" data-a="onb">'+W("begin")+'</button>')+'</div></section>';
  return h;
}
function vStart(){
  var dy=day(),r=recAll(TODAY,dy.noKick),td=onDay(TODAY),h="";
  function was(f){return td.some(f);}
  var dn={morgen:was(function(l){return l.id==="MO";}),train:was(function(l){return GYM.indexOf(l.id)>=0||HOME.indexOf(l.id)>=0;}),run:was(isRun),kick:was(function(l){return l.id==="KI";})};
  goalTick();pauseTick();
  if(D.pause){var pz=D.pause;h+=pauseOn(TODAY)?'<div class="pausecard" role="group" aria-label="'+esc(W("paused"))+'"><p><b>'+esc(W("paused"))+'</b> <span class="muted">since '+WDN[pd(pz.from).getDay()]+' '+dLabY(pz.from)+(pz.to?' · until '+WDN[pd(pz.to).getDay()]+' '+dLabY(pz.to):'')+(pz.why==="ill"?' · ill':'')+'</span></p><p class="muted">No plan and no lost streak while it lasts; the cycle waits. Your next logged session ends it too.</p><button type="button" class="b red" data-a="resume">'+esc(W("resume"))+'</button></div>'
    :'<p class="note">'+esc(W("paused"))+' from '+WDN[pd(pz.from).getDay()]+' '+dLabY(pz.from)+'. <button type="button" class="lnk" data-a="resume">Cancel</button></p>';}
  if(D._fin){var fz=D._fin;h+='<div class="fincard" role="status"><span class="eyebrow">Logged</span><b>'+esc(fz.n)+'</b><span>'+(fz.min?'≈ '+fz.min+' min · ':'')+fz.sets+' set'+(fz.sets===1?'':'s')+'</span>'+(fz.pr&&fz.pr.length&&String(D._toast||"").indexOf(W("newrec"))<0?'<span class="gold">'+esc(W("newrec")+fz.pr.join(" · "))+'</span>':'')+'</div>';D._fin=null;}
  if(D._toast){h+='<div class="toast" role="status">'+esc(D._toast)+'</div>';D._toast="";}
  h+=goalFocusHTML();
  if(tired3())h+='<div class="favask tired3" role="group" aria-label="'+esc(W("easy"))+'"><p>Tired three times in 7 days. An easy week could help: lighter sessions, then a test. Your call.</p><div class="row"><button type="button" class="b" data-a="easy">'+esc(W("easy"))+'</button></div></div>';
  h+=loveFinHTML();
  if(D.favQ&&D.favQ.length){var fq=D.favQ[0];h+='<div class="favask" role="group" aria-label="Keep as favourite"><p>You added <b>'+esc(fq)+'</b> today. Keep it as a favourite? Then it joins every strength session.</p><div class="row"><button type="button" class="b red" data-a="favkeep">★ Keep as favourite</button><button type="button" class="b" data-a="favnot">No, today only</button></div></div>';}
  if(!D.seenFav&&D.logs.length) h+='<button type="button" class="warn wbtn" data-tab="favs" data-from="start">New: pick a strength emphasis (legs & glutes, glutes, upper body, core) and star your favourite exercises →</button>';
  else if(!D.seenFocus) h+='<button type="button" class="warn wbtn" data-tab="mehr">New: choose your doctrine. Focus on running, strength or balanced, plus your skills →</button>';
  if(memOnly) h+='<div class="warn">This browser does not allow saving here. Use the backup under More.</div>';
  var bd=bkDue();
  if(bd) h+='<button type="button" class="bkrem" data-a="bkfile" id="bkrem"><b>'+esc(W("bkrem"))+'</b><span class="muted">'+(bd.none?'No backup yet · '+bd.n+' entries live only on this device.':'Last backup '+(bd.d===0?'today':(bd.d===1?'yesterday':bd.d+' days ago'))+(bd.n?' · '+bd.n+' new entr'+(bd.n===1?'y':'ies'):'')+'.')+' Tap to save a backup file.</span></button>';
  function big(tab,title,sub){var rec=r.btn===tab&&!dn[tab],nid=tab=="train"&&r.id!=="RS"?trainId(dy).id:r.id;
    return '<button type="button" class="big'+(dn[tab]?" done":(rec?" rec":""))+'" data-tab="'+tab+'"><span class="bt"><b>'+title+'</b>'+(dn[tab]?'<i class="tag ok">Done</i>':(rec?'<i class="tag">Recommended</i>':''))+'</span><span>'+(dn[tab]?esc(doneSub(tab)):(rec?'<span class="rn">'+esc(shortN(nid))+'</span>'+esc(recDur(nid)):esc(sub)))+'</span></button>';}
  h+=goalCard();h+=goalNextHTML();h+=platHTML();
  if(D.logs.length){var xp0=xpTotal(),st0=streaks();h+='<button type="button" class="rkline lnk" data-tab="stand"><span><b>'+esc(rankName(rankOf(xp0)))+'</b> · '+xp0+' XP</span><span>'+(st0.day.now>1?st0.day.now+'-day streak · ':'')+'Stats →</span></button>';}
  h+=loveCard();
  if(TH().notes){var nt=TH().notes;h+='<p class="quote"><span aria-hidden="true">'+({templar:"✠",sanguine:"✦",sisters:"⚜",slaanesh:"✧",nurgle:"☣",love:"♥",plain:"•"}[thKey()]||"•")+'</span> '+esc((thKey()==='love'?nt[Math.floor(pd(TODAY).getTime()/864e5)%nt.length]:pickNR(nt,Math.floor(pd(TODAY).getTime()/864e5),thKey().length)))+'</p>';}
  h+='<h2 class="q">'+W("orders")+'</h2>';
  h+=big("morgen","Morning routine","Home, on the mat · 7 or 15 min");
  h+=big("train","Training","Gym or home");
  var rro=!dn.run&&r.btn!=="run"&&runRec().opt;
  if(rro) h+='<button type="button" class="big also" data-a="xrun"><span class="bt"><b>Running</b><i class="tag dim">Also possible</i></span><span>Easy run, optional · '+(dn.train?'after your training':'strength day')+'</span></button>';
  else h+=big("run","Running",D.focus==="str"?"Not in the plan · log it anyway":"Easy, intervals or hard "+fmtKg(D.runKm)+" km");
  if(!rro&&!dn.run&&!(r.btn==="run"&&r.id==="RE")) h+='<button type="button" class="lnk ctr xrun" data-a="xrun">'+esc(W("xrun"))+' <span class="muted">· extra and relaxed, '+(dn.train?'after your training':'also on a training day')+'</span></button>';
  /* A-047: the class link speaks of kickboxing only with kickboxing days (then the kickboxing card stands here); without them
     it asks for another class or activity and needs "Other activity" switched on (it replaces the "+ Other activity" link). */
  var oaL=D.opt&&D.opt.oa,kdy=D.kickDays.length||dn.kick;
  if(kdy) h+=big("kick","Kickboxing","Log it, with mobility before and after");
  else if(oaL) h+='<p class="ctr"><button type="button" class="lnk oalnk" data-tab="other">Did another class or activity? Log it →</button></p>';
  if(r.btn==="kick"&&!dn.kick){var alt=recAll(TODAY,true);h+='<button type="button" class="'+(r.pain?'b wide':'lnk ctr')+'" data-a="nokick">'+(r.pain?'Skip kickboxing today. Instead: ':'No kickboxing today? Then: ')+esc(NAMES[alt.id])+'</button>';}
  if(dy.noKick&&isKick(TODAY)&&!dn.kick) h+='<button type="button" class="lnk ctr" data-a="nokick">Kickboxing after all</button>';
  if(oaL&&kdy) h+='<p class="ctr"><button type="button" class="lnk oalnk" data-tab="other">+ '+esc(W("oa"))+' <span class="muted">· hiking, dancing, cycling …</span></button></p>';
  if(D.logs.length) h+='<p class="ctr"><button type="button" class="lnk" data-a="blopen">Missed logging a day? '+esc(W("backlog"))+' →</button></p>';
  h+=weekHTML();
  return h;
}
/* A-029 (U2/U19): cards name the session and its length once; a done card says what was done. */
function shortN(id){return String(NAMES[id]||id).split(":")[0];}
function recDur(id){var m=0;try{if(STR[id]||id==="SK"||id==="HK"||id==="RS"||id==="DL"||id==="TE"){m=S(id,ctx(TODAY)).min;}else if(id==="RE"||id==="RH"||id==="RI")return " · "+runInfo(id).h;}catch(x){m=0;}return m?" · ≈ "+m+" min":"";}
function doneSub(tab){var f={morgen:function(l){return l.id==="MO";},train:function(l){return GYM.indexOf(l.id)>=0||HOME.indexOf(l.id)>=0;},run:isRun,kick:function(l){return l.id==="KI";}}[tab],l=onDay(TODAY).filter(f).pop();if(!l)return "";
  if(tab==="morgen")return shortN(l.id)+(l.m&&l.m.length>1?" · full":" · short");
  if(tab==="run")return shortN(l.id)+(l.km?" · "+fmtKg(l.km)+" km":"")+(l.min?" · "+fmtKg(l.min)+" min":"");
  return shortN(l.id)+" · "+Math.round(logMin(l))+" min";}
/* Week preview (A-015): a forecast of the next 7 days, assuming every recommended session is done as planned.
   It runs on a deep copy of the state (D and TODAY are swapped and always restored); nothing is saved or logged. */
var WK={sel:-1,key:"",plan:null,sim:false};
var WKSYM={KA:"⚔",KB:"⚔",KC:"⚔",CH:"⚔",HO:"⚔",SK:"✦",HK:"✦",RS:"☾",DL:"▽",TE:"◎",RE:"➶",RH:"➶",RI:"➶",KI:"✊"};
var WKS={KA:"Str A",KB:"Str B",KC:"Str C",CH:"Trial",HO:"Home",SK:"Skill",HK:"Skill",RS:"Rest",DL:"Deload",TE:"Test",RE:"Easy run",RH:"Hard run",RI:"Intervals",KI:"Kick"};
var WDN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function wkKey(){var l=D.logs[D.logs.length-1],dy=D.days[TODAY]||{};return [TODAY,D.logs.length,l?l.d+l.id+(l.rpe||0):"",D.focus,D.emph,D.loc,D.short,D.start,D.kickDays.join(),JSON.stringify(D.skills),(D.fav||[]).join(),nev().join(),JSON.stringify(D.home),!!dy.noKick,lvl(),JSON.stringify(D.pause),JSON.stringify(D.pain),JSON.stringify(D.opt),dy.ready||0].join("|");}
function wkLog(id,s,c){var o={d:TODAY,id:id,t:NAMES[id],rpe:id==="RS"?4:6,sim:1};
  if(c&&!isRun(o)&&id!=="KI"){var ss=S(id,c),sk=[];ss.blocks.forEach(function(b){if(D.short&&b.p>1)return;if(b.skill&&sk.indexOf(b.skill)<0)sk.push(b.skill);if(b.mu&&sk.indexOf("mu")<0)sk.push("mu");});o.lg=legSets(ss,c,id)>=6?1:0;o.vs=volSets(ss,c,id);o.sk=sk;o._min=ss.min;o._goal=ss.goal;}
  if(isRun(o)){o.km=runPlan(id).km;o.min=Math.round(o.km*6.5);}
  return o;}
function weekPlan(){var k=wkKey();if(WK.plan&&WK.key===k)return WK.plan;
  var D0=D,T0=TODAY,out=[];
  onDay(T0);cycWk(T0);patDates("");idIdx();trDays();/* A-038: the real state's history caches are current before they serve the copy */
  WK.sim=true;try{/* A-038: the entries are shared read-only (the simulation only adds its own), the rest is a deep copy. */
    var lg0=D0.logs,SH={ex:D0.ex,pr:D0.pr,days:D0.days},rd={},d14=addD(T0,-14);Object.keys(D0.days||{}).forEach(function(q){if(q>=d14)rd[q]=D0.days[q];});
    D0.logs=[];D0.ex={};D0.pr={};D0.days=rd;try{D=JSON.parse(JSON.stringify(D0));}finally{D0.logs=lg0;D0.ex=SH.ex;D0.pr=SH.pr;D0.days=SH.days;}D.logs=lg0.slice();D.ex=SH.ex;D.pr=SH.pr;
    /* progress (ex) and records (pr) are only read by the simulation and shared like the entries, day progress is
       copied for the last 14 days only;
       the history caches of the real state serve the copy (they only extend without changing the originals) */
    var SV=[ODC,CWC,RHC,IDI,TDI],fk=function(C){return C&&C.L===lg0&&C.D===D0&&C.n===lg0.length&&C.last===lg0[lg0.length-1]?Object.assign({},C,{L:D.logs,D:D}):C;};
    ODC=fk(ODC);CWC=fk(CWC);RHC=fk(RHC);IDI=fk(IDI);TDI=fk(TDI);if(CWC!==SV[1])CWC.r={};if(RHC!==SV[2])RHC.m={};
    for(var i=0;i<7;i++){var s=addD(T0,i);TODAY=s;updNames();var dy=day(s),c=ctx(s),td=onDay(s).filter(isTrain),e;
      if(i===0&&td.length){var l=td[td.length-1];e={id:l.id,done:1,leg:legLog(l)};}
      else if(pauseOn(s)){e={id:"RS",pause:1,why:"Training paused."};}
      else{var r=recAll(s,i===0&&dy.noKick),id=r.id;
        if(r.btn==="train"&&id!=="RS")id=recTrain(s,D.loc,i===0&&dy.noKick).id;
        else if(r.btn==="train"&&D.loc==="h")id=recTrain(s,"h",i===0&&dy.noKick).id;
        var lg=wkLog(id,s,c);addLog(lg);
        e={id:id,why:r.why,leg:legLog(lg),min:lg._min,goal:lg._goal};delete lg._min;delete lg._goal;}
      e.d=s;e.name=e.pause?W("paused"):NAMES[e.id];e.kick=isKick(s);e.dl=dlWk(s,c);e.run=e.id==="RE"||e.id==="RH"||e.id==="RI";e.rest=e.id==="RS";out.push(e);}
  }finally{D=D0;TODAY=T0;WK.sim=false;if(typeof SV!=="undefined"&&SV){ODC=SV[0];CWC=SV[1];RHC=SV[2];IDI=SV[3];TDI=SV[4];}updNames();}
  WK.key=k;WK.plan=out;return out;}
function wkInfo(e){if(e.run){var ri=runInfo(e.id);return {goal:ri.p.split(". ")[0]+".",dur:ri.h};}
  if(e.id==="KI")return {goal:"Your class, with mobility before and after.",dur:"class + ≈ 13 min mobility"};
  return {goal:e.goal||"",dur:e.min?"≈ "+e.min+" min":""};}
function weekHTML(){var P=weekPlan(),legs=P.filter(function(e){return e.leg;}).length,runs=P.filter(function(e){return e.run;}).length,dl=P.some(function(e){return e.dl;});
  var h='<section class="wk" aria-label="'+esc(W("week"))+'"><h2 class="q">'+esc(W("week"))+'</h2><div class="wkr" role="group">';
  P.forEach(function(e,i){var on=WK.sel===i,cls="wkd"+(i===0?" now":"")+(e.done?" done":"")+(e.rest?" rest":"")+(e.dl?" dl":"")+(on?" on":"");
    h+='<button type="button" class="'+cls+'" data-a="wkday" data-v="'+i+'" aria-pressed="'+on+'" aria-label="'+esc((i===0?"Today":WDN[pd(e.d).getDay()])+": "+e.name+(e.done?", done":"")+(e.leg?", legs":"")+(e.kick&&e.id!=="KI"?", kickboxing day":""))+'">'+
      '<span class="wkw">'+(i===0?"Today":WDN[pd(e.d).getDay()])+'</span><span class="wks" aria-hidden="true">'+(e.done?"✓":(e.pause?"‖":(WKSYM[e.id]||"•")))+'</span><span class="wkn">'+esc(e.pause?"Paused":(WKS[e.id]||e.id))+'</span>'+
      '<span class="wkm" aria-hidden="true">'+(e.leg?'<i class="lg">L</i>':'')+(e.kick&&e.id!=="KI"?'<i class="kk">K</i>':'')+'</span></button>';});
  h+='</div>';
  if(WK.sel>=0&&P[WK.sel]){var e=P[WK.sel],inf=wkInfo(e);h+='<div class="wkx" role="status"><b>'+esc(e.name)+'</b>'+(e.done?' <span class="tag ok">Done</span>':'')+(inf.dur?' <span class="muted">· '+esc(inf.dur)+'</span>':'')+(inf.goal?'<p>'+esc(inf.goal)+'</p>':'')+(e.dl?'<p class="muted">Deload/test week: lighter, then test your bests.</p>':'')+'</div>';}
  h+='<p class="muted wkf">Legs '+legs+'× · runs '+runs+'×'+(dl?' · deload/test week':'')+' · L = legs'+(D.kickDays.length?', K = kickboxing day':'')+'. Adapts to what you actually train.</p></section>';
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
  var h='';
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
  var ch=function(a,v,on,t){return '<button type="button" class="chip'+(on?" on":"")+'" data-a="'+a+'"'+(v?' data-v="'+v+'"':'')+' aria-pressed="'+on+'">'+t+'</button>';};
  var h=back()+'<div class="chips trow" role="group" aria-label="Today\'s setup">'+ch("loc","g",D.loc==="g","Gym")+ch("loc","h",D.loc==="h","Home")+ch("short","",!!D.short,"Limited time")+ch("kit","",kon,esc(W("kit"))+(kon?" · "+esc(kitLabel()):""))+'</div>'+kitHTML(kon);
  var pnK=Object.keys(PAINN).filter(function(k){return pn[k];}),pnL=pnK.map(function(k){return PAINN[k];}),cbk=cbInfo(TODAY);
  h+='<div class="hero"><span class="eyebrow">Week '+c.week+(dlWk(TODAY,c)?' · Deload':' · Block '+c.blk+' · '+accWord(accNow()))+(D.short?' · shortened':'')+(kon?' · '+esc(W("kit")):'')+'</span><h2>'+NAMES[id]+'</h2><p class="dur">⏱ ≈ '+s.min+' min'+(s.addMin?' <span class="muted">· with your additions</span>':'')+'</p>'+(s.min<DURMIN&&STR[id]?'<p class="muted">A short one today. Nothing gets padded: shorter is fine.</p>':'')+'<p>'+esc(s.goal)+'</p>'+(Tt.rec&&whyX(Tt.rec.why[0])?'<p class="muted">'+esc(whyX(Tt.rec.why[0]))+'</p>':'')+(STR[id]&&cbk.low?'<p class="c gold">'+esc(W("comeback"))+': fewer rounds, targets hold for now · session '+((cbk.n||0)+1)+' of 2</p>':'')+(pnL.length?'<p class="c gold">Rehab active: '+pnL.join(", ")+'</p><div class="chips">'+pnK.map(function(k){return '<button type="button" class="chip" data-a="healed" data-k="'+k+'">'+esc(W("healed"))+': '+PAINN[k]+'</button>';}).join("")+'</div>'+(painRun()?'<p class="muted">No runs are planned while the knee or ankle is on the list.</p>':''):'')+'</div>';
  h+=readyHTML(id);
  if(D._nvMsg){h+='<p class="note" role="status">'+esc("“"+D._nvMsg+"” will not be suggested again. An equivalent for the same muscles takes its place. Bring it back under More.")+'</p>';D._nvMsg="";}
  if(FAVIDS[id]&&!D.favP){D.favP=true;save();var nf=(D.fav||[]).length,emn=EMPH.filter(function(x){return x[0]===emph();})[0][1];h+='<button type="button" class="favcard" data-tab="favs" data-from="train"><span class="fvi" aria-hidden="true">★</span><span><b>'+(nf?nf+' favourite'+(nf>1?"s":"")+' in your plan':'Add your favourite exercises')+'</b><span class="muted">Emphasis: '+emn+(nf?'':' · starred exercises join every strength session')+'</span></span><span class="go">Edit →</span></button>';}
  h+='<div class="optrow"><details class="opt"><summary>Other session'+(D.loc==="h"?' · equipment':'')+'</summary><label class="lab" for="pick">Session</label><select id="pick" data-a="pick">'+list.map(function(k){return '<option value="'+k+'"'+(k===id?" selected":"")+'>'+NAMES[k]+'</option>';}).join("")+'</select>'+
     (D.loc==="h"?'<p class="muted">What do you have at home? The mat is always there.</p>'+Object.keys(EQ).map(function(k){return '<label class="chk"><input type="checkbox" data-a="eq" data-k="'+k+'"'+(D.home[k]?" checked":"")+'>'+EQ[k]+'</label>';}).join(""):'')+'</details>'+
     '<details class="opt pain"'+(pnK.length?" open":"")+'><summary>Something hurts?'+(pnK.length?' <span class="muted">· '+esc(pnL.join(", "))+'</span>':'')+'</summary><p class="muted">Pain? Affected exercises are skipped and a rehab block is added. The region stays on until you tap “'+esc(W("healed"))+'”.</p>'+Object.keys(PAINN).map(function(k){return '<label class="chk"><input type="checkbox" data-a="pain" data-k="'+k+'"'+(pn[k]?" checked":"")+'>'+PAINN[k]+'</label>';}).join("")+
     '<p class="muted painrule">Pain rule: up to 5 of 10 during the exercise is fine if it is back to normal the next morning. If it lasts or gets worse, see a doctor.</p></details></div>';
  var first=true,extraDone=false;
  function extras(){ if(extraDone) return; extraDone=true;
    Object.keys(REHAB).forEach(function(k,ki){ if(pn[k]) h+=blockHTML({name:REHAB[k].name,info:"light and pain-free",items:REHAB[k].items,rest:0,rehab:true},90+ki,id,dy,loc,c,false); });
    if(ab){var ao=first&&!dy.done["abs-T"]; h+=absHTML(ab,dy,loc,ao); if(ao) first=false;} }
  s.blocks.forEach(function(b,bi0){ if(D.short&&b.p>1) return; var bi=b.bi!=null?b.bi:bi0;
    if(b.cool||b.add) extras();
    var all=b.items.every(function(it,ii){var v=curVar(it,loc);return v<0||dy.done[id+"-"+bi+"-"+ii]||dy.skip[id+"-"+bi+"-"+ii]||painHit(it.opts[v].n);});
    var x=blockHTML(b,bi,id,dy,loc,c,first&&!all); if(x&&first&&!all) first=false; h+=x; });
  extras();
  s.blocks.forEach(function(b){if(b.add)b.items.forEach(function(it){if(it.pgone)h+='<p class="note" role="status">'+esc(it.pgone)+': removed today · no pain-free choice. It comes back once you tap “'+esc(W("healed"))+'”.</p>';});});
  if(ADDIDS[id]) h+=addHTML(s,loc);
  h+='<div class="card"><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea>'+(f.eask?'<div class="favask" id="eask" role="alert"><p>Nothing logged – log anyway?</p><div class="row"><button type="button" class="b red" data-a="saveany">Log anyway</button><button type="button" class="b" data-a="saveno">Back</button></div></div>':'<button type="button" class="b red wide" data-a="savetr">Log training</button>')+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function runRec(){var h0=hist(TODAY),a=recAll(TODAY,true,true);if(a.btn==="run")return a;
  if(painRun())return {id:"RE",why:"Knee or ankle on the pain list: no run is planned. If you run anyway, keep it short and easy."};
  /* A-035: Today follows the week preview. On a strength day (planned or already logged) a run is at most an optional
     easy one, never a recommended hard run. */
  if(h0.strToday||(a.btn==="train"&&STR[a.id]))return {id:"RE",opt:1,why:"Strength day: a run is optional today, easy only."};
  var hardOK=!h0.beg&&!cbInfo(TODAY).noHard&&!h0.kcY&&!h0.rhY&&!h0.oaY&&!isKick(addD(TODAY,1))&&!(isKick(TODAY)&&!day().noKick);
  var h3=hard3OK(TODAY);
  if(hardOK&&h3&&D.focus==="run"&&h0.RI>=5&&h0.RH>=2&&cap(h0.RI)>=cap(h0.RH)) return {id:"RI",why:"Intervals "+ago(h0.RI)+"."};
  return (hardOK&&(h3||longMode())&&cap(h0.RH)>=cap(h0.RE)&&h0.RH>=6)?{id:"RH",why:NAMES.RH+" "+ago(h0.RH)+"."}:{id:"RE",why:"Easy run "+ago(h0.RE)+"."};}
var RUNT={RE:"Easy",RI:"Intervals",RH:"Hard"};
/* Run steering (P-6). Long-run mode (focus run or a run goal): the hard run becomes a true long run, easy, +10 % after an
   easy rating. Hard = intervals, and the hard run outside long-run mode; at most every 3rd run is hard (hard3OK). Planned
   distance (runPlan): base per type, half in the goal taper (gTaper, the 7 days before the date), and capped so the week's km
   stay ≤ 130 % of the 4-week average (weeks with runs only). Extra easy runs and logged past runs count via their km. */
function longMode(){return D.focus==="run"||!!gRun();}
function hardRunL(l){return l.id==="RI"||(l.id==="RH"&&!longMode());}
/* A-053: a hard run only when the last 2 runs were easy and at most 1 of 3 of the runs actually run in the last 14 days
   (this one included) is hard; so a run that is the only one of its week is easy or brisk. */
function hard3OK(s){var r=[],n=0,h=0,lo=addD(s,-14);for(var i=D.logs.length-1;i>=0;i--){var l=D.logs[i];if(!isRun(l)||l.d>s)continue;if(l.d<lo&&r.length>=2)break;if(r.length<2)r.unshift(l);if(l.d>=lo){n++;if(hardRunL(l))h++;}}
  return !r.some(hardRunL)&&(h+1)*3<=n+1;}
/* A-038: summed from the entries per date (onDay index) instead of a scan of the whole history. */
function weekKm(ws){var a=0;for(var i=0;i<7;i++)onDay(addD(ws,i)).forEach(function(l){a+=l.km||0;});return a;}
function kmStat(s){s=s||TODAY;var ws=weekKey(s),cur=weekKm(ws),prev=[];
  for(var i=1;i<=12&&prev.length<4;i++){var w=addD(ws,-7*i),ran=false;for(var q=0;q<7&&!ran;q++)ran=onDay(addD(w,q)).some(isRun);if(ran)prev.push(weekKm(w));}
  return {cur:Math.round(cur*10)/10,avg:prev.length?Math.round(prev.reduce(function(a,x){return a+x;},0)/prev.length*10)/10:0,n:prev.length};}
/* A-044 (L6): run seasons in step with the accent blocks (blkNo % 4, goals do not shift them): base (the easy share grows the
   weekly volume), build (the long run grows), tempo (the interval forms take turns), hold (every run −20 %: volume down,
   intensity kept, [Q57]). The easy run is a share of the 4-week mean instead of fixed km (80/20: most kilometres easy,
   [Q44][Q59]); the long run may grow up to 30 % of the 4-week mean (A-053, was 35 %) ([Q61]; growth per session ≤ 10 %, [Q62]); the 130 % week
   guard stays. Interval forms [Q60]: 3 min fast, 1 min fast / 1 min jog, 6–8 min brisk, strides. */
var RUNPH=["base","build","tempo","hold"],RUNPN={base:"Base",build:"Build",tempo:"Tempo",hold:"Hold"};
function runPh(s){return RUNPH[blkNo(s||TODAY)%4];}
function r2(x){return Math.round(x*2)/2;}
function easyKm(s,old){var st=kmStat(s);if(!(st.n>=2&&st.avg>0))return old;var R=D.focus==="run",E=runPh(s)==="base"&&!transWk(s)?0.3:0.25;/* A-053: the base share starts after the transition week */
  return Math.max(old,Math.min(R?12:8,r2(st.avg*E)));}
function longCap(s){var st=kmStat(s),c=Math.max(6,r2(LONGQ*(st.n>=2?st.avg:0)));if(gRun())c=Math.max(c,Math.min(24,GOALS[gRun()].km+2));return c;}
/* A-053: long run ≤ 30 % of the 4-week mean [Q61] (25–30 % of the weekly volume), at least the easy run + 1 km; the first
   training week after the hold season or after hold running ends runs at × 0.9 [Q62] (≤ 10 % over the longest recent run);
   Balanced: the hard run stays ≤ 8 km and grows through brisk parts. */
var LONGQ=0.3,HARDMAX=8;
function transWk(s){if(holdOn("run"))return false;if(D.holdR&&D.holdR<=s&&diff(D.holdR,s)<7)return true;return runPh(s)==="base"&&blkNo(s)>0&&ctxCyc(s)===1;}
function riForm(s){var ph=runPh(s),n=0;for(var i=0;i<D.logs.length;i++){var l=D.logs[i];if(l.id==="RI"&&l.d<s)n++;}
  return ph==="tempo"?["i3","i1","i6","str"][n%4]:ph==="build"?(n%2?"i6":"i3"):"i3";}
/* build season: the planned long run rises 5 % per training week of the block (up to the cap), on top of the stored length */
function runBase(id,s){s=s||TODAY;var R=D.focus==="run",km;if(id==="RH"){km=D.runKm;if(longMode()){var lc=longCap(s);if(runPh(s)==="build"){var cy=ctxCyc(s);if(cy<=5)km=Math.max(km,Math.min(lc,r2(km*(1+0.05*(cy-1)))));}
      km=Math.max(km,Math.min(lc,easyKm(s,R?6:(D.runKm<6?4:5))+1));}else km=Math.min(km,HARDMAX);}else if(id==="RI")km=Math.round((4+D.runI*0.8)*2)/2;else km=easyKm(s,R?6:(D.runKm<6?4:5));
  if(runPh(s)==="hold")km=Math.max(2,r2(km*0.8));else if(transWk(s))km=Math.max(2,r2(km*0.9));if(holdOn("run"))km=Math.max(2,r2(km*2/3));return km;}
/* tempo hint from the own best times (text only): easy about 60–90 s/km slower than the best 5 km pace [Q61] */
function bestPace(){var a=D.pr["run:t5"],b=D.pr["run:t10"];if(a&&a.min>0)return a.min/5;if(b&&b.min>0)return b.min/10-0.15;return 0;}
function paceHint(kind){var p=bestPace();if(!p)return "";var pk=function(x){return fmtPace(x)+"/km";},r=D.pr["run:t5"]?"best 5 km "+pk(D.pr["run:t5"].min/5):"best 10 km "+pk(D.pr["run:t10"].min/10);
  var t=kind==="easy"?"easy from about "+pk(p+1):kind==="i3"?"fast reps about "+pk(p):kind==="i1"?"fast minutes about "+pk(p-0.1):kind==="i6"?"brisk about "+pk(p+0.3):"";
  return t?" Pace guide: "+r+", today "+t+".":"";}
function kmRoom(s){var st=kmStat(s);return st.n>=2&&st.avg>0&&!(gRun()&&D.goal.d===s)?Math.floor((1.3*st.avg-st.cur)*2)/2:Infinity;}
function runPlan(id,s){s=s||TODAY;var km=runBase(id,s),why="";
  if(gRun()&&gTaper(s)&&D.goal.d!==s){km=Math.max(2,Math.round(km*0.5*2)/2);why="taper";}
  var room=kmRoom(s);if(km>room){km=Math.max(Math.min(km,2),room);why=why||"cap";}
  return {km:km,why:why};}
function runInfo(id){var R=D.focus==="run",rp=runPlan(id),tx=rp.why==="taper"?" Taper week: about half the distance, keep it easy and stay fresh.":(rp.why==="cap"?" Shorter today: your weekly kilometres stay within 30 % of the last weeks.":"");
  var ri=runInfo0(id,R,rp);if(tx&&!(id==="RH"&&gRun()&&D.goal.d===TODAY))ri={h:ri.h,p:ri.p+tx};
  var ph=runPh(TODAY),sx={base:" Season: base – the easy share grows your weekly volume.",build:longMode()?" Season: build – the long run grows.":" Season: build – steady distance, more brisk minutes in the hard run.",tempo:" Season: tempo – the interval form changes each time.",hold:" Season: hold – about 20 % less, same effort."}[ph];
  if(D.focus!=="str"||gRun())ri={h:ri.h,p:ri.p+sx};return ri;}
function runInfo0(id,R,rp){
  if(id==="RH"&&gRun()&&D.goal.d===TODAY) return {h:"Goal day: "+goalName(D.goal),p:"Your test. Warm up with 10 min easy jogging, start calmly and find your pace after the first kilometre. Drink, eat lightly 2–3 h before."};
  if(rp.why&&id!=="RI") return id==="RE"||longMode()?{h:fmtKg(rp.km)+" km "+(id==="RH"?"long, easy":"easy"),p:"Easy enough that you can speak in full sentences."}:{h:fmtKg(rp.km)+" km steady",p:"Steady, not to the limit. 5 min warm-up jog, no strength training afterwards."};
  if(id==="RH"&&longMode()){var ph0=runPh(TODAY);return {h:fmtKg(rp.km)+" km long run",p:"Your long run: easy all the way, you can talk in full sentences. Walk briefly to drink. "+(ph0==="build"?"Rated easy, the next one is 10 % longer":ph0==="base"?"Rated easy, the next one is 0.5 km longer":"It holds its length this season")+" (up to "+fmtKg(longCap(TODAY))+" km, 30 % of your weekly average). No strength training afterwards."+paceHint("easy")};}
  if(id==="RE"&&D.runKm<6&&!R) return {h:"20–30 min easy",p:"Easy enough to talk. Walking breaks are completely fine: e.g. 3 min jog, 1 min walk. Strength training today as well? Then strength first, or keep 3 hours apart."};
  if(id==="RE"){var ek=rp.km;return {h:fmtKg(ek)+" km easy",p:"About "+Math.round(ek*6.5)+" min. Easy enough that you can speak in full sentences."+(R?" At the end 4–6 strides of 20 s: build speed smoothly, walk back.":"")+" Strength training today as well? Then strength first, or keep 3 hours apart."+paceHint("easy")};}
  if(id==="RI"){var fm=riForm(TODAY),n=runPh(TODAY)==="hold"?Math.max(3,Math.round(D.runI*0.8)):D.runI,end=" 10 min cool-down jog. No strength training afterwards.";
    if(fm==="i1")return {h:(2*n)+" × 1 min fast",p:"10 min warm-up jog. Then "+(2*n)+" × 1 min fast, 1 min easy jog in between. Fast means: only single words possible, every minute equally quick."+end+paceHint("i1")};
    if(fm==="i6")return {h:(n>=6?3:2)+" × 6–8 min brisk",p:"10 min warm-up jog. Then "+(n>=6?3:2)+" × 6–8 min brisk with 2 min jogging in between. Brisk means: comfortably hard, short sentences still possible."+end+paceHint("i6")};
    if(fm==="str")return {h:fmtKg(rp.km)+" km easy + strides",p:"Easy run, then 6–8 strides of 20 s: build speed smoothly to fast, walk or jog back fully. Relaxed and tall, never sprinting to the limit."+end};
    return {h:n+" × 3 min fast",p:"10 min warm-up jog. Then "+n+" × 3 min fast with 2 min jogging in between. Fast means: only single words possible, but every rep equally quick."+end+paceHint("i3")};}
  var hk=rp&&rp.km?rp.km:Math.min(D.runKm,HARDMAX);
  return {h:fmtKg(hk)+" km "+(hk<6?"steady":"hard"),p:(hk<6?"Faster than your easy runs, but steady the whole way.":hardPace())+(D.runKm>=HARDMAX?" It stays at "+HARDMAX+" km: when it feels easy, run more of it brisk instead of further.":"")+" 5 min warm-up jog, no strength training afterwards."};}
/* A-029 (U23): the hard-run pace follows the profile: about 45 s/km faster than the recent easy runs, else by feel. */
function hardPace(){var r=D.logs.filter(function(l){return l.id==="RE"&&l.km>0&&l.min>0&&!l.bl;}).slice(-5);if(r.length<2)return "Comfortably hard: only short sentences possible.";
  var p=r.reduce(function(a,l){return a+l.min/l.km;},0)/r.length-0.75;p=Math.max(3,p);return "About "+Math.floor(p)+":"+pad(Math.round((p%1)*60)%60)+"/km, about 45 s per km faster than your easy runs.";}
function vRun(){
  var dy=day(),rr=runRec(),id=dy.run||rr.id,f=dy.fin,ri=runInfo(id);
  var h=back()+'<div class="seg" role="group" aria-label="Run type">'+["RE","RI","RH"].map(function(k){return '<button type="button" class="b'+(id===k?" on":"")+'" data-a="runtype" data-v="'+k+'" aria-pressed="'+(id===k)+'">'+RUNT[k]+'</button>';}).join("")+'</div>';
  var xr=dy.xr&&id==="RE";
  h+='<div class="hero"><span class="eyebrow">'+(xr?"Extra easy run":(id===rr.id?"Recommended":"Your choice"))+'</span><h2>'+esc(ri.h)+'</h2><p>'+esc(ri.p)+'</p>'+(xr?'<p class="c gold xrh">Order: best after your strength training, or a few hours apart from it. Keep it truly easy.</p>':(whyX(rr.why)?'<p class="muted">'+esc(whyX(rr.why))+'</p>':''))+'</div>';
  h+='<details class="blk"><summary><span class="bn">Cool-down</span><span class="bi">5 min after the run · hold each stretch, breathe slowly</span></summary>'+coolItems("run","h").map(function(x,i){return poseRow(x,"rc-"+i,dy);}).join("")+'</details>';
  h+='<div class="card"><div class="sec"><p class="q">After the run</p><div class="inp two"><label>Distance km<input type="number" id="f_km" step="0.01" inputmode="decimal" data-fin="km" value="'+esc(f.km)+'"></label><label>Time min<input type="number" id="f_min" step="0.1" inputmode="decimal" data-fin="min" value="'+esc(f.min)+'"></label></div>'+
     (num(f.km)>0&&num(f.min)>0?'<p class="tg">Pace '+pace({km:num(f.km),min:num(f.min)})+'</p>':'')+
     '<label class="filebtn" for="gfile">Import run file (GPX/TCX)</label><input type="file" id="gfile" class="vh" accept=".gpx,.tcx,application/gpx+xml,text/xml" data-a="gfile">'+(f.gmsg?'<p class="muted" role="status">'+esc(f.gmsg)+'</p>':'')+'</div>'+
     '<div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="saverun">Log run</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function durOf(v,def){var n=num(v);return n!==null&&n>=5&&n<=900?Math.round(n):def;}
function durHTML(f,def){return '<label class="lab" for="f_dur">Duration min</label><input type="number" id="f_dur" class="dur" inputmode="numeric" step="5" min="5" max="900" data-fin="dur" value="'+esc(f.dur!=null&&f.dur!==""?f.dur:def)+'">';}
/* Other activity (P-4, Extras): hiking, dancing, cycling … with minutes and how hard; counts for the weekly load and the next day. */
function vOther(){var dy=day(),f=dy.fin,nm=f.oan||"";
  return back()+'<div class="hero"><span class="eyebrow">'+esc(W("oa"))+'</span><h2>'+esc(nm||"What did you do?")+'</h2><p>Counts for your weekly load. After a hard one the next day stays free of leg day and hard runs.</p></div>'+
    '<div class="card"><div class="sec"><div class="chips">'+OAS.map(function(x){return '<button type="button" class="chip'+(nm===x?" on":"")+'" data-a="oaname" data-v="'+esc(x)+'" aria-pressed="'+(nm===x)+'">'+esc(x)+'</button>';}).join("")+'</div>'+
    '<label class="lab" for="f_oan">Activity</label><input type="text" id="f_oan" maxlength="40" data-fin="oan" value="'+esc(nm)+'" placeholder="e.g. Climbing">'+durHTML(f,60)+'</div>'+
    '<div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="saveoa">Log activity</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';}
function saveOther(){var dy=day();if(needRpe(dy))return;var f=dy.fin,nm=String(f.oan||"").trim().slice(0,40)||NAMES.OA,rk0=rankOf(xpTotal());
  addLog({d:TODAY,id:"OA",t:nm,rpe:f.rpe,min:durOf(f.dur,60),note:(f.note||"").slice(0,300)});afterLog(rk0,[]);finish(dy,true);}
function vKick(){
  var dy=day(),f=dy.fin,c=ctx(TODAY);
  return back()+'<div class="hero"><span class="eyebrow">'+esc(W("kday"))+'</span><h2>Kickboxing</h2><p>No handstand today, wrists and shoulders get enough work.</p></div>'+blockHTML(KM_PRE,0,"KI",dy,"h",c,true)+blockHTML(KMPOST(),1,"KI",dy,"h",c,false)+
    '<div class="card"><div class="sec">'+durHTML(f,90)+'</div><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="savekick">Log kickboxing</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
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
  ui:{gset:"Swear a blood oath",bkrem:"Preserve the annals",orders:"Your duty for today",wsets:"Rising sets",anchor:"Angel's lift",battle:"How fierce was the fight?",oath:"Blood oath",begin:"Spread your wings",chron:"Annals",crusade:"Your ascent",focus:"Counsel of the Angel",honours:"Golden honours",records:"Golden records",rank:"Rank",title:"Angel's Training Book",sub:"A new son of the Angel",ready:"Your ascent begins. The Angel watches over you.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New golden record! ",newhon:"Golden honour earned: "}},
 sisters:{
  toast:["Logged. Faith is your armour.","Logged. The Emperor protects, Sister.","Logged. Another prayer answered in sweat.","Logged. Your devotion burns bright.","Logged. The flame of faith grows stronger.","Logged. Saint Celestine would be proud.","Logged. Purity of body, purity of soul.","Logged. Your litanies are spoken in reps.","Logged. Righteous effort, righteous rewards.","Logged. The Ecclesiarchy records your devotion.","Logged. Your faith is your strength, Sister.","Logged. Each rep a bead on your rosarius.","Logged. The heretic called Weakness burns.","Logged. Sing the litany of strength once more.","Logged. Your order is proud of you.","Logged. Rest, Sister. Faith renews in sleep."],
  ups:["","Novitiate. Your training in faith begins.","Sister Militant. You bear arms for the Emperor.","Sister Superior. You lead your squad with devotion.","Veteran Superior. Your faith has been tested and holds.","Palatine. Your order looks to you.","Canoness. You lead an order of the faithful.","Canoness Superior. Your devotion is legend.","Living Saint. The Emperor's light shines through you."],
  morns:["Morning prayer, Sister","Rise in faith","The flame burns at dawn","Matins of strength","A blessed morning, Sister"],
  notes:["Faith is a muscle. Train it daily.","The Emperor protects those who protect their bodies.","Devotion is not a feeling. It is a practice.","Light the flame: one small session counts.","A Sister's strength is her discipline.","Purity of form before speed of rep.","Celestine rose again. So can you, after any break.","Prayer and training share one secret: consistency.","Rest is holy. Even saints sleep.","Hymns are sung in breaths. Breathe through the effort.","Your armour is faith. Your shield is routine.","The Emperor asks for devotion, not perfection.","Burn doubt with action.","Every morning routine is a small act of devotion.","Stand straight. Faith deserves good posture.","Strength in faith, faith in strength."],
  hon:{first:"First Prayer",dawn:"Matins Kept",week:"Seven Days of Devotion",unbroken:"Unbroken Faith",pilgrim:"Pilgrimage",march:"Long Pilgrimage",zealot:"Core of Faith",trial:"Trial of Faith",records:"Blessed Records",centurion:"Hundred Prayers",ascend:"Ascension",inverted:"Miracle of Balance",lever:"Lever of Devotion"},
  ui:{gset:"Take a vow",bkrem:"Copy the sacred records",orders:"Your devotions for today",wsets:"Prayer sets",anchor:"Vow lift",battle:"How hard was the trial?",oath:"Vows of the order",begin:"Take the vows",chron:"Chronicle of faith",crusade:"Your path of faith",focus:"Counsel of the Canoness",honours:"Blessings",records:"Blessed records",rank:"Rank",title:"Book of Devotion",sub:"A new Sister of the order",ready:"Your vows are taken. The Emperor protects, Sister.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"A blessed record! ",newhon:"Blessing received: "}},
 slaanesh:{
  toast:["Logged. Exquisite. More!","Logged. Perfection is a habit.","Logged. Delicious burn.","Logged. Nothing in moderation.","Logged. Every rep a sensation.","Logged. The pursuit of perfection continues.","Logged. Feel that? That's progress.","Logged. Excess suits you.","Logged. The Prince adores your dedication.","Logged. Indulge in another set tomorrow.","Logged. Beautiful form. Divine burn.","Logged. Pain is merely intense sensation.","Logged. You crave improvement. Good.","Logged. Your reflection approves.","Logged. Rest, then indulge again.","Logged. Flawless. Almost. Again tomorrow."],
  ups:["","Devotee. You have tasted progress.","Hedonist. You crave more.","Bliss-Bringer. Your effort is intoxicating.","Exalted. Perfection draws near.","Champion of Excess. Nothing is enough.","Herald. Your devotion sings.","Daemon Prince. Ascension achieved.","Chosen of the Prince. Perfection, embodied."],
  morns:["Morning indulgence","Wake to sensation","A perfect morning awaits","Stretch, and savour it","Rise, devotee"],
  notes:["Perfection is not a goal. It is a habit.","Savour the burn.","Moderation is for those who fear greatness.","Treat your stretches like a luxury.","Excess in effort, moderation in nothing but rest.","The mirror is your judge. Impress it.","Every sensation is information.","Beauty demands discipline.","A perfect rep is better than ten sloppy ones.","Rest is an indulgence. Enjoy it fully.","Crave progress, not approval.","Your body is your masterpiece.","Pleasure in effort is the secret of champions.","Try the harder variation. You know you want to.","Elegance is strength made visible.","Never enough. Always more."],
  hon:{first:"First Taste",dawn:"Morning Indulgence",week:"Seven Days of Excess",unbroken:"Insatiable",pilgrim:"Marathon of Sensation",march:"Hundred Kilometres of Bliss",zealot:"Core of Desire",trial:"Trial of Perfection",records:"Perfectionist",centurion:"Hundred Indulgences",ascend:"Ascension",inverted:"Delightfully Upside Down",lever:"Exquisite Lever"},
  ui:{gset:"Name your desire",bkrem:"Treasure every moment",orders:"Today's indulgence",wsets:"Teaser sets",anchor:"Signature lift",battle:"How intense was it?",oath:"Pact of perfection",begin:"Begin the pursuit",chron:"Indulgences",crusade:"Your pursuit",focus:"Whispers of the Prince",honours:"Indulgences",records:"Perfect records",rank:"Rank",title:"Book of Perfection",sub:"A new devotee",ready:"The pursuit of perfection begins.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"Exquisite new record! ",newhon:"Indulgence earned: "}},
 nurgle:{
  toast:["Logged. Grandfather is pleased with your perseverance.","Logged. Endure, and endure again.","Logged. Rot cannot stop the persistent.","Logged. Your resilience grows like a fine mould.","Logged. Sweat is merely a gift shared.","Logged. Slow and steady, like decay.","Logged. Nothing lasts, except your stubbornness.","Logged. Grandfather chuckles warmly.","Logged. The flies buzz in approval.","Logged. Toughness, the true blessing.","Logged. Another day, another layer of resilience.","Logged. Pain fades. Persistence remains.","Logged. You are pleasingly unkillable.","Logged. Share the joy: tell someone about your workout.","Logged. Grandfather's garden blooms with your effort.","Logged. Rest now, my little rotling. Grow strong."],
  ups:["","Rotling. Grandfather notices you.","Plague Acolyte. You endure where others quit.","Plaguebearer. Count your reps like blessings.","Blightbringer. Your resilience spreads.","Rotting Champion. Nothing stops you.","Lord of Decay. Unbreakable, unbothered.","Herald of Grandfather. Jovial and relentless.","Chosen of Grandfather. Eternal endurance."],
  morns:["Good morning, my little rotling","Rise from the compost","Another glorious, damp morning","Stretch those creaking joints","Grandfather wakes you gently"],
  notes:["Endurance is the greatest gift.","Everything decays. Your habits don't have to.","Slow progress is still progress. Ask any mould.","Toughness is built, not born.","Grandfather loves you, especially on hard days.","A cold is no excuse. Well, sometimes it is. Rest.","Persistence beats talent when talent skips leg day.","Share your strength, like a generous cough.","Embrace the burn. It means you're alive.","Rot is patient. Be patient.","Creaky joints? Morning routine. Grandfather insists.","The garden grows one rep at a time.","Resilience is just stubbornness with good manners.","Nothing is permanent except your consistency.","Laugh at fatigue. Grandfather does.","Endure today, flourish tomorrow."],
  hon:{first:"First Spore",dawn:"Damp Dawns",week:"Week of Persistence",unbroken:"Unkillable",pilgrim:"Marathon of Rot",march:"Hundred Kilometres of Endurance",zealot:"Core of Iron Mould",trial:"Trial of Endurance",records:"Blossoming Records",centurion:"Hundred Blessings",ascend:"Rising from the Mire",inverted:"Upside-Down Fly",lever:"Lever of Patience"},
  ui:{gset:"Make a promise",bkrem:"Preserve the garden",orders:"Today's blessings",wsets:"Easing-in sets",anchor:"Steadfast lift",battle:"How much did you endure?",oath:"Grandfather's welcome",begin:"Begin enduring",chron:"The tally",crusade:"Your endurance",focus:"Grandfather's advice",honours:"Blessings",records:"Blossoming records",rank:"Rank",title:"Book of Endurance",sub:"A new rotling joins the garden",ready:"Welcome to the garden. Grandfather is delighted.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New record, blossoming beautifully! ",newhon:"Blessing received: "}},
 love:{ui:{holdx:"Keep it steady, love",obhi:"Welcome, love.",kday:"Class day, love",rdx:"Daily readiness check",rdq:"How do you feel today, love?",pause:"Take a break, love",resume:"Back to it, love",paused:"On a break",healed:"All better",comeback:"Gentle return",plat:"A quiet stretch, love",goal:"Your dream",gset:"Name your dream",gdone:"Dream come true",gstep:"Closer to your dream",bkrem:"Keep our memories safe",orders:"Your plan for today, love",wsets:"Gentle warm-up sets",anchor:"Your steady lift",battle:"How did it feel, love?",oath:"Made with love, just for you",begin:"Let's start, love",chron:"Memories",crusade:"Your journey",focus:"Little tips from me",honours:"Your badges",records:"Your records (I'm so proud)",rank:"Your rank in my heart",title:"Your Training Book ♥",sub:"For the love of my life",ready:"All set. You're going to be amazing, love.",welcome:"Hello, love of my life. I made this for you: a training book that plans each day from what you did before. Everything stays on your phone.",newrec:"New record, my champion! ",newhon:"New badge, love (I'm so proud): "}},
 plain:{
  toast:["Logged. Nice work.","Logged. Consistency wins.","Logged. One more in the bank.","Logged. Keep it up.","Logged. Solid session.","Logged. Progress is progress.","Logged. Future you says thanks.","Logged. Well done.","Logged. That counts.","Logged. Good job showing up.","Logged. Strong work today.","Logged. Another brick in the wall.","Logged. You're building a habit.","Logged. Great effort.","Logged. On track.","Logged. Rest well."],
  ups:["","Regular. You're building a habit.","Committed. Consistency is paying off.","Athlete. You train like one now.","Strong. Visible progress.","Advanced. Few get this far.","Expert. You know what you're doing.","Elite. Top level consistency.","Legend. Seriously impressive."],
  morns:["Good morning","Morning routine","Start the day moving","Wake up and stretch","Good morning, let's move"],
  notes:["Consistency beats intensity.","A short session is better than none.","Sleep is part of training.","Form first, then load.","Small steps add up.","Rest days are training days for recovery.","Drink water.","Progress is rarely linear. Keep going.","Move a little every day.","Your future self will thank you.","Showing up is half the work.","Easy days make hard days possible.","Track it, then improve it.","Don't compare, just improve.","Stretching counts.","Keep it simple."],
  hon:{first:"First entry",dawn:"Morning habit",week:"7-day streak",unbroken:"Four strong weeks",pilgrim:"Marathon distance",march:"100 km",zealot:"Blitz Master",trial:"Skill Trial done",records:"Record breaker",centurion:"100 sessions",ascend:"First muscle-up",inverted:"Freestanding handstand",lever:"Front lever"},
  ui:{holdx:"Hold",obhi:"Welcome.",kday:"Class day",rdx:"Daily readiness check",rdq:"How do you feel today?",pause:"Pause training",resume:"Resume training",paused:"Training paused",healed:"Healed",comeback:"Comeback",plat:"Plateau",goal:"Goal",gset:"Set a goal",gdone:"Goal reached",gstep:"Goal step",orders:"Today's plan",battle:"How hard was it?",oath:"Setup",begin:"Let's go",chron:"Log",crusade:"Your plan",wsets:"Warm-up sets",anchor:"Anchor",focus:"Where to focus",honours:"Badges",records:"Personal records",rank:"Level",title:"Training Book",sub:"Set up your training",ready:"All set. Your first plan is ready.",welcome:"Your personal training book: it plans each day from what you did before. Everything stays on this phone.",newrec:"New record! ",newhon:"Badge earned: "}}
};
Object.keys(THX).forEach(function(k){if(own(THEMES,k))Object.keys(THX[k]).forEach(function(f){THEMES[k][f]=THX[k][f];});});
/* A-046 (L8): more daily lines and finish messages per theme (16 → 60 each), picked without repetition within a pass;
   the love theme is left out (decision of the captain, its notes stay encrypted). */
var TXX={
 templar:{notes:["The blade is sharpened in silence, not in battle.","Every set is a vow kept.","Rest is part of the crusade, not a retreat.","Doubt is a heretic. Train it out.","Discipline outlasts motivation.","Armour is forged one blow at a time.","The crusade is long. Pace yourself and march.","A clean rep honours the cause more than a fast one.","Your weakness is the Xenos at the gate.","Hold the line today, advance tomorrow.","Faith without effort is idle prayer.","Straight back, firm stance, pure intent.","Sleep is the armourer's hour.","Victory is forged in the quiet hours.","Scars of training are marks of devotion.","The chapter grows stronger when you show up.","The bar does not lie. Neither should your form.","Breathe, brace, strike.","Small victories daily build an empire.","The march is won by the feet that keep moving.","Eat well. Even crusaders need supply lines.","Your body is the temple, your training the liturgy.","Leave the bar only when the rep is done.","Patience is a weapon few carry.","Today's sweat is tomorrow's armour.","Every warm-up is a prayer before battle.","The cool-down closes the rite.","Steel bends before it breaks. You will not break.","Train for the long war, not the parade.","A tired warrior who still shows up is a true warrior.","Honour the deload. The blade needs its whetstone.","Count your progress in months, not days.","The oath stands whether the sun shines or not.","Your mind falters before your muscles do.","One more clean set. Then glory.","Drink, brother. Even the faithful thirst.","The heretic skips the leg day.","Endurance is faith made visible.","Advance slowly, never fall back.","Fear the easy path. It leads nowhere.","Your grip holds the banner. Keep it strong.","Victory belongs to the steadfast.","Rise, train, recover, repeat. That is the creed.","The crusade does not ask for perfection, only for presence."],
  toast:["Logged. Another stone in the fortress.","Logged. The vow holds.","Logged. Your blade grows keener.","Logged. The crusade advances.","Logged. The heresy of sloth is denied.","Logged. Iron obeys the faithful.","Logged. The chapter is stronger today.","Logged. Purity through effort.","Logged. Your armour thickens.","Logged. A battle won, the war goes on.","Logged. Ave Imperator.","Logged. The banner rises higher.","Logged. Doubt has been purged.","Logged. Another rite completed.","Logged. Your march does not falter.","Logged. The Xenos of weakness retreats.","Logged. Zeal rewarded.","Logged. Steel tempered once more.","Logged. Honour earned in sweat.","Logged. The relic of discipline shines.","Logged. Your oath is kept.","Logged. Faith made flesh.","Logged. The litany of iron is sung.","Logged. Forward, crusader.","Logged. One more step towards glory.","Logged. Your brothers salute you.","Logged. Weakness burned away.","Logged. The fortress holds.","Logged. Victory recorded in the annals.","Logged. The Emperor protects the diligent.","Logged. Strength sanctified.","Logged. Your resolve is unbroken.","Logged. The sword arm grows stronger.","Logged. No retreat, no surrender.","Logged. The crusade remembers.","Logged. Hammer and anvil, both are you.","Logged. Your devotion is noted.","Logged. Rest now, warrior.","Logged. Tomorrow, the next battle.","Logged. Iron sharpens iron.","Logged. The flame of purpose burns.","Logged. Sloth is the true heresy.","Logged. Well fought.","Logged. The vigil is kept."]},
 sanguine:{notes:["Grace is strength that does not need to shout.","Master the thirst. Channel it into the work.","Wings are earned feather by feather.","Beauty in motion is control, not luck.","A noble heart trains even when no one watches.","The red thirst fades before steady discipline.","Rise like the dawn over Baal.","Every clean rep is a brushstroke of a masterpiece.","Hold your form as you would hold your honour.","Fury without control is wasted blood.","The angel within needs a strong body.","Patience is the most golden virtue.","Sorrow is lighter for a body that is strong.","Let your movement be a song, not a scream.","Rest well. Even angels fold their wings.","Strength and grace are twin blades.","Nobility is repeated, not inherited.","The fall is temporary. The rise is chosen.","Train the body, calm the mind, keep the heart.","Gold is forged in fire, not in comfort.","Keep the thirst for progress, never for pain.","A steady breath tames the wildest set.","Your lineage is the work you do today.","Glide through the warm-up, strike in the set.","The chalice is filled one drop at a time.","Elegance is efficiency perfected.","Pride in form, humility in load.","Even the swiftest hunter rests between the hunts.","The blood remembers every honest effort.","Strength is a gift. Discipline is the frame.","Soar steadily. Rushing ends in a fall.","Every session adds a line to your legend.","Hold the line, keep the grace.","Clean technique outlives raw power.","Calm hands, fierce heart.","Light steps, heavy resolve.","Feed the body well. Angels need fuel too.","A moment of rest is part of the dance.","Rage is fuel. Control is the engine.","The golden armour shines brightest after the storm.","Precision is a form of devotion.","Your wings grow in silence.","Climb, breathe, climb again.","Tomorrow you will fly a little higher."],
  toast:["Logged. Grace and fury, perfectly balanced.","Logged. Your wings grow stronger.","Logged. A golden effort.","Logged. The thirst is mastered.","Logged. Noble work.","Logged. The angel rises.","Logged. Beauty in every rep.","Logged. The chalice fills.","Logged. Your legend grows.","Logged. Control over chaos.","Logged. Flawless resolve.","Logged. The blood is honoured.","Logged. Another feather earned.","Logged. Strength with grace.","Logged. The dawn salutes you.","Logged. Fury well channelled.","Logged. Elegant and fierce.","Logged. Your lineage is proud.","Logged. The golden path continues.","Logged. Soaring higher.","Logged. Calm hands, strong heart.","Logged. The masterpiece takes shape.","Logged. Your form shines.","Logged. Another step towards perfection.","Logged. The red thirst is quiet.","Logged. Rest now, angel.","Logged. Wings folded, work done.","Logged. Strength sanctified in grace.","Logged. A noble victory.","Logged. Light steps, heavy resolve.","Logged. The hunt was good.","Logged. Your armour gleams.","Logged. Precision rewarded.","Logged. The song of iron rings true.","Logged. Rise again tomorrow.","Logged. The sorrow lifts a little.","Logged. Golden discipline.","Logged. A worthy offering.","Logged. Flight is earned.","Logged. Honour in every breath.","Logged. Composure under load.","Logged. Your heart stays steady.","Logged. Another drop in the chalice.","Logged. Magnificent."]},
 sisters:{notes:["Faith moves the bar when the arms waver.","Every rep is a verse of devotion.","The flame does not ask whether it is tired.","Prayer and practice walk together.","Kneel in reverence, stand in strength.","Discipline is a vow renewed every morning.","The faithful do not skip the warm-up.","A pure heart deserves a strong body.","Silence the doubt with steady work.","Penance is not punishment, it is progress.","The candle burns steady, not wild.","Every drop of sweat is an offering.","Your devotion is measured in consistency.","Trust the rite: warm-up, work, cool-down.","The sanctuary is wherever you train.","Mercy for the body, firmness for the will.","Faith grows where effort is planted.","Hold the hymn in your breath.","The armour of faith fits the strong.","Rest is a sacrament too.","A steady pace honours the long pilgrimage.","Let zeal fuel you, not consume you.","Every clean form is a prayer answered.","The choir sings for those who persevere.","Hope rises with every completed set.","Humility in the warm-up, fervour in the work.","Grace is the reward of patience.","The pilgrim's road is walked one step at a time.","Your vows are kept in small daily acts.","Light the candle of purpose before each set.","The relic of strength is earned, not found.","Kneel to rest, rise to fight.","The flame grows when it is fed.","Lean on faith when the body leans on the bar.","Order in training brings peace in the mind.","Gentle with the body, fierce with the will.","Every morning is a fresh litany.","A sister never trains alone. Her faith walks with her.","Fervour without form is a sin against the joints.","Bless the cool-down. It mends.","The sacred fire burns in steady breaths.","Endure today. Rejoice tomorrow.","Your devotion is visible in your stride.","Walk in faith, train in truth."],
  toast:["Logged. The flame burns bright.","Logged. A verse of devotion completed.","Logged. Faith rewarded.","Logged. Your vow is kept.","Logged. The choir sings.","Logged. Another offering made.","Logged. Zeal well spent.","Logged. The sanctuary is blessed.","Logged. Strength through faith.","Logged. The rite is complete.","Logged. Doubt is silenced.","Logged. Grace earned in sweat.","Logged. The pilgrimage continues.","Logged. A candle lit.","Logged. Your devotion shines.","Logged. The hymn of iron rings.","Logged. Penance turned to progress.","Logged. Faith made strong.","Logged. The sacred flame grows.","Logged. Kneel and rest now.","Logged. The relic of discipline gleams.","Logged. Another prayer answered.","Logged. The order of the day is kept.","Logged. Hope rises.","Logged. Fervour and form, united.","Logged. The litany is sung.","Logged. Blessed effort.","Logged. Your armour of faith holds.","Logged. Mercy for the body, rest now.","Logged. The sisterhood salutes you.","Logged. Steady as a candle.","Logged. Another step on the road.","Logged. Devotion recorded.","Logged. The will stands firm.","Logged. Rejoice in the work.","Logged. Holy persistence.","Logged. The fire is fed.","Logged. Faith walks with you.","Logged. Strength sanctified.","Logged. Peace after the battle.","Logged. Pure resolve.","Logged. The vows hold.","Logged. Amen to that set.","Logged. Well endured."]},
 slaanesh:{notes:["Perfection is a habit, not an accident.","Indulge in the burn. You have earned it.","Every rep can be more beautiful than the last.","Excess in effort, restraint in form.","Savour the moment the set gets hard.","Elegance is the reward of discipline.","Desire progress like you desire pleasure.","A flawless rep is its own delight.","Feel every muscle. Waste no sensation.","Beauty demands repetition.","Chase the sensation of strength.","Your body is a work of art in progress.","Refine. Then refine again.","Pleasure in effort, pride in form.","The mirror smiles at the consistent.","Make the warm-up a ritual of luxury.","Rest is the finest indulgence.","Every movement deserves your full attention.","The extraordinary is built from ordinary days.","Grace under load is the ultimate seduction.","Pursue the perfect set, forgive the imperfect one.","Excellence is a craving worth feeding.","Feel the stretch like silk.","Delight in the small improvements.","A sculpted body begins with a patient mind.","Rhythm is pleasure in motion.","Never settle for a sloppy rep.","Hydrate. Even beauty needs water.","Savour the cool-down like dessert.","The pursuit is the prize.","Elegance and power, in the same breath.","Train with passion, recover with pleasure.","Your progress is an exquisite secret.","Dare to be magnificent today.","Polish your form like a jewel.","Every session is a performance for yourself.","Intensity is a sensation to be mastered.","Indulge the body with good sleep.","Precision is the purest pleasure.","The finest things take time.","Seek the sublime in every set.","Desire, discipline, delight.","Your best rep is still ahead.","Be obsessed with getting better."],
  toast:["Logged. Exquisite.","Logged. A flawless indulgence.","Logged. Perfection draws closer.","Logged. Delicious effort.","Logged. Beauty in every rep.","Logged. Savour this feeling.","Logged. Magnificent work.","Logged. Your masterpiece grows.","Logged. Sensational.","Logged. Excess well spent.","Logged. Pure elegance.","Logged. The burn was divine.","Logged. Another layer of perfection.","Logged. You were stunning.","Logged. Desire fulfilled.","Logged. Refined and radiant.","Logged. The mirror approves.","Logged. A sublime session.","Logged. Indulge in your rest now.","Logged. Grace under load.","Logged. Polished to a shine.","Logged. Every sensation earned.","Logged. Breathtaking resolve.","Logged. Luxurious effort.","Logged. Your art evolves.","Logged. Rhythm and pleasure, united.","Logged. Exceptional.","Logged. Craving satisfied.","Logged. Nothing less than excellent.","Logged. The pursuit continues.","Logged. Simply gorgeous.","Logged. A delight to witness.","Logged. Splendid form.","Logged. You outdid yourself.","Logged. Treat yourself to recovery.","Logged. Flawless finish.","Logged. Passion rewarded.","Logged. Your sculpture takes shape.","Logged. Lavish effort.","Logged. Divine discipline.","Logged. Another jewel polished.","Logged. Sheer brilliance.","Logged. More beautiful than yesterday.","Logged. Utterly perfect."]},
 nurgle:{notes:["Slow and steady outlasts fast and fragile.","Every rep is a little gift from Grandfather.","Endure. Then endure a bit more.","Like a good mould, progress spreads quietly.","Sore muscles are just blessings settling in.","The garden grows even when you cannot see it.","Patience is the sweetest rot.","A sniffle is no excuse. A fever is.","Persistence is contagious. Spread it.","Grandfather loves a steady routine.","Decay comes for all. Strength makes it wait.","Stay hydrated, my little one. Swamps need water.","Every session is compost for tomorrow.","Resilience grows best in damp, dark weeks.","Laugh at the hard sets. Grandfather does.","Small steps, like spores, travel far.","The cool-down is a warm bath for the soul.","Rest well. Even flies need sleep.","Consistency is the most stubborn infection.","Your toughness is ripening nicely.","Grandfather is proud of every rep.","Stagnant water breeds. Stagnant training does not.","Embrace the plateau. It is just fermenting.","Rot is slow. So is real strength.","Hearty soup, hearty sets.","Keep going. The garden is patient.","Unkillable is a habit.","Your blisters are badges of devotion.","Shrug off the doubt like a winter cold.","Grandfather sees you train even in the rain.","Warm-ups keep the joints from creaking.","Every week adds a new layer, like moss.","Endurance is love made visible.","Slow growth is still growth.","Count reps like Grandfather counts his blessings.","Be the cockroach of consistency.","Your resilience blooms like a fine fungus.","The swamp rewards those who keep wading.","Steady breaths, steady reps, steady rot.","Good sleep is the best ointment.","Nothing stops the patient ones.","Shared sweat is a gift. Give generously.","Grandfather's garden needs your strong legs.","Tomorrow you will be a little tougher."],
  toast:["Logged. Grandfather is delighted.","Logged. Another blessing ripens.","Logged. Endurance blooms.","Logged. The garden grows.","Logged. Tough as old leather.","Logged. Persistence spreads.","Logged. A lovely, sweaty gift.","Logged. Unkillable once more.","Logged. The rot cannot stop you.","Logged. Resilience fermenting nicely.","Logged. Grandfather claps his hands.","Logged. A hearty effort.","Logged. Spores of progress released.","Logged. Slow, steady, unstoppable.","Logged. Your toughness thickens.","Logged. Compost for tomorrow.","Logged. The flies cheer.","Logged. Another layer of moss.","Logged. Stubborn as a cold.","Logged. Rest now, little rotling.","Logged. The swamp approves.","Logged. Endured with a smile.","Logged. Blisters well earned.","Logged. Grandfather beams.","Logged. Patience rewarded.","Logged. A ripe session.","Logged. Your garden flourishes.","Logged. Persistence is beautiful.","Logged. The plateau ferments.","Logged. Hardy and happy.","Logged. Nothing stops you.","Logged. A generous gift of sweat.","Logged. Tougher than yesterday.","Logged. The blessings multiply.","Logged. Steady as decay.","Logged. Grandfather tucks you in.","Logged. Resilient to the core.","Logged. The mould of greatness grows.","Logged. Waded through the swamp.","Logged. Strength that lasts.","Logged. Bloom, little one.","Logged. Shrugged it off.","Logged. A truly enduring effort.","Logged. Grandfather loves you."]},
 plain:{notes:["Show up. The rest follows.","Progress hides in boring weeks.","Good form is the best insurance.","Sleep well, train better.","A plan you follow beats a perfect plan you skip.","Warm up like you mean it.","Small wins add up faster than you think.","Recovery is where the gains happen.","Drink some water before you start.","Strength is built over months, not days.","Easy runs should feel easy.","One clean rep beats three sloppy ones.","Breathe out on the hard part.","Rest days are part of the plan.","What gets written down gets better.","Consistency is a skill. Practise it.","You do not need motivation, just a start.","Leave one or two reps in the tank.","Keep the long view.","A short session still counts.","Protein helps, sleep helps more.","Stretch gently after training.","Stay curious about your own progress.","Patience is a training tool.","Hard days and easy days both matter.","Your future self is watching.","Plateaus are normal. Keep going.","Stand up and stretch between long sits.","Fuel the work, do not fear food.","Technique first, load second.","A deload week is training too.","Celebrate the streak, forgive the miss.","Walk more. It all counts.","Train for how you want to feel.","Steady effort beats heroic bursts.","Keep your shoulders happy.","Strong legs carry you further.","Done is better than perfect.","Your best workout is the one you finish.","Listen to your body, not your excuses.","Little by little, a lot.","Good habits compound like interest.","Make it simple, make it regular.","Today counts."],
  toast:["Logged. Effort counted.","Logged. Another one done.","Logged. Building momentum.","Logged. Proud of you.","Logged. Steady progress.","Logged. That was solid.","Logged. Habit strengthened.","Logged. Nicely done.","Logged. You showed up.","Logged. Rest well now.","Logged. Strong work.","Logged. Good form today.","Logged. Keep the streak going.","Logged. Well earned.","Logged. One step closer.","Logged. Excellent.","Logged. That adds up.","Logged. Way to go.","Logged. Getting stronger.","Logged. Consistency pays.","Logged. Good choice.","Logged. Training complete.","Logged. Success.","Logged. Right on schedule.","Logged. Foundation laid.","Logged. Effort recorded.","Logged. Respect.","Logged. Keep it rolling.","Logged. Great session.","Logged. Done and dusted.","Logged. You earned your rest.","Logged. Nice consistency.","Logged. Small win, big deal.","Logged. Strong finish.","Logged. That was the hard part.","Logged. See you next time.","Logged. Progress made.","Logged. Well paced.","Logged. Good to go.","Logged. Your future self thanks you.","Logged. Another good day.","Logged. Mission accomplished.","Logged. Brilliant.","Logged. Onwards."]}};
Object.keys(TXX).forEach(function(k){if(!own(THEMES,k))return;["notes","toast"].forEach(function(f){THEMES[k][f]=(THEMES[k][f]||[]).concat(TXX[k][f]);});});
/* pick without repetition inside a pass: a seeded shuffle per pass of the list */
function pickNR(list,n,salt){var L=list.length;if(!L)return "";var pass=Math.floor(n/L),pos=((n%L)+L)%L,idx=[];for(var i=0;i<L;i++)idx.push(i);
  var x=(pass*2654435761+salt*97+L)>>>0||1;for(var j=L-1;j>0;j--){x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;var r=x%(j+1),t=idx[j];idx[j]=idx[r];idx[r]=t;}return list[idx[pos]];}
function TH(){if(D.pendingTheme){if(D.pendingTheme==="love"&&!loveOn())D.wantLove=true;else if(own(THEMES,D.pendingTheme))D.theme=D.pendingTheme;delete D.pendingTheme;}
  return THEMES[thKey()];}
// Effective theme: a chosen but locked love theme (e.g. an old device before the new code is entered) stays in D.theme, but renders as templar.
function thKey(){var k=own(THEMES,D.theme)?D.theme:"templar";return k==="love"&&!loveOn()?"templar":k;}
var UIW={holdx:"Hold the line",obhi:"Welcome to the crusade.",kday:"Battle day",rdx:"Daily readiness check",rdq:"How fares the warrior today?",pause:"Stand down",resume:"Return to the crusade",paused:"Standing down",healed:"Wounds closed",comeback:"Return to arms",plat:"The vow stands still",goal:"Your vow",gset:"Swear a vow",gdone:"Vow fulfilled",gstep:"Vow milestone",orders:"Your orders for today",battle:"How hard was the battle?",oath:"Oath of induction",begin:"Begin the crusade",chron:"Chronicle",crusade:"Your crusade"},
    UIP={orders:"Today's plan",battle:"How hard was it?",oath:"Setup",begin:"Let's go",chron:"Log",crusade:"Your plan"},
    UIL={orders:"Your plan for today, love",battle:"How did it feel, love?",oath:"Made with love, just for you",begin:"Let's start, love",chron:"Memories",crusade:"Your journey",focus:"Little tips from me",honours:"Your badges",records:"Your records (I'm so proud)",rank:"Your rank in my heart"};
var UIX={holdx:"Hold",obhi:"Welcome.",kday:"Class day",rdx:"Daily readiness check",rdq:"How do you feel today?",pause:"Pause training",resume:"Resume training",paused:"Training paused",healed:"Healed",comeback:"Comeback",plat:"Plateau",goal:"Goal",gset:"Set a goal",gdone:"Goal reached",gstep:"Goal step",kit:"Field kit",adds:"Your additions",addex:"+ Add exercise",xrun:"+ Easy run",oa:"Other activity",extras:"Extras",easy:"Easy week now",rest:"Weekly rest day",load:"Weekly load",never:"Never suggested",backlog:"Log a past day",week:"The week ahead",bkrem:"Time for a backup",wsets:"Warm-up sets",anchor:"Anchor",focus:"Where to focus",honours:"Honours",records:"Personal records",rank:"Rank"};
function W(k){var u=TH().ui||{};return u[k]||UIW[k]||UIX[k]||"";}
function rankName(i){return TH().ranks[i]||RANKS[i][1];}
function applyTheme(){var t=TH(),h1=document.querySelector("header h1");if(h1)h1.textContent=W("title")||"Crusade Training Book";document.body.setAttribute("data-theme",thKey());loveLoad();var e=document.getElementById("emblem");if(e)e.innerHTML='<svg width="38" height="38" viewBox="0 0 100 100" aria-hidden="true">'+t.emb+'</svg>';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t.sw[0]);}
// Love lock + daily notes (A-008). No hash of the code ships anywhere. tools/encrypt_love.py writes src/love.enc.json (v2): a random salt, the PBKDF2
// iteration count, the notes as AES-GCM ciphertext and a verifier (AES-GCM ciphertext of LOVEVER); tools/build.py embeds it as LOVEENC.
// A code counts only if its PBKDF2-SHA256 key decrypts the verifier. Without LOVEENC the love theme stays locked.
// The derived key is kept on this device only (localStorage kz_love_k as "2:<salt>:<key>", never in D or backups); keys for another salt are void.
var LOVEVER="crusade-love-verifier-v2",LOVEIT=600000,LOVEMIN=12,LOVEKK="kz_love_k";
var LOVEENC={"v":2,"salt":"7k+quMz2QaOLmU1KbEnDOQ==","it":600000,"iv":"dCG3DZQwC6pD0wNT","ct":"u+S6g+Ep2vOwNiOoCbn6GSLndT+hddmjjpWDVOXhwqkLpgNAVtHg7ZNQHfL4dlEMb3iRDDCkll5Hy+nbL62AWRT7ELttIobgo5sD/HH+SuM7QHs4p7nCnmKR1NPYcjnsz/OxUjpNuR+3ngDD4Xs5DXk9RS0Fx46T8/3PRNUtomkNKcjuD7V63/u0CBRp7mBzyhOlrfj54eDcV3uOBP7RYJC0BGthb8vZ3bwDYZBJ2a4UfkJMxttlE7k+J+nxiXkgjIL3GHeyepZDoaap+oZvXGLUgGIOGJzXSk8Kt56ToFC0Rh234sxZl9wRzFtIne+o1qMRFMi2gr95wxCLzkgPYF1CgwjdPgVi0gQ6d2iJh+4Sn5oDh4w5puG1/DWmtM/Jz+D+R/hnT1Ow2FuwGdLeEojdGWrqEpnbpxe7/VZSLEnrqQZvkQUF4QhcHX8ZTYF8+Sp7VgNkm4EYhhgpyJ4ph7Turmxl/kjeQcCEbOCIxnNHeSBfXYRAl9s2ihHaHJUWXM9ww5RP6UIkBP1fjZBHv4CMHSnKPQHeraVqvRjUBTHinxbQzDmFBH8UdW+8eND1gMSDDYN6cuuhiJnzglUViNZvgzC+7XEcqzbzyXNu/BM4YLSN2m7OMI+0XcOH++WmU6o2OaRTy5JnDhmnEGJNhz+SYoSXSVXUThqFO2p6hxbWquTLnULxICuhqmVzTILDkMOi3In4IrisOQhfmdN8u6n2JLfstliheeG0j7YQJX/xYUufAhJxuWIgzvjq49Yb7ONeYv4P0X+OnV2/9hnq1aCXhoQBPvK3KJMPmZW2/ADipyzyrurXhHxRUQQuX6WNmvK9HVpYnoCZZWMKq2zWaE7hDB+U2OVg5hPua05DrU5qyR4VO+k3tcO+6spfrOvBFeChzJ4NmXm9f1ZLTHoNgEFZs//sBLyd6WyV2i4mEys06QJVqWlqCp/evZDhRvus/gG2hU5fxE+HtODwDhVMxLtu5q4lm7jDw/aygp86kYNj0a0Qze8JuGQJFicoPT4qygwJiI4pLUS++hg40tZkhD5UNgCfebL7VPy5/Sq6Y4elk1E5ul+P/8xp2dGFzjutoOIFIciQ+BED/BQIwk+gz8APqGQRiLcyjJBvD3V2TBGqfZHzhJFeaCtTWCGB/HOYNjvzyNZIhI6sGQbmWbWICAqB2KD/KmuZiM2oDswPGgdPEbG8Pk3hYcf3UyrR6Au7CQKqTnSo0saEzOsJARWhcYVj1p4akm1W887YLUacZtgyyuLVcv9Q6ruuCB411HqGi1ll+kMdNycyc4IXyB8slTp9+XCJKMqMlDwLodIJhJQeCTuH7jbLZz+cF3cEZfAhHD+GOqmsbwgMxgPVLMAuhe+esPgrxUHR3kyyvbKi+IVuKedAYiu9es/nW59YPBEwvgjfwZmKofP7rFIEVNA8iMVpndHEcgkGXpzWwStm3xNwGtLD4T5mtCGjF4szSe8fzhTrlcPiSm0yKjv5UMLlSFpUN7PjUrto5KLkRTPp7nMToWs2wkvXItc6nNgYkM9g03Y3NYoK/oSKGUOca5q2Z6W7bNx5bBe04gsyMyCXq6sAo3CVxffOxZdbqnCwQx6nedsLXRrwlCmNue9PVfbTsqzRNWdD/+0AzlEUk7yVyss86GkiYtPAp0LWsrD0AHzLklD32zowag4wH9isfoLJwXTTksH9sEP8hs0O8zV+fWSQr2eK8Y7zNaE1PttUuNwqw9iuaVPsrxRHlG4swEMTLAUOeuTq0HscfytyZw0hkDXsFWJLGvKXhS9LspSrws/8gh0QPJYy0Ce8gy8cqYRdhKXxuwE3c1UFFBFKdJ6XBIP1hFKJ3USGpUdH2/QZf5RLGbjawczOwraeBsw8OjN2sCZtYVhJFF3bKedz","viv":"YDcTQSmn2UGPsMcT","vct":"/BYaXVp3h72uZdkKiNVfyAt7dkGJzP8ult67ARt8P2ULnEaB/yU9dQ=="};
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
/* A-046: after the highest rank a further stage every 8,000 XP, own name per theme plus a number (passive) */
var RKSTEP=8000,RKX={templar:"Hero of the Crusade",sanguine:"Angel of the Host",sisters:"Living Saint",slaanesh:"Exalted One",nurgle:"Grandfather's Chosen",plain:"Legend",love:"Forever Strong"};
function rankExt(xp){var top=RANKS[RANKS.length-1][0];return xp>=top+RKSTEP?Math.floor((xp-top)/RKSTEP):0;}
function rankLabel(xp){var e=rankExt(xp);return e?(RKX[thKey()]||RKX.templar)+" "+e:rankName(rankOf(xp));}
function afterLog(rk0,prs,lg){var xp=xpTotal(),rk=rankOf(xp),m="",xe=rankExt(xp);
  if(rk>rk0) m="Rank up: "+rankName(rk)+"! "+((TH().ups&&TH().ups[rk])||TH().up);
  else if(xe){var ll=D.logs[D.logs.length-1];if(xe>rankExt(xp-(ll?xpOf(ll):0)))m="Rank up: "+rankLabel(xp)+"! "+TH().up;}
  else if(prs&&prs.length) m=W("newrec")+prs.slice(0,2).join(" · ");
  D.honSeen=D.honSeen||[];var nh=honours().filter(function(h){return h.got&&D.honSeen.indexOf(h.k)<0;});
  if(nh.length){nh.forEach(function(h){D.honSeen.push(h.k);});m=(m?m+" ":"")+W("newhon")+nh.map(function(h){return h.n;}).join(", ")+".";}
  var nt=[];honTiers().forEach(function(t){for(var i=1;i<=t.tier;i++){var kk=t.k+i;if(D.honSeen.indexOf(kk)<0){D.honSeen.push(kk);if(i===t.tier)nt.push(t.n);}}});if(nt.length)m=(m?m+" ":"")+W("newhon")+nt.join(", ")+".";
  var gm=goalCheck(lg);if(gm)m=(m?m+" ":"")+gm;
  D._toastX=m;
}
function weekKey(s){var d=pd(s),wd=(d.getDay()+6)%7;return addD(s,-wd);}
function streaks(){
  var days={},mo={};D.logs.forEach(function(l){days[l.d]=1;if(l.id==="MO")mo[l.d]=1;});
  /* P-7: paused days bridge a streak (no loss, no gain). */
  function run(set){var n=0,best=0,cur=0,dd=addD(TODAY,set[TODAY]?0:-1);for(var g=0;g<800&&(set[dd]||pausedDay(dd));g++){if(set[dd])n++;dd=addD(dd,-1);}
    Object.keys(set).sort().forEach(function(k,i,a){cur=(i&&(diff(a[i-1],k)===1||pausedIn(addD(a[i-1],1),k)===diff(a[i-1],k)-1))?cur+1:1;best=Math.max(best,cur);});return {now:n,best:best};}
  var wk={};D.logs.forEach(function(l){if(l.id!=="MO"){var k=weekKey(l.d);wk[k]=(wk[k]||0)+1;}});
  var w=0,ww=weekKey(TODAY);if((wk[ww]||0)<3)ww=addD(ww,-7);for(var g2=0;g2<200;g2++){if((wk[ww]||0)>=3)w++;else if(!pausedIn(ww,addD(ww,7)))break;ww=addD(ww,-7);}
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
/* A-046: six tiered honours (passive), seen tiers in honSeen as "<key><tier>"; a tier once reached stays */
var HTIER=[["t_ent","Chronicler","Logbook","entries",[100,500,1000,2000]],["t_km","Pilgrim's Road","Distance","km",[100,500,1000,2000]],["t_wks","Steadfast","Consistency","weeks with 3+ sessions in a row",[4,26,52,104]],
  ["t_yrs","Veteran of Years","Years","years of training",[1,2,3]],["t_rec","Record Keeper","Records","records",[10,50,100]],["t_blz","Blitz Zealot","Core Blitz","Core Blitzes",[25,100,250]]],ROMAN=["","I","II","III","IV"];
function honTiers(){var L=D.logs,st=streaks(),pl=thKey()==="plain"||thKey()==="love",seen=D.honSeen||[];
  var first=L.length?L[0].d:TODAY,v={t_ent:L.length,t_km:Math.round(L.reduce(function(a,l){return a+(l.km||0);},0)),t_wks:st.weeks,t_yrs:Math.floor(diff(first,TODAY)/365),t_rec:L.reduce(function(a,l){return a+(l.pr||0);},0),t_blz:L.filter(function(l){return l.abs;}).length};
  return HTIER.map(function(t){var tier=0;t[4].forEach(function(x,i){if(v[t[0]]>=x||seen.indexOf(t[0]+(i+1))>=0)tier=i+1;});var nx=t[4][tier];
    return {k:t[0],n:(pl?t[2]:t[1])+(tier?" "+ROMAN[tier]:""),tier:tier,max:t[4].length,v:v[t[0]],next:nx||0,u:t[3],d:nx?"Next: "+nx+" "+t[3]+" ("+Math.min(v[t[0]],nx)+"/"+nx+")":"Highest tier reached"};});}
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
  var ks=kmStat();if(ks.n>=2&&ks.avg>0&&ks.cur>1.3*ks.avg)out.push(["info","Running "+fmtKg(ks.cur)+" km this week, more than 30 % above your 4-week average of "+fmtKg(ks.avg)+" km. Keep the next runs easy."]);
  var rl=D.logs.filter(function(l){return l.rd&&diff(l.d,TODAY)<28;});if(rl.length>=3){var rc=[0,0,0,0];rl.forEach(function(l){rc[l.rd]++;});out.push([rc[3]>=3?"warn":"info","Readiness over 4 weeks: good "+rc[1]+" · normal "+rc[2]+" · tired "+rc[3]+"."+(rc[3]>=3?" Tired often: sleep and an easier week bring more than pushing through.":"")]);}
  var ls=loadStat();if(ls.n>=2&&ls.avg>0&&ls.cur>1.5*ls.avg)out.push([ls.lim>=2?"warn":"info","Load this week "+ls.cur+", "+(Math.round(ls.cur/ls.avg*10)/10)+"× your 4-week average"+(ls.lim>=2?", with "+ls.lim+" sessions at the limit":"")+". Plan an easy day before the next hard one."]);
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
/* A-038: date with the year once it is not in the current year (Chronicle, records, goal archive, pause dates). */
function dLabY(s){var d=pd(s);return dLab(s)+(d.getFullYear()!==pd(TODAY).getFullYear()?" "+d.getFullYear():"");}
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
function barChart(vals,labs,unit,aria,ref){
  var W=320,H=150,pl=8,pb=22,mx=Math.max.apply(null,vals.concat([1,ref||0])),bw=(W-pl*2)/vals.length,h='';
  [0.5,1].forEach(function(f){var y=H-pb-(H-pb-14)*f;h+='<line class="gr" x1="0" x2="'+W+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+W+'" y="'+(y-3)+'" text-anchor="end">'+Math.round(mx*f*10)/10+'</text>';});
  vals.forEach(function(v,i){var bh=(H-pb-14)*v/mx,x=pl+i*bw+2;h+='<path class="br'+(i===vals.length-1?" cur":"")+'" d="'+rbar(x,H-pb-bh,bw-4,bh)+'"><title>'+esc(labs[i]+": "+(Math.round(v*10)/10)+" "+unit)+'</title></path>';
    if(i%3===2||i===vals.length-1)h+='<text class="ax" x="'+(x+(bw-4)/2)+'" y="'+(H-6)+'" text-anchor="middle">'+labs[i]+'</text>';});
  if(ref>0){var ry=H-pb-(H-pb-14)*ref/mx;h+='<line class="rf" x1="0" x2="'+W+'" y1="'+ry+'" y2="'+ry+'"><title>'+esc("Average: "+Math.round(ref)+" "+unit)+'</title></line>';}
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
function rankHTML(){var xp=xpTotal(),rk=rankOf(xp),nx=RANKS[rk+1],st=streaks(),h='',top=RANKS[RANKS.length-1][0],xe=rankExt(xp),nxx=top+(xe+1)*RKSTEP,b0=xe?top+xe*RKSTEP:top;
  var prog=nx?Math.round(100*(xp-RANKS[rk][0])/(nx[0]-RANKS[rk][0])):Math.round(100*(xp-b0)/(nxx-b0));
  h+='<div class="sec"><div class="rank"><div class="rk-ic" aria-hidden="true"><svg viewBox="0 0 100 100" width="52" height="52">'+TH().emb+'</svg></div><div class="rk-b"><span class="eyebrow">'+W("rank")+'</span><b>'+esc(rankLabel(xp))+'</b><svg class="pbar" viewBox="0 0 100 8" preserveAspectRatio="none" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+prog+'" aria-label="Progress to next rank"><rect class="p0" width="100" height="8" rx="4"/><rect class="p1" width="'+prog+'" height="8" rx="4"/></svg><span class="muted">'+xp+' XP'+(nx?' · '+(nx[0]-xp)+' XP to '+rankName(rk+1):' · '+(nxx-xp)+' XP to '+esc((RKX[thKey()]||RKX.templar)+" "+(xe+1)))+'</span></div></div>'+
    '<div class="tally"><div class="t"><b>'+st.day.now+(st.day.now===1?' day':' days')+'</b>Current streak</div><div class="t"><b>'+st.weeks+(st.weeks===1?' week':' weeks')+'</b>Weeks with 3+ sessions</div><div class="t"><b>'+st.mo.now+'</b>Morning streak</div></div></div>';
  return h;}
/* A-046: period for calendar, load and kilometres: 12 weeks (weekly), 1 year or everything (monthly values) */
var MONN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function perNow(){return D._per==="1y"||D._per==="all"?D._per:"12w";}
function perName(){return {"12w":"12 weeks","1y":"1 year",all:"everything"}[perNow()];}
function monLab(m){return MONN[+m.slice(5,7)-1]+" "+m.slice(2,4);}
function perHTML(){return '<div class="chips per" role="group" aria-label="Period">'+[["12w","12 weeks"],["1y","1 year"],["all","All"]].map(function(x){var on=perNow()===x[0];return '<button type="button" class="b sm'+(on?" on":"")+'" data-a="per" data-v="'+x[0]+'" aria-pressed="'+on+'">'+x[1]+'</button>';}).join("")+'</div>';}
function perMonths(){var cur=TODAY.slice(0,7),first=D.logs.length?D.logs[0].d.slice(0,7):cur,ms=[],y=+cur.slice(0,4),mo=+cur.slice(5,7);
  var n=perNow()==="1y"?12:Math.max(1,(y-+first.slice(0,4))*12+mo-+first.slice(5,7)+1);for(var i=n-1;i>=0;i--){var t=(y*12+mo-1)-i;ms.push(Math.floor(t/12)+"-"+pad(t%12+1));}
  var ix={};ms.forEach(function(m,i){ix[m]=i;});var r={l:ms.map(monLab),m:ms,n:ms.map(function(){return 0;}),km:ms.map(function(){return 0;}),ld:ms.map(function(){return 0;})};
  D.logs.forEach(function(l){var i=ix[l.d.slice(0,7)];if(i==null||l.d>TODAY)return;if(l.id!=="MO")r.n[i]++;r.km[i]+=l.km||0;r.ld[i]+=logLoad(l);});r.km=r.km.map(function(x){return Math.round(x*10)/10;});r.ld=r.ld.map(Math.round);return r;}
/* A-046: year review card under Status – by itself after 52 weeks (the last 12 months) and in January (the year before) */
function yearRev(){var L=D.logs;if(!L.length)return null;var y=+TODAY.slice(0,4),f,t,lab;
  if(TODAY.slice(5,7)==="01"&&L.some(function(l){return l.d.slice(0,4)===String(y-1);})){f=(y-1)+"-01-01";t=(y-1)+"-12-31";lab="Your year "+(y-1);}
  else if(diff(L[0].d,TODAY)>=364){f=addD(TODAY,-364);t=TODAY;lab="Your last 12 months";}else return null;
  var P=L.filter(function(l){return l.d>=f&&l.d<=t;}),days={};P.forEach(function(l){days[l.d]=1;});var best=0,cur=0,prev=null;Object.keys(days).sort().forEach(function(d){cur=prev&&diff(prev,d)===1?cur+1:1;best=Math.max(best,cur);prev=d;});
  return {lab:lab,ses:P.filter(function(l){return l.id!=="MO";}).length,km:Math.round(P.reduce(function(a,l){return a+(l.km||0);},0)),rec:P.reduce(function(a,l){return a+(l.pr||0);},0),goals:(D.goalsDone||[]).filter(function(g){return g.r==="f"&&g.d>=f&&g.d<=t;}).length,streak:best,f:f,t:t};}
function yearHTML(){var r=yearRev();if(!r)return "";return '<div class="sec yrev"><h3>'+esc(r.lab)+'</h3><div class="tally"><div class="t"><b>'+r.ses+'</b>Sessions</div><div class="t"><b>'+r.km+' km</b>Running</div><div class="t"><b>'+r.rec+'</b>Records</div><div class="t"><b>'+r.goals+'</b>Goals reached</div><div class="t"><b>'+r.streak+(r.streak===1?' day':' days')+'</b>Longest streak</div></div></div>';}
function tierHTML(){var T=honTiers();return '<div class="sec"><h3>'+esc(W("honours"))+' · tiers</h3><div class="hon tiers">'+T.map(function(x){return '<div class="hn'+(x.tier?" got":"")+'"><span class="hi" aria-hidden="true">'+(x.tier?ROMAN[x.tier]:"○")+'</span><b>'+esc(x.n)+'</b><span>'+esc(x.d)+'</span></div>';}).join("")+'</div></div>';}
function statsHTML(){var h='';
  var ins=insights();
  h+='<div class="sec"><h3>'+W("focus")+'</h3>'+ins.map(function(x){return '<p class="ins '+x[0]+'"><span class="ii" aria-hidden="true">'+({focus:"➜",warn:"!",good:"✓",info:"i"}[x[0]])+'</span><span>'+esc(x[1])+'</span></p>';}).join("")+'</div>';
  var t=areaTargets(),c=areaCounts(28);
  h+='<div class="sec"><h3>Balance · last 4 weeks</h3><p class="muted">Sessions per area against the target for your focus. The tick marks the target.</p>'+
    Object.keys(t).filter(function(k){return t[k]>0;}).map(function(k){var f=Math.min(1.25,c[k]/t[k]);return '<div class="bal"><span>'+AREAN[k]+'</span><svg class="bt" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true"><rect class="b0" width="100" height="12" rx="6"/><rect class="b1" width="'+Math.round(f/1.25*100)+'" height="12" rx="6"/><rect class="tk" x="79.5" y="0" width="1.4" height="12"/></svg><b>'+c[k]+'/'+t[k]+'</b></div>';}).join("")+'</div>';
  var mon=perNow()!=="12w",pm=mon?perMonths():null;
  var wk=[],wl=[],km=[];for(var i=11;i>=0;i--){var ws=addD(weekKey(TODAY),-i*7);wl.push(dLab(ws));wk.push(D.logs.filter(function(l){return l.id!=="MO"&&l.d>=ws&&l.d<addD(ws,7);}).length);km.push(D.logs.filter(function(l){return l.d>=ws&&l.d<addD(ws,7);}).reduce(function(a,l){return a+(l.km||0);},0));}
  if(mon){wk=pm.n;wl=pm.l;km=pm.km;}
  h+='<div class="sec"><h3>'+(mon?'Sessions per month':'Sessions per week')+'</h3>'+perHTML()+barChart(wk,wl,"sessions",mon?"Training sessions per month, "+perName():"Training sessions per week, last 12 weeks")+tableView([mon?"Month":"Week of","Sessions"],wl.map(function(x,i){return [x,wk[i]];}))+'</div>';
  var ld=[];for(var j=11;j>=0;j--)ld.push(Math.round(weekLoad(addD(weekKey(TODAY),-j*7))));var lst=loadStat();if(mon)ld=pm.ld;
  h+='<div class="sec"><h3>'+esc(W("load"))+'</h3><p class="muted">How hard × minutes, every session, run, class and activity. This week '+lst.cur+(mon?' · chart: '+perName()+' in monthly sums':(lst.n?' · 4-week average '+lst.avg+' (dashed line)':''))+'. Weeks without training do not count for the average.</p>'+barChart(ld,wl,"load",mon?"Load per month, "+perName():"Weekly load, last 12 weeks",mon?null:lst.avg)+tableView([mon?"Month":"Week of","Load"],wl.map(function(x,i){return [x,ld[i]];}))+'</div>';
  var S=exSeries(),keys=Object.keys(S).filter(function(k){return S[k].length>=2;}).sort(function(a,b){return S[b].length-S[a].length;});
  h+='<div class="sec"><h3>Exercise progress</h3>';
  if(!keys.length) h+='<p class="muted">Appears once an exercise has been logged twice.</p>';
  else{var sel=keys.indexOf(D.statEx)>=0?D.statEx:keys[0],ser=S[sel],useW=ser.some(function(p){return p.w>0;});
    h+='<label class="lab" for="statex">Exercise</label><select id="statex" data-a="statex">'+keys.map(function(k){return '<option value="'+esc(k)+'"'+(k===sel?" selected":"")+'>'+esc(exName(k))+'</option>';}).join("")+'</select>';
    var pts=ser.map(function(p){return {y:useW?p.w:p.r,l:dLab(p.d),t:dLab(p.d)+": "+p.r+(p.w?" × "+fmtKg(p.w)+" kg":"")};});
    /* A-046: from 40 points the chart shows the best value per month */
    var mb=pts.length>=40;if(mb){var MB={},MO=[];ser.forEach(function(p,i){var m=p.d.slice(0,7);if(!MB[m]){MB[m]=pts[i];MO.push(m);}else if(pts[i].y>MB[m].y)MB[m]=pts[i];});pts=MO.map(function(m){var x=MB[m];return {y:x.y,l:monLab(m),t:monLab(m)+" best: "+x.t.replace(/^[^:]*: /,"")};});}
    var first=pts[0].y,last=pts[pts.length-1].y,dv=Math.round((last-first)*10)/10;
    h+='<p class="muted">'+(useW?"Weight in kg":"Best set")+' · '+(dv>0?'+'+dv+' since '+pts[0].l:(dv<0?dv+' since '+pts[0].l:'level since '+pts[0].l))+'</p>'+(mb?'<p class="muted mbest">Best value per month</p>':'')+lineChart(pts,"",exName(sel)+" progress")+tableView(["Date","Best set"],ser.map(function(p){return [dLabY(p.d),p.r+(p.w?" × "+fmtKg(p.w)+" kg":"")];}));}
  h+='</div>';
  if(D.focus!=="str"||D.logs.some(function(l){return l.km;})){
    var runs=D.logs.filter(function(l){return l.km>0&&l.min>0;}).slice(-15);
    var kst=kmStat(),r28=D.logs.filter(function(l){return isRun(l)&&diff(l.d,TODAY)<28&&diff(l.d,TODAY)>=0;}),ez=r28.filter(function(l){return !hardRunL(l);}).length;
    h+='<div class="sec"><h3>Running</h3><p class="muted">This week '+fmtKg(kst.cur)+' km'+(mon?' · chart: '+perName()+' in monthly sums':(kst.n?' · 4-week average '+fmtKg(kst.avg)+' km (dashed line)':''))+(r28.length?' · easy share '+Math.round(100*ez/r28.length)+' % of '+r28.length+' runs in 4 weeks':'')+'.</p>'+barChart(km,wl,"km",mon?"Kilometres per month, "+perName():"Kilometres per week, last 12 weeks",mon?null:kst.avg);
    if(runs.length>=2){h+='<p class="muted">Pace per run (higher is faster)</p>'+lineChart(runs.map(function(l){return {y:l.min/l.km,l:dLab(l.d),t:dLab(l.d)+": "+fmtKg(l.km)+" km in "+pace(l)};}),"pace","Running pace per run",true);}
    h+=tableView(["Week of","km"],wl.map(function(x,i){return [x,Math.round(km[i]*10)/10];}))+'</div>';}
  var H=honours();
  h+='<div class="sec"><h3>'+W("honours")+' · '+H.filter(function(x){return x.got;}).length+' of '+H.length+'</h3><div class="hon">'+H.map(function(x){return '<div class="hn'+(x.got?" got":"")+'"><span class="hi" aria-hidden="true">'+(x.got?"✠":"○")+'</span><b>'+esc(x.n)+'</b><span>'+esc(x.d)+(x.got?"":(x.prog?" · "+x.prog:""))+'</span><span class="vh">'+(x.got?"earned":"not yet")+'</span></div>';}).join("")+'</div></div>';
  h+=tierHTML();
  var prl=Object.keys(D.pr).filter(function(k){return D.pr[k].n;}).map(function(k){return D.pr[k];}).sort(function(a,b){return a.d<b.d?1:-1;}).slice(0,8);
  if(prl.length)h+='<div class="sec"><h3>'+W("records")+'</h3>'+prl.map(function(e){return '<div class="log"><span>'+esc(e.n)+'</span><b>'+e.r+(e.w?" × "+fmtKg(e.w)+" kg":"")+'</b><span class="muted">'+dLabY(e.d)+'</span></div>';}).join("")+'</div>';
  return h;
}
function weekTally(){
  var w=D.logs.filter(function(l){var x=diff(l.d,TODAY);return x>=0&&x<=6;});
  function n(f){return w.filter(f).length;}
  var sk=selSk().length?4:0,F=D.focus,T2=F==="run"?[["Strength sessions",n(function(l){return STR[l.id];}),2],["Easy run",n(function(l){return l.id==="RE";}),3],["Intervals",n(function(l){return l.id==="RI";}),1],["Long run",n(function(l){return l.id==="RH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk?2:0]]:
    [["Strength A",n(function(l){return l.id==="KA";}),1],["Strength B",n(function(l){return l.id==="KB";}),1],["Strength C / Skill Trial",n(function(l){return l.id==="KC"||l.id==="CH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk],["Easy run",n(function(l){return l.id==="RE";}),F==="str"?0:1],["Hard run",n(function(l){return l.id==="RH"||l.id==="RI";}),F==="str"?0:1]];
  T2=T2.concat([["Kickboxing",n(function(l){return l.id==="KI";}),D.kickDays.length],["Core Blitz",n(function(l){return l.abs;}),5],["Morning routine",n(function(l){return l.id==="MO";}),7]]);
  return '<div class="sec"><h3>This week</h3><div class="tally">'+T2.filter(function(t){return t[2]>0;}).map(function(t){return '<div class="t'+(t[1]>=t[2]?' met':'')+'"><b>'+t[1]+' / '+t[2]+(t[1]>=t[2]?' ✓':'')+'</b>'+t[0]+'</div>';}).join("")+'</div></div>';
}
function latestHTML(){var h='';
  var ex=Object.keys(D.ex).map(function(k){return D.ex[k];}).filter(function(e){return e.n;}).sort(function(a,b){return a.d<b.d?1:-1;}).slice(0,10);
  if(ex.length) h+='<div class="sec"><h3>Latest values</h3>'+ex.map(function(e){return '<div class="log"><span>'+esc(e.n)+'</span><b>'+e.r+(e.w?' × '+fmtKg(e.w)+' kg':'')+'</b></div>';}).join("")+'</div>';
  return h;}
function vVerlauf(){var mon=perNow()!=="12w",pm=mon?perMonths():null;var h='<div class="card"><div class="sec"><h2>'+esc(W("chron"))+'</h2>'+(D.logs.length?(mon?'<h3>Training calendar · '+perName()+'</h3>'+perHTML()+barChart(pm.n,pm.l,"sessions","Training sessions per month, "+perName()):'<h3>Training calendar · 12 weeks</h3>'+perHTML()+heatmap()):'<p class="muted empty">Nothing logged yet. Every session, run and class you log appears here, with a calendar of your training days.</p>')+'</div>';
  h+='<div class="sec"><h3>All entries</h3>'+blHTML();
  /* A-046: older entries are built only on request, 50 at a time */
  var nl=D.logs.length,shown=Math.min(nl,20+(D._chn||0)),rev=D.logs.slice(nl-shown).reverse();rev.forEach(function(l,ri){var i=nl-1-ri;
    h+='<div class="log"><b>'+esc(l.t)+'</b><span class="muted">'+dLabY(l.d)+'</span><span class="muted">'+(l.rpe?({4:"Easy",6:"Fine",8:"Hard",10:"At the limit"}[l.rpe]||""):'')+(l.km?' · '+fmtKg(l.km)+' km'+(l.min?' in '+fmtKg(l.min)+' min · '+pace(l):''):'')+(l.sum?' · '+esc(l.sum):'')+(l.note?' · '+esc(l.note):'')+'</span><span class="lacts"><button type="button" class="b sm" data-a="edit" data-i="'+i+'" aria-expanded="'+(D._edit===i)+'">Edit</button><button type="button" class="b sm" data-a="del" data-i="'+i+'">'+(D._del===i?'Really delete':'Delete')+'</button></span></div>'+(D._edit===i?editForm(l):'');});
  if(nl>shown)h+='<button type="button" class="b sm chmore" data-a="chmore">Show older entries ('+(nl-shown)+' more)</button>';
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
  var tv=D._tvEdit;
  var h='<div class="card">'+(D.logs.length?'<div class="sec"><h2>Your status</h2></div>'+rankHTML()+yearHTML():'<div class="sec"><h2>Your status</h2></div>')+goalLadder();
  h+='<div class="sec"><h3>Where you stand</h3>'+'<div class="tally"><div class="t"><b>'+LVN[lvUp()]+'</b>Upper body</div><div class="t"><b>'+LVN[lvLo()]+'</b>Lower body</div><div class="t"><b>'+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+'</b>Focus</div>'+(D.skills.mu?'<div class="t"><b>'+mu+'</b>Muscle-Up</div>':'')+(D.skills.hs?'<div class="t"><b>Stage '+hsStage()+' · '+hq.n+' × '+hq.h+' s</b>Handstand</div>':'')+(D.skills.ls?'<div class="t"><b>'+(lsKey()==="lsit"?"L-Sit ":"Tuck ")+lq.n+' × '+lq.h+' s</b>L-Sit</div>':'')+(D.skills.fl?'<div class="t"><b>'+FLN[D.profile.flSt||0]+'</b>Front Lever</div>':'')+(D.skills.pl?'<div class="t"><b>'+PLN[D.profile.plSt||0]+'</b>Planche</div>':'')+'<div class="t"><b>Week '+c.week+(dlWk(TODAY,c)?' · Deload':'')+'</b>Block '+c.blk+' · '+accWord(c.acc)+'</div>'+(D.focus!=="str"?'<div class="t"><b>'+fmtKg(D.runKm)+' km · '+D.runI+' × 3 min</b>Hard run · intervals</div>':'')+''+'</div>'+lvHint()+'</div>';
  if(D.logs.length<3)h+='<div class="sec"><p class="muted empty">Your charts, balance and honours fill in after your first 3 entries'+(D.logs.length?' ('+D.logs.length+' so far)':'')+'. Log a session and come back.</p></div>';
  else h+=weekTally()+statsHTML()+latestHTML();
  h+='<div class="sec"><div class="tvh"><h3>Test values</h3><button type="button" class="b sm" data-a="tvedit" aria-expanded="'+!!tv+'">'+(tv?'Done':'Edit')+'</button></div>'+
    (tv?'<div class="grid2">'+F2.map(function(x){return '<label for="p_'+x[0]+'">'+x[1]+'</label><input type="number" id="p_'+x[0]+'" inputmode="numeric" data-prof="'+x[0]+'" value="'+Math.round(p[x[0]]*10)/10+'">';}).join("")+'</div>'
       :'<div class="tvl">'+F2.map(function(x){return '<div class="log"><span>'+x[1]+'</span><b>'+(Math.round(p[x[0]]*10)/10)+'</b></div>';}).join("")+'</div>')+'</div>';
  h+='<div class="sec"><details class="tv"><summary>Cycle · started '+dLab(D.start)+'</summary><p class="muted">Blocks of 6 training weeks, the 6th is a deload with a test. The accent changes from block to block: base, then strength (heavier, more rest), volume (more reps, less rest), skill and tempo (long skill work, fewer sets). Weeks without training do not count.</p><div class="row"><label class="lab" for="p_start">Start date</label><input type="date" id="p_start" data-start="1" value="'+esc(D.start)+'" max="'+TODAY+'"></div></details></div>';
  h+='<div class="sec"><details class="tv"><summary>How the app learns</summary><p class="muted">Hold times adapt after every session, targets follow your last entry, front lever and planche stages rise once you manage the next variation, run length and intervals follow how hard it felt. Rep maxes are measured by the Skill Trial every 2 weeks and the test every 6 training weeks; clean sets in training can raise them, never lower them.</p></details></div>';
  return h+'</div>';
}
function favGroups(){var cat=favCatalog(),seen={},G=[["Glutes",GLUTES().concat(GLUTEX())],["Upper body",UPPERX()],["Core",COREX()]],out=[];
  G.forEach(function(g){var ns=[];g[1].forEach(function(it){it.opts.forEach(function(o){if(!seen[o.n]){seen[o.n]=1;ns.push(o);}});});out.push([g[0],ns]);});
  var rest=[];Object.keys(cat).forEach(function(n){if(!seen[n]){seen[n]=1;rest.push(cat[n].it.opts[cat[n].v]);}});rest.sort(function(a,b){return a.n<b.n?-1:1;});out.push(["From your plan",rest]);return out;}
function favRow(o){var on=(D.fav||[]).indexOf(o.n)>=0,q=(D._favq||"").toLowerCase(),hid=q&&o.n.toLowerCase().indexOf(q)<0,nv=isNever(o.n);
  return '<div class="fvr'+(hid?" hid":"")+'" data-n="'+esc(o.n)+'"><button type="button" class="fvrow'+(on?" on":"")+(hid?" hid":"")+'" data-a="fav" data-n="'+esc(o.n)+'" aria-pressed="'+on+'"><span class="st" aria-hidden="true">'+(on?"★":"☆")+'</span><span class="fn">'+esc(o.n)+'</span>'+(nv?'<span class="gt">'+esc(W("never"))+'</span>':'')+(can(o,"h")?'':'<span class="gt">Gym</span>')+'</button>'+
    '<button type="button" class="fvx'+(nv?" on":"")+'" data-a="'+(nv?"unnever":"never")+'" data-n="'+esc(o.n)+'" aria-pressed="'+nv+'" aria-label="'+esc((nv?"Bring back ":"Never suggest ")+o.n)+'" title="'+(nv?"Bring back":"Never suggest")+'">⊘</button></div>';}
function emphHTML(pre){return '<fieldset class="fs"><legend>Strength emphasis</legend><p class="muted">Adds an extra block to every strength session (Gym A, Gym B, Legs, Home). Running and skills stay as they are.</p><p class="muted">Legs & glutes and Glutes: legs at least twice a week, and each session keeps one fixed main exercise (⚓ '+esc(W("anchor"))+') so it can grow.</p>'+EMPH.map(function(x){return '<label class="optc"><input type="radio" name="'+pre+'_emph" value="'+x[0]+'" data-a="emph"'+(emph()===x[0]?" checked":"")+'><span><b>'+x[1]+'</b><span class="muted">'+(D.kickDays.length?x[2]:x[2].replace("Good for kickboxing and desk days.","Good for posture and desk days."))+'</span></span></label>';}).join("")+'</fieldset>';}
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
/* Extras (P-4): everything off by default, one line of explanation each. */
/* P-8: the readiness bar on the training page (strength sessions only, Extras switch on). */
function readyHTML(id){if(!D.opt||!D.opt.ready||!BANDIDS[id])return "";var r=rdDay();
  return '<div class="rdbar" role="group" aria-label="'+esc(W("rdq"))+'"><span class="muted">'+esc(W("rdq"))+'</span><div class="chips">'+[[1,"Good"],[2,"Normal"],[3,"Tired"]].map(function(x){var on=r===x[0];return '<button type="button" class="chip'+(on?" on":"")+'" data-a="ready" data-v="'+x[0]+'" aria-pressed="'+on+'">'+x[1]+'</button>';}).join("")+'</div>'+
    (r===3?'<p class="c gold">Tired today: about a third fewer sets, same weights. Stop every set 3–4 reps before failure, no tests or max attempts.</p>':(r===1?'<p class="muted">Good day: full rounds where the week has room. Still stop 1–2 reps before failure.</p>':''))+'</div>';}
/* P-7: one tap pauses from today; end date and reason are optional (folded). */
function pauseHTML(){var p=D.pause;
  if(!p)return '<div class="sec"><h3>'+esc(W("pause"))+'</h3><p class="muted">Holiday, illness or a busy stretch: no plan meanwhile, no lost streak, the cycle waits. After 10 days or more the first sessions come back lighter.</p><button type="button" class="b" data-a="pause">'+esc(W("pause"))+'</button></div>';
  return '<div class="sec"><h3>'+esc(W("paused"))+'</h3><p class="muted">Since '+WDN[pd(p.from).getDay()]+' '+dLabY(p.from)+'. Ends with your next logged session'+(p.to?' or after '+dLabY(p.to):'')+'.</p>'+
    '<details class="tv"><summary>End date and reason</summary><div class="grid2"><label for="pz_to">Until (optional)</label><input type="date" id="pz_to" data-a="pauseto" min="'+p.from+'" value="'+esc(p.to||"")+'"></div>'+
    '<div class="chips">'+[["pause","Break"],["ill","Ill"]].map(function(x){var on=p.why===x[0];return '<button type="button" class="chip'+(on?" on":"")+'" data-a="pausewhy" data-k="'+x[0]+'" aria-pressed="'+on+'">'+x[1]+'</button>';}).join("")+'</div></details>'+
    '<button type="button" class="b red" data-a="resume">'+esc(W("resume"))+'</button></div>';}
function extrasHTML(){var o=D.opt||{},c=ctx(TODAY),row=function(k,t,x){var on=!!o[k];return '<div class="xrow"><div><b>'+esc(t)+'</b><p class="muted">'+esc(x)+'</p></div><button type="button" class="b sm'+(on?" on":"")+'" data-a="opt" data-k="'+k+'" aria-pressed="'+on+'">'+(on?"On":"Off")+'</button></div>';};
  var ez;if(easyOpen())ez='<div class="xrow"><div><b>'+esc(W("easy"))+'</b><p class="muted">Easy week from '+WDN[pd(D.easy).getDay()]+' '+dLab(D.easy)+': deload, then test. Cycle, tests and Skill Trial follow.</p></div><button type="button" class="b sm" data-a="easyx">Undo</button></div>';
  else if(c.cyc===6)ez='<p class="muted">This is an easy week already.</p>';
  else{var en=easyNext();ez='<div class="xrow"><div><b>'+esc(W("easy"))+'</b><p class="muted">Tired or a busy week ahead? Brings the deload week forward'+(en>TODAY?' to '+WDN[pd(en).getDay()]+' '+dLab(en):' to this week')+'. The cycle, tests and Skill Trial move with it.</p></div><button type="button" class="b sm" data-a="easy">Start</button></div>';}
  return '<div class="sec"><h3>'+esc(W("extras"))+'</h3>'+row("ready",W("rdx"),"One tap before training: good, normal or tired. Tired means fewer rounds and sets, good uses room left in the week. Without a tap nothing changes.")+row("rest",W("rest"),"At most 6 active days in 7: the plan sets a rest day after six in a row.")+row("oa",W("oa"),"Log hiking, dancing, cycling and more with minutes and effort. Counts for the weekly load and the next day.")+ez+holdHTML()+'</div>';}
function holdHTML(){var h=D.hold||{},row=function(k,t){var on=h[k]===true;return '<button type="button" class="b sm'+(on?" on":"")+'" data-a="holdm" data-k="'+k+'" aria-pressed="'+on+'">'+t+'</button>';};
  return '<div class="xrow hold"><div><b>'+esc(W("holdx"))+'</b><p class="muted">Keep what you have built with about a third less volume: fewer sets or kilometres, same weights and pace. No step backs for standstill, no plateau line, no new steps offered.</p><div class="chips">'+row("str","Strength")+row("run","Running")+row("sk","Skills")+'</div></div></div>';}
function bkHTML(){return '<div class="sec"><h3>Backup</h3><p class="muted">Your data lives only in this browser on this device.'+(dOK(D.bkDate)?' Last backup: '+dLab(D.bkDate)+'.':' No backup yet.')+'</p><div class="row"><button type="button" class="b red" data-a="bkfile">Save backup file</button><label class="b filebtn2" for="bkin">Restore from file</label><input type="file" id="bkin" class="vh" accept=".json,application/json" data-a="bkin">'+(prevSt()?'<button type="button" class="b" data-a="rsundo">Undo restore</button>':'')+'</div><details class="tv"><summary>Backup as text instead</summary><button type="button" class="b" data-a="exp">Create backup text</button><textarea id="bk" aria-label="Backup text" placeholder="The backup appears here. Paste text here to restore. Only restore backups you made yourself.">'+esc(D._bk)+'</textarea><div class="row"><button type="button" class="b" data-a="copy">Copy</button><button type="button" class="b" data-a="imp">Restore from text</button></div></details>'+(D._msg?'<p class="muted" role="status">'+esc(D._msg)+'</p>':'')+'</div>';}
function resetHTML(){return '<div class="sec"><h3>Reset</h3><button type="button" class="b" data-a="reset">'+(D._rs?'Really delete everything':'Delete all data')+'</button></div>';}
/* A-031: if saved data cannot be shown, the app still starts with Backup and Reset (nothing is changed or saved). */
function rescue(){try{document.body.className="";document.body.setAttribute("data-theme","templar");document.getElementById("nav").innerHTML="";}catch(x){}
  var h='<div class="card"><div class="sec"><h2>Saved data needs attention</h2><p class="muted">Part of the saved data could not be shown. Save a backup first, then restore a backup or delete all data.</p></div>';
  try{h+=rsHTML()+bkHTML();}catch(x){h+='<div class="sec"><h3>Backup</h3><button type="button" class="b red" data-a="bkfile">Save backup file</button><label class="b filebtn2" for="bkin">Restore from file</label><input type="file" id="bkin" class="vh" accept=".json,application/json" data-a="bkin"></div>';}
  app.innerHTML=h+resetHTML()+'</div>';}
function vMehr(){
  var R=["Strength and running on the same day: strength first, then run, or at least 3 hours apart. No running before Strength A.","Strength sets end 1–2 reps before failure. Explosive sets end as soon as the movement slows down.","Rest: 2–3 min for muscle-ups and explosive work, 1–2 min in circuits. The timer starts after every logged set.","Targets build on your weakest set. Top of the range reached: more weight or a harder variation. Below it: easier.","After a long gap targets step back by the exercise’s usual rhythm: one step after 14 days off or more and 1.5 × its usual gap, two steps after more than 4 weeks and twice its usual gap. Never twice in a row without reaching the target in between, never below the range. Paused days do not count.","Skills often and short rather than rarely and long. Several skills take turns, whatever rested longest comes first.","Running: mostly easy, only one or two hard runs per week. Never hard runs on two days in a row.","Three times without progress on an exercise: 10 % lighter or 2 reps fewer (never below the range), then build back up. A goal that stands still for 3 checks over 3 weeks gets one measure: an easy week or 2 more sets for 3 weeks; after 6 checks and 6 weeks, swap the variation. Three times at the limit in a week: a recovery day.","Stay with a variation for 3–4 weeks. Each variation has its own history.","No strength training after a hard run. After three hard days comes recovery.","Pain: tick it in the session. Affected exercises drop out and a rehab block is added. If it persists, see a doctor."];
  if(!D.seenFocus){D.seenFocus=true;save();}
  var grp=function(t){return '<h2 class="grp">'+t+'</h2>';};
  return '<div class="card mgrp">'+grp("Training")+goalMore()+
    '<div class="sec"><h3>Focus & skills</h3>'+focusHTML("m")+'</div>'+
    '<div class="sec"><h3>Emphasis & favourites</h3><p class="muted">Emphasis: <b>'+EMPH.filter(function(x){return x[0]===emph();})[0][1]+'</b> · '+(D.fav||[]).length+' favourite exercises ★</p><button type="button" class="b red" data-tab="favs" data-from="mehr">Choose emphasis & favourites</button></div>'+
    (nev().length?'<div class="sec"><h3>'+esc(W("never"))+'</h3><p class="muted">The plan uses an equivalent for the same muscles instead. Tap to bring one back.</p><div class="fvlist">'+nev().map(function(n){return '<button type="button" class="fvrow" data-a="unnever" data-n="'+esc(n)+'"><span class="st" aria-hidden="true">⊘</span><span class="fn">'+esc(n)+'</span><span class="gt">Bring back</span></button>';}).join("")+'</div></div>':'')+
    '<div class="sec"><h3>Kickboxing days</h3>'+kickSel("m_kick")+'</div>'+
    pauseHTML()+extrasHTML()+
    '<div class="sec"><h3>Basics</h3><p class="muted">Re-enter values, focus and equipment in three steps.</p><button type="button" class="b" data-a="reonb">Re-enter basics</button></div>'+
    '<div class="sec howit"><h3>How it works</h3><ol class="why">'+R.map(function(r){return "<li>"+esc(r)+"</li>";}).join("")+'</ol></div>'+
    grp("App")+'<div class="sec">'+themeHTML("m")+'</div>'+
    grp("Data")+'<div class="sec"><h3>Watch import</h3><p class="muted">Runs: export a GPX or TCX file from your watch app and import it on the run screen. Values like sleep or recovery scores need a connection outside this file.</p></div>'+
    bkHTML()+
    resetHTML()+'</div>';
}
function render(){try{render0();}catch(e){rendering=false;rescue();}}
function render0(){
  updNames(); applyTheme(); setTimeout(wake,0);
  var c=ctx(TODAY),d=new Date();
  document.getElementById("subline").textContent=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]+" "+d.getDate()+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" · Week "+c.week+" · "+accWord(c.acc);
  var top={morgen:"start",train:"start",run:"start",kick:"start",other:"start",favs:D._favFrom==="mehr"?"mehr":"start"}[D.tab]||D.tab;
  document.getElementById("nav").innerHTML=D.onb?tabs().map(function(t){return '<button type="button" data-tab="'+t[0]+'" class="'+(top===t[0]?"on":"")+'"'+(top===t[0]?' aria-current="page"':'')+'>'+t[1]+'</button>';}).join(""):"";
  document.body.className=D.onb?(["train","morgen","run","kick","other"].indexOf(D.tab)>=0?"train":""):"ob";if(D.onb&&(iv||(D.tab==="train"&&setLogged())))document.body.classList.add("tmr");
  if(!D.onb) document.getElementById("subline").textContent=W("sub");
  rendering=true;
  app.innerHTML=rsHTML()+(D.onb?(({start:vStart,morgen:vMorgen,train:vTrain,run:vRun,kick:vKick,other:vOther,verlauf:vVerlauf,stand:vStand,mehr:vMehr,favs:vFavs}[D.tab]||vStart)()):vOnb());
  rendering=false;
}

/* ================= Aktionen ================= */
function findItem(id){
  var p=id.split("-"),c=ctx(TODAY);
  if(p[0]==="abs") return ABS[+p[1]].items[+p[2]];
  if(p[0]==="KI") return [KM_PRE,KMPOST()][+p[1]].items[+p[2]];
  var bi=+p[1]; if(bi===ADDBI){var ab=S(p[0],c).blocks.filter(function(b){return b.add;})[0];return ab?ab.items[+p[2]]:null;}
  if(bi>=90){var ks=Object.keys(REHAB);return REHAB[ks[bi-90]].items[+p[2]];}
  return S(p[0],c).blocks[bi].items[+p[2]];
}
function addLog(o){if(D.pause&&!WK.sim&&!o.sim&&!o.bl&&isTrain(o))pauseEnd(o.d>TODAY?o.d:TODAY);var L=D.logs,z=L.length?L[L.length-1].d:"";L.push(o);
  /* A-038: an entry at or after the newest one keeps the list sorted (same order as the stable sort), only others sort. */
  if(o.d<z)L.sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0);});}
/* keep (A-021): logging a run or kickboxing keeps today's training progress and additions, so both can be done on one day. */
function finish(dy,keep){LV.fin=thKey()==="love"?TODAY:"";var tl=TH().toast;D._toast=D._toastX||(thKey()==='love'?tl[D.logs.length%tl.length]:pickNR(tl,D.logs.length,thKey().length+7));D._toastX="";dy.fin={};dy.run=null;delete dy.xr;
  if(keep){var rx=/^(rc|KI)-/;Object.keys(dy.done).forEach(function(k){if(rx.test(k))delete dy.done[k];});["inp","skip"].forEach(function(f){Object.keys(dy[f]).forEach(function(k){if(rx.test(k))delete dy[f][k];});});}
  else{dy.open={};dy.pick=null;delete dy.add;Object.keys(dy.done).forEach(function(k){if(k.indexOf("m-")!==0)delete dy.done[k];});dy.inp={};dy.skip={};}
  D.tab="start";save();render();window.scrollTo(0,0);}
function needRpe(dy){if(!dy.fin.rpe){dy.fin.err="Please choose how hard it was.";save();render();return true;}dy.fin.err="";return false;}
var PATP={"Clean pull-ups":"pull","Pull-ups":"pull","Parallel bar dips":"dips","Dips":"dips","Push-ups":"push","Explosive chest-to-bar pull-ups":"expl","Clean muscle-ups":"mu"};
/* I-43: per-set values (reps or seconds), at most 12 sets, 0–999, one decimal. */
function setsArr(a){return Array.isArray(a)?a.slice(0,12).map(function(x){return typeof x==="number"||(typeof x==="string"&&x.trim()!=="")?+x:NaN;}).filter(function(x){return isFinite(x)&&x>=0&&x<=999;}).map(function(x){return Math.round(x*10)/10;}):[];}
/* "last: 6 · 6 · 5 reps × 20 kg" when the sets are known, else the weakest set as before ("6 reps × 20 kg").
   Holds read their seconds from the newest log that carries them. */
function lastTxt(it,v,lx){var kg=function(w){return w?" × "+fmtKg(w)+" kg":"";};
  if(it.iso&&!it.test){for(var i=D.logs.length-1,i0=Math.max(0,i-200);i>=i0;i--){var e=D.logs[i].exs;if(e&&own(e,"iso:"+it.iso)&&e["iso:"+it.iso].length)return e["iso:"+it.iso].join(" · ")+" s";}return "";}
  if(!lx||!lx.r)return "";
  return (lx.s&&lx.s.length>1?lx.s.join(" · "):lx.r)+" "+it.unit+kg(lx.w);}
function saveTrain(){
  var dy=day(); if(needRpe(dy)) return; var L0=[lvUp(),lvLo()];
  var loc=LOC(),kit=loc==="m",cbk=cbInfo(TODAY).low,c=ctx(TODAY),id=trainId(dy).id,s=S(id,c),f=dy.fin,wts=[],hold=f.rpe>=10,isoDone={},exl={},tv={},prs=[];
  function rec(key,r,w,nm){exl[key]=[r,w||0];var sc=(w||0)*1000+r,b=D.pr[key];if(b&&sc>b.sc)prs.push(nm+": "+r+(w?" × "+fmtKg(w)+" kg":""));if(!b||sc>b.sc)D.pr[key]={sc:sc,r:r,w:w||0,d:TODAY,n:nm};}
  var addN=[],vsA=vsZero(),nSets=0,exs={};
  s.blocks.forEach(function(b,bi0){ if(D.short&&b.p>1) return; var bi=b.bi!=null?b.bi:bi0; b.items.forEach(function(it,ii){
    var iid=id+"-"+bi+"-"+ii, v=curVar(it,loc); if(v<0||dy.skip[iid]||painHit(it.opts[v].n)) return;
    if(it.add&&(dy.done[iid]||((dy.inp[iid]||{}).s||[]).some(function(x){return num(x)!==null;})))addN.push(it.opts[v].n);
    var inp=dy.inp[iid]||{}, sets=(inp.s||[]).map(num).filter(function(x){return x!==null&&x>=0;});
    if(!it.f)nSets+=sets.length||(dy.done[iid]&&!it.iso&&!it.test?setsOf(it,b,c,id):0);
    if(it.iso){ if(isoDone[it.iso]) return; var cur=D.profile[it.iso],q=isoP(cur);
      if(sets.length){ isoDone[it.iso]=1; exs["iso:"+it.iso]=setsArr(sets); var mn=Math.min.apply(null,sets),mx=Math.max.apply(null,sets);
        if(sets.length>=q.n&&mn>=q.h) D.profile[it.iso]=Math.min(120,Math.max(cur,mx)+2);
        else if(mn<q.h*0.75) D.profile[it.iso]=Math.max(Math.round(mx),Math.max(3,cur-2));
        if(mx>D.profile[it.iso]) D.profile[it.iso]=mx; rec("iso:"+it.iso,mx,0,it.opts[v].n+" (s)"); }
      else if(dy.done[iid]&&!hold){ isoDone[it.iso]=1; D.profile[it.iso]=cur+1; }
      return; }
    if(it.test){ if(sets.length){ if(!it.tvo)D.profile[it.test]=sets[0]; tv[it.test]=sets[0]; rec("test:"+it.test,sets[0],it.lw||0,it.opts[0].n); } return; }
    if(it.f){ if(fPat(it)&&dy.done[iid]) vsA[it.fp]=Math.min(60,vsA[it.fp]+(it.fv||1)); return; }
    var g=target(it,v), r, w=num(inp.w);
    if(sets.length) r=Math.min.apply(null,sets); else if(dy.done[iid]) r=g.r; else return;
    if(w===null) w=g.w||0;
    var pv=D.ex[it.k+"#"+v],stall=(pv&&!pv.hold&&r<=pv.r&&(w||0)<=(pv.w||0))?(pv.stall||0)+1:0;if(holdOn("str"))stall=pv?(pv.stall||0):0;
    /* P-5: after three stalls the target steps back (10 % or 2 reps); that session starts the rebuild. */
    if(pv&&(pv.stall||0)>=3)stall=0;
    /* A-051: a planned lower target (return after a rest, new block range, pause step back) is no stall. */
    if(g.ret||g.rng||g.back)stall=pv?(pv.stall||0):0;
    /* The top of a bodyweight range is no stall: the next step is a harder variation, not a smaller target. */
    if(r>=it.hi&&!(wOn(it,v)&&w))stall=0;
    var ptn=itPat(it,v);if(ptn)vsA[ptn]=Math.min(60,vsA[ptn]+(sets.length||setsOf(it,b,c,id)));
    if(kit){D.kitD=D.kitD||{};D.kitD[patKey(it.k)]=TODAY;}
    /* Field kit days never downgrade a shared variant and never count towards a stall (A-019 addendum). */
    if(kit&&pv&&((w||0)<(pv.w||0)||((w||0)===(pv.w||0)&&r<=pv.r))) {D.ex[it.k+"#"+v]={r:pv.r,w:pv.w,d:TODAY,hold:false,n:it.opts[v].n,stall:pv.stall||0};if(pv.s)D.ex[it.k+"#"+v].s=pv.s;if(pv.lad)D.ex[it.k+"#"+v].lad=pv.lad;}
    else {D.ex[it.k+"#"+v]={r:r,w:w,d:TODAY,hold:hold,n:it.opts[v].n,stall:kit||cbk?(pv&&pv.stall||0):stall};if(sets.length)D.ex[it.k+"#"+v].s=setsArr(sets);if(pv&&pv.lad)D.ex[it.k+"#"+v].lad=pv.lad;}
    /* I-43: every set's reps/seconds go into the log additively (l.exs[key]); progression and stall still use the weakest set. */
    if(sets.length)exs[it.k+"#"+v]=setsArr(sets);
    if((it.k==="fl_h"||it.k==="pl_h")&&v<=4&&r>=it.lo){var pk=it.k==="fl_h"?"flSt":"plSt";if(v>D.profile[pk])D.profile[pk]=v;}
    /* Re-rating from logs (P-3): a clean set of a pattern variant above the status raises it, never lowers it. */
    var pk=PATP[it.opts[v].n];if(pk&&!(w>0)&&sets.length){var mxs=Math.max.apply(null,sets);if(mxs>(D.profile[pk]||0))D.profile[pk]=mxs;}
    if(wOn(it,v)&&w) wts.push(it.opts[v].n+" "+fmtKg(w)+" kg × "+r);
    if(sets.length) rec(it.k+"#"+v,Math.max.apply(null,sets),w,it.opts[v].n);
  });});
  var absDone=!!dy.done["abs-T"],abf=absFor(id); if(absDone&&abf) D.abs=(abf.i+1)%ABS.length; if(absDone&&s.ab) vsA.core=Math.min(60,vsA.core+blitzSets(s.ab));
  var skl=[];s.blocks.forEach(function(b){if(D.short&&b.p>1)return;if(b.skill&&skl.indexOf(b.skill)<0)skl.push(b.skill);if(b.mu&&skl.indexOf("mu")<0)skl.push("mu");});
  var rk0=rankOf(xpTotal());
  var lgo={d:TODAY,id:id,t:NAMES[id],min:s.min||0,vs:vsA,vm:VMAP,lg:legSets(s,c,id)>=6?1:0,rpe:f.rpe,note:(f.note||"").slice(0,300),abs:absDone?1:0,sum:wts.slice(0,4).join(", "),sk:skl,ex:exl,tv:tv,pr:prs.length};if(Object.keys(exs).length)lgo.exs=exs;if(cbk)lgo.cb=1;var rd0=rdDay();if(rd0)lgo.rd=rd0;addLog(lgo);
  /* Keep as favourite? Asked once per added exercise, on the Today page after logging. */
  var fa=D.favAsk||[];addN.forEach(function(n){if((D.fav||[]).indexOf(n)<0&&fa.indexOf(n)<0){fa.push(n);(D.favQ=D.favQ||[]).push(n);}});if(addN.length)D.favAsk=fa.slice(-200);
  D._fin={n:NAMES[id],min:s.min||0,sets:nSets,pr:prs.slice(0,2)};
  afterLog(rk0,prs,lgo); var L1=[lvUp(),lvLo()],lu=[];if(L1[0]>L0[0])lu.push("Upper "+LVN[L1[0]]);if(L1[1]>L0[1])lu.push("Lower "+LVN[L1[1]]);if(lu.length&&!holdOn("str"))D._toastX=(D._toastX?D._toastX+" ":"")+"Level up: "+lu.join(" · ")+"."; finish(dy);
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
  if(blDays().indexOf(d)<0||!(BLIDS.indexOf(id)>=0||own(RUNT,id)||id==="KI"||(id==="OA"&&D.opt&&D.opt.oa))){D._blErr="Please pick a day and what you did.";return false;}
  if([4,6,8,10].indexOf(rp)<0){D._blErr="Please choose how hard it was.";return false;}
  o={d:d,id:id,t:NAMES[id],rpe:rp,note:(g("bl_note")||"").slice(0,300),bl:1};
  if(id==="KI"||id==="OA"){o.min=durOf(g("bl_min"),MINEST[id]);if(id==="OA")o.t=String(g("bl_oa")||"").trim().slice(0,40)||NAMES.OA;}
  else if(isRun(o)){var km=lim(g("bl_km"),KMMAX),mn=lim(g("bl_min"),MINMAX);o.km=km?Math.round(km*100)/100:0;o.min=mn?Math.round(mn*10)/10:0;
    if(o.km&&o.min){runTimes(o.km,o.min,d);var pc=o.min/o.km,b=D.pr["run:pace5"],bl=D.pr["run:long"];if(o.km>=5&&(!b||pc<b.p)){if(b)prs.push("Fastest 5 km+ pace: "+pace(o));D.pr["run:pace5"]={p:pc,d:d};}
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
    '<label for="bl_id">What</label><select id="bl_id"><optgroup label="Training">'+BLIDS.map(function(k){return opt(k,NAMES[k],k===(D.loc==="h"?"HO":"KA"));}).join("")+'</optgroup><optgroup label="Running">'+["RE","RI","RH"].map(function(k){return opt(k,NAMES[k]);}).join("")+'</optgroup><optgroup label="Class">'+opt("KI",NAMES.KI)+'</optgroup>'+(D.opt&&D.opt.oa?'<optgroup label="Other">'+opt("OA",NAMES.OA)+'</optgroup>':'')+'</select>'+
    '<label for="bl_rpe">How hard</label><select id="bl_rpe">'+[[0,"Choose"],[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return opt(x[0],x[1]);}).join("")+'</select>'+
    '<label for="bl_km">Run: km</label><input type="number" id="bl_km" step="0.01" inputmode="decimal"><label for="bl_min">Minutes</label><input type="number" id="bl_min" step="0.1" inputmode="decimal" placeholder="run, class, activity">'+(D.opt&&D.opt.oa?'<label for="bl_oa">Activity name</label><input type="text" id="bl_oa" maxlength="40" placeholder="e.g. Hiking">':'')+
    '</div><label class="lab" for="bl_note">Note (optional)</label><textarea id="bl_note"></textarea><div class="row"><button type="button" class="b" data-a="blopen">Cancel</button><button type="button" class="b red" data-a="blsave">Save entry</button></div>'+(D._blErr?'<p class="warn" role="alert">'+esc(D._blErr)+'</p>':'')+'</div>';}
/* Time goals (P-1): best time over at least 5 / 10 km, scaled to the distance by the run's pace. */
function runTimes(km,mn,d){[5,10].forEach(function(x){if(km>=x&&mn>0){var t=Math.round(mn/km*x*10)/10,b=D.pr["run:t"+x];if(!b||t<b.min)D.pr["run:t"+x]={min:t,d:d};}});}
function saveRun(){
  var dy=day(); if(needRpe(dy)) return; var rk0=rankOf(xpTotal()),nl=D.logs.length;
  var f=dy.fin,id=dy.run||runRec().id,km=lim(f.km,KMMAX),mn=lim(f.min,MINMAX);
  /* A-044: the long run grows in the build season (+10 %) and a little in the base season (+0.5 km), holds in tempo and
     hold; its cap is 30 % of the 4-week mean (longCap, A-053), not a fixed number; an existing longer run is not cut */
  var rph=holdOn("run")?"hold":runPh(TODAY),lc=longCap(TODAY);
  if(id==="RH"&&longMode()&&!(gRun()&&gTaper(TODAY))){if(f.rpe<=4&&(rph==="build"||rph==="base")&&D.runKm<lc)D.runKm=Math.min(lc,rph==="build"?Math.max(D.runKm+0.5,Math.round(D.runKm*1.1*2)/2):D.runKm+0.5);
    else if(f.rpe<=7&&rph==="build"&&D.runKm<lc)D.runKm=Math.min(lc,D.runKm+0.5);/* A-053: "Fine" still grows a little in the build season */
    else if(f.rpe>=10)D.runKm=Math.max(5,D.runKm-0.5);}
  else if(id==="RH"){ if(f.rpe<=4&&rph!=="hold"&&D.runKm<HARDMAX) D.runKm=Math.min(HARDMAX,D.runKm+0.5); else if(f.rpe>=10) D.runKm=Math.max(5,D.runKm-0.5); }
  if(id==="RI"&&riForm(TODAY)==="i3"&&rph!=="hold"){ if(f.rpe<=6) D.runI=Math.min(8,D.runI+1); else if(f.rpe>=10) D.runI=Math.max(3,D.runI-1); }
  var prs=[];if(km&&mn){var pc=mn/km,b=D.pr["run:pace5"];if(km>=5){if(b&&pc<b.p)prs.push("Fastest 5 km+ pace: "+pace({km:km,min:mn}));if(!b||pc<b.p)D.pr["run:pace5"]={p:pc,d:TODAY};}
    runTimes(km,mn,TODAY);var bl=D.pr["run:long"];if(bl&&km>bl.km)prs.push("Longest run: "+fmtKg(Math.round(km*10)/10)+" km");if(!bl||km>bl.km)D.pr["run:long"]={km:km,d:TODAY};}
  var rlo={d:TODAY,id:id,t:NAMES[id],rpe:f.rpe,note:(f.note||"").slice(0,300),km:km===null?0:Math.round(km*100)/100,min:mn===null?0:Math.round(mn*10)/10,pr:prs.length};addLog(rlo);
  afterLog(rk0,prs,rlo); finish(dy,true);
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
  var dy,a=t.dataset.a;try{dy=day();}catch(x){dy={done:{},inp:{},skip:{},fin:{}};}
  if(a==="rsok"&&RSP){applyState(RSP.b,RSP.where,rsToast(RSP.b),true);return;}
  if(a==="rsno"){RSP=null;D._msg="Restore cancelled. Nothing was changed.";render();return;}
  if(a==="rsundo"){if(!undoRestore()){D._msg="Nothing to undo.";render();}return;}
  if(t.dataset.tab){TB=null;if(t.dataset.tab==="favs")D._favFrom=t.dataset.from||D.tab;D.tab=t.dataset.tab;D._del=null;D._kitAsk=false;D._gmsg="";D._rs=false;D._msg="";dy.fin={};save();render();window.scrollTo(0,0);var h2=app.querySelector("h2");if(h2&&t.closest(".nav,.bk,.big")){h2.tabIndex=-1;h2.focus({preventScroll:true});}return;}
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
  else if(a==="skip"){var sid=t.dataset.id;if(dy.skip[sid])delete dy.skip[sid];else{dy.skip[sid]=1;delete dy.done[sid];autoNext(sid);}}
  else if(a==="lad"){var ix=findItem(t.dataset.id);if(ix&&ladTake(ix,+t.dataset.v))delete dy.inp[t.dataset.id];}
  else if(a==="isoup"){if(t.dataset.k==="tuck"&&D.profile.lsit<11){D.profile.lsit=11;}}
  else if(a==="nxv"){var lx=D.tab==="kick"?"h":LOC(),ix=findItem(t.dataset.id),nv=+t.dataset.v;if(ix&&avail(ix,lx).indexOf(nv)>=0){D.vr[lx+"|"+vkey(ix)]=nv;delete dy.inp[t.dataset.id];}}
  else if(a==="chg"){var lc=D.tab==="kick"?"h":LOC(),it=findItem(t.dataset.id),av=avail(it,lc),cur=curVar(it,lc);D.vr[lc+"|"+vkey(it)]=av[(av.indexOf(cur)+1)%av.length];delete dy.inp[t.dataset.id];}
  else if(a==="runtype"){dy.run=t.dataset.v;}
  else if(a==="tbgo"){var A2=ABS[+t.dataset.i],lc2=LOC();audio();TB={start:Date.now(),rounds:+t.dataset.r,names:A2.items.map(function(it){return it.opts[curVar(it,lc2)].n;}),last:""};if(!tbIv)tbIv=setInterval(tbTick,200);}
  else if(a==="tbstop"){TB=null;}
  else if(a==="tbdone"){dy.done["abs-T"]=1;}
  else if(a==="savetr"){if(dy.fin.rpe&&!dy.fin.eok&&!setLogged()){dy.fin.eask=1;save();render();var eb=document.getElementById("eask");if(eb&&eb.scrollIntoView)eb.scrollIntoView();return;}saveTrain();return;}
  else if(a==="saveany"){dy.fin.eok=1;delete dy.fin.eask;saveTrain();return;}
  else if(a==="saveno"){delete dy.fin.eask;}
  else if(a==="saverun"){saveRun();return;}
  else if(a==="saveoa"){saveOther();return;}
  else if(a==="oaname"){dy.fin.oan=t.dataset.v;}
  else if(a==="per"){var pv=t.dataset.v;D._per=pv==="1y"||pv==="all"?pv:"12w";}
  else if(a==="chmore"){D._chn=(D._chn||0)+50;}
  else if(a==="holdm"){var hk=t.dataset.k;if(["str","run","sk"].indexOf(hk)>=0){D.hold=D.hold||{str:false,run:false,sk:false};D.hold[hk]=!(D.hold[hk]===true);if(hk==="run"){if(D.hold.run)delete D.holdR;else D.holdR=TODAY;}WK.key="";}}
  else if(a==="opt"){var ok=t.dataset.k;if(["rest","oa","ready"].indexOf(ok)>=0){D.opt=D.opt||{};D.opt[ok]=!D.opt[ok];WK.key="";}}
  else if(a==="easy"){if(!easyOpen()&&ctx(TODAY).cyc!==6){D.easyP=D.easy||"";D.easy=easyNext();WK.key="";D._msg="";}}
  else if(a==="ready"){var rv=+t.dataset.v;if(rv===1||rv===2||rv===3){dy.ready=dy.ready===rv?0:rv;if(!dy.ready)delete dy.ready;WK.key="";}}
  else if(a==="pause"){pauseStart();}
  else if(a==="resume"){if(D.pause){if(D.pause.from>=TODAY)D.pause=null;else pauseEnd(TODAY);WK.key="";}}
  else if(a==="pausewhy"){if(D.pause&&(t.dataset.k==="ill"||t.dataset.k==="pause"))D.pause.why=t.dataset.k;}
  else if(a==="healed"){if(D.pain&&PAINN[t.dataset.k])D.pain[t.dataset.k]=false;WK.key="";}
  else if(a==="easyx"){if(easyOpen()){if(D.easyP)D.easy=D.easyP;else D.easy="";delete D.easyP;WK.key="";}}
  else if(a==="savekick"){if(needRpe(dy))return;var rk0=rankOf(xpTotal());addLog({d:TODAY,id:"KI",t:NAMES.KI,rpe:dy.fin.rpe,min:durOf(dy.fin.dur,90),note:(dy.fin.note||"").slice(0,300)});afterLog(rk0,[]);finish(dy,true);return;}
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
  else if(a==="goal"){setGoal(t.dataset.k);D.goalNext=[];save();keepRender();return;}
  else if(a==="gnext"){var gx=(D.goalNext||[]).filter(gOpen)[+t.dataset.k];D.goalNext=[];if(gx){setGoal(gx.k);if(D.goal){D.goal.v=gx.v;D.goal.st=goalPos(D.goal).done;D.goal.s0=D.goal.st;}}save();keepRender();return;}
  else if(a==="goalx"){setGoal("none");D._gadj=false;D._gp=null;}
  else if(a==="gpopen"){D._gp={};D._gadj=false;D._gmsg="";}
  else if(a==="gpx"){D._gp=null;}
  else if(a==="gpback"){D._gp={};}
  else if(a==="gpc"){var gc=+t.dataset.k;if(gc>=0&&gc<GOALG.length)D._gp={c:gc};}
  else if(a==="gpk"){var gk=t.dataset.k;if(D._gp&&own(GOALS,gk))D._gp={c:D._gp.c,k:gk,v:goalDef(gk)};}
  else if(a==="gpsave"){gpSave();}
  else if(a==="gadj"){D._gadj=!D._gadj;}
  else if(a==="tvedit"){D._tvEdit=!D._tvEdit;}
  else if(a==="goalfoc"||a==="goalfh"){if(D.goal)D.goal.fh=1;if(a==="goalfoc")D.focus="run";}
  else if(a==="xrun"){dy.run="RE";dy.xr=true;dy.fin={};D.tab="run";save();render();window.scrollTo(0,0);return;}
  else if(a==="blopen"){D._bl=!D._bl;D._blErr="";if(D.tab!=="verlauf"){D.tab="verlauf";D._bl=true;save();render();window.scrollTo(0,0);var bf=document.getElementById("blf");if(bf&&bf.scrollIntoView)bf.scrollIntoView();return;}}
  else if(a==="blsave"){if(saveBacklog())return;}
  else if(a==="edit"){D._edit=D._edit===+t.dataset.i?null:+t.dataset.i;D._del=null;}
  else if(a==="editsave"){var ei=D._edit,L=D.logs[ei];if(L){var g=function(id){var e=document.getElementById(id);return e?e.value:null;};
      var nd=g("e_d");if(/^\d{4}-\d{2}-\d{2}$/.test(nd)&&!isNaN(pd(nd))&&nd<=TODAY)L.d=nd;
      var nt=g("e_id");if(own(NAMES,nt)){L.id=nt;L.t=NAMES[nt];}
      var rp=+g("e_rpe");if([0,4,6,8,10].indexOf(rp)>=0){if(rp)L.rpe=rp;else delete L.rpe;}
      if(isRun(L)){var km=lim(g("e_km"),KMMAX),mn=lim(g("e_min"),MINMAX);L.km=km?Math.round(km*100)/100:0;L.min=mn?Math.round(mn*10)/10:0;}
      L.note=(g("e_note")||"").slice(0,300);
      D.logs.sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0);});CWC.k=RHC.k=HSC.k=ODC.k=IDI.k=TDI.k="";lvClr();D._edit=null;D._toast="Entry updated.";}}
  else if(a==="del"){var i=+t.dataset.i; if(D._del===i){D.logs.splice(i,1);CWC.k=RHC.k=HSC.k=ODC.k=IDI.k=TDI.k="";lvClr();D._del=null;} else D._del=i;}
  else if(a==="exp"){D._bk=bkJSON();D._msg="Backup created. Copy it now and store it, e.g. in a note.";}
  else if(a==="copy"){var tx=document.getElementById("bk").value;try{navigator.clipboard.writeText(tx).then(function(){if(D._bk&&tx===D._bk)markBk();D._msg="Copied.";render();},function(){D._msg="Copying is not allowed. Please select the text by hand.";render();});}catch(x){D._msg="Copying is not allowed. Please select the text by hand.";}}
  else if((a==="imp"||a==="obimp")&&((document.getElementById(a==="imp"?"bk":"obbk")||{}).value||"").length>MAXBK){D._msg="This backup is too large (over 10 MB). Nothing was changed.";}
  else if(a==="imp"){if(restoreText(document.getElementById("bk").value,"mehr"))return;D._msg="This text is not a valid backup.";}
  else if(a==="bkfile"){saveBackupFile();return;}
  else if(a==="obimp"){var ta=document.getElementById("obbk");if(ta&&restoreText(ta.value,"start"))return;D._msg="This text is not a valid backup.";}
  else if(a==="reset"){if(D._rs){D=fresh();RSP=null;}else D._rs=true;}
  save(); render();
});
/* A-029 (U8): a finished block closes and the next unfinished one opens. */
function autoNext(iid){var p=String(iid).split("-");if(p.length!==3||!STR[p[0]]&&!(p[0]in NAMES))return;var sid=p[0],bi=+p[1];if(isNaN(bi)||bi>=ADDBI)return;
  try{var dy=day(),c=ctx(TODAY),s=S(sid,c),loc=LOC(),o=[];s.blocks.forEach(function(b,x){if(D.short&&b.p>1)return;o.push({b:b,bi:b.bi!=null?b.bi:x});});
    var fin=function(e){return e.b.items.every(function(it,ii){var v=curVar(it,loc),q=sid+"-"+e.bi+"-"+ii;return v<0||dy.done[q]||dy.skip[q]||painHit(it.opts[v].n);});};
    var k=-1;o.forEach(function(e,j){if(e.bi===bi)k=j;});if(k<0||!fin(o[k]))return;dy.open=dy.open||{};dy.open[sid+"-"+bi]=false;
    for(var j=k+1;j<o.length;j++)if(!fin(o[j])){dy.open[sid+"-"+o[j].bi]=true;break;}}catch(x){}}
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
  var t=e.target,dy,q=t.dataset;try{dy=day();}catch(x){dy={done:{},inp:{},skip:{},fin:{}};}
  if(q.a==="done"){ if(t.checked){dy.done[q.id]=1;autoNext(q.id);} else delete dy.done[q.id]; save(); render(); }
  else if(q.a==="eq"){ D.home[q.k]=t.checked; save(); keepRender(); }
  else if(q.a==="focus"){ D.focus=t.value; save(); keepRender(); }
  else if(q.a==="emph"){ D.emph=t.value; save(); keepRender(); }
  else if(q.a==="theme"&&own(THEMES,t.value)){ D.theme=t.value; save(); keepRender(); }
  else if(q.a==="statex"){ D.statEx=t.value; save(); keepRender(); }
  else if(q.a==="startp"&&own(STARTP,t.value)){ D.startP=t.value; D.runKm={s0:4,s1:6,s2:7}[t.value]||7; var pp=STARTP[t.value][2]; Object.keys(pp).forEach(function(k){D.profile[k]=pp[k];}); save(); keepRender(); }
  else if(q.a==="skill"){ D.skills[q.k]=t.checked; save(); keepRender(); }
  else if(q.a==="stage"){ D.profile[q.k]=+t.value; save(); keepRender(); }
  else if(q.a==="pain"){ if(PAINN[q.k])D.pain[q.k]=t.checked; WK.key=""; save(); render(); }
  else if(q.a==="pauseto"){ if(D.pause){var pv2=t.value;D.pause.to=/^\d{4}-\d{2}-\d{2}$/.test(pv2)&&pv2>=D.pause.from?pv2:"";WK.key="";} save(); keepRender(); }
  else if(q.a==="pick"){ dy.pick=t.value; save(); render(); }
  else if(q.set!=null){ var e2=dy.inp[q.id]||(dy.inp[q.id]={}),s=e2.s||(e2.s=[]); s[+q.set]=t.value;
    var n=+q.n, filled=0; for(var i=0;i<n;i++) if(num(s[i])!==null) filled++;
    if(filled>=n){dy.done[q.id]=1;autoNext(q.id);}
    save();document.body.classList.add("tmr");
    if(t.value!==""&&+q.rest>0){ var det=t.closest("details"), circuit=!!(det&&det.querySelector(".kind.z")), lastSet=+q.set===n-1;
      if(circuit?q.last==="1":!lastSet) startRest(+q.rest); }
    if(filled>=n){ var y=window.scrollY; render(); window.scrollTo(0,y); } }
  else if(q.inp){ (dy.inp[q.id]||(dy.inp[q.id]={}))[q.inp]=t.value; save(); }
  else if(q.fin){ dy.fin[q.fin]=t.value; save(); if(q.fin==="km"||q.fin==="min") render(); }
  else if(q.prof){ var v=num(t.value); if(v!==null&&v>=0){D.profile[q.prof]=v; save(); var ln=document.getElementById("lvlnote"); if(ln) ln.innerHTML=lvlNote(); if(D.onb) render();} }
  else if(q.goal&&D.goal){ if(q.goal==="d"){if(t.value===""||/^\d{4}-\d{2}-\d{2}$/.test(t.value)&&t.value>TODAY){if(t.value)D.goal.d=t.value;else delete D.goal.d;}}
    else{var gv=num(t.value);if(gv!==null&&gv>0){D.goal.v=GOALS[D.goal.k].u==="stage"?Math.max(1,Math.min(4,Math.round(gv))):Math.min(999,gv);D.goal.st=goalPos(D.goal).done;}}
    save(); keepRender(); }
  else if(q.start){ if(/^\d{4}-\d{2}-\d{2}$/.test(t.value)&&!isNaN(pd(t.value))){D.start=t.value; save(); render();} }
  else if(q.a==="bkin"&&t.files&&t.files[0]&&t.files[0].size>MAXBK){t.value="";D._msg="This file is too large for a backup (over 10 MB). Nothing was changed.";render();}
  else if(q.a==="bkin"&&t.files&&t.files[0]){var frb=new FileReader();frb.onload=function(){if(!restoreText(String(frb.result),D.onb?"mehr":"start")){D._msg="This file is not a valid backup.";render();}};frb.readAsText(t.files[0]);}
  else if(q.a==="gfile"&&t.files&&t.files[0]&&t.files[0].size>TRKMAX){t.value="";dy.fin.gmsg="This run file is too large (over 20 MB). Nothing was imported.";save();render();}
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
function setLogged(){var dy=day(),pre=trainId(dy).id+"-";return Object.keys(dy.inp||{}).some(function(k){return k.indexOf(pre)===0&&((dy.inp[k].s||[]).some(function(x){return num(x)!==null;}));})||Object.keys(dy.done||{}).some(function(k){return k.indexOf(pre)===0;});}
function startRest(sec){document.body.classList.add("tmr");audio();stop();var end=Date.now()+sec*1000;clock.classList.add("run");
  function tick(){var left=Math.ceil((end-Date.now())/1000);clock.textContent=fmt(Math.max(left,0));if(left<=0){stop();tone(880,3);try{navigator.vibrate&&navigator.vibrate([250,120,250]);}catch(x){}clock.textContent="Go!";var lv=document.getElementById("live");if(lv)lv.textContent="Rest over, next set.";}}
  tick();iv=setInterval(tick,250);}
function startHold(sec,sides){document.body.classList.add("tmr");audio();stop();var side=1,end=Date.now()+sec*1000,lv=document.getElementById("live");clock.classList.add("run");
  function tick(){var left=Math.ceil((end-Date.now())/1000);clock.textContent=(sides>1?(side===1?"L ":"R "):"")+fmt(Math.max(left,0));
    if(left<=0){if(side<sides){side++;tone(660,2);try{navigator.vibrate&&navigator.vibrate(200);}catch(x){}if(lv)lv.textContent="Switch sides.";end=Date.now()+(sec+3)*1000;return;}
      stop();tone(880,3);try{navigator.vibrate&&navigator.vibrate([250,120,250]);}catch(x){}clock.textContent="Done";if(lv)lv.textContent="Hold done.";}}
  tick();iv=setInterval(tick,250);}
document.querySelectorAll(".timer [data-t]").forEach(function(b){b.addEventListener("click",function(){startRest(parseInt(b.dataset.t,10));});});
document.getElementById("tstop").addEventListener("click",function(){stop();clock.textContent="0:00";});
render();
window.__kz={transWk:transWk,patGrp:patGrp,dlDay:dlDay,TH:TH,THEMES:THEMES,honTiers:honTiers,rankLabel:rankLabel,rankExt:rankExt,RKSTEP:RKSTEP,yearRev:yearRev,perMonths:perMonths,pickNR:pickNR,TXX:TXX,hold:holdOn,holdHTML:holdHTML,runPh:runPh,riForm:riForm,easyKm:easyKm,longCap:longCap,paceHint:paceHint,runBase:runBase,ROT:ROT,ROTK:ROTK,rotApply:rotApply,PATK:PATK,P:P,blkNo:blkNo,accOf:accOf,accNow:accNow,accWord:accWord,accApply:accApply,ACCK:ACCK,ACCW:ACCW,lvUp:lvUp,lvLo:lvLo,lvTxt:lvTxt,lvNext:lvNext,bStand:bStand,pStand:pStand,LVQ:LVQ,LVN:LVN,lvScan:lvScan,goalNextOf:goalNextOf,plNoGoal:plNoGoal,gUp:gUp,GCHAIN:GCHAIN,goalNextHTML:goalNextHTML,ladTake:ladTake,ladNext:ladNext,topTwice:topTwice,wOn:wOn,ORD:ORD,LADN:LADN,restoreText:restoreText,rsp:function(){return RSP;},cycWk:cycWk,dLabY:dLabY,LOGMAX:LOGMAX,rhythm:rhythm,backSteps:backSteps,patDates:patDates,gapDays:gapDays,patKey:patKey,shortN:shortN,FOREARM:FOREARM,trainId:trainId,tiredSets:tiredSets,tired3:tired3,applyState:applyState,plAge:plAge,dlWk:dlWk,begRun:begRun,chGap:chGap,goalIsCheck:goalIsCheck,KMPOST:KMPOST,ADDB:ADDB,logVs:logVs,FOC:FOC,vUnits:vUnits,avail:avail,LEGK:LEGK,PATN:PATN,painApply:painApply,painOK:painOK,painU:painU,goalBlocked:goalBlocked,goalDay:goalDay,absFor:absFor,mSections:mSections,coolItems:coolItems,PAINRX:PAINRX,ABS:ABS,prevSt:prevSt,PREVK:PREVK,own:own,dOK:dOK,lim:lim,pauseOn:pauseOn,pausedDay:pausedDay,pauseEnd:pauseEnd,pauseTick:pauseTick,cbInfo:cbInfo,painRun:painRun,painHit:painHit,PAINN:PAINN,REHAB:REHAB,streaks:streaks,bandCaps:bandCaps,bandFit:bandFit,itPat:itPat,volSets:volSets,vs7:vs7,vBand:vBand,volBias:volBias,plBoost:plBoost,goalPat:goalPat,platHTML:platHTML,kgStep:kgStep,nextVar:nextVar,patLast:patLast,runPlan:runPlan,hard3OK:hard3OK,longMode:longMode,kmStat:kmStat,weekKm:weekKm,hardRunL:hardRunL,runInfo:runInfo,logMin:logMin,logLoad:logLoad,weekLoad:weekLoad,loadStat:loadStat,restDue:restDue,easyNext:easyNext,easyOpen:easyOpen,trialItems:trialItems,lastTv:lastTv,gTaper:gTaper,gTrend:gTrend,goalTick:goalTick,setsOf:setsOf,design:design,GOALS:GOALS,goalCur:goalCur,goalDef:goalDef,goalPos:goalPos,goalLine:goalLine,goalCheck:goalCheck,setGoal:setGoal,saveRun:saveRun,xpTotal:xpTotal,favCatalog:favCatalog,blDays:blDays,ADDBI:ADDBI,loveFinIdx:loveFinIdx,patLast:patLast,kitOn:kitOn,kitGroup:kitGroup,kitReq:kitReq,kitCan:kitCan,KPOOL:KPOOL,LOC:LOC,cleanImport:cleanImport,weekPlan:weekPlan,WK:WK,termNote:termNote,weekHTML:weekHTML,blockSec:blockSec,bkJSON:bkJSON,bkDue:bkDue,MAXBK:MAXBK,tb:function(){return TB;},honours:function(){return honours();},estMin:estMin,wuSets:wuSets,legDay:legDay,DURMAX:DURMAX,legSets:legSets,legLog:legLog,hist:hist,today:function(s){if(s)TODAY=s;return TODAY;},day:day,saveTrain:saveTrain,recAll:recAll,recTrain:recTrain,S:S,NAMES:NAMES,D:function(){return D;},setD:function(x){D=x;},parseTrack:parseTrack,target:target,GYM:GYM,HOME:HOME,lvl:lvl,ctx:ctx,isoP:isoP,render:render,startRest:startRest,isKick:isKick,skillPlan:skillPlan,runRec:runRec,rounds:rounds,curVar:curVar,morning:morning,mSections:mSections,COOLS:COOLS,MMOD:MMOD,restore:function(t,w){var r=restoreText(t,w);if(r&&RSP)applyState(RSP.b,RSP.where,rsToast(RSP.b),true);return r;},love:{derive:loveDerive,open:loveOpen,pick:lovePick,unlock:loveUnlock,day:loveDay,on:loveOn,LV:LV,KK:LOVEKK,MIN:LOVEMIN}};
})();

if("serviceWorker" in navigator&&window.top===window.self){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}
