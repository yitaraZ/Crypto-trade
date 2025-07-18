const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');

router.get('/all_fiat', CurrencyController.getAllFiatCurrency);
router.get('/all_crypto', CurrencyController.getAllCryptoCurrency);
router.get('/fiat/:fiatId', CurrencyController.getFiatById);
router.get('/crypto/:cryptoId', CurrencyController.getCryptoById);

router.post('/fiat', CurrencyController.createFiat);
router.post('/crypto', CurrencyController.createCrypto);

router.put('/fiat_update/:fiatId', CurrencyController.updateFiat);
router.put('/crypto_update/:cryptoId', CurrencyController.updateCrypto);


module.exports = router;
