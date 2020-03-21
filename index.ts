import 'reflect-metadata';
import { ApiServer } from './server/index';
import { DatabaseProvider } from './database/index';

require('dotenv').config();

DatabaseProvider.configure({
    type: 'mysql',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    socketPath: process.env.SOCKET_PATH
});

const server = new ApiServer();
server.start(+process.env.PORT || 8080);