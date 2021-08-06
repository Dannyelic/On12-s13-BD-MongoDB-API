const books = require("../models/books")

const getAllBook = (req, res) => {
    books.find( function (err, booksFound) {
        if (err) {
            res.status(500).send( { message: err.message } )
        }
        if (booksFound && booksFound.length > 0){
            res.status(200).send(booksFound)
        } else {
            res.status(204).send( { message: "No book is available" } )
        }
    })
}

const getBookById = (req,res) => {
    const requestId = req.params.id
    books.findOne( { id: requestId }, function (err,booksFound) {
        if (err) {
            res.status(500).send({message: err.message})
        }
        if (booksFound){
            res.status(200).send(booksFound.toJSON( { virtuals:true } ))
        } else {
            res.status(204).send({message:"empty"})
        }
    })
}

const createBook = (req,res) => {
    let { id, title, pages, chapters, liked} = req.body
    const books = book.insertMany({id, title, pages, chapters, liked})

    if (books) {
        res.status(200).send({message: "successfully created"})
    } else {
        res.status(500).send({ message: "error"})
    }
}

const updateBook = (req, res) => {
    const requiredId = req.params.id;
    books.findOne({ id: requiredId }, function (err, booksFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (booksFound) {
                books.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "changed successfully" })
                    }
                })
            } else {
                res.status(404).send({ message: "There are no books to update"});
            }
        }
    })
};

const deleteBook = (req, res) => {
    const requiredId = req.params.id;
    books.findOne({ id: requiredId }, function (err, booksFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (booksFound) {
                books.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "successfully deleted" })
                    }
                })
            } else {
                res.status(404).send({ message: "There are no books with this id" });
            }
        }
    })
}

module.exports = {
    getAllBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}