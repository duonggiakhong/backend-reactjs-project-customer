const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
// const port = process.env.DB_PORT;
const hostname = process.env.HOST_NAME;
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');
const webRouterApi = require('./routes/api');
const fileUpload = require('express-fileupload');


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

//file update
app.use(fileUpload());

//Router
configViewEngine(app);

//viewEngine
app.use('/', webRouter);

app.use('/v1/api/', webRouterApi);

(async () => {

    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        })
    } catch (error) {
        console.log('Check connection mongoDB ==>', error)
    }
})()

