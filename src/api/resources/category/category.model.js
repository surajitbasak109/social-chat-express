import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category must have name']
  },
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default model('Category', categorySchema);