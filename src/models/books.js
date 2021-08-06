const mongoose = require("mongoose")

const bookShema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    pages: {type: Number},
    chapters:{type: Array},
    liked: {type: Boolean}
}, {
    versionKey: false
})

const books = mongoose.model('book', bookShema)

module.exports = books