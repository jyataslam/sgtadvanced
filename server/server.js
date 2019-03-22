
//load the express and sql library into the file
const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js'); //load the credentials from a local file for mysql

//using the credentials that we laoded, we are establishing the connection to mysqlcredentials
const db = mysql.createConnection(mysqlcredentials);

//create a server 
const server = express();

//if you get a request for that path and it's available in the html folder, serve it. (__dirname means wherever your file is)
server.use(express.static(__dirname + '/html'));
server.use(express.urlencoded({ extended: false })); //have express pull body data that is urlencoded and place it into an object called body

//when using AXIOS use this instead...
//server.get(espress.json());

//make endpoint to get all the files (pathway, callback)
//when a connection has been made at port 3001 at line14's url, call this function
server.get('/api/grades', (req, res)=>{
    //instantiate a direct connection to the database and call the callback function when connection is made
    db.connect(()=>{
        //create a query for our desired operation
        const query = 'SELECT `id`, CONCAT(`givenname`," ", `surname`) AS `name`, `course`, `grade` FROM `grades`';
        //send the query to the database, and call the given callback function once the data is retrieved or an error happens
        db.query(query, (error, data)=>{
            //if error is null, no error occurred
            //create an output object to be sent back to the client
            const output = {
                success: false,
            }
            //if error is null, send the data
            if(!error){
                //notify the client we were successful
                output.success = true;
                //attach the data from the database to the output object
                output.data = data;
            } else {
                //an error occurred, attach that error onto the output so we can see what happened
                output.error = error;
            }
            //send the data back to the client
            res.send(output);
        })
    })
})

// INSERT INTO `grades` SET `surname`="Yata", `givenname`="Jason", `course`="math", `grade`=88, `added`=NOW()
//or use this to insert multiple values...
// INSERT INTO `grades` (`surname`, `givenname`, `course`, `grade`) VALUES ("Yata","Jason","math",88)

server.post('/api/grades', (req, res)=>{
    //check the body object and see if any data was not sent
    if (req.body.name === undefined || req.body.course === undefined || req.body.grade === undefined){
        //respond to the client with an appropriate error message
        res.send({
            success: false,
            error: 'invalid name, course, or grade'
        });
        return
    }
    //
    db.connect(()=>{
        const name = req.body.name.split(" ");
        const query = 'INSERT INTO `grades` SET `surname`="'+name.slice(1).join(' ')+'", `givenname`="'+name[0]+'", `course`="'+req.body.course+'", `grade`='+req.body.grade+', `added`=NOW()';
        db.query(query, (error, results)=>{
            if(!error){
                res.send({
                    success: true,
                    new_id: results.insertId
                })
            } else {
                res.send({
                    success: false,
                    error
                })
            }
        })
    })

})

//server you have to listen for a connection. where you wanna set up(port) and what function to call when it's done (callback)
server.listen(3001, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived');
});


//line 26 ---> line14 ---> line18