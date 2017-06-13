//Renderer Setup
//var stage = new PIXI.Container()
var renderer = new PIXI.Application(720, 1280);
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
renderer.stage.addChild(container);


var titleContainer = new PIXI.Container();
titleContainer.scale.x = titleContainer.scale.y = 1;
renderer.stage.addChild(titleContainer);
titleContainer.visible = false;

var goContainer = new PIXI.Container();
goContainer.scale.x = goContainer.scale.y = 1;
renderer.stage.addChild(goContainer);
goContainer.visible = false;

var uiContainer = new PIXI.Container();
uiContainer.scale.x = uiContainer.scale.y = 1;
renderer.stage.addChild(uiContainer);
uiContainer.visible = false;


var loadingContainer = new PIXI.Container();
loadingContainer.scale.x = loadingContainer.scale.y = 1;
renderer.stage.addChild(loadingContainer);
loadingContainer.visible = false;

//Aliases and Globals
var Sprite = PIXI.Sprite;
var state, newPosition, level, test, testBG, distance, id, dust, firstTime, scoreText, bumpedWallY, bumpedWallX, goText, testSong, currentSong, songCreationTime, songStartTime, returnToTitle;
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
var deltaGlobal = 1;


//Load the Sounds
loadSounds();
function loadSounds(){
loadingText = new PIXI.Text("Loading Songs...", {fontFamily:"Arial", fontSize:32, fill:"white"});
loadingText.position.set(400,400);
loadingContainer.addChild(loadingText);
sounds.load([
  "sounds/faerieFM.mp3"
]);

sounds.whenLoaded = soundSetup;
state = loading;
renderer.ticker.start();
};

//Initialize the sounds here
function soundSetup(){
  testSong = sounds["sounds/faerieFM.mp3"];
//Sprite creation & Setup function (done within the initial soundSetup)
PIXI.loader
  .add("images/spritesheet.json")
  .load(titleSetup);
};


function titleSetup(){ 
  loadingContainer.visible = false;
  container.visible = false;
  goContainer.visible = false;
  uiContainer.visible = false;
  titleContainer.visible = true; 

  startButton = new PIXI.Text("Start", {fontFamily:"Arial", fontSize:32, fill:"white"});
  startButton.interactive = true;
  startButton.buttonMode = true;
  startButton.on('pointerdown', selectStage);
  startButton.position.set(400,400);
  titleContainer.addChild(startButton);
  
  scoreButton = new PIXI.Text("High Scores", {fontFamily:"Arial", fontSize:32, fill:"white"});
  scoreButton.position.set(400,600);
  titleContainer.addChild(scoreButton);

  state=title;
  renderer.ticker.start();
 // gameLoop();
  
}

function setup(){
//clear the titlescreen before the game runs
titleContainer.removeChildren(0, titleContainer.children.length); 

//(This was a terrible idea. Code needs to be cleaned to make better use of the play state. Code needs to be refactored here so the background is called at the appropriate time within the play state.
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
  if(redTP>=5){
    bomb();
    redTP = 0;
  }
}

var z = keyboard(90);

z.press = function(){
  if(blueTP>=3){
    timeStop = true;
    blueTP = 0;
  }
}

scoreText = new PIXI.Text("Score:"+score , {fontFamily:"Arial", fontSize:32, fill:"white"});
scoreText.position.set(10, 10);



hpText = new PIXI.Text("HP<------>", {fontFamily:"Arial", fontSize:32, fill:"white"});
hpText.position.set(250, 10);
uiContainer.addChild(hpText);

currentSong = testSong;
currentSong.playFrom(0);

state = play;
firstTime = true;
distance = 0;
renderer.ticker.start();
}


//Game Loop

renderer.ticker.add(function(delta){
deltaGlobal = delta;
state();
});


//Game States
function title(){
  //Event listeners from the titleSetup are handling menu clicks
}

function loading(){
titleContainer.visible = false;
loadingContainer.visible = true;  
}

