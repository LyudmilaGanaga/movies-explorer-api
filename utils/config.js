const { PORT = 3000, MONGO_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  MONGO_ADDRESS,
  PORT,
};
