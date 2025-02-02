# FAQ Backend API

This is a RESTful API for managing FAQs, built using Node.js, Express, MongoDB, and Redis.  It supports multi-language retrieval of FAQs using the Google Translate API.

## Features

*   **GET /api/faqs:** Retrieves all FAQs. Supports an optional `lang` query parameter to retrieve FAQs in a specific language (e.g., `/api/faqs?lang=hi or /api/faqs?lang=bn` for Hindi or Bengali).
*   **POST /api/faqs:** Creates a new FAQ. Requires `question` and `answer` in the request body.
*   **PUT /api/faqs/:id:** Updates an existing FAQ. Requires `question` and `answer` in the request body.
*   **DELETE /api/faqs/:id:** Deletes an existing FAQ.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for building APIs.
*   **MongoDB:** NoSQL database for storing FAQs.
*   **Mongoose:** ODM for interacting with MongoDB.
*   **Redis:** In-memory data store for caching FAQs.
*   **@vitalets/google-translate-api:** Library for integrating with the Google Translate API.
*   **dotenv:** For managing environment variables.
*   **cors:** For enabling Cross-Origin Resource Sharing.
*   **jest & supertest:** For testing the API.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/atul320/assignment-backend)
    ```

2.  **Install dependencies:**

    ```bash
    cd assignment-backend
    npm install
    ```

3.  **Configure environment variables:**

    Create a `.env` file in the project root and add the following environment variables:

    ```
    MONGO_URI=your_mongodb_connection_string I have used mongodb atlas
    PORT=8080  # Or any port you prefer
    REDIS_URL= Redis connection string I have used redis cloud
    ```

4.  **Start the server:**

    ```bash
    npm start
    ```

## Running Tests

1.  **Install test dependencies:**

    ```bash
    npm install --save-dev jest supertest
    ```

2.  **Run the tests:**

    ```bash
    npm test
    ```

## API Endpoints

*   **GET http://localhost:8080/api/faqs:** Retrieves all FAQs. Supports an optional `lang` query parameter to retrieve FAQs in a specific language (e.g., `/api/faqs?lang=hi or /api/faqs?lang=bn` for Hindi or Bengali).
*   **POST http://localhost:8080/api/faqs:** Creates a new FAQ. Requires `question` and `answer` in the request body.
*   **PUT http://localhost:8080/api/faqs/:id:** Updates an existing FAQ. Requires `question` and `answer` in the request body.
*   **DELETE http://localhost:8080/api/faqs/:id:** Deletes an existing FAQ.

## Example Usage

*   **Get all FAQs:**

    ```bash
    curl http://localhost:8080/api/faqs
    ```

*   **Get FAQs in Bengali:**

    ```bash
    curl http://localhost:8080/api/faqs?lang=bn
    ```

*   **Create a new FAQ:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"question": "Why we write hello world", "answer": "Because its first thing we start"}' http://localhost:8080/api/faqs
    ```

*   **Update an FAQ:**

    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"question": "What is the meaning of backend in cs?", "answer": "It is coding which does all functionality"}' http://localhost:8080/api/faqs/[faq-id]
    ```

*   **Delete an FAQ:**

    ```bash
    curl -X DELETE http://localhost:8080/api/faqs/[faq-id]
    ```

# Note
  Not able to integrate any rich text editor as there was a issue to make frontend in ejs but all other functionalities are present. 
