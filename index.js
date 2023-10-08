const express = require('express');
const path = require('path')
const userData = require('./user.json')
const app = express();
const router = express.Router();



/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile('home.html',{
    root: path.join(__dirname)
  });
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.json(userData)
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  if(req.query.username !== userData.username){
    res.send({
      status: false,
      message: "User Name is invalid"
    });
  }
  if(req.query.password !== userData.password){
    res.send({
      status: false,
      message: "Password is invalid"
    })
  }
  if(req.query.username === userData.username && req.query.password === userData.password ){
    res.send({
      status: true,
      message: "User Is valid"
    })
  }
  
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let message = `<b>${req.params.username} successfully logout. </b>` 
  res.send(message);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));