const express = require('express');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/auth');
const areaRoutes = require('./routes/areas');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
conectarDB();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:9000', 'http://localhost:4000/api-docs'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYSFUN-BACKEND APP',
      version: '1.0.0',
    },
    components: { 
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: { 
        Area: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del área'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del área'
            }
          }
        }
      }
    },
    security: [{ 
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/areas', areaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));