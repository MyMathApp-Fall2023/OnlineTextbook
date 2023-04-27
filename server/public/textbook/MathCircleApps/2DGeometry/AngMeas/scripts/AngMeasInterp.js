$(document).ready( function() {
  // INIT
  var showing = 0;

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
  scene_2.add(dLight);
  var pLight = new THREE.PointLight(0xffffff, .3, 40, 1);
  pLight.position.set(0, 20, 0);
  scene_1.add(pLight);

  // LOADER
  var loader = new THREE.GLTFLoader();
  function loadModel(model/*: string*/)/*: Promise<GLTF>*/ {
    return new Promise(function (resolve) {
      loader.load(model, resolve);
    });
  }

  var robot = new THREE.Object3D();
  var glassesMat = new THREE.MeshStandardMaterial({color: 0x111111});

  var loader = loadModel("models/RadianRobot_v04.gltf").then(function(gltf) {
    robot = gltf.scene;
    scene_2.add(robot);
    robot.getObjectByName("Glasses").material = glassesMat;
  });

  Promise.all([loader]).then(animate);

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

  // ticks
  var ticks = [];
  var tickGeo = new THREE.BoxBufferGeometry(.75,.01,.15);
  var matBlack = new THREE.MeshBasicMaterial({color: 0x000000});
  var tick = new THREE.Mesh(tickGeo, matBlack);
    tick.position.y = 0.1;
  for(let i = 0; i < 24; i++) {
    ticks.push(tick.clone());
    ticks[i].rotateY(i*Math.PI/12);
    ticks[i].translateX(6.45);
    scene_1.add(ticks[i]);
  }

  // pie
  var slices = 70;
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
          if(pie.length - i - 1 < Math.round((-robotRotation - 2*Math.PI) * pie.length / (2*Math.PI)))
            pie[i].scale.set((pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4,(pie.length - i)/(4*pie.length)+3/4);
          else
            pie[i].scale.set((pie.length - i)/(4*pie.length)+1/2,(pie.length - i)/(4*pie.length)+1/2,(pie.length - i)/(4*pie.length)+1/2);
        }
      }
      else if(robotRotation <= -4*Math.PI && robotRotation > -6*Math.PI) {
        for(var i = 0; i < pie.length; i++) {
          if(pie.length - i - 1 < Math.round((-robotRotation - 4*Math.PI) * pie.length / (2*Math.PI)))
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
  var mouse = new THREE.Vector2();
  var dragging = false;
  var intersection = {};
  var spiralCount = 0;
  var prevRobotRotation = 0;

  document.getElementById("robo_1").addEventListener('mousemove', function(event) {
    mouse.x = ((event.clientX - $("#robo_1").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -(((event.clientY - $("#robo_1").offset().top + $(window).scrollTop()) / 50)) / 3.5 + 1;
    if(!dragging) lineMat.color.set('#000');
    if(!showing) {
      intersection = raycaster.intersectObject(handle);
      for(var i = 0; i < intersection.length; i++) intersection[i].object.material.color.set('#0f0');
      if(dragging) {
        intersection = raycaster.intersectObject(plane);
        robotRotation = Math.atan2(intersection[0].point.z, -intersection[0].point.x);
        if(robotRotation < 0) robotRotation += 2*Math.PI;
        robotRotation += spiralCount;
      }
    }
  }, false);
  document.getElementById("robo_1").addEventListener('mousedown', function() {
    if(!showing) {
      if(raycaster.intersectObject(handle).length > 0) {
        dragging = true;
        spiralCount = Math.floor(robotRotation / (2*Math.PI)) * 2*Math.PI;
        prevRobotRotation = robotRotation;
      }
    }
  }, false);
  document.getElementById("robo_1").addEventListener('mouseup', function() {
    dragging = false;
    if(!showing) robot.rotation.y = robotRotation;
  }, false);

  // BUTTONS
  var turning = 0;
  document.getElementById("leftButton").onmousedown = function() {
    if(!showing) {turning = -1; dragging = false;}
  };
  document.getElementById("leftButton").onmouseup = function() {
    if(!showing) {turning = 0}
  };
  document.getElementById("rightButton").onmousedown = function() {
    if(!showing) {turning = 1;  dragging = false;}
  };
  document.getElementById("rightButton").onmouseup = function() {
    if(!showing) {turning = 0}
  };

  // TURNING
  var robotRotation = 0;
  function turn() {
    var speed = Math.PI/200;
    if(turning > 0) robotRotation -= speed;
    else if(turning < 0) robotRotation += speed;
    robot.rotation.y = robotRotation;
    line.translateY(3.5);
    line.rotation.z = robotRotation - Math.PI/2;
    line.translateY(-3.5);
  }

  var lArmUp = false;
  var lArmMoving = true;
  var rArmUp = false;
  var rArmMoving = true;

  document.getElementById("leftArmButton").addEventListener('click', function() {
    dragging = false;
    if(!showing) {
      if(lArmUp) {
        document.getElementById("leftArmButton").innerHTML = "L&#129093;";
        lArmUp = false;
        lArmMoving = true;
      }
      else {
        document.getElementById("leftArmButton").innerHTML = "L&#129095;";
        lArmUp = true;
        lArmMoving = true;
      }
    }
  });
  document.getElementById("rightArmButton").addEventListener('click', function() {
    dragging = false;
    if(!showing) {
      if(rArmUp) {
        document.getElementById("rightArmButton").innerHTML = "R&#129093;";
        rArmUp = false;
        rArmMoving = true;
      }
      else {
        document.getElementById("rightArmButton").innerHTML = "R&#129095;";
        rArmUp = true;
        rArmMoving = true;
      }
    }
  });

  function rArmHandle() {
    var rArmRot = robot.getObjectByName("rUpperArm").rotation.x;
    if(rArmUp) {
      if(rArmRot < 1.57) {
        robot.getObjectByName("rUpperArm").translateY(.9);
        robot.getObjectByName("rUpperArm").rotateX(.05);
        robot.getObjectByName("rUpperArm").translateY(-.9);
      }
      else rArmMoving = false;
    }
    else {
      if(rArmRot > .25) {
        robot.getObjectByName("rUpperArm").translateY(.9);
        robot.getObjectByName("rUpperArm").rotateX(-.05);
        robot.getObjectByName("rUpperArm").translateY(-.9);
      }
      else rArmMoving = false;
    }
  }
  function lArmHandle() {
    var lArmRot = robot.getObjectByName("lUpperArm").rotation.x;
    if(lArmUp) {
      if(lArmRot < 1.57) {
        robot.getObjectByName("lUpperArm").translateY(.9);
        robot.getObjectByName("lUpperArm").rotateX(.05);
        robot.getObjectByName("lUpperArm").translateY(-.9);
      }
      else lArmMoving = false;
    }
    else {
      if(lArmRot > .25) {
        robot.getObjectByName("lUpperArm").translateY(.9);
        robot.getObjectByName("lUpperArm").rotateX(-.05);
        robot.getObjectByName("lUpperArm").translateY(-.9);
      }
      else lArmMoving = false;
    }
  }

  document.getElementById('roboReset').addEventListener('click', function() {
    dragging = false;
    if(!showing) reset();
  });

  function reset() {
    robotRotation = 0;
    turn();
    pieHandleInput(slices*robotRotation / (2*Math.PI));
    lArmUp = false;
    lArmMoving = true;
    rArmUp = false;
    rArmMoving = true;
    turning = 0;
    document.getElementById("leftArmButton").innerHTML = "L&#129093;";
    document.getElementById("rightArmButton").innerHTML = "R&#129093;";
  }

  function showButtonHandler(showNum) {
    showing = showNum;
    if(showing) {
      reset();
      lArmUp = true;
      lArmMoving = true;
      rArmUp = false;
      rArmMoving = true;
      turning = -1;
      document.getElementById("leftArmButton").innerHTML = "L&#129095;";
    }
  }

  var ex3RandomList = [
    // {code: "\\(\\pi\\) rad.", val: Math.PI},
    {code: "\\(2\\pi\\) rad.", val: 2*Math.PI},
    // {code: "\\(\\dfrac{1}{2}\\pi\\) rad.", val: 1/2*Math.PI},
    {code: "\\(\\dfrac{3}{2}\\pi\\) rad.", val: 3/2*Math.PI},
    {code: "\\(\\dfrac{1}{3}\\pi\\) rad.", val: 1/3*Math.PI},
    {code: "\\(\\dfrac{2}{3}\\pi\\) rad.", val: 2/3*Math.PI},
    {code: "\\(\\dfrac{4}{3}\\pi\\) rad.", val: 4/3*Math.PI},
    {code: "\\(\\dfrac{5}{3}\\pi\\) rad.", val: 5/3*Math.PI},
    {code: "\\(\\dfrac{1}{4}\\pi\\) rad.", val: 1/4*Math.PI},
    {code: "\\(\\dfrac{3}{4}\\pi\\) rad.", val: 3/4*Math.PI},
    {code: "\\(\\dfrac{5}{4}\\pi\\) rad.", val: 5/4*Math.PI},
    {code: "\\(\\dfrac{7}{4}\\pi\\) rad.", val: 7/4*Math.PI},
  ];

  var ex3Target = 0;

  function ex3Randomize() {
    reset();
    let ex3Index = Math.floor(Math.random()*ex3RandomList.length);
    document.getElementById("randX1c").innerHTML = ex3RandomList[ex3Index].code;
    $('#replyX1c').val("");
    document.getElementById('replyX1c').style.backgroundColor = "#fff";
    $('#readoutX1c').val("");
    renderMathInElement(document.body);
    ex3Target = ex3RandomList[ex3Index].val;
  }
  ex3Randomize();

  document.getElementById('refreshButton_1').addEventListener('click', function() {
    ex3Randomize();
  });
  document.getElementById('refreshButton_1').style.cursor = "pointer";

  function show() {
    switch(showing) {
      case 1:
        if(robotRotation < Math.PI) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
      case 2:
        if(robotRotation < Math.PI/2) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
      case 3:
        if(robotRotation < ex3Target) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
    }
  }

  document.getElementById("ShX1a").addEventListener('click', function() {
    if(!showing) showButtonHandler(1);
  });
  document.getElementById('ShX1b').addEventListener('click', function() {
    if(!showing) showButtonHandler(2);
  });
  document.getElementById('ShX1c').addEventListener('click', function() {
    if(!showing) showButtonHandler(3);
  });

  document.getElementById('CkX1a').addEventListener('click', function() {
    if(Math.abs(robotRotation - Math.PI) < .1) { // right
      $('#replyX1a').val("Correct");
      $('#readoutX1a').val("1");
      document.getElementById('replyX1a').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX1a').val("Incorrect");
      $('#readoutX1a').val(Math.round(robot.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX1a').style.backgroundColor = "#f88";
    }
  });

  document.getElementById('CkX1b').addEventListener('click', function() {
    if(Math.abs(robotRotation - (Math.PI/2)) < .1) { // right
      $('#replyX1b').val("Correct");
      $('#readoutX1b').val("1/2");
      document.getElementById('replyX1b').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX1b').val("Inorrect");
      $('#readoutX1b').val(Math.round(robot.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX1b').style.backgroundColor = "#f88";
    }
  });

  document.getElementById('CkX1c').addEventListener('click', function() {
    if(Math.abs(robotRotation - ex3Target) < .1) { // right
      $('#replyX1c').val("Correct");
      $('#readoutX1c').val(Math.round(ex3Target * 100 / Math.PI) / 100);
      document.getElementById('replyX1c').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX1c').val("Incorrect");
      $('#readoutX1c').val(Math.round(robot.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX1c').style.backgroundColor = "#f88";
    }
  });

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse,camera);

    if(!isNaN(robotRotation) && !showing) turn();
    else if(showing) show();

    if(turning) {
      pieHandleInput(slices*robot.rotation.y / (2*Math.PI));
    }

    if(dragging) {
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
      pieHandleInput(slices*robotRotation / (2*Math.PI));
    }

    if(rArmMoving) rArmHandle();
    if(lArmMoving) lArmHandle();

    renderer.autoClear = true;
    renderer.render(scene_1, camera);
    renderer.autoClear = false;
    renderer.render(scene_2, camera);
  }
});
