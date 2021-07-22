import mysql from 'mysql2/promise';
import config from '../config.js';

// async function query(sql, params){
//     const connection = await mysql.createConnection(config.db);
//     const [results] = await connection.execute(sql, params);
//     console.log("result", results);
//     return results
// }
const pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user :  'admin',
    password: 'learn@310089rr31',
    database : 'test'
})
async function query(sql, params){
    // const connection = await mysql.createConnection(config.db);
    // const [results] = await connection.execute(sql, params);
    // console.log("result", results);
    const [results] = await pool.query(sql,params);
    // const [result] = await connection.execute
    return results
}


export default query;