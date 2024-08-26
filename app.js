const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { connect } = require('./utils/connectOnMongo');
const { applyMiddleware } = require('graphql-middleware');
const { ruruHTML } = require('ruru/server');

// Importando TypeDefs, Resolvers e Permissions
const fs = require('fs');
const typeDefs = fs.readFileSync('./typedefs.graphql', 'utf-8');
const resolvers = require('./resolvers');
const permissions = require('./secure/permissions');
const { makeExecutableSchema } = require('@graphql-tools/schema');

(async () =>{ 
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const schemaWithPermissions = applyMiddleware(schema, permissions);

    const app = express();
    const db = await connect();

    app.all('/graphql', createHandler({ 
        schema: schemaWithPermissions,
        context: async req => {
            const token = req.headers.authorization;
            const currentUser = await db
                .collection('users')
                .findOne({ access_token: token });
            return { db, currentUser };
        }
    }));
    
    app.get('/playground', (_req, res) => {
        res.type('html')
        res.end(ruruHTML({ endpoint: '/graphql'}))
    })

    app.listen(4000, ()=> console.log('🤖 Server is running ou http://localhost:4000/playground'));
})();
