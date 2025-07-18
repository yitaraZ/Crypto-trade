const userRepository = require('../repositories/userRepository');

exports.getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

exports.getUserById = async (id) => {
  return await userRepository.findUserById(id);
};

exports.registerUser = async ({ username, email, password }) => {
  return await userRepository.createUser({
    username,
    email,
    password_hash: password 
  });
};

exports.loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) return null;

  const isValid = await user.validatePassword(password);
  if (!isValid) return null;

  return user;
};
