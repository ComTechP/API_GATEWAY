import app from './app';
import sequelize from './models/connection';
import dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync({force: false});

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
})();