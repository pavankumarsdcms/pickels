const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple Admin Login Mock
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Secure environment-variable-driven check for production
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ token: process.env.JWT_SECRET || 'mock-jwt-token-for-admin', username: 'admin' });
  }
  
  // Or check DB
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.json({ token: 'mock-jwt-token-for-admin', username: user.username });
    }
    
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
