import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const tweetSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Tweet must have a body'],
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

tweetSchema.plugin(mongoosePaginate);

export default mongoose.model('Tweet', tweetSchema);
