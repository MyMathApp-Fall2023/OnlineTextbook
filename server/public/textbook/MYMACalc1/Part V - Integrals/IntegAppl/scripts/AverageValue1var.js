$(document).ready(function() {
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("Plot"),
    antialias: true
  });
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(350, 350);

  var camera = new THREE.OrthographicCamera(-1, 6, 6, -1, 0.1, 3000);
  camera.position.z = 1;
  var scene = new THREE.Scene();

  var grid, functionline, userline, avgline, textx, texty;
  var a, b, c, p1, f, fmax, domain, integval, avg, roundedavg, integstr, avgstr;
  var funcDisplayBox,
    domainDisplayBox,
    baDisplayBox,
    integDisplayBox,
    userintegDisplayBox,
    avgDisplayBox,
    avDisplayBox;
  MathJax.Hub.Queue(function() {
    funcDisplayBox = MathJax.Hub.getAllJax("funcdisplay")[0];
    domainDisplayBox = MathJax.Hub.getAllJax("domaindisplay")[0];
    baDisplayBox = MathJax.Hub.getAllJax("userbadisplay")[0];
    integDisplayBox = MathJax.Hub.getAllJax("integdisplay")[0];
    userintegDisplayBox = MathJax.Hub.getAllJax("userintegdisplay")[0];
    avgDisplayBox = MathJax.Hub.getAllJax("avgdisplay")[0];
    avDisplayBox = MathJax.Hub.getAllJax("avdisplay")[0];
  });
  MathJax.Hub.processSectionDelay = 0;

  requestAnimationFrame(render);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  $("#BNewProblem").click(function(evt) {
    $("#BNewProblem").prop("disabled", true);
    var NewProblemSage =
      "from random import randint\n" +
      "x = var('x')\n" +
      "a = Integer(randint(0,2))\n" +
      "b = Integer(randint(a+2,5))\n" +
      "c = Integer(randint(1,5))\n" +
      "Powers = [1/2, 1/3, 2/3, 2, 3, 4]\n" +
      "p1 = Powers[randint(0,5)]\n" +
      "f = c/b * x^(p1)\n" +
      "fmax = c/b * b^(p1)\n" +
      "int = integral(f,x,a,b)\n" +
      "avg = int / (b-a)\n" +
      "print(a)\n" +
      "print(b)\n" +
      "print(c)\n" +
      "print(p1)\n" +
      "print(f)\n" +
      "print(fmax)\n" +
      "print(RR(fmax))\n" +
      "print('[%d,%d]' % (a,b))\n" +
      "print(int)\n" +
      "print(avg.simplify_full())\n" +
      "print(RR(avg))";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.response);
      var data_string = data.stdout;
      var data_array = data_string.split("\n");

      a = data_array[0];
      b = data_array[1];
      c = data_array[2];
      p1 = data_array[3];
      f = data_array[4];
      fmax = data_array[5];
      roundedFmax = data_array[6];
      domain = data_array[7];
      integval = data_array[8];
      avg = data_array[9];
      roundedavg = data_array[10];
      integstr = "integral(" + f + ",x,a,b)";
      avgstr = "1/(b-a)*" + integstr;

      var tree = MathLex.parse(f),
        latex = MathLex.render(tree, "latex");
      latex = "\\displaystyle\\; f(x)=" + latex;
      MathJax.Hub.Queue(["Text", funcDisplayBox, latex]);
      var tree = MathLex.parse(domain),
        latex = MathLex.render(tree, "latex");
      latex = "\\displaystyle\\; [a,b]=" + latex;
      MathJax.Hub.Queue(["Text", domainDisplayBox, latex]);

      // var func = Function(
      //   'x',
      //   'return (' + c + ' / Math.pow(' + b + ',' + p1 + ')) * Math.pow(x,' + p1 + ');'
      // );

      var funcstr = parseFunction(f);
      var plotFunc = Function("x", "return " + funcstr + ";");

      var functrans = function(x) {
        var y = plotFunc(x);
        return new THREE.Vector3(x, y, 0);
      };

      var logFmax = Math.floor(Math.log10(parseFloat(roundedFmax)));
      var ymax =
        Math.ceil(parseFloat(roundedFmax) / Math.pow(10, logFmax)) *
        Math.pow(10, logFmax);
      var xmax = parseInt(b) + 1;

      // console.log(roundedFmax);
      // console.log(Math.log10(parseFloat(roundedFmax)));
      // console.log(logFmax);
      // console.log(ymax);

      camera = new THREE.OrthographicCamera(
        -0.2 * xmax,
        1.2 * xmax,
        1.2 * ymax,
        -0.2 * ymax,
        0.1,
        3000
      );
      camera.position.z = 1;

      grid = GridMake2D({
        xmin: 0,
        xmax: xmax,
        ymin: 0,
        ymax: ymax,
        crossx: xmax,
        crossy: 10
      });
      scene.add(grid);

      functionline = PlotPoints2D({
        func: functrans,
        xmin: parseInt(a),
        xmax: parseInt(b),
        ymin: 0,
        ymax: parseInt(fmax),
        step: 0.01
      });
      scene.add(functionline);

      $("#slider").prop("max", ymax);

      // var loader = new THREE.FontLoader();
      //
      // loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
      // 	var xLabelGeom = new THREE.TextGeometry( "x = " + xmax.toString(), {
      // 		font: font,
      // 		size: 0.5,
      // 		height: 0.2,
      // 		curveSegments: 10,
      //     material: 0
      // 	});
      //   var yLabelGeom = new THREE.TextGeometry( "y = " + ymax.toString(), {
      // 		font: font,
      // 		size: 0.5,
      // 		height: 0.2,
      // 		curveSegments: 1,
      //     material: 0
      // 	});
      //
      //   var textMat = new THREE.MeshBasicMaterial({color: 0x000000});
      //
      //   textx = new THREE.Mesh(xLabelGeom, textMat);
      //   texty = new THREE.Mesh(yLabelGeom, textMat);
      //
      //   textx.position.set(xmax, -0.1 * ymax, 0);
      //   texty.position.set(0, 1.1 * ymax, 0);
      //
      //   scene.add(textx);
      //   scene.add(texty);
      //   loaded = true;
      //   console.log("k");
      // });
    };

    scene.remove(userline);
    scene.remove(functionline);
    scene.remove(avgline);
    scene.remove(grid);
    // scene.remove(textx);
    // scene.remove(texty);
    $("#slider").val(0);
    $("#userval").val(0);
    $("#userba").val("");
    $("#userint").val("");
    $("#useravg").val("");
    $("#MRba")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg");
    $("#MRint")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg");
    $("#MRavg")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#reply")
      .val("")
      .removeClass("warning-bg");

    MathJax.Hub.Queue(["Text", baDisplayBox, ""]);
    MathJax.Hub.Queue(["Text", userintegDisplayBox, ""]);
    MathJax.Hub.Queue(["Text", avDisplayBox, ""]);

    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(NewProblemSage));
    setTimeout(function() {
      $("#BNewProblem").prop("disabled", false);
    }, 1500);
  });

  $("#Hintavg").click(function(evt) {
    $("#reply").val("f_\\text{ave} = \\dfrac{1}{b-a}\\int_a^b f(x)\\,dx");
    $("#MRavg")
      .val("Hint")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg")
      .addClass("hint-bg");
  });

  $("#Checkba").click(function(evt) {
    var userba = $("#userba").val();

    var CheckbaSage =
      "if (" +
      b +
      "-" +
      a +
      ")-(" +
      userba +
      ")==0:\n" +
      "    print(true)\n" +
      "else:\n" +
      "    print(false)\n";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", true);
    xhr.onload = function() {
      var isCorrect = JSON.parse(xhr.response).stdout;

      if (isCorrect == "True\n") {
        $("#reply").val("Great job! Now move onto the integral.");
        $("#MRba")
          .val("Correct")
          .removeClass("warning-bg shown-bg incorrect-bg")
          .addClass("correct-bg");
      } else if (isCorrect == "False\n") {
        $("#reply").val(
          "Something's not quite right. Check your answer again."
        );
        $("#MRba")
          .val("Incorrect")
          .removeClass("warning-bg shown-bg correct-bg")
          .addClass("incorrect-bg");
      } else {
        $("#reply").val(
          "Oops. We didn't quite understand your answer. Please check your syntax and try again."
        );
        $("#MRba")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
      }
    };

    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(CheckbaSage));
  });

  $("#Checkint").click(function(evt) {
    var userint = $("#userint").val();

    var CheckintSage =
      "if abs( (" +
      integval +
      ")-(" +
      userint +
      ") ) < 0.001:\n" +
      "    print(true)\n" +
      "else:\n" +
      "    print(false)\n";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", true);
    xhr.onload = function() {
      var isCorrect = JSON.parse(xhr.response).stdout;

      if (isCorrect == "True\n") {
        $("#reply")
          .val("Nice work! You can now compute the average value.")
          .removeClass("warning-bg");
        $("#MRint")
          .val("Correct")
          .removeClass("shown-bg warning-bg incorrect-bg")
          .addClass("correct-bg");
      } else if (isCorrect == "False\n") {
        $("#reply")
          .val("You don't quite have the correct answer. Try it again.")
          .removeClass("warning-bg");
        $("#MRint")
          .val("Incorrect")
          .removeClass("shown-bg warning-bg correct-bg")
          .addClass("incorrect-bg");
      } else {
        $("#reply")
          .val(
            "Oops. We didn't quite understand your answer. Please check your syntax and try again."
          )
          .addClass("warning-bg");
        $("#MRint")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
      }
    };

    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(CheckintSage));
  });

  $("#Checkavg").click(function(evt) {
    var useravg = $("#useravg").val();

    var CheckavgSage =
      "if abs( (" +
      avg +
      ")-(" +
      useravg +
      ") ) < 0.001:\n" +
      "    print(true)\n" +
      "else:\n" +
      "    print(false)\n" +

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", true);
    xhr.onload = function() {
      var isCorrect = JSON.parse(xhr.response).stdout;

      scene.remove(avgline);
      if (isCorrect == "True\n") {
        function userLineFunc(x) {
          return new THREE.Vector3(x, 0, 0);
        }

        avgline = PlotPoints2D({
          func: userLineFunc,
          xmin: parseInt(a),
          xmax: parseInt(b),
          ymin: 0,
          ymax: 5,
          step: 0.01,
          colorline: 0x00ff00
        });
        avgline.position.y = parseFloat(roundedavg);
        scene.add(avgline);

        $("#test").val(roundedavg);
        $("#reply")
          .val(
            "Awesome! See how the average value compares to the one you guessed in Step 1. " +
              "Then you can try a new problem."
          )
          .removeClass("warning-bg");
        $("#MRavg")
          .val("Correct")
          .removeClass("shown-bg warning-bg incorrect-bg")
          .addClass("correct-bg");
      } else if (isCorrect == "False\n") {
        $("#reply")
          .val("Your answer isn't quite right. Please try again.")
          .removeClass("warning-bg");
        $("#MRavg")
          .val("Incorrect")
          .removeClass("shown-bg warning-bg correct-bg")
          .addClass("incorrect-bg");
      } else {
        $("#reply")
          .val(
            "Oops. We didn't quite understand your answer. Please check your syntax and try again."
          )
          .addClass("warning-bg");
        $("#MRavg")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
      }
    };

    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(CheckavgSage));
  });

  $("#Showba").click(function(evt) {
    $("#userba").val(b - a);
    $("#MRba")
      .val("Shown")
      .removeClass("correct-bg warning-bg incorrect-bg")
      .addClass("shown-bg");
    $("#reply")
      .val("Width of the interval shown.")
      .removeClass("warning-bg");
    var tree = MathLex.parse((b - a).toString()),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", baDisplayBox, latex]);
  });

  $("#Showint").click(function(evt) {
    $("#userint").val(integval);
    $("#MRint")
      .val("Shown")
      .removeClass("correct-bg warning-bg incorrect-bg")
      .addClass("shown-bg");
    $("#reply")
      .val("Integral shown.")
      .removeClass("warning-bg");
    var tree = MathLex.parse(integval),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", userintegDisplayBox, latex]);
  });

  $("#Showavg").click(function(evt) {
    $("#useravg").val(avg);
    $("#MRavg")
      .val("Shown")
      .removeClass("correct-bg warning-bg incorrect-bg")
      .addClass("shown-bg");
    $("#reply")
      .val(
        "Average value shown. See how the computed value compares to the one you guessed in Step 1."
      )
      .removeClass("warning-bg");
    var tree = MathLex.parse(avg),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", avDisplayBox, latex]);

    function userLineFunc(x) {
      return new THREE.Vector3(x, 0, 0);
    }
    scene.remove(avgline);

    avgline = PlotPoints2D({
      func: userLineFunc,
      xmin: parseInt(a),
      xmax: parseInt(b),
      ymin: 0,
      ymax: 5,
      step: 0.01,
      colorline: 0x00ff00
    });
    avgline.position.y = parseFloat(roundedavg);
    scene.add(avgline);
  });

  $("#userval").change(function(evt) {
    scene.remove(userline);
    var target = $(this).val();
    $("#slider").val(target);

    function userLineFunc(x) {
      return new THREE.Vector3(x, 0, 0);
    }

    userline = PlotPoints2D({
      func: userLineFunc,
      xmin: parseInt(a),
      xmax: parseInt(b),
      ymin: 0,
      ymax: 5,
      step: 0.01,
      colorline: 0x00dddd
    });
    userline.position.y = target;
    scene.add(userline);
  });

  $("#slider").on("input", function() {
    scene.remove(userline);
    var target = $(this).val();
    $("#userval").val(target);

    function userLineFunc(x) {
      return new THREE.Vector3(x, 0, 0);
    }
    userline = PlotPoints2D({
      func: userLineFunc,
      xmin: parseInt(a),
      xmax: parseInt(b),
      ymin: 0,
      ymax: 5,
      step: 0.01,
      colorline: 0x00dddd
    });
    userline.position.y = target;
    scene.add(userline);
  });

  $("#userba").keyup(function(evt) {
    var math = $(this).val();
    var tree = MathLex.parse(math),
      latex = MathLex.render(tree, "latex");
    latex = "\\displaystyle " + latex;
    MathJax.Hub.Queue(["Text", baDisplayBox, latex]);
  });
  $("#userint").keyup(function(evt) {
    var math = $(this).val();
    var tree = MathLex.parse(math),
      latex = MathLex.render(tree, "latex");
    latex = "\\displaystyle " + latex;
    MathJax.Hub.Queue(["Text", userintegDisplayBox, latex]);
  });
  $("#useravg").keyup(function(evt) {
    var math = $(this).val();
    var tree = MathLex.parse(math),
      latex = MathLex.render(tree, "latex");
    latex = "\\displaystyle " + latex;
    MathJax.Hub.Queue(["Text", avDisplayBox, latex]);
  });
});
