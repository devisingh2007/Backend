const express = require("express");
const {
  createNote,
  bulkCreateNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  bulkDeleteNotes
} = require("../controllers/note.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk", bulkCreateNotes);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", replaceNote);
router.patch("/:id", updateNote);
router.delete("/bulk", bulkDeleteNotes);
router.delete("/:id", deleteNote);

module.exports = router;
