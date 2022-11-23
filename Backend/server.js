const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, 'kya hai', err.message, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
app.use(cors());

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

const port = 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

console.log(app.get('env'));

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
