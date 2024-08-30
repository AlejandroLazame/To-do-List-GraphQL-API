const findBy = async (value, field='id', db, table='users') => {
    const users = await db
        .collection(table)
        .find({
            [field]: value
        })
        .toArray();    
    return users;
}

module.exports = { findBy }
