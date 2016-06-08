var express = require('express');

var app = express();

var inMemoryDB = {
    values: [ 
        {'id':'8', 'name':'john'},
        {'id':'7', 'name':'jane'},
    ],
    findAll: function(){
        return this.values;
    },
    findById: function(id){
        var matching = this.values.filter(function(current){
            return current.id === id;
        });
        if(matching.length > 0){
            return matching[0];
        } else {
            return null;
        }
    },

};

app.use(function(req, res, next) {
	req.users = app.userSpace.DB;
    next();
});

app.get('/user/:userId', function(req, res) {

    var user = req.users.findById(req.params.userId);
    if(user){
        return res.send(user);
    } else {
        return res.status(404).send({"message": "not found"});
    }
});

app.get('/users', function(req, res) {

    var users = req.users.findAll();
    return res.send(users);
});



appFactory = function(userRepository){
    app.userSpace = {};
    app.userSpace.DB = {};
    app.userSpace.DB = userRepository || inMemoryDB;
    app.listen(3000);
}

var Users = appFactory
module.exports = {start: appFactory};
