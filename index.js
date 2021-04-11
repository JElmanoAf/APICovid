let express = require ('express')
// import body parser
let bodyParser = require ('body-parser');
// Import mongoose
let mongoose = require ('mongoose');
let app = express ();

// Import routes
let apiRoutes = require ("./RegistoRoutes")

// configure bodyparser to process orders
app.use (bodyParser.urlencoded ({
    extended: true
}));

app.use (bodyParser.json ());

// Connect to BD
const dbPath = 'mongodb://localhost/CovidAPI';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect (dbPath, options);

mongo.then (() => {
    console.log ('Linked to BD');
}, error => {
    console.log (error, 'error');
});
var db = mongoose.connection;

// Check Connection
if (! db)
    console.log ("Error connecting db");
else
    console.log ("DB Connected Successfully");

// Port Server
var port = process.env.PORT || 6666;


// Use API routes in the app
app.use ('/ api', apiRoutes)

// Start Server
app.listen (port, function () {
    console.log ("UP server in port:" + port);
});