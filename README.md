# Easdon Backend

This is the backend server for the Easdon order and shipping management system. It is built with Node.js, Express, and MongoDB, and provides APIs for user management, order tracking, barcode generation, and future shipping integration.

## Features

- User authentication (JWT-based)
- Order creation and tracking
- Barcode generation (future)
- Shipping label and rate integration (future)
- MongoDB integration with Mongoose
- Environment variable support with dotenv
- Ready for deployment and GitHub workflows

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/tommytoyou/easdon-backend.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add your environment variables in a `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   node server.js
   ```

## Project Structure

```
easdon-backend/
├── controllers/
├── models/
├── routes/
├── uploads/
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## License

MIT License
