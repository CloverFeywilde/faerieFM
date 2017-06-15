//Controls Globals
var feyX, feyY

//Click Movement Controls
function clicked(event){
  switch(state){
    case play:
      console.log(event.data.global);
      moveShip(event);
      break;
    case gameOver:
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
      goOptionsCreate();
      break;
    case title:
      break;
}   
}

function moveShip(location){
 // var location2 = location.data.global
  feyX = test.position.x
  feyY = test.position.y
  var posX = location.data.global.x
 // console.log("move ship to: ", location2);
  if((feyX - 100)>0 && (feyX + 100)<720){
    if(posX < feyX){
      feyX -= 100;
      test.position.x = feyX;
    }
    else if(posX > feyX){
      feyX += 100;
      test.position.x = feyX;
    } 
    else{
     return;
    }
  }
  else if(feyX==50 && posX>feyX){
    feyX += 100;
    test.position.x = feyX;
  }
  else if (feyX==650 && posX<feyX){
    feyX -= 100;
    test.position.x = feyX;
  }
  else{
    return;
  }
 // test.position.x = location2.x;
 // test.position.y = location2.y;
 // onDragStart(location);
 // onDragMove();
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


