//Renderer Setup
//document.getElementsByTagName('canvas')[0].width
var stage = new PIXI.Container()
var renderer = PIXI.autoDetectRenderer(720, 1280);
document.body.appendChild(renderer.view);
window.onresize = function (event) {
  var w = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidth = (newHeight*9)/16
 // renderer.resize(newWidth, newHeight);
  renderer.view.style.width = newWidth + "px";
  renderer.view.style.height = newHeight + "px";
}
window.onresize();
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
var container = new PIXI.DisplayObjectContainer();
container.scale.x = container.scale.y = 1;
stage.addChild(container);
//Aliases and Globals
var Sprite = PIXI.Sprite;
var state, newPosition, test;

//Sprite creation & Setup function
PIXI.loader
  .add("images/tester.png")
  .load(setup);

function setup(){
    test = new Sprite(
    PIXI.loader.resources['images/tester.png'].texture  
  );
test.interactive = true;
test.buttonMode = true;
test.anchor.set(0.5);
test
  .on('mousedown', onDragStart)
  .on('touchstart', onDragStart)
  .on('mouseup',onDragEnd)
  .on('mouseupoutside', onDragEnd)
  .on('touchend', onDragEnd)
  .on('touchendoutside', onDragEnd)
  .on('mousemove', onDragMove)
  .on('touchmove', onDragMove);

test.position.x = 200;
test.position.y = 500;

container.addChild(test);
state = play;
gameLoop();
}

//Game Loop
function gameLoop(){
requestAnimationFrame(gameLoop);
state();
renderer.render(stage);
}

//Game States
function play(){

}

//Mouse Drag Functions
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd()
{
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {     
        newPosition = this.data.getLocalPosition(this.parent);
        if (newPosition.x >= 50 && newPosition.x <= renderer.width-50 && newPosition.y >=50 && newPosition.y <= renderer.height-50){
          this.position.x = newPosition.x;
          this.position.y = newPosition.y;  
          return;
         }
        else if(newPosition.y >=50 && newPosition.y <= renderer.height-50){
          this.position.y = newPosition.y;
          return; 
        }
        else if(newPosition.x >= 50 && newPosition.x <= renderer.width-50){
          this.position.x = newPosition.x;
          return;
        }
}
}
