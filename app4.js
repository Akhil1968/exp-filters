var exp = require("express");
var app = exp();

app.get("/", function(req, res){
	res.send("<html><body><h1>You called root path</h1></body></html>");
});

app.get("/data", function(req, res){
	res.send("You called data");
});

app.get("/download", function(req, res){
	res.download("./package.json", function(){
		console.log("download is over");
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server is ON at " + port);
});