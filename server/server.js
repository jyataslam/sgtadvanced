
//load the express library into the file
const express = require('express');

//create a server 
const server = express();

//.use is middleware
server.use(express.static(__dirname + '/html'));


var insults = [
    'your father smelt of elderberries',
    'you program on an altaire',
    'I bet you still use var',
    'one line functions are for chumps',
    'david smells',
    'i love my chair'
];

//return a random insult
server.get('/insult', (request, response)=>{
    response.send(insults[Math.floor(Math.random()*insults.length)]);
})

//tell server what function to listen for. Params (the path to listen for, the callback fcn to call once that path has been received)
server.get('/', function(request, response){
    //an object representing all the data coming from the client to the server
    //an object representing all of the data going from the server to the client
    response.send('Hello, World.');
})

server.get('/time', (request, response)=>{
    var now = new Date();
    response.send(now.toLocaleDateString());
})

//server you have to listen for a connection. where you wanna set up(port) and what function to call when it's done (callback)
server.listen(3001, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived');
});