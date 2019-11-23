// Creating our Checkout model

module.exports = function(sequelize, DataTypes) {
    var Checkout = sequelize.define("Checkout", {
      checkout_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      checkout_date: {
          type: DataTypes.DATE
      },
      return_by_date: {
        type: DataTypes.DATE
      },
      return_date: {
        type: DataTypes.DATE
      }
    });

    return Checkout;
  };