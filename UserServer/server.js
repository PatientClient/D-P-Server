const express = require('express');
require('dotenv').config();
const cors = require('cors');
const activityRouter = require('./routing/activityRoute');
const producerRouter = require('./routing/producerRoutes');
const errorHandler = require('./middleware/errorHandle');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
require('./sceduleFunctions/updateActivity24')
const app = express();

const Producer = require('./producer')
const producer = new Producer()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use('/api/user', require('./routing/userRoute'));
app.use('/api/activities', activityRouter);
app.use('/api/producer', producerRouter);
app.use('/api/task', require('./routing/taskRoute'));
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