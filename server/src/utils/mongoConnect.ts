import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  if (process.env.MONGO_URl && typeof process.env.MONGO_URl === 'string') {
    return await mongoose.connect(process.env.MONGO_URl as string);
  } else {
    console.log('MONGO_URl is not defined');
  }

  return;
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
