const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, { maxAge: 604800000, httpOnly: true }).send(user.toJSON());
    })
    .catch(() => {
      next(new UnauthorizedError('Wrong email or password'));
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect data'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((passwordHash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: passwordHash,
      })
        .then((user) => {
          res.send(user.toJSON());
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Incorrect data'));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError('User already exists'));
            return;
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
        return;
      }
      next(err);
    });
};

module.exports = {
  login,
  getUsers,
  getUserInfo,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
