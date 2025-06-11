const { isAdmin, isAuth } = require('../../middlewares/auth');

const {
  getMedias,
  getMediaByID,

  postMedia,
  putMedia,
  deleteMedia,
  getMediasbyMember
} = require('../controllers/medias');

const mediasRouter = require('express').Router();

mediasRouter.get('/member/:id', [isAuth], getMediasbyMember);
mediasRouter.get('/:id', [isAuth], getMediaByID);
mediasRouter.get('/', [isAuth], getMedias);

mediasRouter.post('/', [isAdmin], postMedia);
mediasRouter.put('/:id', [isAdmin], putMedia);
mediasRouter.delete('/:id', [isAdmin], deleteMedia);

module.exports = mediasRouter;
