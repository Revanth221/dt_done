# Task1 Documentation

This is a backend application built with Node.js. It is designed to manage event-related operations such as creating, updating, deleting, and fetching events. The project includes database connectivity, routing, middleware, and controller logic.

## Folder Structure

```
src/
|-- app.js
|-- config/
|   |-- db.js
|-- controllers/
|   |-- event.controller.js
|-- middlewares/
|   |-- errorHandler.middleware.js
|   |-- multer.middleware.js
|-- routes/
|   |-- event.route.js
|-- services/
|   |-- event.service.js
|-- utils/
|   |-- ApiError.js
|   |-- ApiResponse.js
|   |-- asyncHandler.js
|   |-- cloudinary.js
```

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB
- Cloudinary

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Revanth686/DT_Backend.git
   cd DT_Backend/task1
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUDNAME=your_cloudinary_cloudname
   CLOUDINARY_API_KEY=your_cloudinary_apikey
   CLOUDINARY_API_SECRET=your_cloudinary_apisecret
   ```

### Running the Application

Start the server:

```sh
npm start
```

The server will run on `http://localhost:3000`.

## Unique Practices and Features

### Cloudinary Integration

When a user submits an image in a POST request to the `/api/v3/app/events` endpoint:

1. The image is first stored locally.
2. Then stored image is uploaded to Cloudinary.
3. Then URL of the uploaded image is obtained from Cloudinary.
4. Then `image` field is set to obtained URL not the path of image.
5. And then event is stored in database.
6. This ensures that the uploaded image is accessible from anywhere when requested.

### Clean Logging with Debug Library

Used `debug` library for clean logging. Logs will only appear in the development environment and not in production, ensuring that production logs remain clean.

### API Error and Response Wrappers

Used custom `ApiError` and `ApiResponse` classes to provide a structured response. This ensures consistent API response format.

### Async Handler

Used `asyncHandler` utility to handle asynchronous operations and catch errors without the need to use try-catch blocks repeatedly in the code following DRY principle resulting in cleaner code.

## API Testing with Postman

GET![get-request](./assets/get.png)
POST![post-request](./assets/post.png)
PUT![put-request](./assets/put.png)
DELETE![delete-request](./assets/delete.png)

## API Endpoints

### Event Routes

- **GET /api/v3/app/events**: Fetch all events or a specific event by ID.
- **POST /api/v3/app/events**: Create a new event (with image upload).
- **PUT /api/v3/app/events/:id**: Update an existing event by ID (with image upload).
- **DELETE /api/v3/app/events/:id**: Delete an event by ID.

## Key Files

### app.js

The main entry point of the appl, sets up Express server, connects to database, initializes services, and defines routes and middleware.

### event.route.js

Defines routes related to event operations and uses the respective controller functions, middlewares to handle requests.

### event.controller.js

Contains logic for handling api endpoints. Utilizes services, utilities for database interactions and error handling.

## Middleware

- **errorHandler.middleware.js**: Handles errors and sends appropriate responses.
- **multer.middleware.js**: Handles file uploads using Multer.

## Services

- **event.service.js**: Contains logic for event related CRUD operations on the database.

## Utilities

- **ApiError.js**: Defines custom API error responses.
- **ApiResponse.js**: Defines custom API success responses.
- **asyncHandler.js**: Handles asynchronous operations and errors.
- **cloudinary.js**: Handles image uploads to Cloudinary.
