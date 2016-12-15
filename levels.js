//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually

var level1 = {
 dust: {
    name: 'dust',
    quantity: 5,
    x: [50,100,200,300,400],
    y: [20,150,200,250,300]
  },
 e2: {
    name: 'blank',
    quantity: 0,
    y: [undefined]
  },
 e3: {
    name: 'blank',
    quantity: 0,
    y: [undefined]
  }

};
