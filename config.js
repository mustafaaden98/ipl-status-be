import dotenv from 'dotenv';

dotenv.config()
const env = process.env;
console.log("env", process.env.DB_HOST)
const config = {
    db:{
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    }, 
    listPerPage: env.LIST_PER_PAGE || 10
};
console.log("db", config.db)

export default config