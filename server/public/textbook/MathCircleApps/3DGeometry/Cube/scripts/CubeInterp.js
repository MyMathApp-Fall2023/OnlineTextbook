$(document).ready( function() {
  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("cube_1"), antialias: true});
    // renderer.setClearColor(0xe0e0e0);
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(350, 350);

  // SCENE
  var scene = new THREE.Scene();

  // CAMERA
  // var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
  var camera = new THREE.OrthographicCamera(-3.5, 3.5, 3.5, -3.5, 0.1, 100);
    camera.position.set(10,11,15);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();

  // LIGHTS
  var dLight = new THREE.DirectionalLight(0xffffff, .6);
    dLight.position.set(0,.5,1);
    scene.add(dLight);
  var aLight = new THREE.AmbientLight(0xffffff, .6);
    scene.add(aLight);

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matOffBlack = new THREE.MeshBasicMaterial({color: "#333"});
  var matRed = new THREE.MeshBasicMaterial({color: "#f00"});
  var matBlue = new THREE.MeshBasicMaterial({color: "#00f"});
  var matCCW = new THREE.MeshBasicMaterial({color: 0x5371d7});
  var matCW = new THREE.MeshBasicMaterial({color: 0xf273b3});
  var matLine = new THREE.LineBasicMaterial({color: "#000"});
  var matInvisible = new THREE.LineBasicMaterial({transparent: true, opacity: 0});
  var matGrey = new THREE.MeshBasicMaterial({color: "#050"});
  var matAxis = new THREE.LineBasicMaterial({color: 0x00cc00});
  var matShading = new THREE.MeshLambertMaterial({color: "#ccc"});
    matShading.side = THREE.BackSide;

  // OBJECTS
  var struct = new THREE.Object3D;
  scene.add(struct);
  var structGuide = new THREE.Object3D;

  var shadeBoxGeo = new THREE.BoxBufferGeometry(3,3,3);
  var shadeBox = new THREE.Mesh(shadeBoxGeo, matShading);
  shadeBox.position.set(-camera.position.x, -camera.position.y, -camera.position.z)
  scene.add(shadeBox);
  // struct.add(shadeBox);

  var sphereGeo = new THREE.SphereBufferGeometry(.25,15,15);
  var verts = [
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack),
    new THREE.Mesh(sphereGeo, matBlack)
  ];

  var cubePoints = [
    new THREE.Vector3(-1.5,1.5,-1.5),
    new THREE.Vector3(1.5,1.5,-1.5),
    new THREE.Vector3(1.5,1.5,1.5),
    new THREE.Vector3(-1.5,1.5,1.5),
    new THREE.Vector3(-1.5,-1.5,1.5),
    new THREE.Vector3(1.5,-1.5,1.5),
    new THREE.Vector3(1.5,-1.5,-1.5),
    new THREE.Vector3(-1.5,-1.5,-1.5),
    new THREE.Vector3(-1.5,-1.5,1.5),
    new THREE.Vector3(-1.5,1.5,1.5),
    new THREE.Vector3(-1.5,1.5,-1.5),
    new THREE.Vector3(-1.5,-1.5,-1.5),
    new THREE.Vector3(1.5,-1.5,-1.5),
    new THREE.Vector3(1.5,1.5,-1.5),
    new THREE.Vector3(1.5,1.5,1.5),
    new THREE.Vector3(1.5,-1.5,1.5)
  ];
  var cubeGeo = new THREE.BufferGeometry().setFromPoints(cubePoints);
  var cube = new THREE.Line(cubeGeo, matLine);
  scene.add(cube);
  struct.add(cube);

  for(var i = 0; i < 8; i++) {
    verts[i].position.set(cubePoints[i].x,cubePoints[i].y,cubePoints[i].z);
    scene.add(verts[i]);
    struct.add(verts[i]);
  }

  // BUTTONS

  var outCircleGeo = new THREE.CircleBufferGeometry(.175, 25);
  var inCircleGeo = new THREE.CircleBufferGeometry(.15, 25);
  var cameraDirection = camera.getWorldDirection();
  var buttonSpacingVector = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x).normalize();
  var buttonSpacing = 0; // reset later

  function makeButton(mesh, color) {
    var out = new THREE.Mesh(outCircleGeo, matInvisible);

    let outline = new THREE.Mesh(mesh, matBlack);
    outline.scale.set(1.5, 1.5, .01);
    out.add(outline);

    let symbol = new THREE.Mesh(mesh, color);
    symbol.scale.set(1.25,1.25,.01);
    symbol.translateZ(.01);
    out.add(symbol);

    out.lookAt(camera.position);
    return out;
  }

  // faces
  var boxGeo = new THREE.BoxGeometry(.15,.15,.15);

  var piramidGeo = new THREE.CylinderGeometry(0,.1,.15,3);

  var edgeGeo = new THREE.BoxGeometry(.075,.25,.075);

  var buttons = [
    makeButton(boxGeo, matCW),
    makeButton(boxGeo, matCW),
    makeButton(boxGeo, matCW),
    makeButton(piramidGeo, matCW),
    makeButton(piramidGeo, matCW),
    makeButton(piramidGeo, matCW),
    makeButton(piramidGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(edgeGeo, matCW),
    makeButton(boxGeo, matCCW),
    makeButton(boxGeo, matCCW),
    makeButton(boxGeo, matCCW),
    makeButton(piramidGeo, matCCW),
    makeButton(piramidGeo, matCCW),
    makeButton(piramidGeo, matCCW),
    makeButton(piramidGeo, matCCW),
    makeButton(edgeGeo, matCCW),
    makeButton(edgeGeo, matCCW),
    makeButton(edgeGeo, matCCW),
    makeButton(edgeGeo, matCCW),
    makeButton(edgeGeo, matCCW),
    makeButton(edgeGeo, matCCW),
  ];

  var buttonPoints = [
    new THREE.Vector3(1.5,0,0),
    new THREE.Vector3(0,1.5,0),
    new THREE.Vector3(0,0,1.5),
    new THREE.Vector3(1.5,-1.5,1.5),
    new THREE.Vector3(-1.5,-1.5,1.5),
    new THREE.Vector3(1.5,1.5,1.5),
    new THREE.Vector3(-1.5,1.5,1.5),
    new THREE.Vector3(1.5,-1.5,0),
    new THREE.Vector3(-1.5,0,1.5),
    new THREE.Vector3(0,-1.5,1.5),
    new THREE.Vector3(1.5,1.5,0),
    new THREE.Vector3(1.5,0,1.5),
    new THREE.Vector3(0,1.5,1.5),
  ];

  for(let i = 0; i < buttonPoints.length; i++) {
    if(i < 3) buttonSpacing = .3; // faces
    else if(i < 7) buttonSpacing = .4; // verticies
    else buttonSpacing = .2; // edges

    let place = buttonPoints[i].clone().addScaledVector(buttonSpacingVector, buttonSpacing);
    place.addScaledVector(cameraDirection, -1);
    buttons[i].position.set(place.x, place.y, place.z);
    scene.add(buttons[i]);

    place.addScaledVector(buttonSpacingVector, -2*buttonSpacing);
    // place.addScaledVector(cameraDirection, -1);
    buttons[i+buttonPoints.length].position.set(place.x, place.y, place.z);
    scene.add(buttons[i+buttonPoints.length]);
  }

  var axisPoints = [
    new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,2,0),
    new THREE.Vector3(0,0,2),
    new THREE.Vector3(2,-2,2),
    new THREE.Vector3(-2,-2,2),
    new THREE.Vector3(3,3,3),
    new THREE.Vector3(-2,2,2),
    new THREE.Vector3(2,-2,0),
    new THREE.Vector3(-2,0,2),
    new THREE.Vector3(0,-2,2),
    new THREE.Vector3(2,2,0),
    new THREE.Vector3(2,0,2),
    new THREE.Vector3(0,2,2),
    new THREE.Vector3(-2,0,0),
    new THREE.Vector3(0,-2,0),
    new THREE.Vector3(0,0,-2),
    new THREE.Vector3(-2,2,-2),
    new THREE.Vector3(2,2,-2),
    new THREE.Vector3(-2,-2,-2),
    new THREE.Vector3(2,-2,-2),
    new THREE.Vector3(-2,2,0),
    new THREE.Vector3(2,0,-2),
    new THREE.Vector3(0,2,-2),
    new THREE.Vector3(-2,-2,0),
    new THREE.Vector3(-2,0,-2),
    new THREE.Vector3(0,-2,-2)
  ];

  var axisGeo = [];
  for(var i = 0; i < 13; i++) axisGeo.push(new THREE.BufferGeometry().setFromPoints([axisPoints[i], axisPoints[i+13]]));

  var axisLines = [];
  for(var i = 0; i < axisGeo.length; i++) {
    axisLines.push(new THREE.Line(axisGeo[i], matInvisible));
    scene.add(axisLines[i]);
  }

  var axisSphereGeo = new THREE.SphereBufferGeometry(.1, 5, 5);

  var axisSpherePoints = [
    new THREE.Vector3(1.5, 0, 0),
    new THREE.Vector3(0, 1.5, 0),
    new THREE.Vector3(0, 0, 1.5),
    new THREE.Vector3(1.5,-1.5,0),
    new THREE.Vector3(-1.5,0,1.5),
    new THREE.Vector3(0,-1.5,1.5),
    new THREE.Vector3(1.5,1.5,0),
    new THREE.Vector3(1.5,0,1.5),
    new THREE.Vector3(0,1.5,1.5),
  ];

  for(var i = 0; i < axisLines.length; i++) {
    var j = i;
    if(i >= 7) j -= 4;
    if(i < 3 || i >= 7) {
      var sphere1 = new THREE.Mesh(axisSphereGeo, matGrey); // mark
      sphere1.position.set(axisSpherePoints[j].x, axisSpherePoints[j].y, axisSpherePoints[j].z);
      scene.add(sphere1);
      axisLines[i].add(sphere1);
      var sphere2 = new THREE.Mesh(axisSphereGeo, matInvisible);
      sphere2.position.set(-axisSpherePoints[j].x, -axisSpherePoints[j].y, -axisSpherePoints[j].z);
      scene.add(sphere2);
      axisLines[i].add(sphere2);
      j++
    }
  }

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersections = [];
  var rotating = false;
  var moveTime = 0;
  var moveDistance = 0;
  var axis = new THREE.Vector3(0,0,0);
  var countdown = moveTime;
  var active = false;

  function checkButtons() {
    var foundButtons = raycaster.intersectObjects(buttons);
    var turnCCW = false;
    if(foundButtons.length > 0) {
      var index = 0;
      for(let i = 0; i < buttons.length; i++) {
        if(foundButtons[0].object == buttons[i]) {
          index = i;
          if(index >= buttonPoints.length) {
            index -= buttonPoints.length;
            turnCCW = true;
          }
          i = buttons.length;
          break;
        }
      }
      if(index < 3) {// faces
        var distance = Math.PI/2;
        var time = 45;
      }
      else if(index < 7) { // verts
        var distance = Math.PI*2/3;
        var time = 60;
      }
      else { // edges
        var distance = Math.PI;
        var time = 90;
      }
      rotating = true;
      moveTime = time;
      countdown = time;
      axis = buttonPoints[index].normalize();
      if(turnCCW) moveDistance = distance;
      else moveDistance = -distance;
      structGuide.rotateOnWorldAxis(axis, moveDistance);
      return true;
    }
    else return false;
  }

  function roundPositionX(vector) {
    var out = vector.clone();
      out.x = Math.round(out.x);
    return out;
  }

  var target = null;

  document.getElementById("cube_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse,camera);

    var p;

    var check = raycaster.intersectObjects(buttons);
    if(check.length > 0) {
      // animation
      if(target == null) {
        target = check[0].object;
        target.tl = new TimelineLite();
        target.tl.to(target.scale, {x: 1.5, y: 1.5, z: 1.5, duration: .1});
      }
      else if(target != check[0].object) {
        target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
        target = check[0].object;
        target.tl = new TimelineLite();
        target.tl.to(target.scale, {x: 1.5, y: 1.5, z: 1.5, duration: .1});
      }

      //axes
      var index = 0;
      for(let i = 0; i < buttons.length; i++) {
        if(target == buttons[i]) {
          index = i;
          if(index >= axisLines.length) index -= axisLines.length;
          i = buttons.length;
        }
      }
      axisLines[index].material = matAxis
      if(axisLines[index].children.length > 0) {
        axisLines[index].children[0].material = matAxis;
        axisLines[index].children[1].material = matAxis;
      }
      active = true;
    }
    else if(active) {
      for(var i = 0; i < axisLines.length; i++) {
        axisLines[i].material = matInvisible;
        if(axisLines[i].children.length > 0) {
          axisLines[i].children[0].material = matGrey;
          axisLines[i].children[1].material = matInvisible;
        }
        active = false;
        if(target != null) {
          target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
          target = null;
        }
      }
    }
  }, false);

  document.getElementById("cube_1").addEventListener('mousedown', function() {

    if(!rotating) {
      mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
      mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

      raycaster.setFromCamera(mouse,camera);

      var check = checkButtons();

      if(!check) {
        intersections = raycaster.intersectObjects(verts);
        if(intersections.length > 0 && !rotating) {
          if(intersections[0].object.material == matBlack) intersections[0].object.material = matBlue;
          else if(intersections[0].object.material == matBlue) intersections[0].object.material = matRed;
          else intersections[0].object.material = matBlack;
        }
      }
    }
  }, false);

  document.getElementById("colorReset").addEventListener('mousedown', function() {
    resetColor();
  });

  function resetColor() {
    for(var i = 0; i < verts.length; i++) verts[i].material = matBlack;
    structGuide.rotation.set(0,0,0);
    struct.rotation.set(0,0,0);
    console.log(verts.length);
  }

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    if(rotating) {
      if(countdown == 0) {
        rotating = false;
        struct.rotation = structGuide.rotation;
        shadeBox.rotation.set(struct.rotation.x, struct.rotation.y, struct.rotation.z);
      }
      else {
        struct.rotateOnWorldAxis(axis, moveDistance/moveTime);
        shadeBox.rotation.set(struct.rotation.x, struct.rotation.y, struct.rotation.z);
        countdown--;
      }
      // moveColoredVerts();
    }

    renderer.render(scene, camera);
  }
  animate();
});
