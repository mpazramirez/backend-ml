/* eslint-disable no-unused-vars */

const axios = require('axios');
const { host, categories } = require('../config/config.local');

module.exports.getCategories = async (categoryInput) => {
    try {
        const category = await axios.get(`${host}${categories}${categoryInput}`);
         return category;
      } catch (error) {
        throw new Error(error);
      }
    };
 

