// $(document).ready( function() {

// function for generating an array of nonrepeating random integers
function nonRepeatingRandomInt(num, max, min, array) {
  if(min === undefined) min = 0;  // set defaults
  if(array === undefined) array = [];
  out = array;
  num += array.length; // adjust num value if an array is entered

  if(num > max - min + 1) quit(); // if asked for too many numbers, error out

  for(i = array.length; i < num; i++) {
    out[i] = Math.floor(Math.random() * (max - i - min)) + min; // give a random int between max and min
    for(j = 0; j < i; j++) { // loop through all numbers generated so far
      if(out[i] == out[j]) { // if the number has already been used,
        out[i]++; // increase the number by one
        j = -1; // start looping from the beginning
      }
      if(out[i] > max) { // if the number has become too big,
        out[i] -= max - min; // set the number to min
        j = -1; // restart the loop
      }
    }
  }
  return out;
}

// setting up a class for named vectors
namedVec = function(name, vec) {
  this.name = name; // set label (eg. "North")
  this.vec = vec; // set associated vector

  // function for getting cross product with other named vector
  this.cross = function(otherVec) {
    var out = [this.vec[1] * otherVec.vec[2] - this.vec[2] * otherVec.vec[1],
    this.vec[2] * otherVec.vec[0] - this.vec[0] * otherVec.vec[2],
    this.vec[0] * otherVec.vec[1] - this.vec[1] * otherVec.vec[0]];
    for(i in out) { // set all non-zero values to 1, to match up with vectors in list
      if(out[i] > 0) out[i] = 1;
      else if(out[i] < 0) out[i] = -1;
    }
    return out;
  }
}

// array of all important directions
var directions = [
  new namedVec('Up', [0, 0, 1]),
  new namedVec('Down', [0, 0, -1]),
  new namedVec('North', [0, 1, 0]),
  new namedVec('South', [0, -1, 0]),
  new namedVec('East', [1, 0, 0]),
  new namedVec('West', [-1, 0, 0]),
  new namedVec('Northeast', [1, 1, 0]),
  new namedVec('Southwest', [-1, -1, 0]),
  new namedVec('Southeast', [1, -1, 0]),
  new namedVec('Northwest', [-1, 1, 0])
];

// initiate global variables for chosen random vectors
var list = [];
var order;


// CAMERA
var camera_1 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
  camera_1.position.set(-16.4, 7, -16.4);
  camera_1.lookAt(0, 0, 0);

