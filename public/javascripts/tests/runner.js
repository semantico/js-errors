require.config({
    baseUrl: 'javascripts',
    paths: {
        domready: 'components/domready/ready',
        mocha: 'components/mocha/mocha',
        chai: 'components/chai/chai'
    },
    shim: {
        mocha: {
            exports: 'mocha'
        }
    }
});

require(['mocha', 'chai'], function (mocha, chai) {

    window.assert = chai.assert;
    window.should = chai.should();
    window.expect = chai.expect;

    mocha.setup('bdd');

    var specs = ['cookies'].reduce(function (arr, val) {
        return arr.concat('tests/spec/' + val);
    }, []);

    require(specs, function () {
        mocha.run();
    });

});

