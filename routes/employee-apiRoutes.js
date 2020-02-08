var db = require("../models");


module.exports = function(app) {
  app.get("/api/employees", function(req, res) {
    var query = {};
    if (req.query.employee_id) {
      query.EmployeeId = req.query.employee_id;
    }

    db.Post.findAll({
      where: query,
      include: [db.Employee],
    }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.get("/api/employees/:id", function(req, res) {
    
    db.Employee.findOne({
      include: {model: Employee, as: "Employees"},
      where: {
        id: req.params.id
      }
    }).then(function(dbEmployee) {
      console.log(dbEmployee);
      res.json(dbEmployee);
    });
  });

  app.post("/api/employees", function(req, res) {
    db.Employee.create(req.body).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.delete("/api/employees/:id", function(req, res) {
    db.Employee.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  
  app.put("/api/employees", function(req, res) {
    db.Employee.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });
};
