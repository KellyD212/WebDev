const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

module.exports = {
    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        
        //error checking
        if (!name) throw 'You must provide a name for your restaurant';
        if (!location) throw 'You must provide a location for your restaurant';
        if (!phoneNumber) throw 'You must provide a phone number for your restaurant';
        if (!website) throw 'You must provide a website for your restaurant';
        if (!priceRange) throw 'You must provide a priceRange for your restaurant';
        if (!cuisines) throw 'You must provide cuisines for your restaurant';
        //if (!overallRating) throw 'You must provide an overall rating for your restaurant';
        if (!serviceOptions) throw 'You must provide service options for your restaurant';

        if (typeof name != 'string') throw 'Name must be a string';
        if (typeof location != 'string') throw 'location must be a string';
        if (typeof phoneNumber != 'string') throw 'phone number must be a string';
        if (typeof website != 'string') throw 'website must be a string';
        if (typeof priceRange != 'string') throw 'price range must be a string';
        
        if (name.trim().length == 0) throw 'name cannot be empty string or empty spaces';
        if (location.trim().length == 0) throw 'location cannot be empty string or empty spaces';
        if (phoneNumber.trim().length == 0) throw 'phone number cannot be empty string or empty spaces';
        if (website.trim().length == 0) throw 'website cannot be empty string or empty spaces';
        if (priceRange.trim().length == 0) throw 'price range cannot be empty string or empty spaces';
        if (priceRange.length > 4) throw 'price range must be 1-4 dollar signs';

        if (!(phoneNumber.match(/([0-9]{3})-([0-9]{3})-([0-9]{4})/g))) throw 'phone number must be in the format xxx-xxx-xxxx';
        if (typeof serviceOptions != 'object') throw 'service options must be of type object';
        if (typeof serviceOptions.dineIn != 'boolean') throw 'dine in must be of type boolean';
        if (typeof serviceOptions.takeOut != 'boolean') throw 'take out must be of type boolean';
        if (typeof serviceOptions.delivery != 'boolean') throw 'delivery must be of type boolean';

        if (!(website.startsWith('http://www.'))) throw 'new website must contain "http://www."';
        if (!(website.endsWith('.com'))) throw 'new website must contain ".com"';
   
        const restaurantCollection = await restaurants();
        
        let newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: []
        };
        
        const insertInfo = await restaurantCollection.insertOne(newRestaurant);
        
        if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';
        try{
            const newId = insertInfo.insertedId;
            const restaurant = await this.get(newId.toString());
            
            restaurant._id = restaurant._id.toString();
            
            return restaurant;
        } catch (e) {
            throw "e";
        }
        
    },

    async getAll(){
        const restaurantCollection = await restaurants();
        const restaurantsList = await restaurantCollection.find({}).toArray();
        const newArray = [];
        for(let i = 0; i < restaurantsList.length;i++) {
            restaurantsList[i]._id = restaurantsList[i]._id.toString();
            newArray.push({_id: restaurantsList[i]._id, name: restaurantsList[i].name});
        }
        return newArray;
    },

    async get(id) {
        
        if (!id) throw 'You must provide a restaurant id';
        
        if (id.trim().length == 0) throw 'id cannot be empty string or empty spaces';

        id = ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({_id: id});
        if (restaurant === null) throw 'No restaurant with that id';
        restaurant._id = restaurant._id.toString();
        return restaurant;
    },

    async remove(id){
        if (!id) throw 'You must provide a restaurant id';
        if (typeof id != 'string') throw 'id must be of type string';
        if (id.trim().length == 0) throw 'id cannot be empty string or empty spaces';
        const restaurantCollection = await restaurants();
        
        id = ObjectId(id);
        const deleted = await this.get(id.toString());
        const deletionInfo = await restaurantCollection.deleteOne({_id: id});

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete restaurant with id of ${id}`;
        }
        return `${deleted.name} has been successfully deleted!`

    },

    async update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (!name) throw 'You must provide a name for your restaurant';
        if (!location) throw 'You must provide a location for your restaurant';
        if (!phoneNumber) throw 'You must provide a phone number for your restaurant';
        if (!website) throw 'You must provide a website for your restaurant';
        if (!priceRange) throw 'You must provide a priceRange for your restaurant';
        if (!cuisines) throw 'You must provide cuisines for your restaurant';
        //if (!overallRating) throw 'You must provide an overall rating for your restaurant';
        if (!serviceOptions) throw 'You must provide service options for your restaurant';

        if (typeof name != 'string') throw 'Name must be a string';
        if (typeof location != 'string') throw 'location must be a string';
        if (typeof phoneNumber != 'string') throw 'phone number must be a string';
        if (typeof website != 'string') throw 'website must be a string';
        if (typeof priceRange != 'string') throw 'price range must be a string';
        
        if (name.trim().length == 0) throw 'name cannot be empty string or empty spaces';
        if (location.trim().length == 0) throw 'location cannot be empty string or empty spaces';
        if (phoneNumber.trim().length == 0) throw 'phone number cannot be empty string or empty spaces';
        if (website.trim().length == 0) throw 'website cannot be empty string or empty spaces';
        if (priceRange.trim().length == 0) throw 'price range cannot be empty string or empty spaces';

        if (!(phoneNumber.match(/([0-9]{3})-([0-9]{3})-([0-9]{4})/g))) throw 'phone number must be in the format xxx-xxx-xxxx';
        if (typeof serviceOptions != 'object') throw 'service options must be of type object';
        if (typeof serviceOptions.dineIn != 'boolean') throw 'dine in must be of type boolean';
        if (typeof serviceOptions.takeOut != 'boolean') throw 'take out must be of type boolean';
        if (typeof serviceOptions.delivery != 'boolean') throw 'delivery must be of type boolean';

        if (!(website.startsWith('http://www.'))) throw 'new website must contain "http://www."';
        if (!(website.endsWith('.com'))) throw 'new website must contain ".com"';

        const restaurantCollection = await restaurants();
        
        id = ObjectId(id);
        
        const updatedRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            serviceOptions: serviceOptions
        }

        const updatedInfo = await restaurantCollection.updateOne(
            {_id: id},
            {$set: updatedRestaurant}
        );
       
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update restaurant successfully';
        }
    
        return await this.get(id.toString());
    },

    async addReviewToRestaurant(restaurantId, reviewId, reviewTitle, reviewer, rating, dateOfReview, review) {
        
        let currentRestaurant = await this.get(restaurantId);
       
        
        const restaurantCollection = await restaurants();
        restaurantId = ObjectId(restaurantId);
        const updateInfo = await restaurantCollection.updateOne(
          { _id: restaurantId },
          { $addToSet: { reviews: { id: reviewId, title: reviewTitle, reviewer: reviewer, rating: rating, dateOfReview: dateOfReview, review: review} } }
        );
        
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
    
        return await this.get(restaurantId.toString());
    },

    async removeReviewFromRestaurant(restaurantId, reviewId) {
       
        let currentRestaurant = await this.get(restaurantId);
       
    
        const restaurantCollection = await restaurants();
        const updateInfo = await restaurantCollection.updateOne(
          { _id: ObjectId(restaurantId) },
          { $pull: { reviews: { id: reviewId } } }
        );
        
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
        
        return await this.get(restaurantId.toString());
    }

};
