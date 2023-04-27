class vectorCircle2D {
  constructor(options) {
    if(options.functionx == null); // error out -- not currently functional
    else this.functionx = options.functionx;

    if(options.functiony == null); // error out -- not currently functional
    else this.functiony = options.functiony;

    var centerGeom = new THREE.SphereGeometry(0.2, 50, 50);
    var centerMat1d = new THREE.MeshBasicMaterial({color: 0x00cccc});
    var centerMat2d = new THREE.MeshBasicMaterial({color: 0x00ffff});

    this.center = new THREE.Mesh(centerGeom, centerMat1d);
    this.center.position.z = 2;

    this.radius = options.radius || 2;

    var shellGeom = new THREE.CircleGeometry(1,100);
    shellGeom.vertices.shift();
    var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aaaa});
    var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ffff});

    this.shell = new THREE.Line(shellGeom, shellMat1);
    this.shell.scale.set(this.radius, this.radius, this.radius);

    this.arrows = [
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1)
    ];

    this.main = new THREE.Object3D();
    this.main.add(this.center);
    this.main.add(this.shell);
    this.main.add(this.arrows[0]);
    this.main.add(this.arrows[1]);
    this.main.add(this.arrows[2]);
    this.main.add(this.arrows[3]);
    this.main.add(this.arrows[4]);
    this.main.add(this.arrows[5]);
    this.main.add(this.arrows[6]);
    this.main.add(this.arrows[7]);

    this.moving = false;
    this.scaling = false;

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
    	new THREE.Vector3(-.07, 1, 0),
    	new THREE.Vector3(-.07, 0, 0),
    	new THREE.Vector3(.07, 0, 0),
      new THREE.Vector3(.07, 1, 0)
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ), new THREE.Face3(0, 2, 3) );

    geometry.computeBoundingSphere();
    var materials = [
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    ];
    this.meshes = [
      new THREE.Mesh( geometry, materials[0] ),
      new THREE.Mesh( geometry, materials[1] ),
      new THREE.Mesh( geometry, materials[2] ),
      new THREE.Mesh( geometry, materials[3] ),
      new THREE.Mesh( geometry, materials[4] ),
      new THREE.Mesh( geometry, materials[5] ),
      new THREE.Mesh( geometry, materials[6] ),
      new THREE.Mesh( geometry, materials[7] )
    ];
    for(var i = 0; i < 8; i++) { this.arrows[i].add(this.meshes[i]) };

    this.moveTo(-0.5, 1.5);
  }
  moveTo(x, y) {
    this.center.position.x = x;
    this.center.position.y = y;

    this.shell.position.x = x;
    this.shell.position.y = y;

    this.arrows[0].position.x = x + this.radius * Math.cos(Math.PI/8);
    this.arrows[0].position.y = y + this.radius * Math.sin(Math.PI/8);

    this.arrows[1].position.x = x + this.radius * Math.cos(Math.PI*3/8);
    this.arrows[1].position.y = y + this.radius * Math.sin(Math.PI*3/8);

    this.arrows[2].position.x = x - this.radius * Math.cos(Math.PI/8);
    this.arrows[2].position.y = y + this.radius * Math.sin(Math.PI/8);

    this.arrows[3].position.x = x - this.radius * Math.cos(Math.PI*3/8);
    this.arrows[3].position.y = y + this.radius * Math.sin(Math.PI*3/8);

    this.arrows[4].position.x = x + this.radius * Math.cos(Math.PI/8);
    this.arrows[4].position.y = y - this.radius * Math.sin(Math.PI/8);

    this.arrows[5].position.x = x + this.radius * Math.cos(Math.PI*3/8);
    this.arrows[5].position.y = y - this.radius * Math.sin(Math.PI*3/8);

    this.arrows[6].position.x = x - this.radius * Math.cos(Math.PI/8);
    this.arrows[6].position.y = y - this.radius * Math.sin(Math.PI/8);

    this.arrows[7].position.x = x - this.radius * Math.cos(Math.PI*3/8);
    this.arrows[7].position.y = y - this.radius * Math.sin(Math.PI*3/8);

    this.setArrows();
  }
  scaleRing(scale) {
    this.shell.scale.set(scale, scale, scale);
    this.radius = scale;
    this.moveTo(this.center.position.x, this.center.position.y);
  }
  setArrows() {
    for(var i = 0; i < 8; i++) {
      var arrowFuncX = this.functionx(this.arrows[i].position.x, this.arrows[i].position.y);
      var arrowFuncY = this.functiony(this.arrows[i].position.x, this.arrows[i].position.y);

      var length = Math.sqrt(Math.pow(arrowFuncX, 2) + Math.pow(arrowFuncY, 2)) / 6;
      if(length > .2) this.arrows[i].setLength(length, 1/3, 1/3);
      else this.arrows[i].setLength(length, length/.6, 1/3);

      if(length != 0) {
        if((this.arrows[i].position.x - this.center.position.x) * arrowFuncY + -(this.arrows[i].position.y - this.center.position.y) * arrowFuncX > 0) this.arrows[i].setColor(new THREE.Color(0x0000aa));
        else if((this.arrows[i].position.x - this.center.position.x) * arrowFuncY + -(this.arrows[i].position.y - this.center.position.y) * arrowFuncX == 0) this.arrows[i].setColor(new THREE.Color(0x888888));
        else this.arrows[i].setColor(new THREE.Color(0xff0000));

        this.arrows[i].setDirection(new THREE.Vector3(arrowFuncX, arrowFuncY, 0).normalize());
      }

      if(this.arrows[i].children[2])  {
        if(length > .2) this.arrows[i].children[2].scale.set(3/4, length - .25, length);
        else this.arrows[i].children[2].scale.set(3/4, length*3/4 /*- .25*/, length);
        this.arrows[i].children[2].material.color.set(this.arrows[i].line.material.color);

        // for some reason, when pointing straight down, the arrow shaft flips upside down. This fixes that.
        if(arrowFuncX == 0 && arrowFuncY < 0) this.arrows[i].children[2].rotation.set(0, Math.PI, 0);
        else this.arrows[i].children[2].rotation.set(0, 0, 0);
      }
    }
  }
}

