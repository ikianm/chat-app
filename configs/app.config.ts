export const appConfig = () => ({
    databaseUri: process.env.DATABASE_URI,
    jwtSecret: process.env.JWT_SECRET
});