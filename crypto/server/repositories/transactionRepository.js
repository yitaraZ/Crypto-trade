const Transaction = require('../models/Transaction');


exports.create = (data) =>
  Transaction.create(data);