
//Click Movement Controls
function clicked(event){
  console.log(event.data.global);
  moveShip(event)
}

function moveShip(location){
  var location2 = location.data.global
  console.log("move ship to: ", location2);
  test.position.x = location2.x;
  test.position.y = location2.y;
  onDragStart(location);
  onDragMove();
}

//Mouse Drag Functions
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    console.log(event.data);
    test.data = event.data;
    test.dragging = true;
}

function onDragEnd()
{
    test.dragging = false;
    // set the interaction data to null
    test.data = null;
}

function onDragMove()
{
    if (test.dragging)
    {
        newPosition = test.data.getLocalPosition(test.parent);
        if (newPosition.x >= 50 && newPosition.x <= renderer.width-50 && newPosition.y >=50 && newPosition.y <= renderer.height-50){
          test.position.x = newPosition.x;
          test.position.y = newPosition.y;
          return;
         }
        else if(newPosition.y >=50 && newPosition.y <= renderer.height-50){
          test.position.y = newPosition.y;
          return;
        }
        else if(newPosition.x >= 50 && newPosition.x <= renderer.width-50){
          test.position.x = newPosition.x;
          return;
        }
}
}
