let xzSliceShown_1 = false;
let xTraceShown_1 = false;
let xTangentShown_1 = false;
let xPlaying_1 = false;

let yzSliceShown_2 = false;
let yTraceShown_2 = false;
let yTangentShown_2 = false;
let yPlaying_2 = false;
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

// Checks condition - if true changes bulletId to a check mark otherwise changes it
// 'imageSrcIfConditionIsFalse'
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
// xz-Slice & y-Slider = 5
exercise1Step1Handler = () =>
  checkConditionAndChangeBulletToCheck(
    xzSliceShown_1 && isSliderSetToValue("yslider_1", "ydisp_1", 5.0),
    "ex-1a",
    "../../../graphics/bullet1.jpg"
  );

$("#cbxplane_1").change(function() {
  xzSliceShown_1 = !xzSliceShown_1;
  exercise1Step1Handler();
});
$("#yslider_1").on("input", exercise1Step1Handler);
$("#ydisp_1").on("input", exercise1Step1Handler);

// Step 2
// x-Trace
$("#cbxline_1").change(() => {
  xTraceShown_1 = !xTraceShown_1;
  checkConditionAndChangeBulletToCheck(
    xTraceShown_1,
    "ex-1b",
    "../../../graphics/bullet2.jpg"
  );
});

// Step 3
// x-Slider = 6
exercise1Step3Handler = () =>
  checkConditionAndChangeBulletToCheck(
    isSliderSetToValue("xslider_1", "xdisp_1", 6.0),
    "ex-1c",
    "../../../graphics/bullet3.jpg"
  );

$("#xslider_1").on("input", exercise1Step3Handler);

$("#xdisp_1").on("input", exercise1Step3Handler);

// Step 4
// x-Tangent
$("#cbxtline_1").change(() => {
  xTangentShown_1 = !xTangentShown_1;
  checkConditionAndChangeBulletToCheck(
    xTangentShown_1,
    "ex-1d",
    "../../../graphics/bullet4.jpg"
  );
});

// Step 5
// Play x
$("#cbxplay_1").change(() => {
  xPlaying_1 = !xPlaying_1;
  checkConditionAndChangeBulletToCheck(
    xPlaying_1,
    "ex-1e",
    "../../../graphics/bullet5.jpg"
  );
});

/***************************************** 
    LOGIC FOR EXERCISE 2
******************************************/

// Step 1
// yz-Slice & x-Slider = 6
exercise2Step1Handler = () =>
  checkConditionAndChangeBulletToCheck(
    yzSliceShown_2 && isSliderSetToValue("xslider_2", "xdisp_2", 6.0),
    "ex-2a",
    "../../../graphics/bullet1.jpg"
  );

$("#cbyplane_2").change(function() {
  yzSliceShown_2 = !yzSliceShown_2;
  exercise2Step1Handler();
});
$("#xslider_2").on("input", exercise2Step1Handler);
$("#xdisp_2").on("input", exercise2Step1Handler);

// Step 2
// x-Trace
$("#cbyline_2").change(() => {
  yTraceShown_2 = !yTraceShown_2;
  checkConditionAndChangeBulletToCheck(
    yTraceShown_2,
    "ex-2b",
    "../../../graphics/bullet2.jpg"
  );
});

// Step 3
// x-Slider = 6
exercise2Step3Handler = () =>
  checkConditionAndChangeBulletToCheck(
    isSliderSetToValue("yslider_2", "ydisp_2", 5.0),
    "ex-2c",
    "../../../graphics/bullet3.jpg"
  );

$("#yslider_2").on("input", exercise2Step3Handler);

$("#ydisp_2").on("input", exercise2Step3Handler);

// Step 4
// x-Tangent
$("#cbytline_2").change(() => {
  yTangentShown_2 = !yTangentShown_2;
  checkConditionAndChangeBulletToCheck(
    yTangentShown_2,
    "ex-2d",
    "../../../graphics/bullet4.jpg"
  );
});

// Step 5
// Play x
$("#cbyplay_2").change(() => {
  yPlaying_2 = !yPlaying_2;
  checkConditionAndChangeBulletToCheck(
    yPlaying_2,
    "ex-2e",
    "../../../graphics/bullet5.jpg"
  );
});
