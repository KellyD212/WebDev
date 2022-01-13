const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;

module.exports = {
    async createUser(username, password) {
        
        if (!username) throw 'You must provide a username';
        if (!password) throw 'You must provide a password';

        if (username.length < 4) throw 'username must be at least 4 characters long';
        if (password.length < 6) throw 'password must be at least 6 characters long';
        if (!username.match(/^[0-9A-Za-z]+$/)) throw 'Username must be a valid string';
        //case sensitive username
        username = username.toLowerCase();
        if (/\s/.test(password)) throw 'password cannot have whitespaces';
        //check system if username already exists
        
        const hash = await bcrypt.hash(password, saltRounds);
        

        //put new user into mongo
        const userCollection = await users();
        
        let newUser = {
            username: username,
            password: hash
        };
        
        const taken = await userCollection.findOne({username: username});
        if (taken) throw 'username is already taken';
        const insertInfo = await userCollection.insertOne(newUser);
        
        if (insertInfo.insertedCount === 0) throw 'Could not add user';
        return {userInserted: true};
    },

    async checkUser(username, password) {
        if (!username) throw 'You must provide a username';
        if (!password) throw 'You must provide a password';

        if (username.length < 4) throw 'username must be at least 4 characters long';
        if (password.length < 6) throw 'password must be at least 6 characters long';
        if (!username.match(/^[0-9A-Za-z]+$/)) throw 'Username must be a valid string';
        //case sensitive username
        if (/\s/.test(password)) throw 'password cannot have whitespaces';
        username = username.toLowerCase();

        const userCollection = await users();
        const user = await userCollection.findOne({username: username});
        if (user === null) throw 'No user with that username';

        let encrypted = user.password;
        let comparePassword = false;
        try {
            comparePassword = await bcrypt.compare(password, encrypted);
        } catch (e) {
            //no op
        }
        if (comparePassword) {
            return {authenticated: true}
        }
        else {
            throw 'Either the username or the password is invalid';
        }
    }
}