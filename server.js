const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

const PORT = 5000 || process.env.port;

connectDB();

const bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({ limit: '10MB', extended: false }));
// app.use(express.urlencoded({ extended: false }));
// Init Middleware
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('API running');
});

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/upload-image', require('./routes/api/upload-image'))

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
