$(document).ready( function() {
  // MAIN

  // standard globals
  var container, scene, camera, renderer;

  // custom globals
  var video, videoImage, videoImageContext, videoTexture;

  // object globals
  var hand, loader, load, dLight, aLight;

  init();
  Promise.all([load]).then(animate);

  // FUNCTIONS

  function init() {
    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    var CANVAS_WIDTH = 200, CANVAS_HEIGHT = 300;
    var VIEW_ANGLE = 20, ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 0, 900);
    camera.lookAt(0, 0, 0);

    // RENDERER
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas_cylinder'), antialias:true});
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

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

    // object loader
    var loader = new THREE.GLTFLoader();
    function loadModel(model/*: string*/)/*: Promise<GLTF>*/ {
      return new Promise(function (resolve) {
        loader.load(model, resolve);
      });
    }
    load = loadModel("models/hand04.gltf").then( function(gltf) {

        gltf.scene.traverse(function(child) {
          if (child.isSkinnedMesh) {
            child.material = hand_mat;
            child.material.skinning = true;

            hand = gltf.scene;
            hand.skeleton = child.skeleton;
          }
        } )
        scene.add(hand);
        // console.log("hand added");
        hand.scale.set(6, 6, 6);
        hand.rotation.set(Math.PI / 2, 0, Math.PI / 8);

        hand.skeleton.bones[2].rotation.set(0, 0, Math.PI / 2);
    		hand.skeleton.bones[8].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[9].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[11].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[12].rotation.set(0, 0, 1.75);

        $(`#horiSlider_cylinder`).val(-20);
        $(`#vertSlider_cylinder`).val(90);
    } );

    // VIDEO
    video = document.createElement('video');
    video.src = 'graphics/thm_cyl_arrows_anim.mp4';
    video.load();
    video.play();

    videoImage = document.createElement('canvas');
    videoImage.width = 400;
    videoImage.height = 400;

    videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#ffffff';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter; // ???

    var movieMaterial = new THREE.MeshBasicMaterial({map:videoTexture, side:THREE.DoubleSide});
    var movieGeometry = new THREE.PlaneGeometry(465, 465, 1, 1);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen.position.set(120,-85,0);

    scene.add(movieScreen);

    document.getElementById(`showHand_cylinder`).checked = false
    document.getElementById("showHand_cylinder").addEventListener("change", function() {
      if(!document.getElementById(`showHand_cylinder`).checked) {
        document.getElementById("horiSlider_cylinder").style.visibility = "hidden";
        document.getElementById("vertSlider_cylinder").style.visibility = "hidden";
      }
      else {
        document.getElementById("horiSlider_cylinder").style.visibility = "visible";
        document.getElementById("vertSlider_cylinder").style.visibility = "visible";
      }
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
    video.play();

    hand.position.set(-12.5, $(`#vertSlider_cylinder`).val() * 200 / 180 - 110, 10);
    hand.rotation.set(0, $(`#horiSlider_cylinder`).val() * Math.PI / 180, 0);
    hand.translateZ(70);
    hand.rotateX(Math.PI / 2);
    hand.rotateY(Math.PI - ($(`#vertSlider_cylinder`).val() * Math.PI / 180));

    if(!document.getElementById(`showHand_cylinder`).checked) hand.position.x += 1000;
  }

  function render() {
    if(video.readyState === video.HAVE_ENOUGH_DATA) {
      videoImageContext.drawImage(video, 0, 0);
      if(videoTexture) videoTexture.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }
} );
