const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  characteristics: {type: String},
  name: {type: String},
  location: {type: String},
  age: {type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
});


module.exports = mongoose.model('Collection', collectionSchema);

