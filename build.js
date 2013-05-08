({

    baseUrl: './public/javascripts',
    include: 'almond',
    name: 'errors',
    mainConfigFile: './public/javascripts/load.js',
    paths: {
        almond: '../../node_modules/almond/almond',
        domready: '../components/requirejs-domready/domReady',
        requireLib: '../../node_modules/requirejs/require'
    },
    out: './public/javascripts/errors.min.js',
    optimize: 'uglify2',
    wrap: true,
    preserveLicenseComments: false,
    onBuildRead: function (moduleName, path, contents) {
        var toReplace = {
            ERROR_URL: process.env.ERROR_URL || 'http://localhost:3000/',
            PARAM: process.env.PARAM || 'q',
            REFERER_PARAM: process.env.REFERER_PARAM || 'r'
        };
        for (var key in toReplace) {
            var r = new RegExp(key + "[\ ]*=[\ ]*'(.*)'\;");
            contents = contents.replace(r, function (match, submatch) {
                return match.replace(submatch, toReplace[key]);
            });
        }
        return contents;
    },

})
