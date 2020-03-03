// empty object to act as endpoint for all routes
const projectData = [];

// express setup for server & routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')

// start up an instance of app
const app = express();

// config express to use body-parser as middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// сors for cross origin allowance
app.use(cors());

// the main project folder
app.use(express.static('website'));

// server 
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log(`server is running on localhost:${port}`);
};

// the callback function of the GET takes two parameters: req and res
// request (req) is the data provided by the GET request
// response (res) is the data returned to the GET request

// GET route to retrieve projectData
app.get('/get', (req, res) => {
  res.send(projectData);
});

// POST route to store date, temp & feeling in projectData
app.post('/post', (req, res) => {
  console.log('req.body', req.body);
  projectData.push(req.body)
  console.log({ projectData });
  res.status(200).send(projectData);

});
