import express, { Request, Response, Router } from 'express';
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/todo-routes');

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);

app.use(morgan('combined'));
try {
    app.listen(port, () => {
        console.log(`application listening at ${port}`);
        console.log(`${port}`);
    });
} catch (error) {
    console.log(error);
}
