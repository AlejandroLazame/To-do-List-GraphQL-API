const { GraphQLError } = require('graphql');
const { findBy } = require('../utils/auxFn'); 
const { authorizeWithJwt } = require("../utils/jwtTokenControl");
const { ObjectId } = require('mongodb');

module.exports = {
    //Funcao para cadastrar um novo usuario
    async addUser (parent, args, { db }) {
        try {
            const newUser = {
                    ...args.input
                }                
            if(newUser.hasOwnProperty('role') === false){
                newUser.role = 'USER'
            }
            const { insertedId } = await db.collection('users').insertOne(newUser);
            newUser._id = insertedId;            
            return newUser;
        } catch (error) {
            console.error(JSON.stringify(error))
            return error
        }
    },
    //Funcao para atualizar os dados de um usuario
    async updateUser (parent, args, { db }) {
        const lastestUserInfo = {};
        for(const key in args.input){
            if(args.input.hasOwnProperty(key) && args.input[key] !== null){
                lastestUserInfo[key] = args.input[key];
            }
        }
        lastestUserInfo._id = new ObjectId(args.input._id)        
        const { upsertedId } = await db
            .collection('users')
            .updateOne({ _id: lastestUserInfo._id}, {$set: lastestUserInfo}, { upsert: false});
        const user = await findBy(lastestUserInfo._id, '_id', db);      
        return user[0];
    },
    //Funcao para deletar uma Task
    async deleteTask (parent, args, { db }) {
        const _id = new ObjectId(args.input._id);
        const deletedTask = await db.collection('tasks')
            .findOneAndDelete({_id: _id});
        return deletedTask;
    },
    //Funcao para adicionar uma nova tarefa
    async addTask (parent, args, { db, currentUser }) {
        try {
            const newTask = {
                createdBy: new ObjectId(currentUser._id),
                updatedBy: new ObjectId(currentUser._id),
                status: 'TODO',
                ...args.input
            }
            const { insertedId } = await db.collection('tasks').insertOne(newTask);            
            newTask._id = insertedId[0];
            return newTask;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    //Funcao para atualizar uma tarefa
    async updateTask (parent, args, { db }) {
        console.log(args.input);
        
        const lastestTaskInfo = {};
        for(const key in args.input){
            if(args.input.hasOwnProperty(key) && args.input[key] !== null){
                lastestTaskInfo[key] = args.input[key];
            }
        }
        lastestTaskInfo._id = new ObjectId(args.input._id);        
        await db.collection('tasks')
            .updateOne({ _id: lastestTaskInfo._id}, {$set: lastestTaskInfo}, { upsert: false});
        const task = await findBy(lastestTaskInfo._id, '_id', db, 'tasks');        
        return task[0];
    },
    //Funcao para autenticar o usuario no login com JWT Token
    async authUser (parent, args, { db }) {
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
        return { user: user[0], token: access_token};
    }
}