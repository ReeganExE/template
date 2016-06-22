require("dot").process({
	global: "_page.render"
	, destination: __dirname + "/render/"
	, path: (__dirname + "/../templates")
});

var express = require('express')
, http = require('http')
, app = express()
, render = require('./render')
, multer = require('multer')
, csvToJson = require('./converter')
;

var upload = multer({ dest: './tmp/'});

// app.get('/', function(req, res){
//   res.send(render.dashboard({text:"Good morning!"}));
// });

app.use('/', express.static(__dirname + '/public'));

app.post('/parse', upload.single('templatexxx'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any
  csvToJson(req.file.path).then(a => {
    res.json(a);
  });
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

var httpServer = http.createServer(app);

httpServer.listen(3000, function() {
	console.log('Listening on port %d', httpServer.address().port);
});
