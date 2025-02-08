require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const userRoutes = require('./routes/userRoutes'); 
const diaryRoutes = require('./routes/diaryRoutes'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/diary', diaryRoutes); 

const port = 3000;

const mongoURI = process.env.mongo_URI_key;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((error) => console.error("MongoDB 연결 실패:", error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});