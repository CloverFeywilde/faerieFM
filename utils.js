//Utility Function Globals
var bpm = 124;
var lastBeat = 0;
var crotchet = 60/bpm;
var canDie = false;


//Flash Function
function flash(){
  for(var i=3; i<container.children.length; i++){
    if(container.children[i].name == "greenDust"){
      //set animation speed, play animation
      var sprite = container.children[i];
      sprite.loop = false;
      sprite.animationSpeed = .05;
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
