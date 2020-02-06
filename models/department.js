module.exports = function(sequelize, DataTypes) {
    var Department = sequelize.define("Department", {
        name: DataTypes.String
    });
  
    Department.associate = function(models) {
      Department.hasMany(models.Employee, {
        onDelete: "cascade"
    });
    };
  
    return Department;
  };
  