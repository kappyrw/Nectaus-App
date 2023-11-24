const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beekeeping', { useNewUrlParser: true, useUnifiedTopology: true });

// Define News Schema
const newsSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

// Routes
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/news', async (req, res) => {
    const { title, content } = req.body;

    try {
        const news = new News({ title, content });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/news/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const news = await News.findByIdAndUpdate(id, { title, content }, { new: true });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await News.findByIdAndRemove(id);
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
