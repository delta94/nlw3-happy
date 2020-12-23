module.exports = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  seeds: [process.env.TYPEORM_SEEDS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
  },
  ssl: true
}
