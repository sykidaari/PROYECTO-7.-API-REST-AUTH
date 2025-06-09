const Member = require('../models/member');

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate();
    return res.status(200).json(members);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const getMemberByID = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    return res.status(200).json(member);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'GET failed', error: error.message });
  }
};

const postMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    return res.status(201).json(savedMember);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'POST failed', error: error.message });
  }
};

const putMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newMember = new Member(req.body);
    newMember._id = id;
    const updatedMember = await Member.findByIdAndUpdate(id, newMember, {
      new: true
    });
    return res.status(200).json(updatedMember);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'PUT failed', error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    return res.status(200).json(deletedMember);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'DEL failed', error: error.message });
  }
};

module.exports = {
  getMembers,
  getMemberByID,
  postMember,
  putMember,
  deleteMember
};
