const mongoose = require('mongoose')

const InformationMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('InformationMaterial', InformationMaterialSchema)