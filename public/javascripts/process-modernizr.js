define(function () {

    function processModernizr(mod) {
        if (!mod) return null;
        var output = ['', ''];
        for (var key in mod) {
            if (mod.hasOwnProperty(key) && typeof(mod[key]) !== 'function' && key.charAt(0) !== '_') {
                if (mod[key]) {
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

    return processModernizr;

});
