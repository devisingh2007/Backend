const express = require("express");
const { createNote, bulkCreateNotes } = require("../controllers/note.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk", bulkCreateNotes);

module.exports = router;
