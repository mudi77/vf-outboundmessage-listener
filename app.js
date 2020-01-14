let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let parseXml = require('./parseXml');
let xmlparser = require('express-xml-bodyparser');
let path = require('path');

// set the port of our application
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use('/public', express.static( path.join( __dirname + '/public' ) ) );

//app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/', function(req, res) {    
    console.log("GET request !", req.body);
    res.render('index', { data: JSON.stringify( {"key":"test1", "key2": "test2"} ) });

    //res.redirect('/index', { data: JSON.stringify( {"key":"test16565", "key2": "test275757"} ) });
    
});

// app.post('/', xmlparser(), (req, res, next) => {
//     console.log('SF outbound msg received! \n');

//     let processMsg = parseXml.utils.parse(req.body);

//     console.log("req.body: ", req.body);
//     console.log("processMsg: ", processMsg);

//     //res.set("Content-Type", "text/xml");
//     res.set('Content-Type', 'text/html');
//     //res.render('index', { data: JSON.stringify( {"key":"test16565", "key2": "test275757"} ) });

//     res.redirect('index', { data: JSON.stringify( {"key":"test16565", "key2": "test275757"} ) });
    
//     // parseXml.utils.load((loadData) => {
//     //     console.log("file load: ", loadData);
//     // });

//   });

  app.all('/', xmlparser(), (req, res, next) => {
    console.log('SF outbound msg received! \n');

    let processMsg = parseXml.utils.parse(req.body);

    console.log("req.body: ", req.body);
    console.log("processMsg: ", processMsg);

    //res.set("Content-Type", "text/xml");
    res.set('Content-Type', 'text/html');
    res.render('index', { 'data': JSON.stringify( {"key":"test16565", "key2": "test275757"} ) });

    //res.redirect('index', { data: JSON.stringify( {"key":"test16565", "key2": "test275757"} ) });
    
    // parseXml.utils.load((loadData) => {
    //     console.log("file load: ", loadData);
    // });

  });

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

