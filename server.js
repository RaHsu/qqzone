var fs = require('fs');
var express = require('express');
var process = require('child_process');
var app = express();

function trim(string){
	return string.replace(/\s+/g,"");
}


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('./'));

app.post('/qq', function (req, res) {
	console.log(req.query);
	let qq = req.query.qq;
	let cookie = req.query.cookie;

	fs.writeFile('cookie.txt',cookie, function(err){
    if (err) {
       return console.error(err);
      }
      console.log('cookie写入成功');
	   	process.exec('node index '+qq,function (error, stdout, stderr) {
	        if (error !== null) {
	          console.log('exec error: ' + error);
	        }else{
	        	console.log('正在执行index');
	        	console.log(stdout);
	        }
		});
    })


	

	res.send({status:'success'});


});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});