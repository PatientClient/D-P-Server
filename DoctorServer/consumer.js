const config = require('./config/config');
const amqp = require('amqplib');

async function consumeMessages() {
  try {
    const connection = await amqp.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();

    const exchangeName = config.rabbitMQ.exchangeName;





    const queueAlert = 'AlertQueue';
    await channel.assertExchange(exchangeName, 'direct');
    const qAlert = await channel.assertQueue(queueAlert);
    await channel.bindQueue(qAlert.queue, exchangeName, 'UL');

    const queueName = 'userProgress';
    await channel.assertExchange(exchangeName, 'direct');

    const q = await channel.assertQueue(queueName);
    await channel.bindQueue(q.queue, exchangeName, 'UP');

    // channel.consume(
    //   q.queue,
    //   (msg) => {
    //     if (msg.content) {
    //       const data = JSON.parse(msg.content.toString());
    //       console.log('Received message:', data);
    //     }
    //     // channel.ack(msg);
    //   }
    //   // , {
    //   //   noAck: false
    //   // }
    // );

    // channel.consume(
    //   qAlert.queue,
    //   (msg) => {
    //     if (msg.content) {
    //       const data = JSON.parse(msg.content.toString());
    //       console.log('Received message qalert:', data);
    //     }
    //     // channel.ack(msg);
    //   }
    //   // , {
    //   //   noAck: false
    //   // }
    // );
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  consumeMessages,
};