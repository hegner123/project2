// Create book model

module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        book_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        isbn: {
            type: DataTypes.BIGINT
        },
        authors: {
            type: DataTypes.TEXT
        },
        original_publish_year: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.TEXT
        },
        qty_on_hand: {
            type: DataTypes.INTEGER
        },
        qty_checked_out: {
            type: DataTypes.INTEGER
        },
        book_rating: {
            type: DataTypes.DOUBLE
        },
        image_url: {
            type: DataTypes.TEXT
        },
        small_image_url: {
            type: DataTypes.TEXT
        }
    });

    // Book.associate = function(models) {
    //     Book.belongsToMany(models.User, {
    //         through: "Checkout",
    //         as: "Book",
    //         foreignKey: "bookId",
    //         otherKey: "userId"
    //       });
    //   };

    return Book;
}