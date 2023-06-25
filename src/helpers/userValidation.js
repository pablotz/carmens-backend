/**
 * @fileoverview This files control users 
 */


const crypto = require('crypto');

const cyperUser = (userName) => {
    let hash = crypto.createHash('md5').update(userName).digest('hex');
    return hash;
};

module.exports = {
    cyperUser
}
