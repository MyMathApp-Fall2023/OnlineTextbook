$(document).ready( function() {
  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("robo_1"), antialias: true});
    renderer.setClearColor(0xe0e0e0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(350, 350);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

  // SCENE
  var scene_1 = new THREE.Scene();
  var scene_2 = new THREE.Scene();

  // CAMERA
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera.position.set(28, 12, 0);
    camera.lookAt(0, 5, 0);

  // LIGHTS
  var aLight = new THREE.AmbientLight(0xe0e0e0, 2);
  scene_1.add(aLight);
  var aLight2 = new THREE.AmbientLight(0xe0e0e0, 2);
  scene_2.add(aLight2);
  var dLight = new THREE.DirectionalLight(0xffffff, 1);
  dLight.position.set(-10, 20, 15);
  // dLight.castShadow = true;
  scene_2.add(dLight);
  var pLight = new THREE.PointLight(0xffffff, .3, 40, 1);
  pLight.position.set(0, 20, 0);
  // pLight.castShadow = true;
  scene_1.add(pLight);

  // LOADER
  var loader = new THREE.GLTFLoader();
  var robot = new THREE.Object3D();
  var robot2 = new THREE.Object3D();
  var glassesMat = new THREE.MeshStandardMaterial({color: 0x111111});
  loader.load(
    "models/RadianRobot_v04.gltf",
    function(gltf) {
      robot = gltf.scene;
      scene_1.add(robot);
      robot.getObjectByName("Glasses").material = glassesMat;
    }
  );
  loader.load(
    "models/RadianRobot_v04.gltf",
    function(gltf) {
      robot2 = gltf.scene;
      scene_2.add(robot2);
      robot2.getObjectByName("Glasses").material = glassesMat;
    }
  );

  // FLOOR
  var planeGeometry = new THREE.PlaneBufferGeometry( 200, 200, 320, 320 );
  var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.rotateX(-Math.PI/2);
  scene_1.add(plane);

  // UI
  // ring
  var ringGeo = new THREE.TorusGeometry(7, .175, 4, 100);
  var ringMat = new THREE.MeshStandardMaterial({color: 0x000022, opacity: 0.9, transparent: true});
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.scale.set(1,1,.01);
  ring.rotateX(Math.PI/2);
  ring.position.set(0, .02, 0);
  scene_1.add(ring);

  // pie
  var slices = 140;
  var pieGeo = new THREE.CircleGeometry(7, 10, Math.PI, Math.PI/(slices/2));
  var piePosMat = new THREE.MeshStandardMaterial({color: 0x5371d7});
  var pieNegMat = new THREE.MeshStandardMaterial({color: 0xf273b3});
  var pieSlice = new THREE.Mesh(pieGeo, piePosMat);
  pieSlice.position.set(0,-.01,0);
  pieSlice.rotateX(-Math.PI/2);
  var pie = [];
  for(var i = 0; i < slices; i++) {
    pie[i] = pieSlice.clone();
    pie[i].rotateZ(i * Math.PI/(slices/2));
    scene_1.add(pie[i]);
  }
  var pos = true;
  function pieHandleInput(input) {
    if(input > 0) for(var i = 0; i < pie.length; i++) pie[i].material = piePosMat;
    else  for(var i = 0; i < pie.length; i++) pie[i].material = pieNegMat;

    if(robotRotation > 2*Math.PI || robotRotation < -2*Math.PI) {
      for(var i = 0; i < pie.length; i++) pie[i].position.y = .01;

      if(robotRotation >= 2*Math.PI && robotRotation < 4*Math.PI) {
        for(var i = 0; i < pie.length; i++) {
          if(i < Math.round((robotRotation - 2*Math.PI) * pie.length / (2*Math.PI)))
            pie[i].scale.set(i/(4*pie.length)+3/4,i/(4*pie.length)+3/4,i/(4*pie.length)+3/4);
          else
            pie[i].scale.set(i/(4*pie.length)+1/2,i/(4*pie.length)+1/2,i/(4*pie.length)+1/2);
        }
      }
      else if(robotRotation >= 4*Math.PI && robotRotation < 6*Math.PI) {
        for(var i = 0; i < pie.length; i++) {
          if(i < Math.round((robotRotation - 4*Math.PI) * pie.length / (2*Math.PI)))
            pie[i].scale.set(1,1,1);
          else
            pie[i].scale.set(i/(4*pie.length)+3/4,i/(4*pie.length)+3/4,i/(4*pie.length)+3/4);
        }
      }
      else if(robotRotation <= -2*Math.PI && robotRotation > -4*Math.PI) {
        for(var i = 0; i < pie.length; i++) {
          if(pie.length - i < Math.round((-robotRotation - 2*Math.PI) * pie.length / (2*Math.PI)))
            pie[i].scale.set((pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4);
          else
            pie[i].scale.set((pie.length - i)/(4*pie.length)+1/2,(pie.length - i)/(4*pie.length)+1/2,(pie.length - i)/(4*pie.length)+1/2);
        }
      }
      else if(robotRotation <= -4*Math.PI && robotRotation > -6*Math.PI) {
        for(var i = 0; i < pie.length; i++) {
          if(pie.length - i < Math.round((-robotRotation - 4*Math.PI) * pie.length / (2*Math.PI)))
            pie[i].scale.set(1,1,1);
          else
            pie[i].scale.set((pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4);
        }
      }
      else if(robotRotation >= 6*Math.PI || robotRotation <= -6*Math.PI) {
        for(var i = 0; i < pie.length; i++)
          pie[i].scale.set(1,1,1);
      }
    }
    else if(robotRotation > 0) {
      for(var i = 0; i < pie.length; i++) {
        if(i < Math.round((robotRotation) * pie.length / (2*Math.PI))) {
          pie[i].scale.set(i/(4*pie.length)+1/2,i/(4*pie.length)+1/2,i/(4*pie.length)+1/2);
          pie[i].position.y = .01;
        }
        else pie[i].position.y = -.01;
     }
    }
    else {
      for(var i = 0; i < pie.length; i++) {
        pie[i].scale.set((pie.length-i)/(4*pie.length)+1/2,(pie.length-i)/(4*pie.length)+1/2,(pie.length-i)/(4*pie.length)+1/2);
        if(pie.length - i > Math.round((-robotRotation) * pie.length / (2*Math.PI)))
          pie[i].position.y = -.01;
        else pie[i].position.y = .01;
      }
    }
  }

  // LINE
  var lineMat = new THREE.MeshBasicMaterial({color: 0x000000});
  // line center
  var lineCenterGeo = new THREE.CircleGeometry(.25, 10);
  var lineCenter = new THREE.Mesh(lineCenterGeo, lineMat);
  lineCenter.rotateX(-Math.PI/2);
  lineCenter.position.set(0,.1,0);
  scene_2.add(lineCenter);
  // line
  var lineGeo = new THREE.PlaneGeometry(.125, 7);
  var line = new THREE.Mesh(lineGeo, lineMat);
  line.rotateZ(-Math.PI/2);
  line.rotateY(-Math.PI/2);
  line.translateY(-3.5);
  line.translateZ(.11);
  scene_2.add(line);

  // HANDLE
  var handleGeo = new THREE.SphereGeometry(.5, 10, 5);
  var handle = new THREE.Mesh(handleGeo, lineMat);
  scene_2.add(handle);
  handle.position.set(0,-3.5,0);
  line.add(handle);

  // RAYCASTER
  var raycaster = new THREE.Raycaster();
  scene_1.add(raycaster);
  var mouse = new THREE.Vector2();
  var dragging = false;
  var intersection = {};
  var spiralCount = 0;
  var prevRobotRotation = 0;

  document.getElementById("robo_1").addEventListener('mousemove', function(event) {
    mouse.x = ((event.clientX - $("#robo_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -(((event.clientY - $("#robo_1").offset().top + $(window).scrollTop()) / 50)) / 3.5 + 1;
    if(!dragging) lineMat.color.set('#000');
    intersection = raycaster.intersectObject(handle);
    for(var i = 0; i < intersection.length; i++) intersection[i].object.material.color.set('#0f0');
    if(dragging) {
      intersection = raycaster.intersectObject(plane);
      robotRotation = Math.atan2(intersection[0].point.z, -intersection[0].point.x);
      if(robotRotation < 0) robotRotation += 2*Math.PI;
      robotRotation += spiralCount;
    }}, false);
  document.getElementById("robo_1").addEventListener('mousedown', function() {
    if(raycaster.intersectObject(handle).length > 0) {
      dragging = true;
      spiralCount = Math.floor(robotRotation / (2*Math.PI)) * 2*Math.PI;
      prevRobotRotation = robotRotation;
    }
  }, false);
  document.getElementById("robo_1").addEventListener('mouseup', function() {
    dragging = false;
    robot.rotation.y = robotRotation;
  }, false);

  // BUTTONS
  var turning = 0;
  document.getElementById("leftButton").onmousedown = function() {turning = -1};
  document.getElementById("leftButton").onmouseup = function() {turning = 0};
  document.getElementById("rightButton").onmousedown = function() {turning = 1};
  document.getElementById("rightButton").onmouseup = function() {turning = 0};

  // TURNING
  var robotRotation = 0;
  function turn() {
    var speed = Math.PI/200;
    if(turning > 0) robotRotation -= speed;
    else if(turning < 0) robotRotation += speed;
    robot.rotation.y = robotRotation;
    robot2.rotation.y = robotRotation;
    line.translateY(3.5);
    line.rotation.z = robotRotation - Math.PI/2;
    line.translateY(-3.5);
  }

  var lArmUp = false;
  var lArmMoving = true;
  var rArmUp = false;
  var rArmMoving = true;

  document.getElementById("leftArmButton").addEventListener('click', function() {
    if(lArmUp) {
      document.getElementById("leftArmButton").innerHTML = "⇑";
      lArmUp = false;
      lArmMoving = true;
    }
    else {
      document.getElementById("leftArmButton").innerHTML = "⇓";
      lArmUp = true;
      lArmMoving = true;
    }
  });
  document.getElementById("rightArmButton").addEventListener('click', function() {
    if(rArmUp) {
      document.getElementById("rightArmButton").innerHTML = "⇑";
      rArmUp = false;
      rArmMoving = true;
    }
    else {
      document.getElementById("rightArmButton").innerHTML = "⇓";
      rArmUp = true;
      rArmMoving = true;
    }
  });

  function rArmHandle() {
    var rArmRot = robot2.getObjectByName("rUpperArm").rotation.x;
    if(rArmUp) {
      if(rArmRot < 1.57) {
        robot2.getObjectByName("rUpperArm").translateY(.9);
        robot2.getObjectByName("rUpperArm").rotateX(.05);
        robot2.getObjectByName("rUpperArm").translateY(-.9);

        robot.getObjectByName("rUpperArm").position.set(robot2.getObjectByName("rUpperArm").position.x, robot2.getObjectByName("rUpperArm").position.y, robot2.getObjectByName("rUpperArm").position.z);
        robot.getObjectByName("rUpperArm").rotation.set(robot2.getObjectByName("rUpperArm").rotation.x, robot2.getObjectByName("rUpperArm").rotation.y, robot2.getObjectByName("rUpperArm").rotation.z);
      }
      else rArmMoving = false;
    }
    else {
      if(rArmRot > .25) {
        robot2.getObjectByName("rUpperArm").translateY(.9);
        robot2.getObjectByName("rUpperArm").rotateX(-.05);
        robot2.getObjectByName("rUpperArm").translateY(-.9);

        robot.getObjectByName("rUpperArm").position.set(robot2.getObjectByName("rUpperArm").position.x, robot2.getObjectByName("rUpperArm").position.y, robot2.getObjectByName("rUpperArm").position.z);
        robot.getObjectByName("rUpperArm").rotation.set(robot2.getObjectByName("rUpperArm").rotation.x, robot2.getObjectByName("rUpperArm").rotation.y, robot2.getObjectByName("rUpperArm").rotation.z);
      }
      else rArmMoving = false;
    }
  }
  function lArmHandle() {
    var lArmRot = robot2.getObjectByName("lUpperArm").rotation.x;
    if(lArmUp) {
      if(lArmRot < 1.57) {
        robot2.getObjectByName("lUpperArm").translateY(.9);
        robot2.getObjectByName("lUpperArm").rotateX(.05);
        robot2.getObjectByName("lUpperArm").translateY(-.9);

        robot.getObjectByName("lUpperArm").position.set(robot2.getObjectByName("lUpperArm").position.x, robot2.getObjectByName("lUpperArm").position.y, robot2.getObjectByName("lUpperArm").position.z);
        robot.getObjectByName("lUpperArm").rotation.set(robot2.getObjectByName("lUpperArm").rotation.x, robot2.getObjectByName("lUpperArm").rotation.y, robot2.getObjectByName("lUpperArm").rotation.z);
      }
      else lArmMoving = false;
    }
    else {
      if(lArmRot > .25) {
        robot2.getObjectByName("lUpperArm").translateY(.9);
        robot2.getObjectByName("lUpperArm").rotateX(-.05);
        robot2.getObjectByName("lUpperArm").translateY(-.9);

        robot.getObjectByName("lUpperArm").position.set(robot2.getObjectByName("lUpperArm").position.x, robot2.getObjectByName("lUpperArm").position.y, robot2.getObjectByName("lUpperArm").position.z);
        robot.getObjectByName("lUpperArm").rotation.set(robot2.getObjectByName("lUpperArm").rotation.x, robot2.getObjectByName("lUpperArm").rotation.y, robot2.getObjectByName("lUpperArm").rotation.z);
      }
      else lArmMoving = false;
    }
  }

    // ⇑⇓

  var rads = true;
  document.getElementById("unitChoice1").addEventListener('click', function() {
      document.getElementById('unitDisplay').innerHTML = "\\(\\pi\\)";
      renderMathInElement(document.body);
      $("#disp").val(Math.round(robot.rotation.y * 100 / Math.PI) / 100);
      rads = true;
  });
  document.getElementById("unitChoice2").addEventListener('click', function() {
      document.getElementById('unitDisplay').innerHTML = "\\(\\degree\\)";
      renderMathInElement(document.body);
      $("#disp").val(Math.round(robot.rotation.y * 10 * 180 / Math.PI) / 10);
      rads = false;
  });

  document.getElementById('unitDisplay').innerHTML = "\\(\\pi\\)";
  renderMathInElement(document.body);

  $(`#disp`).val(0);

  $(`#disp`).on("input", function() {
    if(rads) robotRotation = $(`#disp`).val() * Math.PI;
    else robotRotation = $(`#disp`).val() * Math.PI / 180;


    if(!isNaN(robotRotation)) {
      robot.rotation.y = robotRotation;
      robot2.rotation.y = robotRotation;
      pieHandleInput(slices*robotRotation / (2*Math.PI));

      line.translateY(3.5);
      line.rotation.z = robotRotation - Math.PI/2;
      line.translateY(-3.5);
    }
  });

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse,camera);

    if(!isNaN(robotRotation)) turn();

    if(turning) {
      if(rads) $("#disp").val(Math.round(robot.rotation.y * 100 / Math.PI) / 100);
      else $("#disp").val(Math.round(robot.rotation.y * 10 * 180 / Math.PI) / 10);
      pieHandleInput(slices*robot.rotation.y / (2*Math.PI));
    }

    if(dragging) {
      console.log("robotRotation: " + robotRotation + ", prevRobotRotation: " + prevRobotRotation + ", spiralCount: " + spiralCount);
      if(robotRotation - prevRobotRotation > Math.PI) {
        spiralCount -= 2*Math.PI;
        robotRotation = Math.atan2(intersection[0].point.z, -intersection[0].point.x);
        if(robotRotation < 0) robotRotation += 2*Math.PI;
        robotRotation += spiralCount;
      }
      else if(robotRotation - prevRobotRotation < -Math.PI) {
        spiralCount += 2*Math.PI;
        robotRotation = Math.atan2(intersection[0].point.z, -intersection[0].point.x);
        if(robotRotation < 0) robotRotation += 2*Math.PI;
        robotRotation += spiralCount;
      }
      prevRobotRotation = robotRotation;
      if(rads) $("#disp").val(Math.round(robotRotation * 100 / Math.PI) / 100);
      else $("#disp").val(Math.round(robotRotation * 10 * 180 / Math.PI) / 10);
      pieHandleInput(slices*robotRotation / (2*Math.PI));
    }

    if(rArmMoving) rArmHandle();
    if(lArmMoving) lArmHandle();

    renderer.autoClear = true;
    renderer.render(scene_1, camera);
    renderer.autoClear = false;
    renderer.render(scene_2, camera);
  }
  animate();
});
