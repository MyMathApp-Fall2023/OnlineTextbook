$(document).ready( function() {
  // MAIN

  // standard globals
  var container, scene, camera, renderer, controls;

  // custom globals
  var video, videoImage, videoImageContext, videoTexture;

  // object globals
  var hand, loader, load1, load2, load3, load4, dLight, aLight;

  init();
  Promise.all([load1, load2, load3, load4]).then(animate);

  // FUNCTIONS

  function init() {
    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    var CANVAS_WIDTH = 300, CANVAS_HEIGHT = 300;
    var VIEW_ANGLE = 20, ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(-690, 420, 240);
    camera.lookAt(-50, 50, 50);

    // RENDERER
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas_8thSphereHole'), antialias:true});
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.setClearColor(0xffffff);

    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    controls.enableZoom = false;
    controls.target = new THREE.Vector3(-50,50,50);
    controls.update();

    // LIGHTS
    dLight = new THREE.DirectionalLight(0xffffff, .5);
    scene.add(dLight);
    dLight.position.set(-1, .5, 2)
    aLight = new THREE.AmbientLight(0xffffff, .6);
    scene.add(aLight);

    // OBJECTS
    // object variables
    hand = new THREE.Object3D();

    // object materials
    var hand_mat = new THREE.MeshPhongMaterial({color:0xff0000});
    var movingArrow_mat = new THREE.MeshPhongMaterial({color:0xff0000});
    var stillArrow_mat = new THREE.MeshPhongMaterial({color:0x0000ff});
    var circleArrow_mat = new THREE.MeshPhongMaterial({color:0xffff00});

    // object loader
    var loader = new THREE.GLTFLoader();
    function loadModel(model/*: string*/)/*: Promise<GLTF>*/ {
      return new Promise(function (resolve) {
        loader.load(model, resolve);
      });
    }
    load1 = loadModel("models/hand04.gltf").then( function(gltf) {

        gltf.scene.traverse(function(child) {
          if (child.isSkinnedMesh) {
            child.material = hand_mat;
            child.material.skinning = true;

            hand = gltf.scene;
            hand.skeleton = child.skeleton;
          }
        } )
        scene.add(hand);
        hand.scale.set(6, 6, 6);
        hand.rotation.set(Math.PI / 2, 0, Math.PI / 8);

        hand.skeleton.bones[2].rotation.set(0, 0, Math.PI / 2);
    		hand.skeleton.bones[8].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[9].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[11].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[12].rotation.set(0, 0, 1.75);

        $(`#horiSlider_8thSphereHole`).val(-44);
        $(`#vertSlider_8thSphereHole`).val(25);
    } );

    load2 = loadModel("models/8thSphere_holeV06.gltf").then( function(gltf) {
        shell = gltf.scene;
        scene.add(shell);
        shell.scale.set(124, 124, 124);
        shell.position.set(0, 0, 0);
    } );

    load3 = loadModel("models/quarterSphereArrow.gltf").then( function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = movingArrow_mat;
        }
      } )
      arrow1 = gltf.scene;
      arrow1.scale.set(124, 124, 124);
      arrow2 = arrow1.clone();
      arrow2.rotateX(Math.PI/2);
      arrow2.rotateY(-Math.PI/2);
      arrow3 = arrow1.clone();
      arrow3.rotateX(-Math.PI/2);
      arrow3.rotateZ(Math.PI/2);

      scene.add(arrow1);
      scene.add(arrow2);
      scene.add(arrow3);
      arrowcount = 0;
    } );

    load4 = loadModel("models/8thSphereArrow_unadjusted.gltf").then( function(gltf) {
      gltf.scene.traverse(function(child) {
        if(child.isMesh) {
          child.material = stillArrow_mat;
        }
      })
      arrow4 = gltf.scene;
      arrow4.scale.set(124, 124, 124);
      arrow5 = arrow4.clone();
      arrow4.position.set(-40, 42, 130);
      arrow4.rotateY(-Math.PI/9);
      arrow4.rotateX(-Math.PI/16);

      arrow5.traverse(function(child) {
        if(child.isMesh) {
          child.material = circleArrow_mat;
        }
      })
      arrow5.rotateY(-3*Math.PI/4);
      arrow5.position.set(-95,47,67);
      arrow6 = arrow5.clone();
      arrow7 = arrow5.clone();

      rotPoint = new THREE.Object3D();
      rotPoint.position.set(-75,65,75);

      rotPoint.attach(arrow7);
      circleAxis = new THREE.Vector3(-75,65,75).normalize();
      m = new THREE.Matrix4();
      var angle = 2*Math.PI/3;
      m.makeRotationAxis(circleAxis, angle);
      rotPoint.rotation.setFromRotationMatrix(m);
      rotPoint.attach(arrow6);

      angle = 4*Math.PI/3;
      m.makeRotationAxis(circleAxis, angle);
      rotPoint.rotation.setFromRotationMatrix(m);
      rotPoint.attach(arrow5);

      scene.add(arrow4);
      scene.add(rotPoint);
      circleAngle = 0;
    } );

    document.getElementById(`showHand_8thSphereHole`).checked = false
    document.getElementById("showHand_8thSphereHole").addEventListener("change", function() {
      if(!document.getElementById(`showHand_8thSphereHole`).checked) {
        document.getElementById("horiSlider_8thSphereHole").style.visibility = "hidden";
        document.getElementById("vertSlider_8thSphereHole").style.visibility = "hidden";
      }
      else {
        document.getElementById("horiSlider_8thSphereHole").style.visibility = "visible";
        document.getElementById("vertSlider_8thSphereHole").style.visibility = "visible";
      }
    });
  }

  var oldOpp = 0;
  var oldAdj = 0;
  var cOpp = 0;
  var cAdj = 0;

  function animate() {
    requestAnimationFrame(animate);
    render();

    let radius = 15;
    let center = new THREE.Vector2(-45,35);
    let vert = $(`#vertSlider_8thSphereHole`).val();
    let hori = Number($(`#horiSlider_8thSphereHole`).val());
    let dist = Math.pow(Math.pow((hori-center.x),2) + Math.pow((vert-center.y),2), 0.5);
    if(dist < radius) {
     let vec = new THREE.Vector2(hori-center.x,vert-center.y).normalize();
     hori = center.x+(vec.x*radius);
     vert = center.y+(vec.y*radius);
    }

    // fc - mix - fs
    let fc = 17; // f(ocus)c(ircle): hand acts according to circle 17
    let fs = 35; // f(ocus)s(shape): hand acts according to shape 35
    let adjust = (1-Math.max(Math.min((dist-fc)/(fs-fc), 1),0));

    opp = (vert - 45) / 45.0;
    adj = (45 + hori) / 50.0;
    thetaS = Math.atan2(opp, adj);
    oppC = (vert - 35) / 45.0;
    adjC = (50 + hori) / 50.0;
    // thetaC = Math.atan2(oppC, adjC) - Math.PI;
    thetaC = ((Math.atan2(oppC, adjC) + 2*Math.PI)%(2*Math.PI))-Math.PI;
    theta = thetaC*adjust + thetaS*(1-adjust);
    // console.log(theta + " : " + thetaS + " : " + thetaC);


    // get slider values
    // if inside hole, jump to closest point on edge of hole
    // calculate opp and adj
    // manipulate rotation based on proximity to hole or edge

    hand.position.set(-12.5, 0, 10);
    hand.rotation.set(0, hori * Math.PI / 180, 0);
    hand.rotateX(-vert * Math.PI / 180);
    hand.translateZ(135);
    hand.rotateX(Math.PI / 2);
    hand.rotateY(theta - Math.PI / 2);

    if(!document.getElementById(`showHand_8thSphereHole`).checked) hand.scale.set(0.1, 0.1, 0.1);
    else hand.scale.set(6, 6, 6);

    arrow1.rotateY(-arrowcount);
    arrow2.rotateY(-arrowcount);
    arrow3.rotateY(-arrowcount);
    arrowcount += Math.PI/200;
    if(arrowcount >= Math.PI/2 + Math.PI/200) arrowcount = 0;
    arrow1.rotateY(arrowcount);
    arrow2.rotateY(arrowcount);
    arrow3.rotateY(arrowcount);

    circleAngle += Math.PI/100;
    if(circleAngle >= 2*Math.PI/3) circleAngle = 0;
    m.makeRotationAxis(circleAxis, -circleAngle);
    rotPoint.rotation.setFromRotationMatrix(m);
  }

  function render() {
    renderer.render(scene, camera);
  }
} );
