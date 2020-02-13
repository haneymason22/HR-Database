module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    },
    salary: {
      type: DataTypes.DECIMAL(13,2),
      allowNull: false,
      len: [1]
    }
  });

  Employee.associate = function(models) {
    Employee.belongsTo(models.Department, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Employee;
};
