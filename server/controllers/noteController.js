// Importing Models
import Note from "../models/Note.js";

// Controllers

// To retrieve all notes from the database
const get_all_notes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json({ content: notes });
  } catch (error) {
    res.status(400).json({ message: "Error fetching notes", error });
  }
};

// To add a new note to the database
const add_note = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      details: req.body.details,
      user: req.user._id, // Assuming req.user contains the logged-in user
    });
    await note.save();
    res.status(201).json({ message: "Note added successfully", content: note });
  } catch (error) {
    res.status(400).json({ message: "Error adding note", error });
  }
};

// Get a single note by ID for the logged-in user
const get_one_note = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ content: note });
  } catch (error) {
    res.status(400).json({ message: "Error fetching note", error });
  }
};

// To edit an existing note
const update_note = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (result != null) {
        res.json({
          msg: "The note was updated successfully!",
          content: result,
        });
      } else {
        res.json({ msg: "This note doesn't exist!" });
      }
    })
    .catch((error) => res.json({ msg: error.message }));
};

// To delete a note from the database
const delete_note = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (result != null) {
        res.json({ msg: "The note was successfully deleted!" });
      } else {
        res.json({ msg: "This note doesn't exist!" });
      }
    })
    .catch((error) => res.json({ msg: error.message }));
};

// Exports
const noteController = {get_all_notes, add_note, get_one_note, update_note, delete_note};
export default noteController;
