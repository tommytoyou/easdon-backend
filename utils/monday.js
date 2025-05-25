const axios = require('axios');

const mondayAPI = axios.create({
  baseURL: 'https://api.monday.com/v2',
  headers: {
    'Authorization': process.env.MONDAY_API_TOKEN,
    'Content-Type': 'application/json',
  },
});

module.exports = mondayAPI;
