const { shield, rule, and, or, inputRule } = require('graphql-shield');
const { verifyTokenValidity } = require('../utils/jwtTokenControl');
const { findBy } = require('../utils/auxFn');
const { newUser } = require('./yup');
const { GraphQLError } = require('graphql');

const customErrors = {
    notAuthorized: new GraphQLError('Você não está autorizado a acessar esse recurso.'),
    notAdmin: new GraphQLError('Somente administradores podem acessar esse recurso.'),
    notAuthenticated: new GraphQLError('É preciso estar logado para acessar esse recurso.'),
    expiredToken: new GraphQLError('Token de acesso expirado.')
}

const isAuthenticaded = rule({ cache: 'contextual'})(async (parent, args, { currentUser }, info) => {
    return await verifyTokenValidity(currentUser.access_token);
})

const isAdmin = rule({cache: 'contextual'})(async (_, args, { currentUser }) => {
    return currentUser.role === 'ADMIN';
});

const isNotRegistered = rule()(async (_, args, ctx) => {
    return await newUser.validate(args.input, {context: ctx, abortEarly: false, strict: false},)
        .catch(err => {
            console.error('Erros de Validacao:', err.errors);
            return err
        })
});

const permissions = shield({
    Query: {
        Users: and(isAuthenticaded, isAdmin),
        Tasks: isAuthenticaded,
        me: isAuthenticaded
    },
    Mutation: {
        addTask: isAuthenticaded,
        addUser: isNotRegistered
    }
},{
    fallbackError: (error)=>{
        console.error(`Original Error: ${error}`);
        
        if(error.message.includes('Not Authorized')){
            return customErrors.notAuthorized;
        }

        return error;
    }
});

module.exports = permissions;