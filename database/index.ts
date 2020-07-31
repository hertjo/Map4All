import { Connection, createConnection } from 'typeorm';
import { Regulation } from '../models/regulation';
import { Enactment } from '../models/enactment';
import { District } from '../models/district';
import { RegulationClass } from '../models/regulationClass';
import { State } from '../models/state';

export interface DatabaseConfiguration {
    type: 'sap';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl_cert: string;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(databaseConfiguration: DatabaseConfiguration): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        if (!DatabaseProvider.configuration) {
            throw new Error('DatabaseProvider is not configured yet.');
        }

        const { type, host, port, username, password, database, ssl_cert } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ca: ssl_cert
            },
            entities: [
                Regulation,
                Enactment,
                District,
                State,
                RegulationClass
            ],
            autoSchemaSync: true
        } as any); // as any to prevent complaining about the object does not fit to MongoConfiguration, which we won't use here

        console.log("test1");
        return DatabaseProvider.connection;
    }
}