/**
 * Flat-ens json to csv
 */
const _ = require('underscore')
const json2csv = require('json2csv');
const is = require('is');



/**
 * Parse field names and unwind objects out of json
 * objects that are array , and items of array are objects need to be in this unwinded array
 */
function parseProperties(data){
    const fields = []
    const unwind = []

    //{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}

    // case when data is an object
    for  (let key in data) {

        // check if property is an object
        if (is.object(data[key])) {
            parseObjectType(key,data[key],fields,unwind)
        }

        // if property is an array
        else if (is.array(data[key])) {
            parseArrayType(key,data[key],fields,unwind)
        }

        else  {

            addToFields(key,fields)
        }
    }

    // case when data is an array
    // loop over top 100 items

    return {
        fields,unwind
    }
}

function parseArrayType(parentKey,array,fields,unwind){
    "use strict";
    array.forEach(function(item){
        if (is.object(item)) {
            addToFields(parentKey,unwind)
            parseObjectType(parentKey,item,fields,unwind)
        } else if (is.array(item)) {

        } else {
            addToFields(parentKey,fields)
        }
    })
}


/**
 * Recursive function to loop over objects
 * @param parentKey
 * @param object
 * @param fields
 */
function parseObjectType(parentKey,object,fields,unwind){
    for (let key in object){
        if (is.object(object[key])) {
            parseObjectType(keyName([parentKey,key]),object[key],fields,unwind)
        } else {
            addToFields(keyName([parentKey,key]),fields)
        }
    }
    return fields
}

/**
 * Add key to field if doesn't exists already
 * @param keyName
 * @param fields
 */
function addToFields(keyName,fields){
    "use strict";
    // add if not already exists
    let field = _.find(fields,function(f){return f === keyName})
    if (!field){
        fields.push(keyName)
    }
}

/**
 * Return keys joined by delimiter
 * Removed empty keys
 * @param keys
 * @returns {string}
 */
function keyName(keys) {
    const nonEmpty = _.filter(keys, function (k) {
        return (k != '')
    })
    return nonEmpty.join('.')
}

/**
 * Function to parse json into csv
 */
function parseJson(data){
    let properties = parseProperties(data)
    let csv = json2csv({ data: data, fields: properties.fields, unwind:properties.unwind });
    return csv
}

module.exports  = {
    parseJson
}