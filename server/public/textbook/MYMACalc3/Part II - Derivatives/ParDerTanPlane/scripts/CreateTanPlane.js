function createTanPlane(options) {
  var Figure = new Object();
  let exercise_1_step_1_1 = false;
  let exercise_1_step_1_2 = false;
  let exercise_2_step_1_1 = false;
  let exercise_2_step_1_2 = false;
  //INITIALIZE FIGURE

  if (options.xmin != null) Figure.xmin = options.xmin;
  else Figure.xmin = -10;
  if (options.xmax != null) Figure.xmax = options.xmax;
  else Figure.xmax = 10;
  if (options.ymin != null) Figure.ymin = options.ymin;
  else Figure.ymin = -10;
  if (options.ymax != null) Figure.ymax = options.ymax;
  else Figure.ymax = 10;
  if (options.zmin != null) Figure.zmin = options.zmin;
  else Figure.zmin = -10;
  if (options.zmax != null) Figure.zmax = options.zmax;
  else Figure.zmax = 10;
  if (options.crossx != null) Figure.crossx = options.crossx;
  else Figure.crossx = 10;
  if (options.crossy != null) Figure.crossy = options.crossy;
  else Figure.crossy = 10;
  if (options.crossz != null) Figure.crossz = options.crossz;
  else Figure.crossz = 10;
  Figure.xrange = Figure.xmax - Figure.xmin;
  Figure.yrange = Figure.ymax - Figure.ymin;
  Figure.zrange = Figure.zmax - Figure.zmin;
  Figure.tx = 0;
  Figure.ty = 0;
  Figure.yangle = 0;
  Figure.xangle = 0;
  Figure.boolyplay = false;
  Figure.boolxplay = false;
  Figure.boolxplane = false;
  Figure.boolyplane = false;
  Figure.boolxline = false;
  Figure.boolyline = false;
  Figure.boolytline = false;
  Figure.boolxtline = false;
  Figure.booltplane = false;
  Figure.renderer = options.renderer;
  Figure.scene = new THREE.Scene();
  Figure.camera = options.camera;
  Figure.camera.position.z =
    2.5 * Math.max(Figure.xrange, Figure.yrange/*, Figure.zrange*/);
  Figure.cameracontrols = new THREE.OrbitControls(
    Figure.camera,
    Figure.renderer.domElement
  );
  Figure.cameracontrols.enablePan = false;
  Figure.light = new THREE.AmbientLight(0xffffff, 0.5);
  Figure.light.position.set(0, 0, 80);
  Figure.scene.add(Figure.light);
  Figure.lightpt = new THREE.PointLight(0xffffff, 0.5);
  Figure.lightpt.position.set(0, 0, 80);
  Figure.scene.add(Figure.lightpt);
  Figure.zFunction = options.zFunction;
  Figure.xval = (Figure.xmin + Figure.xmax) / 2;
  Figure.yval = (Figure.ymin + Figure.ymax) / 2;
  Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
  var surfacefunction = function(u, v) {
    var x = Figure.xrange * u + Figure.xmin;
    var y = Figure.yrange * v + Figure.ymin;
    var z = Figure.zFunction(x, y);
    return new THREE.Vector3(x, y, z);
  };
  Figure.surfacegeometry = new THREE.ParametricGeometry(
    surfacefunction,
    100,
    100
  );
  Figure.everything = new THREE.Object3D();
  var materialFront = new THREE.MeshLambertMaterial({ color: 0xf3ffe2 });
  materialFront.side = THREE.FrontSide;
  Figure.meshFront = new THREE.Mesh(Figure.surfacegeometry, materialFront);
  Figure.everything.add(Figure.meshFront);
  var materialBack = new THREE.MeshLambertMaterial({ color: 0xe3ef00 });
  materialBack.side = THREE.BackSide;
  Figure.meshBack = new THREE.Mesh(Figure.surfacegeometry, materialBack);
  Figure.everything.add(Figure.meshBack);
  Figure.grid = GridMake3D({
    xmin: Figure.xmin,
    xmax: Figure.xmax,
    ymin: Figure.ymin,
    ymax: Figure.ymax,
    zmin: Figure.zmin,
    zmax: Figure.zmax,
    crossx: Figure.crossx,
    crossy: Figure.crossy,
    crossz: Figure.crossz
  });
  Figure.everything.add(Figure.grid);
  if (options.cbyline != null) {
    Figure.genyTrace = function(color) {
      Figure.ylines = Array(201);
      let index = 0;
      for (var i = Figure.xmin; i <= Figure.xmax; i += Figure.xrange / 200) {
        // var index = Math.ceil((i + 10) * 10);
        function ytraceline(y) {
          var x = i;
          var z = Figure.zFunction(x, y);
          return new THREE.Vector3(x, y, z);
        }
        var ylinei = PlotPoints2D({
          func: ytraceline,
          xmin: Figure.xmin,
          xmax: Figure.xmax,
          ymin: Figure.ymin,
          ymax: Figure.ymax,
          step: Figure.yrange / 200,
          colorline: color
        });
        Figure.ylines[index++] = ylinei;
      }
    };
    Figure.genyTrace(0x00bb00);
    Figure.yline = Figure.ylines[100];
  }
  if (options.cbxline != null) {
    Figure.genxTrace = function(color) {
      Figure.xlines = null;
      Figure.xlines = Array(201);
      let index = 0;
      for (var i = Figure.ymin; i <= Figure.ymax; i += Figure.yrange / 200) {
        // var index = Math.ceil((i + 10) * 10);
        function xtraceline(x) {
          var y = i;
          var z = Figure.zFunction(x, y);
          return new THREE.Vector3(x, y, z);
        }
        var xlinei = PlotPoints2D({
          func: xtraceline,
          xmin: Figure.xmin,
          xmax: Figure.xmax,
          ymin: Figure.ymin,
          ymax: Figure.ymax,
          step: Figure.xrange / 200,
          colorline: color
        });
        Figure.xlines[index++] = xlinei;
      }
    };
    Figure.genxTrace(0xdd00dd);
    Figure.xline = Figure.xlines[100];
  }
  if (options.cbyplane != null) {
    Figure.yplane = new THREE.Object3D();
    Figure.ysquaregeom = new THREE.BoxGeometry(
      0.01,
      Figure.yrange,
      Figure.zrange
    );
    var ysquaremat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.15,
      transparent: true
    });
    Figure.ysquare = new THREE.Mesh(Figure.ysquaregeom, ysquaremat);
    Figure.ysquare.position.x = Figure.xval;
    Figure.ysquare.position.y = Figure.yval;
    Figure.ysquare.position.z = (Figure.zmin + Figure.zmax) / 2;
    Figure.yplane.add(Figure.ysquare);
    Figure.yplanegrid = GridMake2D({
      xmin: Figure.ymin,
      xmax: Figure.ymax,
      ymin: Figure.zmin,
      ymax: Figure.zmax,
      crossx: Figure.crossx,
      crossy: Figure.crossz,
      colorx: 0x0000ff,
      colory: 0x000000
    });
    Figure.yplanegrid.rotateZ(Math.PI / 2);
    Figure.yplanegrid.rotateX(Math.PI / 2);
    Figure.yplanegrid.position.x = Figure.xval;
    Figure.yplane.add(Figure.yplanegrid);
  }
  if (options.cbxplane != null) {
    Figure.xplane = new THREE.Object3D();
    Figure.xsquaregeom = new THREE.BoxGeometry(
      Figure.xrange,
      0.01,
      Figure.zrange
    );
    var xsquaremat = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      opacity: 0.15,
      transparent: true
    });
    Figure.xsquare = new THREE.Mesh(Figure.xsquaregeom, xsquaremat);
    Figure.xsquare.position.x = Figure.xval;
    Figure.xsquare.position.y = Figure.yval;
    Figure.xsquare.position.z = (Figure.zmin + Figure.zmax) / 2;
    Figure.xplane.add(Figure.xsquare);
    Figure.xplanegrid = GridMake2D({
      xmin: Figure.xmin,
      xmax: Figure.xmax,
      ymin: Figure.zmin,
      ymax: Figure.zmax,
      crossx: Figure.crossy,
      crossy: Figure.crossz,
      colorx: 0xff0000,
      colory: 0x000000
    });
    Figure.xplanegrid.rotateX(Math.PI / 2);
    Figure.xplanegrid.position.y = Figure.yval;
    Figure.xplane.add(Figure.xplanegrid);
  }
  Figure.pointloc = new THREE.SphereGeometry(0.4, 50, 50);
  Figure.pointmat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  Figure.pt = new THREE.Mesh(Figure.pointloc, Figure.pointmat);
  Figure.everything.add(Figure.pt);
  if (options.cbytline != null) {
    Figure.genyTan = function(color) {
      Figure.ytanlinefunction = function(y) {
        var x = 0;
        return new THREE.Vector3(x, y, 0);
      };
      Figure.ytanline = PlotPoints2D({
        func: Figure.ytanlinefunction,
        xmin: Figure.xmin / 5,
        xmax: Figure.xmax / 5,
        ymin: Figure.ymin / 5,
        ymax: Figure.ymax / 5,
        step: Figure.xrange / 200,
        colorline: color
      });
    };
    Figure.genyTan(0x007700);
  }
  if (options.cbxtline != null) {
    Figure.genxTan = function(color) {
      Figure.xtanlinefunction = function(x) {
        var y = 0;
        return new THREE.Vector3(x, y, 0);
      };
      Figure.xtanline = null;
      Figure.xtanline = PlotPoints2D({
        func: Figure.xtanlinefunction,
        xmin: Figure.xmin / 5,
        xmax: Figure.xmax / 5,
        ymin: Figure.ymin / 5,
        ymax: Figure.ymax / 5,
        step: Figure.xrange / 200,
        colorline: color
      });
    };
    Figure.genxTan(0x770077);
  }
  if (options.cbtplane != null) {
    Figure.tanplane = new THREE.Object3D();
    Figure.tsquaregeom = new THREE.BoxGeometry(
      (Figure.xrange) / 5,
      (Figure.yrange) / 5,
      0.02 * (Figure.xrange + Figure.yrange)
    );
    var tsquaremat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.15,
      transparent: true
    });
    Figure.tsquare = new THREE.Mesh(Figure.tsquaregeom, tsquaremat);
    Figure.tanplane.add(Figure.tsquare);
    Figure.tplanegrid = GridMake2D({
      xmin: Figure.xmin / 5,
      xmax: Figure.xmax / 5,
      ymin: Figure.ymin / 5,
      ymax: Figure.ymax / 5,
      crossx: 4*Figure.crossx / 10,
      crossy: 4*Figure.crossy / 10,
      colorx: 0xd0d0d0,
      colory: 0xd0d0d0
    });
    Figure.tanplane.add(Figure.tplanegrid);
  }

  Figure.scene.add(Figure.everything);
  // Figure.everything.scale.set(1, 1, 20*Figure.zrange/12.0);
  Figure.everything.rotateX(-Math.PI / 2 + Math.PI / 6);
  Figure.everything.rotateZ((-3 * Math.PI) / 4);
  Figure.everything.position.x = (Figure.xmin + Figure.xmax) / 2;
  // Figure.everything.position.y = -(Figure.zmin + Figure.zmax) / 2;
  // Figure.everything.position.y = -(Figure.zmin + Figure.zmax) / 2;
  Figure.everything.position.z = -(Figure.ymin + Figure.ymax) / 2;

  if (options.xyrenderer != null) {
    Figure.xyrenderer = options.xyrenderer;
    Figure.xyscene = new THREE.Scene();
    Figure.xyscene.add(Figure.light.clone());
    Figure.xycamera = options.xycamera;

    Figure.xygrid = GridMake2D({
      xmin: Figure.xmin,
      xmax: Figure.xmax,
      ymin: Figure.ymin,
      ymax: Figure.ymax,
      crossx: Figure.crossy,
      crossy: Figure.crossz,
    });
    Figure.xyscene.add(Figure.xygrid);
    Figure.xypt = new THREE.Mesh(Figure.pointloc, Figure.pointmat);
    Figure.xyscene.add(Figure.xypt);

    Figure.xstate = 1;
    Figure.ystate = 1;

    Figure.dragControls = new THREE.DragControls(
      [Figure.xypt],
      Figure.xycamera,
      Figure.xyrenderer.domElement
    );
    Figure.dragControls.addEventListener("dragstart", function(event) {
      Figure.xstate = Figure.boolxplay;
      Figure.ystate = Figure.boolyplay;
      Figure.boolxplay = false;
      Figure.boolyplay = false;
    });
    Figure.dragControls.addEventListener("drag", function(event) {
      Figure.xval = /*Math.floor(10 **/ Figure.xypt.position.x/*) / 10*/;
      if (Figure.xval > Figure.xmax) Figure.xval = Figure.xmax;
      if (Figure.xval < Figure.xmin) Figure.xval = Figure.xmin;
      Figure.yval = /*Math.floor(10 **/ Figure.xypt.position.y/*) / 10*/;
      if (Figure.yval > Figure.ymax) Figure.yval = Figure.ymax;
      if (Figure.yval < Figure.ymin) Figure.yval = Figure.ymin;
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);

      Figure.tx = Math.asin(Figure.xval*2 / Figure.xrange);
      Figure.ty = Math.asin(Figure.yval*2 / Figure.yrange);

      Figure.everything.remove(Figure.xline);
      Figure.everything.remove(Figure.yline);
      // indexx = Math.ceil((Figure.xval - Figure.xmin) * 10);
      // indexy = Math.ceil((Figure.yval - Figure.ymin) * 10);
      indexx = Math.ceil(200*(Figure.xval - Figure.xmin) / (Figure.xmax - Figure.xmin));
      indexy = Math.ceil(200*(Figure.yval - Figure.ymin) / (Figure.ymax - Figure.ymin));
      Figure.xline = Figure.xlines[indexx];
      Figure.yline = Figure.ylines[indexy];
      if (Figure.boolxline) Figure.everything.add(Figure.xline);
      if (Figure.boolyline) Figure.everything.add(Figure.yline);
      // Figure.xplane.position.x = Figure.xval;
      // Figure.yplane.position.y = Figure.yval;
    });
    Figure.dragControls.addEventListener("dragend", function(event) {
      Figure.boolxplay = Figure.xstate;
      Figure.boolyplay = Figure.ystate;
    });

    Figure.xycamera.position.z = 32;
  }

  //UPDATE FUNCTIONS

  Figure.updatept = function() {
    Figure.pt.position.x = Figure.xval;
    Figure.pt.position.y = Figure.yval;
    Figure.pt.position.z = Figure.zval;
    return;
  };
  Figure.updatexline = function() {
    Figure.everything.remove(Figure.xline);
    // var y = Math.floor(Figure.yval * 10) / 10;
    // var indexx = Math.ceil((y + 10) * 10);
    var indexx = Math.ceil(200*(Figure.yval - Figure.ymin) / (Figure.ymax - Figure.ymin));
    Figure.xline = Figure.xlines[indexx];
    if (Figure.boolxline) Figure.everything.add(Figure.xline);
  };
  Figure.updateyline = function() {
    Figure.everything.remove(Figure.yline);
    // var x = Math.floor(Figure.xval * 10) / 10;
    // var indexy = Math.ceil((x + 10) * 10);
    var indexy = Math.ceil(200*(Figure.xval - Figure.xmin) / (Figure.xmax - Figure.xmin));
    Figure.yline = Figure.ylines[indexy];
    if (Figure.boolyline) Figure.everything.add(Figure.yline);
  };
  Figure.updatextan = function() {
    Figure.tx -= 0.001;
    var oldx = Figure.xrange/2 * Math.sin(Figure.tx);
    var oldz = Figure.zFunction(oldx, Figure.yval);
    Figure.tx += 0.001;
    var slope = (Figure.zval - oldz) / (Figure.xval - oldx);
    Figure.xangle = Math.atan(slope);
    Figure.xtanline.position.x = Figure.xval;
    Figure.xtanline.position.y = Figure.yval;
    Figure.xtanline.position.z = Figure.zval;
    Figure.xtanline.rotation.y = -Figure.xangle;
    return;
  };
  Figure.updateytan = function() {
    Figure.ty -= 0.001;
    var oldy = Figure.yrange/2 * Math.sin(Figure.ty);
    var oldz = Figure.zFunction(Figure.xval, oldy);
    Figure.ty += 0.001;
    var slope = (Figure.zval - oldz) / (Figure.yval - oldy);
    Figure.yangle = Math.atan(slope);
    Figure.ytanline.position.x = Figure.xval;
    Figure.ytanline.position.y = Figure.yval;
    Figure.ytanline.position.z = Figure.zval;
    Figure.ytanline.rotation.x = Figure.yangle;
    return;
  };
  Figure.updatetplane = function() {
    Figure.tanplane.position.x = Figure.xval;
    Figure.tanplane.position.y = Figure.yval;
    Figure.tanplane.position.z = Figure.zval;
    let v1 = new THREE.Vector3(1,0,0);
    v1.applyAxisAngle(new THREE.Vector3(0,1,0), Figure.xtanline.rotation.y);
    let v2 = new THREE.Vector3(0,1,0);
    v2.applyAxisAngle(new THREE.Vector3(1,0,0), Figure.ytanline.rotation.x);
    let v3 = new THREE.Vector3().crossVectors(v1, v2);
    v3.set(v3.x, v3.y, v3.z).normalize();
    v3.set(Figure.tanplane.position.x + v3.x, Figure.tanplane.position.y + v3.y, Figure.tanplane.position.z + v3.z);
    Figure.tanplane.lookAt(v3);
    return;
  };

  //USER CALLBACK FUNCTIONS

  if (options.cbxplay != null) {
    Figure.cbxplay = options.cbxplay;
    Figure.cbxplay.change(function() {
      Figure.boolyplay = !Figure.boolyplay;
    });
  }
  if (options.cbyplay != null) {
    Figure.cbyplay = options.cbyplay;
    Figure.cbyplay.change(function() {
      Figure.boolxplay = !Figure.boolxplay;
    });
  }
  if (options.cbyplane != null) {
    Figure.cbyplane = options.cbyplane;
    Figure.cbyplane.change(function() {
      Figure.boolyplane = !Figure.boolyplane;
      if (Figure.boolyplane) Figure.everything.add(Figure.yplane);
      else Figure.everything.remove(Figure.yplane);
    });
  }
  if (options.cbxplane != null) {
    Figure.cbxplane = options.cbxplane;
    Figure.cbxplane.change(function() {
      Figure.boolxplane = !Figure.boolxplane;
      if (Figure.boolxplane) Figure.everything.add(Figure.xplane);
      else Figure.everything.remove(Figure.xplane);
    });
  }
  if (options.cbyline != null) {
    Figure.cbyline = options.cbyline;
    Figure.cbyline.change(function() {
      Figure.boolyline = !Figure.boolyline;
    });
  }
  if (options.cbxline != null) {
    Figure.cbxline = options.cbxline;
    Figure.cbxline.change(function() {
      Figure.boolxline = !Figure.boolxline;
    });
  }
  if (options.cbytline != null) {
    Figure.cbytline = options.cbytline;
    Figure.cbytline.change(function() {
      Figure.boolytline = !Figure.boolytline;
      if (Figure.boolytline) Figure.everything.add(Figure.ytanline);
      else Figure.everything.remove(Figure.ytanline);
    });
  }
  if (options.cbxtline != null) {
    Figure.cbxtline = options.cbxtline;
    Figure.cbxtline.change(function() {
      Figure.boolxtline = !Figure.boolxtline;
      if (Figure.boolxtline) Figure.everything.add(Figure.xtanline);
      else Figure.everything.remove(Figure.xtanline);
    });
  }
  if (options.xslider != null) {
    Figure.xslider = options.xslider;
    Figure.xslider.on("input", function() {
      Figure.xval = parseFloat($(this).val());
      Figure.tx = Math.asin(Figure.xval*2 / Figure.xrange);
      Figure.yplane.position.x = Figure.xval;
      Figure.everything.remove(Figure.yline);
      // var index = Math.ceil((Figure.xval + 10) * 10);
      var index = Math.ceil(200*(Figure.xval - Figure.xmin) / (Figure.xmax - Figure.xmin));
      Figure.yline = Figure.ylines[index];
      if (Figure.boolyline) {
        Figure.everything.add(Figure.yline);
      }
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    });
  }
  if (options.yslider != null) {
    Figure.yslider = options.yslider;
    Figure.yslider.on("input", function() {
      Figure.yval = parseFloat($(this).val());
      Figure.ty = Math.asin(Figure.yval*2 / Figure.yrange);
      Figure.xplane.position.y = Figure.yval;
      Figure.everything.remove(Figure.xline);
      // var index = Math.ceil((Figure.yval + 10) * 10);
      var index = Math.ceil(200*(Figure.yval - Figure.ymin) / (Figure.ymax - Figure.ymin));
      Figure.xline = Figure.xlines[index];
      if (Figure.boolxline) {
        Figure.everything.add(Figure.xline);
      }
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    });
  }
  if (options.cbtplane != null) {
    Figure.cbtplane = options.cbtplane;
    Figure.cbtplane.change(function() {
      Figure.booltplane = !Figure.booltplane;
      if (Figure.booltplane) Figure.everything.add(Figure.tanplane);
      else Figure.everything.remove(Figure.tanplane);
    });
  }
  if (options.inx != null) {
    Figure.inx = options.inx;
    $(Figure.inx).on("input", function() {
      Figure.xval = $(Figure.inx).val();
      Figure.tx = Math.asin(Figure.xval*2 / Figure.xrange);
      if (Figure.xval > Figure.xmax) Figure.xval = Figure.xmax;
      if (Figure.xval < Figure.xmin) Figure.xval = Figure.xmin;
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    });
  }
  if (options.iny != null) {
    Figure.iny = options.iny;
    $(Figure.iny).on("input", function() {
      Figure.yval = $(Figure.iny).val();
      Figure.ty = Math.asin(Figure.yval*2 / Figure.yrange);
      if (Figure.yval > Figure.ymax) Figure.yval = Figure.ymax;
      if (Figure.yval < Figure.ymin) Figure.yval = Figure.ymin;
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    });
  }

  //COLORS

  if (options.colPoint != null) {
    Figure.colPoint = options.colPoint;
    $(Figure.colPoint).on("input", function() {
      var colorString = Figure.colPoint.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.everything.remove(Figure.pt);
      Figure.pt = null;
      Figure.pointmat = new THREE.MeshBasicMaterial({ color: color });
      Figure.pt = new THREE.Mesh(Figure.pointloc, Figure.pointmat);
      Figure.everything.add(Figure.pt);
    });
  }
  if (options.colFront != null) {
    Figure.colFront = options.colFront;
    $(Figure.colFront).on("input", function() {
      var colorString = Figure.colFront.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.everything.remove(Figure.meshFront);
      Figure.meshFront = null;
      var materialFront = new THREE.MeshLambertMaterial({ color: color });
      materialFront.side = THREE.FrontSide;
      Figure.meshFront = new THREE.Mesh(Figure.surfacegeometry, materialFront);
      Figure.everything.add(Figure.meshFront);
    });
  }
  if (options.colBack != null) {
    Figure.colBack = options.colBack;
    $(Figure.colBack).on("input", function() {
      var colorString = Figure.colBack.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.everything.remove(Figure.meshBack);
      Figure.meshBack = null;
      var materialBack = new THREE.MeshLambertMaterial({ color: color });
      materialBack.side = THREE.BackSide;
      Figure.meshBack = new THREE.Mesh(Figure.surfacegeometry, materialBack);
      Figure.everything.add(Figure.meshBack);
    });
  }
  if (options.colXZ != null) {
    Figure.colXZ = options.colXZ;
    $(Figure.colXZ).on("input", function() {
      var colorString = Figure.colXZ.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.xplane.remove(Figure.xsquare);
      Figure.xsquare = null;
      var xsquaremat = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.15,
        transparent: true
      });
      Figure.xsquare = new THREE.Mesh(Figure.xsquaregeom, xsquaremat);
      Figure.xsquare.position.x = (Figure.xmin + Figure.xmax) / 2;
      Figure.xsquare.position.y = (Figure.ymin + Figure.ymax) / 2;
      Figure.xsquare.position.z = (Figure.zmin + Figure.zmax) / 2;
      Figure.xplane.add(Figure.xsquare);
    });
  }
  if (options.colxTrace != null) {
    Figure.colxTrace = options.colxTrace;
    $(Figure.colxTrace).on("input", function() {
      var colorString = Figure.colxTrace.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.genxTrace(color);
    });
  }
  if (options.colxTan != null) {
    Figure.colxTan = options.colxTan;
    $(Figure.colxTan).on("input", function() {
      var colorString = Figure.colxTan.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.everything.remove(Figure.xtanline);
      Figure.genxTan(color);
      Figure.everything.add(Figure.xtanline);
    });
  }
  if (options.colYZ != null) {
    Figure.colYZ = options.colYZ;
    $(Figure.colYZ).on("input", function() {
      var colorString = Figure.colYZ.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.yplane.remove(Figure.ysquare);
      Figure.ysquare = null;

      var ysquaremat = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.15,
        transparent: true
      });
      Figure.ysquare = new THREE.Mesh(Figure.ysquaregeom, ysquaremat);
      Figure.ysquare.position.y = (Figure.ymin + Figure.ymax) / 2;
      Figure.ysquare.position.y = (Figure.ymin + Figure.ymax) / 2;
      Figure.ysquare.position.z = (Figure.zmin + Figure.zmax) / 2;
      Figure.yplane.add(Figure.ysquare);
    });
  }
  if (options.colyTrace != null) {
    Figure.colyTrace = options.colyTrace;
    $(Figure.colyTrace).on("input", function() {
      var colorString = Figure.colyTrace.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.genyTrace(color);
    });
  }
  if (options.colyTan != null) {
    Figure.colyTan = options.colyTan;
    $(Figure.colyTan).on("input", function() {
      var colorString = Figure.colyTan.val();
      var color = parseInt(colorString.substr(1, 7), 16);
      Figure.everything.remove(Figure.ytanline);
      Figure.genyTan(color);
      Figure.everything.add(Figure.ytanline);
    });
  }
  if (options.coltPlane != null) {
    Figure.coltPlane = options.coltPlane;
    $(Figure.coltPlane).on("input", function() {
      var colorString = Figure.coltPlane.val();
      var color = parseInt(colorString.substr(1, 7), 16);

      Figure.tanplane.remove(Figure.tsquare);
      Figure.tsquare = null;

      var tsquaremat = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.15,
        transparent: true
      });
      Figure.tsquare = new THREE.Mesh(Figure.tsquaregeom, tsquaremat);
      Figure.tanplane.add(Figure.tsquare);
    });
  }

  //RENDER

  Figure.renderfunc = function() {
    Figure.cameracontrols.update();
    Figure.lightpt.position.copy(Figure.camera.position);
    if (Figure.boolyplay) {
      Figure.tx += 0.02;
      Figure.xval =
        (Figure.xrange * Math.sin(Figure.tx) + Figure.xmin + Figure.xmax) / 2;
      // Figure.xval = Math.floor(10 * Figure.xval) / 10;
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    }
    if (Figure.boolxplay) {
      Figure.ty += 0.02;
      Figure.yval =
        (Figure.yrange * Math.sin(Figure.ty) + Figure.ymin + Figure.ymax) / 2;
      // Figure.yval = Math.floor(10 * Figure.yval) / 10;
      Figure.zval = Figure.zFunction(Figure.xval, Figure.yval);
    }
    Figure.updatept();
    if (options.xslider != null) Figure.xslider.val(Figure.xval);
    if (options.xslider != null) Figure.yslider.val(Figure.yval);
    if (options.cbxplane != null) Figure.xplane.position.y = Figure.yval - (Figure.ymax+Figure.ymin)/2.0;
    if (options.cbyplane != null) Figure.yplane.position.x = Figure.xval - (Figure.xmax+Figure.xmin)/2.0;
    if (options.cbxline != null) Figure.updatexline();
    if (options.cbyline != null) Figure.updateyline();
    if (options.cbytline != null) Figure.updatextan();
    if (options.cbxtline != null) Figure.updateytan();
    if (options.cbtplane != null) Figure.updatetplane();
    if (options.xyrenderer != null) {
      Figure.xyrenderer.render(Figure.xyscene, Figure.xycamera);
      Figure.xypt.position.set(Figure.xval, Figure.yval, 0);
    }
    Figure.renderer.render(Figure.scene, Figure.camera);
  };

  return Figure;
}

/* Notes for Improvement

  •Point color also change point in 2D slider
  •

*/
