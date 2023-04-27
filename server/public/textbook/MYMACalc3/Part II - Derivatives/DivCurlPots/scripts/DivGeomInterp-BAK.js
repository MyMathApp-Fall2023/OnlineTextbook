
  // import { Line2 } from 'https://threejs.org/examples/jsm/lines/Line2.js';
	// import { LineMaterial } from 'https://threejs.org/examples/jsm/lines/LineMaterial.js';
	// import { LineGeometry } from 'https://threejs.org/examples/jsm/lines/LineGeometry.js';
  // import { GeometryUtils } from 'https://threejs.org/examples/jsm/utils/GeometryUtils.js';

$(document).ready(function() {


  // globals
  var scale1d1 = false;
  var scale1d2 = false;
  var scale2d1 = false;
  var scale2d2 = false;
  var scale2d3 = false;
  var scale2d4 = false;
  var arrowsMoving1d1 = false;
  var arrowsMoving1d2 = false;
  var arrowsMoving2d1 = false;
  var arrowsMoving2d2 = false;
  var arrowsMoving2d3 = false;
  var arrowsMoving2d4 = false;
  var pointMoving1d1 = false;
  var pointMoving1d2 = false;
  var pointMoving2d1 = false;
  var pointMoving2d2 = false;
  var pointMoving2d3 = false;
  var pointMoving2d4 = false;
  var arrow_plus1d1;
  var arrow_minus1d1;
  var arrow_plus1d2;
  var arrow_minus1d2;
  var arrow_1_2d1;
  var arrow_2_2d1;
  var arrow_3_2d1;
  var arrow_4_2d1;
  var arrow_5_2d1;
  var arrow_6_2d1;
  var arrow_7_2d1;
  var arrow_8_2d1;
  var arrow_1_2d2;
  var arrow_2_2d2;
  var arrow_3_2d2;
  var arrow_4_2d2;
  var arrow_5_2d2;
  var arrow_6_2d2;
  var arrow_7_2d2;
  var arrow_8_2d2;
  var arrow_1_2d3;
  var arrow_2_2d3;
  var arrow_3_2d3;
  var arrow_4_2d3;
  var arrow_5_2d3;
  var arrow_6_2d3;
  var arrow_7_2d3;
  var arrow_8_2d3;
  var arrow_1_2d4;
  var arrow_2_2d4;
  var arrow_3_2d4;
  var arrow_4_2d4;
  var arrow_5_2d4;
  var arrow_6_2d4;
  var arrow_7_2d4;
  var arrow_8_2d4;
  var circleVectors1d1 = new THREE.Object3D();
  var circleVectors1d2 = new THREE.Object3D();
  var circleVectors2d1 = new THREE.Object3D();
  var circleVectors2d2 = new THREE.Object3D();
  var circleVectors2d3 = new THREE.Object3D();
  var circleVectors2d4 = new THREE.Object3D();
  var mousex = 0;
  var mousey = 0;
  var dist = 0;

  // THICK ARROWS
  function thickArrow(arrow, scene) {
    var geometry = new THREE.Geometry();

    geometry.vertices.push(
    	new THREE.Vector3(-.07, 1, 0),
    	new THREE.Vector3(-.07, 0, 0),
    	new THREE.Vector3(.07, 0, 0),
      new THREE.Vector3(.07, 1, 0)
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ), new THREE.Face3(0, 2, 3) );

    geometry.computeBoundingSphere();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var mesh = new THREE.Mesh( geometry, material );
    arrow.add(mesh);
  }

  function cameraScale(camera, scale) {
    camera.zoom = scale;
    camera.updateProjectionMatrix();
  }

  var camera1d1 = new THREE.OrthographicCamera(-6, 6, 1, -1,0.1,3000);
    camera1d1.position.z = 4;
  var camera1d1_scale = 1;

  var camera1d2 = new THREE.OrthographicCamera(-6, 6, 1, -1,0.1,3000);
    camera1d2.position.z = 4;
  var camera1d2_scale = 1;

  var pointgeom = new THREE.SphereGeometry(0.2, 50, 50);
  var pointMat1d = new THREE.MeshBasicMaterial({color: 0x00cc00});

  var shellGeom1 = new THREE.CircleGeometry(1,100);
  shellGeom1.vertices.shift();
  var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aa00});
  var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ff00});

  function setShellSize(shell, camera_scale) {
    dist = Math.sqrt((shell.position.x * camera_scale - mousex)*(shell.position.x * camera_scale - mousex) + (shell.position.y * camera_scale - mousey)*(shell.position.y * camera_scale - mousey));
    if(dist/camera_scale > .2/camera_scale) shell.scale.set(dist/camera_scale, dist/camera_scale, dist/camera_scale); // limit scaling according to camera zoom
  }

  function initShellArrows() {
    // 1d1
    arrow_plus1d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    thickArrow(arrow_plus1d1, scene1d1);
    arrow_minus1d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    thickArrow(arrow_minus1d1, scene1d1);

    circleVectors1d1.add(arrow_plus1d1);
    circleVectors1d1.add(arrow_minus1d1);

    arrow_plus1d1.position.z = 2;
    arrow_minus1d1.position.z = 2;

    scene1d1.add(circleVectors1d1);

    moveArrows1d1();

    //1d2
    arrow_plus1d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    thickArrow(arrow_plus1d2, scene1d2);
    arrow_minus1d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    thickArrow(arrow_minus1d2, scene1d2);

    arrow_plus1d2.position.z = 2;
    arrow_minus1d2.position.z = 2;

    circleVectors1d2.add(arrow_plus1d2);
    circleVectors1d2.add(arrow_minus1d2);

    scene1d2.add(circleVectors1d2);

    moveArrows1d2();

    //2d1
    arrow_1_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_2d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_2d1, scene2d1);
    thickArrow(arrow_2_2d1, scene2d1);
    thickArrow(arrow_3_2d1, scene2d1);
    thickArrow(arrow_4_2d1, scene2d1);
    thickArrow(arrow_5_2d1, scene2d1);
    thickArrow(arrow_6_2d1, scene2d1);
    thickArrow(arrow_7_2d1, scene2d1);
    thickArrow(arrow_8_2d1, scene2d1);

    arrow_1_2d1.position.z = 2;
    arrow_2_2d1.position.z = 2;
    arrow_3_2d1.position.z = 2;
    arrow_4_2d1.position.z = 2;
    arrow_5_2d1.position.z = 2;
    arrow_6_2d1.position.z = 2;
    arrow_7_2d1.position.z = 2;
    arrow_8_2d1.position.z = 2;

    circleVectors2d1.add(arrow_1_2d1);
    circleVectors2d1.add(arrow_2_2d1);
    circleVectors2d1.add(arrow_3_2d1);
    circleVectors2d1.add(arrow_4_2d1);
    circleVectors2d1.add(arrow_5_2d1);
    circleVectors2d1.add(arrow_6_2d1);
    circleVectors2d1.add(arrow_7_2d1);
    circleVectors2d1.add(arrow_8_2d1);

    scene2d1.add(circleVectors2d1);

    moveArrows2d1();

    //2d2
    arrow_1_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_2d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_2d2, scene2d2);
    thickArrow(arrow_2_2d2, scene2d2);
    thickArrow(arrow_3_2d2, scene2d2);
    thickArrow(arrow_4_2d2, scene2d2);
    thickArrow(arrow_5_2d2, scene2d2);
    thickArrow(arrow_6_2d2, scene2d2);
    thickArrow(arrow_7_2d2, scene2d2);
    thickArrow(arrow_8_2d2, scene2d2);

    arrow_1_2d2.position.z = 2;
    arrow_2_2d2.position.z = 2;
    arrow_3_2d2.position.z = 2;
    arrow_4_2d2.position.z = 2;
    arrow_5_2d2.position.z = 2;
    arrow_6_2d2.position.z = 2;
    arrow_7_2d2.position.z = 2;
    arrow_8_2d2.position.z = 2;

    circleVectors2d2.add(arrow_1_2d2);
    circleVectors2d2.add(arrow_2_2d2);
    circleVectors2d2.add(arrow_3_2d2);
    circleVectors2d2.add(arrow_4_2d2);
    circleVectors2d2.add(arrow_5_2d2);
    circleVectors2d2.add(arrow_6_2d2);
    circleVectors2d2.add(arrow_7_2d2);
    circleVectors2d2.add(arrow_8_2d2);

    scene2d2.add(circleVectors2d2);

    moveArrows2d2();

    // 2d3
    arrow_1_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_2d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_2d3, scene2d3);
    thickArrow(arrow_2_2d3, scene2d3);
    thickArrow(arrow_3_2d3, scene2d3);
    thickArrow(arrow_4_2d3, scene2d3);
    thickArrow(arrow_5_2d3, scene2d3);
    thickArrow(arrow_6_2d3, scene2d3);
    thickArrow(arrow_7_2d3, scene2d3);
    thickArrow(arrow_8_2d3, scene2d3);

    arrow_1_2d3.position.z = 2;
    arrow_2_2d3.position.z = 2;
    arrow_3_2d3.position.z = 2;
    arrow_4_2d3.position.z = 2;
    arrow_5_2d3.position.z = 2;
    arrow_6_2d3.position.z = 2;
    arrow_7_2d3.position.z = 2;
    arrow_8_2d3.position.z = 2;

    circleVectors2d3.add(arrow_1_2d3);
    circleVectors2d3.add(arrow_2_2d3);
    circleVectors2d3.add(arrow_3_2d3);
    circleVectors2d3.add(arrow_4_2d3);
    circleVectors2d3.add(arrow_5_2d3);
    circleVectors2d3.add(arrow_6_2d3);
    circleVectors2d3.add(arrow_7_2d3);
    circleVectors2d3.add(arrow_8_2d3);

    scene2d3.add(circleVectors2d3);

    moveArrows2d3();

    // 2d4
    arrow_1_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_2d4 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_2d4, scene2d4);
    thickArrow(arrow_2_2d4, scene2d4);
    thickArrow(arrow_3_2d4, scene2d4);
    thickArrow(arrow_4_2d4, scene2d4);
    thickArrow(arrow_5_2d4, scene2d4);
    thickArrow(arrow_6_2d4, scene2d4);
    thickArrow(arrow_7_2d4, scene2d4);
    thickArrow(arrow_8_2d4, scene2d4);

    arrow_1_2d4.position.z = 2;
    arrow_2_2d4.position.z = 2;
    arrow_3_2d4.position.z = 2;
    arrow_4_2d4.position.z = 2;
    arrow_5_2d4.position.z = 2;
    arrow_6_2d4.position.z = 2;
    arrow_7_2d4.position.z = 2;
    arrow_8_2d4.position.z = 2;

    circleVectors2d4.add(arrow_1_2d4);
    circleVectors2d4.add(arrow_2_2d4);
    circleVectors2d4.add(arrow_3_2d4);
    circleVectors2d4.add(arrow_4_2d4);
    circleVectors2d4.add(arrow_5_2d4);
    circleVectors2d4.add(arrow_6_2d4);
    circleVectors2d4.add(arrow_7_2d4);
    circleVectors2d4.add(arrow_8_2d4);

    scene2d4.add(circleVectors2d4);

    moveArrows2d4();
  }

  //  code from online source to prevent scrolling when wanted
  function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }

  // handling scrolling over canvasses
  // document.getElementById("1d1").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("1d1").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale1d1 = false;
    arrowsMoving1d1 = false;
    pointMoving1d1 = false;
  });

  // document.getElementById("1d2").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("1d2").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale1d2 = false;
    arrowsMoving1d2 = false;
    pointMoving1d2 = false;
  });

  // document.getElementById("2d1").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("2d1").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale2d1 = false;
    arrowsMoving2d1 = false;
    pointMoving2d1 = false;
  });

  // document.getElementById("2d2").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("2d2").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale2d2 = false;
    arrowsMoving2d2 = false;
    pointMoving2d2 = false;
  });

  // document.getElementById("2d3").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("2d3").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale2d3 = false;
    arrowsMoving2d3 = false;
    pointMoving2d3 = false;
  });

  // document.getElementById("2d4").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("2d4").addEventListener('mouseout', function(event) {
    // enableScroll();
    scale2d4 = false;
    arrowsMoving2d4 = false;
    pointMoving2d4 = false;
  });

    //First 1D graph

  function fx1d1(x) {
    return x+2;
  }

  var renderer1d1 = new THREE.WebGLRenderer({canvas: document.getElementById("1d1"), antialias: true});
    //ClearColor is just the background
    renderer1d1.setClearColor(0xf0f0f0);
    renderer1d1.setPixelRatio(window.devicePixelRatio);
    renderer1d1.setSize(600,100);  //in pixels
  var scene1d1 = new THREE.Scene();

