define(['jquery', 'send'], function ($, send) {

    'use strict';

    describe('send', function () {

        var shortMessage;
        var shortRandom;
        var longRandom;

        beforeEach(function () {

            runs(function () {
                $.get('/test-clear');
            });

            shortMessage = 'test-12345';

            shortRandom = '';
            for (var i = 0; i < 10; i++) {
                shortRandom += Math.floor(Math.random() * 36).toString(36);
            }

            longRandom = '';
            for (var i = 0; i < 2100; i++) {
                longRandom += Math.floor(Math.random() * 36).toString(36);
            }

        });

        describe('GET', function () {

            it('should send a short message and retreive the same message', function () {

                send(shortMessage);

                runs(function () {

                    $.get('/test-body', function (data) {
                        expect(data).toBe(shortMessage);
                    });

                });

            });

            it('should send a short random message and retreive the same message', function () {

                send(shortRandom);

                runs(function () {

                    $.get('/test-body', function (data) {
                        expect(data).toBe(shortRandom);
                    });

                });

            });

            it('should send a short message and retreive the referer', function () {

                send(shortMessage);

                runs(function () {

                    $.get('/test-referer', function (data) {
                        expect(data).toBe(location.hostname);
                    });

                });

            });

        });

        describe('POST', function () {

            it('should send a long random message and retreive the same message', function () {

                send(longRandom);

                runs(function () {

                    $.get('/test-body', function (data) {
                        expect(data).toBe(longRandom);
                    });

                });

            });

            it('should send a long message and retreive the referer', function () {

                send(longRandom);

                runs(function () {

                    $.get('/test-referer', function (data) {
                        expect(data).toBe(location.hostname);
                    });

                });

            });

        });

    });

});
