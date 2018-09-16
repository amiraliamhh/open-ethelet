import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { createUserRouter } from './routes/index';

const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/';
const mongoDb = process.env.MONGO_DB || 'ethlet';

app.use(bodyParser.json());
app.use(bodyParser({extended: true}));
app.use('/user', createUserRouter);

mongoose.connect(mongoUrl + mongoDb, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log(`connected to database.`);
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});