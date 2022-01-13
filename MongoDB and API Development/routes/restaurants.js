const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await restaurantsData.get(req.params.id);
    res.json(restaurant);
  } catch (e) {
    res.status(404).json({ message: 'restaurant not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    const restaurantList = await restaurantsData.getAll();
    res.json(restaurantList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
    const restaurantData = req.body;
    if (!restaurantData.name) {
      res.status(400).json({ error: 'You must provide restaurant name' });
      return;
    }
    if (!restaurantData.location) {
      res.status(400).json({ error: 'You must provide restaurant location' });
      return;
    }
    //check this!
    if (!restaurantData.phoneNumber) {
      res.status(400).json({ error: 'You must provide restaurant phone number' });
      return;
    }
    if (!restaurantData.website) {
        res.status(400).json({ error: 'You must provide restaurant website' });
        return;
    }
    if (!restaurantData.priceRange) {
        res.status(400).json({ error: 'You must provide restaurant priceRange' });
        return;
    }
    if (!restaurantData.cuisines) {
        res.status(400).json({ error: 'You must provide restaurant cuisines' });
        return;
    }
    if (!restaurantData.serviceOptions) {
        res.status(400).json({ error: 'You must provide restaurant serviceOptions' });
        return;
    }

    try {
       
      const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = restaurantData;
      const newPost = await restaurantsData.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
      res.json(newPost);
      
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    if (!updatedData.name || !updatedData.location || !updatedData.phoneNumber || !updatedData.website || !updatedData.priceRange || !updatedData.cuisines || !updatedData.serviceOptions) {
      res.status(400).json({ error: 'You must supply all fields' });
      return;
    }
    try {
      await restaurantsData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'restaurant not found' });
      return;
    }
  
    try {
        //console.log(updatedData);
        let { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions} = updatedData;
      const updatedRestaurant = await restaurantsData.update(req.params.id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
      res.json(updatedRestaurant);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({ error: 'You must supply an ID to delete' });
      return;
    }
    try {
      await restaurantsData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'restaurant not found' });
      return;
    }
    try {
      await restaurantsData.remove(req.params.id);
      //res.sendStatus(200);
      res.json({"restaurantId": req.params.id, "deleted": true})
    } catch (e) {
      res.status(500).json({ error: e });
    }
    
});

module.exports = router;