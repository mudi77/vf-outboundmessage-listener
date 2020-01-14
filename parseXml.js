let xml2js = require('xml2js');
let parser = new xml2js.Parser();
let fs = require('fs');

let xmlPath = __dirname + "/test.xml";
let xmlFile = {};

// fs.readFile(xmlPath, "utf-8", function (error, text) {
//     if (error) {
//         throw error;
//     }else {
//         parser.parseString(text, function (err, result) {
//             var books = result['bookstore']['book'];

//             console.log("result: ", books);
            
//             //res.render('index', { books:  books });
//         });
//     }
// });


let parse = (data, fn) => {

    console.log("parse");

    parser.parseString(data, function (err, result) {

        console.log("result: ", result);        

        fn(result);

    });

}

module.exports.parse = parse;