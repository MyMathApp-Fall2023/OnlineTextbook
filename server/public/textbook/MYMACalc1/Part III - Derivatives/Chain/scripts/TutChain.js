$(document).ready(function () {
  window.onload = function () { //Clear Reply Boxes on page load/reload
    $("#Reply_fu").val("");
    $("#Reply_gx").val("");
    $("#Reply_fpu").val("");
    $("#Reply_gpx").val("");
    $("#Reply_fpgx").val("");
    $("#Reply_fogpx").val("");
  }
  var formula_fog, //define local variables for LaTeX objects
    latex_fu,
    latex_gx,
    latex_fpu,
    latex_gpx,
    latex_fpgx,
    latex_fogpx,
    latex_dfog;
  MathJax.Hub.Queue(function () { //Assign All Jax from element ids to corresponding variables

    formula_fog = MathJax.Hub.getAllJax("Formula_fog")[0];
    latex_fu = MathJax.Hub.getAllJax("Latex_fu")[0];
    latex_gx = MathJax.Hub.getAllJax("Latex_gx")[0];
    latex_fpu = MathJax.Hub.getAllJax("Latex_fpu")[0];
    latex_gpx = MathJax.Hub.getAllJax("Latex_gpx")[0];
    latex_fpgx = MathJax.Hub.getAllJax("Latex_fpgx")[0];
    latex_fogpx = MathJax.Hub.getAllJax("Latex_fogpx")[0];
    latex_dfog = MathJax.Hub.getAllJax("Latex_dfog")[0];
  });
  MathJax.Hub.processSectionDelay = 0; //Set process delay to 0
  $(".has-refresh").click(async function (evt) { //Any button with class has-refresh will execute the below code once pressed
    $(".has-refresh").prop("disabled", true); // Disable the button. We don't want to do a DoS attack on the sage server!
    $(".toBeToggled").hide(); //Hide all dropdowns
    var NewProblemSage =
      /*
      Sage Code (Python) which:
      1) assigns variables as being symbols x and u
      2) selects non-inverse functions from arrays of functions that can be used
      3) assigns values to answers
      4) Adds parentheses to sin(x) or cos(x) if and only if e^x is the outer function
      5) Replaces log with ln for better readability.
      6) Returns answers (with \n or newlines) in the body of the response
      */
      "from random import randint\n" + //Imports Random Integer function from random number library
      "x = var('x')\n" +
      "u = var('u')\n" +
      "aselect = randint(0,4)\n" +
      "bselect = randint(0,4)\n" +
      "while aselect == 4 and bselect == 4:\n" +
      " aselect = randint[0,4]\n" +
      " bselect = randint[0,4]\n" +
      "while aselect == 1 and bselect == 0:\n" +
      " aselect = randint[0,4]\n" +
      " bselect = randint[0,4]\n" +
      "while aselect == 0 and bselect == 1:\n" +
      " aselect = randint[0,4]\n" +
      " bselect = randint[0,4]\n" +
      "Coeffs = [-4,-3,-2,-1,2,3,4]\n" +
      "c1 = Coeffs[randint(0,6)]\n" +
      "Powers = [1/2, 1/3, 2/3, 1/4, 3/4, 1, 2, 3, 4]\n" +
      "p1 = Powers[randint(0,8)]\n" +
      "Innerval = [exp(x), ln(x, hold=True), sin(x), cos(x), c1*x^p1]\n" +
      "Innergx = Innerval[bselect]\n" +
      "Innergpx = Innergx.diff(x)\n" +
      "Outerval = [exp(u), ln(u, hold=True), sin(u), cos(u), c1*u^p1]\n" +
      "Outerval1 = [exp(Innergx, hold=True), ln(Innergx, hold=True), sin(Innergx, hold=True), cos(Innergx, hold=True), c1*Innergx^p1]\n" +
      "Outerfu = Outerval[aselect]\n" +
      "fogx = Outerval1[aselect]\n" +
      "Outerfpu = Outerfu.diff(u)\n" +
      "fpgxval = [exp(Innergx), Innergx/x, cos(Innergx), -sin(Innergx), p1*c1*Innergx^(p1-1)]\n" +
      "Outerfpgx = fpgxval[aselect]\n" +
      "fogpx = Outerfpgx*Innergpx\n" +
      "if aselect == 0 and bselect == 2:\n" +
      " fogx = str(fogx).replace('sin(x)', '(sin(x))')\n" +
      " Outerfpgx = str(Outerfpgx).replace('sin(x)', '(sin(x))')\n" +
      " fogpx = str(fogpx).replace('sin(x)', '(sin(x))')\n" +
      "elif aselect == 0 and bselect == 3:\n" +
      " fogx = str(fogx).replace('cos(x)', '(cos(x))')\n" +
      " Outerfpgx = str(Outerfpgx).replace('cos(x)', '(cos(x))')\n" +
      " fogpx = str(fogpx).replace('cos(x)', '(cos(x))')\n" +
      "else:\n" +
      " fogx = str(fogx)\n" +
      " Outerfpgx = str(Outerfpgx)\n" +
      " fogpx = str(fogpx)\n" +
      "print(str(fogx).replace('log', 'ln'))\n" +
      "print(str(Outerfu).replace('log', 'ln'))\n" +
      "print(str(Innergx).replace('log', 'ln'))\n" +
      "print(str(Outerfpu).replace('log', 'ln'))\n" +
      "print(str(Innergpx).replace('log', 'ln'))\n" +
      "print(str(Outerfpgx).replace('log', 'ln'))\n" +
      "print(str(fogpx).replace('log', 'ln'))";
    /*
    Assign received data to an array, split by newlines (\n), and assign variables to the values given from
    the print statements in the Sage Code.
    */
    const data = await postData(NewProblemSage)
    var data_string = data.stdout;
    var data_array = data_string.split("\n");
    f = data_array[0];
    outerfu = data_array[1];
    innergx = data_array[2];
    outerfpu = data_array[3];
    innergpx = data_array[4];
    fpgx = data_array[5];
    fogpx = data_array[6];

    var tree = MathLex.parse(f),
      latex = MathLex.render(tree, "latex");
    latex = "\\displaystyle\\; (f\\circ g)(x)=" + latex;
    MathJax.Hub.Queue(["Text", formula_fog, latex]); //Render the given function on the webpage

    $("#Input_fu").val(""); //Clear all texts and colors (classes) from Input Text Boxes/Replies
    $("#Input_gx").val("");
    $("#Input_fpu").val("");
    $("#Input_gpx").val("");
    $("#Input_fpgx").val("");
    $("#Input_fogpx").val("");
    $("#Reply_fu")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#Reply_gx")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#Reply_fpu")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#Reply_gpx")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#Reply_fpgx")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    $("#Reply_fogpx")
      .val("")
      .removeClass("shown-bg correct-bg incorrect-bg warning-bg hint-bg");
    MathJax.Hub.Queue(["Text", latex_fu, ""]); //Clear LaTeX boxes
    MathJax.Hub.Queue(["Text", latex_gx, ""]);
    MathJax.Hub.Queue(["Text", latex_fpu, ""]);
    MathJax.Hub.Queue(["Text", latex_gpx, ""]);
    MathJax.Hub.Queue(["Text", latex_fpgx, ""]);
    MathJax.Hub.Queue(["Text", latex_fogpx, ""]);
    setTimeout(function () {
      $(".has-refresh").prop("disabled", false); //Enable the button
    }, 1500);
  });

  // Example POST method implementation for any function:
  async function postData(CheckfuSage) {
    const response = await fetch("https://sagecell.sagemath.org/service",
      {
        method: "POST",
        body: new URLSearchParams({
          code: NewProblemSage,
        }),
      });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  $("#BCheck_fu").click(async function (evt) { //Whenever Button BCheck_fu is clicked, execute an asynchronous function:
    $("#check-tmp-fu").remove(); //Clear any text already in Dropdown
    var inputfu = $("#Input_fu").val(); //Assign variable to input text
    var CheckfuSage =
      //Sage Code which checks whether student input = the correct answer, and prints T/F depending on the outcome.
      "u = var('u')\n" +
      "if " +
      outerfu + "==" + inputfu +
      ":\n" +
      " print(true)\n" +
      "else:\n" +
      " print(false)";
    $("#Check_fu")
      .append("<p id='check-tmp-fu'>Loading...</p>");
    const data = await postData(CheckfuSage)
    isCorrect = data.stdout;
    if (isCorrect == "True\n") {
      $("#check-tmp-fu").remove();
      $("#Reply_fu")
        .val("Correct")
        .removeClass("warning-bg shown-bg incorrect-bg")
        .addClass("correct-bg");
      $("#Check_fu")
        .append("<p id='check-tmp-fu'>Great Job! Now move on to the next question!</p>");
    } else if (isCorrect == "False\n") {
      $("#check-tmp-fu").remove();
      $("#Reply_fu")
        .val("Incorrect")
        .removeClass("warning-bg shown-bg correct-bg")
        .addClass("incorrect-bg");
      $("#Check_fu")
        .append("<p id='check-tmp-fu'>Something's not quite right. Check your answer again.</p>");
    } else {
      $("#check-tmp-fu").remove();
      if ($.trim($("#Input_fu").val()).length == 0) { //Checks for empty/whitespace textbox
        $("#Reply_fu")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_fu")
          .append("<p id='check-tmp-fu'>Please enter your answer into the text box.</p>");
      } else { //Can't understand syntax
        $("#Reply_fu")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_fu")
          .append("<p id='check-tmp-fu'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
      }
    }
  });

  // Example POST method implementation for any (check) function:
  async function postData(CheckfuSage) {
    const response = await fetch("https://sagecell.sagemath.org/service",
      {
        method: "POST",
        body: new URLSearchParams({
          code: CheckfuSage,
        }),
      });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  $("#BCheck_gx").click(async function (evt) {
    $("#check-tmp-gx").remove();
    var inputgx = $("#Input_gx").val();
    var CheckgxSage =
      "x = var('x')\n" +
      "if " +
      innergx + "==" + inputgx +
      ":\n" +
      " print(true)\n" +
      "else:\n" +
      " print(false)";
    $("#Check_gx")
      .append("<p id='check-tmp-gx'>Loading...</p>");
    const data = await postData(CheckgxSage)
    isCorrect = data.stdout;
    if (isCorrect == "True\n") {
      $("#check-tmp-gx").remove();
      $("#Reply_gx")
        .val("Correct")
        .removeClass("warning-bg shown-bg incorrect-bg")
        .addClass("correct-bg");
      $("#Check_gx")
        .append("<p id='check-tmp-gx'>Great Job! Now move on to the next question!</p>");
    } else if (isCorrect == "False\n") {
      $("#check-tmp-gx").remove();
      $("#Reply_gx")
        .val("Incorrect")
        .removeClass("warning-bg shown-bg correct-bg")
        .addClass("incorrect-bg");
      $("#Check_gx")
        .append("<p id='check-tmp-gx'>Something's not quite right. Check your answer again.</p>");
    } else {
      $("#check-tmp-gx").remove();
      if ($.trim($("#Input_gx").val()).length == 0) { //Checks for empty/whitespace textbox
        $("#Reply_gx")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_gx")
          .append("<p id='check-tmp-gx'>Please enter your answer into the text box.</p>");
      } else { //Computer can't understand syntax
        $("#Reply_gx")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_gx")
          .append("<p id='check-tmp-gx'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
      }
    }
  });

  // Example POST method implementation for any (check) function:
  async function postData(CheckgxSage) {
    const response = await fetch("https://sagecell.sagemath.org/service",
      {
        method: "POST",
        body: new URLSearchParams({
          code: CheckgxSage,
        }),
      });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  $("#BCheck_fpu").click(async function (evt) {
    $("#check-tmp-fpu").remove();
    var inputfpu = $("#Input_fpu").val();
    var CheckfpuSage =
      "u = var('u')\n" +
      "if " +
      outerfpu + "==" + inputfpu +
      ":\n" +
      " print(true)\n" +
      "else:\n" +
      " print(false)";
    $("#Check_fpu")
      .append("<p id='check-tmp-fpu'>Loading...</p>");
    const data = await postData(CheckfpuSage)
    isCorrect = data.stdout;
    if (isCorrect == "True\n") {
      $("#check-tmp-fpu").remove();
      $("#Reply_fpu")
        .val("Correct")
        .removeClass("warning-bg shown-bg incorrect-bg")
        .addClass("correct-bg");
      $("#Check_fpu")
        .append("<p id='check-tmp-fpu'>Great Job! Now move on to the next question!</p>");
    } else if (isCorrect == "False\n") {
      $("#check-tmp-fpu").remove();
      $("#Reply_fpu")
        .val("Incorrect")
        .removeClass("warning-bg shown-bg correct-bg")
        .addClass("incorrect-bg");
      $("#Check_fpu")
        .append("<p id='check-tmp-fpu'>Something's not quite right. Check your answer again.</p>");
    } else {
      $("#check-tmp-fpu").remove();
      if ($.trim($("#Input_fpu").val()).length == 0) { //Checks for empty/whitespace textbox
        $("#Reply_fpu")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_fpu")
          .append("<p id='check-tmp-fpu'>Please enter your answer into the text box.</p>");
      } else { //Can't understand syntax
        $("#Reply_fpu")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_fpu")
          .append("<p id='check-tmp-fpu'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
      }
    }
  });

  async function postData(CheckfpuSage) {
    const response = await fetch("https://sagecell.sagemath.org/service",
      {
        method: "POST",
        body: new URLSearchParams({
          code: CheckfpuSage,
        }),
      });
    return response.json();
  }

  $("#BCheck_gpx").click(async function (evt) {
    $("#check-tmp-gpx").remove();
    var inputgpx = $("#Input_gpx").val();
    var CheckgpxSage =
      "u = var('u')\n" +
      "if " +
      innergpx + "==" + inputgpx +
      ":\n" +
      " print(true)\n" +
      "else:\n" +
      " print(false)";
    $("#Check_fu")
      .append("<p id='check-tmp-fu'>Loading...</p>");
    const data = await postData(CheckgpxSage)
    isCorrect = data.stdout;
    if (isCorrect == "True\n") {
      $("#check-tmp-gpx").remove();
      // $("#Reply").val("Great job! Now move onto the integral.");
      $("#Reply_gpx")
        .val("Correct")
        .removeClass("warning-bg shown-bg incorrect-bg")
        .addClass("correct-bg");
      $("#Check_gpx")
        .append("<p id='check-tmp-gpx'>Great Job! Now move on to the next question!</p>");
    } else if (isCorrect == "False\n") {
      $("#check-tmp-gpx").remove();
      $("#Reply_gpx")
        .val("Incorrect")
        .removeClass("warning-bg shown-bg correct-bg")
        .addClass("incorrect-bg");
      $("#Check_gpx")
        .append("<p id='check-tmp-gpx'>Something's not quite right. Check your answer again.</p>");
    } else {
      $("#check-tmp-gpx").remove();
      if ($.trim($("#Input_gpx").val()).length == 0) { //Checks for empty/whitespace textbox
        $("#Reply_gpx")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_gpx")
          .append("<p id='check-tmp-gpx'>Please enter your answer into the text box.</p>");
      } else { //Can't understand syntax
        $("#Reply_gpx")
          .val("Warning")
          .removeClass("shown-bg correct-bg incorrect-bg")
          .addClass("warning-bg");
        $("#Check_gpx")
          .append("<p id='check-tmp-gpx'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
      }
    }
});

// Example POST method implementation for any (check) function:
async function postData(CheckgpxSage) {
  const response = await fetch("https://sagecell.sagemath.org/service",
    {
      method: "POST",
      body: new URLSearchParams({
        code: CheckgpxSage,
      }),
    });
  return response.json(); // parses JSON response into native JavaScript objects
}

$("#BCheck_fpgx").click(function (evt) {
  $("#check-tmp-fpgx").remove();
  var inputfpgx = $("#Input_fpgx").val();
  var CheckfpgxSage =
    "u = var('u')\n" +
    "if " +
    fpgx + "==" + inputfpgx +
    ":\n" +
    " print(true)\n" +
    "else:\n" +
    " print(false)";
  fetch("https://sagecell.sagemath.org/service",
    {
      method: "POST",
      body: new URLSearchParams({
        code: CheckfpgxSage,
      }),
    })
    .then(response => response.json())
    .then(data => {
      isCorrect = data.stdout;
      if (isCorrect == "True\n") {
        $("#Reply_fpgx")
          .val("Correct")
          .removeClass("warning-bg shown-bg incorrect-bg")
          .addClass("correct-bg");
        $("#Check_fpgx")
          .append("<p id='check-tmp-fpgx'>Great Job! Now move on to the next question!</p>");
      } else if (isCorrect == "False\n") {
        $("#Reply_fpgx")
          .val("Incorrect")
          .removeClass("warning-bg shown-bg correct-bg")
          .addClass("incorrect-bg");
        $("#Check_fpgx")
          .append("<p id='check-tmp-fpgx'>Something's not quite right. Check your answer again.</p>");
      } else {
        if ($.trim($("#Input_fpgx").val()).length == 0) { //Checks for empty/whitespace textbox
          $("#Reply_fpgx")
            .val("Warning")
            .removeClass("shown-bg correct-bg incorrect-bg")
            .addClass("warning-bg");
          $("#Check_fpgx")
            .append("<p id='check-tmp-fpgx'>Please enter your answer into the text box.</p>");
        } else { //Can't understand syntax
          $("#Reply_fpgx")
            .val("Warning")
            .removeClass("shown-bg correct-bg incorrect-bg")
            .addClass("warning-bg");
          $("#Check_fpgx")
            .append("<p id='check-tmp-fpgx'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
        }
      }
    });
});

$("#BCheck_fogpx").click(function (evt) {
  $("#check-tmp-fogpx").remove();
  var inputfogpx = $("#Input_fogpx").val();
  var CheckfogpxSage =
    "u = var('u')\n" +
    "if " +
    fogpx + "==" + inputfogpx +
    ":\n" +
    " print(true)\n" +
    "else:\n" +
    " print(false)";
  fetch("https://sagecell.sagemath.org/service",
    {
      method: "POST",
      body: new URLSearchParams({
        code: CheckfogpxSage,
      }),
    })
    .then(response => response.json())
    .then(data => {
      isCorrect = data.stdout;
      if (isCorrect == "True\n") {
        $("#Reply_fogpx")
          .val("Correct")
          .removeClass("warning-bg shown-bg incorrect-bg")
          .addClass("correct-bg");
        $("#Check_fogpx")
          .append("<p id='check-tmp-fogpx'>I knew you could do it! Click the new problem button for a new problem!</p>");
      } else if (isCorrect == "False\n") {
        $("#Reply_fogpx")
          .val("Incorrect")
          .removeClass("warning-bg shown-bg correct-bg")
          .addClass("incorrect-bg");
        $("#Check_fogpx")
          .append("<p id='check-tmp-fogpx'>Something's not quite right. Check your answer again.</p>");
      } else {
        if ($.trim($("#Input_fogpx").val()).length == 0) { //Checks for empty/whitespace textbox
          $("#Reply_fogpx")
            .val("Warning")
            .removeClass("shown-bg correct-bg incorrect-bg")
            .addClass("warning-bg");
          $("#Check_fogpx")
            .append("<p id='check-tmp-fogpx'>Please enter your answer into the text box.</p>");
        } else { //Can't understand syntax
          $("#Reply_fogpx")
            .val("Warning")
            .removeClass("shown-bg correct-bg incorrect-bg")
            .addClass("warning-bg");
          $("#Check_fogpx")
            .append("<p id='check-tmp-fogpx'>Sorry, we didn't quite understand your answer. Please check your syntax and try again.</p>");
        }
      }
    });
});

$("#BShow_fu").click(function (evt) { //When Button with id BShow_fu is clicked:
  $("#Show_fu").hide(); //Hide dropdown while changing text
  $("#show-tmp-fu").remove(); //Clear any pre-existing text in the dropdown
  $("#Input_fu").val(outerfu); //Input box gets the value of the answer
  $("#Reply_fu")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg"); //Reply box changes color
  $("#Show_fu")
    .append("<p id='show-tmp-fu'>Next time, please try it yourself.</p>"); //Dropodown message
  var tree = MathLex.parse(outerfu.toString()),
    latex = MathLex.render(tree, "latex"); //MathLeX translates input into LaTeX
  MathJax.Hub.Queue(["Text", latex_fu, latex]); //MathJax renders LaTeX onto page
  $("#Show_fu").show(); //Show dropdown after text is changed
});

$("#BShow_gx").click(function (evt) {
  $("#Show_gx").hide();
  $("#show-tmp-gx").remove();
  $("#Input_gx").val(innergx);
  $("#Reply_gx")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg");
  $("#Show_gx")
    .append("<p id='show-tmp-gx'>Next time, please try it yourself.</p>");
  var tree = MathLex.parse(innergx.toString()),
    latex = MathLex.render(tree, "latex");
  MathJax.Hub.Queue(["Text", latex_gx, latex]);
  $("#Show_gx").show();
});

$("#BShow_fpu").click(function (evt) {
  $("#show-tmp-fpu").remove();
  $("#Input_fpu").val(outerfpu);
  $("#Reply_fpu")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg");
  $("#Show_fpu")
    .append("<p id='show-tmp-fpu'>Next time, please try it yourself.</p>");
  var tree = MathLex.parse(outerfpu.toString()),
    latex = MathLex.render(tree, "latex");
  MathJax.Hub.Queue(["Text", latex_fpu, latex]);
  $("#Show_fpu").show();
});

$("#BShow_gpx").click(function (evt) {
  $("#Show_gpx").hide();
  $("show-tmp-gpx").remove();
  $("#Input_gpx").val(innergpx);
  $("#Reply_gpx")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg");
  $("#Show_gpx")
    .append("<p id='show-tmp-gpx'>Next time, please try it yourself.</p>");
  var tree = MathLex.parse(innergpx.toString()),
    latex = MathLex.render(tree, "latex");
  MathJax.Hub.Queue(["Text", latex_gpx, latex]);
  $("#Show_gpx").show();
});

$("#BShow_fpgx").click(function (evt) {
  $("#Show_fpgx").hide();
  $("#show-tmp-fpgx").remove();
  $("#Input_fpgx").val(fpgx);
  $("#Reply_fpgx")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg");
  $("#Show_fpgx")
    .append("<p id='show-tmp-fpgx'>Next time, please try it yourself.</p>");
  var tree = MathLex.parse(fpgx.toString()),
    latex = MathLex.render(tree, "latex");
  MathJax.Hub.Queue(["Text", latex_fpgx, latex]);
  $("#Show_fpgx").show();
});

$("#BShow_fogpx").click(function (evt) {
  $("#Show_fogpx").hide();
  $("#show-temp-fogpx").remove();
  $("#Input_fogpx").val(fogpx);
  $("#Reply_fogpx")
    .val("Shown")
    .removeClass("correct-bg warning-bg incorrect-bg")
    .addClass("shown-bg");
  $("#Show_fogpx")
    .append("<p id='show-tmp-fogpx'>Next time, please try it yourself.</p>");
  var tree = MathLex.parse(fogpx.toString()),
    latex = MathLex.render(tree, "latex");
  MathJax.Hub.Queue(["Text", latex_fogpx, latex]);
  $("#Show_fogpx").show();
});

$("#Input_fu").keyup(function (evt) { //Whenever a the text field with id Input_fu changes:
  $("#Hint_fu").hide();
  $("#Check_fu").hide();
  $("#Show_fu").slideUp();
  var math = $(this).val(); //math is set to Input_fu's value
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex"); //MathLex translates the input into LaTeX
  latex = "\\displaystyle " + latex; //Override LaTeX styles, and force it to print in pretty-math-print
  MathJax.Hub.Queue(["Text", latex_fu, latex]); //Render LaTeX
});

$("#Input_gx").keyup(function (evt) {
  $("#Hint_gx").hide();
  $("#Check_gx").hide();
  $("#Show_gx").slideUp();
  var math = $(this).val();
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex");
  latex = "\\displaystyle " + latex;
  MathJax.Hub.Queue(["Text", latex_gx, latex]);
});

$("#Input_fpu").keyup(function (evt) {
  $("#Hint_fpu").hide();
  $("#Check_fpu").hide();
  $("#Show_fpu").hide();
  var math = $(this).val();
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex");
  latex = "\\displaystyle " + latex;
  MathJax.Hub.Queue(["Text", latex_fpu, latex]);
});

$("#Input_gpx").keyup(function (evt) {
  $("#Hint_gpx").hide();
  $("#Check_gpx").hide();
  $("#Show_gpx").hide();
  var math = $(this).val();
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex");
  latex = "\\displaystyle " + latex;
  MathJax.Hub.Queue(["Text", latex_gpx, latex]);
});

$("#Input_fpgx").keyup(function (evt) {
  $("#Hint_fpgx").hide();
  $("#Check_fpgx").hide();
  $("#Show_fpgx").hide();
  var math = $(this).val();
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex");
  latex = "\\displaystyle " + latex;
  MathJax.Hub.Queue(["Text", latex_fpgx, latex]);
});

$("#Input_fogpx").keyup(function (evt) {
  $("#Hint_fogpx").hide();
  $("#Check_fogpx").hide();
  $("#Show_fogpx").hide();
  var math = $(this).val();
  var tree = MathLex.parse(math),
    latex = MathLex.render(tree, "latex");
  latex = "\\displaystyle " + latex;
  MathJax.Hub.Queue(["Text", latex_fogpx, latex]);
});
});