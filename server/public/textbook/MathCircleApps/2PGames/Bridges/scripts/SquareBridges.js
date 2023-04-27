$(document).ready( function() {
  // SCENE
  var scene = new THREE.Scene();

  // INIT
  $(`#startingPlayerLine`).css("display", "inLine");
  $(`#currentPlayerLine`).css("display", "none");
  let startingPlayer = "Blue";
  SetTurnOut(startingPlayer);

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("cube_1"), antialias: true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(350, 350);

  // CAMERA
  var camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 100); // 3.5
    camera.position.set(0,0,10);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();

  // LIGHTS
  var aLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(aLight);

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matOffBlack = new THREE.MeshBasicMaterial({color: "#333"});
  var matRed = new THREE.MeshBasicMaterial({color: "#f00"});
  var matBlue = new THREE.MeshBasicMaterial({color: "#00f"});
  var matLightRed = new THREE.MeshBasicMaterial({color: "#f88"});
  var matLightBlue = new THREE.MeshBasicMaterial({color: "#88f"});
  var matCCW = new THREE.MeshBasicMaterial({color: 0x5371d7});
  var matCW = new THREE.MeshBasicMaterial({color: 0xf273b3});
  var matLine = new THREE.LineBasicMaterial({color: "#000"});
  var matInvisible = new THREE.LineBasicMaterial({transparent: true, opacity: 0});
  var matGrey = new THREE.MeshBasicMaterial({color: "#050"});
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
    // 0,0,0,
    // 0,1,0,
    // Math.pow(3,0.5)/2,0.5,0,
    // Math.pow(3,0.5)/2,-0.5,0,
    // 0,-1,0,
    // -Math.pow(3,0.5)/2,-0.5,0,
    // -Math.pow(3,0.5)/2,0.5,0
  ];

  const hexFaces = [
    // 0,6,5,
    // 0,5,4,
    // 0,4,3,
    // 0,3,2,
    // 0,2,1,
    // 0,1,6
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

  const squareVerts2 = [
    -0.5,-0.5,0,
    -0.5,0.5,0,
    0.5,0.5,0,
    0.5,-0.5,0
  ];

  const lineVerts = [
    -0.5,-0.025,0,
    -0.5,0.025,0,
    0.5,0.025,0,
    0.5,-0.025,0
  ];

  const squareFaces = [
    // 0,1,2,
    // 0,2,3
    0,2,1,
    0,3,2
  ];

  const hexGeo = new THREE.PolyhedronBufferGeometry(hexVerts, hexFaces, 1, 0);
  const squareGeo = new THREE.PolyhedronBufferGeometry(squareVerts, squareFaces, 1, 0);
  const squareGeo2 = new THREE.PolyhedronBufferGeometry(squareVerts2, squareFaces, 1, 0);
  const lineGeo = new THREE.PolyhedronBufferGeometry(lineVerts, squareFaces, 1, 0);

  var squareBlue = new THREE.Mesh(squareGeo, matBlue);
  squareBlue.position.set(-50,-50,-3);
  squareBlue.scale.set(100,100,1);
  scene.add(squareBlue);

  var squareRed1 = new THREE.Mesh(squareGeo, matRed);
  squareRed1.scale.set(100,100,1);
  squareRed1.position.z = -2;
  scene.add(squareRed1);

  var squareRed2 = new THREE.Mesh(squareGeo, matRed);
  squareRed2.scale.set(100,100,1);
  squareRed2.rotation.set(0,0,Math.PI);
  squareRed2.position.z = -2;
  scene.add(squareRed2);

  var squareWhite = new THREE.Mesh(squareGeo2, matWhite);
  squareWhite.scale.set(4, 4, 1);
  squareWhite.rotation.set(0, 0, Math.PI/4);
  squareWhite.position.z = -1;
  scene.add(squareWhite);


  var board = new THREE.Object3D();
  scene.add(board);

  var ui = new THREE.Object3D();
  scene.add(ui);
  var buttons = new THREE.Object3D();
  scene.add(buttons);
  ui.add(buttons);
  var resetImg = new THREE.MeshLambertMaterial({
    map:THREE.ImageUtils.loadTexture('graphics/refresh.png'),
    alphaTest: 0.5
  });
  var undoImg = new THREE.MeshLambertMaterial({
    map:THREE.ImageUtils.loadTexture('graphics/back.png'),
    alphaTest: 0.5
  });
  var plusImg = new THREE.MeshLambertMaterial({
    map:THREE.ImageUtils.loadTexture('graphics/up.png'),
    alphaTest: 0.5
  });
  var minusImg = new THREE.MeshLambertMaterial({
    map:THREE.ImageUtils.loadTexture('graphics/down.png'),
    alphaTest: 0.5
  });
  var bgGeo = new THREE.PlaneGeometry(1,1);
  var rowBGGrey = new THREE.Mesh(bgGeo, matGrey);
  var rowBGWhite = new THREE.Mesh(bgGeo, matWhite);
  rowBGGrey.scale.set(1.5/2+.05,1/2+.05,1);
  rowBGWhite.scale.set(1.5/2,1/2,1);
  rowBGGrey.position.set(2.5,3,4);
  rowBGWhite.position.set(2.5,3,4.5);
  scene.add(rowBGGrey);
  scene.add(rowBGWhite);
  var playBGGrey = new THREE.Mesh(bgGeo, matGrey);
  var playBGWhite = new THREE.Mesh(bgGeo, matWhite);
  playBGGrey.scale.set(2.4/2+.05,1+.05,1);
  playBGWhite.scale.set(2.4/2,1,1);
  playBGGrey.position.set(2.5,-3,4);
  playBGWhite.position.set(2.5,-3,4.5);
  scene.add(playBGGrey);
  scene.add(playBGWhite);
  var playOutLabel;
  var playOut;
  SetPlayOut("Player:", startingPlayer);
  var rowOut = makeTextSprite("6", {fontsize: 76});
  rowOut.scale.set(.35*10/2,.35*5/2,1);
  rowOut.position.set(2.5,3,5);
  scene.add(rowOut);
  var buttonGeo = new THREE.PlaneGeometry(1.5,1.5);
  var btn_Restart = new THREE.Mesh(buttonGeo, resetImg);
  btn_Restart.position.set(-3, 3, 5);
  btn_Restart.scale.set(.4,.4,1);
  scene.add(btn_Restart);
  buttons.add(btn_Restart);
  var btn_Undo = new THREE.Mesh(buttonGeo, undoImg);
  btn_Undo.position.set(-3, -3, 5);
  btn_Undo.scale.set(.4,.4,1);
  scene.add(btn_Undo);
  buttons.add(btn_Undo);
  var btn_Plus = new THREE.Mesh(buttonGeo, plusImg);
  btn_Plus.position.set(3.25, 3, 5);
  btn_Plus.scale.set(.4,.4,1);
  scene.add(btn_Plus);
  buttons.add(btn_Plus);
  var btn_Minus = new THREE.Mesh(buttonGeo, minusImg);
  btn_Minus.position.set(1.75, 3, 5);
  btn_Minus.scale.set(.4,.4,1);
  scene.add(btn_Minus);
  buttons.add(btn_Minus);

  var redIslands = [];
  var blueIslands = [];
  var tiles = [];
  var lines = [];

  var rows = 5;
  $('#rows_readout').val(rows);
  var bSize = 2.8;

  function constructBoard() {
    board.rotation.set(0,0,0);
    board.scale.set(1,1,1);

    for(var i = 0; i < redIslands.length; i++) {
      redIslands[i].position.set(100,100,15);
      blueIslands[i].position.set(100,100,15);
    }
    for(var i = 0; i < tiles.length; i++) {
      tiles[i].position.set(100,100,15);
      lines[i].position.set(100,100,15);
      lines[i].material = matWhite;
    }
    var tCount = 0;

    // make new board
    for(var i = 0; i < rows; i++) {
      for(var j = 0; j < rows+1; j++) {
        var posx = 2*bSize*(i+1)/(rows) - (bSize + bSize/rows);
        var posy = 2*bSize*j/rows - bSize;

        if(redIslands.length < i*(rows+1) + j + 1) redIslands[i*(rows+1) + j] = new THREE.Mesh(squareGeo2, matRed);
        if(rows < 8) redIslands[i*(rows+1) + j].scale.set(0.2, 0.2, 1);
        else redIslands[i*(rows+1) + j].scale.set(0.15, 0.15, 1);
        redIslands[i*(rows+1) + j].position.set(posy, posx, 0);
        board.add(redIslands[i*(rows+1) + j]);

        if(blueIslands.length < i*(rows+1) + j + 1) blueIslands[i*(rows+1) + j] = new THREE.Mesh(squareGeo2, matBlue);
        if(rows < 8) blueIslands[i*(rows+1) + j].scale.set(0.2, 0.2, 1);
        else blueIslands[i*(rows+1) + j].scale.set(0.15, 0.15, 1);
        blueIslands[i*(rows+1) + j].position.set(posx, posy, 0);
        board.add(blueIslands[i*(rows+1) + j]);

        if(j < rows) {
          if(tiles.length < tCount+1) {
            tiles[tCount] = new THREE.Mesh(squareGeo2, matWhite);
            board.add(tiles[tCount]);
          }
          tiles[tCount].position.set(posx, posy + bSize/rows, -0.5);
          tiles[tCount].scale.set(bSize/rows,bSize/rows,1);
          tiles[tCount].rotation.set(0,0,Math.PI/4);

          if(lines.length < tCount+1) {
            lines[tCount] = new THREE.Mesh(lineGeo, matWhite);
            board.add(lines[tCount]);
          }
          lines[tCount].position.set(posx, posy + bSize/rows, 15);
          lines[tCount].scale.set(bSize/rows,1,1);

          tCount++;

          if(i < rows-1 && j > 0) {
            if(tiles.length < tCount+1) {
              tiles[tCount] = new THREE.Mesh(squareGeo2, matWhite);
              board.add(tiles[tCount]);
            }
            tiles[tCount].position.set(posx + bSize/rows, posy, -0.51);
            tiles[tCount].scale.set(bSize/rows,bSize/rows,1);
            tiles[tCount].rotation.set(0,0,Math.PI/4);

            if(lines.length < tCount+1) {
              lines[tCount] = new THREE.Mesh(lineGeo, matWhite);
              board.add(lines[tCount]);
            }
            lines[tCount].position.set(posx + bSize/rows, posy, 15);
            lines[tCount].scale.set(bSize/rows,1,1);

            tCount++;
          }
        }
      }
    }

    board.rotation.set(0,0,Math.PI/4);
  }
  constructBoard();

  var connectedLineList = [];
  var connectedIslandList = [];

  function checkWin() {
    connectedIslandList = [];
    for(var i = 0; i < blueIslands.length; i++) {
      if(blueIslands[i].position.y == -bSize) connectedIslandList[connectedIslandList.length] = i;
    }
    for(var i = 0; i < connectedIslandList.length; i++) {
      if(Math.abs(blueIslands[connectedIslandList[i]].position.y - bSize) < 0.001) {
        // $(`#win_readout`).val("Blue");
        // $(`#win_readout`).css("background", "#0000FF");
        SetWinOut("Blue");
        return 2;
      }

      connectedLineList = [];
      for(var j = 0; j < lines.length; j++) {
        if(getDistance2D(blueIslands[connectedIslandList[i]].position, lines[j].position) < 2*bSize/rows && lines[j].material == matBlue) connectedLineList[connectedLineList.length] = j;
      }

      for(var j = 0; j < connectedLineList.length; j++) {
        for(var k = 0; k < blueIslands.length; k++) {
          if(connectedIslandList.indexOf(k) == -1 && getDistance2D(lines[connectedLineList[j]].position, blueIslands[k].position) < 2*bSize/rows) connectedIslandList[connectedIslandList.length] = k;
        }
      }
    }

    connectedIslandList = [];
    for(var i = 0; i < redIslands.length; i++) {
      if(redIslands[i].position.x == -bSize) {
        connectedIslandList[connectedIslandList.length] = i;
      }
    }
    for(var i = 0; i < connectedIslandList.length; i++) {
      if((Math.abs(redIslands[connectedIslandList[i]].position.x - bSize) < 0.001)) {
        // $(`#win_readout`).val("Red");
        // $(`#win_readout`).css("background", "#FF0000");
        SetWinOut("Red");
        return 1;
      }

      connectedLineList = [];
      for(var j = 0; j < lines.length; j++) {
        if(getDistance2D(redIslands[connectedIslandList[i]].position, lines[j].position) < 2*bSize/rows && lines[j].material == matRed) connectedLineList[connectedLineList.length] = j;
      }
      for(var j = 0; j < connectedLineList.length; j++) {
        for(var k = 0; k < redIslands.length; k++) {
          if(connectedIslandList.indexOf(k) == -1 && getDistance2D(lines[connectedLineList[j]].position, redIslands[k].position) < 2*bSize/rows) connectedIslandList[connectedIslandList.length] = k;
        }
      }
    }

    return 0;
  }

  function checkNeighbors(a) {
    for(var i = 0; i < boardBack.length; i++) {
      if(boardBack[a].position.distanceTo(boardBack[i].position) < 2 && boardFront[a].material == boardFront[i].material && connectedTileList.indexOf(i) == -1 && i != a) connectedTileList[connectedTileList.length] = i;
      checkedTileList[checkedTileList.length] = a;
    }
  }

  function getDistance2D(Va, Vb) {
    return Math.sqrt((Va.x - Vb.x)*(Va.x - Vb.x) + (Va.y - Vb.y)*(Va.y - Vb.y));
  }

  $('input[name=startingPlayer][value="Blue"]').prop("checked", true).change();
  $('input[name=startingPlayer]').change(() => {
    startingPlayer = $('input[name=startingPlayer]:checked').val();
    resetColor();
  });


  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  mouse.x = -10000;
  var intersections = [];
  var turn = startingPlayer;
  var won = false;
  var history = [];
  var hIndex = 0;
  SetTurnOut("Blue");

  function hideLines() {
    for(var i = 0; i < lines.length; i++) if(lines[i].position.z != -0.2) lines[i].position.z = 15;
  }

  function checkTiles() {
    if(!won) {
      intersections = raycaster.intersectObjects(tiles);
      if(intersections.length > 0) {
        for(let i = 0; i < tiles.length; i++) {
          if(intersections[0].object == tiles[i] && lines[i].position.z != -0.2) {
            // set color
            if(!turn) lines[i].material = matLightBlue;
            else lines[i].material = matLightRed;

            if((!turn && intersections[0].object.position.z == -0.51) || (turn && intersections[0].object.position.z != -0.51)) {
              lines[i].rotation.z = 0;
            }
            else {
              lines[i].rotation.z = Math.PI/2;
            }
            lines[i].position.z = -0.25;

            return i;
          }
        }
      }
    }
    else return -1;
  }

  document.getElementById("cube_1").addEventListener('mousedown', function() {

    var check = -1;

    if(true) {
      mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
      mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

      raycaster.setFromCamera(mouse,camera);

      intersections = raycaster.intersectObjects(buttons.children);
      if(intersections.length > 0) {
        if(intersections[0].object == btn_Undo) undo();
        else if(intersections[0].object == btn_Restart) resetColor();
        else if(intersections[0].object == btn_Plus) changeRowCount(1);
        else if(intersections[0].object == btn_Minus) changeRowCount(-1);
      }
      else check = checkTiles();

      if(check != -1) {
        history[hIndex++] = check;

        lines[check].position.z = -.2;
        SetTurnOut(turn ? "Blue" : "Red");
        lines[check].material = turn ? matBlue : matRed;

        switch(checkWin()) {
          case 1: case 2:
            won = true;
          break;
        }
        $(`#startingPlayerLine`).css("display", "none");
        $(`#currentPlayerLine`).css("display", "inLine");
      }
    }
  }, false);

  document.getElementById("rows_decrease").addEventListener('mousedown', function() {
    changeRowCount(-1);
  });

  document.getElementById("rows_increase").addEventListener('mousedown', function() {
    changeRowCount(1);
  });

  function changeRowCount(num) {
    rows += num;
    if(rows < 1) rows = 1;
    else if(rows > 12) rows = 12;

    scene.remove(rowOut);
    rowOut = makeTextSprite((rows+1), {fontsize: 76});
    scene.add(rowOut);
    rowOut.scale.set(.35*10/2,.35*5/2,1);
    rowOut.position.set(2.5,3,5);

    for(var i = 0; i < lines.length; i++) {
      lines[i].position.z = 15;
      lines[i].material = matWhite;
    }

    $('#rows_readout').val(rows);
    won = false;
    SetTurnOut(startingPlayer);
    SetWinOut("");
    constructBoard();

    history = [];
    hIndex = 0;

    $(`#startingPlayerLine`).css("display", "inLine");
    $(`#currentPlayerLine`).css("display", "none");
  }

  document.getElementById("cube_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse,camera);
    hideLines();
    checkTiles();
  });

  document.getElementById("colorReset").addEventListener('mousedown', function() {
    resetColor();
  });

  function resetColor() {
    for(var i = 0; i < lines.length; i++) {
      lines[i].position.z = 15;
      lines[i].material = matWhite;
    }

    won = false;
    SetTurnOut(startingPlayer);
    SetWinOut("");
    history = [];
    hIndex = 0;

    $(`#startingPlayerLine`).css("display", "inLine");
    $(`#currentPlayerLine`).css("display", "none");
  }

  document.getElementById("undo").addEventListener('mousedown', function() {
    undo();
  });

  function undo() {
    if(hIndex == 0) return;

    var i = history[--hIndex];

    if(hIndex == 0) {
      $(`#startingPlayerLine`).css("display", "inLine");
      $(`#currentPlayerLine`).css("display", "none");
    }
    lines[i].position.z = 15;
    lines[i].material = matWhite;

    SetTurnOut(turn ? "Blue" : "Red");
    won = false;
    SetWinOut("");
  }

  function SetTurnOut(text) {
    switch (text) {
      case "Red":
        $(`#turn_readout`).val("Red");
        $(`#turn_readout`).css("background", "#FF0000");

        SetPlayOut("Player:", "Red");

        turn = true;
      break;

      case "Blue":
        $(`#turn_readout`).val("Blue");
        $(`#turn_readout`).css("background", "#0000FF");

        SetPlayOut("Player:", "Blue");

        turn = false;
      break;

      case "":
        $(`#turn_readout`).css("background", "#FFFFFF");
      break;
    }
  }

  function SetPlayOut(label, val) {
    scene.remove(playOutLabel);
    playOutLabel = makeTextSprite(label, {fontsize: 76});
    playOutLabel.scale.set(.35*8/2, .35*4/2, 1);
    playOutLabel.position.set(2.5,-2.75,5);
    scene.add(playOutLabel);

    scene.remove(playOut);
    playOut = makeTextSprite(val, {fontsize: 76});
    playOut.scale.set(.35*10/2, .35*5/2, 1);
    playOut.position.set(2.5,-3.25,5);
    scene.add(playOut);
  }

  function SetWinOut(text) {
    switch(text) {
      case "Red":
        $(`#win_readout`).val("Red");
        $(`#win_readout`).css("background", "#FF0000");
        SetTurnOut("");

        SetPlayOut("Winner:", "Red");

        turn = false;
      break;

      case "Blue":
        $(`#win_readout`).val("Blue");
        $(`#win_readout`).css("background", "#0000FF");
        SetTurnOut("");

        SetPlayOut("Winner:", "Blue");

        turn = true;
      break;

      case "":
        $(`#win_readout`).val('');
        $(`#win_readout`).css("background", "#FFFFFF");
      break;
    }
  }

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();
});
