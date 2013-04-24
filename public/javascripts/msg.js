define(['stringify', 'id', 'process-modernizr'], function (stringify, id, processModernizr) {

    if (typeof window.JSON === "undefined" && window.JSON === null) {
        window.JSON = {};
        window.JSON.stringify = stringify;
    }

    function create(errors) {
        var currId = id.get();
        var sendModernizr = false;
        if (currId === null) {
            currId = id.set();
            sendModernizr = true;
        }
        var out = [currId, errors];
        if (sendModernizr && typeof window.Modernizr !== 'undefined' && window.Modernizr !== null) {
            out.push(processModernizr(window.Modernizr));
            return out;
        } else {
            return out;
        }
    }

    function json(errors) {
        return JSON.stringify(create(errors));
    }


    return {
        create: create,
        json: json
    };

});
