import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './Routes/index';
import db from './models/connection';


const port = 3000;

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors());

// Routing setup
app.use('/api', Router);

(async () => {
    try {
        // To Ensure the database connection is established
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: false });
        console.log('Database connected and synchronized.');

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
})();
