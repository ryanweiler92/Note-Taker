const { notes } = require('./data/db')

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title)
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result
};

function createNewNote(body, notesArray) {
    console.log(body)


    return body;
}

app.get('/api/db', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
});

app.get('/api/db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result)
    } else {
        res.send(404)
    }
});

app.post('/api/db', (req, res) => {
    req.body.id = notes.length.toString();
    
    res.json(req.body)
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});