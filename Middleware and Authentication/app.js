const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === 'number')
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    }
});
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use('/private', (req, res, next) => {
    //console.log(req.session.id);
    if (!req.session.user) {
      return res.status(403).render('users/error', {
        error: 'user is not logged in'
      })
    } else {
      next();
    }
});
  

configRoutes(app);
  
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});