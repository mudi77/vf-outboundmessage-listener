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

};


unwrapMessage = function(obj) {
    try {
  
      var orgId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].organizationid[0];
      var contactId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:id'][0];
      //var mobilePhone = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:mobilephone'][0];
  
      return {
        orgId: orgId,
        contactId: contactId,
        //mobilePhone: mobilePhone
      };
  
    } catch (e) {
      console.log('Could not parse OBM XML', e);
      return {};
    }
  };
  

module.exports.unwrapMessage = unwrapMessage;