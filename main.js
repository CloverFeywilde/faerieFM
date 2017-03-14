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


var titleContainer = new PIXI.Container();
titleContainer.scale.x = titleContainer.scale.y = 1;
stage.addChild(titleContainer);
titleContainer.visible = false;

var goContainer = new PIXI.Container();
goContainer.scale.x = goContainer.scale.y = 1;
stage.addChild(goContainer);
goContainer.visible = false;

var uiContainer = new PIXI.Container();
uiContainer.scale.x = uiContainer.scale.y = 1;
stage.addChild(uiContainer);
uiContainer.visible = false;

//Aliases and Globals
var Sprite = PIXI.Sprite;
var state, newPosition, level, test, testBG, distance, id, dust, firstTime, scoreText, bumpedWallY, bumpedWallX, goText, testSong;
var frame = 0;
var score = 0;
var cdFrame = 0;
var crashDamage = 0;
var hp = 3; 
var greenTP = 0;
var redTP = 0;
var blueTP = 0;
var timeStop = false;
var stopCounter = 0;

//Load the Sounds
sounds.load([
  "sounds/testSong.mp3"
]);

sounds.whenLoaded = soundSetup;

//Initialize the sounds here
function soundSetup(){
  testSong = sounds["sounds/testSong.mp3"]
  
}

//Sprite creation & Setup function
PIXI.loader
  .add("images/spritesheet.json")
  .load(titleSetup);

function titleSetup(){
  container.visible = false;
  goContainer.visible = false;
  uiContainer.visible = false;
  titleContainer.visible = true; 

  startButton = new PIXI.Text("Start", {fontFamily:"Arial", fontSize:32, fill:"white"});
  startButton.interactive = true;
  startButton.buttonMode = true;
  startButton.on('mousedown', newGame)
  startButton.position.set(400,400);
  titleContainer.addChild(startButton);
  
  scoreButton = new PIXI.Text("High Scores", {fontFamily:"Arial", fontSize:32, fill:"white"});
  scoreButton.position.set(400,600);
  titleContainer.addChild(scoreButton);

  state=title;
  gameLoop();
  
}

function setup(){
//code needs to be refactored here so the background is called at the appropriate time within the play state.
id = PIXI.loader.resources["images/spritesheet.json"].textures;
b = new Bump(PIXI);
test = new Sprite(id["tester.png"]);
test.name = "player";
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

var x = keyboard(88);

x.press = function(){
  if(redTP>=3){
    bomb();
    redTP = 0;
  }
}

var z = keyboard(90);

z.press = function(){
  if(blueTP>=5){
    timeStop = true;
    blueTP = 0;
  }
}

scoreText = new PIXI.Text("Score:"+score , {fontFamily:"Arial", fontSize:32, fill:"white"});
scoreText.position.set(10, 10);

goText = new PIXI.Text("Signal Lost!", {fontFamily:"Arial", fontSize:32, fill:"white"});
goText.position.set(200,400);
goContainer.addChild(goText);

hpText = new PIXI.Text("HP<------>", {fontFamily:"Arial", fontSize:32, fill:"white"});
hpText.position.set(250, 10);
uiContainer.addChild(hpText);

testSong.playFrom(0);

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
function title(){
  //Event listeners from the titleSetup are handling menu clicks
}

function gameOver(){
goContainer.visible = true;
testSong.pause();
removePlayer();

}

function play(){
//Checks if this is a new game, or if the player has advanced to a new level. Clears current level and loads in assets for new level.
newStageCheck();
//enemy & item AI
moveEnemies();
//Check if enemies need to be placed or removed from current level.
checkDistance(distance,level);
//Check collisions, if yes, apply penalties, rewards, and/or remove enemies. Control with switch statement.
bumpCheck();
//Check crash damage to see if the player has lost
damageCheck();
//Increment the distance counter
addDistance();
//move background according to distance counter
//check for maxDistance.
moveBG();
}

//title State Functions
function newGame(){
  titleContainer.visible=false;
  uiContainer.visible=true;
  container.visible=true;  
  //titleContainer.removeChildren(0, titleContainer.children.length); 
  setup();
}


//Play State Functions
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
    container.addChild(scoreText);
    enemyInit(level);
    createSprite(level);
}
}
function enemyInit(levelNum){
  Object.keys(level).forEach(function(key,index){
   if(levelNum[key]['iy'][0] != undefined){
     levelNum[key]['x'] = [];
     levelNum[key]['y'] = [];

     var newArrayX = levelNum[key]['x']; 
     var memArrayX =levelNum[key]['ix'];
     newArrayX.push.apply(newArrayX, memArrayX);

     var newArrayY = levelNum[key]['y'];
     var memArrayY =  levelNum[key]['iy'];
     newArrayY.push.apply(newArrayY, memArrayY);
    }
  })
};
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
  switch(timeStop){
    case true:
      stopCounter ++;
      //This game is capped at 60 fps. So 300 = 5 seconds.
      if(stopCounter==300){
        stopCounter = 0;
        timeStop = false;
      };
      break;
    case false:
      frame++;
      if(frame >= 60){
        frame = 0;
        distance++;
      }
      break;
  }
}
//Enemy Behavior
var movement ={
  dust: function(){this.position.y += 1},
  dust2: function(){this.position.y += 3},
  dust3: function(){this.position.y += 6},
  wall: function(){this.position.y += 1}
}


