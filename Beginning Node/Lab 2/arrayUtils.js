function average(arrays) {
    //checks if array parameter exists
    if (arrays == undefined) {
        throw 'The array parameter is undefined';
    }
  
    //checks if array is of type array
    if (!(Array.isArray(arrays))) {
        throw 'The parameter "arrays" must be of type array';
    }

    //checks if array is not empty
    if (arrays.length == 0){
        throw 'The array cannot be empty';
    }

    //checks if each array element is also an array
    for (let i = 0; i < arrays.length; i++){
        if (!(Array.isArray(arrays[i]))){
            throw 'Each element of arrays must be an array whose elements are numbers'
        }
    }
    for (let i = 0; i < arrays.length; i++){
        for (let j = 0; j < arrays[i].length; j++){
            if (isNaN(arrays[i][j])) {
                throw 'Each element of arrays must be an array whose elements are numbers'
            }
        }
    }

    //gives the average of the arrays
    let combined = [];
    for (let i = 0; i < arrays.length; i++) {
        combined = combined.concat(arrays[i]);
    }
    sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum = sum + combined[i];
    }

    return Math.round(sum / (combined.length));

}

function modeSquared(array){
 //checks if array parameter exists
    if (array == undefined) {
        throw 'The array parameter is undefined';
    }
  
    //checks if array is of type array
    if (!(Array.isArray(array))) {
        throw 'The parameter "array" must be of type array';
    }

    //checks if array is not empty
    if (array.length == 0){
        throw 'The array cannot be empty';
    }

    //checks if each element is a number
    for (let i = 0; i < array.length; i++) {
        if(isNaN(array[i])) {
            throw 'Each element of the array must be a number';
        }
    }

    //finds the mode
    let obj = {};
    for (let i = 0; i< array.length; i++) {
        if (obj[array[i]]) {
            obj[array[i]] = obj[array[i]] + 1;
        }
        else {
            obj[array[i]] = 1;
        }
    }

    let max = obj[array[0]];
    let mode = [];
    for (let num in obj) {
        if (obj[num] > max) {
            max = obj[num];
            mode = [num];
        }
        if (obj[num] == max) {
            mode.push(num);
        }
    }
    let sum = 0;
    mode.forEach ((num) => {
        sum = sum + num **2;
    })
    
    //https://www.javascripttutorial.net/javascript-every/
    modeCheck = false;
    if (max != 1) {
        modeCheck = true;
    }
    
    if (!modeCheck) {
        return 0;
    }
    else {
        return sum;
    }
    
}

function medianElement(array){
//checks if array parameter exists
    if (array == undefined) {
        throw 'The array parameter is undefined';
    }
  
    //checks if array is of type array
    if (!(Array.isArray(array))) {
        throw 'The parameter "array" must be of type array';
    }

    //checks if array is not empty
    if (array.length == 0){
        throw 'The array cannot be empty';
    }

    //checks if each element is a number
    for (let i = 0; i < array.length; i++) {
        if(isNaN(array[i])) {
            throw 'Each element of the array must be a number';
        }
    }
    
    //find the median element in the array
    const originalArray = [...array];
    const inOrder = sortNum(array);
    const median = {};
    //if even length, take avg of the two elements and return higher index
    if(inOrder.length % 2 === 0) {
        elem1 = inOrder[(inOrder.length)/2 - 1];
        elem2 = inOrder[(inOrder.length)/2];
        medValue = (elem1 +elem2)/2;
        for (let i = 0; i < array.length; i++) {
            if (originalArray[i] === elem2) {
                index = i;
            }
        }
        median[medValue] =  index;
    }
    //if odd length
    if(inOrder.length % 2 === 1) {
        medValue = inOrder[Math.floor((inOrder.length)/2)];
        index = originalArray.findIndex(first => first === medValue);
        median[medValue] = index;
    }
    
    return median;

}

function merge(arrayOne, arrayTwo){
    //checks if array parameter exists
    if (arrayOne == undefined) {
        throw 'The arrayOne parameter is undefined';
    }
    if (arrayTwo == undefined) {
        throw 'The arrayTwo parameter is undefined';
    }


    //checks if array is of type array
    if (!(Array.isArray(arrayOne))) {
        throw 'The parameter "arrayOne" must be of type array';
    }
    if (!(Array.isArray(arrayTwo))) {
        throw 'The parameter "arrayTwo" must be of type array';
    }


    //checks if array is not empty
    if (arrayOne.length == 0){
        throw 'The array cannot be empty';
    }
    if (arrayTwo.length == 0){
        throw 'The array cannot be empty';
    }

    //checks if each element is a num or char string
    for (let i = 0; i < arrayOne.length; i++) {
        if (isNaN(arrayOne[i]) &&  typeof arrayOne[i] !== 'string') {
            throw 'Each element of the array must be of type number or char string';
        }
    }
    for (let i = 0; i < arrayTwo.length; i++) {
        if (isNaN(arrayTwo[i]) &&  typeof arrayTwo[i] !== 'string') {
            throw 'Each element of the array must be of type number or char';
        }
    }
    //strings must be one char
    for (let i = 0; i < arrayOne.length; i++) {
        if(arrayOne[i].length > 1) {
            throw 'String elements must be a single character';
        }
    }
    for (let i = 0; i < arrayTwo.length; i++) {
        if(arrayTwo[i].length > 1) {
            throw 'String elements must be a single character';
        }
    }

    //no special characters
    for (let i = 0; i < arrayOne.length; i++) {
        if(!(arrayOne[i].toString().match(/[a-z]/i)) && isNaN(arrayOne[i])) {
            throw 'Elements in the arrays cannot be special characters';
        }
    }
    for (let i = 0; i < arrayTwo.length; i++) {
        if(!(arrayTwo[i].toString().match(/[a-z]/i)) && isNaN(arrayTwo[i])) {
            throw 'Elements in the arrays cannot be special characters';
        }
    }
    //numbers with type string should throw
    for (let i = 0; i < arrayOne.length; i++) {
        if (typeof arrayOne[i] === 'string' && (!(isNaN(arrayOne[i])))) {
            throw 'Numbers must be of type number';
        }
    }
    for (let i = 0; i < arrayTwo.length; i++) {
        if (typeof arrayTwo[i] === 'string' && (!(isNaN(arrayTwo[i])))) {
            throw 'Numbers must be of type number';
        }
    }

    combined = arrayOne.concat(arrayTwo);
    upperCase = [];
    lowerCase = [];
    numbers = [];

    for (let i = 0; i < combined.length; i++) {
        if (combined[i] == combined[i].toString().toUpperCase() && (/[a-z]/i.test(combined[i]))) {
            upperCase.push(combined[i]);
            upperCase.sort();
        }
        else if (combined[i] == combined[i].toString().toLowerCase() && (/[a-z]/i.test(combined[i]))) {
            lowerCase.push(combined[i]);
            lowerCase.sort();
        }
        else {
            numbers.push(combined[i]);
            sortNum(numbers);
        }
       
    }
    sorted = lowerCase.concat(upperCase, numbers);
    return sorted;
}

function sortNum(array){
    //helper to sort numbers
    //https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
    return array.sort(function(a,b) {
        return a - b;
    });
}

module.exports = {average, modeSquared, medianElement, merge};

