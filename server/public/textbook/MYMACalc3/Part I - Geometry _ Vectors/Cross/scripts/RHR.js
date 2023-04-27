$(document).ready( function() {

  // RENDERER
  var renderer_1 = new THREE.WebGLRenderer({canvas: document.getElementById('figure_1'), antialias: true});
    renderer_1.setClearColor(0xe0e0e0);
    renderer_1.setPixelRatio(window.devicePixelRatio);
    renderer_1.setSize(200, 200);

  // CAMERA
  var camera_1 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera_1.position.set(14, 14, 14);
    camera_1.lookAt(0, 0, 0);

  // SCENE
  var scene_1 = new THREE.Scene();

  // LIGHTS
  var dLight_1 = new THREE.DirectionalLight(0xffffff, 1);
  scene_1.add(dLight_1);
  var aLight_1 = new THREE.AmbientLight(0xffffff, .4);
  scene_1.add(aLight_1);

  // OBJECTS
  var hand_1 = new THREE.Object3D();
  var axis_1 = new THREE.Object3D();

  // CONTROLS
  var controls_1 = new THREE.OrbitControls(camera_1, renderer_1.domElement);
    controls_1.enableKeys = false;
    controls_1.zoomSpeed = 0.1;
    controls_1.minDistance = 23;
    controls_1.maxDistance = 27;

  // MATERIALS
  var material_1 = new THREE.MeshPhongMaterial({color:0xff0000});
  var flat_sphere =  new THREE.MeshBasicMaterial({color:0xf9f4ec});
  var flat_x = new THREE.MeshBasicMaterial({color:0x601a4a});
  var flat_y = new THREE.MeshBasicMaterial({color:0xee442f});
  var flat_z = new THREE.MeshBasicMaterial({color:0x63acbe});

  // LOADERS
  var loader = new THREE.GLTFLoader();
  function loadModel(model) {
    return new Promise(function (resolve) {
      loader.load(model, resolve);
    });
  }
  var load1 = loadModel("models/hand04.gltf").then(
    function(gltf) {

      gltf.scene.traverse(function(child) { // step thrpugh loaded scene
        if (child.isSkinnedMesh) { // find the skinned mesh
          child.geometry.computeFaceNormals(true);
          child.geometry.computeVertexNormals(true);
          child.material = material_1;
          child.material.flatShading = false;
          child.material.skinning = true;

          hand_1 = gltf.scene;
          hand_1.skeleton = child.skeleton; // assign the skeleton
        }
      } )
      scene_1.add(hand_1); // put hand in scene

      // position fingers
      hand_1.skeleton.bones[2].rotation.set(0, 0, 1.5);
  		hand_1.skeleton.bones[8].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[9].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[11].rotation.set(0, 0, 1.75);
  		hand_1.skeleton.bones[12].rotation.set(0, 0, 1.75);
  } );

  var load1a = loadModel("models/axis03.gltf").then(
    function(gltf) {
      var i = 0;
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          if(i == 0) child.material = flat_sphere;
          else if(i <= 2) child.material = flat_x;
          else if(i <= 4) child.material = flat_y;
          else child.material = flat_z;

          i++;
        } } );

      axis_1 = gltf.scene;

      scene_1.add(axis_1);
      axis_1.scale.set(.2, .2, .2);
      axis_1.rotation.set(0, Math.PI / 2, 0);

      var spriteu = makeTextSprite("u", {fontface: "Georgia", fontsize: 38});
      axis_1.add(spriteu);
      spriteu.position.set(0,1,-9);
      var spritev = makeTextSprite("v", {fontface: "Georgia", fontsize: 38});
      axis_1.add(spritev);
      spritev.position.set(-9,1,0);
      var spriteuxv = makeTextSprite("u x v", {fontface: "Georgia", fontsize: 38});
      axis_1.add(spriteuxv);
      spriteuxv.position.set(-2,7,-1);
    } );

  function setaxispos(axis, camera) { // function to keep arrows in position in front of camera
    // this allows arrows to show up over the hand from every direction
    axis.position.set(3/4 * camera.position.x, 3/4 * camera.position.y, 3/4 * camera.position.z);
  }

  ///////// FIGURE 2

  // RENDERER
  var renderer_2 = new THREE.WebGLRenderer({canvas: document.getElementById('figure_2'), antialias: true});
    renderer_2.setClearColor(0xe0e0e0);
    renderer_2.setPixelRatio(window.devicePixelRatio);
    renderer_2.setSize(200, 200);

  // CAMERA
  var camera_2 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera_2.position.set(14, 14, 14);
    camera_2.lookAt(0, 0, 0);

  // CONTROLS
  controls_2 = new THREE.OrbitControls(camera_2, renderer_2.domElement);
    controls_2.enableKeys = false;
    controls_2.zoomSpeed = 0.75;
    controls_2.minDistance = 23;
    controls_2.maxDistance = 27;

  // SCENE
  var scene_2 = new THREE.Scene();

  // LIGHTS
  var dLight_2 = new THREE.DirectionalLight(0xffffff, 1);
  scene_2.add(dLight_2);
  var dLight_2b = new THREE.DirectionalLight(0xffffff, .2);
  scene_2.add(dLight_2b);
  dLight_2b.position.set(14, 10, 12);
  var aLight_2 = new THREE.AmbientLight(0xffffff, .4);
  scene_2.add(aLight_2);

  // OBJECTS
  var hand_2 = new THREE.Object3D();

  // MATERIALS
  var material_2 = new THREE.MeshPhongMaterial({color:0xff0000});

  // LOADERS
  var load2 = loadModel("models/hand04.gltf").then(
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isSkinnedMesh) {
          child.geometry.computeFaceNormals(true);
          child.geometry.computeVertexNormals(true);
          child.material = material_1;
          child.material.flatShading = false;
          child.material.skinning = true;

          hand_2 = gltf.scene;
          hand_2.skeleton = child.skeleton;
        }
      } );
      scene_2.add(hand_2);
  } );

  var spriteuxv2;
  var load2a = loadModel("models/axis03.gltf").then(
    function(gltf) {
      var i = 0;
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          if(i == 0) child.material = flat_sphere;
          else if(i <= 2) child.material = flat_x;
          else if(i <= 4) child.material = flat_y;
          else child.material = flat_z;

          i++;
        } } );

      axis_2 = gltf.scene;

      scene_2.add(axis_2);
      axis_2.scale.set(.2, .2, .2);
      axis_2.rotation.set(0, Math.PI / 2, 0);

      var spriteu2 = makeTextSprite("u", {fontface: "Georgia", fontsize: 38});
      axis_2.add(spriteu2);
      spriteu2.position.set(0,1,-9);
      var spritev2 = makeTextSprite("v", {fontface: "Georgia", fontsize: 38});
      axis_2.add(spritev2);
      spritev2.position.set(-9,1,0);
      spriteuxv2 = makeTextSprite("u x v", {fontface: "Georgia", fontsize: 38});
      axis_2.add(spriteuxv2);
      spriteuxv2.position.set(-2,7,-1);
    } );

  var time = 0; // variable to facilitate animation

  function animate() {
    requestAnimationFrame(animate);

    setaxispos(axis_1, camera_1); // keep the axis in between the camera and the hand
    setaxispos(axis_2, camera_2); // keep the axis in between the camera and the hand

    if(time == 90) {
      spriteuxv2.position.set(-2,7,-1);
      var i = 0;
      axis_2.traverse(function(child) {
        if(child.isMesh && i == 4) child.position.set(0,0,0);
        i++;
      } );
    }

    if(time == 0 || time == 120) {
      spriteuxv2.position.set(10000,10000,10000);
      var i = 0;
      axis_2.traverse(function(child) {
        if(child.isMesh && i == 4) child.position.set(10000,10000,10000);
        i++;
      } );
    }

    if(hand_2 != null) { // once the second hand has loaded,
      if(time < 90) { // for the first 90 ticks
        for(i = 2; i < 12; i += 3) { // go through the skeleton and increment the proper joints
          hand_2.skeleton.bones[i].rotation.z += .015;
          hand_2.skeleton.bones[i+1].rotation.z += .015;
        }
      }
      else if(time >= 120 && time < 210) { // return to start
        for(i = 2; i < 12; i += 3) { // go through and decrement joints
          hand_2.skeleton.bones[i].rotation.z -= .015;
          hand_2.skeleton.bones[i+1].rotation.z -= .015;
        }
      }

      if(time >= 240) time = 0;
      else time++;
    }

    // render the scenes
    renderer_1.render(scene_1, camera_1);
    renderer_2.render(scene_2, camera_2);
  }

  Promise.all([load1, load1a, load2, load2a]).then(animate).catch(function (err) {
    console.error(err);
  });
});
