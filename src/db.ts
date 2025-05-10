import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "db.sqlite");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

export const sql = async <T>(sql: string): Promise<T[]> =>
    new Promise((resolve, reject) =>
        db.all<T>(sql, (err: Error | null, rows) =>
            err ? reject(err) : resolve(rows)));
