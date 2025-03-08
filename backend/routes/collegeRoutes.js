const express = require('express');
const router = express.Router();
const College = require('../models/College');

// GET all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find();
    console.log(`Retrieved ${colleges.length} colleges from database`);
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST add a new college
router.post('/', async (req, res) => {
  console.log("Received College Data:", JSON.stringify(req.body, null, 2));
  
  try {
    const newCollege = new College(req.body);
    
    let savedCollege;
    try {
      savedCollege = await newCollege.save();
      console.log("College saved successfully:", savedCollege._id);
    } catch (saveError) {
      if (saveError.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: saveError.errors 
        });
      }
      throw saveError;
    }
    
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;