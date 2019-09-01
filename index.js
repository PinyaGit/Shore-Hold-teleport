//////////////////HELP////////////////////////
//proxy spawnl - Teleport to the left spawn!
//proxy spawnr - Teleport to the right spawn!

//proxy shp1 - Teleport to the left pyre!
//proxy shp2 - Teleport to the right pyre!
//proxy shp3 - Teleport to the center pyre!

//proxy shbam - Teleport to the BAM spawn!
//////////////////////////////////////////////

module.exports = function SHM(mod) {

let skillport = false;
let shift = 0; //you Z coord conf
let secdef = 4300; //ms for incredible

  let xyz = [];
  let svx = 0;
  let svy = 0;
  let svz = 0;

  let a = 0;
  let b = 0;

  let id = 0; //you client id
  let model = 0; //you class

  let skillid = 0; //current skill id
  let mask = []; //mask work skill id
  let mask_size = 0;

//////////////////////////////////////////////////
// Hey, CattaLol. it's just fork RtPort, ok? :> //
//////////////////////////////////////////////////
function IncMask (inc, size, msa) {
    for(var i = 0; i < inc.length; i++) {
        for(var n = 0; n < size; n++) {
            if(inc.indexOf(msa[n]) != -1) {
                return n;
            }}
  }
  return -1
}

function findInArray(ary, item) {
    for (let i = 0; i < ary.length; i++) {
    if (ary[i].toString() === item.toString()) {
   return i
   }}
    return -1
}
///////////////////////////////////    ^
////Do you need this sh@# here?////   _|
//////////////////////////////////___/

function Reload() {
b = (a - shift)
  mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: xyz[0],
                    y: xyz[1],
                    z: b,
                    w: xyz[5]})
 mod.command.message('<font color="#00ffff">[SHM]</font> You alredy on ground!')
 skillport = false
}

mod.hook('C_PRESS_SKILL', 4, event => {
if(skillport) return false
})

mod.hook('C_START_SKILL', 7, event => {
  skillid = event.skill.toString()
  let filter = IncMask(skillid, mask_size, mask)

if (filter == -1 || shift >= 0) {
    //console.log('S_FILTER: ' + event.skill)
    return
}else{
    if (!skillport) {
    //console.log('S_PASS: ' + event.skill)
    a = (xyz[2] + shift)
    skillport = true
  mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: xyz[0],
                    y: xyz[1],
                    z: a,
                    w: xyz[5]})
    mod.command.message('<font color="#00ffff">[SHM]</font> You are UNDERGROUND!')
    setTimeout(Reload, secdef)
    return false
    }else{
      return false
    }
}
})

  mod.hook('S_LOGIN', 13, (event) => {
  id = event.gameId;
  model = event.templateId % 100

//# warrior = 1, lancer = 2, slayer = 3, berserker = 4,
//# sorcerer = 5, archer = 6, priest = 7, mystic = 8,
//# reaper = 9, gunner = 10, brawler = 11, ninja = 12,
//# valkyrie = 13

    if (model == 5){
    mask = ["A310110", "A310120"] //PORT SKILL REPLACE
    }else{
    mask = []
    }
    mask_size = mask.length
})

  mod.hook('C_PLAYER_LOCATION', 1, (event) => {
    xyz[0] = event.x2
    xyz[1] = event.y2
    xyz[2] = event.z2
    xyz[4] = event.time
    xyz[5] = event.w
  })


  mod.hook('S_LOAD_TOPO', 1, (event) => {
    xyz[3] = event.zone})

  mod.command.add('shift', (offset1, offset2) => {
        shift = parseFloat(offset1)
        secdef = parseFloat(offset2)
        if (secdef <= 1000) secdef = 1000
        if (shift > 0 || shift < -900) shift = -200
        if (shift === 0){
        mod.command.message('Teleport SKILL is Disabled!')
        }else{
        mod.command.message('Shift set to ' + shift + ' and time set to ' + secdef)
        }
    })

  mod.command.add('coord', () => {
    mod.command.message(`<font color="#00ffff"><font color="#ffff00">ZONE:</font>${xyz[3]} <font color="#ffff00">X:</font>${xyz[0]} <font color="#ffff00">Y:</font>${xyz[1]} <font color="#ffff00">Z:</font>${xyz[2]}</font>`)
    svx = xyz[0]
    svy = xyz[1]
    svz = xyz[2]
  })

  mod.command.add('tpx', () => {
    if (svx == 0) {
    mod.command.message(`<font color="#00ffff">Coord(X) is failed or null, please retry #coord command.</font>`);
    }else if(svy == 0) {
    mod.command.message(`<font color="#00ffff">Coord(Y) is failed or null, please retry #coord command.</font>`);
    }else if(svz == 0) {
    mod.command.message(`<font color="#00ffff">Coord(Z) is failed or null, please retry #coord command.</font>`);
    }else{
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: svx,
                    y: svy,
                    z: svz,
                    w: xyz[5]})
    mod.command.message(`<font color="#00ffff">Teleported to <font color="#ffff00">X:</font>${svx} <font color="#ffff00">Y:</font>${svy} <font color="#ffff00">Z:</font>${svz}</font>`);
  }
  })


  mod.command.add('tp', (argx, argy, argz) => {
   let arg1 = xyz[0]
   let arg2 = xyz[1]
   let arg3 = xyz[2]

  if (argx != 0) {
    arg1 = parseFloat(argx);
  }

  if (argy != 0) {
    arg2 = parseFloat(argy);
  }

  if (argz != 0) {
    arg3 = parseFloat(argz);
  }

    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: arg1,
                    y: arg2,
                    z: arg3,
                    w: xyz[5]})
    mod.command.message(`<font color="#00ffff">Teleported to <font color="#ffff00">X:</font>${arg1} <font color="#ffff00">Y:</font>${arg2} <font color="#ffff00">Z:</font>${arg3}</font>`);
  })


  // ###################### //
  // ##### SHORE HOLD ##### //
  // ###################### //

    mod.command.add('spawnl', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 7484,
                    y: 2347,
                    z: 3100,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the spawn!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })

    mod.command.add('spawnr', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 7190,
                    y: 13067,
                    z: 3102,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the spawn!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })

    mod.command.add('shbam', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 10422,
                    y: 7572,
                    z: 3531,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the BAM!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })

    mod.command.add('shp1', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 7284,
                    y: 5555,
                    z: 3140,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the left pyre!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })

    mod.command.add('shp2', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 7345,
                    y: 9717,
                    z: 3134,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the right pyre!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })

    mod.command.add('shp3', () => {
    if (116 === xyz[3]) {
    mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 4560,
                    y: 7797,
                    z: 2910,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the center pyre!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Shore Hold!</font>');}
  })
}
