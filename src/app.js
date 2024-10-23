const express = require('express');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/auth');
const areaRoutes = require('./routes/areas');
const rolRoutes = require('./routes/roles');
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
        Usuario: {
          type: 'object',
          properties: {
            nombres: {
              type: 'string',
              description: 'Nombres del usuario'
            },
            apellidos: {
              type: 'string',
              description: 'Apellidos del usuario'
            },
            correo: {
              type: 'string',
              description: 'Correo electrónico del usuario'
            },
            nombre_usuario: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            contrasena: {
              type: 'string',
              description: 'Contraseña del usuario'
            },
            fecha_de_nacimiento: {
              type: 'string',
              format: 'date',
              description: 'Fecha de nacimiento del usuario'
            },
            foto_de_colaborador: {
              type: 'string',
              description: 'ID del archivo de la foto del usuario'
            },
            rol: {
              type: 'string',
              description: 'ID del rol del usuario'
            },
            tipoDocumento: {
              type: 'string',
              description: 'Tipo de documento del usuario'
            },
            numeroDocumento: {
              type: 'string',
              description: 'Número de documento del usuario'
            }
          }
        }, 
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
        },
        Rol: { // Agregar la definición del esquema Rol
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del rol'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del rol'
            },
            area: {
              type: 'string',
              description: 'ID del área asociada al rol'
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
app.use('/roles', rolRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));