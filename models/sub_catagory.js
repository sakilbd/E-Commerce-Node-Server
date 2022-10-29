"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Sub_Catagory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Sub_Catagory.init({
        root_catagory_id: {
            type: DataTypes.INTEGER,

        },
        sub_catagory_title: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Sub_Catagory",
    });
    return Sub_Catagory;
};