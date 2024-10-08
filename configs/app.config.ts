export const appConfig = () => ({
    databaseUri: process.env.DATABASE_URI,
    redisUrl: process.env.REDIS_URL,
    jwtSecret: process.env.JWT_SECRET
});