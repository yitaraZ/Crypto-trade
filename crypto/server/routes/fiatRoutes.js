const express = require('express');
const router = express.Router();
const FiatWalletController = require('../controllers/fiatWalletController');

router.get('/', FiatWalletController.getAll);
router.get('/:id', FiatWalletController.getById);
router.post('/fiat_wallet_create', FiatWalletController.create);
router.put('/fiat_wallet_update/:id', FiatWalletController.update);
router.delete('/fiat_wallet_delete/:id', FiatWalletController.delete);

module.exports = router;
