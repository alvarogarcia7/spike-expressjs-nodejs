var repository = function(){
    var values = [];

    var currentId = 1;

    var newId = function(){
        var id = currentId.toFixed(0);
        currentId++;
        return id;
    };

    return {
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
};



module.exports = {instance: repository};
