var values = [ 
        {'id':'8', 'name':'john'},
        {'id':'7', 'name':'jane'},
    ];

var newId = function(){
    return '9';
};

var inMemoryDB = {
    findAll: function(){
        return values;
    },
    findById: function(id){
        var matching = values.filter(function(current){
            return current.id === id;
        });
        return matching[0];
    },
    add: function(user){
        user = this.tag(user);
        values.push(user);
        return user;
    },
    tag: function(user){
        user.id = newId();
        return user;
    },
};

module.exports = inMemoryDB;
