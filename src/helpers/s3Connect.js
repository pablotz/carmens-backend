/**
 * @fileoverview s3Connect.js is a helper function that connects to the AWS S3 bucket.
 */

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Connect = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
});

module.exports = {
    s3Connect
};