var exp = require("express");
var app = exp();

app.use(exp.static(__dirname + "/public"));

var filterFn = function (req, res, next) {
  req.requestTime = Date.now();
  console.log("Pre-filter");
  console.log("Req protocol=%s hostname=%s method=%s path=%s", 
  req.protocol, req.hostname, req.method, req.path);
  console.log("Req url=" + req.url);
  next();
}
app.use(filterFn);


var byeFn = function (req, res, next){
  console.log('post filter called \n');
  res.end();
}

var homeHandler = function(req, res, next){
  res.write("<html><body><h3>home Handler</h3></body></html>");
  next();
}

var dataHandler = function(req, res, next){
  res.write("<html><body><h3>Data Handler</h3>");
  res.write("\n nm=" + req.query.nm );
  res.write("\n country=" + req.query.country );
  res.write("</body></html>" );
  next();
}

var aboutHandler = function(req, res, next){
  res.write("<html><body><h3>About Handler</h3></body></html>");
  next();
}

app.get("/home", homeHandler, byeFn);
app.get("/data", dataHandler, byeFn);
app.get("/about", aboutHandler, byeFn);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server is ON at " + port);
});