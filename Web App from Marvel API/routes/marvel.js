const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
const md5 = require('blueimp-md5');
const { query } = require('express');
const publickey = '86b6d35afdf3c07d7dc60020d9b57daf';
const privatekey = 'InsertYourOwnKey';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const urlquery = '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


router.get('/', async (req, res) => {
  try {
       res.render('pages/charfinder',{title:"Character Finder"});
     } catch (error) {
       res.sendStatus(500)
     }
});
  
router.get('/characters/:id', async (req, res) => {
    try {
      const character = await axios.get(baseUrl + "/" + req.params.id + urlquery);
    } catch (e) {
      res.status(404).render( 'pages/error', { 
        title: 'Not Found',
        searchTerm: req.params.id  
        });
    }
    const character = await axios.get(baseUrl + "/" + req.params.id + urlquery);
    try{  
      res.render('pages/character', {
        title:"Characters Found",
        character: character.data.data.results[0].name, 
        description: character.data.data.results[0].description, 
        comics:character.data.data.results[0].comics.items, 
        image: character.data.data.results[0].thumbnail.path + '/portrait_medium.' +character.data.data.results[0].thumbnail.extension});
    } catch (e) {
      res.status(500).json({ error: e });
      console.log(e)
    }
});

router.post('/search', async (req, res) => {
 
  if (!req.body.searchTerm) {
    res.status(400).render('pages/spaceserror', {
      title: 'Input Error',
      error: 'Cannot enter empty search term',
    });
  } 
  if (req.body.searchTerm.trim() == 0) {
    res.status(400).render('pages/spaceserror', {
      title: 'Input Error',
      error: 'Cannot enter spaces as search term or empty search term',
    });
  }
 

  try{

    const testEmpty = await axios.get(baseUrl +urlquery+  '&nameStartsWith='+ req.body.searchTerm);
    if (testEmpty.data.data.results.length == 0 ) throw 'No characters found';
  
  } catch(e) {
    res.status(404).render( 'pages/error', { 
      title: 'Not Found',
      searchTerm: req.body.searchTerm , 
      });
  }
  try{
    const characters = await axios.get(baseUrl +urlquery+  '&nameStartsWith='+ req.body.searchTerm)
     res.render('pages/characters_found',{
      title:"Characters Found", 
      searchTerm: req.body.searchTerm, 
      characters: characters.data.data.results 
    });
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

module.exports = router;
  
  