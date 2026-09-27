import database from "@core/config/database";
import { RowDataPacket } from "mysql2";

export const checkExist = async (tableName: string, column: string, value: string | number, id?: string | number) => {
    let query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    const params: any[] = [value];
    if (id) {
        query += ` AND id != ?`
        params.push(id);
    }
    const checkExist = await database.executeQuery(query, params);
    if (Array.isArray(checkExist) && checkExist.length > 0) {
        const row = (checkExist as RowDataPacket[])[0];
        delete row.password;
        delete row.p_txt;
        return row;
    }
    return false;
}