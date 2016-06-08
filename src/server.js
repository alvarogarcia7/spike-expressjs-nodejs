var express = require('express');

var app = express();

var db = [ 
    {'id':'8', 'name':'john'},
    {'id':'7', 'name':'jane'},
]; 

var DB = {
    db: db,
    findAll: function(){
        return db;
    },
    findById: function(id){
        var matching = db.filter(function(current){
            return current.id === id;
        });
        if(matching.length > 0){
            return matching[0];
        } else {
            return null;
        }
    },

};

app.get('/user/:userId', function(req, res) {

    var findById = function(id){
        return DB.findById(id);
   };

    var user = findById(req.params.userId);
    if(user){
        return res.send(user);
    } else {
        return res.status(404).send({"message": "not found"});
    }
});

app.get('/users', function(req, res) {

    var findAll = function(){
        return DB.findAll();
    };

    var users = findAll();
    return res.send(users);
});


app.listen(3000);
