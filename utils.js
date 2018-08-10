//Utility Function Globals
var bpm = 124;
var lastBeat = 0;
var crotchet = 60/bpm; //this will no longer work since the BPM isn't calculated until later
var canDie = false;
var comboCount = 0;
var feverTimer = 0;
var comboMult = 0;
var ftMax = 0;

//Color Change Mechanic
function transform(){
  switch(character.visible){
    case true:
      character.visible = false;
      character2.visible = true;
      transformState = character2.color;
      break;
    case false:
      character.visible = true;
      character2.visible = false;
      transformState = character.color;
      break;
    default: 
      console.log('Error! Transform State out of bounds!');
      character.visible = true;
      character2.visible = false;
      transformState = character.color;
      break;
  }
}

//Updated Custom Scoring System
function hitScore(player, note, ftStatus){
  let playerValue = player.position.y - (player.height / 2);
  let noteValue = note.position.y + (note.height / 2);
  let hitPoint = noteValue - playerValue;   

  if(hitPoint <= perfectMargin || ftStatus == true){
    //perfect score
    console.log("perfect");
    //Fever Bar and Health Recovery calculation goes here

    //score Calculation
    comboMult++
    let m = Math.floor(comboMult/4)
    if(m<1){
      m=1;
    }
    score += (m * m * 10) * 3;
    hp += hpPerf;
    
   }

  else if(hitPoint <= 40){
    //good score
    console.log("good");
    //Fever Bar and Health Recovery calculation goes here

    //score Calculation
    comboMult++
    let m = Math.floor(comboMult/4)
    if(m<1){
      m=1;
    }
    score += (m * m * 10);
    hp += hpGood;
  }

  else if(hitPoint <= 80){
    //meh score
    console.log("meh");
   //Fever Bar and Health Recovery Calculation Goes here

   //score Calculation
   let m2 = Math.floor(comboMult/4)
      if(m2<1){
        m2=1;
      }
      score += (m2 * 10);
      comboMult = 0;
      hp += hpMeh;
  }

  else if(hitPoint <= 120){
    //bad score
    console.log("bad");
    //Fever Bar and Health Recover Calculation goes here

    //score calculation
    comboMult = 0;
      if(debug){
        return;
      }
      else{
        hp += hpBad;
      }
  }

  if(hp >= hpTotal){
    hp = hpTotal;
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
      
      //score Calculation
      comboMult++
      let m = Math.floor(comboMult/4)
      if(m<1){
        m=1;
      }
      score += (m * m * 10); 
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
      comboMult = 0;
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
      let m2 = Math.floor(comboMult/4)
      if(m2<1){
        m2=1;
      }
      score += (m2 * 10);
      comboMult = 0; 
      break;
    default: 
      break;
  };    
};

function noteScoreAni(){
  for(i=2; i<frontContainer.children.length; i++){
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

//Fever Bar Calculation
function ftBarCalc(){
  let totalNotes = level['greenDust']['iy'].length + level['wall']['iy'].length;
  let comboMult = 0;
  let score = 0;
  
  for (i=0; i<totalNotes; i++){
    comboMult++
    let m = Math.floor(comboMult/4); 
    if(m<1){
      m = 1;
    }
    score += (m * m * 10);
  }
  
  ftMax = score;

}

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
