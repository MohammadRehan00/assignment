const bookmarkModel = require('../models/bookmarkModel')
const validate = require('../validation/validation')
const createBookmark = async function (req,res) {
    try {
        const requestBody = req.body
        const { link, title, publisher, tags } = requestBody
        if (!validate.isValidrequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: 'pls provide request body' })
        }
        if (!validate.isValid(link)) {
            return res.status(400).send({ status: false, msg: 'pls provide link' })
        }
        const isLinkAlreadyUsed = await bookmarkModel.findOne({ link: link })
        if (isLinkAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "link is already used" })
        }
        if (!validate.isValid(title)) {
            return res.status(400).send({ status: false, msg: 'pls provide title' })
        }
        if (!validate.isValid(publisher)) {
            if (!validate.isValidrequestBody(publisher)) {
                return res.status(400).send({ status: false, msg: 'pls provide publisher' })
            }
        }
        if (!validate.isValidObjectId(tags)) {
            return res.status(400).send({ status: false, msg: 'pls provide valid tags' })
        }
        if (!validate.isValid(tags)) {
            return res.status(400).send({ status: false, msg: 'pls provide tags' })
        }


        const newBookmark = await bookmarkModel.create(requestBody )
        
        return res.status(201).send({ status: true, message: "bookmark created successfully", data: newBookmark })
        
       

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deletingBookMark = async function (req, res) {
    try {
        const bookMarkId = req.params.bookMarkId
        

        if (!(validate.isValid(bookMarkId))){
            return res.status(400).send({ status: false, msg: "Bookmark Id is not valid" })
        }
        const bookMark = await bookmarkModel.findOne({ _id: bookMarkId})

        if(!bookMark) return res.status(404).send({ status: false, message: 'BookMark not found'})

        
        let deleteBookMark = await bookmarkModel.findOneAndDelete({ _id:bookMark})
            if(!deleteBookMark) {
            res.status(404).send({ status: false, msg: "bookmark is alredy deleted" })
            return
        }
        

        res.status(200).send({ status: true, msg: "bookmark has been deleted successfully" })
        

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
};
const getBookmark = async function (req, res) {
    try {

        
        const bookmark = await bookmarkModel.find()
        res.status(200).send({ status: true, message: 'bookmark list', data:bookmark })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};
const updateBookMark = async function (req, res) {
    try {
        const requestBody = req.body
        const bookMarkId = req.params.bookMarkId
        if(!(validate.isValid(requestBody))){
            return res.status(400).send({ status: false, msg: "plz provide request body" })
        }
         if (!(validate.isValid(bookMarkId))){
            return res.status(400).send({ status: false, msg: "Bookmark Id is not valid" })
        }
        const{link,title,publisher} = requestBody
         const updatedBookMarkData = {}

        if (validate.isValid(link)) {
            const isLinkAlreadyUsed = await bookmarkModel.findOne({ link: link});

            if (isLinkAlreadyUsed) {
                res.status(400).send({ status: false, message: `link is already registered` })
                return
            }
            updatedBookMarkData['link'] = title
        }

        if (validate.isValid(title)) {

            updatedBookMarkData['title'] = title
        }
        if (validate.isValid(publisher)) {

            updatedBookMarkData['publisher'] = publisher
        }
        const bookMark = await bookmarkModel.findOne({ _id: bookMarkId})

        if(!bookMark) return res.status(404).send({ status: false, message: 'BookMark not found'})

        
        let BookMark = await bookmarkModel.findOneAndUpdate({ _id:bookMark},updatedBookMarkData,{new:true}).select({tags:0})
        res.status(200).send({ status: true, msg: "bookmark has been updated successfully" ,data:BookMark})
         
        

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
};

module.exports = {createBookmark,deletingBookMark,getBookmark,updateBookMark}