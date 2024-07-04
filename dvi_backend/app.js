const express = require('express')
require('dotenv').config();
const db = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  

// const router = require('./router');
// app.use('/', router);  
app.get('/', (req, res) => {
  res.send('DVI')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to db then start server
db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
  });
  
db.on('error', (error) => {
console.error('Database connection error:', error)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;