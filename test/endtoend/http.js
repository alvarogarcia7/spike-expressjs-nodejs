var request = require('superagent'); 
var prefix = require('superagent-prefix')('http://lavanguardia.es:80');
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
    it('gets the names', function(done){
        request
        .get("/")
        .use(prefix)
        .end(function(err,res){
            should.not.exist(err);
            res.status.should.equal(200);
            var doc = parse5.parse(res.text);

            var node = doc.childNodes[1].childNodes[0].childNodes[7].childNodes[0];
            var title = node.value;

            //console.log(title);

            title.should.equal("LaVanguardia.com - Noticias, actualidad y última hora en Catalunya, España y el mundo");

            done();
        });
    });
});
