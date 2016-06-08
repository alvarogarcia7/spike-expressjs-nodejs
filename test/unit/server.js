
var request = require('superagent'); 
var prefix = require('superagent-prefix')('http://localhost:3000');
var should = require('should'); 
var parse5 = require('parse5');
var chai = require('chai');


var server = require("../../src/server");
describe('Server', function(){
    it('needs a user repository', function(done){
        chai.expect(function(){
            server.start()
        }).to.throw('Cannot start server');
        done();
    });
});
