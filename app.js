let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let parseXml = require('./parseXml');
let xmlparser = require('express-xml-bodyparser');

// set the port of our application
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {    
    console.log("GET request !", req.body);
    res.render('index', { data: JSON.stringify( req.body ) });
});

app.post('/', xmlparser(), (req, res) => {
    console.log('SF outbound msg received! \n');

    let processMsg = parseXml.parse(req.body);

    console.log("req.body: ", req.body);
    console.log("processMsg: ", processMsg);

    res.set("Content-Type", "text/xml");
    res.render('index', { data: JSON.stringify( processMsg ) });
  });


app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

