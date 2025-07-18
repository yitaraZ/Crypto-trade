const User = require('../models/User');

exports.findAllUsers = () => {
  return User.findAll({
    attributes: { exclude: ['password_hash'] }
  });
};

exports.findUserById = (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['password_hash'] }
  });
};

exports.createUser = (data) => {
  return User.create(data);
};

exports.findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};
