const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();

const Post = require('../../models/Post');
const Users = require('../../models/Users');

// @route       POST api/post/upload-image
// @ desc       Post a post image
// @access      Private
router.post('/upload-image', auth, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const file = req.files.file

  const fileName = `${Date.now()}-${file.name}`

  file.mv(`./uploads/${fileName}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err.msg)
    }

    res.json({ fileName: fileName, filePath: `/uploads/${fileName}` })
  })
})

// @route       POST api/post
// @ desc       Create a Post
// @access      Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Users.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        photo: req.body.photo
      });

      const post = await newPost.save()

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// var platform = new window.H.service.Platform({
//   apikey: '5p2ZKQVCUNnZt9kBR4wDC0Encjv7w8k5ZBm4vzS_8zw',
// });

// function savePhoto(post, photoEncoded) {
//   if (photoEncoded == null) return;
//   const photo = JSON.parse(photoEncoded);
//   if (photo != null && imageMimeTypes.includes(photo.type)) {
//     post.photo = new Buffer.from(photo.data, 'base64');
//     post.photoType = photo.type;
//   }
// }

// @route       GET api/post
// @ desc       Get all posts
// @access      Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/post/user/:id
// @ desc       Get all posts
// @access      Private

router.get('/user/:id', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/post/:id
// @ desc       Get post by id
// @access      Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found.' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/post/:id
// @ desc       Delete a post
// @access      Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found.' });
    }

    //Check if the user deleting is the post's owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    } else {
      await post.remove();
    }

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/post/like/:id
// @ desc       Like a post
// @access      Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found.' });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post has already been liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/post/unlike/:id
// @ desc       Unlike a post
// @access      Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found.' });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       PUT /api/post/comment/:id
// @ desc       Make a comment
// @access      Private
router.put(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);
      const user = await Users.findById(req.user.id).select('-password');

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT /api/post/delcomment/:id
// @ desc       delete a comment
// @access      Private

router.delete('/delcomment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not Found.' });
    }

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist.' });
    }

    // Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       POST /api/post/photo/:id
// @ desc       post a photo
// @access      Private
// router.post('/photo/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     upload(req, res, (error) => {
//       if (error) {
//         res.status(500).send('Server Error');
//       } else {
//         if (req.file == undefined) {
//           res.status(404).json({ msg: 'Photo not Found' });
//         } else {
//           const fullPath = 'photos/' + req.file.filename;

//           post.photo = fullPath;
//         }
//       }
//     });
//     await post.save();

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
