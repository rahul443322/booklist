const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//import

const routes = require("./routes/routes");

//middleware

app.use(express.json());

app.use("/",routes);

module.exports= app;