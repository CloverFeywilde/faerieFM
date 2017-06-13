//Flash Function

function flash(){
  for(var i=3; i<container.children.length; i++){
    if(container.children[i].name == "greenDust"){
      //set animation speed, play animation
      container.children[i].loop = true;
      container.children[i].animationSpeed = .25;
      container.children[i].play();
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
