const express = require('express');
require('dotenv').config();
const db = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create instance of router
const router = require('./router');
console.log('Router type:', typeof router);
console.log('Router keys:', Object.keys(router));
app.use('/', router);

// connect to db then start server
db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

module.exports = app;

