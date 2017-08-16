const sampleData =
    [
        {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},{"id":400,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","value":2}]}
 //      , {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},{"id":400,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}]}

    ]

// ** close enough, need to put object in array, can copy logic to parse field namnes

 const jsonexport = require('jsonexport');
jsonexport(sampleData,function(err, csv){
    if(err) return console.log(err);
    console.log(csv);
});

// Nope
// var converter = require('json-2-csv');
// var json2csvCallback = function (err, csv) {
//     if (err) throw err;
//     console.log(csv);
// };
// converter.json2csv(sampleData, json2csvCallback);

