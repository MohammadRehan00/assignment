const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
}


},{timestamps:true})
module.exports = mongoose.model('tags',tagSchema)