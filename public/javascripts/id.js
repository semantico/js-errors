define(['globals'], function (globals) {

    var FETCH_COOKIE_RE = new RegExp('(?:(?:^|.*;\\s*)' + globals.COOKIE_KEY + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*)|.*");

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
    }

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function getId() {
        return document.cookie.replace(FETCH_COOKIE_RE, "$1") || null;
    }

    function setId() {
        var id = guid();
        var future = new Date();
        future.setDate(future.getDate() + 14);
        document.cookie = globals.COOKIE_KEY + '=' + escape(id) + '; expires=' + escape(future.toGMTString()) + '; path=' + escape('/');
        return id;
    }

    return {
        get: getId,
        set: setId
    };

});
