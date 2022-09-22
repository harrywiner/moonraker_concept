const fs = require('fs')
var parse = require('csv-parse').parse;

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
app.get('/iris', (req, res) => {
  res.sendFile(path.join(__dirname, "charts/iris.html"))
})

app.use('/classifiers', classifiers)

app.get('/devices', (req, res) => {
    let rawdata = fs.readFileSync('json/devices.json');
    res.send(JSON.parse(rawdata));
})
app.get('/irisdata', (req, res) => {
    var rawdata = fs.readFileSync('json/iris.csv');
    parse(rawdata, {
        comment: '#'
      }, function(err, records){
        console.error(err)
        res.send(records.slice(1).filter(e => e[4] == "Setosa").map(e => e.slice(0,4).map(i => parseFloat(i))))
      });
})

app.get('/')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})