//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually


var level1 = {
 dust: {
    name: 'dust',
    quantity: 6,
    x: [],
    y: [], 
    ix: [50,100,200,300,20,500,150,20,100,200,20,400],
    iy: [10,11,15,16,17,20,30,35,36,37,38,40]
  },

 dust2: {
    name: 'dust2',
    quantity: 1,
    x: [],
    y: [], 
    ix: [400],
    iy: [2]
  },

 dust3: {
    name: 'dust3',
    quantity: 1,
    x: [],
    y: [], 
    ix: [50],
    iy: [4]
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
