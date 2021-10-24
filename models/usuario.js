'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    usuario.init({
        mail: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: 'compositeIndex'
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set: function(val) {
                this.setDataValue('password', val);
            },
            validate: {
                isLongEnough: function(val) {
                    if (val.length < 8) {
                        throw new Error("La contraseña es muy corta.")
                    }
                }
            }
        },
        status: {
            defaultValue: 1,
            type: DataTypes.CHAR
        }
    }, {
        sequelize,
        modelName: 'usuario',
    });

    return usuario;
};