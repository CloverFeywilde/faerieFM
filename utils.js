//String to Int Converter
function toInt(str){
var i = 0;
var thing = str[i];
var num;
var newInt;

while(thing != "p"){
  num += thing
  i++
}
 
newInt = parseInt(num);
return newInt; 
}