document.getElementById("1d1").addEventListener('mousemove', function(event) {
  mousex = ((event.clientX - $(`#1d1`).offset().left + $(window).scrollLeft()) / 50) - 6;
  mousey = -(((event.clientY - $(`#1d1`).offset().top + $(window).scrollTop()) / 50) - 1);
  dist = Math.sqrt((shell1d1.position.x * camera1d1_scale - mousex)*(shell1d1.position.x * camera1d1_scale - mousex) + (shell1d1.position.y - mousey)*(shell1d1.position.y - mousey));
  if(Math.abs(dist - shell1d1.scale.x*camera1d1_scale) <= .1)  {
    renderer1d1.domElement.style.cursor = "pointer";
    shell1d1.material = shellMat2;
  }
  else {
    if(dist - point1d1.scale.x*camera1d1_scale/5 >= 0) renderer1d1.domElement.style.cursor = "auto";
    else renderer1d1.domElement.style.cursor = "pointer";
    shell1d1.material = shellMat1;
  }
});

// document.getElementById("1d1").addEventListener("wheel", function(e){
//   var e = window.event;
//   var delta = e.deltaY;
//   if(delta > 0) {
//     if(camera1d1_scale < 1.9) camera1d1_scale += .1;
//   }
//   else {
//     if(camera1d1_scale > .6) camera1d1_scale -= .1;
//   }
//   cameraScale(camera1d1, camera1d1_scale);
//   point1d1.scale.set(.5/camera1d1_scale, .5/camera1d1_scale, .5/camera1d1_scale);
// });

