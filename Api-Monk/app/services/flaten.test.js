const rewire = require('rewire');
const expect = require('chai').expect;
const flatenService = rewire('./flaten.js');
const csvjson = require('csvjson');

const csvOptions = {
    delimiter : ',', // optional
    quote     : '"' // optional
};

describe('flaten.Service',function(){
    let parseObjectType ;
    let keyName ;
    let parseProperties;
    let addToFields;

    before(function(){
        parseObjectType = flatenService.__get__('parseObjectType')
        keyName = flatenService.__get__('keyName')
        parseProperties = flatenService.__get__('parseProperties')
        addToFields = flatenService.__get__('addToFields')

    })

    describe('keyName',function(){

        it('should return empty string',function () {
            expect(keyName([''])).to.equal('')
        })

        it('should return one value',function(){
            expect(keyName(['','coord'])).to.equal('coord')
        })

    })

    describe('parseObjectType',function(){

        it('should return two fields from object',function(){
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51}
            }
            const result = parseObjectType("",source,[])
            expect(result).to.deep.equal([ 'coord.lon', 'coord.lat' ])
        })

        it('should return three fields from object',function(){
            const source = {
                "coord": {"lon": -0.13, "lat": {"val":1,"val2":2}}
            }
            const result = parseObjectType("",source,[])
            expect(result).to.deep.equal([ 'coord.lon', 'coord.lat.val', 'coord.lat.val2' ])
        })

    })

    describe('addToFields',function(){
        "use strict";

        it("should add key if not exists",function(){
            let fields = []
            let result = addToFields("key1",fields)
            expect(fields.length).to.equal(1)
        })

        it("should not add key if it already exists",function(){
            let fields = ['key1']
            let result = addToFields("key1",fields)
            expect(fields.length).to.equal(1)
        })

    })

    describe('parseProperties',function(){

        it('case 1 -> data is an simple object with two properties',function(){
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51}
            }
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon', 'coord.lat' ])
            expect(result.unwind.length).to.equal(0)
        })

        it('case 2 -> data is an object with one property an array of objects, only one item',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}]}
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon',
                    'coord.lat',
                    'weather.id',
                    'weather.main',
                    'weather.description',
                    'weather.icon' ])
            expect(result.unwind).to.deep.equal(['weather'])
        })

        it('case 3 -> data is an object with one property an array of objects, two same objects',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}
                ]}
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon',
                'coord.lat',
                'weather.id',
                'weather.main',
                'weather.description',
                'weather.icon' ])
            expect(result.unwind).to.deep.equal(['weather'])
        })

        it('case 4 -> data is an object with one property an array of objects, two objects, one object having extra property',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","extraProp":"value"}
                ]}
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon',
                'coord.lat',
                'weather.id',
                'weather.main',
                'weather.description',
                'weather.icon',
                'weather.extraProp'])
            expect(result.unwind).to.deep.equal(['weather'])
        })

        it('case 5 -> data is an object with one property an array, array of int or string, not objects',function(){
            "use strict";
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51},"weather":[1,2,3]
            }
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon', 'coord.lat', 'weather' ])
            expect(result.unwind.length).to.equal(1)
        })

        it('case 6 -> data is an object with one property an array of objects, that property has another property that is an array',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","values":[1,2,3]}]}
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon',
                'coord.lat',
                'weather.id',
                'weather.main',
                'weather.description',
                'weather.icon',
                'weather.values'])
            expect(result.unwind).to.deep.equal(['weather','weather.values'])
        })

        it('case 7 -> data is an object with one property an array of objects, that property has another property that is an array of array',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {
                    "id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","values":[1,2,{"moreValues":[12,14,16]}]
                }]}
            const result = parseProperties(source)
            expect(result.fields).to.deep.equal([ 'coord.lon',
                'coord.lat',
                'weather.id',
                'weather.main',
                'weather.description',
                'weather.icon',
                'weather.values',
                'weather.values.moreValues'
            ])
            expect(result.unwind).to.deep.equal(['weather','weather.values','weather.values.moreValues'])
        })
    })

    describe('parseJson',function(){
        "use strict";
        it('case 1 -> data is an simple object with two properties',function(){
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51}
            }
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(1)
            expect(csvResult[0]).to.have.property('coord.lon')
            expect(csvResult[0]).to.have.property('coord.lat')
        })

        it('case 2 -> data is an object with one property an array of objects, only one item',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}]}
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(1)
            expect(csvResult[0]).to.have.property('coord.lon')
            expect(csvResult[0]).to.have.property('coord.lat')
            expect(csvResult[0]).to.have.property('weather.id')
            expect(csvResult[0]).to.have.property('weather.icon')
        })

        it('case 3 -> data is an object with one property an array of objects, two same objects',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}
            ]}
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(2)
            csvResult.forEach(function(item){
                expect(item).to.have.property('coord.lon')
                expect(item).to.have.property('coord.lat')
                expect(item).to.have.property('weather.id')
                expect(item).to.have.property('weather.icon')
            })
        })

        it('case 4 -> data is an object with one property an array of objects, two objects, one object having extra property',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},
                {"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","extraProp":"value"}
            ]}
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(2)
            csvResult.forEach(function(item){
                expect(item).to.have.property('coord.lon')
                expect(item).to.have.property('coord.lat')
                expect(item).to.have.property('weather.id')
                expect(item).to.have.property('weather.icon')
                expect(item).to.have.property('weather.extraProp')
            })
        })

        it('case 5 -> data is an object with one property an array, array of int or string, not objects',function(){
            "use strict";
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51},"weather":[1,2,3]
            }
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(3)
            csvResult.forEach(function(item){
                expect(item).to.have.property('coord.lon')
                expect(item).to.have.property('coord.lat')
                expect(item).to.have.property('weather')
            })
        })

        it('case 6 -> data is an object with one property an array of objects, that property has another property that is an array',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","values":[1,2,3]}]}
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(3)
            csvResult.forEach(function(item){
                expect(item).to.have.property('coord.lon')
                expect(item).to.have.property('coord.lat')
                expect(item).to.have.property('weather.id')
                expect(item).to.have.property('weather.main')
                expect(item).to.have.property('weather.description')
                expect(item).to.have.property('weather.icon')
                expect(item).to.have.property('weather.values')

            })
        })

        it('case 7 -> data is an object with one property an array of objects, that property has another property that is an array of array',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[
                {
                    "id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d","values":[1,2,{"moreValues":[12,14,16]}]
                }]}
            const result = flatenService.parseJson(source)
            const csvResult = csvjson.toObject(result,csvOptions)
            expect(csvResult).to.be.an('array')
            expect(csvResult.length).to.equal(5)
            csvResult.forEach(function(item){
                expect(item).to.have.property('coord.lon')
                expect(item).to.have.property('coord.lat')
                expect(item).to.have.property('weather.id')
                expect(item).to.have.property('weather.main')
                expect(item).to.have.property('weather.description')
                expect(item).to.have.property('weather.icon')
                expect(item).to.have.property('weather.values')
                expect(item).to.have.property('weather.values.moreValues')

            })

        })

    })

})