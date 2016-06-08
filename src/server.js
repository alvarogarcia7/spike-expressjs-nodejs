var express = require('express');

var app = express();

var db = [ {'id':'8', 'name':'john'} ]; 

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

app.listen(3000);
