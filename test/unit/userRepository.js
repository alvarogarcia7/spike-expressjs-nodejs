var repository_ = require('../../src/userRepository');

var repo;
describe('User Repository', function(){

    beforeEach(function(){
        repository = new repository_.instance();
    });

    it('stores a user', function(done){
        var previousAmount = repository.findAll().length;

        var newUser = repository.add({'name':'james'});
        
        var currentAmount = repository.findAll().length;
        var insertedUser = repository.findById('1');
        currentAmount.should.equal(previousAmount + 1);
        newUser.id.should.equal('1');
        insertedUser.id.should.equal('1');
        done();
    });

    it('stores more than a user', function(done){
        var previousAmount = repository.findAll().length;

        var newUser9 = repository.add({'name':'james'});
        var newUser10 = repository.add({'name':'johh'});
        
        var currentAmount = repository.findAll().length;
        currentAmount.should.equal(previousAmount + 2);
        newUser9.id.should.equal('1');
        newUser10.id.should.equal('2');
        done();
    });

});
