# Task Manager API

This is a RESTful API for managing tasks, built with **Node.js**, **Express**, and **MongoDB**. The API allows users to perform CRUD operations on tasks, including creating, reading, updating, and deleting tasks. Authentication is handled via **JWT** tokens, and **Swagger UI** is used for API documentation.

## Features
- User authentication (sign up, login)
- Task management (create, get, update, delete)
- API documentation using Swagger UI
- JWT authentication for protected routes

## Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (JSON Web Token) for authentication
- Swagger for API documentation
- dotenv for environment variables
- body-parser for parsing request bodies

## Setup and Installation

### Prerequisites
Make sure you have the following installed:
- Node.js and npm
- MongoDB instance or MongoDB Atlas account for database connection

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   cd task-manager-api
