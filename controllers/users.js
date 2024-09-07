const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../utils/badRequestError");
const UnauthorizedError = require("../utils/unauthorizedError");
const NotFoundError = require("../utils/notFoundError");
const ConflictError = require("../utils/conflictError");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Data not found."));
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    // eslint-disable-next-line no-unused-vars
    const { password: _, ...userInfo } = user.toObject();

    return res.status(201).send(userInfo);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided."));
    }
    if (err.code === 11000) {
      return next(new ConflictError("Conflict with existing data."));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid data provided."));
  }

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    if (err.message === "Invalid email or password") {
      return next(new UnauthorizedError("Invalid email or password."));
    }

    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new NotFoundError("Data not found."));
    }

    return res.send(updatedUser);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided."));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
