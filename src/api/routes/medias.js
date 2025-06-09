const {
  getMedias,
  getMediaByID,

  postMedia,
  putMedia,
  deleteMedia,
  getMediasbyMember
} = require('../controllers/medias');

const mediasRouter = require('express').Router();

mediasRouter.get('/member/:id', getMediasbyMember);
mediasRouter.get('/:id', getMediaByID);
mediasRouter.get('/', getMedias);

mediasRouter.post('/', postMedia);
mediasRouter.put('/:id', putMedia);
mediasRouter.delete('/:id', deleteMedia);

module.exports = mediasRouter;
