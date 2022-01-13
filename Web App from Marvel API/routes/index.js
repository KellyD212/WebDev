const marvelRoutes = require('./marvel');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', marvelRoutes);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;