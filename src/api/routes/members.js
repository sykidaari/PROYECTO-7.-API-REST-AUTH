const {
  getMembers,
  getMemberByID,
  postMember,
  putMember,
  deleteMember
} = require('../controllers/members');

const membersRouter = require('express').Router();

membersRouter.get('/:id', getMemberByID);
membersRouter.get('/', getMembers);

membersRouter.post('/', postMember);
membersRouter.put('/:id', putMember);
membersRouter.delete('/:id', deleteMember);

module.exports = membersRouter;
