import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { mongoConnect } from './utils/mongoConnect';
import cookieParser from 'cookie-parser';
import v1 from './routes/v1';
import { loadApplierData } from './models/applier/applier.model';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // include credentials (cookies) in cross-origin requests
  })
);

app.use('/api/v1', v1);

// TODO: catch all routes to index.html in frontend
// app.use('*') // catch all routes

async function startServer() {
  await mongoConnect();
  // await loadApplierData(); // load only once on first time
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
