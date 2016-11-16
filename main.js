//Renderer Setup
var stage = new PIXI.Container()
renderer = PIXI.autoDetectRenderer(720, 1280);
document.body.appendChild(renderer.view);
window.onresize = function (event) {
  var w = window.innerWidth;
  var newWidth = (newHeight*9)/16
  var newHeight = window.innerHeight;
  renderer.view.style.width = newWidth + "px";
  renderer.view.style.height = newHeight + "px";
}
window.onresize();
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
var container = new PIXI.DisplayObjectContainer();
container.scale.x = container.scale.y = 2;
stage.addChild(container);

//Aliases and Globals
var Sprite = PIXI.Sprite;

//Sprite creation & Setup function
PIXI.loader
  .add("images/tester.png")
  .load(setup);

function setup(){
  var test = new Sprite(
    PIXI.loader.resources['images/tester.png'].texture  
  );

container.addChild(test);

renderer.render(stage);
}


