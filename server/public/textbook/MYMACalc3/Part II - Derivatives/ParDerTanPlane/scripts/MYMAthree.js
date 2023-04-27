//crossx and crossy are how many cross sections you want in each direction per quarter of the grid
function GridMake2D(options) {
  var xmin, xmax, ymin, ymax, crossx, crossy, colorx, colory, colorgrid;

  xmin = options.xmin;
  xmax = options.xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  if(options.crossx != null) crossx = options.crossx;
  else crossx = xmax - xmin;
  if (options.crossy != null) crossy = options.crossy;
  else crossy = ymax - ymin;
  if (options.colorx != null) colorx = options.colorx;
  else colorx = 0xff0000;
  if (options.colory != null) colory = options.colory;
  else colory = 0x0000ff;
  if (options.colorgrid != null) colorgrid = options.colorgrid;
  else colorgrid = 0xd0d0d0;

  width = xmax - xmin;
  height = ymax - ymin;

  var grid = new THREE.Object3D();

  var crossgeom = new THREE.Geometry();
  crossgeom.vertices.push(
    new THREE.Vector3(xmin,ymin,0),
    new THREE.Vector3(xmax,ymin,0),
    new THREE.Vector3(xmax,ymax,0),
    new THREE.Vector3(xmin,ymax,0),
    new THREE.Vector3(xmin,ymin,0)
  );

  var x = xmin;
  var y = ymin;
  var xstep = width / crossx;
  var ystep = height / crossy;

  for (var i = 0; i < crossx; ++i) {
    crossgeom.vertices.push( new THREE.Vector3(x,y,0) );
    x += xstep;
    crossgeom.vertices.push( new THREE.Vector3(x,y,0) );
    y = height - y + 2 * ymin;
  }
  y = ymin;
  for (var j = 0; j < crossy; ++j) {
    crossgeom.vertices.push( new THREE.Vector3(x,y,0) );
    y += ystep;
    crossgeom.vertices.push( new THREE.Vector3(x,y,0) );
    x = width - x + 2 * xmin;
  }

  var crossmat = new THREE.LineBasicMaterial( { color:colorgrid } );
  var cross = new THREE.Line(crossgeom, crossmat);

  if (ymin <= 0 && ymax >= 0) {
    var xaxisgeom = new THREE.Geometry();
    xaxisgeom.vertices.push(
      new THREE.Vector3(xmin,0,0),
      new THREE.Vector3(xmax,0,0)
    );
    var xaxismat = new THREE.LineBasicMaterial( { color:colorx } );
    var xaxis = new THREE.Line(xaxisgeom, xaxismat);
  }

  if (xmin <= 0 && xmax >= 0) {
    var yaxisgeom = new THREE.Geometry();
    yaxisgeom.vertices.push(
      new THREE.Vector3(0,ymin,0),
      new THREE.Vector3(0,ymax,0)
    );
    var yaxismat = new THREE.LineBasicMaterial( { color:colory } );
    var yaxis = new THREE.Line(yaxisgeom, yaxismat);
  }

  grid.add(cross);
  grid.add(xaxis);
  grid.add(yaxis);
  return grid;
}

function GridMake3D(options) {
  var xmin, xmax, ymin, ymax, zmin, zmax, crossx, crossy, crossz, colorx, colory, colorz, colorelse;

  xmin = options.xmin;
  xmax = options.xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  zmin = options.zmin;
  zmax = options.zmax;
  if (options.crossx != null) crossx = options.crossx;
  else crossx = xmax - xmin;
  if (options.crossy != null) crossy = options.crossy;
  else crossy = ymax - ymin;
  if (options.crossz != null) crossz = options.crossz;
  else crossz = zmax - zmin;
  if (options.colorx != null) colorx = options.colorx;
  else colorx = 0xff0000;
  if (options.colory != null) colory = options.colory;
  else colory = 0x0000ff;
  if (options.colorz != null) colorz = options.colorz;
  else colorz = 0x010101;
  if (options.colorelse != null) colorelse = options.colorelse;
  else colorelse = 0xd0d0d0;

  var grid = new THREE.Object3D();

  var xyplane = GridMake2D({
    xmin : xmin,
    xmax : xmax,
    ymin : ymin,
    ymax : ymax,
    crossx : crossx,
    crossy : crossy,
    colorx : colorx,
    colory : colory,
    colorelse : colorelse
  });
  //grid already in xy plane

  var xzplane = GridMake2D({
    xmin : xmin,
    xmax : xmax,
    ymin : zmin,
    ymax : zmax,
    crossx : crossx,
    crossy : crossz,
    colorx : colorx,
    colory : colorz,
    colorelse : colorelse
  });
  //rotated to be in xz plane
  xzplane.rotateX(Math.PI / 2);

  var zyplane = GridMake2D({
    xmin : zmin,
    xmax : zmax,
    ymin : ymin,
    ymax : ymax,
    crossx : crossz,
    crossy : crossy,
    colorx : colorz,
    colory : colory,
    colorelse : colorelse
  });
  zyplane.rotateY(-Math.PI / 2);
  grid.add(xyplane);
  grid.add(xzplane);
  grid.add(zyplane);

  return grid;
}

