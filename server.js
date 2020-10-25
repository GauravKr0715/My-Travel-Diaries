const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const logs = require("./api/logs");
const path = require("path");
const { notFound, errorHandler } = require("./middlewares");


mongoose
  .connect(`mongodb+srv://gauravtest:rhino97@test.xsaad.mongodb.net/mtd?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(mongoose.connection.readyState))
  .catch((err) => console.log(err))

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world...",
  });
});

app.use("/api/logs", logs);

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
  console.log(`Listening at http://localhost:${PORT}`);
});
