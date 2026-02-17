const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// Login
router.post('/login', async (req,res)=>{
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if(!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'1d' });
    res.json({ token, role: user.role });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
