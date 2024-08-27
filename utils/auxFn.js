const findBy = async (value, field='id', db) => {
const users = await db.collection('users')
        .find({
            [field]: value
        })
        .toArray();
    return users;
}

module.exports = { findBy }
