const InformationMaterial = require('../models/InformationMaterial')


exports.getAll = async (req, res) => {
  try {
    const materials = await InformationMaterial.find().sort({ createdAt: -1 })
    res.json(materials)
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching information materials' })
  }
}


exports.create = async (req, res) => {
  try {
    const { title, summary, link } = req.body
    const material = await InformationMaterial.create({ title, summary, link })
    res.status(201).json(material)
  } catch (err) {
    res.status(400).json({ msg: err.message || 'Error creating information material' })
  }
}


exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { title, summary, link } = req.body
    const updated = await InformationMaterial.findByIdAndUpdate(
      id,
      { title, summary, link },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ msg: 'Material not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ msg: err.message || 'Error updating information material' })
  }
}


exports.remove = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await InformationMaterial.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ msg: 'Material not found' })
    res.json({ msg: 'Information material deleted' })
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting information material' })
  }
}