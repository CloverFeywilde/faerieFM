function ssBuildMenu(){

  var container=new PIXI.Container();
  var graphics = new PIXI.Graphics();
  var graphics2 = new PIXI.Graphics();
  var graphics3 = new PIXI.Graphics();
  var graphics4 = new PIXI.Graphics();
  var graphics5 = new PIXI.Graphics();

  //First Diamond
  graphics.beginFill(0xF52549)
  .drawPolygon(0, 62.5, 62.5, 0, 125, 62.5, 62.5, 125)
  .drawPolygon(12.5, 62.5, 62.5, 12.5, 112.5, 62.5, 62.5, 112.5)
  .addHole();
  graphics.position.set(200,512)

  //Second Diamond
  graphics2.beginFill(0xF52549)
  .drawPolygon(0, 62.5, 62.5, 0, 125, 62.5, 62.5, 125)
  .drawPolygon(12.5, 62.5, 62.5, 12.5, 112.5, 62.5, 62.5, 112.5)
  .addHole();
  graphics2.position.set(300,612)

  //Third Diamond
  graphics3.beginFill(0xF52549)
  .drawPolygon(0, 62.5, 62.5, 0, 125, 62.5, 62.5, 125)
  .drawPolygon(12.5, 62.5, 62.5, 12.5, 112.5, 62.5, 62.5, 112.5)
  .addHole();
  graphics3.position.set(400,512)

  //Info Bar
  graphics4.beginFill(0xFFFFFF)
  .drawRect(0,0,720,150)
  graphics4.position.set(0,850)



  //Prepare Animation
  let frames = [];
  for (let i=1; i<=48; i++){
    frames.push(PIXI.Texture.fromFrame('lineIdle'+i+".png"));  
  };  

  let idleLine = new PIXI.extras.AnimatedSprite(frames);
  idleLine.position.x = 0;
  idleLine.position.y = 512;
  idleLine.play();

  titleContainer.addChild(graphics, graphics2, graphics3, graphics4,idleLine);
};
