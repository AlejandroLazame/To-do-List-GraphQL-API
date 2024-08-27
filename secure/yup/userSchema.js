const { object, string, ValidationError, Schema } = require('yup');
const { findBy } = require('../../utils/auxFn');

const newUser = object({
    name: string()
        .required('Nome e obrigatorio'),
    password: string()
        .required('Senha e obrigatorio'),
    role: string()
        .default('USER'),
    email: string()
        .email('E-mail com formato invalido.')
        .required('E-mail e obrigatorio.')
        .test('is-mail-valid','Ja existe um usuario com esse e-mail', async (value, ctx)=>{
            const { db } = ctx.options.context;
            const user = await findBy(value, 'email', db);
            return user.length === 0;
        })
})

module.exports = { newUser }