define(function () {

    var ERROR_URL = 'http://localhost:3000/';
    var PARAM = 'q';
    var REFERER_PARAM = 'r';
    var TIMEOUT = 5000;
    var IFRAME_ID = 'err-send__';

    function get(json) {
        var image = new Image();
        image.src = ERROR_URL + '?' + PARAM + '=' + encodeURI(json);
    }

    var body;
    var iframeCount = 0;

    function post(json) {
        body = body || document.getElementsByTagName('body')[0];
        var iframe = document.createElement('iframe');
        iframe.id = iframe.name = IFRAME_ID + iframeCount;
        iframe.style.display = 'none';
        iframe.src = 'javascript:';
        var html = '<form method="post" action="' + ERROR_URL + '">' +
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
