const Producer = require('../producer')
const producer = new Producer()



// Define the sendLog middleware function
const sendLog = async (req, res, next) => {
  try {
    await producer.publishMessage(req.body.logType, req.body.message)
    res.json({
      status: 'created'
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

// Define the sendLog middleware function
const sendLogfunction = async (logType, message, next) => {
  try {
    await producer.publishMessage(logType, message)
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}
module.exports = {
  sendLog,
  sendLogfunction
}