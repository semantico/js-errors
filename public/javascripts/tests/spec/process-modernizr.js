define(['process-modernizr'], function (processModernizr) {

    var toString = Object.prototype.toString;

    describe('processModernizr', function () {

        it('should be a function', function () {
            expect(typeof processModernizr).toBe('function');
        });

        it('should return an array', function () {
            expect(toString.call(processModernizr(Modernizr))).toMatch('Array');
        });

        it('should return an array with a length of two', function () {
            expect(processModernizr(Modernizr).length).toBe(2);
        });

        it('should return an array with two strings in it', function () {
            var m = processModernizr(Modernizr);
            for (var i = 0; i < m.length; i++) {
                expect(typeof m[i]).toBe('string');
            }
        });

    });

});

