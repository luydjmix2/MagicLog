'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  inventario.init({
    usurioid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: 'compositeIndex'
    },
    sku: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: 'compositeIndex'
    },
    cantidad: {
      allowNull: true,
      type: DataTypes.STRING
    },
    precio: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'inventario',
  });
  return inventario;
};