//global functions
var loadLevel = function(song,thisLevel){
  //set the current song
  currentSong=sounds["sounds/"+song+".mp3"];
  
  //set currentLevel variable equal to a stage object from levels.json
  var currentLevel = JSON.parse(thisLevel);
  level = currentLevel;
  bpm = level['greenDust']['bpm'];

  //start the new game
  newGame();
}

//UI menu data ordered by position in this array
var stageInfo = [

  {
    title:'Pipe Panorama',
    artist:'Andrew Niehoff',
    difficulty:'Easy',
    highScore:'0000', //getting this to work will require some JSON via Electrum    
    execute: function(){ loadLevel('faerieFM',pipePanorama); }
  },

  {
    title:'Alley Spectre',
    artist:'Andrew Niehoff',
    difficulty:'Easy',
    highScore:'0000',
    execute: function(){ loadLevel('alleySpectre',alleySpectre); }
  },
  
  {
    title:'Test Stage',
    artist:'Andrew Niehoff',
    difficulty:'Easy',
    highScore:'0000',
    execute: function(){ loadLevel('faerieFM', testStage); }
  }

];
