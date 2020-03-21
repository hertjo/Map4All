import { Connection, createConnection } from 'typeorm';
import { Regulation } from '../models/regulation';
import { Enactment } from '../models/enactment';
import { District } from '../models/district';
import { RegulationClass } from '../models/regulationClass';
import { State } from '../models/state';

export interface DatabaseConfiguration {
    type: 'mysql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
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

        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
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

        return DatabaseProvider.connection;
    }
}