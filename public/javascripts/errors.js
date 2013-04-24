require.config({
    paths: {
        domready: '../components/domready/ready'
    }
});

define(['domready', 'stringify', 'id', 'process-modernizr', 'send'], function (domready, stringify, id, processModernizr, send) {

    if (typeof JSON === "undefined" && JSON === null) {
        var JSON = {};
        JSON.stringify = stringify;
    }

    try {
        var hasLocalStorage = ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
        var hasLocalStorage = false;
    }

    var MAX_ERRORS = 40;
    var LS_KEY = '__err__';

    function isValid(msg) {
        return msg !== 'Script Error.';
    }

    var currId = id.get();

    function createMsg(errorArray) {
        var sendModernizr = false;
        if (currId === null) {
            currId = id.set(guid());
            sendModernizr = true;
        }
        var msg = [currId, errorArray];
        if (sendModernizr && typeof window.Modernizr !== 'undefined' && window.Modernizr !== null) {
            msg.push(processModernizr(window.Modernizr));
        }
        return JSON.stringify(msg);
    }

    var queue = [];
    var timer = 0;
    var errorCount = 0;

    function error(msg, url, line) {
        if (!isValid(msg)) return;
        if (errorCount > MAX_ERRORS) return;
        if (hasLocalStorage) {
            queue.push([msg, url, line]);
            localStorage.setItem(LS_KEY, JSON.stringify(queue));
            return errorCount++;
        }
        if (errorCount === 0) {
            send(createMsg([[msg, url, line]]));
            return errorCount++;
        }
        queue.push([msg, url, line]);
        if (timer === 0) {
            timer = setTimeout(function () {
                send(createMsg(queue));
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
            return send(createMsg(JSON.parse(queue)));
        }
    }

    // bindings
    domready(load);
    window.onerror = error;

});


