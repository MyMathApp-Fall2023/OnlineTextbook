$(document).ready( function() {
  let scalingConstrained = true;
  if($('#xmin').val() == "") $('#xmin').val(-.5);
  if($('#xmax').val() == "") $('#xmax').val(.5);
  if($('#ymin').val() == "") $('#ymin').val(-.5);
  if($('#ymax').val() == "") $('#ymax').val(.5);
  if($('#zmin').val() == "") $('#zmin').val(-.5);
  if($('#zmax').val() == "") $('#zmax').val(.1);
  var _xmin = Number($('#xmin').val());
  var _xmax = Number($('#xmax').val());
  var _ymin = Number($('#ymin').val());
  var _ymax = Number($('#ymax').val());
  var _zmin = Number($('#zmin').val());
  var _zmax = Number($('#zmax').val());
  $('#cbxplay').prop('checked', false);
  $('#cbyplay').prop('checked', false);
  $('#cbyplane').prop('checked', false);
  $('#cbxplane').prop('checked', false);
  $('#cbxline').prop('checked', false);
  $('#cbyline').prop('checked', false);
  $('#cbytline').prop('checked', false);
  $('#cbxtline').prop('checked', false);
  $('#cbtplane').prop('checked', false);
  $('#cbscaling').prop('checked', true);
  // $(`#zfunc`).val("");
  // $(`#zfunc`).val($(`#zfunc`).val());

  $('#cbscaling').change(function () {
    scalingConstrained = !scalingConstrained;
    // drawScene();
    // return;
    // if(!scalingConstrained) {
    //   fig.everything.scale.set(Math.max(1, fig.yrange/fig.xrange), Math.max(1, fig.xrange/fig.yrange), Math.max(fig.yrange/fig.zrange, fig.xrange/fig.zrange));
    //   s_fig = fig.everything.scale;
    //   fig.pt.scale.set(fig.pt.scale.x/s_fig.x, fig.pt.scale.y/s_fig.y, fig.pt.scale.z/s_fig.z);
    //   fig.label_x.scale.set(fig.label_x.scale.x/s_fig.x, fig.label_x.scale.y/s_fig.y, fig.label_x.scale.z/s_fig.z);
    //   fig.label_y.scale.set(fig.label_y.scale.x/s_fig.x, fig.label_y.scale.y/s_fig.y, fig.label_y.scale.z/s_fig.z);
    //   fig.label_z.scale.set(fig.label_z.scale.x/s_fig.x, fig.label_z.scale.y/s_fig.y, fig.label_z.scale.z/s_fig.z);
    // }
    // else {
    //   s_fig = fig.everything.scale;
    //   fig.pt.scale.set(fig.pt.scale.x*s_fig.x, fig.pt.scale.y*s_fig.y, fig.pt.scale.z*s_fig.z);
    //   fig.label_x.scale.set(fig.label_x.scale.x*s_fig.x, fig.label_x.scale.y*s_fig.y, fig.label_x.scale.z*s_fig.z);
    //   fig.label_y.scale.set(fig.label_y.scale.x*s_fig.x, fig.label_y.scale.y*s_fig.y, fig.label_y.scale.z*s_fig.z);
    //   fig.label_z.scale.set(fig.label_z.scale.x*s_fig.x, fig.label_z.scale.y*s_fig.y, fig.label_z.scale.z*s_fig.z);
    //   fig.everything.scale.set(1,1,1);
    // }

    // let _xrange = _xmax - _xmin;
    // let _xcenter = _xmin + (_xrange/2.0);
    // let _yrange = _ymax - _ymin;
    // let _ycenter = _ymin + (_yrange/2.0);
    // let xBig = _xrange > _yrange;
    //
    // console.log("left: " + xycamera.left + ", right: " + xycamera.right + ", top: " + xycamera.top + ", bottom: " + xycamera.bottom);
    // xycamera.left = (xBig || !scalingConstrained) ? _xmin : _xcenter - (_yrange/2.0);
    // xycamera.right = (xBig || !scalingConstrained) ? _xmax : _xcenter + (_yrange/2.0);
    // xycamera.top = (!xBig || !scalingConstrained) ? _ymax : _ycenter + (_xrange/2.0);
    // xycamera.bottom = (!xBig || !scalingConstrained) ? _ymin : _ycenter - (_xrange/2.0);

    // let s1 = (xBig ? _xrange : _yrange)/20.0;
    // let s2 = (!xBig ? _xrange : _yrange)/20.0;
    // fig.xypt.scale.set(xBig ? s1 : (scalingConstrained ? s1 : s2), !xBig ? s1 : (scalingConstrained ? s1 : s2), 0.1);
    // fig.xyscene.scale.set(1,1,1);
    // let n = Math.max(Math.max(Math.abs(fig.xmin), Math.abs(fig.xmax)), Math.max(Math.abs(fig.ymin), Math.abs(fig.ymax)));
    // fig.x2d.scale.set(n, n/2.0, 1);
    // fig.y2d.scale.set(n, n/2.0, 1);
    //
    // if(!scalingConstrained) {
    //   fig.xyscene.scale.set(xBig ? 1 : _yrange/_xrange, !xBig ? 1 : _xrange/_yrange, 1);
    //   fig.xypt.scale.set(fig.xypt.scale.x/fig.xyscene.scale.x, fig.xypt.scale.y/fix.xyscene.scale.y, 1);
    //   fig.x2d.scale.set(fig.x2d.scale.x/fig.xyscene.scale.x, fig.x2d.scale.y/fix.xyscene.scale.y, 1);
    //   fig.y2d.scale.set(fig.y2d.scale.x/fig.xyscene.scale.x, fig.y2d.scale.y/fix.xyscene.scale.y, 1);
    //   fig.x2d.scale.set(n/fig.xyscene.scale.x, (n/2.0)/fig.xyscene.scale.y, 1);
    //   fig.y2d.scale.set(n/fig.xyscene.scale.x, (n/2.0)/fig.xyscene.scale.y, 1);
    // }
    //
    // console.log("left: " + xycamera.left + ", right: " + xycamera.right + ", top: " + xycamera.top + ", bottom: " + xycamera.bottom);
    // xycamera = new THREE.OrthographicCamera(xycamera.left, xycamera.right, xycamera.top, xycamera.bottom);
  });

  var zFunction = new Function("x","y", "return " + $('#zfunc').val());

  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("Figure"), antialias: true});
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300,300);
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);

  var xyrenderer = new THREE.WebGLRenderer({canvas: document.getElementById("xyslider"), antialias: true});
    xyrenderer.setClearColor(0xf0f0f0);
    xyrenderer.setPixelRatio(window.devicePixelRatio);
    xyrenderer.setSize(300,300);
  // var xycamera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
  var xycamera = new THREE.OrthographicCamera(-10, 10, 10, -10);

  var fig;

  drawScene();
  fig.cameracontrols.enablePan = false;

  let s = Math.max($('#xmax').val() - $('#xmin').val(), $('#ymax').val() - $('#ymin').val());

  fig.cameracontrols.object.position.set(0,0,50*s/20);

  $('#zfunc').change(function() {dropdownChange()});

  function dropdownChange() {
    switch("" + $('#zfunc').val()) {
      case "(-Math.pow(x,2)-Math.pow(y,2))":
        $('#xmin').val(-.5);
        $('#xmax').val(.5);
        $('#ymin').val(-.5);
        $('#ymax').val(.5);
        $('#zmin').val(-.5);
        $('#zmax').val(0.1);
      break;

      case "(-Math.pow(x,2)*y)":
        $('#xmin').val(-1);
        $('#xmax').val(1);
        $('#ymin').val(-1);
        $('#ymax').val(1);
        $('#zmin').val(-1);
        $('#zmax').val(1);
      break;


      case "Math.exp((-Math.pow(x,2)-Math.pow(y,2)))":
        $('#xmin').val(-2);
        $('#xmax').val(2);
        $('#ymin').val(-2);
        $('#ymax').val(2);
        $('#zmin').val(-0.1);
        $('#zmax').val(1);
      break;

      case "Math.exp(1/(-Math.pow(x,2)-Math.pow(y,2)))":
        $('#xmin').val(-2);
        $('#xmax').val(2);
        $('#ymin').val(-2);
        $('#ymax').val(2);
        $('#zmin').val(-0.1);
        $('#zmax').val(1);
      break;

      case "(-(10*x*y)/(1+Math.pow(x,2)+Math.pow(y,2)))":
        $('#xmin').val(-10);
        $('#xmax').val(10);
        $('#ymin').val(-10);
        $('#ymax').val(10);
        $('#zmin').val(-5);
        $('#zmax').val(5);
      break;

      case "1/(1+Math.pow(x,2)+Math.pow(y,2))":
        $('#xmin').val(-2);
        $('#xmax').val(2);
        $('#ymin').val(-2);
        $('#ymax').val(2);
        $('#zmin').val(-0.1);
        $('#zmax').val(1);
      break;

      case "(-Math.pow(x,2)-Math.pow(y,3))":
        $('#xmin').val(-10/10.0);
        $('#xmax').val(10/10.0);
        $('#ymin').val(-10/10.0);
        $('#ymax').val(10/10.0);
        $('#zmin').val(-1);
        $('#zmax').val(1);
      break;

      case "(Math.cos(Math.PI*x)*Math.cos(Math.PI*y))":
        $('#xmin').val(-2);
        $('#xmax').val(2);
        $('#ymin').val(-2);
        $('#ymax').val(2);
        $('#zmin').val(-1);
        $('#zmax').val(1);
      break;

      default:
        $('#xmin').val(-10);
        $('#xmax').val(10);
        $('#ymin').val(-10);
        $('#ymax').val(10);
        $('#zmin').val(-10);
        $('#zmax').val(2);
      break;
    }

    _xmin = Number($('#xmin').val());
    _xmax = Number($('#xmax').val());
    _ymin = Number($('#ymin').val());
    _ymax = Number($('#ymax').val());
    _zmin = Number($('#zmin').val());
    _zmax = Number($('#zmax').val());
  }

  $('#plotit').click(function() {
    drawScene();
  });

  function label(graph) {
    var label_x = makeTextSprite("x", {fontface: "Georgia", fontsize: 45});
    label_x.position.set((graph.xmax + .1*graph.xrange) / (scalingConstrained ? 1 : Math.max(1, fig.yrange/fig.xrange)), 0, 0);
    label_x.scale.set(graph.camera.position.z/4.5, graph.camera.position.z/9.0, 1);
    graph.everything.add(label_x);
    graph.label_x = label_x;
    var label_y = makeTextSprite("y", {fontface: "Georgia", fontsize: 45});
    label_y.position.set(0, (graph.ymax + .1*graph.yrange) / (scalingConstrained ? 1 : Math.max(1, fig.xrange/fig.yrange)), 0);
    label_y.scale.set(graph.camera.position.z/4.5, graph.camera.position.z/9.0, 1);
    graph.everything.add(label_y);
    graph.label_y = label_y;
    var label_z = makeTextSprite("z", {fontface: "Georgia", fontsize: 45});
    label_z.position.set(0, 0, (graph.zmax + .1*graph.xrange) / (scalingConstrained ? 1 : Math.max(fig.yrange/fig.zrange, fig.xrange/fig.zrange)));
    label_z.scale.set(graph.camera.position.z/4.5, graph.camera.position.z/9.0, 1);
    graph.everything.add(label_z);
    graph.label_z = label_z;
    let n = Math.max(Math.max(Math.abs(graph.xmin), Math.abs(graph.xmax)), Math.max(Math.abs(graph.ymin), Math.abs(graph.ymax)));
    let nx = .05*graph.xrange;
    let ny = .05*graph.yrange;
    var x2d = makeTextSprite("x", {fontface: "Georgia", fontsize: 38});
    if(!scalingConstrained) n = nx;
    x2d.position.set(graph.xmax - .1*n, n/10,0);
    // x2d.scale.set(n, n/2.0, 1);
    x2d.scale.set(Math.max(graph.xrange, graph.yrange)/2.0, Math.max(graph.xrange, graph.yrange)/4.0, 1);
    if(!scalingConstrained) {
      n = Math.max(nx, ny);
      x2d.position.set(graph.xmax - .05*graph.xrange, graph.yrange/20,0);
      x2d.scale.set(n*1/.1, n*0.5/.1, 1);
    }
    graph.xyscene.add(x2d);
    graph.x2d = x2d;
    if(!scalingConstrained) n = ny;
    var y2d = makeTextSprite("y", {fontface: "Georgia", fontsize: 38});
    y2d.position.set(n/10, graph.ymax - 0.05*n,0);
    y2d.scale.set(Math.max(graph.xrange, graph.yrange)/2.0, Math.max(graph.xrange, graph.yrange)/4.0, 1);
    if(!scalingConstrained) {
      n = Math.max(nx, ny);
      y2d.position.set(graph.xrange/20,graph.ymax - .025*graph.yrange,0);
      y2d.scale.set(n*1/.1, n*0.5/.1, 1);
    }
    graph.xyscene.add(y2d);
    graph.y2d = y2d;


      // (xBig || !scalingConstrained) ? _xmin : _xcenter - (_yrange/2.0),
      // (xBig || !scalingConstrained) ? _xmax : _xcenter + (_yrange/2.0),
      // (!xBig || !scalingConstrained) ? _ymax : _ycenter + (_xrange/2.0),
      // (!xBig || !scalingConstrained) ? _ymin : _ycenter - (_xrange/2.0)
  }

  function drawScene() {
    var zFunction = new Function("x", "y", "return " + $('#zfunc').val());
    fig = null;

    _xmin = Number($('#xmin').val());
    _xmax = Number($('#xmax').val());
    _ymin = Number($('#ymin').val());
    _ymax = Number($('#ymax').val());
    _zmin = Number($('#zmin').val());
    _zmax = Number($('#zmax').val());

    $('#cbxplay').prop('checked', false);
    $('#cbyplay').prop('checked', false);
    $('#cbyplane').prop('checked', false);
    $('#cbxplane').prop('checked', false);
    $('#cbxline').prop('checked', false);
    $('#cbyline').prop('checked', false);
    $('#cbytline').prop('checked', false);
    $('#cbxtline').prop('checked', false);
    $('#cbtplane').prop('checked', false);

    $('#xslider').prop({
      'min': $('#xmin').val(),
      'max': $('#xmax').val(),
      'step': (($('#xmax').val() - $('#xmin').val()) / 100)
    })
    $('#yslider').prop({
      'min': $('#ymin').val(),
      'max': $('#ymax').val(),
      'step': (($('#ymax').val() - $('#ymin').val()) / 100)
    })

    camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    // let n = Math.max(Math.max(Math.abs(_xmin), Math.abs(_xmax)), Math.max(Math.abs(_ymin), Math.abs(_ymax)));
    let _xrange = _xmax - _xmin;
    let _xcenter = _xmin + (_xrange/2.0);
    let _yrange = _ymax - _ymin;
    let _ycenter = _ymin + (_yrange/2.0);
    let xBig = _xrange > _yrange;
    xycamera = new THREE.OrthographicCamera(
      (xBig || !scalingConstrained) ? _xmin : _xcenter - (_yrange/2.0),
      (xBig || !scalingConstrained) ? _xmax : _xcenter + (_yrange/2.0),
      (!xBig || !scalingConstrained) ? _ymax : _ycenter + (_xrange/2.0),
      (!xBig || !scalingConstrained) ? _ymin : _ycenter - (_xrange/2.0)
    );

    fig = createTanPlane({
      renderer:renderer,
      camera:camera,
      xyrenderer:xyrenderer,
      xycamera:xycamera,
      zFunction:zFunction,
      xmin:_xmin,
      xmax:_xmax,
      ymin:_ymin,
      ymax:_ymax,
      zmin:_zmin,
      zmax:_zmax,
      cbxplay:$('#cbxplay'),
      cbyplay:$('#cbyplay'),
      cbyplane:$('#cbyplane'),
      cbxplane:$('#cbxplane'),
      cbxline:$('#cbxline'),
      cbyline:$('#cbyline'),
      cbytline:$('#cbytline'),
      cbxtline:$('#cbxtline'),
      cbtplane:$('#cbtplane'),
      xslider:$('#xslider'),
      yslider:$('#yslider'),
      inx:$('#INx'),
      iny:$('#INy'),
      crossx:10,
      crossy:10,
      crossz:10
    });
    fig.cameracontrols.enableZoom = true;

    label(fig);


    fig.pt.scale.set(fig.camera.position.z/50.0, fig.camera.position.z/50.0, fig.camera.position.z/50.0);
    let s1 = (xBig ? _xrange : _yrange)/20.0;
    let s2 = (!xBig ? _xrange : _yrange)/20.0;
    fig.xypt.scale.set(xBig ? s1 : (scalingConstrained ? s1 : s2), !xBig ? s1 : (scalingConstrained ? s1 : s2), 0.1);

    if(!scalingConstrained) {
      fig.everything.scale.set(Math.max(1, fig.yrange/fig.xrange), Math.max(1, fig.xrange/fig.yrange), Math.max(fig.yrange/fig.zrange, fig.xrange/fig.zrange));
      s_fig = fig.everything.scale;
      fig.pt.scale.set(fig.pt.scale.x/s_fig.x, fig.pt.scale.y/s_fig.y, fig.pt.scale.z/s_fig.z);
      fig.label_x.scale.set(fig.label_x.scale.x/s_fig.x, fig.label_x.scale.y/s_fig.y, fig.label_x.scale.z/s_fig.z);
      fig.label_y.scale.set(fig.label_y.scale.x/s_fig.x, fig.label_y.scale.y/s_fig.y, fig.label_y.scale.z/s_fig.z);
      fig.label_z.scale.set(fig.label_z.scale.x/s_fig.x, fig.label_z.scale.y/s_fig.y, fig.label_z.scale.z/s_fig.z);
      fig.x2d.scale.set(fig.x2d.scale.x/s_fig.x, fig.x2d.scale.y/s_fig.y, fig.x2d.scale.z/s_fig.z);
      fig.y2d.scale.set(fig.y2d.scale.x/s_fig.x, fig.y2d.scale.y/s_fig.y, fig.y2d.scale.z/s_fig.z);
    }
  }


  window.addEventListener("keydown", function(event) {
    if((event.code == 'ControlLeft' || event.code == 'ControlRight') && fig.cameracontrols.enablePan == false) fig.cameracontrols.enablePan = true;
  }, true);

  window.addEventListener("keyup", function(event) {
    if(event.code == 'ControlLeft' || event.code == 'ControlRight') fig.cameracontrols.enablePan = false;
  }, true);

  requestAnimationFrame(render);
  function render()
  {
    fig.renderfunc();

    $('#INx').val(fig.xval);
    $('#INy').val(fig.yval);
    requestAnimationFrame(render);
  }
});
