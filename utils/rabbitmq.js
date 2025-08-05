// utils/rabbitmq.js
// Common RabbitMQ utility for connecting, publishing, and consuming messages

const amqp = require('amqplib');

let connection = null;
let channel = null;

async function connectRabbitMQ(url) {
  if (connection && channel) return { connection, channel };
  connection = await amqp.connect(url);
  channel = await connection.createChannel();
  return { connection, channel };
}

async function publishToQueue(queue, message, url = 'amqp://rabbitmq') {
  const { channel } = await connectRabbitMQ(url);
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}

async function consumeQueue(queue, onMessage, url = 'amqp://rabbitmq') {
  const { channel } = await connectRabbitMQ(url);
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      await onMessage(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }
  });
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  consumeQueue,
};
