const { sequelize, DataTypes, Model } = require('./db');

const options = { sequelize, timestamps: false };

class Restaurant extends Model {

}

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, options);


class Menu extends Model {

}

Menu.init({
    title: DataTypes.STRING,
}, options);


class Item extends Model {

}

Item.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
}, options);


Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(Item);
Item.belongsTo(Menu);

module.exports = { Restaurant, Menu, Item };