const SupportResource = require('../models/SupportResource')


const GetResources = async (req, res) => {
  try {
    const resources = await SupportResource.find()
    res.send(resources)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving resources')
  }
}


const CreateResource = async (req, res) => {
  try {
    const resource = await SupportResource.create(req.body)
    res.status(201).send(resource)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating support resource')
  }
}


const UpdateResource = async (req, res) => {
  try {
    const resource = await SupportResource.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!resource) return res.status(404).send('Resource not found')
    res.send(resource)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating support resource')
  }
}

const DeleteResource = async (req, res) => {
  try {
    const result = await SupportResource.deleteOne({ _id: req.params.id })
    if (result.deletedCount === 0) return res.status(404).send('Resource not found')
    res.send({ msg: 'Support resource deleted', id: req.params.id })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting support resource')
  }
}

module.exports = {
  GetResources,
  CreateResource,
  UpdateResource,
  DeleteResource
}
