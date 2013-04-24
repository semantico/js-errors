define(function (){

    var TO_STRING = Object.prototype.toString;

    function type(obj) {
        var str = TO_STRING.call(obj);
        return str.slice(8, str.length - 1);
    }

    function stringify(array) {
        var out = [];
        if (array.length === 0) return '';
        for (var i = 0, l = array.length; i < l; i++) {
            switch (type(array[i])) {
                case 'Array':
                    out.push(stringify(array[i]));
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

    return stringify;

});
