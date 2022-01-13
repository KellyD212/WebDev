const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;

router.get('/:id', async (req, res) => {
  try {
    const review = await reviewsData.getAll(req.params.id);
    res.json(review);
  } catch (e) {
    res.status(404).json({ message: 'review not found' });
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    const reviewList = await reviewsData.get(req.params.id);
    res.json(reviewList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/:id', async (req, res) => {
    const reviewData = req.body;
    if (!reviewData.title) {
      res.status(400).json({ error: 'You must provide review title' });
      return;
    }
    if (!reviewData.reviewer) {
      res.status(400).json({ error: 'You must provide reviewer' });
      return;
    }
    if (!reviewData.rating) {
        res.status(400).json({ error: 'You must provide rating' });
        return;
    }
    if (!reviewData.dateOfReview) {
        res.status(400).json({ error: 'You must provide review date' });
        return;
    }
    if (!reviewData.review) {
        res.status(400).json({ error: 'You must provide review body' });
        return;
    }

    try {
      const { title, reviewer, rating, dateOfReview, review } = reviewData;
      const newReview = await reviewsData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
      //console.log('here');
      res.json(newReview);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    //console.log(req.params.id);
    if (!req.params.id) {
      res.status(400).json({ error: 'You must supply an ID to delete' });
      return;
    }
    try {
      await reviewsData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'review not found' });
      return;
    }
    try {
      await reviewsData.remove(req.params.id);
      //res.sendStatus(200);
      res.json({"reviewId": req.params.id, "deleted": true})
    } catch (e) {
        console.log(e);
      res.status(500).json({ error: e });
    }
    
});

module.exports = router;