/**
 * @fileOverview this file will contain any information transformation functions
 */

const nameToCammelCase = (recepieName) => {
    return recepieName.split(' ').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
};





module.exports = {
    nameToCammelCase
};