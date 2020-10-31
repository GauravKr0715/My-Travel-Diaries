const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require('./api/register');
const login = require('./api/login');
const logEntry = require('./api/logEntry');
const verifyUser = require("./api/verifyUser");
const path = require("path");
const { notFound, errorHandler } = require("./middlewares");


mongoose
  .connect(`mongodb+srv://gauravtest:rhino97@test.xsaad.mongodb.net/mtd?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(mongoose.connection.readyState))
  .catch((err) => console.log(err))

app.use(cors());
app.use(express.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/logEntry", logEntry);
app.use("/api/verifyUser", verifyUser);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at PORT number:${PORT}`);
});
