const express = require('express');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/auth');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const app = express();
conectarDB();

app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Ventas',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], // Rutas donde se encuentran las definiciones de Swagger
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));