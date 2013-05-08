define(['id'], function (id) {

    var COOKIE_KEY = '__err__';

    function delCookie() {
        document.cookie = COOKIE_KEY + '=delete; expires=' + new Date(0).toUTCString() + '; path=' + escape('/');
    }

    describe('id', function () {

        beforeEach(function () {
            delCookie();
        });

        describe('.get()', function () {

            it('should be a function', function () {
                expect(id.get).toEqual(jasmine.any(Function));
            });

            it('should return null when cookie is not set', function () {
                expect(id.get()).toBe(null);
            });

        });

        describe('.set()', function () {

            it('should be a function', function () {
                expect(id.set).toEqual(jasmine.any(Function));
            });

            it('should return the id when cookie has been set', function () {
                var guid = id.set();
                expect(guid).toEqual(id.get())
            });

        });

    });

});
