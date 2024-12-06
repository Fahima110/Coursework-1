const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://fm837:Fsf8630110@coursework1.lqez4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define lesson schema
const lessonSchema = new mongoose.Schema({
    title: String,
    subject: String,
    location: String,
    price: Number,
    availability: Number,
    images: String
});

const Lesson = mongoose.model('Lesson', lessonSchema);

// Search route
app.get('/search', async (req, res) => {
    const { query } = req.query;

    // Find lessons based on search query
    const lessons = await Lesson.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { subject: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { price: { $regex: query, $options: 'i' } },
            { availability: { $regex: query, $options: 'i' } }
        ]
    });

    res.json(lessons);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});