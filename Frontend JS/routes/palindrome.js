const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => { 
    res.render('renderscreen/form',{});
   
});
router.post('/', async (req, res) => { 
    console.log(hi);
    let phrase = req.body.phrase.toLowerCase();
    console.log(phrase);
    res.render('renderscreen/form', {});
   
});
module.exports = router;