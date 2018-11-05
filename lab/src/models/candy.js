import mongoose from 'mongoose';

// Define schema
const candySchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Maker' },
});

// Create model
const Candy = mongoose.model('Candy', candySchema);

// Console log all the candy in the database
Candy.find(function (err, candy) {
  if (err) return console.error(err);
  console.log('CANDY DATABASE CONTENTS', candy);
});

// Export model
export default Candy;
