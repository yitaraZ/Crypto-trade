const Transaction = require('../repositories/transactionRepository');


exports.getAllTransaction = async () => {
    return await Transaction.findAll();
};

exports.gettransById = async (id) => {
    const trade = await Transaction.findById(id);
    if (!trade) {
        throw new Error('Transaction not found');
    }
    return trade;
};