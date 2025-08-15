const SOS = require('../models/SOS')

const GetSOS = async (req, res) => {
  try {
    const sos = await SOS.find({ user: req.user._id }).sort({ triggeredAt: -1 })
    res.json(sos)
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching your SOS', error: error.message })
  }
}

const CreateSOS = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const sos = await SOS.create({
      user: req.user ? req.user._id : null,  
      method: req.body.method 
    })
    res.status(201).json(sos)
  } catch (error) {
    res.status(500).json({ msg: 'Error creating SOS', error: error.message })
  }
}

const UpdateSOS = async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(sos)
  } catch (error) {
    res.status(500).json({ msg: 'Error updating SOS', error: error.message })
  }
}

const DeleteSOS = async (req, res) => {
  try {
    await SOS.deleteOne({ _id: req.params.id })
    res.json({ msg: 'SOS request deleted', payload: req.params.id, status: 'Ok' })
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting SOS', error: error.message })
  }
}

const GetAllSOS = async (req, res) => {
  try {
    const allSOS = await SOS.find().populate('user', 'email name')
    res.json(allSOS)
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching all SOS', error: error.message })
  }
}

module.exports = {
  GetSOS,
  CreateSOS,
  UpdateSOS,
  DeleteSOS,
  GetAllSOS
}