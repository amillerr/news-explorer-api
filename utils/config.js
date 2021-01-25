const SALT_ROUNDS = 10;
const JWT_MAX_AGE = 3600000 * 24 * 7;
const JWT_SECRET_KEY = 'dev-secret';
const DEV_DB = 'mongodb://localhost:27017/diplomadb';

module.exports = {
  SALT_ROUNDS,
  JWT_MAX_AGE,
  JWT_SECRET_KEY,
  DEV_DB,
};