function gameOver(){
goContainer.visible = true;
currentSong.pause();
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

//Title & Menu State Functions
function newGame(){
//For the future, this should probably clear the data from the titleContainer
  titleContainer.visible=false;
  uiContainer.visible=true;
  container.visible=true;  
  //titleContainer.removeChildren(0, titleContainer.children.length); 
  setup();
}

function selectStage(){ 
  titleContainer.removeChildren(0, titleContainer.children.length); 
  //hard code the list and add it to the title container. Each list item needs to run the setup function, and the setup function needs to be changed to initialize the sage at a particular variable that the list item determines when clicked.
   
  var songOne = new PIXI.Text("Song 1", {fontFamily:"Arial", fontSize:32, fill:"white"});
  var songTwo = new PIXI.Text("Song 2", {fontFamily:"Arial", fontSize:32, fill:"white"});
  var songThree = new PIXI.Text("Song 3", {fontFamily:"Arial", fontSize:32, fill:"white"});
    
songOne.position.set(200,400);
songTwo.position.set(200,600);
songThree.position.set(200,800);

//Set the interactions to change level and run newGame()  
songOne.interactive = true;
songOne.buttonMode = true;
songOne.on('pointerdown', function(){level=level1; newGame();})


songTwo.interactive = true;
songTwo.buttonMode = true;
songTwo.on('pointerdown', function(){level=level2; newGame();})


songThree.interactive = true;
songThree.buttonMode = true;
songThree.on('pointerdown', function(){level=level3; newGame();})

//Add each song to the titleContainer
titleContainer.addChild(songOne);
titleContainer.addChild(songTwo);
titleContainer.addChild(songThree);


};

//Play State Functions
//Level Creator- all functions dealing with level management go here and are called within the play state.
function newStageCheck(){
  if(firstTime){
    //reset all counters
    firstTime = false;
    //level = level1 
    testBG = new Sprite(id["background.png"]);
    testBG.interactive = true;
    testBG.buttonMode = true;
    testBG.on('pointerdown', clicked);
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
      //check if animated 
      if(levelNum[key]['animated']){
        //prepare frames here
        var frames = [];
        for(var i=1; i<=levelNum[key]['frames']; i++){
          frames.push(PIXI.Texture.fromFrame(levelNum[key]['name']+i+'.png'));
        }

        var tempAniHolder = new PIXI.extras.AnimatedSprite(frames);
        levelNum[key]['array'].push(tempAniHolder);
      }
      else{
        var tempHolder = new Sprite(id[levelNum[key]['name']+".png"])
        levelNum[key]['array'].push(tempHolder);
      }
    }       
  })
}

function checkDistance(currentDist, levelNum){
  Object.keys(levelNum).forEach(function(key,index){
    var yDist = levelNum[key]['y'][0];
    if(yDist != null){
      if(yDist <= currentDist){
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
  //Play the Animation
  if (levelNum[enemy]['animated'] && enemy!='greenDust'){
    borrowed.animationSpeed = .25;
    borrowed.play();
  };
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
      songCreationTime = currentSong.soundNode.context.currentTime;
      songStartTime = currentSong.startTime
      //set the distance counter equal to the current song time.
      distance =  songCreationTime - songStartTime 
      break;
  }
}
//Enemy Behavior
var movement ={
  greenDust: function(){this.position.y += deltaGlobal * 6},
  blueDust: function(){this.position.y += deltaGlobal * 3},
  redDust: function(){this.position.y += deltaGlobal * 6},
  wall: function(){this.position.y += deltaGlobal * 1}
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
      if(caseName == "greenDust" || 
         caseName == "blueDust" || 
         caseName == "redDust"){ 
        var currentEnemy = container.children[i]['name'];
        switch(currentEnemy){
          case "greenDust": 
            flash();
            greenTP++;
            score += 100;
            break;
          case "blueDust":
            blueTP++;
            score += 200;
            break;
          case "redDust":
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
 else if(container.children[i].position.y >=renderer.view.height){
      var currentEnemy = container.children[i]['name'];
      level[currentEnemy].array.push(container.children[i]);
      container.removeChild(container.children[i]);
      if(currentEnemy == 'greenDust' ||
         currentEnemy == 'blueDust' ||
         currentEnemy == 'redDust'){
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
    if(container.children[i]['name'] == "greenDust"){ 
      score += 100;
      scoreText.text ="Score:"+score;
    }
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
  //remove the player sprite
  for(i=0; i<container.children.length; i++){
    if(container.children[i]['name'] == "player"){
      container.removeChild(container.children[i]);

      //Game Over Text creation
      goText1 = new PIXI.Text("Signal Lost!", {fontFamily:"Arial", fontSize:32, fill:"white"});
      goText1.position.set(200,400);
      goContainer.addChild(goText1);
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
  //run setup function or title setup function
  switch(returnToTitle){
    case false:
      setup();
      break;
    case true:
      titleSetup();
      break;  
}
}


