var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/employees", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newEmployee.html"));
  });

  app.get("/menu", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/menu.html"));
  });

  app.get("/name", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/byName.html"));
  });

  app.get("/administration", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/administrationdpt.html"));
  });

  app.get("/customer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customerdpt.html"));
  });

  app.get("/ecom", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ecommercedpt.html"));
  });

  app.get("/international", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/internationaldpt.html"));
  });

  app.get("/receiving", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/receivingdpt.html"));
  });

  app.get("/shipping", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shippingdpt.html"));
  });

  app.get("/warehouse", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/warehousedpt.html"));
  });
};
