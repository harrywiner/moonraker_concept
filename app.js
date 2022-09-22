const fs = require('fs')

const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const classifiers = require('./src/classifiers')

/**
 * A simple server to serve Chart.js charts 
 * Also to brush up on my node skills
 */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "charts/alldata.html"))
})

app.use('/classifiers', classifiers)

app.get('/devices', (req, res) => {
    let rawdata = fs.readFileSync('json/devices.json');
    res.send(JSON.parse(rawdata));
})

app.get('/')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})