const cron = require('node-cron');
const {
  checkNotActive
} = require('../controllers/userController');
const { restStatus24 } = require('../controllers/taskController');


cron.schedule('*/1 * * * *', function () {
  // Call your function here
  console.log('This function will run every minute');
  checkNotActive()
  restStatus24()
});
