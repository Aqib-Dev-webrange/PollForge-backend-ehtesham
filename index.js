const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const voteRoutes = require('./routes/vote');
const syncRoutes = require('./routes/sync');
const resultsRoutes = require('./routes/results');

dotenv.config();

const app = express();

// CORS configuration to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies if needed
}));

app.use(express.json());

app.use('/api/vote', voteRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/votes', resultsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error(err));
