const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Faq = require('../models/Faq');
const redisClient = require('../utils/cache');

let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await redisClient.flushAll();
    server = app.listen();
});

afterAll(async () => {
    await mongoose.disconnect();
    await redisClient.quit();
    server.close();
});

describe('FAQ API Tests', () => {
    let createdFaqId;

    describe('GET /api/faqs', () => {
        it('should return FAQs', async () => {
            const res = await request(server).get('/api/faqs');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        it('should return FAQs in a specific language', async () => {
            const res = await request(server).get('/api/faqs?lang=es');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /api/faqs', () => {
        it('should create a new FAQ', async () => {
            const newFaq = { question: 'Test Question', answer: 'Test Answer' };
            const res = await request(server).post('/api/faqs').send(newFaq);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.question).toEqual(newFaq.question);
            expect(res.body.answer).toEqual(newFaq.answer);

            createdFaqId = res.body._id;
        });

        it('should handle errors when creating a FAQ', async () => {
            const res = await request(server).post('/api/faqs').send({});
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('PUT /api/faqs/:id', () => {
        it('should update an existing FAQ', async () => {
            const updatedFaq = { question: 'Updated Question', answer: 'Updated Answer' };
            const res = await request(server).put(`/api/faqs/${createdFaqId}`).send(updatedFaq);
            expect(res.statusCode).toEqual(200);
            expect(res.body.question).toEqual(updatedFaq.question);
            expect(res.body.answer).toEqual(updatedFaq.answer);
        });

        it('should handle errors when updating a FAQ', async () => {
            const res = await request(server).put(`/api/faqs/${createdFaqId}`).send({});
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');

            const res2 = await request(server).put(`/api/faqs/invalid-id`).send({});
            expect(res2.statusCode).toEqual(500);
            expect(res2.body).toHaveProperty('message');
        });
    });

    describe('DELETE /api/faqs/:id', () => {
        it('should delete an existing FAQ', async () => {
            const res = await request(server).delete(`/api/faqs/${createdFaqId}`);
            expect(res.statusCode).toEqual(204);
        });

        it('should handle errors when deleting a FAQ', async () => {
            const res = await request(server).delete(`/api/faqs/invalid-id`);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });
});