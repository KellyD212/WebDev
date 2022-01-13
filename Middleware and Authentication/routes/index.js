
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const usersData = require('../data/users');


const constructorMethod = (app) => {
  //app.use('/', userRoutes);
  app.get('/', async (req, res) => {
    //console.log('hi');
    if (req.session.user){
      console.log(new Date().toUTCString() +'  '+ req.method +'  '+  req.originalUrl + "(Authenticated User)");
      res.redirect('/private');
    }
    console.log(new Date().toUTCString() +'  '+ req.method +'  '+  req.originalUrl + "(Non-Authenticated User)");
    return res.render('users/login',{});
    
    //res.redirect('/login');
    //console.log(here);
  
  });
  app.get('/private', async (req, res) => {
    
    console.log(new Date().toUTCString() + '  '+ req.method + '  '+ req.originalUrl + "(Authenticated User)");
    //res.json({ route: '/private', method: req.method });
    //console.log(req.session);
    username = req.session.user.username;
    return res.render('users/private', {username: username});
  });
  
  app.post('/login', async (req, res) => {
    console.log(new Date().toUTCString() +'  '+ req.method +'  '+  req.originalUrl + "(Non-Authenticated User)");
      let username = req.body.username;
      let password = req.body.password;
      try{
        await usersData.checkUser(username, password);
        req.session.user = { username: username};
        return res.redirect('/private');
      } catch (e) {
        //console.log(e);
        return res.status(400).render('users/badinput', {
          error: e
      })
    }
  });
  app.get('/logout', async (req, res) => {
    //console.log('here');
    console.log(new Date().toUTCString() +'  '+ req.method +'  '+  req.originalUrl + "(Non-Authenticated User)");
    req.session.destroy();
    return res.redirect('/');
  });

  app.get('/signup', async (req, res) => {
    if (req.session.user){
      res.redirect('/private');
    }
    console.log(new Date().toUTCString() + '  '+ req.method + '  '+ req.originalUrl + "(Non-Authenticated User)");
    //res.json({ route: '/users', method: req.method });
    return res.render('users/signup',{});
  });
  
  app.post('/signup', async (req, res) => {
    if (req.session.user){
      res.redirect('/private');
    }
    console.log(new Date().toUTCString() + ' '+req.method + + ' ' + req.originalUrl + "(Non-Authenticated User)");
    
    try{ 
      let username = req.body.username;
      let password = req.body.password;
      await usersData.createUser(username, password);
      
      return res.redirect('/');
    } catch (e){
      if (e) {
      res.status(400).render('users/badinput', {
        error: e
      })
    }
      else {
        res.status(500).render('users/error', {
          error: 'Internal Server Error'
        })
      }
    }
    
    
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;