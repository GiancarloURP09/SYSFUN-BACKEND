const express = require('express');
const conectarDB = require('./config/database');
const path = require('path'); // Importar 'path'
const authRoutes = require('./routes/auth');
const areaRoutes = require('./routes/areas');
const rolRoutes = require('./routes/roles');
const clienteRoutes = require('./routes/cliente'); 
const propuestaRoutes = require("./routes/propuestas");
const contratos= require("./routes/contratos");
const proyectoRoutes = require("./routes/proyectos");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
conectarDB();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:9000', 'http://localhost:4000/api-docs','https://sysfun-frontend.onrender.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYSFUN-BACKEND APP TESIS URP',
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
        },
        Cliente: { // Agregar el esquema Cliente
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del cliente'
            },
            rubro: {
              type: 'string',
              description: 'Rubro del cliente'
            },
            representante: {
              type: 'string',
              description: 'Representante del cliente'
            },
            tipoDocumento: {
              type: 'string',
              enum: ['DNI', 'RUC', 'Pasaporte', 'Carnet de Extranjería'],
              description: 'Tipo de documento del cliente'
            },
            numeroDocumento: {
              type: 'string',
              description: 'Número de documento del cliente'
            },
            usuariosAsociados: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID de los usuarios asociados al cliente'
              }
            },
            esPotencial: {
              type: 'boolean',
              description: 'Indica si el cliente es potencial'
            }
          }
        },
        Propuesta: { // Nuevo esquema para Propuestas
          type: 'object',
          properties: {
            cliente: {
              type: 'string',
              description: 'ID del cliente asociado',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción de la propuesta',
            },
            monto: {
              type: 'number',
              description: 'Monto de la propuesta',
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
              description: 'Fecha de inicio de la propuesta',
            },
            fechaFin: {
              type: 'string',
              format: 'date',
              description: 'Fecha de finalización de la propuesta',
            },
            fechaReunion: {
              type: 'string',
              format: 'date',
              description: 'Fecha de reunión para discutir la propuesta',
            },
            urlReunion: {
              type: 'string',
              description: 'URL para acceder a la reunión',
            },
            estado: {
              type: 'string',
              enum: ['Pendiente', 'Aprobada', 'Rechazada'],
              description: 'Estado actual de la propuesta',
            },
          },
        },
        Contrato: {
          type: 'object',
          properties: {
            cliente: { type: 'string' },
            proyecto: { type: 'string' },
            descripcion: { type: 'string' },
            fechaInicio: { type: 'string', format: 'date' },
            fechaFin: { type: 'string', format: 'date' },
            monto: { type: 'number' },
            estado: { type: 'string', enum: ['Activo', 'Finalizado', 'Cancelado'] },
          },
        },
        ArchivoContrato: {
          type: 'object',
          properties: {
            filename: { type: 'string' },
            contentType: { type: 'string' },
            contratoId: { type: 'string' },
            uploadDate: { type: 'string', format: 'date' },
          },
        },
      }
    },
    security: [{ 
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Servir la página estática de bienvenida
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/areas', areaRoutes);
app.use('/roles', rolRoutes);
app.use('/clientes', clienteRoutes); 
app.use("/propuestas", propuestaRoutes);
app.use("/contratos", contratos);
app.use("/proyectos", proyectoRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));