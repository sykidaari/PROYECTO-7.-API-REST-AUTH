const Media = require('../models/media');

const getMedias = async (req, res) => {
  try {
    const medias = await Media.find();

    return res.status(200).json(medias);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const getMediaByID = async (req, res) => {
  try {
  } catch (error) {}
};

const getMediasInReleaseOrder = async (req, res) => {
  try {
  } catch (error) {}
};

const getMediasbyMembers = async (req, res) => {
  try {
  } catch (error) {}
};

const postMedia = async (req, res) => {
  try {
  } catch (error) {}
};

const putMedia = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteMedia = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getMedias,
  getMediaByID,
  getMediasInReleaseOrder,
  postMedia,
  putMedia,
  deleteMedia
};
