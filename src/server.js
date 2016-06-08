var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//app.use(bodyParser);

var db = [ {'id':'8', 'name':'john'} ]; 

app.get('/user/:userId', function(req, res) {
  //req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
  //  if (e) return next(e)
  //  res.send(results)
  //})

	db.forEach(function(current, index){
        if(current.id === req.params.userId){
            res.send(current);
        } else {
            res.status(404).send({"message": "not found"});
        }
	});
})

app.listen(3000);
