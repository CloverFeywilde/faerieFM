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
var state, newPosition, level, test, testBG, distance, id, dust, firstTime;
var frame = 0;
var score = 0;

//Sprite creation & Setup function
PIXI.loader
  .add("images/spritesheet.json")
  .load(setup);


function setup(){
//code needs to be refactored here so the background is called at the appropriate time within the play state.
id = PIXI.loader.resources["images/spritesheet.json"].textures;
b = new Bump(PIXI);
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

state = play;
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
moveEnemies();
//change states to pause 

//Checks if this is a new game, or if the player has advanced to a new level. Clears current level and loads in assets for new level.
newStageCheck();
//Check if enemies need to be placed or removed from current level.
checkDistance(distance,level);
//Check collisions, if yes, apply penalties, rewards, and/or remove enemies. Control with switch statement.
bumpCheck();
//Increment the distance counter
addDistance();
//move background according to distance counter
//check for maxDistance.
moveBG();
}

//Level Creator- all functions dealing with level management go here and are called within the play state.
function newStageCheck(){
  if(firstTime){
    //reset all counters
    firstTime = false;
    level = level1 
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
function createSprite(levelNum){
  //on new level loadup creates enemies and adds them to arrays
  Object.keys(levelNum).forEach(function(key,index){
   levelNum[key]['array'] = [];
    for(j=0; j <= levelNum[key]['quantity']; j++){
      var tempHolder = new Sprite(id[levelNum[key]['name']+".png"])
     // tempHolder.movement = movement.enemy;
      levelNum[key]['array'].push(tempHolder);
    }       
  })
}

function checkDistance(currentDist, levelNum){
  Object.keys(levelNum).forEach(function(key,index){
    var yDist = levelNum[key]['y'][0];
    if(yDist != null){
      if(yDist == currentDist){
        placeSprite(levelNum, key);   
      }
    } 
})
}

function placeSprite(levelNum, enemy){
  //takes a sprite out of the createSprite arrays, puts it in the stage with coordinate values from level object.
  var borrowed = levelNum[enemy]['array'].shift();
  var sx, sy;
  sx = levelNum[enemy]['x'].shift();
  sy = levelNum[enemy]['y'].shift();

  borrowed.position.x = sx;
  borrowed.position.y = sy; 
  container.addChild(borrowed);
  var newSprite = container.children.length-1
  container.children[newSprite].movement = movement[enemy];
  container.children[newSprite].name = levelNum[enemy]['name']
}


function addDistance(){
  frame++;
  if(frame >= 60){
    frame = 0;
    distance++;
}
}

//Enemy Behavior
var movement ={
  dust: function(){this.position.y += 1}
}


function moveEnemies(){
  if(container.children.length>2){  
  //loop through the array starting from position 2 and run container.children.[number].movement() on each.
  for(var i=2; i<container.children.length; i++){
    container.children[i].movement();
}
}
} 

//Collision Detection
function bumpCheck(){
  for(var i=2; i<container.children.length; i++){
    var case1 = container.children[i];
    var colTest = b.hit(test, case1, true);
    if(colTest){
      if(container.children[i].name == "dust"){
        score += 100;
      }
      var currentEnemy = container.children[i]['name'];
      level[currentEnemy].array.push(container.children[i]);
      container.removeChild(container.children[i]);
      


}
}
}

//Move Background
function moveBG(){
  testBG.position.y = distance;
};
