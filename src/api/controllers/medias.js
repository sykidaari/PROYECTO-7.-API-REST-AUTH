const Media = require('../models/media');

const getMedias = async (req, res) => {
  try {
    const { type, order = 'desc' } = req.query;

    if (type && type !== 'movie' && type !== 'series') {
      return res.status(400).json({ message: 'Invalid type' });
    }
    const filter = type ? { type } : {};
    const sortOrder = order === 'asc' ? 1 : -1;

    const medias = await Media.find(filter)
      .sort({
        release_date: sortOrder
      })
      .populate('members.person');

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
    const media = await Media.findById(id).populate('members.person');
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
    const { title, release_date, type, seasons, length_minutes, members } =
      req.body;

    const updateFields = {
      $set: { title, release_date, type, seasons, length_minutes }
    };

    let updatedMedia = await Media.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    if (Array.isArray(members)) {
      const media = await Media.findById(id);

      const newMembers = members.filter((incomingMember) => {
        return !media.members.some(
          (existingMember) =>
            existingMember.person.toString() === incomingMember.person &&
            existingMember.role === incomingMember.role
        );
      });

      if (newMembers.length > 0) {
        updatedMedia = await Media.findByIdAndUpdate(
          id,
          { $push: { members: { $each: newMembers } } },
          { new: true }
        );
      }
    }

    updatedMedia = await Media.findById(id).populate('members.person');

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
