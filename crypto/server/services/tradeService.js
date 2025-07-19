const Trade = require('../repositories/tradeRepository');
const User = require('../repositories/userRepository');
const Crypto = require('../repositories/cryptoRepository');
const Fiat = require('../repositories/fiatRepository');
const walletService = require('../services/walletService');
const fiatWalletService = require('./fiatWalletService');

exports.getAllTrades = async () => {
    return await Trade.findAll();
};

exports.getTradeById = async (id) => {
    const trade = await Trade.findById(id);
    if (!trade) {
        throw new Error('Trade not found');
    }
    return trade;
};

exports.completeTrade = async (id) => {
    const updatedTrade = await Trade.updateStatus(id, 'completed');
    if (!updatedTrade) {
        throw new Error('Trade not found or cannot update status');
    }
    return updatedTrade;
};

exports.cancelTrade = async (id) => {
    const updatedTrade = await Trade.updateStatus(id, 'cancelled');
    if (!updatedTrade) {
        throw new Error('Trade not found or cannot update status');
    }
    return updatedTrade;
};



exports.createTrade = async (tradeData) => {
    const {
        buyer_id,
        seller_id,
        crypto_id,
        fiat_id,
        quantity,
        price,
        total_amount,
    } = tradeData;


    const buyer = await User.findUserById(buyer_id);
    if (!buyer) throw new Error('Buyer not found');

    const seller = await User.findUserById(seller_id);
    if (!seller) throw new Error('Seller not found');


    const crypto = await Crypto.findCryptoById(crypto_id);
    if (!crypto) throw new Error('Cryptocurrency not found');

    const fiat = await Fiat.findFiatById(fiat_id);
    if (!fiat) throw new Error('Fiat currency not found');


    if (quantity <= 0) throw new Error('Quantity must be greater than zero');
    if (price <= 0) throw new Error('Price must be greater than zero');

    const expectedTotal = Number(quantity) * Number(price);
    if (Math.abs(expectedTotal - Number(total_amount)) > 0.000001) {
        throw new Error('Total amount does not match quantity * price');
    }

    //buyer balance check
    const buyerFiatBalance = await fiatWalletService.getBalance(buyer_id, fiat_id);
    if (buyerFiatBalance < total_amount) {
        throw new Error('Buyer has insufficient fiat balance');
    }
    // seller balance check
    const sellerCryptoBalance = await walletService.getBalance(seller_id, crypto_id);
    if (sellerCryptoBalance < quantity) {
        throw new Error('Seller has insufficient crypto balance');
    }

    const newTrade = await Trade.create({
        buyer_id,
        seller_id,
        crypto_id,
        fiat_id,
        quantity,
        price,
        total_amount,
    });

    return newTrade;
};