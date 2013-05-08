require(['domready', 'send', 'msg'], function (domready, send, msg) {

    var hasLocalStorage;
    try {
        hasLocalStorage = ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
        hasLocalStorage = false;
    }

    var MAX_ERRORS = 40;
    var LS_KEY = '__err__';

    function isValid(msg) {
        return msg !== 'Script Error.';
    }

    var queue = [];
    var timer = 0;
    var errorCount = 0;

    function error(text, url, line) {
        if (!isValid(msg)) return;
        if (errorCount > MAX_ERRORS) return;
        if (hasLocalStorage) {
            queue.push([text, url, line]);
            localStorage.setItem(LS_KEY, JSON.stringify(queue));
            return errorCount++;
        }
        if (errorCount === 0) {
            send(msg.json([[text, url, line]]));
            return errorCount++;
        }
        queue.push([text, url, line]);
        if (timer === 0) {
            timer = setTimeout(function () {
                send(msg.json(queue));
                queue = [];
                timer = 0;
            }, 2500);
        }
        return errorCount++;
    }

    function load() {
        if (!hasLocalStorage) return;
        var queue = localStorage.getItem(LS_KEY);
        localStorage.removeItem(LS_KEY);
        if (queue) {
            send(msg.json(JSON.parse(queue)));
        }
    }

    // bindings
    domready(load);
    window.onerror = error;

});


