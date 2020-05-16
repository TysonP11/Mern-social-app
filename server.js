const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload')

const app = express();

const PORT = 5000 || process.env.port;

connectDB();

app.use(express.json({ extended: false }));
app.use(fileUpload())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('API running');
});

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
