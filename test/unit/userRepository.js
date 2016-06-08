var repository = require('../../src/userRepository');
require('should'); 
var chai = require('chai');

describe('User Repository', function(){

    it('retrieves users', function(done){
        (repository.findById('8').id).should.equal('8');
        done();
    });

});
