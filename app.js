let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let parseXml = require('./parseXml');
// var xml = require('xml');
// response.set('Content-Type', 'text/xml');
// response.send(xml(name_of_restaurants));

let xmlparser = require('express-xml-bodyparser');

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


app.post('/', xmlparser(), (req, res) => {
    console.log('Incoming message!');
    let xml = `<?xml version="1.0" encoding="utf-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Body>
      <notifications xmlns="http://soap.sforce.com/2005/09/outbound">
          <Ack>true</Ack>
      </notifications>
    </soapenv:Body>
  </soapenv:Envelope>`;

    console.log("req.body: ", req.body);
    console.log("xml: ", xml);

    res.set("Content-Type", "text/xml").send(xml);
  });

//app.post("/", function (req, res) {
//    res.type('application/xml');

//    console.log("POST request received !!!", req.body);
    //bodyParser(req.body);

//    res.render('index', { data: JSON.stringify( req.body ) });

    // parseXml.parse(req.body, (data) => {
    //     console.log("data: ", data);
    // });
//});

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

