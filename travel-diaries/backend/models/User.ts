import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
});

export default model('User', userSchema);
