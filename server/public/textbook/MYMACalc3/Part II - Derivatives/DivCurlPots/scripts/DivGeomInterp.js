function makePrism(verts, height) {
  var shape = new THREE.Shape();
  shape.moveTo(verts[0].x, verts[0].y);
  for(var i = 1; i < verts.length; i++) {
    shape.lineTo(verts[i].x, verts[i].y);
  }
  shape.lineTo(verts[0].x, verts[0].y);

  var settings = {};
  settings.amount = height;
  settings.bevelEnabled = false;

  var geo = new THREE.ExtrudeGeometry(shape, settings);
  var mat = new THREE.MeshBasicMaterial({color: 0x000000});
  var prism = new THREE.Mesh(geo, mat);

  return prism;
}

class vectorCircle1D {
  constructor(options) {
    if(options.functionx == null); // error out -- not currently functional
    else this.functionx = options.functionx;

    this.radius = options.radius || 1;

    var centerGeom = new THREE.SphereGeometry(this.radius / 10, 50, 50);
    var centerMat1 = new THREE.MeshBasicMaterial({color: 0x00cccc});
    var centerMat2 = new THREE.MeshBasicMaterial({color: 0x00ffff});

    this.center = new THREE.Mesh(centerGeom, centerMat1);
    this.center.position.z = 2;

    var shellGeom = new THREE.CircleGeometry(1,100);
    shellGeom.vertices.shift();
    var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aaaa});
    var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ffff});

    this.shell = new THREE.Line(shellGeom, shellMat1);
    this.shell.scale.set(this.radius, this.radius, this.radius);

    this.arrows = [
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1)
    ];

    this.main = new THREE.Object3D();
    this.main.add(this.center);
    this.main.add(this.shell);
    this.main.add(this.arrows[0]);
    this.main.add(this.arrows[1]);

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
      new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    ];
    this.meshes = [
      new THREE.Mesh( geometry, materials[0] ),
      new THREE.Mesh( geometry, materials[1] )
    ];
    for(var i = 0; i < 2; i++) { this.arrows[i].add(this.meshes[i]) };

    this.moveTo(-0.5, 0);
  }
  moveTo(x, y) { // accepts a y value for compatability with 2D event listeners
    this.center.position.x = x;

    this.shell.position.x = x;

    this.arrows[0].position.x = x + this.radius;

    this.arrows[1].position.x = x - this.radius;

    this.setArrows();
  }
  scaleRing(scale) {
    this.shell.scale.set(scale, scale, scale);
    this.radius = scale;
    this.moveTo(this.center.position.x, this.center.position.y);
  }
  setArrows() {
    for(var i = 0; i < 2; i++) {
      var arrowFuncX = this.functionx(this.arrows[i].position.x);

      var length = arrowFuncX / 6;
      if(length < 0) length *= -1;
      if(length == 0) length = .001;
      if(length > .4) this.arrows[i].setLength(length, 1/3, 1/3);
      else this.arrows[i].setLength(length, length/1.2, 1/3);

      if(length != 0) {
        if((this.arrows[i].position.x - this.center.position.x) * arrowFuncX > 0) this.arrows[i].setColor(new THREE.Color(0x0000aa));
        else this.arrows[i].setColor(new THREE.Color(0xff0000));

        this.arrows[i].setDirection(new THREE.Vector3(arrowFuncX, 0, 0).normalize());
      }

      if(this.arrows[i].children[2])  {
        if(length > .4) this.arrows[i].children[2].scale.set(3/4, length - .25, length);
        else this.arrows[i].children[2].scale.set(3/4, length*2/3 /*- .25*/, length);
        this.arrows[i].children[2].material.color.set(this.arrows[i].line.material.color);
      }
    }
  }
}

class vectorCircle2D {
  constructor(options) {
    if(options.functionx == null); // error out -- not currently functional
    else this.functionx = options.functionx;

    if(options.functiony == null); // error out -- not currently functional
    else this.functiony = options.functiony;

    this.radius = options.radius || 2;

    var centerGeom = new THREE.SphereGeometry(this.radius / 10, 50, 50);
    var centerMat1 = new THREE.MeshBasicMaterial({color: 0x00cccc});
    var centerMat2 = new THREE.MeshBasicMaterial({color: 0x00ffff});

    this.center = new THREE.Mesh(centerGeom, centerMat1);
    this.center.position.z = 1;

    var shellGeom = new THREE.CircleGeometry(1,100);
    shellGeom.vertices.shift();
    var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aaaa});
    var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ffff});

    this.shell = new THREE.Line(shellGeom, shellMat1);
    this.shell.scale.set(this.radius, this.radius, this.radius);

    this.arrows = [
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), 1, 0x000000, 1, 1)
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

    this.arrows[0].position.x = x + this.radius;
    this.arrows[0].position.y = y;

    this.arrows[1].position.x = x + this.radius / Math.sqrt(2);
    this.arrows[1].position.y = y + this.radius / Math.sqrt(2);

    this.arrows[2].position.x = x;
    this.arrows[2].position.y = y + this.radius;

    this.arrows[3].position.x = x - this.radius / Math.sqrt(2);
    this.arrows[3].position.y = y + this.radius / Math.sqrt(2);

    this.arrows[4].position.x = x - this.radius;
    this.arrows[4].position.y = y;

    this.arrows[5].position.x = x - this.radius / Math.sqrt(2);
    this.arrows[5].position.y = y - this.radius / Math.sqrt(2);

    this.arrows[6].position.x = x;
    this.arrows[6].position.y = y - this.radius;

    this.arrows[7].position.x = x + this.radius / Math.sqrt(2);
    this.arrows[7].position.y = y - this.radius / Math.sqrt(2);

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
      if(length == 0) length = .001;
      if(length > .2) this.arrows[i].setLength(length, 1/3, 1/3);
      else this.arrows[i].setLength(length, length/.6, 1/3);

      // l = .2 | x = 1/3
      // l = 0 | x = 0

      if(length != 0) {
        if((this.arrows[i].position.x - this.center.position.x) * arrowFuncX + (this.arrows[i].position.y - this.center.position.y) * arrowFuncY > 0) this.arrows[i].setColor(new THREE.Color(0x0000aa));
        else this.arrows[i].setColor(new THREE.Color(0xff0000));

        this.arrows[i].setDirection(new THREE.Vector3(arrowFuncX, arrowFuncY, 0).normalize());
      }

      if(this.arrows[i].children[2])  {
        if(length > .2) this.arrows[i].children[2].scale.set(2/3, length - .25, length);
        else this.arrows[i].children[2].scale.set(2/3, length*3/4 /*- .25*/, length);
        this.arrows[i].children[2].material.color.set(this.arrows[i].line.material.color);

        // for some reason, when pointing straight down, the arrow shaft flips upside down. This fixes that.
        if(arrowFuncX == 0 && arrowFuncY < 0) this.arrows[i].children[2].rotation.set(0, Math.PI, 0);
        else this.arrows[i].children[2].rotation.set(0, 0, 0);
      }
    }
  }
}

