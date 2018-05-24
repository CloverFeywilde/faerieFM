var icon1, icon2, icon3, infoBar;

function ssBuildMenu(){

  var container=new PIXI.Container();
  icon1 = new PIXI.Graphics();
  icon2 = new PIXI.Graphics();
  icon3 = new PIXI.Graphics();
  infoBar = new PIXI.Graphics();

  //First Diamond
  icon1.beginFill(0xF52549)
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



  //Prepare Animation
  let frames = [];
  for (let i=1; i<=48; i++){
    frames.push(PIXI.Texture.fromFrame('lineIdle'+i+".png"));  
  };  

  let idleLine = new PIXI.extras.AnimatedSprite(frames);
  idleLine.position.x = 0;
  idleLine.position.y = 437;
  idleLine.play();

  titleContainer.addChild(icon1, icon2, icon3, infoBar, idleLine);
};
