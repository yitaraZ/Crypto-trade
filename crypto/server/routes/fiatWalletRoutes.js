const express = require('express');
const router = express.Router();
const fiatWalletController = require('../controllers/fiatWalletController');

router.get('/', fiatWalletController.getAll);
router.get('/:id', fiatWalletController.getById);
router.post('/fiat_wallet_create', fiatWalletController.create);
router.put('/fiat_wallet_update/:id', fiatWalletController.update);
router.delete('/fiat_wallet_delete/:id', fiatWalletController.delete);

router.get('/balance/:userId/:fiatId', fiatWalletController.getBalance);
router.post('/increase', fiatWalletController.increaseBalance);
router.post('/decrease', fiatWalletController.decreaseBalance);

module.exports = router;
