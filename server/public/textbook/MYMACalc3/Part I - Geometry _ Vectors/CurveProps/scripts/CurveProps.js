$(document).ready(function() {
  var r1 = new genQuestionObject({
    INbox: $("#INr"),
    OUTbox: "OUTr"
  });
  var v1 = new genQuestionObject({
    INbox: $("#INv"),
    OUTbox: "OUTv",
    Check: $("#Checkv"),
    Show: $("#Showv"),
    MRbox: $("#MRv")
  });
  var a1 = new genQuestionObject({
    INbox: $("#INa"),
    OUTbox: "OUTa",
    Check: $("#Checka"),
    Show: $("#Showa"),
    MRbox: $("#MRa")
  });
  var j1 = new genQuestionObject({
    INbox: $("#INj"),
    OUTbox: "OUTj",
    Check: $("#Checkj"),
    Show: $("#Showj"),
    MRbox: $("#MRj")
  });
  var s1 = new genQuestionObject({
    INbox: $("#INs"),
    OUTbox: "OUTs",
    Check: $("#Checks"),
    Show: $("#Shows"),
    MRbox: $("#MRs")
  });
  var l1 = new genQuestionObject({
    INbox: $("#INL"),
    OUTbox: "OUTL",
    Check: $("#CheckL"),
    Show: $("#ShowL"),
    MRbox: $("#MRL")
  });
  var t1 = new genQuestionObject({
    INbox: $("#INT"),
    OUTbox: "OUTT",
    Check: $("#CheckT"),
    Show: $("#ShowT"),
    MRbox: $("#MRT")
  });
  var va = new genQuestionObject({
    INbox: $("#INva"),
    OUTbox: "OUTva",
    Check: $("#Checkva"),
    Show: $("#Showva"),
    MRbox: $("#MRva")
  });
  var mva = new genQuestionObject({
    INbox: $("#INmva"),
    OUTbox: "OUTmva",
    Check: $("#Checkmva"),
    Show: $("#Showmva"),
    MRbox: $("#MRmva")
  });
  var b1 = new genQuestionObject({
    INbox: $("#INB"),
    OUTbox: "OUTB",
    Check: $("#CheckB"),
    Show: $("#ShowB"),
    MRbox: $("#MRB")
  });
  var n1 = new genQuestionObject({
    INbox: $("#INN"),
    OUTbox: "OUTN",
    Check: $("#CheckN"),
    Show: $("#ShowN"),
    MRbox: $("#MRN")
  });
  var k1 = new genQuestionObject({
    INbox: $("#INk"),
    OUTbox: "OUTk",
    Check: $("#Checkk"),
    Show: $("#Showk"),
    MRbox: $("#MRk")
  });
  var tau = new genQuestionObject({
    INbox: $("#INtau"),
    OUTbox: "OUTtau",
    Check: $("#Checktau"),
    Show: $("#Showtau"),
    MRbox: $("#MRtau")
  });
  var aT = new genQuestionObject({
    INbox: $("#INaT"),
    OUTbox: "OUTaT",
    Check: $("#CheckaT"),
    Show: $("#ShowaT"),
    MRbox: $("#MRaT")
  });
  var aN = new genQuestionObject({
    INbox: $("#INaN"),
    OUTbox: "OUTaN",
    Check: $("#CheckaN"),
    Show: $("#ShowaN"),
    MRbox: $("#MRaN")
  });
  // get MathJax output object
  MathJax.Hub.Queue(function() {
    r1.OUTbox = MathJax.Hub.getAllJax(r1.OUTbox)[0];
    v1.OUTbox = MathJax.Hub.getAllJax(v1.OUTbox)[0];
    a1.OUTbox = MathJax.Hub.getAllJax(a1.OUTbox)[0];
    j1.OUTbox = MathJax.Hub.getAllJax(j1.OUTbox)[0];
    s1.OUTbox = MathJax.Hub.getAllJax(s1.OUTbox)[0];
    l1.OUTbox = MathJax.Hub.getAllJax(l1.OUTbox)[0];
    t1.OUTbox = MathJax.Hub.getAllJax(t1.OUTbox)[0];
    va.OUTbox = MathJax.Hub.getAllJax(va.OUTbox)[0];
    mva.OUTbox = MathJax.Hub.getAllJax(mva.OUTbox)[0];
    b1.OUTbox = MathJax.Hub.getAllJax(b1.OUTbox)[0];
    n1.OUTbox = MathJax.Hub.getAllJax(n1.OUTbox)[0];
    k1.OUTbox = MathJax.Hub.getAllJax(k1.OUTbox)[0];
    tau.OUTbox = MathJax.Hub.getAllJax(tau.OUTbox)[0];
    aT.OUTbox = MathJax.Hub.getAllJax(aT.OUTbox)[0];
    aN.OUTbox = MathJax.Hub.getAllJax(aN.OUTbox)[0];
    clearboxes(allQuestions);
  });
  MathJax.Hub.processSectionDelay = 0;
  var allQuestions = [
    r1,
    v1,
    a1,
    j1,
    s1,
    l1,
    t1,
    va,
    mva,
    b1,
    n1,
    k1,
    tau,
    aT,
    aN
  ];

  var curves =
    "[" +
    "[a*t,a*b*t^2,a*2/3*b^2*t^3]," +
    "[a*cos(b*t),a*sin(b*t),c*t]," +
    //  "[a*b/2*t^2*cos(b*t),a*b/2*t^2*sin(b*t),a*t]," +
    //  "[a*exp(p*t)*cos(b*t),a*exp(p*t)*sin(b*t),c*exp(p*t)]," +
    //  "[a*cos(b*t^p),a*sin(b*t^p),c*t^p]," +
    //  "[a*ln(t),sqrt(4*a*b)*t,b*t^2]" +
    //  "[a*t^q,b*t^(q*(1+p)),c*t^(q*(1+2*p))]" +
    "]";

  var values =
    "[" +
    "[[1,1],[1,3],[1,sqrt(3)],[1,sqrt(6)],[1,1/2],[1,3/2],[2,1],[2,3],[2,1/2],[3,1],[3,2]]," +
    "[[1,3,4],[3,1,4],[1,4,3],[4,1,3],[2,2,3],[2,3,8],[3,2,8],[2,4,6],[4,2,6],[3,4,5],[4,3,5]]," +
    //  "[[1,2],[1,4],[1,6],[2,1],[2,2],[2,3],[2,4],[2,6],[3,2],[3,4],[3,6],[4,1],[4,2],[4,3],[4,4],[4,6],[5,2]," +
    //  "[5,4],[5,6],[6,1],[6,2],[6,3],[8,1],[8,2],[8,3]]," +

    //  "[[1,1,2,2],[1,1,2,-2],[1,1,3,sqrt(6)],[1,1,3,-sqrt(6)],[1,2,1,1],[1,2,1,-1],[1,2,2,4],[1,2,2,-4]," +
    //  "[1,2,3,3],[1,2,3,-3],[1,3,2,2],[1,3,2,-2],[1,3,2,6],[1,3,2,-6],[1,3,4,4],[1,3,4,-4],[-1,1,2,2]," +
    //  "[-1,1,2,-2],[-1,1,3,sqrt(6)],[-1,1,3,-sqrt(6)],[-1,2,1,1],[-1,2,1,-1],[-1,2,2,4],[-1,2,2,-4]," +
    //  "[-1,2,3,3],[-1,2,3,-3],[-1,3,2,2],[-1,3,2,-2],[-1,3,2,6],[-1,3,2,-6],[-1,3,4,4],[-1,3,4,-4]," +
    //  "[2,1,1,1],[2,1,1,-1],[2,1,3,3],[2,1,3,-3],[2,1,4,2],[2,1,4,-2],[2,1,5,7],[2,1,5,-7],[2,2,1,2]," +
    //  "[2,2,1,-2],[2,2,2,1],[2,2,2,-1],[2,2,4,4],[2,2,4,-4],[2,3,1,1],[2,3,1,-1],[2,3,1,3],[2,3,1,-3]," +
    //  "[2,3,3,1],[2,3,3,-1],[2,4,1,4],[2,4,1,-4],[2,4,2,2],[2,4,2,-2],[-2,1,1,1],[-2,1,1,-1],[-2,1,3,3]," +
    //  "[-2,1,3,-3],[-2,1,4,2],[-2,1,4,-2],[-2,1,5,7],[-2,1,5,-7],[-2,2,1,2],[-2,2,1,-2],[-2,2,2,1],[-2,2,2,-1]," +
    //  "[-2,2,4,4],[-2,2,4,-4],[-2,3,1,1],[-2,3,1,-1],[-2,3,1,3],[-2,3,1,-3],[-2,3,3,1],[-2,3,3,-1]," +
    //  "[-2,4,1,4],[-2,4,1,-4],[-2,4,2,2],[-2,4,2,-2]]," +

    //  "[[1,3,4],[3,1,4],[1,4,3],[4,1,3],[2,2,3],[2,3,8],[3,2,8],[2,4,6],[4,2,6],[3,4,5],[4,3,5]]," +

    //  "[[1,1],[1,2],[1,3],[1,4],[1,9],[2,1],[2,2],[2,6],[3,3],[3,4]]" +

    //  "[[1,1,3,6],[1,1,3/2,3/2],[1,2,3,3],[1,2,1,1/3],[1,4,6,6],[1,4,3,3/2],[1,8,6,3],[1,8,2,1/3]," +
    //  "[1,1/2,1/2,1/3],[1,1/2,3/2,3],[2,1,10/3,10],[2,1,5/3,5/2],[2,1,2/3,2/5],[2,1,1/3,1/10]," +
    //  "[2,2,10/3,5],[2,2,2/3,1/5],[2,3,5,15/2],[2,3,10,30],[2,5,5/3,1/2],[2,5,5,9/2],[2,9,9,10]," +
    //  "[2,9,5,5/2],[2,9,2,2/5]]" +
    "]";

  $("#BNewProblem").click(function() {
    var NewProblemSage =
      "from random import randint\n" +
      "t = var('t')\n" +
      "[a,b,c,p,q] = [var('a'),var('b'),var('c'),var('p'),var('q')]\n" +
      "allValues = " +
      values +
      "\n" +
      "curveNo = randint(0,1)\n" +
      "valueSet = allValues[curveNo]\n" +
      "valueNo = randint(0,len(valueSet)-1)\n" +
      "values = valueSet[valueNo]\n" +
      "if (curveNo==0):\n" +
      "    [a,b] = values\n" +
      "else:\n" +
      "    [a,b,c] = values\n" +
      // "else:\n" +
      // "    [a,b,c,p] = values\n" +
      // "if (curveNo==3):\n" +
      // "    p = randint(1,3)\n" +
      // "if (curveNo==2):\n" +
      // "    q = randint(1,2)\n" +
      // "    if (randint(1,2)==1):\n" +
      // "        [a,c]=[c,a]\n" +
      "allCurves = " +
      curves +
      "\n" +
      "r = vector(allCurves[curveNo])\n" +
      // "r = vector([t,t^2,2/3*t^3])\n" +
      "v = derivative(r,t)\n" +
      "a = derivative(v,t)\n" +
      "j = derivative(a,t)\n" +
      "s = (sqrt(v[0]^2+v[1]^2+v[2]^2).simplify_full()).canonicalize_radical()\n" +
      "L = integral(s,t,0,1)\n" +
      "T = v/s\n" +
      "va = v.cross_product(a)\n" +
      "va[2] = va[2].simplify_full()\n" +
      "mva = sqrt(va[0]^2+va[1]^2+va[2]^2).simplify_full().canonicalize_radical()\n" +
      "B = (va/mva)\n" +
      "if (curveNo==0):\n" +
      "     B = B.simplify_full();\n" +
      "N = B.cross_product(T)\n" +
      "if (curveNo==0):\n" +
      "     N = N.simplify_full();\n" +
      "k = (mva/(s^3)).full_simplify()\n" +
      "tau = (va.dot_product(j)/mva^2).full_simplify()\n" +
      "aT = a.dot_product(T).full_simplify()\n" +
      "aN = a.dot_product(N).full_simplify()\n" +
      "print([r[0],r[1],r[2]])\n" +
      "print([v[0],v[1],v[2]])\n" +
      "print([a[0],a[1],a[2]])\n" +
      "print([j[0],j[1],j[2]])\n" +
      "print(s)\n" +
      "print(L)\n" +
      "print([T[0],T[1],T[2]])\n" +
      "print([va[0], va[1], va[2]])\n" +
      "print(mva)\n" +
      "print([B[0],B[1],B[2]])\n" +
      "print([N[0],N[1],N[2]])\n" +
      "print(k)\n" +
      "print(tau)\n" +
      "print(aT)\n" +
      "print(aN)";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sagecell.sagemath.org/service", false);
    xhr.onload = function() {
      var data = JSON.parse(xhr.response);
      var ans_string = data.stdout;
      var ans_array = ans_string.split("\n");
      for (var i = 0; i < allQuestions.length; ++i) {
        allQuestions[i].ans = ans_array[i];
      }
    };
    clearboxes(allQuestions);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(NewProblemSage));
    r1.INbox.val(r1.ans);
    var tree = MathLex.parse(r1.ans),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", r1.OUTbox, latex]);
  });

  //all keypress update functions
  $("#INv").keyup(function() {
    keyupdate(v1);
  });
  $("#INa").keyup(function() {
    keyupdate(a1);
  });
  $("#INj").keyup(function() {
    keyupdate(j1);
  });
  $("#INs").keyup(function() {
    keyupdate(s1);
  });
  $("#INL").keyup(function() {
    keyupdate(l1);
  });
  $("#INT").keyup(function() {
    keyupdate(t1);
  });
  $("#INva").keyup(function() {
    keyupdate(va);
  });
  $("#INmva").keyup(function() {
    keyupdate(mva);
  });
  $("#INB").keyup(function() {
    keyupdate(b1);
  });
  $("#INN").keyup(function() {
    keyupdate(n1);
  });
  $("#INk").keyup(function() {
    keyupdate(k1);
  });
  $("#INtau").keyup(function() {
    keyupdate(tau);
  });
  $("#INaT").keyup(function() {
    keyupdate(aT);
  });
  $("#INaN").keyup(function() {
    keyupdate(aN);
  });

  //all check button functions
  $("#Checkv").click(function() {
    check(v1, "equiv", "t");
  });
  $("#Checka").click(function() {
    check(a1, "equiv", "t");
  });
  $("#Checkj").click(function() {
    check(j1, "equiv", "t");
  });
  $("#Checks").click(function() {
    check(s1, "diff", "t");
  });
  $("#CheckL").click(function() {
    check(l1, "diff", "t");
  });
  $("#CheckT").click(function() {
    check(t1, "equiv", "t");
  });
  $("#Checkva").click(function() {
    check(va, "equiv", "t");
  });
  $("#Checkmva").click(function() {
    check(mva, "equiv", "t");
  });
  $("#CheckB").click(function() {
    check(b1, "equiv", "t");
  });
  $("#CheckN").click(function() {
    check(n1, "equiv", "t");
  });
  $("#Checktau").click(function() {
    check(tau, "equiv", "t");
  });
  $("#Checkk").click(function() {
    check(k1, "diff", "t");
  });
  $("#CheckaT").click(function() {
    check(aT, "equiv", "t");
  });
  $("#CheckaN").click(function() {
    check(aN, "equiv", "t");
  });

  //all show button functions
  $("#Showv").click(function() {
    show(v1);
    $("#reply").val("v(t) shown.");
  });
  $("#Showa").click(function() {
    show(a1);
    $("#reply").val("a(t) shown.");
  });
  $("#Showj").click(function() {
    show(j1);
    $("#reply").val("j(t) shown.");
  });
  $("#Shows").click(function() {
    show(s1);
    $("#reply").val("|v(t)| shown.");
  });
  $("#ShowL").click(function() {
    show(l1);
    $("#reply").val("L shown.");
  });
  $("#ShowT").click(function() {
    show(t1);
    $("#reply").val("T shown.");
  });
  $("#Showva").click(function() {
    show(va);
    $("#reply").val("v x a shown.");
  });
  $("#Showmva").click(function() {
    show(mva);
    $("#reply").val("|v x a| shown.");
  });
  $("#ShowB").click(function() {
    show(b1);
    $("#reply").val("B shown.");
  });
  $("#ShowN").click(function() {
    show(n1);
    $("#reply").val("N shown.");
  });
  $("#Showk").click(function() {
    show(k1);
    $("#reply").val("Curvature shown.");
  });
  $("#Showtau").click(function() {
    show(tau);
    $("#reply").val("Torsion shown.");
  });
  $("#ShowaT").click(function() {
    show(aT);
    $("#reply").val("aT shown.");
  });
  $("#ShowaN").click(function() {
    show(aN);
    $("#reply").val("aN shown.");
  });
});
