//An object will go here that holds all enemy spawn distances, and the max stage distance. Each stage will be organized into separate objects. And each object will hold enemy types, and each enemy type will have an array property that indicates the distances they spawn at. 
//A function will need to be written that can iterate over every enemy type's array to check for the current distance value. If yes, that enemy gets created to the stage. Movement functions will be assigned to each enemy/sprite individually

var stage1 = {
  1: {
    name: 'dust',
    quantity: 5,
    x: [50,100,200],
    y: [10,15,20]
  },
  2: {},
  3: {}

}
