const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
  console.log('DB Connected Successfully');
});

// Connect function for connecting to the Server
const connectDB = async () => {
  const { DB_HOST, DB_PORT, DB_NAME } = process.env; // Environment variables

  // Use connect method to connect to the Server
  await Mongoose.connect(
    `mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true`, // Connection URL
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};
