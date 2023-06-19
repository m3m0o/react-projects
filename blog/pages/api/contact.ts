import type { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from 'mongodb';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email, name, message } = request.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      response.status(422).json({ message: 'Invalid input.' });

      return;
    }

    const newMessage = {
      name,
      email,
      message,
    };

    let mongoClient;

    try {
      mongoClient = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.ehthzcn.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
      );
    } catch (error) {
      response.status(500).json({ message: 'Could not connect to database.' });

      return;
    }

    const database = mongoClient.db(`${process.env.DB_DATABASE}`);

    try {
      const result = await database
        .collection('messages')
        .insertOne(newMessage);
    } catch (error) {
      mongoClient.close();

      response.status(500).json({ message: 'Storing message failed.' });

      return;
    }

    mongoClient.close();

    response.status(201).json({ message: 'Sucefully stored message.' });
  }
};

export default handler;
