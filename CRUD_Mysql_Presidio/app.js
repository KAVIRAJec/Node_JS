const express = require('express');
const cors = require('cors');
const taskRoute = require('./routes/taskRoute');
const errorHandler = require('./middlewares/errorHandler');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', taskRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
