//Renderer Setup
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

renderer.renderer.backgroundColor = 0x02aaca;

//Different asset containers go here
var backContainer = new PIXI.Container();
backContainer.scale.x = backContainer.scale.y = 1;
renderer.stage.addChild(backContainer);
backContainer.visible = false;

var container = new PIXI.Container(); //main container
container.scale.x = container.scale.y = 1;
renderer.stage.addChild(container);

var frontContainer = new PIXI.Container();
frontContainer.scale.x = frontContainer.scale.y =1;
renderer.stage.addChild(frontContainer);
frontContainer.visible = false;

var titleContainer = new PIXI.Container();
titleContainer.scale.x = titleContainer.scale.y = 1;
renderer.stage.addChild(titleContainer);
titleContainer.visible = false;

var goContainer = new PIXI.Container();
goContainer.scale.x = goContainer.scale.y = 1;
renderer.stage.addChild(goContainer);
goContainer.visible = false;
goContainer.interactive = true;
goContainer.buttonMode = true;
goContainer.on('pointerdown', clicked);

var uiContainer = new PIXI.Container();
uiContainer.scale.x = uiContainer.scale.y = 1;
renderer.stage.addChild(uiContainer);
uiContainer.visible = false;

var loadingContainer = new PIXI.Container();
loadingContainer.scale.x = loadingContainer.scale.y = 1;
renderer.stage.addChild(loadingContainer);
loadingContainer.visible = false;

var pauseContainer = new PIXI.Container();
pauseContainer.scale.x = pauseContainer.scale.y = 1;
renderer.stage.addChild(pauseContainer);
pauseContainer.visible = false;

//Aliases and Globals
var Sprite = PIXI.Sprite;
var state, newPosition, level, player, testBG, distance, id, dust, firstTime, scoreText, bumpedWallY, bumpedWallX, goText, testSong, currentSong, songCreationTime, songStartTime, left, right, up, down, spacebar, songEndTime, beam1, pauseTime, pauseStartTime, pauseEndTime, d, character, character2, transformState, scoreResult;
var appWidth = renderer.renderer.width;
var appHeight = renderer.renderer.height;
var frame = 0;
var score = 0;
var cdFrame = 0;
var crashDamage = 0;
var hp = 10; 
var greenTP = 0;
var redTP = 0;
var blueTP = 0;
var timeStop = false;
var stopCounter = 0;
var deltaGlobal = 1;
var reload = false; 
var bpm = 0;   //BPM of current song, to be controlled with code
var feyPosY = 1130; //the Faerie's Y position
var upCoolDown = false;
var upClock = 0;
var gamePaused = 0;
var pauseTotal = 0;
var defNum = 1; //# of items the main container starts with by default
var hitArray = [];
var missArray = [];
var mehArray = [];
var feverTime = false;
var feverCounter = 0;
var fontFix = new PIXI.TextStyle({
  padding:5
});
var returnToTitle = false;



