//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually


var level1 = {
 dust: {
    name: 'dust',
    quantity: 10,
//50,150,250,350,450,550,650
    x: [],
    y: [], 
    ix: [50,650,450,250,50,650,450,250,50],
    iy: [.483,.968,1.451,1.934,2.417,2.9,3.383,3.866,4.394 ]
  },

 dust2: {
    name: 'dust2',
    quantity: 0,
    x: [],
    y: [], 
    ix: [undefined],
    iy: [undefined]
  },

 dust3: {
    name: 'dust3',
    quantity: 0,
    x: [],
    y: [], 
    ix: [undefined],
    iy: [undefined]
  },
 wall: {
    name: 'wall',
    quantity: 1,
    x: [],
    y: [],
    ix: [300],
    iy: [5]
  },
 e3: {
    name: 'blank',
    quantity: 0,
    y: [undefined],
    iy: [undefined]
  }

};
