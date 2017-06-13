//Flash Function

function flash(){
  for(var i=3; i<container.children.length; i++){
    if(container.children[i].name == "greenDust"){
      //set animation speed, play animation
      var sprite = container.children[i];
      sprite.loop = false;
      sprite.animationSpeed = .1;
      sprite.gotoAndPlay(0);
      sprite.onComplete = function(){
        this.gotoAndStop(0);  
        }
    }
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
