function computeObjects(objects, func) {
    //checks if array is supplied as input parameter
    const arrayOfObj = [objects];
    if (!(isArray(arrayOfObj))) {
        throw 'The input parameter must be an array';
    }

    //checks that elements in array are objects
    for (let i=0; i < arrayOfObj.length; i++) {
        if (typeof arrayOfObj[i] !== 'object') {
            throw 'The elements in the array must be objects'
        }
    }

    //checks that objects are not empty
    for (let i=0; i < arrayOfObj.length; i++) {
        if (Object.keys(arrayOfObj[i]).length === 0) {
            throw 'The objects cannot be empty';
        }
    }

    //checks that there is at least one element in array
    if (arrayOfObj.length < 1) {
        throw 'The array cannot be empty';
    }

    //check that each value is a number
    for (let i=0; i < arrayOfObj.length; i++) {
        if (isNaN(Object.values(arrayOfObj[i]))) {
            throw 'The values of the objects in the array must be numbers';
        }
    }

    //make sure the second parameter is a function
    if (typeof func !== 'function') {
        throw 'The parameter func must be a function';
    }


}

function commonKeys(obj1, obj2){
    //checks that arguments are provided
    if (obj1 == undefined) {
        throw 'The obj1 parameter does not exist';
    }
    if (obj2 == undefined) {
        throw 'The obj2 parameter does not exist';
    }

    //checks that arguments are objects
    if (typeof obj1 !== 'object') {
        throw 'The parameter obj1 must be an object';
    }
    if (typeof obj2 !== 'object') {
        throw 'The parameter obj1 must be an object';
    }


}

function flipObject(object) {
    //checks that input parameter is object
    if (typeof object !== 'object') {
        throw 'The parameter object must be an object';
    }

    //checks that object has at least one key/value
    if (Object.keys(object).length > 0 && Object.values(object).length > 0){
        throw 'Each object must have at least one key/value'
    }

}

// DOUBLE CHECK ALL ERRORS WORK AND ARE CHECKING FOR THE CORRECT THING
//ALSO DOUBLE CHECK THAT I DON'T NEED TO ADD OUT OF BOUNDS SUCH AS INVALID ARRAY INDEX OR NEGATIVE NUMBERS TYPE OF STUFF