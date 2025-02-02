const mongoose = require('mongoose');
const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    published_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faq', FaqSchema);