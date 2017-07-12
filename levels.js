//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually


var level1 = {
 greenDust: {
    name: 'greenDust',
    quantity: 25,
    animated: true,
    frames: 3,
//7=50,6=150,5=250,4=350,3=450,2=550,1=650
    x: [],
    y: [], 
    ix: [650,550,450,550,450,350,450,550,450,550,650,550,450,350,250,150,50,150,50,150,250,150,50,150,50,150,50],
    iy: [0,.4839,.7257,.9676,1.2095,1.4514,1.9353,2.1772,2.4191,2.661,2.9029,3.3868,3.6287,3.8706,4.1125,4.3544,4.8383,5.0802,5.3221,5.564,5.8059,6.2898,6.5317,6.7736,7.0155,7.2574]
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
