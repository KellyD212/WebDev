
const {average, modeSquared, medianElement, merge} = require('./arrayUtils');
const {sortString, replaceChar, mashUp} = require('./stringUtils');
const {computeObjects, commonKeys, flipObject} = require('./objUtils');

// Mean Tests

try {
    // Should Pass
    const meanOne = average([[2, 3, 4], [2,5]]);
    console.log(meanOne);
    console.log('mean passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const meanTwo = average(['ko']);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
    console.log(e);
 }

//median test cases
try {
    // Should Pass
    const medianOne = medianElement([2, 3, 4, 2]);
    console.log(medianOne);
    console.log('median passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const medianTwo = medianElement(1234);
    console.error('median did not error');
} catch (e) {
    console.log('median failed successfully');
    console.log(e);
 }

 //modeSquared test cases

try {
    // Should Pass
    const modeOne = modeSquared([2, 3, 4, 4, 3]);
    console.log(modeOne);
    console.log('mode passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const modeTwo = modeSquared(1234);
    console.error('mode did not error');
} catch (e) {
    console.log('mode failed successfully');
    console.log(e);
 }

//merge test cases
try {
    // Should Pass
    const mergeOne = merge([11, 'i', 'r'], ['a', 'Y', 8, 'r', 3]);
    console.log(mergeOne);
    console.log('merge passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const mergeTwo = merge(['4', 2 ,'i'], [4]);
    console.error('merge did not error');
} catch (e) {
    console.log('merge failed successfully');
    console.log(e);
 }

 //mashUp test cases
try {
    // Should Pass
    const mashUpOne = mashUp('   ', 'DiResto', '#');
    console.log(mashUpOne);
    console.log('mashUp passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const mashUpTwo = mashUp('wowza', 'lol');
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
    console.log(e);
 }

 //sortString test cases
 try {
    // Should Pass
    const sortStringOne = sortString('Kel3lyDiRe!   sto#');
    console.log(sortStringOne);
    console.log('sortString passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const sortStringTwo = sortString(' ');
    console.error('sortString did not error');
} catch (e) {
    console.log('sortString failed successfully');
    console.log(e);
 }

 //replaceChar test cases
try {
    // Should Pass
    const replaceOne = replaceChar('Kelly', 2);
    console.log(replaceOne);
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const replaceCharTwo = replaceChar('Kelly', false);
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
    console.log(e);
 }


//test cases for computeObjects
try {
    // Should Pass
    const computeObjectsOne = computeObjects([{x: 2, y:3}, { a: 70, x: 4, z: 5 }], x => x * 2);
    console.log("computeObjects",computeObjectsOne);
    console.log('computeObjects passed successfully');
} catch (e) {
    console.error(e);
    console.log(e);
 }
try {
    // Should Fail
    const computeObjectsTwo = computeObjects(1234);
    console.error('computeObjects did not error');
} catch (e) {
    console.log('computeObjects failed successfully');
    console.log(e);
 }

//test cases for commonKeys
try {
    // Should Pass
    const commonKeysOne = commonKeys({a: 2, b: {x: 7}},{a: 3, b: {x: 7, y: 10}});
    console.log(commonKeys({a: 2, b: 4},{a: 5, b: 4}));
    console.log(commonKeysOne);
    console.log('commonKeys passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const commonKeysTwo = commonKeys(1234);
    console.error('commonKeys did not error');
} catch (e) {
    console.log('commonKeys failed successfully');
    console.log(e);
 }

 //test cases for flip object
 try {
    // Should Pass
    const flipObjectOne = flipObject({ a: 3, b: 7, c: { x: 1 } });
    console.log(flipObjectOne);
    console.log('flipObject passed successfully');
} catch (e) {
    console.error(e);
 }
try {
    // Should Fail
    const flipObjectTwo = flipObject(1234);
    console.error('flipObject did not error');
} catch (e) {
    console.log('flipObject failed successfully');
    console.log(e);
 }