function PlotPoints2D(options) {
  var func,xmin,xmax,step,graphxmin,graphxmax,ymin,ymax,colorline;

  func = options.func;
  xmin = options.xmin;
  xmax = options.xmax;
  step = options.step;
  ymin = options.ymin;
  ymax = options.ymax;
  if (options.graphxmin != null) graphxmin = options.graphxmin;
  else graphxmin = xmin;
  if (options.graphxmax != null) graphxmax = options.graphxmax;
  else graphxmax = xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  if (options.colorline != null) colorline = options.colorline;
  else colorline = 0x000000;

  var Lines = new THREE.Object3D();

  var lineArray = [];
  var pointArray = Array();
  var lineIndex = 0;
  var pointIndex = 0;
  var points;

  lineArray[lineIndex] = pointArray;

  for (var x = xmin; x <= xmax; x += step) {
    var point = func(x);
    if (point.y <= ymax && point.y >= ymin && point.x <= graphxmax && point.x >= graphxmin) {
      pointArray[pointIndex++] = point;
    }
    else {
      while ( (point.y > ymax || point.y < ymin || point.x > graphxmax || point.x < graphxmin) && x <= xmax ) {
        var point = func(x);
        x += step;
      }
      pointArray = Array();
      pointIndex = 0;
      lineArray[++lineIndex] = pointArray;
    }
  }

  for (var i = 0; i < lineArray.length; ++i) {
    pointArray = lineArray[i];
    points = new THREE.Geometry();
    for (var j = 0; j < pointArray.length; ++j) {
      points.vertices.push( pointArray[j] );
    }
    var linemat = new THREE.LineBasicMaterial( { color:colorline } );
    var line = new THREE.Line(points,linemat);
    Lines.add(line);
  }

  return Lines;
}

function Form2DGraph(options) {
  var func,graphxmin,graphxmax,linexmin,linexmax,step,ymin,ymax,crossx,crossy,camera;

  func = options.func;
  if (options.graphxmin != null) graphxmin = options.graphxmin;
  else graphxmin = -10;
  if (options.graphxmax != null) graphxmax = options.graphxmax;
  else graphxmax = 10;
  if (options.linexmin != null) linexmin = options.linexmin;
  else linexmin = graphxmin;
  if (options.linexmax != null) linexmax = options.linexmax;
  else linexmax = graphxmax;
  if (options.step != null) step = options.step;
  else step = (linexmax - linexmin) / 2000;
  if (options.ymin != null) ymin = options.ymin;
  else ymin = -10;
  if (options.ymax != null) ymax = options.ymax;
  else ymax = 10;
  if (options.crossx != null) crossx = options.crossx;
  else crossx = 10;
  if (options.crossy != null) crossy = options.crossy;
  else crossy = 10;
  camera = options.camera;

  var grid = GridMake2D({
    xmin : graphxmin,
    xmax : graphxmax,
    ymin : ymin,
    ymax : ymax,
    crossx : crossx,
    crossy : crossy
  });
  var plot = PlotPoints2D({
    func : func,
    xmin : linexmin,
    xmax : linexmax,
    graphxmin : graphxmin,
    graphxmax : graphxmax,
    step : step,
    ymin : ymin,
    ymax : ymax
  });

  var totalGraph =  new THREE.Object3D();
  totalGraph.add(grid);
  totalGraph.add(plot);

  if (camera) {
    camera.position.x = (graphxmax + graphxmin) / 2;
    camera.position.y = (ymax + ymin) / 2;
    camera.position.z = 2 * Math.max((graphxmax-graphxmin),(ymax-ymin));
  }

  return totalGraph;
}

