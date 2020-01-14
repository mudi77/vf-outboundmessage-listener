let xml2js = require('xml2js');
let parser = new xml2js.Parser();
let fs = require('fs');

let xmlPath = __dirname + "/test.xml";
let xmlFile = {};

fs.readFile(xmlPath, "utf-8", function (error, text) {
    if (error) {
        throw error;
    }else {
        parser.parseString(text, function (err, result) {
            var books = result['bookstore']['book'];

            console.log("result: ", books);
            
            //res.render('index', { books:  books });
        });
    }
});


let parse = (data, fn) => {

    console.log("parse");

    return parser.parseString(data, function (err, result) {
        let books = result['bookstore']['book'];

        console.log("result: ", books);        
        //res.render('index', { books:  books });

        fn(books);

    });

}

module.exports = parse;