var repository_ = require('../../src/userRepository');

var repo;
describe('User Repository', function(){

    beforeEach(function(){
        repository = new repository_.instance();
    });
    
    it('sets the id on the passed user', function(done){
        var newUser = repository.add({'name':'james'});
        
        newUser.id.should.equal('1');
        done();
    });

    it('can retrieve a stored a user', function(done){
        var newUser = repository.add({'name':'james'});
        newUser.id.should.equal('1');

        var insertedUser = repository.findById('1');

        insertedUser.id.should.equal('1');
        done();
    });

    it('storing a user increases the amount of users', function(done){
        var previousAmount = repository.findAll().length;

        var newUser = repository.add({'name':'james'});
        
        var currentAmount = repository.findAll().length;
        currentAmount.should.equal(previousAmount + 1);
        done();
    });

    it('different ids are assigned for each call', function(done){
        var newUser9 = repository.add({'name':'james'});
        var newUser10 = repository.add({'name':'james'});

        newUser9.id.should.equal('1');
        newUser10.id.should.equal('2');
        done();
    });

});
