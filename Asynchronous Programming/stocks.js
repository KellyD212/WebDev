
const axios = require('axios');
const {getPersonById, getPeople} = require('./people');


async function listShareholders() {
    if (arguments.length > 0) {
        throw 'this function does not require arguments';
    }
    let stocks = undefined;
    try {
        stocks = await getStocks();
    }
    catch(e) {
        console.log(e.message);
    }
    let people = undefined;
    try {
        people = await getPeople();
    }
    catch(e) {
        console.log(e.message);
    }
    for (let i = 0; i < stocks.length; i++) {
        array = stocks[i].shareholders;
        //if no shareholders, return empty array
        if (array.length == 0) {
            array = [];
        }
        for (let j = 0; j < array.length; j++) {
            const id = array[j].userId;
            let person = people.find(x => x.id === id);
            delete array[j].userId;
            array[j].first_name = person.first_name;
            array[j].last_name = person.last_name;
        }
        stocks[i].shareholders = array;
    }
    return stocks;
}

async function topShareholder(stockName) {
    if (stockName == undefined) {
        throw 'The stockName parameter is undefined';
    }
    if (typeof stockName !== 'string') {
        throw 'The stockName parameter must be of type string';
    }
    if (stockName.trim().length == 0) {
        throw 'The stockName cannot be empty spaces';
    }
    let stocks = await getStocks();
    let stockFound = 0;
    let empty = 0;

    //finds stock, if found checks that there are shareholders
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].stock_name == stockName) {
            stockFound = 1;
            if (stocks[i].shareholders.length > 0) {
                empty = 1;
            }
        }
    }
    if (stockFound == 0) {
        throw 'stockName cannot be found in stocks.json';
    }
    if (empty == 0) {
        let str = (`${stockName} currently has no shareholders.`);
        return str;
    }
    let top = 0;
    let first = undefined;
    let last = undefined;
    
    const stock = stocks.find(x => x.stock_name == stockName);
    for (let j = 0; j < stock.shareholders.length; j++) {
        if (stock.shareholders[j].number_of_shares > top) {
            top = stock.shareholders[j].number_of_shares
            const id = stock.shareholders[j].userId;
            try {
                const person = await getPersonById(id);
                first = person.first_name;
                last = person.last_name;
            }
            catch (e) {
                console.log(e.message);
            }
            
        }
    }
    
    const statement = `With ${top} shares in ${stockName}, ${first} ${last} is the top shareholder.`;
    return statement;
}

async function listStocks(firstName, lastName) {
    if (firstName == undefined) {
        throw 'The firstName parameter is undefined';
    }
    if (typeof firstName !== 'string') {
        throw 'The firstName parameter must be of type string';
    }
    if (firstName.trim().length == 0) {
        throw 'The firstName cannot be empty spaces';
    }
    if (lastName == undefined) {
        throw 'The lastName parameter is undefined';
    }
    if (typeof lastName !== 'string') {
        throw 'The lastName parameter must be of type string';
    }
    if (lastName.trim().length == 0) {
        throw 'The lastName cannot be empty spaces';
    }

    let people = await getPeople();
    let stocks = await getStocks();
    let found = 0;
    let id = undefined;
    for (let i = 0; i < people.length; i++) {
        if (people[i].first_name == firstName && people[i].last_name == lastName){
            found = 1;
            id = people[i].id;
        }
    }
    if (found == 0) {
        throw 'the person does not exist in the people array';
    }
    let array = [];
    for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < stocks[i].shareholders.length; j++) {
            if (stocks[i].shareholders[j].userId == id) {
                const newObj = {};
                newObj.stock_name = stocks[i].stock_name;
                newObj.number_of_shares = stocks[i].shareholders[j].number_of_shares;
                array.push(newObj);
            }
        }
    }
    return array;
}

async function getStockById(id) {
    if (id == undefined) {
        throw 'id parameter is undefined'
    }
    if (typeof id !== 'string') {
        throw 'id must be of type string'
    }
    if (id.trim().length == 0) {
        throw 'The id parameter cannot be empty spaces';
    }
    let stock = undefined;
    try {
        stock = await getStocks();
    }
    catch(e) {
        console.log(e.message);
    }
    const obj = stock.find(x => x.id === id);
    if (obj) {
        return obj;
    }
    else {
        throw 'stock not found';
    }
}

async function getStocks() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of stock objects
}

module.exports = {listShareholders, topShareholder, listStocks, getStockById};