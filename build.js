({

    baseUrl: './public/javascripts',
    name: '../../node_modules/almond/almond',
    include: 'errors',
    paths: {
        domready: '../components/requirejs-domready/domReady'
    },
    out: './public/javascripts/errors.min.js',
    optimize: 'uglify2'

})
