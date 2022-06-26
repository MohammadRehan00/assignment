const express = require('express')
const router = express.Router()
const bookmarkController = require('../controllers/bookmarkController')
const tagController = require('../controllers/tagController')

router.post('/linkbookmark',bookmarkController.createBookmark)
router.post('/createtag',tagController.createTag)
router.delete("/bookMark/:bookMarkId",bookmarkController.deletingBookMark)
router.delete("/tag/:tagId",tagController.deletingTag)
router.get("/tags",tagController.getTags)
router.get("/bookmark",tagController.getTags)
router.put("/updatebookmark/:bookMarkId",bookmarkController.updateBookMark)
module.exports = router