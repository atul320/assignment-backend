const { translate } = require('@vitalets/google-translate-api');

const translateFaq = async (faq, lang) => {
    try {
        const translatedQuestion = await translate(faq.question, { to: lang });
        const translatedAnswer = await translate(faq.answer, { to: lang });
        return { ...faq.toObject(), question: translatedQuestion.text, answer: translatedAnswer.text };
    } catch (error) {
        console.error("Error in translation service:", error);
        throw new Error("Translation failed"); // Re-throw for proper handling
    }
};

module.exports = translateFaq;