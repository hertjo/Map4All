require('dotenv').config()
import * as fs from 'fs';
import 'reflect-metadata';
import { ApiServer } from './server/index';
import { DatabaseProvider } from './database/index';

console.log(fs.readFileSync("cert.pem").toString());
DatabaseProvider.configure({
    type: 'sap',
    database: process.env.DATABASE_NAME,
    username: process.env.HDI_USER,
    password: process.env.HDI_PW,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    ssl_cert: fs.readFileSync("cert.pem").toString()
});

const server = new ApiServer();
server.start(+process.env.PORT || 8080);