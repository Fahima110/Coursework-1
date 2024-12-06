const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Lesson = require('./subjects');  // Import the Lesson model

const app = express();
const port = 3000;

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Static file middleware for lesson images
app.use('/images', (req, res, next) => {
    const imagePath = path.join(__dirname, 'images', req.path);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Image file not found.' });
        } else {
            res.sendFile(imagePath);
        }
    });
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://fm837:Fsf8630110@coursework1.lqez4.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

// Define the route to handle search
app.get('/search', async (req, res) => {
    const query = req.query.query;
    console.log('Search Query:', query);

    try {
        // MongoDB query to search lessons by subject using async/await
        const lessons = await Lesson.find({ subject: new RegExp(query, 'i') });
        console.log('Lessons:', lessons);
        res.json(lessons); // Send the results back in JSON format
    } catch (err) {
        console.error('Error retrieving lessons:', err);
        return res.status(500).json({ error: 'Error retrieving lessons', details: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});