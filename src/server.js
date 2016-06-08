var express = require('express');

var app = express();

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



var appFactory = function(userRepository){
    if(!userRepository){
        throw new Error("Cannot start server");
    }
    app.userSpace = {};
    app.userSpace.DB = {};
    app.userSpace.DB = userRepository;
    app.listen(3000);
}

var appDestructor = function(){

    setTimeout(function() {
            console.log('Blah blah blah blah extra-blah');
            app.close();
    }, 100);
}

module.exports = {start: appFactory, stop: appDestructor};
