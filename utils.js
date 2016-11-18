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
