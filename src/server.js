var express = require('express');

var app = express();

var DB = {
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

app.get('/user/:userId', function(req, res) {

    var user = DB.findById(req.params.userId);
    if(user){
        return res.send(user);
    } else {
        return res.status(404).send({"message": "not found"});
    }
});

app.get('/users', function(req, res) {

    var users = DB.findAll();
    return res.send(users);
});


app.listen(3000);
