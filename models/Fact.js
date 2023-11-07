const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Fact extends Model {}

Fact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fact_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'fact',
    }
)

module.exports = Fact
