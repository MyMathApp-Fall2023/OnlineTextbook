$(document).ready( function() {

  var autosolve = false;

  // RENDERER
  var renderer_1 = new THREE.WebGLRenderer({canvas:document.getElementById('figure_3'), antialias:true});
    renderer_1.setClearColor(0xf0f0f0);
    renderer_1.setPixelRatio(window.devicePixelRatio);
    renderer_1.setSize(250, 250);

  // CAMERA
  var camera_1 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera_1.position.set(-16.4, 7, 16.4);
    camera_1.lookAt(0, 0, 0);

  // SCENE
  var scene_1 = new THREE.Scene();

  // CAMERA CONTROLS
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

  // OBEJCTS
  var hand_1 = new THREE.Object3D(); // hand
  var arrow_u = new THREE.Object3D(); // vector arrows
  var arrow_v = new THREE.Object3D();
  var arrow_uxv = new THREE.Object3D();
  var axes = new THREE.Object3D(); // axis bars
  var axis_sphere = new THREE.Object3D(); // sphere to make the joining of arrows at the origin look good

  // MATERIALS
  var material_1 = new THREE.MeshPhongMaterial({color:0xff0000}); // hand red
  var flat_black = new THREE.MeshBasicMaterial({color:0x000000}); // arrow black
  var flat_grey = new THREE.MeshBasicMaterial({color:0xdddddd}); // axis grey

  // LOADERS
  // loading the hand
  var loader = new THREE.GLTFLoader();

  function loadModel(model) {
    return new Promise(function (resolve) {
      loader.load(model, resolve);
    });
  }
  var load1 = loadModel("models/hand04.gltf").then(
    function(gltf) {

      gltf.scene.traverse(function(child) { // go through the scene and find the hand
        if (child.isSkinnedMesh) {
          child.material = material_1;
          child.material.skinning = true;

          hand_1 = gltf.scene;
          hand_1.skeleton = child.skeleton; // assign the skeleton
        }
      } )
      scene_1.add(hand_1); // add the hand to the scene

      // set the position of the unmoving fingers
      hand_1.skeleton.bones[8].rotation.set(0, 0, 1.75);
      hand_1.skeleton.bones[9].rotation.set(0, 0, 1.75);
      hand_1.skeleton.bones[11].rotation.set(0, 0, 1.75);
      hand_1.skeleton.bones[12].rotation.set(0, 0, 1.75);

      // take the opportunity to set the slider default values on page init
      $(`#thetaSlider_3`).val(0);
      $(`#phiSlider_3`).val(90);
      $(`#alphaSlider_3`).val(0);
      $(`#betaSlider_3`).val(90);
      $(`#thetaDisp_3`).val(0);
      $(`#phiDisp_3`).val(90);
      $(`#alphaDisp_3`).val(0);
      $(`#betaDisp_3`).val(90);
  } );

  // loading the sphere
  var load2 = loadModel("models/axis_sphere03.gltf").then(
    function(gltf) {

      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = flat_black;
        }
      } );

      axis_sphere = gltf.scene;
      scene_1.add(axis_sphere);
      axis_sphere.scale.set(.2, .2, .2); // scale the sphere
  } );

  // make the vector label sprites
  var spriteu = makeTextSprite("u", {fontface: "Georgia", fontsize: 38});
  scene_1.add(spriteu);
  var spritev = makeTextSprite("v", {fontface: "Georgia", fontsize: 38});
  scene_1.add(spritev);
  var spriteuxv = makeTextSprite("u x v", {fontface: "Georgia", fontsize: 38});
  scene_1.add(spriteuxv);

  // load the vector arrows
  var load3 = loadModel("models/axis_arrow04.gltf").then(
    function(gltf) {

      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = flat_black; // assign the color
        }
      } );

      // u vector
      arrow_u = gltf.scene;
      scene_1.add(arrow_u);
      arrow_u.scale.set(.2, .2, .2); // scale the arrow

      // v vector
      arrow_v = arrow_u.clone();
      scene_1.add(arrow_v);

      // uxv vector
      arrow_uxv = arrow_v.clone();
      scene_1.add(arrow_uxv);

      // set the initial states of the vectors
      ranUV();
  } );

  // load the axis bars
  var load4 = loadModel("models/axes.gltf").then(
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = flat_grey;
        }
      } );

      axes = gltf.scene;
      scene_1.add(axes);
  } );

  // make the axis label sprites and set their positions
  var label_xp = makeTextSprite("x", {fontface: "Georgia", fontsize: 24});
  scene_1.add(label_xp);
  label_xp.position.set(-7, -1, 0);

  var label_yp = makeTextSprite("y", {fontface: "Georgia", fontsize: 24});
  scene_1.add(label_yp);
  label_yp.position.set(0, -1, 7);

  var label_zp = makeTextSprite("z", {fontface: "Georgia", fontsize: 24});
  scene_1.add(label_zp);
  label_zp.position.set(1, 7, 0);

  // FUNCTIONS
  function setaxispos(axis, camera) { // function to keep arrows in position in front of camera
    // this allows arrows to show up over the hand from every direction
    axis.position.set(3/4 * camera.position.x, 3/4 * camera.position.y, 3/4 * camera.position.z);
  }

  // function to translate from degrees to radians
  function degreeToRad(degree) {
    return degree * Math.PI / 180;
  }

  // function to translate from radians to degrees
  function radToDegree(rad) {
    return rad * 180 / Math.PI;
  }

  // function to claculate the uxv cross product
  function calcUxV() {
    uxv_x = u_y * v_z - u_z * v_y;
    uxv_y = u_z * v_x - u_x * v_z;
    uxv_z = u_x * v_y - u_y * v_x;
    uxv_x_dis = uxv_x;
    uxv_y_dis = uxv_y;
    uxv_z_dis = uxv_z;

    // find the magnitude of the uzv vector and normalize it
    uxv_r = Math.sqrt(uxv_x * uxv_x + uxv_y * uxv_y + uxv_z * uxv_z);
    uxv_x /= uxv_r;
    uxv_y /= uxv_r;
    uxv_z /= uxv_r;
  }

  // function to hide the uxv arrow and output
  function uxvNull() {
    // set output to null
    $(`#uxvx_3`).val(null);
    $(`#uxvy_3`).val(null);
    $(`#uxvz_3`).val(null);
    // set arrow direction to null
    arrowuxv_x = null;
    arrowuxv_y = null;
    arrowuxv_z = null;
  }

  // GLOBALS
  var handRot_y = 0; // rotation values for the hand
  var handRot_x = 0;
  var handRot_z = 0;
  var betaRot = degreeToRad(90); // rotation of the middle finger
  var u_x = 1; // cartesian values for the u vector
  var u_y = 0;
  var u_z = 0;
  var u_r = 1; // spherical values
  var u_theta = 0;
  var u_phi = 0;
  var v_x = 0; // values for the v vector
  var v_y = 1;
  var v_z = 0;
  var v_r = 1; // spherical values
  var v_theta = 0;
  var v_phi = 0;
  var uxv_x = 0; // cartesian values for the uxv vector
  var uxv_y = 0;
  var uxv_z = 0;
  var uxv_x_dis = 0; // cartesian values for the uxv vector
  var uxv_y_dis = 0;
  var uxv_z_dis = 0;
  var arrowuxv_x = 0; // values for the uxv vector
  var arrowuxv_y = 0; // these are kept seperately, because the assigned values
  var arrowuxv_z = 0; // for the object are sometimes set to null to conceal
  var arrowuxv_r = 1; // the vector's value until the answer is solved for.
  var arrowuxv_theta = 0;
  var arrowuxv_phi = 0;
  var uxv_r = 0;

  // functions to randomly set the u and v vectors, respectively
  function ranUV() {
    u_x = Math.round(Math.random() * 20 - 10);
    u_y = Math.round(Math.random() * 20 - 10);
    u_z = Math.round(Math.random() * 20 - 10);

    if(u_x == 0 && u_y == 0 && u_z == 0) u_x = 1; // if, by extraordinary chance, the vector is set randomly to (0, 0, 0), default to (1, 0, 0)

    v_x = Math.round(Math.random() * 20 - 10);
    v_y = Math.round(Math.random() * 20 - 10);
    v_z = Math.round(Math.random() * 20 - 10);

    if(v_x == 0 && v_y == 0 && v_z == 0) v_x = 1;

    drawArrows();

    // arrowuxv_r = Math.sqrt(arrowuxv_x * arrowuxv_x + arrowuxv_y * arrowuxv_y + arrowuxv_z * arrowuxv_z); // find magnitude
    // arrowuxv_phi = (Math.PI / 2) - Math.acos(arrowuxv_z / arrowuxv_r); // find phi
    // if(arrowuxv_x != 0) arrowuxv_theta = Math.atan(arrowuxv_y / arrowuxv_x); // find theta
    // else arrowuxv_theta = Math.atan(-arrowuxv_y / 0.00001); // avoid dividing by 0
    // if(arrowuxv_x > 0) arrowuxv_theta -= Math.PI; // adjust values
    //
    // // set uxv label position
    // spriteuxv.position.set(-arrowuxv_x * 7 / arrowuxv_r, arrowuxv_z * 7 / arrowuxv_r + 1.25, arrowuxv_y * 7 / arrowuxv_r);
    //
    // arrow_uxv.rotation.set(0, 0, 0); // set rotation to default
    // arrow_uxv.rotateY(arrowuxv_theta); // then set it according to spherical values
    // arrow_uxv.rotateZ(arrowuxv_phi);

    uxvNull(); // conceal uxv vector until answer is found
  }

  // function to orientate the vector arrows
  function drawArrows() {
    u_r = Math.sqrt(u_x * u_x + u_y * u_y + u_z * u_z); // find u_r
    u_phi = (Math.PI / 2) - Math.acos(u_z / u_r); // find u_phi
    if(u_x != 0) u_theta = Math.atan(u_y / u_x); // find u_theta
    else u_theta = Math.atan(-u_y / 0.00001); // avoid dividing by 0
    if(u_x > 0) u_theta -= Math.PI; // adjust values

    spriteu.position.set(-u_x * 7 / u_r, u_z * 7 / u_r + 1.25, u_y * 7 / u_r); // set position of the label

    arrow_u.rotation.set(0, 0, 0); // reset arrow rotation
    arrow_u.rotateY(u_theta); // then set it according to the spherical values
    arrow_u.rotateZ(u_phi);

    // same process for the v vector
    v_r = Math.sqrt(v_x * v_x + v_y * v_y + v_z * v_z);
    v_phi = (Math.PI / 2) - Math.acos(v_z / v_r);
    if(v_x != 0) v_theta = Math.atan(v_y / v_x);
    else v_theta = Math.atan(-v_y / 0.00001);
    if(v_x > 0) v_theta -= Math.PI;

    spritev.position.set(-v_x * 7 / v_r, v_z * 7 / v_r + 1.25, v_y * 7 / v_r);

    arrow_v.rotation.set(0, 0, 0);
    arrow_v.rotateY(v_theta);
    arrow_v.rotateZ(v_phi);

    calcUxV(); // calculate the values for the uxv vector

    arrowuxv_r = Math.sqrt(arrowuxv_x * arrowuxv_x + arrowuxv_y * arrowuxv_y + arrowuxv_z * arrowuxv_z); // find magnitude
    arrowuxv_phi = (Math.PI / 2) - Math.acos(arrowuxv_z / arrowuxv_r); // find phi
    if(arrowuxv_x != 0) arrowuxv_theta = Math.atan(arrowuxv_y / arrowuxv_x); // find theta
    else arrowuxv_theta = Math.atan(-arrowuxv_y / 0.00001); // avoid dividing by 0
    if(arrowuxv_x > 0) arrowuxv_theta -= Math.PI; // adjust values

    // set uxv label position
    spriteuxv.position.set(-arrowuxv_x * 7 / arrowuxv_r, arrowuxv_z * 7 / arrowuxv_r + 1.25, arrowuxv_y * 7 / arrowuxv_r);

    arrow_uxv.rotation.set(0, 0, 0); // set rotation to default
    arrow_uxv.rotateY(arrowuxv_theta); // then set it according to spherical  values
    arrow_uxv.rotateZ(arrowuxv_phi);
  }

  function animate() {
    requestAnimationFrame(animate);

    // set the rotation of the middle finger, according to input
    if(betaRot < degreeToRad(90)) { // if the rotation is less than 90 degrees,
      hand_1.skeleton.bones[2].rotation.set(0, 0, betaRot); // keep the finger straight
      hand_1.skeleton.bones[3].rotation.set(0, 0, 0);
    }
    else { // the finger bends more,
      hand_1.skeleton.bones[2].rotation.set(0, 0, degreeToRad(90)); // keep the first joint at 90,
      hand_1.skeleton.bones[3].rotation.set(0, 0, betaRot - degreeToRad(90)); // put the rest of the bend in the second joint
    }

    setaxispos(axis_sphere, camera_1); // put everything to do with the arrows between the camera and the hand
    setaxispos(arrow_u, camera_1);
    setaxispos(arrow_v, camera_1);
    setaxispos(arrow_uxv, camera_1);

    if(!autosolve) {
      // handling input
      $(`#thetaSlider_3`).on("input", function() { // when a slider is changed,
        handRot_y = degreeToRad($(`#thetaSlider_3`).val()); // set the hand rotation value (or other variable) associated with it
        $(`#thetaDisp_3`).val($(`#thetaSlider_3`).val());
      });
      $(`#thetaDisp_3`).on("input", function() { // when a text display is changed,
        handRot_y = degreeToRad($(`#thetaDisp_3`).val()); // set the value accordingly
        $(`#thetaSlider_3`).val($(`#thetaDisp_3`).val());
      });

      $(`#phiSlider_3`).on("input", function() {
        handRot_z = degreeToRad($(`#phiSlider_3`).val() - 90);
        $(`#phiDisp_3`).val($(`#phiSlider_3`).val());
      });
      $(`#phiDisp_3`).on("input", function() {
        handRot_z = degreeToRad($(`#phiDisp_3`).val() - 90);
        $(`#phiSlider_3`).val($(`#phiDisp_3`).val());
      });

      $(`#alphaSlider_3`).on("input", function() {
        handRot_x = degreeToRad($(`#alphaSlider_3`).val());
        $(`#alphaDisp_3`).val($(`#alphaSlider_3`).val());
      });
      $(`#alphaDisp_3`).on("input", function() {
        handRot_x = degreeToRad($(`#alphaDisp_3`).val());
        $(`#alphaSlider_3`).val($(`#alphaDisp_3`).val());
      });

      $(`#betaSlider_3`).on("input", function() {
        betaRot = degreeToRad($(`#betaSlider_3`).val());
        $(`#betaDisp_3`).val($(`#betaSlider_3`).val());
      });
      $(`#betaDisp_3`).on("input", function() {
        betaRot = degreeToRad($(`#betaDisp_3`).val());
        $(`#betaSlider_3`).val($(`#betaDisp_3`).val());
      });

      $(`#ux_3`).on("input", function() { // when the u or v vector are changed,
        u_x = $(`#ux_3`).val(); // set the value,
        uxvNull(); // reset the uxv vector
        drawArrows(); // redraw the arrow
      });
      $(`#uy_3`).on("input", function() {
        u_y = $(`#uy_3`).val();
        uxvNull();
        drawArrows();
      });
      $(`#uz_3`).on("input", function() {
        u_z = $(`#uz_3`).val();
        uxvNull();
        drawArrows();
      });

      $(`#vx_3`).on("input", function() {
        v_x = $(`#vx_3`).val();
        uxvNull();
        drawArrows();
      });
      $(`#vy_3`).on("input", function() {
        v_y = $(`#vy_3`).val();
        uxvNull();
        drawArrows();
      });
      $(`#vz_3`).on("input", function() {
        v_z = $(`#vz_3`).val();
        uxvNull();
        drawArrows();
      });

      $(`#ranButton`).on("click", function() { // when the randomize button is clicked,
        ranUV(); // randomize u and v,

        handRot_y = 0; // reset the hand to default
        handRot_x = 0;
        handRot_z = 0;
        betaRot = degreeToRad(90);
        camera_1.position.set(-16.4, 7, 16.4); // reset the camera
        camera_1.lookAt(0, 0, 0);
        $(`#thetaDisp_3`).val(0);
        $(`#thetaSlider_3`).val(0);
        $(`#phiDisp_3`).val(90);
        $(`#phiSlider_3`).val(90);
        $(`#alphaDisp_3`).val(0);
        $(`#alphaSlider_3`).val(0);
        $(`#betaDisp_3`).val(90);
        $(`#betaSlider_3`).val(90);
      });

      $(`#solveButton`).on("click", function() { // when the randomize button is clicked,
        autosolve = true;
        handRot_z = 0; // for some reason, the auto solve breaks if this value is set too far away from this value. This ensures that it works, although the animation is impacted negatively by the jump
      });
    }
    else {
      // if Theta not == goal, increment theta
      if(Math.abs(Math.abs(handRot_y - u_theta) - Math.PI) >= .05) {
        if(handRot_y > u_theta + Math.PI) handRot_y -= .025;
        else handRot_y += .025;
        $(`#thetaDisp_3`).val(radToDegree(handRot_y));
        $(`#thetaSlider_3`).val(radToDegree(handRot_y));
      }
      // else if Phi not == goal, increment phi
      else if(Math.abs(handRot_z + u_phi) >= .05) {
        if(handRot_z < u_phi) handRot_z -= .025;
        else handRot_z += .025;
        $(`#phiDisp_3`).val(radToDegree(handRot_z) + 90);
        $(`#phiSlider_3`).val(radToDegree(handRot_z) + 90);
      }
      // else if Alpha not == goal, increment alpha
      else {
        // position hand
        hand_1.position.set(0, 0, 0); // reset values to default in world space
        hand_1.rotation.set(0, 0, 0);
        hand_1.rotateY(handRot_y); // then rotate in local space in this particular order
        hand_1.rotateZ(handRot_z);
        hand_1.rotateX(handRot_x);

        hand_1.translateY(1); // change hand position in local space to use position as vector later

        if(Math.sqrt((uxv_x + hand_1.position.x) * (uxv_x + hand_1.position.x) + (uxv_y - hand_1.position.z) * (uxv_y - hand_1.position.z) + (uxv_z - hand_1.position.y) * (uxv_z - hand_1.position.y)) >= .1) {
          if(handRot_x >= Math.PI) handRot_x = -Math.PI;
          handRot_x += .05;
          $(`#alphaDisp_3`).val(radToDegree(handRot_x));
          $(`#alphaSlider_3`).val(radToDegree(handRot_x));
        }
        // else if Beta not == goal, increment beta
        else if(Math.abs(Math.acos(uDotV) - betaRot) >= .05) {
          if(Math.acos(uDotV) > betaRot) betaRot += .025;
          else betaRot -= .025;
          $(`#betaDisp_3`).val(radToDegree(betaRot));
          $(`#betaSlider_3`).val(radToDegree(betaRot));
        }
        // else autosolve = false
        else autosolve = false;

        hand_1.translateY(0); // return hand to proper position
      }
    }

    // setting the hand's rotation
    hand_1.position.set(0, 0, 0); // reset values to default in world space
    hand_1.rotation.set(0, 0, 0);
    hand_1.rotateY(handRot_y); // then rotate in local space in this particular order
    hand_1.rotateZ(handRot_z);
    hand_1.rotateX(handRot_x);

    hand_1.translateY(1); // change hand position in local space to use position as vector later

    // detecting progress in solving the exercise
    if(Math.abs(Math.abs(handRot_y - u_theta) - Math.PI) < .1) { // if the theta is correct,
      if(Math.abs(handRot_z + u_phi) < .1) { // and the phi is correct,
        if(Math.sqrt((uxv_x + hand_1.position.x) * (uxv_x + hand_1.position.x) + (uxv_y - hand_1.position.z) * (uxv_y - hand_1.position.z) + (uxv_z - hand_1.position.y) * (uxv_z - hand_1.position.y)) < .1) {
          // and the alpha rotation is correct,
          renderer_1.setClearColor(0x7f7fff); // set the background color
          // $(`#uxvx_3`).val(Math.round(uxv_x*100)/100); // reveal the uxv values
          // $(`#uxvy_3`).val(Math.round(uxv_y*100)/100);
          // $(`#uxvz_3`).val(Math.round(uxv_z*100)/100);
          $(`#uxvx_3`).val(uxv_x_dis); // reveal the uxv values
          $(`#uxvy_3`).val(uxv_y_dis);
          $(`#uxvz_3`).val(uxv_z_dis);
          arrowuxv_x = uxv_x; // reveal the uxv arrow
          arrowuxv_y = uxv_y;
          arrowuxv_z = uxv_z;

          arrowuxv_r = Math.sqrt(arrowuxv_x * arrowuxv_x + arrowuxv_y * arrowuxv_y + arrowuxv_z * arrowuxv_z); // recalculate the arrow's position
          arrowuxv_phi = (Math.PI / 2) - Math.acos(arrowuxv_z / arrowuxv_r);
          if(arrowuxv_x != 0) arrowuxv_theta = Math.atan(arrowuxv_y / arrowuxv_x);
          else arrowuxv_theta = Math.atan(-arrowuxv_y / 0.00001);
          if(arrowuxv_x > 0) arrowuxv_theta -= Math.PI;

          // position the label
          spriteuxv.position.set(-arrowuxv_x * 7 / arrowuxv_r, arrowuxv_z * 7 / arrowuxv_r + 1.25, arrowuxv_y * 7 / arrowuxv_r);

          arrow_uxv.rotation.set(0, 0, 0); // set arrow rotation to default
          arrow_uxv.rotateY(arrowuxv_theta); // then set it properly
          arrow_uxv.rotateZ(arrowuxv_phi);

          // find uDotV to check for beta correctness
          uDotV = (u_x * v_x + u_y * v_y + u_z * v_z) / (u_r * v_r);

          if(Math.abs(Math.acos(uDotV) - betaRot) < .1) { // if beta is correct
            renderer_1.setClearColor(0x6060ff); // set the background color
          }
        }
        else // if only up to phi is correct,
          renderer_1.setClearColor(0xa0a0ff);
      }
      else // if only theta is correct,
        renderer_1.setClearColor(0xc7c7ff);
    }
    else // if nothing is correct so far,
        renderer_1.setClearColor(0xffffff); // background to white

    // set hand position so that it rotates around the finger knuckles
    hand_1.translateX(1);
    hand_1.translateY(-2.6); // don't forget to undo the +1 from before!

    // if the corresponding values are set, set the sliders and displays to match
    // if(!isNaN(handRot_y)) $(`#thetaSlider_3`).val(radToDegree(handRot_y));
    // if(!isNaN(handRot_y)) $(`#thetaDisp_3`).val(radToDegree(handRot_y));
    //
    // if(!isNaN(handRot_z)) $(`#phiSlider_3`).val(radToDegree(handRot_z) + 90);
    // if(!isNaN(handRot_z)) $(`#phiDisp_3`).val(radToDegree(handRot_z) + 90);
    //
    // if(!isNaN(handRot_x)) $(`#alphaSlider_3`).val(radToDegree(handRot_x));
    // if(!isNaN(handRot_x)) $(`#alphaDisp_3`).val(radToDegree(handRot_x));
    //
    // if(!isNaN(betaRot)) $(`#betaSlider_3`).val(radToDegree(betaRot));
    // if(!isNaN(betaRot)) $(`#betaDisp_3`).val(radToDegree(betaRot));

    if(!isNaN(u_x)) $(`#ux_3`).val(u_x);
    if(!isNaN(u_y)) $(`#uy_3`).val(u_y);
    if(!isNaN(u_z)) $(`#uz_3`).val(u_z);

    if(!isNaN(v_x)) $(`#vx_3`).val(v_x);
    if(!isNaN(v_y)) $(`#vy_3`).val(v_y);
    if(!isNaN(v_z)) $(`#vz_3`).val(v_z);

    renderer_1.render(scene_1, camera_1); // render the scene
  }

  Promise.all([load1, load2, load3, load4]).then(animate).catch(function (err) {
    console.error(err);
  });

} );