document.getElementById("1d1").addEventListener('mousedown', function(event) {
  if(Math.abs(dist - shell1d1.scale.x*camera1d1_scale) <= .1) {
    scale1d1 = true;
    arrowsMoving1d1 = true;
  }
  else if(dist - point2d1.scale.x*camera2d1_scale/5 < 0) {
    pointMoving1d1 = true;
    arrowsMoving1d1 = true;
  }
});

document.getElementById("1d1").addEventListener('mouseup', function() {
  scale1d1 = false;
  arrowsMoving1d1 = false;
  pointMoving1d1 = false;
  if(Math.abs(dist - shell1d1.scale.x*camera1d1_scale) <= .1)  {
    renderer1d1.domElement.style.cursor = "pointer";
    shell1d1.material = shellMat2;
  }
  else {
    if(dist - point1d1.scale.x*camera1d1_scale/5 >= 0) renderer1d1.domElement.style.cursor = "auto";
    else renderer1d1.domElement.style.cursor = "pointer";
    shell1d1.material = shellMat1;
  }
} );

  var vectorField1d1 = FormVectorField1D({
      xmin: -12,
      xmax: 12,
      ymin: -2,
      ymax: 2,
      dx: fx1d1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25,
      tail: 1
  });
  scene1d1.add(vectorField1d1);
  var point1d1 = new THREE.Mesh(pointgeom, pointMat1d);
  scene1d1.add(point1d1);
  point1d1.scale.set(.5, .5, .5);
  point1d1.position.z = 2;
  var shell1d1 = new THREE.Line(shellGeom1, shellMat1);
  scene1d1.add(shell1d1);
  // var dragControls1d1 = new THREE.DragControls([point1d1], camera1d1, renderer1d1.domElement);
  // dragControls1d1.addEventListener( 'drag', function ( event ) {
  //   if (point1d1.position.x < -6) point1d1.position.x = -6;
  //   if (point1d1.position.x > 6) point1d1.position.x = 6;
  //   point1d1.position.y = 0;
  //   shell1d1.position.copy(point1d1.position);
  //   arrowsMoving1d1 = true;
  // });

  //Now for the second

  function fx1d2(x) {
    return 2-x;
  }
  var renderer1d2 = new THREE.WebGLRenderer({canvas: document.getElementById("1d2"), antialias: true});
    //ClearColor is just the background
    renderer1d2.setClearColor(0xf0f0f0);
    renderer1d2.setPixelRatio(window.devicePixelRatio);
    renderer1d2.setSize(600,100);  //in pixels
  var scene1d2 = new THREE.Scene();
  var vectorField1d2 = FormVectorField1D({
      xmin: -12,
      xmax: 12,
      ymin: -2,
      ymax: 2,
      dx: fx1d2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  scene1d2.add(vectorField1d2);
  var point1d2 = new THREE.Mesh(pointgeom, pointMat1d);
  scene1d2.add(point1d2);
  point1d2.scale.set(.5, .5, .5);
  point1d2.position.z = 2;
  var shell1d2 = new THREE.Line(shellGeom1, shellMat1);
  scene1d2.add(shell1d2);
  // var dragControls1d2 = new THREE.DragControls([point1d2], camera1d2, renderer1d2.domElement);
  // dragControls1d2.addEventListener( 'drag', function ( event ) {
  //   if (point1d2.position.x < -6) point1d2.position.x = -6;
  //   if (point1d2.position.x > 6) point1d2.position.x = 6;
  //   point1d2.position.y = 0;
  //   shell1d2.position.copy(point1d2.position);
  // });

  document.getElementById("1d2").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#1d2`).offset().left + $(window).scrollLeft()) / 50) - 6;
    mousey = -(((event.clientY - $(`#1d2`).offset().top + $(window).scrollTop()) / 50) - 1);
    dist = Math.sqrt((shell1d2.position.x * camera1d2_scale - mousex)*(shell1d2.position.x * camera1d2_scale - mousex) + (shell1d2.position.y - mousey)*(shell1d2.position.y - mousey));
    if(Math.abs(dist - shell1d2.scale.x*camera1d2_scale) <= .1)  {
      renderer1d2.domElement.style.cursor = "pointer";
      shell1d2.material = shellMat2;
    }
    else {
      if(dist - point1d2.scale.x*camera1d2_scale/5 >= 0) renderer1d2.domElement.style.cursor = "auto";
      else renderer1d2.domElement.style.cursor = "pointer";
      shell1d2.material = shellMat1;
    }
  });

  // document.getElementById("1d2").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(camera1d2_scale < 1.9) camera1d2_scale += .1;
  //   }
  //   else {
  //     if(camera1d2_scale > .6) camera1d2_scale -= .1;
  //   }
  //   cameraScale(camera1d2, camera1d2_scale);
  //   point1d2.scale.set(.5/camera1d2_scale, .5/camera1d2_scale, .5/camera1d2_scale);
  // });

  document.getElementById("1d2").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shell1d2.position.x * camera1d2_scale - mousex)*(shell1d2.position.x * camera1d2_scale - mousex) + (shell1d2.position.y - mousey)*(shell1d2.position.y - mousey));
    if(Math.abs(dist - shell1d2.scale.x*camera1d2_scale) <= .1)  scale1d2 = true;
    else if(dist - point2d1.scale.x*camera2d1_scale/5 < 0) {
      pointMoving1d2 = true;
      arrowsMoving1d2 = true;
    }
    arrowsMoving1d2 = true;
  });

  document.getElementById("1d2").addEventListener('mouseup', function() {
    scale1d2 = false;
    arrowsMoving1d2 = false;
    pointMoving1d2 = false;
    if(Math.abs(dist - shell1d2.scale.x*camera1d2_scale) <= .1)  {
      renderer1d2.domElement.style.cursor = "pointer";
      shell1d2.material = shellMat2;
    }
    else {
      if(dist - point1d2.scale.x*camera1d2_scale/5 >= 0) renderer1d2.domElement.style.cursor = "auto";
      else renderer1d2.domElement.style.cursor = "pointer";
      shell1d2.material = shellMat1;
    }
  } );

  //Onto 2D graphs
