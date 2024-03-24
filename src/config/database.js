const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

require('dotenv').config();
//test connection mysql2
// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0,
// });

const dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const connection = async () => {
    const options = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME
    }
    await mongoose.connect(process.env.DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to db"); // connected to db 
}

module.exports = connection;