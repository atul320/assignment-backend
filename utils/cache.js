const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();
const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect().catch(console.error);

module.exports = client;