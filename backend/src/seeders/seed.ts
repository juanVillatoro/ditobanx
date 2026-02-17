const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/user.model');
const Wallet = require('../models/wallet.model');
const Transfer = require('../models/transfer.model');

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log('Ejecutando seeder');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const usersData = [
      { id: uuidv4(), name: 'Pablo',   email: 'alice@gmail.com',   password: hashedPassword },
      { id: uuidv4(), name: 'Pedro',     email: 'bob@gmail.com',     password: hashedPassword },
      { id: uuidv4(), name: 'Raúl', email: 'charlie@gmail.com', password: hashedPassword },
    ];

    const users = await Promise.all(
      usersData.map((u) =>
        User.findOrCreate({ where: { email: u.email }, defaults: u })
      )
    );

    const [pablo, pedro, raul] = users.map(([user]) => user);

    console.log('Usuarios creados');

    // ── 2. WALLETS ────────────────────────────────────────────────────────────
    const walletsData = [
      { id: uuidv4(), userId: pablo.id,   balance: 10, currency: 'USD' },
      { id: uuidv4(), userId: pedro.id,     balance: 5,  currency: 'USD' },
      { id: uuidv4(), userId: raul.id, balance: 7,  currency: 'USD' },
    ];

    const wallets = await Promise.all(
      walletsData.map((w) =>
        Wallet.findOrCreate({ where: { userId: w.userId }, defaults: w })
      )
    );

    const [pabloWallet, pedroWallet] = wallets.map(([wallet]) => wallet);

    console.log('Wallets creadas');

    const transfersData = [
      {
        id: uuidv4(),
        fromUserId:     pablo.id,
        toUserId:       pedro.id,
        amount:         1,
        idempotencyKey: uuidv4(),
        status:         'completed',
      },
      {
        id: uuidv4(),
        fromUserId:     pedro.id,
        toUserId:       raul.id,
        amount:         5,
        idempotencyKey: uuidv4(),
        status:         'completed',
      },
      {
        id: uuidv4(),
        fromUserId:     raul.id,
        toUserId:       pedro.id,
        amount:         200.00,
        idempotencyKey: uuidv4(),
        status:         'completed',
      },
    ];

    await Transfer.bulkCreate(transfersData, { ignoreDuplicates: true });

    console.log('Transferencias creadas');
    console.log('');
    console.log('Seeder completado.');

  } catch (err) {
    console.error('Error en el seeder:', err);
  } finally {
    await sequelize.close();
  }
};

seed();