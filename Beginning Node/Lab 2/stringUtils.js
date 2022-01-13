function sortString(string){
    //checks if string parameter exists
    if (string == undefined) {
        throw 'The string parameter is undefined';
    }

    //checks if string length is greater than zero
    if (string.length <= 0) {
        throw 'The string length must be greater than zero';
    }

    //checks if string is a string
    if (!(typeof string === 'string')) {
        throw 'The string parameter must be of type string';
    }

    if (string.trim().length == 0) {
        throw 'The string cannot be empty spaces';
    }
    array = string.split('');

    letters = [];
    specialChar = [];
    spaces = [];

    for (let idx = 0; idx < array.length; idx++) {
        if (/[a-z]/i.test(array[idx])) {
            letters.push(array[idx]);
            letters.sort();
        }
        else if (array[idx] === ' ') {
            spaces.push(array[idx]);
        }
        else {
            specialChar.push(array[idx]);
            specialChar.sort();
        }
       
    }
   
    sorted = letters.concat(specialChar, spaces);
    return sorted.join('');

}

function replaceChar(string,idx){
    //checks if string parameter exists
    if (string == undefined) {
        throw 'The string parameter is undefined';
    }

    //checks if string length is greater than zero
    if (string.length <= 0) {
        throw 'The string length must be greater than zero';
    }

    //checks if string is a string
    if (!(typeof string === 'string')) {
        throw 'The string must be of type string';
    }
    
    //string parameter is not just empty spaces
    if (string.trim().length == 0) {
        throw 'The string cannot be empty spaces';
    }
    //check that idx is the proper type
    if (isNaN(idx)) {
        throw 'Parameter idx must be a number';
    }
    //checks that idx is greater than zero and less than length of string minus 2
    if (idx < 1 || idx >= string.length-2){
        throw 'Parameter idx must be greater than zero and less than the length of the string -2';
    }

    

    str = string.split('');
    count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == str[idx]) {
            if (count % 2 == 0 && count != 0) {
                str[i] = str[idx+1];
            }
            if (count % 2 == 1) {
                str[i] = str[idx-1];
            }
            count = count + 1;
        }
    }
    return str.join('');
}

function mashUp(string1, string2, char){
    //checks if the parameters exist
    if (string1 == undefined) {
        throw 'The string1 parameter does not exist';
    }
    if (string2 == undefined) {
        throw 'The string2 parameter does not exist';
    }
    if (char == undefined) {
        throw 'The char parameter does not exist';
    }

    //checks if all parameters are strings
    if (typeof string1 !== 'string') {
        throw 'The string1 parameter must be of type string'
    }
    if (typeof string2 !== 'string') {
        throw 'The string2 parameter must be of type string';
    }
    if (typeof char !== 'string') {
        throw 'The char parameter must be of type string';
    }

    //checks that parameters are not empty spaces
    if (string1.trim().length == 0) {
        throw 'The string cannot be empty spaces';
    }
    if (string2.trim().length == 0) {
        throw 'The string cannot be empty spaces';
    }
    if (char.trim().length == 0) {
        throw 'The char cannot be empty spaces';
    }
    //checks that it is a single character
    if (char.length > 1) {
        throw 'Input must be a single character';
    }
    // splits strings into array of characters
    str1 = string1.split('');
    str2 = string2.split('');

    if (string1.length > string2.length) {
        longerString = string1;
    }
    else {
        longerString = string2;
    }
    const mashedUp = [];
    for (let i = 0; i < longerString.length; i++) {
        
        if (str1[i]) {
            mashedUp.push(str1[i]);
        }
        else {
            mashedUp.push(char)
        }
        if (str2[i]) {
            mashedUp.push(str2[i]);
        }
        else {
            mashedUp.push(char)
        }
    }
    return mashedUp.join('');
}

module.exports = {sortString, replaceChar, mashUp};