const express = require('express');
const app = express();
const { sequelize } = require('./models');
const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('E-commerce API');
});
app.get('/api/users', (req, res) => {
    res.send('Users API');
  });
  app.get('/api/products', (req, res) => {
    res.send('Products API');
  });

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
