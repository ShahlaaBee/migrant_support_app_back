const mongoose = require('mongoose')

const sosSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  triggeredAt: { type: Date, default: Date.now },
  responded: { type: Boolean, default: false },
  method: { type: String, enum: ['hotline', 'chatbot'], required: true }
}, { timestamps: true })

module.exports = mongoose.model('SOS', sosSchema)

