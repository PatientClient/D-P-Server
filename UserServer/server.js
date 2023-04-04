const express = require('express');
require('dotenv').config();
const cors = require('cors');
const activityRouter = require('./routing/activityRoute');
const errorHandler = require('./middleware/errorHandle');

const connectDB = require('./config/db')
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/api/user', require('./routing/userRoute'));
app.use(errorHandler);

const port = process.env.PORT || 5002;
async function startServer() {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);

  }
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to db :', error.message);
  }

  console.log("⚡server started successfully⚡");
}

startServer();