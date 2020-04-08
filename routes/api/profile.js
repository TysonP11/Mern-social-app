const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');

// @route       GET api/profile/me
// @ desc       Get current user profile
// @access      Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    bio,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    website,
    phoneNumber,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  if (website) profileFields.website = website;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;

  // Build social object and add to profileFields
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/profile/
// @ desc       Get all users profile
// @access      Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       GET api/profile/user/:user_id
// @ desc       Get profile by user id
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not Found!' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectID') {
      return res.status(400).json({ msg: 'Profile not Found!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/profile/
// @ desc       delete profile, user and post
// @access      Private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove user's posts
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       PUT api/profile/follow/:id
// @ desc       follow an user
// @access      Private
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const followedProfile = await Profile.findById(req.params.id);
    const followingProfile = await Profile.findOne({ user: req.user.id });

    if (!followedProfile) {
      return res.status(404).json({ msg: 'Profile not Found' });
    }

    if (
      followedProfile.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You are already following this Profile' });
    }

    followedProfile.followers.unshift({ user: req.user.id });

    followingProfile.following.unshift({ user: req.params.id });

    await followingProfile.save();
    await followedProfile.save();

    res.json({ followedProfile, followingProfile });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/profile/unfollow/:id
// @ desc       unfollow an user
// @access      Private

router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const followedProfile = await Profile.findById(req.params.id);
    const followingProfile = await Profile.findOne({ user: req.user.id });

    if (!followedProfile) {
      return res.status(404).json({ msg: 'Profile not Found' });
    }

    if (
      followedProfile.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You are not following this Profile' });
    }

    const removeFollowerIndex = followedProfile.followers
      .map((follower) => follower.user.toString())
      .indexOf(req.user.id);

    followedProfile.followers.splice(removeFollowerIndex, 1);

    const removeFollowedIndex = followingProfile.following
      .map((following) => following.user.toString())
      .indexOf(req.user.id);

    followingProfile.following.splice(removeFollowedIndex, 1);

    await followingProfile.save();
    await followedProfile.save();

    res.json({ followedProfile, followingProfile });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/:user_id
// @desc See all posts made by an user
// @access Public

router.get('/:user_id', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.user_id }).sort({
      date: -1,
    });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not Found.' });
    }
    res.status(500).send('Server Error');
  }
  const posts = await Post.find({ user: req.params.user_id }).sort({
    date: -1,
  });
});

module.exports = router;
