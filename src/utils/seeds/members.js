require('dotenv').config();
const members = require('../../data/members');
const Member = require('../../api/models/member');

const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log('connected succesfully to BD');
    const allMembers = await Member.find();

    allMembers.length
      ? (await Member.collection.drop(), console.log('old data deleted'))
      : console.log('no data to delete');
  })
  .catch((error) => console.log(`error deleting data ${error}`))
  .then(async () => {
    await Member.insertMany(members);
    console.log('seed data created');
  })
  .catch((error) => console.log(`error creating data:${error}`))
  .finally(() => {
    mongoose.disconnect();
    console.log('connection to DB ended correctly');
  });
