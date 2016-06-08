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
    xit('gets the title', function(done){
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

var userRepository = require("../../src/userRepository");
var server = require("../../src/server");
describe('REST API', function(){
    before(function(){
        var start = function(server){
            server.start(userRepository);
        };
        start(server);
    });
    after(function(){
        server.stop();
    });
    describe('gets the users', function(){
        it('gets a existing one', function(done){
            request
            .get("/user/8")
            .use(prefixREST)
            .end(function(err,res){
                should.not.exist(err);
                res.status.should.equal(200);
                var expectedUser = {"id":"8", "name":"john"};
                equalObjects(JSON.parse(res.text), expectedUser).should.equal(true);
                done();
            });
        });
        it('gets another existing one', function(done){
            request
            .get("/user/7")
            .use(prefixREST)
            .end(function(err,res){
                should.not.exist(err);
                res.status.should.equal(200);
                var expectedUser = {"id":"7", "name":"jane"};
                equalObjects(JSON.parse(res.text), expectedUser).should.equal(true);
                done();
            });
        });

        it('gets all existing ones', function(done){
            request
            .get("/users")
            .use(prefixREST)
            .end(function(err,res){
                should.not.exist(err);
                res.status.should.equal(200);
                var expectedUsers = [ {"id":"8", "name":"john"} ,
                                      {"id":"7", "name":"jane"},
                ];
                response = JSON.parse(res.text);
                expectedUsers.forEach(function(current, index){
                    equalObjects(response[index], expectedUsers[index]).should.equal(true);
                });
                done();
            });
        });
        it('gets the non-existing one', function(done){
            request
            .get("/user/NONEXISTING")
            .use(prefixREST)
            .end(function(err,res){
                should.exist(err);
                res.status.should.equal(404);
                var expectedError  = {"message":"not found"};
                equalObjects(JSON.parse(res.text), expectedError).should.equal(true);
                done();
            });
        });

    });
});

//http://stackoverflow.com/a/2736070
var equalObjects = function (obj1, obj2){
    for (var p in obj1) {
        if(typeof(obj1[p]) !== typeof(obj2[p])) return false;
        if((obj1[p]===null) !== (obj2[p]===null)) return false;
        switch (typeof(obj1[p])) {
            case 'undefined':
                if (typeof(obj2[p]) != 'undefined') return false;
                break;
            case 'object':
                if(obj1[p]!==null && obj2[p]!==null && (obj1[p].constructor.toString() !== obj2[p].constructor.toString() || !obj1[p].equals(obj2[p]))) return false;
                break;
            case 'function':
                if (p != 'equals' && obj1[p].toString() != obj2[p].toString()) return false;
                break;
            default:
                if (obj1[p] !== obj2[p]) return false;
        }
    }
    return true;

};
