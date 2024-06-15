const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = process.env.PORT || 5500;

// Connect to SQLite database
const db = new sqlite3.Database('notes.db');

// Create a table for notes if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)');

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,)));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(dirname,'index.html'));
});

app.post('/save-note', (req, res) => {
  const { title, content } = req.body;

  // Insert the note into the database
  db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
    
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
