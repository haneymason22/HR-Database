var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/employees", function(req, res) {
    db.Employee.findAll({}).then(function(dbEmployees) {
      res.json(dbEmployees);
    });
  });

  // Create a new example
  app.post("/api/employees", function(req, res) {
    db.Employee.create(req.body).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  // Delete an example by id
  app.delete("/api/employees/:id", function(req, res) {
    db.Employee.destroy({ where: { id: req.params.id } }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });
};
