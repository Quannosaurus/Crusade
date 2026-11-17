// A-027 doctrine table: movement pattern and replacement group per item key and variant, written down by hand
// (independent of PATK, itPat and kitGroup in the app). Used by t45 pattern-table and t28 minimal-kit.
// Row: [key, variant ('*' = every variant without its own row), pattern ('' = counts for no pattern), group].
// Groups are the Field kit / Never replacement groups: pull, push, knee (legs), hip (hinge), core for patterns;
// pattern-free items keep their muscle group (arms, shoulder, fore, calf, hipab).
const ROWS=[
  // pull
  ...'a2_com a2_row a2_wpu a_expu a_lat a_row b2_lr b2_sw b_er b_fr b_neg c_pu ch_row fl_pull gl_pull h_pull mu_neg mu_pro u_row'.split(' ').map(k=>[k,'*','pull','pull']),
  // push (u_tri, b2_tr: triceps work counts as pressing)
  ...'a2_dtp a2_fl a2_ww a_pike a_sbd b2_am b2_dl b2_dp b2_tr b_pk b_pu c_dip ch_push gl_dip gl_push h_dip h_pike h_pu pl_pu u_sh u_tri'.split(' ').map(k=>[k,'*','push','push']),
  // legs (knee-dominant)
  ...'c_sq c_lu g_bss g_su gl_sq h_sq'.split(' ').map(k=>[k,'*','legs','knee']),
  // hinge = hip extension (x_be bench and a_hyp included)
  ...'g_ht g_kb g_rdl g_fp g_45 b_gl a_hyp gl_ht gl_rdl'.split(' ').map(k=>[k,'*','hinge','hip']),
  ['c_rdl','Romanian deadlift','hinge','hip'],['c_rdl','Leg curl machine','legs','hip'],['c_rdl','Nordic Curls','legs','hip'],
  ['h_ham','Single-leg glute bridge','hinge','hip'],['h_ham','Romanian deadlift','hinge','hip'],['h_ham','Nordic curls, feet under the sofa','legs','hip'],
  ['b_jump','Kettlebell Swings','hinge','hip'],['b_jump','Box Jumps','legs','hip'],['b_jump','Jumping Squats','legs','hip'],
  ['x_be','Back extension bench','hinge','hip'],['x_be','Superman holds','core','hip'],['x_be','Bird dog','core','hip'],
  // A-043 rotation sets: legs, hinge, pull, core, pattern-free calf and abduction work
  ...'r_lu1 r_lu2 r_bs1 r_bs2 r_su1 r_su2'.split(' ').map(k=>[k,'*','legs','knee']),
  ...'r_rd1 r_rd2 r_kb1 r_kb2 r_fp1 r_fp2 r_45a r_45b'.split(' ').map(k=>[k,'*','hinge','hip']),
  ...'r_ur1 r_ur2'.split(' ').map(k=>[k,'*','pull','pull']),
  ...'r_db1 r_db2 r_pa1 r_pa2 r_sp1 r_sp2 r_lr1 r_lr2 r_aw1 r_aw2'.split(' ').map(k=>[k,'*','core','core']),
  ['r_ca1','*','','calf'],['r_ca2','*','','calf'],['r_gm1','*','','hipab'],['r_gm2','*','','hipab'],
  // core
  ...'x_aw x_db x_lr x_pal x_sp kp_pal kp_rot'.split(' ').map(k=>[k,'*','core','core']),
  // variant-dependent arms: only chin-up negatives pull
  ['u_cur','EZ-bar curls','','arms'],['u_cur','Dumbbell curls','','arms'],['u_cur','Band curls','','arms'],['u_cur','Chin-up negatives','pull','arms'],
  // pattern-free accessory (leg accessory: calf raises and abduction never count for legs)
  ['c_calf','*','','calf'],['c_tib','*','','calf'],['g_ab','*','','hipab'],['c_gm','*','','hipab'],['kp_cop','*','','hipab'],
  ['b2_cu','*','','arms'],['fa_rc','*','','fore'],['fa_wc','*','','fore'],
  ...'c_rf sh_er sh_fp sh_sa sh_y u_lat u_rd h_fp'.split(' ').map(k=>[k,'*','','shoulder']),
  ['fl_h','*','','pull'],['km_front','*','','core'],['km_horse','*','','core'],['km_side','*','','core'],['s_hang','*','','pull'],['pl_h','*','','push'],['hk_pl','*','','push']];
// Home view: the group follows the shown variant's pattern (x_be at home: superman holds → core).
const HOME_GROUP={x_be:'core'};
// Fixed items with real load: [block, first option ('*' any), pattern, counted sets (null = by level)]; deload/warm-up
// fixed items carry no load. One set per started 10 reps of the dose (EMOM 10 × 2 → 2, "30" → 3). Core Blitz: rounds / 2.
const FIXED=[['Muscle-Up EMOM','*','pull',2],['Muscle-Up-Skill','*','pull',null],['Block 2','Push-Ups','push',3],['Block 3','Bodyweight Rows','pull',3],['Block 4','Jumping Squats','legs',3]];
const BLITZ={full:4,mini:2};
const pk=k=>String(k||'').replace(/^(mx_|fav_)+/,'');
function row(key,name){const k=pk(key);return ROWS.find(r=>r[0]===k&&r[1]===name)||ROWS.find(r=>r[0]===k&&r[1]==='*')||null;}
function pattern(key,name){const r=row(key,name);return r?r[2]:undefined;}
function group(key,name,home){const k=pk(key);if(home&&HOME_GROUP[k])return HOME_GROUP[k];const r=ROWS.find(x=>x[0]===k);return r?r[3]:undefined;}
module.exports={ROWS,FIXED,BLITZ,HOME_GROUP,row,pattern,group,pk};
