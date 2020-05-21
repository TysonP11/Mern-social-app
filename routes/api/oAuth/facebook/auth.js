const express = require('express');
const router = express.Router();
const User = require('../../../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');
const auth = require('../../../../middleware/auth');

router.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['email'],
  })
);

router.get('/callback', passport.authenticate('facebook'), async (req, res) => {
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
