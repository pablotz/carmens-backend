/**
 * Information will comming trough AWS S3
 */

const { s3Connect } = require('../helpers/s3Connect');

const listAll = async (userName) => {

    const bucket = process.env.AWS_USERS_BUCKET;
    const params = {
        Bucket: bucket,
        Prefix: userName
    };

    const data = await s3Connect.listObjectsV2(params).promise();
    if(data.Contents.length > 0) {
        let recepies = [];
        data.Contents.forEach((recepie) => {
            recepies.push(recepie.Key);
        });
        console.log({
            "message": "All recepies from user",
            "data": recepies
        });
        return recepies;
    } else if (data.Contents.length === 0) {
        console.log({
            "message": "User has no recepies"
        });
        return data;
    }
}

const getRecepie = async (userName, key) => {
    const bucket = process.env.AWS_USERS_BUCKET;
    const params = {
        Bucket: bucket,
        Key: userName + "/" + key
    };

    const data = await s3Connect.getObject(params).promise();
    if(data) {
        console.log('Recepie found');
        let parsedData = JSON.parse(data.Body.toString());
        return parsedData;
    } else {
        console.log({
            "message": "Recepie not found"
        });
        return data;
    }

}


const putNew = async (userName, recepie, key) => {
  
    const bucket = process.env.AWS_USERS_BUCKET + '/' +userName;
    const params = {
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(recepie)
    };


    console.log('Registing new recepie on S3')
    const data = await s3Connect.putObject(params).promise();
    if(data) {
        console.log('New recepie registered on S3 with key:', key);
        return data;
    } else {
        throw new Error('Error while registering new recepie');
    }
};




module.exports = {
    listAll,
    putNew,
    getRecepie
}