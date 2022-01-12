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
const todoRoutes = require('./server/routes/todoRoutes');
const authRoutes = require('./server/routes/authRoutes');
app.use('/api/v1/', todoRoutes);
app.use('/user/', authRoutes);


/**
 * Register global error middleware.
 */
const routeMiddleware = require('./server/middlewares/routeMiddleware');
app.use(routeMiddleware);

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