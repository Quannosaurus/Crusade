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
/* ================= Speicher ================= */
var KEY="kz_app_v3", memOnly=false;
function pad(n){return String(n).padStart(2,"0");}
function ds(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function pd(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2],12);}
function addD(s,n){var d=pd(s);d.setDate(d.getDate()+n);return ds(d);}
function diff(a,b){return Math.round((pd(b)-pd(a))/864e5);}
var TODAY=ds(new Date());
function fresh(){return {v:3,onb:false,start:TODAY,profile:{pull:10,dips:15,push:25,expl:5,negmu:5,mu:0,hang:45,tuck:30,lsit:10,hollow:90,hsw:30,hsf:0,pike:12,flSt:0,plSt:0},ex:{},vr:{},logs:[],days:{},abs:0,runKm:7,tab:"start",mlen:"n",loc:"g",short:false,kickDays:[2,5],focus:"bal",skills:{hs:true,mu:true,ls:true,fl:false,pl:false},runI:4,obStep:0,seenFocus:true,pain:{w:false,s:false,e:false},bkAt:0,home:{b:true,s:true,k:false,d:false,p:false,w:false,r:false}};}
function load(){
  try{
    var v=JSON.parse(localStorage.getItem(KEY));if(v&&v.profile){if(!Array.isArray(v.kickDays)){v.kickDays=(v.kickDay==null||v.kickDay===2)?[2,5]:(v.kickDay>=0?[v.kickDay]:[]);delete v.kickDay;}return v;}
    var o=JSON.parse(localStorage.getItem("kz_app_v2"))||JSON.parse(localStorage.getItem("kz_app_v1"));
    if(o&&o.profile){var f=fresh();["profile","logs","start","runKm","home","loc","mlen","abs"].forEach(function(k){if(o[k]!=null)f[k]=o[k];});f.onb=true;return f;}
  }catch(e){memOnly=true;}
  return fresh();}
