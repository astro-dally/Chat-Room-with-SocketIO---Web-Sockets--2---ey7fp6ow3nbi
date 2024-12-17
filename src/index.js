const express = require('express');
const app = express();
app.use(express.json());

let numberArray = [2, 3, 4, 5];

// GET: Return the sum of numbers in the array
app.get('/sum', (req, res) => {
    // const sum = numberArray.reduce((acc, num) => acc + num, 0);
    // res.json({ sum });
    const sum = numberArray.reduce((acc, cum) => acc + cum, 0)
    res.json({ sum })
});

// POST: Add a new number to the array
app.post('/add', (req, res) => {
    const { number } = req.body;
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Please provide a number.' });
    }
    numberArray.push(number);
    res.json({ message: 'Number added successfully', numberArray });
});

// PUT: Update an existing number at a specific index
app.put('/update', (req, res) => {
    const { index, number } = req.body;
    if (typeof number !== 'number' || typeof index !== 'number' || index < 0 || index >= numberArray.length) {
        return res.status(400).json({ error: 'Invalid index or number.' });
    }
    numberArray[index] = number;
    res.json({ message: 'Number updated successfully', numberArray });
});

// DELETE: Remove a number from the array by its index
app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= numberArray.length) {
        return res.status(400).json({ error: 'Invalid index.' });
    }
    numberArray.splice(index, 1);
    res.json({ message: 'Number deleted successfully', numberArray });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = { app, numberArray };
