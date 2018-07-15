//Controls Globals
var feyX, feyY, posX, keyfeyX, keyFeyY, highlighted;
var cur = 0;
var curHl = 0;
var curHlDif = 0;
var curDif = 0;
var debug = false;
var lane = 2;
//menu highlighting function
function highlight(input){
  colorChange(false);

  if(input=='right'){
    cur++;
    curHl++;
    if(cur>stageInfo.length){
      cur=stageInfo.length;
    }
  }
  else if(input=='left'){
    cur--;
    curHl--;
    if(cur<0){
      cur=0;
    }
  }
  if(curHl>2){
    curHl--;
    if(cur<stageInfo.length-1){
      curHl=0;
    }
  }
  else if(curHl<0){
    curHl++;
    if(cur>0){
      curHl=2;
    }
  }
  highlighted = stageInfo[cur];
  colorChange(true);
  updateInfoBar();
}

function colorChange(status){
  switch(curHl){
    case 0:
      icon1.clear();
      if(status==true){
        icon1.beginFill(0xF52549)   
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }
      else if(status==false){ 
        icon1.beginFill(0xFFFFFF)   
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }
      icon1.position.set(172.5,437);
      break;
    case 1:
      icon2.clear();
      if(status==true){
        icon2.beginFill(0xF52549)
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }

      else if(status==false){ 
        icon2.beginFill(0xFFFFFF)   
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }
      icon2.position.set(272.5,537);
      break;
    case 2:
      icon3.clear();
      if(status==true){
        icon3.beginFill(0xF52549)
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }
      else if(status==false){ 
        icon3.beginFill(0xFFFFFF)   
        .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
        .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
        .addHole();
      }
      icon3.position.set(372.5,437);
      break;
    default:
      console.log("Menu Error: Menu Cursor out of bounds");
      break;      
  }
}

function highlightDif(input){
  colorChangeDif(false);

  if(input=='up'){
    curDif++;
    if(curDif>2){
      curDif=2;
    }
  }
  else if(input=='down'){
    curDif--;
    if(curDif<0){
      curDif=0;
    }
  }
  //Different stage difficulties will need to be coded into the menu data objects, and a naming convention will be required for the stage data itself. curDif controls the difficulty via a number between 0-2. 
  //highlightedDif = stageInfo[cur].difficulty[curDif];
  colorChangeDif(true);
 //if any text is updated on the Difficulty UI, it will need to be updated here and this function will need to be created.
 //updateInfoBarDif();
}


function colorChangeDif(status){
  switch(curDif){
    case 0:
      dif1.clear();
      if(status==true){
        dif1.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole();
        dif1.beginFill(0x6AA1C3)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
      }
      else if(status==false){
        dif1.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole(); 
        }
      break;
    case 1:
      dif2.clear();
      if(status==true){
        dif2.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole();
        dif2.beginFill(0xF9D87B)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
      }
      else if(status==false){
        dif2.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole();    
        }
      break;
    case 2:
      dif3.clear();
      if(status==true){
        dif3.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole();
        dif3.beginFill(0xF52549)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
      }
      else if(status==false){
        dif3.beginFill(0x000000)
        .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
        .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
        .addHole(); 
        }
      break;
    default:
      console.log("Menu Error: Difficulty cursor out of bounds");
      break;

  }  
}

function laneChange(direction){
  switch(direction){
    case 'left':
      if(lane>0){
        lane--
      }
      break;
    case 'right':
      if(lane<4){
       lane++
      }
      break;
    default:
      console.log("Unrecognized directional input")
      break;
  }
  switch(lane){
    case 0:
      player.position.x = 87;
      character.position.x = 87;
      character2.position.x = 87;
      break;
    case 1:
      player.position.x = 222;
      character.position.x = 222;
      character2.position.x = 222;
      break;
    case 2:
      player.position.x = 359;
      character.position.x = 359;
      character2.position.x = 359;
      break;
    case 3:
      player.position.x = 496;
      character.position.x = 496;
      character2.position.x = 496;
      break;
    case 4:
      player.position.x = 633;
      character.position.x = 633;
      character2.position.x = 633;
      break;
    default:
      console.log("Lane out of bounds!");
      break;
  }
}

//Keyboard & Click Movement Controls (click controls need updating for mobile)
function clicked(event){
  switch(state){
    case play:
      console.log(event.data.global);
      moveShip(event);
      break;
    case gameOver:
      returnToTitle=false; 
      goContainer.removeChildren(0, goContainer.children.length); 
      restartGame();
      break;
    case title:
      document.body.focus();
      break;
}   
}

function debugMode(){
  switch(state){
    case title:
       console.log("Debug Mode Activated; Refresh page to end");
       debug=true;
       break;
    case play:
       console.log("Debug Mode Activated; Refresh page to end");
       debug=true;
      break;
  }
}

