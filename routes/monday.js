const express = require('express');
const axios = require('axios');
const router = express.Router();

// ✅ Test token route
router.get('/test-token', (req, res) => {
  res.send(process.env.MONDAY_API_TOKEN ? '✅ Token is loaded' : '❌ Token is missing');
});

// ✅ Real route with hardcoded token (TEMPORARY for debugging)
router.get('/boards', async (req, res) => {
  const query = `
    query {
      boards(limit: 1) {
        id
        name
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://api.monday.com/v2',
      { query },
      {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUxNzQxMzg1OSwiYWFpIjoxMSwidWlkIjo3NjQzNjI5NSwiaWFkIjoiMjAyNS0wNS0yNVQwNTo1NjoxNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjk2NDIzMDEsInJnbiI6InVzZTEifQ.5ByYm3_PqxtCftx9OlIkKtg5RAWiMMI5cgEIRXM2Bi8', // 🟡 Replace with your actual token
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({
      message: 'Error fetching boards',
      error: err.message,
    });
  }
});

module.exports = router;
