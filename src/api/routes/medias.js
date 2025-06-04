const {
  getMedias,
  getMediaByID,
  getMediasInReleaseOrder,
  postMedia,
  putMedia,
  deleteMedia
} = require('../controllers/medias');

const mediasRouter = require('express').Router();

mediasRouter.get('/', getMedias);

module.exports = mediasRouter;
