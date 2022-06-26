const mongoose = require('mongoose')
const objectId =  mongoose.Schema.Types.ObjectId
const bookmarkSchema = new mongoose.Schema({
    link: {
        type: String,
        unique:true,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    },
    tags: {
        type: objectId,
        ref: 'tags'
    }
},
    { timestamps: true })

module.exports = mongoose.model('bookmarklinks', bookmarkSchema)