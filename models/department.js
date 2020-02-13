module.exports = function(sequelize, DataTypes) {
    var Department = sequelize.define("Department", {
        name: {
            type: DataTypes.STRING,
            // defaultValue: "eCommerce"
        }
    });

    // Department.create ({
    //     name: "eCommerce"
    // }) 
  
    Department.associate = function(models) {
      Department.hasMany(models.Employee, {
            onDelete: "cascade",
            foreignKey: "employeeId"
        });
    };
  
    return Department;
};