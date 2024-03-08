import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  if (process.env.MONGO_URL && typeof process.env.MONGO_URL === 'string') {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to MongoDB');
  } else {
    console.log('MONGO_URl is not defined');
  }

  return;
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
