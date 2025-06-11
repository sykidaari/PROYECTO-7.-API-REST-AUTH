const { generateToken } = require('../../config/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('favorite_media');
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email_address, password } = req.body;

    const newUser = new User({
      username,
      email_address,
      password,
      role: 'user'
    });

    const duplicateUser = await User.findOne({
      $or: [{ username }, { email_address }]
    });

    if (duplicateUser) {
      return res
        .status(400)
        .json('Register failed, username or email already exists');
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'register (POST) failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email_address, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email_address }]
    });

    if (!user) {
      return res.status(400).json("user doesn't exist");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('the password is incorrect');
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'login (POST) failed', error: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin') {
      delete req.body.role;
    }

    const newUser = new User(req.body);
    newUser._id = id;

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true
    }).populate('favorite_media');

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'PUT failed', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'DEL failed', error: error.message });
  }
};

module.exports = { getUsers, registerUser, loginUser, putUser, deleteUser };