function FormVectorField3D(options) {
  var xmin, xmax, ymin, ymax, zmin, zmax, dx, dy, dz, color;
  xmin = options.xmin;
  xmax = options.xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  zmin = options.zmin;
  zmax = options.zmax;
  if (options.dx != null) dx = options.dx;
  else dx = function(x,y,z) {return 0;}

  if (options.dy != null) dy = options.dy;
  else dy = function(x,y,z) {return 0;}

  if (options.dz != null) dz = options.dz;
  else dz = function(x,y,z) {return 0;}

  if (options.color != null) color = options.color;
  else color = 0xaaaa00;
  if (options.scale != null) scale = options.scale;
  else scale = 1;

  var vectorField = new THREE.Object3D();
  var grid = GridMake3D({
    xmin : xmin,
    xmax : xmax,
    ymin : ymin,
    ymax : ymax,
    zmin : zmin,
    zmax : zmax
  });
  vectorField.add(grid);
  for (var x = xmin; x <= xmax; ++x) {
    for (var y = ymin; y <= ymax; ++y) {
      for (var z = zmin; z <= zmax; ++z) {
        var origin = new THREE.Vector3(x,y,z);
        var dX = dx(x,y,z);
        var dY = dy(x,y,z);
        var dZ = dz(x,y,z);
        var direction = new THREE.Vector3(dX,dY,dZ);
          direction.normalize();
        var magnitude = Math.sqrt( Math.pow(dX,2) + Math.pow(dY,2) + Math.pow(dZ,2) );
        if (magnitude != 0) {
          var arrow = new THREE.ArrowHelper(direction, origin, scale*magnitude, color, scale*magnitude/3, scale*magnitude/3);
          vectorField.add(arrow);
        }
      }
    }
  }
  return vectorField;
}

function FormVectorField2D(options) {
  var xmin, xmax, ymin, ymax, dx, dy, color, scale;
  xmin = options.xmin;
  xmax = options.xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  if (options.dx != null) dx = options.dx;
  else dx = function(x,y,z) {return 0;}

  if (options.dy != null) dy = options.dy;
  else dy = function(x,y,z) {return 0;}

  if (options.color != null) color = options.color;
  else color = 0xaaaa00;
  if (options.scale != null) scale = options.scale;
  else scale = 1;
  var vectorField = new THREE.Object3D();
  var grid = GridMake2D({
    xmin : xmin,
    xmax : xmax,
    ymin : ymin,
    ymax : ymax
  });
  vectorField.add(grid);
  for (var x = xmin; x <= xmax; ++x) {
    for (var y = ymin; y <= ymax; ++y) {
      var origin = new THREE.Vector3(x,y,0);
      var dX = dx(x,y);
      var dY = dy(x,y);
      var direction = new THREE.Vector3(dX,dY,0);
        direction.normalize();
      var magnitude = Math.sqrt( Math.pow(dX,2) + Math.pow(dY,2) );
      if (magnitude != 0) {
        var arrow = new THREE.ArrowHelper(direction, origin, scale*magnitude, color, scale*magnitude/3, scale*magnitude/3);
        vectorField.add(arrow);
      }
    }
  }
  return vectorField;
}

function FormVectorField1D(options) {
  var xmin, xmax, ymin, ymax, dx, color, scale;
  xmin = options.xmin;
  xmax = options.xmax;
  ymin = options.ymin;
  ymax = options.ymax;
  if (options.dx != null) dx = options.dx;
  else dx = function(x,y,z) {return 0;}

  if (options.color != null) color = options.color;
  else color = 0xaaaa00;
  if (options.scale != null) scale = options.scale;
  else scale = 1;
  var vectorField = new THREE.Object3D();
  var grid = GridMake2D({
    xmin : xmin,
    xmax : xmax,
    ymin : ymin,
    ymax : ymax
  });
  vectorField.add(grid);
  for (var x = xmin; x <= xmax; ++x) {
    var origin = new THREE.Vector3(x,0,0);
    var dX = dx(x);
    var direction = new THREE.Vector3(dX,0,0);
      direction.normalize();
    var magnitude = Math.sqrt( Math.pow(dX,2) );
    if (magnitude != 0) {
      var arrow = new THREE.ArrowHelper(direction, origin, scale*magnitude, color, scale*magnitude/3, scale*magnitude/3);
      vectorField.add(arrow);
    }
  }
  return vectorField;
}

function zoom(e){

  var x = camera.position.x;
  var y = camera.position.y;
  var z = camera.position.z;

  var r = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2) );
  if (x < 0) {
    var phi = Math.atan( y / x) + Math.PI;
  }
  else {
    var phi = Math.atan( y / x);
  }
  var theta = Math.acos( z / r );

  var target = (e.target) ? e.target : e.srcElement;
  var newr = (2 - target.value) * z0;
  camera.position.x = newr * Math.sin( theta ) * Math.cos( phi );
  camera.position.y = newr * Math.sin( theta ) * Math.sin( phi );
  camera.position.z = newr * Math.cos( theta );
}

