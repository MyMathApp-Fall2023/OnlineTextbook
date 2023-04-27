$(document).ready( function() {
  // INIT
  $(`#startingPlayerLine`).css("display", "inLine");
  $(`#currentPlayerLine`).css("display", "none");
  let startingPlayer = "Blue";
  setPlayerOut(startingPlayer);
  setWinnerOut("");
  $('#count_out').val(1);
  var lastFace = 1;
  var lastRotation = new THREE.Vector3(0,0,0);
  var buttonColor = document.getElementById('endTurn_button').style.backgroundColor;
  document.getElementById('endTurn_button').style.color = '#aaa';

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas_1"), antialias: true});
    renderer.setClearColor(0x555555);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(350, 350);

  // SCENE
  var scene = new THREE.Scene();

  // CAMERA
  var camera = new THREE.OrthographicCamera(-2.3, 2.3, 2.3, -2.3, 0.1, 100);
    camera.position.set(8,9,15);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matWhite = new THREE.MeshBasicMaterial({color: "#fff"});
  var matButton = new THREE.MeshBasicMaterial({color: "#0c0"});
  var matArrow = new THREE.MeshBasicMaterial({color: "#00c"});

  // OBJECTS
  var struct = new THREE.Object3D;
  scene.add(struct);
  var structGuide = new THREE.Object3D;
  var arrowGuide = new THREE.Object3D;

  var sphereGeo = new THREE.SphereBufferGeometry(.125,15,15);

  var cubePoints = [
    new THREE.Vector3(-1,1,-1),
    new THREE.Vector3(1,1,-1),
    new THREE.Vector3(1,1,1),
    new THREE.Vector3(-1,1,1),
    new THREE.Vector3(-1,-1,1),
    new THREE.Vector3(1,-1,1),
    new THREE.Vector3(1,-1,-1),
    new THREE.Vector3(-1,-1,-1),
    new THREE.Vector3(-1,-1,1),
    new THREE.Vector3(-1,1,1),
    new THREE.Vector3(-1,1,-1),
    new THREE.Vector3(-1,-1,-1),
    new THREE.Vector3(1,-1,-1),
    new THREE.Vector3(1,1,-1),
    new THREE.Vector3(1,1,1),
    new THREE.Vector3(1,-1,1),
  ];
  var cubeGeo = new THREE.BoxGeometry(2,2,2);
  var cube = new THREE.Mesh(cubeGeo, matWhite);
  scene.add(cube);
  struct.add(cube);

  var pipPoints = [
    // top = 1
    new THREE.Vector3(0,1,0),
    // right = 2
    new THREE.Vector3(1, 0, -.5),
    new THREE.Vector3(1, 0, .5),
    // back = 3
    new THREE.Vector3(-.5, -.5, -1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(.5, .5, -1),
    // front = 4
    new THREE.Vector3(-.5, -.5, 1),
    new THREE.Vector3(-.5, .5, 1),
    new THREE.Vector3(.5, -.5, 1),
    new THREE.Vector3(.5, .5, 1),
    // left = 5
    new THREE.Vector3(-1, -.5, -.5),
    new THREE.Vector3(-1, -.5, .5),
    new THREE.Vector3(-1, .5, -.5),
    new THREE.Vector3(-1, .5, .5),
    new THREE.Vector3(-1, 0, 0),
    // bottom = 6
    new THREE.Vector3(-.5, -1, -.5),
    new THREE.Vector3(-.5, -1, 0),
    new THREE.Vector3(-.5, -1, .5),
    new THREE.Vector3(.5, -1, -.5),
    new THREE.Vector3(.5, -1, 0),
    new THREE.Vector3(.5, -1, .5),
  ];

  var pips = [];
  var counter = 0;
  for(var i = 0; i < pipPoints.length; i++) {
    pips[i] = new THREE.Mesh(sphereGeo, matBlack);
    pips[i].position.set(pipPoints[i].x, pipPoints[i].y, pipPoints[i].z);

    if(pips[i].position.x == 1 || pips[i].position.x == -1) pips[i].scale.x = 0.1;
    else if(pips[i].position.y == 1 || pips[i].position.y == -1) pips[i].scale.y = 0.1;
    else pips[i].scale.z = 0.1;

    scene.add(pips[i]);
    struct.add(pips[i]);
  }

  var cubeOutlineGeo = new THREE.BufferGeometry().setFromPoints(cubePoints);
  var cubeOutline = new THREE.Line(cubeOutlineGeo, matBlack);
  cubeOutline.scale.set(1.01,1.01,1.01);
  scene.add(cubeOutline);
  struct.add(cubeOutline);

  var nums = [
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(0,0,-1),
    new THREE.Vector3(0,0,1),
    new THREE.Vector3(-1,0,0),
    new THREE.Vector3(0,-1,0),
  ];
  var initNums = [
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(0,0,-1),
    new THREE.Vector3(0,0,1),
    new THREE.Vector3(-1,0,0),
    new THREE.Vector3(0,-1,0),
  ];

  var arrowHeadGeo = new THREE.ConeBufferGeometry(.15, -.3, 32);
  var arrowHead = new THREE.Mesh(arrowHeadGeo, matArrow);
  arrowHead.position.set(0,1.5,0);
  var arrowShaftGeo = new THREE.CylinderBufferGeometry(.07, .07, .25, 16);
  var arrowShaft = new THREE.Mesh(arrowShaftGeo, matArrow);
  arrowShaft.position.set(0,1.75,0);
  var arrow = new THREE.Object3D();
  arrow.add(arrowHead);
  arrow.add(arrowShaft);
  scene.add(arrow);

  // BUTTONS
  var buttons = [
    new THREE.Mesh(sphereGeo, matButton),
    new THREE.Mesh(sphereGeo, matButton),
    new THREE.Mesh(sphereGeo, matButton),
    new THREE.Mesh(sphereGeo, matButton),
  ];

  buttons[0].position.set(2, -1, 0);
  buttons[1].position.set(-2, -1, 0);
  buttons[2].position.set(0, -1, 2);
  buttons[3].position.set(0, -1, -2);

  for(_ in buttons) {
    buttons[_].scale.set(2,0.75,2);
    scene.add(buttons[_]);
  }

  // CONTROLS
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI/2.1;
    controls.minPolarAngle = Math.PI/10;

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersections = [];
  var rotating = false;
  var moveTime = 45;
  var moveDistance = Math.PI/2;
  var axis = new THREE.Vector3(0,0,0);
  var countdown = moveTime;
  var active = false;

  function roundPositionX(vector) {
    var out = vector.clone();
      out.x = Math.round(out.x);
    return out;
  }

  var target = null;

  document.getElementById("canvas_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse,camera);
  }, false);

  document.getElementById("canvas_1").addEventListener('mousedown', function() {

    if(!rotating) {
      mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
      mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

      raycaster.setFromCamera(mouse,camera);

      intersections = raycaster.intersectObjects(buttons);
      if(intersections.length > 0) {
        controls.enableRotate = false;
        rotating = true;
        countdown = moveTime;
        axis = new THREE.Vector3(-intersections[0].object.position.z, 0, intersections[0].object.position.x);
        axis = axis.normalize();
        structGuide.rotateOnWorldAxis(axis, Math.PI/2);
        arrowGuide.rotateOnWorldAxis(axis, Math.PI/2);
      }
    }
  }, false);

  document.getElementById("newGame_button").addEventListener('click', function() {
    newGame();
  });

  $('input[name=startingPlayer][value="Blue"]').prop("checked", true).change();
  $('input[name=startingPlayer]').change(() => {
    startingPlayer = $('input[name=startingPlayer]:checked').val();
    setPlayerOut(startingPlayer);
  });

  var update = 0;

  function newGame() {
    if(!rotating) {
      var axes = [
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(-1,0,0),
        new THREE.Vector3(0,0,-1)
      ];
      var axis = new THREE.Vector3();
      for(var i = 0; i < 10; i++) {
        num = Math.floor(Math.random()*4);
        axis = axes[num];
        axis = axis.normalize();
        struct.rotateOnWorldAxis(axis, Math.PI/2);
      }
      update = 2;

      $(`#startingPlayerLine`).css("display", "inLine");
      $(`#currentPlayerLine`).css("display", "none");
    }
  }

  document.getElementById("endTurn_button").addEventListener('click', function() {
    endTurn();
  });

  document.getElementById("resetTurn_button").addEventListener('click', function() {
    resetTurn();
  });

  // FUNCTIONS

  function setPlayerOut(p) {
    $("#player_out").val(p);
    $(`#player_out`).css("background", p == "Blue" ? "#00F" : "#F00");
  }

  function togglePlayerOut() {
    setPlayerOut($(`#player_out`).val() == "Blue" ? "Red" : "Blue");
    if($("#winner_out").val() != "") $(`#player_out`).css("background", "#FFF");
  }

  function setWinnerOut(p) {
    $("#winner_out").val(p);
    if(p == "") $(`#winner_out`).css("background", "#FFF");
    else {
      $(`#winner_out`).css("background", p == "Blue" ? "#00F" : "#F00");
      $(`#player_out`).css("background", "#FFF");
    }
  }

  function advanceGame() {
    if(!rotating) {
      setArrow();
      lastFace = checkSide();
      lastRotation = struct.rotation.clone();
      let count = Number($('#count_out').val()) + lastFace;
      $('#count_out').val(count);

      togglePlayerOut();

      if($('#winner_out').val() == '') {
        if(count == 31) setWinnerOut($('#player_out').val() == "Red" ? "Blue" : "Red");
        else if(count > 31) setWinnerOut($('#player_out').val());
      }
      document.getElementById('endTurn_button').style.color = '#aaa';

      $(`#startingPlayerLine`).css("display", "none");
      $(`#currentPlayerLine`).css("display", "inLine");
    }
  }

  function checkSide() {
    let out = 1;
    let top = pips[0].getWorldPosition().y;
    let test;
    let j = 0;
    for(let i = 0; i < 5; i++) {
      j+=i+1;
      test = pips[j].getWorldPosition().y;
      if(top < test) {
        top = test;
        out = i + 2;
      }
    }
    return out;
  }

  function roundVector(vec) {
    vec.x = Math.round(vec.x);
    vec.y = Math.round(vec.y);
    vec.z = Math.round(vec.z);
  }

  function endTurn() {
    currentFace = checkSide();
    if(lastFace + currentFace != 7 && lastFace != currentFace)  // not same or opposite face, therefore valid face
      advanceGame();
  }

  function setArrow() {
    arrow.rotation.set(0,0,0);
    arrowGuide.rotation.set(0,0,0);
  }

  function resetTurn() {
    if(!rotating) {
      console.log("x: " + lastRotation.x + ", y: " + lastRotation.y + ", z: " + lastRotation.z);
      structGuide.rotation.set(lastRotation.x, lastRotation.y, lastRotation.z);
      struct.rotation.set(lastRotation.x, lastRotation.y, lastRotation.z);
      setArrow();
      $('#endTurn_button').css({'color':'#aaa'});
    }
  }

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    if(rotating) {
      if(countdown > 0) {
        struct.rotateOnWorldAxis(axis, moveDistance/moveTime);
        arrow.rotateOnWorldAxis(axis, moveDistance/moveTime);
        countdown--;
      }
      else {
        rotating = false;
        struct.rotation = structGuide.rotation;
        arrow.rotation = arrowGuide.rotation;
        controls.enableRotate = true;
        if(checkSide() == lastFace || checkSide() + lastFace == 7) {
          $('#endTurn_button').css({'color':'#aaa'});
        }
        else {
          $('#endTurn_button').css({'color':'#000'});
        }
      }
    }

    if(update > 0) { // for some reason, the position of the pips doesn't update for a frame or two. this delays the check
      arrow.rotation.set(0,0,0);
      structGuide.rotation = struct.rotation;
      arrowGuide.rotation = arrow.rotation;
      lastRotation = struct.rotation;
      lastFace = checkSide();
      setPlayerOut(startingPlayer);
      $('#count_out').val(lastFace);
      setWinnerOut("");
      document.getElementById('endTurn_button').style.color = '#aaa';
      update--;
    }

    renderer.render(scene, camera);
  }
  animate();
});
