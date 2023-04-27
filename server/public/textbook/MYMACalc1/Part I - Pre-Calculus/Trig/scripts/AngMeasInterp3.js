$(document).ready( function() {
  // INIT
  var showing = 0;

  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("robo_3"), antialias: true});
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
    camera.position.set(0, 12, -28);
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
  function loadModel(model) {
    return new Promise(function (resolve) {
      loader.load(model, resolve);
    });
  }

  var robot2 = new THREE.Object3D();
  var glassesMat = new THREE.MeshStandardMaterial({color: 0x111111});

  var load2 = loadModel("models/RadianRobot_v04.gltf").then(function(gltf) {
    robot2 = gltf.scene;
    scene_2.add(robot2);
    robot2.getObjectByName("Glasses").material = glassesMat;
  });

  Promise.all([load2]).then(animate).catch(function (err) {
    console.error(err);
  });

  // FLOOR
  var planeGeometry = new THREE.PlaneBufferGeometry( 200, 200, 320, 320 );
  var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.rotateX(-Math.PI/2);
  scene_1.add(plane);

  // UI

  // axes
  // var xModel;
  // loader.load("models/XModel.gltf",
  //   function(gltf) {
  //     xModel = gltf.scene;
  //     xModel.scale.set(.1,.1,.1);
  //     xModel.position.set(-8, 1, 0);
  //     xModel.rotateY(Math.PI/2);
  //     xModel.rotateZ(-Math.PI/2);
  //     scene_2.add(xModel);
  //   }
  // );
  // var yModel;
  // loader.load("models/YModel.gltf",
  //   function(gltf) {
  //     yModel = gltf.scene;
  //     yModel.scale.set(.1,.1,.1);
  //     yModel.position.set(0, 1, 8);
  //     yModel.rotateY(Math.PI/2);
  //     yModel.rotateZ(-Math.PI/2);
  //     scene_2.add(yModel);
  //   }
  // );
  var axisGeo = new THREE.BoxBufferGeometry(16, .01, .175);
  var axisArrowGeo = new THREE.ConeBufferGeometry(.2, .5, 10);
  var axisMat = new THREE.MeshBasicMaterial({color:0x000022});
  axisArrow1 = new THREE.Mesh(axisArrowGeo, axisMat);
  axisArrow1.position.set(-8,.01,0);
  axisArrow1.rotateZ(Math.PI/2);
  var axisArrow2 = axisArrow1.clone();
  var axes = [
    new THREE.Mesh(axisGeo, axisMat),
    new THREE.Mesh(axisGeo, axisMat)
  ];
  axes[0].add(axisArrow1);
  axes[1].add(axisArrow2);
  axes[1].rotateY(Math.PI/2);
  for(let i in axes) {
    axes[i].position.y = 0.1;
    scene_2.add(axes[i]);
  }

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

  // Labels
  var label_x = makeTextSprite("x", {fontface: "Georgia", fontstyle: "Italic", fontsize: 38});
  scene_2.add(label_x);
  label_x.position.set(-8, 2, 0);
  var label_y = makeTextSprite("y", {fontface: "Georgia", fontsize: 38});
  scene_2.add(label_y);
  label_y.position.set(0, 2, 8);

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

  document.getElementById("robo_3").addEventListener('mousemove', function(event) {
    mouse.x = ((event.clientX - $("#robo_3").offset().left + $(window).scrollLeft()) / 50) / 3.5 - 1;
    mouse.y = -(((event.clientY - $("#robo_3").offset().top + $(window).scrollTop()) / 50)) / 3.5 + 1;
    if(!dragging) lineMat.color.set('#000');
    if(!showing) {
      intersection = raycaster.intersectObject(handle);
      for(var i = 0; i < intersection.length; i++) intersection[i].object.material.color.set('#0f0');
      if(dragging) {
        intersection = raycaster.intersectObject(plane);
        robotRotation = Math.atan2(intersection[0].point.z, -intersection[0].point.x);
        if(robotRotation < 0) robotRotation += 2*Math.PI;
        robotRotation += spiralCount;
    }}}, false);
  document.getElementById("robo_3").addEventListener('mousedown', function() {
    if(!showing) {
      if(raycaster.intersectObject(handle).length > 0) {
        dragging = true;
        spiralCount = Math.floor(robotRotation / (2*Math.PI)) * 2*Math.PI;
        prevRobotRotation = robotRotation;
      }
    }
  }, false);
  document.getElementById("robo_3").addEventListener('mouseup', function() {
    dragging = false;
    if(!showing) robot2.rotation.y = robotRotation;
  }, false);

  // BUTTONS
  var turning = 0;
  document.getElementById("leftButton_3").onmousedown = function() {
    if(!showing) {turning = -1; dragging = false;}
  };
  document.getElementById("leftButton_3").onmouseup = function() {
    if(!showing) {turning = 0}
  };
  document.getElementById("rightButton_3").onmousedown = function() {
    if(!showing) {turning = 1;  dragging = false;}
  };
  document.getElementById("rightButton_3").onmouseup = function() {
    if(!showing) {turning = 0}
  };

  // TURNING
  var robotRotation = 0;
  function turn() {
    var speed = Math.PI/200;
    if(turning > 0) robotRotation -= speed;
    else if(turning < 0) robotRotation += speed;
    robot2.rotation.y = robotRotation;
    line.translateY(3.5);
    line.rotation.z = robotRotation - Math.PI/2;
    line.translateY(-3.5);
  }

  var lArmUp = false;
  var lArmMoving = true;
  var rArmUp = false;
  var rArmMoving = true;

  document.getElementById("leftArmButton_3").addEventListener('click', function() {
    dragging = false;
    if(!showing) {
      if(lArmUp) {
        document.getElementById("leftArmButton_3").innerHTML = "L&#129093;";
        lArmUp = false;
        lArmMoving = true;
      }
      else {
        document.getElementById("leftArmButton_3").innerHTML = "L&#129095;";
        lArmUp = true;
        lArmMoving = true;
      }
    }
  });
  document.getElementById("rightArmButton_3").addEventListener('click', function() {
    dragging = false;
    if(!showing) {
      if(rArmUp) {
        document.getElementById("rightArmButton_3").innerHTML = "R&#129093;";
        rArmUp = false;
        rArmMoving = true;
      }
      else {
        document.getElementById("rightArmButton_3").innerHTML = "R&#129095;";
        rArmUp = true;
        rArmMoving = true;
      }
    }
  });


  function rArmHandle() {
    var rArmRot = robot2.getObjectByName("rUpperArm").rotation.x;
    if(rArmUp) {
      if(rArmRot < 1.57) {
        robot2.getObjectByName("rUpperArm").translateY(.9);
        robot2.getObjectByName("rUpperArm").rotateX(.05);
        robot2.getObjectByName("rUpperArm").translateY(-.9);
      }
      else rArmMoving = false;
    }
    else {
      if(rArmRot > .25) {
        robot2.getObjectByName("rUpperArm").translateY(.9);
        robot2.getObjectByName("rUpperArm").rotateX(-.05);
        robot2.getObjectByName("rUpperArm").translateY(-.9);
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
      }
      else lArmMoving = false;
    }
    else {
      if(lArmRot > .25) {
        robot2.getObjectByName("lUpperArm").translateY(.9);
        robot2.getObjectByName("lUpperArm").rotateX(-.05);
        robot2.getObjectByName("lUpperArm").translateY(-.9);
      }
      else lArmMoving = false;
    }
  }

  document.getElementById('roboReset_3').addEventListener('click', function() {
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
    document.getElementById("leftArmButton_3").innerHTML = "L&#129093;";
    document.getElementById("rightArmButton_3").innerHTML = "R&#129093;";
  }

  function showButtonHandler(showNum) {
    showing = showNum;
    if(showing) {
      reset();
      if(showing == 1 || (showing == 3 && ex3Target > 0) || (showing == 4 && ex3dTarget2 > 0)) {
        lArmUp = true;
        lArmMoving = true;
        rArmUp = false;
        rArmMoving = true;
        turning = -1;
        document.getElementById("rightArmButton_3").innerHTML = "R&#129093;";
        document.getElementById("leftArmButton_3").innerHTML = "L&#129095;";
      }
      else {
        lArmUp = false;
        lArmMoving = true;
        rArmUp = true;
        rArmMoving = true;
        turning = 1;
        document.getElementById("leftArmButton_3").innerHTML = "L&#129093;";
        document.getElementById("rightArmButton_3").innerHTML = "R&#129095;";
      }
    }
  }

  var ex3RandomList = [
    {code: "\\(\\pi\\) rad", val: Math.PI},
    {code: "\\(2\\pi\\) rad", val: 2*Math.PI},
    // {code: "\\(\\dfrac{1}{2}\\pi\\) rad", val: 1/2*Math.PI},
    {code: "\\(\\dfrac{3}{2}\\pi\\) rad", val: 3/2*Math.PI},
    {code: "\\(\\dfrac{1}{3}\\pi\\) rad", val: 1/3*Math.PI},
    {code: "\\(\\dfrac{2}{3}\\pi\\) rad", val: 2/3*Math.PI},
    {code: "\\(\\dfrac{4}{3}\\pi\\) rad", val: 4/3*Math.PI},
    {code: "\\(\\dfrac{5}{3}\\pi\\) rad", val: 5/3*Math.PI},
    {code: "\\(\\dfrac{1}{4}\\pi\\) rad", val: 1/4*Math.PI},
    {code: "\\(\\dfrac{3}{4}\\pi\\) rad", val: 3/4*Math.PI},
    {code: "\\(\\dfrac{5}{4}\\pi\\) rad", val: 5/4*Math.PI},
    {code: "\\(\\dfrac{7}{4}\\pi\\) rad", val: 7/4*Math.PI},
    {code: "\\(-\\pi\\) rad", val: -Math.PI},
    {code: "\\(-2\\pi\\) rad", val: -2*Math.PI},
    // {code: "\\(-\\dfrac{1}{2}\\pi\\) rad", val: -1/2*Math.PI},
    {code: "\\(-\\dfrac{3}{2}\\pi\\) rad", val: -3/2*Math.PI},
    {code: "\\(-\\dfrac{1}{3}\\pi\\) rad", val: -1/3*Math.PI},
    {code: "\\(-\\dfrac{2}{3}\\pi\\) rad", val: -2/3*Math.PI},
    {code: "\\(-\\dfrac{4}{3}\\pi\\) rad", val: -4/3*Math.PI},
    {code: "\\(-\\dfrac{5}{3}\\pi\\) rad", val: -5/3*Math.PI},
    {code: "\\(-\\dfrac{1}{4}\\pi\\) rad", val: -1/4*Math.PI},
    {code: "\\(-\\dfrac{3}{4}\\pi\\) rad", val: -3/4*Math.PI},
    {code: "\\(-\\dfrac{5}{4}\\pi\\) rad", val: -5/4*Math.PI},
    {code: "\\(-\\dfrac{7}{4}\\pi\\) rad", val: -7/4*Math.PI},
  ];

  var ex3Target = 0;

  function ex3Randomize() {
    reset();
    let ex3Index = Math.floor(Math.random()*ex3RandomList.length);
    document.getElementById("randX3c").innerHTML = ex3RandomList[ex3Index].code;
    $('#replyX3c').val("");
    $('#readoutX3c').val("");
    document.getElementById('replyX3c').style.backgroundColor = "#fff";
    renderMathInElement(document.body);
    ex3Target = ex3RandomList[ex3Index].val;
  }
  ex3Randomize();

  document.getElementById('refreshButton_3').addEventListener('click', function() {
    ex3Randomize();
  });

  var ex3dTarget1;
  var ex3dTarget2;

  function ex3dRandomize() {
    reset();
    let ex3dIndex1 = Math.floor(Math.random()*ex3RandomList.length);
    let ex3dIndex2 = Math.floor(Math.random()*ex3RandomList.length);
    document.getElementById("randX3d1").innerHTML = ex3RandomList[ex3dIndex1].code;
    document.getElementById("randX3d2").innerHTML = ex3RandomList[ex3dIndex2].code;
    $('#replyX3d').val("");
    $('#readoutX3d').val("");
    document.getElementById('replyX3d').style.backgroundColor = "#fff";
    renderMathInElement(document.body);
    ex3dTarget1 = ex3RandomList[ex3dIndex1].val;
    ex3dTarget2 = ex3RandomList[ex3dIndex1].val + ex3RandomList[ex3dIndex2].val;
  }
  ex3dRandomize();

  document.getElementById('refreshButton_3d').addEventListener('click', function() {
    ex3dRandomize();
  });

  function show() {
    switch(showing) {
      case 1:
        if(robotRotation < Math.PI/2) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
      case 2:
        if(robotRotation > -Math.PI/2) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
      case 3:
        if(ex3Target > 0) {
          if(robotRotation < ex3Target) turn();
          else {
            showing = 0;
            turning = 0;
          }
        }
        else if(robotRotation > ex3Target) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
      case 4:
        if(ex3dTarget2 > 0) {
          if(robotRotation < ex3dTarget2) turn();
          else {
            showing = 0;
            turning = 0;
          }
        }
        else if(robotRotation > ex3dTarget2) turn();
        else {
          showing = 0;
          turning = 0;
        }
      break;
    }
  }

  document.getElementById("ShX3a").addEventListener('click', function() {
    if(!showing) showButtonHandler(1);
  });
  document.getElementById('ShX3b').addEventListener('click', function() {
    if(!showing) showButtonHandler(2);
  });
  document.getElementById('ShX3c').addEventListener('click', function() {
    if(!showing) showButtonHandler(3);
  });
  document.getElementById('ShX3d').addEventListener('click', function() {
    if(!showing) showButtonHandler(4);
  });

  document.getElementById('CkX3a').addEventListener('click', function() {
    if(Math.abs(robotRotation - Math.PI/2) < .1) { // right
      $('#replyX3a').val("Correct");
      $('#readoutX3a').val("1/2");
      document.getElementById('replyX3a').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX3a').val("Incorrect");
      $('#readoutX3a').val(Math.round(robot2.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX3a').style.backgroundColor = "#f88";
    }
  });

  document.getElementById('CkX3b').addEventListener('click', function() {
    if(Math.abs(robotRotation - (-Math.PI/2)) < .1) { // right
      $('#replyX3b').val("Correct");
      $('#readoutX3b').val("-1/2");
      document.getElementById('replyX3b').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX3b').val("Incorrect");
      $('#readoutX3b').val(Math.round(robot2.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX3b').style.backgroundColor = "#f88";
    }
  });

  document.getElementById('CkX3c').addEventListener('click', function() {
    if(Math.abs(robotRotation - ex3Target) < .1) { // right
      $('#replyX3c').val("Correct");
      $('#readoutX3c').val(Math.round(ex3Target * 100 / Math.PI) / 100);
      document.getElementById('replyX3c').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX3c').val("Incorrect");
      $('#readoutX3c').val(Math.round(robot2.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX3c').style.backgroundColor = "#f88";
    }
  });

  document.getElementById('CkX3d').addEventListener('click', function() {
    if(Math.abs(robotRotation - ex3dTarget2) < .1) { // right
      $('#replyX3d').val("Correct");
      $('#readoutX3d').val(Math.round(ex3dTarget2 * 100 / Math.PI) / 100);
      document.getElementById('replyX3d').style.backgroundColor = "#8f8";
    }
    else { // wrong
      $('#replyX3d').val("Incorrect");
      $('#readoutX3d').val(Math.round(robot2.rotation.y * 100 / Math.PI) / 100);
      document.getElementById('replyX3d').style.backgroundColor = "#f88";
    }
  });

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse,camera);

    if(!isNaN(robotRotation) && !showing) turn();
    else if(showing) show();

    if(turning) {
      pieHandleInput(slices*robot2.rotation.y / (2*Math.PI));
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
