
//load the express and sql library into the file
const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');

//use what's inside mysqlcreds when its needed
const db = mysql.createConnection(mysqlcredentials);

//create a server 
const server = express();

//if you get a request for that path and it's available in the html folder, serve it. (__dirname means wherever your file is)
server.use(express.static(__dirname + '/html'));

//make endpoint to get all the files (pathway, callback fcn)
server.get('/api/grades', (req, res)=>{
    res.send(`{
        "success": true,
        "data": [{
            "id": 1,
            "name": "Jason Yata",
            "course": "Math",
            "grade": 80
        }, {
            "id": 2,
            "name": "Ken Li",
            "course": "PokemonGo",
            "grade": 100
        }, {
            "id": 3,
            "name": "Quan Le",
            "course": "Kanye",
            "grade": 10
        }, {
            "id": 4,
            "name": "Andrew Ly",
            "course": "Photography",
            "grade": 50
        }]
    }`)
})

//server you have to listen for a connection. where you wanna set up(port) and what function to call when it's done (callback)
server.listen(3001, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived');
});