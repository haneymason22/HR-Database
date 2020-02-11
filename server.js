require("dotenv").config();
var express = require("express");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/htmlRoutes.js")(app);
require("./routes/employee-apiRoutes.js")(app);
require("./routes/department-apiRoutes.js")(app);

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


module.exports = app;
