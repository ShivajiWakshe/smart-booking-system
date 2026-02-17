const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// All bookings
router.get('/all', async (req,res)=>{
  try{
    const bookings = await Appointment.find();
    res.json(bookings);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Today bookings
router.get('/today', async (req,res)=>{
  const today = new Date().toISOString().split('T')[0];
  try{
    const bookings = await Appointment.find({ date: today });
    res.json(bookings);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Yesterday bookings
router.get('/yesterday', async (req,res)=>{
  const yesterday = new Date(Date.now()-86400000).toISOString().split('T')[0];
  try{
    const bookings = await Appointment.find({ date: yesterday });
    res.json(bookings);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
