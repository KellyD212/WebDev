const lab1 = require("./lab1");

console.log(lab1.questionOne([4])); 
// should return and output: {'9': false} 
console.log(lab1.questionOne([8, 9, 12])); 
//returns and outputs: {'57': false, '74': false, '137': true}
console.log(lab1.questionOne([2])); 
// returns and outputs: {'3': true} 
console.log(lab1.questionOne([])); 
// returns and outputs: {}
console.log(lab1.questionOne()); 
// returns and outputs: {}


console.log(lab1.questionTwo([6, 14, 3, 3, 1, 14])); 
// should return and output: [6, 14, 3,1] 
console.log(lab1.questionTwo([2, 2, 1, 1, 1])); 
//returns and outputs: [2, 1]
console.log(lab1.questionTwo([7, '7', 7])); 
// returns and outputs: [7, '7'] 
console.log(lab1.questionTwo(['a', 'a', 2, '1'])); 
// returns and outputs: ['a', 2, '1']
console.log(lab1.questionTwo([])); 
//returns and outputs: []


console.log(lab1.questionThree(["bar", "car", "arc", "foo","oof"])); 
// should return and output: { acr: ["car", "arc"], foo: ['foo','oof'] }
console.log(lab1.questionThree(["star", "arts", "home", "work"])); 
// returns and outputs: { arst: ["star", "arts"] }
console.log(lab1.questionThree(["swing", "wind", "wings", "air", "wings", "wind", "wind"]));
// returns and outputs: { ginsw: ["swing", "wings"] } 
console.log(lab1.questionThree(["Kelly", "is", "so", "cool"]));
// returns and outputs: {}
console.log(lab1.questionThree([])); 
// returns and outputs: {}


console.log(lab1.questionFour(1, 3, 2)); 
// should return and output: 4
console.log(lab1.questionFour(2, 5, 6)); 
//returns and outputs: 194 
console.log(lab1.questionFour(1, 4, 5)); 
// should return and output: 43
console.log(lab1.questionFour(2, 1, 0)); 
//returns and outputs: 4
console.log(lab1.questionFour(10, 10, 10)); 
// should return and output: 10088640