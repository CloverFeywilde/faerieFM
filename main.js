//Renderer Setup
var stage = new PIXI.Container()
var renderer = PIXI.autoDetectRenderer(720, 1280);
document.body.appendChild(renderer.view);
window.onresize = function (event) {
  var w = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidth = (newHeight*9)/16
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
  .add("images/background.png")
  .load(setup);

function setup(){

testBG = new Sprite(
  PIXI.loader.resources['images/background.png'].texture
);
test = new Sprite(
PIXI.loader.resources['images/tester.png'].texture
);
testBG.interactive = true;
testBG.buttonMode = true;
testBG.on('mousedown', clicked);
testBG.position.x=0;
testBG.position.y=0;

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
container.addChild(testBG);
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

function clicked(event){
  console.log(event.data.global);
  moveShip(event)
}

function moveShip(location){
  var location2 = location.data.global
  console.log("move ship to: ", location2);
  test.position.x = location2.x;
  test.position.y = location2.y;
  onDragStart(location);
  onDragMove();
}

//Mouse Drag Functions
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    console.log(event.data);
    test.data = event.data;
    test.dragging = true;
}

function onDragEnd()
{
    test.dragging = false;
    // set the interaction data to null
    test.data = null;
}

function onDragMove()
{
    if (test.dragging)
    {
        newPosition = test.data.getLocalPosition(test.parent);
        if (newPosition.x >= 50 && newPosition.x <= renderer.width-50 && newPosition.y >=50 && newPosition.y <= renderer.height-50){
          test.position.x = newPosition.x;
          test.position.y = newPosition.y;
          return;
         }
        else if(newPosition.y >=50 && newPosition.y <= renderer.height-50){
          test.position.y = newPosition.y;
          return;
        }
        else if(newPosition.x >= 50 && newPosition.x <= renderer.width-50){
          test.position.x = newPosition.x;
          return;
        }
}
}
