module.exports = function(sequelize, DataTypes) {
    var Department = sequelize.define("Department", {
        name: DataTypes.STRING
    });
  
    Department.associate = function(models) {
      Department.hasMany(models.Employee, {
            onDelete: "cascade",
            foreignKey: "employeeId"
        });
    };
  
    return Department;
  };
  