import Logger from "@core/utils/logger";
import mysql from "mysql2/promise";
import messages from "@core/config/constants";
import { parseEnvInt } from "@core/utils";

interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    connectionLimit?: number;
    queueLimit?: number;
    connectTimeout?: number;
    label?: string;
}

class Database {
    private pool: mysql.Pool | null = null;
    private label: string;

    constructor(label = "DB") {
        this.label = label;
    }

    async connectDB(config?: DatabaseConfig) {
        const cfg = config ?? {
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME!,
            connectionLimit: parseEnvInt(process.env.DB_CONNECTION_LIMIT, 100),
            queueLimit: parseEnvInt(process.env.DB_QUEUE_LIMIT, 0),
            connectTimeout: parseEnvInt(process.env.DB_CONNECT_TIMEOUT, 60000),
        };
        try {
            this.pool = mysql.createPool({
                host: cfg.host,
                user: cfg.user,
                password: cfg.password,
                database: cfg.database,
                waitForConnections: true,
                connectionLimit: cfg.connectionLimit ?? 100,
                queueLimit: cfg.queueLimit ?? 0,
                connectTimeout: cfg.connectTimeout ?? 60000,
                enableKeepAlive: true,
                keepAliveInitialDelay: 10000,
            });
            await this.pool.query("SELECT 1");
            Logger.info(`[${this.label}] Connected to DB (${cfg.database}) successfully`);
        } catch (error) {
            Logger.error(`[${this.label}] Failed to connect to DB (${cfg.database})`, error);
            throw error;
        }
    }

    async getConnection(): Promise<mysql.PoolConnection> {
        if (!this.pool) throw new Error(messages.DATABASE_POOL_NOT_INITIALIZED);
        return this.pool.getConnection();
    }

    releaseConnection(connection: mysql.PoolConnection | null) {
        connection?.release();
    }

    async executeQuery<T = unknown>(query: string, params?: any[]) {
        if (!this.pool) throw new Error(messages.DATABASE_POOL_NOT_INITIALIZED);
        try {
            const [results] = await this.pool.execute(query, params);
            return results as T;
        } catch (error) {
            Logger.error(`[${this.label}] execute query failed`, error);
            throw error;
        }
    }
}

export const database = new Database("Order DB");
export const databaseProduct = new Database("Product DB");

export default database;
