var express = require('express');

var app = express();

var db = [ {'id':'8', 'name':'john'} ]; 

app.get('/user/:userId', function(req, res) {
	db.forEach(function(current, index){
        if(current.id === req.params.userId){
            res.send(current);
        } else {
            res.status(404).send({"message": "not found"});
        }
	});
})

app.listen(3000);
