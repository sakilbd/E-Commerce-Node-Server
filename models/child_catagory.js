'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Child_Catagory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Child_Catagory.init({
        sub_catagory_id: {
            type: Sequelize.INTEGER,

        },
        child_catagory_title: DataTypes.STRING,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Child_Catagory',
    });
    return Child_Catagory;
};