function leftArrowMove(){
  switch(state){
    case play: 
      laneChange('left'); 
      break;
    case title:
      highlight('left');  
    default:
      break;   
  }
}

function rightArrowMove(){
  switch(state){
    case play:
      laneChange('right'); 
      break;
    case title:
      highlight('right');
    default:
      break;
  };
}

function upArrowAtk(){
//This entire thing is being overhauled to a color switching system. The up key will, to some capacity, change Musette's color so she can pick up notes of that color. (red/blue)
 switch(state){
    case play:
      transform();       
      break;
    case title:
      highlightDif("up");
    default:
      break;
}
}

function downArrowBonus(){
  switch(state){
    case play:
      feverTimeStart();
      break;
    case title:
      highlightDif("down");
      break;
    default:
      break;
  }
}

function pauseStart(){
  switch(state){
    case play:
      //The time when you enter pause menu
      pauseStartTime = currentSong.soundNode.context.currentTime;
      state=pause;
      break;
    case pause:
      gamePaused++; //How many times you've paused     
      //The time when you leave the pause menu
      pauseEndTime = currentSong.soundNode.context.currentTime;
      //variable used to store length of this pause
      pauseTemp = pauseEndTime-pauseStartTime;
      //Variable used to adjust distance formula after first pause.
      pauseTime = (pauseEndTime-pauseStartTime)+songStartTime+pauseTotal;
      pauseContainer.visible=false;
      currentSong.play();
      state=play;
      break;
    default:
      break;
  };
};

function enterPressed(){
  switch(state){
    case title:
      if(stageInfo[cur]!=undefined){
        console.log("Starting up stage...");
        stageInfo[cur].execute();
      }
      else{
        console.log("This icon is under construction!");
      }
      break;
    case results:
      scoreResult=0;
      selectStage();  
      break;
    case gameOver:
      returnToTitle=false; 
      goContainer.removeChildren(0, goContainer.children.length); 
      restartGame();
      break;
    default:
      break;
  }
}


//obsolete function
function moveShip(location){
 // var location2 = location.data.global
  feyX = test.position.x;
  feyY = test.position.y;
  posX = location.data.global.x;

  if((feyX - 100)>0 && (feyX + 100)<appWidth){
    if(posX<(appWidth/2)){
      feyX -= 100;
      test.position.x =feyX;
    }
    else if(posX>(appWidth/2)){
      feyX += 100;
      test.position.x = feyX;
    }
    else{
     return;
    }
  }
  else if(feyX==50 && posX>(appWidth/2)){
    feyX += 100;
    test.position.x = feyX;
  }
  else if (feyX==650 && posX<(appWidth/2)){
    feyX -= 100;
    test.position.x = feyX;
  }
  else{
    return;
  }
}


//obsolete function
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
    player.dragging = false;
    // set the interaction data to null
    player.data = null;
}

//obsolete function
function onDragMove()
{
    if (test.dragging)
    {
        newPosition = test.data.getLocalPosition(test.parent);
        if(newPosition.x == bumpedWallX){
          test.position.y = newPosition.y;
        }
        else if(newPosition.y == bumpedWallY){
          test.position.x = newPosition.x;
        }
        else if (newPosition.x >= 50 && newPosition.x <= renderer.renderer.width-50 && newPosition.y >=50 && newPosition.y <= renderer.renderer.height-50){
          test.position.x = newPosition.x;
          test.position.y = newPosition.y;
          return;
         }
        else if(newPosition.y >=50 && newPosition.y <= renderer.renderer.height-50){
          test.position.y = newPosition.y;
          return;
        }
        else if(newPosition.x >= 50 && newPosition.x <= renderer.renderer.width-50){
          test.position.x = newPosition.x;
          return;
        }
}
}

//Keyboard function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

//Other Menu functions
   var goOptionsCreate = function(){
        //Removes "signal lost" text, and adds retry or back to menu options
        goContainer.removeChildren(0, container.children.length);
        goText2 = new PIXI.Text("Retry?", {fontFamily:"Arial", fontSize:32, fill:"white"});
        goText2.position.set(200,400);

        goText3 = new PIXI.Text("Sound Menu", {fontFamily:"Arial", fontSize:32, fill:"white"});
        goText3.position.set(200,600);

        //Game Over Text Interactions
        goText2.interactive = true;
        goText2.buttonMode = true;
        goText2.on('pointerdown', function(){returnToTitle=false; goContainer.removeChildren(0, goContainer.children.length); restartGame();})

        goText3.interactive = true;
        goText3.buttonMode = true;
        goText3.on('pointerdown', function(){returnToTitle=true; goContainer.removeChildren(0, goContainer.children.length); restartGame();})
        goContainer.addChild(goText2);
        goContainer.addChild(goText3);
      };
   
