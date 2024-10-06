const express = require('express');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/auth');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Importar cors
require('dotenv').config();

const app = express();
conectarDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:9000', // Permitir solo solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir solo estos métodos HTTP
}));
// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYSFUN-BACKEND APP',
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