const { notes } = require('./data/db')

const express = require('express');
//instantiate the server
const app = express();

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title)
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
}

app.get('/api/db', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});