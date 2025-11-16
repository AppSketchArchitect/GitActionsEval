const mongoose = require('mongoose');
require('dotenv').config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB_NAME,
} = process.env;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;

function connectDB() {
  return mongoose.connect(uri);
}

function disconnectDB() {
  return mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
