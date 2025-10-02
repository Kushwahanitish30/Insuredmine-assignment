require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
const morgan = require('morgan');
const cpuMonitor = require('./middlewares/cpuMonitor');
const agentRoutes = require('./routes/agentRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const lobRoutes = require('./routes/lobRoutes');
const carrierRoutes = require('./routes/carrierRoutes');
const policyRoutes = require('./routes/policyRoutes');
const systemRoutes = require('./routes/systemRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Global response handler
app.use((req, res, next) => {
  res.success = (data, message = 'Success', status = 200) => {
    res.status(status).json({ status, message, data });
  };
  res.error = (message = 'Error', status = 500, data = null) => {
    res.status(status).json({ status, message, data });
  };
  next();
});

// CPU monitor middleware
app.use(cpuMonitor);

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/lobs', lobRoutes);
app.use('/api/carriers', carrierRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/system', systemRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/policyDB';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
