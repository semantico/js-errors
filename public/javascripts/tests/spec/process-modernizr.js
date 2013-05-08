define(['process-modernizr'], function (processModernizr) {

    describe('processModernizr', function () {

        it('should be a function', function () {
            expect(processModernizr).toEqual(jasmine.any(Function));
        });

        it('should return an array', function () {
            expect(processModernizr(Modernizr)).toEqual(jasmine.any(Array));
        });

        it('should return an array with a length of two', function () {
            expect(processModernizr(Modernizr).length).toBe(2);
        });

        it('should return an array with two strings in it', function () {
            var m = processModernizr(Modernizr);
            for (var i = 0; i < m.length; i++) {
                expect(m[i]).toEqual(jasmine.any(String));
            }
        });

    });

});

