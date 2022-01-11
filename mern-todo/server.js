/**
 * Initial packages.
 */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

/**
 * Init express.
 * @type {*|Express}
 */
const app = express();

/**
 * App rules.
 */
app.use(express.json())
app.use(cors());
app.use(cookieParser());


/**
 * Register routes.
 */
app.get('/test', (req, res) => {
    res.send({test: 'ok'});
}) // test route

/**
 * App starter async function
 */

const appStarter = async () => {
    try {
        const {PORT, MONGOOSE_URI} = process.env;
        await mongoose.connect(MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => console.log('Db connected'));
        app.listen(PORT, () => console.log('Server running at port:', PORT));
    } catch (e) {
        console.log('App starter error: ', e.message);
    }
}

appStarter()
    .catch(m => console.log(m.message))