var values = [ 
        {'id':'8', 'name':'john'},
        {'id':'7', 'name':'jane'},
    ];



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
    };

module.exports = inMemoryDB;
