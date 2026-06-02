const Note = require("../models/note.model");
const mongoose = require("mongoose");

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

// 4. Get a single note by ID (GET /api/notes/:id)
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        data: null
      });
    }

    const note = await Note.findById(id);

    // If note not found
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
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

// 5. Replace a note completely (PUT /api/notes/:id)
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        data: null
      });
    }

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    // Construct full replacement object, resetting missing optional fields to defaults
    const replacementData = {
      title,
      content,
      category: category !== undefined ? category : "personal",
      isPinned: isPinned !== undefined ? isPinned : false
    };

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      replacementData,
      { new: true, overwrite: true, runValidators: true }
    );

    // If note not found
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updatedNote
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

// 6. Update specific fields (PATCH /api/notes/:id)
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        data: null
      });
    }

    // Validate body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // If note not found
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote
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

module.exports = {
  createNote,
  bulkCreateNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote
};
