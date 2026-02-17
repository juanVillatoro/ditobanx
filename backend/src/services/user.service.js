const User = require('../models/user.model');
const Wallet = require('../models/wallet.model');
const bcrypt = require('bcrypt');

class UserService {
    async createUser(data, balance) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({
            ...data,
            password: hashedPassword
        });

        await Wallet.create({
            userId: user.id,
            balance: balance,
            currency: 'USD'
        });

        return user;
    };

    async getAllUsers() {
        return await User.findAll();
    }
}

module.exports = new UserService();