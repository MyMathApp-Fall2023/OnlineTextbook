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
    camera.position.set(8,9,15);
    // camera.position.set(0,0,50);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();

  // MATERIALS
  var matBlack = new THREE.MeshBasicMaterial({color: "#000"});
  var matRed = new THREE.MeshBasicMaterial({color: "#f00"});
  var matBlue = new THREE.MeshBasicMaterial({color: "#00f"});
  var matCW = new THREE.MeshBasicMaterial({color: 0x5371d7});
  var matCCW = new THREE.MeshBasicMaterial({color: 0xf273b3});
  var matLine = new THREE.LineBasicMaterial({color: "#000"});
  var matInvisible = new THREE.LineBasicMaterial({transparent: true, opacity: 0});
  var matGrey = new THREE.MeshBasicMaterial({color: 0x555555});
  var matAxis = new THREE.LineBasicMaterial({color: 0xffcc00});

  // OBJECTS
  var struct = new THREE.Object3D;
  scene.add(struct);
  var structGuide = new THREE.Object3D;

  var sphereGeo = new THREE.SphereGeometry(.25,15,15);
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
  var buttonSpacing = .22;

  function buttonMake(mesh, color) {
    var out = new THREE.Mesh(outCircleGeo, matBlack);

    var colorCircle = new THREE.Mesh(inCircleGeo, color);
    colorCircle.translateZ(.01);
    out.add(colorCircle);

    var symbol = new THREE.Mesh(mesh, matBlack);
    symbol.scale.z = .01;
    symbol.translateZ(.02);
    out.add(symbol);
    return out;
  }

  // faces
  var boxGeo = new THREE.BoxGeometry(.15,.15,.15);

  var faceButtons = [
    buttonMake(boxGeo, matCW),
    buttonMake(boxGeo, matCW),
    buttonMake(boxGeo, matCW),
    buttonMake(boxGeo, matCCW),
    buttonMake(boxGeo, matCCW),
    buttonMake(boxGeo, matCCW)
  ];

  var facePoints = [
    new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,2,0),
    new THREE.Vector3(0,0,2)
  ];

  for(var i = 0; i < facePoints.length; i++) {
    faceButtons[i].position.set(facePoints[i].x+buttonSpacing,facePoints[i].y,facePoints[i].z);
    scene.add(faceButtons[i]);
  }
  for(var i = 0; i < facePoints.length; i++) {
    faceButtons[i+facePoints.length].position.set(facePoints[i].x-buttonSpacing,facePoints[i].y,facePoints[i].z);
    scene.add(faceButtons[i+facePoints.length]);
  }

  var piramidGeo = new THREE.CylinderGeometry(0,.1,.15,3);

  var vertexButtons = [
    buttonMake(piramidGeo, matCW),
    buttonMake(piramidGeo, matCW),
    buttonMake(piramidGeo, matCW),
    buttonMake(piramidGeo, matCW),
    buttonMake(piramidGeo, matCCW),
    buttonMake(piramidGeo, matCCW),
    buttonMake(piramidGeo, matCCW),
    buttonMake(piramidGeo, matCCW)
  ];

  var vertexPoints = [
    new THREE.Vector3(2,-2,2),
    new THREE.Vector3(-2,-2,2),
    new THREE.Vector3(3,3,3),
    new THREE.Vector3(-2,2,2)
  ];

  for(var i = 0; i < vertexPoints.length; i++) {
    vertexButtons[i].position.set(vertexPoints[i].x+buttonSpacing,vertexPoints[i].y,vertexPoints[i].z);
    scene.add(vertexButtons[i]);
  }
  for(var i = 0; i < vertexPoints.length; i++) {
    vertexButtons[i+vertexPoints.length].position.set(vertexPoints[i].x-buttonSpacing,vertexPoints[i].y,vertexPoints[i].z);
    scene.add(vertexButtons[i+vertexPoints.length]);
  }

  var edgeGeo = new THREE.BoxGeometry(.075,.25,.075);

  var edgeButtons = [
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCW),
    buttonMake(edgeGeo, matCCW),
    buttonMake(edgeGeo, matCCW),
    buttonMake(edgeGeo, matCCW),
    buttonMake(edgeGeo, matCCW),
    buttonMake(edgeGeo, matCCW),
    buttonMake(edgeGeo, matCCW)
  ];

  var edgePoints = [
    new THREE.Vector3(2,-2,0),
    new THREE.Vector3(-2,0,2),
    new THREE.Vector3(0,-2,2),
    new THREE.Vector3(2,2,0),
    new THREE.Vector3(2,0,2),
    new THREE.Vector3(0,2,2)
  ];

  for(var i = 0; i < edgePoints.length; i++) {
    edgeButtons[i].position.set(edgePoints[i].x+buttonSpacing,edgePoints[i].y,edgePoints[i].z);
    scene.add(edgeButtons[i]);
  }
  for(var i = 0; i < edgePoints.length; i++) {
    edgeButtons[i+edgePoints.length].position.set(edgePoints[i].x-buttonSpacing,edgePoints[i].y,edgePoints[i].z);
    scene.add(edgeButtons[i+edgePoints.length]);
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
      var sphere1 = new THREE.Mesh(axisSphereGeo, matInvisible);
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

  function checkButtons(list, distance, time) {
    var foundButtons = raycaster.intersectObjects(list);
    if(foundButtons.length > 0) {
      rotating = true;
      moveTime = time;
      countdown = time;
      axis = new THREE.Vector3(foundButtons[0].object.position.x, foundButtons[0].object.position.y, foundButtons[0].object.position.z);
      if(foundButtons[0].object.children[0].material == matCCW) {
        axis.x += buttonSpacing;
        moveDistance = distance;
        structGuide.rotateOnWorldAxis(axis.normalize(), moveDistance);
      }
      else {
        axis.x -= buttonSpacing;
        moveDistance = -distance;
        structGuide.rotateOnWorldAxis(axis.normalize(), moveDistance);
      }
      return true;
    }
    else return false;
  }

  function roundPositionX(vector) {
    var out = vector.clone();
      out.x = Math.round(out.x);
    return out;
  }

  // var tlComplete = false;
  // var tl = new TimelineMax();

  // function addButtonAnimation(button) {
  //   tl.to(button.scale, 0.3, {x: 1.5, y: 1.5, z: 1.5, ease: Expo.easeOut, duration: .25});
  //   tl.addPause(.8);
  //   tl.to(button.scale, 0.3, {x: 1, y: 1, z: 1, ease: Expo.easeOut, duration: .25});
  // }

  var target = null;

  document.getElementById("cube_1").addEventListener('mousemove', function() {
    mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

    raycaster.setFromCamera(mouse,camera);

    var p;

    var check = raycaster.intersectObjects(faceButtons); // this could be simplified considerably if there is a way to input a list of lists into intersectObjects
    if(check.length > 0) {
      if(target == null) {
        target = check[0].object;
        target.tl = new TimelineLite();
        target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
      }
      else if(target != check[0].object) {
        target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
        target = check[0].object;
        target.tl = new TimelineLite();
        target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
      }
      p = roundPositionX(check[0].object.position);
      for(var i = 0; i < 13; i++) {
        if(p.x == axisPoints[i].x && p.y == axisPoints[i].y && p.z == axisPoints[i].z) {
          axisLines[i].material = matAxis;
          axisLines[i].children[0].material = matAxis;
          axisLines[i].children[1].material = matAxis;
          active = true;
          break;
        }
      }
    }
    else {
      check = raycaster.intersectObjects(vertexButtons);
      if(check.length > 0) {
        if(target == null) {
          target = check[0].object;
          target.tl = new TimelineLite();
          target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
        }
        else  if(target != check[0].object) {
          target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
          target = check[0].object;
          target.tl = new TimelineLite();
          target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
        }
        p = roundPositionX(check[0].object.position);
        for(var i = 0; i < 13; i++) {
          if(p.x == axisPoints[i].x && p.y == axisPoints[i].y && p.z == axisPoints[i].z) {
            axisLines[i].material = matAxis;
            active = true;
            break;
          }
        }
      }
      else {
        check = raycaster.intersectObjects(edgeButtons);
        if(check.length > 0) {
          if(target == null) {
            target = check[0].object;
            target.tl = new TimelineLite();
            target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
          }
          else if(target != check[0].object) {
            target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
            target = check[0].object;
            target.tl = new TimelineLite();
            target.tl.to(target.scale, .5, {x: 1.5, y: 1.5, z: 1.5, duration: .25});
          }
          p = roundPositionX(check[0].object.position);
          for(var i = 0; i < 13; i++) {
            if(p.x == axisPoints[i].x && p.y == axisPoints[i].y && p.z == axisPoints[i].z) {
              axisLines[i].material = matAxis;
              axisLines[i].children[0].material = matAxis;
              axisLines[i].children[1].material = matAxis;
              active = true;
              break;
            }
          }
        }
        else if(active)
          for(var i = 0; i < axisLines.length; i++) {
            axisLines[i].material = matInvisible;
            if(axisLines[i].children.length >= 1) {
              axisLines[i].children[0].material = matInvisible;
              axisLines[i].children[1].material = matInvisible;
            }
            active = false;
            if(target != null) {
              target.tl.to(target.scale, {x: 1, y: 1, z: 1, duration: .1});
              target = null;
            }
          }
      }
    }
  }, false);

  document.getElementById("cube_1").addEventListener('mousedown', function() {

    if(!rotating) {
      mouse.x = ((event.clientX - $("#cube_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
      mouse.y = -((event.clientY - $("#cube_1").offset().top + $(window).scrollTop()) / 50) / 3.5 + 1;

      raycaster.setFromCamera(mouse,camera);


      var check = checkButtons(faceButtons, Math.PI/2, 30); // 90 / 30 = 3
      if(!check) check = checkButtons(vertexButtons, Math.PI*2/3, 40); // 120 / 40 = 3
      if(!check) checkButtons(edgeButtons, Math.PI, 60); // 180 / 60 = 3

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

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    if(rotating) {
      if(countdown == 0) {
        rotating = false;
        struct.rotation = structGuide.rotation;
      }
      else {
        struct.rotateOnWorldAxis(axis, moveDistance/moveTime);
        countdown--;
      }
    }

    renderer.render(scene, camera);
  }
  animate();
});
