import process from 'process';
import mysql from 'mysql2';
import { createNotePayload } from '../types/types';
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    })
    .promise();

module.exports = pool;
