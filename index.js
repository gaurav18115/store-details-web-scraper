const express = require('express');
const parseUrl = require('body-parser');

const getIndiaMartResults = require('./utils/indiamart');

const port = process.env.PORT || 4000;
const encodeUrl = parseUrl.urlencoded({ extended: false })

const app = express()
 
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

app.post('/', encodeUrl, (req, res) => {
  console.log('Form request:', req.body)
  res.sendStatus(200)
})



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})


