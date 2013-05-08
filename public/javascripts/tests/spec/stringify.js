var deps = ['stringify'];
if (window.JSON == null) {
    deps.push('json');
}

define(deps, function (stringify) {

    describe('stringify', function () {

        var mixedArray;
        var mixedArrayJSON;

        beforeEach(function () {
            mixedArray = [0, 1, 2, ['abc', 'xyz'], 'test'];
            mixedArrayJSON = JSON.stringify(mixedArray);
        });

        it('should be a function', function () {
            expect(stringify).toEqual(jasmine.any(Function));
        });

        it('should handle a simple array of numbers', function (){
            var array = [0, 1, 2, 3];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle two dimensional arrays of numbers', function (){
            var array = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle three dimensional arrays of numbers', function (){
            var array = [[[0, 1, 2, 3], [0, 1, 2, 3]], [[0, 1, 2, 3], [0, 1, 2, 3]]];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle a simple array of strings', function (){
            var array = ['0', '1', '2', '3'];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle two dimensional arrays of strings', function (){
            var array = [['0', '1', '2', '3'], ['0', '1', '2', '3'], ['0', '1', '2', '3']];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle three dimensional arrays of strings', function (){
            var array = [[['0', '1', '2', '3'], ['0', '1', '2', '3']], [['0', '1', '2', '3'], ['0', '1', '2', '3']]];
            expect(JSON.stringify(array)).toBe(stringify(array));
        });

        it('should handle a mixed array', function (){
            expect(JSON.stringify(mixedArray)).toBe(stringify(mixedArray));
        });

        it('should work when mapped to JSON.stringify', function (){
            var JSON = {};
            JSON.stringify = stringify;
            expect(JSON.stringify(mixedArray)).toBe(mixedArrayJSON);
        });

    });


});
