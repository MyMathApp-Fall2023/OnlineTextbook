$(document).ready( function() {
  // INIT
  $(`#startingPlayerLine`).css("display", "inLine");
  $(`#currentPlayerLine`).css("display", "none");
  let startingPlayer = "Blue";
  setPlayerOut(startingPlayer);
  setWinnerOut("");
  $(`#player1_total`).val(0);
  $(`#player1_total`).css("background", "#0000FF");
  $(`#player2_total`).val(0);
  $(`#player2_total`).css("background", "#FF0000");
  var hIndex = 0;
  var history = [];

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas_1"), antialias: true});
    renderer.setClearColor(0xccccff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(210, 350);

  // SCENE
  var scene = new THREE.Scene();

  // CAMERA
  // var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
  var camera = new THREE.OrthographicCamera(-6, 6, 10, -10, 0.1, 100);
    camera.position.set(0,0,10);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matWhite = new THREE.MeshBasicMaterial({color: "#fff"});
  var matButton = new THREE.MeshBasicMaterial({color: "#0c0"});
  var matArrow = new THREE.MeshBasicMaterial({color: "#00c"});
  var matRed = new THREE.MeshBasicMaterial({color: "#f0f"});
  var matRedAlpha = new THREE.MeshBasicMaterial({color: "#fcf"});

  // OBJECTS

  var circleGeo = new THREE.CircleBufferGeometry(0.5,32);
  var circle = new THREE.Mesh(circleGeo, matRed);
  var circles = [
    [], [], [], [], []
  ];
  var stackNums = [0,3,5,2,0];
  var startNums = [0,3,5,2,0];
  for(var i = 0; i < circles.length; i++) {
    for(var j = 0; j < 16; j++) {
      circles[i][j] = new THREE.Mesh(circleGeo, matRed);
      circles[i][j].position.set(2*i - 4, 1.2*j - 9, 0);
      scene.add(circles[i][j]);
    }
  }

  // BUTTONS

  // CONTROLS

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersections = [];

  function roundPositionX(vector) {
    var out = vector.clone();
      out.x = Math.round(out.x);
    return out;
  }

  var target = null;

  document.getElementById("canvas_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 2.1 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse,camera);

    intersections = [];
    var row = -1;
    while(intersections.length == 0 && row < 5) {
      row++;
      intersections = raycaster.intersectObjects(circles[row]);
    }

    for(var i = 0; i < circles.length; i++) {
      for(var j = 0; j < circles[i].length; j++) {
        circles[i][j].material = matRed;
      }
    }

    if(intersections.length > 0) {
      var circleNum = Math.round((intersections[0].object.position.y+9)/1.2);
      var circleRow = Math.round(2 + (intersections[0].object.position.x)/2);
      for(var i = circleNum; i < circles[circleRow].length; i++) {
        circles[circleRow][i].material = matRedAlpha;
      }
    }
  }, false);

  document.getElementById("canvas_1").addEventListener('mousedown', function() {
    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 2.1 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    document.getElementById("Last_button").disabled = false;
    document.getElementById("NotLast_button").disabled = false;

    raycaster.setFromCamera(mouse,camera);

    intersections = [];
    var i = -1;
    while(intersections.length == 0 && i < 5) {
      i++;
      intersections = raycaster.intersectObjects(circles[i]);
    }
    if(intersections.length > 0) {
      var circleNum = Math.round((intersections[0].object.position.y+9)/1.2);
      var circleRow = Math.round(2 + (intersections[0].object.position.x)/2);
      if($("#player_out").val() == "Blue") $(`#player1_total`).val(stackNums[circleRow] - circleNum + parseInt($(`#player1_total`).val()));
      else $(`#player2_total`).val(stackNums[circleRow] - circleNum + parseInt($(`#player2_total`).val()));
      history[hIndex++] = 10*(stackNums[circleRow] - circleNum) + circleRow;
      stackNums[circleRow] = circleNum;
      placeCircles();

      if(stackNums[0] == 0 && stackNums[1] == 0 && stackNums[2] == 0 && stackNums[3] == 0 && stackNums[4] == 0) {
        if($(`input:radio[name ='winCondition']:checked`).val() == "last") {
          setWinnerOut($(`#player_out`).val());
        }
        else if($(`input:radio[name ='winCondition']:checked`).val() == "notLast") {
          setWinnerOut($(`#player_out`).val() == "Blue" ? "Red" : "Blue");
        }
      }
      togglePlayerOut();
      if(stackNums[0] == 0 && stackNums[1] == 0 && stackNums[2] == 0 && stackNums[3] == 0 && stackNums[4] == 0) $(`#player_out`).css("background", "#FFF");

      $(`#startingPlayerLine`).css("display", "none");
      $(`#currentPlayerLine`).css("display", "inLine");
    }
  }, false);

  document.getElementById("newGame_button").addEventListener('click', function() {
    newGame();
  });

  var update = 0;

  function newGame() {
    document.getElementById("Last_button").disabled = false;
    document.getElementById("NotLast_button").disabled = false;

    for(var i = 0; i < stackNums.length; i++) stackNums[i] = startNums[i];
    placeCircles();

    setWinnerOut("");
    setPlayerOut(startingPlayer);
    $(`#startingPlayerLine`).css("display", "inLine");
    $(`#currentPlayerLine`).css("display", "none");

    $(`#player1_total`).val(0);
    $(`#player2_total`).val(0);

    hIndex = 0;
  }

  document.getElementById("undo_button").addEventListener('click', function() {
    undo();
  });

  function undo() {
    if(hIndex <= 0) return;
    hIndex--;
    if(hIndex <= 0) {
      $(`#startingPlayerLine`).css("display", "inLine");
      $(`#currentPlayerLine`).css("display", "none");
    }

    var row = Math.round(10*(history[hIndex]/10 - Math.floor(history[hIndex]/10)));
    stackNums[row] += Math.floor(history[hIndex]/10);
    placeCircles();

    setWinnerOut("");
    togglePlayerOut();
    if($(`#player_out`).val() == "Blue") {
      $(`#player1_total`).val(parseInt($(`#player1_total`).val()) - Math.floor(history[hIndex]/10))
    }
    else {
      $(`#player2_total`).val(parseInt($(`#player2_total`).val()) - Math.floor(history[hIndex]/10))
    }
  }

  $(`#row0_in`).on("input", function() { // when a slider is changed,
    if($(`#row0_in`).val() > 16) $(`#row0_in`).val(16);
    else if($(`#row0_in`).val() < 0) $(`#row0_in`).val(0);
    stackNums[0] = $(`#row0_in`).val();
    startNums[0] = stackNums[0];
    newGame();
  });
  $(`#row1_in`).on("input", function() { // when a slider is changed,
    if($(`#row1_in`).val() > 16) $(`#row1_in`).val(16);
    else if($(`#row1_in`).val() < 0) $(`#row1_in`).val(0);
    stackNums[1] = $(`#row1_in`).val();
    startNums[1] = stackNums[1];
    newGame();
  });
  $(`#row2_in`).on("input", function() { // when a slider is changed,
    if($(`#row2_in`).val() > 16) $(`#row2_in`).val(16);
    else if($(`#row2_in`).val() < 0) $(`#row2_in`).val(0);
    stackNums[2] = $(`#row2_in`).val();
    startNums[2] = stackNums[2];
    newGame();
  });
  $(`#row3_in`).on("input", function() { // when a slider is changed,
    if($(`#row3_in`).val() > 16) $(`#row3_in`).val(16);
    else if($(`#row3_in`).val() < 0) $(`#row3_in`).val(0);
    stackNums[3] = $(`#row3_in`).val();
    startNums[3] = stackNums[3];
    newGame();
  });
  $(`#row4_in`).on("input", function() { // when a slider is changed,
    if($(`#row4_in`).val() > 16) $(`#row4_in`).val(16);
    else if($(`#row4_in`).val() < 0) $(`#row4_in`).val(0);
    stackNums[4] = $(`#row4_in`).val();
    startNums[4] = stackNums[4];
    newGame();
  });

  $(`input:radio[name ='winCondition']`).click(function() {
    newGame();
  });

  $('input[name=startingPlayer][value="Blue"]').prop("checked", true).change();
  $('input[name=startingPlayer]').change(() => {
    startingPlayer = $('input[name=startingPlayer]:checked').val();
    newGame();
  });

  // FUNCTIONS
  function setPlayerOut(p) {
    $("#player_out").val(p);
    $(`#player_out`).css("background", p == "Blue" ? "#00F" : "#F00");
  }

  function togglePlayerOut() {
    setPlayerOut($(`#player_out`).val() == "Blue" ? "Red" : "Blue");
  }

  function setWinnerOut(p) {
    $("#winner_out").val(p);
    if(p == "") $(`#winner_out`).css("background", "#FFF");
    else $(`#winner_out`).css("background", p == "Blue" ? "#00F" : "#F00");
  }

  function placeCircles() {
    var circlesTotal = 0;
    for(var i = 0; i < circles.length; i++) {
      for(var j = 0; j < circles[i].length; j++) {
        if(stackNums[i] > j) {
          circles[i][j].position.z = 0;
          circlesTotal++;
        }
        else circles[i][j].position.z = 50;
      }
    }
  }

  function setOutputs() {
    $(`#row0_in`).val(stackNums[0]);
    $(`#row1_in`).val(stackNums[1]);
    $(`#row2_in`).val(stackNums[2]);
    $(`#row3_in`).val(stackNums[3]);
    $(`#row4_in`).val(stackNums[4]);
  }

  function roundVector(vec) {
    vec.x = Math.round(vec.x);
    vec.y = Math.round(vec.y);
    vec.z = Math.round(vec.z);
  }

  // ANIMATE

  placeCircles();
  setOutputs();
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();
});
