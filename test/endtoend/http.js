var request = require('superagent'); 
var superagent = require('superagent'); 
//var assert = require('chai').assert;
var should = require('should'); 
var assert = require('assert');

describe('canary', function() {
    it('truthy test', function () {
      assert.equal(true, true);
  });
});


describe('REST API', function(){
    var url = 'http://lavanguardia.es:80';
    var server = request('http://lavanguardia.es:80');
    it('gets the names', function(done){
		superagent
		.get(url)
		.end(function(err,res){
            should.not.exist(err);

		  res.status.should.equal(200);
          console.log(res.body);
		  done();
		});
    });
});
