import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Tweet must have a body'],
  },
});

export default mongoose.model('Tweet', tweetSchema);
