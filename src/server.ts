import 'reflect-metadata';
import app from './app';
import sequelize from './models/connection';

const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync({force: false});

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
})();