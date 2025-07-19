const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.get('/', walletController.getAll);
router.get('/:id', walletController.getById);
router.post('/wallet_create', walletController.create);
router.put('/wallet_update/:id', walletController.update);
router.delete('/wallet_delete/:id', walletController.delete);

router.get('/balance/:userId/:cryptoId', walletController.getBalance);
router.post('/increase', walletController.increaseBalance);
router.post('/decrease', walletController.decreaseBalance);

module.exports = router;
