const express = require("express")
const router = express.Router()
const controller = require("../controllers/bookController")

// Get
router.get("/books", controller.getAllBook)
router.get("/books/:id", controller.getBookById)

// Post
router.post("/books/create", controller.createBook)

// Put
router.put("/books/:id/update", controller.updateBook)

// Delete
router.delete("/books/:id/delete", controller.deleteBook)

module.exports = router