function moveEnemies(){
  switch(timeStop){
    case true:
      break;
    case false:
      if(container.children.length>3){  
        //loop through the array starting from position 2 and run container.children.[number].movement() on each.
        for(var i=3; i<container.children.length; i++){
          container.children[i].movement();
        }
      }
      break;
  }
} 

//Collision Detection
function bumpCheck(){
  for(var i=3; i<container.children.length; i++){
    var case1 = container.children[i];
    var caseName = container.children[i]['name'];
    var colTest = b.hit(test, case1, true);
    if(colTest){
      if(caseName == "dust" || 
         caseName == "dust2" || 
         caseName == "dust3"){ 
        var currentEnemy = container.children[i]['name'];
        switch(currentEnemy){
          case "dust": 
            greenTP++;
            score += 100;
            break;
          case "dust2":
            blueTP++;
            score += 200;
            break;
          case "dust3":
            redTP++;
            score += 300;
            break;
            
        }
        scoreText.text ="Score:"+score;
        level[currentEnemy].array.push(container.children[i]);
        container.removeChild(container.children[i]);
      }
      else if(caseName == "wall"){
        bumpedWallY = container.children[i].position.y;
        bumpedWallX = container.children[i].position.x; 
        onDragEnd();
        crashDamage += 1;
      }
      bumpedWallY = undefined;
      bumpedWallX = undefined;
}

//end of screen removal test should go here.
  if(container.children[i].position.y >=renderer.view.height){
      var currentEnemy = container.children[i]['name'];
      level[currentEnemy].array.push(container.children[i]);
      container.removeChild(container.children[i]);
      if(currentEnemy == 'dust' ||
         currentEnemy == 'dust2' ||
         currentEnemy == 'dust3'){
        hp--
      }
  }
}
}

//Move Background
function moveBG(){
  testBG.position.y = distance;
};


//Bomb Mechanic
function bomb(){
  for(i=3; i<container.children.length; i++){
    if(container.children[i]['name'] == "dust"){ 
      score += 100;
      scoreText.text ="Score:"+score;
    }
   // var currentEnemy = container.children[i]['name'];
   // level[currentEnemy].array.push(container.children[i]);
   // container.removeChild(container.children[i]); 
 }
  container.removeChildren(3, container.children.length)
}

//Check Damage for GameOver
function damageCheck(){
  if(crashDamage == 1){
    state=gameOver;
    
  }
  switch(hp){
    case 0:
      hpText.text = "HP[      ]";
      state=gameOver;
      break;
    case 1:
      hpText.text = "HP[--    ]";
      break;
    case 2:
      hpText.text = "HP[----  ]";
      break;
    case 3:
      hpText.text = "HP[------]";
      break;
  }
}

//GameOver State Functions
function removePlayer(){
  for(i=0; i<container.children.length; i++){
    if(container.children[i]['name'] == "player"){
      container.removeChild(container.children[i]);
    }   
  }  
}


function restartGame(){
  goContainer.visible = false;
  //clear all arrays
  //empty game containers
  container.removeChildren(0, container.children.length); 
  uiContainer.removeChildren(0, uiContainer.children.length); 
  //reset all counters
  frame = 0;
  score = 0;
  cdFrame = 0;
  crashDamage = 0;
  distance = 0;
  hp = 3;
  greenTP = 0;
  blueTP = 0;
  redTP = 0;
  //run setup function
  setup();  
}
