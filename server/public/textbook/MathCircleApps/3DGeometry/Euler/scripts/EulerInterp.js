$(document).ready( function() {
  // VARIABLES
  var mode = 0;

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("euler_1"), antialias: true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(350, 350);

  // SCENE
  var scene = new THREE.Scene();
  var scene_2 = new THREE.Scene();

  // CAMERA
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.set(2.5,2.5,5);
    camera.lookAt(0,0,0);

  var camera_2 = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100);
    camera_2.position.set(5,-6,10);
    camera_2.lookAt(5,-8.5,0);

  // LIGHTS
  var aLight = new THREE.AmbientLight(0xe0e0e0, 1.5);
    scene.add(aLight);
  var aLight_2 = new THREE.AmbientLight(0xe0e0e0, .3);
    scene_2.add(aLight_2);
  // var dLight = new THREE.DirectionalLight(0xffffff, 1);
  //   dLight.position.set(-10, 20, 15);
  //   scene.add(dLight);
  var dLight_2 = new THREE.DirectionalLight(0xffffff, 1);
    dLight_2.position.set(-10, 20, 15);
    scene_2.add(dLight_2);
  // var bLight = new THREE.DirectionalLight(0xff3333, .6);
  //   bLight.position.set(10, -5, -5);
  //   scene.add(bLight);
  var bLight_2 = new THREE.DirectionalLight(0xff3333, .6);
    bLight_2.position.set(10, -5, -5);
    scene_2.add(bLight_2);

  // MATERIALS
  // var matEdge = new THREE.LineBasicMaterial({color: "#000"});
  var matObject = new THREE.MeshLambertMaterial({color: "#0ff"});
  // var matFace = new THREE.MeshLambertMaterial({color: "#0ff"});
  // var matFaceClicked = new THREE.MeshLambertMaterial({color: "#999"});
  // var matEdge = new THREE.MeshLambertMaterial({color: "#f0f"});
  // var matEdgeClicked = new THREE.MeshLambertMaterial({color: "#555"});
  // var matVert = new THREE.MeshLambertMaterial({color: "#ff0"});
  // var matVertClicked = new THREE.MeshLambertMaterial({color: "#888"});
  var matFace = new THREE.MeshLambertMaterial({color: "#009e73"});
  var matFaceClicked = new THREE.MeshLambertMaterial({color: "#cc79a7"});
  var matEdge = new THREE.MeshLambertMaterial({color: "#f0e442"});
  var matEdgeClicked = new THREE.MeshLambertMaterial({color: "#0072b2"});
  var matVert = new THREE.MeshLambertMaterial({color: "#d55e00"});
  var matVertClicked = new THREE.MeshLambertMaterial({color: "#56b4e9"});
  var matInvisible = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});

  // OBJECTS
  var loader = new THREE.GLTFLoader();

  var thedron_symbol = new THREE.Object3D();
  thedron_symbol.name = "thedron";
  loader.load(
    "models/Tetrahedron_estimate.gltf",
    gltf => {
    thedron_symbol = gltf.scene;
    thedron_symbol.children[0].material = matObject;

    scene_2.add(thedron_symbol);
    thedron_symbol.position.set(-4,0,0);
  });
  var thedron = new THREE.Object3D();
  var shape = new THREE.Object3D();
  loader.load(
    "models/TetrahedronParts.gltf",
    gltf => {
    thedron = gltf.scene;
    for(i in thedron.children) {
      switch(Number(i)) {
        case 0: case 6: case 7: case 8: case 9: case 10:
          thedron.children[i].material = matEdge;
        break;

        case 1: case 3: case 4: case 5:
          thedron.children[i].material = matVert;
        break;

        case 2: case 11:  case 12:  case 13:
          thedron.children[i].material = matFace;
        break;
      }
    }
    shape = thedron.clone();
    scene.add(shape);
  });

  var cube_symbol = new THREE.Object3D();
  cube_symbol.name = "cube";
  loader.load(
    "models/cube.gltf",
    gltf => {
    cube_symbol = gltf.scene;
    cube_symbol.children[0].material = matObject;

    scene_2.add(cube_symbol);
    cube_symbol.position.set(-2,0,0);
  });
  var cube = new THREE.Object3D();
  loader.load(
    "models/CubeParts.gltf",
    gltf => {
    cube = gltf.scene;
    for(i in cube.children) {

      switch(Number(i)) {
        case 0: case 9: case 10: case 11: case 12:  case 13:
        case 14: case 15: case 16: case 17: case 18: case 19:
          cube.children[i].material = matEdge;
        break;

        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
          cube.children[i].material = matVert;
        break;

        case 20: case 21: case 22: case 23: case 24: case 25:
          cube.children[i].material = matFace;
        break;
      }
    }
  });

  var ohedron_symbol = new THREE.Object3D();
  ohedron_symbol.name = "ohedron";
  loader.load(
    "models/Octahedron.gltf",
    gltf => {
    ohedron_symbol = gltf.scene.children[0];
    ohedron_symbol.material = matObject;

    scene_2.add(ohedron_symbol);
    ohedron_symbol.scale.set(1.5,1.5,1.5);
    ohedron_symbol.position.set(0,0,0);
  });
  var ohedron = new THREE.Object3D();
  loader.load(
    "models/OctahedronParts.gltf",
    gltf => {
    ohedron = gltf.scene;
    for(i in ohedron.children) {

      switch(Number(i)) {
        case 0: case 8: case 9: case 10: case 11: case 12:
        case 13: case 14: case 15: case 16: case 17: case 18:
          ohedron.children[i].material = matEdge;
        break;

        case 1: case 3: case 4: case 5: case 6: case 7:
          ohedron.children[i].material = matVert;
        break;

        case 2: case 19: case 20: case 21: case 22: case 23: case 24: case 25:
          ohedron.children[i].material = matFace;
        break;
      }
    }
  });

  var ihedron_symbol = new THREE.Object3D();
  var thedron_button = new THREE.Object3D();
  var cube_button = new THREE.Object3D();
  loader.load(
    "models/Icosahedron.gltf",
    gltf => {
    ihedron_symbol = gltf.scene.children[0];
    thedron_button = ihedron_symbol.clone();
    cube_button = ihedron_symbol.clone();
    ihedron_symbol.material = matObject;
    thedron_button.material = matInvisible;
    cube_button.material = matInvisible;

    scene_2.add(ihedron_symbol);
    scene_2.add(thedron_button);
    scene_2.add(cube_button);

    ihedron_symbol.position.set(2,0,0);
    thedron_button.position.set(-4,0,0);
    cube_button.position.set(-2,0,0);
  });
  var ihedron = new THREE.Object3D();
  loader.load(
    "models/IcosahedronParts.gltf",
    gltf => {
    ihedron = gltf.scene;
    for(i in ihedron.children) {

      switch(Number(i)) {
        case 0: case 43: case 44: case 45: case 46: case 47:
        case 48: case 49: case 50: case 51: case 52: case 53:
        case 54: case 55: case 56: case 57: case 58: case 59:
        case 60: case 61:
          ihedron.children[i].material = matFace;
        break;

        case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        case 8: case 9: case 10: case 11: case 12: case 13: case 14:
        case 15: case 16: case 17: case 18: case 19: case 20: case 21:
        case 22: case 23: case 24: case 25: case 26: case 27:
        case 28: case 29: case 30:
          ihedron.children[i].material = matEdge;
        break;

        case 31: case 32: case 33: case 34: case 35: case 36:
        case 37: case 38: case 39: case 40: case 41: case 42:
          ihedron.children[i].material = matVert;
        break;
      }
    }
  });

  var dhedron_symbol = new THREE.Object3D();
  dhedron_symbol.name = "dhedron";
  loader.load(
    "models/Dodecahedron.gltf",
    gltf => {
    dhedron_symbol = gltf.scene.children[0];
    dhedron_symbol.material = matObject;

    scene_2.add(dhedron_symbol);
    dhedron_symbol.position.set(4,0,0);
  });
  var dhedron = new THREE.Object3D();
  loader.load(
    "models/DodecahedronParts.gltf",
    gltf => {
    dhedron = gltf.scene;
    for(i in dhedron.children) {

      switch(Number(i)) {
        case 50: case 51: case 52: case 53: case 54: case 55:
        case 56: case 57: case 58: case 59: case 60: case 61:
          dhedron.children[i].material = matFace;
        break;

        case 0: case 21: case 22: case 23: case 24: case 25: case 26:
        case 27: case 28: case 29: case 30: case 31: case 32: case 33:
        case 34: case 35: case 36: case 37: case 38: case 39: case 40:
        case 41: case 42: case 43: case 44: case 45: case 46: case 47:
        case 48: case 49:
          dhedron.children[i].material = matEdge;
        break;

        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
        case 9: case 10: case 11: case 12: case 13: case 14: case 15:
        case 16: case 17: case 18: case 19: case 20:
          dhedron.children[i].material = matVert;
        break;
      }
    }
  });

  // FUNCTIONS
  function selectShape(newShape) {
    switch(Number(newShape.position.x)) {
      case -4:
        scene.remove(shape);
        shape = thedron.clone();
        scene.add(shape);
        mode = 0;
      break;
      case -2:
        scene.remove(shape);
        shape = cube.clone();
        scene.add(shape);
        mode = 1;
      break;
      case 0:
        scene.remove(shape);
        shape = ohedron.clone();
        scene.add(shape);
        mode = 2;
      break;
      case 2:
        scene.remove(shape);
        shape = ihedron.clone();
        scene.add(shape);

        mode = 3;
      break;
      case 4:
        scene.remove(shape);
        shape = dhedron.clone();
        scene.add(shape);
        mode = 4;
      break;
    }
    $('#edgeCount').val(0);
    $('#vertCount').val(0);
    $('#faceCount').val(0);
    $('#eulerCount').val("");
  }

  // CONTROLS
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    controls.enablePan = false;
    controls.enableZoom = false;

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersections = [];
  document.getElementById("euler_1").addEventListener('mousedown', function() {

    mouse.x = ((event.clientX - $("#euler_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -((event.clientY - $("#euler_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse, camera_2);

    intersections = raycaster.intersectObjects(scene_2.children);
    if(intersections.length > 0) {selectShape(intersections[0].object);
      console.log(intersections[0].object.name);
    }
    else {
      raycaster.setFromCamera(mouse, camera);
      console.log("ping 1")

      intersections = raycaster.intersectObjects(shape.children);
      if(intersections.length > 0) {
        if(intersections[0].object.material == matEdge) {
          intersections[0].object.material = matEdgeClicked;
          let val = Number($('#edgeCount').val()) + 1;
          $('#edgeCount').val(val);
        }
        else if(intersections[0].object.material == matVert) {
          intersections[0].object.material = matVertClicked;
          let val = Number($('#vertCount').val()) + 1;
          $('#vertCount').val(val);
        }
        else if(intersections[0].object.material == matFace) {
          intersections[0].object.material = matFaceClicked;
          let val = Number($('#faceCount').val()) + 1;
          $('#faceCount').val(val);
        }

        switch(mode) {
          case 0:
            checkFinished(4,6,4);
          break;

          case 1:
            checkFinished(8,12,6);
          break;

          case 2:
            checkFinished(6,12,8);
          break;

          case 3:
            checkFinished(20,30,12);
          break;

          case 4:
            checkFinished(12,30,20);
          break;
        }
      }
    }
  }, false);

  function checkFinished(vTarget, eTarget, fTarget) {
    if($('#vertCount').val() == vTarget && $('#edgeCount').val() == eTarget && $('#faceCount').val() == fTarget)
      $('#eulerCount').val(vTarget - eTarget + fTarget);
  }

  // INIT
  $('#edgeCount').val(0);
  $('#vertCount').val(0);
  $('#faceCount').val(0);

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(scene_2, camera_2);
  }
  animate();
});
