
const Note = require('../model/note');

const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    const newNote = new Note({ title, content, userId });
    await newNote.save();

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!deletedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    res.status(200).json({ success: true, note: deletedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
