const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error.middleware");

const server = require("http").createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);

server.listen(4000, () => {
  console.log("listen 4000");
});

module.exports = express;