//Not perfect. To later be replaced by Mathlex when it gets a translater for javascript
function parseFunction(input) {
  var prec = new Object();
  prec[" "] = -1;
  prec["("] = 0;
  prec["+"] = 1;
  prec["-"] = 1;
  prec["*"] = 2;
  prec["/"] = 2;
  prec["^"] = 3;
  prec["cos"] = 4;
  prec["sin"] = 4;
  prec["tan"] = 4;
  prec["acos"] = 4;
  prec["asin"] = 4;
  prec["atan"] = 4;
  prec["abs"] = 4;
  prec["exp"] = 4;
  prec["sqrt"] = 4;


  function isFun(str) {
    return str == "cos" || str == "sin" || str == "tan" || str == "acos" || str == "asin" || str == "atan" || str == "abs" || str == "sqrt" || str == "exp";
  }
  function isOp1(str) {
    return str == "+" || str == "-" || str == "*" || str == "/" || str == "^";
  }
  function isOp2(str) {
    return str == "(" || str == ")" || isFun(str) || isOp1(str);
  }

  function evalOp(in1, in2, op) {
    if (op == "^") {
      return ("Math.pow(" + in1 + "," + in2 + ")");
    }
    else {
      return (in1 + op + in2);
    }
  }

  var tokens = [""];
  var charIndex = 0;
  var wordIndex = 0;
  var l4Num = 1;
  var l4Op = 1;

  //Split up the inputted expression into an array of strings, ie [1,+,sin,(,12,*,x,)]

  while (input[charIndex] == " ") {
    charIndex++;
  }
  for (charIndex; charIndex < input.length; charIndex++) {
    var chr = input[charIndex];
    if (chr == " ") {
      while (input[charIndex] == " " && charIndex < input.length) {
        charIndex++;
      }
      if (charIndex != input.length) {
        charIndex--;
        l4Num = 1;
        l4Op = 1;
        tokens.push("");
        wordIndex++;
      }
    }
    else if (isOp2(chr)) {
      if (!l4Num || !l4Op) {
        tokens.push("");
        wordIndex++;
      }
      tokens[wordIndex] += input[charIndex];
      l4Num = 0;
      l4Op = 0;
    }
    else {
      if (!l4Num) {
        tokens.push("");
        wordIndex++;
      }
      l4Op = 0;
      l4Num = 1;
      tokens[wordIndex] += input[charIndex];
    }
  }

  //Now place those characters into reverse polish form

  var looking4par = 0;
  var rpf = [ "" ];
  var stack = [" "];

  for (var i = 0; i < tokens.length; ++i) {
    var character = tokens[i];
    if (isOp2(character) && character != "(" && character != ")") {
      while (stack.length > 1 && prec[character] < prec[stack[stack.length-1]]) {
        rpf.push(stack.pop());
      }
      stack.push(character);
    }
    else if (character == "(") {
      stack.push("(");
    }
    else if (character == ")") {
      rpf.push(")");
      while (stack[stack.length-1] != "(") {
        rpf.push(stack.pop());
      }
      stack.pop();
      rpf.push("(");
    }
    else {
      rpf.push(character);
    }
  }
  while (stack[stack.length-1] != " ") {
    rpf.push(stack.pop());
  }
  rpf.shift();

  //Now for the interpretations

  var vals = [ "" ];
  var output = "";

  for (var i = 0; i < rpf.length; i++) {
    if (isOp1(rpf[i])) {
      var in2 = vals.pop();
      var in1 = vals.pop();
      var str = evalOp(in1, in2, rpf[i]);
      vals.push(str);
    }
    else if (rpf[i] == "(" ) {
      output += "(";
      if (vals.length == 1) vals.push("(");
      else vals[vals.length-1] = "(" + vals[vals.length-1];
    }
    else if (rpf[i] == ")") {
      vals[vals.length-1] += ")";
    }
    else if (isFun(rpf[i])) {
      var in1 = vals.pop();
      vals.push("Math." + rpf[i] + in1);
    }

    else {
      if (vals[vals.length-1] == "(") vals[vals.length-1] += rpf[i];
      else vals.push(rpf[i]);
    }
  }
  vals.shift();
  output = vals[0];

  return output;
}
