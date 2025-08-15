const mongoose = require('mongoose')

const supportResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['hotline', 'shelter', 'legal', 'general'], required: true },
  description: String,
  contact: String,
  location: String,
  link: String
}, { timestamps: true })

module.exports = mongoose.model('SupportResource', supportResourceSchema)
