const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: Buffer,
  },
  photoType: {
    type: String,
  },
  address: {
    type: String,
  },
});

PostSchema.virtual('photoPath').get(function () {
  if (this.photo != null && this.photoType != null) {
    return `data:${this.photoType};charset=utf-8;base64,${this.photo.toString(
      'base64'
    )}`;
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
