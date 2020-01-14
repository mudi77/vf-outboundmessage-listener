let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let parseXml = require('./parseXml');

// set the port of our application
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser() );

app.get('/', function(req, res) {    
    console.log("GET request reseived !!!", req.body);
    res.render('index');

    // parseXml.parse(req.body, (data) => {

    //     console.log("data: ", data);

    // });
});

app.post("/", function (req, res) {
    console.log("POST request received !!!", req.body);
    //parser(req.body);

    parseXml.parse(req.body, (data) => {

        console.log("data: ", data);

    });
});

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

