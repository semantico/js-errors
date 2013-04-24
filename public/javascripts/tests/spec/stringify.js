define(['stringify'], function (stringify) {

    describe('stringify', function () {

        var mixedArray;
        var mixedArrayJSON;

        beforeEach(function () {
            mixedArray = [0, 1, 2, ['abc', 'xyz'], 'test'];
            mixedArrayJSON = JSON.stringify(mixedArray);
        });

        it('should be a function', function () {

            stringify.should.be.a('function');

        });

        it('should handle a simple array of numbers', function (){
            var array = [0, 1, 2, 3];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle two dimensional arrays of numbers', function (){
            var array = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle three dimensional arrays of numbers', function (){
            var array = [[[0, 1, 2, 3], [0, 1, 2, 3]], [[0, 1, 2, 3], [0, 1, 2, 3]]];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle a simple array of strings', function (){
            var array = ['0', '1', '2', '3'];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle two dimensional arrays of strings', function (){
            var array = [['0', '1', '2', '3'], ['0', '1', '2', '3'], ['0', '1', '2', '3']];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle three dimensional arrays of strings', function (){
            var array = [[['0', '1', '2', '3'], ['0', '1', '2', '3']], [['0', '1', '2', '3'], ['0', '1', '2', '3']]];
            JSON.stringify(array).should.equal(stringify(array));
        });

        it('should handle a mixed array', function (){
            JSON.stringify(mixedArray).should.equal(stringify(mixedArray));
        });

        it('should work when mapped to JSON.stringify', function (){
            var JSON = {};
            JSON.stringify = stringify;
            JSON.stringify(mixedArray).should.equal(mixedArrayJSON);
        });

    });


});
