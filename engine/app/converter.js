var Converter = require("csvtojson").Converter;
var converter = new Converter({});

function csvToJson(filePath) {
    return new Promise((yes) => {
        //end_parsed will be emitted once parsing finished
        converter.on("end_parsed", function (jsonArray) {
           yes(jsonArray);
        });

        //read from file
        require("fs").createReadStream(filePath).pipe(converter);
    });
}

module.exports = csvToJson;