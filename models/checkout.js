// Creating our Checkout model

module.exports = function(sequelize, DataTypes) {
    var Checkout = sequelize.define("Checkout", {
      checkout_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checkout_on: {
          type: DataTypes.DATE
      },
      return_by_date: {
        type: DataTypes.DATE
      },
      return_on: {
        type: DataTypes.DATE
      }
    });

    // Checkout.associate = function(models) {
    // //   // We're saying that a Post should belong to an Author
    // //   // A Post can't be created without an Author due to the foreign key constraint
    //   Checkout.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    //   Checkout.hasOne(models.Book, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    return Checkout;
};