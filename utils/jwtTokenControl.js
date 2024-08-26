const jwt = require('jsonwebtoken');
const { findBy } = require('./auxFn');

const secretKey = process.env.SECRET_JWT;

const customErrors = {
    expiredToken: 'Token de acesso expirado.',
    invalidToken: 'Token de acesso invalido.',
}

const generateToken = credential => 
    jwt.sign({id: credential._id}, secretKey, { expiresIn: '1h'});

const verifyTokenValidity = token => {
    try {
        const decoded = jwt.verify(token, secretKey);
        if(decoded === null || decoded === 'null'){
            return false;
        }
        return decoded && true;
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return customErrors.expiredToken;
        }
        if(error.name === 'JsonWebTokenError'){
            return customErrors.invalidToken;
        }

        return error;
    }
}

const authorizeWithJwt = async (credentials, db) => {
    const users = await findBy(credentials.email, 'email', db);
    const { _id, name, email} = users[0];
    const access_token = generateToken(_id);
    return { name, email, access_token}
}

module.exports = { generateToken, verifyTokenValidity, authorizeWithJwt }