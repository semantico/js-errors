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

            it('should return the messages as the second argument', function () {
                expect(msg.create(singleMsg)).to.have.property('1', singleMsg);
                expect(msg.create(multiMsg)).to.have.property('1', multiMsg);
            });

            it('should return an array with length 3 with Modernizr on 1st requests' +
               ' and return an array with length 2 on seubsequent requests', function () {
                var first = msg.create(singleMsg);
                first.length.should.equal(3);
                var second = msg.create(singleMsg);
                second.length.should.equal(2);
                var third = msg.create(singleMsg);
                third.length.should.equal(2);
            });

        });

        describe('#json', function () {

            it('should return a string', function (){
                msg.json(singleMsg).should.be.a('string');
            });

            it('should return the same string as JSON#stringify the result of #create', function (){
                // first will be ignored because it contains modernizr
                var first = msg.create(singleMsg);
                var second = msg.json(singleMsg);
                var third = msg.create(singleMsg);
                second.should.equal(JSON.stringify(third));
            });

        });

    });

});
