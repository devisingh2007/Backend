const express = require("express");
const { createNote, bulkCreateNotes, getAllNotes, getNoteById } = require("../controllers/note.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk", bulkCreateNotes);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

module.exports = router;