var dist = 1000;
var mousex, mousey;
var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aaaa});
var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ffff});
var centerMat1 = new THREE.MeshBasicMaterial({color: 0x00cccc});
var centerMat2 = new THREE.MeshBasicMaterial({color: 0x00ffff});

function handleMouseDown(circle) {
  if(Math.abs(dist - circle.shell.scale.x) <= .1) circle.scaling = true;
  else if(dist - circle.center.scale.x/5 < 0) circle.moving = true;
}

function handleMouseMoving(circle, renderer) {
  dist = Math.sqrt((circle.shell.position.x - mousex)*(circle.shell.position.x - mousex) + (circle.shell.position.y - mousey)*(circle.shell.position.y - mousey));
  if(Math.abs(dist - circle.shell.scale.x) <= .1)  {
    renderer.domElement.style.cursor = "pointer";
    circle.shell.material = shellMat2;
  }
  else {
    if(dist - circle.center.scale.x / 5 >= 0) renderer.domElement.style.cursor = "auto";
    else renderer.domElement.style.cursor = "pointer";
    circle.center.material = (dist - circle.center.scale.x / 5 >= 0) ? centerMat1 : centerMat2;
    circle.shell.material = shellMat1;
  }
  if(circle.moving) circle.moveTo(mousex, mousey);
  if(circle.scaling) circle.scaleRing(dist);
}

function handleMouseUp(circle, renderer) {
  circle.moving = false;
  circle.scaling = false;
  if(Math.abs(dist - circle.shell.scale.x) <= .1)  {
    renderer.domElement.style.cursor = "pointer";
    circle.shell.material = shellMat2;
  }
  else {
    if(dist - circle.center.scale.x) renderer.domElement.style.cursor = "auto";
    else renderer.domElement.style.cursor = "pointer";
    circle.shell.material = shellMat1;
  }
}

