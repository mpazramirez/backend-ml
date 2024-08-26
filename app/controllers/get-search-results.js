/* eslint-disable no-unused-vars */
const axios = require('axios');
const { host, getList } = require('../config/config.local');


module.exports.getSearchResults = async (req, res) => {
    try {
      const query = req.query.q;
      const url = `${host}${getList}${query}`;
      
      const response = await axios.get(url);
      const formatedResponse = await formatData(response.data);
      res.json(formatedResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };

  const formatData = (data) => {
    const categories = data.available_filters.find(filter => filter.id === 'category');
    const sortedCategories = categories?.values?.sort((a, b) => b.results - a.results) || [];
    const categoryNames = sortedCategories?.map(category => category.name);

    const formated = { author: { name: 'Maria', lastname: 'Ramirez' },
      categories: categoryNames,
      items: data.results.slice(0, 4).map(item => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: Math.round((item.price % 1) * 100)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
      })),
    };
    return formated;
  }