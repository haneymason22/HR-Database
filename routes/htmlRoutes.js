var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/employees", function(req, res) {
    res.sendFile(path.join(__dirname, "../newEmployee.html"));
  });

  app.get("/departments", function(req, res) {
    res.sendFile(path.join(__dirname, "../menu.html"));
  });

  app.get("/name", function(req, res) {
    res.sendFile(path.join(__dirname, "../byName.html"));
  });

  app.get("/department", function(req, res) {
    res.sendFile(path.join(__dirname, "../byDepartment.html"));
  });

};