var maxLength = 0;

class vectorCircle3D {
  constructor(options) {
    if(options.functionx == null); // error out -- not currently functional
    else this.functionx = options.functionx;

    if(options.functiony == null); // error out -- not currently functional
    else this.functiony = options.functiony;

    if(options.functionz == null); // error out -- not currently functional
    else this.functionz = options.functionz;

    this.radius = options.radius || 1;

    var centerGeom = new THREE.SphereGeometry(this.radius / 10, 50, 50);
    var centerMat1 = new THREE.MeshBasicMaterial({color: 0x00cccc});
    var centerMat2 = new THREE.MeshBasicMaterial({color: 0x00ffff});

    this.center = new THREE.Mesh(centerGeom, centerMat1);

    var shellGeom = new THREE.SphereGeometry(this.radius, 50, 50);
    var shellMat1 = new THREE.LineBasicMaterial({color: 0x00aaaa, opacity: 0.25, transparent: true});
    var shellMat2 = new THREE.LineBasicMaterial({color: 0x00ffff});

    this.shell = new THREE.Mesh(shellGeom, shellMat1);

    this.arrows = [
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
      new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), 1, 0x000000, 1, 1),
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
    this.main.add(this.arrows[8]);
    this.main.add(this.arrows[9]);
    this.main.add(this.arrows[10]);
    this.main.add(this.arrows[11]);
    this.main.add(this.arrows[12]);
    this.main.add(this.arrows[13]);

    this.moving = false;
    this.scaling = false;

    var materials = [
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
      new THREE.MeshBasicMaterial( { color: 0xff0000 } )
    ];

