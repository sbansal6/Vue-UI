/**
 * Flat-ens json to csv
 */
const _ = require('underscore')
const json2csv = require('json2csv');
const is = require('is');

/**
 * Function to parse json into csv
 */
function flatJson(){

}

/**
 * Parse field names out of json
 */
function parseFields(data){
    const fields = []
    //{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
    for  (let key in data) {
        if (is.object(data[key])) {
            parseObjectType(key,data[key],fields)
        }
        // only check 1st item of array assuming strcuture is same
        if (is.array(data[key])) {
           data[key][0]
        }
    }
    return fields
}

/**
 * Recursive function to loop over objects
 * @param parentKey
 * @param object
 * @param fields
 */
function parseObjectType(parentKey,object,fields){
    for (let key in object){
        if (is.object(object[key])) {
            parseObjectType(keyName([parentKey,key]),object[key],fields)
        } else {
            fields.push(keyName([parentKey,key]))
        }
    }
    return fields
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

parseFields()

module.exports  = {
    flatJson
}