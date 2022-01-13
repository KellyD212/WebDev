function computeObjects(objects, func) {
    //checks if array is supplied as input parameter
    
    if (!(Array.isArray(objects))) {
        throw 'The input parameter must be an array';
    }

    //checks that elements in array are objects
    for (let i=0; i < objects.length; i++) {
        if (typeof objects[i] !== 'object') {
            throw 'The elements in the array must be objects'
        }
    }

    //checks that objects are not empty
    for (let i=0; i < objects.length; i++) {
        if (Object.keys(objects[i]).length === 0) {
            throw 'The objects cannot be empty';
        }
    }

    //checks that there is at least one element in array
    if (objects.length < 1) {
        throw 'The array cannot be empty';
    }

    //check that each value is a number
    for (let i=0; i < objects.length; i++) {
        for (let value of Object.values(objects[i])) {
            if (isNaN(value)) {
                throw 'The values of the objects in the array must be numbers';
            }
        }
    }

    //make sure the second parameter is a function
    if (typeof func !== 'function') {
        throw 'The parameter func must be a function';
    }

    newObj = {};
   
    for (let elem of objects) {
        for (let key in elem){
            if (key in newObj){
                newObj[key] = newObj[key] + func(elem[key]);
            }
            else {
                newObj[key] =  func(elem[key]);
            }
        }
    }
    return newObj;
}


function commonKeys(obj1, obj2){
    //checks that arguments are provided
    if (obj1 == undefined) {
        throw 'The obj1 parameter is undefined';
    }
    if (obj2 == undefined) {
        throw 'The obj2 parameter is undefined';
    }

    //checks that arguments are objects
    if (typeof obj1 !== 'object') {
        throw 'The parameter obj1 must be an object';
    }
    if (typeof obj2 !== 'object') {
        throw 'The parameter obj1 must be an object';
    }

    let keys1 = Object.keys(obj1);
    let values1 = Object.values(obj1);
    let keys2 = Object.keys(obj2);
    let values2 = Object.values(obj2);

    
    const common = {};
    for (let i = 0; i < keys1.length; i++) {
        let currentKey = keys1[i];
        if (currentKey in obj2){
            let value1 = obj1[currentKey];
            let value2 = obj2[currentKey];
            if (typeof value1 === 'object' && typeof value2 === 'object') {
                const newCommonKeys = commonKeys(value1,value2);
                common[currentKey] = newCommonKeys;
            }
            else if(value1 === value2) {
                common[currentKey] = value1;
            }
        }
    }
       
    return common;

}

function flipObject(object) {
    //checks that input parameter is object
    if (typeof object !== 'object') {
        throw 'The parameter object must be an object';
    }

    let keys = Object.keys(object);
    let values = Object.values(object);

    //checks that object has at least one key/value
    if (keys.length == 0 && values.length == 0){
        throw 'Each object must have at least one key/value'
    }

    let newObj = {};
    for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(values[i])) {
            for (let elem of values[i]) {
                newObj[elem] = keys[i];
            }
        }
        if (typeof values[i] === 'object') {
            const anotherObj = flipObject(values[i]);
            newObj[keys[i]] = anotherObj;
        }
        else {
            newObj[values[i]] = keys[i];
        }
       
    }
    return newObj;


}

module.exports = {computeObjects, commonKeys, flipObject};

