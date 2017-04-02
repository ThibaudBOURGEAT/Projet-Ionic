var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('./config');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require('./web'));

var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log(`App running on port: ${port}`);
});

// 75B7029F7E2BE1CDCD463FE803416AB3 !!!!!!!!!!!!!!!!!!!!!!! clef api steam