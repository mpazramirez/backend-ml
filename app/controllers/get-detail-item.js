/* eslint-disable no-unused-vars */

const axios = require('axios');
const { host, itemDetail } = require('../config/config.local');
const { getCategories } = require('./get-categories')
const { getDescription } = require('./get-description.js')

module.exports.getDetailItem = async (req, res) => {
    try {
        const id = req.params.id;
        const urlDetail = `${host}${itemDetail}${id}`;
        const responseDetail = await axios.get(urlDetail);

        const responseDescription = await getDescription(id);
        const category = await getCategories(responseDetail.data.category_id);

        const formatedResponse = await formatData(responseDetail.data, responseDescription.data, category.data);
        
        res.json(formatedResponse);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    };
 
  const formatData = (item, description, category) => {
 

    const categoryNames = category.path_from_root.map(category => category.name);
    const condition = item.attributes.find(val => val.id == 'ITEM_CONDITION');
    const formated = { 
        author: { name: 'Maria', lastname: 'Ramirez' },
        item: {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: Math.round((item.price % 1) * 100)
        },
        picture: item.thumbnail,
        condition: condition.value_name,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.initial_quantity,
        description: description.plain_text,
        category:  categoryNames
        }
    };
    return formated;
  }