//////////// sprite stuff

// function to make sprites based on string input
// function makeTextSprite(message, parameters) {
//   if(parameters === undefined) parameters = {}; // if there is no parameters input, set it to null set
//
//   var fontface = parameters.hasOwnProperty("fontface") ? // if entered parameters include the variable use that. Otherwise, set default
//     parameters["fontface"] : "Arial";
//
//   var fontsize = parameters.hasOwnProperty("fontsize") ?
//     parameters["fontsize"] : 18;
//
//   var borderThickness = parameters.hasOwnProperty("borderThickness") ?
//     parameters["borderThickness"] : 4;
//
//   // var borderColor = parameters.hasOwnProperty("borderColor") ?
//   //   parameters["borderColor"] : {r:0, g:0, b:0, a:1.0};
//   //
//   // var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
//   //   parameters["backgroundColor"] : {r:255, g:255, b:255, a:1.0};
//
//   var canvas = document.createElement('canvas'); // create a canvas to use for the sprite's texture
//
//   var context = canvas.getContext('2d');
//   context.font = "Italic " + fontsize + "px " + fontface;
//
//   // get size data
//   var metrics = context.measureText(message);
//   var textWidth = metrics.width;
//
//   // assign the background and border colors to the "context"
//   // // background color
//   // context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
//   //                           + backgroundColor.b + "," + backgroundColor.a + ")";
//   // // border color
//   // context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," +
//   //                             borderColor.b + "," + borderColor.a + ")";
//
//   context.lineWidth = borderThickness;
//
//   // text color
//   context.fillStyle = "rgba(0, 0, 0, 1.0)";
//
//   context.fillText(message, (canvas.width / 2) - textWidth / 2 + borderThickness, fontsize * .35 + borderThickness + canvas.height / 2);
//
//   // apply canvas as texture
//   var texture = new THREE.Texture(canvas);
//   texture.needsUpdate = true;
//
//   var spriteMaterial = new THREE.SpriteMaterial(
//     {map: texture, useScreenCoordinates: false});
//   var sprite = new THREE.Sprite(spriteMaterial);
//   sprite.scale.set(10, 5, 1.0);
//   return sprite;
// }

// function for making rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
