const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

//note page (/notes/list)
router.get("/list", async function(req, res){
    var notes = await Note.find();
    res.json(notes);
});

router.get("/list/:userId", async function(req, res){
    var notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
});

//note page (/notes/add)
router.post("/add", async function(req, res){
    const newNote = new Note({
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();

    var response = "Note Created and Saved Successfully with id " + `${req.body.id}`;
    res.json(response);
});

router.post("/update", async function(req, res){
    await Note.deleteOne({ userId: req.body.userId });

    const newNote = new Note({
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();

    var response = "Note Updated Successfully with id " + `${req.body.id}`;
    res.json(response);
});

router.post("/delete", async function(req, res){
    await Note.deleteOne({ userId: req.body.userId });

    var response = "Note Deleted Successfully with id " + `${req.body.userId}`;
    res.json(response);
});

module.exports = router;