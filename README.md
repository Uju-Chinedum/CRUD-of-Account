# CRUD of an Account

This repository contains a Node.js and MongoDB application that implements basic CRUD operations for user accounts along with a login and logout functionality. It utilizes the Express.js framework for handling routes, bcrypt.js for password hashing, and JSON Web Token for tokenization and MongoDB for data storage.

## Prerequisites

Befor running the application, make sure you [Node.js (v12 or higher)](https://nodejs.org/en) and [Git](https://git-scm.com/downloads) installed.

## Installation

1. Clone this repository using Git\
   `git clone https://github.com/Uju-Chinedum/CRUD-of-Account.git`

2. Navigate to the project directory\
   `cd CRUD-of-Account`

3. Install the required dependencies\
   `npm install`

4. Create a MongoDB database locally or via a cloud-based service. Make a note of the URL for the connection.

5. Create a `.env` file in the project root and add the following environment variables with your own values:\
   `MONGO_URI=<your-mongodb-connection-url>`\
   `JWT_SECRET=<your-key-to-tokenize-JWT>`\
   `JWT_LIFETIME=<how-long-you-want-it-to-last>`

## Running the Application

Once you have completed the installation, run the application by using `npm start`. This will start the Node.js server, and you should see the message "Server started on port `port`" in the console. The application will be available at <http://localhost:3000>.

## Routes

The application implements the following routes:

### Account Routes

- **POST /api/v1/account**: Creates a new account
- **GET /api/v1/account/:id**: Gets a specific user account by ID
- **PATCH /api/v1/account/:id**: Update an existing user account by ID
- **DELETE /api/v1/account/:id**: Delete a user account by ID

### Authentication Routes

- **POST /api/v1/auth/login**: Authenticate user login credentials and start a session
- **DELETE /api/v1/auth/logout**: End the current user session

## Usage

After the application is running, you can use an API testing tool like Postman to interact with the routes.

1. Create a new user account by making a POST request to /api/v1/account with the required account details in the request body.

2. To log in, make a POST request to api/v1/auth/login with valid login credentials (email and password) in the request body. This will authenticate the user and create a session.

3. Fetch a specific user account by its ID by making a GET request to /api/v1/account/:id, where :id is the ID of the user account.

4. Update a user account by making a PATCH request to /api/v1/account/:id, providing the updated account details in the request body.

5. Delete a user account by making a DELETE request to /api/v1/account/:id, where :id is the ID of the user account to be deleted.

6. To log out, make a DELETE request to /api/v1/auth/logout. This will end the current user session.

Please note, to create a new account the request body must have, asterisks are required fields:

    firstName       *
    lastName        *
    email           *
    password        *
    passwordConfirm *
    carType
    zipCode         *
    city            *
    country         *

## License

This project is licensed under the **[MIT License](https://mit-license.org/)**

## Resources

- [Node.js](nodejs.org) - Official website for Node.js
- [NPM](npmjs.com) - Official website for NPM
- [Express.js](expressjs.com) - Official website for Express.js
- [MongoDB](mongodb.com) - Official website for MongoDB
- [Mongoose.js](mongoosejs.com) - Official website for Mongoose
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) - Official website for Bcrypt.js
- [JSON Web Token](https://jwt.io) - Official website for JWT
