//get and store data from client and send sorted data to the client

'use strict';
var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var jsonfile = require('jsonfile');

var file = 'leaderboard.json';
var server = express();
var user_Scores = [];

jsonfile.readFile(file, function(err, obj) {
    if(obj)
        user_Scores = obj;

    console.log("database record: "+user_Scores);
});

var getUserNameAndScore = function(name,score){
    return {
        userName:name,
        userScore:score
    };
};

//sort by key
var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
};

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080));
io.on('connection', function(socketHandle) {
	console.log('client connected');
    //on connection send user a new userName
    var userName =  Math.random().toString(36).substr(2, 8);
    socketHandle.emit('newName', {
        'userName':userName
    });
    //on user custum name
    socketHandle.on('changeName',function(msg){
        userName = msg.custumName;
        console.log("name changed");
    });
    //when lost, store userName and store to local file
    socketHandle.on('lost',function(msg){
        console.log("sending score to server:"+msg);
        user_Scores.push(getUserNameAndScore(userName,msg.score));
        if(user_Scores)
            user_Scores.sort(sort_by('userScore', true, false));
        jsonfile.writeFile(file, user_Scores, function (err) {
            if(err)
                console.error(err)
        })
    });

    //after connection update leaderboard based on local file
    io.emit('sortedBoard', user_Scores);

});
