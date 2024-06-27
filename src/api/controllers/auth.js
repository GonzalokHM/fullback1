const User = require('../models/user');
const { setError } = require('../../config/error');
const { generateSign } = require('../../config/jwt');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ name: req.body.name });

    if (userDuplicate) {
      // return next(setError(400, 'this user alredy exists 😱'));
      return res.status(400).json({ message: 'This user already exists 😱' });
    }
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    // return next(setError(400, "can't register 😞"));
    return res.status(400).json({ message: "Can't register 😞" });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({   $or: [
      { name: req.body.name },
      { email: req.body.email }
    ]});
    if (!user) {
      // return next(setError(400, "this doesn't exist 😞"));
      return res.status(400).json({ message: "This user doesn't exist 😞" });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      // return next(setError(400, "passwords don't macth 😞"));
      return res.status(400).json({ message: "Passwords don't match 😞" });
    }
  } catch (error) {
    // return next(setError(400, "can't login 😞"));
    return res.status(400).json({ message: "Can't login 😞" });
  }
};

module.exports = {
  register,
  login,
};
