$(document).ready( function() {
  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas_1"), antialias: true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(525, 300); // mark 525, 300

  // SCENE
  var scene = new THREE.Scene();

  // CAMERA
  var camera = new THREE.OrthographicCamera(-7, 7, 4.08, -4.08, 0.1, 100); // mark -7,7,4.08,-4.08
    camera.position.set(0,0,10);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();
  var sceneWidth = 14;
  var sceneHeight = 8.16;

  // LIGHTS
  var aLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(aLight);

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matOffBlack = new THREE.MeshBasicMaterial({color: "#333"});
  var matRed = new THREE.MeshBasicMaterial({color: "#f00"});
  var matBlue = new THREE.MeshBasicMaterial({color: "#00f"});
  // var matLightBlue = new THREE.MeshBasicMaterial({color: "#fff"}); // mark
  // var matDarkBlue = new THREE.MeshBasicMaterial({color: "#ddd"}); // mark
  var matCCW = new THREE.MeshBasicMaterial({color: 0x5371d7});
  var matCW = new THREE.MeshBasicMaterial({color: 0xf273b3});
  var matLine = new THREE.LineBasicMaterial({color: "#000"});
  var matInvisible = new THREE.LineBasicMaterial({transparent: true, opacity: 0});
  var matGrey = new THREE.MeshBasicMaterial({color: "#aaa"});
  var matWhite = new THREE.MeshBasicMaterial({color: "#fff"});
  var matAxis = new THREE.LineBasicMaterial({color: 0x00cc00});
  var matShading = new THREE.MeshLambertMaterial({color: "#ccc"});
    matShading.side = THREE.BackSide;

  // OBJECTS
  const hexVerts = [
    0,0,0,
    1,0,0,
    0.5,Math.pow(3,0.5)/2,0,
    -0.5,Math.pow(3,0.5)/2,0,
    -1,0,0,
    -0.5,-Math.pow(3,0.5)/2,0,
    0.5,-Math.pow(3,0.5)/2,0
  ];

  const hexFaces = [
    0,1,2,
    0,2,3,
    0,3,4,
    0,4,5,
    0,5,6,
    0,6,1
  ];

  const squareVerts = [
    0,0,0,
    0,1,0,
    1,1,0,
    1,0,0
  ];

  const squareFaces = [
    0,2,1,
    0,3,2
  ];
  var squareGeo = new THREE.PlaneGeometry(1,1);

  var boardBack = new THREE.Mesh(squareGeo, matBlack);
  boardBack.scale.set(8,8,1); // mark 8,8
  boardBack.position.set(0,0,-1.9);
  scene.add(boardBack);

  // mark
  // let boardBack2 = new THREE.Mesh(squareGeo, matGrey);
  // boardBack2.scale.set(12,12,1);
  // boardBack2.position.set(0,0,-2.1);
  // scene.add(boardBack2);
  //
  // let boardBack1a = new THREE.Mesh(squareGeo, matBlue);
  // boardBack1a.scale.set(8.15,8.15,1);
  // boardBack1a.position.set(0,0,-1.95);
  // scene.add(boardBack1a);
  // mark

  var tiles = [];
  let labels = [];
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for(var i = 0; i < 64; i++) {
    tiles[i] = ((Math.floor(i/8.0) + i%8) % 2 == 0) ? new THREE.Mesh(squareGeo, matWhite) : new THREE.Mesh(squareGeo, matGrey);
    tiles[i].position.set(i%8 - 3.5, 3.5 - Math.floor(i/8.0), -1);
    tiles[i].scale.set(0.95,0.95,1);
    scene.add(tiles[i]);

    let label = alphabet[i%8] + (8 - Math.floor(i/8.0)).toString();
    let c = ((Math.floor(i/8.0) + i%8) % 2 == 0) ? "#aaa" : "#000"; // mark aaa, 000
    labels[i] = makeTextSprite(label, {fontface: "Helvetica", fontsize: 76, color: c});
    labels[i].position.set(i%8 - 3.5, 3.5 - Math.floor(i/8.0), -1.5);
    labels[i].scale.set(1.25,1,1);
    scene.add(labels[i]);
  }

  // mark
  // let mapTiles = [];
  // let mapLabels = [];
  // function setBorderMap() {
  //   for(let i = 0; i < 12*12; i++) {
  //     let bIndex = getBoardIndexFromXY(i%12 - 2, Math.floor(i/12.0) - 2);
  //     if(mapTiles[i] != null) scene.remove(mapTiles[i]);
  //     mapTiles[i] = new THREE.Mesh(squareGeo, ((Math.floor(bIndex/8.0) + bIndex%8) % 2 == 0) ? matLightBlue : matDarkBlue);
  //     mapTiles[i].position.set(i%12 - 5.5, 5.5 - Math.floor(i/12.0), -2);
  //     mapTiles[i].scale.set(0.95, 0.95, 1);
  //     scene.add(mapTiles[i]);
  //
  //     let label = alphabet[bIndex%8] + (8 - Math.floor(bIndex/8.0)).toString();
  //     let c = ((Math.floor(bIndex/8.0) + bIndex%8) % 2 == 0) ? "#aaa" : "#aaa";
  //     if(mapLabels[i] != null) scene.remove(mapLabels[i]);
  //     mapLabels[i] = makeTextSprite(label, {fontface: "Helvetica", fontsize: 76, color: c});
  //     mapLabels[i].position.set(i%12 - 5.5, 5.5 - Math.floor(i/12.0), -1.5);
  //     mapLabels[i].scale.set(1.25, 1, 1);
  //     scene.add(mapLabels[i]);
  //   }
  // }
  // mark

  var circleGeo = new THREE.CircleBufferGeometry(0.5,32)
  let chipNum = 8;
  $(`#chips_readout`).val(chipNum);
  let allRedChips = [];
  let allBlueChips = [];
  var redChips = [];
  var blueChips = [];
  for(var i = 0; i < 8; i++) {
    let sign = (i%2 == 0) ? 1 : -1;
    let start = (i%2 == 0) ? 0.5 : 0;

    allRedChips[i] = new THREE.Mesh(circleGeo, matRed);
    allRedChips[i].position.set(5,start + sign*(i/2.0), 0); // mark z == 0
    allRedChips[i].userData.startV =
      new THREE.Vector3(allRedChips[i].position.x, allRedChips[i].position.y, allRedChips[i].position.z);
    allRedChips[i].scale.set(0.9,0.9,1);

    allBlueChips[i] = new THREE.Mesh(circleGeo, matBlue);
    allBlueChips[i].position.set(-5,start + sign*(i/2.0), 0); // mark z == 0
    allBlueChips[i].userData.startV =
      new THREE.Vector3(allBlueChips[i].position.x, allBlueChips[i].position.y, allBlueChips[i].position.z);
    allBlueChips[i].scale.set(0.9,0.9,1);
  }
  for(var i = 0; i < 8; i++) {
    let sign = (i%2 == 0) ? 1 : -1;
    let start = (i%2 == 0) ? 0.5 : 0;

    allRedChips[i+8] = new THREE.Mesh(circleGeo, matRed);
    allRedChips[i+8].position.set(6,start + sign*(i/2.0), 0);
    allRedChips[i+8].userData.startV =
      new THREE.Vector3(allRedChips[i+8].position.x, allRedChips[i+8].position.y, allRedChips[i+8].position.z);
    allRedChips[i+8].scale.set(0.9,0.9,1);

    allBlueChips[i+8] = new THREE.Mesh(circleGeo, matBlue);
    allBlueChips[i+8].position.set(-6,start + sign*(i/2.0), 0);
    allBlueChips[i+8].userData.startV =
      new THREE.Vector3(allBlueChips[i+8].position.x, allBlueChips[i+8].position.y, allBlueChips[i+8].position.z);
    allBlueChips[i+8].scale.set(0.9,0.9,1);
  }
  SetChips();

  function ResetGame() {
    for(let i = 0; i < tileMap.length; i++) tileMap[i] = false;
    for(let i = 0; i < redChips.length; i++) {
      redChips[i].position.set(redChips[i].userData.startV.x, redChips[i].userData.startV.y, redChips[i].userData.startV.z);
      blueChips[i].position.set(blueChips[i].userData.startV.x, blueChips[i].userData.startV.y, blueChips[i].userData.startV.z);
    }
    SetChips();
    setWinner("");
    setPlayerVal("");
    hIndex = -1;
    Record();
  }

  function SetChips() {
    for(let i = 0; i < redChips.length; i++) {
      scene.remove(redChips[i]);
      scene.remove(blueChips[i]);
    }
    redChips = [];
    blueChips = [];
    for(let i = 0; i < chipNum; i++) {
      redChips[i] = allRedChips[i];
      blueChips[i] = allBlueChips[i];
      scene.add(redChips[i]);
      scene.add(blueChips[i]);
    }
  }

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector3();
  var o = new THREE.Vector2();
  var chipStart = new THREE.Vector3();
  var intersections = [];
  var movingChip;
  let edgeRule = "reincarnate";
  let canMoveRule = "never";
  let howMoveRule = "king";
  let jumpMoveRule = "no";
  let zeroMoveRule = "no";
  let allPlayWinRule = "yes";
  let tileMap = [];
    for(let i = 0; i < 64; i++) tileMap[i] = false;
  let won = false;
  let playerVal;
  setPlayerVal("");
  let hIndex = -1;
  let hist = [];
  Record();

  document.getElementById("canvas_1").addEventListener('mousedown', function() {
    if(won) return;

    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 5.25 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3 + 1;

    raycaster.setFromCamera(mouse,camera);
    let targets = (playerVal == "Blue") ? blueChips : redChips;
    intersections = raycaster.intersectObjects(targets);
    if(intersections.length > 0 && ((allPlaced(targets) || getBoardIndex(intersections[0].object.position) == -1)
      || canMoveRule == "always" || (canMoveRule == "after" && allPlaced()))) {
      movingChip = intersections[0].object;
      chipStart.set(movingChip.position.x, movingChip.position.y, movingChip.position.z);
      o.set(movingChip.position.x - mouse.x*sceneWidth/2, movingChip.position.y - mouse.y*sceneHeight/2);
    }
    else if(playerVal == "") {
      targets = blueChips;
      intersections = raycaster.intersectObjects(targets);
      if(intersections.length > 0) {
        movingChip = intersections[0].object;
        chipStart.set(movingChip.position.x, movingChip.position.y, movingChip.position.z);
        o.set(movingChip.position.x - mouse.x*sceneWidth/2, movingChip.position.y - mouse.y*sceneHeight/2);
      }
    }
  }, false);

  document.getElementById("canvas_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 5.25 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3 + 1;
  }, false);

  document.getElementById("canvas_1").addEventListener("mouseup", function() {
    if(movingChip != null) placeChip(movingChip);
  }, false);

  document.getElementById("chips_decrease").addEventListener('click', function() {
    chipNum = (chipNum - 1 < 1) ? 1 : chipNum - 1;
    $(`#chips_readout`).val(chipNum);
    ResetGame();
  }, false);

  document.getElementById("chips_increase").addEventListener('click', function() {
    chipNum = (chipNum + 1 > 16) ? 16 : chipNum + 1;
    $(`#chips_readout`).val(chipNum);
    ResetGame();
  }, false);

  document.getElementById("reset").addEventListener('click', function() {
    ResetGame();
  }, false);

  document.getElementById("undo").addEventListener('click', function() {
    Rewind();
  }, false);

  $('input[name=edgeRule][value="reincarnate"]').prop("checked", true).change();
  $('input[name=edgeRule]').change(() => {
    edgeRule = $('input[name=edgeRule]:checked').val();
    if(edgeRule == "projective" && (howMoveRule == "bishop" || howMoveRule == "queen")) {
      $('input[name=howMoveRule][value="anywhere"]').prop("checked", true).change();
    }
    $('input[name=howMoveRule][value="bishop"]').prop("disabled", edgeRule == "projective").change();
    $('input[name=howMoveRule][value="queen"]').prop("disabled", edgeRule == "projective").change();
    ResetGame();
    // if(edgeRule == "torus" || edgeRule == "projective") setBorderMap(); // mark
  });

  $('input[name=howMoveRule][value="king"]').prop("checked", true).change();
  $('input[name=howMoveRule]').change(() => {
    howMoveRule = $('input[name=howMoveRule]:checked').val();
    ResetGame();
  });

  $('input[name=zeroMoveRule][value="no"]').prop("checked", true).change();
  $('input[name=zeroMoveRule]').change(() => {
    zeroMoveRule = $('input[name=zeroMoveRule]:checked').val();
    ResetGame();
  });

  $('input[name=jumpMoveRule][value="no"]').prop("checked", true).change();
  $('input[name=jumpMoveRule]').change(() => {
    jumpMoveRule = $('input[name=jumpMoveRule]:checked').val();
    ResetGame();
  });

  $('input[name=canMoveRule][value="never"]').prop("checked", true).change();
  $('input[name=canMoveRule]').change(() => {
    canMoveRule = $('input[name=canMoveRule]:checked').val();
    ResetGame();
  });

  $('input[name=allPlayWinRule][value="yes"]').prop("checked", true).change();
  $('input[name=allPlayWinRule]').change(() => {
    allPlayWinRule = $('input[name=allPlayWinRule]:checked').val();
    ResetGame();
  });

  $('input[name=labelOnOff][value="off"]').prop("checked", true).change();
  $('input[name=labelOnOff]').change(() => {
    for(let i = 0; i < labels.length; i++)
      labels[i].position.set(labels[i].position.x, labels[i].position.y,
          ($('input[name=labelOnOff]:checked').val() == "on") ? -0.5 : -1.5);
  });

  function placeChip(chip) {
    mousePos = new THREE.Vector3(mouse.x*sceneWidth/2, mouse.y*sceneHeight/2,0);
    let moved = dropChipPos(chip, chipStart, mousePos);
    if(moved) {
      moveNeighbors(chip);
      checkWin();
    }
    movingChip = null;
  }

  function Push(chip, d, pushingChip) {
    if(chip == null || chip == pushingChip) return;
    let tIndex = getBoardIndex(pushingChip.position);
    let t = [tIndex % 8, Math.floor(tIndex / 8)];
    let dIndex = getBoardIndexFromXY(t[0]+d[0], t[1]+d[1]);
    let c = [dIndex % 8, Math.floor(dIndex / 8)];
    if(edgeRule == "projective"
      && t[0] % 7 == 0 && t[1] % 7 == 0
      && (d[0] == 0 || d[1] == 0)
      && c[0] % 7 == 0 && c[1] % 7 == 0
      && c[0] != t[0] && c[1] != t[1]) return;

    let eIndex = getBoardIndexFromXY(t[0] + 2*d[0], t[1] + 2*d[1]);
    let e = [eIndex % 8, Math.floor(eIndex / 8)];
    dropChipRowCol(chip, c[0], c[1], e[0], e[1]);
  }

  function moveNeighbors(chip) {
    let tileIndex = getBoardIndex(chip.position);
    if(tileIndex == -1) return;

    let tCol = tileIndex % 8;
    let tRow = Math.floor(tileIndex / 8);

    let chipList = [];

    // find chips
    chipList = addChipAtXY(tCol-1,tRow-1,chipList);
    chipList = addChipAtXY(tCol+1,tRow-1,chipList);
    chipList = addChipAtXY(tCol-1,tRow+1,chipList);
    chipList = addChipAtXY(tCol+1,tRow+1,chipList);
    chipList = addChipAtXY(tCol-1,tRow,chipList);
    chipList = addChipAtXY(tCol+1,tRow,chipList);
    chipList = addChipAtXY(tCol,tRow-1,chipList);
    chipList = addChipAtXY(tCol,tRow+1,chipList);
      // remove chips from tile map
    // if so, add that chip to the list, and remove it from the tile map
    // then, try to place every chip on the list two spaces away
    Push(chipList[0], [-1,-1], chip);
    Push(chipList[1], [1,-1], chip);
    Push(chipList[2], [-1,1], chip);
    Push(chipList[3], [1,1], chip);
    Push(chipList[4], [-1,0], chip);
    Push(chipList[5], [1,0], chip);
    Push(chipList[6], [0,-1], chip);
    Push(chipList[7], [0,1], chip);
  }

  function addChipAtXY(col, row, list) {
    let chip = getChipAtXY(col, row);
    let testNew = true;
    for(let i = 0; i < list.length; i++) if(list[i] == chip) testNew = false;
    list[list.length] = (testNew) ? chip : null;
    return list;
  }

  function getChipAtXY(col, row) {
    // get index of tile
    let tIndex = getBoardIndexFromXY(col, row);
    if(tIndex == -1 || tileMap[tIndex] == false) return null; // if off board or empty, return no chip

    // find the chip
    let result = null;
    for(let i = 0; i < redChips.length; i++) {
      if(getBoardIndex(redChips[i].position) == tIndex) result = redChips[i];
    }
    if(result == null) for(let i = 0; i < blueChips.length; i++) {
      if(getBoardIndex(blueChips[i].position) == tIndex) result = blueChips[i];
    }

    return result;
  }

  function dropChipPos(chip, startPos, tilePos) {
    let startIndex = getBoardIndex(startPos);
    let startCol = startIndex % 8;
    let startRow = Math.floor(startIndex / 8.0);
    let tileIndex = getBoardIndex(tilePos);
    let tileCol = tileIndex % 8;
    let tileRow = Math.floor(tileIndex / 8.0);

    if(startIndex >= 0) tileMap[startIndex] = false;

    if(tileIndex > -1 && !tileMap[tileIndex]
      && (startIndex == -1 || howMoveRule == "anywhere" || openTile(startCol, startRow, tileIndex))
    ) {
      chip.position.set(Math.round(tilePos.x + 3.5) - 3.5, Math.round(tilePos.y - 3.5) + 3.5, 0);
      tileMap[tileIndex] = true;
      return true;
    }
    else if(startIndex == -1) {
      chip.position.set(chip.userData.startV.x, chip.userData.startV.y, chip.userData.startV.z);
      return false;
    }
    else {
      chip.position.set(startPos.x, startPos.y, startPos.z);
      if(startIndex >= 0) tileMap[startIndex] = true;
      return false;
    }
  }

  function openTile(startX, startY, tIndex) {
    let openTiles = [];
    for(let i = 0; i < 8; i++) openTiles[i] = [];
    switch(howMoveRule) {
      case "king":
        openTiles[0][0] = getBoardIndexFromXY(startX-1, startY-1);
        openTiles[1][0] = getBoardIndexFromXY(startX-1, startY);
        openTiles[2][0] = getBoardIndexFromXY(startX-1, startY+1);
        openTiles[3][0] = getBoardIndexFromXY(startX, startY-1);
        openTiles[4][0] = getBoardIndexFromXY(startX, startY+1);
        openTiles[5][0] = getBoardIndexFromXY(startX+1, startY-1);
        openTiles[6][0] = getBoardIndexFromXY(startX+1, startY);
        openTiles[7][0] = getBoardIndexFromXY(startX+1, startY+1);
      break;

      case "rook":
        openTiles[0] = applySearch(startX, startY, function(x, y) {return [x+1,y];});
        openTiles[1] = applySearch(startX, startY, function(x, y) {return [x-1,y];});
        openTiles[2] = applySearch(startX, startY, function(x, y) {return [x,y+1];});
        openTiles[3] = applySearch(startX, startY, function(x, y) {return [x,y-1];});
      break;

      case "bishop":
        openTiles[0] = applySearch(startX, startY, function(x, y) {return [x+1,y+1];});
        openTiles[1] = applySearch(startX, startY, function(x, y) {return [x+1,y-1];});
        openTiles[2] = applySearch(startX, startY, function(x, y) {return [x-1,y+1];});
        openTiles[3] = applySearch(startX, startY, function(x, y) {return [x-1,y-1];});
      break;

      case "queen":
        openTiles[0] = applySearch(startX, startY, function(x, y) {return [x+1,y];});
        openTiles[1] = applySearch(startX, startY, function(x, y) {return [x-1,y];});
        openTiles[2] = applySearch(startX, startY, function(x, y) {return [x,y+1];});
        openTiles[3] = applySearch(startX, startY, function(x, y) {return [x,y-1];});
        openTiles[4] = applySearch(startX, startY, function(x, y) {return [x+1,y+1];});
        openTiles[5] = applySearch(startX, startY, function(x, y) {return [x+1,y-1];});
        openTiles[6] = applySearch(startX, startY, function(x, y) {return [x-1,y+1];});
        openTiles[7] = applySearch(startX, startY, function(x, y) {return [x-1,y-1];});
      break;
    }

    let test = false;
    for(let i = 0; i < 8; i ++) {
      if(openTiles[i].indexOf(tIndex) != -1) test = true;
    }
    if(getBoardIndexFromXY(startX, startY) == tIndex && zeroMoveRule == "yes") test = true;
    return test;
  }

  function applySearch(startX, startY, fn) {
    let result = [];
    let p = [startX, startY];
    let count = 0;
    while(getBoardIndexFromXY(p[0],p[1]) != -1
      && (jumpMoveRule == "yes" || !tileMap[getBoardIndexFromXY(p[0],p[1])])
      && (count++ == 0 || getBoardIndexFromXY(p[0], p[1]) != getBoardIndexFromXY(startX, startY))
      && count < 100) {
      if(!tileMap[getBoardIndexFromXY(p[0],p[1])]) result[result.length] = getBoardIndexFromXY(p[0],p[1]);
      p = fn(p[0],p[1]);
      count++;
    }
    return result;
  }

  function checkChipBetween(aCol, aRow, bCol, bRow) {
    let xDif = (aCol == bCol) ? 0 : ((aCol < bCol) ? 1 : -1);
    let yDif = (aRow == bRow) ? 0 : ((aRow < bRow) ? 1 : -1);
    let test = false;
    for(let i = 0; i < Math.max(Math.abs(aCol - bCol), Math.abs(aRow - bRow)); i++) {
      let iIndex = aCol + (i*xDif) + 8*(aRow + (i*yDif));
      if(tileMap[iIndex]) test = true;
    }
    return test;
  }

  function dropChipRowCol(chip, startCol, startRow, tileCol, tileRow) {
    let tileIndex = getBoardIndexFromXY(tileCol, tileRow);
    let startIndex = startCol + 8*startRow;
    if(!(tileRow >= 0 && tileRow < 8 && tileCol >= 0 && tileCol < 8)) { // if outside of the board
      tileMap[startIndex] = false;
      switch(edgeRule) {
        case "reincarnate":
          chip.position.set(chip.userData.startV.x, chip.userData.startV.y, chip.userData.startV.z);
        break;

        case "ringout":
          chip.position.set(1000,1000,1000);
          if(chipNum >= 3) {
            // find which color chip this was
            let isRed = false;
            for(let i = 0; i < redChips.length; i++) if(redChips[i] == chip) isRed = true;
            let chipstack = (isRed) ? redChips : blueChips;
            // go through chips of same color and count ones remaining in play
            let count = 0;
            for(let i = 0; i < chipstack.length; i++) if(chipstack[i].position.x != 1000) count++;
            // if <= 2, other player wins
            if(count <= 2) setWinner(isRed ? "Blue" : "Red");
          }
        break;

        case "torus":
        case "projective":
          if(!tileMap[tileIndex]) { // if tile is not occupied
            let pos = getWorldPos(tileCol, tileRow);
            chip.position.set(pos.x, pos.y, 0);
            tileMap[tileIndex] = true;
            tileMap[startIndex] = false;
          }
        break;

        case "blocked":
          tileMap[startIndex] = true;
        break;
      }
    }
    else if(!tileMap[tileIndex]) { // if tile is on board and not occupied
      let pos = getWorldPos(tileCol, tileRow);
      chip.position.set(pos.x, pos.y, 0);
      tileMap[tileIndex] = true;
      tileMap[startIndex] = false;
    }
  }

  function getBoardIndex(worldPos) {
    if(worldPos.x == 1000) return -2;
    else if(!(worldPos.x < 4 && worldPos.x > -4 && worldPos.y < 4 && worldPos.y > -4))
      return -1;
    else return (Math.round(worldPos.x + 3.5) - 8*(Math.round(worldPos.y - 3.5)));
  }

  function getBoardIndexFromXY(col, row) {
    let result = col + 8*row;

    if(col < 0 || col > 7 || row < 0 || row > 7) {
      switch(edgeRule) {
        case "reincarnate":
        case "ringout":
        case "blocked":
          result = -1;
        break;

        case "torus":
          col = (8+col) % 8;
          row = (8+row) % 8;
          result = col + 8*row;
        break;

        case "projective":
          let cReverse = (row < 0 || row >= 8);
          let rReverse = (col < 0 || col >= 8);

          col = (col + 8) % 8;
          if(cReverse) col = 7 - col;

          row = (row + 8) % 8;
          if(rReverse) row = 7 - row;

          result = col + 8*row;
        break;
      }
    }

    return result;
  }

  function getWorldPos(boardX, boardY) {
    let pos = new THREE.Vector2(boardX - 3.5, -(boardY - 3.5));
    return pos;
  }

  function togglePlayerVal() {
    setPlayerVal((playerVal == "Blue") ? "Red" : "Blue");
    if(canMoveRule == "never" && allPlaced((playerVal == "Blue") ? blueChips : redChips)) setWinner("Stale");
  }

  function setPlayerVal(player) {
    playerVal = player;
    playerCol = (playerVal == "") ? "#FFF" : ((playerVal == "Blue") ? "#00F" : "#F00");
    $(`#turn_readout`).val(playerVal);
    if(!won) $(`#turn_readout`).css("background", playerCol);
  }

  function setWinner(winner) {
    won = (winner != "");
    let winCol = (winner == "") ? "#FFF" : ((winner == "Red") ? "#FF0000" : ((winner == "Blue") ? "#0000FF" : "#888"));
    $(`#win_readout`).val(winner);
    $(`#win_readout`).css("background", winCol);
    if(won) $(`#turn_readout`).css("background", "#FFF");
  }

  function allPlaced(chips) {
    let test = true;
    for(let i = 0; i < chipNum; i++) {
      if(getBoardIndex(chips[i].position) == -1) test = false;
    }
    return test;
  }

  function getAdjacentIndexDirection(indexA, indexB) {
    let p1 = new THREE.Vector2(indexA % 8, (indexA - (indexA % 8)) / 8);
    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        if(i == 0 && j == 0) continue;
        if(getBoardIndexFromXY(p1.x+i, p1.y+j) == indexB) return new THREE.Vector2(i, j);
      }
    }
    return null;
  }

  function threeInARow(chips) {
    // for all chips
    for(let i = 0; i < chips.length; i++) {
      let pi = getBoardIndex(chips[i].position);
      if(pi < 0) continue;
      let p1 = new THREE.Vector2(pi % 8, (pi - (pi % 8)) / 8);

      // get second chip
      for(let j = 0; j < chips.length; j++) {
        pi = getBoardIndex(chips[j].position);
        if(pi >= 0) {
          let p2 = new THREE.Vector2(pi % 8, (pi - (pi % 8)) / 8);
          // let d = new THREE.Vector2(p2.x - p1.x, p2.y - p1.y);
          let d = getAdjacentIndexDirection(getBoardIndexFromXY(p1.x, p1.y), pi);

          // if(d == null) console.log("d == null");
          // else console.log("d == " + d.x + ", " + d.y);

          if(d != null) {
            pi = getBoardIndexFromXY(p2.x + d.x, p2.y + d.y);
            // check if there is a third chip in the third space
            if(pi >= 0) {
              for(let k = 0; k < chips.length; k++) {
                if(getBoardIndex(chips[k].position) == pi) return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  function checkWin() {
    if(won) return;

    if(playerVal == "") {
      let test = false;
      for(let i = 0; i < redChips.length; i++) if(movingChip == redChips[i]) test = true;
      setPlayerVal((test) ? "Red" : "Blue");
    }

    let cPChips = (playerVal == "Red") ? redChips : blueChips;
    let oPChips = (playerVal == "Red") ? blueChips : redChips;

    if((allPlaced(cPChips) && allPlayWinRule == "yes") || threeInARow(cPChips)) {
      setWinner(playerVal);
      won = true;
    }
    else if(threeInARow(oPChips)) {
      setWinner((playerVal == "Red") ? "Blue" : "Red");
      won = true;
    }
    else {
      setWinner("");
    }

    Record();
    togglePlayerVal();
  }

  function Record() {
    if(hIndex == -1) {
      hist = [];
    }

    hist[++hIndex] = [];
    for(let i = 0; i < redChips.length + blueChips.length; i++) {
      hist[hIndex][i] = (i < redChips.length) ?
        new THREE.Vector3(redChips[i].position.x, redChips[i].position.y, redChips[i].position.z)
          : new THREE.Vector3(blueChips[i-redChips.length].position.x, blueChips[i-redChips.length].position.y, blueChips[i-redChips.length].position.z);
    }
  }

  function Rewind() {
    if(hIndex < 1) return;

    setWinner("");
    togglePlayerVal();
    hIndex--;
    if(hIndex < 1) setPlayerVal("");

    for(let i = 0; i < tileMap.length; i++) tileMap[i] = false;
    for(let i = 0; i < redChips.length + blueChips.length; i++) {
      if(i < redChips.length) {
        redChips[i].position.set(hist[hIndex][i].x, hist[hIndex][i].y, hist[hIndex][i].z);
      }
      else {
        blueChips[i - redChips.length].position.set(hist[hIndex][i].x, hist[hIndex][i].y, hist[hIndex][i].z);
      }
    }
    for(let i = 0; i < redChips.length; i++) {
      let ri = getBoardIndex(redChips[i].position);
      if(ri >= 0) tileMap[ri] = true;
      let bi = getBoardIndex(blueChips[i].position);
      if(bi >= 0) tileMap[bi] = true;
    }
  }

  function PrintTileMap() {
    for(let y = 0; y < 8; y++) {
      let line = "" + y;
      for(let x = 0; x < 8; x++) {
        line += "[" + tileMap[x + 8*y] + "] ";
      }
      console.log(line);
    }
  }

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    if(movingChip != null) {
      movingChip.position.x = mouse.x*sceneWidth/2 + o.x;
      movingChip.position.y = mouse.y*sceneHeight/2 + o.y;
    }

    renderer.render(scene, camera);
  }
  animate();
});
