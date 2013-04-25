define(['globals'], function (globals) {

    function get(json) {
        var image = new Image();
        image.src = globals.URL + '?' + globals.QUERY_PARAM + '=' + encodeURI(json);
    }

    var body;
    var iframeCount = 0;

    function post(json) {
        body = body || document.getElementsByTagName('body')[0];
        var iframe = document.createElement('iframe');
        iframe.id = iframe.name = globals.IFRAME_ID + iframeCount;
        iframe.style.display = 'none';
        iframe.src = 'javascript:';
        var html = '<form method="post" action="' + URL + '">' +
            '<textarea name="' + globals.REFERER_PARAM + '">' + location.href + '</textarea>' +
            '<textarea name="' + globals.QUERY_PARAM + '">' + json + '</textarea>' +
            '</form>' +
            '<script>onload=function(){setTimeout(function(){document.forms[0].submit()},10)}\x3c/script>';
        body.appendChild(iframe);
        var iDoc = iframe.contentWindow || iframe.contentDocument;
        iDoc = iDoc.document || iDoc;
        iDoc = iDoc || document.frames[globals.IFRAME_ID + iframeCount].document;
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
