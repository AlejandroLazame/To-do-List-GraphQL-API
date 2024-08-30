const { ObjectId } = require('mongodb');

module.exports = {
    Query: {
        Tasks: async (parent, args, { db }) => {
            const filters = {
                ...args
            }

            if(filters.hasOwnProperty('_id')){
                filters._id = new ObjectId(args._id); 
            } 

            const task = await db.collection('tasks')
                .find({ ...filters })
                .toArray()

            return task
        },
        Users: async (parent, args, { db }, ) => {
            const filters = {
                ...args
            }
            const users = await db.collection('users')
                .find({ ...filters })
                .toArray();

            return users;
        },
        me: (_,__, { db, currentUser }) =>  
            db.collection('users')
                .findOne({_id: new ObjectId(currentUser._id)})
    },
    User: {
        tasks: async (_, args, { db, currentUser }) =>
            db.collection('tasks')
                .find({createdBy: new ObjectId(currentUser._id)})
                .toArray()
    },
    Task: {
        createdBy: async (parent , args, { db, currentUser }) =>             
            db.collection('users')
                .findOne({ _id: new ObjectId(parent.createdBy)}),
        updatedBy: async (parent , args, { db, currentUser }) =>             
            db.collection('users')
                .findOne({ _id: new ObjectId(parent.updatedBy)})
    },
}