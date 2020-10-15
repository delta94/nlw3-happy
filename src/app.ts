import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import path from 'path'
import './database';

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);

export default app;
