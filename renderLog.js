let fs = require('fs');

let update = {
    getNew: () => {

        return new Promise((resolve) => {
            fs.readFile('data.json', "utf-8", (err, data) => {

                if (err) { console.log(err) }

                resolve(data);
            });
        });

    },

    processData: (newData, oldData) => {
        if(newData === "del") return "";

        var newDataObject = JSON.parse( JSON.stringify( newData) );
        var merge = [];

        if(oldData.length > 1){            
            merge.push(...JSON.parse( oldData ));
            merge.push(newDataObject);
        }else{
            merge.push(newDataObject);
        }

        return JSON.stringify( merge );
    },

    setNew: (newData) => {

        fs.readFile('data.json', "utf-8", (err, oldData) => {

            if (err) { console.log(err) }

            let processedData = update.processData(newData, oldData);

            fs.writeFile("data.json", processedData, (err) => {
                if (err) console.log("ERROR: ", err);

                //console.log("Successfully Written to File.");

            });
        });

    }
}

module.exports.update = update;
