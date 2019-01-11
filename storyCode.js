//Code for handling the visual novel cutscenes

//Sample Story Text Object
var branches = {
  branch0: {
    trigger: "",
    text: ""
  }

}

printText(){
  for(i=0, textpool.length-1, i++){
    //Use deltaTime to add together miliseconds for text delay
    //Put each piece character individually into the container.
    //toggle the visibility one at a time after the total DeltaTime is high enough. This is how a delay can be achieved
    textPool[i]  
	  
  }

}

//Main Parser
var textPool = [];
var loopCounter = 0;

function textParser(id){
  let stringID = branches[id].text; 
  for(i=loopCounter, stringID.length-1, i++){
    if(stringID[i] == "." || "!" || "?"){
      sentenceCounter++;
    }
    else if(stringID[i] == "#"){
      //actions logic
    }
    if(stringID[i] != "#"){
      //add to textPool    
      textPool.push(stringID[i]);
      if(sentenceCounter >= 1){
        //print, clear textPool, then break loop
        sentenceCounter=0;
        loopCounter=i+2;
	break;
      }
    }
  }
}

