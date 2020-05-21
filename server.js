const express = require('express');
const connectDB = require('./config/db');
const passportSetup = require('./config/passport');
const app = express();
const config = require('./config/auth');
const cookieSession = require('cookie-session');
const passport = require('passport');

const PORT = 5000 || process.env.port;

connectDB();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ limit: '10MB', extended: false }));
app.use(express.urlencoded({ extended: false }));
// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API running');
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey],
  })
);

// Init passport
app.use(passport.initialize());
app.use(passport.session());

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/oAuth/facebook', require('./routes/api/oAuth/facebook/auth'));
app.use('/api/oAuth/google', require('./routes/api/oAuth/google/auth'));

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
