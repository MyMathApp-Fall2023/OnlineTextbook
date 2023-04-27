$(document).ready(function() {
  // globals
  var scaleVertNeg = false;
  var scaleVertPos = false;
  var scaleHorPos = false;
  var scaleHorNeg = false;
  var scaleEx1 = false;
  var scaleEx2 = false;
  var arrowsMovingVertNeg = false;
  var arrowsMovingVertPos = false;
  var arrowsMovingHorPos = false;
  var arrowsMovingHorNeg = false;
  var arrowsMovingEx1 = false;
  var arrowsMovingEx2 = false;
  var pointMovingVertNeg = false;
  var pointMovingVertPos = false;
  var pointMovingHorPos = false;
  var pointMovingHorNeg = false;
  var pointMovingEx1 = false;
  var pointMovingEx2 = false;
  var arrow_1_VertNeg;
  var arrow_2_VertNeg;
  var arrow_3_VertNeg;
  var arrow_4_VertNeg;
  var arrow_5_VertNeg;
  var arrow_6_VertNeg;
  var arrow_7_VertNeg;
  var arrow_8_VertNeg;
  var arrow_1_VertPos;
  var arrow_2_VertPos;
  var arrow_3_VertPos;
  var arrow_4_VertPos;
  var arrow_5_VertPos;
  var arrow_6_VertPos;
  var arrow_7_VertPos;
  var arrow_8_VertPos;
  var arrow_1_HorPos;
  var arrow_2_HorPos;
  var arrow_3_HorPos;
  var arrow_4_HorPos;
  var arrow_5_HorPos;
  var arrow_6_HorPos;
  var arrow_7_HorPos;
  var arrow_8_HorPos;
  var arrow_1_HorNeg;
  var arrow_2_HorNeg;
  var arrow_3_HorNeg;
  var arrow_4_HorNeg;
  var arrow_5_HorNeg;
  var arrow_6_HorNeg;
  var arrow_7_HorNeg;
  var arrow_8_HorNeg;
  var arrow_1_Ex1;
  var arrow_2_Ex1;
  var arrow_3_Ex1;
  var arrow_4_Ex1;
  var arrow_5_Ex1;
  var arrow_6_Ex1;
  var arrow_7_Ex1;
  var arrow_8_Ex1;
  var arrow_1_Ex2;
  var arrow_2_Ex2;
  var arrow_3_Ex2;
  var arrow_4_Ex2;
  var arrow_5_Ex2;
  var arrow_6_Ex2;
  var arrow_7_Ex2;
  var arrow_8_Ex2;
  var circleVectorsVertNeg = new THREE.Object3D();
  var circleVectorsVertPos = new THREE.Object3D();
  var circleVectorsHorPos = new THREE.Object3D();
  var circleVectorsHorNeg = new THREE.Object3D();
  var circleVectorsEx1 = new THREE.Object3D();
  var circleVectorsEx2 = new THREE.Object3D();
  var mousex = 0;
  var mousey = 0;
  var dist = 0;

  // FUNCTIONS
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

  function setShellSize(shell, camera_scale) {
    dist = Math.sqrt((shell.position.x * camera_scale - mousex)*(shell.position.x * camera_scale - mousex) + (shell.position.y * camera_scale - mousey)*(shell.position.y * camera_scale - mousey));
    if(dist/camera_scale > .2/camera_scale) shell.scale.set(dist/camera_scale, dist/camera_scale, dist/camera_scale); // limit scaling according to camera zoom
  }

  function initShellArrows() {
    // VertNeg
    arrow_1_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_VertNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_VertNeg, sceneVertNeg);
    thickArrow(arrow_2_VertNeg, sceneVertNeg);
    thickArrow(arrow_3_VertNeg, sceneVertNeg);
    thickArrow(arrow_4_VertNeg, sceneVertNeg);
    thickArrow(arrow_5_VertNeg, sceneVertNeg);
    thickArrow(arrow_6_VertNeg, sceneVertNeg);
    thickArrow(arrow_7_VertNeg, sceneVertNeg);
    thickArrow(arrow_8_VertNeg, sceneVertNeg);

    arrow_1_VertNeg.position.z = 2;
    arrow_2_VertNeg.position.z = 2;
    arrow_3_VertNeg.position.z = 2;
    arrow_4_VertNeg.position.z = 2;
    arrow_5_VertNeg.position.z = 2;
    arrow_6_VertNeg.position.z = 2;
    arrow_7_VertNeg.position.z = 2;
    arrow_8_VertNeg.position.z = 2;

    circleVectorsVertNeg.add(arrow_1_VertNeg);
    circleVectorsVertNeg.add(arrow_2_VertNeg);
    circleVectorsVertNeg.add(arrow_3_VertNeg);
    circleVectorsVertNeg.add(arrow_4_VertNeg);
    circleVectorsVertNeg.add(arrow_5_VertNeg);
    circleVectorsVertNeg.add(arrow_6_VertNeg);
    circleVectorsVertNeg.add(arrow_7_VertNeg);
    circleVectorsVertNeg.add(arrow_8_VertNeg);

    sceneVertNeg.add(circleVectorsVertNeg);

    moveArrowsVertNeg();

    // VertPos
    arrow_1_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_VertPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_VertPos, sceneVertPos);
    thickArrow(arrow_2_VertPos, sceneVertPos);
    thickArrow(arrow_3_VertPos, sceneVertPos);
    thickArrow(arrow_4_VertPos, sceneVertPos);
    thickArrow(arrow_5_VertPos, sceneVertPos);
    thickArrow(arrow_6_VertPos, sceneVertPos);
    thickArrow(arrow_7_VertPos, sceneVertPos);
    thickArrow(arrow_8_VertPos, sceneVertPos);

    arrow_1_VertPos.position.z = 2;
    arrow_2_VertPos.position.z = 2;
    arrow_3_VertPos.position.z = 2;
    arrow_4_VertPos.position.z = 2;
    arrow_5_VertPos.position.z = 2;
    arrow_6_VertPos.position.z = 2;
    arrow_7_VertPos.position.z = 2;
    arrow_8_VertPos.position.z = 2;

    circleVectorsVertPos.add(arrow_1_VertPos);
    circleVectorsVertPos.add(arrow_2_VertPos);
    circleVectorsVertPos.add(arrow_3_VertPos);
    circleVectorsVertPos.add(arrow_4_VertPos);
    circleVectorsVertPos.add(arrow_5_VertPos);
    circleVectorsVertPos.add(arrow_6_VertPos);
    circleVectorsVertPos.add(arrow_7_VertPos);
    circleVectorsVertPos.add(arrow_8_VertPos);

    sceneVertPos.add(circleVectorsVertPos);

    moveArrowsVertPos();

    // HorPos
    arrow_1_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_HorPos = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_HorPos, sceneHorPos);
    thickArrow(arrow_2_HorPos, sceneHorPos);
    thickArrow(arrow_3_HorPos, sceneHorPos);
    thickArrow(arrow_4_HorPos, sceneHorPos);
    thickArrow(arrow_5_HorPos, sceneHorPos);
    thickArrow(arrow_6_HorPos, sceneHorPos);
    thickArrow(arrow_7_HorPos, sceneHorPos);
    thickArrow(arrow_8_HorPos, sceneHorPos);

    arrow_1_HorPos.position.z = 2;
    arrow_2_HorPos.position.z = 2;
    arrow_3_HorPos.position.z = 2;
    arrow_4_HorPos.position.z = 2;
    arrow_5_HorPos.position.z = 2;
    arrow_6_HorPos.position.z = 2;
    arrow_7_HorPos.position.z = 2;
    arrow_8_HorPos.position.z = 2;

    circleVectorsHorPos.add(arrow_1_HorPos);
    circleVectorsHorPos.add(arrow_2_HorPos);
    circleVectorsHorPos.add(arrow_3_HorPos);
    circleVectorsHorPos.add(arrow_4_HorPos);
    circleVectorsHorPos.add(arrow_5_HorPos);
    circleVectorsHorPos.add(arrow_6_HorPos);
    circleVectorsHorPos.add(arrow_7_HorPos);
    circleVectorsHorPos.add(arrow_8_HorPos);

    sceneHorPos.add(circleVectorsHorPos);

    moveArrowsHorPos();

    // HorNeg
    arrow_1_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_HorNeg = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_HorNeg, sceneHorNeg);
    thickArrow(arrow_2_HorNeg, sceneHorNeg);
    thickArrow(arrow_3_HorNeg, sceneHorNeg);
    thickArrow(arrow_4_HorNeg, sceneHorNeg);
    thickArrow(arrow_5_HorNeg, sceneHorNeg);
    thickArrow(arrow_6_HorNeg, sceneHorNeg);
    thickArrow(arrow_7_HorNeg, sceneHorNeg);
    thickArrow(arrow_8_HorNeg, sceneHorNeg);

    arrow_1_HorNeg.position.z = 2;
    arrow_2_HorNeg.position.z = 2;
    arrow_3_HorNeg.position.z = 2;
    arrow_4_HorNeg.position.z = 2;
    arrow_5_HorNeg.position.z = 2;
    arrow_6_HorNeg.position.z = 2;
    arrow_7_HorNeg.position.z = 2;
    arrow_8_HorNeg.position.z = 2;

    circleVectorsHorNeg.add(arrow_1_HorNeg);
    circleVectorsHorNeg.add(arrow_2_HorNeg);
    circleVectorsHorNeg.add(arrow_3_HorNeg);
    circleVectorsHorNeg.add(arrow_4_HorNeg);
    circleVectorsHorNeg.add(arrow_5_HorNeg);
    circleVectorsHorNeg.add(arrow_6_HorNeg);
    circleVectorsHorNeg.add(arrow_7_HorNeg);
    circleVectorsHorNeg.add(arrow_8_HorNeg);

    sceneHorNeg.add(circleVectorsHorNeg);

    moveArrowsHorNeg();

    // Ex1
    arrow_1_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_Ex1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_Ex1, sceneEx1);
    thickArrow(arrow_2_Ex1, sceneEx1);
    thickArrow(arrow_3_Ex1, sceneEx1);
    thickArrow(arrow_4_Ex1, sceneEx1);
    thickArrow(arrow_5_Ex1, sceneEx1);
    thickArrow(arrow_6_Ex1, sceneEx1);
    thickArrow(arrow_7_Ex1, sceneEx1);
    thickArrow(arrow_8_Ex1, sceneEx1);

    arrow_1_Ex1.position.z = 2;
    arrow_2_Ex1.position.z = 2;
    arrow_3_Ex1.position.z = 2;
    arrow_4_Ex1.position.z = 2;
    arrow_5_Ex1.position.z = 2;
    arrow_6_Ex1.position.z = 2;
    arrow_7_Ex1.position.z = 2;
    arrow_8_Ex1.position.z = 2;

    circleVectorsEx1.add(arrow_1_Ex1);
    circleVectorsEx1.add(arrow_2_Ex1);
    circleVectorsEx1.add(arrow_3_Ex1);
    circleVectorsEx1.add(arrow_4_Ex1);
    circleVectorsEx1.add(arrow_5_Ex1);
    circleVectorsEx1.add(arrow_6_Ex1);
    circleVectorsEx1.add(arrow_7_Ex1);
    circleVectorsEx1.add(arrow_8_Ex1);

    sceneEx1.add(circleVectorsEx1);

    moveArrowsEx1();

    // Ex2
    arrow_1_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_2_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_3_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_4_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_5_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_6_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_7_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);
    arrow_8_Ex2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 1, 0x000000, 1, 1);

    thickArrow(arrow_1_Ex2, sceneEx2);
    thickArrow(arrow_2_Ex2, sceneEx2);
    thickArrow(arrow_3_Ex2, sceneEx2);
    thickArrow(arrow_4_Ex2, sceneEx2);
    thickArrow(arrow_5_Ex2, sceneEx2);
    thickArrow(arrow_6_Ex2, sceneEx2);
    thickArrow(arrow_7_Ex2, sceneEx2);
    thickArrow(arrow_8_Ex2, sceneEx2);

    arrow_1_Ex2.position.z = 2;
    arrow_2_Ex2.position.z = 2;
    arrow_3_Ex2.position.z = 2;
    arrow_4_Ex2.position.z = 2;
    arrow_5_Ex2.position.z = 2;
    arrow_6_Ex2.position.z = 2;
    arrow_7_Ex2.position.z = 2;
    arrow_8_Ex2.position.z = 2;

    circleVectorsEx2.add(arrow_1_Ex2);
    circleVectorsEx2.add(arrow_2_Ex2);
    circleVectorsEx2.add(arrow_3_Ex2);
    circleVectorsEx2.add(arrow_4_Ex2);
    circleVectorsEx2.add(arrow_5_Ex2);
    circleVectorsEx2.add(arrow_6_Ex2);
    circleVectorsEx2.add(arrow_7_Ex2);
    circleVectorsEx2.add(arrow_8_Ex2);

    sceneEx2.add(circleVectorsEx2);

    moveArrowsEx2();
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

  function movePoint2D(point, shell, camera_scale) {
    point.position.x = mousex / camera_scale;
    point.position.y = mousey / camera_scale;
    if(point.position.x > 5) point.position.x = 5;
    else if(point.position.x < -5) point.position.x = -5;
    if(point.position.y > 5) point.position.y = 5;
    else if(point.position.y < -5) point.position.y = -5;
    shell.position.x = point.position.x;
    shell.position.y = point.position.y;
  }

  function moveArrowsVertNeg() {
    arrow_1_VertNeg.position.x = pointVertNeg.position.x + shellVertNeg.scale.x;
    arrow_1_VertNeg.position.y = pointVertNeg.position.y;

    arrow_2_VertNeg.position.x = pointVertNeg.position.x + shellVertNeg.scale.x / Math.sqrt(2);
    arrow_2_VertNeg.position.y = pointVertNeg.position.y + shellVertNeg.scale.y / Math.sqrt(2);

    arrow_3_VertNeg.position.x = pointVertNeg.position.x;
    arrow_3_VertNeg.position.y = pointVertNeg.position.y + shellVertNeg.scale.y;

    arrow_4_VertNeg.position.x = pointVertNeg.position.x - shellVertNeg.scale.x / Math.sqrt(2);
    arrow_4_VertNeg.position.y = pointVertNeg.position.y + shellVertNeg.scale.y / Math.sqrt(2);

    arrow_5_VertNeg.position.x = pointVertNeg.position.x - shellVertNeg.scale.x;
    arrow_5_VertNeg.position.y = pointVertNeg.position.y;

    arrow_6_VertNeg.position.x = pointVertNeg.position.x - shellVertNeg.scale.x / Math.sqrt(2);
    arrow_6_VertNeg.position.y = pointVertNeg.position.y - shellVertNeg.scale.y / Math.sqrt(2);

    arrow_7_VertNeg.position.x = pointVertNeg.position.x;
    arrow_7_VertNeg.position.y = pointVertNeg.position.y - shellVertNeg.scale.y;

    arrow_8_VertNeg.position.x = pointVertNeg.position.x + shellVertNeg.scale.x / Math.sqrt(2);
    arrow_8_VertNeg.position.y = pointVertNeg.position.y - shellVertNeg.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_2_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_3_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_4_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_5_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_6_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_7_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
    arrowSet2D(arrow_8_VertNeg, pointVertNeg, fxVertNeg, fyVertNeg);
  }

  function moveArrowsVertPos() {
    arrow_1_VertPos.position.x = pointVertPos.position.x + shellVertPos.scale.x;
    arrow_1_VertPos.position.y = pointVertPos.position.y;

    arrow_2_VertPos.position.x = pointVertPos.position.x + shellVertPos.scale.x / Math.sqrt(2);
    arrow_2_VertPos.position.y = pointVertPos.position.y + shellVertPos.scale.y / Math.sqrt(2);

    arrow_3_VertPos.position.x = pointVertPos.position.x;
    arrow_3_VertPos.position.y = pointVertPos.position.y + shellVertPos.scale.y;

    arrow_4_VertPos.position.x = pointVertPos.position.x - shellVertPos.scale.x / Math.sqrt(2);
    arrow_4_VertPos.position.y = pointVertPos.position.y + shellVertPos.scale.y / Math.sqrt(2);

    arrow_5_VertPos.position.x = pointVertPos.position.x - shellVertPos.scale.x;
    arrow_5_VertPos.position.y = pointVertPos.position.y;

    arrow_6_VertPos.position.x = pointVertPos.position.x - shellVertPos.scale.x / Math.sqrt(2);
    arrow_6_VertPos.position.y = pointVertPos.position.y - shellVertPos.scale.y / Math.sqrt(2);

    arrow_7_VertPos.position.x = pointVertPos.position.x;
    arrow_7_VertPos.position.y = pointVertPos.position.y - shellVertPos.scale.y;

    arrow_8_VertPos.position.x = pointVertPos.position.x + shellVertPos.scale.x / Math.sqrt(2);
    arrow_8_VertPos.position.y = pointVertPos.position.y - shellVertPos.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_2_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_3_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_4_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_5_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_6_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_7_VertPos, pointVertPos, fxVertPos, fyVertPos);
    arrowSet2D(arrow_8_VertPos, pointVertPos, fxVertPos, fyVertPos);
  }

  function moveArrowsHorPos() {
    arrow_1_HorPos.position.x = pointHorPos.position.x + shellHorPos.scale.x;
    arrow_1_HorPos.position.y = pointHorPos.position.y;

    arrow_2_HorPos.position.x = pointHorPos.position.x + shellHorPos.scale.x / Math.sqrt(2);
    arrow_2_HorPos.position.y = pointHorPos.position.y + shellHorPos.scale.y / Math.sqrt(2);

    arrow_3_HorPos.position.x = pointHorPos.position.x;
    arrow_3_HorPos.position.y = pointHorPos.position.y + shellHorPos.scale.y;

    arrow_4_HorPos.position.x = pointHorPos.position.x - shellHorPos.scale.x / Math.sqrt(2);
    arrow_4_HorPos.position.y = pointHorPos.position.y + shellHorPos.scale.y / Math.sqrt(2);

    arrow_5_HorPos.position.x = pointHorPos.position.x - shellHorPos.scale.x;
    arrow_5_HorPos.position.y = pointHorPos.position.y;

    arrow_6_HorPos.position.x = pointHorPos.position.x - shellHorPos.scale.x / Math.sqrt(2);
    arrow_6_HorPos.position.y = pointHorPos.position.y - shellHorPos.scale.y / Math.sqrt(2);

    arrow_7_HorPos.position.x = pointHorPos.position.x;
    arrow_7_HorPos.position.y = pointHorPos.position.y - shellHorPos.scale.y;

    arrow_8_HorPos.position.x = pointHorPos.position.x + shellHorPos.scale.x / Math.sqrt(2);
    arrow_8_HorPos.position.y = pointHorPos.position.y - shellHorPos.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_2_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_3_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_4_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_5_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_6_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_7_HorPos, pointHorPos, fxHorPos, fyHorPos);
    arrowSet2D(arrow_8_HorPos, pointHorPos, fxHorPos, fyHorPos);
  }

  function moveArrowsHorNeg() {
    arrow_1_HorNeg.position.x = pointHorNeg.position.x + shellHorNeg.scale.x;
    arrow_1_HorNeg.position.y = pointHorNeg.position.y;

    arrow_2_HorNeg.position.x = pointHorNeg.position.x + shellHorNeg.scale.x / Math.sqrt(2);
    arrow_2_HorNeg.position.y = pointHorNeg.position.y + shellHorNeg.scale.y / Math.sqrt(2);

    arrow_3_HorNeg.position.x = pointHorNeg.position.x;
    arrow_3_HorNeg.position.y = pointHorNeg.position.y + shellHorNeg.scale.y;

    arrow_4_HorNeg.position.x = pointHorNeg.position.x - shellHorNeg.scale.x / Math.sqrt(2);
    arrow_4_HorNeg.position.y = pointHorNeg.position.y + shellHorNeg.scale.y / Math.sqrt(2);

    arrow_5_HorNeg.position.x = pointHorNeg.position.x - shellHorNeg.scale.x;
    arrow_5_HorNeg.position.y = pointHorNeg.position.y;

    arrow_6_HorNeg.position.x = pointHorNeg.position.x - shellHorNeg.scale.x / Math.sqrt(2);
    arrow_6_HorNeg.position.y = pointHorNeg.position.y - shellHorNeg.scale.y / Math.sqrt(2);

    arrow_7_HorNeg.position.x = pointHorNeg.position.x;
    arrow_7_HorNeg.position.y = pointHorNeg.position.y - shellHorNeg.scale.y;

    arrow_8_HorNeg.position.x = pointHorNeg.position.x + shellHorNeg.scale.x / Math.sqrt(2);
    arrow_8_HorNeg.position.y = pointHorNeg.position.y - shellHorNeg.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_2_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_3_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_4_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_5_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_6_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_7_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
    arrowSet2D(arrow_8_HorNeg, pointHorNeg, fxHorNeg, fyHorNeg);
  }

  function moveArrowsEx1() {
    arrow_1_Ex1.position.x = pointEx1.position.x + shellEx1.scale.x;
    arrow_1_Ex1.position.y = pointEx1.position.y;

    arrow_2_Ex1.position.x = pointEx1.position.x + shellEx1.scale.x / Math.sqrt(2);
    arrow_2_Ex1.position.y = pointEx1.position.y + shellEx1.scale.y / Math.sqrt(2);

    arrow_3_Ex1.position.x = pointEx1.position.x;
    arrow_3_Ex1.position.y = pointEx1.position.y + shellEx1.scale.y;

    arrow_4_Ex1.position.x = pointEx1.position.x - shellEx1.scale.x / Math.sqrt(2);
    arrow_4_Ex1.position.y = pointEx1.position.y + shellEx1.scale.y / Math.sqrt(2);

    arrow_5_Ex1.position.x = pointEx1.position.x - shellEx1.scale.x;
    arrow_5_Ex1.position.y = pointEx1.position.y;

    arrow_6_Ex1.position.x = pointEx1.position.x - shellEx1.scale.x / Math.sqrt(2);
    arrow_6_Ex1.position.y = pointEx1.position.y - shellEx1.scale.y / Math.sqrt(2);

    arrow_7_Ex1.position.x = pointEx1.position.x;
    arrow_7_Ex1.position.y = pointEx1.position.y - shellEx1.scale.y;

    arrow_8_Ex1.position.x = pointEx1.position.x + shellEx1.scale.x / Math.sqrt(2);
    arrow_8_Ex1.position.y = pointEx1.position.y - shellEx1.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_2_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_3_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_4_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_5_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_6_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_7_Ex1, pointEx1, fxEx1, fyEx1);
    arrowSet2D(arrow_8_Ex1, pointEx1, fxEx1, fyEx1);
  }

  function moveArrowsEx2() {
    arrow_1_Ex2.position.x = pointEx2.position.x + shellEx2.scale.x;
    arrow_1_Ex2.position.y = pointEx2.position.y;

    arrow_2_Ex2.position.x = pointEx2.position.x + shellEx2.scale.x / Math.sqrt(2);
    arrow_2_Ex2.position.y = pointEx2.position.y + shellEx2.scale.y / Math.sqrt(2);

    arrow_3_Ex2.position.x = pointEx2.position.x;
    arrow_3_Ex2.position.y = pointEx2.position.y + shellEx2.scale.y;

    arrow_4_Ex2.position.x = pointEx2.position.x - shellEx2.scale.x / Math.sqrt(2);
    arrow_4_Ex2.position.y = pointEx2.position.y + shellEx2.scale.y / Math.sqrt(2);

    arrow_5_Ex2.position.x = pointEx2.position.x - shellEx2.scale.x;
    arrow_5_Ex2.position.y = pointEx2.position.y;

    arrow_6_Ex2.position.x = pointEx2.position.x - shellEx2.scale.x / Math.sqrt(2);
    arrow_6_Ex2.position.y = pointEx2.position.y - shellEx2.scale.y / Math.sqrt(2);

    arrow_7_Ex2.position.x = pointEx2.position.x;
    arrow_7_Ex2.position.y = pointEx2.position.y - shellEx2.scale.y;

    arrow_8_Ex2.position.x = pointEx2.position.x + shellEx2.scale.x / Math.sqrt(2);
    arrow_8_Ex2.position.y = pointEx2.position.y - shellEx2.scale.y / Math.sqrt(2);

    arrowSet2D(arrow_1_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_2_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_3_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_4_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_5_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_6_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_7_Ex2, pointEx2, fxEx2, fyEx2);
    arrowSet2D(arrow_8_Ex2, pointEx2, fxEx2, fyEx2);
  }

  function arrowSet2D(arrow, point, funcX, funcY) {
    var funcX_arrow = funcX(arrow.position.x, arrow.position.y);
    var funcY_arrow = funcY(arrow.position.x, arrow.position.y);

    var length = Math.sqrt(Math.pow(funcX_arrow, 2) + Math.pow(funcY_arrow, 2)) / 6;
    // var length = 2;
    arrow.setLength(length, 1/3, 1/3);
    if(length != 0) {
      if((arrow.position.x - point.position.x) * funcY_arrow + -(arrow.position.y - point.position.y) * funcX_arrow > 0) arrow.setColor(new THREE.Color(0x0000aa));
      else if((arrow.position.x - point.position.x) * funcY_arrow + -(arrow.position.y - point.position.y) * funcX_arrow == 0) arrow.setColor(new THREE.Color(0x888888));
      else arrow.setColor(new THREE.Color(0xff0000));

      arrow.setDirection(new THREE.Vector3(funcX_arrow, funcY_arrow, 0).normalize());
    }

    if(arrow.children[2])  {
      arrow.children[2].scale.set(2/3, length - .25, length);
      arrow.children[2].material.color.set(arrow.line.material.color);

      // for some reason, when pointing straight down, the arrow shaft flips upside down. This fixes that.
      if(funcX_arrow == 0 && funcY_arrow < 0) arrow.children[2].rotation.set(0, Math.PI, 0);
      else arrow.children[2].rotation.set(0, 0, 0);
    }
  }

  function movePoint2D(point, shell, camera_scale) {
    point.position.x = mousex / camera_scale;
    point.position.y = mousey / camera_scale;
    if(point.position.x > 5) point.position.x = 5;
    else if(point.position.x < -5) point.position.x = -5;
    if(point.position.y > 5) point.position.y = 5;
    else if(point.position.y < -5) point.position.y = -5;
    shell.position.x = point.position.x;
    shell.position.y = point.position.y;
  }

  // CAMERAS
  var cameraVertNeg = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraVertNeg.position.z = 4;
  var cameraVertNeg_scale = 1;

  var cameraVertPos = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraVertPos.position.z = 4;
  var cameraVertPos_scale = 1;

  var cameraHorPos = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraHorPos.position.z = 4;
  var cameraHorPos_scale = 1;

  var cameraHorNeg = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraHorNeg.position.z = 4;
  var cameraHorNeg_scale = 1;

  var cameraEx1 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraEx1.position.z = 4;
  var cameraEx1_scale = 1;

  var cameraEx2 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    cameraEx2.position.z = 4;
  var cameraEx2_scale = 1;

  // GRAPH FUNCTIONS
  function fxVertNeg(x, y) {
    return 0;
  }
  function fyVertNeg(x, y) {
    return -2*x;
  }

  function fxVertPos(x, y) {
    return 0;
  }
  function fyVertPos(x, y) {
    return 2*x;
  }

  function fxHorPos(x, y) {
    return -2*y;
  }
  function fyHorPos(x, y) {
    return 0;
  }

  function fxHorNeg(x, y) {
    return 2*y;
  }
  function fyHorNeg(x, y) {
    return 0;
  }

  function fxEx1(x, y) {
    return 1;
  }
  function fyEx1(x, y) {
    return x*y;
  }

  function fxEx2(x, y) {
    return x*y;
  }
  function fyEx2(x, y) {
    return x*y;
  }

  // RENDERERS AND SCENES
  var rendererVertNeg = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldVertNeg"), antialias: true});
    //ClearColor is just the background
    rendererVertNeg.setClearColor(0xf0f0f0);
    rendererVertNeg.setPixelRatio(window.devicePixelRatio);
    rendererVertNeg.setSize(250,250);  //in pixels
  var sceneVertNeg = new THREE.Scene();

  var rendererVertPos = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldVertPos"), antialias: true});
    //ClearColor is just the background
    rendererVertPos.setClearColor(0xf0f0f0);
    rendererVertPos.setPixelRatio(window.devicePixelRatio);
    rendererVertPos.setSize(250,250);  //in pixels
  var sceneVertPos = new THREE.Scene();

  var rendererHorPos = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldHorPos"), antialias: true});
    //ClearColor is just the background
    rendererHorPos.setClearColor(0xf0f0f0);
    rendererHorPos.setPixelRatio(window.devicePixelRatio);
    rendererHorPos.setSize(250,250);  //in pixels
  var sceneHorPos = new THREE.Scene();

  var rendererHorNeg = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldHorNeg"), antialias: true});
    //ClearColor is just the background
    rendererHorNeg.setClearColor(0xf0f0f0);
    rendererHorNeg.setPixelRatio(window.devicePixelRatio);
    rendererHorNeg.setSize(250,250);  //in pixels
  var sceneHorNeg = new THREE.Scene();

  var rendererEx1 = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldEx1"), antialias: true});
    //ClearColor is just the background
    rendererEx1.setClearColor(0xf0f0f0);
    rendererEx1.setPixelRatio(window.devicePixelRatio);
    rendererEx1.setSize(250,250);  //in pixels
  var sceneEx1 = new THREE.Scene();

  var rendererEx2 = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldEx2"), antialias: true});
    //ClearColor is just the background
    rendererEx2.setClearColor(0xf0f0f0);
    rendererEx2.setPixelRatio(window.devicePixelRatio);
    rendererEx2.setSize(250,250);  //in pixels
  var sceneEx2 = new THREE.Scene();

  var pointgeom = new THREE.SphereGeometry(0.2, 50, 50);
  var pointMat1d = new THREE.MeshBasicMaterial({color: 0x00cc00});

  var shellGeom1 = new THREE.CircleGeometry(1,100);
  shellGeom1.vertices.shift();
  var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aa00});
  var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ff00});

  // VECTOR FIELDS
  var vectorFieldVertNeg = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxVertNeg,
      dy: fyVertNeg,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneVertNeg.add(vectorFieldVertNeg);

  var vectorFieldVertPos = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxVertPos,
      dy: fyVertPos,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneVertPos.add(vectorFieldVertPos);

  var vectorFieldHorPos = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxHorPos,
      dy: fyHorPos,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneHorPos.add(vectorFieldHorPos);

  var vectorFieldHorNeg = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxHorNeg,
      dy: fyHorNeg,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneHorNeg.add(vectorFieldHorNeg);

  var vectorFieldEx1 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxEx1,
      dy: fyEx1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneEx1.add(vectorFieldEx1);

  var vectorFieldEx2 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fxEx2,
      dy: fyEx2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0x000000,
      gridcolory: 0x000000,
      thickness: .25
  });
  sceneEx2.add(vectorFieldEx2);

  // POINTS AND SHELLS
  var pointVertNeg = new THREE.Mesh(pointgeom, pointMat1d);
  pointVertNeg.position.z = 2;
  sceneVertNeg.add(pointVertNeg);
  var shellVertNeg = new THREE.Line(shellGeom1, shellMat1);
  shellVertNeg.scale.set(2,2,2);
  sceneVertNeg.add(shellVertNeg);

  var pointVertPos = new THREE.Mesh(pointgeom, pointMat1d);
  pointVertPos.position.z = 2;
  sceneVertPos.add(pointVertPos);
  var shellVertPos = new THREE.Line(shellGeom1, shellMat1);
  shellVertPos.scale.set(2,2,2);
  sceneVertPos.add(shellVertPos);

  var pointHorPos = new THREE.Mesh(pointgeom, pointMat1d);
  pointHorPos.position.z = 2;
  sceneHorPos.add(pointHorPos);
  var shellHorPos = new THREE.Line(shellGeom1, shellMat1);
  shellHorPos.scale.set(2,2,2);
  sceneHorPos.add(shellHorPos);

  var pointHorNeg = new THREE.Mesh(pointgeom, pointMat1d);
  pointHorNeg.position.z = 2;
  sceneHorNeg.add(pointHorNeg);
  var shellHorNeg = new THREE.Line(shellGeom1, shellMat1);
  shellHorNeg.scale.set(2,2,2);
  sceneHorNeg.add(shellHorNeg);

  var pointEx1 = new THREE.Mesh(pointgeom, pointMat1d);
  pointEx1.position.z = 2;
  sceneEx1.add(pointEx1);
  var shellEx1 = new THREE.Line(shellGeom1, shellMat1);
  shellEx1.scale.set(2,2,2);
  sceneEx1.add(shellEx1);

  var pointEx2 = new THREE.Mesh(pointgeom, pointMat1d);
  pointEx2.position.z = 2;
  sceneEx2.add(pointEx2);
  var shellEx2 = new THREE.Line(shellGeom1, shellMat1);
  shellEx2.scale.set(2,2,2);
  sceneEx2.add(shellEx2);

  // handling scrolling over canvasses
  // document.getElementById("curlfieldVertNeg").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldVertNeg").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleVertNeg = false;
    arrowsMovingVertNeg = false;
    pointMovingVertNeg = false;
  });

  // document.getElementById("curlfieldVertPos").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldVertPos").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleVertPos = false;
    arrowsMovingVertPos = false;
    pointMovingVertPos = false;
  });

  // document.getElementById("curlfieldHorPos").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldHorPos").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleHorPos = false;
    arrowsMovingHorPos = false;
    pointMovingHorPos = false;
  });

  // document.getElementById("curlfieldHorNeg").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldHorNeg").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleHorNeg = false;
    arrowsMovingHorNeg = false;
    pointMovingHorNeg = false;
  });

  // document.getElementById("curlfieldEx1").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldEx1").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleEx1 = false;
    arrowsMovingEx1 = false;
    pointMovingEx1 = false;
  });

  // document.getElementById("curlfieldEx2").addEventListener('mouseover', function(event) {
  //   disableScroll();
  // });
  document.getElementById("curlfieldEx2").addEventListener('mouseout', function(event) {
    // enableScroll();
    scaleEx2 = false;
    arrowsMovingEx2 = false;
    pointMovingEx2 = false;
  });

  // EVENT LISTENERS
  // document.getElementById("curlfieldVertNeg").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraVertNeg_scale < 1.9) cameraVertNeg_scale += .1;
  //   }
  //   else {
  //     if(cameraVertNeg_scale > .6) cameraVertNeg_scale -= .1;
  //   }
  //   cameraScale(cameraVertNeg, cameraVertNeg_scale);
  //   pointVertNeg.scale.set(1/cameraVertNeg_scale, 1/cameraVertNeg_scale, 1/cameraVertNeg_scale);
  // });

  document.getElementById("curlfieldVertNeg").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldVertNeg`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldVertNeg`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellVertNeg.position.x * cameraVertNeg_scale - mousex)*(shellVertNeg.position.x * cameraVertNeg_scale - mousex) + (shellVertNeg.position.y * cameraVertNeg_scale - mousey)*(shellVertNeg.position.y * cameraVertNeg_scale - mousey));
    if(Math.abs(dist - shellVertNeg.scale.x*cameraVertNeg_scale) <= .1)  {
      rendererVertNeg.domElement.style.cursor = "pointer";
      shellVertNeg.material = shellMat2;
    }
    else {
      if(dist - pointVertNeg.scale.x*cameraVertNeg_scale/5 >= 0) rendererVertNeg.domElement.style.cursor = "auto";
      else rendererVertNeg.domElement.style.cursor = "pointer";
      shellVertNeg.material = shellMat1;
    }
  });

  document.getElementById("curlfieldVertNeg").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellVertNeg.position.x * cameraVertNeg_scale - mousex)*(shellVertNeg.position.x * cameraVertNeg_scale - mousex) + (shellVertNeg.position.y * cameraVertNeg_scale - mousey)*(shellVertNeg.position.y * cameraVertNeg_scale - mousey));
    if(Math.abs(dist - shellVertNeg.scale.x*cameraVertNeg_scale) <= .1) scaleVertNeg = true;
    else if(dist - pointVertNeg.scale.x*cameraVertNeg_scale/5 < 0) {
      pointMovingVertNeg = true;
      arrowsMovingVertNeg = true;
    }
    arrowsMovingVertNeg = true;
  });

  document.getElementById("curlfieldVertNeg").addEventListener('mouseup', function() {
    scaleVertNeg = false;
    arrowsMovingVertNeg = false;
    pointMovingVertNeg = false;
    if(Math.abs(dist - shellVertNeg.scale.x*cameraVertNeg_scale) <= .1)  {
      rendererVertNeg.domElement.style.cursor = "pointer";
      shellVertNeg.material = shellMat2;
    }
    else {
      if(dist - pointVertNeg.scale.x*cameraVertNeg_scale/5 >= 0) rendererVertNeg.domElement.style.cursor = "auto";
      else rendererVertNeg.domElement.style.cursor = "pointer";
      shellVertNeg.material = shellMat1;
    }
  } );

  // VertPos

  // document.getElementById("curlfieldVertPos").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraVertPos_scale < 1.9) cameraVertPos_scale += .1;
  //   }
  //   else {
  //     if(cameraVertPos_scale > .6) cameraVertPos_scale -= .1;
  //   }
  //   cameraScale(cameraVertPos, cameraVertPos_scale);
  //   pointVertPos.scale.set(1/cameraVertPos_scale, 1/cameraVertPos_scale, 1/cameraVertPos_scale);
  // });

  document.getElementById("curlfieldVertPos").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldVertPos`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldVertPos`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellVertPos.position.x * cameraVertPos_scale - mousex)*(shellVertPos.position.x * cameraVertPos_scale - mousex) + (shellVertPos.position.y * cameraVertPos_scale - mousey)*(shellVertPos.position.y * cameraVertPos_scale - mousey));
    if(Math.abs(dist - shellVertPos.scale.x*cameraVertPos_scale) <= .1)  {
      rendererVertPos.domElement.style.cursor = "pointer";
      shellVertPos.material = shellMat2;
    }
    else {
      if(dist - pointVertPos.scale.x*cameraVertPos_scale/5 >= 0) rendererVertPos.domElement.style.cursor = "auto";
      else rendererVertPos.domElement.style.cursor = "pointer";
      shellVertPos.material = shellMat1;
    }
  });

  document.getElementById("curlfieldVertPos").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellVertPos.position.x * cameraVertPos_scale - mousex)*(shellVertPos.position.x * cameraVertPos_scale - mousex) + (shellVertPos.position.y * cameraVertPos_scale - mousey)*(shellVertPos.position.y * cameraVertPos_scale - mousey));
    if(Math.abs(dist - shellVertPos.scale.x*cameraVertPos_scale) <= .1) scaleVertPos = true;
    else if(dist - pointVertPos.scale.x*cameraVertPos_scale/5 < 0) {
      pointMovingVertPos = true;
      arrowsMovingVertPos = true;
    }
    arrowsMovingVertPos = true;
  });

  document.getElementById("curlfieldVertPos").addEventListener('mouseup', function() {
    scaleVertPos = false;
    arrowsMovingVertPos = false;
    pointMovingVertPos = false;
    if(Math.abs(dist - shellVertPos.scale.x*cameraVertPos_scale) <= .1)  {
      rendererVertPos.domElement.style.cursor = "pointer";
      shellVertPos.material = shellMat2;
    }
    else {
      if(dist - pointVertPos.scale.x*cameraVertPos_scale/5 >= 0) rendererVertPos.domElement.style.cursor = "auto";
      else rendererVertPos.domElement.style.cursor = "pointer";
      shellVertPos.material = shellMat1;
    }
  } );

  // HorPos

  // document.getElementById("curlfieldHorPos").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraHorPos_scale < 1.9) cameraHorPos_scale += .1;
  //   }
  //   else {
  //     if(cameraHorPos_scale > .6) cameraHorPos_scale -= .1;
  //   }
  //   cameraScale(cameraHorPos, cameraHorPos_scale);
  //   pointHorPos.scale.set(1/cameraHorPos_scale, 1/cameraHorPos_scale, 1/cameraHorPos_scale);
  // });

  document.getElementById("curlfieldHorPos").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldHorPos`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldHorPos`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellHorPos.position.x * cameraHorPos_scale - mousex)*(shellHorPos.position.x * cameraHorPos_scale - mousex) + (shellHorPos.position.y * cameraHorPos_scale - mousey)*(shellHorPos.position.y * cameraHorPos_scale - mousey));
    if(Math.abs(dist - shellHorPos.scale.x*cameraHorPos_scale) <= .1)  {
      rendererHorPos.domElement.style.cursor = "pointer";
      shellHorPos.material = shellMat2;
    }
    else {
      if(dist - pointHorPos.scale.x*cameraHorPos_scale/5 >= 0) rendererHorPos.domElement.style.cursor = "auto";
      else rendererHorPos.domElement.style.cursor = "pointer";
      shellHorPos.material = shellMat1;
    }
  });

  document.getElementById("curlfieldHorPos").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellHorPos.position.x * cameraHorPos_scale - mousex)*(shellHorPos.position.x * cameraHorPos_scale - mousex) + (shellHorPos.position.y * cameraHorPos_scale - mousey)*(shellHorPos.position.y * cameraHorPos_scale - mousey));
    if(Math.abs(dist - shellHorPos.scale.x*cameraHorPos_scale) <= .1) scaleHorPos = true;
    else if(dist - pointHorPos.scale.x*cameraHorPos_scale/5 < 0) {
      pointMovingHorPos = true;
      arrowsMovingHorPos = true;
    }
    arrowsMovingHorPos = true;
  });

  document.getElementById("curlfieldHorPos").addEventListener('mouseup', function() {
    scaleHorPos = false;
    arrowsMovingHorPos = false;
    pointMovingHorPos = false;
    if(Math.abs(dist - shellHorPos.scale.x*cameraHorPos_scale) <= .1)  {
      rendererHorPos.domElement.style.cursor = "pointer";
      shellHorPos.material = shellMat2;
    }
    else {
      if(dist - pointHorPos.scale.x*cameraHorPos_scale/5 >= 0) rendererHorPos.domElement.style.cursor = "auto";
      else rendererHorPos.domElement.style.cursor = "pointer";
      shellHorPos.material = shellMat1;
    }
  } );

  // HorNeg

  // document.getElementById("curlfieldHorNeg").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraHorNeg_scale < 1.9) cameraHorNeg_scale += .1;
  //   }
  //   else {
  //     if(cameraHorNeg_scale > .6) cameraHorNeg_scale -= .1;
  //   }
  //   cameraScale(cameraHorNeg, cameraHorNeg_scale);
  //   pointHorNeg.scale.set(1/cameraHorNeg_scale, 1/cameraHorNeg_scale, 1/cameraHorNeg_scale);
  // });

  document.getElementById("curlfieldHorNeg").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldHorNeg`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldHorNeg`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellHorNeg.position.x * cameraHorNeg_scale - mousex)*(shellHorNeg.position.x * cameraHorNeg_scale - mousex) + (shellHorNeg.position.y * cameraHorNeg_scale - mousey)*(shellHorNeg.position.y * cameraHorNeg_scale - mousey));
    if(Math.abs(dist - shellHorNeg.scale.x*cameraHorNeg_scale) <= .1)  {
      rendererHorNeg.domElement.style.cursor = "pointer";
      shellHorNeg.material = shellMat2;
    }
    else {
      if(dist - pointHorNeg.scale.x*cameraHorNeg_scale/5 >= 0) rendererHorNeg.domElement.style.cursor = "auto";
      else rendererHorNeg.domElement.style.cursor = "pointer";
      shellHorNeg.material = shellMat1;
    }
  });

  document.getElementById("curlfieldHorNeg").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellHorNeg.position.x * cameraHorNeg_scale - mousex)*(shellHorNeg.position.x * cameraHorNeg_scale - mousex) + (shellHorNeg.position.y * cameraHorNeg_scale - mousey)*(shellHorNeg.position.y * cameraHorNeg_scale - mousey));
    if(Math.abs(dist - shellHorNeg.scale.x*cameraHorNeg_scale) <= .1) scaleHorNeg = true;
    else if(dist - pointHorNeg.scale.x*cameraHorNeg_scale/5 < 0) {
      pointMovingHorNeg = true;
      arrowsMovingHorNeg = true;
    }
    arrowsMovingHorNeg = true;
  });

  document.getElementById("curlfieldHorNeg").addEventListener('mouseup', function() {
    scaleHorNeg = false;
    arrowsMovingHorNeg = false;
    pointMovingHorNeg = false;
    if(Math.abs(dist - shellHorNeg.scale.x*cameraHorNeg_scale) <= .1)  {
      rendererHorNeg.domElement.style.cursor = "pointer";
      shellHorNeg.material = shellMat2;
    }
    else {
      if(dist - pointHorNeg.scale.x*cameraHorNeg_scale/5 >= 0) rendererHorNeg.domElement.style.cursor = "auto";
      else rendererHorNeg.domElement.style.cursor = "pointer";
      shellHorNeg.material = shellMat1;
    }
  } );

  // Ex1

  // document.getElementById("curlfieldEx1").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraEx1_scale < 1.9) cameraEx1_scale += .1;
  //   }
  //   else {
  //     if(cameraEx1_scale > .6) cameraEx1_scale -= .1;
  //   }
  //   cameraScale(cameraEx1, cameraEx1_scale);
  //   pointEx1.scale.set(1/cameraEx1_scale, 1/cameraEx1_scale, 1/cameraEx1_scale);
  // });

  document.getElementById("curlfieldEx1").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldEx1`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldEx1`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellEx1.position.x * cameraEx1_scale - mousex)*(shellEx1.position.x * cameraEx1_scale - mousex) + (shellEx1.position.y * cameraEx1_scale - mousey)*(shellEx1.position.y * cameraEx1_scale - mousey));
    if(Math.abs(dist - shellEx1.scale.x*cameraEx1_scale) <= .1)  {
      rendererEx1.domElement.style.cursor = "pointer";
      shellEx1.material = shellMat2;
    }
    else {
      if(dist - pointEx1.scale.x*cameraEx1_scale/5 >= 0) rendererEx1.domElement.style.cursor = "auto";
      else rendererEx1.domElement.style.cursor = "pointer";
      shellEx1.material = shellMat1;
    }
  });

  document.getElementById("curlfieldEx1").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellEx1.position.x * cameraEx1_scale - mousex)*(shellEx1.position.x * cameraEx1_scale - mousex) + (shellEx1.position.y * cameraEx1_scale - mousey)*(shellEx1.position.y * cameraEx1_scale - mousey));
    if(Math.abs(dist - shellEx1.scale.x*cameraEx1_scale) <= .1) scaleEx1 = true;
    else if(dist - pointEx1.scale.x*cameraEx1_scale/5 < 0) {
      pointMovingEx1 = true;
      arrowsMovingEx1 = true;
    }
    arrowsMovingEx1 = true;
  });

  document.getElementById("curlfieldEx1").addEventListener('mouseup', function() {
    scaleEx1 = false;
    arrowsMovingEx1 = false;
    pointMovingEx1 = false;
    if(Math.abs(dist - shellEx1.scale.x*cameraEx1_scale) <= .1)  {
      rendererEx1.domElement.style.cursor = "pointer";
      shellEx1.material = shellMat2;
    }
    else {
      if(dist - pointEx1.scale.x*cameraEx1_scale/5 >= 0) rendererEx1.domElement.style.cursor = "auto";
      else rendererEx1.domElement.style.cursor = "pointer";
      shellEx1.material = shellMat1;
    }
  } );

  // Ex2

  // document.getElementById("curlfieldEx2").addEventListener("wheel", function(e){
  //   var e = window.event;
  //   var delta = e.deltaY;
  //   if(delta > 0) {
  //     if(cameraEx2_scale < 1.9) cameraEx2_scale += .1;
  //   }
  //   else {
  //     if(cameraEx2_scale > .6) cameraEx2_scale -= .1;
  //   }
  //   cameraScale(cameraEx2, cameraEx2_scale);
  //   pointEx2.scale.set(1/cameraEx2_scale, 1/cameraEx2_scale, 1/cameraEx2_scale);
  // });

  document.getElementById("curlfieldEx2").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $(`#curlfieldEx2`).offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $(`#curlfieldEx2`).offset().top + $(window).scrollTop()) / 25) - 5);
    dist = Math.sqrt((shellEx2.position.x * cameraEx2_scale - mousex)*(shellEx2.position.x * cameraEx2_scale - mousex) + (shellEx2.position.y * cameraEx2_scale - mousey)*(shellEx2.position.y * cameraEx2_scale - mousey));
    if(Math.abs(dist - shellEx2.scale.x*cameraEx2_scale) <= .1)  {
      rendererEx2.domElement.style.cursor = "pointer";
      shellEx2.material = shellMat2;
    }
    else {
      if(dist - pointEx2.scale.x*cameraEx2_scale/5 >= 0) rendererEx2.domElement.style.cursor = "auto";
      else rendererEx2.domElement.style.cursor = "pointer";
      shellEx2.material = shellMat1;
    }
  });

  document.getElementById("curlfieldEx2").addEventListener('mousedown', function(event) {
    // dist = Math.sqrt((shellEx2.position.x * cameraEx2_scale - mousex)*(shellEx2.position.x * cameraEx2_scale - mousex) + (shellEx2.position.y * cameraEx2_scale - mousey)*(shellEx2.position.y * cameraEx2_scale - mousey));
    if(Math.abs(dist - shellEx2.scale.x*cameraEx2_scale) <= .1) scaleEx2 = true;
    else if(dist - pointEx2.scale.x*cameraEx2_scale/5 < 0) {
      pointMovingEx2 = true;
      arrowsMovingEx2 = true;
    }
    arrowsMovingEx2 = true;
  });

  document.getElementById("curlfieldEx2").addEventListener('mouseup', function() {
    scaleEx2 = false;
    arrowsMovingEx2 = false;
    pointMovingEx2 = false;
    if(Math.abs(dist - shellEx2.scale.x*cameraEx2_scale) <= .1)  {
      rendererEx2.domElement.style.cursor = "pointer";
      shellEx2.material = shellMat2;
    }
    else {
      if(dist - pointEx2.scale.x*cameraEx2_scale/5 >= 0) rendererEx2.domElement.style.cursor = "auto";
      else rendererEx2.domElement.style.cursor = "pointer";
      shellEx2.material = shellMat1;
    }
  } );

  initShellArrows();

  requestAnimationFrame(render);
  function render() {
    if(scaleVertNeg) setShellSize(shellVertNeg, cameraVertNeg_scale);
    if(scaleVertPos) setShellSize(shellVertPos, cameraVertPos_scale);
    if(scaleHorPos) setShellSize(shellHorPos, cameraHorPos_scale);
    if(scaleHorNeg) setShellSize(shellHorNeg, cameraHorNeg_scale);
    if(scaleEx1) setShellSize(shellEx1, cameraEx1_scale);
    if(scaleEx2) setShellSize(shellEx2, cameraEx2_scale);

    if(pointMovingVertNeg) movePoint2D(pointVertNeg, shellVertNeg, cameraVertNeg_scale);
    if(pointMovingVertPos) movePoint2D(pointVertPos, shellVertPos, cameraVertPos_scale);
    if(pointMovingHorPos) movePoint2D(pointHorPos, shellHorPos, cameraHorPos_scale);
    if(pointMovingHorNeg) movePoint2D(pointHorNeg, shellHorNeg, cameraHorNeg_scale);
    if(pointMovingEx1) movePoint2D(pointEx1, shellEx1, cameraEx1_scale);
    if(pointMovingEx2) movePoint2D(pointEx2, shellEx2, cameraEx2_scale);

    if(arrowsMovingVertNeg) moveArrowsVertNeg();
    if(arrowsMovingVertPos) moveArrowsVertPos();
    if(arrowsMovingHorPos) moveArrowsHorPos();
    if(arrowsMovingHorNeg) moveArrowsHorNeg();
    if(arrowsMovingEx1) moveArrowsEx1();
    if(arrowsMovingEx2) moveArrowsEx2();

    rendererVertNeg.render(sceneVertNeg, cameraVertNeg);
    rendererVertPos.render(sceneVertPos, cameraVertPos);
    rendererHorPos.render(sceneHorPos, cameraHorPos);
    rendererHorNeg.render(sceneHorNeg, cameraHorNeg);
    rendererEx1.render(sceneEx1, cameraEx1);
    rendererEx2.render(sceneEx2, cameraEx2);
    // renderer3d1.render(scene3d1, camera3d);
    requestAnimationFrame(render);
  }
});
