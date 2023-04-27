$(document).ready( function() {

  function fx1(x,y) {
    return 2*x;
  }
  function fy1(x,y) {
    return -2*y;
  }

  function fx2(x,y) {
    return y;
  }
  function fy2(x,y) {
    return -x;
  }

  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("Plot"), antialias: true});
    //ClearColor is just the background
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300,300);  //in pixels

  var rendererAns = new THREE.WebGLRenderer({canvas: document.getElementById("AnsPlot"), antialias: true});
    //ClearColor is just the background
    rendererAns.setClearColor(0xf0f0f0);
    rendererAns.setPixelRatio(window.devicePixelRatio);
    rendererAns.setSize(300,300);  //in pixels

  var rendererSol = new THREE.WebGLRenderer({canvas: document.getElementById("SolPlot"), antialias: true});
    //ClearColor is just the background
    rendererSol.setClearColor(0xf0f0f0);
    rendererSol.setPixelRatio(window.devicePixelRatio);
    rendererSol.setSize(300,300);  //in pixels

  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
    camera.position.z = 20;

  var exampleScene = new THREE.Scene();
  var exampleField = FormVectorField2D({
    xmin: -5,
    xmax: 5,
    ymin: -5,
    ymax: 5,
    dx: fx1,
    dy: fy1,
    scale: 1/20,
    color: 0x010101
  });
  exampleScene.add(exampleField);

  var exerciseScene = new THREE.Scene();
  var exerciseField = FormVectorField2D({
    xmin: -5,
    xmax: 5,
    ymin: -5,
    ymax: 5,
    dx: fx2,
    dy: fy2,
    scale: 1/10,
    color: 0x010101
  });
  exerciseScene.add(exerciseField);

  requestAnimationFrame(render);
  function render() {

    renderer.render(exampleScene, camera);
    rendererAns.render(exerciseScene, camera);
    rendererSol.render(exerciseScene, camera);
    requestAnimationFrame(render);
  }

});
