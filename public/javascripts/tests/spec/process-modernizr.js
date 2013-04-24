define(['process-modernizr'], function (processModernizr) {

    describe('processModernizr', function () {

        it('should be a function', function () {
            processModernizr.should.be.a('function');
        });

        it('should return an array', function () {
            processModernizr(Modernizr).should.be.an('array');
        });

        it('should return an array with a length of two', function () {
            processModernizr(Modernizr).length.should.equal(2);
        });

        it('should return an array with two strings in it', function () {
            processModernizr(Modernizr).forEach(function (item) {
                item.should.be.a('string');
            });
        });

    });

});

