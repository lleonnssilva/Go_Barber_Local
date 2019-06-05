module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "postgres",
  password: "postgres",
  database: "go_barber",
  operationAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
