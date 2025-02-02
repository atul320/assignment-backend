const Faq = require('../models/Faq');
const redisClient = require('../utils/cache');
const translate = require('../services/translateService');

exports.getFaqs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const cacheKey = `faqs_${lang}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) return res.json(JSON.parse(cachedData));

        let faqs = await Faq.find();
        if (lang !== 'en') {
            faqs = await Promise.all(faqs.map(async (faq) => {
                return await translate(faq, lang);
            }));
        }
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(faqs));
        res.json(faqs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = new Faq({ question, answer });
        await faq.save();
        await redisClient.del('faqs_en');
        res.status(201).json(faq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await Faq.findByIdAndUpdate(req.params.id, { question, answer }, { new: true }); // Find and update

        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        await redisClient.del('faqs_en'); // Invalidate cache
        res.json(faq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);

        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        await redisClient.del('faqs_en'); // Invalidate cache
        res.status(204).json(); // 204 No Content is a common success response for DELETE
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};