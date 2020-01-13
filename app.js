let express = require('express');
let app = express();

// set the port of our application
let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {    
    console.log("GET request reseived !!!", req.body);
    res.render('index');
});

app.post("/", function (req, res) {
    console.log("POST request reseived !!!", req.body);
    res.send("POST request reseived !!!");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

