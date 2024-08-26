/* eslint-disable no-unused-vars */

const axios = require('axios');
const { host, itemDetail } = require('../config/config.local');

module.exports.getDescription = async (id) => {
    try {
        const urlDetail = `${host}${itemDetail}${id}`;
        const responseDescription = await axios.get(`${urlDetail}/description`); 
        if (responseDescription && responseDescription.data !== undefined) {
            return responseDescription;
          } else {
            return ''
          }
      } catch (error) {
        throw new Error(error);
      }
    };
 