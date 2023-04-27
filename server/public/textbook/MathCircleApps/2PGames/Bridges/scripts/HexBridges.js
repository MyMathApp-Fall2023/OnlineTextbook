$(document).ready( function() {
  // SCENE
  var scene = new THREE.Scene();

  // INIT
  $(`#startingPlayerLine`).css("display", "inLine");
  $(`#currentPlayerLine`).css("display", "none");
  let startingPlayer = "Blue";
  SetTurnOut(startingPlayer);

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas_1"), antialias: true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(450, 300);


  // CAMERA
  var camera = new THREE.OrthographicCamera(-6.0, 6.0, 4.08, -4.08, 0.1, 100);
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
  var matCCW = new THREE.MeshBasicMaterial({color: 0x5371d7});
  var matCW = new THREE.MeshBasicMaterial({color: 0xf273b3});
  var matLine = new THREE.LineBasicMaterial({color: "#000"});
  var matInvisible = new THREE.LineBasicMaterial({transparent: true, opacity: 0});
  var matGrey = new THREE.MeshBasicMaterial({color: "#555"});
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

  const hexGeo = new THREE.PolyhedronBufferGeometry(hexVerts, hexFaces, 1, 0);
  const squareGeo = new THREE.PolyhedronBufferGeometry(squareVerts, squareFaces, 1, 0);

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

  var board = new THREE.Object3D();
  scene.add(board);
  var boardBack = [];
  var boardFront = [];

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
  rowBGGrey.scale.set(1.05,.8,1);
  rowBGWhite.scale.set(1,.75,1);
  rowBGGrey.position.set(4,3,4);
  rowBGWhite.position.set(4,3,4.5);
  scene.add(rowBGGrey);
  scene.add(rowBGWhite);
  var playBGGrey = new THREE.Mesh(bgGeo, matGrey);
  var playBGWhite = new THREE.Mesh(bgGeo, matWhite);
  playBGGrey.scale.set(1.2*2.4/2+.05,1.2*1+.05,1);
  playBGWhite.scale.set(1.2*2.4/2,1.2*1,1);
  playBGGrey.position.set(4.3,-3,4);
  playBGWhite.position.set(4.3,-3,4.5);
  scene.add(playBGGrey);
  scene.add(playBGWhite);
  var playOutLabel;
  var playOut;
  SetPlayOut("Player:", "Blue");
  var rowOut;
  SetRowOut("6");
  var buttonGeo = new THREE.PlaneGeometry(1.25,1.25);
  var btn_Restart = new THREE.Mesh(buttonGeo, resetImg);
  btn_Restart.position.set(-5, 3, 5);
  btn_Restart.scale.set(.6,.6,1);
  scene.add(btn_Restart);
  buttons.add(btn_Restart);
  var btn_Undo = new THREE.Mesh(buttonGeo, undoImg);
  btn_Undo.position.set(-5, -3, 5);
  btn_Undo.scale.set(.6,.6,1);
  scene.add(btn_Undo);
  buttons.add(btn_Undo);
  var btn_Plus = new THREE.Mesh(buttonGeo, plusImg);
  btn_Plus.position.set(5, 3, 5);
  btn_Plus.scale.set(.6,.6,1);
  scene.add(btn_Plus);
  buttons.add(btn_Plus);
  var btn_Minus = new THREE.Mesh(buttonGeo, minusImg);
  btn_Minus.position.set(3, 3, 5);
  btn_Minus.scale.set(.6,.6,1);
  scene.add(btn_Minus);
  buttons.add(btn_Minus);

  var sum = 0;
  for(var i = 0; i < 144; i++) {
    if(Math.floor(Math.pow(i, 0.5)) == Math.pow(i, 0.5)) sum += Math.pow(i, 0.5);
    boardBack[boardBack.length] = new THREE.Mesh(hexGeo, matBlack);
    boardBack[i].scale.set(1.025,1.025,1);
    boardBack[i].position.set(-1.5*Math.floor(Math.pow(i,0.5)) + 1.5*(i - Math.pow(Math.floor(Math.pow(i,0.5)), 2)),
      (Math.floor(Math.pow(i,0.5))*Math.pow(3,0.5)/2) + (2*sum - Math.pow(Math.floor(Math.pow(i, 0.5)), 2) - Math.abs(2*sum - i))*Math.pow(3,0.5)/2,
      -1);
    scene.add(boardBack[i]);
    board.add(boardBack[i]);
    boardFront[boardFront.length] = new THREE.Mesh(hexGeo, matWhite);
    boardFront[i].scale.set(0.975,0.975,1);
    boardFront[i].position.set(-1.5*Math.floor(Math.pow(i,0.5)) + 1.5*(i - Math.pow(Math.floor(Math.pow(i,0.5)), 2)),
      (Math.floor(Math.pow(i,0.5))*Math.pow(3,0.5)/2) + (2*sum - Math.pow(Math.floor(Math.pow(i, 0.5)), 2) - Math.abs(2*sum - i))*Math.pow(3,0.5)/2,
      0);
    scene.add(boardFront[i]);
    board.add(boardFront[i]);
  }

  var rows = 5;
  var s = 0.65 * 5.7/(rows+.7);

  function setupBoard() {
    board.position.set(0,-rows*s*Math.pow(3,0.5)/2, 0);
    board.scale.set(s,s,1);
    for(var i = 0; i < 144; i++) {
      if(i < Math.pow(rows+1, 2)) {
        boardBack[i].position.z = -1;
        boardFront[i].position.z = 0;
      }
      else {
        boardBack[i].position.z = 11;
        boardFront[i].position.z = 11;
      }
    }
    $(`#rows_readout`).val(rows+1);
  }
  setupBoard();

  var connectedTileList = [];

  function checkWin() {
    connectedTileList = [];
    for(var i = 0; i < rows+1; i++) if(boardFront[i*i].material == matRed) connectedTileList[connectedTileList.length] = i*i;

    for(var i = 0; i < connectedTileList.length; i++) {
      checkNeighbors(connectedTileList[i]);
      if(connectedTileList[i] < (rows+1)*(rows+1) && connectedTileList[i] >= (rows+1)*(rows+1) - rows - 1) {
        SetWinOut("Red");
        return 1;
      }
    }



    connectedTileList = [];
    for(var i = 1; i <= rows+1; i++) {
      if(boardFront[i*i - 1].material == matBlue) connectedTileList[connectedTileList.length] = (i*i) - 1;
    }
    for(var i = 0; i < connectedTileList.length; i++) {
      checkNeighbors(connectedTileList[i]);
      if(connectedTileList[i] < (rows+1)*(rows+1) - rows && connectedTileList[i] >= (rows+1)*(rows+1) - 2*rows - 1) {
        SetWinOut("Blue");
        return 2;
      }
    }
    var o = "cTL: "
    for(var i = 0; i < connectedTileList.length; i++) o += connectedTileList[i] + ", ";

    if(rows == 0) {
      SetWinOut("Blue");
      return 2;
    }

    SetWinOut("");
    return 0;
  }

  function checkNeighbors(a) {
    for(var i = 0; i < boardBack.length; i++) {
      if(boardBack[a].position.distanceTo(boardBack[i].position) < 2 && boardFront[a].material == boardFront[i].material && connectedTileList.indexOf(i) == -1 && i != a) connectedTileList[connectedTileList.length] = i;
    }
  }


  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersections = [];
  var turn = startingPlayer == "Red";
  var won = false;
  var history = [];
  var hIndex = 0;

  function checkTiles() {
    intersections = raycaster.intersectObjects(buttons.children);
    if(intersections.length > 0) {
      if(intersections[0].object == btn_Undo) undo();
      else if(intersections[0].object == btn_Restart) resetColor();
      else if(intersections[0].object == btn_Plus) changeRowCount(1);
      else if(intersections[0].object == btn_Minus) changeRowCount(-1);
    }
    else if(!won) {
      intersections = raycaster.intersectObjects(boardBack);
      if(intersections.length > 0) {
        for(let i = 0; i < boardBack.length; i++) {
          if(intersections[0].object == boardBack[i]) {
            if(boardFront[i].material == matWhite) {
              history[hIndex++] = i;
              if(turn) boardFront[i].material = matRed;
              else boardFront[i].material = matBlue;
              SetTurnOut(turn ? "Blue" : "Red");
            }
            i = boardBack.length;
          }
        }
        return true;
      }
    }
    return false;
  }

  document.getElementById("canvas_1").addEventListener('mousedown', function() {

    if(true) { // 454, 263
      mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 4.5 - 1;
      mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3 + 1;

      raycaster.setFromCamera(mouse,camera);

      var check = checkTiles();

      if(check) {
        $(`#startingPlayerLine`).css("display", "none");
        $(`#currentPlayerLine`).css("display", "inLine");
        switch(checkWin()) {
          case 1: case 2:
            won = true;
          break;
        }
      }
    }
  }, false);
  //
  document.getElementById("colorReset").addEventListener('mousedown', function() {
    resetColor();
  });

  document.getElementById("rows_decrease").addEventListener('mousedown', function() {
    changeRowCount(-1);
  });

  document.getElementById("rows_increase").addEventListener('mousedown', function() {
    changeRowCount(1);
  });

  function changeRowCount(num) {
    rows += num;
    if(rows < 0) rows = 0;
    else if(rows > 11) rows = 11;

    SetRowOut((rows+1));

    s = 0.65 * 5.7/(rows+.7);
    setupBoard();
    resetColor();
  }

  function resetColor() {
    for(var i = 0; i < boardFront.length; i++) boardFront[i].material = matWhite;
    SetTurnOut(startingPlayer);
    SetWinOut("");
    won = false;
    history = [];
    hIndex = 0;
    $(`#startingPlayerLine`).css("display", "inLine");
    $(`#currentPlayerLine`).css("display", "none");
  }

  document.getElementById('undo').addEventListener("mousedown", function() {
    undo();
  });

  function undo() {
    if(hIndex == 0) return; // stop if no history exists
    boardFront[history[--hIndex]].material = matWhite;
    if(hIndex == 0) {
      $(`#startingPlayerLine`).css("display", "inLine");
      $(`#currentPlayerLine`).css("display", "none");
    }
    SetTurnOut(turn ? "Blue" : "Red");
    won = false;
    SetWinOut("");
  }

  $('input[name=startingPlayer][value="Blue"]').prop("checked", true).change();
  $('input[name=startingPlayer]').change(() => {
    startingPlayer = $('input[name=startingPlayer]:checked').val();
    resetColor();
  });

  function SetTurnOut(text) {
    switch (text) {
      case "Red":
        $(`#turn_readout`).val("Red");
        $(`#turn_readout`).css("background", "#FF0000");
        turn = true;

        SetPlayOut("Player:", "Red");
      break;

      case "Blue":
        $(`#turn_readout`).val("Blue");
        $(`#turn_readout`).css("background", "#0000FF");
        turn = false;

        SetPlayOut("Player:", "Blue");
      break;

      case "":
        $(`#turn_readout`).css("background", "#FFFFFF");
      break;
    }
  }

  function SetWinOut(text) {
    switch(text) {
      case "Red":
        $(`#win_readout`).val("Red");
        $(`#win_readout`).css("background", "#FF0000");
        SetTurnOut("");

        setPlayOut("Winner:", "Red");
      break;

      case "Blue":
        $(`#win_readout`).val("Blue");
        $(`#win_readout`).css("background", "#0000FF");
        SetTurnOut("");

        SetPlayOut("Winner:", "Blue");
      break;

      case "":
        $(`#win_readout`).val('');
        $(`#win_readout`).css("background", "#FFFFFF");
      break;
    }
  }

  function SetRowOut(val) {
    scene.remove(rowOut);
    rowOut = makeTextSprite(val, {fontsize: 76});
    scene.add(rowOut);
    rowOut.scale.set(.35*6,.35*3,1);
    rowOut.position.set(3.95,3,5);
  }

  function SetPlayOut(label, val) {
    scene.remove(playOutLabel);
    playOutLabel = makeTextSprite(label, {fontsize: 76});
    playOutLabel.scale.set(1.2*.35*8/2, 1.2*.35*4/2, 1);
    playOutLabel.position.set(4.25,-2.7,5);
    scene.add(playOutLabel);

    scene.remove(playOut);
    playOut = makeTextSprite(val, {fontsize: 76});
    playOut.scale.set(1.2*.35*10/2, 1.2*.35*5/2, 1);
    playOut.position.set(4.25,-3.3,5);
    scene.add(playOut);
  }

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();
});
