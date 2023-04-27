
$(document).ready( function() {

  var zFunction_1 = new Function("x", "y", $('#zFunction_1').val());

  var renderer_1 = new THREE.WebGLRenderer({canvas: document.getElementById('figure_1'), antialias: true});
    renderer_1.setClearColor(0xf0f0f0);
    renderer_1.setPixelRatio(window.devicePixelRatio);
    renderer_1.setSize(300,300);

  var camera_1 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);

  var figure_1 = createTanPlane({
      renderer:renderer_1,
      camera:camera_1,
      zFunction:zFunction_1,
      xmin:-10,
      xmax:10,
      ymin:-10,
      ymax:10,
      zmin:-10,
      zmax:2,
      crossx:10,
      crossy:10,
      crossz:6,
      cbxplay:$('#cbxplay_1'),
      cbyplay:$('#cbyplay_1'),
      cbxplane:$('#cbxplane_1'),
      cbyplane:$('#cbyplane_1'),
      cbxline:$('#cbxline_1'),
      cbyline:$('#cbyline_1'),
      cbxtline:$('#cbxtline_1'),
      cbytline:$('#cbytline_1'),
      xslider:$('#xslider_1'),
      yslider:$('#yslider_1'),
      inx:$('#xdisp_1'),
      iny:$('#ydisp_1')
  });

  var zFunction_2 = new Function("x", "y", $('#zFunction_2').val());

  var renderer_2 = new THREE.WebGLRenderer({canvas: document.getElementById('figure_2'), antialias: true});
    renderer_2.setClearColor(0xf0f0f0);
    renderer_2.setPixelRatio(window.devicePixelRatio);
    renderer_2.setSize(300,300);

  var camera_2 = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);

  var figure_2 = createTanPlane({
      renderer:renderer_2,
      camera:camera_2,
      zFunction:zFunction_2,
      xmin:-10,
      xmax:10,
      ymin:-10,
      ymax:10,
      zmin:-10,
      zmax:10,
      crossx:10,
      crossy:10,
      crossz:10,
      cbxplay:$('#cbxplay_2'),
      cbyplay:$('#cbyplay_2'),
      cbxplane:$('#cbxplane_2'),
      cbyplane:$('#cbyplane_2'),
      cbxline:$('#cbxline_2'),
      cbyline:$('#cbyline_2'),
      cbxtline:$('#cbxtline_2'),
      cbytline:$('#cbytline_2'),
      xslider:$('#xslider_2'),
      yslider:$('#yslider_2'),
      inx:$('#xdisp_2'),
      iny:$('#ydisp_2')
  });
  figure_2.everything.position.set(0,0,0);

  requestAnimationFrame(render);

  function render() {
    figure_1.renderfunc();
    $('#xdisp_1').val(figure_1.xval);
    $('#ydisp_1').val(figure_1.yval);
    figure_2.renderfunc();
    $('#xdisp_2').val(figure_2.xval);
    $('#ydisp_2').val(figure_2.yval);
    requestAnimationFrame(render);
  }
});
