const express = require('express');
const { getFaqs, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const router = express.Router();

router.get('/', getFaqs);
router.post('/', createFaq);
router.put('/:id', updateFaq);
router.delete('/:id', deleteFaq); 

module.exports = router;
