const userService = require('../services/user.service');

class UserController {
    async createUser(req, res, next) {
        try {
            const { name, email, password, balance } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" })
            }

            if (!balance) {
                return res.status(400).json({ message: "Balance is required" })
            }

            const user = await userService.createUser({ name, email, password }, balance);

            if (!user) {
                return res.status(500).json({ message: "Something went wrong" })
            }

            res.status(201).json(user);
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new UserController();