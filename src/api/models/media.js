const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    release_date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['movie', 'series'] },
    seasons: {
      type: Number,
      required: function () {
        return this.type === 'series';
      }
    },
    length_minutes: {
      type: Number,
      required: function () {
        return this.type === 'movie';
      }
    },
    members: [
      {
        person: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'members',
          required: true
        },
        role: {
          type: String,
          enum: ['actor', 'director', 'producer', 'writer'],
          required: true
        }
      }
    ]
  },
  { timestamps: true, collection: 'medias' }
);

const Media = mongoose.model('medias', mediaSchema, 'medias');

module.exports = Media;
