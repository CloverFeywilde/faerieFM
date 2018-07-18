var icon1, icon2, icon3, dif1, dif2, dif3, infoBar, songTitle, songArtist;

//fontStyles
var mono82 = new PIXI.TextStyle({
  fontFamily:"Conv_monogram",
  fontSize:82
})

var minecraftia32 = new PIXI.TextStyle({
  fontFamily:"Conv_Minecraftia-Regular",
  fontSize:32,
  padding:20
}) 

var minecraftia26 = new PIXI.TextStyle({
  fontFamily:"Conv_Minecraftia-Regular",
  fontSize:26,
  padding:20
})

function ssBuildMenu(){

  var container=new PIXI.Container();
  icon1 = new PIXI.Graphics();
  icon2 = new PIXI.Graphics();
  icon3 = new PIXI.Graphics();
  dif1 = new PIXI.Graphics();
  dif2 = new PIXI.Graphics();
  dif3 = new PIXI.Graphics();
  infoBar = new PIXI.Graphics();
  
  icon1.interactive = true;
  icon2.interactive = true;
  
  icon1.buttonMode = true;
  icon2.buttonMode = true;

  icon1.on('pointerdown',stageInfo[0].execute);
  icon2.on('pointerdown',stageInfo[1].execute);  
  
  //First Diamond
  icon1.beginFill(0xFFFFFF)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  icon1.position.set(172.5,437)

  //Second Diamond
  icon2.beginFill(0xFFFFFF)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  icon2.position.set(272.5,537)

  //Third Diamond
  icon3.beginFill(0xFFFFFF)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  icon3.position.set(372.5,437)

  //Info Bar
  infoBar.beginFill(0xFFFFFF)
  .drawRect(0,0,720,150)
  infoBar.position.set(0,925)

  //difficulty chart
  //First Diamond
  dif1.beginFill(0x000000)
  .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
  //second diamond
  .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
  .addHole();
  dif1.beginFill(0x6AA1C3)
  .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82); 
  dif1.position.set(500,977.5)

  dif2.beginFill(0x000000)
  .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
  //second diamond
  .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
  .addHole();
  dif2.position.set(550, 927.5)


  dif3.beginFill(0x000000)
  .drawPolygon(0, 43.75, 43.75, 0, 87.5, 43.75, 43.75, 87.5)
  //second diamond
  .drawPolygon(5.5, 43.75, 43.75, 5.5, 82, 43.75, 43.75, 82)
  .addHole();
  dif3.position.set(600,977.5)
  
  //set the highlighter
  highlighted = stageInfo[cur]; 

  //fill infoBar
  songTitle = new PIXI.Text(highlighted.title, mono82);
  songTitle.position.set(35, 940);

  songArtist = new PIXI.Text("by "+highlighted.artist, minecraftia26);
  songArtist.position.set(35,1040);

  //Prepare Animation
  let frames = [];
  for (let i=1; i<=48; i++){
    frames.push(PIXI.Texture.fromFrame('lineIdle'+i+".png"));  
  };  

  let idleLine = new PIXI.extras.AnimatedSprite(frames);
  idleLine.position.x = 0;
  idleLine.position.y = 437;
  idleLine.play();

  titleContainer.addChild(icon1, icon2, icon3, infoBar, dif1, dif2, dif3, idleLine, songTitle, songArtist);

  //Highlight Currently Selected Song and Difficulty
  colorChange(true);
  colorChangeDif(true);

};


//update infoBar
function updateInfoBar(){
  if(highlighted == undefined){
    songTitle.text = "Song Unavailable";
    songArtist.text = " ";
  }
  else{
  songTitle.text = highlighted.title;
  songArtist.text = "by "+highlighted.artist;
  }
}
