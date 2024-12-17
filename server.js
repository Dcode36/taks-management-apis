const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Management API',
        version: '1.0.0',
        description: 'RESTful API for managing tasks',
      },
      servers: [
        {
          url: 'https://taks-management-apis.onrender.com',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to your route files
  };
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
  


dotenv.config();
const app = express();

app.use(bodyParser.json());
  // Serve Swagger Docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => res.send('Task Manager API is running'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
