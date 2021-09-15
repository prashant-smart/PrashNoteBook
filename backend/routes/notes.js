const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1:Get all the notes using: GET /api/notes/getallnotes , loin require"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    // console.log(req.user.id);
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});
//ROUTE 2:Add a new note: GET /api/notes/addnote. login require"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("discription", "Enter a valid discription").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        discription,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3:Updating note: PUT /api/notes/updatenote. login require"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, discription, tag } = req.body; //here we dont want to change the date when note was added
  //create a new note
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (discription) {
      newNote.discription = discription;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note if it present then update it
    let note = await Note.findById(req.params.id); //this params.id means ":id" in link
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Before update it check wheater user who request for updating is a actual owner of note
    // because any person can manipulte the id in params.id so we check it first

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    //in this all common key in newNote object update and by new:true if note is new then it create a seprated note(doubt)
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4:Delete note: DELETE /api/notes/deletenote. login require"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    //Find the note if it present then delete it
    let note = await Note.findById(req.params.id); //this params.id means ":id" in link
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Before update it check wheater user who request for deleting is a actual owner of note
    // because any person can manipulte the id in params.id so we check it first

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Sucess": "Note has been deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
