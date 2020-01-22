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

app.use(bodyParser.json());

let resultData = {"key1":"val1","key2":"val2","key3":"val3"};

app.get('/', function(req, res) {    
    console.log("GET request !", req.body);
    res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });    
});


// app.get('/sf-trgr', function(req, res) {    
//     console.log("GET request sf-trgr received! - body: ", req.body);
//     res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });    
// });


app.post('/sf-trgr', function(req, res) {    
    console.log("POST request sf-trgr received! - body: ", req.body);
    res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });    
});



app.post('/', xmlparser(), (req, res, next) => {
    console.log('SF outbound msg received! \n');

    let processMsg = {};    

    //console.log("req.body: ", req.body);
    //console.log("processMsg: ", processMsg);
    //res.set('Content-Type', 'text/html');
    //res.status(500).render('index', { data: JSON.stringify( resultData, undefined, 4 )  });     
    //res.redirect('indexxxx');
    // app.get('/', function(req, res) {    
    //     console.log("GET in POST request !", req.body);
    //     res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });    
    // });

    try{

        resultData = parseXml.utils.parse(req.body);
        processMsg = parseXml.utils.parse(req.body);

        console.log("processMsg: ", processMsg);

        res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });  
    }catch(e){

        console.log("e: ", e);
        res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });  
    }

  });

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

