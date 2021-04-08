import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const STANDARD_ROLE = 2;
export const ARTIST_ROLE = 1;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email is taken"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    default: 2,
    required: true,
    type: Number
  }
});

export default model('User', userSchema);
