var repository = require('../../src/userRepository');

describe('User Repository', function(){

    it('retrieves users', function(done){
        (repository.findById('8').id).should.equal('8');
        done();
    });

    it('retrieves all users', function(done){
        (repository.findAll().length).should.equal(2);
        done();
    });

    it('stores a user', function(done){
        var previousAmount = repository.findAll().length;

        var newUser = repository.add({'name':'james'});
        
        var currentAmount = repository.findAll().length;
        currentAmount.should.equal(previousAmount + 1);
        newUser.id.should.equal('9');
        done();
    });

});
