const { getMembers } = require('../controllers/members');

const membersRouter = require('express').Router();

membersRouter.get('/', getMembers);

module.exports = membersRouter;
