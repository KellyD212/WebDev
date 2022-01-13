const questionOne = function questionOne(arr) {
    // Implement question 1 here
   
    let obj = {}

    if(arr) {
        arr.forEach(myFunction);
    }else {
        return {};
    }
        

    return obj;

    function myFunction(item, index, arr) {
       
        result = Math.abs(item**2 - 7);
        if (isPrime(result)) {
           obj[result]= "True";
            // arr[index] = toString(arr[index]) + ": True";
        }
        else {
            obj[result]= "False";
            //arr[index] = toString(arr[index]) + ": False";
        }
    }
    //https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript
    // above link credited for isPrime function
    function isPrime(n) {
        for(let i = 2; i < n; i++) {
            if(n%i === 0) {
                return false;
            }
        } return n > 1;
    }

}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/

    let newArr = [];
    for (let i = 0; i < arr.length; i++){
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;

}

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    let myAnagram = {}
    arr.sort();
    if(arr.length <= 0){
        return {};
    }

    for (let i=0; i<arr.length; i++){
        let sorted = arr[i].split('').sort().join('');
        if (!(sorted in myAnagram)) {
            myAnagram[sorted] = [];
        }
        if (!(myAnagram[sorted].includes(arr[i]))) {
            myAnagram[sorted].push(arr[i]);
        }
    }
    
    let newObj = {};
    for (const sorted in myAnagram) {
        if (myAnagram[sorted].length > 1) {
            newObj[sorted] = myAnagram[sorted];
        }
    }
  
    return newObj;
    } 

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    
    result = (factorial(num1) + factorial(num2) +factorial(num3))/((num1+num2+num3)/3);
    return Math.floor(result)

    //recursive method for factorial
    function factorial(n) {
        if (n<0) {
            return -1;
        }else if (n == 0){
            return 1;
        }else if (n == 1){
            return 1;
        }else {
            return n*factorial(n-1);
        }
    }

}

module.exports = {
    firstName: "Kelly", 
    lastName: "DiResto", 
    studentId: "10424201",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};