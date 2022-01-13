
const axios = require('axios');

async function getPersonById(id) {
    let data = undefined;
    try {
        data = await getPeople();
    }
    catch(e) {
        console.log(e.message)
    }
    if (id == undefined) {
        throw 'id parameter is undefined';
    }
    if (typeof id !== 'string') {
        throw 'id must be of type string';
    }
    if (id.trim().length == 0) {
        throw 'The id parameter cannot be empty spaces';
    }
   
    const obj = data.find(x => x.id === id);
    if (obj) {
        return obj;
    }
    return {};

}

async function sameStreet(streetName, streetSuffix) {
    if (streetName == undefined) {
        throw 'streetName parameter is undefined'
    }
    if (streetSuffix == undefined) {
        throw 'streetSuffix parameter is undefined'
    }

    if (typeof streetName !== 'string') {
        throw 'streetName must be of type string'
    }
    if (typeof streetSuffix !== 'string') {
        throw 'streetSuffix must be of type string'
    }

    if (streetName.trim().length == 0) {
        throw 'The streetName cannot be empty spaces';
    }
    if (streetSuffix.trim().length == 0) {
        throw 'The streetSuffix cannot be empty spaces';
    }

    const data = await getPeople();
    const arrayOfSame = [];
    
    //go through array of objects, see if values are the same
    for(let i=0; i < data.length; i++) {
        const homeStreet = data[i].address.home.street_name;
        const homeSuffix = data[i].address.home.street_suffix;
        const workStreet = data[i].address.work.street_name;
        const workSuffix = data[i].address.work.street_suffix;

        if (homeStreet.toLowerCase() == streetName.toLowerCase() && homeSuffix.toLowerCase() == streetSuffix.toLowerCase()) {
            arrayOfSame.push(data[i]);
        }
        if (workStreet.toLowerCase() == streetName.toLowerCase() && workSuffix.toLowerCase() == streetSuffix.toLowerCase()) {
            arrayOfSame.push(data[i]);
        }

    }
    if (arrayOfSame.length < 2) {
        throw 'less than two people in the array live or work on this street';
    }
    return arrayOfSame;
}

async function manipulateSsn() {
    if (arguments.length > 0) {
        throw 'this function does not require arguments'
    }
    const data = await getPeople();
    let newObj = {};
    let highObj = {};
    let lowObj = {};
    const newArray = [];
    let highest = 0;
    let lowest = 999999999;
    for (let i = 0; i < data.length; i++) {
        social = data[i].ssn;
        help = social.split('-').join('');
        sorted = parseInt(help.split('').sort().join(''));
        if (sorted > highest) {
            highest = sorted;
            highObj.firstName = data[i].first_name;
            highObj.lastName = data[i].last_name;
        }

        if (sorted < lowest) {
            lowest = sorted;
            lowObj.firstName = data[i].first_name;
            lowObj.lastName = data[i].last_name;
        }

        newArray.push(sorted);
    }
    let avg = await average(newArray);
    newObj.highest = highObj;
    newObj.lowest = lowObj;
    newObj.average = avg;
    return newObj;
}

async function sameBirthday(month, day) {
    if (month == undefined) {
        throw 'month parameter is undefined';
    }
    if (day == undefined) {
        throw 'day parameter is undefined';
    }
    month = parseInt(month);
    day = parseInt(day);

    // error checks that month and day are numbers after parse int
    if (isNaN(month)) {
        throw 'month must be of type number';
    }
    if (isNaN(day)) {
        throw 'day must be of type number';
    }
    if (month < 1 || month > 12) {
        throw 'month must be from 01-12';
    }
    if (month == 9 || month == 4 || month == 6 || month == 11) {
        if (day > 30) {
            throw 'there are only 30 days in that month';
        }
    }
    if (month == 2) {
        if (day > 28) {
            throw 'there are only 28 days in february';
        }
    }
    if (day > 31) {
        throw 'there are only 31 days in this month';
    }

    const data = await getPeople();
    const arrayOfPeople = [];
    for (let i=0; i<data.length; i++) {
        const bdayMonth = parseInt(data[i].date_of_birth.substring(0,2));
        const bdayDay = parseInt(data[i].date_of_birth.substring(3,5));
        if (month == bdayMonth && day == bdayDay){
            const fullName = (`${data[i].first_name} ${data[i].last_name}`);
            arrayOfPeople.push(fullName);
        }
    }
    if (arrayOfPeople.length == 0) {
        throw 'there are no people with that birthday';
    }
    return arrayOfPeople;
}


async function getPeople() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data; // this will be the array of people objects
}

//from Kelly DiResto HW 2
async function average(arrays) {
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

    //gives the average of the arrays
    let combined = [];
    for (let i = 0; i < arrays.length; i++) {
        combined = combined.concat(arrays[i]);
    }
    sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum = sum + combined[i];
    }

    return Math.floor(sum / (combined.length));

}
module.exports = {getPersonById, sameStreet, manipulateSsn, sameBirthday, getPeople};