    this.moveTo(0, 1, 1);
  }
  moveTo(x, y, z) {
    this.center.position.x = x;
    this.center.position.y = y;
    this.center.position.z = z;

    this.shell.position.x = x;
    this.shell.position.y = y;
    this.shell.position.z = z;

    this.arrows[0].position.x = x - - this.radius; // using a "+" operator adds like a string, so two "-" are used instead
    this.arrows[0].position.y = y;
    this.arrows[0].position.z = z;

    this.arrows[1].position.x = x;
    this.arrows[1].position.y = y - - this.radius;
    this.arrows[1].position.z = z;

    this.arrows[2].position.x = x - this.radius;
    this.arrows[2].position.y = y;
    this.arrows[2].position.z = z;

    this.arrows[3].position.x = x;
    this.arrows[3].position.y = y - this.radius;
    this.arrows[3].position.z = z;

    this.arrows[4].position.x = x;
    this.arrows[4].position.y = y;
    this.arrows[4].position.z = z - - this.radius;

    this.arrows[5].position.x = x;
    this.arrows[5].position.y = y;
    this.arrows[5].position.z = z - this.radius;

    this.arrows[6].position.x = x - - (this.radius / Math.sqrt(3));
    this.arrows[6].position.y = y - - (this.radius / Math.sqrt(3));
    this.arrows[6].position.z = z - - (this.radius / Math.sqrt(3));;

    this.arrows[7].position.x = x - (this.radius / Math.sqrt(3));
    this.arrows[7].position.y = y - - (this.radius / Math.sqrt(3));
    this.arrows[7].position.z = z - - (this.radius / Math.sqrt(3));;

    this.arrows[8].position.x = x - - (this.radius / Math.sqrt(3));
    this.arrows[8].position.y = y - (this.radius / Math.sqrt(3));
    this.arrows[8].position.z = z - - (this.radius / Math.sqrt(3));;

    this.arrows[9].position.x = x - - (this.radius / Math.sqrt(3));
    this.arrows[9].position.y = y - - (this.radius / Math.sqrt(3));
    this.arrows[9].position.z = z - (this.radius / Math.sqrt(3));;

    this.arrows[10].position.x = x - (this.radius / Math.sqrt(3));
    this.arrows[10].position.y = y - (this.radius / Math.sqrt(3));
    this.arrows[10].position.z = z - - (this.radius / Math.sqrt(3));;

    this.arrows[11].position.x = x - (this.radius / Math.sqrt(3));
    this.arrows[11].position.y = y - - (this.radius / Math.sqrt(3));
    this.arrows[11].position.z = z - (this.radius / Math.sqrt(3));;

    this.arrows[12].position.x = x - - (this.radius / Math.sqrt(3));
    this.arrows[12].position.y = y - (this.radius / Math.sqrt(3));
    this.arrows[12].position.z = z - (this.radius / Math.sqrt(3));;

    this.arrows[13].position.x = x - (this.radius / Math.sqrt(3));
    this.arrows[13].position.y = y - (this.radius / Math.sqrt(3));
    this.arrows[13].position.z = z - (this.radius / Math.sqrt(3));

    this.setArrows();
  }
  scaleRing(scale) {
    this.shell.scale.set(scale, scale, scale);
    this.radius = scale;
    this.moveTo(this.center.position.x, this.center.position.y, this.center.position.z);
  }
  setArrows() {
    for(var i = 0; i < 14; i++) {
      let p = this.arrows[i].position;
      var arrowFuncX = this.functionx(p.x, p.y, p.z);
      var arrowFuncY = this.functiony(p.x, p.y, p.z);
      var arrowFuncZ = this.functionz(p.x, p.y, p.z);

      var length = Math.sqrt(Math.pow(arrowFuncX, 2) + Math.pow(arrowFuncY, 2) + Math.pow(arrowFuncZ, 2)) / 4;
      this.arrows[i].setLength(length, length/3, length/3);

      if(length != 0) {
        if((this.arrows[i].position.x - this.center.position.x) * arrowFuncX + (this.arrows[i].position.y - this.center.position.y) * arrowFuncY + (this.arrows[i].position.z - this.center.position.z) * arrowFuncZ > 0) this.arrows[i].setColor(new THREE.Color(0x0000aa));
        else this.arrows[i].setColor(new THREE.Color(0xff0000));

        this.arrows[i].setDirection(new THREE.Vector3(arrowFuncX, arrowFuncY, arrowFuncZ).normalize());
      }

      if(this.arrows[i].children[2])  {
        if(length > .2) this.arrows[i].children[2].scale.set(2/3, length - .25, length);
        else this.arrows[i].children[2].scale.set(2/3, length*3/4 /*- .25*/, length);
        this.arrows[i].children[2].material.color.set(this.arrows[i].line.material.color);
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
    circle.shell.material = shellMat1;
  }

  dist = Math.sqrt((circle.center.position.x - mousex)*(circle.center.position.x - mousex) + (circle.center.position.y - mousey)*(circle.center.position.y - mousey))
  if(Math.abs(dist) <= .5)  {
    renderer.domElement.style.cursor = "pointer";
    circle.center.material = centerMat2;
  }
  else circle.center.material = centerMat1;

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
  // 1d1 ////////////////////////

  function fx_1d1(x, y) {return (x+1.5)*6/11};

  var circle_1d1 = new vectorCircle1D({canvas: "1d1",
    functionx: fx_1d1});

    var camera_1d1 = new THREE.OrthographicCamera(-6, 6, 1, -1,0.1,3000);
      camera_1d1.position.z = 4;
    var camera_1d1_scale = 1;

  var renderer_1d1 = new THREE.WebGLRenderer({canvas: document.getElementById("1d1"), antialias: true});
    //ClearColor is just the background
    renderer_1d1.setClearColor(0xf0f0f0);
    renderer_1d1.setPixelRatio(window.devicePixelRatio);
    renderer_1d1.setSize(600,100);  //in pixels
  var scene_1d1 = new THREE.Scene();

  scene_1d1.add(circle_1d1.main);

  var vectorField_1d1 = FormVectorField1D({
      xmin: -12,
      xmax: 12,
      ymin: -2,
      ymax: 2,
      dx: fx_1d1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5,
      dot: true,
  });
  scene_1d1.add(vectorField_1d1);

  document.getElementById("1d1").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_1d1);
  });
  document.getElementById("1d1").addEventListener('mousemove', function(event) { // note that this is different between 1D and 2D
    mousex = ((event.clientX - $("#1d1").offset().left + $(window).scrollLeft()) / 50) - 6;
    mousey = -(((event.clientY - $("#1d1").offset().top + $(window).scrollTop()) / 50) - 1);
    handleMouseMoving(circle_1d1, renderer_1d1);
  });
  document.getElementById("1d1").addEventListener('mouseup', function() {
    handleMouseUp(circle_1d1, renderer_1d1);
  });

  // 1d2 ////////////////////////

  function fx_1d2(x, y) {return (1.5-x)*6/11};

  var circle_1d2 = new vectorCircle1D({canvas: "1d2",
    functionx: fx_1d2});

    var camera_1d2 = new THREE.OrthographicCamera(-6, 6, 1, -1,0.1,3000);
      camera_1d2.position.z = 4;
    var camera_1d2_scale = 1;

  var renderer_1d2 = new THREE.WebGLRenderer({canvas: document.getElementById("1d2"), antialias: true});
    //ClearColor is just the background
    renderer_1d2.setClearColor(0xf0f0f0);
    renderer_1d2.setPixelRatio(window.devicePixelRatio);
    renderer_1d2.setSize(600,100);  //in pixels
  var scene_1d2 = new THREE.Scene();

  scene_1d2.add(circle_1d2.main);

  var vectorField_1d2 = FormVectorField1D({
      xmin: -12,
      xmax: 12,
      ymin: -2,
      ymax: 2,
      dx: fx_1d2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5,
      dot: true,
  });
  scene_1d2.add(vectorField_1d2);

  document.getElementById("1d2").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_1d2);
  });
  document.getElementById("1d2").addEventListener('mousemove', function(event) { // note that this is different between 1D and 2D
    mousex = ((event.clientX - $("#1d2").offset().left + $(window).scrollLeft()) / 50) - 6;
    mousey = -(((event.clientY - $("#1d2").offset().top + $(window).scrollTop()) / 50) - 1);
    handleMouseMoving(circle_1d2, renderer_1d2);
  });
  document.getElementById("1d2").addEventListener('mouseup', function() {
    handleMouseUp(circle_1d2, renderer_1d2);
  });

  // 2d1 ////////////////////////

  function fx_2d1(x, y) {return x+2};
  function fy_2d1(x, y) {return y-1};

  var circle_2d1 = new vectorCircle2D({canvas: "2d1",
    functionx: fx_2d1, functiony: fy_2d1});

  var camera_2d1 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_2d1.position.z = 4;
  var camera_2d1_scale = 1;

  var renderer_2d1 = new THREE.WebGLRenderer({canvas: document.getElementById("2d1"), antialias: true});
    //ClearColor is just the background
    renderer_2d1.setClearColor(0xf0f0f0);
    renderer_2d1.setPixelRatio(window.devicePixelRatio);
    renderer_2d1.setSize(250,250);  //in pixels
  var scene_2d1 = new THREE.Scene();

  scene_2d1.add(circle_2d1.main);

  var vectorField_2d1 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_2d1,
      dy: fy_2d1,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_2d1.add(vectorField_2d1);

  document.getElementById("2d1").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_2d1);
  });
  document.getElementById("2d1").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#2d1").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#2d1").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_2d1, renderer_2d1);
  });
  document.getElementById("2d1").addEventListener('mouseup', function() {
    handleMouseUp(circle_2d1, renderer_2d1);
  });

  // 2d2 ////////////////////////

  function fx_2d2(x, y) {return -x+2};
  function fy_2d2(x, y) {return -y-1};

  var circle_2d2 = new vectorCircle2D({canvas: "2d2",
    functionx: fx_2d2, functiony: fy_2d2});

  var camera_2d2 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_2d2.position.z = 4;
  var camera_2d2_scale = 1;

  var renderer_2d2 = new THREE.WebGLRenderer({canvas: document.getElementById("2d2"), antialias: true});
    //ClearColor is just the background
    renderer_2d2.setClearColor(0xf0f0f0);
    renderer_2d2.setPixelRatio(window.devicePixelRatio);
    renderer_2d2.setSize(250,250);  //in pixels
  var scene_2d2 = new THREE.Scene();

  scene_2d2.add(circle_2d2.main);

  var vectorField_2d2 = FormVectorField2D({
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      dx: fx_2d2,
      dy: fy_2d2,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_2d2.add(vectorField_2d2);

  document.getElementById("2d2").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_2d2);
  });
  document.getElementById("2d2").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#2d2").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#2d2").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_2d2, renderer_2d2);
  });
  document.getElementById("2d2").addEventListener('mouseup', function() {
    handleMouseUp(circle_2d2, renderer_2d2);
  });

  // 2d3 ////////////////////////

  function fx_2d3(x, y) {return 1};
  function fy_2d3(x, y) {return y*x};

  var circle_2d3 = new vectorCircle2D({canvas: "2d3",
    functionx: fx_2d3, functiony: fy_2d3});

  var camera_2d3 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_2d3.position.z = 4;
  var camera_2d3_scale = 1;

  var renderer_2d3 = new THREE.WebGLRenderer({canvas: document.getElementById("2d3"), antialias: true});
    //ClearColor is just the background
    renderer_2d3.setClearColor(0xf0f0f0);
    renderer_2d3.setPixelRatio(window.devicePixelRatio);
    renderer_2d3.setSize(250,250);  //in pixels
  var scene_2d3 = new THREE.Scene();

  scene_2d3.add(circle_2d3.main);

  var vectorField_2d3 = FormVectorField2D({
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      dx: fx_2d3,
      dy: fy_2d3,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_2d3.add(vectorField_2d3);

  document.getElementById("2d3").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_2d3);
  });
  document.getElementById("2d3").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#2d3").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#2d3").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_2d3, renderer_2d3);
  });
  document.getElementById("2d3").addEventListener('mouseup', function() {
    handleMouseUp(circle_2d3, renderer_2d3);
  });

  // 2d4 ////////////////////////

  function fx_2d4(x, y) {return x*x/3};
  function fy_2d4(x, y) {return y*y/3};

  var circle_2d4 = new vectorCircle2D({canvas: "2d4",
    functionx: fx_2d4, functiony: fy_2d4});

  var camera_2d4 = new THREE.OrthographicCamera(-5, 5, 5, -5,0.1,3000);
    camera_2d4.position.z = 4;
  var camera_2d4_scale = 1;

  var renderer_2d4 = new THREE.WebGLRenderer({canvas: document.getElementById("2d4"), antialias: true});
    //ClearColor is just the background
    renderer_2d4.setClearColor(0xf0f0f0);
    renderer_2d4.setPixelRatio(window.devicePixelRatio);
    renderer_2d4.setSize(250,250);  //in pixels
  var scene_2d4 = new THREE.Scene();

  scene_2d4.add(circle_2d4.main);

  var vectorField_2d4 = FormVectorField2D({
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      dx: fx_2d4,
      dy: fy_2d4,
      scale: 1/6,
      color: 0x888888,
      gridcolorx: 0xaa00aa,
      gridcolory: 0xaa00aa,
      thickness: .5
  });
  scene_2d4.add(vectorField_2d4);

  document.getElementById("2d4").addEventListener('mousedown', function(event) {
    handleMouseDown(circle_2d4);
  });
  document.getElementById("2d4").addEventListener('mousemove', function(event) {
    mousex = ((event.clientX - $("#2d4").offset().left + $(window).scrollLeft()) / 25) - 5;
    mousey = -(((event.clientY - $("#2d4").offset().top + $(window).scrollTop()) / 25) - 5);
    handleMouseMoving(circle_2d4, renderer_2d4);
  });
  document.getElementById("2d4").addEventListener('mouseup', function() {
    handleMouseUp(circle_2d4, renderer_2d4);
  });

  // 3d1 ////////////////////////
