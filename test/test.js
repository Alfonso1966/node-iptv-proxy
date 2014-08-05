global.__base = __dirname + '/../';

var assert = require("assert");
var util = require("util");
var IptvProvider = require(__base + "providers/iptv_provider");
var UrlProvider = require(__base + "providers/_provider_url");

describe('DummyProvider', function() {
        function DummyProvider(opts) {
                DummyProvider.super_.call(this, opts);
        };

        util.inherits(DummyProvider, IptvProvider);

        DummyProvider.prototype._make_stream = function(ok) { ok() };
        DummyProvider.prototype._end_stream = function() { };

        describe('#stop()', function() {
                it('should fail if .start has not occured', function() {
                        assert.throws((new DummyProvider()).stop, Error);
                });
        });

        describe('#start()', function() {
                var dummy = new DummyProvider();

                it('should trigger err_cb when .chan has not been called', function(done) {
                        dummy.start("fakeid", function () { throw "FailTest" }, function () { done() });
                });
        });
});

describe('UrlProvider', function() {
        describe('#start()', function() {
                it('should return a stream somehow', function(done) {
                        (new UrlProvider("http://www.google.fr")).start("fakeid", function(stream) {
                                if (!stream)
                                        throw "InvalidStream";
                                if (!stream.headers)
                                        throw "InvalidStream2";

                                done();
                        }, function () {
                                throw "FailCbCalled";
                        });
                });
        });

});


describe('VlcProvider', function() {
        describe('#_get_url()', function() {
                it('should parse a VLC playlist properly', function(done) {
                        throw "NotImplemented";
                });
        });

        describe('#_release()', function() {
                it('should send a stop command to VLC', function(done) {
                        throw "NotImplemented";
                });
        });
});
