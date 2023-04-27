$(document).ready(function() {
  $("#BPlay").prop("hidden", false);
  $("#BPause").prop("hidden", true);
  $("#BForward").prop("hidden", false);
  $("#BReverse").prop("hidden", true);

  var type = new genQuestionObject({
    INbox: $("input[name='INtype']:checked"),
    Check: $("#Checktype"),
    Show: $("#Showtype"),
    MRbox: $("#MRtype")
  });

  var form = new genQuestionObject({
    INbox: $("#INform"),
    OUTbox: "OUTform",
    Check: $("#Checkform"),
    Show: $("#Showform"),
    MRbox: $("#MRform")
  });

  var vol = new genQuestionObject({
    INbox: $("#INvol"),
    OUTbox: "OUTvol",
    Check: $("#Checkvol"),
    Show: $("#Showvol"),
    MRbox: $("#MRvol")
  });
  var allQuestions = [type, form, vol];

  MathJax.Hub.Queue(function() {
    form.OUTbox = MathJax.Hub.getAllJax(form.OUTbox)[0];
    vol.OUTbox = MathJax.Hub.getAllJax(vol.OUTbox)[0];

    lowerBoxX = MathJax.Hub.getAllJax("lowerX")[0];
    upperBoxX = MathJax.Hub.getAllJax("upperX")[0];
    startBoxX = MathJax.Hub.getAllJax("startX")[0];
    finishBoxX = MathJax.Hub.getAllJax("finishX")[0];
    axisBoxX = MathJax.Hub.getAllJax("axisX")[0];

    lowerBoxY = MathJax.Hub.getAllJax("lowerY")[0];
    upperBoxY = MathJax.Hub.getAllJax("upperY")[0];
    startBoxY = MathJax.Hub.getAllJax("startY")[0];
    finishBoxY = MathJax.Hub.getAllJax("finishY")[0];
    axisBoxY = MathJax.Hub.getAllJax("axisY")[0];
    clearboxes(allQuestions);
    $("#reply").val("To get started, click New Problem.");
    MathJax.Hub.Queue(["Text", form.OUTbox, "\\int_a^b A(x)\\,dx "]);
  });
  $("#TextNewProblem").html("");
  MathJax.Hub.processSectionDelay = 0;

  var NewProblemSage =
    "from random import randint\n" +
    "x = var('x')\n" +
    "y = var('y')\n" +
    "t = var('t')\n" +
    "Powers = [1/3, 1/2, 1, 2, 3]\n" +
    "Axes = [' x ', ' y ']\n" +
    "indvar = Axes[randint(0,1)]\n" +
    "#indvar = ' x '\n" +
    "if indvar == ' x ':\n" +
    "  var = x\n" +
    "  other = y\n" +
    "else:\n" +
    "  var = y\n" +
    "  other = x\n" +
    "start = 0\n" +
    "finish = randint(1,5)\n" +
    "p1 = Powers[randint(0,4)]\n" +
    "p2 = Powers[randint(0,4)]\n" +
    "while p1==p2:\n" +
    "  p2 = Powers[randint(0,4)]\n" +
    "if p1 > p2:\n" +
    "  temp = p1\n" +
    "  p1 = p2\n" +
    "  p2 = temp\n" +
    "lower = finish^p1*var^p2\n" +
    "upper = finish^p2*var^p1\n" +
    "axisvar = Axes[randint(0,1)]\n" +
    "#axisvar = ' x '\n" +
    "if axisvar == ' x ':\n" +
    "  axis = x\n" +
    "else:\n" +
    "  axis = y\n" +
    "if var != axis:\n" +
    "  rottype = 'Cylinder'\n" +
    "  form = 2*pi*var*(upper-lower)\n" +
    "elif lower == 0:\n" +
    "  rottype = 'Disk'\n" +
    "  form = pi*upper^2\n" +
    "elif upper == 0:\n" +
    "  rottype = 'Disk'\n" +
    "  form = pi*lower^2\n" +
    "else:\n" +
    "  rottype = 'Washer'\n" +
    "  form = pi*upper^2-pi*lower^2\n" +
    "vol = integral(form, var, start, finish)\n" +
    "simp = form.simplify_full()\n" +
    "fact = form.factor()\n" +
    "exp = form.expand()\n" +
    "print(rottype)\n" +
    "print(form)\n" +
    "print(vol)\n" +
    "print(start)\n" +
    "print(finish)\n" +
    "print(lower)\n" +
    "print(upper)\n" +
    "print(var)\n" +
    "print(axis)\n" +
    "print(simp)\n" +
    "print(fact)\n" +
    "print(exp)\n" +
    "print(p1)\n" +
    "print(p2)";

  var start;
  var finish;
  var lower;
  var upper;
  var indvar;
  var axis;
  var textProblem;
  var funcLower;
  var funcLowerT;
  var funcLowerSurface;
  var lowerSurface;
  var funcUpper;
  var funcUpperT;
  var funcUpperSurface;
  var upperSurface;
  var plotLower;
  var plotUpper;
  var p1;
  var p2;
  var xaxis;
  var yaxis;
  var zaxis;
  var textx;
  var texty;
  var grid;
  var revolveFrames;
  var sliceFrames;
  var accumFrames;
  var activeFrames;
  var loaded = false;
  var loadedRev = false;
  var loadedSlice = false;
  var loadedAccum = false;
  var timer;
  var frame;
  var play = true;
  var forward = true;
  var xmin;
  var xmax;
  var ymin;
  var ymax;
  var zmax;
  var indvarMin;
  var indvarMax;
  var lowerBoxX;
  var upperBoxX;
  var startBoxX;
  var finishBoxX;
  var axisBoxX;
  var lowerBoxY;
  var upperBoxY;
  var startBoxY;
  var finishBoxY;
  var axisBoxY;

  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("Figure"),
    antialias: true
  });
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(350, 350);

  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
  camera.position.z = 25;

  var scene = new THREE.Scene();

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  light = new THREE.AmbientLight(0xffffff, 0.5);
  light.position.set(0, 0, 80);
  scene.add(light);
  lightpt = new THREE.PointLight(0xffffff, 0.5);
  lightpt.position.set(0, 0, 80);
  scene.add(lightpt);

  var wholeFigure = new THREE.Object3D();
  wholeFigure.rotation.x = Math.PI / 8;
  wholeFigure.rotation.y = -Math.PI / 6;

  var axes = AxisMake3D({
    xmin: -5,
    xmax: 5,
    ymin: -5,
    ymax: 5,
    zmin: -5,
    zmax: 5
  });
  wholeFigure.add(axes);
  scene.add(wholeFigure);

  $("#BNewProblem").click(function() {
    $("#loading").prop("hidden", false);
    scene.remove(wholeFigure);
    if (loaded) {
      wholeFigure.remove(activeFrames[frame]);
    }
    loaded = false;
    activeFrames = [];
    revolveFrames = [];
    sliceFrames = [];
    accumFrames = [];
    loadedRev = false;
    loadedAccum = false;
    loadedSlice = false;

    clearboxes(allQuestions);

    wholeFigure = null;
    wholeFigure = new THREE.Object3D();
    wholeFigure.add(axes);

    $("input[name='INtype'][value='Disk']").prop("checked", false);
    $("input[name='INtype'][value='Washer']").prop("checked", false);
    $("input[name='INtype'][value='Cylinder']").prop("checked", false);
    $("#TextNewProblem").html("");
    $("#reply").val("");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", false);
    xhr.onload = function() {
      var data = JSON.parse(xhr.response);
      var ans_string = data.stdout;

      var ans_array = ans_string.split("\n");

      type.ans = ans_array[0];
      vol.ans = ans_array[2];
      start = parseInt(ans_array[3]);
      finish = parseInt(ans_array[4]);
      lower = ans_array[5];
      upper = ans_array[6];
      indvar = ans_array[7];
      axis = ans_array[8];
      form.ans =
        "integral(" +
        ans_array[1] +
        ", " +
        indvar +
        ", " +
        start +
        ", " +
        finish +
        ")";
      form.simp =
        "integral(" +
        ans_array[9] +
        ", " +
        indvar +
        ", " +
        start +
        ", " +
        finish +
        ")";
      form.fact =
        "integral(" +
        ans_array[10] +
        ", " +
        indvar +
        ", " +
        start +
        ", " +
        finish +
        ")";
      form.exp =
        "integral(" +
        ans_array[11] +
        ", " +
        indvar +
        ", " +
        start +
        ", " +
        finish +
        ")";
      p1 = ans_array[12];
      p2 = ans_array[13];

      lowert =
        "( (" +
        axis +
        ") / ( (" +
        finish +
        ") ^ (" +
        p1 +
        ") ) ) ^ ( 1/ (" +
        p2 +
        ") )";
      uppert =
        "( (" +
        axis +
        ") / ( (" +
        finish +
        ") ^ (" +
        p2 +
        ") ) ) ^ ( 1/ (" +
        p1 +
        ") )";

      funcLower = Function(indvar, "return " + parseFunction(lower) + ";");
      funcUpper = Function(indvar, "return " + parseFunction(upper) + ";");
      funcLowerT = Function(axis, "return " + parseFunction(lowert) + ";");
      funcUpperT = Function(axis, "return " + parseFunction(uppert) + ";");
    };
    for (var i = 0; i < 3; ++i) {
      allQuestions[i].Correct = false;
      allQuestions[i].Shown = false;
    }
    $("#Bsimplify").prop("disabled", true);
    $("#Bfactor").prop("disabled", true);
    $("#Bexpand").prop("disabled", true);
    $("#INtype").val("-- Select --");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(NewProblemSage));

    funcLower = Function(indvar, "return " + parseFunction(lower) + ";");
    funcUpper = Function(indvar, "return " + parseFunction(upper) + ";");

    if (indvar == "x") {
      xmin = start;
      xmax = finish;
      ymin = Math.min(funcLower(parseInt(start)), funcUpper(parseInt(start)));
      ymax = Math.max(funcLower(parseInt(finish)), funcUpper(parseInt(finish)));
    } else {
      xmin = Math.min(funcLower(parseInt(start)), funcUpper(parseInt(start)));
      xmax = Math.max(funcLower(parseInt(finish)), funcUpper(parseInt(finish)));
      ymin = start;
      ymax = finish;
    }
    if (indvar == "x") {
      indvarMin = xmin;
      indvarMax = xmax;
    } else {
      indvarMin = ymin;
      indvarMax = ymax;
    }
    if (axis == "x") {
      zmax = ymax;
    } else {
      zmax = xmax;
    }

    var plotLowerFunc;
    var plotUpperFunc;

    xmax = Math.ceil(xmax);
    ymax = Math.ceil(ymax);
    zmax = Math.ceil(zmax);

    scene.remove(textx);
    scene.remove(texty);

    var loader = new THREE.FontLoader();

    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function(font) {
        var xLabelGeom = new THREE.TextGeometry("x = " + xmax.toString(), {
          font: font,
          size: 0.5,
          height: 0.2,
          curveSegments: 10,
          material: 0
        });
        var yLabelGeom = new THREE.TextGeometry("y = " + ymax.toString(), {
          font: font,
          size: 0.5,
          height: 0.2,
          curveSegments: 1,
          material: 0
        });
        var zLabelGeom = new THREE.TextGeometry("z = " + zmax.toString(), {
          font: font,
          size: 0.5,
          height: 0.2,
          curveSegments: 1,
          material: 0
        });

        var textMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

        textx = new THREE.Mesh(xLabelGeom, textMat);
        texty = new THREE.Mesh(yLabelGeom, textMat);

        textx.position.set(4.2, -1, 2.7);
        texty.position.set(-0.3, 4.7, 2.2);

        scene.add(textx);
        scene.add(texty);
        loaded = true;
      }
    );

    frame = 0;
    timer = 0;
    wholeFigure.rotation.x = Math.PI / 8;
    wholeFigure.rotation.y = -Math.PI / 6;
    scene.add(wholeFigure);

    var area = PlotBetweenCurves({
      indvar: indvar,
      min: start,
      max: finish,
      funcL: funcLower,
      funcU: funcUpper,
      xmax: xmax,
      ymax: ymax,
      scale: true
    });
    wholeFigure.add(area);

    if (indvar == "x") {
      var tree = MathLex.parse("y=" + lower),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", lowerBoxX, latex]);

      var tree = MathLex.parse("y=" + upper),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", upperBoxX, latex]);

      var tree = MathLex.parse("x=" + indvarMin),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", startBoxX, latex]);

      var tree = MathLex.parse("x=" + indvarMax),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", finishBoxX, latex]);

      var tree = MathLex.parse(axis),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", axisBoxX, latex]);

      $("#TextNewProblemX").prop("hidden", false);
      $("#TextNewProblemY").prop("hidden", true);
    } else {
      var tree = MathLex.parse("x=" + lower),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", lowerBoxY, latex]);

      var tree = MathLex.parse("x=" + upper),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", upperBoxY, latex]);

      var tree = MathLex.parse("y=" + indvarMin),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", startBoxY, latex]);

      var tree = MathLex.parse("y=" + indvarMax),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", finishBoxY, latex]);

      var tree = MathLex.parse(axis),
        latex = MathLex.render(tree, "latex");
      MathJax.Hub.Queue(["Text", axisBoxY, latex]);

      $("#TextNewProblemX").prop("hidden", true);
      $("#TextNewProblemY").prop("hidden", false);
    }

    wholeFigure.remove(activeFrames[frame]);
    frame = 0;
    time = 0;
    play = false;
    forward = true;
    $("#BPlay").prop("hidden", true);
    $("#BPause").prop("hidden", false);
    $("#BReverse").prop("hidden", false);
    $("#BForward").prop("hidden", true);
    $("#loading").prop("hidden", true);
  });

  $("#Hinttype").click(function() {
    $("#reply").val(
      "Try to decide which method without watching the Slice animation."
    );
    $("#reply")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    $("#reply").css("background-color", "orange");
    type.MRbox.val("Hint")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    type.MRbox.css("background-color", "orange");
  });

  $("#Checktype").click(function() {
    var user_ans = $("input[name='INtype']:checked").val();
    if (user_ans == type.ans) {
      $("#reply").val("That's correct!");
      type.MRbox.val("Correct")
        .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
        .addClass("correct-bg");
      type.Correct = true;
      type.MRbox.css("background-color", "#00ff00");
    } else {
      $("#reply").val("Your answer's not quite right. Try again.");
      type.MRbox.val("Incorrect")
        .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
        .addClass("incorrect-bg");
      type.Correct = false;
      type.MRbox.css("background-color", "#ff0000");
    }
  });

  $("#Showtype").click(function() {
    $("#reply").val("Method shown");
    $("input[name='INtype'][value='" + type.ans + "']").prop("checked", true);
    type.MRbox.val("Shown")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("shown-bg");
    type.MRbox.css("background-color", "#ffff00");
  });

  $("#INform").keyup(function() {
    keyupdate(form);
  });

  $("#Hintform").click(function() {
    $("#reply").val(
      "Here is the template. Replace in the integrand and limits."
    );
    $("#reply")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    $("#reply").css("background-color", "orange");
    form.MRbox.val("Hint")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    form.MRbox.css("background-color", "orange");
  });

  $("#Checkform").click(function() {
    check(form, "equiv", indvar);
    if (form.Correct) {
      $("#Bsimplify").prop("disabled", false);
      $("#Bfactor").prop("disabled", false);
      $("#Bexpand").prop("disabled", false);
    }
  });

  $("#Showform").click(function() {
    show(form);
    $("#reply").val("Integral shown");
    $("#Bsimplify").prop("disabled", false);
    $("#Bfactor").prop("disabled", false);
    $("#Bexpand").prop("disabled", false);
  });

  $("#INvol").keyup(function() {
    keyupdate(vol);
  });

  $("#Hintvol").click(function() {
    $("#reply").val("Get out some paper and do the integral.");
    $("#reply")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    $("#reply").css("background-color", "orange");
    vol.MRbox.val("Hint")
      .removeClass("correct-bg warning-bg incorrect-bg shown-bg hint-bg")
      .addClass("hint-bg");
    vol.MRbox.css("background-color", "orange");
  });

  $("#Checkvol").click(function() {
    check(vol, "equiv", indvar);
  });

  $("#Showvol").click(function() {
    show(vol);
    $("#reply").val("Volume shown");
  });

  $("#Bsimplify").click(function() {
    var simp = form.simp;
    $("#INform").val(simp);
    var tree = MathLex.parse(simp),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", form.OUTbox, "\\displaystyle " + latex]);
  });

  $("#Bfactor").click(function() {
    var fact = form.fact;
    var tree = MathLex.parse(fact),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", form.OUTbox, "\\displaystyle " + latex]);
  });

  $("#Bexpand").click(function() {
    var exp = form.exp;
    var tree = MathLex.parse(exp),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", form.OUTbox, "\\displaystyle " + latex]);
  });

  $("#BPlay").click(function() {
    $("#BPlay").prop("hidden", true);
    $("#BPause").prop("hidden", false);
    play = true;
  });
  $("#BPause").click(function() {
    $("#BPlay").prop("hidden", false);
    $("#BPause").prop("hidden", true);
    play = false;
  });
  $("#BStepF").click(function() {
    play = false;
    wholeFigure.remove(activeFrames[frame]);
    frame = (frame + 1) % 24;
    wholeFigure.add(activeFrames[frame]);
    $("#BPlay").prop("hidden", false);
    $("#BPause").prop("hidden", true);
  });
  $("#BStepR").click(function() {
    play = false;
    wholeFigure.remove(activeFrames[frame]);
    frame = (24 + frame - 1) % 24;
    wholeFigure.add(activeFrames[frame]);
    $("#BPlay").prop("hidden", false);
    $("#BPause").prop("hidden", true);
  });
  $("#BForward").click(function() {
    forward = true;
    $("#BForward").prop("hidden", true);
    $("#BReverse").prop("hidden", false);
  });
  $("#BReverse").click(function() {
    forward = false;
    $("#BForward").prop("hidden", false);
    $("#BReverse").prop("hidden", true);
  });

  $("#BRevolve").click(function() {
    $("#loading").prop("hidden", false);
    if (!loadedRev) {
      for (
        thetaMax = Math.PI / 12;
        thetaMax <= 2 * Math.PI;
        thetaMax += Math.PI / 12
      ) {
        var slice = new THREE.Object3D();
        if (indvar == "x") {
          if (axis == "x") {
            // $('#reply').val("var = x\naxis = x");
            funcLowerSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * t1) / xmax;
              var y = (5 * funcLower(t1) * Math.cos(theta1)) / ymax;
              var z = (-5 * funcLower(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * t1) / xmax;
              var y = (5 * funcUpper(t1) * Math.cos(theta1)) / ymax;
              var z = (-5 * funcUpper(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
          } else {
            // $('#reply').val("var = x\naxis = y");
            funcLowerSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * t1 * Math.cos(theta1)) / xmax;
              var y = (5 * funcLower(t1)) / ymax;
              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * t1 * Math.cos(theta1)) / xmax;
              var y = (5 * funcUpper(t1)) / ymax;
              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
          }
        } else {
          if (axis == "x") {
            // $('#reply').val("var = y\naxis = x");
            funcLowerSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * funcLower(t1)) / xmax;
              var y = (5 * t1 * Math.cos(theta1)) / ymax;
              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * funcUpper(t1)) / xmax;
              var y = (5 * t1 * Math.cos(theta1)) / ymax;
              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
          } else {
            // $('#reply').val("var = y\naxis = y");
            funcLowerSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * funcLower(t1) * Math.cos(theta1)) / xmax;
              var y = (5 * t1) / ymax;
              var z = (-5 * funcLower(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finish - start) * t + start;
              var theta1 = thetaMax * theta;
              var x = (5 * funcUpper(t1) * Math.cos(theta1)) / xmax;
              var y = (5 * t1) / ymax;
              var z = (-5 * funcUpper(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
          }
          lowerMatF = new THREE.MeshLambertMaterial({
            color: 0x00ffff,
            side: THREE.FrontSide
          });
          lowerMatB = new THREE.MeshLambertMaterial({
            color: 0x000000,
            side: THREE.BackSide
          });
          upperMatF = new THREE.MeshLambertMaterial({
            color: 0x000000,
            side: THREE.FrontSide
          });
          upperMatB = new THREE.MeshLambertMaterial({
            color: 0xff00ff,
            side: THREE.BackSide
          });
        }
        var lowerGeom = new THREE.ParametricGeometry(funcLowerSurface, 50, 50);
        var upperGeom = new THREE.ParametricGeometry(funcUpperSurface, 50, 50);
        var lowerSurfaceF = new THREE.Mesh(lowerGeom, lowerMatF);
        var lowerSurfaceB = new THREE.Mesh(lowerGeom, lowerMatB);
        var upperSurfaceF = new THREE.Mesh(upperGeom, upperMatF);
        var upperSurfaceB = new THREE.Mesh(upperGeom, upperMatB);
        slice.add(lowerSurfaceF);
        slice.add(lowerSurfaceB);
        slice.add(upperSurfaceF);
        slice.add(upperSurfaceB);
        revolveFrames.push(slice);
      }
      loadedRev = true;
    }
    wholeFigure.remove(activeFrames[frame]);
    frame = 0;
    time = 0;
    activeFrames = revolveFrames;
    forward = true;
    play = true;
    $("#BPlay").prop("hidden", true);
    $("#BPause").prop("hidden", false);
    $("#loading").prop("hidden", true);
    $("#BReverse").prop("hidden", false);
    $("#BForward").prop("hidden", true);
  });
  $("#BSlice").click(function() {
    $("#loading").prop("hidden", false);
    wholeFigure.remove(activeFrames[frame]);
    if (!loadedSlice) {
      for (
        thetaMax = Math.PI / 12;
        thetaMax <= 2 * Math.PI;
        thetaMax += Math.PI / 12
      ) {
        var slice = new THREE.Object3D();
        var funcSurface;
        var rOut;
        var rIn;
        if (indvar == axis) {
          if (axis == "x") {
            var x1 = xmax / 2;
            rIn = funcLower(x1);
            rOut = funcUpper(x1);
            funcSurface = function(t, theta) {
              var theta1 = thetaMax * theta;
              var x = (5 * x1) / xmax;
              var y =
                (5 *
                  (t * (rOut * Math.cos(theta1) - rIn * Math.cos(theta1)) +
                    rIn * Math.cos(theta1))) /
                ymax;
              var z =
                (-5 *
                  (t * (rOut * Math.sin(theta1) - rIn * Math.sin(theta1)) +
                    rIn * Math.sin(theta1))) /
                zmax;
              return new THREE.Vector3(x, y, z);
            };
          } else {
            var y1 = ymax / 2;
            rIn = funcLower(y1);
            rOut = funcUpper(y1);
            funcSurface = function(t, theta) {
              var theta1 = thetaMax * theta;
              var x =
                (5 *
                  (t * (rOut * Math.cos(theta1) - rIn * Math.cos(theta1)) +
                    rIn * Math.cos(theta1))) /
                xmax;
              var y = (5 * y1) / ymax;
              var z =
                (-5 *
                  (t * (rOut * Math.sin(theta1) - rIn * Math.sin(theta1)) +
                    rIn * Math.sin(theta1))) /
                zmax;
              return new THREE.Vector3(x, y, z);
            };
          }
        } else {
          if (axis == "x") {
            var r1 = ymax / 2;
            var xMin = funcUpper(r1);
            var xMax = funcLower(r1);
            funcSurface = function(t, theta) {
              var t1 = t * (xMax - xMin) + xMin;
              var theta1 = thetaMax * theta;
              var x = (5 * t1) / xmax;
              var y = (5 * r1 * Math.cos(theta1)) / ymax;
              var z = (-5 * r1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
          } else {
            var r1 = xmax / 2;
            var yMin = funcUpper(r1);
            var yMax = funcLower(r1);
            funcSurface = function(t, theta) {
              var t1 = t * (yMax - yMin) + yMin;
              var theta1 = thetaMax * theta;
              var x = (5 * r1 * Math.cos(theta1)) / xmax;
              var y = (5 * t1) / ymax;
              var z = (-5 * r1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
          }
        }
        var geom = new THREE.ParametricGeometry(funcSurface, 50, 50);
        var mat = new THREE.MeshLambertMaterial({
          color: 0xffff00,
          side: THREE.DoubleSide
        });
        var surface = new THREE.Mesh(geom, mat);
        slice.add(surface);
        // slice.add(areaBetween);
        sliceFrames.push(slice);
      }
      loadedSlice = true;
    }
    frame = 0;
    time = 0;
    activeFrames = sliceFrames;
    forward = true;
    play = true;
    $("#BPlay").prop("hidden", true);
    $("#BPause").prop("hidden", false);
    $("#loading").prop("hidden", true);
    $("#BReverse").prop("hidden", false);
    $("#BForward").prop("hidden", true);
  });
  $("#BAccum").click(function() {
    $("#loading").prop("hidden", false);
    wholeFigure.remove(activeFrames[frame]);
    if (!loadedAccum) {
      if (indvar == axis) {
        for (
          finishi = start;
          finishi <= finish;
          finishi += (finish - start) / 25
        ) {
          var slice = new THREE.Object3D();
          var lowerMatF;
          var lowerMatB;
          var upperMatF;
          var upperMatB;
          if (axis == "x") {
            funcWasherSurface = function(t, theta) {
              var theta1 = 2 * Math.PI * theta;
              var x = finishi;
              var rIn = funcLower(x);
              var rOut = funcUpper(x);

              x = (5 * x) / xmax;
              var y =
                (5 *
                  (t * (rOut * Math.cos(theta1) - rIn * Math.cos(theta1)) +
                    rIn * Math.cos(theta1))) /
                ymax;
              var z =
                (-5 *
                  (t * (rOut * Math.sin(theta1) - rIn * Math.sin(theta1)) +
                    rIn * Math.sin(theta1))) /
                zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcLowerSurface = function(t, theta) {
              var t1 = (finishi - start) * t + start;
              var theta1 = 2 * Math.PI * theta;
              var x = (5 * t1) / xmax;
              var y = (5 * funcLower(t1) * Math.cos(theta1)) / ymax;
              var z = (-5 * funcLower(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finishi - start) * t + start;
              var theta1 = 2 * Math.PI * theta;
              var x = (5 * t1) / xmax;
              var y = (5 * funcUpper(t1) * Math.cos(theta1)) / ymax;
              var z = (-5 * funcUpper(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            washerMat = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.DoubleSide
            });
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
          } else {
            funcWasherSurface = function(t, theta) {
              var theta1 = 2 * Math.PI * theta;
              var y = finishi;
              var rIn = funcLower(y);
              var rOut = funcUpper(y);

              y = (5 * y) / ymax;
              var x =
                (5 *
                  (t * (rOut * Math.cos(theta1) - rIn * Math.cos(theta1)) +
                    rIn * Math.cos(theta1))) /
                xmax;
              var z =
                (-5 *
                  (t * (rOut * Math.sin(theta1) - rIn * Math.sin(theta1)) +
                    rIn * Math.sin(theta1))) /
                zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcLowerSurface = function(t, theta) {
              var t1 = (finishi - start) * t + start;
              var theta1 = 2 * Math.PI * theta;
              var x = (5 * funcLower(t1) * Math.cos(theta1)) / xmax;
              var y = (5 * t1) / ymax;
              var z = (-5 * funcLower(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var t1 = (finishi - start) * t + start;
              var theta1 = 2 * Math.PI * theta;
              var x = (5 * funcUpper(t1) * Math.cos(theta1)) / xmax;
              var y = (5 * t1) / ymax;
              var z = (-5 * funcUpper(t1) * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            washerMat = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.DoubleSide
            });
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.BackSide
            });
          }
          var washerGeom = new THREE.ParametricGeometry(
            funcWasherSurface,
            50,
            50
          );
          var lowerGeom = new THREE.ParametricGeometry(
            funcLowerSurface,
            50,
            50
          );
          var upperGeom = new THREE.ParametricGeometry(
            funcUpperSurface,
            50,
            50
          );
          var washerSurface = new THREE.Mesh(washerGeom, washerMat);
          var lowerSurfaceF = new THREE.Mesh(lowerGeom, lowerMatF);
          var lowerSurfaceB = new THREE.Mesh(lowerGeom, lowerMatB);
          var upperSurfaceF = new THREE.Mesh(upperGeom, upperMatF);
          var upperSurfaceB = new THREE.Mesh(upperGeom, upperMatB);
          slice.add(washerSurface);
          slice.add(lowerSurfaceF);
          slice.add(lowerSurfaceB);
          slice.add(upperSurfaceF);
          slice.add(upperSurfaceB);
          accumFrames.push(slice);
        }
      } else {
        for (
          finishi = indvarMin;
          finishi <= indvarMax;
          finishi += (indvarMax - indvarMin) / 25
        ) {
          var slice = new THREE.Object3D();
          var lowerMatF;
          var lowerMatB;
          var upperMatF;
          var upperMatB;
          if (axis == "x") {
            funcCylinderSurface = function(t, theta) {
              var r1 = finishi;
              var xMin = funcUpper(r1);
              var xMax = funcLower(r1);

              var theta1 = 2 * Math.PI * theta;
              var y = (5 * r1 * Math.cos(theta1)) / ymax;
              var x = (xMax - xMin) * t + xMin;
              x = (5 * x) / xmax;
              var z = (-5 * r1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcLowerSurface = function(t, theta) {
              var r1 = finishi;

              var x = funcLower(r1) * t;
              var t1 = funcLowerT(x);
              x = (5 * x) / xmax;

              var theta1 = 2 * Math.PI * theta;
              var y = (5 * t1 * Math.cos(theta1)) / ymax;

              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var r1 = finishi;

              var x = funcUpper(r1) * t;
              var t1 = funcUpperT(x);
              x = (5 * x) / xmax;

              var theta1 = 2 * Math.PI * theta;
              var y = (5 * t1 * Math.cos(theta1)) / ymax;

              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            cylinderMat = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.DoubleSide
            });
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.BackSide
            });
          } else {
            funcCylinderSurface = function(t, theta) {
              var r1 = finishi;
              var yMin = funcUpper(r1);
              var yMax = funcLower(r1);

              var theta1 = 2 * Math.PI * theta;
              var x = (5 * r1 * Math.cos(theta1)) / xmax;
              var y = (yMax - yMin) * t + yMin;
              y = (5 * y) / ymax;
              var z = (-5 * r1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcLowerSurface = function(t, theta) {
              var r1 = finishi;

              var y = funcLower(r1) * t;
              var t1 = funcLowerT(y);
              y = (5 * y) / ymax;

              var theta1 = 2 * Math.PI * theta;
              var x = (5 * t1 * Math.cos(theta1)) / xmax;

              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            funcUpperSurface = function(t, theta) {
              var r1 = finishi;

              var y = funcUpper(r1) * t;
              var t1 = funcUpperT(y);
              y = (5 * y) / ymax;

              var theta1 = 2 * Math.PI * theta;
              var x = (5 * t1 * Math.cos(theta1)) / xmax;

              var z = (-5 * t1 * Math.sin(theta1)) / zmax;
              return new THREE.Vector3(x, y, z);
            };
            cylinderMat = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.DoubleSide
            });
            lowerMatF = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.FrontSide
            });
            lowerMatB = new THREE.MeshLambertMaterial({
              color: 0x00ffff,
              side: THREE.BackSide
            });
            upperMatF = new THREE.MeshLambertMaterial({
              color: 0xff00ff,
              side: THREE.FrontSide
            });
            upperMatB = new THREE.MeshLambertMaterial({
              color: 0x000000,
              side: THREE.BackSide
            });
          }
          var cylinderGeom = new THREE.ParametricGeometry(
            funcCylinderSurface,
            50,
            50
          );
          var lowerGeom = new THREE.ParametricGeometry(
            funcLowerSurface,
            50,
            50
          );
          var upperGeom = new THREE.ParametricGeometry(
            funcUpperSurface,
            50,
            50
          );
          var cylinderSurface = new THREE.Mesh(cylinderGeom, cylinderMat);
          var lowerSurfaceF = new THREE.Mesh(lowerGeom, lowerMatF);
          var lowerSurfaceB = new THREE.Mesh(lowerGeom, lowerMatB);
          var upperSurfaceF = new THREE.Mesh(upperGeom, upperMatF);
          var upperSurfaceB = new THREE.Mesh(upperGeom, upperMatB);
          slice.add(cylinderSurface);
          slice.add(lowerSurfaceF);
          slice.add(lowerSurfaceB);
          slice.add(upperSurfaceF);
          slice.add(upperSurfaceB);
          accumFrames.push(slice);
        }
      }
      loadedAccum = true;
    }
    frame = 0;
    time = 0;
    activeFrames = accumFrames;
    forward = true;
    play = true;
    $("#BPlay").prop("hidden", true);
    $("#BPause").prop("hidden", false);
    $("#loading").prop("hidden", true);
    $("#BReverse").prop("hidden", false);
    $("#BForward").prop("hidden", true);
  });

  requestAnimationFrame(render);

  // $('#reply').val(min);

  function render() {
    controls.update();
    lightpt.position.copy(camera.position);

    if (loaded) {
      textx.rotation.copy(camera.rotation);
      texty.rotation.copy(camera.rotation);

      if (loadedRev || loadedAccum || loadedSlice) {
        if (play) {
          timer = (timer + 1) % 7;
          if (timer == 0) {
            wholeFigure.remove(activeFrames[frame]);
            if (forward) {
              frame = (frame + 1) % 24;
            } else {
              frame = (24 + frame - 1) % 24;
            }
            wholeFigure.add(activeFrames[frame]);
          }
        }
      }
    }

    // $('#reply').val(timer);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
});
