'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Media.init({
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    cover_url: DataTypes.STRING,
    external_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};