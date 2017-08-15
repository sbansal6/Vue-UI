const rewire = require('rewire');
const expect = require('chai').expect;
const flatenService = rewire('./flaten.js');

describe('flaten.Service',function(){
    let parseObjectType ;
    let keyName ;
    let parseFields;

    before(function(){
        parseObjectType = flatenService.__get__('parseObjectType')
        keyName = flatenService.__get__('keyName')
        parseFields = flatenService.__get__('parseFields')
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

    describe('parseFields',function(){

        it('should return two fields from object',function(){
            const source = {
                "coord": {"lon": -0.13, "lat": 51.51}
            }
            const result = parseFields(source)
            expect(result).to.deep.equal([ 'coord.lon', 'coord.lat' ])
        })

        it('case',function(){
            const source  = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}]}
            console.log(parseFields(source))
        })


    })

})