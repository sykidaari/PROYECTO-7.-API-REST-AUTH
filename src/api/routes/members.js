const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getMembers,
  getMemberByID,
  postMember,
  putMember,
  deleteMember
} = require('../controllers/members');

const membersRouter = require('express').Router();

membersRouter.get('/:id', [isAuth], getMemberByID);
membersRouter.get('/', [isAdmin], getMembers);

membersRouter.post('/', [isAdmin], postMember);
membersRouter.put('/:id', [isAdmin], putMember);
membersRouter.delete('/:id', [isAdmin], deleteMember);

module.exports = membersRouter;
