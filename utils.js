//Utility Function Globals
var bpm = 124;
var lastBeat = 0;
var crotchet = 60/bpm; //this will no longer work since the BPM isn't calculated until later
var canDie = false;
var comboCount = 0;
var feverTimer = 0;

//Color Change Mechanic
function transform(){
  switch(transformState){
    case 'red':
      transformState = 'blue';
      break;
    case 'blue':
      transformState = 'red';
      break
    default: 
      console.log('Error! Transform State out of bounds!')
      transformState = 'red';
  }
}

//Checks how well you hit the note
function noteScore(colScore){
  switch(colScore){
    case "bottomLeft":
    case "bottomMiddle":
    case "bottomRight":
      //Good Hit
      let goodTxt = hitArray.shift();
      let goodPosX = player.position.x + 90;
      let goodPosY = player.position.y;
      goodTxt.name = "hitTxt";
      goodTxt.position.set(goodPosX, goodPosY);
      frontContainer.addChild(goodTxt);      
      let justAdded = frontContainer.children.length -1;
      frontContainer.children[justAdded]['movement'] = frontMovement['hit'];
      comboCount++
        if(comboCount>=10){
          comboCount = 0;
          if(hp<10){
            hp++;
          }
          feverCounter++
          feverBarUpdate();
        }
      break;
    case "topMiddle":
    case "topRight":
    case "topLeft":
      //Bad Hit
      let badTxt = missArray.shift();
      let badPosX = player.position.x + 60;
      let badPosY = player.position.y;
      badTxt.name = "missTxt";
      badTxt.position.set(badPosX, badPosY);
      frontContainer.addChild(badTxt);      
      let justAdded2 = frontContainer.children.length -1;
      frontContainer.children[justAdded2]['movement'] = frontMovement['hit'];
      comboCount = 0;
      if(debug){
        return;
      }
      else{
        hp--;
      }
      break;
    case "rightMiddle":
    case "leftMiddle":
      //Meh Hit 
      let mehTxt = mehArray.shift();
      let mehPosX = player.position.x + 60;
      let mehPosY = player.position.y;
      mehTxt.name = "mehTxt";
      mehTxt.position.set(mehPosX, mehPosY);
      frontContainer.addChild(mehTxt); 
      let justAdded3 = frontContainer.children.length -1;
      frontContainer.children[justAdded3]['movement'] = frontMovement['hit'];
      comboCount = 0;
      break;
    default: 
      break;
  };    
};

function noteScoreAni(){
  for(i=1; i<frontContainer.children.length; i++){
    let currentChild = frontContainer.children[i];
    if(currentChild['name'] == "hitTxt"||"missTxt"||"mehTxt"){
      if(currentChild['position']['y'] <= (player.position.y-60)){
        switch(currentChild['name']){
          case "hitTxt":
            //put it back in the containing array
            hitArray.push(currentChild);
            frontContainer.removeChild(currentChild);
            break;
          case "missTxt":
            missArray.push(currentChild);
            frontContainer.removeChild(currentChild);
            break;
          case "mehTxt":
            mehArray.push(currentChild);
            frontContainer.removeChild(currentChild);
            break;
          default:
            break;
          
        } 
      }
      else{
        frontContainer.children[i].movement();
      }
    };
  };
};

//Fever Time, down arrow triggered
function feverTimeStart(){
  if(feverCounter>=3 && feverTime==false){
    feverCounter = 0; 
    //feverTime Activate
    feverTime = true; 
    feverBarUpdate();
    //feverAnimation(); play faerie wing animation
  } 
};

function feverCheck(){
  if(feverTime==true){
    feverTimer += deltaGlobal;
    comboCount = 0;
    if(feverTimer >= (deltaGlobal*300)){
      feverTime = false;
      feverTimer = 0;
      feverCounter = 0;  
      //clear animation
    }
  }
}

function feverBarUpdate(){
  switch(feverCounter){
    case 0:
      feverText.text = "Fever[   ]";
      break;
    case 1: 
      feverText.text = "Fever[-  ]";
      break;
    case 2:
      feverText.text = "Fever[-- ]";
      break;
    case 3:
      feverText.text = "Fever[---]";
      break;
    default:
      break;
  }
}

//Flash Function
function flash(){
  for(var i=3; i<container.children.length; i++){
    if(container.children[i].name == "greenDust"){
      //set animation speed, play animation
      var sprite = container.children[i];
      sprite.loop = false;
      sprite.animationSpeed = .25;
      sprite.gotoAndPlay(0);
      canDie = true;
      sprite.onComplete = function(){
        this.gotoAndStop(0);
        canDie = false;  
        }
    }
  }  
}


//Beat Function
function beatKeeper(){
  //distance is equal to current song time
  if(distance > lastBeat + crotchet){
    flash();
    lastBeat+= crotchet;
  }

}




//String to Int Converter
function toInt(str){
var i = 0;
//var thing = str[i];
var num;
var newInt;

while(str[i] != "p"){
  num += str[i];
  i++
  if (i > str.length){
  break;
}
}
 
newInt = parseInt(num);
return newInt; 
}
