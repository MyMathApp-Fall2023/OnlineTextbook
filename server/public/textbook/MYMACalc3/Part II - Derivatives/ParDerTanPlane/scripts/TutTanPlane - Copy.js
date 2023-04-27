
$(document).ready( function() {

  $('#zfunc').val('(-x^2-y^2)/20');
  $('#xmin').val("-10");
  $('#xmax').val("10");
  $('#ymin').val("-10");
  $('#ymax').val("10");
  $('#zmin').val("-10");
  $('#zmax').val("2");
  $('#cbxplay').prop('checked', false);
  $('#cbyplay').prop('checked', false);
  $('#cbyplane').prop('checked', false);
  $('#cbxplane').prop('checked', false);
  $('#cbxline').prop('checked', false);
  $('#cbyline').prop('checked', false);
  $('#cbytline').prop('checked', false);
  $('#cbxtline').prop('checked', false);
  $('#cbtplane').prop('checked', false);

  function zFunction(x,y) {
    var z = (-Math.pow(x,2)-Math.pow(y,2))/20;
    return z;
  }

  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("Figure"), antialias: true});
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300,300);
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);

  var xyrenderer = new THREE.WebGLRenderer({canvas: document.getElementById("xyslider"), antialias: true});
    xyrenderer.setClearColor(0xf0f0f0);
    xyrenderer.setPixelRatio(window.devicePixelRatio);
    xyrenderer.setSize(300,300);
  var xycamera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);

  var fig = createTanPlane({
    renderer:renderer,
    camera:camera,
    xyrenderer:xyrenderer,
    xycamera:xycamera,
    zFunction:zFunction,
    xmin:-10,
    xmax:10,
    ymin:-10,
    ymax:10,
    zmin:-10,
    zmax:2,
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
    // colPoint:$('#colPoint'),
    // colFront:$('#colFront'),
    // colBack:$('#colBack'),
    // colXZ:$('#colXZ'),
    // colxTrace:$('#colxTrace'),
    // colxTan:$('#colxTan'),
    // colYZ:$('#colYZ'),
    // colyTrace:$('#colyTrace'),
    // colyTan:$('#colyTan'),
    // coltPlane:$('#coltPlane'),
    inx:$('#INx'),
    iny:$('#INy')
  });
  $('#test').val("");
  // var loading = false;
  $('#plotit').click(function() {
    // loading = true;
    var zString = $('#zfunc').val();
    var zFunction = parseFunction(zString);
    fig = null;

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
      'max': $('#xmax').val()
    })
    $('#yslider').prop({
      'min': $('#ymin').val(),
      'max': $('#ymax').val()
    })

    fig = createTanPlane({
      renderer:renderer,
      camera:camera,
      xyrenderer:xyrenderer,
      xycamera:xycamera,
      zFunction:zFunction,
      xmin:parseFloat($('#xmin').val()),
      xmax:parseFloat($('#xmax').val()),
      ymin:parseFloat($('#ymin').val()),
      ymax:parseFloat($('#ymax').val()),
      zmin:parseFloat($('#zmin').val()),
      zmax:parseFloat($('#zmax').val()),
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
      // colPoint:$('#colPoint'),
      // colFront:$('#colFront'),
      // colBack:$('#colBack'),
      // colXZ:$('#colXZ'),
      // colxTrace:$('#colxTrace'),
      // colxTan:$('#colxTan'),
      // colYZ:$('#colYZ'),
      // colyTrace:$('#colyTrace'),
      // colyTan:$('#colyTan'),
      // coltPlane:$('#coltPlane'),
      inx:$('#INx'),
      iny:$('#INy')
    });
    loading = false;
  });


  requestAnimationFrame(render);
  function render()
  {
    // if (!loading) {
      fig.renderfunc();

      $('#INx').val(fig.xval);
      $('#INy').val(fig.yval);
    // }
    requestAnimationFrame(render);
  }
});
