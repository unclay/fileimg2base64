var express = require('express')
var path = require('path')

var app = new express()

app.use('/', express.static('./src/'))

app.listen(8000, function () {
  console.log('listen to 8000')
})