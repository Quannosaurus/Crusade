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
