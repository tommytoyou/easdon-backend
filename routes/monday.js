// routes/monday.js
const express = require('express');
const router = express.Router();
const mondayAPI = require('../utils/monday');

// ✅ Test token route — TEMPORARY
router.get('/test-token', (req, res) => {
  res.send(process.env.MONDAY_API_TOKEN ? '✅ Token is loaded' : '❌ Token missing');
});

// ✅ Real route — fetch boards
router.get('/boards', async (req, res) => {
  const query = {
    query: `
      query {
        boards(limit: 1) {
          id
          name
        }
      }
    `,
  };

  try {
    console.log('🔁 Sending token:', process.env.MONDAY_API_TOKEN);
    const response = await mondayAPI.post('/', query);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching boards',
      error: err.message,
    });
  }
});

// ✅ Create new item route
router.post('/create-item', async (req, res) => {
  const { boardId, itemName } = req.body;

  const query = `
    mutation {
      create_item (
        board_id: ${boardId},
        item_name: "${itemName}"
      ) {
        id
      }
    }
  `;

  try {
    const response = await mondayAPI.post('/', { query });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: 'Error creating item',
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;
