const { isAdmin, isAuth } = require('../../middlewares/auth');
const {
  getUsers,
  registerUser,
  loginUser,
  putUser,
  deleteUser
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAdmin], getUsers);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/:id', [isAuth], putUser);
usersRouter.delete('/:id', [isAuth], deleteUser);

module.exports = usersRouter;
