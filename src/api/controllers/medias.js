const Media = require('../models/media');

const getMedias = async (req, res) => {
  try {
    const { type, order = 'desc' } = req.query;

    if (type && type !== 'movie' && type !== 'series') {
      return res.status(400).json({ message: 'Invalid type' });
    }
    const filter = type ? { type } : {};
    const sortOrder = order === 'asc' ? 1 : -1;

    const medias = await Media.find(filter).sort({
      release_date: sortOrder
    });

    return res.status(200).json(medias);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const getMediaByID = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    return res.status(200).json(media);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const getMediasbyMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { type, order = 'desc' } = req.query;

    if (type && type !== 'movie' && type !== 'series') {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const filter = { 'members.person': id, ...(type ? { type } : {}) };

    const sortOrder = order === 'asc' ? 1 : -1;

    const medias = await Media.find(filter).sort({ release_date: sortOrder });
    return res.status(200).json(medias);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const postMedia = async (req, res) => {
  try {
    const newMedia = new Media(req.body);
    const savedMedia = await newMedia.save();
    return res.status(201).json(savedMedia);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'POST failed', error: error.message });
  }
};

const putMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const newMedia = new Media(req.body);
    newMedia._id = id;
    const updatedMedia = await Media.findByIdAndUpdate(id, newMedia, {
      new: true
    });
    return res.status(200).json(updatedMedia);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'PUT failed', error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedia = await Media.findByIdAndDelete(id);
    return res.status(200).json(deletedMedia);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'DEL failed', error: error.message });
  }
};

module.exports = {
  getMedias,
  getMediaByID,
  getMediasbyMember,
  postMedia,
  putMedia,
  deleteMedia
};
