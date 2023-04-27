let xzSliceShown_1 = false;
let xTraceShown_1 = false;
let xTangentShown_1 = false;
let xPlaying_1 = false;
let yzSliceShown_1 = false;
let yTraceShown_1 = false;
let yTangentShown_1 = false;
let yPlaying_1 = false;
let xyTanPlaneShown_1 = false;

let xzSliceShown_2 = false;
let xTraceShown_2 = false;
let xTangentShown_2 = false;
let xPlaying_2 = false;
let yzSliceShown_2 = false;
let yTraceShown_2 = false;
let yTangentShown_2 = false;
let yPlaying_2 = false;
let xyTanPlaneShown_2 = false;
/*****************************************
    UTILITY FUNCTIONS FOR BOTH EXERCISES
******************************************/

// Returns whether slider (or input) value is equal to the given
// numeric value.
isSliderSetToValue = function(sliderId, inputId, numericValue) {
  let sliderSet = parseFloat($(`#${sliderId}`).val()) == numericValue;
  let inputSet = parseFloat($(`#${inputId}`).val()) == numericValue;
  return sliderSet || inputSet;
};

// Checks condition - if true changes bulletId to a check mark otherwise changes
// it to 'imageSrcIfConditionIsFalse'
// Note you can provide "../../../graphics/check.jpg" as the imageSrcIfConditionIsFalse
// if you want the bullet to stay a check mark, even if the condition false after being
// satisfied atleast once.
checkConditionAndChangeBulletToCheck = function(
  condition,
  bulletId,
  imageSrcIfConditionIsFalse = "../../../graphics/check.jpg"
) {
  if (condition) {
    document
      .getElementById(bulletId)
      .setAttribute("src", "../../../graphics/check.jpg");
  } else {
    document
      .getElementById(bulletId)
      .setAttribute("src", imageSrcIfConditionIsFalse);
  }
};

/*****************************************
    LOGIC FOR EXERCISE 1
******************************************/

// Step 1
// x-Slider = 6 & y-Slider = 5
exercise1Step1Handler = () =>
  checkConditionAndChangeBulletToCheck(
    isSliderSetToValue("xslider_1", "xdisp_1", 6.0) && isSliderSetToValue("yslider_1", "ydisp_1", 5.0),
    "ex-1a",
    "../../../graphics/bullet1.jpg"
  );

$("#xslider_1").on("input", exercise1Step1Handler);
$("#xdisp_1").on("input", exercise1Step1Handler);
$("#yslider_1").on("input", exercise1Step1Handler);
$("#ydisp_1").on("input", exercise1Step1Handler);

// Step 2
// x-Trace & y-Trace
exercise1Step2Handler = () =>
  checkConditionAndChangeBulletToCheck(
    xTraceShown_1 && yTraceShown_1,
    "ex-1b",
    "../../../graphics/bullet2.jpg"
  );

$("#cbxline_1").change(function() {
  xTraceShown_1 = !xTraceShown_1;
  exercise1Step2Handler();
});
$("#cbyline_1").change(function() {
  yTraceShown_1 = !yTraceShown_1;
  exercise1Step2Handler();
});

// Step 3
// x-TanLine & y-TanLine
exercise1Step3Handler = () =>
  checkConditionAndChangeBulletToCheck(
    xTangentShown_1 && yTangentShown_1,
    "ex-1c",
    "../../../graphics/bullet3.jpg"
  );

$("#cbxtline_1").change(function() {
  xTangentShown_1 = !xTangentShown_1;
  exercise1Step3Handler();
});
$("#cbytline_1").change(function() {
  yTangentShown_1 = !yTangentShown_1;
  exercise1Step3Handler();
});

// Step 4
// TanPlane
$("#cbtplane_1").change(() => {
  xyTanPlaneShown_1 = !xyTanPlaneShown_1;
  checkConditionAndChangeBulletToCheck(
    xyTanPlaneShown_1,
    "ex-1d",
    "../../../graphics/bullet4.jpg"
  );
});

/*****************************************
    LOGIC FOR EXERCISE 2
******************************************/

// Step 1
// x-Slider = 3 & y-Slider = 2
exercise2Step1Handler = () =>
  checkConditionAndChangeBulletToCheck(
    isSliderSetToValue("xslider_2", "xdisp_2", 3.0) && isSliderSetToValue("yslider_2", "ydisp_2", 2.0),
    "ex-2a",
    "../../../graphics/bullet1.jpg"
  );

$("#xslider_2").on("input", exercise2Step1Handler);
$("#xdisp_2").on("input", exercise2Step1Handler);
$("#yslider_2").on("input", exercise2Step1Handler);
$("#ydisp_2").on("input", exercise2Step1Handler);

// Step 2
// x-Trace & y-Trace
exercise2Step2Handler = () =>
  checkConditionAndChangeBulletToCheck(
    xTraceShown_2 && yTraceShown_2,
    "ex-2b",
    "../../../graphics/bullet2.jpg"
  );

$("#cbxline_2").change(function() {
  xTraceShown_2 = !xTraceShown_2;
  exercise2Step2Handler();
});
$("#cbyline_2").change(function() {
  yTraceShown_2 = !yTraceShown_2;
  exercise2Step2Handler();
});

// Step 3
// x-TanLine & y-TanLine
exercise2Step3Handler = () =>
  checkConditionAndChangeBulletToCheck(
    xTangentShown_2 && yTangentShown_2,
    "ex-2c",
    "../../../graphics/bullet3.jpg"
  );

$("#cbxtline_2").change(function() {
  xTangentShown_2 = !xTangentShown_2;
  exercise2Step3Handler();
});
$("#cbytline_2").change(function() {
  yTangentShown_2 = !yTangentShown_2;
  exercise2Step3Handler();
});

// Step 4
// TanPlane
$("#cbtplane_2").change(() => {
  xyTanPlaneShown_2 = !xyTanPlaneShown_2;
  checkConditionAndChangeBulletToCheck(
    xyTanPlaneShown_2,
    "ex-2d",
    "../../../graphics/bullet4.jpg"
  );
});
