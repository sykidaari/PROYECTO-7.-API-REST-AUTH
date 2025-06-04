const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['actor', 'director', 'producer', 'writer']
    }
  },
  { timestamps: true, collection: 'members' }
);
