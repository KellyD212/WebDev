const palindromeRoute = require('./palindrome');

const constructorMethod = (app) => {
    app.use('/',palindromeRoute)
    
};

module.exports = constructorMethod;