var request = require('superagent'); 
var prefixLV = require('superagent-prefix')('http://lavanguardia.es:80');
var prefixREST = require('superagent-prefix')('http://localhost:3000');
var should = require('should'); 
var parse5 = require('parse5');

describe('canary', function() {
    it('truthy test', function () {
      (true).should.equal(true);
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

var parseLaVanguardiaTitle = function(html){
    var parseHtml = function(text){
        return parse5.parse(text);
    }

    var doc = parseHtml(html);

    var node = doc.childNodes[1].childNodes[0].childNodes[7].childNodes[0];
    var title = node.value;
    return title
}

describe('exercising the test framework', function(){
    it('gets the title', function(done){
        request
        .get("/")
        .use(prefixLV)
        .end(function(err,res){
            should.not.exist(err);
            res.status.should.equal(200);

            var title = parseLaVanguardiaTitle(res.text);
            title.should.equal("LaVanguardia.com - Noticias, actualidad y última hora en Catalunya, España y el mundo");

            done();
        });
    });
});

describe('REST API', function(){
    it('gets the name', function(done){
        request
        .get("/user/8")
        .use(prefixREST)
        .end(function(err,res){
            should.not.exist(err);
            res.status.should.equal(200);
            var expectedUser = {"id":"8", "name":"john"};
            (res.text).should.equal(expectedUser);
            done();
        });
    });
});