//
//   function fx_3d1(x, y, z) {return x*x/3};
//   function fy_3d1(x, y, z) {return y*y/3};
//   function fz_3d1(x, y, z) {return z*z/3};
//
// var camera_3d1 = new THREE.OrthographicCamera(-3.65, 2.65, 3.15, -3.15, 0.1, 3000);
//   camera_3d1.position.set(11.607, 4.65, 4.75);
//   camera_3d1.rotation.set(-0.726, 1.046, 0.655);
// var camera_3d1_scale = 1;
//
//   var xverts = [
//     new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
//     new THREE.Vector2(-2, 0), new THREE.Vector2(-4, -2), new THREE.Vector2(-2, -4),
//     new THREE.Vector2(0, -2), new THREE.Vector2(2, -4), new THREE.Vector2(4, -2),
//     new THREE.Vector2(2, 0), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4)
//   ];
//
//   var xlabel = makePrism(xverts, 0.75);
//   xlabel.scale.set(.05, .05, .05);
//   // xlabel.rotateY(Math.PI/2);
//   xlabel.position.set(0, 0, 3.25);
//
//   var yverts = [
//     new THREE.Vector2(1, -1), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4),
//     new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
//     new THREE.Vector2(-1, -1), new THREE.Vector2(-1, -4), new THREE.Vector2(1, -4)
//   ];
//
//   var ylabel = makePrism(yverts, 0.75);
//   ylabel.scale.set(.05, .05, .05);
//   ylabel.position.set(3.5, 0, 0);
//
//   var zverts = [
//     new THREE.Vector2(-4, 4), new THREE.Vector2(4, 4), new THREE.Vector2(4, 2),
//     new THREE.Vector2(0, -2), new THREE.Vector2(4, -2), new THREE.Vector2(4, -4),
//     new THREE.Vector2(-4, -4), new THREE.Vector2(-4, -2), new THREE.Vector2(0, 2),
//     new THREE.Vector2(-4, 2)
//   ];
//
//   var zlabel = makePrism(zverts, 0.75);
//   zlabel.scale.set(.045, .045, .045);
//   // zlabel.rotateY(Math.PI/4);
//   zlabel.position.set(0, 3.25, 0);
//
//   var circle_3d1 = new vectorCircle3D({canvas: "3d1",
//     functionx: fx_3d1, functiony: fy_3d1, functionz: fz_3d1});
//
//
//   xlabel.quaternion.copy(camera_3d1.quaternion);
//   ylabel.quaternion.copy(camera_3d1.quaternion);
//   zlabel.quaternion.copy(camera_3d1.quaternion);
//
//   var renderer_3d1 = new THREE.WebGLRenderer({canvas: document.getElementById("3d1"), antialias: true});
//     //ClearColor is just the background
//     renderer_3d1.setClearColor(0xf0f0f0);
//     renderer_3d1.setPixelRatio(window.devicePixelRatio);
//     renderer_3d1.setSize(250,250);  //in pixels
//   var scene_3d1 = new THREE.Scene();
//
//   scene_3d1.add(xlabel);
//   scene_3d1.add(ylabel);
//   scene_3d1.add(zlabel);
//
//   scene_3d1.add(circle_3d1.main);
//
//   var direction = new THREE.Vector3(1,0,0);
//     direction.normalize();
//   var origin = new THREE.Vector3(0,0,0);
//
//   var xarrow_3d1 = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
//   var yarrow_3d1 = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
//   var zarrow_3d1 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
//
//   scene_3d1.add(xarrow_3d1);
//   scene_3d1.add(yarrow_3d1);
//   scene_3d1.add(zarrow_3d1);
//
//   var vectorField_3d1 = FormVectorField3D({
//       xmin: -2,
//       xmax: 2,
//       ymin: -2,
//       ymax: 2,
//       zmin: -2,
//       zmax: 2,
//       dx: fx_3d1,
//       dy: fy_3d1,
//       dz: fz_3d1,
//       scale: 1/4,
//       color: 0x888888,
//       colorx: 0x000000,
//       colory: 0x000000,
//       colorz: 0x000000,
//       thickness: .5
//   });
//   scene_3d1.add(vectorField_3d1);
//
//   // document.getElementById("3d1").addEventListener('mousedown', function(event) {
//   //   handleMouseDown(circle_3d1);
//   // });
//   // document.getElementById("3d1").addEventListener('mousemove', function(event) {
//   //   mousex = ((event.clientX - $("#3d1").offset().left + $(window).scrollLeft()) / 25) - 5;
//   //   mousey = -(((event.clientY - $("#3d1").offset().top + $(window).scrollTop()) / 25) - 5);
//   //   handleMouseMoving(circle_3d1, renderer_3d1);
//   // });
//   // document.getElementById("3d1").addEventListener('mouseup', function() {
//   //   handleMouseUp(circle_3d1, renderer_3d1);
//   // });
//
//   $(`#xslider_3d1`).val(-.75);
//   $(`#yslider_3d1`).val(.75);
//   $(`#zslider_3d1`).val(.75);
//   $(`#rslider_3d1`).val(.75);
//   circle_3d1.scaleRing(.75);
//   circle_3d1.moveTo(-.75, .75, .75);

  // 3d2 ////////////////////////


  // function fx_3d2(x, y, z) {return x*x/3};
  // function fy_3d2(x, y, z) {return y*y/3};
  // function fz_3d2(x, y, z) {return z*z/3};
  function fx_3d2(x, y, z) {return (x-(-1.25))/2};
  function fy_3d2(x, y, z) {return (y-(-0.75))/2};
  function fz_3d2(x, y, z) {return (z-1)/2};

  var camera_3d2 = new THREE.OrthographicCamera(-3.65, 2.65, 3.15, -3.15, 0.1, 3000);
    // camera_3d2.position.set(11.607, 4.65, 4.75);
    camera_3d2.position.set(4.65, 11.607, 4.75);
    camera_3d2.rotation.set(-0.726, 1.046, 0.655);
    camera_3d2.up.set(0,0,1);
    let cVec = new THREE.Vector3(camera_3d2.position.x + camera_3d2.getWorldDirection.x, camera_3d2.position.y + camera_3d2.getWorldDirection.y, camera_3d2.position.z + camera_3d2.getWorldDirection.z)
    camera_3d2.lookAt(cVec);
    camera_3d2.position.set(4.1, 11.1, 6.75);
  var camera_3d2_scale = 1;

  var xverts = [
    new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
    new THREE.Vector2(-2, 0), new THREE.Vector2(-4, -2), new THREE.Vector2(-2, -4),
    new THREE.Vector2(0, -2), new THREE.Vector2(2, -4), new THREE.Vector2(4, -2),
    new THREE.Vector2(2, 0), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4)
  ];

  // var xlabel = makePrism(xverts, 0.75);
  var xlabel = makeTextSprite("x", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  xlabel.scale.set(2.5, 1.25, 1);
  // xlabel.position.set(0, 0, 3.25);
  xlabel.position.set(3.25, 0, .15);

  var yverts = [
    new THREE.Vector2(1, -1), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4),
    new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
    new THREE.Vector2(-1, -1), new THREE.Vector2(-1, -4), new THREE.Vector2(1, -4)
  ];

  var ylabel = makeTextSprite("y", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  ylabel.scale.set(2.5,1.25,1);
  ylabel.position.set(0, 3.5, 0);

  var zverts = [
    new THREE.Vector2(-4, 4), new THREE.Vector2(4, 4), new THREE.Vector2(4, 2),
    new THREE.Vector2(0, -2), new THREE.Vector2(4, -2), new THREE.Vector2(4, -4),
    new THREE.Vector2(-4, -4), new THREE.Vector2(-4, -2), new THREE.Vector2(0, 2),
    new THREE.Vector2(-4, 2)
  ];

  var zlabel = makeTextSprite("z", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  zlabel.scale.set(2.5,1.25,1);
  zlabel.position.set(0, 0, 3.4);

  var circle_3d2 = new vectorCircle3D({canvas: "3d2",
    functionx: fx_3d2, functiony: fy_3d2, functionz: fz_3d2});


  xlabel.quaternion.copy(camera_3d2.quaternion);
  ylabel.quaternion.copy(camera_3d2.quaternion);
  zlabel.quaternion.copy(camera_3d2.quaternion);

  var renderer_3d2 = new THREE.WebGLRenderer({canvas: document.getElementById("3d2"), antialias: true});
    //ClearColor is just the background
    renderer_3d2.setClearColor(0xf0f0f0);
    renderer_3d2.setPixelRatio(window.devicePixelRatio);
    renderer_3d2.setSize(250,250);  //in pixels

  const controls_3d2 = new THREE.OrbitControls(camera_3d2, renderer_3d2.domElement);
  controls_3d2.saveState();
  controls_3d2.zoomSpeed = 0.75;
  controls_3d2.minZoom = .75;
  controls_3d2.maxZoom = 1.75;

  var scene_3d2 = new THREE.Scene();

  scene_3d2.add(xlabel);
  scene_3d2.add(ylabel);
  scene_3d2.add(zlabel);

  scene_3d2.add(circle_3d2.main);

  var direction = new THREE.Vector3(1,0,0);
    direction.normalize();
  var origin = new THREE.Vector3(0,0,0);

  var xarrow_3d2 = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
  var yarrow_3d2 = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
  var zarrow_3d2 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);

  scene_3d2.add(xarrow_3d2);
  scene_3d2.add(yarrow_3d2);
  scene_3d2.add(zarrow_3d2);

  var vectorField_3d2 = FormVectorField3D({
      xmin: -2,
      xmax: 2,
      ymin: -2,
      ymax: 2,
      zmin: -2,
      zmax: 2,
      dx: fx_3d2,
      dy: fy_3d2,
      dz: fz_3d2,
      scale: 1/4,
      color: 0x888888,
      colorx: 0x000000,
      colory: 0x000000,
      colorz: 0x000000,
      thickness: .5
  });
  scene_3d2.add(vectorField_3d2);

  $(`#xslider_3d2`).val(1.8);
  $(`#yslider_3d2`).val(1.6);
  $(`#zslider_3d2`).val(1);
  $(`#rslider_3d2`).val(.75);
  circle_3d2.scaleRing(.75);
  circle_3d2.moveTo(1.8, 1.6, 1);

  document.getElementById('Reset3d2').addEventListener('click', function() {
    $(`#xslider_3d2`).val(1.8);
    $(`#yslider_3d2`).val(1.6);
    $(`#zslider_3d2`).val(1);
    $(`#rslider_3d2`).val(.75);
    circle_3d2.scaleRing(.75);
    circle_3d2.moveTo(1.8, 1.6, 1);
    controls_3d2.reset();
  });

  // 3d3 ////////////////////////

  function fx_3d3(x, y, z) {return (-x-1.25)/2};
  function fy_3d3(x, y, z) {return (-y-0.75)/2};
  function fz_3d3(x, y, z) {return (-z-(-1))/2};

var camera_3d3 = new THREE.OrthographicCamera(-3.65, 2.65, 3.15, -3.15, 0.1, 3000);
  camera_3d3.position.set(4.65, 11.607, 4.75);
  camera_3d3.rotation.set(-0.726, 1.046, 0.655);
  camera_3d3.up.set(0,0,1);
  cVec = new THREE.Vector3(camera_3d3.position.x + camera_3d3.getWorldDirection.x, camera_3d3.position.y + camera_3d3.getWorldDirection.y, camera_3d3.position.z + camera_3d3.getWorldDirection.z)
  camera_3d3.lookAt(cVec);
  camera_3d3.position.set(4.1, 11.1, 6.75);
var camera_3d3_scale = 1;

  var xverts = [
    new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
    new THREE.Vector2(-2, 0), new THREE.Vector2(-4, -2), new THREE.Vector2(-2, -4),
    new THREE.Vector2(0, -2), new THREE.Vector2(2, -4), new THREE.Vector2(4, -2),
    new THREE.Vector2(2, 0), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4)
  ];

  var xlabel = makeTextSprite("x", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  xlabel.scale.set(2.5, 1.25, 1);
  xlabel.position.set(3.25, 0, .15);

  var yverts = [
    new THREE.Vector2(1, -1), new THREE.Vector2(4, 2), new THREE.Vector2(2, 4),
    new THREE.Vector2(0, 2), new THREE.Vector2(-2, 4), new THREE.Vector2(-4, 2),
    new THREE.Vector2(-1, -1), new THREE.Vector2(-1, -4), new THREE.Vector2(1, -4)
  ];

  var ylabel = makeTextSprite("y", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  ylabel.scale.set(2.5, 1.25, 1);
  ylabel.position.set(0, 3.5, 0);



  var zverts = [
    new THREE.Vector2(-4, 4), new THREE.Vector2(4, 4), new THREE.Vector2(4, 2),
    new THREE.Vector2(0, -2), new THREE.Vector2(4, -2), new THREE.Vector2(4, -4),
    new THREE.Vector2(-4, -4), new THREE.Vector2(-4, -2), new THREE.Vector2(0, 2),
    new THREE.Vector2(-4, 2)
  ];

  var zlabel = makeTextSprite("z", {fontface: "Times", fontsize: 90, color: "#FF0000"});
  zlabel.scale.set(2.5,1.25,1);
  zlabel.position.set(0, 0, 3.4);

  var circle_3d3 = new vectorCircle3D({canvas: "3d3",
    functionx: fx_3d3, functiony: fy_3d3, functionz: fz_3d3});


  xlabel.quaternion.copy(camera_3d3.quaternion);
  ylabel.quaternion.copy(camera_3d3.quaternion);
  zlabel.quaternion.copy(camera_3d3.quaternion);

  var renderer_3d3 = new THREE.WebGLRenderer({canvas: document.getElementById("3d3"), antialias: true});
    //ClearColor is just the background
    renderer_3d3.setClearColor(0xf0f0f0);
    renderer_3d3.setPixelRatio(window.devicePixelRatio);
    renderer_3d3.setSize(250,250);  //in pixels
  var scene_3d3 = new THREE.Scene();

  scene_3d3.add(xlabel);
  scene_3d3.add(ylabel);
  scene_3d3.add(zlabel);

  scene_3d3.add(circle_3d3.main);

  var direction = new THREE.Vector3(1,0,0);
    direction.normalize();
  var origin = new THREE.Vector3(0,0,0);

  var xarrow_3d3 = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
  var yarrow_3d3 = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);
  var zarrow_3d3 = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 3, 0x000000, 1/4, 1/4);

  scene_3d3.add(xarrow_3d3);
  scene_3d3.add(yarrow_3d3);
  scene_3d3.add(zarrow_3d3);

  var vectorField_3d3 = FormVectorField3D({
      xmin: -2,
      xmax: 2,
      ymin: -2,
      ymax: 2,
      zmin: -2,
      zmax: 2,
      dx: fx_3d3,
      dy: fy_3d3,
      dz: fz_3d3,
      scale: 1/4,
      color: 0x888888,
      colorx: 0x000000,
      colory: 0x000000,
      colorz: 0x000000,
      thickness: .5
  });
  scene_3d3.add(vectorField_3d3);

  $(`#xslider_3d3`).val(1.8);
  $(`#yslider_3d3`).val(1.6);
  $(`#zslider_3d3`).val(1);
  $(`#rslider_3d3`).val(.75);
  circle_3d3.scaleRing(.75);
  circle_3d3.moveTo(1.8, 1.6, 1);

  const controls_3d3 = new THREE.OrbitControls(camera_3d3, renderer_3d3.domElement);
  controls_3d3.saveState();
  controls_3d3.zoomSpeed = 0.75;
  controls_3d3.minZoom = .75;
  controls_3d3.maxZoom = 1.75;

  document.getElementById('Reset3d3').addEventListener('click', function() {
    $(`#xslider_3d3`).val(1.8);
    $(`#yslider_3d3`).val(1.6);
    $(`#zslider_3d3`).val(1);
    $(`#rslider_3d3`).val(.75);
    circle_3d3.scaleRing(.75);
    circle_3d3.moveTo(1.8, 1.6, 1);
    controls_3d3.reset();
  });

  // RENDERING ////////////////////////
  requestAnimationFrame(render);
  function render() {

    // $(`#xslider_3d1`).on("input", function() { // when a slider is changed,
    //   circle_3d1.moveTo($(`#xslider_3d1`).val(), circle_3d1.center.position.y, circle_3d1.center.position.z); // change the value associated with it
    // });
    // $(`#yslider_3d1`).on("input", function() {
    //   circle_3d1.moveTo(circle_3d1.center.position.x, $(`#yslider_3d1`).val(), circle_3d1.center.position.z);
    // });
    // $(`#zslider_3d1`).on("input", function() {
    //   circle_3d1.moveTo(circle_3d1.center.position.x, circle_3d1.center.position.y, $(`#zslider_3d1`).val());
    // });
    // $(`#xslider_3d1`).on("input", function() { // when a slider is changed,
    //   circle_3d1.moveTo($(`#xslider_3d1`).val(), $(`#yslider_3d1`).val(), $(`#zslider_3d1`).val()); // change the value associated with it
    // });
    // $(`#yslider_3d1`).on("input", function() { // when a slider is changed,
    //   circle_3d1.moveTo($(`#xslider_3d1`).val(), $(`#yslider_3d1`).val(), $(`#zslider_3d1`).val()); // change the value associated with it
    // });
    // $(`#zslider_3d1`).on("input", function() { // when a slider is changed,
    //   circle_3d1.moveTo($(`#xslider_3d1`).val(), $(`#yslider_3d1`).val(), $(`#zslider_3d1`).val()); // change the value associated with it
    // });
    // $(`#rslider_3d1`).on("input", function() {
    //   circle_3d1.scaleRing($(`#rslider_3d1`).val());
    // });

    // $(`#3d1`).on("mousemove", function() {
    //   xlabel.quaternion.copy(camera_3d1.quaternion);
    //   ylabel.quaternion.copy(camera_3d1.quaternion);
    //   zlabel.quaternion.copy(camera_3d1.quaternion);
    // });


    $(`#xslider_3d2`).on("input", function() { // when a slider is changed,
      circle_3d2.moveTo($(`#xslider_3d2`).val(), $(`#yslider_3d2`).val(), $(`#zslider_3d2`).val()); // change the value associated with it
    });
    $(`#yslider_3d2`).on("input", function() { // when a slider is changed,
      circle_3d2.moveTo($(`#xslider_3d2`).val(), $(`#yslider_3d2`).val(), $(`#zslider_3d2`).val()); // change the value associated with it
    });
    $(`#zslider_3d2`).on("input", function() { // when a slider is changed,
      circle_3d2.moveTo($(`#xslider_3d2`).val(), $(`#yslider_3d2`).val(), $(`#zslider_3d2`).val()); // change the value associated with it
    });
    $(`#rslider_3d2`).on("input", function() {
      circle_3d2.scaleRing($(`#rslider_3d2`).val());
    });

    $(`#3d2`).on("mousemove", function() {
      xlabel.quaternion.copy(camera_3d2.quaternion);
      ylabel.quaternion.copy(camera_3d2.quaternion);
      zlabel.quaternion.copy(camera_3d2.quaternion);
    });


    $(`#xslider_3d3`).on("input", function() { // when a slider is changed,
      circle_3d3.moveTo($(`#xslider_3d3`).val(), $(`#yslider_3d3`).val(), $(`#zslider_3d3`).val()); // change the value associated with it
    });
    $(`#yslider_3d3`).on("input", function() { // when a slider is changed,
      circle_3d3.moveTo($(`#xslider_3d3`).val(), $(`#yslider_3d3`).val(), $(`#zslider_3d3`).val()); // change the value associated with it
    });
    $(`#zslider_3d3`).on("input", function() { // when a slider is changed,
      circle_3d3.moveTo($(`#xslider_3d3`).val(), $(`#yslider_3d3`).val(), $(`#zslider_3d3`).val()); // change the value associated with it
    });
    $(`#rslider_3d3`).on("input", function() {
      circle_3d3.scaleRing($(`#rslider_3d3`).val());
    });

    $(`#3d3`).on("mousemove", function() {
      xlabel.quaternion.copy(camera_3d3.quaternion);
      ylabel.quaternion.copy(camera_3d3.quaternion);
      zlabel.quaternion.copy(camera_3d3.quaternion);
    });

    renderer_1d1.render(scene_1d1, camera_1d1);
    renderer_1d2.render(scene_1d2, camera_1d2);
    renderer_2d1.render(scene_2d1, camera_2d1);
    renderer_2d2.render(scene_2d2, camera_2d2);
    renderer_2d3.render(scene_2d3, camera_2d3);
    renderer_2d4.render(scene_2d4, camera_2d4);
    // renderer_3d1.render(scene_3d1, camera_3d1);
    renderer_3d2.render(scene_3d2, camera_3d2);
    renderer_3d3.render(scene_3d3, camera_3d3);

    requestAnimationFrame(render);
  }
  })
