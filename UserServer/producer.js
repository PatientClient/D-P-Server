const amqp = require('amqplib');
const config = require('./config/config');

class Producer {
  channel = null;
  connection = null;

  async createConnection() {
    try {
      if (this.connection === null) {
        this.connection = await amqp.connect(config.rabbitMQ.url);
      }
    } catch (error) {
      console.error('Failed to create connection:', error);
      throw error;
    }
  }

  async createChannel() {
    try {
      if (this.channel === null) {
        await this.createConnection();
        this.channel = await this.connection.createChannel();
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct');
      }
    } catch (error) {
      console.error('Failed to create channel:', error);
      throw error;
    }
  }

  async publishMessage(routingKey, message) {
    try {
      await this.createChannel();
      const exchangeName = config.rabbitMQ.exchangeName;
      const logDetails = {
        logType: routingKey,
        message: message,
        dateTime: new Date(),
      };
      await this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
      );
      console.log(
        `The message ${message} is sent to exchange ${exchangeName} with routing key ${routingKey}`
      );
    } catch (error) {
      console.error('Failed to publish message:', error);
      throw error;
    }
  }

  async close() {
    try {
      if (this.channel !== null) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection !== null) {
        await this.connection.close();
        this.connection = null;
      }
    } catch (error) {
      console.error('Failed to close channel and connection:', error);
      throw error;
    }
  }
}

module.exports = Producer;
