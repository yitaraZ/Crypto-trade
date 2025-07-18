const fiatRepo = require('../repositories/fiatRepository');
const cryptoRepo = require('../repositories/cryptoRepository');

// Fiat services
exports.getAllFiats = () => fiatRepo.findAllFiats();

exports.getFiatById = (id) => fiatRepo.findFiatWhere({ fiat_id: id });

exports.createFiat = (data) => fiatRepo.createFiat(data);

exports.updateFiatRate = async (fiatId, rate_to_usd) => {
  const fiat = await fiatRepo.findFiatById(fiatId);
  if (!fiat) return null;
  await fiatRepo.updateFiat(fiat, { rate_to_usd });
  return true;
};

// Crypto services
exports.getAllCryptos = () => cryptoRepo.findAllCryptos();

exports.getCryptoById = (id) => cryptoRepo.findCryptoWhere({ crypto_id: id });

exports.createCrypto = (data) => cryptoRepo.createCrypto(data);

exports.updateCryptoPrice = async (cryptoId, current_price) => {
  const crypto = await cryptoRepo.findCryptoById(cryptoId);
  if (!crypto) return null;
  await cryptoRepo.updateCrypto(crypto, { current_price });
  return true;
};
