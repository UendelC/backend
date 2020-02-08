const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const http = require("http");
const { setupWebsocket } = require("./websocket");

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://uendel:36452347@cluster0-2f2fa.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
