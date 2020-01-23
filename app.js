let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let renderLog = require('./renderLog');
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use('/public', express.static( path.join( __dirname + '/public' ) ) );

app.use(bodyParser.json());

let resultData = {"key1":"val1","key2":"val2","key3":"val3"};



//READ DATA
app.get('/', async function(req, res) {    
    //let updatedData = await renderLog.update.getNew();
    res.render('index', { data: "" });    
});


//SAVE DATA
app.post('/sf-trgr', function(req, res) {    
    //console.log("DATA received! - Account " + (req.body.isInsert == 'yes' ? 'Inserted' : 'Updated') + " ID: " + req.body.Id);

    renderLog.update.setNew( req.body );
    res.render('index', { data: JSON.stringify( resultData, undefined, 4 )  });    
});


//READ DATA
app.get('/render', async (req, res) => {
    let updatedData = await renderLog.update.getNew();

    //console.log('updatedData: ', updatedData );
    res.send( updatedData );
});


app.post('/del', function(req, res) {    
    renderLog.update.setNew( "del" );
    res.send( "" ); 
});



app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});

