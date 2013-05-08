define(['msg'], function (msg) {

    var COOKIE_KEY = '__err__';

    function delCookie() {
        document.cookie = COOKIE_KEY + '=delete; expires=' + new Date(0).toUTCString() + '; path=' + escape('/');
    }

    function delWinProp(name) {
        window[name] = undefined;
        try {
            delete window[name];
        } catch (e) {}
    }

    describe('msg', function () {

        var singleMsg;
        var multiMsg;
        var toString = Object.prototype.toString;

        beforeEach(function () {
            delCookie();
            singleMsg = [['msg', 'url', 10]];
            multiMsg = [
                ['msg1', 'url1', 10],
                ['msg2', 'url2', 10],
                ['msg3', 'url3', 10]
            ];
        });

        describe('.create()', function () {

            it('should be a function', function (){
                expect(typeof msg.create).toBe('function');
            });

            it('should return an array', function (){
                expect(toString.call(msg.create(singleMsg))).toMatch('Array');
            });

            it('should return an array of length 2 with no Modernizr', function (){
                window._Modernizr = window.Modernizr;
                delWinProp('Modernizr');
                expect(msg.create(singleMsg).length).toBe(2);
                window.Modernizr = window._Modernizr;
                delWinProp('_Modernizr');
            });

            it('should return an array of length 3 with Modernizr', function (){
                var first = msg.create(singleMsg)
                expect(first.length).toBe(3);
            });

            it('should return the messages as the second argument', function () {
                expect(msg.create(singleMsg)[1]).toBe(singleMsg);
                expect(msg.create(multiMsg)[1]).toBe(multiMsg);
            });

            it('should return an array with the last item as an array on 1st request', function () {
                var first = msg.create(singleMsg);
                expect(toString.call(first)).toMatch('Array');
                expect(toString.call(first[2])).toMatch('Array');
            });

            it('should return an array with the last item as an array on 1st request', function () {
                var first = msg.create(singleMsg);
                var second = msg.create(singleMsg);
                expect(toString.call(second)).toMatch('Array');
                expect(typeof second[2]).toBe('string');
            });

        });

        describe('.json()', function () {

            it('should return a string', function (){
                expect(typeof msg.json(singleMsg)).toBe('string');
            });

            it('should return the same string as JSON#stringify the result of #create', function (){
                // first will be ignored because it contains modernizr
                var first = msg.create(singleMsg);
                var second = msg.json(singleMsg);
                var third = msg.create(singleMsg);
                expect(second).toBe(JSON.stringify(third));
            });

        });

    });

});
