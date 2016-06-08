var express = require('express');

var app = express();

var db = [ 
    {'id':'8', 'name':'john'},
    {'id':'7', 'name':'jane'},
]; 

app.get('/user/:userId', function(req, res) {

    var findById = function(id){
        var matching = db.filter(function(current){
            return current.id === id;
        });
        if(matching.length > 0){
            return matching[0];
        } else {
            return null;
        }
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
        return db;
    };

    var users = findAll();
    return res.send(users);
});


app.listen(3000);
