var TO_STRING = Object.prototype.toString;

function type(obj) {
    var str = TO_STRING.call(obj);
    return str.slice(8, str.length - 1);
}

// JSON.stringify shim just for arrays, strings and numbers
if (typeof JSON === "undefined" || JSON === null) {
    var JSON = {};
    JSON.stringify = function (array) {
        var out = [];
        for (var i = 0, l = array.length; i < l; i++) {
            switch (type(array[i])) {
                case 'Array':
                    out.push(JSON.stringify(array[i]));
                    break;
                case 'Number':
                    out.push(array[i]);
                    break;
                default:
                    out.push('"' + array[i] + '"');
            }
        }
        return '[' + out.join(',') + ']';
    }
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var COOKIE_KEY = '__err__';
var FETCH_COOKIE_RE = new RegExp('(?:(?:^|.*;\\s*)' + COOKIE_KEY + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*)|.*");

function getId() {
    return document.cookie.replace(FETCH_COOKIE_RE, "$1") || null;
}

function setId(id) {
    var future = new Date();
    future.setDate(future.getDate() + 14);
    document.cookie = COOKIE_KEY + '=' + escape(id) + '; expires=' + escape(future.toGMTString());
    return id;
}

var hasLocalStorage = (function () {
    try {
        return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
        return false;
    }
})();

function parseModernizr() {
    if (!window.Modernizr) return null;
    var output = ['', ''];
    for (var key in window.Modernizr) {
        if (Modernizr.hasOwnProperty(key) && typeof(Modernizr[key]) !== 'function' && key.slice(0, 1) !== '_') {
            if (Modernizr[key]) {
                output[0] += ',' + key;
            } else {
                output[1] += ',' + key;
            }
        }
    }
    output[0] = output[0].slice(1);
    output[1] = output[1].slice(1);
    return output;
}

function isValid(msg) {
    return msg !== 'Script Error.';
}

var queue = [];
var id = getId();

function createMsg(errorArray) {
    var sendModernizr = false;
    if (id === null) {
        id = setId(guid());
        sendModernizr = true;
    }
    var msg = [id, errorArray];
    if (sendModernizr && typeof window.Modernizr !== 'undefined' && window.Modernizr !== null) {
        msg.push(parseModernizr(window.Modernizr));
    }
    return JSON.stringify(msg);
}

var timer = 0;
var errorCount = 0;
var MAX_ERRORS = 40;

function error(msg, url, line) {
    if (!isValid(msg)) return;
    if (errorCount > MAX_ERRORS) return;
    if (hasLocalStorage) {
        queue.push([msg, url, line]);
        localStorage.setItem(COOKIE_KEY, JSON.stringify(queue));
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

var URL = 'http://192.168.100.57:3000/';
var PARAM = 'q';
var body;
var TIMEOUT = 5000;

function get(json) {
    var image = new Image();
    image.src = URL + '?' + PARAM + '=' + encodeURI(json);
}

var IFRAME_ID = 'err-send__';
var iframeCount = 0;

function post(json) {
    body = body || document.getElementsByTagName('body')[0];
    var iframe = document.createElement('iframe');
    iframe.id = iframe.name = IFRAME_ID + iframeCount;
    iframe.style.display = 'none';
    iframe.src = 'javascript:';
    var html = '<form method="post" action="' + URL + '">' +
        '<textarea name="r">' + location.href + '</textarea>' +
        '<textarea name="' + PARAM + '">' + json + '</textarea>' +
        '</form>' +
        '<script>onload=function(){setTimeout(function(){document.forms[0].submit()},10)}\x3c/script>';
    body.appendChild(iframe);
    var iDoc = iframe.contentWindow || iframe.contentDocument;
    iDoc = iDoc.document || iDoc;
    iDoc = iDoc || document.frames[IFRAME_ID + iframeCount].document;
    iDoc.open();
    iDoc.write(html);
    iDoc.close()
    iframeCount++;
    setTimeout(function () {
        iframe.parent.removeChild(iframe);
    }, TIMEOUT);
}

function send(json) {
    if (json.length < 1900) {
        return get(json);
    }
    post(json);
}

function load() {
    if (!hasLocalStorage) return;
    var queue = localStorage.getItem(COOKIE_KEY);
    localStorage.removeItem(COOKIE_KEY);
    console.log(queue);
    if (queue) {
        return send(createMsg(JSON.parse(queue)));
    }
}

if (domready === undefined) {
    function domready(fn) {
        window.onload = fn;
    }
}

domready(load);

window.onerror = error;

