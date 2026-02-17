const transferService = require('../services/transfer.service');

class TransferController {
    async createTransfer(req, res, next) {
        try {
            const { fromUserId, toUserId, amount, idempotencyKey } = req.body;

            if (!fromUserId || !toUserId || !amount || !idempotencyKey) {
                return res.status(400).json({ message: "All fields are required" });
            };

            const result = await transferService.createTransfer({ fromUserId, toUserId, amount, idempotencyKey})

            if (!result) {
                return res.status(500).json({ message: "Something went wrong" })
            }

            res.status(201).json(result);
        } catch (error) {
            next(error)
        }

    }
}

module.exports = new TransferController();