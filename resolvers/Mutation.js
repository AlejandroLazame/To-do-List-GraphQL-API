const { GraphQLError } = require('graphql');
const { findBy } = require('../utils/auxFn'); 
const { authorizeWithJwt } = require("../utils/jwtTokenControl");

module.exports = {
    async addUser(parent, args, { db }) {
        try {
            const newUser = {
                    ...args.input
                }

            if(newUser.hasOwnProperty('role') === false){
                newUser.role = 'USER'
            }
            
            const { insertedId } = await db.collection('users').insertOne(newUser);
            newUser.id = insertedId[0];
            return newUser;
        } catch (error) {
            console.error(JSON.stringify(error.message))
            return JSON.stringify(error.message)
        }
    },

    async addTask(parent, args, { db, currentUser }) {
        
        const newTask = {
            createdBy: currentUser.email,
            status: 'TODO',
            ...args.input
        }

        const { insertedId } = await db.collection('tasks').insertOne(newTask);
        newTask.id = insertedId[0];

        return newTask;
    },

    async authUser(parent, args, { db }) {
        let {
            access_token,
            name, 
            email
        } = await authorizeWithJwt({...args.input}, db);
        
        const lastestUserInfo = {
            access_token,
            name,
            email
        }
        
        const { upsertedId } = await db
            .collection('users')
            .updateOne({ email: email }, {$set: lastestUserInfo}, { upsert: false});
        const user = await findBy(upsertedId, 'id', db);
        
        return { user: user[0], token: access_token}
    }
}