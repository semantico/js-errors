({

    baseUrl: './public/javascripts',
    mainConfigFile: './public/javascripts/errors',
    paths: {
        domready: '../components/requirejs-domready/domReady'
    },
    out: './public/javascripts/errors.min.js',
    optimize: 'uglify2'

})
