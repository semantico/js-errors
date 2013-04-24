define(['stringify'], function (stringify) {

    describe('stringify', function () {

        it('should be a function', function () {

            stringify.should.be.a('function');

        });

        if (typeof JSON !== "undefined" && JSON !== null) {

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

        }

    });


});
