$(document).ready( function() {
  // MAIN

  // standard globals
  var container, scene, camera, renderer, controls;

  // custom globals
  var video, videoImage, videoImageContext, videoTexture;

  // object globals
  var hand, loader, load1, load2, load3, dLight, aLight;

  init();
  Promise.all([load1, load2, load3]).then(animate);

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
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas_1'), antialias:true});
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

        $(`#xSlider`).val(-44);
        $(`#heightSlider_1`).val(25);
    } );

    load2 = loadModel("models/8thSphere_v02.gltf").then( function(gltf) {
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

      arrow4 = arrow1.clone();
      arrow4.traverse(function(child){if(child.isMesh) child.material = stillArrow_mat});
      arrow4.translateX(124);
      arrow4.rotateY(-Math.PI/6);
      arrow4.rotateX(-Math.PI/4);
      arrow4.position.set(40,62,124);

      scene.add(arrow1);
      scene.add(arrow2);
      scene.add(arrow3);
      scene.add(arrow4);
      arrowcount = 0;
    } );

    document.getElementById("showHand_1").checked = false;
    document.getElementById("showHand_1").addEventListener("change", function() {
      if(!document.getElementById(`showHand_1`).checked) {
        document.getElementById("xSlider").style.visibility = "hidden";
        document.getElementById("heightSlider_1").style.visibility = "hidden";
      }
      else {
        document.getElementById("xSlider").style.visibility = "visible";
        document.getElementById("heightSlider_1").style.visibility = "visible";
      }
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    render();

    opp = ($(`#heightSlider_1`).val() - 45) / 45.0;
    adj = (45 + Number($(`#xSlider`).val())) / 50.0;
    theta = Math.atan2(opp, adj);

    hand.position.set(-12.5, 0, 10);
    hand.rotation.set(0, $(`#xSlider`).val() * Math.PI / 180, 0);
    hand.rotateX(-$(`#heightSlider_1`).val() * Math.PI / 180);
    hand.translateZ(135);
    hand.rotateX(Math.PI / 2);
    hand.rotateY(theta - Math.PI / 2);

    if(!document.getElementById(`showHand_1`).checked) hand.scale.set(0.1, 0.1, 0.1);
    else hand.scale.set(6, 6, 6);

    arrow1.rotateY(-arrowcount);
    arrow2.rotateY(-arrowcount);
    arrow3.rotateY(-arrowcount);
    arrowcount += Math.PI/200;
    if(arrowcount >= Math.PI/2 + Math.PI/200) arrowcount = 0;
    arrow1.rotateY(arrowcount);
    arrow2.rotateY(arrowcount);
    arrow3.rotateY(arrowcount);
  }

  function render() {
    renderer.render(scene, camera);
  }
} );
