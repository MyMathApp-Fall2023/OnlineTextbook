function showHiddenRules() {
  var content = document.getElementsByClassName("hidden-rules");

  if (content[0].style.visibility === "hidden") {
    for (var i = 0; i < content.length; i++)
      content[i].style.visibility = "visible";
  }
  // To toggle between shown and hidden we use the else part
  else {
    for (var i = 0; i < content.length; i++)
      content[i].style.visibility = "hidden";
  }
}
