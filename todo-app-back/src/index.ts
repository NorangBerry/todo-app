import express from 'express';
import body_parser from 'body-parser';
import todo from './routes/todo';
import mongoose from 'mongoose'
import cors from 'cors';
//what is the better way to route all table name?
export const app = express();
app.use(cors());
// Serve the static files from the React app
app.use(body_parser.json())
require('dotenv').config();


app.use('/api/todo',todo)

const port = 8000;
app.listen(port, '0.0.0.0');


// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI as string, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));
