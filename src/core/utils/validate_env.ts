import { cleanEnv, str, port } from "envalid"

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        // Order DB
        DB_HOST: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),
        DB_NAME: str(),
        DB_CONNECTION_LIMIT: str(),
        // Product DB
        DB_HOST_PRODUCT: str(),
        DB_USER_PRODUCT: str(),
        DB_PASSWORD_PRODUCT: str(),
        DB_NAME_PRODUCT: str(),
        DB_CONNECTION_LIMIT_PRODUCT: str(),
        // JWT
        JWT_SECRET: str(),
        REFRESH_TOKEN_SECRET: str()
    })
}

export default validateEnv;