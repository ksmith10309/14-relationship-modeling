import mongoose from 'mongoose';

// Define schema
const makerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
});

// Create model
const Maker = mongoose.model('Maker', makerSchema);

// Console log all the makers in the database
Maker.find(function (err, maker) {
  if (err) return console.error(err);
  console.log('MAKER DATABASE CONTENTS', maker);
});

// Export model
export default Maker;
