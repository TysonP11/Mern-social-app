const express = require('express');

const app = express();

const PORT = 5000 || process.env.port;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API running');
});
