$(document).ready( function() {
  // INIT
  var playing = false;
  $(`#startingPlayerLine`).css("display", "inLine");
  $(`#currentPlayerLine`).css("display", "none");
  let startingPlayer = "Blue";
  setPlayerOut(startingPlayer);
  setWinnerOut("");
  $(`#player1_total`).val(0);
  $(`#player1_total`).css("background", "#0000FF");
  $(`#player2_total`).val(0);
  $(`#player2_total`).css("background", "#FF0000");
  $(`#num_in`).val(21);
  $(`#max_num`).val(4)
  var hIndex = 0;
  var history = [];
  // var buttonColor = document.getElementById('endTurn_button').style.backgroundColor;
  // document.getElementById('endTurn_button').style.color = '#aaa';

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas_1"), antialias: true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(210, 105);

  // SCENE
  var scene = new THREE.Scene();

  // CAMERA
  var camera = new THREE.OrthographicCamera(-6, 6, 3, -3, 0.1, 100);
    camera.position.set(0,0,10);
    camera.lookAt(0,0,0);
    // camera.rotation.set(0,0, -0.5*Math.PI);
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
  var circles = [];
  var stackNum = 21;
  var startNum = 21;
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 10; j++) {
      circles[10*i + j] = new THREE.Mesh(circleGeo, matRed);
      circles[10*i + j].position.set(1.2*j - 5.4, -(1.2*i - 1.8), 0);
      scene.add(circles[10*i + j]);
    }
  }

  // y = -1.2*i + 1.8
  // i = y - 1.8 / -1.2

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
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 1.05 + 1;

    if(stackNum % 2 == 1 || playing) {
      raycaster.setFromCamera(mouse,camera);

      // intersections = [];
      intersections = raycaster.intersectObjects(circles);

      for(var i = 0; i < circles.length; i++) {
        circles[i].material = matRed;
      }

      if(intersections.length > 0) {
        var circleNum = Math.round((intersections[0].object.position.y - 1.8)/(-1.2));
        var circleRow = Math.round((intersections[0].object.position.x + 5.4)/1.2);
        var cCount = 0;
        for(var i = 10*circleNum + circleRow; i < circles.length; i++) {
          // circles[i].material = matRedAlpha;
          if(circles[i].position.z == 0) cCount++;
          if(cCount >= $(`#max_num`).val()) i = circles.length;
        }
        for(var i = stackNum-1; i >= 0 && cCount > 0; i--) {
          circles[i].material = matRedAlpha;
          cCount--;
        }
      }
    }
  }, false);

  document.getElementById("canvas_1").addEventListener('mousedown', function() {
    mouse.x = ((event.clientX - $("#canvas_1").offset().left + $(window).scrollLeft()) / 50) / 2.1 - 1;
    mouse.y = -((event.clientY - $("#canvas_1").offset().top + $(window).scrollTop()) / 50) / 1.05 + 1;

    if(stackNum % 2 == 1 || playing) {
      playing = true;

      document.getElementById("Odd_button").disabled = false;
      document.getElementById("Even_button").disabled = false;

      raycaster.setFromCamera(mouse,camera);

      // intersections = [];
      intersections = raycaster.intersectObjects(circles);

      if(intersections.length > 0) {
        var circleNum = Math.round((intersections[0].object.position.y - 1.8)/(-1.2));
        var circleRow = Math.round((intersections[0].object.position.x + 5.4)/1.2);
        var cCount = 0;
        for(var i = 10*circleNum + circleRow; i < circles.length; i++) {
          // circles[i].material = matRed;
          if(circles[i].position.z == 0) {
            cCount++;
            // circles[i].position.z = 50;
          }
          if(cCount >= $(`#max_num`).val()) i = circles.length;
        }
        if($("#player_out").val() == "Blue") $(`#player1_total`).val(cCount + parseInt($(`#player1_total`).val()));
        else $(`#player2_total`).val(cCount + parseInt($(`#player2_total`).val()));
        history[hIndex++] = cCount;
        stackNum -= cCount;
        placeCircles();

        if(stackNum == 0) {
          if($(`input:radio[name ='winCondition']:checked`).val() == "odd") {
            setWinnerOut($(`#player1_total`).val() % 2 == 0 ? "Red" : "Blue");
          }
          else {
            setWinnerOut($(`#player1_total`).val() % 2 == 0 ? "Blue" : "Red");
          }
        }
        togglePlayerOut();
        if(stackNum == 0) $(`#player_out`).css("background", "#FFF");

        $(`#startingPlayerLine`).css("display", "none");
        $(`#currentPlayerLine`).css("display", "inLine");
      }
    }
  }, false);

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

  document.getElementById("newGame_button").addEventListener('click', function() {
    newGame();
  });

  var update = 0;

  function newGame() {
    playing = false;

    document.getElementById("Odd_button").disabled = false;
    document.getElementById("Even_button").disabled = false;

    stackNum = startNum;
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

  $('input[name=winCondition]').change(() => {
    newGame();
  });

  function undo() {
    if(hIndex <= 0) return;
    hIndex--;
    if(hIndex <= 0) {
      $(`#startingPlayerLine`).css("display", "inLine");
      $(`#currentPlayerLine`).css("display", "none");
    }

    stackNum += history[hIndex];
    placeCircles();

    setWinnerOut("");
    if($(`#player_out`).val() != "Blue") {
      $(`#player1_total`).val(parseInt($(`#player1_total`).val()) - history[hIndex])
    }
    else {
      $(`#player2_total`).val(parseInt($(`#player2_total`).val()) - history[hIndex])
    }
    togglePlayerOut();
  }

  $(`#num_in`).on("input", function() { // when a slider is changed,
    if($(`#num_in`).val() > 39) $(`#num_in`).val(39);
    else if($(`#num_in`).val() < 0) $(`#num_in`).val(0);
    stackNum = $(`#num_in`).val();
    startNum = stackNum;
    placeCircles();
    newGame();
  });
  $(`#max_num`).on("input", function() { // when a slider is changed,
    if($(`#max_num`).val() > 39) $(`#max_num`).val(39);
    else if($(`#max_num`).val() < 0) $(`#max_num`).val(0);
    newGame();
  });

  $('input[name=startingPlayer][value="Blue"]').prop("checked", true).change();
  $('input[name=startingPlayer]').change(() => {
    startingPlayer = $('input[name=startingPlayer]:checked').val();
    newGame();
  });

  // FUNCTIONS

  function placeCircles() {
    var circlesTotal = 0;
    for(var i = 0; i < circles.length; i++) {
      if(stackNum > i) {
        circles[i].position.z = 0;
        circlesTotal++;
      }
      else circles[i].position.z = 50;
    }
    if(stackNum % 2 == 0 && !playing) {
      for(var i = 0; i < circles.length; i++) {
        circles[i].material = matRedAlpha;
      }
    }
    else if(!playing){
      for(var i = 0; i < circles.length; i++) {
        circles[i].material = matRed;
      }
    }
  }

  function setOutputs() {
    $(`#num_in`).val(stackNum);
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
