const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote} = require('../../lib/notes')
const { notes } = require('../../data/db')

router.get('/api/db', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
});

router.get('/api/db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result)
    } else {
        res.send(404)
    }
});

router.post('/api/db', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note)
    }
});

module.exports = router;