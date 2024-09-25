const express = require('express');
const router = express.Router();
const bookctrl = require('../Routesctrl.js/booksctrl');
const { authoriseadmin } = require('../auth/auth');

router.get("/", bookctrl.getAll);//Route to get all books from database
router.get("/page/:page/limit/:limit", bookctrl.getAll);//Route to get all books from database with pagination
router.get("/:id", bookctrl.getById);//ye read book by id
router.post("/", bookctrl.post);//Route for save a book
router.put("/:id",authoriseadmin, bookctrl.put);//update a book
router.delete("/:id",authoriseadmin, bookctrl.remove);//delete a book

module.exports = router;