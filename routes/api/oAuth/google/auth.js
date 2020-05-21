const express = require('express');
const router = express.Router();
const User = require('../../../../models/Users');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../../../../middleware/auth');
const config = require('config');

// @route GET api/auth/google
// @desc Login with Google
// @access Public

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// @route GET api/auth/google/redirect
// @desc callback route for google to redirect to
// @access Public
router.get('/redirect', passport.authenticate('google'), async (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
    },
  };

  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

module.exports = router;
