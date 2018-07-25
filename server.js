var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('./'));

app.post('/qq', function (req, res) {
	console.log(req.body);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});