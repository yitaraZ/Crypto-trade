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

exports.createUser = ({ username, email, password_hash }) => {
  return User.create({ username, email, password_hash });
};

exports.findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};
