const User = require('../models/user.model');
const Transfer = require('../models/transfer.model');
const Wallet = require('../models/wallet.model');
const sequelize = require('../config/database');

class TransferService {
    async createTransfer(data) {
        const { fromUserId, toUserId, amount, idempotencyKey} = data;

        const existintTransfer = await Transfer.findOne({ where: {idempotencyKey} });

        if(existintTransfer) {
            return { Transfer: existintTransfer, idempotent: true}
        }

        const result = await sequelize.transaction(async (t) => {
            const fromWallet = await Wallet.findOne({ where: { userId: fromUserId }, lock: t.LOCK.UPDATE, transaction: t });
            const toWallet = await Wallet.findOne({ where: { userId: toUserId }, lock: t.LOCK.UPDATE, transaction: t});

            if(!fromWallet) throw { status: 404, message: "Wallet de origen no encontrada"};

            if(!toWallet) throw { status: 404, message: "Wallet de destino no encontrada"};

            if(parseFloat(fromWallet.balance) < parseFloat(amount)) throw { status: 400, message: "Saldo insuficiente"};

            await fromWallet.decrement('balance', { by: amount, transaction: t });
            await toWallet.increment('balance', { by: amount, transaction: t });

            const transfer = await Transfer.create({
                fromUserId,
                toUserId,
                amount,
                idempotencyKey,
                status: 'completed',
            }, {transaction: t})

            return transfer;
        });

        return { Transfer: result, imdepotent: false};
    }
}

module.exports = new TransferService();