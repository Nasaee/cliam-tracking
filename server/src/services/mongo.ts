import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URl as string);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
