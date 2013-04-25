require(['globals', 'domready', 'send', 'msg'], function (globals, domready, send, msg) {

    try {
        var hasLocalStorage = ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
        var hasLocalStorage = false;
    }

    function isValid(msg) {
        return msg !== 'Script Error.';
    }

    var queue = [];
    var timer = 0;
    var errorCount = 0;

    function error(text, url, line) {
        if (!isValid(msg)) return;
        if (errorCount > globals.MAX_ERRORS) return;
        if (hasLocalStorage) {
            queue.push([text, url, line]);
            localStorage.setItem(globals.LS_KEY, JSON.stringify(queue));
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
        var queue = localStorage.getItem(globals.LS_KEY);
        localStorage.removeItem(globals.LS_KEY);
        if (queue) {
            send(msg.json(JSON.parse(queue)));
        }
    }

    // bindings
    domready(load);
    window.onerror = error;

});


