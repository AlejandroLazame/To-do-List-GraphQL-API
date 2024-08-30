const { shield, rule, and, allow, deny} = require('graphql-shield');
const { verifyTokenValidity } = require('../utils/jwtTokenControl');
const { newUser } = require('./yup');
const { GraphQLError } = require('graphql');

const customErrors = {
    notAuthorized: new GraphQLError('Você não está autorizado a acessar esse recurso.'),
    notAdmin: new GraphQLError('Somente administradores podem acessar esse recurso.'),
    notAuthenticated: new GraphQLError('É preciso estar logado para acessar esse recurso.')
}

const isAuthenticated = rule({ cache: 'contextual'})(async (parent, args, { currentUser }, info) => {
    return await verifyTokenValidity(currentUser.access_token);
})

const isAdmin = rule({cache: 'contextual'})(async (_, args, { currentUser }) => {
    return currentUser.role === 'ADMIN';
});

const isNotRegistered = rule({ cache: 'contextual'})(async (_, args, ctx) => {
    return await newUser.validate(args.input, {context: ctx, abortEarly: false, strict: false},)
        .then(()=>{
            return true;
        })
        .catch(err => {
            console.error('Erros de Validacao:', err.errors);
            return err
        })
});

const permissions = shield({
    Query: {
        '*': deny,
        Users: and(isAuthenticated, isAdmin),
        Tasks: isAuthenticated,
        me: isAuthenticated
    },
    Mutation: {
        '*': deny,
        addTask: isAuthenticated,
        updateTask: isAuthenticated,
        addUser: isNotRegistered,
        updateUser: and(isAuthenticated, isAdmin),
        authUser: allow
    }
},{
    fallbackError: (error)=>{
        console.error(`Original Error: ${error}`);
        
        if(error && error.message.includes('Not Authorized')){
            return customErrors.notAuthorized;
        }

        return error;
    }
});

module.exports = permissions;