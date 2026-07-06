const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PORT } = process.env;

const port = PORT || 3001;

async function startServer() {
    await conn.authenticate();

    if (process.env.DB_SYNC === 'true') {
        await conn.sync();
    }

    server.listen(port, () => {
        console.log('%s listening at', port); // eslint-disable-line no-console
    });
}

startServer().catch((error) => {
    console.error('Unable to start the API:', error); // eslint-disable-line no-console
    process.exit(1);
});
