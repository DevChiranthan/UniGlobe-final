const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  approvals: { type: String },
  courseType: { type: String, required: true },
  courseName: { type: String, required: true },
  cutoff: { type: String },
  courseFee: { type: String },
  feeDetails: { type: String },
  reviewLink: { type: String }, // New review link field
  logo: { type: String },
  virtualTour: { type: Boolean },
  virtualTourLink: { type: String },
  applyNowLink: { type: String },
  brochureLink: { type: String },
  forCourses: [{ type: String }],
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  applications: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('College', CollegeSchema);