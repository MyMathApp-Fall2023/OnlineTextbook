$(document).ready( function() {
  // MAIN

  // standard globals
  var container, scene, camera, renderer, controls;

  // custom globals
  var video, videoImage, videoImageContext, videoTexture;

  // object globals
  var hand, loader, dLight, aLight;

  var hand_x = -15;
  var hand_y = 0;
  var hand_z = 60;

  init();
  animate();

  // FUNCTIONS

  function init() {
    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    var CANVAS_WIDTH = 180, CANVAS_HEIGHT = 300;
    var VIEW_ANGLE = 20, ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 0, 900);
    camera.lookAt(0, 0, 0);

    // RENDERER
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas_1'), antialias:true});
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

    // LIGHTS
    dLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dLight);
    dLight.position.set(-1, .5, 2)
    aLight = new THREE.AmbientLight(0xffffff, .3);
    scene.add(aLight);

    // OBJECTS
    // object variables
    hand = new THREE.Object3D();

    // object materials
    var hand_mat = new THREE.MeshPhongMaterial({color:0xff0000});

    // object loader
    var loader = new THREE.GLTFLoader();
    loader.load("models/hand04.gltf", function(gltf) {

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
        hand.position.set(hand_x, hand_y, hand_z);
        hand.rotation.set(Math.PI / 2, 0, Math.PI / 8);

        hand.skeleton.bones[2].rotation.set(0, 0, Math.PI / 2);
    		hand.skeleton.bones[8].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[9].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[11].rotation.set(0, 0, 1.75);
    		hand.skeleton.bones[12].rotation.set(0, 0, 1.75);

        // $(`#heightSlider_1`).val(0);
    } );

    // VIDEO
    video = document.createElement('video');
    video.src = 'graphics/StokesMovie2.mp4';
    video.load();
    video.play();

    videoImage = document.createElement('canvas');
    videoImage.width = 190;
    videoImage.height = 300;

    videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter; // ???

    var movieMaterial = new THREE.MeshBasicMaterial({map:videoTexture, side:THREE.DoubleSide});
    var movieGeometry = new THREE.PlaneGeometry(190, 300, 4, 4);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);

    scene.add(movieScreen);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
    video.play();

    hand.position.y = $(`#heightSlider_1`).val() * 200 / 180 - 110;
    hand.rotation.set(Math.PI / 2, 0, Math.PI / 8);
    hand.rotateY(Math.PI - ($(`#heightSlider_1`).val() * Math.PI / 180));

    if(document.getElementById(`showHand_1`).checked) hand.position.x = hand_x;
    else hand.position.x = 1000;
    // console.log("showHand_1 = " + document.getElementById(`showHand_1`).checked);
  }

  function render() {
    if(video.readyState === video.HAVE_ENOUGH_DATA) {
      videoImageContext.drawImage(video, 0, 0);
      if(videoTexture) videoTexture.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }
} );
