const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote} = require('../../lib/notes')
const { notes } = require('../../data/db')

router.get('/db', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
});

router.get('/db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result)
    } else {
        res.send(404)
    }
});

router.post('/db', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note)
    }
});

router.delete('/db/:id', (req, res) => {
    const result = findById(req.params.id, notes)

    if (result) {
        notes.splice(result, 1)
        res.json(notes)
    } else {
        return res.status(404).json({})
    }

})

module.exports = router;