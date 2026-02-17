const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');
const User =  require('./user.model');

const Transfers = sequelize.define('Transfers', {
id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
},
fromUserId: {
    type: DataTypes.UUID,
    allowNull: false,
},
toUserId: {
    type: DataTypes.UUID,
    allowNull: false,
},
amount: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
},
idempotencyKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
},
status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'completed',
}
},
{
    tableName: 'transfers',
    timestamps: true,
})

User.hasMany(Transfers, { foreignKey: 'fromUserId'});
User.hasMany(Transfers, { foreignkey: 'toUserId'});
Transfers.belongsTo(User, { foreignKey: 'fromUserId'});
Transfers.belongsTo(User, { foreignKey: 'toUserId'});

module.exports = Transfers;

