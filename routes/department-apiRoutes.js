var db = require("../models");

module.exports = function(app) {
  app.get("/api/department", function(req, res) {
    db.Department.findAll({
      include: [db.Employee]
    }).then(function(dbDepartment) {
      res.json(dbDepartment)
    })
  });

  app.get("/api/department/:id", function(req, res) {
    db.Department.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.post("/api/department", function(req, res) {
    db.Department.create(req.body).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.delete("/api/department/:id", function(req, res) {
    db.Department.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

};
