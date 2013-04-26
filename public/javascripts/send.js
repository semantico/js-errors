define(function () {

    var PARAM = 'q';
    var REFERER_PARAM = 'r';
    var TIMEOUT = 5000;
    var IFRAME_ID = 'err-send__';

    function warn() {
        if (window.console) {
            console.log('No error url');
        }
    }

    var url;

    function getUrl() {
        var s = 'script';
        var e = 'data-errorurl';
        if (document.querySelectorAll) {
            return document.querySelector(s + '[' + e + ']').getAttribute(e);
        }
        var scripts = document.getElementsByTagName(s);
        for (var i = 0, l = scripts.length; i < l; i++) {
            var data = scripts[i].getAttribute(e);
            if (data) {
                return data;
            }
        }
    }

    function get(json) {
        url = url || getUrl();
        if (!url) {
            return warn();
        }
        var image = new Image();
        image.src = url + '?' + PARAM + '=' + encodeURI(json);
    }

    var body;
    var iframeCount = 0;

    function post(json) {
        url = url || getUrl();
        if (!url) {
            return warn();
        }
        body = body || document.getElementsByTagName('body')[0];
        var iframe = document.createElement('iframe');
        iframe.id = iframe.name = IFRAME_ID + iframeCount;
        iframe.style.display = 'none';
        iframe.src = 'javascript:';
        var html = '<form method="post" action="' + url + '">' +
            '<textarea name="' + REFERER_PARAM + '">' + location.href + '</textarea>' +
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

    return send;

});
