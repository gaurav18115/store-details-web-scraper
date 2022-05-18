const express = require('express');
const path = require("path");

// const parseUrl = require('body-parser');

const getIndiaMartResults = require('./utils/indiamart');

const port = process.env.PORT || 4000;
const app = express()

// const encodeUrl = parseUrl.urlencoded({ extended: false })
const static_path = path.join(__dirname, "public");

app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/getCompanyDetails', (req, res) => {
    
    let ss = req.query.ss;
    let city = req.query.city; 
    
    getIndiaMartResults(ss, city)
    .then(data => {
        res.send({
            data: data
        })
    })
    .catch(error => {
        res.send({
            error: error
        })
    });
})

// app.post('/', (req, res) => {
//   console.log('Form request:', req.body)
//   res.sendStatus(200)
// })

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})


