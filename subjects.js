const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    title: String,
    location: String,
    price: Number,
    availability: Number,
    images: String,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;