// function to assign random vectors to u and v, and calculate answer
function doIt() {
  camera_1.position.set(-16.4, 7, -16.4); // reset the camera
  camera_1.lookAt(0, 0, 0);

  // if the solution box is open, close it
  if(solution == 1) document.getElementById("SolX1").click();

  sliderReset(); // reset the sliders, as this generates a new exercise

  // get random numbers to use for choosing vectors
  list = nonRepeatingRandomInt(3, 10);

  if(Math.floor(list[0]/2) == Math.floor(list[1]/2)) { // make sure u and v are not opposites (works because of how the list of vectors is arranged)
    list[1] = list[2];
  }
  for(i in list) list[i] = directions[list[i]]; // use the numbers to retrieve the named vectors
  crossed = list[0].cross(list[1]); // get uxv vector
  for(i in directions) { // find which named vector matches the uxv
    if(String(directions[i].vec) == String(crossed)) {
      for(j in list) if(directions[i].name == list[j].name) { // make sure only one choice is the correct one
        list[j] = list[2];
      }
      break;
    }
  }
  list[2] = directions[i]; // set list[2] to the uxv named vector

  // set vector names in html
  document.getElementById('vecu_2').innerHTML = list[0].name;
  document.getElementById('vecv_2').innerHTML = list[1].name;
  document.getElementById('vecu_3').innerHTML = list[0].name;
  document.getElementById('vecv_3').innerHTML = list[1].name;
  document.getElementById('vecuxv_3').innerHTML = list[2].name;

  // Note: Clean up uneccesary variables
  correctChoice = list[2].name.toLowerCase();
  // console.log(list[2].name.toLowerCase());
  updateButtons(correctChoice);

  // find the u and v r, phi and theta
  u_x = list[0].vec[0];
  u_y = list[0].vec[1];
  u_z = list[0].vec[2];
  u_r = Math.sqrt(list[0].vec[0] * list[0].vec[0] + list[0].vec[1] * list[0].vec[1] + list[0].vec[2] * list[0].vec[2]);
  u_phi = (Math.PI / 2) - Math.acos(list[0].vec[2] / u_r);
  if(list[0].vec[0] != 0) u_theta = Math.atan(list[0].vec[1] / list[0].vec[0]);
  else u_theta = Math.atan(-list[0].vec[1] / 0.00001);
  if(list[0].vec[0] > 0) u_theta -= Math.PI;

  v_x = list[1].vec[0];
  v_y = list[1].vec[1];
  v_z = list[1].vec[2];
  v_r = Math.sqrt(list[1].vec[0] * list[1].vec[0] + list[1].vec[1] * list[1].vec[1] + list[1].vec[2] * list[1].vec[2]);
  v_phi = (Math.PI / 2) - Math.acos(list[1].vec[2] / v_r);
  if(list[1].vec[0] != 0) v_theta = Math.atan(list[1].vec[1] / list[1].vec[0]);
  else v_theta = Math.atan(-list[1].vec[1] / 0.00001);
  if(list[1].vec[0] > 0) v_theta -= Math.PI;

  // find the uxv values
  uxv_x = u_y * v_z - u_z * v_y;
  uxv_y = u_z * v_x - u_x * v_z;
  uxv_z = u_x * v_y - u_y * v_x;
  uxv_r = Math.sqrt(uxv_x * uxv_x + uxv_y * uxv_y + uxv_z * uxv_z);
  uxv_x /= uxv_r;
  uxv_y /= uxv_r;
  uxv_z /= uxv_r;
}

