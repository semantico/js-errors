define(['id'], function (id) {

    var COOKIE_KEY = '__err__';

    function delCookie() {
        document.cookie = COOKIE_KEY + '=delete; expires=' + new Date(0).toUTCString() + '; path=' + escape('/');
    }

    describe('id', function () {

        beforeEach(function () {
            delCookie();
        });

        describe('#get', function () {

            it('should be a function', function () {
                id.get.should.be.a('function');
            });

            it('should return null when cookie is not set', function () {
                expect(id.get()).to.be.null;
            });

        });

        describe('#set', function () {

            it('should be a function', function () {
                id.set.should.be.a('function');
            });

            it('should return the id when cookie has been set', function () {
                var guid = id.set();
                guid.should.equal(id.get())
            });

        });

    });

});
