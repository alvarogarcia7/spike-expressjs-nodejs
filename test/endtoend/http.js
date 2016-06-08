var request = require('superagent'); 
var superagent = require('superagent'); 
//var assert = require('chai').assert;
var should = require('should'); 
var assert = require('assert');
var parse5 = require('parse5');

describe('canary', function() {
    it('truthy test', function () {
      assert.equal(true, true);
  });
});

var propertiesOf = function(obj){
    var properties = [];
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            properties.push(name);	
        }
    }
    return properties;
}

describe('REST API', function(){
    var url = 'http://lavanguardia.es:80';
    var server = request('http://lavanguardia.es:80');
    it('gets the names', function(done){
        superagent
        .get(url)
        .end(function(err,res){
            should.not.exist(err);
            res.status.should.equal(200);
            var doc = parse5.parse(res.text);

            var node = doc.childNodes[1].childNodes[0].childNodes[7].childNodes[0];
            var title = node.value;

            console.log(title);

            done();
        });
    });
});
