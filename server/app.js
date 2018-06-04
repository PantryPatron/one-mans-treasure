const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const routes = require("./routes.js");
const dotenv = require('dotenv').config();

let app = express();
exports.app = app;
app.set('port', process.env.PORT || 1128)
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use('/', routes);


app.listen(app.get('port'), ()=>{
  console.log(`listening port: ${app.get('port')}`);
})