const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');
const axios = require('axios');
const restaurantsData = require('./restaurants');

let exportedMethods = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        
        if (!restaurantId) throw 'You must provide a restaurantId for your review';
        if (!title) throw 'You must provide a title for your review';
        if (!reviewer) throw 'You must provide a reviewer for your review';
        if (!rating) throw 'You must provide a rating for your review';
        if (!dateOfReview) throw 'You must provide a date for your review';
        if (!review) throw 'You must provide a review';

        if (typeof restaurantId != 'string') throw 'restaurantId must be a string';
        if (typeof title != 'string') throw 'title must be a string';
        if (typeof reviewer != 'string') throw 'reviewer must be a string';
        if (typeof dateOfReview != 'string') throw 'date must be a string';
        if (typeof review != 'string') throw 'review must be a string';

        if (restaurantId.trim().length == 0) throw 'restaurantId cannot be empty string or empty spaces';
        if (title.trim().length == 0) throw 'title cannot be empty string or empty spaces';
        if (reviewer.trim().length == 0) throw 'reviewer cannot be empty string or empty spaces';
        if (dateOfReview.trim().length == 0) throw 'date cannot be empty string or empty spaces';
        if (review.trim().length == 0) throw 'review cannot be empty string or empty spaces';

        //if restaurantid provided is not valid objectid
        //if restaurant does not exist
        if (rating > 5 || rating < 1) throw 'rating must be a number 1-5'
        
        //date is not valid date string
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (!(date_regex.test(dateOfReview))) throw 'date is not in valid format MM/DD/YYYY';
        //date is prior or after today's date, from stackoverflow: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        if (dateOfReview != today) throw "date must be today's date"
        

        const reviewCollection = await reviews();
        const restaurantCollection = await restaurants();


        let newReview = {
            restaurantId: restaurantId,
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };
        
        const insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw 'Could not add review';
        
        const newId = insertInfo.insertedId;
        
        try{
            await restaurantsData.addReviewToRestaurant(restaurantId, newId.toString(), title, reviewer, rating, dateOfReview, review);
        } catch (e) {
            console.log(e);
        }
        const restaurantReviewed = await restaurantsData.get(restaurantId);
        const allRatings = [];
        for (let i = 0; i < restaurantReviewed.reviews.length; i++) {
            allRatings.push(restaurantReviewed.reviews[i].rating);
        }
        const averageRating = await this.average(allRatings);

        await restaurantCollection.updateOne({ _id: ObjectId(restaurantId)}, {$set: {overallRating: averageRating} });

        return newReview;
    },

    async getAll(restaurantId) {
        
        if (!restaurantId) throw 'You must provide a restaurantId for your review';
        if (typeof restaurantId != 'string') throw 'restaurantId must be a string';
        if (restaurantId.trim().length == 0) throw 'restaurantId cannot be empty string or empty spaces';
        
        //does below autmoatically throw for invalid objectid?
        restaurantId = ObjectId(restaurantId);
        
        try{
            const reviewCollection = await reviews();
           
            const restaurantCollection = await restaurants();
            const selectedRestaurant = await restaurantCollection.findOne({_id: restaurantId});
            const reviewsList = selectedRestaurant.reviews;
            if (reviewsList === null) throw 'No restaurant with that id';
            
            for(let i = 0; i < reviewsList.length;i++)
                reviewsList[i].id = reviewsList[i].id.toString();
            return reviewsList;
            
        } catch(e) {
            console.log(e);
        }
        
    },

    async get(reviewId) {
        if (!reviewId) throw 'You must provide a reviewId for your review';
        if (typeof reviewId != 'string') throw 'reviewId must be a string';
        if (reviewId.trim().length == 0) throw 'reviewId cannot be empty string or empty spaces';
       
        //does below automatically throw
        const id = ObjectId(reviewId);
            
        const reviewCollection = await reviews();
        
        const review = await reviewCollection.findOne({_id: id});
        if (review === null) throw 'No review with that id';
        review._id = review._id.toString();
        return review;
    },

    async remove(reviewId) {
        if (!reviewId) throw 'You must provide a reviewId for your review';
        if (typeof reviewId != 'string') throw 'reviewId must be a string';
        if (reviewId.trim().length == 0) throw 'reviewId cannot be empty string or empty spaces';
        //does below automatically throw
        const id = ObjectId(reviewId);
        const reviewCollection = await reviews();
        const restaurantCollection = await restaurants();
        
        let review = null;
        try {
            review = await this.get(reviewId);
        } catch (e) {
            console.log(e);
            return;
        }
        
        try {
            console.log(reviewCollection);
            const deletionInfo = await reviewCollection.deleteOne({ _id: id });
            if (deletionInfo.deletedCount === 0) {
                throw `Could not delete review with id of ${id}`;
            }
        } catch(e) {
            console.log(e);
        }
       
       
        const currentRestaurantId = review.restaurantId;
        await restaurantsData.removeReviewFromRestaurant(currentRestaurantId, reviewId);
        //adjust the overall rating
        const restaurantReviewed = await restaurantsData.get(currentRestaurantId);
        const allRatings = [];
        for (let i = 0; i < restaurantReviewed.reviews.length; i++) {
            allRatings.push(restaurantReviewed.reviews[i].rating);
        }
        const averageRating = await this.average(allRatings);

        await restaurantCollection.updateOne({ _id: ObjectId(currentRestaurantId)}, {$set: {overallRating: averageRating} });

        return `${review.title} has been successfully deleted!`;
    },

    async average(array) {
        let total = 0;
        for(let i = 0; i < array.length; i++) {
            total += array[i];
        }
        
        return total / array.length;
        
    }
};
module.exports = exportedMethods;