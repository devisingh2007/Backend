const Note = require("../models/note.model");

// 1. Create a single note (POST /api/notes)
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    const note = new Note({
      title,
      content,
      category,
      isPinned
    });

    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unexpected server or database error",
      data: null
    });
  }
};

module.exports = {
  createNote
};
