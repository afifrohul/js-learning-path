import dotenv from "dotenv";
import amqp from "amqplib";
import ApplicationService from "./ApplicationService.js";
import MailSender from "./MailSender.js";
import Listener from "./listener.js";

dotenv.config();

const init = async () => {
  const applicationService = new ApplicationService();
  const mailSender = new MailSender();
  const listener = new Listener(applicationService, mailSender);

  const amqpUrl = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}${process.env.RABBITMQ_VHOST}`;

  const connection = await amqp.connect(amqpUrl);
  const channel = await connection.createChannel();

  await channel.assertQueue("notification:applications", {
    durable: true,
  });

  channel.consume("notification:applications", listener.listen, {
    noAck: true,
  });
};

init();
