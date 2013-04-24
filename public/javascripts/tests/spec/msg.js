define(['msg'], function (msg) {

    var COOKIE_KEY = '__err__';

    function delCookie() {
        document.cookie = COOKIE_KEY + '=deleted; expires=' + new Date(0).toUTCString();
    }

    describe('msg', function () {

        var singleMsg;
        var multiMsg;

        beforeEach(function () {
            delCookie();
            singleMsg = [['msg', 'url', 10]];
            multiMsg = [
                ['msg1', 'url1', 10],
                ['msg2', 'url2', 10],
                ['msg3', 'url3', 10]
            ];
        });

        describe('#create', function () {

            it('should be a function', function (){
                msg.create.should.be.a('function');
            });

            it('should return an array', function (){
                msg.create(singleMsg).should.be.an('array');
            });

            it('should return an array of length 2 with no Modernizr', function (){
                window._Modernizr = window.Modernizr;
                delete window.Modernizr;
                msg.create(singleMsg).length.should.equal(2);
                window.Modernizr = window._Modernizr;
                delete window._Modernizr;
            });

            it('should return an array of length 3 with Modernizr', function (){
                msg.create(singleMsg).length.should.equal(3);
            });

        });
    });

});