//Load the Sounds & load the setup functions
loadSounds();
function loadSounds(){
loadingText = new PIXI.Text("Loading Songs...", {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
loadingText.position.set(400,400);
loadingContainer.addChild(loadingText);
sounds.load([
  "sounds/faerieFM.mp3",
  "sounds/alleySpectre.mp3"
]);

sounds.whenLoaded = soundSetup;
state = loading;
renderer.ticker.start();
};

//Initialize the sounds and setupfunctions here
function soundSetup(){
  pauseSetup(); //sets up pause menu
  //Lets the browser process interactions normally
  renderer.renderer.plugins.interaction.autoPreventDefault = false;
  controlsSetup();
  b = new Bump(PIXI);
//Sprite creation & Setup function (done within the initial soundSetup)
PIXI.loader
  .add("images/spritesheet.json")
  .load(spriteSetup)
  .load(titleSetup);
};

//Setup functions for states and containers
function spriteSetup(){
  id = PIXI.loader.resources["images/spritesheet.json"].textures;
};

function controlsSetup(){

d = keyboard(68);
d.press = function(){
  debugMode();
};

left = keyboard(37);
left.press = function(){
 leftArrowMove();
};

right = keyboard(39);
right.press = function(){
  rightArrowMove();
};

up = keyboard(38);
up.press = function(){
  upArrowAtk();
};

down = keyboard(40);
down.press = function(){
  downArrowBonus();
};

spacebar = keyboard(32);
spacebar.press = function(){
  pauseStart();
};

enterKey = keyboard(13);
enterKey.press = function(){
  enterPressed();
};

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

window.onblur = function(){
  switch(state){
    case play: 
      pauseStart();
      break;
    default:
      break;
  }
};

window.onFocus = function(){
  switch(state){
    case play: 
      //pauseStart();
      break;
    default:
      break;
  }
};
}

function titleSetup(){ 
  titleContainer.removeChildren(0, titleContainer.children.length); 

  loadingContainer.visible = false;
  backContainer.visible = false;
  container.visible = false;
  frontContainer.visible = false;
  goContainer.visible = false;
  uiContainer.visible = false;
  titleContainer.visible = true; 

  let titleText = new PIXI.Text("FaerieFM", {fontFamily:"Conv_monogram", fontSize:184, fill:"white"})
  titleText.anchor.set(0.5,0.5);
  titleText.position.set(360,200);
  titleContainer.addChild(titleText);

  startButton = new PIXI.Text("Start", {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
  startButton.interactive = true;
  startButton.buttonMode = true;
  startButton.on('pointerdown', selectStage);
  startButton.anchor.set(0.5,0.5);
  startButton.position.set(360,600);
  titleContainer.addChild(startButton);
  
  scoreButton = new PIXI.Text("High Scores", {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
  scoreButton.anchor.set(0.46,0.5);
  scoreButton.position.set(360,800);
  titleContainer.addChild(scoreButton);

  state=title;
  renderer.ticker.start();
  
}

function resultsSetup(){ 
  titleContainer.removeChildren(0, titleContainer.children.length); 

  loadingContainer.visible = false;
  backContainer.visible = false;
  container.visible = false;
  frontContainer.visible = false;
  goContainer.visible = false;
  uiContainer.visible = false;
  titleContainer.visible = true; 

  let titleText = new PIXI.Text("Results!", {fontFamily:"Conv_monogram", fontSize:184, fill:"white"})
  titleText.anchor.set(0.5,0.5);
  titleText.position.set(360,200);
  titleContainer.addChild(titleText);

  let scoreTitle = new PIXI.Text("Your Score:", {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
  scoreTitle.anchor.set(0.5,0.5);
  scoreTitle.position.set(360,600);
  titleContainer.addChild(scoreTitle);
  
  let displayResult = new PIXI.Text(scoreResult, {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
  displayResult.interactive = true;
  displayResult.buttonMode = true;
  displayResult.on('pointerdown', selectStage);
  displayResult.anchor.set(0.46,0.5);
  displayResult.position.set(360,675);
  titleContainer.addChild(displayResult);

  let instructionsText = new PIXI.Text("tap or press enter to continue...", {fontFamily:"Conv_Minecraftia-Regular", fontSize:32, fill:"white", padding:20});
  instructionsText.anchor.set(0.46,0.5);
  instructionsText.position.set(360,1000);
  titleContainer.addChild(instructionsText);


  state=results;
  renderer.ticker.start();
  
}

function pauseSetup(){
  console.log("pauseSetup running");
  pauseText = new PIXI.Text("Paused!", {fontFamily:"Arial", fontSize:32, fill:"white"});
  pauseText2 = new PIXI.Text("press spacebar to continue...", {fontFamily:"Arial", fontSize:25, fill:"white"});
  //pause screen touch interactions go here
  pauseText.position.set(400,600);
  pauseText2.position.set(400,750);
  pauseContainer.addChild(pauseText, pauseText2);
};

function fcSetup(){
let frames =[];
for(let i=1; i<=18; i++){
  frames.push(PIXI.Texture.fromFrame('musetteRed'+i+'.png'));
}
character = new PIXI.extras.AnimatedSprite(frames, false);

character.name = "musette";
character.color = 'red';
character.anchor.set(0.5,0.5);
character.position.x = 359;
character.position.y = 1130;
character.animationSpeed = .2;
character.play();

let frames2 =[];
for(let i=1; i<=18; i++){
  frames2.push(PIXI.Texture.fromFrame('musetteBlue'+i+'.png'));
}
character2 = new PIXI.extras.AnimatedSprite(frames2, false);

character2.name = "musette";
character2.color = 'blue';
character2.anchor.set(0.5,0.5);
character2.position.x = 359;
character2.position.y = 1130;
character2.animationSpeed = .2;
character2.play();


  for(i=0; i<11; i++){ 
    let hitText = new PIXI.Text("Good!", {fontFamily:"Arial", fontSize:25, fill:"green"});
    let missText = new PIXI.Text("Bad!", {fontFamily:"Arial", fontSize:25, fill:"red"});
    let mehText = new PIXI.Text("meh..", {fontFamily:"Arial", fontSize:25, fill:"yellow"});
    hitArray.push(hitText);
    hitArray[i]['movement'] = function(){this.position.y -2;};

    missArray.push(missText);
    missArray[i]['movement'] = function(){this.position.y -2;};

    mehArray.push(mehText);
    mehArray[i]['movement'] = function(){this.position.y -2;};
  };
};

//Core setup function
function setup(){
titleContainer.removeChildren(0, titleContainer.children.length); //clears the titlescreen before the game runs
goContainer.removeChildren(0, goContainer.children.length);

//set up Musette's Animation frames
player = new Sprite(id["player.png"]);
player.name = "playerHitBox";
player.circular = true;
player.anchor.set(0.5,0.5);
player.position.x = 359;
player.position.y = 1130;
beam1 = new Sprite(id["beam1.png"]);
beam1.position.x = undefined;
beam1.position.y = undefined;

//add new character to frontContainer. Update position of character properly with movement. debug.

//frontContainer setup
fcSetup();


//UI Items
scoreText = new PIXI.Text("Score:"+score , {fontFamily:"Arial", fontSize:32, fill:"white"});
scoreText.position.set(10, 10);

hpText = new PIXI.Text("HP[----------]", {fontFamily:"Arial", fontSize:32, fill:"white"});
hpText.position.set(250, 10);
uiContainer.addChild(hpText);

feverText = new PIXI.Text("Fever[   ]", {fontFamily:"Arial", fontSize:32, fill:"white"});
feverText.position.set(450, 10);
uiContainer.addChild(feverText);

//Start the Song
currentSong.playFrom(0);

//Change to play state loop
state = play;
firstTime = true;
distance = 0;
renderer.ticker.start();

reload = true;
}


//Game Loop

renderer.ticker.add(function(delta){
deltaGlobal = delta;
if(state==play){
character.update(delta);
character2.update(delta);
}
state();
});


//Game States
function title(){
  //Event listeners from the titleSetup are handling menu clicks
}

function results(){
};

function loading(){
titleContainer.visible = false;
loadingContainer.visible = true;  
}

function gameOver(){
goContainer.visible = true;
currentSong.pause();
removePlayer();
}

function pause(){
pauseContainer.visible = true;
currentSong.pause();
}

function play(){
//Checks if this is a new game, or if the player has advanced to a new level. Clears current level and loads in assets for new level.
newStageCheck();
//CoolDowns
upTimer();
//enemy & item AI
moveEnemies();
//Check if enemies need to be placed or removed from current level.
checkDistance(distance,level);
//Check beat used for note animations
//beatKeeper();
//Check collisions, if yes, apply penalties, rewards, and/or remove enemies. Control with switch statement.
bumpCheck();
//Check if fever time is activated and keep track of how long it has left
feverCheck();
//Check crash damage to see if the player has lost
damageCheck();
//Increment the distance counter
addDistance();
//move background according to distance counter
moveBG();
//check for max distance
stageEnd();
}

//Title & Menu State Functions
/*function loadLevel(thisLevel){
  var currentLevel = JSON.parse(thisLevel);
  level = currentLevel;
  bpm = level['greenDust']['bpm'];
};
*/
function newGame(){
//For the future, this should probably clear the data from the titleContainer
  titleContainer.visible=false;
  uiContainer.visible=true;
  backContainer.visible =true;
  container.visible=true;  
  frontContainer.visible =true;
  //titleContainer.removeChildren(0, titleContainer.children.length); 
  setup();
}

function selectStage(){ 
  titleContainer.removeChildren(0, titleContainer.children.length); 

  ssBuildMenu();
  state = title;

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
    backContainer.addChild(testBG);
    container.addChild(player);
    uiContainer.addChild(scoreText);
    frontContainer.addChild(character);
    frontContainer.addChild(character2);
    character.visible=true;
    character2.visible=false;
    transformState = character.color;
    enemyInit(level);
    createSprite(level);
    songEndTime = level['greenDust']['y'][level['greenDust']['y'].length-1];
}
}
function enemyInit(levelNum){
//Enemy positions are copied from a starting array to a writeable array where they can be manipulated freely.
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
  //When a new stage is selected, this creates a new array for each type of enemy, and fills the empty array with a specified number new sprite copies
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
        tempAniHolder.anchor.set(0.5,0.5);
        levelNum[key]['array'].push(tempAniHolder);
      }
      else{
        var tempHolder = new Sprite(id[levelNum[key]['name']+".png"])
        tempHolder.anchor.set(0.5,0.5);
        levelNum[key]['array'].push(tempHolder);
      }
    }       
  })
}

function checkDistance(currentDist, levelNum){
//checks the massive array of enemy positions every frame to see if an enemy is ready to be spawned at the top of the screen. 
  Object.keys(levelNum).forEach(function(key,index){
    var yDist = levelNum[key]['y'][0];
    //offset and BPM need globals and a way to read them from .SM file
    var offset = (yDist - distance)*bpm*3;
    var enemyPosY = feyPosY - offset; 
    if(yDist != null){
      if(enemyPosY >= 0){
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
  sy = 0;
  var spawnTime = levelNum[enemy]['y'].shift();

  borrowed.position.x = sx;
  borrowed.position.y = sy;  
  //Play the Animation
  if (levelNum[enemy]['animated'] && enemy!='greenDust'){
   // borrowed.animationSpeed = .25;
    borrowed.play();
  };
  container.addChild(borrowed);
  var newSprite = container.children.length-1
  container.children[newSprite].spawnTime = spawnTime;
  container.children[newSprite].movement = movement[enemy];
  container.children[newSprite].name = levelNum[enemy]['name'];
  container.children[newSprite].color = levelNum[enemy]['color'];
}

function addDistance(){
  switch(timeStop){
   //Depreciated timeStop function that needs updating or likely trashing
    case true:
      stopCounter ++;
      //This game is capped at 60 fps. So 300 = 5 seconds.
      if(stopCounter==300){
        stopCounter = 0;
        timeStop = false;
      };
      break;
    case false: 
       //Due to the way the current song time is calculated, a different distance formula is nessesary to move all assets before and after the first pause.
      if(gamePaused==0){
        //Total time from the moment the song was first loaded, up till now.
        songCreationTime = currentSong.soundNode.context.currentTime;
        //The point where the song first played
        songStartTime = currentSong.startTime;
        //distance formula
        distance = songCreationTime - songStartTime; 
      }
      else if(gamePaused>=1){
       //Second Pause. pauseTime is calculated in a function triggered by the spacebar key, located in the setup function.
        distance = currentSong.soundNode.context.currentTime - pauseTime;
        //a record of the total time spent paused needs to be subtracted from the calulated distance. This value is calculated below.
        updatePauseTotal();
      }
      break;
  }
}

function updatePauseTotal(){ 
  //Total time spent paused
  pauseTotal += pauseTemp;
  //Time spent from previous pause. It resets after adding to total.
  pauseTemp = 0;
}


function stageEnd(){
  
  if(level['greenDust']['y'].length == 0 && container.children.length==1){
    container.removeChildren(0, container.children.length); 
    restartGame(); 
  }  
}


//Enemy Behavior
var movement ={
  greenDust: function(){this.position.y = feyPosY - ((this.spawnTime - distance)*bpm*3)},
  blueDust: function(){this.position.y += deltaGlobal * 3},
  redDust: function(){this.position.y += deltaGlobal * 6},
  wall: function(){this.position.y = feyPosY - ((this.spawnTime - distance)*bpm*3)} 
}

//FrontContainer Behavior
var frontMovement ={  
  hit: function(){this.position.y -= deltaGlobal *2;}
}


function moveEnemies(){
  switch(timeStop){
    case true:
      break;
    case false:
      if(container.children.length>defNum){  
        //loop through the array starting from position 2 and run container.children.[number].movement() on each.
        for(var i=defNum; i<container.children.length; i++){
          container.children[i].movement();
        }
      }
      break;
  }
  noteScoreAni(); //note score animations
} 

//Collision Detection
function bumpCheck(){
  for(var i=defNum; i<container.children.length; i++){
    var case1 = container.children[i];
    var caseName = container.children[i]['name'];
    //var colTest = b.hit(player, case1);
    var collision = b.hitTestCircleRectangle(player, case1);
    var remove = false;
    let noteColor = container.children[i]['color'];
    if(collision!=undefined && collision!=true && collision!=false){ 
      if(caseName == "greenDust" || 
        caseName == "wall"){ 
        var currentEnemy = container.children[i]['name'];
        switch(currentEnemy){
          case "greenDust":
          case "wall":
            if(feverTime){
              let perfect = "bottomMiddle";
              noteScore(perfect);
            }
            else if(noteColor == transformState){ 
              console.log(collision);
              //Scores need to be controlled in the noteScore() area
              noteScore(collision);
              remove = true;
            }
            else{
              //play some panic animation here  
            } 
            break;        
        }
              scoreText.text ="Score:"+score;

      }
      bumpedWallY = undefined;
      bumpedWallX = undefined;
    }
    
    
    
//end of screen removal test should go here.
else if(container.children[i].position.y >=renderer.view.height){
      remove = true;
      if(caseName == 'greenDust' ||
         caseName == 'wall'){
         if (debug){
           ;
         }
         else{
           hp -= 3;
         }
      }
  }
  
  if(remove){
    let currentEnemy = container.children[i]['name'];
    level[currentEnemy].array.push(container.children[i]);
    container.removeChild(container.children[i]);
    i--
  }
}
}

//Move Background
function moveBG(){
  testBG.position.y = distance;
};

//remove beam
function removeBeam(){
for(i=defNum; i<container.children.length; i++){
  if(container.children[i]['name'] == "beam1"){
    container.removeChild(container.children[i]);
    beam1.position.x = null;
    beam1.position.y = null;
  }; 
};
};

//Bomb Mechanic
function bomb(){
  for(i=defNum; i<container.children.length; i++){
    if(container.children[i]['name'] == "greenDust"){ 
      score += 100;
      scoreText.text ="Score:"+score;
    }
 }
  container.removeChildren(defNum, container.children.length)
}

//up Timer
function upTimer(){
if(upCoolDown==true){
  upClock += deltaGlobal;
  if(upClock >= (deltaGlobal*10)){
    upClock = 0;
    upCoolDown = false;
    for(i=defNum; i<container.children.length; i++){
      if(container.children[i]['name'] == "beam1"){
        container.removeChild(container.children[i]);
        beam1.position.x = null;
        beam1.position.y = null;
      }; 
    };
  };
};
};

//Check Damage for GameOver
function damageCheck(){
  if(crashDamage == 1){
    state=gameOver;
    
  }
if(hp <= 0 ){
  hpText.text = "HP[          ]";
  state=gameOver;
}
else{
  switch(hp){
    case 1:
      hpText.text = "HP[-         ]";
      break;
    case 2:
      hpText.text = "HP[--        ]";
      break;
    case 3:
      hpText.text = "HP[---       ]";
      break;
    case 4: 
      hpText.text = "HP[----      ]";
      break;
    case 5: 
      hpText.text = "HP[-----     ]";
      break;
    case 6: 
      hpText.text = "HP[------    ]";
      break;
    case 7: 
      hpText.text = "HP[-------   ]";
      break;
    case 8: 
      hpText.text = "HP[--------  ]";
      break;
    case 9: 
      hpText.text = "HP[--------- ]";
      break;
    case 10: 
      hpText.text = "HP[----------]";
      break;
  }
}
}

//GameOver State Functions
function removePlayer(){ 
  //remove the player sprite
  for(i=0; i<container.children.length; i++){
    if(container.children[i]['name'] == "playerHitBox"){
      container.removeChild(container.children[i]);
      frontContainer.removeChildren(); 
      //Game Over Text creation
      if(state==gameOver){
        let goText1 = new PIXI.Text("Stage Failed! Press enter to restart!", {fontFamily:"Arial", fontSize:32, fill:"white"});
        goText1.position.set(200,400);
        goContainer.addChild(goText1);
      }
    }   
  }  
}


function restartGame(){
  goContainer.visible = false;
  //clear all arrays
  //empty game containers
  backContainer.removeChildren(0, backContainer.children.length);
  container.removeChildren(0, container.children.length); 
  frontContainer.removeChildren(0, frontContainer.children.length);
  uiContainer.removeChildren(0, uiContainer.children.length); 
  //transfer Score to new variable
  scoreResult = score;
  //reset all counters
  upClock = 0;
  frame = 0;
  score = 0;
  cdFrame = 0;
  crashDamage = 0;
  distance = 0;
  hp = 10;
  greenTP = 0;
  blueTP = 0;
  redTP = 0;
  lastBeat = 0;
  upCoolDown = false;
  gamePaused = 0;
  pauseTotal = 0;
  pauseTemp = 0;
  hitArray = [];
  missArray = [];
  mehArray = [];
  feverTime = false;
  feverCounter = 0;
  feverTimer = 0;
  comboCount = 0;
  lane = 2;
    //run setup function or title setup function
  switch(returnToTitle){
    case false:
      if(debug){
        console.log("skipping results screen; restarting stage");
        setup();
      }
      else{
      resultsSetup();
      }
      break;
    case true:
      returnToTitle=false;
      selectStage();
      break;  
}
}


