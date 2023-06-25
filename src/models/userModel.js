const { s3Connect } = require('../helpers/s3Connect');

const createUser = async (user) => {
    const bucket = process.env.AWS_USERS_BUCKET;

    const folderParams = {
        Bucket: bucket,
        Key: user.id+"/"
    };

    try {
        await s3Connect.putObject(folderParams).promise();
        console.log({
            "message": "User created",
            "data": user
        });
        return user;
    }
    catch (err) {
        console.log({
            "message": "User not created",
            "error": err
        });
        return err;
    }
}

const getUser = async (id) => {
    const bucket = process.env.AWS_USERS_BUCKET;
    const params = {
        Bucket: bucket,
        Key: id
    };
    try {

        const data = await s3Connect.getObject(params).promise();
        return data;
    } catch (err) {
        console.log({
            "message": "User not found"
        });
        return null;
    }
}

module.exports = {
    createUser,
    getUser
}