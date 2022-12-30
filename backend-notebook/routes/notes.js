const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All Notes using:GET endpoint"/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add a new  Note using:POST endpoint"/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // destructuring concept
      const { title, description, tag } = req.body;
      // if there are errors, return Bad request and Errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // pomise return
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing  Note using:PUT endpoint"/api/notes/updatednote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //    destructuring
  const { title, description, tag } = req.body;
  try {
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Fint a note to be updated and update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // checking user note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Note allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Delete an existing  Note using:Delete endpoint"/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Fint a note to be deleted and deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allowe deletion only if a user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Note allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Successfully deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
