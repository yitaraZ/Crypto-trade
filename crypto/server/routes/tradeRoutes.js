const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/', tradeController.getAllTrades);
router.get('/:id', tradeController.getTradeById);
router.post('/trade_create', tradeController.createTrade);
router.put('/:id/complete', tradeController.completeTrade);
router.put('/:id/cancel', tradeController.cancelTrade);

module.exports = router;