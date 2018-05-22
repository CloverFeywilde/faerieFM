var graphics, graphics2, graphics3, graphics4, graphics5;

function ssBuildMenu(){

  var container=new PIXI.Container();
  graphics = new PIXI.Graphics();
  graphics2 = new PIXI.Graphics();
  graphics3 = new PIXI.Graphics();
  graphics4 = new PIXI.Graphics();
  graphics5 = new PIXI.Graphics();

  //First Diamond
  graphics.beginFill(0xF52549)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  graphics.position.set(172.5,437)

  //Second Diamond
  graphics2.beginFill(0xF52549)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  graphics2.position.set(272.5,537)

  //Third Diamond
  graphics3.beginFill(0xF52549)
  .drawPolygon(0, 87.5, 87.5, 0, 175, 87.5, 87.5, 175)
  .drawPolygon(12.5, 87.5, 87.5, 12.5, 162.5, 87.5, 87.5, 162.5)
  .addHole();
  graphics3.position.set(372.5,437)

  //Info Bar
  graphics4.beginFill(0xFFFFFF)
  .drawRect(0,0,720,150)
  graphics4.position.set(0,925)



  //Prepare Animation
  let frames = [];
  for (let i=1; i<=48; i++){
    frames.push(PIXI.Texture.fromFrame('lineIdle'+i+".png"));  
  };  

  let idleLine = new PIXI.extras.AnimatedSprite(frames);
  idleLine.position.x = 0;
  idleLine.position.y = 437;
  idleLine.play();

  titleContainer.addChild(graphics, graphics2, graphics3, graphics4,idleLine);
};
