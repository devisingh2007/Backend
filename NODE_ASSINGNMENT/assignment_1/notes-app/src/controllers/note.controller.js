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

// 2. Create multiple notes (POST /api/notes/bulk)
const bulkCreateNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    // Validation: if notes array is missing or empty
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required and cannot be empty",
        data: null
      });
    }

    const createdNotes = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Unexpected server or database error",
      data: null
    });
  }
};

// 3. Get all notes (GET /api/notes)
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    
    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
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
  createNote,
  bulkCreateNotes,
  getAllNotes
};
