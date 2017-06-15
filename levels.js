//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually


var level1 = {
 greenDust: {
    name: 'greenDust',
    quantity: 10,
    animated: true,
    frames: 3,
//50,150,250,350,450,550,650
    x: [],
    y: [], 
    ix: [650,450,250,50,250,450,650,450,250],
    iy: [.483,.968,1.451,1.934,2.417,2.9,3.383,3.866,4.394 ]
  },

 blueDust: {
    name: 'blueDust',
    quantity: 0,
    animated: false,
    frames: undefined,
    x: [],
    y: [], 
    ix: [undefined],
    iy: [undefined]
  },

 redDust: {
    name: 'redDust',
    quantity: 0,
    animated: false,
    frames: undefined,
    x: [],
    y: [], 
    ix: [undefined],
    iy: [undefined]
  },
 wall: {
    name: 'wall',
    quantity: 1,
    animated: false,
    frames: undefined,
    x: [],
    y: [],
    ix: [300],
    iy: [5]
  },
 e3: {
    name: 'blank',
    quantity: 0,
    animated: false,
    y: [undefined],
    iy: [undefined]
  }

};
