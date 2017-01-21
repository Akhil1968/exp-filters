var exp = require("express");
var app = exp();

app.use(exp.static(__dirname + "/public"));

var preFilterFn = function (req, res, next) {
  console.log("\n ** Pre-filter called. Req protocol=%s hostname=%s method=%s path=%s", 
  req.protocol, req.hostname, req.method, req.path);
  next();
}
app.use(preFilterFn);


var postFilterFn = function (req, res, next){
  console.log('post filter called');
  res.end();
}

var homeHandler = function(req, res, next){
  console.log('home handler called');
  res.write("<html><body><h3>home Handler</h3></body></html>");
  next();
}

var dataHandler = function(req, res, next){
  console.log('data handler called');
  res.write("<html><body><h3>Data Handler</h3>");
  res.write("\n nm=" + req.query.nm );
  res.write("\n country=" + req.query.country );
  res.write("</body></html>" );
  next();
}

var aboutHandler = function(req, res, next){
  console.log('about handler called');
  res.write("<html><body><h3>About Handler</h3></body></html>");
  next();
}

app.get("/home", homeHandler, postFilterFn);
app.get("/data", dataHandler, postFilterFn);
app.get("/about", aboutHandler, postFilterFn);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Catch the action at " + port);
});