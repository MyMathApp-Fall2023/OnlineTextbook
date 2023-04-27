// function to make sprites based on string input
function makeTextSprite(message, parameters) {
  if(parameters === undefined) parameters = {}; // if there is no parameters input, set it to null set

  var fontface = parameters.hasOwnProperty("fontface") ? // if entered parameters include the variable use that. Otherwise, set default
    parameters["fontface"] : "Arial";

  var fontsize = parameters.hasOwnProperty("fontsize") ?
    parameters["fontsize"] : 18;

  var borderThickness = parameters.hasOwnProperty("borderThickness") ?
    parameters["borderThickness"] : 4;

  // var borderColor = parameters.hasOwnProperty("borderColor") ?
  //   parameters["borderColor"] : {r:0, g:0, b:0, a:1.0};
  //
  // var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
  //   parameters["backgroundColor"] : {r:255, g:255, b:255, a:1.0};

  var canvas = document.createElement('canvas'); // create a canvas to use for the sprite's texture

  var context = canvas.getContext('2d');
  context.font = "Italic " + fontsize + "px " + fontface;

  // get size data
  var metrics = context.measureText(message);
  var textWidth = metrics.width;

  // assign the background and border colors to the "context"
  // // background color
  // context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
  //                           + backgroundColor.b + "," + backgroundColor.a + ")";
  // // border color
  // context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," +
  //                             borderColor.b + "," + borderColor.a + ")";

  context.lineWidth = borderThickness;

  // text color
  context.fillStyle = "rgba(0, 0, 0, 1.0)";

  context.fillText(message, (canvas.width / 2) - textWidth / 2 + borderThickness, fontsize * .35 + borderThickness + canvas.height / 2);

  // apply canvas as texture
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial(
    {map: texture, useScreenCoordinates: false});
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(10, 5, 1.0);
  return sprite;
}
