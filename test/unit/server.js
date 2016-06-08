
var request = require('superagent'); 
var prefix = require('superagent-prefix')('http://localhost:3000');
var should = require('should'); 
var parse5 = require('parse5');
var chai = require('chai');

var inMemoryDB = {
    values: [ 
        {'id':'8', 'name':'john'},
        {'id':'7', 'name':'jane'},
    ],
    findAll: function(){
        return this.values;
    },
    findById: function(id){
        var matching = this.values.filter(function(current){
            return current.id === id;
        });
        if(matching.length > 0){
            return matching[0];
        } else {
            return null;
        }
    },

};

var server = require("../../src/server");
describe('Server', function(){
    it('needs a user repository', function(done){
        chai.expect(server.start).to.throw('Cannot start server');
        server.start();
    });
});