var D=load();
(function(){var f=fresh();Object.keys(f).forEach(function(k){if(D[k]==null){D[k]=f[k];if(k==="focus")D.seenFocus=false;}});Object.keys(f.profile).forEach(function(k){if(D.profile[k]==null)D.profile[k]=f.profile[k];});Object.keys(f.skills).forEach(function(k){if(D.skills[k]==null)D.skills[k]=f.skills[k];});})();
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
  ["runKm","runI","bkAt"].forEach(function(k){if(n[k]!=null)b[k]=Math.max(0,Math.min(99,numv(n[k])));});
  if(n.loc==="h"||n.loc==="g")b.loc=n.loc; if(n.mlen==="k"||n.mlen==="n")b.mlen=n.mlen;
  b.logs=(Array.isArray(n.logs)?n.logs:[]).filter(function(l){return l&&typeof l==="object"&&DS.test(l.d)&&typeof l.id==="string"&&/^[A-Z]{2}$/.test(l.id);}).slice(-2000).map(function(l){
    var o={d:l.d,id:l.id,t:str(l.t,60),rpe:Math.max(0,Math.min(10,numv(l.rpe))),note:str(l.note),sum:str(l.sum),abs:l.abs?1:0};
    if(l.km!=null)o.km=numv(l.km);if(l.min!=null)o.min=numv(l.min);
    if(Array.isArray(l.sk))o.sk=l.sk.filter(function(x){return ["hs","mu","ls","fl","pl"].indexOf(x)>=0;});
    if(Array.isArray(l.m))o.m=l.m.filter(function(x){return typeof x==="string"&&MMOD[x];});return o;});
  if(n.ex&&typeof n.ex==="object")Object.keys(n.ex).slice(0,500).forEach(function(k){var e=n.ex[k];if(/^[a-z0-9_]+#\d+$/.test(k)&&e&&typeof e==="object")b.ex[k]={r:numv(e.r),w:numv(e.w),d:DS.test(e.d)?e.d:"",hold:!!e.hold,n:str(e.n,80),stall:numv(e.stall)};});
  if(n.vr&&typeof n.vr==="object")Object.keys(n.vr).slice(0,300).forEach(function(k){if(/^[a-z0-9_]+$/.test(k))b.vr[k]=Math.max(0,Math.min(20,Math.floor(numv(n.vr[k]))));});
  return b;}
function fmtKg(w){return String(w);}

/* ================= Bausteine ================= */
/* Variante "Name|Bedarf|w" · Bedarf zuhause: g Gym-Gerät, k Stange, b Band, d Hanteln, s Stühle, p Parallettes, w freie Wand, r Ringe · w = mit Gewicht */
var EQ={k:"Pull-up bar",b:"Resistance band",d:"Dumbbells or kettlebell",s:"Two sturdy chairs",p:"Parallettes",w:"Free wall",r:"Rings / suspension trainer"};
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
function can(o,loc){if(loc==="g")return true;for(var i=0;i<o.req.length;i++){var ch=o.req[i];if(ch==="g"||!D.home[ch])return false;}return true;}
function avail(it,loc){var a=[];it.opts.forEach(function(o,i){if(can(o,loc))a.push(i);});return a;}
function vkey(it){return it.k||it.iso||it.test||("f:"+it.opts[0].n);}
function curVar(it,loc){var a=avail(it,loc);if(!a.length)return -1;var v=D.vr[loc+"|"+vkey(it)];if(a.indexOf(v)>=0)return v;
  if(it.def){var dd=it.def();if(a.indexOf(dd)>=0)return dd;}
  if(it.lv){var L=lvl(),d=L===0?it.lv[0]:(L===2?it.lv[1]:0);if(a.indexOf(d)>=0)return d;}return a[0];}
function isoP(m){m=Math.round(m||0);
  if(m<11)return {n:5,h:Math.max(3,Math.round(m*0.6)),lev:-1};
  if(m<15)return {n:10,h:6,lev:0}; if(m<19)return {n:6,h:10,lev:0}; if(m<23)return {n:5,h:12,lev:0}; if(m<29)return {n:4,h:15,lev:0}; if(m<32)return {n:3,h:20,lev:0}; if(m<34)return {n:4,h:16,lev:0};
  return {n:3,h:20,lev:1};}
function hsStage(){var p=D.profile;return p.hsf>=5?3:(p.hsw>=45?2:1);}
function lsKey(){return D.profile.lsit>=11?"lsit":"tuck";}

function WARM(){return {name:"Warm-up",info:"approx. 8 min",p:1,rest:0,items:[
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
function skBlocks(id,longer,p){var pl=skillPlan(id,TODAY),one=selSk().length===1;return pl.map(function(k){return SKB(k,longer||one,p);});}
function LSIT(){var full=D.profile.lsit>=11,n=full?"L-Sit":"Tuck L-Sit";return I(lsKey(),full?"Legs straight, shoulders down":"Knees to chest, shoulders down. Then 3 short attempts with straight legs",[n+" on parallel bars|p",n+" between chairs|s",n+" on the floor","Hanging "+n+"|k"]);}
function MUB(){var L=lvl(),mu=D.profile.mu;
  if(L===0) return {name:"Pulling base",info:"2 min rest · the base before muscle-ups make sense",p:1,rest:120,items:[
    P("mu_neg",3,5,"reps","Start at the top, lower slowly for 5 s",["Negative pull-ups","Band-assisted negative pull-ups|b"],"8 s lowering","3"),
    F("3 × 20 s","Shoulder blades down and together",["Flexed arm hang at the top|k"])]};
  if(L===2) return {mu:1,name:"Muscle-Up",info:"fresh, 2–3 min rest · clean reps only",p:1,rest:150,items:[
    P("mu_pro",Math.max(2,Math.round(mu*0.5)),Math.max(4,mu),"reps","Strict, no kipping, deep dip at the top",["Strict muscle-ups (high bar, e.g. park)|k","Ring-Muscle-Ups|r","Weighted vest muscle-ups|k|w","Weighted explosive pull-ups (gym substitute)|g|w"],"add a vest","4")]};
  return {mu:1,name:"Muscle-Up-Skill",info:"fresh, 2–3 min rest · stop when technique gets sloppy",p:1,rest:150,items:[
    F(mu>=1?"EMOM 10 × 1–2":"5 × 1–2","Pull explosively to the hips, elbows fast forward",["Transition on a Smith machine, low bar, feet on floor|g","Explosive chest-to-bar pull-ups|k","Band-assisted muscle-up on a high bar|kb","Ring muscle-up with foot assist|r"])]};}
function SHOULDER(p,rot){return {name:"Shoulder stability",info:"Back to back · 60 s rest after the round",p:p||3,rest:60,rounds:[2,2],items:[
  rot?P("sh_y",12,15,"reps","Lower traps, thumbs up",["Prone Y-Raises","Cable Y-raises|g|w","Reverse Butterfly|g|w"],"add weight","2"):P("sh_fp",10,15,"reps","Elbows high, hands next to the head",["Cable face pulls|g|w","Band face pulls|b","Reverse Butterfly|g|w"],"more weight","2"),
  P("sh_er",10,15,"each side","Rotator cuff, elbow at your side",["Cable external rotation|g|w","Band external rotation|b","Side-lying dumbbell external rotation|d|w"],"more weight","2"),
  P("sh_sa",8,12,"reps","Serratus: at the top, push the shoulders far forward",["Scapula Push-Ups Plus","Serratus Wall Slides|w","Landmine Serratus Press|g|w"],"slower or add weight","2")]};}
function FOREARM(){return {name:"Forearms & elbows",info:"Back to back · protects the tendons for false grip and muscle-ups",p:3,rest:45,rounds:[2,2],items:[
  P("fa_rc",12,20,"reps","Lower slowly, elbows still",["EZ-bar reverse curls|g|w","Band reverse curls|b","Dumbbell reverse curls|d|w"],"more weight","2"),
  P("fa_wc",15,20,"reps","Alternate wrist flexors and extensors",["Dumbbell wrist curls|g|w","Band wrist curls|b"],"more weight","2")]};}
function LEGMINI(){return {name:"Compact legs",info:"Strength C was a while ago · 3 sets · 90 s rest",p:2,rest:90,items:[
  P("c_sq",6,10,"reps","",["Dumbbell Bulgarian split squat|g|w","Barbell back squat|g|w","Leg press|g|w","Assisted pistol squat"],"more weight","3",[3,0]),
  P("c_rdl",8,12,"reps","Hips back, back straight",["Romanian deadlift|g|w","Leg curl machine|g|w","Nordic Curls"],"more weight","3")]};}
function KPOW(){return {name:"Kickboxing power",info:"60 s rest",p:3,rest:60,rounds:[2,3],items:[
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
var NAMES={KA:"Strength A: Muscle-up",KB:"Strength B: Volume",KC:"Strength C: Full body & legs",CH:"Venus Challenge",SK:"Skill session",RS:"Recovery & kick mobility",DL:"Deload",TE:"Test",HO:"Home strength",HK:"Home skills",RE:"Easy run",RH:"Hard run",RI:"Interval run",KI:"Kickboxing",MO:"Morning routine"};
function updNames(){NAMES.KA=D.skills.mu?"Strength A: Muscle-up":"Strength A: Pull & push";}
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
    if(!sk.ls&&b.name==="L-sit & support") nb.name="Support";
    out.push(nb);});
  if((id==="HO"||id==="HK")){var ex=[];
    if(sk.pl) ex.push(PLB(id==="HK",1));
    if(sk.fl&&D.home.k) ex.push(FLB(id==="HK",1));
    if(id==="HO"&&sk.hs) ex=[];
    var at=out.length&&out[0].name==="Warm-up"?1:0; Array.prototype.splice.apply(out,[at,0].concat(ex.slice(0,id==="HO"?1:2)));}
  if(COOLK[id]) out.push(COOL(COOLK[id]));
  return out;}
var GYM=["KA","KB","KC","CH","SK","RS","DL","TE"], HOME=["HO","HK","RS"];
var HARD={KA:1,KB:1,KC:1,CH:1,RH:1,RI:1,KI:1,TE:1,HO:1}, STR={KA:1,KB:1,KC:1,CH:1,DL:1,TE:1,HO:1}, HASHS={KA:1,KB:1,SK:1,KC:1,HO:1,HK:1};
function S(id,c){
  var s=S0(id,c),sk=D.skills;
  s.blocks=postBlocks(id,s.blocks);
  return s;
}
function S0(id,c){
  var ph=c.phase,L=lvl(),lf=c.lowFreq&&c.kcGap>=10,pr=D.profile,b;
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
    if(lf) b.splice(b.length-1,0,LEGMINI());
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
    if(lf) b.splice(b.length-1,0,LEGMINI());
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
  case "CH": return {goal:"A check-in every two weeks. Note time and clean attempts in the note.",blocks:[WARM(),
    {name:"Muscle-Up EMOM",info:"2 attempts every minute for 10 minutes",p:1,rest:0,items:[F("10 × 2",L===0?"Basic: 2 negative pull-ups each":"Sloppy? Switch to transitions",L===0?["Negative pull-ups"]:["Explosive chest-to-bar pull-ups","Transition on a Smith machine","Strict muscle-ups (high bar)","Ring muscle-up with foot assist"])]},
    {name:"Block 2",info:"60 s rest between exercises",p:1,rest:60,items:[F("60 s accumulated","",["Tuck Front Lever","Straight-arm pulldown hold"]),F("30","",["Push-Ups"]),F("5","5 s lowering",["Negative Dragon Flags","Lying leg lowers (easier)"])]},
    {name:"Block 3",info:"60 s rest",p:1,rest:60,items:[F("60 s accumulated","",["Tuck planche on parallettes","Planche lean (easier)"]),F("30","",["Bodyweight Rows","Cable row"]),F("5","",["Negative Dragon Flags","Lying leg lowers (easier)"])]},
    {name:"Block 4",info:"60 s rest",p:1,rest:60,items:[F("60 s accumulated","",["Tuck Back Lever","Reverse hyperextension hold"]),F("30","",["Jumping Squats"]),F("5","",["Negative Dragon Flags","Lying leg lowers (easier)"])]}]};
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
  w=st.w||null; var gap=diff(st.d,TODAY), inc=w&&w>=40?5:2.5;
  if(gap>10){var back=gap>28?2:1, r0=Math.max(1,Math.min(it.hi,st.r)-back*step), w0=(o.w&&w)?Math.max(0,w-back*inc):w;
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
  return {week:wk,cyc:(wk-1)%6+1,phase:((wk-1)%12)<6?1:2,lowFreq:h.lowFreq,kcGap:Math.min(h.KC,h.CH)};
}
function hist(s){
  var h={},y=onDay(addD(s,-1));
  ["KA","KB","KC","CH","RE","RH","RI","DL","TE","HO","SK","KI"].forEach(function(k){h[k]=since(k,s);});
  h.C=Math.min(h.KC,h.CH);
  h.strY=y.some(function(l){return STR[l.id];}); h.kcY=y.some(function(l){return l.id==="KC";});
  h.rhY=y.some(function(l){return l.id==="RH"||l.id==="RI";}); h.limitY=y.some(function(l){return HARD[l.id]&&(l.rpe||0)>=10;});
  h.hardRun=0; for(var i=1;i<=4;i++){if(onDay(addD(s,-i)).some(function(l){return HARD[l.id]&&(l.rpe||6)>=6;}))h.hardRun++;else break;}
  h.hsN=D.logs.filter(function(l){var x=diff(l.d,s);return x>=0&&x<=6&&HASHS[l.id];}).length;
  h.runs7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=7&&isRun(l);}).length;
  h.str7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=6&&STR[l.id];}).length;
  h.lim7=D.logs.filter(function(l){var x=diff(l.d,s);return x>=1&&x<=7&&(l.rpe||0)>=10;}).length;
  h.skN=D.logs.filter(function(l){var x=diff(l.d,s);return x>=0&&x<=6&&(l.sk?l.sk.length>0:!!HASHS[l.id]);}).length;
  h.skT=selSk().length?4:0; h.hardR=Math.min(h.RH,h.RI);
  h.run=Math.min(h.RE,h.RH,h.RI);
  var td=onDay(s); h.ranToday=td.some(isRun); h.strToday=td.some(function(l){return STR[l.id];});
  var first=D.logs.filter(isTrain)[0], days={};
  D.logs.forEach(function(l){var x=diff(l.d,s);if(isTrain(l)&&x>=1&&x<=14)days[l.d]=1;});
  h.lowFreq=!!first&&diff(first.d,s)>=14&&Object.keys(days).length<=7;
  return h;
}
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
  if(h.lim7>=3) return easyPick(h,"Three times at the limit in 7 days: your body needs rest.");
  if(h.hardRun>=3) return easyPick(h,"Three hard days in a row.");
  var strOK=!h.strY&&!h.strToday&&(F!=="run"||h.str7<2);
  if(c.cyc===6){
    if(strOK&&h.DL>=6&&h.TE>=6) return {btn:"train",id:"DL",why:"Week "+c.week+" is a deload week."};
    if(strOK&&h.TE>=6&&h.DL>=2) return {btn:"train",id:"TE",why:"Deload done, now test your bests."};
    if(F!=="str"&&h.RE>=2&&!h.ranToday) return {btn:"run",id:"RE",why:"Deload week: easy running only."};
    return easyPick(h,"Deload week.");
  }
  var C=[],W={bal:{KA:10,KB:9,C:8,RH:7,RE:6,RI:0},str:{KA:10,KB:9,C:9,RH:0,RE:0,RI:0},run:{KA:7,KB:6,C:7,RH:8,RE:9,RI:8}}[F]||{},mS=F==="str"?4:6;
  function add(id,btn,wt,since,ok,why,min){ if(wt&&ok&&since>=(min||6)) C.push({id:id,btn:btn,sc:wt*cap(since)/7,why:why}); }
  var hardOK=!h.kcY&&!h.ranToday&&!kickT;
  add("KA","train",W.KA,h.KA,strOK&&!h.ranToday,"Strength A "+ago(h.KA)+".",mS);
  add("KB","train",W.KB,h.KB,strOK,"Strength B "+ago(h.KB)+".",mS);
  var kcId=(h.CH>=13&&h.KC<h.CH)?"CH":"KC";
  add(kcId,"train",W.C,h.C,strOK&&!kickT&&!(F==="run"&&h.hardR<=1),kcId==="CH"?"The challenge has been due for 2 weeks.":"Legs and full body "+ago(h.C)+".",mS);
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
  return '<div class="ex pose'+(on?" done":"")+'"><input type="checkbox" id="c'+id2+'" data-a="done" data-id="'+id2+'"'+(on?" checked":"")+' aria-label="'+esc(x[0])+' done">'+(pc?'<div class="pw">'+pc+'</div>':'')+'<div class="exb"><label class="n" for="c'+id2+'">'+esc(x[0])+'</label><div class="tg">'+esc(x[1])+'</div>'+(x[2]?'<div class="c">'+esc(x[2])+'</div>':'')+'</div></div>';}

/* ================= Cool-down: 5 min static stretching after every session =================
   About 30–45 s per stretch on warm muscles. Static stretching improves flexibility; gains level off around
   4 min per muscle group per session and 10 min per week, so a daily 5-minute cool-down adds up. */
var COOLS={
 up:{n:"after upper-body work",items:[["Passive dead hang","30 s","Relax the shoulders, let the body hang","g"],["Doorway chest stretch","30 s each side","Elbow at shoulder height, step through",""],["Kneeling lat stretch on a bench","45 s","Sink the chest, arms long","g"],["Wrist flexor stretch","30 s","Fingers point to the knees, lean back gently",""],["Overhead triceps stretch","30 s each side","Elbow up, other hand pulls gently",""],["Child's pose","45 s","Arms long, breathe into the back",""],["Puppy pose","45 s","Hips over knees, chest sinks",""]]},
 legs:{n:"after leg work",items:[["Couch stretch","45 s each side","Back knee down, squeeze that glute",""],["Pigeon pose","45 s each side","Hips square, chest tall",""],["Supine hamstring stretch","40 s each side","Leg straight, pull gently",""],["Standing calf stretch","30 s each side","Back heel down, knee straight","g"],["Butterfly stretch","45 s","Soles together, knees fall out",""],["Deep squat hold","45 s","Heels down, elbows push the knees out",""]]},
 run:{n:"after running",items:[["Standing calf stretch","30 s each side","Hands on a wall, tree or fence. Back knee straight, heel down",""],["Bent-knee calf stretch","30 s each side","Same stance, bend the back knee",""],["Half-kneeling hip flexor stretch","40 s each side","Squeeze the back glute",""],["Standing quad stretch","30 s each side","Knees together, hips forward",""],["Supine figure-4 stretch","40 s each side","Pull the thigh in",""],["Supine hamstring stretch","40 s each side","Leg straight, pull gently",""]]},
 kick:{n:"after kickboxing",items:[["Frog stretch","60 s","Knees wide, rock the hips back",""],["Pigeon pose","45 s each side","Hips square",""],["Half-kneeling hip flexor stretch","40 s each side","Squeeze the back glute",""],["Seated straddle reach","45 s","Long spine, reach to each foot",""],["Gentle supine twist","30 s each side","Shoulders stay down",""]]}
};
function coolItems(kind,loc,s){var c=COOLS[kind],doy=Math.floor(pd(s||TODAY).getTime()/864e5),it=c.items.filter(function(x){return !(x[3]==="g"&&loc==="h");}),out=[];
  for(var i=0;i<Math.min(5,it.length);i++) out.push(it[(doy+i)%it.length]);
  return out.filter(function(x,i,a){return a.indexOf(x)===i;});}
function COOL(kind){return {name:"Cool-down",info:"5 min · "+COOLS[kind].n+" · hold, breathe slowly",p:1,rest:0,cool:kind,items:coolItems(kind,D.loc).map(function(x){return F(x[1],x[2],[x[0]]);})};}
var KM_POST={name:"Cool-down",info:"5 min · after kickboxing · hold, breathe slowly",p:1,rest:0,items:COOLS_KICK()};
var COOLK={KA:"up",KB:"up",SK:"up",HO:"up",HK:"up",CH:"legs",TE:"up",DL:"legs",KC:"legs"};

/* ================= Darstellung ================= */
var app=document.getElementById("app"), rendering=false, TB=null;
var TABS=[["start","Today"],["verlauf","Chronicle"],["stand","Status"],["mehr","More"]];
function back(){return '<button type="button" class="lnk bk" data-tab="start">← Today</button>';}
function rpeHTML(f){return '<p class="q" id="rpeq">How hard was the battle?</p><div class="seg" role="group" aria-labelledby="rpeq">'+[[4,"Easy"],[6,"Fine"],[8,"Hard"],[10,"At the limit"]].map(function(x){return '<button type="button" class="b'+(f.rpe===x[0]?" on":"")+'" data-a="rpe" data-v="'+x[0]+'" aria-pressed="'+(f.rpe===x[0])+'">'+x[1]+'</button>';}).join("")+'</div>';}
function painHit(name){var p=D.pain||{};return Object.keys(PAINRX).some(function(k){return p[k]&&PAINRX[k].test(name);});}
function setBoxes(id,n,inp,ph,isS,rest,last){
  var s=inp.s||[],h='';
  for(var i=0;i<n;i++) h+='<label>'+(n>1?(i+1)+'.':(isS?"Sec.":"reps"))+'<input type="number" inputmode="numeric" data-set="'+i+'" data-id="'+id+'" data-rest="'+rest+'" data-last="'+(last?1:0)+'" data-n="'+n+'" value="'+esc(s[i])+'" placeholder="'+ph+'" aria-label="Set '+(i+1)+(isS?" seconds":" reps")+'"></label>';
  return h;
}
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
  h+='<label class="n" for="c'+id+'">'+esc(o.n)+'</label>';
  if(sk) return h+'<div class="c">'+(pain?"Skipped because of pain.":"Skipped today.")+(pain?'':' <button type="button" class="lnk" data-a="skip" data-id="'+id+'">Undo</button>')+'</div></div></div>';
  h+='<div class="tg">'+esc(tg)+'</div>';
  if(it.c) h+='<div class="c">'+esc(it.c)+'</div>';
  if(g&&g.note) h+='<div class="c gold">'+esc(g.note)+'</div>';
  h+=extra;
  if(!it.f){ h+='<div class="inp">';
    if(o.w&&!it.iso&&!it.test) h+='<label>kg<input type="number" step="0.5" inputmode="decimal" data-inp="w" data-id="'+id+'" value="'+esc(inp.w)+'" placeholder="'+(g.w||"")+'"></label>';
    h+=setBoxes(id,n,inp,g.r,isS,rest,last)+'</div>'; }
  h+='<div class="acts">'+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="'+id+'">⇄ Swap</button>':'')+'<button type="button" class="lnk" data-a="skip" data-id="'+id+'">Skip</button></div>';
  return h+'</div></div>';
}
function blockHTML(b,bi,id,dy,loc,c,first){
  var vis=[];b.items.forEach(function(it,ii){if(curVar(it,loc)>=0)vis.push(ii);});
  if(!vis.length) return "";
  var n=0,dn=0,rows=vis.map(function(ii,k){var iid=id+"-"+bi+"-"+ii;var r=itemHTML(b.items[ii],iid,dy,loc,b,c,id,k===vis.length-1);if(r){n++;if(dy.done[iid]||dy.skip[iid]||(!b.rehab&&painHit(b.items[ii].opts[curVar(b.items[ii],loc)].n)))dn++;}return r;}).join("");
  var key=id+"-"+bi, op=dy.open&&dy.open[key]!=null?dy.open[key]:first;
  var kind=b.rounds?'<span class="kind z">Circuit · '+rounds(b,c,id)+' rounds</span>':(b.rest?'<span class="kind">Set by set</span>':'');
  return '<details class="blk'+(dn===n?" fin":"")+'" data-blk="'+key+'"'+(op?" open":"")+'><summary><span class="bn">'+esc(b.name)+'</span><span class="bc">'+(dn===n?"✓":dn+"/"+n)+'</span><span class="bi">'+kind+esc(b.info||"")+'</span></summary>'+
    (b.rounds?'<p class="hint">Do all exercises once back to back, then rest. That is one round. Enter each round in the boxes.</p>':'')+rows+'</details>';
}
function absHTML(ab,dy,loc,first){
  var A=ABS[ab.i],on=!!dy.done["abs-T"],run=TB!==null;
  var h='<details class="blk'+(on?" fin":"")+'" data-blk="abs" '+((dy.open&&dy.open.abs!=null?dy.open.abs:!!first)||run?"open":"")+'><summary><span class="bn">Ab Tabata · '+esc(A.n)+'</span><span class="bc">'+(on?"✓":"")+'</span><span class="bi"><span class="kind z">Tabata</span>'+ab.rounds+' × 20 s work, 10 s rest · '+(ab.rounds/2)+' min · two exercises alternating</span></summary>';
  A.items.forEach(function(it,ii){var v=curVar(it,loc),a=avail(it,loc);
    h+='<div class="ex"><span class="num">'+(ii?"B":"A")+'</span><div class="exb"><div class="tgrow"><span class="n">'+esc(it.opts[v].n)+'</span>'+(a.length>1?'<button type="button" class="lnk" data-a="chg" data-id="abs-'+ab.i+'-'+ii+'">⇄ Swap</button>':'')+'</div><div class="c">'+esc(it.c)+'</div></div></div>';});
  h+='<div class="tb"><div class="tbbox" id="tbbox"'+(run?'':' hidden')+'><span class="eyebrow" id="tbp">Ready</span><span class="tbt" id="tbt">5</span><span class="muted" id="tbn"></span></div>'+
     (run?'<button type="button" class="b wide" data-a="tbstop">Cancel</button>':'<button type="button" class="b red wide" data-a="tbgo" data-r="'+ab.rounds+'" data-i="'+ab.i+'">'+(on?"Start again":"Start Tabata")+'</button>'+(on?'':'<button type="button" class="lnk" data-a="tbdone">Mark as done without the timer</button>'))+'</div>';
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
function vOnb(){
  var st=D.obStep||0,T=["Enter your basics","Choose your doctrine","Equipment & battle days"],h='';
  h+='<section class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgt"><div class="dlgh"><span class="eyebrow">Oath of induction · step '+(st+1)+' of 3</span><h2 id="dlgt" tabindex="-1">'+T[st]+'</h2><div class="steps" aria-hidden="true">'+[0,1,2].map(function(i){return '<i class="'+(i<=st?"on":"")+'"></i>';}).join("")+'</div></div><div class="dlgb">';
  if(st===0) h+='<p>Welcome to the crusade, brother. Enter once what you can do today. Rough numbers are fine. Anything you cannot do yet: 0.</p>'+
    '<h3>Pull & support · reps</h3>'+profGrid([["pull","Clean pull-ups"],["dips","Parallel bar dips"],["push","Push-ups"],["expl","Explosive chest-to-bar pull-ups"],["mu","Clean muscle-ups"],["pike","Pike Push-Ups"]],"o_")+
    '<h3>Holds · seconds</h3>'+profGrid([["hsw","Handstand, chest to wall"],["hsf","Freestanding handstand"],["tuck","Tuck L-Sit"],["lsit","Straight-leg L-sit"],["hang","Active Hang"]],"o_")+
    '<p class="muted" id="lvlnote" role="status">'+lvlNote()+'</p>';
  if(st===1) h+='<p>Where does your crusade lead? You can change this any time under “More”.</p>'+focusHTML("o");
  if(st===2) h+='<p>Almost done. When is kickboxing class, and what do you have at home?</p><h3>Kickboxing days</h3>'+kickSel("o_kick")+
    '<h3>At home</h3><p class="muted">The yoga mat is always there.</p>'+Object.keys(EQ).map(function(k){return '<label class="chk"><input type="checkbox" data-a="eq" data-k="'+k+'"'+(D.home[k]?" checked":"")+'>'+EQ[k]+'</label>';}).join("")+
    '<div class="sum"><b>Your crusade</b><span>'+LVN[lvl()]+' · '+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+' · '+(["hs","mu","ls","fl","pl"].filter(function(k){return D.skills[k];}).map(function(k){return SKN[k];}).join(", ")||"no skills")+'</span></div>';
  h+='</div><div class="dlgf">'+(st>0?'<button type="button" class="b" data-a="obback">Back</button>':'<span></span>')+(st<2?'<button type="button" class="b red" data-a="obnext">Next</button>':'<button type="button" class="b red" data-a="onb">Begin the crusade</button>')+'</div></section>';
  return h;
}
function vStart(){
  var dy=day(),r=recAll(TODAY,dy.noKick),td=onDay(TODAY),h="";
  function was(f){return td.some(f);}
  var dn={morgen:was(function(l){return l.id==="MO";}),train:was(function(l){return GYM.indexOf(l.id)>=0||HOME.indexOf(l.id)>=0;}),run:was(isRun),kick:was(function(l){return l.id==="KI";})};
  if(D._toast){h+='<div class="toast" role="status">'+esc(D._toast)+'</div>';D._toast="";}
  if(!D.seenFocus) h+='<button type="button" class="warn wbtn" data-tab="mehr">New: choose your doctrine. Focus on running, strength or balanced, plus your skills →</button>';
  if(memOnly) h+='<div class="warn">This browser does not allow saving here. Use the backup under More.</div>';
  var unb=D.logs.length-(D.bkAt||0);
  if(unb>=10) h+='<button type="button" class="warn wbtn" data-tab="mehr">'+unb+' entries since the last backup. Back up now →</button>';
  function big(tab,title,sub){var rec=r.btn===tab&&!dn[tab];
    return '<button type="button" class="big'+(dn[tab]?" done":(rec?" rec":""))+'" data-tab="'+tab+'"><span class="bt"><b>'+title+'</b>'+(dn[tab]?'<i class="tag ok">Done</i>':(rec?'<i class="tag">Recommended</i>':''))+'</span><span>'+(rec?'<span class="rn">'+esc(NAMES[r.id])+'</span><br>'+esc(r.why):esc(sub))+'</span></button>';}
  h+='<h2 class="q">Your orders for today</h2>';
  h+=big("morgen","Morning routine","Home, on the mat · 7 or 15 min");
  h+=big("train","Training","Gym or home");
  h+=big("run","Running",D.focus==="str"?"Not in the plan · log it anyway":"Easy, intervals or hard "+fmtKg(D.runKm)+" km");
  h+=big("kick","Kickboxing","Log it, with mobility before and after");
  if(r.btn==="kick"&&!dn.kick){var alt=recAll(TODAY,true);h+='<button type="button" class="lnk ctr" data-a="nokick">No kickboxing today? Then: '+esc(NAMES[alt.id])+'</button>';}
  if(dy.noKick&&isKick(TODAY)&&!dn.kick) h+='<button type="button" class="lnk ctr" data-a="nokick">Kickboxing after all</button>';
  if(td.some(isTrain)){var tr=recAll(addD(TODAY,1));h+='<p class="muted ctr">Likely tomorrow: <b>'+esc(({train:"Training · ",run:"Running · ",kick:""}[tr.btn])+NAMES[tr.id])+'</b></p>';}
  return h;
}
function vMorgen(){
  var dy=day(),m=morning(TODAY),short=D.mlen==="k",L=mSections(m,short);
  var h=back()+'<div class="seg" role="group" aria-label="Length"><button type="button" class="b'+(!short?" on":"")+'" data-a="mlen" data-v="n" aria-pressed="'+(!short)+'">Normal · 15 min</button><button type="button" class="b'+(short?" on":"")+'" data-a="mlen" data-v="k" aria-pressed="'+short+'">Short · 7 min</button></div><div class="hero"><span class="eyebrow">Morning litany · home, on the mat</span><h2>Morning routine</h2><p>'+esc(m.why.join(" "))+'</p><p class="muted">Gentle start: no deep forward bends in the first hour after waking.</p></div>';
  L.forEach(function(sec,si){
    h+='<details class="blk" open><summary><span class="bn">'+esc(sec.n)+'</span><span class="bi">'+esc(sec.info)+'</span></summary>';
    sec.items.forEach(function(x,ii){h+=poseRow(x,"m-"+sec.k+"-"+ii,dy);});
    h+='</details>';});
  var dM=onDay(TODAY).some(function(l){return l.id==="MO";});
  h+=(dM?'<p class="ctr"><span class="pill ok">Done today</span></p>':'<button type="button" class="b red wide" data-a="savemo">Morning routine done</button>');
  return h;
}
function vTrain(){
  var dy=day(),loc=D.loc,c=ctx(TODAY),Tt=trainId(dy),id=Tt.id,s=S(id,c),ab=absFor(id),f=dy.fin,list=loc==="g"?GYM:HOME,pn=D.pain||{};
  var h=back()+'<div class="seg"><button type="button" class="b'+(loc==="g"?" on":"")+'" data-a="loc" data-v="g" aria-pressed="'+(loc==="g")+'">Gym</button><button type="button" class="b'+(loc==="h"?" on":"")+'" data-a="loc" data-v="h" aria-pressed="'+(loc==="h")+'">Home</button></div><button type="button" class="tgl'+(D.short?" on":"")+'" data-a="short" aria-pressed="'+D.short+'"><span class="sw" aria-hidden="true"></span>Limited time <span class="muted">· '+(D.short?"on, essentials only":"off, full session")+'</span></button>';
  var pnL=Object.keys(pn).filter(function(k){return pn[k];}).map(function(k){return {w:"Wrist",s:"Shoulder",e:"Elbow"}[k];});
  h+='<div class="hero"><span class="eyebrow">Week '+c.week+(c.cyc===6?' · Deload':' · Venus part '+c.phase)+' · '+LVN[lvl()]+(D.short?' · shortened':'')+'</span><h2>'+NAMES[id]+'</h2><p>'+esc(s.goal)+'</p>'+(Tt.rec?'<p class="muted">'+esc(Tt.rec.why[0])+'</p>':'')+(pnL.length?'<p class="c gold">Rehab active: '+pnL.join(", ")+'</p>':'')+'</div>';
  h+='<details class="opt"><summary>Other session · pain'+(loc==="h"?' · equipment':'')+'</summary><label class="lab" for="pick">Session</label><select id="pick" data-a="pick">'+list.map(function(k){return '<option value="'+k+'"'+(k===id?" selected":"")+'>'+NAMES[k]+'</option>';}).join("")+'</select>'+
     '<p class="muted">Pain? Affected exercises are skipped and a rehab block is added.</p>'+[["w","Wrist"],["s","Shoulder"],["e","Elbow"]].map(function(x){return '<label class="chk"><input type="checkbox" data-a="pain" data-k="'+x[0]+'"'+(pn[x[0]]?" checked":"")+'>'+x[1]+'</label>';}).join("")+
     (loc==="h"?'<p class="muted">What do you have at home? The mat is always there.</p>'+Object.keys(EQ).map(function(k){return '<label class="chk"><input type="checkbox" data-a="eq" data-k="'+k+'"'+(D.home[k]?" checked":"")+'>'+EQ[k]+'</label>';}).join(""):'')+'</details>';
  var first=true,extraDone=false;
  function extras(){ if(extraDone) return; extraDone=true;
    Object.keys(REHAB).forEach(function(k,ki){ if(pn[k]) h+=blockHTML({name:REHAB[k].name,info:"light and pain-free",items:REHAB[k].items,rest:0,rehab:true},90+ki,id,dy,loc,c,false); });
    var ao=first&&!dy.done["abs-T"]; h+=absHTML(ab,dy,loc,ao); if(ao) first=false; }
  s.blocks.forEach(function(b,bi){ if(D.short&&b.p>1) return;
    if(b.cool) extras();
    var all=b.items.every(function(it,ii){var v=curVar(it,loc);return v<0||dy.done[id+"-"+bi+"-"+ii]||dy.skip[id+"-"+bi+"-"+ii]||painHit(it.opts[v].n);});
    var x=blockHTML(b,bi,id,dy,loc,c,first&&!all); if(x&&first&&!all) first=false; h+=x; });
  extras();
  h+='<div class="card"><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="savetr">Log training</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function runRec(){var h0=hist(TODAY),a=recAll(TODAY,true);if(a.btn==="run")return a;
  var hardOK=!h0.kcY&&!h0.rhY&&!isKick(addD(TODAY,1))&&!(isKick(TODAY)&&!day().noKick);
  if(hardOK&&D.focus==="run"&&h0.RI>=5&&h0.RH>=2&&cap(h0.RI)>=cap(h0.RH)) return {id:"RI",why:"Intervals "+ago(h0.RI)+"."};
  return (hardOK&&cap(h0.RH)>=cap(h0.RE)&&h0.RH>=6)?{id:"RH",why:NAMES.RH+" "+ago(h0.RH)+"."}:{id:"RE",why:"Easy run "+ago(h0.RE)+"."};}
var RUNT={RE:"Easy",RI:"Intervals",RH:"Hard"};
function runInfo(id){var R=D.focus==="run";
  if(id==="RE") return {h:R?"30–45 min easy":"5 km easy",p:(R?"30–45 min. ":"30–35 min. ")+"Easy enough that you can speak in full sentences."+(R?" At the end 4–6 strides of 20 s: build speed smoothly, walk back.":"")+" Strength training today as well? Then strength first, or keep 3 hours apart."};
  if(id==="RI") return {h:D.runI+" × 3 min fast",p:"10 min warm-up jog. Then "+D.runI+" × 3 min fast with 2 min jogging in between. 10 min cool-down jog. Fast means: only single words possible, but every rep equally quick. No strength training afterwards."};
  return {h:fmtKg(D.runKm)+" km hard",p:"About 6:30/km. 5 min warm-up jog, no strength training afterwards."};}
function vRun(){
  var dy=day(),rr=runRec(),id=dy.run||rr.id,f=dy.fin,ri=runInfo(id);
  var h=back()+'<div class="seg" role="group" aria-label="Run type">'+["RE","RI","RH"].map(function(k){return '<button type="button" class="b'+(id===k?" on":"")+'" data-a="runtype" data-v="'+k+'" aria-pressed="'+(id===k)+'">'+RUNT[k]+'</button>';}).join("")+'</div>';
  h+='<div class="hero"><span class="eyebrow">'+(id===rr.id?"Recommended":"Your choice")+'</span><h2>'+esc(ri.h)+'</h2><p>'+esc(ri.p)+'</p><p class="muted">'+esc(rr.why)+'</p></div>';
  h+='<details class="blk"><summary><span class="bn">Cool-down</span><span class="bi">5 min after the run · hold each stretch, breathe slowly</span></summary>'+coolItems("run","h").map(function(x,i){return poseRow(x,"rc-"+i,dy);}).join("")+'</details>';
  h+='<div class="card"><div class="sec"><p class="q">After the run</p><div class="inp two"><label>Distance km<input type="number" id="f_km" step="0.01" inputmode="decimal" data-fin="km" value="'+esc(f.km)+'"></label><label>Time min<input type="number" id="f_min" step="0.1" inputmode="decimal" data-fin="min" value="'+esc(f.min)+'"></label></div>'+
     (num(f.km)>0&&num(f.min)>0?'<p class="tg">Pace '+pace({km:num(f.km),min:num(f.min)})+'</p>':'')+
     '<label class="filebtn" for="gfile">Import Garmin file (GPX/TCX)</label><input type="file" id="gfile" class="vh" accept=".gpx,.tcx,application/gpx+xml,text/xml" data-a="gfile">'+(f.gmsg?'<p class="muted" role="status">'+esc(f.gmsg)+'</p>':'')+'</div>'+
     '<div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="saverun">Log run</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
  return h;
}
function vKick(){
  var dy=day(),f=dy.fin,c=ctx(TODAY);
  return back()+'<div class="hero"><span class="eyebrow">Battle day</span><h2>Kickboxing</h2><p>No handstand today, wrists and shoulders get enough work.</p></div>'+blockHTML(KM_PRE,0,"KI",dy,"h",c,true)+blockHTML(KM_POST,1,"KI",dy,"h",c,false)+
    '<div class="card"><div class="sec">'+rpeHTML(f)+'<label class="lab" for="f_note">Note (optional)</label><textarea id="f_note" data-fin="note">'+esc(f.note)+'</textarea><button type="button" class="b red wide" data-a="savekick">Log kickboxing</button>'+(f.err?'<p class="warn" role="alert">'+esc(f.err)+'</p>':'')+'</div></div>';
}
function vVerlauf(){
  var w=D.logs.filter(function(l){var x=diff(l.d,TODAY);return x>=0&&x<=6;});
  function n(f){return w.filter(f).length;}
  var sk=selSk().length?4:0,F=D.focus,T2=F==="run"?[["Strength sessions",n(function(l){return STR[l.id];}),2],["Easy run",n(function(l){return l.id==="RE";}),3],["Intervals",n(function(l){return l.id==="RI";}),1],["Long run",n(function(l){return l.id==="RH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk?2:0]]:
    [["Strength A",n(function(l){return l.id==="KA";}),1],["Strength B",n(function(l){return l.id==="KB";}),1],["Strength C / Challenge",n(function(l){return l.id==="KC"||l.id==="CH";}),1],["Skill training",n(function(l){return l.sk?l.sk.length>0:HASHS[l.id];}),sk],["Easy run",n(function(l){return l.id==="RE";}),F==="str"?0:1],["Hard run",n(function(l){return l.id==="RH"||l.id==="RI";}),F==="str"?0:1]];
  T2=T2.concat([["Kickboxing",n(function(l){return l.id==="KI";}),D.kickDays.length],["Ab Tabata",n(function(l){return l.abs;}),5],["Morning routine",n(function(l){return l.id==="MO";}),7]]);
  var h='<div class="card"><div class="sec"><h2>Chronicle · last 7 days</h2><div class="tally">'+T2.filter(function(t){return t[2]>0;}).map(function(t){return '<div class="t"><b>'+t[1]+' / '+t[2]+(t[1]>=t[2]?' ✓':'')+'</b>'+t[0]+'</div>';}).join("")+'</div></div>';
  var ex=Object.keys(D.ex).map(function(k){return D.ex[k];}).filter(function(e){return e.n;}).sort(function(a,b){return a.d<b.d?1:-1;}).slice(0,10);
  if(ex.length) h+='<div class="sec"><h3>Latest values</h3>'+ex.map(function(e){return '<div class="log"><span>'+esc(e.n)+'</span><b>'+e.r+(e.w?' × '+fmtKg(e.w)+' kg':'')+'</b></div>';}).join("")+'</div>';
  h+='<div class="sec"><h3>All entries</h3>';
  if(!D.logs.length) h+='<p class="muted">Nothing logged yet.</p>';
  D.logs.slice().reverse().forEach(function(l){var i=D.logs.indexOf(l),d=pd(l.d);
    h+='<div class="log"><b>'+esc(l.t)+'</b><span class="muted">'+d.getDate()+' '+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+'</span><span class="muted">'+(l.rpe?({4:"Easy",6:"Fine",8:"Hard",10:"At the limit"}[l.rpe]||""):'')+(l.km?' · '+fmtKg(l.km)+' km'+(l.min?' in '+fmtKg(l.min)+' min · '+pace(l):''):'')+(l.sum?' · '+esc(l.sum):'')+(l.note?' · '+esc(l.note):'')+'</span><button type="button" class="b sm" data-a="del" data-i="'+i+'">'+(D._del===i?'Really delete':'Delete')+'</button></div>';});
  return h+'</div></div>';
}
function vStand(){
  var p=D.profile,c=ctx(TODAY),L=lvl(),F2=[["pull","Clean pull-ups"],["dips","Dips"],["push","Push-ups"],["expl","Explosive chest-to-bar pull-ups"],["negmu","Negative Muscle-Ups (5 s)"],["mu","Clean muscle-ups"],["hang","Active Hang (s)"],["tuck","Tuck L-Sit (s)"],["lsit","Straight-leg L-sit (s)"],["hollow","Hollow Body (s)"],["hsw","Chest-to-wall handstand (s)"],["hsf","Freestanding handstand (s)"],["pike","Pike Push-Ups"]];
  var mu=L===0?"Basic: build pull-ups and dips":(p.mu>=3?"Advanced: build muscle-ups":(p.mu>=1?"Consolidate the muscle-up":(p.pull>=10&&p.expl>=5?"Free muscle-up attempts":"Build explosive strength")));
  var hq=isoP(p.hsw),lq=isoP(p[lsKey()]);
  return '<div class="card"><div class="sec"><h2>Your status</h2><div class="tally"><div class="t"><b>'+LVN[L]+'</b>Level</div><div class="t"><b>'+FOC.filter(function(x){return x[0]===D.focus;})[0][1]+'</b>Focus</div>'+(D.skills.mu?'<div class="t"><b>'+mu+'</b>Muscle-Up</div>':'')+(D.skills.hs?'<div class="t"><b>Stage '+hsStage()+' · '+hq.n+' × '+hq.h+' s</b>Handstand</div>':'')+(D.skills.ls?'<div class="t"><b>'+(lsKey()==="lsit"?"L-Sit ":"Tuck ")+lq.n+' × '+lq.h+' s</b>L-Sit</div>':'')+(D.skills.fl?'<div class="t"><b>'+FLN[D.profile.flSt||0]+'</b>Front Lever</div>':'')+(D.skills.pl?'<div class="t"><b>'+PLN[D.profile.plSt||0]+'</b>Planche</div>':'')+'<div class="t"><b>Week '+c.week+(c.cyc===6?' · Deload':'')+'</b>Venus part '+c.phase+'</div>'+(D.focus!=="str"?'<div class="t"><b>'+fmtKg(D.runKm)+' km · '+D.runI+' × 3 min</b>Hard run · intervals</div>':'')+'</div><p class="muted">How the app learns: hold times adapt after every session, targets follow your last entry, front lever and planche stages rise once you manage the next variation, run length and intervals follow how hard it felt. Rep maxes are measured by the test every 6 training weeks.</p></div>'+
    '<div class="sec"><h3>Test values</h3><div class="grid2">'+F2.map(function(x){return '<label for="p_'+x[0]+'">'+x[1]+'</label><input type="number" id="p_'+x[0]+'" inputmode="numeric" data-prof="'+x[0]+'" value="'+Math.round(p[x[0]]*10)/10+'">';}).join("")+'</div></div>'+
    '<div class="sec"><h3>Cycle</h3><p class="muted">6 weeks Venus part 1, 6 weeks part 2, every 6th training week is a deload with a test. Weeks without training do not count.</p><div class="row"><label class="lab" for="p_start">Start date</label><input type="text" id="p_start" data-start="1" value="'+D.start+'" inputmode="numeric" aria-describedby="sth"></div><p class="muted" id="sth">Format YYYY-MM-DD</p></div></div>';
}
function vMehr(){
  var R=["Strength and running on the same day: strength first, then run, or at least 3 hours apart. No running before Strength A.","Strength sets end 1–2 reps before failure. Explosive sets end as soon as the movement slows down.","Rest: 2–3 min for muscle-ups and explosive work, 1–2 min in circuits. The timer starts after every logged set.","Targets build on your weakest set. Top of the range reached: more weight or a harder variation. Below it: easier.","After more than 10 days off, targets step back once, after 4 weeks twice.","Skills often and short rather than rarely and long. Several skills take turns, whatever rested longest comes first.","Running: mostly easy, only one or two hard runs per week. Never hard runs on two days in a row.","Three times without progress on an exercise: swap the variation. Three times at the limit in a week: a recovery day.","Stay with a variation for 3–4 weeks. Each variation has its own history.","No strength training after a hard run. After three hard days comes recovery.","Pain: tick it in the session. Affected exercises drop out and a rehab block is added. If it persists, see a doctor."];
  if(!D.seenFocus){D.seenFocus=true;save();}
  return '<div class="card"><div class="sec"><h2>Focus & skills</h2>'+focusHTML("m")+'</div>'+
    '<div class="sec"><h3>Kickboxing days</h3>'+kickSel("m_kick")+'</div>'+
    '<div class="sec"><h3>Basics</h3><p class="muted">Re-enter values, focus and equipment in three steps.</p><button type="button" class="b" data-a="reonb">Re-enter basics</button></div>'+
    '<div class="sec"><h3>Training doctrine</h3><ol class="why">'+R.map(function(r){return "<li>"+esc(r)+"</li>";}).join("")+'</ol></div>'+
    '<div class="sec"><h3>Garmin</h3><p class="muted">Runs: import a GPX or TCX file from Garmin Connect on the run screen. Values like sleep or Body Battery need a connection outside this file.</p></div>'+
    '<div class="sec"><h3>Backup</h3><p class="muted">Your data lives only in this browser on this device.</p><button type="button" class="b" data-a="exp">Create backup</button><textarea id="bk" aria-label="Backup text" placeholder="The backup appears here. Paste text here to restore. Only restore backups you made yourself.">'+esc(D._bk)+'</textarea><div class="row"><button type="button" class="b" data-a="copy">Copy</button><button type="button" class="b" data-a="imp">Restore from text</button></div>'+(D._msg?'<p class="muted">'+esc(D._msg)+'</p>':'')+'</div>'+
    '<div class="sec"><h3>Reset</h3><button type="button" class="b" data-a="reset">'+(D._rs?'Really delete everything':'Delete all data')+'</button></div></div>';
}
function render(){
  updNames();
  var c=ctx(TODAY),d=new Date();
  document.getElementById("subline").textContent=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]+" "+d.getDate()+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" · Week "+c.week+" · "+LVN[lvl()];
  var top={morgen:"start",train:"start",run:"start",kick:"start"}[D.tab]||D.tab;
  document.getElementById("nav").innerHTML=D.onb?TABS.map(function(t){return '<button type="button" data-tab="'+t[0]+'" class="'+(top===t[0]?"on":"")+'"'+(top===t[0]?' aria-current="page"':'')+'>'+t[1]+'</button>';}).join(""):"";
  document.body.className=D.onb?(D.tab==="train"?"train":""):"ob";
  if(!D.onb) document.getElementById("subline").textContent="Induction of a new brother";
  rendering=true;
  app.innerHTML=D.onb?(({start:vStart,morgen:vMorgen,train:vTrain,run:vRun,kick:vKick,verlauf:vVerlauf,stand:vStand,mehr:vMehr}[D.tab]||vStart)()):vOnb();
  rendering=false;
}

/* ================= Aktionen ================= */
function findItem(id){
  var p=id.split("-"),c=ctx(TODAY);
  if(p[0]==="abs") return ABS[+p[1]].items[+p[2]];
  if(p[0]==="KI") return [KM_PRE,KM_POST][+p[1]].items[+p[2]];
  var bi=+p[1]; if(bi>=90){var ks=Object.keys(REHAB);return REHAB[ks[bi-90]].items[+p[2]];}
  return S(p[0],c).blocks[bi].items[+p[2]];
}
function addLog(o){D.logs.push(o);D.logs.sort(function(a,b){return a.d<b.d?-1:(a.d>b.d?1:0);});}
function finish(dy){D._toast=["Logged. The Emperor sees your toil.","Logged. Another step in the crusade.","Logged. The blade grows sharper.","Logged. Honour to the diligent."][D.logs.length%4];dy.fin={};dy.open={};dy.pick=null;dy.run=null;Object.keys(dy.done).forEach(function(k){if(k.indexOf("m-")!==0)delete dy.done[k];});dy.inp={};dy.skip={};D.tab="start";save();render();window.scrollTo(0,0);}
function needRpe(dy){if(!dy.fin.rpe){dy.fin.err="Please choose how hard it was.";save();render();return true;}dy.fin.err="";return false;}
function saveTrain(){
  var dy=day(); if(needRpe(dy)) return;
  var loc=D.loc,c=ctx(TODAY),id=trainId(dy).id,s=S(id,c),f=dy.fin,wts=[],hold=f.rpe>=10,isoDone={};
  s.blocks.forEach(function(b,bi){ if(D.short&&b.p>1) return; b.items.forEach(function(it,ii){
    var iid=id+"-"+bi+"-"+ii, v=curVar(it,loc); if(v<0||dy.skip[iid]||painHit(it.opts[v].n)) return;
    var inp=dy.inp[iid]||{}, sets=(inp.s||[]).map(num).filter(function(x){return x!==null&&x>=0;});
    if(it.iso){ if(isoDone[it.iso]) return; var cur=D.profile[it.iso],q=isoP(cur);
      if(sets.length){ isoDone[it.iso]=1; var mn=Math.min.apply(null,sets),mx=Math.max.apply(null,sets);
        if(sets.length>=q.n&&mn>=q.h) D.profile[it.iso]=Math.min(120,Math.max(cur,mx)+2);
        else if(mn<q.h*0.75) D.profile[it.iso]=Math.max(Math.round(mx),Math.max(3,cur-2));
        if(mx>D.profile[it.iso]) D.profile[it.iso]=mx; }
      else if(dy.done[iid]&&!hold){ isoDone[it.iso]=1; D.profile[it.iso]=cur+1; }
      return; }
    if(it.test){ if(sets.length) D.profile[it.test]=sets[0]; return; }
    if(it.f) return;
    var g=target(it,v), r, w=num(inp.w);
    if(sets.length) r=Math.min.apply(null,sets); else if(dy.done[iid]) r=g.r; else return;
    if(w===null) w=g.w||0;
    var pv=D.ex[it.k+"#"+v],stall=(pv&&!pv.hold&&r<=pv.r&&(w||0)<=(pv.w||0))?(pv.stall||0)+1:0;
    D.ex[it.k+"#"+v]={r:r,w:w,d:TODAY,hold:hold,n:it.opts[v].n,stall:stall};
    if((it.k==="fl_h"||it.k==="pl_h")&&v<=4&&r>=it.lo){var pk=it.k==="fl_h"?"flSt":"plSt";if(v>D.profile[pk])D.profile[pk]=v;}
    if(it.opts[v].w&&w) wts.push(it.opts[v].n+" "+fmtKg(w)+" kg × "+r);
  });});
  var absDone=!!dy.done["abs-T"]; if(absDone) D.abs=(absFor(id).i+1)%ABS.length;
  var skl=[];s.blocks.forEach(function(b){if(D.short&&b.p>1)return;if(b.skill&&skl.indexOf(b.skill)<0)skl.push(b.skill);if(b.mu&&skl.indexOf("mu")<0)skl.push("mu");});
  addLog({d:TODAY,id:id,t:NAMES[id],rpe:f.rpe,note:(f.note||"").slice(0,300),abs:absDone?1:0,sum:wts.slice(0,4).join(", "),sk:skl});
  finish(dy);
}
function saveRun(){
  var dy=day(); if(needRpe(dy)) return;
  var f=dy.fin,id=dy.run||runRec().id,km=num(f.km),mn=num(f.min);
  if(id==="RH"){ if(f.rpe<=4) D.runKm=Math.min(D.focus==="run"?16:10,D.runKm+0.5); else if(f.rpe>=10) D.runKm=Math.max(5,D.runKm-0.5); }
  if(id==="RI"){ if(f.rpe<=6) D.runI=Math.min(8,D.runI+1); else if(f.rpe>=10) D.runI=Math.max(3,D.runI-1); }
  addLog({d:TODAY,id:id,t:NAMES[id],rpe:f.rpe,note:(f.note||"").slice(0,300),km:km===null?0:Math.round(km*100)/100,min:mn===null?0:Math.round(mn*10)/10});
  finish(dy);
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
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-a],[data-tab]"); if(!t||t.tagName==="SELECT"||t.tagName==="INPUT") return;
  var dy=day(),a=t.dataset.a;
  if(t.dataset.tab){TB=null;D.tab=t.dataset.tab;D._del=null;D._rs=false;D._msg="";dy.fin={};save();render();window.scrollTo(0,0);var h2=app.querySelector("h2");if(h2&&t.closest(".nav,.bk,.big")){h2.tabIndex=-1;h2.focus({preventScroll:true});}return;}
  if(a==="rpe"){dy.fin.rpe=+t.dataset.v;}
  else if(a==="onb"){D.onb=true;D.tab="start";D.obStep=0;D.seenFocus=true;if(!D.logs.length)D.start=TODAY;D._toast="The crusade begins. The Emperor watches over you.";}
  else if(a==="reonb"){D.onb=false;D.obStep=0;}
  else if(a==="obnext"||a==="obback"){D.obStep=Math.max(0,Math.min(2,(D.obStep||0)+(a==="obnext"?1:-1)));save();render();window.scrollTo(0,0);var hd=document.getElementById("dlgt");if(hd)hd.focus({preventScroll:true});return;}
  else if(a==="nokick"){dy.noKick=!dy.noKick;}
  else if(a==="kickday"){var v=+t.dataset.v,i=D.kickDays.indexOf(v);if(i>=0)D.kickDays.splice(i,1);else D.kickDays.push(v);}
  else if(a==="loc"){D.loc=t.dataset.v;dy.pick=null;}
  else if(a==="short"){D.short=!D.short;}
  else if(a==="skip"){var sid=t.dataset.id;if(dy.skip[sid])delete dy.skip[sid];else{dy.skip[sid]=1;delete dy.done[sid];}}
  else if(a==="chg"){var lc=D.tab==="kick"?"h":D.loc,it=findItem(t.dataset.id),av=avail(it,lc),cur=curVar(it,lc);D.vr[lc+"|"+vkey(it)]=av[(av.indexOf(cur)+1)%av.length];delete dy.inp[t.dataset.id];}
  else if(a==="runtype"){dy.run=t.dataset.v;}
  else if(a==="tbgo"){var A2=ABS[+t.dataset.i],lc2=D.loc;audio();TB={start:Date.now(),rounds:+t.dataset.r,names:A2.items.map(function(it){return it.opts[curVar(it,lc2)].n;}),last:""};if(!tbIv)tbIv=setInterval(tbTick,200);}
  else if(a==="tbstop"){TB=null;}
  else if(a==="tbdone"){dy.done["abs-T"]=1;}
  else if(a==="savetr"){saveTrain();return;}
  else if(a==="saverun"){saveRun();return;}
  else if(a==="savekick"){if(needRpe(dy))return;addLog({d:TODAY,id:"KI",t:NAMES.KI,rpe:dy.fin.rpe,note:(dy.fin.note||"").slice(0,300)});finish(dy);return;}
  else if(a==="savemo"){var mm=morning(TODAY);addLog({d:TODAY,id:"MO",t:NAMES.MO,m:[mm.top].concat(D.mlen==="k"?[]:[mm.sec])});D.tab="start";D._toast="Morning routine logged. Let the day come.";}
  else if(a==="mlen"){D.mlen=t.dataset.v;}
  else if(a==="del"){var i=+t.dataset.i; if(D._del===i){D.logs.splice(i,1);D._del=null;} else D._del=i;}
  else if(a==="exp"){var o=JSON.parse(JSON.stringify(D));delete o._bk;delete o._msg;D._bk=JSON.stringify(o);D.bkAt=D.logs.length;D._msg="Backup created. Copy it now and store it, e.g. in a note.";}
  else if(a==="copy"){var tx=document.getElementById("bk").value;try{navigator.clipboard.writeText(tx).then(function(){D._msg="Copied.";render();},function(){D._msg="Copying is not allowed. Please select the text by hand.";render();});}catch(x){D._msg="Copying is not allowed. Please select the text by hand.";}}
  else if(a==="imp"){try{var n=JSON.parse(document.getElementById("bk").value);if(!n||!n.profile||!n.logs)throw 0;var b=cleanImport(n);b.onb=true;D=b;D.tab="mehr";D._msg="Restored: "+n.logs.length+" entries.";}catch(x){D._msg="This text is not a valid backup.";}}
  else if(a==="reset"){if(D._rs){D=fresh();}else D._rs=true;}
  save(); render();
});
function keepRender(){var y=window.scrollY,ae=document.activeElement,sel=ae&&ae.id?"#"+ae.id:(ae&&ae.dataset&&ae.dataset.a?'[data-a="'+ae.dataset.a+'"]'+(ae.dataset.k?'[data-k="'+ae.dataset.k+'"]':'')+(ae.value&&ae.type==="radio"?'[value="'+ae.value+'"]':''):null);render();window.scrollTo(0,y);if(sel){var n=app.querySelector(sel);if(n)n.focus({preventScroll:true});}}
document.addEventListener("toggle",function(e){var t=e.target;if(rendering||!t.dataset||!t.dataset.blk)return;var dy=day();(dy.open||(dy.open={}))[t.dataset.blk]=t.open;save();},true);
document.addEventListener("change",function(e){
  var t=e.target,dy=day(),q=t.dataset;
  if(q.a==="done"){ if(t.checked) dy.done[q.id]=1; else delete dy.done[q.id]; save(); render(); }
  else if(q.a==="eq"){ D.home[q.k]=t.checked; save(); keepRender(); }
  else if(q.a==="focus"){ D.focus=t.value; save(); keepRender(); }
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
  else if(q.a==="gfile"&&t.files&&t.files[0]){ var fr=new FileReader(), name=t.files[0].name;
    fr.onload=function(){ var r=null; try{r=parseTrack(String(fr.result));}catch(x){}
      if(r){dy.fin.km=r.km; if(r.min>0)dy.fin.min=r.min; dy.fin.gmsg="Imported from "+name+": "+fmtKg(r.km)+" km"+(r.min>0?" in "+fmtKg(r.min)+" min.":". Please enter the time by hand.");}
      else dy.fin.gmsg="The file could not be read. Please export GPX or TCX, FIT does not work.";
      save(); render(); };
    fr.onerror=function(){dy.fin.gmsg="The file could not be opened.";save();render();};
    fr.readAsText(t.files[0]); }
});

/* ================= Tabata ================= */
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
  function tick(){var left=Math.ceil((end-Date.now())/1000);clock.textContent=fmt(Math.max(left,0));if(left<=0){stop();tone(880,3);clock.textContent="Go!";var lv=document.getElementById("live");if(lv)lv.textContent="Rest over, next set.";}}
  tick();iv=setInterval(tick,250);}
document.querySelectorAll(".timer [data-t]").forEach(function(b){b.addEventListener("click",function(){startRest(parseInt(b.dataset.t,10));});});
document.getElementById("tstop").addEventListener("click",function(){stop();clock.textContent="0:00";});
render();
window.__kz={tb:function(){return TB;},recAll:recAll,recTrain:recTrain,S:S,NAMES:NAMES,D:function(){return D;},setD:function(x){D=x;},parseTrack:parseTrack,target:target,GYM:GYM,HOME:HOME,lvl:lvl,ctx:ctx,isoP:isoP,render:render,startRest:startRest,isKick:isKick,skillPlan:skillPlan,runRec:runRec,rounds:rounds,curVar:curVar,morning:morning,mSections:mSections,COOLS:COOLS,MMOD:MMOD};
})();

if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}