//x+2, y-1
//-x+2, -y-1

  //used for all
  var camera2d1 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera2d1.position.z = 4;
  var camera2d1_scale = 1;

  var camera2d2 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera2d2.position.z = 4;
  var camera2d2_scale = 1;

  var camera2d3 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera2d3.position.z = 4;
  var camera2d3_scale = 1;

  var camera2d4 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera2d4.position.z = 4;
  var camera2d4_scale = 1;

  var pointgeom = new THREE.SphereGeometry(0.2, 50, 50);

  //first 2D

  function fx2d1(x,y) {
    return x+2;
  }
  function fy2d1(x,y) {
    return y-1;
  }

  var renderer2d1 = new THREE.WebGLRenderer({canvas: document.getElementById("2d1"), antialias: true});
    //ClearColor is just the background
    renderer2d1.setClearColor(0xf0f0f0);
    renderer2d1.setPixelRatio(window.devicePixelRatio);
    renderer2d1.setSize(250,250);  //in pixels
  var scene2d1 = new THREE.Scene();
  var vectorField2d1 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx2d1,
      dy: fy2d1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  scene2d1.add(vectorField2d1);
  var point2d1 = new THREE.Mesh(pointgeom, pointMat1d);
  point2d1.position.z = 2;
  scene2d1.add(point2d1);
  var shell2d1 = new THREE.Line(shellGeom1, shellMat1);
  shell2d1.scale.set(2,2,2);
  scene2d1.add(shell2d1);
  // var dragControls2d1 = new THREE.DragControls([point2d1], camera2d1, renderer2d1.domElement);
  // dragControls2d1.addEventListener( 'drag', function ( event ) {
  //   if (point2d1.position.x < -5) point2d1.position.x = -5;
  //   if (point2d1.position.x > 5) point2d1.position.x = 5;
  //   if (point2d1.position.y < -5) point2d1.position.y = -5;
  //   if (point2d1.position.y > 5) point2d1.position.y = 5;
  //   shell2d1.position.copy(point2d1.position);
  // });

  // document.getElementById("2d1").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(camera2d1_scale < 1.9) camera2d1_scale += .1;
  //   }
  //   else {
  //     if(camera2d1_scale > .6) camera2d1_scale -= .1;
  //   }
  //   cameraScale(camera2d1, camera2d1_scale);
  //   point2d1.scale.set(1/camera2d1_scale, 1/camera2d1_scale, 1/camera2d1_scale);
  // });

  document.getElementById("2d1").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#2d1`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#2d1`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shell2d1.position.x * camera2d1_scale - mousex)*(shell2d1.position.x * camera2d1_scale - mousex) + (shell2d1.position.y * camera2d1_scale - mousey)*(shell2d1.position.y * camera2d1_scale - mousey));
    if(Math.abs(dist - shell2d1.scale.x*camera2d1_scale) <= .1)  {
      renderer2d1.domElement.style.cursor = "pointer";
      shell2d1.material = shellMat2;
    }
    else {
      if(dist - point2d1.scale.x*camera2d1_scale/5 >= 0) renderer2d1.domElement.style.cursor = "auto";
      else renderer2d1.domElement.style.cursor = "pointer";
      shell2d1.material = shellMat1;
    }
  });

  document.getElementById("2d1").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shell2d1.position.x * camera2d1_scale - mousex)*(shell2d1.position.x * camera2d1_scale - mousex) + (shell2d1.position.y * camera2d1_scale - mousey)*(shell2d1.position.y * camera2d1_scale - mousey));
    if(Math.abs(dist - shell2d1.scale.x*camera2d1_scale) <= .1) scale2d1 = true;
    else if(dist - point2d1.scale.x*camera2d1_scale/5 < 0) {
      pointMoving2d1 = true;
      arrowsMoving2d1 = true;
    }
    arrowsMoving2d1 = true;
  });

  document.getElementById("2d1").addEventListener('mouseup', function() {
    scale2d1 = false;
    arrowsMoving2d1 = false;
    pointMoving2d1 = false;
    if(Math.abs(dist - shell2d1.scale.x*camera2d1_scale) <= .1)  {
      renderer2d1.domElement.style.cursor = "pointer";
      shell2d1.material = shellMat2;
    }
    else {
      if(dist - point2d1.scale.x*camera2d1_scale/5 >= 0) renderer2d1.domElement.style.cursor = "auto";
      else renderer2d1.domElement.style.cursor = "pointer";
      shell2d1.material = shellMat1;
    }
  } );

  //second 2D

  function fx2d2(x,y) {
    return -x+2;
  }
  function fy2d2(x,y) {
    return -y-1;
  }

  var renderer2d2 = new THREE.WebGLRenderer({canvas: document.getElementById("2d2"), antialias: true});
    //ClearColor is just the background
    renderer2d2.setClearColor(0xf0f0f0);
    renderer2d2.setPixelRatio(window.devicePixelRatio);
    renderer2d2.setSize(250,250);  //in pixels
  var scene2d2 = new THREE.Scene();
  var vectorField2d2 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx2d2,
      dy: fy2d2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000
  });
  scene2d2.add(vectorField2d2);
  var point2d2 = new THREE.Mesh(pointgeom, pointMat1d);
  point2d2.position.z = 2;
  scene2d2.add(point2d2);
  var shell2d2 = new THREE.Line(shellGeom1, shellMat1);
  shell2d2.scale.set(2,2,2);
  scene2d2.add(shell2d2);
  // var dragControls2d2 = new THREE.DragControls([point2d2], camera2d2, renderer2d2.domElement);
  // dragControls2d2.addEventListener( 'drag', function ( event ) {
  //   if (point2d2.position.x < -5) point2d2.position.x = -5;
  //   if (point2d2.position.x > 5) point2d2.position.x = 5;
  //   if (point2d2.position.y < -5) point2d2.position.y = -5;
  //   if (point2d2.position.y > 5) point2d2.position.y = 5;
  //   shell2d2.position.copy(point2d2.position);
  // });

  // document.getElementById("2d2").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(camera2d2_scale < 1.9) camera2d2_scale += .1;
  //   }
  //   else {
  //     if(camera2d2_scale > .6) camera2d2_scale -= .1;
  //   }
  //   cameraScale(camera2d2, camera2d2_scale);
  //   point2d2.scale.set(1/camera2d2_scale, 1/camera2d2_scale, 1/camera2d2_scale);
  // });

  document.getElementById("2d2").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#2d2`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#2d2`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shell2d2.position.x * camera2d2_scale - mousex)*(shell2d2.position.x * camera2d2_scale - mousex) + (shell2d2.position.y * camera2d2_scale - mousey)*(shell2d2.position.y * camera2d2_scale - mousey));
    if(Math.abs(dist - shell2d2.scale.x*camera2d2_scale) <= .1)  {
      renderer2d2.domElement.style.cursor = "pointer";
      shell2d2.material = shellMat2;
    }
    else {
      if(dist - point2d2.scale.x*camera2d2_scale/5 >= 0) renderer2d2.domElement.style.cursor = "auto";
      else renderer2d2.domElement.style.cursor = "pointer";
      shell2d2.material = shellMat1;
    }
  });

  document.getElementById("2d2").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shell2d2.position.x * camera2d2_scale - mousex)*(shell2d2.position.x * camera2d2_scale - mousex) + (shell2d2.position.y * camera2d2_scale - mousey)*(shell2d2.position.y * camera2d2_scale - mousey));
    if(Math.abs(dist - shell2d2.scale.x*camera2d2_scale) <= .1) scale2d2 = true;
    else if(dist - point2d1.scale.x*camera2d1_scale/5 < 0) {
      pointMoving2d2 = true;
      arrowsMoving2d2 = true;
    }
    arrowsMoving2d2 = true;
  });

  document.getElementById("2d2").addEventListener('mouseup', function() {
    scale2d2 = false;
    arrowsMoving2d2 = false;
    pointMoving2d2 = false;
    if(Math.abs(dist - shell2d2.scale.x*camera2d2_scale) <= .1)  {
      renderer2d2.domElement.style.cursor = "pointer";
      shell2d2.material = shellMat2;
    }
    else {
      if(dist - point2d2.scale.x*camera2d2_scale/5 >= 0) renderer2d2.domElement.style.cursor = "auto";
      else renderer2d2.domElement.style.cursor = "pointer";
      shell2d2.material = shellMat1;
    }
  } );

  // third 2D
    function fx2d3(x,y) {
      return 1;
    }
    function fy2d3(x,y) {
      return y*x;
    }

    var renderer2d3 = new THREE.WebGLRenderer({canvas: document.getElementById("2d3"), antialias: true});
      //ClearColor is just the background
      renderer2d3.setClearColor(0xf0f0f0);
      renderer2d3.setPixelRatio(window.devicePixelRatio);
      renderer2d3.setSize(250,250);  //in pixels
    var scene2d3 = new THREE.Scene();
    var vectorField2d3 = FormVectorField2D({
        xmin: -10,
        xmax: 10,
        ymin: -10,
        ymax: 10,
        dx: fx2d3,
        dy: fy2d3,
        scale: 1/6,
        color: 0x888888,
        gridcolorx: 0x000000,
        gridcolory: 0x000000,
        thickness: .25
    });
    scene2d3.add(vectorField2d3);
    var point2d3 = new THREE.Mesh(pointgeom, pointMat1d);
    point2d3.position.z = 2;
    scene2d3.add(point2d3);
    var shell2d3 = new THREE.Line(shellGeom1, shellMat1);
    shell2d3.scale.set(2,2,2);
    scene2d3.add(shell2d3);

    // document.getElementById("2d3").addEventListener("wheel", function(e){
    //   var e = window.event;
    //   var delta = e.deltaY;
    //   if(delta > 0) {
    //     if(camera2d3_scale < 1.9) camera2d3_scale += .1;
    //   }
    //   else {
    //     if(camera2d3_scale > .6) camera2d3_scale -= .1;
    //   }
    //   cameraScale(camera2d3, camera2d3_scale);
    //   point2d3.scale.set(1/camera2d3_scale, 1/camera2d3_scale, 1/camera2d3_scale);
    // });

    document.getElementById("2d3").addEventListener('mousemove', function(event) {
      mousex = ((event.clientX - $(`#2d3`).offset().left + $(window).scrollLeft()) / 25) - 5;
      mousey = -(((event.clientY - $(`#2d3`).offset().top + $(window).scrollTop()) / 25) - 5);
      dist = Math.sqrt((shell2d3.position.x * camera2d3_scale - mousex)*(shell2d3.position.x * camera2d3_scale - mousex) + (shell2d3.position.y * camera2d3_scale - mousey)*(shell2d3.position.y * camera2d3_scale - mousey));
      if(Math.abs(dist - shell2d3.scale.x*camera2d3_scale) <= .1)  {
        renderer2d3.domElement.style.cursor = "pointer";
        shell2d3.material = shellMat2;
      }
      else {
        if(dist - point2d3.scale.x*camera2d3_scale/5 >= 0) renderer2d3.domElement.style.cursor = "auto";
        else renderer2d3.domElement.style.cursor = "pointer";
        shell2d3.material = shellMat1;
      }
    });

    document.getElementById("2d3").addEventListener('mousedown', function(event) {
      if(Math.abs(dist - shell2d3.scale.x*camera2d3_scale) <= .1) scale2d3 = true;
      else if(dist - point2d3.scale.x*camera2d3_scale/5 < 0) {
        pointMoving2d3 = true;
        arrowsMoving2d3 = true;
      }
      arrowsMoving2d3 = true;
    });

    document.getElementById("2d3").addEventListener('mouseup', function() {
      scale2d3 = false;
      arrowsMoving2d3 = false;
      pointMoving2d3 = false;
      if(Math.abs(dist - shell2d3.scale.x*camera2d3_scale) <= .1)  {
        renderer2d3.domElement.style.cursor = "pointer";
        shell2d3.material = shellMat2;
      }
      else {
        if(dist - point2d3.scale.x*camera2d3_scale/5 >= 0) renderer2d3.domElement.style.cursor = "auto";
        else renderer2d3.domElement.style.cursor = "pointer";
        shell2d3.material = shellMat1;
      }
    } );

  // fourth 2D

    function fx2d4(x,y) {
      return x*x/3;
    }
    function fy2d4(x,y) {
      return y*y/3;
    }

    var renderer2d4 = new THREE.WebGLRenderer({canvas: document.getElementById("2d4"), antialias: true});
      renderer2d4.setClearColor(0xf0f0f0);
      renderer2d4.setPixelRatio(window.devicePixelRatio);
      renderer2d4.setSize(250,250);  //in pixels
    var scene2d4 = new THREE.Scene();
    var vectorField2d4 = FormVectorField2D({
        xmin: -10,
        xmax: 10,
        ymin: -10,
        ymax: 10,
        dx: fx2d4,
        dy: fy2d4,
        scale: 1/6,
        color: 0x888888,
        gridcolorx: 0x000000,
        gridcolory: 0x000000,
        thickness: .25
    });
    scene2d4.add(vectorField2d4);
    var point2d4 = new THREE.Mesh(pointgeom, pointMat1d);
    point2d4.position.z = 2;
    scene2d4.add(point2d4);
    var shell2d4 = new THREE.Line(shellGeom1, shellMat1);
    shell2d4.scale.set(2,2,2);
    scene2d4.add(shell2d4);

    // document.getElementById("2d4").addEventListener("wheel", function(e){
    //   var e = window.event;
    //   var delta = e.deltaY;
    //   if(delta > 0) {
    //     if(camera2d4_scale < 1.9) camera2d4_scale += .1;
    //   }
    //   else {
    //     if(camera2d4_scale > .6) camera2d4_scale -= .1;
    //   }
    //   cameraScale(camera2d4, camera2d4_scale);
    //   point2d4.scale.set(1/camera2d4_scale, 1/camera2d4_scale, 1/camera2d4_scale);
    // });

    document.getElementById("2d4").addEventListener('mousemove', function(event) {
      mousex = ((event.clientX - $(`#2d4`).offset().left + $(window).scrollLeft()) / 25) - 5;
      mousey = -(((event.clientY - $(`#2d4`).offset().top + $(window).scrollTop()) / 25) - 5);
      dist = Math.sqrt((shell2d4.position.x * camera2d4_scale - mousex)*(shell2d4.position.x * camera2d4_scale - mousex) + (shell2d4.position.y * camera2d4_scale - mousey)*(shell2d4.position.y * camera2d4_scale - mousey));
      if(Math.abs(dist - shell2d4.scale.x*camera2d4_scale) <= .1)  {
        renderer2d4.domElement.style.cursor = "pointer";
        shell2d4.material = shellMat2;
      }
      else {
        if(dist - point2d4.scale.x*camera2d4_scale/5 >= 0) renderer2d4.domElement.style.cursor = "auto";
        else renderer2d4.domElement.style.cursor = "pointer";
        shell2d4.material = shellMat1;
      }
    });

    document.getElementById("2d4").addEventListener('mousedown', function(event) {
      if(Math.abs(dist - shell2d4.scale.x*camera2d4_scale) <= .1) scale2d4 = true;
      else if(dist - point2d4.scale.x*camera2d4_scale/5 < 0) {
        pointMoving2d4 = true;
        arrowsMoving2d4 = true;
      }
      arrowsMoving2d4 = true;
    });

    document.getElementById("2d4").addEventListener('mouseup', function() {
      scale2d4 = false;
      arrowsMoving2d4 = false;
      pointMoving2d4 = false;
      if(Math.abs(dist - shell2d4.scale.x*camera2d4_scale) <= .1)  {
        renderer2d4.domElement.style.cursor = "pointer";
        shell2d4.material = shellMat2;
      }
      else {
        if(dist - point2d4.scale.x*camera2d4_scale/5 >= 0) renderer2d4.domElement.style.cursor = "auto";
        else renderer2d4.domElement.style.cursor = "pointer";
        shell2d4.material = shellMat1;
      }
    } );

  /*
  //For the 3Ds

  var camera3d = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera3d.position.z = 30;

  var shellGeom2 = new THREE.SphereGeometry(1, 50, 50);
  var shellMat = new THREE.MeshBasicMaterial({color: 0x00ff00, opacity: 0.25, transparent: true});

  //3d1

  function fx3d1(x,y,z) {
    return x+2;
  }
  function fy3d1(x,y,z) {
    return y-1;
  }
  function fz3d1(x,y,z) {
    return z-2;
  }

  var renderer3d1 = new THREE.WebGLRenderer({canvas: document.getElementById("3d1"), antialias: true});
    //ClearColor is just the background
    renderer3d1.setClearColor(0xf0f0f0);
    renderer3d1.setPixelRatio(window.devicePixelRatio);
    renderer3d1.setSize(250,250);  //in pixels
  var scene3d1 = new THREE.Scene();
  var object3d1 = new THREE.Object3D();
  var vectorField3d1 = FormVectorField3D({
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      zmin: -5,
      zmax: 5,
      dx: fx3d1,
      dy: fy3d1,
      dz: fz3d1,
      scale: 1,
      color: 0x888888
  });
  object3d1.add(vectorField3d1);
  var point3d1 = new THREE.Mesh(pointgeom, pointMat1d);
  object3d1.add(point3d1);
  var shell3d1 = new THREE.Mesh(shellGeom2, shellMat1);
  shell3d1.scale.set(2,2,2);
  object3d1.add(shell3d1);
  object3d1.rotateX(-Math.PI / 2 - 0.2);
  object3d1.rotateZ(-3 * Math.PI / 4);

  scene3d1.add(object3d1);

  */

  function movePoint1D(point, shell, camera_scale) {
    point.position.x = mousex / camera_scale;
    if(point.position.x > 11.5) point.position.x = 11.5;
    else if(point.position.x < -11.5) point.position.x = -11.5
    shell.position.x = point.position.x;
  }

  function movePoint2D(point, shell, camera_scale) {
    point.position.x = mousex / camera_scale;
    point.position.y = mousey / camera_scale;
    if(point.position.x > 9.5) point.position.x = 9.5;
    else if(point.position.x < -9.5) point.position.x = -9.5;
    if(point.position.y > 9.5) point.position.y = 9.5;
    else if(point.position.y < -9.5) point.position.y = -9.5;
    shell.position.x = point.position.x;
    shell.position.y = point.position.y;
  }

  initShellArrows();

  function moveArrows1d1() {
    arrow_plus1d1.position.x = point1d1.position.x + shell1d1.scale.x;
    arrow_minus1d1.position.x = point1d1.position.x - shell1d1.scale.x;

    arrowSet1D(arrow_plus1d1, point1d1, fx1d1);
    // thickArrow(arrow_plus1d1, scene1d1);
    arrowSet1D(arrow_minus1d1, point1d1, fx1d1);
  }

  function moveArrows1d2() {
    arrow_plus1d2.position.x = point1d2.position.x + shell1d2.scale.x;
    arrow_minus1d2.position.x = point1d2.position.x - shell1d2.scale.x;

    arrowSet1D(arrow_plus1d2, point1d2, fx1d2);
    arrowSet1D(arrow_minus1d2, point1d2, fx1d2);
  }

  function moveArrows2d1() {
    arrow_1_2d1.position.x = point2d1.position.x + shell2d1.scale.x;
    arrow_1_2d1.position.y = point2d1.position.y;

    arrow_2_2d1.position.x = point2d1.position.x + shell2d1.scale.x / Math.sqrt(2);
    arrow_2_2d1.position.y = point2d1.position.y + shell2d1.scale.y / Math.sqrt(2);

    arrow_3_2d1.position.x = point2d1.position.x;
    arrow_3_2d1.position.y = point2d1.position.y + shell2d1.scale.y;

    arrow_4_2d1.position.x = point2d1.position.x - shell2d1.scale.x / Math.sqrt(2);
    arrow_4_2d1.position.y = point2d1.position.y + shell2d1.scale.y / Math.sqrt(2);

    arrow_5_2d1.position.x = point2d1.position.x - shell2d1.scale.x;
    arrow_5_2d1.position.y = point2d1.position.y;

    arrow_6_2d1.position.x = point2d1.position.x - shell2d1.scale.x / Math.sqrt(2);
    arrow_6_2d1.position.y = point2d1.position.y - shell2d1.scale.y / Math.sqrt(2);

    arrow_7_2d1.position.x = point2d1.position.x;
    arrow_7_2d1.position.y = point2d1.position.y - shell2d1.scale.y;

    arrow_8_2d1.position.x = point2d1.position.x + shell2d1.scale.x / Math.sqrt(2);
    arrow_8_2d1.position.y = point2d1.position.y - shell2d1.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_2_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_3_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_4_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_5_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_6_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_7_2d1, point2d1, fx2d1, fy2d1);
    arrowSet2D(arrow_8_2d1, point2d1, fx2d1, fy2d1);
  }

  function moveArrows2d2() {
    arrow_1_2d2.position.x = point2d2.position.x + shell2d2.scale.x;
    arrow_1_2d2.position.y = point2d2.position.y;

    arrow_2_2d2.position.x = point2d2.position.x + shell2d2.scale.x / Math.sqrt(2);
    arrow_2_2d2.position.y = point2d2.position.y + shell2d2.scale.y / Math.sqrt(2);

    arrow_3_2d2.position.x = point2d2.position.x;
    arrow_3_2d2.position.y = point2d2.position.y + shell2d2.scale.y;

    arrow_4_2d2.position.x = point2d2.position.x - shell2d2.scale.x / Math.sqrt(2);
    arrow_4_2d2.position.y = point2d2.position.y + shell2d2.scale.y / Math.sqrt(2);

    arrow_5_2d2.position.x = point2d2.position.x - shell2d2.scale.x;
    arrow_5_2d2.position.y = point2d2.position.y;

    arrow_6_2d2.position.x = point2d2.position.x - shell2d2.scale.x / Math.sqrt(2);
    arrow_6_2d2.position.y = point2d2.position.y - shell2d2.scale.y / Math.sqrt(2);

    arrow_7_2d2.position.x = point2d2.position.x;
    arrow_7_2d2.position.y = point2d2.position.y - shell2d2.scale.y;

    arrow_8_2d2.position.x = point2d2.position.x + shell2d2.scale.x / Math.sqrt(2);
    arrow_8_2d2.position.y = point2d2.position.y - shell2d2.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_2_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_3_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_4_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_5_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_6_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_7_2d2, point2d2, fx2d2, fy2d2);
    arrowSet2D(arrow_8_2d2, point2d2, fx2d2, fy2d2);
  }

  function moveArrows2d3() {
    arrow_1_2d3.position.x = point2d3.position.x + shell2d3.scale.x;
    arrow_1_2d3.position.y = point2d3.position.y;

    arrow_2_2d3.position.x = point2d3.position.x + shell2d3.scale.x / Math.sqrt(2);
    arrow_2_2d3.position.y = point2d3.position.y + shell2d3.scale.y / Math.sqrt(2);

    arrow_3_2d3.position.x = point2d3.position.x;
    arrow_3_2d3.position.y = point2d3.position.y + shell2d3.scale.y;

    arrow_4_2d3.position.x = point2d3.position.x - shell2d3.scale.x / Math.sqrt(2);
    arrow_4_2d3.position.y = point2d3.position.y + shell2d3.scale.y / Math.sqrt(2);

    arrow_5_2d3.position.x = point2d3.position.x - shell2d3.scale.x;
    arrow_5_2d3.position.y = point2d3.position.y;

    arrow_6_2d3.position.x = point2d3.position.x - shell2d3.scale.x / Math.sqrt(2);
    arrow_6_2d3.position.y = point2d3.position.y - shell2d3.scale.y / Math.sqrt(2);

    arrow_7_2d3.position.x = point2d3.position.x;
    arrow_7_2d3.position.y = point2d3.position.y - shell2d3.scale.y;

    arrow_8_2d3.position.x = point2d3.position.x + shell2d3.scale.x / Math.sqrt(2);
    arrow_8_2d3.position.y = point2d3.position.y - shell2d3.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_2_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_3_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_4_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_5_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_6_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_7_2d3, point2d3, fx2d3, fy2d3);
    arrowSet2D(arrow_8_2d3, point2d3, fx2d3, fy2d3);
  }

  function moveArrows2d4() {
    arrow_1_2d4.position.x = point2d4.position.x + shell2d4.scale.x;
    arrow_1_2d4.position.y = point2d4.position.y;

    arrow_2_2d4.position.x = point2d4.position.x + shell2d4.scale.x / Math.sqrt(2);
    arrow_2_2d4.position.y = point2d4.position.y + shell2d4.scale.y / Math.sqrt(2);

    arrow_3_2d4.position.x = point2d4.position.x;
    arrow_3_2d4.position.y = point2d4.position.y + shell2d4.scale.y;

    arrow_4_2d4.position.x = point2d4.position.x - shell2d4.scale.x / Math.sqrt(2);
    arrow_4_2d4.position.y = point2d4.position.y + shell2d4.scale.y / Math.sqrt(2);

    arrow_5_2d4.position.x = point2d4.position.x - shell2d4.scale.x;
    arrow_5_2d4.position.y = point2d4.position.y;

    arrow_6_2d4.position.x = point2d4.position.x - shell2d4.scale.x / Math.sqrt(2);
    arrow_6_2d4.position.y = point2d4.position.y - shell2d4.scale.y / Math.sqrt(2);

    arrow_7_2d4.position.x = point2d4.position.x;
    arrow_7_2d4.position.y = point2d4.position.y - shell2d4.scale.y;

    arrow_8_2d4.position.x = point2d4.position.x + shell2d4.scale.x / Math.sqrt(2);
    arrow_8_2d4.position.y = point2d4.position.y - shell2d4.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_2_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_3_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_4_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_5_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_6_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_7_2d4, point2d4, fx2d4, fy2d4);
    arrowSet2D(arrow_8_2d4, point2d4, fx2d4, fy2d4);
  }

  function arrowSet1D(arrow, point, func) {
    var func_arrow = func(arrow.position.x);
    var length = Math.sqrt(Math.pow(func_arrow, 2)) / 6;
    arrow.setLength(length, 1/3, 1/3);
    if(length != 0) { // dot product of arrow position and direction
      if((arrow.position.x - point.position.x) * func_arrow > 0) arrow.setColor(new THREE.Color(0x0000aa));
      else arrow.setColor(new THREE.Color(0xff0000));

      arrow.setDirection(new THREE.Vector3(func_arrow,0,0).normalize());
    }

    if(arrow.children[2])  {
      // arrow.children[2].scale.set(length, length*2/3, length);
      arrow.children[2].scale.set(2/3, length - .25, length);
      arrow.children[2].material.color.set(arrow.line.material.color);
    }
  }

  function arrowSet2D(arrow, point, funcX, funcY) {
    var funcX_arrow = funcX(arrow.position.x, arrow.position.y);
    var funcY_arrow = funcY(arrow.position.x, arrow.position.y);

    var length = Math.sqrt(Math.pow(funcX_arrow, 2) + Math.pow(funcY_arrow, 2)) / 6;
    // var length = 2;
    arrow.setLength(length, 1/3, 1/3);
    if(length != 0) {
      if((arrow.position.x - point.position.x) * funcX_arrow + (arrow.position.y - point.position.y) * funcY_arrow > 0) arrow.setColor(new THREE.Color(0x0000aa));
      else arrow.setColor(new THREE.Color(0xff0000));

      arrow.setDirection(new THREE.Vector3(funcX_arrow, funcY_arrow, 0).normalize());
    }

    if(arrow.children[2])  {
      arrow.children[2].scale.set(2/3, length - .25, length);
      arrow.children[2].material.color.set(arrow.line.material.color);
    }
  }

  requestAnimationFrame(render);
  function render() {
    if(scale1d1) setShellSize(shell1d1, camera1d1_scale);
    if(scale1d2) setShellSize(shell1d2, camera1d2_scale);
    if(scale2d1) setShellSize(shell2d1, camera2d1_scale);
    if(scale2d2) setShellSize(shell2d2, camera2d2_scale);
    if(scale2d3) setShellSize(shell2d3, camera2d3_scale);
    if(scale2d4) setShellSize(shell2d4, camera2d4_scale);

    if(pointMoving1d1) movePoint1D(point1d1, shell1d1, camera1d1_scale);
    if(pointMoving1d2) movePoint1D(point1d2, shell1d2, camera1d2_scale);
    if(pointMoving2d1) movePoint2D(point2d1, shell2d1, camera2d1_scale);
    if(pointMoving2d2) movePoint2D(point2d2, shell2d2, camera2d2_scale);
    if(pointMoving2d3) movePoint2D(point2d3, shell2d3, camera2d3_scale);
    if(pointMoving2d4) movePoint2D(point2d4, shell2d4, camera2d4_scale);

    if(arrowsMoving1d1) moveArrows1d1();
    if(arrowsMoving1d2) moveArrows1d2();
    if(arrowsMoving2d1) moveArrows2d1();
    if(arrowsMoving2d2) moveArrows2d2();
    if(arrowsMoving2d3) moveArrows2d3();
    if(arrowsMoving2d4) moveArrows2d4();

    renderer1d1.render(scene1d1, camera1d1);
    renderer1d2.render(scene1d2, camera1d2);
    renderer2d1.render(scene2d1, camera2d1);
    renderer2d2.render(scene2d2, camera2d2);
    renderer2d3.render(scene2d3, camera2d3);
    renderer2d4.render(scene2d4, camera2d4);
    // renderer3d1.render(scene3d1, camera3d);
    requestAnimationFrame(render);
  }
});
