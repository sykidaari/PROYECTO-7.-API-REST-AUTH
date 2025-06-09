require('dotenv').config();
const medias = require('../../data/medias');
const Media = require('../../api/models/media');

const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log('connected succesfully to BD');
    const allMedias = await Media.find();

    allMedias.length
      ? (await Media.collection.drop(), console.log('old data deleted'))
      : console.log('no data to delete');
  })
  .catch(() => console.log(`error deleting data ${error}`))
  .then(async () => {
    await Media.insertMany(medias);
    console.log('seed data created');
  })
  .catch((error) => console.log(`error creating data:${error}`))
  .finally(() => {
    mongoose.disconnect();
    console.log('connection to DB ended correctly');
  });
