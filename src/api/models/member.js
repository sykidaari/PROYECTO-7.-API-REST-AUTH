const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    bio: {
      type: String,
      required: false
    }
  },
  { timestamps: true, collection: 'members' }
);

const Member = mongoose.model('members', memberSchema, 'members');

module.exports = Member;
