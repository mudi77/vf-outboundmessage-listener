let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let parseXml = require('./parseXml');
// var xml = require('xml');
// response.set('Content-Type', 'text/xml');
// response.send(xml(name_of_restaurants));

// set the port of our application
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.use( bodyParser() );

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.get('/', function(req, res) {    
    console.log("GET request received !!!", req.body);

    //bodyParser(req.body);

    res.render('index', { data: JSON.stringify( req.body ) });

    // parseXml.parse(req.body, (data) => {
    //     console.log("data: ", data);
    // });
});

app.post("/", function (req, res) {
    res.type('application/xml');

    console.log("POST request received !!!", req.body);
    //bodyParser(req.body);

    res.render('index', { data: JSON.stringify( req.body ) });

    // parseXml.parse(req.body, (data) => {
    //     console.log("data: ", data);
    // });
});

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

