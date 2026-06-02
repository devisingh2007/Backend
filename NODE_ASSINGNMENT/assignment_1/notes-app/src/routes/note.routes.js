const express = require("express");
const { createNote, bulkCreateNotes, getAllNotes } = require("../controllers/note.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk", bulkCreateNotes);
router.get("/", getAllNotes);

module.exports = router;