/* east, north, southeast, up etc. */
// function to update buttons with correct answer
function updateButtons(correctChoice) {
  var allChoices = ['east', 'north', 'southeast', 'southwest', 'up', 'down', 'northeast', 'northwest', 'west', 'south'] // and more
  allChoices.forEach(choice => {
    document.getElementById(choice).classList.add('incorrect'); // set all buttons to incorrect
    document.getElementById(choice).classList.remove('correct');
    document.getElementById(choice).style.backgroundImage = "url(../../../graphics/bulletblue.jpg)";
  })
  document.getElementById(correctChoice).classList.remove('incorrect'); // set correct button to correct
  document.getElementById(correctChoice).classList.add('correct');

  let correctButtons = document.getElementsByClassName('correct'); // make lists of correct and incorrect buttons
  let incorrectButtons = document.getElementsByClassName('incorrect');

  for (let i = 0; i < correctButtons.length; i++) {
    // console.log("correct = " + correctButtons.length);
    correctButtons[i].addEventListener('click', event => {
      event.target.style.backgroundImage = "url(../../../graphics/bulletcorrect.jpg)";
    });
  }
  for (let i = 0; i < incorrectButtons.length; i++) {
    // console.log("incorrect = " + incorrectButtons.length);
    incorrectButtons[i].addEventListener('click', event => {
      event.target.style.backgroundImage = "url(../../../graphics/bulletincorrect.jpg)";
    });
  }
}

  // document.getElementById("SolX1").click();
  var solution = 0;
  document.getElementById("SolX1").addEventListener('click', function() {
    $("SolX1").slideToggle();
    if(solution == 0) solution = 1;
    else solution = 0;
    console.log("solution = " + solution);
  });
  doIt(); // run function once on page start to initiate

  function randInt(max) { // returns an integer from 0 to (max - 1) inclusive
    return Math.floor(Math.random() * max);
  }

  // RENDERER
  var renderer_1 = new THREE.WebGLRenderer({canvas: document.getElementById('figure_4'), antialias: true});
    renderer_1.setClearColor(0xffffff);
    renderer_1.setPixelRatio(window.devicePixelRatio);
    renderer_1.setSize(250, 250);

  // SCENE
  var scene_1 = new THREE.Scene();

  // CONTROLS
  controls_1 = new THREE.OrbitControls(camera_1, renderer_1.domElement);
  controls_1.enableKeys = false;
  controls_1.zoomSpeed = 0.75;
  controls_1.minDistance = 23;
  controls_1.maxDistance = 27;

  // LIGHTS
  var dLight_1 = new THREE.DirectionalLight(0xffffff, 1);
  scene_1.add(dLight_1);
  var aLight_1 = new THREE.AmbientLight(0xffffff, .3);
  scene_1.add(aLight_1);

  // OBJECTS
  var hand_1 = new THREE.Object3D();
  var compass_model = new THREE.Object3D();

  // MATERIALS
  var material_1 = new THREE.MeshPhongMaterial({color:0xff0000});
  var flat_black = new THREE.MeshBasicMaterial({color:0x000000});
  var flat_grey = new THREE.MeshBasicMaterial({color:0xdddddd});

  var loader = new THREE.GLTFLoader(); // load hand
  function loadModel(model) {
    return new Promise(function (resolve) {
      loader.load(model, resolve);
    });
  }
  var load1 = loadModel("models/hand04.gltf").then(
    function(gltf) {

      gltf.scene.traverse(function(child) { // find skeleton
        if (child.isSkinnedMesh) {
          child.material = material_1;
          child.material.skinning = true;

          hand_1 = gltf.scene;
          hand_1.skeleton = child.skeleton; // assign skeleton
        }
      } )
      scene_1.add(hand_1); // put hand in scene
      hand_1.scale.set(.8, .8, .8); // rescale hand
      sliderReset(); // set sliders to default on page init

      // set rigidly posed fingers
  		hand_1.skeleton.bones[8].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[9].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[11].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[12].rotation.set(0, 0, 1.75);
  } );

  var load2 = loadModel("models/compass01.gltf").then(
    function(gltf) {
      compass_model = gltf.scene;
      scene_1.add(compass_model); // put model in scene
      compass_model.position.set(0, -3, 0); // position the model
  } );

  var load3 = loadModel("models/compass_letters.gltf").then(
    function(gltf) {
      compassLetters_model = gltf.scene;
      scene_1.add(compassLetters_model); // put model in scene
      compassLetters_model.rotation.set(0, Math.PI / 2, 0);
      compassLetters_model.position.set(0, -2.5, 0); // position the model
      compassLetters_model.scale.set(1.5, .5, 1.5);

      compassLetters_model2 = compassLetters_model.clone();
      compassLetters_model2.scale.set(1.5, -.5, 1.5);
      scene_1.add(compassLetters_model2);
  } );

  // conversion function for degrees and radians
  function degreeToRad(degree) {
    return degree * Math.PI / 180;
  }

  // conversion function for degrees and radians
  function radToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  // function to set sliders to their default values
  function sliderReset() {
    // set sliders
    $(`#thetaSlider_4`).val(22.5);
    $(`#phiSlider_4`).val(0);
    $(`#alphaSlider_4`).val(0);
    $(`#betaSlider_4`).val(90);
    // set displays
    $(`#thetaDisp_4`).val(22.5);
    $(`#phiDisp_4`).val(0);
    $(`#alphaDisp_4`).val(0);
    $(`#betaDisp_4`).val(90);

    // set hand rotation to default
    // handRot_y = Math.PI/8;
    handRot_y = Math.PI/8;
    handRot_x = 0;
    handRot_z = 0;
    betaRot = degreeToRad(90);
  }

  // GLOBALS
  // hand
  // var handRot_y = Math.PI/8;
  var handRot_y = 0;
  var handRot_x = 0;
  var handRot_z = 0;
  var betaRot = degreeToRad(90);

  // u vector
  var u_x;
  var u_y;
  var u_z;
  var u_r;
  var u_theta;
  var u_phi;

  // v vector
  var v_x;
  var v_y;
  var v_z;
  var v_r;
  var v_theta;
  var v_phi;

  // uxv vector
  var uxv_x;
  var uxv_y;
  var uxv_z;
  var uxv_r;

  // function to handle frame updates
  function animate() {
    requestAnimationFrame(animate);

    // dealing with movement of middle finger
    if(betaRot < degreeToRad(90)) {
      hand_1.skeleton.bones[2].rotation.set(0, 0, betaRot);
      hand_1.skeleton.bones[3].rotation.set(0, 0, 0);
    }
    else {
      hand_1.skeleton.bones[2].rotation.set(0, 0, degreeToRad(90));
      hand_1.skeleton.bones[3].rotation.set(0, 0, betaRot - degreeToRad(90));
    }

    // if sliders change, change the associated values
    $(`#thetaSlider_4`).on("input", function() {
      handRot_y = Math.floor(degreeToRad($(`#thetaSlider_4`).val())*10)/10;
      $(`#thetaDisp_4`).val($(`#thetaSlider_4`).val());
    });
    $(`#thetaDisp_4`).on("input", function() {
      // handRot_y = Math.floor((degreeToRad(parseFloat($(`#thetaDisp_4`).val())) + Math.PI/8)*10)/10;
      handRot_y = Math.floor(degreeToRad($(`#thetaDisp_4`).val())*10)/10;
      $(`#thetaSlider_4`).val(parseFloat($(`#thetaDisp_4`).val()));
    });

    $(`#phiSlider_4`).on("input", function() {
      handRot_z = degreeToRad($(`#phiSlider_4`).val());
      $(`#phiDisp_4`).val($(`#phiSlider_4`).val());
    });
    $(`#phiDisp_4`).on("input", function() {
      handRot_z = degreeToRad($(`#phiDisp_4`).val());
      $(`#phiSlider_4`).val(parseFloat($(`#phiDisp_4`).val()));
    });

    $(`#alphaSlider_4`).on("input", function() {
      handRot_x = degreeToRad($(`#alphaSlider_4`).val());
      $(`#alphaDisp_4`).val($(`#alphaSlider_4`).val());
    });
    $(`#alphaDisp_4`).on("input", function() {
      handRot_x = degreeToRad($(`#alphaDisp_4`).val());
      $(`#alphaSlider_4`).val(parseFloat($(`#alphaDisp_4`).val()));
    });

    $(`#betaSlider_4`).on("input", function() {
      betaRot = degreeToRad($(`#betaSlider_4`).val());
      $(`#betaDisp_4`).val($(`#betaSlider_4`).val());
    });
    $(`#betaDisp_4`).on("input", function() {
      betaRot = degreeToRad(parseFloat($(`#betaDisp_4`).val()));
      $(`#betaSlider_4`).val(parseFloat($(`#betaDisp_4`).val()));
    });

    // reset position and rotation to prepare for setting them properly
    hand_1.position.set(0, 0, 0);
    hand_1.rotation.set(0, 0, 0);
    // rotate hand
    hand_1.rotateY(handRot_y + Math.PI);
    hand_1.rotateZ(handRot_z);
    hand_1.rotateX(handRot_x);
    hand_1.translateY(1); // slide hand up 1 in local space, to provide vector using positional information later

    // check what stage of the problem hand is at
    if((Math.abs(Math.abs(handRot_y + Math.PI / 2 - u_theta) - Math.PI) < .1 && Math.abs(handRot_z) < 0.1) || (Math.abs(handRot_z + u_phi) < .1 && Math.abs(handRot_z) > 1)) {
      if(Math.sqrt((uxv_x - hand_1.position.z) * (uxv_x - hand_1.position.z) + (uxv_y - hand_1.position.x) * (uxv_y - hand_1.position.x) + (uxv_z - hand_1.position.y) * (uxv_z - hand_1.position.y)) < .1) {
        renderer_1.setClearColor(0xa0a0ff); // if index and middle are pointing correctly, set color
      }
      else {
        renderer_1.setClearColor(0xc7c7ff); // if only index, set color
      }
    }
    else
      renderer_1.setClearColor(0xffffff); // if neither, set color

    // adjust hand position to undo previous Y axis movement, and put center of rotation near knuckles of middle and index finger
    hand_1.translateX(1);
    hand_1.translateY(-2.6);

    renderer_1.render(scene_1, camera_1); // render
  }

  Promise.all([load1, load2, load3]).then(animate).catch(function (err) {
    console.error(err);
  });

// } );
