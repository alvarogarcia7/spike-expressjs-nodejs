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

});
