const tagModel = require('../models/tagModel')
const validate = require('../validation/validation')
const createTag = async function (req, res) {
    try {
        const requestBody = req.body
        if (!validate.isValidrequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: 'pls provide request body' })
        }
        const { title } = requestBody
        if (!validate.isValid(title)) {
            return res.status(400).send({ status: false, msg: 'pls provide title' })
        }
        const data = await tagModel.create(requestBody)
        return res.status(201).send({ status: true, message: "tag created sucssesfully", data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deletingTag = async function (req, res) {
    try {
        const tagId = req.params.tagId
        

        if (!(validate.isValid(tagId))){
            return res.status(400).send({ status: false, msg: "tag Id is not valid" })
        }
        const tag = await tagModel.findOne({ _id: tagId})

        if(!tag) return res.status(404).send({ status: false, message: 'tag not found'})

        
        let deleteTag = await tagModel.findOneAndDelete({ _id:tag})
            if(!deleteTag) {
            res.status(404).send({ status: false, msg: "Tag is already deleted" })
            return
        }
        

        res.status(200).send({ status: true, msg: "tag has been deleted successfully" })
        

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
};
const getTags = async function (req, res) {
    try {

        
        const tags = await tagModel.find()
        res.status(200).send({ status: true, message: 'tag list', data:tags })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {createTag,deletingTag,getTags}