$(document).ready(function() {
  // VertPos ////////////////////////

  function fx_VertPos(x, y) {return 0};
  function fy_VertPos(x, y) {return 2*x};

  var circle_VertPos = new vectorCircle2D({canvas: "curlfieldVertPos",
    functionx: fx_VertPos, functiony: fy_VertPos});

  var camera_VertPos = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_VertPos.position.z = 4;
  var camera_VertPos_scale = 1;

  var renderer_VertPos = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldVertPos"), antialias: true});
    //ClearColor is just the background
    renderer_VertPos.setClearColor(0xf0f0f0);
    renderer_VertPos.setPixelRatio(window.devicePixelRatio);
    renderer_VertPos.setSize(250,250);  //in pixels
  var scene_VertPos = new THREE.Scene();

  scene_VertPos.add(circle_VertPos.main);

  var vectorField_VertPos = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_VertPos,
      dy: fy_VertPos,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_VertPos.add(vectorField_VertPos);

  document.getElementById("curlfieldVertPos").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_VertPos);
  });
  document.getElementById("curlfieldVertPos").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldVertPos").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldVertPos").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_VertPos, renderer_VertPos);
  });
  document.getElementById("curlfieldVertPos").addEventListener('mouseup', function() {
    handleMouseUp(circle_VertPos, renderer_VertPos);
  });

  // VertNeg ////////////////////////

  function fx_VertNeg(x, y) {return 0};
  function fy_VertNeg(x, y) {return -2*x};

  var circle_VertNeg = new vectorCircle2D({canvas: "curlfieldVertNeg",
    functionx: fx_VertNeg, functiony: fy_VertNeg});

  var camera_VertNeg = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_VertNeg.position.z = 4;
  var camera_VertNeg_scale = 1;

  var renderer_VertNeg = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldVertNeg"), antialias: true});
    //ClearColor is just the background
    renderer_VertNeg.setClearColor(0xf0f0f0);
    renderer_VertNeg.setPixelRatio(window.devicePixelRatio);
    renderer_VertNeg.setSize(250,250);  //in pixels
  var scene_VertNeg = new THREE.Scene();

  scene_VertNeg.add(circle_VertNeg.main);

  var vectorField_VertNeg = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_VertNeg,
      dy: fy_VertNeg,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_VertNeg.add(vectorField_VertNeg);

  document.getElementById("curlfieldVertNeg").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_VertNeg);
  });
  document.getElementById("curlfieldVertNeg").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldVertNeg").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldVertNeg").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_VertNeg, renderer_VertNeg);
  });
  document.getElementById("curlfieldVertNeg").addEventListener('mouseup', function() {
    handleMouseUp(circle_VertNeg, renderer_VertNeg);
  });

  // HorPos ////////////////////////

  function fx_HorPos(x, y) {return -2*y};
  function fy_HorPos(x, y) {return 0};

  var circle_HorPos = new vectorCircle2D({canvas: "curlfieldHorPos",
    functionx: fx_HorPos, functiony: fy_HorPos});

  var camera_HorPos = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_HorPos.position.z = 4;
  var camera_HorPos_scale = 1;

  var renderer_HorPos = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldHorPos"), antialias: true});
    //ClearColor is just the background
    renderer_HorPos.setClearColor(0xf0f0f0);
    renderer_HorPos.setPixelRatio(window.devicePixelRatio);
    renderer_HorPos.setSize(250,250);  //in pixels
  var scene_HorPos = new THREE.Scene();

  scene_HorPos.add(circle_HorPos.main);

  var vectorField_HorPos = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_HorPos,
      dy: fy_HorPos,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_HorPos.add(vectorField_HorPos);

  document.getElementById("curlfieldHorPos").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_HorPos);
  });
  document.getElementById("curlfieldHorPos").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldHorPos").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldHorPos").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_HorPos, renderer_HorPos);
  });
  document.getElementById("curlfieldHorPos").addEventListener('mouseup', function() {
    handleMouseUp(circle_HorPos, renderer_HorPos);
  });

  // HorNeg ////////////////////////

  function fx_HorNeg(x, y) {return 2*y};
  function fy_HorNeg(x, y) {return 0};

  var circle_HorNeg = new vectorCircle2D({canvas: "curlfieldHorNeg",
    functionx: fx_HorNeg, functiony: fy_HorNeg});

  var camera_HorNeg = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_HorNeg.position.z = 4;
  var camera_HorNeg_scale = 1;

  var renderer_HorNeg = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldHorNeg"), antialias: true});
    //ClearColor is just the background
    renderer_HorNeg.setClearColor(0xf0f0f0);
    renderer_HorNeg.setPixelRatio(window.devicePixelRatio);
    renderer_HorNeg.setSize(250,250);  //in pixels
  var scene_HorNeg = new THREE.Scene();

  scene_HorNeg.add(circle_HorNeg.main);

  var vectorField_HorNeg = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_HorNeg,
      dy: fy_HorNeg,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_HorNeg.add(vectorField_HorNeg);

  document.getElementById("curlfieldHorNeg").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_HorNeg);
  });
  document.getElementById("curlfieldHorNeg").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldHorNeg").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldHorNeg").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_HorNeg, renderer_HorNeg);
  });
  document.getElementById("curlfieldHorNeg").addEventListener('mouseup', function() {
    handleMouseUp(circle_HorNeg, renderer_HorNeg);
  });

  // Ex1 ////////////////////////

  function fx_Ex1(x, y) {return 1};
  function fy_Ex1(x, y) {return x*y/2};

  var circle_Ex1 = new vectorCircle2D({canvas: "curlfieldEx1",
    functionx: fx_Ex1, functiony: fy_Ex1});

  var camera_Ex1 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_Ex1.position.z = 4;
  var camera_Ex1_scale = 1;

  var renderer_Ex1 = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldEx1"), antialias: true});
    //ClearColor is just the background
    renderer_Ex1.setClearColor(0xf0f0f0);
    renderer_Ex1.setPixelRatio(window.devicePixelRatio);
    renderer_Ex1.setSize(250,250);  //in pixels
  var scene_Ex1 = new THREE.Scene();

  scene_Ex1.add(circle_Ex1.main);

  var vectorField_Ex1 = FormVectorField2D({
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      dx: fx_Ex1,
      dy: fy_Ex1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_Ex1.add(vectorField_Ex1);

  document.getElementById("curlfieldEx1").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_Ex1);
  });
  document.getElementById("curlfieldEx1").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldEx1").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldEx1").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_Ex1, renderer_Ex1);
  });
  document.getElementById("curlfieldEx1").addEventListener('mouseup', function() {
    handleMouseUp(circle_Ex1, renderer_Ex1);
  });

  // Ex2 ////////////////////////

  function fx_Ex2(x, y) {return x*y/2.5};
  function fy_Ex2(x, y) {return x*y/2.5};

  var circle_Ex2 = new vectorCircle2D({canvas: "curlfieldEx2",
    functionx: fx_Ex2, functiony: fy_Ex2});

  var camera_Ex2 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_Ex2.position.z = 4;
  var camera_Ex2_scale = 1;

  var renderer_Ex2 = new THREE.WebGLRenderer({canvas: document.getElementById("curlfieldEx2"), antialias: true});
    //ClearColor is just the background
    renderer_Ex2.setClearColor(0xf0f0f0);
    renderer_Ex2.setPixelRatio(window.devicePixelRatio);
    renderer_Ex2.setSize(250,250);  //in pixels
  var scene_Ex2 = new THREE.Scene();

  scene_Ex2.add(circle_Ex2.main);

  var vectorField_Ex2 = FormVectorField2D({
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      dx: fx_Ex2,
      dy: fy_Ex2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_Ex2.add(vectorField_Ex2);

  document.getElementById("curlfieldEx2").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_Ex2);
  });
  document.getElementById("curlfieldEx2").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#curlfieldEx2").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#curlfieldEx2").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_Ex2, renderer_Ex2);
  });
  document.getElementById("curlfieldEx2").addEventListener('mouseup', function() {
    handleMouseUp(circle_Ex2, renderer_Ex2);
  });

  requestAnimationFrame(render);
  function render() {
    renderer_VertPos.render(scene_VertPos, camera_VertPos);
    renderer_VertNeg.render(scene_VertNeg, camera_VertNeg);
    renderer_HorPos.render(scene_HorPos, camera_HorPos);
    renderer_HorNeg.render(scene_HorNeg, camera_HorNeg);
    renderer_Ex1.render(scene_Ex1, camera_Ex1);
    renderer_Ex2.render(scene_Ex2, camera_Ex2);

    requestAnimationFrame(render);
  }
})
