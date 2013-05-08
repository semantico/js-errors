var components = '../components/';

require.config({
    baseUrl: '/javascripts',
    paths: {
        domready: components + 'requirejs-domready/domReady',
        jasmine: components + 'jasmine/lib/jasmine-core/jasmine',
        'jasmine-html': components + 'jasmine/lib/jasmine-core/jasmine-html'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['domready', 'jasmine-html'], function (domready, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 250;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = ['stringify', 'id', 'process-modernizr', 'msg'];
    for (var i = 0; i < specs.length; i++) {
        specs[i] = 'tests/spec/' + specs[i];
    }

    require(specs, function () {
        domready(function () {
            jasmineEnv.execute();
        });
    });

});
