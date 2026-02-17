const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database')
const User = require('./user.model');

const Wallet = sequelize.define('Wallet', {
id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
},
userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
},
balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
},
currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USD',
},
}, {
    tableName: 'wallets',
    timestamps: true,
})

Wallet.belongsTo(User, { foreignKey: 'userId'});
User.hasOne(Wallet, { foreignKey: 'userId'});

module.exports = Wallet;