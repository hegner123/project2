var bcrypt = require("bcryptjs");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });



  // Creating a custom method for our User model.
  //This will check if an unhashed password entered by the
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(auth_string) {
    return bcrypt.compareSync(auth_string, this.auth_string);
  };

  User.beforeCreate(user => {
    user.auth_string = bcrypt.hashSync(
      user.auth_string,
       bcrypt.genSaltSync(10),
       null
     );
   });

   User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.belongsToMany(models.Book, {
      through: "Checkout",
      as: "User",
      foreignKey: "userId",
      otherKey: "bookId"
    });
  };
  return User;
};
//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working

