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
var state, newPosition, level, test, distance, id, dust, firstTime;
var frame = 0;

//Sprite creation & Setup function
PIXI.loader
  .add("images/spritesheet.json")
  .load(setup);


function setup(){
//code needs to be refactored here so the background is called at the appropriate time within the play state.
id = PIXI.loader.resources["images/spritesheet.json"].textures;

test = new Sprite(id["tester.png"]);
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
//container.addChild(test);

state = play;
//createSprite(stage1);
firstTime = true;
distance = 0;
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

//enemy & item AI
//rewards & penalties
//change states to pause or end

//Run stageEnd('stage#'), if yes, or if 'firstTime' then reset the stage and all counters. Change to the new stage passed in. Create appropriate stage background.
newStageCheck();
//Check if enemies need to be placed or removed from current stage.
checkDistance(distance,level);
//*enemyCheck(distance);
//check collisions, if yes, apply penalties, rewards, and/or remove enemies. Control with switch statement.
//increment distance counter
//move stage according to distance counter.
addDistance();
//check for maxDistance.
//*endChecker();
}

//Stage Creator, all functions dealing with stage management go here and are called within the play state.
function newStageCheck(){
  if(firstTime){
    //reset all counters
    firstTime = false;
    level = stage1 
    testBG = new Sprite(id["background.png"]);
    testBG.interactive = true;
    testBG.buttonMode = true;
    testBG.on('mousedown', clicked);
    testBG.position.x=0;
    testBG.position.y=0; 
    container.addChild(testBG);
    container.addChild(test);
    createSprite(level);
}
}

function createSprite(stageNum){
 // alert('creating sprites...');
  //on new stage loadup creates enemies and adds them to arrays
  Object.keys(stageNum).forEach(function(key,index){
   stageNum[key]['array'] = [];
    for(j=0; j <= stageNum[key]['quantity']; j++){
      stageNum[key]['array'].push(new Sprite(id[stageNum[key]['name']+".png"]));
    }       
  })
}

function checkDistance(currentDist, stageNumm){
  Object.keys(stageNumm).forEach(function(key,index){
    var yDist = stageNumm[key]['y'][0];
    if(yDist != null){
      if(yDist == currentDist){
        placeSprite(stageNumm, key);   
      }
    } 
})
}

function placeSprite(stageNum, enemy){
  //takes a sprite out of the createSprite arrays, puts it in the stage with coordinate values from stage object.
  var borrowed = stageNum[enemy]['array'].shift();
 
  var sx, sy;
  sx = stageNum[enemy]['x'].shift();
  sy = stageNum[enemy]['y'].shift();

  borrowed.position.x = sx;
  borrowed.position.y = sy; 
  container.addChild(borrowed);
  alert("incoming enemy")
}


function addDistance(){
  frame++;
  if(frame >= 60){
    frame = 0;
    distance++;
}
}


//click movement
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
