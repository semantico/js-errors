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
    preserveLicenseComments: false

})
